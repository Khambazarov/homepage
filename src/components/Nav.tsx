import { useScrollSpy } from "../hooks/useScrollSpy";
import { useTheme } from "../hooks/useTheme";
import { useTranslation } from "react-i18next";

const IDS = ["home", "about", "projects", "experience", "skills", "contact"];

export function Nav() {
  const active = useScrollSpy(IDS);
  const { theme, toggle } = useTheme();
  const { t, i18n } = useTranslation();

  return (
    <header className="sticky top-0 z-50 border-b bg-white/60 backdrop-blur dark:bg-black/40">
      <nav className="container-max flex items-center gap-3 py-3">
        <a href="#home" className="mr-auto font-semibold">
          Khambazarov.dev
        </a>

        {IDS.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className={`text-sm font-medium transition ${
              active === id
                ? "text-gray-900 dark:text-gray-100"
                : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            }`}
          >
            {t(`nav.${id}`)}
          </a>
        ))}

        {/* Language toggle */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => i18n.changeLanguage("de")}
            aria-pressed={i18n.resolvedLanguage?.startsWith("de")}
            className="rounded-xl border px-2 py-1 text-sm"
            title="Deutsch"
          >
            DE
          </button>
          <button
            type="button"
            onClick={() => i18n.changeLanguage("en")}
            aria-pressed={i18n.resolvedLanguage?.startsWith("en")}
            className="rounded-xl border px-2 py-1 text-sm"
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
          className="ml-2 rounded-2xl border px-3 py-1 text-sm shadow-sm hover:shadow transition"
          title={theme === "dark" ? "Light" : "Dark"}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </nav>
    </header>
  );
}
