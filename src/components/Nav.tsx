import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from "react";
import { useScrollSpy } from "../hooks/useScrollSpy";

/**
 * Konfiguration der Sektionen (IDs müssen zu deinen <Section id="..."> passen)
 */
const SECTIONS = [
  { id: "home", key: "nav.home" },
  { id: "about", key: "nav.about" },
  { id: "projects", key: "nav.projects" },
  { id: "experience", key: "nav.experience" },
  { id: "skills", key: "nav.skills" },
  { id: "contact", key: "nav.contact" },
] as const;

export function Nav() {
  const { t } = useTranslation();
  const ids = useMemo(() => SECTIONS.map((s) => s.id), []);
  
  const activeId = useScrollSpy(ids, {
    rootMargin: "-35% 0px -55% 0px",
    threshold: [0, 0.25, 0.5, 0.75, 1],
  });

  // Kleine State-Optimierung, um Re-Renders bei schnellem Scrollen zu dämpfen
  const [current, setCurrent] = useState<string | null>(null);
  useEffect(() => {
    if (activeId !== current) setCurrent(activeId);
  }, [activeId, current]);

  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-md dark:bg-neutral-900/70">
      <nav className="container-max flex h-14 items-center justify-between gap-4">
        {/* Brand */}
        <a href="#home" className="font-semibold tracking-tight">
          Renat Khambazarov
        </a>

        {/* Primäre Nav */}
        <ul className="hidden items-center gap-4 md:flex">
          {SECTIONS.map(({ id, key }) => {
            const isActive = current === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    // Grundstil
                    "relative inline-flex items-center px-2 py-1 text-sm transition-colors",
                    "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100",
                    // Aktiver Zustand
                    isActive
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-600 dark:text-gray-300",
                  ].join(" ")}
                >
                  {t(key)}
                  {/* Aktiver Indikator (dezent) */}
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

        {/* Mobile „Zum Kontakt“-Shortcut (pragmatisch ohne Burger) */}
        <div className="md:hidden">
          <a href="#contact" className="btn text-sm px-3 py-1.5">
            {t("nav.contact")}
          </a>
        </div>
      </nav>
    </header>
  );
}
