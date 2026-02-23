import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import Magnetic from "@/components/ui/magnetic";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "bg-background/95 md:bg-background/80 md:backdrop-blur-md border-b border-foreground/10 py-4" : "py-6 bg-transparent"
        }`}
    >
      <div className="container px-4 md:px-6 flex items-center justify-between">
        <a href="#" className="text-xl font-display font-bold tracking-tighter hover:text-primary transition-colors">
          DS.
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {['skills', 'experience', 'certifications', 'projects'].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="text-sm font-medium hover:text-primary transition-colors capitalize px-2 py-1 relative group"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
          <Magnetic>
            <Button variant="outline" className="rounded-full border-primary/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg shadow-primary/10" onClick={() => scrollTo('contact')}>
              Connect
            </Button>
          </Magnetic>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-background/95 backdrop-blur-xl border-foreground/10">
              <div className="flex flex-col gap-6 mt-10">
                <button onClick={() => scrollTo('skills')} className="text-lg font-medium hover:text-primary text-left">Skills</button>
                <button onClick={() => scrollTo('experience')} className="text-lg font-medium hover:text-primary text-left">Experience</button>
                <button onClick={() => scrollTo('certifications')} className="text-lg font-medium hover:text-primary text-left">Certifications</button>
                <button onClick={() => scrollTo('projects')} className="text-lg font-medium hover:text-primary text-left">Projects</button>
                <Button className="w-full mt-4" onClick={() => window.location.href = 'mailto:dilpreetsinghverma@gmail.com'}>Contact Me</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}
