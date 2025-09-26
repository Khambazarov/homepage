import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  de: {
    common: {
      skipToContent: "Zum Inhalt springen",
      nav: {
        home: "Start",
        about: "Über mich",
        projects: "Projekte",
        experience: "Erfahrung",
        skills: "Skills",
        contact: "Kontakt",
      },
      hero: {
        title: "Hallo, ich bin Renat.",
        subtitle:
          "Web & Software Entwickler (MERN). Ich baue moderne, zugängliche UIs und skalierbare Services.",
        ctaProjects: "Projekte ansehen",
        ctaContact: "Kontakt",
      },
      about: {
        intro:
          "Ich entwickle moderne, zugängliche Frontends mit React/TypeScript und solide Backends mit Node.js/Express. Fokus: saubere Architektur, Performance und pragmatische DX.",
        cta: "Aktuell offen für spannende Projekte und Chancen.",
        languagesLine:
          "Sprachen: Englisch (C1, DCI-Zertifikat), Deutsch (C2, Muttersprache), Russisch (C2, Muttersprache), Tscherkessisch (C2, Muttersprache).",
      },
      experience: {
        items: [
          {
            role: "Tutor / Web & Software Developer",
            company: "DCI — Digital Career Institute",
            period: "2024 — heute",
            bullets: [
              "Studierende durch MERN-Projekte geführt (React, Node, Express, MongoDB).",
              "Code-Reviews, Debugging-Sessions, Best Practices & Accessibility.",
            ],
          },
          {
            role: "Full-Stack Developer (Freelance)",
            company: "Selbstständig",
            period: "2022 — heute",
            bullets: [
              "Kleine Apps & Websites mit React, TypeScript und Node ausgeliefert.",
              "CI/CD, Hosting sowie Domain/DNS für Kunden aufgesetzt.",
            ],
          },
        ],
      },
      skills: {
        categories: [
          {
            name: "Frontend",
            items: [
              "React",
              "TypeScript",
              "JavaScript",
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
            name: "Serverless/Hosting",
            items: ["Netlify", "Vercel", "Heroku", "Render", "DigitalOcean"],
          },
          {
            name: "Soft Skills",
            items: ["Code Reviews", "Mentoring", "A11y/UX", "Agile"],
          },
        ],
      },
      footer: { imprint: "Impressum", privacy: "Datenschutz" },
    },
  },
  en: {
    common: {
      skipToContent: "Skip to content",
      nav: {
        home: "Home",
        about: "About",
        projects: "Projects",
        experience: "Experience",
        skills: "Skills",
        contact: "Contact",
      },
      hero: {
        title: "Hello, I’m Renat.",
        subtitle:
          "Web & Software Developer (MERN). I build modern, accessible UIs and scalable services.",
        ctaProjects: "View Projects",
        ctaContact: "Contact",
      },
      about: {
        intro:
          "I build modern, accessible frontends with React/TypeScript and solid backends with Node.js/Express. Focus: clean architecture, performance, and pragmatic DX.",
        cta: "Currently open to exciting projects and opportunities.",
        languagesLine:
          "Languages: English (C1, DCI certificate), German (C2, native), Russian (C2, native), Circassian (C2, native).",
      },
      experience: {
        items: [
          {
            role: "Tutor / Web & Software Developer",
            company: "DCI — Digital Career Institute",
            period: "2024 — present",
            bullets: [
              "Guided students through MERN stack projects (React, Node, Express, MongoDB).",
              "Code reviews, debugging sessions, best practices, and accessibility.",
            ],
          },
          {
            role: "Full-Stack Developer (Freelance)",
            company: "Self-employed",
            period: "2022 — present",
            bullets: [
              "Delivered small apps and websites with React, TypeScript and Node.",
              "Set up CI/CD, hosting, and domain/DNS for clients.",
            ],
          },
        ],
      },
      skills: {
        categories: [
          {
            name: "Frontend",
            items: [
              "React",
              "TypeScript",
              "JavaScript",
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
            name: "Serverless/Hosting",
            items: ["Netlify", "Vercel", "Heroku", "Render", "DigitalOcean"],
          },
          {
            name: "Soft skills",
            items: ["Code reviews", "Mentoring", "A11y/UX", "Agile"],
          },
        ],
      },
      footer: { imprint: "Imprint", privacy: "Privacy" },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    defaultNS: "common",
    supportedLngs: ["de", "en"],
    nonExplicitSupportedLngs: true,
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
    interpolation: { escapeValue: false },
  });

document.documentElement.setAttribute("lang", i18n.resolvedLanguage || "en");
i18n.on("languageChanged", (lng) => {
  document.documentElement.setAttribute("lang", lng || "en");
});

export default i18n;
