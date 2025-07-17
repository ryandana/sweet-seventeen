import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  X,
  ChevronUp,
  ChevronDown,
  RotateCcw,
} from "lucide-react";
import InteractiveCake from "./components/InteractiveCake";
import LoveList from "./components/LoveList";
import OptimizedWishBoard from "./components/OptimizedWishBoard";
import OptimizedMemoryTimeline from "./components/OptimizedMemoryTimeline";
import Sparkles from "./components/Sparkles";

gsap.registerPlugin(ScrollTrigger);

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
  url: string;
  thumbnail: string;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

function App() {
  const [showModal, setShowModal] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [showNextButton, setShowNextButton] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  // For typing animation interval
  const typingIntervalRef = useRef<number | null>(null);

  const fullText =
    "Happy Birthday 🎉\n\n Semoga kamu selalu sehat, bahagia, dan makin sayang sama aku tiap hari (harus ya! 😝) ✨\n\nSemoga semua yang kamu impiin pelan-pelan jadi nyata ya, dan semoga tahun ini penuh hal-hal indah (termasuk aku 😁) \n\nLove youu, selalu! 💕🎂";

  const playlist: Song[] = [
    {
      id: 1,
      title: "Blessing",
      artist: "AKA Virtual",
      duration: "",
      url: "/blessing.mp3",
      thumbnail: "/blessing.png",
    },
    {
      id: 2,
      title: "A Thousand Years",
      artist: "Christina Perri",
      duration: "",
      url: "/thousand.mp3",
      thumbnail: "/thousand.png",
    },
    {
      id: 3,
      title: "Tujuh Belas",
      artist: "Tulis",
      duration: "",
      url: "/tujuhbelas.mp3",
      thumbnail:
        "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=100",
    },
    {
      id: 4,
      title: "At God Mercy",
      artist: "Colorful Stage WxW",
      duration: "",
      url: "/atgodmercy.mp3",
      thumbnail:
        "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=100",
    },
    {
      id: 5,
      title: "You'll be in my heart",
      artist: "NIKI",
      duration: "",
      url: "/inmyheart.mp3",
      thumbnail:
        "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=100",
    },
  ];

  const galleryPhotos = [
    {
      id: 1,
      url: "/1.jpg",
      description: "Cowboy 🤠",
    },
    {
      id: 2,
      url: "/2.jpg",
      description: "Bapaknya ikut anjay 😂",
    },
    {
      id: 3,
      url: "/3.jpg",
      description: "Day 1 kalah challange 😁",
    },
    {
      id: 4,
      url: "/4.jpg",
      description: "Seramnyo 👻",
    },
    {
      id: 5,
      url: "/5.jpg",
      description: "Cantik banget 😍",
    },
    {
      id: 6,
      url: "/6.jpg",
      description: "Si paling literasi 📚",
    },
    {
      id: 7,
      url: "/7.jpg",
      description: "Pemuda Sibuk 🏃‍♂️",
    },
    {
      id: 8,
      url: "/8.jpg",
      description: "Membadut 🤡",
    },
    {
      id: 9,
      url: "/9.jpg",
      description: "Nice try lah 😅",
    },
    {
      id: 10,
      url: "/10.jpg",
      description: "Hidup sehat 🚶",
    },
    {
      id: 11,
      url: "/11.jpg",
      description: "Lucu banget 🥰",
    },
    {
      id: 12,
      url: "/12.jpg",
      description: "Salam KSHDI 🙏🏻",
    },
  ];

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "Apa yang paling aku seneng lakuin kalo bareng sama kamu?",
      options: [
        "Kokop",
        "Cubit Pipi",
        "Peluk",
        "Semua kecuali kokop",
      ],
      correct: 3,
      explanation:
        "Ga baik kokop kokop",
    },
    {
      id: 2,
      question: "Kita paling suka ngapain kalo lagi santai?",
      options: [
        "Deep Talk",
        "Ngegame & Nonton",
        "Sleepcall",
        "Belajar Bareng",
      ],
      correct: 1,
      explanation:
        "Masih basic ini",
    },
    {
      id: 3,
      question:
        "Tebak nomer rumahku berapa",
      options: [
        "17",
        "10",
        "7",
        "20",
      ],
      correct: 3,
      explanation: "Kalo ga salah 20 ya",
    },
    {
      id: 4,
      question:
        "Physical Touch yang paling sering kita lakuin itu apa?",
      options: [
        "Pegangan Tangan",
        "Kokop, astagfirullah",
        "Pangku",
        "Peluk",
      ],
      correct: 0,
      explanation: "Kokop itu ga baik",
    },
    {
  id: 5,
  question: "Kalau aku lagi bad mood, kamu tuh harus ngapain?",
  options: [
    "Ngasih peluk sama elus-elus",
    "Ngajakin aku makan enak",
    "Bikin aku ketawa pake jokes receh",
    "Diemin dulu baru pelan-pelan tanya kenapa",
  ],
  correct: 0,
  explanation: "Sentuhan kamu tuh obat paling ampuh 🥺",
}
  ];

  useEffect(() => {
    if (showModal && !isTyping) {
      const timer = setTimeout(() => {
        setIsTyping(true);
        typeText();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showModal]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 1.0; // Always set volume to max
    }
  }, []);

  // Auto-play on first load if not already playing
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch(() => {});
    }
  }, [isPlaying, currentSong]);

  const typeText = () => {
    let index = 0;
    typingIntervalRef.current = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        setShowNextButton(true);
        setIsTyping(false);
      }
    }, 50);
  };

  const skipTyping = () => {
    setTypedText(fullText);
    setShowNextButton(true);
    setIsTyping(false);
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextSong = () => {
    setCurrentSong((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
    setTimeout(() => {
      if (audioRef.current) audioRef.current.play().catch(() => {});
    }, 0);
  };

  const prevSong = () => {
    setCurrentSong((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
    setTimeout(() => {
      if (audioRef.current) audioRef.current.play().catch(() => {});
    }, 0);
  };

  const selectSong = (index: number) => {
    setCurrentSong(index);
    setIsPlaying(true);
    setTimeout(() => {
      if (audioRef.current) audioRef.current.play().catch(() => {});
    }, 0);
    if (audioRef.current) {
      audioRef.current.load();
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setCurrentTime(currentTime);
      if (isFinite(duration) && duration > 0) {
        setProgress((currentTime / duration) * 100);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      // Auto-play on first load
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const duration = audioRef.current.duration;
      if (!isFinite(duration) || duration <= 0) {
        return;
      }

      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const newTime = (clickX / width) * duration;

      if (isFinite(newTime)) {
        audioRef.current.currentTime = newTime;
      }
    }
  };

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowQuizResult(true);
    if (answerIndex === quizQuestions[currentQuiz].correct) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuiz < quizQuestions.length - 1) {
      setCurrentQuiz((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowQuizResult(false);
    }
  };

  const restartQuiz = () => {
    setCurrentQuiz(0);
    setSelectedAnswer(null);
    setShowQuizResult(false);
    setQuizScore(0);
  };

  const formatTime = (time: number) => {
    if (!isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 relative overflow-x-hidden font-poppins">
      {/* Sparkle Background */}
      <Sparkles />

      {/* Animated Background Elements */}
      <motion.div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-20"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-32 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-25"
          animate={{
            y: [0, 15, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-24 h-24 bg-blue-200 rounded-full opacity-15"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 right-10 w-12 h-12 bg-yellow-200 rounded-full opacity-30"
          animate={{
            y: [0, -25, 0],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-32 right-1/3 w-18 h-18 bg-green-200 rounded-full opacity-20"
          animate={{
            y: [0, 20, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Opening Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden relative"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>

              <div className="p-8 md:p-12">
                <motion.div
                  className="text-center mb-8"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h1 className="text-3xl md:text-4xl font-bold text-purple-800 mb-4">
                    A Special Message For You 💌
                  </h1>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 md:p-8 min-h-[300px] relative"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="font-dancing text-lg md:text-xl text-purple-800 leading-relaxed whitespace-pre-line">
                    {typedText}
                    {isTyping && (
                      <motion.span
                        className="text-purple-600"
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      >
                        |
                      </motion.span>
                    )}
                  </div>
                </motion.div>

                <div className="flex justify-center gap-4 mt-8">
                  {!showNextButton && isTyping && (
                    <motion.button
                      onClick={skipTyping}
                      className="px-6 py-3 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors font-medium"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Skip Animation
                    </motion.button>
                  )}

                  {showNextButton && (
                    <motion.button
                      onClick={closeModal}
                      className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:from-purple-700 hover:to-blue-700 transition-all font-medium shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        type: "spring",
                        damping: 20,
                        stiffness: 300,
                      }}
                    >
                      Continue to Celebration! 🎉
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Welcome Section */}
      <section className="min-h-screen flex items-center justify-center relative px-4">
        <div className="text-center z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.5,
              type: "spring",
              damping: 25,
            }}
          >
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-purple-800 mb-6"
              animate={{
                textShadow: [
                  "0 0 0px rgba(168, 85, 247, 0)",
                  "0 0 20px rgba(168, 85, 247, 0.3)",
                  "0 0 0px rgba(168, 85, 247, 0)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Welcome to Your
            </motion.h1>
            <motion.h2
              className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-8"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Birthday Celebration! 🎂
            </motion.h2>
            <motion.p
              className="text-xl md:text-2xl text-purple-700 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              A magical journey through our memories, wishes, and love ✨
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Cake Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-purple-800 mb-4">
            Make a Wish &amp; Blow the Cake! 🎂
          </h2>
          <p className="text-purple-600 text-xl">
            Tap the cake and make a wish come true!
          </p>
        </div>
        <InteractiveCake />
      </section>

      {/* Optimized Wishboard Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-purple-800 mb-4">
            Wish Board
          </h2>
          <p className="text-purple-600 text-xl">
            Warm wishes from everyone who loves you 💖
          </p>
        </div>
        <OptimizedWishBoard />
      </section>

      {/* Love List Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-purple-800 mb-4">
            Alasan aku suka kamu 💜
          </h2>
          <p className="text-purple-600 text-xl">
            100 Hal tentang kamu yang bikin aku jatuh cinta setiap hari
          </p>
        </div>
        <LoveList />
      </section>

      {/* Optimized Memory Timeline Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-purple-800 mb-4">
            Memory Timeline
          </h2>
          <p className="text-purple-600 text-xl">
            Lihat momen terindah kita!
          </p>
        </div>
        <OptimizedMemoryTimeline />
      </section>

      {/* Polaroid Gallery Section (moved before quiz) */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-purple-800 mb-4">
              Our Beautiful Memories
            </h2>
            <p className="text-purple-600 text-xl max-w-2xl mx-auto">
              Semua foto ini kenangan indah yang kita buat bersama. Klik buat liat preview lebih besar!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {galleryPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                className="bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 p-4 pb-16 rounded-2xl shadow-xl border border-purple-200/60 transform-gpu cursor-pointer hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 30, rotate: Math.random() * 10 - 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  damping: 20,
                  stiffness: 300,
                }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  rotate: 0,
                  zIndex: 10,
                  transition: { type: "spring", damping: 20, stiffness: 400 },
                }}
                onClick={() => setSelectedPhoto(photo.id)}
              >
                <div className="aspect-square overflow-hidden rounded-xl mb-4 border-2 border-purple-200/60 shadow-md">
                  <motion.img
                    src={photo.url}
                    alt={photo.description}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-purple-800 font-medium text-center text-base leading-relaxed">
                  {photo.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Preview Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-4xl max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white/90 transition-colors"
                >
                  <X className="w-6 h-6 text-gray-700" />
                </button>
                <img
                  src={galleryPhotos.find((p) => p.id === selectedPhoto)?.url}
                  alt={
                    galleryPhotos.find((p) => p.id === selectedPhoto)
                      ?.description
                  }
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
                <div className="p-6">
                  <p className="text-purple-800 text-xl font-medium text-center">
                    {
                      galleryPhotos.find((p) => p.id === selectedPhoto)
                        ?.description
                    }
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Quiz Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-purple-800 mb-4">
              Fun Quiz Time! 🎯
            </h2>
            <p className="text-purple-600 text-xl">
              Ayo kita liat seberapa kamu inget tentang hubungan kita 😄
            </p>
          </motion.div>

          <motion.div
            className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-purple-800 font-medium">
                  Pertanyaan {currentQuiz + 1} dari {quizQuestions.length}
                </span>
                <div className="flex items-center gap-4">
                  <span className="text-purple-800 font-medium">
                    Skor: {quizScore}/{quizQuestions.length}
                  </span>
                  <button
                    onClick={restartQuiz}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors font-medium text-sm"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Restart
                  </button>
                </div>
              </div>
              <div className="w-full bg-purple-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${
                      ((currentQuiz + 1) / quizQuestions.length) * 100
                    }%`,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>

            <div className="mb-8">
              <motion.h3
                className="text-2xl font-semibold text-purple-800 mb-6"
                key={currentQuiz}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {quizQuestions[currentQuiz].question}
              </motion.h3>

              <div className="space-y-4">
                {quizQuestions[currentQuiz].options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleQuizAnswer(index)}
                    disabled={showQuizResult}
                    className={`w-full p-4 text-left rounded-2xl border-2 transition-all font-medium ${
                      showQuizResult
                        ? index === quizQuestions[currentQuiz].correct
                          ? "bg-green-100 border-green-300 text-green-800"
                          : index === selectedAnswer
                          ? "bg-red-100 border-red-300 text-red-800"
                          : "bg-white/60 border-white/40 text-purple-700"
                        : "bg-white/60 border-white/40 text-purple-700 hover:bg-white/80 hover:border-purple-300"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: showQuizResult ? 1 : 1.02 }}
                    whileTap={{ scale: showQuizResult ? 1 : 0.98 }}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </div>

            {showQuizResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <div
                  className={`p-4 rounded-2xl ${
                    selectedAnswer === quizQuestions[currentQuiz].correct
                      ? "bg-green-100 border border-green-300"
                      : "bg-blue-100 border border-blue-300"
                  }`}
                >
                  <p className="text-purple-800 font-medium">
                    {quizQuestions[currentQuiz].explanation}
                  </p>
                </div>

                {currentQuiz < quizQuestions.length - 1 ? (
                  <motion.button
                    onClick={nextQuestion}
                    className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:from-purple-700 hover:to-blue-700 transition-all font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Next Question →
                  </motion.button>
                ) : (
                  <motion.div
                    className="mt-4 text-center"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                  >
                    <p className="text-2xl font-bold text-purple-800 mb-2">
                      Quiz Selesai! 🎉
                    </p>
                    <p className="text-purple-700">
                      Skormu {quizScore} dari {quizQuestions.length}!
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Music Player */}
      <div
        className={`fixed z-40 ${
          window.innerWidth < 768
            ? "bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-sm px-4"
            : "bottom-8 right-8"
        }`}
      >
        <AnimatePresence>
          {isPlayerExpanded && (
            <motion.div
              className="mb-4 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 p-6 w-full md:w-80"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-purple-800 font-semibold">Now Playing</h3>
                <button
                  onClick={() => setIsPlayerExpanded(false)}
                  className="text-purple-600 hover:text-purple-800"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={playlist[currentSong].thumbnail}
                  alt={playlist[currentSong].title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-purple-800 font-medium truncate">
                    {playlist[currentSong].title}
                  </p>
                  <p className="text-purple-600 text-sm truncate">
                    {playlist[currentSong].artist}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-4 mb-4">
                <motion.button
                  onClick={prevSong}
                  className="text-purple-600 hover:text-purple-800"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <SkipBack className="w-5 h-5" />
                </motion.button>
                <motion.button
                  onClick={toggleAudio}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-full p-3 text-white hover:from-purple-700 hover:to-blue-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6 ml-0.5" />
                  )}
                </motion.button>
                <motion.button
                  onClick={nextSong}
                  className="text-purple-600 hover:text-purple-800"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <SkipForward className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="space-y-2 max-h-40 overflow-y-auto">
                {playlist.map((song, index) => (
                  <motion.div
                    key={song.id}
                    className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors ${
                      index === currentSong
                        ? "bg-purple-100"
                        : "hover:bg-purple-50"
                    }`}
                    onClick={() => selectSong(index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <img
                      src={song.thumbnail}
                      alt={song.title}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-purple-800 text-sm font-medium truncate">
                        {song.title}
                      </p>
                      <p className="text-purple-600 text-xs truncate">
                        {song.artist}
                      </p>
                    </div>
                    <span className="text-purple-600 text-xs">
                      {song.duration}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 p-4 w-full md:w-80"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, type: "spring", damping: 25, stiffness: 300 }}
        >
          <div className="flex items-center space-x-4 mb-3">
            <div className="relative">
              <img
                src={playlist[currentSong].thumbnail}
                alt={playlist[currentSong].title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                <circle
                  cx="50%"
                  cy="50%"
                  r="22"
                  fill="none"
                  stroke="rgba(168, 85, 247, 0.3)"
                  strokeWidth="2"
                />
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="22"
                  fill="none"
                  stroke="rgba(168, 85, 247, 0.9)"
                  strokeWidth="2"
                  strokeDasharray={`${2 * Math.PI * 22}`}
                  strokeDashoffset={`${
                    2 * Math.PI * 22 * (1 - progress / 100)
                  }`}
                  transition={{ duration: 0.3 }}
                />
              </svg>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-purple-800 font-medium text-sm truncate">
                {playlist[currentSong].title}
              </p>
              <p className="text-purple-600 text-xs truncate">
                {playlist[currentSong].artist}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <motion.button
                onClick={toggleAudio}
                className="text-purple-600 hover:text-purple-800 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5" />
                )}
              </motion.button>
              <motion.button
                onClick={() => setIsPlayerExpanded(!isPlayerExpanded)}
                className="text-purple-600 hover:text-purple-800 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronUp className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-3">
            <div
              className="w-full bg-purple-200 rounded-full h-2 cursor-pointer"
              onClick={handleProgressClick}
            >
              <motion.div
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="flex justify-between text-xs text-purple-600 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <audio
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={nextSong}
            preload="metadata"
            src={playlist[currentSong].url}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default App;
