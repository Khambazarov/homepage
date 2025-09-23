import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from "react";
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

  // Scroll-Spy
  const ids = useMemo(() => SECTIONS.map((s) => s.id), []);
  const activeId = useScrollSpy(ids, {
    rootMargin: "-35% 0px -55% 0px",
    threshold: [0, 0.25, 0.5, 0.75, 1],
  });
  const [current, setCurrent] = useState<string | null>(null);
  useEffect(() => {
    if (activeId !== current) setCurrent(activeId);
  }, [activeId, current]);

  // Theme-State (Icon steuern) – initial aus DOM ableiten
  const [isDark, setIsDark] = useState<boolean>(() =>
    document.documentElement.classList.contains("dark")
  );
  // Bootstrapping aus localStorage (falls vorhanden)
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
    const next = root.classList.contains("dark") ? "light" : "dark";
    root.classList.toggle("dark", next === "dark");
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* noop */
    }
    setIsDark(next === "dark");
  }

  // Language toggle (persistiert via i18next-browser-languagedetector)
  const lng = (i18n.resolvedLanguage || i18n.language || "en").toLowerCase();
  const isDE = lng.startsWith("de");
  const isEN = lng.startsWith("en");
  function setLang(code: "de" | "en") {
    if (!lng.startsWith(code)) i18n.changeLanguage(code);
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-md dark:bg-neutral-900/70">
      <nav className="container-max flex h-14 items-center justify-between gap-4">
        {/* Brand */}
        <a href="#home" className="font-semibold tracking-tight">
          Renat Khambazarov
        </a>

        {/* Primary nav */}
        <ul className="hidden items-center gap-4 md:flex">
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

        {/* Actions: Language + Theme + Mobile CTA */}
        <div className="flex items-center gap-2">
          {/* Language toggle (Desktop) */}
          <div className="hidden md:flex items-center gap-1" aria-label="Language">
            <button
              type="button"
              onClick={() => setLang("de")}
              className={[
                "px-2 py-1 text-xs rounded-md border",
                isDE
                  ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                  : "bg-transparent text-gray-700 dark:text-gray-200",
              ].join(" ")}
              aria-pressed={isDE}
              title="Deutsch"
            >
              DE
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={[
                "px-2 py-1 text-xs rounded-md border",
                isEN
                  ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                  : "bg-transparent text-gray-700 dark:text-gray-200",
              ].join(" ")}
              aria-pressed={isEN}
              title="English"
            >
              EN
            </button>
          </div>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="btn px-3 py-1.5 text-sm"
            aria-label="Toggle dark / light"
            title="Toggle dark / light"
          >
            {isDark ? "🌙" : "☀️"}
          </button>

          {/* Mobile CTA */}
          <a href="#contact" className="btn text-sm px-3 py-1.5 md:hidden">
            {t("nav.contact")}
          </a>
        </div>
      </nav>
    </header>
  );
}
