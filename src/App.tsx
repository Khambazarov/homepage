import { useEffect, useMemo } from "react";
import { useScrollSpy } from "./hooks/useScrollSpy";
import { useTranslation } from "react-i18next";

import { Nav } from "./components/Nav";
import { Section } from "./components/Section";
import { ProjectCard } from "./components/ProjectCard";
import { ExperienceItem } from "./components/ExperienceItem";
import { SkillsGrid } from "./components/SkillsGrid";
import { ContactForm } from "./components/ContactForm";
import { Timeline, TimelineItem } from "./components/Timeline";

// --- Types aus i18n-Ressourcen (Experience/Skills)
type ExpItem = {
  role: string;
  company: string;
  period: string;
  bullets?: string[];
  companyUrl?: string;
  location?: string;
  maxBulletsMobile?: number;
};

type SkillCategory = {
  name: string;
  items: string[];
};

export default function App() {
  const { t } = useTranslation();

  // Aktive Section ermitteln (wie in Nav)
  const sectionIds = useMemo(
    () => ["home", "about", "projects", "experience", "skills", "contact"],
    []
  );
  const activeId = useScrollSpy(sectionIds, {
    rootMargin: "-35% 0px -55% 0px",
    threshold: [0, 0.25, 0.5, 0.75, 1],
  });

  // i18n: Experience/Skills aus Resources (bei Sprachwechsel neu berechnen)
  const expItems = useMemo(
    () =>
      (t("experience.items", {
        returnObjects: true,
      }) as unknown as ExpItem[]) ?? [],
    [t]
  );

  const skillCats = useMemo(
    () =>
      (t("skills.categories", {
        returnObjects: true,
      }) as unknown as SkillCategory[]) ?? [],
    [t]
  );

  // Dokumenttitel dynamisch setzen
  useEffect(() => {
    const map: Record<string, string> = {
      home: t("nav.home"),
      about: t("nav.about"),
      projects: t("nav.projects"),
      experience: t("nav.experience"),
      skills: t("nav.skills"),
      contact: t("nav.contact"),
    };
    const base = "Renat Khambazarov — Portfolio";
    document.title =
      activeId && map[activeId] ? `${map[activeId]} — ${base}` : base;

    // Optional: Hash in URL pflegen, ohne Scroll-Jump
    // if (activeId) history.replaceState(null, "", `#${activeId}`);
  }, [activeId, t]);

  return (
    <>
      {/* Skip-Link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-white dark:focus:bg-neutral-900 focus:text-black dark:focus:text-white focus:px-3 focus:py-2 focus:shadow"
      >
        {t("skipToContent")}
      </a>

      <Nav />

      <main id="main" role="main" className="container-max">
        {/* Home / Hero */}
        <Section id="home">
          <h1 className="text-4xl md:text-[2.5rem] lg:text-5xl font-bold leading-[1.15] mb-4">
            {t("hero.title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-prose">
            {t("hero.subtitle")}
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#projects" className="btn btn-outline">
              {t("hero.ctaProjects")}
            </a>
            <a href="#contact" className="btn btn-primary">
              {t("hero.ctaContact")}
            </a>
          </div>
        </Section>

        {/* About */}
        <Section id="about" title={t("nav.about")}>
          <p className="text-gray-700 dark:text-gray-300 max-w-prose mt-1.5">
            {t("about.intro")}
          </p>
          <p className="mt-1.5 text-gray-700 dark:text-gray-300 max-w-prose">
            {t("about.cta")}
          </p>
          <p className="mt-1.5 text-gray-700 dark:text-gray-300 max-w-prose">
            {t("about.languagesLine")}
          </p>
        </Section>

        {/* ================= Projects ================= */}
        <Section id="projects" title={t("nav.projects")}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Realtime Chat App */}
            <ProjectCard
              title="Realtime Chat App"
              desc="Full-stack chat with auth, sessions, and websockets."
              stack={[
                "React",
                "JavaScript (ES6+)",
                "Tailwind CSS",
                "Zod",
                "Node.js",
                "Express",
                "Socket.io",
                "MongoDB",
                "Mongoose",
                "bcrypt",
                "express-session",
              ]}
              live="https://hello-word.khambazarov.dev/"
              repo="https://github.com/Khambazarov/hello-word/"
              status="live"
            />

            {/* My previous Portfolio */}
            <ProjectCard
              title="My previous portfolio"
              desc="This very website, built with React, TypeScript, and Tailwind CSS."
              stack={["ReactTS", "Tailwind CSS", "Vite", "i18next"]}
              live="https://khambazarov.dev/"
              repo="https://github.com/Khambazarov/portfolio/"
              status="live"
            />

            {/* Fensterputzer A&G */}
            <ProjectCard
              title="Fensterputzer A&G"
              desc="Website for a local window cleaning business."
              stack={["ReactTS", "Tailwind CSS", "Vite"]}
              live="https://fensterputzer-ag.de/"
              repo="https://github.com/Khambazarov/fensterputzer/"
              status="wip"
            />

            {/* Randomizer App */}
            <ProjectCard
              title="Randomizer App"
              desc="Generate random groups and make decisions."
              stack={["ReactJS", "CSS", "Vite"]}
              live="https://randomizer.khambazarov.dev/"
              repo="https://github.com/Khambazarov/random-generator/"
              status="live"
            />

            {/* Weather App */}
            <ProjectCard
              title="Weather App"
              desc="Clean UI for current weather and forecast."
              stack={["ReactTS", "CSS", "OpenWeather API"]}
              live="https://weather.khambazarov.dev/"
              repo="https://github.com/Khambazarov/weather-ts/"
              status="live"
            />

            {/* Task Manager App */}
            <ProjectCard
              title="Task Manager App"
              desc="Simple to-do app with task management features."
              stack={["ReactJS", "Material-UI", "SCSS"]}
              live="https://todo.khambazarov.dev/"
              repo="https://github.com/Khambazarov/todo/"
              status="live"
            />
          </div>
        </Section>

        {/* Experience */}
        <Section id="experience" title={t("nav.experience")}>
          <Timeline>
            {expItems.map((it) => (
              <TimelineItem key={`${it.role}-${it.company}-${it.period}`}>
                <ExperienceItem
                  role={it.role}
                  company={it.company}
                  period={it.period}
                  bullets={it.bullets}
                  companyUrl={it.companyUrl}
                  location={it.location}
                  maxBulletsMobile={it.maxBulletsMobile}
                />
              </TimelineItem>
            ))}
          </Timeline>
        </Section>

        {/* Skills */}
        <Section id="skills" title={t("nav.skills")}>
          <SkillsGrid categories={skillCats} />
        </Section>

        {/* Contact */}
        <Section id="contact" title={t("nav.contact")}>
          <ContactForm />
        </Section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t">
        <div className="container-max py-8 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 w-full">
            <span>© {new Date().getFullYear()} Khambazarov</span>

            {/* Legal + Social as icon buttons */}
            <div
              className="md:ml-auto flex items-center gap-2"
              aria-label="Links"
            >
              {/* Impressum */}
              <a
                href="/impressum.html"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border hover:bg-gray-50 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 dark:focus:ring-gray-600 transition"
                aria-label="Impressum"
                title="Impressum"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6zM14 3.5 18.5 8H14V3.5zM8 11h8v1.5H8V11zm0 4h8v1.5H8V15z" />
                </svg>
                <span className="sr-only">Impressum</span>
              </a>

              {/* Datenschutz */}
              <a
                href="/privacy.html"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border hover:bg-gray-50 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 dark:focus:ring-gray-600 transition"
                aria-label="Datenschutz"
                title="Datenschutz"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3zm0 2.1 6 2.2v4.7c0 4-2.7 8-6 9.2-3.3-1.2-6-5.2-6-9.2V6.3l6-2.2zM11 7h2v5h-2V7zm0 6h2v2h-2v-2z" />
                </svg>
                <span className="sr-only">Datenschutz</span>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/Khambazarov/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border hover:bg-gray-50 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 dark:focus:ring-gray-600 transition"
                aria-label="GitHub"
                title="GitHub"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.19-3.37-1.19-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.6.07-.6 1 .07 1.53 1.04 1.53 1.04.9 1.53 2.36 1.09 2.93.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.93 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.8c.85 0 1.7.12 2.5.34 1.9-1.29 2.74-1.02 2.74-1.02 .55 1.37.21 2.39.1 2.64.64.7 1.03 1.6 1.03 2.68 0 3.83-2.34 4.67-4.57 4.92.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
                </svg>
                <span className="sr-only">GitHub</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/khambazarov/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border hover:bg-gray-50 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8 8.5h3.8v2h.05c.53-1 1.84-2.05 3.78-2.05 4.04 0 4.79 2.66 4.79 6.12V23h-4v-5.9c0-1.41-.02-3.23-1.97-3.23-1.98 0-2.28 1.54-2.28 3.13V23H8V8.5z" />
                </svg>
                <span className="sr-only">LinkedIn</span>
              </a>

              {/* E-Mail */}
              <a
                href="mailto:contact@khambazarov.dev"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border hover:bg-gray-50 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 dark:focus:ring-emerald-600 transition"
                aria-label="Email"
                title="Email"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z" />
                </svg>
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
