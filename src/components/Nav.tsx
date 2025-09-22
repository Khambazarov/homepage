import { useScrollSpy } from "../hooks/useScrollSpy";

const SECTIONS = ["home","about","projects","experience","skills","contact"];

export function Nav() {
  const active = useScrollSpy(SECTIONS);
  return (
    <header className="sticky top-0 z-50 border-b bg-white/60 backdrop-blur">
      <nav className="container-max flex items-center gap-6 py-3">
        <a href="#home" className="mr-auto font-semibold">Khambazarov.dev</a>
        {SECTIONS.map(id => (
          <a key={id} href={`#${id}`}
             className={`text-sm font-medium transition ${active===id ? "text-gray-900" : "text-gray-500 hover:text-gray-900"}`}>
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </a>
        ))}
      </nav>
    </header>
  );
}
