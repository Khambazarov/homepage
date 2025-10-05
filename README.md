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

## Environment

Create a local `.env` from `.env.example`

## Getting Started

```bash
npm install
```

```bash
npm run dev
```

## Commit message guide (Conventional Commits)

#### Rules

- **Subject**: ≤ 50 characters, imperative mood (“add,” “fix,” “refactor”), no period at the end

- **Body**: optional, ≤ 72 characters per line; explains what and why

- **Footer**: Breaking changes + Issue-Refs

#### Types

- **feat**: New Function / user-facing change

- **fix**: Bugfix

- **docs**: Doc/README/Comment

- **style**: Formatting, no logic

- **refactor**: Code restructuring without behavior change

- **perf**: Performance improvement

- **test**: Tests

- **build**: Build-Tools/Deps/Bundling

- **ci**: CI configuration

- **chore**: Maintenance/housekeeping (e.g., bumping depots)

- **revert**: Revert a commit

#### Example

```bash
git add Nav.tsx

git commit -m "feat(nav): add glassmorphism mobile menu" -m \
"Implement blurred overlay, outside-click to close, and hash/scroll sync
for active state on mobile."
```
