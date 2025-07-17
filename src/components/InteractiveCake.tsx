import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const InteractiveCake = () => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [showWish, setShowWish] = useState(false);
  const [blowAnimationComplete, setBlowAnimationComplete] = useState(false);

  const blowCandles = () => {
    setCandlesLit(false);
    setTimeout(() => {
      setShowWish(true);
      setBlowAnimationComplete(true);
    }, 1000);
  };

  const relightCandles = () => {
    setCandlesLit(true);
    setShowWish(false);
    setBlowAnimationComplete(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4">
      <div className="text-center max-w-2xl mx-auto">
        <motion.h2
          className="font-handwriting text-4xl md:text-5xl text-purple-600 mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Make a Birthday Wish! 🧁
        </motion.h2>

        <div className="relative">
          {/* Birthday Cake */}
          <motion.div
            className="relative mx-auto w-80 h-80"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            {/* Cake Base */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-32 bg-gradient-to-t from-pink-300 to-pink-200 rounded-2xl shadow-lg">
              {/* Cake decorations */}
              <div className="absolute top-2 left-4 w-4 h-4 bg-purple-300 rounded-full"></div>
              <div className="absolute top-4 right-6 w-3 h-3 bg-yellow-300 rounded-full"></div>
              <div className="absolute bottom-4 left-8 w-2 h-2 bg-blue-300 rounded-full"></div>
              <div className="absolute bottom-6 right-4 w-5 h-2 bg-green-300 rounded-full"></div>
            </div>

            {/* Middle Layer */}
            <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-56 h-24 bg-gradient-to-t from-purple-300 to-purple-200 rounded-xl shadow-md">
              <div className="absolute top-2 left-6 w-3 h-3 bg-pink-400 rounded-full"></div>
              <div className="absolute top-3 right-8 w-2 h-2 bg-yellow-400 rounded-full"></div>
            </div>

            {/* Top Layer */}
            <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 w-48 h-20 bg-gradient-to-t from-yellow-300 to-yellow-200 rounded-lg shadow-sm">
              <div className="absolute top-1 left-4 w-2 h-2 bg-purple-400 rounded-full"></div>
              <div className="absolute top-2 right-6 w-3 h-3 bg-pink-400 rounded-full"></div>
            </div>

            {/* Candles */}
            <div className="absolute bottom-48 left-1/2 transform -translate-x-1/2 flex space-x-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="relative">
                  {/* Candle stick */}
                  <div className="w-2 h-12 bg-gradient-to-t from-red-400 to-red-300 rounded-full"></div>

                  {/* Flame */}
                  <AnimatePresence>
                    {candlesLit && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute -top-3 left-1/2 transform -translate-x-1/2"
                      >
                        <motion.div
                          className="w-3 h-4 bg-gradient-to-t from-orange-400 to-yellow-300 rounded-full"
                          animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.8, 1, 0.8],
                          }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: i * 0.1,
                          }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Smoke effect when blown out */}
                  <AnimatePresence>
                    {!candlesLit && (
                      <motion.div
                        initial={{ opacity: 0, y: 0, scale: 0.5 }}
                        animate={{
                          opacity: [0, 0.7, 0],
                          y: [-10, -30, -50],
                          scale: [0.5, 1, 1.5],
                          x: [
                            0,
                            Math.random() * 10 - 5,
                            Math.random() * 20 - 10,
                          ],
                        }}
                        transition={{ duration: 2, delay: i * 0.1 }}
                        className="absolute -top-3 left-1/2 transform -translate-x-1/2"
                      >
                        <div className="w-2 h-2 bg-gray-400 rounded-full opacity-50"></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Sparkles around cake */}
            {blowAnimationComplete && (
              <>
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 1.2, 0],
                      opacity: [0, 1, 0],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </>
            )}
          </motion.div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-center space-x-4">
            <motion.button
              onClick={blowCandles}
              disabled={!candlesLit}
              className={`px-6 py-3 rounded-full font-handwriting text-lg ${
                candlesLit
                  ? "bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:from-purple-500 hover:to-pink-500"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              } transition-all duration-300 shadow-lg`}
              whileHover={candlesLit ? { scale: 1.05 } : {}}
              whileTap={candlesLit ? { scale: 0.95 } : {}}
            >
              {candlesLit ? "Blow Out Candles 💨" : "Candles Blown! ✨"}
            </motion.button>

            {!candlesLit && (
              <motion.button
                onClick={relightCandles}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-6 py-3 bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-full font-handwriting text-lg hover:from-orange-500 hover:to-red-500 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Light Again 🔥
              </motion.button>
            )}
          </div>

          {/* Wish Message */}
          <AnimatePresence>
            {showWish && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.8 }}
                className="mt-8 bg-gradient-to-br from-purple-200 to-pink-200 rounded-2xl p-6 border-2 border-white/70 shadow-lg"
              >
                <h3 className="font-handwriting text-2xl text-purple-700 mb-4">
                  Your Wish Has Been Made! ⭐
                </h3>
                <p className="text-purple-600 leading-relaxed">
                  Semoga di usia yang baru ini kamu dapetin banyak kebahagiaan,
                  petualangan seru, dan cinta yang nggak ada habisnya. Kamu
                  pantes banget dapetin momen-momen indah yang bisa dikenang selamanya! 💜
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default InteractiveCake;
