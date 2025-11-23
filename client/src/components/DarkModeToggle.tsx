import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [rocketFlying, setRocketFlying] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const prefersDark = document.documentElement.classList.contains("dark");
    setIsDark(prefersDark);
  }, []);

  const toggleDarkMode = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setRocketFlying(true);

    const newDarkMode = !isDark;

    setTimeout(() => {
      if (newDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      setIsDark(newDarkMode);
    }, 1500);

    setTimeout(() => {
      setRocketFlying(false);
      setIsAnimating(false);
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-6 right-6 z-40 flex flex-col items-end gap-4"
      data-testid="dark-mode-toggle"
    >
      {/* Sun/Moon Section */}
      <div className="relative">
        {/* Sun (visible in dark mode) */}
        <motion.img
          src="/sun.png"
          alt="Sun"
          className="w-16 h-16"
          animate={{ opacity: isDark ? 1 : 0.3, scale: isDark ? 1 : 0.8 }}
          transition={{ duration: 0.5 }}
        />

        {/* Moon (visible in light mode) */}
        <motion.img
          src="/moon.png"
          alt="Moon"
          className="w-16 h-16 absolute top-0 right-0"
          animate={{ opacity: !isDark ? 1 : 0.3, scale: !isDark ? 1 : 0.8 }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Rocket Section */}
      <motion.div
        className="flex items-start gap-3"
        animate={{
          y: rocketFlying ? -280 : 0,
          x: rocketFlying ? -20 : 0,
        }}
        transition={{
          duration: rocketFlying ? 1.5 : 0.5,
          ease: rocketFlying ? "easeInOut" : "easeOut",
        }}
      >
        {/* Rocket Image */}
        <motion.button
          onClick={toggleDarkMode}
          disabled={isAnimating}
          className="w-14 h-14 cursor-pointer hover:scale-110 transition-transform disabled:opacity-50"
          whileHover={!isAnimating ? { scale: 1.15 } : {}}
          whileTap={!isAnimating ? { scale: 0.95 } : {}}
          data-testid="button-toggle-dark-mode"
        >
          <img src="/rocket.png" alt="Rocket" className="w-full h-full" />
        </motion.button>

        {/* Comment Box */}
        <motion.div
          className="bg-white dark:bg-gray-900 border-2 border-primary/40 rounded-2xl px-4 py-2 text-sm font-medium text-foreground dark:text-white relative shadow-lg"
          animate={{ opacity: rocketFlying ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-2">
            <span className="text-xs">✨ Click to launch!</span>
          </div>
          {/* Arrow pointing to rocket */}
          <div className="absolute -right-2 top-2 text-primary/40 text-lg">▶</div>
        </motion.div>
      </motion.div>

      {/* Mode Transition Animation - Expanding circle from sun/moon */}
      {isAnimating && (
        <motion.div
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 100 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={`fixed top-6 right-6 rounded-full pointer-events-none ${
            isDark ? "bg-black" : "bg-white"
          }`}
          style={{ width: "40px", height: "40px" }}
        />
      )}
    </motion.div>
  );
}
