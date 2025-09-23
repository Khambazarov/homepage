import { useEffect, useRef, useState } from "react";

type State = "idle" | "loading" | "ok" | "err";

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;
const TURNSTILE_SITEKEY = import.meta.env.VITE_TURNSTILE_SITEKEY;

// Cloudflare Turnstile ist global über das Script in index.html verfügbar
declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, any>) => void;
      reset: (widgetId?: string) => void;
    };
  }
}

export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [token, setToken] = useState<string | null>(null);
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);

  // Widget (re)rendern – initial und wenn sich das Theme ändert
  useEffect(() => {
    const root = document.documentElement;

    function renderWidget() {
      if (!widgetRef.current || !window.turnstile) return;
      // evtl. altes Widget zurücksetzen
      try { window.turnstile.reset(widgetIdRef.current ?? undefined); } catch {}
      const theme = root.getAttribute("data-theme") === "dark" ? "dark" : "light";

      widgetRef.current.innerHTML = ""; // clean mount
      // Turnstile rendert und gibt eine Widget-ID zurück – einige Bundles geben die ID über data-widget-id zurück
      window.turnstile.render(widgetRef.current, {
        sitekey: TURNSTILE_SITEKEY,
        theme,
        appearance: "always",
        callback: (tok: string) => setToken(tok),
        "error-callback": () => setToken(null),
        "expired-callback": () => setToken(null),
      });
    }

    renderWidget();

    // auf Theme-Umschaltung reagieren (when user toggles theme in Nav)
    const observer = new MutationObserver(() => renderWidget());
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme", "class"] });

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

    // Turnstile-Token sicherstellen
    if (!token) {
      setState("err");
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
        // Nach erfolgreichem Submit Widget zurücksetzen (neues Token bei nächster Interaktion)
        try { window.turnstile?.reset(widgetIdRef.current ?? undefined); } catch {}
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
          placeholder="How can I help?"
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
