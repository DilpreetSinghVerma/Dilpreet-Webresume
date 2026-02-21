import { motion } from "framer-motion";
import Scene from "@/components/3d/Scene";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail, Instagram } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Magnetic from "@/components/ui/magnetic";

const FULL_TEXT = "DILPREET SINGH";
const TYPING_SPEED = 80;

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let index = 0;

    typingIntervalRef.current = setInterval(() => {
      if (index < FULL_TEXT.length) {
        setDisplayText(FULL_TEXT.substring(0, index + 1));
        index++;
      } else {
        if (typingIntervalRef.current) {
          clearInterval(typingIntervalRef.current);
        }
      }
    }, TYPING_SPEED);

    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, []);

  return (
    <section id="hero" className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden">
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

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold tracking-tighter text-foreground drop-shadow-2xl pb-2">
            <span data-testid="text-typing-dilpreet">{displayText}</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              className={`inline-block w-[3px] h-[0.9em] bg-primary ml-1 align-middle ${displayText.length === FULL_TEXT.length ? 'hidden' : ''}`}
            />
          </h1>

          <p className="max-w-[600px] mx-auto text-muted-foreground text-lg md:text-xl font-light">Motivated B.Tech CSE student specializing in Artificial Intelligence and Machine Learning. Demonstrated ability to quickly learn and adapt to new technologies. Committed to contributing to innovative projects while gaining practical industry experience.</p>

          <div className="flex gap-4 justify-center pt-4 flex-wrap">
            <Magnetic>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 shadow-[0_0_20px_-5px_hsl(var(--primary))]"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Projects
              </Button>
            </Magnetic>

            <div className="flex gap-2">
              {[
                { icon: Github, href: "https://github.com/DilpreetSinghVerma" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/dilpreet-singh-709b35310/" },
                { icon: Instagram, href: "https://www.instagram.com/dilpreet_singh_verma/" },
                { icon: Mail, href: "mailto:dilpreetsinghverma@gmail.com" }
              ].map((item, i) => (
                <Magnetic key={i}>
                  <Button variant="outline" size="icon" className="rounded-full border-foreground/10 bg-foreground/5 backdrop-blur-sm hover:bg-foreground/10 hover:text-primary transition-colors" asChild>
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
