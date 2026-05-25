import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, FileCheck, TrendingUp, BrainCircuit, X, ZoomIn, ZoomOut, Eye, Sparkles, ExternalLink } from "lucide-react";
import { useState } from "react";
import { RevealText } from "@/components/ui/reveal-text";
import { Button } from "@/components/ui/button";

const categories = [
  { id: "all", label: "All" },
  { id: "ai-ml", label: "AI & ML" },
  { id: "development", label: "Software / Web" },
  { id: "design", label: "Design" },
  { id: "other", label: "Other" }
];

const certifications = [
  {
    title: "Skyscanner Front-End Software Engineering Job Simulation",
    issuer: "Forage",
    date: "May 2026",
    icon: Award,
    featured: true,
    category: "development",
    description: "Completed a job simulation where I built a web application using React as a front-end engineer at Skyscanner. Developed a page for picking travel dates using Skyscanner's open-source Backpack React library, customized the application, and ran automated tests.",
    details: [
      "Created a Backpack React Web App using Skyscanner's custom templates and design tokens.",
      "Configured date selection, formatting, and responsive calendar layouts utilizing bpk-component-calendar.",
      "Ran automated Jest tests to verify UI components and layout integrity.",
      "Gained direct experience with professional component libraries, design systems, and frontend workflows."
    ],
    tags: ["React", "Backpack Design System", "Jest Testing", "Frontend Development"],
    certificateImage: "/km4rw7dihDr3etqom_skoQmxqhtgWmKv2pm_ef4Ma6CaHFCCrNyoa_1779636092173_completion_certificate_page-0001.jpg"
  },
  {
    title: "JPMorgan Chase Software Engineering Job Simulation",
    issuer: "Forage",
    date: "May 2026",
    icon: Award,
    featured: true,
    category: "development",
    description: "Completed a job simulation involving backend software engineering tasks at JPMorgan Chase & Co., focusing on project setup, Kafka messaging integration, database management, and REST API controller development.",
    details: [
      "Successfully set up a robust backend application architecture using Java, Spring Boot, and Maven.",
      "Integrated Apache Kafka for real-time, event-driven stream processing and messaging.",
      "Configured H2 Database for local relational database management and fast persistence.",
      "Developed and optimized REST API Integration and Controllers for service communication."
    ],
    tags: ["Software Engineering", "Java", "Spring Boot", "Apache Kafka", "REST APIs", "H2 Database"],
    certificateImage: "/E6McHJDKsQYh79moz_Sj7temL583QAYpHXD_ef4Ma6CaHFCCrNyoa_1779632766106_completion_certificate_page-0001.jpg"
  },
  {
    title: "Claude Code 101",
    issuer: "Anthropic",
    date: "May 2026",
    icon: BrainCircuit,
    featured: true,
    category: "ai-ml",
    description: "Completed Anthropic's official Claude Code 101 course, mastering AI-assisted coding workflows and agentic development patterns using Claude.",
    details: [
      "Learned to use Claude as an intelligent coding partner for complex software tasks.",
      "Explored agentic coding patterns and multi-step code generation workflows.",
      "Applied Claude Code in real-world development scenarios and project automation.",
      "Certified by Anthropic — the leading AI safety company behind the Claude model family."
    ],
    tags: ["Anthropic", "Claude Code", "AI Coding", "Agentic AI"],
    certificateImage: "/claude-code-101-certificate.jpg"
  },
  {
    title: "Claude 101",
    issuer: "Anthropic",
    date: "May 2026",
    icon: BrainCircuit,
    featured: true,
    category: "ai-ml",
    description: "Completed Anthropic's foundational Claude 101 certification, gaining deep understanding of prompt engineering and effective Claude usage.",
    details: [
      "Mastered core prompting techniques and best practices for working with Claude.",
      "Understood Claude's capabilities, safety principles, and constitutional AI approach.",
      "Applied effective prompt engineering strategies across diverse use cases.",
      "Certificate No: dy4kfank946e — issued by Anthropic on May 8, 2026."
    ],
    tags: ["Anthropic", "Claude AI", "Prompt Engineering", "LLMs"],
    certificateImage: "/claude-101-certificate.jpg"
  },
  {
    title: "Top 30 Finalist - Prompt The Future Hackathon",
    issuer: "Gulzar Group of Institutions (GGI)",
    date: "February 2026",
    icon: Award,
    featured: true,
    category: "ai-ml",
    description: "Placed in the Top 30 teams out of all participants in the 24-hour 'Prompt The Future' Next Quantum 3.0 Hackathon.",
    details: [
      "Developed a real-time AI-based translation system for sign language.",
      "Competed in the 'Open Innovation' software category.",
      "Collaborated in a high-pressure 24-hour development sprint.",
      "Recognized for technical approach and social impact potential."
    ],
    tags: ["Hackathon", "Top 30", "AI Innovation", "GGI"],
    certificateImage: "/quantum-hackathon-participation.jpg"
  },
  {
    title: "10-Week AI-ML Virtual Internship",
    issuer: "Gulzar Group of Institutions",
    date: "July - September 2025",
    icon: BrainCircuit,
    featured: true,
    category: "ai-ml",
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
    category: "ai-ml",
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
    category: "ai-ml",
    description: "Foundational course covering the core aspects of Artificial Intelligence, machine learning concepts, and applications.",
    tags: ["AI Basics", "Machine Learning"],
    certificateImage: "/ai-fundamentals-certificate.jpg"
  },
  {
    title: "Digital Logo Designing - GNE's ACME 2025",
    issuer: "Guru Nanak Dev Engineering College",
    date: "April 2025",
    icon: Award,
    featured: false,
    category: "design",
    description: "Won Second Position in the Digital Logo Designing competition at GNE's annual tech fest, ACME 2025.",
    tags: ["Digital Design", "Logo Design", "Second Position"],
    certificateImage: "/gne-acme-certificate.jpg"
  },
  {
    title: "Adobe Photoshop & Corel Draw Designing",
    issuer: "Chhatwal Education & Training Institute",
    date: "July 2019",
    icon: Award,
    featured: false,
    category: "design",
    description: "Professional training program in graphic design principles, photo editing, and vector asset creation using Adobe Photoshop and Corel Draw.",
    tags: ["Photoshop", "CorelDraw", "Design Principles"],
    certificateImage: "/adobe-corel-certificate.jpg"
  },
  {
    title: "Computer Basic with MS Office & Internet",
    issuer: "Kalgidhar Computer Centre (KCC)",
    date: "June 2018",
    icon: FileCheck,
    featured: false,
    category: "other",
    description: "ISO 9001:2015 certified basic computer programming, internet usage, and Microsoft Office suite training.",
    tags: ["MS Office", "Internet Proficiency", "ISO 9001:2015"],
    certificateImage: "/kcc-computer-diploma.jpg"
  },
  {
    title: "Google Student Ambassador Program",
    issuer: "Google Gemini / Communiqe",
    date: "December 2025",
    icon: Award,
    featured: false,
    category: "other",
    description: "Participated as a Student Ambassador, facilitating workshops, developer events, and coordinating tech initiatives.",
    tags: ["Google Ambassador", "Leadership", "Participation"],
    certificateImage: "/google-ambassador-participation.jpg"
  }
];

