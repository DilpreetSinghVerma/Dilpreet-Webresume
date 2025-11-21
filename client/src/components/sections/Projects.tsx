import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Gamepad2, ShieldAlert } from "lucide-react";

const projects = [
  {
    title: "Jarvis Virtual Assistant",
    description: "Voice-controlled personal assistant capable of voice recognition, text-to-speech, web browsing, music playback, and OpenAI integration for intelligent responses.",
    tech: ["Python", "OpenAI API", "Speech Recognition", "TTS"],
    icon: Bot,
    gradient: "from-cyan-500/20 to-blue-500/20"
  },
  {
    title: "The Perfect Guess Game",
    description: "Interactive number-guessing game that provides intelligent feedback on player's guesses and tracks attempts for optimal performance analysis.",
    tech: ["Python", "Logic", "Game Loop"],
    icon: Gamepad2,
    gradient: "from-purple-500/20 to-pink-500/20"
  },
  {
    title: "Snake Water Gun Game",
    description: "A classic implementation of the 'Snake Water Gun' game logic in Python, featuring randomized computer moves and score tracking.",
    tech: ["Python", "Randomization", "CLI"],
    icon: ShieldAlert,
    gradient: "from-emerald-500/20 to-green-500/20"
  }
];

export default function Projects() {
  return (
    <section className="py-24 bg-secondary/20">
      <div className="container px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-right"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Featured <span className="text-accent">Projects</span>
          </h2>
          <div className="h-1 w-20 bg-accent rounded-full ml-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group"
            >
              <Card className="h-full bg-card/50 border-white/5 overflow-hidden relative hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <CardHeader className="relative z-10">
                  <div className="mb-4 w-12 h-12 rounded-lg bg-background/50 backdrop-blur flex items-center justify-center border border-white/10">
                    <project.icon className="h-6 w-6 text-foreground" />
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <p className="text-muted-foreground mb-6 line-clamp-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((t) => (
                      <Badge key={t} variant="outline" className="bg-background/50 backdrop-blur border-white/10">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
