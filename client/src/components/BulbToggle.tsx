import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function BulbToggle() {
  const [isDark, setIsDark] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    // Ensure dark mode is set on first load
    document.documentElement.classList.add("dark");
    setIsDark(true);
  }, []);

  const toggleDarkMode = () => {
    setShowOverlay(true);

    setTimeout(() => {
      const newDarkMode = !isDark;
      if (newDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      setIsDark(newDarkMode);
    }, 250);

    setTimeout(() => {
      setShowOverlay(false);
    }, 800);
  };

  return (
    <>
      {/* Bulb Container with Swing Animation */}
      <motion.div
        className="fixed top-0 right-10 flex flex-col items-center cursor-pointer z-40"
        animate={{
          rotate: [0, 5, -5, 5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "top center" }}
        data-testid="bulb-toggle-container"
      >
        {/* Wire */}
        <motion.div
          className="w-0.5 h-20 bg-gray-600 dark:bg-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        />

        {/* Bulb */}
        <motion.button
          onClick={toggleDarkMode}
          className="relative w-16 h-16 rounded-full focus:outline-none cursor-pointer transition-all duration-1000"
          style={{
            background: isDark ? "#ffeb3b" : "#e0e0e0",
            boxShadow: isDark ? "0 0 40px rgba(255,235,59,0.8)" : "0 0 10px rgba(0,0,0,0.1)",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          data-testid="button-bulb-toggle"
        >
          {/* Inner shine effect for dark mode */}
          {isDark && (
            <motion.div
              className="absolute inset-2 rounded-full bg-yellow-100 opacity-40"
              animate={{
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </motion.button>
      </motion.div>

      {/* Overlay Animation */}
      {showOverlay && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full pointer-events-none z-30"
          style={{
            background: isDark
              ? "radial-gradient(circle at top right, #000, transparent)"
              : "radial-gradient(circle at top right, #fff, transparent)",
            willChange: "opacity",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        />
      )}
    </>
  );
}
