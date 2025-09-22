import { useEffect, useRef, useState } from "react";

type State = "idle" | "loading" | "ok" | "err";

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;
const TURNSTILE_SITEKEY = import.meta.env.VITE_TURNSTILE_SITEKEY;

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: any) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [token, setToken] = useState<string>("");
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);

  // Render Turnstile widget sobald Script verfügbar ist
  useEffect(() => {
    const int = setInterval(() => {
      if (
        window.turnstile &&
        widgetRef.current &&
        !widgetIdRef.current &&
        TURNSTILE_SITEKEY
      ) {
        widgetIdRef.current = window.turnstile.render(widgetRef.current, {
          sitekey: TURNSTILE_SITEKEY,
          theme: document.documentElement.classList.contains("dark")
            ? "dark"
            : "light",
          callback: (t: string) => setToken(t),
          "error-callback": () => setToken(""),
          "expired-callback": () => setToken(""),
        });
      }
    }, 200);
    return () => clearInterval(int);
  }, []);

  // Theme-Wechsel → Widget neu initialisieren (optional, verbessert UX)
  useEffect(() => {
    const obs = new MutationObserver(() => {
      if (!widgetIdRef.current || !window.turnstile) return;
      window.turnstile.reset(widgetIdRef.current);
      setToken("");
    });
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!FORMSPREE_ID) return; // Safety net
    setState("loading");

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot
    if (data.get("_gotcha")) {
      setState("ok");
      form.reset();
      return;
    }

    // Turnstile-Token anhängen (gängiges Feld; viele Provider erkennen es)
    if (token) data.set("cf-turnstile-response", token);

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
        setToken("");
        if (window.turnstile && widgetIdRef.current)
          window.turnstile.reset(widgetIdRef.current);
      }
    } catch {
      setState("err");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 max-w-lg" noValidate>
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

      {/* Honeypot */}
      <input
        type="text"
        name="_gotcha"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {/* Turnstile Widget */}
      {TURNSTILE_SITEKEY ? <div ref={widgetRef} className="mt-2" /> : null}

      <div className="flex items-center gap-3">
        <button
          className="btn"
          type="submit"
          disabled={state === "loading" || (!!TURNSTILE_SITEKEY && !token)}
          aria-busy={state === "loading"}
          title={
            !!TURNSTILE_SITEKEY && !token
              ? "Please complete verification"
              : undefined
          }
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
            Sending failed. Please try again later.
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
