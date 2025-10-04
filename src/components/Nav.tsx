import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useScrollSpy } from "../hooks/useScrollSpy";

const SECTIONS = [
  { id: "home", key: "nav.home" },
  { id: "about", key: "nav.about" },
  { id: "projects", key: "nav.projects" },
  { id: "experience", key: "nav.experience" },
  { id: "skills", key: "nav.skills" },
  { id: "contact", key: "nav.contact" },
] as const;

export function Nav() {
  const { t, i18n } = useTranslation();

  // --- Active section via scroll spy (dein Ansatz)
  const ids = useMemo(() => SECTIONS.map((s) => s.id), []);
  const activeId = useScrollSpy(ids, {
    rootMargin: "-35% 0px -55% 0px",
    threshold: [0, 0.25, 0.5, 0.75, 1],
  });
  const [current, setCurrent] = useState<string | null>(null);
  useEffect(() => {
    if (activeId !== current) setCurrent(activeId);
  }, [activeId, current]);

  // --- Theme toggle (persisted > system) – beibehalten
  const [isDark, setIsDark] = useState<boolean>(
    () =>
      document.documentElement.classList.contains("dark") ||
      document.documentElement.getAttribute("data-theme") === "dark"
  );

  useEffect(() => {
    try {
      const theme = localStorage.getItem("theme");
      if (theme === "dark" || theme === "light") {
        const root = document.documentElement;
        root.classList.toggle("dark", theme === "dark");
        root.setAttribute("data-theme", theme);
        setIsDark(theme === "dark");
      }
    } catch {
      /* noop */
    }
  }, []);

  function toggleTheme() {
    const root = document.documentElement;
    const next =
      root.getAttribute("data-theme") === "dark" ||
      root.classList.contains("dark")
        ? "light"
        : "dark";

    root.classList.toggle("dark", next === "dark");
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setIsDark(next === "dark");
  }

  // --- Language toggle: ein Button, Label = Zielsprache
  const lng = (i18n.resolvedLanguage || i18n.language || "en").toLowerCase();
  const isDE = lng.startsWith("de");
  const targetLang: "de" | "en" = isDE ? "en" : "de"; // Zielsprache
  const targetLabel = targetLang.toUpperCase();

  function toggleLang() {
    const next = targetLang;
    i18n.changeLanguage(next);
    const url = new URL(window.location.href);
    url.searchParams.set("lng", next);
    window.history.replaceState({}, "", url.toString());
  }

  // --- Mobile menu: solides Overlay unterhalb der Navbar (kein Shift)
  const [open, setOpen] = useState(false);
  function openMenu() {
    setOpen(true);
  }
  function closeMenu() {
    setOpen(false);
  }

  // ESC schließt
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeMenu();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Body-Scroll sperren, wenn offen
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b bg-white dark:bg-neutral-900">
      <nav className="container-max flex h-14 items-center justify-between gap-4">
        {/* Brand */}
        <a
          href="#home"
          className="font-semibold tracking-tight whitespace-nowrap text-sm lg:text-base"
        >
          Renat Khambazarov
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center md:gap-3 md:flex lg:gap-4">
          {SECTIONS.map(({ id, key }) => {
            const isActive = current === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "relative inline-flex items-center px-2 py-1 text-sm transition-colors",
                    "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100",
                    isActive ? "text-gray-900 dark:text-white" : "",
                  ].join(" ")}
                >
                  {t(key)}
                  <span
                    aria-hidden="true"
                    className={[
                      "absolute -bottom-1 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full",
                      "transition-opacity duration-200",
                      isActive
                        ? "opacity-100 bg-gray-900 dark:bg-gray-100"
                        : "opacity-0",
                    ].join(" ")}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Actions: Language (ein Button) + Theme + Mobile CTA/Burger */}
        <div className="flex items-center gap-1.5 md:gap-2">
          {/* Sprach-Toggle: Label ist Zielsprache */}
          <button
            type="button"
            onClick={toggleLang}
            className="btn px-3 py-1.5 text-sm"
            aria-label={`Switch language to ${targetLabel}`}
            title={`Switch language to ${targetLabel}`}
          >
            {targetLabel}
          </button>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="btn px-3 py-1.5 text-sm"
            aria-label="Toggle dark / light"
            title="Toggle dark / light"
          >
            {isDark ? "☀️" : "🌙"}
          </button>

          {/* Mobile: Kontakt-CTA & Burger */}
          {/* <a href="#contact" className="btn text-sm px-3 py-1.5 md:hidden">
            {t("nav.contact")}
          </a> */}
          <button
            type="button"
            onClick={open ? closeMenu : openMenu}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-xl border hover:bg-gray-50 dark:hover:bg-neutral-800"
            aria-label="Open menu"
            aria-haspopup="menu"
            aria-expanded={open}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Overlay (ohne Language/Theme – nur Links) */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed top-14 left-0 right-0 bottom-0 z-50 bg-white dark:bg-neutral-900"
        >
          {/* Kopf */}
          {/* <div className="container-max h-12 border-b flex items-center justify-between">
            <span className="font-medium">Menu</span>
            <button
              type="button"
              onClick={closeMenu}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border hover:bg-gray-50 dark:hover:bg-neutral-800"
              aria-label="Close menu"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div> */}

          {/* Links */}
          <div className="container-max py-3">
            <ul className="space-y-1" role="menu">
              {SECTIONS.map(({ id, key }) => {
                const isActive = current === id;
                return (
                  <li key={id} role="none">
                    <a
                      role="menuitem"
                      href={`#${id}`}
                      onClick={closeMenu}
                      className={[
                        "block rounded-lg px-3 py-2 text-base",
                        "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-800",
                        isActive
                          ? "bg-gray-100 dark:bg-neutral-800 font-medium"
                          : "",
                      ].join(" ")}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {t(key)}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
