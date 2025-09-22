import { useScrollSpy } from "../hooks/useScrollSpy";
import { useTheme } from "../hooks/useTheme";

const SECTIONS = [
  "home",
  "about",
  "projects",
  "experience",
  "skills",
  "contact",
];

export function Nav() {
  const active = useScrollSpy(SECTIONS);
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b bg-white/60 backdrop-blur dark:bg-black/40">
      <nav className="container-max flex items-center gap-6 py-3">
        <a href="#home" className="mr-auto font-semibold">
          Khambazarov.dev
        </a>

        {SECTIONS.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className={`text-sm font-medium transition ${
              active === id
                ? "text-gray-900 dark:text-gray-100"
                : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            }`}
          >
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </a>
        ))}

        {/* Theme Toggle */}
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
