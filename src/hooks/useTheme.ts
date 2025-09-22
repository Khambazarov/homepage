import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // SSR-safe: nur initialer Wert, wirkliche DOM-Manipulation in useEffect
    return (document.documentElement.getAttribute("data-theme") as Theme) || "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    root.setAttribute("data-theme", theme);
    try { localStorage.setItem("theme", theme); } catch {}
  }, [theme]);

  const toggle = () => setTheme(prev => (prev === "dark" ? "light" : "dark"));

  return { theme, setTheme, toggle };
}
