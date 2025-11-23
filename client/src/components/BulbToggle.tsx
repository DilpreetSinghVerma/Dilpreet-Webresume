import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function BulbToggle() {
  const [isDark, setIsDark] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const prefersDark = document.documentElement.classList.contains("dark");
    setIsDark(prefersDark);
  }, []);

  const toggleDarkMode = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const newDarkMode = !isDark;

    setTimeout(() => {
      if (newDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      setIsDark(newDarkMode);
    }, 600);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 1200);
  };

  return (
    <div className="fixed top-8 right-8 z-40" data-testid="bulb-toggle-container">
      {/* Wire */}
      <motion.svg
        width="3"
        height="120"
        viewBox="0 0 3 120"
        className="absolute -right-1 -top-20 overflow-visible text-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <line x1="1.5" y1="0" x2="1.5" y2="120" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      </motion.svg>

      {/* Bulb Container */}
      <motion.button
        onClick={toggleDarkMode}
        disabled={isTransitioning}
        className="relative focus:outline-none disabled:opacity-70 cursor-pointer"
        whileHover={!isTransitioning ? { scale: 1.1 } : {}}
        whileTap={!isTransitioning ? { scale: 0.95 } : {}}
        data-testid="button-bulb-toggle"
      >
        {/* Outer Glow (only in dark mode) */}
        {isDark && (
          <motion.div
            className="absolute inset-0 rounded-full bg-yellow-300 blur-2xl"
            animate={{
              opacity: [0.4, 0.6, 0.4],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ width: "80px", height: "80px", marginLeft: "-20px", marginTop: "-20px" }}
          />
        )}

        {/* Bulb SVG */}
        <svg
          width="40"
          height="60"
          viewBox="0 0 40 60"
          className="relative z-10"
          data-testid="bulb-svg"
        >
          {/* Bulb Glass */}
          <ellipse
            cx="20"
            cy="18"
            rx="14"
            ry="16"
            fill={isDark ? "#FCD34D" : "#E5E7EB"}
            stroke={isDark ? "#F59E0B" : "#9CA3AF"}
            strokeWidth="1.5"
          />

          {/* Inner Glow (dark mode only) */}
          {isDark && (
            <ellipse
              cx="20"
              cy="18"
              rx="12"
              ry="14"
              fill="#FEF08A"
              opacity="0.6"
            />
          )}

          {/* Filament */}
          <path
            d="M 16 12 Q 18 8 20 12 Q 22 8 24 12"
            stroke={isDark ? "#F59E0B" : "#D1D5DB"}
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
          />

          {/* Socket */}
          <rect
            x="14"
            y="34"
            width="12"
            height="4"
            rx="1"
            fill={isDark ? "#F97316" : "#9CA3AF"}
          />

          {/* Base */}
          <ellipse
            cx="20"
            cy="42"
            rx="8"
            ry="3"
            fill={isDark ? "#EA580C" : "#6B7280"}
          />

          {/* Base threads */}
          <line x1="14" y1="40" x2="26" y2="40" stroke={isDark ? "#DC2626" : "#4B5563"} strokeWidth="0.5" opacity="0.5" />
          <line x1="14" y1="42" x2="26" y2="42" stroke={isDark ? "#DC2626" : "#4B5563"} strokeWidth="0.5" opacity="0.5" />
          <line x1="14" y1="44" x2="26" y2="44" stroke={isDark ? "#DC2626" : "#4B5563"} strokeWidth="0.5" opacity="0.5" />
        </svg>

        {/* Transition Flash */}
        {isTransitioning && (
          <motion.div
            className="absolute inset-0 rounded-full bg-white/80"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{ width: "40px", height: "60px" }}
          />
        )}
      </motion.button>

      {/* Status Text */}
      <motion.div
        className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap text-sm font-medium text-foreground dark:text-white"
        animate={{ opacity: isTransitioning ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? "💡 On" : "💡 Off"}
      </motion.div>
    </div>
  );
}
