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
    nonExplicitSupportedLngs: true, // mappt z.B. de-DE → de
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
    interpolation: { escapeValue: false },
  });

// <html lang="...">
document.documentElement.setAttribute("lang", i18n.resolvedLanguage || "en");
i18n.on("languageChanged", (lng) => {
  document.documentElement.setAttribute("lang", lng || "en");
});

export default i18n;
