import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function SplashScreen({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Total splash duration: 2.8s visible, then fade out, then call onDone
    const exitTimer = setTimeout(() => setVisible(false), 2600);
    const doneTimer = setTimeout(() => onDone(), 3200);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: "#020204" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Subtle radial glow behind logo */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0,229,255,0.06) 0%, transparent 70%)",
            }}
          />

          {/* Center content */}
          <div className="flex flex-col items-center gap-8">

            {/* DS. Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-3"
            >
              {/* Logo box */}
              <motion.div
                className="w-20 h-20 rounded-2xl flex items-center justify-center"
                style={{
                  border: "1px solid rgba(0,229,255,0.25)",
                  background: "rgba(0,229,255,0.04)",
                }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(0,229,255,0.1)",
                    "0 0 45px rgba(0,229,255,0.25)",
                    "0 0 20px rgba(0,229,255,0.1)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <span
                  className="text-4xl font-bold tracking-tight"
                  style={{
                    fontFamily: "var(--font-display, sans-serif)",
                    color: "#00e5ff",
                    textShadow: "0 0 20px rgba(0,229,255,0.6)",
                  }}
                >
                  DS.
                </span>
              </motion.div>

              {/* Name */}
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                style={{
                  fontFamily: "monospace",
                  fontSize: "11px",
                  letterSpacing: "0.3em",
                  color: "rgba(0,229,255,0.45)",
                  textTransform: "uppercase",
                }}
              >
                Dilpreet Singh
              </motion.p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              className="relative w-40 h-px overflow-hidden rounded-full"
              style={{ background: "rgba(255,255,255,0.06)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <motion.div
                className="absolute left-0 top-0 h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, transparent, #00e5ff, transparent)",
                  boxShadow: "0 0 8px rgba(0,229,255,0.8)",
                }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 1.8, ease: "easeInOut" }}
              />
            </motion.div>

          </div>

          {/* Bottom role tag */}
          <motion.p
            className="absolute bottom-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            style={{
              fontFamily: "monospace",
              fontSize: "10px",
              letterSpacing: "0.25em",
              color: "rgba(255,255,255,0.15)",
              textTransform: "uppercase",
            }}
          >
            AIML · Full‑Stack · Developer
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
