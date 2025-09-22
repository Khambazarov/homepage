import { Nav } from "./components/Nav";
import { Section } from "./components/Section";
import { useTranslation } from "react-i18next";

export default function App() {
  const { t } = useTranslation();

  return (
    <>
      <Nav />
      <main className="container-max">
        <Section id="home">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {t("hero.title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-prose">
            {t("hero.subtitle")}
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href="#projects"
              className="btn border-gray-900 dark:border-gray-200"
            >
              {t("hero.ctaProjects")}
            </a>
            <a href="#contact" className="btn">
              {t("hero.ctaContact")}
            </a>
          </div>
        </Section>

        <Section id="about" title={t("nav.about")}>
          <p className="text-gray-700 dark:text-gray-300 max-w-prose">
            Short intro, USP, and tech focus.
          </p>
        </Section>

        <Section id="projects" title={t("nav.projects")}>
          {/* TODO */}
        </Section>
        <Section id="experience" title={t("nav.experience")}>
          {/* TODO */}
        </Section>
        <Section id="skills" title={t("nav.skills")}>
          {/* TODO */}
        </Section>
        <Section id="contact" title={t("nav.contact")}>
          {/* TODO */}
        </Section>
      </main>

      <footer className="mt-16 border-t">
        <div className="container-max py-8 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6">
            <span>© {new Date().getFullYear()} Khambazarov</span>
            <a href="/impressum.html">{t("footer.imprint")}</a>
            <a href="/privacy.html">{t("footer.privacy")}</a>
            <a
              href="https://github.com/Khambazarov/"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              title="GitHub"
              className="sr-only md:not-sr-only"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/khambazarov/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
              className="sr-only md:not-sr-only"
            >
              LinkedIn
            </a>
            <a
              href="mailto:contact@khambazarov.dev"
              target="_blank"
              rel="noreferrer"
              aria-label="Email"
              className="sr-only md:not-sr-only"
              title="Email"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
