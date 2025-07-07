
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const WishBoard = () => {
  const [wishes, setWishes] = useState<Array<{
    id: number;
    text: string;
    x: number;
    y: number;
    rotation: number;
    color: string;
    size: number;
  }>>([]);

  const wishTexts = [
    "May your dreams come true ✨",
    "Another year of amazing adventures 🌟", 
    "Love, laughter, and endless joy 💕",
    "You deserve all the happiness 🎈",
    "Grateful for every moment with you 💜",
    "Here's to your brightest year yet 🌈",
    "You make the world more beautiful 🌸",
    "Celebrating the wonderful person you are 🎂",
    "Your smile lights up my world 😊",
    "Forever grateful for your love 💖",
    "Every day with you is a gift 🎁",
    "You're my favorite person 👫"
  ];

  const colors = [
    "from-purple-200 to-pink-200",
    "from-blue-200 to-purple-200", 
    "from-pink-200 to-purple-200",
    "from-purple-200 to-blue-200",
    "from-pink-100 to-purple-300",
    "from-purple-100 to-pink-300"
  ];

  useEffect(() => {
    // Create a grid-based positioning system for better readability
    const gridCols = 4;
    const gridRows = 3;
    const positions = [];
    
    // Generate grid positions with some randomness
    for (let row = 0; row < gridRows; row++) {
      for (let col = 0; col < gridCols; col++) {
        const baseX = (col / (gridCols - 1)) * 70 + 15; // 15% to 85%
        const baseY = (row / (gridRows - 1)) * 60 + 20; // 20% to 80%
        
        // Add some randomness to avoid perfect grid
        const randomX = baseX + (Math.random() - 0.5) * 15;
        const randomY = baseY + (Math.random() - 0.5) * 15;
        
        positions.push({ x: randomX, y: randomY });
      }
    }

    const generatedWishes = wishTexts.slice(0, 12).map((text, index) => ({
      id: index,
      text,
      x: positions[index].x,
      y: positions[index].y,
      rotation: Math.random() * 16 - 8, // -8 to 8 degrees
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 0.9 + Math.random() * 0.2 // 0.9 to 1.1
    }));
    
    setWishes(generatedWishes);
  }, []);

  // Floating decorative elements
  const floatingElements = [
    { emoji: "💜", id: "heart1" },
    { emoji: "✨", id: "star1" },
    { emoji: "🌟", id: "star2" },
    { emoji: "💕", id: "heart2" },
    { emoji: "🎈", id: "balloon1" },
    { emoji: "🎉", id: "confetti1" },
    { emoji: "🌸", id: "flower1" },
    { emoji: "💫", id: "sparkle1" },
    { emoji: "🦄", id: "unicorn1" },
    { emoji: "🌙", id: "moon1" }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-50/50 to-pink-50/50 rounded-3xl p-8 overflow-hidden">
      {/* Floating decorative elements */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={element.id}
          className="absolute text-3xl md:text-4xl opacity-20 pointer-events-none"
          style={{
            left: `${Math.random() * 90 + 5}%`,
            top: `${Math.random() * 90 + 5}%`,
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 3, -3, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            delay: index * 0.4,
            ease: "easeInOut"
          }}
        >
          {element.emoji}
        </motion.div>
      ))}

      {/* Wish cards with better spacing and readability */}
      {wishes.map((wish, index) => (
        <motion.div
          key={wish.id}
          className="absolute cursor-pointer"
          style={{
            left: `${wish.x}%`,
            top: `${wish.y}%`,
            transform: `rotate(${wish.rotation}deg) scale(${wish.size})`,
          }}
          initial={{ opacity: 0, scale: 0, rotate: wish.rotation + 180 }}
          animate={{ 
            opacity: 1, 
            scale: wish.size, 
            rotate: wish.rotation,
            y: [0, -5, 0]
          }}
          transition={{
            duration: 0.8,
            delay: index * 0.15,
            type: "spring",
            stiffness: 200,
            y: {
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2
            }
          }}
          whileHover={{
            scale: wish.size * 1.15,
            rotate: 0,
            zIndex: 20,
            transition: { duration: 0.3 }
          }}
          whileTap={{
            scale: wish.size * 0.95,
            transition: { duration: 0.1 }
          }}
        >
          <div 
            className={`bg-gradient-to-br ${wish.color} rounded-2xl p-5 shadow-lg border-2 border-white/70 backdrop-blur-sm w-64 min-h-[120px] flex flex-col justify-center`}
          >
            {/* Sticky note style header */}
            <div className="flex items-center justify-between mb-3">
              <motion.div
                className="w-3 h-3 bg-purple-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2.5, 
                  delay: index * 0.1 
                }}
              />
              <motion.div
                className="text-purple-400 text-lg"
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 4, 
                  delay: index * 0.3 
                }}
              >
                💜
              </motion.div>
            </div>

            <p className="font-handwriting text-lg text-purple-700 leading-relaxed font-medium text-center">
              {wish.text}
            </p>

            {/* Decorative corner */}
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-white/40 rounded-full" />
            
            {/* Tape effect - multiple pieces for realistic look */}
            <div className="absolute -top-2 left-1/4 w-12 h-5 bg-white/60 rounded-sm shadow-sm transform -rotate-12" />
            <div className="absolute -top-2 right-1/4 w-12 h-5 bg-white/60 rounded-sm shadow-sm transform rotate-12" />
          </div>
        </motion.div>
      ))}

      {/* Central birthday message - positioned to not overlap with cards */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
        initial={{ opacity: 0, scale: 0, rotate: 180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ 
          duration: 1.2, 
          delay: 2,
          type: "spring",
          stiffness: 200 
        }}
      >
        <div className="bg-gradient-to-br from-purple-300 to-pink-300 rounded-3xl p-8 shadow-2xl border-4 border-white/80 backdrop-blur-sm max-w-sm">
          <motion.div
            className="text-center"
            animate={{
              scale: [1, 1.03, 1]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <h3 className="font-handwriting text-3xl md:text-4xl text-purple-700 mb-4">
              Make a Wish! 🌟
            </h3>
            <p className="text-purple-600 text-lg leading-relaxed">
              Close your eyes, make a wish, and know that you deserve all the magic in the world
            </p>
          </motion.div>
          
          {/* Sparkle effects around central message */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full"
              style={{
                left: `${15 + i * 12}%`,
                top: `${10 + (i % 2) * 80}%`,
              }}
              animate={{
                scale: [0, 1.2, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default WishBoard;
