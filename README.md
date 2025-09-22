# Renat Khambazarov — Portfolio

Modern single-page portfolio built with **Vite**, **React (TypeScript)**, and **Tailwind CSS v4**.  
Web & Software **Developer** (MERN) — dark/light theme, DE/EN i18n, ScrollSpy navigation, accessible components, and a privacy-friendly contact flow via **Formspree + Cloudflare Turnstile** (no backend).

## Tech Stack

- React + TypeScript (Vite)
- Tailwind CSS v4 (dark mode via `class`)
- i18next + react-i18next (DE/EN with browser detection)
- Cloudflare Turnstile + Formspree (contact form)
- Static hosting (IONOS)

## Features

- Sticky top navigation with ScrollSpy
- Sections: Home, About, Projects, Experience, Skills, Contact
- Accessible forms (labels, honeypot anti-spam, Turnstile verification)
- Theme persistence (`localStorage`), system preference respected; manual toggle
- SEO basics: title, description, canonical, Open Graph; JSON-LD Person schema
- Clean, mobile-first layout with WCAG-friendly focus styles

## Getting Started

```bash
npm install
npm run dev
```
