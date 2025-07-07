import { useState, useEffect, useCallback, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoveList = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const loveReasons = [
    "The way you laugh at your own jokes before telling them 😄",
    "Your sleepy voice in the morning that melts my heart ☀️😴",
    "How you dance when you think nobody's watching 💃",
    "Your terrible but adorable singing in the shower 🎵",
    "The way you scrunch your nose when you're thinking 🤔",
    "How you always steal my hoodies and look better in them 👕",
    "Your incredible ability to make me smile on bad days 😊",
    "The way you get excited about small things like finding a good parking spot 🚗",
    "How you always know exactly what to say to make me feel better 💬",
    "Your cute snores that I pretend to be annoyed by 😴",
    "The way you hold my hand like you never want to let go 🤝",
    "How you remember every little detail about things I care about 📝",
    "Your contagious enthusiasm for trying new foods 🍕",
    "The way you look at me like I'm the only person in the room 👀",
    "How you make even boring errands fun adventures 🛒",
    "Your ability to find the silver lining in any situation ☁️",
    "The way you scrunch up your face when you're concentrating 🎯",
    "How you always share your snacks, even your favorites 🍿",
    "Your terrible sense of direction that leads to our best discoveries 🗺️",
    "The way you hum random songs throughout the day 🎶",
  ];

  const nextReason = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % loveReasons.length);
  }, [loveReasons.length]);

  const prevReason = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + loveReasons.length) % loveReasons.length
    );
  }, [loveReasons.length]);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying((prev) => !prev);
  }, []);

  // Optimize auto-play with proper cleanup
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(nextReason, 4000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, nextReason]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center py-16 px-4 bg-gradient-to-br from-purple-50/30 to-pink-50/30 w-full max-w-full overflow-hidden"
    >
      <div className="max-w-4xl mx-auto text-center w-full">
        <motion.h2
          className="font-handwriting text-4xl md:text-5xl text-purple-600 mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          100 Things I Love About You 💜
        </motion.h2>

        <div className="relative w-full max-w-2xl mx-auto">
          {/* Main carousel container with invisible click areas */}
          <div
            className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-purple-200 min-h-[300px] flex items-center justify-center"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            style={{ willChange: "auto" }}
          >
            {/* Invisible left click area */}
            <div
              className="absolute left-0 top-0 w-1/3 h-full cursor-pointer z-10"
              onClick={prevReason}
              aria-label="Previous reason"
            />

            {/* Invisible right click area */}
            <div
              className="absolute right-0 top-0 w-1/3 h-full cursor-pointer z-10"
              onClick={nextReason}
              aria-label="Next reason"
            />

            {/* Love reason number - using transform for better performance */}
            <motion.div
              className="absolute top-4 left-6 text-6xl font-handwriting text-purple-300 opacity-50"
              key={`number-${currentIndex}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.5, scale: 1 }}
              transition={{ duration: 0.5 }}
              style={{ willChange: "transform, opacity" }}
            >
              #{currentIndex + 1}
            </motion.div>

            {/* Current reason */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-center px-8"
                style={{ willChange: "transform, opacity" }}
              >
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
                  {loveReasons[currentIndex]}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Decorative hearts - optimized animations */}
            <motion.div
              className="absolute -top-4 -right-4 text-4xl"
              animate={{
                rotate: [0, 8, -8, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ willChange: "transform" }}
            >
              💕
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 text-3xl"
              animate={{
                rotate: [0, -8, 8, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              style={{ willChange: "transform" }}
            >
              💖
            </motion.div>
          </div>

          {/* Progress indicator */}
          <div className="mt-8 flex justify-center">
            <div className="flex space-x-2">
              {[...Array(Math.min(10, loveReasons.length))].map((_, i) => {
                const isActive =
                  i === Math.floor((currentIndex / loveReasons.length) * 10);
                return (
                  <motion.div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      isActive ? "bg-purple-400" : "bg-purple-200"
                    }`}
                    animate={{ scale: isActive ? 1.2 : 1 }}
                    style={{ willChange: "transform" }}
                  />
                );
              })}
            </div>
          </div>

          {/* Counter */}
          <motion.p
            className="mt-4 text-purple-500 font-medium"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {currentIndex + 1} of {loveReasons.length} reasons
          </motion.p>

          {/* Auto-play toggle */}
          <motion.button
            onClick={toggleAutoPlay}
            className={`mt-6 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              isAutoPlaying
                ? "bg-purple-200 text-purple-700"
                : "bg-gray-200 text-gray-600"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ willChange: "transform" }}
          >
            {isAutoPlaying ? "Pause Auto-play ⏸️" : "Resume Auto-play ▶️"}
          </motion.button>

          {/* Hint text */}
          <p className="mt-2 text-sm text-purple-400 opacity-70">
            Click left or right side to navigate
          </p>
        </div>

        {/* Reduced floating hearts for performance - using transform */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                willChange: "transform",
              }}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 8, -8, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut",
              }}
            >
              {["💜", "💕", "💖"][i]}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
});

LoveList.displayName = "LoveList";

export default LoveList;
