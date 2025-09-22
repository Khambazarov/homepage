import { useScrollSpy } from "../hooks/useScrollSpy";
import { useTheme } from "../hooks/useTheme";
import { useTranslation } from "react-i18next";

const IDS = ["home", "about", "projects", "experience", "skills", "contact"];

export function Nav() {
  const active = useScrollSpy(IDS);
  const { theme, toggle } = useTheme();
  const { t, i18n } = useTranslation();

  return (
    <>
      {/* Skip link for keyboard users */}
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-xl focus:bg-white focus:px-3 focus:py-2 focus:shadow dark:focus:bg-black"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-50 border-b bg-white/60 backdrop-blur dark:bg-black/40">
        <nav
          className="container-max flex items-center gap-3 py-3"
          aria-label="Primary"
        >
          <a href="#home" className="mr-auto font-semibold">
            Khambazarov.dev
          </a>

          {IDS.map((id) => {
            const isActive = active === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                aria-current={isActive ? "page" : undefined}
                className={`text-sm font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400 dark:focus-visible:ring-gray-600 focus-visible:rounded-md
                  ${
                    isActive
                      ? "text-gray-900 dark:text-gray-100"
                      : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  }`}
              >
                {t(`nav.${id}`)}
              </a>
            );
          })}

          {/* Language toggle */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => i18n.changeLanguage("de")}
              aria-pressed={i18n.resolvedLanguage?.startsWith("de")}
              className="rounded-xl border px-2 py-1 text-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400 dark:focus-visible:ring-gray-600"
              title="Deutsch"
            >
              DE
            </button>
            <button
              type="button"
              onClick={() => i18n.changeLanguage("en")}
              aria-pressed={i18n.resolvedLanguage?.startsWith("en")}
              className="rounded-xl border px-2 py-1 text-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400 dark:focus-visible:ring-gray-600"
              title="English"
            >
              EN
            </button>
          </div>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggle}
            aria-pressed={theme === "dark"}
            aria-label={
              theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
            }
            className="ml-2 rounded-2xl border px-3 py-1 text-sm shadow-sm hover:shadow transition outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400 dark:focus-visible:ring-gray-600"
            title={theme === "dark" ? "Light" : "Dark"}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </nav>
      </header>
    </>
  );
}
