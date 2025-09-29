import { useEffect, useRef, useState } from "react";
import { Alert } from "./Alert";

type State = "idle" | "loading" | "ok" | "err";

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;
const TURNSTILE_SITEKEY = import.meta.env.VITE_TURNSTILE_SITEKEY;

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [token, setToken] = useState<string | null>(null);
  const [showToast, setShowToast] = useState<null | "ok" | "err">(null);

  // Lazy/Viewport
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  // Turnstile
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const hasRenderedRef = useRef(false);

  // Auto-dismiss für Toasts
  useEffect(() => {
    if (!showToast) return;
    const t = window.setTimeout(() => setShowToast(null), 4000);
    return () => window.clearTimeout(t);
  }, [showToast]);

  // 1) Viewport-Observer: erst wenn Formular sichtbar ist, initialisieren
  useEffect(() => {
    if (!formRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setIsInView(true);
            io.disconnect();
            break;
          }
        }
      },
      { root: null, threshold: 0.15 }
    );
    io.observe(formRef.current);
    return () => io.disconnect();
  }, []);

  // 2) Turnstile rendern (einmalig), danach auf Theme-Wechsel reagieren
  useEffect(() => {
    if (!isInView) return;
    if (hasRenderedRef.current) return;

    let themeObserver: MutationObserver | null = null;
    let poller: number | null = null;

    const root = document.documentElement;

    const renderWidget = () => {
      if (!widgetRef.current || !window.turnstile) return;

      if (typeof TURNSTILE_SITEKEY !== "string" || !TURNSTILE_SITEKEY) {
        console.error("[Turnstile] Missing/invalid VITE_TURNSTILE_SITEKEY");
        return;
      }

      // Clean mount
      widgetRef.current.innerHTML = "";

      const theme =
        root.getAttribute("data-theme") === "dark" ? "dark" : "light";

      const id = window.turnstile.render(widgetRef.current, {
        sitekey: TURNSTILE_SITEKEY,
        theme,
        appearance: "always",
        callback: (tok: string) => setToken(tok),
        "error-callback": () => setToken(null),
        "expired-callback": () => setToken(null),
      });

      widgetIdRef.current = id || null;
      hasRenderedRef.current = true;

      // Theme-Änderungen beobachten und Widget neu rendern
      themeObserver = new MutationObserver(() => {
        // reset + rerender
        try {
          if (widgetIdRef.current) window.turnstile?.reset(widgetIdRef.current);
        } catch {
          // ignore
        }
        hasRenderedRef.current = false; // erlauben, erneut zu rendern
        renderWidget();
      });
      themeObserver.observe(root, {
        attributes: true,
        attributeFilter: ["data-theme", "class"],
      });
    };

    // Warten bis Turnstile-Script geladen ist (polling bis 5s)
    const startedAt = Date.now();
    const tryRender = () => {
      if (window.turnstile && widgetRef.current) {
        renderWidget();
        if (poller) window.clearInterval(poller);
        poller = null;
        return;
      }
      if (Date.now() - startedAt > 5000) {
        if (poller) window.clearInterval(poller);
        poller = null;
        console.warn("[Turnstile] Script not ready after 5s.");
      }
    };
    tryRender();
    if (!hasRenderedRef.current && !poller) {
      poller = window.setInterval(tryRender, 150);
    }

    return () => {
      if (poller) window.clearInterval(poller);
      themeObserver?.disconnect();
    };
  }, [isInView]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot
    if (data.get("_gotcha")) {
      setState("ok");
      setShowToast("ok");
      form.reset();
      return;
    }

    if (!token) {
      setState("err");
      setShowToast("err");
      widgetRef.current?.querySelector("iframe")?.focus?.();
      return;
    }
    data.append("cf-turnstile-response", token);

    const endpoint = `https://formspree.io/f/${FORMSPREE_ID}`;
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      if (res.ok) {
        setState("ok");
        setShowToast("ok");
        form.reset();
        setToken(null);
        try {
          if (widgetIdRef.current) window.turnstile?.reset(widgetIdRef.current);
        } catch {
          // ignore
        }
      } else {
        setState("err");
        setShowToast("err");
      }
    } catch {
      setState("err");
      setShowToast("err");
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="grid gap-4 max-w-lg"
      noValidate
    >
      {/* Toast/Alert oben */}
      {showToast === "ok" && (
        <Alert kind="success" onClose={() => setShowToast(null)}>
          Thanks! I’ll get back to you soon.
        </Alert>
      )}
      {showToast === "err" && (
        <Alert kind="error" onClose={() => setShowToast(null)}>
          Sending failed. Please check the captcha and try again.
        </Alert>
      )}

      {/* Firma */}
      <label className="grid gap-1">
        <span className="text-sm">Firma (optional)</span>
        <input
          name="company"
          autoComplete="organization"
          className="input"
          placeholder="Your company"
          aria-label="Company"
        />
      </label>

      {/* Name */}
      <label className="grid gap-1">
        <span className="text-sm">Name</span>
        <input
          name="name"
          required
          autoComplete="name"
          className="input"
          placeholder="Your name"
          aria-label="Name"
        />
      </label>

      {/* E-Mail */}
      <label className="grid gap-1">
        <span className="text-sm">E-Mail</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="input"
          placeholder="you@example.com"
          aria-label="Email"
        />
      </label>

      {/* Nachricht */}
      <label className="grid gap-1">
        <span className="text-sm">Nachricht</span>
        <textarea
          name="message"
          required
          className="input min-h-32"
          placeholder="Your message"
          rows={8}
          minLength={10}
          aria-required="true"
          aria-label="Message"
        />
      </label>

      {/* Honeypot (versteckt) */}
      <input
        type="text"
        name="_gotcha"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {/* Turnstile-Widget (lazy gerendert wenn im Viewport) */}
      <div className="mt-2" aria-live="polite" aria-busy={state === "loading"}>
        <div ref={widgetRef} className="cf-turnstile" />
        <p className="sr-only">
          This form is protected by Cloudflare Turnstile to prevent spam.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="btn btn-primary"
          type="submit"
          disabled={state === "loading"}
          aria-busy={state === "loading"}
        >
          {state === "loading" ? "Sending…" : "Send"}
        </button>

        <a className="link" href="mailto:contact@khambazarov.dev">
          Prefer email? contact@khambazarov.dev
        </a>
      </div>
    </form>
  );
}
