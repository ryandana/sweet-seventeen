import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Sparkles = () => {
  const [sparkles, setSparkles] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      delay: number;
      duration: number;
    }>
  >([]);

  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        delay: Math.random() * 3,
        duration: Math.random() * 3 + 2,
      }));
      setSparkles(newSparkles);
    };

    generateSparkles();
    const interval = setInterval(generateSparkles, 10000); // Regenerate every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
          }}
          initial={{
            scale: 1,
            opacity: 0.7,
            rotate: 0,
          }}
          animate={{
            x: [0, (Math.random() - 0.5) * 200],
            y: [0, (Math.random() - 0.5) * 200],
            opacity: [0.7, 1, 0.7],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            delay: sparkle.delay,
            duration: sparkle.duration * 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <div
            className="bg-gradient-to-r from-purple-300 to-pink-300 rounded-full opacity-70"
            style={{
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              filter: "blur(0.5px)",
              boxShadow: "0 0 6px rgba(199, 206, 255, 0.8)",
            }}
          />
        </motion.div>
      ))}

      {/* Floating hearts and stars */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`floating-${i}`}
          className="absolute text-2xl opacity-20"
          style={{
            left: `${Math.random() * 95 + 2.5}%`,
            top: `${Math.random() * 95 + 2.5}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            rotate: [0, Math.random() * 20 - 10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        >
          {i % 3 === 0 ? "💜" : i % 2 === 0 ? "✨" : "🌟"}
        </motion.div>
      ))}

      {/* Confetti burst on load */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`confetti-${i}`}
          className="absolute w-3 h-3 rounded-full"
          style={{
            left: "50%",
            top: "50%",
            backgroundColor: ["#C7CEFF", "#E5D1FF", "#F8F0FF", "#DDD6FE"][
              i % 4
            ],
          }}
          initial={{
            scale: 0,
            x: 0,
            y: 0,
            opacity: 1,
          }}
          animate={{
            scale: [0, 1, 0],
            x: (Math.random() - 0.5) * 800,
            y: (Math.random() - 0.5) * 600,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 3,
            delay: i * 0.1,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

export default Sparkles;
