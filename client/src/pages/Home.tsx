import Navbar from "@/components/layout/Navbar";
import ScrollProgress from "@/components/ui/scroll-progress";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Certifications from "@/components/sections/Certifications";

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-primary selection:text-primary-foreground relative z-10">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <div id="skills"><Skills /></div>
      <div id="experience"><Experience /></div>
      <div id="certifications"><Certifications /></div>
      <Projects />
      
      <footer className="py-8 border-t border-white/10 text-center text-sm text-muted-foreground">
        <p>© 2025 Dilpreet Singh. Built with React, Tailwind & Three.js</p>
      </footer>
    </main>
  );
}
