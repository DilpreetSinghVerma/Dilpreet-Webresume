import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, FileCheck, TrendingUp, BrainCircuit, X } from "lucide-react";
import { useState } from "react";

const certifications = [
  {
    title: "10-Week AI-ML Virtual Internship",
    issuer: "Gulzar Group of Institutions",
    date: "July - September 2025",
    icon: BrainCircuit,
    featured: true,
    description: "Completed a comprehensive 10-week AI-ML Virtual Internship journey supported by India Edu Program, Google for Developers, and EduSkills.",
    details: [
      "Hands-on experience in Artificial Intelligence and Machine Learning concepts",
      "Guided by industry experts and academic mentors",
      "Deepened understanding of AI/ML applications and best practices",
      "Collaborative learning environment with peer developers"
    ],
    tags: ["AI/ML", "Virtual Internship", "EduSkills", "Google Developers"],
    certificateImage: "/ai-ml-internship-certificate.jpg"
  },
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
    tags: ["Data Analytics", "GenAI", "Predictive Modeling", "Strategy"],
    certificateImage: "/tata-certificate.jpg"
  },
  {
    title: "Artificial Intelligence Fundamentals",
    issuer: "Great Learning Academy",
    date: "October 2024",
    icon: BrainCircuit,
    featured: false,
    tags: ["AI Basics", "Machine Learning"],
    certificateImage: "/ai-fundamentals-certificate.jpg"
  },
  {
    title: "Digital Logo Designing - GNE's ACME 2025",
    issuer: "Guru Nanak Dev Engineering College",
    date: "April 2025",
    icon: Award,
    featured: false,
    tags: ["Digital Design", "Logo Design", "Second Position"],
    certificateImage: "/gne-acme-certificate.jpg"
  },
  {
    title: "Adobe Photoshop & Corel Draw Designing",
    issuer: "Chhatwal Education & Training Institute",
    date: "July 2019",
    icon: Award,
    featured: false,
    tags: ["Photoshop", "CorelDraw", "Design Principles"],
    certificateImage: "/adobe-corel-certificate.jpg"
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
  const [showCertificate, setShowCertificate] = useState(false);
  const [selectedCertImage, setSelectedCertImage] = useState<string>("");

  const openCertificate = (imageUrl: string) => {
    setSelectedCertImage(imageUrl);
    setShowCertificate(true);
  };

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
          {/* Featured Certifications */}
          {certifications.filter(cert => cert.featured).map((cert, index) => (
            <motion.div 
              key={cert.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              className="lg:col-span-3 cursor-pointer"
              onClick={() => openCertificate((cert as any).certificateImage)}
              data-testid={`button-view-${cert.title.toLowerCase().replace(/\s+/g, '-')}-certificate`}
            >
              <Card className="bg-black/20 backdrop-blur-md border-primary/20 hover:border-primary/50 transition-all duration-300 overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-primary/10 text-primary">
                        <cert.icon className="h-8 w-8" />
                      </div>
                      <div>
                        <CardTitle className="text-xl md:text-2xl font-bold text-white leading-tight">{cert.title}</CardTitle>
                        <p className="text-muted-foreground mt-1">{cert.issuer} • {cert.date}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="w-fit bg-primary/10 text-primary border-primary/20">Featured</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-lg text-foreground/90">{cert.description}</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {cert.details?.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 pt-4">
                    {cert.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="bg-white/5 border-white/10">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Other Certifications */}
          {certifications.filter(cert => !cert.featured).map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: index * 0.1 }}
              className={(cert as any).certificateImage ? "cursor-pointer" : ""}
              onClick={() => (cert as any).certificateImage && openCertificate((cert as any).certificateImage)}
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

        {/* Certificate Modal */}
        {showCertificate && selectedCertImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCertificate(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            data-testid="modal-certificate"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-h-[90vh] overflow-y-auto bg-white rounded-lg"
            >
              <button
                onClick={() => setShowCertificate(false)}
                className="sticky top-0 right-0 float-right p-2 hover:bg-gray-200 rounded-full transition-colors z-10 m-2"
                data-testid="button-close-certificate"
              >
                <X className="h-6 w-6 text-black" />
              </button>
              <div className="flex items-center justify-center p-4">
                <img
                  src={selectedCertImage}
                  alt="Certificate"
                  className="max-w-2xl w-full h-auto"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
