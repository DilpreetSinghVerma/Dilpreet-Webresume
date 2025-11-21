import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, FileCheck, TrendingUp, BrainCircuit } from "lucide-react";

const certifications = [
  {
    title: "Tata Group Data Analytics Job Simulation",
    issuer: "Forage",
    date: "July 2025",
    icon: TrendingUp,
    featured: true,
    description: "Completed a job simulation involving AI-powered data analytics and strategy development for the Financial Services team at Tata iQ.",
    details: [
      "Conducted exploratory data analysis (EDA) using GenAI tools to assess data quality and risk indicators.",
      "Proposed a no-code predictive modeling framework to assess customer delinquency risk.",
      "Designed an AI-driven collections strategy leveraging agentic AI and automation."
    ],
    tags: ["Data Analytics", "GenAI", "Predictive Modeling", "Strategy"]
  },
  {
    title: "Artificial Intelligence Fundamentals",
    issuer: "Great Learning Academy",
    date: "October 2024",
    icon: BrainCircuit,
    featured: false,
    tags: ["AI Basics", "Machine Learning"]
  },
  {
    title: "Adobe Designing Course",
    issuer: "Chhatwal Education & Training Institute",
    date: "Completed",
    icon: Award,
    featured: false,
    tags: ["Photoshop", "Design Principles"]
  },
  {
    title: "Corel Draw Designing Course",
    issuer: "Chhatwal Education & Training Institute",
    date: "Completed",
    icon: Award,
    featured: false,
    tags: ["Vector Graphics", "CorelDraw"]
  },
  {
    title: "Basics of Computer in MS Office",
    issuer: "KCC Computer Center",
    date: "Completed",
    icon: FileCheck,
    featured: false,
    tags: ["MS Office", "Internet Proficiency"]
  }
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-24">
      <div className="container px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Licenses & <span className="text-primary">Certifications</span>
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Certification */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            className="lg:col-span-3"
          >
            <Card className="bg-black/20 backdrop-blur-md border-primary/20 hover:border-primary/50 transition-all duration-300 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <TrendingUp className="h-8 w-8" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold text-primary-foreground/90">{certifications[0].title}</CardTitle>
                      <p className="text-muted-foreground">{certifications[0].issuer} • {certifications[0].date}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="w-fit bg-primary/10 text-primary border-primary/20">Featured</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg text-foreground/90">{certifications[0].description}</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {certifications[0].details?.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 pt-4">
                  {certifications[0].tags.map(tag => (
                    <Badge key={tag} variant="outline" className="bg-white/5 border-white/10">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Other Certifications */}
          {certifications.slice(1).map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full bg-black/20 backdrop-blur-md border-white/5 hover:border-white/20 transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-md bg-white/5 text-muted-foreground group-hover:text-primary transition-colors">
                      <cert.icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs text-muted-foreground font-mono">{cert.date}</span>
                  </div>
                  <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">{cert.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {cert.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs bg-white/5 hover:bg-white/10 text-muted-foreground">{tag}</Badge>
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
