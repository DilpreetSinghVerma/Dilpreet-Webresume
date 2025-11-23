import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award, Star, X } from "lucide-react";
import { useState } from "react";

export default function Experience() {
  const [showAmbassadorModal, setShowAmbassadorModal] = useState(false);
  return (
    <section className="py-24">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Experience Column */}
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              className="mb-8 flex items-center gap-3"
            >
              <Briefcase className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-display font-bold">Experience</h2>
            </motion.div>

            <div className="relative pl-8 border-l border-white/10 space-y-12">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="absolute -left-[37px] top-1 h-4 w-4 rounded-full bg-blue-500 border-4 border-background" />
                <div 
                  onClick={() => setShowAmbassadorModal(true)}
                  className="bg-gradient-to-r from-blue-500/10 to-primary/10 backdrop-blur-md p-6 rounded-lg border border-blue-400/30 hover:border-blue-400/60 transition-colors cursor-pointer hover:shadow-lg hover:shadow-blue-400/20"
                  data-testid="button-view-ambassador-badge"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <Star className="h-4 w-4 text-blue-400 mt-1 shrink-0" />
                    <span className="text-sm text-blue-400 font-mono">Current • 2025-2026</span>
                  </div>
                  <h3 className="text-xl font-bold">Google Student Ambassador</h3>
                  <p className="text-muted-foreground mb-3">Gulzar Group of Institutes</p>
                  <p className="text-sm text-foreground/90 mb-3">
                    Selected as Google Student Ambassador to represent Google and foster a culture of innovation and learning. Bridging the gap between students and Google's ecosystem of tools, platforms, and opportunities.
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Promoting Google technologies and developer programs across campus.</li>
                    <li>Organizing workshops and events to enhance technical awareness.</li>
                    <li>Connecting student community with industry resources and opportunities.</li>
                    <li>Building a culture of continuous learning and technological innovation.</li>
                  </ul>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <div className="absolute -left-[37px] top-1 h-4 w-4 rounded-full bg-primary border-4 border-background" />
                <div className="bg-black/20 backdrop-blur-md p-6 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
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
              viewport={{ once: false, amount: 0.3 }}
              className="mb-8 flex items-center gap-3"
            >
              <GraduationCap className="h-6 w-6 text-accent" />
              <h2 className="text-2xl font-display font-bold">Education</h2>
            </motion.div>

            <div className="relative pl-8 border-l border-white/10 space-y-8 mb-12">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
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
                viewport={{ once: false, amount: 0.3 }}
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
                viewport={{ once: false, amount: 0.3 }}
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
              viewport={{ once: false, amount: 0.3 }}
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

        {/* Ambassador Badge Modal */}
        {showAmbassadorModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAmbassadorModal(false)}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            data-testid="modal-ambassador"
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-xl overflow-hidden shadow-2xl max-w-lg w-full"
            >
              <button
                onClick={() => setShowAmbassadorModal(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10 bg-white/90"
                data-testid="button-close-ambassador"
              >
                <X className="h-5 w-5 text-black" />
              </button>
              <img
                src="/gap-badge-full.jpg"
                alt="Google Student Ambassador Badge"
                className="w-full h-auto"
              />
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
