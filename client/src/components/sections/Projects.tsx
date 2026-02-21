import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Gamepad2, ShieldAlert, Languages } from "lucide-react";
import { RevealText } from "@/components/ui/reveal-text";

const projects = [
  {
    title: "Jarvis Virtual Assistant",
    description: "A high-level voice-controlled assistant integrating OpenAI for intelligent task automation and natural conversation.",
    tech: ["Python", "OpenAI", "Speech Recognition", "TTS"],
    icon: Bot,
    gradient: "from-cyan-500/20 to-blue-500/20",
    span: "md:col-span-2 md:row-span-2",
    featured: true
  },
  {
    title: "Perfect Guess",
    description: "Compact algorithmic game using Python logic.",
    tech: ["Python", "Logic"],
    icon: Gamepad2,
    gradient: "from-purple-500/20 to-pink-500/20",
    span: "md:col-span-1 md:row-span-1"
  },
  {
    title: "Snake Water Gun",
    description: "Quick Python logic game implementation.",
    tech: ["Logic", "Random"],
    icon: ShieldAlert,
    gradient: "from-emerald-500/20 to-green-500/20",
    span: "md:col-span-1 md:row-span-1"
  },
  {
    title: "Silent Coders Sign-Translator",
    description: "Top 30 Hackathon project: Real-time 3D sign language animation system providing accessibility for the hearing impaired.",
    tech: ["Python", "TensorFlow", "NLP", "Blender"],
    icon: Languages,
    gradient: "from-amber-500/20 to-orange-500/20",
    span: "md:col-span-2 md:row-span-1",
    isHackathon: true,
    featured: false // Keep it 2x1 but more descriptive
  }
];

export default function Projects() {
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
              className={`${project.span} group relative`}
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
                  <p className={`text-muted-foreground leading-relaxed ${project.featured ? 'text-lg mb-6' : 'text-sm mb-4'}`}>
                    {project.description}
                  </p>

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
    </section>
  );
}

