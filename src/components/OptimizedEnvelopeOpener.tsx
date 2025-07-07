
import { useEffect, useRef, useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ChevronRight, SkipForward } from 'lucide-react';

interface EnvelopeOpenerProps {
  onComplete: () => void;
  message?: string;
  revealSpeed?: number;
}

const OptimizedEnvelopeOpener = memo(({ 
  onComplete, 
  message = "My dearest birthday girl,\n\nToday marks another year of your beautiful existence, and I couldn't be more grateful to celebrate it with you. You bring so much joy, laughter, and love into my life.\n\nEvery moment with you feels like a gift, and I'm so lucky to share this journey with someone as amazing as you. Your kindness, your smile, your laugh - they all make my world brighter.\n\nHappy Birthday, my love! 🎂✨",
  revealSpeed = 50 
}: EnvelopeOpenerProps) => {
  const envelopeRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);
  const [showNote, setShowNote] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setShowSkip(true);
    const tl = gsap.timeline();

    // Enhanced envelope animation with glow and bounce
    tl.fromTo(envelopeRef.current, 
      { x: 0, y: 0, opacity: 0, scale: 0.3, rotation: 0 },
      { 
        x: 0, 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        rotation: 0, 
        duration: 2.5, 
        ease: "back.out(1.2)",
        filter: "drop-shadow(0 0 20px rgba(199, 206, 255, 0.6))"
      }
    )
    // Envelope flap opens with soft bounce
    .to(flapRef.current, {
      rotationX: -180,
      transformOrigin: "bottom center",
      duration: 1.8,
      ease: "power2.out"
    }, "+=1")
    // Glow effect
    .to(envelopeRef.current, {
      filter: "drop-shadow(0 0 30px rgba(229, 209, 255, 0.8))",
      duration: 0.5,
      yoyo: true,
      repeat: 1
    }, "-=0.5")
    // Note slides out from center
    .call(() => setShowNote(true), [], "+=0.5")
    // Start typing animation
    .call(() => setShowText(true), [], "+=1");

    return () => {
      tl.kill();
    };
  }, []);

  // Typing animation effect
  useEffect(() => {
    if (showText && message) {
      setIsTyping(true);
      let currentIndex = 0;
      const typeInterval = setInterval(() => {
        if (currentIndex <= message.length) {
          setDisplayText(message.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
          setTimeout(() => setShowNextButton(true), 500);
        }
      }, revealSpeed);

      return () => clearInterval(typeInterval);
    }
  }, [showText, message, revealSpeed]);

  const handleSkip = () => {
    setDisplayText(message);
    setIsTyping(false);
    setShowNextButton(true);
  };

  const handleContinue = () => {
    // Confetti burst
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
    
    setTimeout(onComplete, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Skip button */}
      {showSkip && !showNextButton && (
        <motion.button
          onClick={handleSkip}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-8 right-8 z-30 bg-white/80 backdrop-blur-sm text-purple-600 px-4 py-2 rounded-full shadow-lg hover:bg-white transition-colors flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
        >
          <SkipForward size={16} />
          <span>Skip</span>
        </motion.button>
      )}

      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          >
            {['💜', '💕', '✨', '🌟', '💖', '🎀', '🌸', '💝'][i]}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        {/* Envelope - perfectly centered */}
        <div className="flex justify-center mb-8">
          <div ref={envelopeRef} className="relative">
            <motion.div 
              className="w-80 h-56 bg-gradient-to-br from-purple-200 via-pink-200 to-purple-300 rounded-2xl shadow-2xl relative overflow-hidden border-2 border-white/50"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Envelope body with subtle pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100">
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C7CEFF' fill-opacity='0.3'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E")`
                }} />
              </div>
              
              {/* Envelope flap with enhanced gradient */}
              <div 
                ref={flapRef}
                className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-purple-300 via-pink-300 to-purple-400 z-10 border-b-2 border-white/30"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  transformStyle: 'preserve-3d'
                }}
              />

              {/* Floating hearts on envelope */}
              <motion.div
                className="absolute -top-6 -right-6 text-5xl filter drop-shadow-lg"
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 8, -8, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                💕
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute top-6 right-6 text-purple-400 text-3xl filter drop-shadow-md">💜</div>
              <div className="absolute bottom-6 left-6 text-pink-400 text-2xl filter drop-shadow-md">✨</div>
              
              {/* Wax seal effect */}
              <div className="absolute bottom-4 right-1/2 transform translate-x-1/2 w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full border-2 border-white/50 shadow-lg" />
            </motion.div>
          </div>
        </div>

        {/* Birthday Note - perfectly centered */}
        <AnimatePresence>
          {showNote && (
            <motion.div
              ref={noteRef}
              initial={{ y: 100, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, type: "spring", stiffness: 100 }}
              className="w-full max-w-lg mx-auto"
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2 border-purple-200 relative">
                {/* Paper texture overlay */}
                <div className="absolute inset-0 opacity-5 rounded-3xl" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000'%3E%3Cpath d='M0 0h100v100H0z' fill='none'/%3E%3Cpath d='M0 0l100 100M100 0L0 100' stroke='%23000' stroke-width='0.5' opacity='0.1'/%3E%3C/g%3E%3C/svg%3E")`
                }} />
                
                <div className="text-center relative z-10">
                  <motion.h3 
                    className="font-handwriting text-3xl text-purple-600 mb-6"
                    animate={{ 
                      scale: [1, 1.05, 1] 
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    A Special Message 💕
                  </motion.h3>
                  
                  <AnimatePresence>
                    {showText && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4"
                      >
                        <div className="font-handwriting text-lg text-gray-700 leading-relaxed text-center min-h-[200px] flex items-center justify-center">
                          <motion.p 
                            className="whitespace-pre-line"
                            style={{ 
                              textAlign: 'center',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            {displayText}
                            {isTyping && (
                              <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                className="inline-block ml-1"
                              >
                                |
                              </motion.span>
                            )}
                          </motion.p>
                        </div>

                        {/* Next Button */}
                        <AnimatePresence>
                          {showNextButton && (
                            <motion.button
                              onClick={handleContinue}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.5, duration: 0.8 }}
                              className="mt-8 bg-gradient-to-r from-purple-400 to-pink-400 text-white px-8 py-4 rounded-full font-medium flex items-center space-x-2 mx-auto hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg text-lg"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <span>Continue to Your Special Day</span>
                              <ChevronRight size={24} />
                            </motion.button>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Decorative corners */}
                <div className="absolute -top-2 -left-2 w-4 h-4 bg-purple-300 rounded-full opacity-60" />
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-pink-300 rounded-full opacity-60" />
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-pink-300 rounded-full opacity-60" />
                <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-purple-300 rounded-full opacity-60" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confetti elements */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`confetti-${i}`}
            data-confetti
            className="absolute w-3 h-3 rounded-full pointer-events-none"
            style={{
              left: '50%',
              top: '50%',
              backgroundColor: ['#C7CEFF', '#E5D1FF', '#F8F0FF', '#DDD6FE', '#F3E8FF'][i % 5],
            }}
          />
        ))}
      </div>
    </div>
  );
});

OptimizedEnvelopeOpener.displayName = 'OptimizedEnvelopeOpener';

export default OptimizedEnvelopeOpener;
