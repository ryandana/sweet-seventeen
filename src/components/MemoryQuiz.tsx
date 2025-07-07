
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MemoryQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    {
      id: 1,
      question: "Where did we have our first date?",
      options: [
        "That cozy café downtown",
        "The park with the pretty fountain", 
        "The movie theater",
        "That little restaurant you picked"
      ],
      correct: 0,
      explanation: "I was so nervous but you made me feel so comfortable! ☕💕"
    },
    {
      id: 2,
      question: "What's the first movie we watched together?",
      options: [
        "A romantic comedy you suggested",
        "That action movie I wanted to see",
        "A horror movie we both regretted",
        "A Disney movie that made us both cry"
      ],
      correct: 3,
      explanation: "We both teared up and tried to hide it from each other! 🥺✨"
    },
    {
      id: 3,
      question: "What's my favorite thing you do when you're sleepy?",
      options: [
        "You scrunch up your nose",
        "You get extra cuddly", 
        "You talk in that adorable sleepy voice",
        "All of the above"
      ],
      correct: 3,
      explanation: "Honestly, everything you do when sleepy is absolutely adorable! 😴💜"
    },
    {
      id: 4,
      question: "What song always makes us both smile?",
      options: [
        "That cheesy love song on the radio",
        "The song from our first dance",
        "That silly song we made up",
        "The one you hum in the shower"
      ],
      correct: 1,
      explanation: "Every time it comes on, we both get that same goofy smile! 🎵💃"
    },
    {
      id: 5,
      question: "What's our favorite lazy Sunday activity?",
      options: [
        "Binge-watching shows in pajamas",
        "Cooking breakfast together",
        "Taking long walks",
        "Just talking about everything and nothing"
      ],
      correct: 0,
      explanation: "Those perfect lazy mornings are some of my favorite memories! 📺💕"
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizComplete(true);
      }
    }, 3000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return "Perfect! You know me so well! 🥰";
    if (percentage >= 80) return "Amazing! We really are meant for each other! 💜";
    if (percentage >= 60) return "Not bad! We have so many more memories to make! 😊";
    return "We need more quality time together! 😉💕";
  };

  if (quizComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center py-16 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="bg-gradient-to-br from-purple-200 to-pink-200 rounded-3xl p-8 md:p-12 border-2 border-white/70 shadow-2xl">
            <motion.div
              className="text-6xl mb-6"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity
              }}
            >
              🎉
            </motion.div>
            
            <h2 className="font-handwriting text-3xl md:text-4xl text-purple-700 mb-6">
              Quiz Complete!
            </h2>
            
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-purple-600 mb-2">
                {score}/{questions.length}
              </div>
              <p className="text-xl text-purple-600 font-handwriting">
                {getScoreMessage()}
              </p>
            </div>

            <motion.button
              onClick={resetQuiz}
              className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-8 py-3 rounded-full font-handwriting text-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Play Again 🔄
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.h2 
          className="font-handwriting text-4xl md:text-5xl text-purple-600 text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our Memory Quiz 🧠💕
        </motion.h2>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-purple-500 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>Score: {score}/{currentQuestion + (showResult ? 1 : 0)}</span>
          </div>
          <div className="w-full bg-purple-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-purple-200"
          >
            <h3 className="font-handwriting text-2xl md:text-3xl text-purple-700 mb-8 text-center">
              {questions[currentQuestion].question}
            </h3>

            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => !showResult && handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-2xl text-left font-medium transition-all duration-300 ${
                    showResult
                      ? index === questions[currentQuestion].correct
                        ? 'bg-green-200 text-green-800 border-2 border-green-400'
                        : index === selectedAnswer && index !== questions[currentQuestion].correct
                        ? 'bg-red-200 text-red-800 border-2 border-red-400'
                        : 'bg-gray-200 text-gray-600'
                      : 'bg-purple-100 text-purple-700 hover:bg-purple-200 border-2 border-transparent hover:border-purple-300'
                  }`}
                  whileHover={!showResult ? { scale: 1.02 } : {}}
                  whileTap={!showResult ? { scale: 0.98 } : {}}
                >
                  <div className="flex items-center">
                    <span className="w-8 h-8 bg-purple-300 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                  </div>
                </motion.button>
              ))}
            </div>

            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl border border-purple-200"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">
                      {selectedAnswer === questions[currentQuestion].correct ? '🎉' : '💕'}
                    </div>
                    <p className="text-purple-700 font-handwriting text-lg">
                      {selectedAnswer === questions[currentQuestion].correct ? 'Correct!' : 'Oops!'}
                    </p>
                    <p className="text-purple-600 mt-2">
                      {questions[currentQuestion].explanation}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MemoryQuiz;
