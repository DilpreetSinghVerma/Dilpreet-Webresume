import Navbar from "@/components/layout/Navbar";
import ScrollProgress from "@/components/ui/scroll-progress";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";
import CursorGlow from "@/components/ui/cursor-glow";
import AITerminal from "@/components/ui/ai-terminal";

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-primary selection:text-primary-foreground relative">
      <CursorGlow />
      <AITerminal />
      <ScrollProgress />
      <Navbar />

      <Hero />

      <div id="skills">
        <Skills />
      </div>

      <div id="experience">
        <Experience />
      </div>

      <div id="certifications">
        <Certifications />
      </div>

      <div id="projects">
        <Projects />
      </div>

      <div id="contact">
        <Contact />
      </div>

      <footer className="py-12 border-t border-foreground/10 text-center text-sm text-muted-foreground bg-background/40 backdrop-blur-sm">
        <div className="container px-4">
          <p className="mb-2 font-display font-medium text-foreground">DILPREET SINGH</p>
          <p>© 2025 • Designed with precision and crafted with passion.</p>
          <p className="mt-4 text-xs opacity-50">Built with React 19, Tailwind CSS 4 & Three.js</p>
        </div>
      </footer>
    </main>
  );
}
