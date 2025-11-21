import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award } from "lucide-react";

export default function Experience() {
  return (
    <section className="py-24">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Experience Column */}
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-8 flex items-center gap-3"
            >
              <Briefcase className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-display font-bold">Experience</h2>
            </motion.div>

            <div className="relative pl-8 border-l border-white/10 space-y-12">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="absolute -left-[37px] top-1 h-4 w-4 rounded-full bg-primary border-4 border-background" />
                <div className="bg-card/50 p-6 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                  <span className="text-sm text-primary font-mono mb-2 block">01/2018 - 07/2025</span>
                  <h3 className="text-xl font-bold">Technical Support & Assistance</h3>
                  <p className="text-muted-foreground mb-2">Photography and Videography Studio • Ludhiana</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Delivered technical assistance for photography and videography projects.</li>
                    <li>Troubleshot equipment and managed media workflows.</li>
                    <li>Optimized processes to enhance team collaboration.</li>
                    <li>Supported customers with technical inquiries via remote access.</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Education & Awards Column */}
          <div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-8 flex items-center gap-3"
            >
              <GraduationCap className="h-6 w-6 text-accent" />
              <h2 className="text-2xl font-display font-bold">Education</h2>
            </motion.div>

            <div className="relative pl-8 border-l border-white/10 space-y-8 mb-12">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="absolute -left-[37px] top-1 h-4 w-4 rounded-full bg-accent border-4 border-background" />
                <h3 className="text-lg font-bold">B.Tech in Computer Science (AIML)</h3>
                <p className="text-muted-foreground">Gulzar Group of Institutes, Khanna</p>
                <span className="text-sm text-accent font-mono">Expected 01/2028</span>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <div className="absolute -left-[37px] top-1 h-4 w-4 rounded-full bg-muted border-4 border-background" />
                <h3 className="text-lg font-bold">12th Grade (90.2%)</h3>
                <p className="text-muted-foreground">Teja Singh Sutantar Memorial Sr. Sec. School</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <div className="absolute -left-[37px] top-1 h-4 w-4 rounded-full bg-muted border-4 border-background" />
                <h3 className="text-lg font-bold">10th Grade (74.9%)</h3>
                <p className="text-muted-foreground">Baba Nand Singh Convent Sr. Sec. School</p>
              </motion.div>
            </div>

            {/* Awards */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-lg border border-white/10"
            >
              <div className="flex items-start gap-4">
                <Award className="h-8 w-8 text-yellow-400 shrink-0" />
                <div>
                  <h3 className="text-lg font-bold mb-1">2nd Position - Digital Logo Designing</h3>
                  <p className="text-sm text-muted-foreground">
                    GNE's ACME 2025, Guru Nanak Dev Engineering College.
                    Representing Gulzar Group of Institutes.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
