import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  de: {
    common: {
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
          "Web & Software Engineer (MERN). Ich baue moderne, zugängliche UIs und skalierbare Services.",
        ctaProjects: "Projekte ansehen",
        ctaContact: "Kontakt",
      },
      footer: { imprint: "Impressum", privacy: "Datenschutz" },
    },
  },
  en: {
    common: {
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
          "Web & Software Engineer (MERN). I build modern, accessible UIs and scalable services.",
        ctaProjects: "View Projects",
        ctaContact: "Contact",
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
    fallbackLng: "de",
    defaultNS: "common",
    detection: {
      // 1) localStorage → 2) navigator.language → 3) html lang → 4) fallback
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
    interpolation: { escapeValue: false },
  });

// set <html lang="...">
i18n.on("languageChanged", (lng) => {
  document.documentElement.setAttribute("lang", lng || "de");
});

export default i18n;