export default function Certifications() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [showCertificate, setShowCertificate] = useState(false);
  const [selectedCert, setSelectedCert] = useState<any>(null);
  const [zoom, setZoom] = useState(1);

  const openCertificate = (cert: any) => {
    setSelectedCert(cert);
    setShowCertificate(true);
    setZoom(1);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 1));
  };

  const filteredCertifications = activeCategory === "all"
    ? certifications
    : certifications.filter(cert => cert.category === activeCategory);

  return (
    <section id="certifications" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container px-4 md:px-6">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Licenses & <span className="text-primary truncate inline-block">
              <RevealText text="Certifications" />
            </span>
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </motion.div>

        {/* Categories Tabs Filter */}
        <div className="flex flex-wrap justify-start sm:justify-center items-center gap-2 mb-10 pb-4 border-b border-foreground/5 overflow-x-auto no-scrollbar">
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`relative px-4 py-2 text-sm rounded-full font-medium transition-all duration-300 ${
                  isActive
                    ? "text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeCategoryTab"
                    className="absolute inset-0 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary),0.3)] z-0"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {category.id === "ai-ml" && <Sparkles className="w-3.5 h-3.5" />}
                  {category.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredCertifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                layout
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 15 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="cursor-pointer group relative flex flex-col h-full"
                onClick={() => openCertificate(cert)}
                data-testid={`button-view-${cert.title.toLowerCase().replace(/\s+/g, '-')}-certificate`}
              >
                <Card className={`h-full bg-background/40 backdrop-blur-md border hover:border-primary/40 transition-all duration-500 shadow-xl overflow-hidden flex flex-col relative ${
                  cert.featured 
                    ? 'border-primary/10 shadow-primary/5 hover:shadow-primary/10' 
                    : 'border-foreground/5 hover:shadow-foreground/5'
                }`}>
                  {/* Floating Featured Badge */}
                  {cert.featured && (
                    <span className="absolute top-3 right-3 z-10 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-primary/20 text-primary border border-primary/30 backdrop-blur-md shadow-lg flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Featured
                    </span>
                  )}

                  {/* Certificate Image Preview Container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted/20 border-b border-foreground/5 group-hover:border-primary/20 transition-all duration-500">
                    {cert.certificateImage ? (
                      <img
                        src={cert.certificateImage}
                        alt={`${cert.title} Preview`}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-foreground/5">
                        <cert.icon className="w-12 h-12 text-muted-foreground/30" />
                      </div>
                    )}
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center mb-2 transform scale-75 group-hover:scale-100 transition-all duration-300">
                        <Eye className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-semibold text-foreground">View Credential Details</span>
                      <span className="text-xs text-muted-foreground mt-1 text-center font-mono">Issued by {cert.issuer}</span>
                    </div>
                  </div>

                  {/* Card Header & Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Date & Issuer */}
                      <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground mb-2">
                        <span className="font-mono">{cert.date}</span>
                        <Badge variant="outline" className="px-2 py-0 bg-foreground/5 border-foreground/10 text-[10px] uppercase font-mono">
                          {cert.issuer}
                        </Badge>
                      </div>

                      {/* Title */}
                      <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2 mb-2">
                        {cert.title}
                      </CardTitle>

                      {/* Brief description */}
                      {cert.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-4">
                          {cert.description}
                        </p>
                      )}
                    </div>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {cert.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-[10px] px-2 py-0.5 bg-foreground/5 text-muted-foreground border border-foreground/5 font-mono">
                          {tag}
                        </Badge>
                      ))}
                      {cert.tags.length > 3 && (
                        <span className="text-[10px] font-mono text-muted-foreground px-1 py-0.5">
                          +{cert.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* bottom neon slider indicator */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary group-hover:w-full transition-all duration-700 shadow-[0_0_15px_rgba(var(--primary),0.8)]" />
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Unified Certificate & Details Modal */}
        <AnimatePresence>
          {showCertificate && selectedCert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setShowCertificate(false)}
              className="fixed inset-0 bg-background/95 backdrop-blur-md flex items-center justify-center z-50 p-4 md:p-6"
              data-testid="modal-certificate"
            >
              <motion.div
                initial={{ scale: 0.85, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.85, opacity: 0, y: 30 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-5xl max-h-[90vh] bg-card rounded-3xl shadow-2xl flex flex-col md:flex-row border border-primary/20 overflow-hidden"
              >
                {/* Left side: Certificate Image Viewport (60% width on md+) */}
                <div className="relative w-full md:w-3/5 min-h-[300px] md:min-h-[500px] bg-black/40 flex flex-col border-b md:border-b-0 md:border-r border-foreground/5">
                  {/* Top Zoom Controls */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-background/80 backdrop-blur-md py-1.5 px-3 rounded-full border border-foreground/5">
                    <button
                      onClick={handleZoomOut}
                      disabled={zoom <= 1}
                      className="p-1 hover:bg-foreground/5 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      data-testid="button-zoom-out"
                    >
                      <ZoomOut className="h-4.5 w-4.5 text-foreground" />
                    </button>
                    <span className="text-xs text-muted-foreground font-mono font-medium min-w-[45px] text-center">
                      {Math.round(zoom * 100)}%
                    </span>
                    <button
                      onClick={handleZoomIn}
                      disabled={zoom >= 3}
                      className="p-1 hover:bg-foreground/5 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      data-testid="button-zoom-in"
                    >
                      <ZoomIn className="h-4.5 w-4.5 text-foreground" />
                    </button>
                  </div>

                  {/* Certificate Image Viewport */}
                  <div className="flex-1 overflow-auto flex items-center justify-center p-6 md:p-10">
                    <div
                      style={{
                        transform: `scale(${zoom})`,
                        transformOrigin: "center",
                      }}
                      className="transition-transform duration-200 ease-out max-w-full"
                    >
                      {selectedCert.certificateImage ? (
                        <img
                          src={selectedCert.certificateImage}
                          alt={`${selectedCert.title} Certificate`}
                          className="max-h-[35vh] md:max-h-[65vh] w-auto object-contain rounded shadow-lg border border-foreground/5"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
                          <selectedCert.icon className="w-16 h-16 mb-4 text-muted-foreground/30" />
                          <p>No Certificate Image Available</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right side: Detailed Information (40% width on md+) */}
                <div className="w-full md:w-2/5 flex flex-col justify-between max-h-[45vh] md:max-h-full">
                  {/* Modal Header */}
                  <div className="p-6 pb-4 border-b border-foreground/5 flex items-center justify-between bg-primary/5">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-primary/10 text-primary border border-primary/20 rounded-2xl">
                        <selectedCert.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-primary uppercase font-bold tracking-wider">Credential Details</span>
                        <h3 className="text-sm font-semibold text-muted-foreground">{selectedCert.issuer}</h3>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowCertificate(false)}
                      className="p-2 hover:bg-foreground/5 rounded-full transition-colors"
                      data-testid="button-close-certificate"
                    >
                      <X className="h-5 w-5 text-foreground" />
                    </button>
                  </div>

                  {/* Modal Scrollable Content */}
                  <div className="p-6 space-y-5 overflow-y-auto flex-1 thin-scrollbar">
                    <div>
                      <h4 className="text-xl font-bold tracking-tight text-foreground leading-snug">
                        {selectedCert.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">Issued: {selectedCert.date}</p>
                    </div>

                    {selectedCert.description && (
                      <div>
                        <h5 className="text-xs font-mono uppercase text-muted-foreground mb-2 flex items-center gap-1.5">
                          <div className="h-1 w-3 bg-primary rounded-full" /> Overview
                        </h5>
                        <p className="text-sm leading-relaxed text-foreground/90">
                          {selectedCert.description}
                        </p>
                      </div>
                    )}

                    {selectedCert.details && selectedCert.details.length > 0 && (
                      <div>
                        <h5 className="text-xs font-mono uppercase text-muted-foreground mb-2.5 flex items-center gap-1.5">
                          <div className="h-1 w-3 bg-primary rounded-full" /> Key Highlights
                        </h5>
                        <ul className="space-y-2">
                          {selectedCert.details.map((detail: string, i: number) => (
                            <li key={i} className="flex items-start gap-2.5 text-xs text-muted-foreground leading-relaxed">
                              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div>
                      <h5 className="text-xs font-mono uppercase text-muted-foreground mb-2.5">Skills Acquired</h5>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedCert.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 bg-foreground/5 rounded-full text-[10px] font-medium border border-foreground/5 text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Modal Footer / Call to Action */}
                  <div className="p-6 bg-foreground/5 border-t border-foreground/5 flex justify-end gap-3">
                    <Button
                      variant="outline"
                      className="rounded-xl border-foreground/10 text-xs px-4"
                      onClick={() => setShowCertificate(false)}
                    >
                      Close Details
                    </Button>
                    {selectedCert.certificateImage && (
                      <Button
                        className="rounded-xl gap-1.5 shadow-lg shadow-primary/20 text-xs px-4"
                        onClick={() => window.open(selectedCert.certificateImage, "_blank")}
                      >
                        <ExternalLink className="h-3.5 w-3.5" /> View Certificate File
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
