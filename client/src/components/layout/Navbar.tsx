import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, Sun, Moon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import Magnetic from "@/components/ui/magnetic";
import MusicPlayer from "@/components/ui/music-player";


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [clockTime, setClockTime] = useState("");
  const [isDay, setIsDay] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    setIsDark(true);

    const updateClock = () => {
      const now = new Date();
      const ist = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + 5.5 * 3600000);
      const h = ist.getHours();
      const m = ist.getMinutes().toString().padStart(2, "0");
      const ampm = h >= 12 ? "PM" : "AM";
      setClockTime(`${h % 12 || 12}:${m} ${ampm}`);
      setIsDay(h >= 6 && h < 20);
    };
    updateClock();
    const clockId = setInterval(updateClock, 1000);

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => {
      clearInterval(clockId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
    }
    // Replay Hero typewriter on theme switch
    window.dispatchEvent(new CustomEvent("themeToggled"));
  };

  const navItems = ['skills', 'experience', 'certifications', 'projects'];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled
        ? "bg-background/95 md:bg-background/80 md:backdrop-blur-md border-b border-foreground/10 py-4"
        : "py-6 bg-transparent"
        }`}
    >
      <div className="container px-4 md:px-6 flex items-center justify-between">
        <a href="#" className="text-xl font-display font-bold tracking-tighter hover:text-primary transition-colors">
          DS.
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="text-sm font-medium hover:text-primary transition-colors capitalize px-2 py-1 relative group"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </button>
          ))}

          {/* Music Player & IST Clock */}
          <div className="hidden lg:flex items-center gap-3">
            <MusicPlayer />
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-foreground/10 bg-foreground/5 text-xs font-mono text-muted-foreground select-none">
              <span>{isDay ? "☀️" : "🌙"}</span>
              <span>{clockTime} IST</span>
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="relative w-9 h-9 rounded-full flex items-center justify-center border border-foreground/10 hover:border-primary/40 bg-foreground/5 hover:bg-primary/10 transition-all duration-300"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDark ? (
                <motion.span
                  key="sun"
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="absolute"
                >
                  <Sun className="h-4 w-4 text-yellow-400" />
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="absolute"
                >
                  <Moon className="h-4 w-4 text-cyan-400" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <Magnetic>
            <Button
              variant="outline"
              className="rounded-full border-primary/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg shadow-primary/10"
              onClick={() => scrollTo('contact')}
            >
              Connect
            </Button>
          </Magnetic>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center gap-3">
          {/* Mobile theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="relative w-9 h-9 rounded-full flex items-center justify-center border border-foreground/10 hover:border-primary/40 bg-foreground/5 transition-all duration-300"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDark ? (
                <motion.span
                  key="sun-m"
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.25 }}
                  className="absolute"
                >
                  <Sun className="h-4 w-4 text-yellow-400" />
                </motion.span>
              ) : (
                <motion.span
                  key="moon-m"
                  initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.25 }}
                  className="absolute"
                >
                  <Moon className="h-4 w-4 text-cyan-400" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-background/95 backdrop-blur-xl border-foreground/10">
              <div className="flex flex-col gap-6 mt-10">
                {navItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollTo(item)}
                    className="text-lg font-medium hover:text-primary text-left capitalize"
                  >
                    {item}
                  </button>
                ))}
                <Button
                  className="w-full mt-4"
                  onClick={() => scrollTo('contact')}
                >
                  Connect
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}
