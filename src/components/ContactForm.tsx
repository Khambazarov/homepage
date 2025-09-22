import { useState } from "react";

type State = "idle" | "loading" | "ok" | "err";

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;

export function ContactForm() {
  const [state, setState] = useState<State>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: Bots füllen das Feld -> wir tun so, als wäre alles ok
    if (data.get("_gotcha")) {
      setState("ok");
      form.reset();
      return;
    }

    const endpoint = `https://formspree.io/f/${FORMSPREE_ID}`;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      setState(res.ok ? "ok" : "err");
      if (res.ok) form.reset();
    } catch {
      setState("err");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 max-w-lg" noValidate>
      {/* Firmname */}

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

      {/* Honeypot (versteckt) */}
      <input
        type="text"
        name="_gotcha"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

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
