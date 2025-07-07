
import { motion, useAnimation } from 'framer-motion';
import { useRef, useEffect } from 'react';

const MemoryTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const memories = [
    {
      id: 1,
      title: "First Date",
      date: "That magical evening",
      description: "When we first met and I knew you were special. The way you laughed at my terrible jokes made my heart skip a beat. 💕",
      color: "from-purple-200 to-pink-200",
      emoji: "🌹"
    },
    {
      id: 2,
      title: "Our First Trip",
      date: "Adventure begins",
      description: "Exploring new places together, getting lost but finding ourselves. Every wrong turn led to a new memory. ✈️",
      color: "from-blue-200 to-purple-200",
      emoji: "🗺️"
    },
    {
      id: 3,
      title: "Movie Nights",
      date: "Cozy evenings",
      description: "Countless nights of terrible movies, amazing snacks, and the best company. You make even the worst films perfect. 🍿",
      color: "from-pink-200 to-purple-200",
      emoji: "🎬"
    },
    {
      id: 4,
      title: "Cooking Disasters",
      date: "Kitchen chaos",
      description: "Remember when we tried to make that fancy dinner? We may have failed at cooking, but we succeeded at laughing. 👨‍🍳",
      color: "from-yellow-200 to-pink-200",
      emoji: "🔥"
    },
    {
      id: 5,
      title: "Lazy Sundays",
      date: "Perfect mornings",
      description: "Those slow mornings when we had nowhere to be. Just us, coffee, and endless conversations about everything and nothing. ☕",
      color: "from-orange-200 to-purple-200",
      emoji: "☀️"
    },
    {
      id: 6,
      title: "Dance Parties",
      date: "Living room concerts",
      description: "Turning up the music and dancing like nobody's watching. Your moves are questionable but your joy is infectious. 💃",
      color: "from-purple-200 to-blue-200",
      emoji: "🎵"
    },
    {
      id: 7,
      title: "Surprise Adventures",
      date: "Spontaneous fun",
      description: "Those random decisions to drive somewhere new, try something different. You taught me that the best plans are no plans. 🚗",
      color: "from-green-200 to-purple-200",
      emoji: "🎪"
    },
    {
      id: 8,
      title: "Today",
      date: "Your special day",
      description: "And here we are, celebrating another year of your amazing existence. Can't wait to make more memories with you! 🎂",
      color: "from-purple-300 to-pink-300",
      emoji: "🎉"
    }
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Auto-scroll animation
    const startAutoScroll = async () => {
      while (true) {
        // Scroll to the right
        await controls.start({
          x: -(container.scrollWidth - container.clientWidth),
          transition: { duration: 30, ease: "linear" }
        });
        
        // Pause at the end
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Scroll back to start
        await controls.start({
          x: 0,
          transition: { duration: 20, ease: "linear" }
        });
        
        // Pause at the beginning
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    };

    const timer = setTimeout(startAutoScroll, 2000);
    return () => clearTimeout(timer);
  }, [controls]);

  return (
    <div className="relative overflow-hidden">
      <motion.div 
        ref={containerRef}
        animate={controls}
        className="flex gap-6 pb-8 px-4"
        style={{ width: 'max-content' }}
        onHoverStart={() => controls.stop()}
        onHoverEnd={() => {
          // Resume auto-scroll after hover ends
          setTimeout(() => {
            const container = containerRef.current;
            if (container) {
              controls.start({
                x: -(container.scrollWidth - container.clientWidth),
                transition: { duration: 20, ease: "linear" }
              });
            }
          }, 1000);
        }}
      >
        {memories.map((memory, index) => (
          <motion.div
            key={memory.id}
            initial={{ opacity: 0, x: 100, rotate: Math.random() * 10 - 5 }}
            whileInView={{ opacity: 1, x: 0, rotate: Math.random() * 6 - 3 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ 
              scale: 1.05, 
              rotate: 0,
              zIndex: 10,
              transition: { duration: 0.3 }
            }}
            className="flex-shrink-0 w-80 group cursor-pointer"
          >
            <div className={`bg-gradient-to-br ${memory.color} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-white/50 backdrop-blur-sm h-full`}>
              {/* Post-it style header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <motion.div
                    className="text-3xl"
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 3, 
                      delay: index * 0.2 
                    }}
                  >
                    {memory.emoji}
                  </motion.div>
                  <div>
                    <h3 className="font-handwriting text-xl text-purple-700 font-bold">
                      {memory.title}
                    </h3>
                    <p className="text-purple-500 text-sm font-medium">
                      {memory.date}
                    </p>
                  </div>
                </div>
                
                {/* Decorative pin */}
                <motion.div
                  className="w-4 h-4 bg-purple-400 rounded-full shadow-md"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed font-medium">
                  {memory.description}
                </p>

                {/* Decorative doodles */}
                <div className="flex justify-end space-x-2 pt-2">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-purple-400 rounded-full"
                      animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2, 
                        delay: i * 0.3 + index * 0.1
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Tape effect */}
              <div className="absolute -top-2 left-8 w-12 h-6 bg-white/60 rounded-sm shadow-sm transform -rotate-12" />
              <div className="absolute -top-2 right-8 w-12 h-6 bg-white/60 rounded-sm shadow-sm transform rotate-12" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Auto-scroll indicator */}
      <motion.div 
        className="mt-4 mx-auto w-32 h-2 bg-purple-200 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
          animate={{
            x: ["-100%", "100%"]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 2
          }}
          style={{ width: "30%" }}
        />
      </motion.div>
    </div>
  );
};

export default MemoryTimeline;
