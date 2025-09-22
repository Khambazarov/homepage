import { Nav } from "./components/Nav";
import { Section } from "./components/Section";

export default function App() {
  return (
    <>
      <Nav />
      <main className="container-max">
        <Section id="home">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Hello, I’m <span className="underline decoration-4">Khambazarov</span>.
          </h1>
          <p className="text-gray-600 max-w-prose">
            Web & Software Engineer (MERN). I build modern, accessible UIs and scalable services.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#projects" className="btn border-gray-900">View Projects</a>
            <a href="#contact" className="btn">Contact</a>
          </div>
        </Section>

        <Section id="about" title="About">
          <p className="text-gray-700 max-w-prose">Short intro, USP, and tech focus.</p>
        </Section>

        <Section id="projects" title="Projects">
          {/* TODO: Project cards */}
        </Section>

        <Section id="experience" title="Experience">
          {/* TODO: Timeline items */}
        </Section>

        <Section id="skills" title="Skills">
          {/* TODO: Tech badges */}
        </Section>

        <Section id="contact" title="Contact">
          {/* TODO: Contact form */}
        </Section>
      </main>

      <footer className="mt-16 border-t">
        <div className="container-max py-8 text-sm text-gray-500">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6">
            <span>© {new Date().getFullYear()} Khambazarov</span>
            <a href="/impressum.html">Imprint</a>
            <a href="/privacy.html">Privacy</a>
            <a href="https://github.com/Khambazarov" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/..." target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </footer>
    </>
  );
}
