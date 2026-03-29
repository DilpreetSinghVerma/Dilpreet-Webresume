import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Languages, X, ExternalLink, Info, Github, CalendarCheck } from "lucide-react";
import { RevealText } from "@/components/ui/reveal-text";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: "jarvis",
    title: "Jarvis-0.2 (AI Assistant)",
    description: "A high-end, voice-activated AI assistant featuring a futuristic sci-fi HUD, dual-brain logic, and biometric security.",
    longDescription: "Jarvis-0.2 is a sophisticated AI ecosystem featuring a futuristic sci-fi HUD. It implements dual-brain logic using Gemini 2.0 Flash and Llama 3.3, biometric security via facial recognition (MediaPipe/OpenCV), and real-time hardware monitoring. The interface is built with Glassmorphism and Neon UI themes using Eel for Python-JS integration.",
    tech: ["Python", "Gemini 2.0", "Llama 3.3", "MediaPipe", "OpenCV", "Eel", "SpeechRecognition"],
    icon: Bot,
    gradient: "from-cyan-500/20 to-blue-500/20",
    span: "md:col-span-2 md:row-span-2",
    featured: true,
    repoUrl: "https://github.com/DilpreetSinghVerma/Jarvis-0.2",
    challenges: "Integrating low-latency facial recognition with multi-modal AI response streams while maintaining a high-performance HUD.",
    solutions: "Leveraged MediaPipe for efficient landmark detection and asynchronous processing for AI API calls, unified through an Eel-based bridging layer."
  },
  {
    id: "eventfold",
    title: "EventFold Studio (Founder)",
    description: "Founder & Lead Developer of a high-end SaaS platform for photographers featuring 3D cinematic albums and luxury QR sharing.",
    longDescription: "EventFold Studio is a premium digital album ecosystem designed for luxury photography studios. It streamlines event media delivery with custom 3D flipbooks, automated branded QR generation, and real-time analytics. The platform features an AI-enhanced 'Motion Portrait' system and handles high-resolution media at scale using a serverless architecture on Vercel.",
    tech: ["Next.js", "Express", "PostgreSQL", "Drizzle", "Stripe", "Clerk", "Framer Motion", "Cloudinary"],
    icon: CalendarCheck,
    gradient: "from-purple-500/20 to-blue-500/20",
    span: "md:col-span-2 md:row-span-2",
    featured: true,
    repoUrl: "https://github.com/DilpreetSinghVerma/EventFold",
    liveUrl: "https://www.eventfoldstudio.com", // Corrected business URL
    challenges: "Scaling real-time 3D album rendering for high-traffic events while maintaining sub-second latency for 4K media assets.",
    solutions: "Engineered a sophisticated multi-stage caching player and leveraged edge computing for dynamic album generation, resulting in a 60% faster load time for mobile users."
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

function TiltCard({ project, index, onClick }: { project: any, index: number, onClick: () => void }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 30 });

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.05 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`${project.span} group relative cursor-pointer perspective-1000`}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <Card className="h-full bg-background/90 md:bg-background/40 md:backdrop-blur-md border-foreground/5 overflow-hidden flex flex-col hover:border-primary/30 transition-all duration-500 shadow-2xl">
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

        {/* Visual Accent */}
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
          <project.icon className="w-24 h-24" />
        </div>

        <CardHeader className={`${project.featured ? 'pt-8 sm:pt-10' : 'pt-5 sm:pt-6'} relative z-10 p-5 sm:p-6 pb-0`}>
          <div className={`mb-3 sm:mb-4 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500`}>
            <project.icon className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <CardTitle className={`${project.featured ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'} font-bold tracking-tight flex items-center gap-2`}>
            {project.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="relative z-10 flex-1 flex flex-col justify-between p-5 sm:p-6 pt-2 sm:pt-2">
          <div>
            <p className={`text-muted-foreground leading-relaxed ${project.featured ? 'text-base sm:text-lg mb-4 sm:mb-6' : 'text-xs sm:text-sm mb-3 sm:mb-4'}`}>
              {project.description}
            </p>

            {project.longDescription && (
              <div className="text-[10px] font-bold text-primary flex items-center gap-1 mb-4 opacity-0 group-hover:opacity-100 transition-opacity translate-z-10">
                <Info className="h-3 w-3" /> CLICK FOR CASE STUDY
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((t: string) => (
              <Badge key={t} variant="secondary" className="bg-foreground/5 border-foreground/10 text-[10px] uppercase font-mono group-hover:border-primary/40 transition-colors">
                {t}
              </Badge>
            ))}
          </div>
        </CardContent>

        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary group-hover:w-full transition-all duration-700 shadow-[0_0_15px_rgba(var(--primary),0.8)]" />
      </Card>
    </motion.div>
  );
}

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
            <TiltCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-background/95 md:bg-background/90 md:backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full bg-card border border-primary/20 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-5 sm:p-8 border-b border-foreground/5 flex items-center justify-between bg-primary/5">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-2.5 sm:p-3 bg-primary text-primary-foreground rounded-2xl">
                    <selectedProject.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight">{selectedProject.title}</h3>
                    <p className="text-[10px] font-mono text-primary uppercase">Deep Dive Case Study</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedProject(null)} className="h-8 w-8 sm:h-10 sm:w-10">
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="p-6 sm:p-8 space-y-6 sm:space-y-8 max-h-[70vh] overflow-y-auto thin-scrollbar">

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
                {selectedProject.liveUrl && (
                  <Button
                    variant="default"
                    className="rounded-xl gap-2 shadow-lg shadow-primary/20 bg-primary/20 text-primary hover:bg-primary/30"
                    onClick={() => window.open(selectedProject.liveUrl, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" /> Visit Site
                  </Button>
                )}
                <Button
                  className="rounded-xl gap-2 shadow-lg shadow-primary/20"
                  onClick={() => selectedProject.repoUrl && window.open(selectedProject.repoUrl, '_blank')}
                  disabled={!selectedProject.repoUrl}
                >
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


