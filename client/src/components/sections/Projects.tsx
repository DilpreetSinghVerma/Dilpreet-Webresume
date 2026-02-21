import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Gamepad2, ShieldAlert, Languages, X, ExternalLink, Info, Github } from "lucide-react";
import { RevealText } from "@/components/ui/reveal-text";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: "jarvis",
    title: "Jarvis Virtual Assistant",
    description: "A high-level voice-controlled assistant integrating OpenAI for intelligent task automation and natural conversation.",
    longDescription: "Jarvis is not just a script; it's a modular AI environment. It uses advanced Signal Processing for speech recognition and high-fidelity TTS for response. The core brain connects to OpenAI's GPT models via a secure API middleware, allowing for context-aware conversations and complex task orchestration like system control, email drafting, and real-time information retrieval.",
    tech: ["Python", "OpenAI", "Speech Recognition", "TTS"],
    icon: Bot,
    gradient: "from-cyan-500/20 to-blue-500/20",
    span: "md:col-span-2 md:row-span-2",
    featured: true,
    challenges: "Handling asynchronous speech buffers without blocking the main event loop was the primary challenge.",
    solutions: "Implemented multi-threaded audio processing and an event-driven architecture using Python's asyncio."
  },
  {
    id: "guess",
    title: "Perfect Guess",
    description: "Compact algorithmic game using Python logic.",
    tech: ["Python", "Logic"],
    icon: Gamepad2,
    gradient: "from-purple-500/20 to-pink-500/20",
    span: "md:col-span-1 md:row-span-1"
  },
  {
    id: "snake",
    title: "Snake Water Gun",
    description: "Quick Python logic game implementation.",
    tech: ["Logic", "Random"],
    icon: ShieldAlert,
    gradient: "from-emerald-500/20 to-green-500/20",
    span: "md:col-span-1 md:row-span-1"
  },
  {
    id: "silent",
    title: "Silent Coders Sign-Translator",
    description: "Top 30 Hackathon project: Real-time 3D sign language animation system providing accessibility for the hearing impaired.",
    longDescription: "Developed during a high-stakes 24-hour hackathon, this system bridges the communication gap for the deaf community. It uses NLP to parse sentence structure and maps those tokens to a library of 3D animations rendered in real-time. The system supports both ASL and ISL, demonstrating a commitment to global accessibility.",
    tech: ["Python", "TensorFlow", "NLP", "Blender"],
    icon: Languages,
    gradient: "from-amber-500/20 to-orange-500/20",
    span: "md:col-span-2 md:row-span-1",
    isHackathon: true,
    featured: false,
    challenges: "Synchronizing the avatar animations with the temporal pacing of human speech was critical for natural communication.",
    solutions: "Applied Time-Series prediction models to anticipate word transitions and smooth animation blending."
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <section id="projects" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Production <span className="text-primary truncate inline-block italic">
              <RevealText text="Showcase" />
            </span>
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-3 md:gap-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.1 }}
              className={`${project.span} group relative cursor-pointer`}
              onClick={() => project.longDescription && setSelectedProject(project)}
            >
              <Card className="h-full bg-background/40 backdrop-blur-xl border-foreground/5 overflow-hidden flex flex-col hover:border-primary/30 transition-all duration-500 shadow-2xl">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                {/* Visual Accent */}
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                  <project.icon className="w-24 h-24" />
                </div>

                <CardHeader className={`${project.featured ? 'pt-10' : 'pt-6'} relative z-10`}>
                  <div className={`mb-4 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500`}>
                    <project.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className={`${project.featured ? 'text-3xl' : 'text-xl'} font-bold tracking-tight flex items-center gap-2`}>
                    {project.title}
                    {(project as any).isHackathon && (
                      <Badge variant="outline" className="text-[10px] bg-amber-500/10 text-amber-500 border-amber-500/20">Hackathon</Badge>
                    )}
                  </CardTitle>
                </CardHeader>

                <CardContent className="relative z-10 flex-1 flex flex-col justify-between">
                  <div>
                    <p className={`text-muted-foreground leading-relaxed ${project.featured ? 'text-lg mb-6' : 'text-sm mb-4'}`}>
                      {project.description}
                    </p>

                    {project.longDescription && (
                      <div className="text-[10px] font-bold text-primary flex items-center gap-1 mb-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Info className="h-3 w-3" /> CLICK FOR CASE STUDY
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <Badge key={t} variant="secondary" className="bg-foreground/5 border-foreground/10 text-[10px] uppercase font-mono group-hover:border-primary/40 transition-colors">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                {/* Bottom Border Glow */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary group-hover:w-full transition-all duration-700 shadow-[0_0_15px_rgba(var(--primary),0.8)]" />
              </Card>
            </motion.div>
          ))}

          {/* Decorative Placeholder for Bento Consistency */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="md:col-span-2 hidden md:flex rounded-2xl bg-gradient-to-br from-primary/5 to-transparent border border-foreground/5 items-center justify-center p-8 text-center"
          >
            <div>
              <p className="text-sm font-mono text-primary/40 uppercase tracking-[0.2em] mb-2">System Status</p>
              <p className="text-xl font-display font-medium text-foreground/20 italic">"The best way to predict the future is to create it."</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-background/90 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full bg-card border border-primary/20 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-8 border-b border-foreground/5 flex items-center justify-between bg-primary/5">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary text-primary-foreground rounded-2xl">
                    <selectedProject.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight">{selectedProject.title}</h3>
                    <p className="text-xs font-mono text-primary uppercase">Deep Dive Case Study</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedProject(null)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
                <div>
                  <h4 className="text-sm font-mono uppercase text-muted-foreground mb-3 flex items-center gap-2">
                    <div className="h-1 w-4 bg-primary rounded-full" /> The Vision
                  </h4>
                  <p className="leading-relaxed text-foreground/90">{selectedProject.longDescription}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-2xl bg-red-400/5 border border-red-400/10">
                    <h4 className="text-sm font-bold text-red-400 mb-2 uppercase flex items-center gap-2">
                      Critical Challenge
                    </h4>
                    <p className="text-sm text-muted-foreground">{selectedProject.challenges}</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-green-400/5 border border-green-400/10">
                    <h4 className="text-sm font-bold text-green-400 mb-2 uppercase flex items-center gap-2">
                      Engineering Solution
                    </h4>
                    <p className="text-sm text-muted-foreground">{selectedProject.solutions}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-mono uppercase text-muted-foreground mb-4">Full Tech Architecture</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t: string) => (
                      <span key={t} className="px-4 py-2 bg-foreground/5 rounded-full text-xs font-bold border border-foreground/5">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 bg-foreground/5 border-t border-foreground/5 flex justify-end gap-3">
                <Button variant="outline" className="rounded-xl border-foreground/10" onClick={() => setSelectedProject(null)}>
                  Close Analysis
                </Button>
                <Button className="rounded-xl gap-2 shadow-lg shadow-primary/20">
                  <Github className="h-4 w-4" /> View Source <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}


