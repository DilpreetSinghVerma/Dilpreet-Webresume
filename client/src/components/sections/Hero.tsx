import { motion } from "framer-motion";
import Scene from "@/components/3d/Scene";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail, Instagram } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [shouldRestart, setShouldRestart] = useState(false);
  const fullText = "DILPREET SINGH";
  const typingSpeed = 80;
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isTypingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Debounce scroll events - trigger after 300ms of no scrolling
      scrollTimeoutRef.current = setTimeout(() => {
        setShouldRestart((prev) => !prev);
      }, 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let index = 0;
    let interval: NodeJS.Timeout | null = null;

    // Start typing
    isTypingRef.current = true;
    setDisplayText("");

    const startTyping = () => {
      interval = setInterval(() => {
        if (index < fullText.length) {
          setDisplayText((prev) => prev + fullText[index]);
          index++;
        } else {
          if (interval) clearInterval(interval);
          isTypingRef.current = false;
        }
      }, typingSpeed);
    };

    startTyping();

    return () => {
      if (interval) clearInterval(interval);
      isTypingRef.current = false;
    };
  }, [shouldRestart]);

  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <Scene />
      
      {/* Content Overlay */}
      <div className="container px-4 md:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary border border-primary/20 backdrop-blur-md mb-4"
          >
            AIML Specialist & Python Developer
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 text-glow pb-2 min-h-[1.2em]">
            <span data-testid="text-typing-dilpreet">{displayText}</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
              className="text-primary"
            >
              |
            </motion.span>
          </h1>
          
          <p className="max-w-[600px] mx-auto text-muted-foreground text-lg md:text-xl font-light">
            Motivated B.Tech CSE student specializing in Artificial Intelligence and Machine Learning.
            Turning data into intelligence and code into solutions.
          </p>

          <div className="flex gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 shadow-[0_0_20px_-5px_hsl(var(--primary))]"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Projects
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:text-primary transition-colors" asChild>
                <a href="https://github.com/DilpreetSinghVerma" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:text-primary transition-colors" asChild>
                <a href="https://www.linkedin.com/in/dilpreet-singh-709b35310/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:text-primary transition-colors" asChild>
                <a href="https://www.instagram.com/dilpreet_singh_verma/" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:text-primary transition-colors" asChild>
                <a href="mailto:dilpreetsinghverma@gmail.com">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="h-6 w-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}
