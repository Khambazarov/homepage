import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useScrollSpy } from "../hooks/useScrollSpy";

/**
 * Reihenfolge & i18n-Key jeder Section.
 * Achtung: IDs müssen exakt mit den Section-IDs im DOM übereinstimmen.
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
  const { t, i18n } = useTranslation();

  // --- Active section via scroll spy (dein Ansatz)

  const ids = useMemo(() => SECTIONS.map((s) => s.id), []);

  /**
   * Initial-Selection:
   * - wenn URL einen Hash (#about etc.) hat, übernehmen
   * - sonst "home"
   * So bleibt die Unterstreichung auch nach Reload auf dem richtigen Menüpunkt.
   */
  const initialCurrent = useMemo(() => {
    const fromHash = (window.location.hash || "").replace("#", "");
    return (ids as string[]).includes(fromHash) ? fromHash : "home";
  }, [ids]);

  const [current, setCurrent] = useState<string | null>(initialCurrent);

  /**
   * Spy-Optionen:
   * - rootMargin oben: -10% (Home bleibt stabil aktiv)
   * - rootMargin unten: -85% (um frühzeitiges Umschalten zu verhindern)
   * - thresholds: feinere Zwischenwerte
   */
  const spyOptions = useMemo(
    () => ({
      rootMargin: "-10% 0px -85% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1] as number[],
    }),
    []
  );

  // IntersectionObserver-basierte aktive ID
  const activeId = useScrollSpy(ids, spyOptions);

  // Wenn der Observer eine Section meldet, übernehmen wir sie
  useEffect(() => {
    if (activeId) setCurrent(activeId);
  }, [activeId]);

  /**
   * Hash-Navigation:
   * - Klick auf einen Menü-Link ändert den Hash; wir spiegeln das in `current`
   * - Außerdem einmal initial auslesen
   */
  useEffect(() => {
    const onHash = () => {
      const id = (window.location.hash || "").replace("#", "");
      if ((ids as string[]).includes(id)) setCurrent(id);
    };
    window.addEventListener("hashchange", onHash);
    onHash();
    return () => window.removeEventListener("hashchange", onHash);
  }, [ids]);

  /**
   * Fallback-Scroll (zusätzlich zum Observer):
   * - Wir bestimmen die aktive Section über eine "Aktivierungs-Linie"
   * - Das stabilisiert die Unterstreichung beim freien Scrollen
   */
  useEffect(() => {
    let ticking = false;

    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    const chooseByScroll = () => {
      const viewportY = window.scrollY;
      const vh = window.innerHeight;
      // Aktivierungs-Linie etwas oberhalb der Mitte → harmoniert mit rootMargin
      const activationLine = viewportY + vh * 0.3;

      // letzte Section, deren top <= activationLine
      let best: string | null = null;
      for (const el of els) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= activationLine) best = el.id;
        else break;
      }
      if (!best) best = ids[0]; // ganz oben → home

      setCurrent((prev) => (prev === best ? prev : best));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          chooseByScroll();
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll(); // Initial

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);

  // --- Theme toggle (persisted > system)
  const [isDark, setIsDark] = useState<boolean>(
    () =>
      document.documentElement.classList.contains("dark") ||
      document.documentElement.getAttribute("data-theme") === "dark"
  );

  /**
   * Bootstrap: falls localStorage ein Theme vorgibt, übernehmen und `isDark` setzen
   */
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

  /**
   * Manuelles Umschalten: gewinnt gegenüber System.
   * - setzt class und data-theme
   * - persistiert in localStorage
   */
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
    } catch {
      /* noop */
    }
    setIsDark(next === "dark");
  }

  // --- Language toggle: EIN Button → Label = Zielsprache (DE/EN)
  const lng = (i18n.resolvedLanguage || i18n.language || "en").toLowerCase();
  const isDE = lng.startsWith("de");
  const targetLang: "de" | "en" = isDE ? "en" : "de";
  const targetLabel = targetLang.toUpperCase();

  function toggleLang() {
    const next = targetLang;
    i18n.changeLanguage(next);
    // optional: URL-Param updaten, ohne Reload
    const url = new URL(window.location.href);
    url.searchParams.set("lng", next);
    window.history.replaceState({}, "", url.toString());
  }

  // --- Mobile menu: Glasmorphism-Overlay, kein Layout-Shift
  const [open, setOpen] = useState(false);
  function openMenu() {
    setOpen(true);
  }
  function closeMenu() {
    setOpen(false);
  }

  // ESC schließt das Menü
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

  // Nach dem Schließen einmal scroll-Event anstoßen → Fallback aktualisiert sofort
  useEffect(() => {
    if (!open) {
      requestAnimationFrame(() => window.dispatchEvent(new Event("scroll")));
    }
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
                  {/* Unterstreichung (animiert, nur sichtbar wenn aktiv) */}
                  <span
                    aria-hidden="true"
                    className={[
                      "absolute -bottom-1 left-1/2 h-0.5 w-12 -translate-x-1/2 rounded-full",
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

        {/* Actions: Sprache (Zielsprache), Theme, Burger */}
        <div className="flex items-center gap-1.5 md:gap-2">
          <button
            type="button"
            onClick={toggleLang}
            className="btn px-3 py-1.5 text-sm"
            aria-label={`Switch language to ${targetLabel}`}
            title={`Switch language to ${targetLabel}`}
          >
            {targetLabel}
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className="btn px-3 py-1.5 text-sm"
            aria-label="Toggle dark / light"
            title="Toggle dark / light"
          >
            {isDark ? "☀️" : "🌙"}
          </button>

          {/* Burger für Mobile */}
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

      {/* Mobile Overlay – Glasmorphism + Outside Click schließt */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={closeMenu} // Klick außerhalb schließt
          className={[
            "fixed top-14 left-0 right-0 bottom-0 z-50",
            "bg-white/10 dark:bg-black/20 backdrop-blur-md",
            "supports-[backdrop-filter]:backdrop-saturate-150",
          ].join(" ")}
        >
          <div
            className="container-max py-4"
            onClick={(e) => e.stopPropagation()} // Klicks innerhalb NICHT schließen
          >
            <div
              className={[
                "rounded-2xl border shadow-lg ring-1 ring-black/5",
                "bg-white/80 dark:bg-neutral-900/70 backdrop-blur-md",
              ].join(" ")}
            >
              <ul className="py-2 text-center" role="menu">
                {SECTIONS.map(({ id, key }) => {
                  const isActive = current === id;
                  return (
                    <li key={id} role="none">
                      <a
                        role="menuitem"
                        href={`#${id}`}
                        onClick={() => setOpen(false)} // Klick auf Link schließt Menü
                        className={[
                          "block px-4 py-2.5 text-base rounded-xl mx-1 my-0.5",
                          "text-gray-800 dark:text-gray-100",
                          "hover:bg-gray-100/70 dark:hover:bg-neutral-800/70",
                          isActive
                            ? "bg-gray-400/30 dark:bg-neutral-700/40 font-medium"
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
        </div>
      )}
    </header>
  );
}
