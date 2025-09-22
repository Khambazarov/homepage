import { Nav } from "./components/Nav";
import { Section } from "./components/Section";
import { ProjectCard } from "./components/ProjectCard";
import { ContactForm } from "./components/ContactForm";
import { ExperienceItem } from "./components/ExperienceItem";
import { SkillsGrid } from "./components/SkillsGrid";
import { useTranslation } from "react-i18next";

export default function App() {
  const { t } = useTranslation();

  return (
    <>
      <Nav />
      <main id="content" className="container-max">
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
          <div className="grid gap-6 md:grid-cols-2">
            <ProjectCard
              title="Realtime Chat App"
              desc="Full-stack chat with authentication and websockets."
              stack={[
                "JavaScript",
                "React",
                "Tailwind",
                "Node",
                "Express",
                "Socket.io",
                "Socket.io-Client",
                "MongoDB",
                "Mongoose",
                "express-session",
                "bcrypt",
              ]}
              live="https://hello-word.khambazarov.dev/"
              repo="https://github.com/Khambazarov/hello-word/"
            />
            <ProjectCard
              title="Hello World Mailer"
              desc="Minimal demo for transactional email delivery."
              stack={["Node", "Express", "Nodemailer"]}
              live="https://hello-word.khambazarov.dev/"
              repo="https://github.com/Khambazarov/hello-word/"
              status="wip"
            />
          </div>
        </Section>
        <Section id="experience" title={t("nav.experience")}>
          <div className="grid gap-6">
            <ExperienceItem
              role="Tutor / Web & Software Engineer"
              company="DCI — Digital Career Institute"
              period="2024 — heute"
              bullets={[
                "Guided students through MERN stack projects (React, Node, Express, MongoDB).",
                "Code reviews, debugging sessions, best practices and accessibility.",
              ]}
            />
            <ExperienceItem
              role="Full-Stack Developer (Freelance)"
              company="Self-employed"
              period="2022 — heute"
              bullets={[
                "Delivered small apps and websites with React, TypeScript and Node.",
                "Set up CI/CD, hosting, and domain/DNS for clients.",
              ]}
            />
          </div>
        </Section>

        <Section id="skills" title={t("nav.skills")}>
          <SkillsGrid
            categories={[
              {
                name: "Frontend",
                items: [
                  "React",
                  "JavaScript",
                  "TypeScript",
                  "Tailwind CSS",
                  "Vite",
                ],
              },
              {
                name: "Backend",
                items: ["Node.js", "Express", "REST APIs", "Socket.io"],
              },
              {
                name: "Data & Infra",
                items: ["MongoDB", "Mongoose", "Linux", "Git/GitHub", "CI/CD"],
              },
              {
                name: "Serverless",
                items: ["Vercel", "Netlify", "Render", "DigitalOcean"],
              },
              {
                name: "Languages",
                items: [
                  "English — C1 (DCI certificate)",
                  "German — native (C2)",
                  "Russian — native (C2)",
                  "Circassian — native (C2)",
                ],
              },
            ]}
          />
        </Section>

        <Section id="contact" title={t("nav.contact")}>
          <ContactForm />
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
