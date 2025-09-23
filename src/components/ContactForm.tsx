import { useEffect, useRef, useState } from "react";

type State = "idle" | "loading" | "ok" | "err";

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;
const TURNSTILE_SITEKEY = import.meta.env.VITE_TURNSTILE_SITEKEY;

// Cloudflare Turnstile global (über <script> in index.html)
declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string; // <- gibt Widget-ID zurück
      reset: (widgetId?: string) => void;
    };
  }
}

export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [token, setToken] = useState<string | null>(null);
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);

  // Turnstile mounten & bei Theme-Wechsel neu rendern
  useEffect(() => {
    const root = document.documentElement;

    function renderWidget() {
      if (!widgetRef.current || !window.turnstile) return;

      // ggf. altes Widget zurücksetzen
      try {
        if (widgetIdRef.current) window.turnstile.reset(widgetIdRef.current);
      } catch {
        // ignore
      }

      const theme =
        root.getAttribute("data-theme") === "dark" ? "dark" : "light";

      // Clean mount
      widgetRef.current.innerHTML = "";

      // Rendern und Widget-ID merken
      const id = window.turnstile.render(widgetRef.current, {
        sitekey: TURNSTILE_SITEKEY,
        theme,
        appearance: "always",
        callback: (tok: string) => setToken(tok),
        "error-callback": () => setToken(null),
        "expired-callback": () => setToken(null),
      });

      widgetIdRef.current = id || null;
    }

    renderWidget();

    // Auf Theme-Umschaltung reagieren
    const observer = new MutationObserver(() => renderWidget());
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    });

    return () => observer.disconnect();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot
    if (data.get("_gotcha")) {
      setState("ok");
      form.reset();
      return;
    }

    // Captcha-Token erforderlich
    if (!token) {
      setState("err");
      // Fokus ans Widget (falls möglich)
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

      setState(res.ok ? "ok" : "err");

      if (res.ok) {
        form.reset();
        setToken(null);
        // Neues Token für nächste Submission
        try {
          if (widgetIdRef.current) window.turnstile?.reset(widgetIdRef.current);
        } catch {
          // ignore
        }
      }
    } catch {
      setState("err");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 max-w-lg" noValidate>
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

      {/* Turnstile-Widget */}
      <div className="mt-2" aria-live="polite" aria-busy={state === "loading"}>
        <div ref={widgetRef} className="cf-turnstile" />
        <p className="sr-only">
          This form is protected by Cloudflare Turnstile to prevent spam.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="btn"
          type="submit"
          disabled={state === "loading"}
          aria-busy={state === "loading"}
        >
          {state === "loading" ? "Sending…" : "Send"}
        </button>

        {state === "ok" && (
          <span className="text-sm text-green-600">
            Thanks! I’ll get back to you soon.
          </span>
        )}
        {state === "err" && (
          <span className="text-sm text-red-600">
            Sending failed. Please check the captcha and try again.
          </span>
        )}
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400">
        Prefer email?{" "}
        <a className="underline" href="mailto:contact@khambazarov.dev">
          contact@khambazarov.dev
        </a>
      </p>
    </form>
  );
}
