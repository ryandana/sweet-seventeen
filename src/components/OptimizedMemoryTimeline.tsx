import { motion } from "framer-motion";
import { useRef, memo } from "react";

const OptimizedMemoryTimeline = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);

  const memories = [
    {
      id: 1,
      title: "First Date",
      date: "",
      description:
        "First date yang penuh rasa suka dan duka 🙂, tapi untung kita bisa cepet akrabnya 💕 awal awal masih ga nyangka",
      color: "from-purple-200 to-pink-200",
      emoji: "🌹",
    },
    {
      id: 2,
      title: "First Trip",
      date: "",
      description:
        "First trip kita ke Living tapi masih kaku banget, lama lama baru bisa akrab dan enjoy bareng, kinda nervous at first 😄",
      color: "from-blue-200 to-purple-200",
      emoji: "🗺️",
    },
    {
      id: 3,
      title: "Movie Nights",
      date: "",
      description:
        "Anjay ini first time nonton sama kamu, seru bet rasanya, disini aku ngerasa kita makin nyaman bareng, ngobrol lebih lepas rasanya",
      color: "from-pink-200 to-purple-200",
      emoji: "🎬",
    },
    {
      id: 4,
      title: "Kulineran",
      date: "",
      description:
        "Paling seneng kalo nyoba banyak jajan atau makanan enak bareng kamu, kalo aku sendirian paling mager duluan, dan aku paling males ngomong buat mesen makanan 😅",
      color: "from-yellow-200 to-pink-200",
      emoji: "🔥",
    },
    {
      id: 5,
      title: "Badai Menerjang",
      date: "",
      description:
        "Semua itu cuma awalan doang, kita masih banyak banget yang harus dilalui, tapi aku yakin kita bisa lewatin semua ini bareng bareng asal bisa saling sabar sama memaafkan.",
      color: "from-orange-200 to-purple-200",
      emoji: "⛈️",
    },
    {
      id: 6,
      title: "Dance Parties",
      date: "Living room concerts",
      description:
        "Turning up the music and dancing like nobody's watching. Your moves are questionable but your joy is infectious. 💃",
      color: "from-purple-200 to-blue-200",
      emoji: "🎵",
    },
    {
      id: 7,
      title: "Surprise Adventures",
      date: "Spontaneous fun",
      description:
        "Those random decisions to drive somewhere new, try something different. You taught me that the best plans are no plans. 🚗",
      color: "from-green-200 to-purple-200",
      emoji: "🎪",
    },
    {
      id: 8,
      title: "Today",
      date: "Your special day",
      description:
        "And here we are, celebrating another year of your amazing existence. Can't wait to make more memories with you! 🎂",
      color: "from-purple-300 to-pink-300",
      emoji: "🎉",
    },
  ];

  // Always show only the first 5 memories
  const visibleMemories = memories.slice(0, 5);

  return (
    <div className="relative w-full max-w-full overflow-x-auto scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-transparent">
      <motion.div
        ref={containerRef}
        className="flex gap-6 pb-8 px-4"
        style={{
          width: "max-content",
          willChange: "transform",
        }}
      >
        {visibleMemories.map((memory, index) => (
          <motion.div
            key={memory.id}
            initial={{ opacity: 0, x: 100, rotate: Math.random() * 8 - 4 }}
            whileInView={{ opacity: 1, x: 0, rotate: Math.random() * 4 - 2 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.6,
              delay: index * 0.08,
              type: "spring",
              stiffness: 100,
            }}
            whileHover={{
              scale: 1.03,
              rotate: 0,
              zIndex: 10,
              transition: { duration: 0.2 },
            }}
            className="flex-shrink-0 w-80 group cursor-pointer"
            style={{ willChange: "transform" }}
          >
            <div
              className={`bg-gradient-to-br ${memory.color} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-white/50 backdrop-blur-sm h-full`}
            >
              {/* Post-it style header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <motion.div
                    className="text-3xl"
                    animate={{
                      rotate: [0, 8, -8, 0],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      delay: index * 0.3,
                    }}
                    style={{ willChange: "transform" }}
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
                  style={{ willChange: "transform" }}
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
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2.5,
                        delay: i * 0.3 + index * 0.1,
                      }}
                      style={{ willChange: "transform, opacity" }}
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
    </div>
  );
});

OptimizedMemoryTimeline.displayName = "OptimizedMemoryTimeline";

export default OptimizedMemoryTimeline;
