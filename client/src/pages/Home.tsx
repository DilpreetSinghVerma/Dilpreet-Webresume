import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      
      <footer className="py-8 border-t border-white/10 text-center text-sm text-muted-foreground">
        <p>© 2025 Dilpreet Singh. Built with React, Tailwind & Three.js</p>
      </footer>
    </main>
  );
}
