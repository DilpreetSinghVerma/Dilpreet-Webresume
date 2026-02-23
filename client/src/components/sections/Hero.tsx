import { motion } from "framer-motion";
import Scene from "@/components/3d/Scene";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail, Instagram, Download } from "lucide-react";
import Magnetic from "@/components/ui/magnetic";

const FULL_TEXT = "DILPREET SINGH";

export default function Hero() {
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
            AIML Specialist &amp; Python Developer
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold tracking-tighter text-foreground drop-shadow-2xl pb-2">
            {FULL_TEXT}
          </h1>

          <p className="max-w-[600px] mx-auto text-muted-foreground text-lg md:text-xl font-light">Motivated B.Tech CSE student specializing in Artificial Intelligence and Machine Learning. Demonstrated ability to quickly learn and adapt to new technologies. Committed to contributing to innovative projects while gaining practical industry experience.</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 items-center">
            <div className="flex gap-4 flex-wrap justify-center">
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
                  asChild
                >
                  <a href="/Dilpreet_Singh_Resume.pdf" download>
                    <Download className="h-4 w-4 animate-bounce" />
                    Resume
                  </a>
                </Button>
              </Magnetic>
            </div>

            <div className="flex gap-3 mt-4 sm:mt-0 sm:ml-4 border-l border-foreground/10 pl-4">
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
