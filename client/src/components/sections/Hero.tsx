import { motion, useScroll, useTransform } from "framer-motion";
import Scene from "@/components/3d/Scene";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail, Instagram, Download, ExternalLink } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import Magnetic from "@/components/ui/magnetic";
import Lanyard from "@/components/3d/Lanyard";

const FULL_TEXT = "DILPREET SINGH";
const TYPING_SPEED = 80;

export default function Hero() {
  const [, setLocation] = useLocation();
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  // Parallax on scroll
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -80]);
  const y2 = useTransform(scrollY, [0, 500], [0, -40]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const startTyping = () => {
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    setIsTyping(true);
    setDisplayText("");
    let index = 0;
    typingIntervalRef.current = setInterval(() => {
      if (index < FULL_TEXT.length) {
        setDisplayText(FULL_TEXT.substring(0, index + 1));
        index++;
      } else {
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        setIsTyping(false);
      }
    }, TYPING_SPEED);
  };

  useEffect(() => {
    startTyping();
    return () => { if (typingIntervalRef.current) clearInterval(typingIntervalRef.current); };
  }, []);

  useEffect(() => {
    const handle = () => setTimeout(() => startTyping(), 350);
    window.addEventListener("themeToggled", handle);
    return () => window.removeEventListener("themeToggled", handle);
  }, []);

  const handleResumeDownload = () => {
    window.dispatchEvent(new CustomEvent("reetCVDownload"));
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden"
    >
      <Scene />

      {/* 3D Lanyard Card - Desktop/TV only (≥1024px) */}
      <div className="absolute top-0 right-0 w-full lg:w-[55%] h-full z-50 pointer-events-none hidden lg:block">
        <Lanyard />
      </div>

      {/* Portrait - Tablet only (sm → lg) */}
      <motion.div
        className="absolute top-20 right-8 z-10 pointer-events-none hidden sm:block lg:hidden"
        initial={{ opacity: 0, scale: 0.85, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-0 rounded-full blur-2xl opacity-30"
          style={{ background: "radial-gradient(circle, #00e5ff 0%, transparent 70%)", transform: "scale(1.3)" }} />
        <motion.div
          className="relative rounded-full p-[2px]"
          style={{ background: "linear-gradient(135deg, #00e5ff, #7c3aed, #00e5ff)", boxShadow: "0 0 24px rgba(0,229,255,0.35)" }}
          animate={{ boxShadow: ["0 0 24px rgba(0,229,255,0.35)", "0 0 40px rgba(0,229,255,0.55)", "0 0 24px rgba(0,229,255,0.35)"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="rounded-full overflow-hidden bg-background w-36 h-36">
            <img src="/dilpreet-portrait.png" alt="Dilpreet Singh" className="w-full h-full object-cover object-top scale-110" />
          </div>
        </motion.div>
      </motion.div>

      {/* ── Main content ── */}
      <div className="relative z-10 w-full h-full flex justify-center sm:justify-start items-center px-4 sm:pl-20 md:pl-32 md:pr-10 pointer-events-none">
        <motion.div
          style={{ y: y1, opacity }}
          className="w-full max-w-xl flex flex-col items-center sm:items-start text-center sm:text-left gap-4 sm:gap-5 pointer-events-auto"
        >

          {/* ── Portrait — Phone only (above name) ── */}
          <motion.div
            className="order-1 block sm:hidden"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="relative rounded-full p-[2px]"
              style={{ background: "linear-gradient(135deg, #00e5ff, #7c3aed, #00e5ff)", boxShadow: "0 0 24px rgba(0,229,255,0.3)" }}
              animate={{ boxShadow: ["0 0 24px rgba(0,229,255,0.3)", "0 0 42px rgba(0,229,255,0.55)", "0 0 24px rgba(0,229,255,0.3)"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="rounded-full overflow-hidden bg-background w-28 h-28">
                <img src="/dilpreet-portrait.png" alt="Dilpreet Singh" className="w-full h-full object-cover object-top scale-110" />
              </div>
            </motion.div>
          </motion.div>

          {/* ── Name with Typewriter — order 2 on both ── */}
          <h1 className="order-2 text-4xl sm:text-6xl md:text-7xl font-display font-bold tracking-tighter text-foreground drop-shadow-2xl">
            <span data-testid="text-typing-dilpreet">{displayText}</span>
            {isTyping && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
                className="inline-block w-[2px] sm:w-[3px] h-[0.9em] bg-primary ml-1 align-middle"
              />
            )}
          </h1>

          {/* ── Badges — order 3 on mobile (below name), order 1 on desktop (above name) ── */}
          <motion.div
            style={{ y: y2 }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5, type: "spring" }}
            className="order-3 sm:order-1 flex items-center justify-center sm:justify-start gap-2 flex-wrap"
          >
            <div className="flex items-center gap-2 rounded-full px-3 py-1 border border-green-500/30 bg-green-500/10 backdrop-blur-md">
              <motion.span
                className="w-2 h-2 rounded-full bg-green-400"
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
              />
              <span className="text-xs font-mono text-green-400">Available for Internships 2026</span>
            </div>
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary border border-primary/20 backdrop-blur-md">
              Founder @ EventFold Studio • AIML Student
            </div>
          </motion.div>

          {/* ── Description — order 4 ── */}
          <p className="order-4 sm:order-3 max-w-[560px] text-muted-foreground text-sm sm:text-lg md:text-xl font-light leading-relaxed">
            Founder of <span className="text-foreground font-medium">EventFold Studio</span> and a B.Tech CSE student specializing in AIML. I'm passionate about bridging the gap between engineering and entrepreneurship by building scalable, real-world solutions.
          </p>

          {/* ── Buttons + Social — order 5 ── */}
          <div className="order-5 sm:order-4 flex flex-col sm:flex-row gap-4 justify-center sm:justify-start items-center w-full sm:w-auto">
            <div className="flex gap-3 flex-wrap justify-center sm:justify-start">
              <Magnetic>
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 shadow-[0_0_20px_-5px_hsl(var(--primary))]"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Projects
                </Button>
              </Magnetic>

              <Magnetic>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 border-primary/20 hover:border-primary/50 bg-primary/5 backdrop-blur-md transition-all gap-2"
                  onClick={() => setLocation("/resume")}
                >
                  <ExternalLink className="h-4 w-4" />
                  View CV
                </Button>
              </Magnetic>

              <Magnetic>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 border-primary/20 hover:border-primary/50 bg-primary/5 backdrop-blur-md transition-all gap-2"
                  asChild
                >
                  <a href="/Dilpreet_Singh_Resume.pdf" download onClick={handleResumeDownload}>
                    <Download className="h-4 w-4 animate-bounce" />
                    Download CV
                  </a>
                </Button>
              </Magnetic>
            </div>

            <div className="flex gap-3 border-t sm:border-t-0 sm:border-l border-foreground/10 pt-3 sm:pt-0 sm:pl-4">
              {[
                { icon: Github, href: "https://github.com/DilpreetSinghVerma" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/dilpreet-singh-709b35310/" },
                { icon: Instagram, href: "https://www.instagram.com/dilpreet_singh_verma/" },
                { icon: Mail, href: "mailto:dilpreetsinghverma@gmail.com" }
              ].map((item, i) => (
                <Magnetic key={i}>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors h-10 w-10" asChild>
                    <a href={item.href} target={item.href.startsWith('mailto') ? undefined : "_blank"} rel="noopener noreferrer">
                      <item.icon className="h-5 w-5" />
                    </a>
                  </Button>
                </Magnetic>
              ))}
            </div>
          </div>

        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground"
      >
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ArrowDown className="h-6 w-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}
