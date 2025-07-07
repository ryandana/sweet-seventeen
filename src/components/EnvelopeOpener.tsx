
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ChevronRight } from 'lucide-react';

interface EnvelopeOpenerProps {
  onComplete: () => void;
}

const EnvelopeOpener = ({ onComplete }: EnvelopeOpenerProps) => {
  const envelopeRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);
  const [showNote, setShowNote] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();

    // Envelope slides in slower
    tl.fromTo(envelopeRef.current, 
      { x: -200, opacity: 0, rotation: -10 },
      { x: 0, opacity: 1, rotation: 0, duration: 2.5, ease: "back.out(1.7)" }
    )
    // Envelope flap opens slower
    .to(flapRef.current, {
      rotationX: -180,
      transformOrigin: "bottom center",
      duration: 1.8,
      ease: "power2.out"
    }, "+=1")
    // Note slides out
    .call(() => setShowNote(true), [], "+=0.5")
    // Text appears with write-on effect slower
    .call(() => setShowText(true), [], "+=1.5")
    // Show next button after text is fully written
    .call(() => setShowNextButton(true), [], "+=4");

    return () => {
      tl.kill();
    };
  }, []);

  const handleContinue = () => {
    // Add confetti burst
    const confetti = document.querySelectorAll('[data-confetti]');
    confetti.forEach((el, i) => {
      gsap.fromTo(el, 
        { scale: 0, opacity: 1 },
        { 
          scale: 1, 
          opacity: 0, 
          x: (Math.random() - 0.5) * 400,
          y: (Math.random() - 0.5) * 300,
          duration: 2,
          delay: i * 0.05
        }
      );
    });
    
    setTimeout(onComplete, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated wave background */}
      <div className="absolute inset-0">
        <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C7CEFF" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#E5D1FF" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#F8F0FF" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,300 Q300,200 600,250 T1200,300 L1200,800 L0,800 Z"
            fill="url(#waveGradient)"
            animate={{
              d: [
                "M0,300 Q300,200 600,250 T1200,300 L1200,800 L0,800 Z",
                "M0,320 Q300,220 600,270 T1200,320 L1200,800 L0,800 Z",
                "M0,300 Q300,200 600,250 T1200,300 L1200,800 L0,800 Z"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M0,400 Q400,300 800,350 T1200,400 L1200,800 L0,800 Z"
            fill="url(#waveGradient)"
            animate={{
              d: [
                "M0,400 Q400,300 800,350 T1200,400 L1200,800 L0,800 Z",
                "M0,380 Q400,280 800,330 T1200,380 L1200,800 L0,800 Z",
                "M0,400 Q400,300 800,350 T1200,400 L1200,800 L0,800 Z"
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </svg>
      </div>

      {/* Background sparkles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-300 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.7, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Envelope */}
        <div ref={envelopeRef} className="relative">
          <motion.div 
            className="w-80 h-56 bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg shadow-2xl relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Envelope body */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100" />
            
            {/* Envelope flap */}
            <div 
              ref={flapRef}
              className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-purple-300 to-pink-300 z-10"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                transformStyle: 'preserve-3d'
              }}
            />

            {/* Floating heart on envelope */}
            <motion.div
              className="absolute -top-4 -right-4 text-4xl"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              💕
            </motion.div>

            {/* Envelope decorative elements */}
            <div className="absolute top-4 right-4 text-purple-400 text-2xl">💜</div>
            <div className="absolute bottom-4 left-4 text-pink-400 text-xl">✨</div>
          </motion.div>
        </div>

        {/* Birthday Note */}
        <AnimatePresence>
          {showNote && (
            <motion.div
              ref={noteRef}
              initial={{ y: 50, opacity: 0, scale: 0.8 }}
              animate={{ y: -100, opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, type: "spring", stiffness: 80 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <div className="w-96 max-w-[90vw] bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-purple-200">
                <div className="text-center">
                  <h3 className="font-handwriting text-2xl text-purple-600 mb-4">
                    A Special Message 💕
                  </h3>
                  
                  <AnimatePresence>
                    {showText && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-4"
                      >
                        <motion.p 
                          className="font-handwriting text-lg text-gray-700 leading-relaxed"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 3, ease: "easeInOut" }}
                          style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
                        >
                          My dearest birthday girl,
                        </motion.p>
                        
                        <motion.p 
                          className="text-gray-600 leading-relaxed"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 2, duration: 1.2 }}
                        >
                          Today marks another year of your beautiful existence, 
                          and I couldn't be more grateful to celebrate it with you. 
                          You bring so much joy, laughter, and love into my life.
                        </motion.p>
                        
                        <motion.p 
                          className="font-handwriting text-purple-600 text-xl"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 3.5, duration: 1 }}
                        >
                          Happy Birthday, my love! 🎂✨
                        </motion.p>

                        {/* Next Button */}
                        <AnimatePresence>
                          {showNextButton && (
                            <motion.button
                              onClick={handleContinue}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.5, duration: 0.8 }}
                              className="mt-6 bg-gradient-to-r from-purple-400 to-pink-400 text-white px-6 py-3 rounded-full font-medium flex items-center space-x-2 mx-auto hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <span>Continue to Your Special Day</span>
                              <ChevronRight size={20} />
                            </motion.button>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confetti elements for burst effect */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`confetti-${i}`}
            data-confetti
            className="absolute w-3 h-3 rounded-full pointer-events-none"
            style={{
              left: '50%',
              top: '50%',
              backgroundColor: ['#C7CEFF', '#E5D1FF', '#F8F0FF', '#DDD6FE'][i % 4],
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default EnvelopeOpener;
