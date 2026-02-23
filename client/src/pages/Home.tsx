import Navbar from "@/components/layout/Navbar";
import ScrollProgress from "@/components/ui/scroll-progress";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Growth from "@/components/sections/Growth";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";
import CursorGlow from "@/components/ui/cursor-glow";
import AITerminal from "@/components/ui/ai-terminal";
import { NeuralAssistant } from "@/components/ui/neural-assistant";
import EasterEgg from "@/components/ui/easter-egg";
import TechStackBadge from "@/components/ui/tech-stack-badge";

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-primary selection:text-primary-foreground relative">
      {/* Fixed overlays */}
      <CursorGlow />
      <AITerminal />
      <NeuralAssistant />
      <EasterEgg />
      <ScrollProgress />
      <Navbar />

      {/* Page sections */}
      <Hero />

      <div id="skills"><Skills /></div>
      <div id="experience"><Experience /></div>
      <div id="certifications"><Certifications /></div>
      <div id="projects"><Projects /></div>
      <div id="growth"><Growth /></div>
      <div id="contact"><Contact /></div>

      {/* Footer */}
      <footer className="border-t border-foreground/10 text-center text-sm text-muted-foreground bg-background/40 backdrop-blur-sm">
        {/* Built with badge — in-page, not floating */}
        <TechStackBadge />
        <div className="container px-4 pb-10">
          <p className="mb-2 font-display font-medium text-foreground">DILPREET SINGH</p>
          <p>© 2026 • Designed with precision and crafted with passion.</p>
        </div>
      </footer>
    </main>
  );
}
