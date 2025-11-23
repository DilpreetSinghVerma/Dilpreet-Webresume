import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Terminal, Palette, Video, Database, Cpu } from "lucide-react";

const skills = [
  { 
    category: "Programming", 
    items: ["Python", "C", "Data Structures"],
    icon: Terminal,
    color: "text-emerald-400"
  },
  { 
    category: "Development Tools", 
    items: ["VS Code", "PyCharm", "Git", "Linux"],
    icon: Code2,
    color: "text-blue-400"
  },
  { 
    category: "Creative Tech", 
    items: ["Adobe Photoshop", "CorelDraw", "Photography", "Videography"],
    icon: Palette,
    color: "text-purple-400"
  },
  { 
    category: "AI & Fundamentals", 
    items: ["AI Fundamentals", "Machine Learning", "Problem Solving"],
    icon: Cpu,
    color: "text-primary"
  }
];

export default function Skills() {
  return (
    <section className="py-24 relative">
      <div className="container px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Technical <span className="text-primary">Arsenal</span>
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-black/20 backdrop-blur-md border-white/5 hover:border-primary/50 transition-all duration-300 h-full group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardContent className="p-6 relative z-10">
                  <div className={`mb-4 p-3 rounded-lg bg-white/5 w-fit ${skill.color} group-hover:scale-110 transition-transform duration-300`}>
                    <skill.icon className="h-6 w-6" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4">{skill.category}</h3>
                  
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <Badge key={item} variant="secondary" className="bg-white/5 hover:bg-primary/20 transition-colors border-white/10 dark:bg-white/5 dark:border-white/10">
                        {item}
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
