
import { motion } from 'framer-motion';
import { useState, useEffect, useCallback, memo } from 'react';

const OptimizedWishBoard = memo(() => {
  const [wishes, setWishes] = useState<Array<{
    id: number;
    text: string;
    x: number;
    y: number;
    rotation: number;
    color: string;
    size: number;
  }>>([]);

  // Reduced to 5 wishes for better performance and less clutter
  const wishTexts = [
    "May your dreams come true ✨",
    "Love, laughter, and endless joy 💕",
    "You deserve all the happiness 🎈",
    "Here's to your brightest year yet 🌈",
    "Celebrating the wonderful person you are 🎂"
  ];

  const colors = [
    "from-purple-200 to-pink-200",
    "from-blue-200 to-purple-200", 
    "from-pink-200 to-purple-200",
    "from-purple-200 to-blue-200",
    "from-pink-100 to-purple-300"
  ];

  useEffect(() => {
    // Better positioning with more gaps - 5 cards only
    const positions = [
      { x: 15, y: 20 }, 
      { x: 70, y: 15 },
      { x: 20, y: 65 }, 
      { x: 75, y: 70 },
      { x: 45, y: 42 }
    ];

    const generatedWishes = wishTexts.map((text, index) => ({
      id: index,
      text,
      x: positions[index].x,
      y: positions[index].y,
      rotation: Math.random() * 8 - 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 0.9 + Math.random() * 0.15
    }));
    
    setWishes(generatedWishes);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 overflow-hidden">
      {/* Fixed canvas container to prevent horizontal scroll */}
      <div className="wish-board-canvas relative w-full h-[80vh] bg-gradient-to-br from-purple-50/50 to-pink-50/50 rounded-3xl overflow-hidden border-2 border-purple-100">
        
        {/* Reduced floating decorative elements */}
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute text-2xl opacity-10 pointer-events-none"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              willChange: 'transform',
            }}
            animate={{
              y: [0, -8, 0],
              rotate: [0, 4, -4, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 5 + Math.random() * 2,
              repeat: Infinity,
              delay: index * 1.5,
              ease: "easeInOut"
            }}
          >
            {['💜', '✨', '🌟'][index]}
          </motion.div>
        ))}

        {/* Draggable wish cards with proper constraints */}
        {wishes.map((wish, index) => (
          <motion.div
            key={wish.id}
            className="absolute cursor-grab active:cursor-grabbing select-none"
            style={{
              left: `${wish.x}%`,
              top: `${wish.y}%`,
              willChange: 'transform',
            }}
            initial={{ opacity: 0, scale: 0, rotate: wish.rotation + 180 }}
            animate={{ 
              opacity: 1, 
              scale: wish.size, 
              rotate: wish.rotation
            }}
            transition={{
              duration: 0.6,
              delay: index * 0.12,
              type: "spring",
              stiffness: 150
            }}
            drag
            dragConstraints={{
              left: -window.innerWidth * 0.25,
              right: window.innerWidth * 0.25,
              top: -window.innerHeight * 0.15,
              bottom: window.innerHeight * 0.15
            }}
            dragElastic={0.02}
            dragMomentum={false}
            whileDrag={{ 
              scale: wish.size * 1.1, 
              rotate: 0, 
              zIndex: 30,
              cursor: "grabbing",
              boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.2)"
            }}
            whileHover={{
              scale: wish.size * 1.03,
              zIndex: 20,
              transition: { duration: 0.2 }
            }}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 30 }}
          >
            <div 
              className={`bg-gradient-to-br ${wish.color} rounded-2xl p-5 shadow-lg border-2 border-white/70 backdrop-blur-sm w-56 min-h-[110px] flex flex-col justify-center`}
            >
              {/* Sticky note style header */}
              <div className="flex items-center justify-between mb-3">
                <motion.div
                  className="w-2 h-2 bg-purple-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2.5, 
                    delay: index * 0.4 
                  }}
                  style={{ willChange: 'transform' }}
                />
                <motion.div
                  className="text-purple-400 text-lg"
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 4, 
                    delay: index * 0.6 
                  }}
                  style={{ willChange: 'transform' }}
                >
                  💜
                </motion.div>
              </div>

              <p className="font-handwriting text-lg text-purple-700 leading-relaxed font-medium text-center">
                {wish.text}
              </p>

              {/* Decorative corner */}
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-white/40 rounded-full" />
              
              {/* Tape effect - simplified */}
              <div className="absolute -top-1 left-1/4 w-8 h-3 bg-white/50 rounded-sm shadow-sm transform -rotate-12" />
            </div>
          </motion.div>
        ))}

        {/* Central message - better positioned to avoid overlap */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-5 pointer-events-none"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.8, 
            delay: 1.2,
            type: "spring",
            stiffness: 150 
          }}
          style={{ willChange: 'transform, opacity' }}
        >
          <div className="bg-gradient-to-br from-purple-300/90 to-pink-300/90 rounded-2xl p-6 shadow-xl border-2 border-white/60 backdrop-blur-sm max-w-xs">
            <motion.div
              className="text-center"
              animate={{
                scale: [1, 1.01, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ willChange: 'transform' }}
            >
              <h3 className="font-handwriting text-2xl text-purple-700 mb-2">
                Make a Wish! 🌟
              </h3>
              <p className="text-purple-600 text-sm leading-relaxed">
                Drag the wishes around and make one your own
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
});

OptimizedWishBoard.displayName = 'OptimizedWishBoard';

export default OptimizedWishBoard;
