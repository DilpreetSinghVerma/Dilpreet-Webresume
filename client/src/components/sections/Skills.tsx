import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Terminal, Palette, Video, Database, Cpu } from "lucide-react";

import Magnetic from "@/components/ui/magnetic";

const skills = [
  {
    category: "Programming",
    items: ["Python", "C", "Data Structures"],
    icon: Terminal,
    color: "text-emerald-400",
    level: 95
  },
  {
    category: "Development Tools",
    items: ["VS Code", "PyCharm", "Git", "Linux"],
    icon: Code2,
    color: "text-blue-400",
    level: 88
  },
  {
    category: "Creative Tech",
    items: ["Adobe Photoshop", "CorelDraw", "Photography", "Videography"],
    icon: Palette,
    color: "text-purple-400",
    level: 82
  },
  {
    category: "AI & Fundamentals",
    items: ["AI Fundamentals", "Machine Learning", "Problem Solving"],
    icon: Cpu,
    color: "text-primary",
    level: 75
  }
];

import { RevealText } from "@/components/ui/reveal-text";

const tools = ["Python", "Machine Learning", "OpenAI", "React", "Linux", "Git", "VS Code", "Photoshop", "C", "Data Structures", "Tailwind CSS"];

export default function Skills() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Technical <span className="text-primary truncate inline-block">
              <RevealText text="Arsenal" />
            </span>
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1 }}
            >
              <Magnetic>
                <Card className="bg-background/60 backdrop-blur-xl border-foreground/5 hover:border-primary/50 transition-all duration-500 h-full group overflow-hidden relative shadow-xl hover:shadow-primary/5">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <CardContent className="p-6 relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <div className={`p-4 rounded-2xl bg-foreground/5 ${skill.color} group-hover:scale-110 group-hover:bg-primary/5 transition-all duration-500`}>
                        <skill.icon className="h-7 w-7" />
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono opacity-50 block mb-1">XP LEVEL</span>
                        <span className="text-xl font-bold font-mono tracking-tighter text-primary">{skill.level}%</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-4 tracking-tight">{skill.category}</h3>

                    <div className="space-y-4">
                      {/* XP Bar */}
                      <div className="h-1.5 w-full bg-foreground/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
                          className={`h-full bg-gradient-to-r from-primary/50 to-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]`}
                        />
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {skill.items.map((item) => (
                          <Badge key={item} variant="secondary" className="bg-foreground/5 hover:bg-primary/20 transition-all duration-300 border-foreground/10 text-[10px] py-1 px-2 uppercase tracking-wide">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Magnetic>
            </motion.div>
          ))}
        </div>

        {/* Tech Marquee */}
        <div className="relative py-10 border-y border-foreground/5 bg-foreground/[0.02] -mx-[4vw] px-[4vw]">
          <div className="flex overflow-hidden group">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="flex gap-12 items-center whitespace-nowrap"
            >
              {[...tools, ...tools].map((tool, i) => (
                <span key={i} className="text-2xl md:text-4xl font-display font-bold text-foreground/20 hover:text-primary transition-colors cursor-default select-none">
                  {tool}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}


