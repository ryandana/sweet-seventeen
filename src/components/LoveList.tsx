import { useState, useEffect, useCallback, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoveList = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const loveReasons = [
    "Senyum kamu tuh kayak nambah darah manis tiap aku liat",
    "Tatapan mata kamu suka bikin aku ngefreeze",
    "Cara kamu ketawa tuh kayak lagu favorit",
    "Kalo kamu manja, aku jadi pengen peluk terus",
    "Suka banget pas kamu tiba-tiba ngomel lucu",
    "Rambut kamu tuh kayak magnet, pengen dielus mulu",
    "Suara kamu tuh calming banget, bikin adem",
    "Suka banget pas kamu lagi makan enak sampe mata merem",
    "Kamu tuh moodbooster aku 24/7",
    "Cara kamu bilang ‘sayang’ tuh bisa nyembuhin capek",
    "Paling seneng kalo nyoba banyak jajan bareng kamu",
    "Kalo kamu excited, ekspresinya lucu bangeeet",
    "Suka pas kamu cemberut, soalnya masih tetep cantik",
    "Sering banget aku kangenin padahal baru ketemu",
    "Kamu tuh punya 1001 ekspresi yang aku hafal",
    "Pas kamu pura-pura marah, malah makin gemes",
    "Gaya kamu mesen makanan tuh udah kayak masterchef",
    "Kamu tuh partner terbaik buat nyobain hal random",
    "Kalo kamu diem, aku langsung mikir ‘kenapa yaa?’",
    "Pelukan kamu tuh kayak charger buat hati",
    "Paling gak bisa liat kamu sedih, pengen gantiin",
    "Suka pas kamu ngambek kecil, gemesss",
    "Kamu suka bikin aku senyum sendiri",
    "Cara kamu cerita tuh selalu seru, gak pernah bosen",
    "Wangi kamu tuh ngangenin parah",
    "Tatapan kamu tuh bisa bikin aku mikir serius",
    "Suka banget ngeliatin kamu pas lagi fokus",
    "Kalo kamu makan lahap, aku jadi ikutan laper",
    "Seneng banget kalo bisa nyuapin kamu",
    "Kamu tuh selalu tau cara bikin aku tenang",
    "Kalo lagi bareng kamu, waktu kerasa cepet banget",
    "Kamu bisa bikin hal biasa jadi spesial",
    "Kamu ngerti aku bahkan sebelum aku ngomong",
    "Suka banget pas kamu curhat panjang, aku dengerin terus",
    "Kamu tuh tempat ternyaman buat pulang",
    "Kalo kamu ketawa sampe nangis, aku auto ikut ketawa",
    "Muka kamu bangun tidur tuh lucu bangeet",
    "Suka pelukan kamu yang hangat banget",
    "Kalo kamu bilang kangen, aku langsung pengen dateng",
    "Kamu tuh soulmate aku yang paling cocok",
    "Kamu lucu bahkan pas lagi kesel",
    "Suka gaya kamu foto candid",
    "Kamu suka ngajarin aku sabar tanpa maksa",
    "Suara kamu tuh bisa bikin aku tenang banget",
    "Kamu tuh versi manusia dari ‘pengen dipeluk’",
    "Kalo kamu ngomong ‘iya deh’, aku langsung klepek-klepek",
    "Paling seneng momen kita berdua doang",
    "Kamu suka bawa suasana jadi lebih hidup",
    "Kamu tuh pinter banget bikin aku ngerasa dicintai",
    "Suka pas kamu nyolek-nyolek iseng",
    "Kamu tuh penyemangat aku tiap hari",
    "Kamu bikin aku percaya sama cinta lagi",
    "Kamu ngerti aku bahkan tanpa dijelasin",
    "Suka banget kalo kamu tiba-tiba manja",
    "Kamu tuh kombinasi sempurna antara lucu dan cantik",
    "Aku nyaman banget jadi diri sendiri pas bareng kamu",
    "Kamu tuh kayak playlist favorit yang gak bosen",
    "Kalo kamu baper, aku malah pengen peluk",
    "Suka pas kamu cerita hal random tapi semangat",
    "Kamu bikin aku pengen jadi versi terbaik dari aku",
    "Kamu tuh satu-satunya yang bisa bikin aku mellow",
    "Suka liat gaya kamu tidur, kayak bayi",
    "Kamu tuh tempat cerita paling aman buat aku",
    "Suka gaya kamu pas lagi dandan buru-buru",
    "Kamu tuh pasangan paling pengertian sedunia",
    "Suka banget kalo kamu tiba-tiba peluk dari belakang",
    "Kamu bisa nyentuh hati aku cuma dengan tatapan",
    "Kamu tuh penyeimbang aku",
    "Suka pas kamu ajak ngobrol tiba-tiba di tengah malam",
    "Kamu tuh definisi nyaman dan gemes",
    "Suka gaya kamu ngomong sambil senyum kecil",
    "Kamu tuh orang pertama yang aku cari tiap ada kabar",
    "Kamu bikin dunia aku lebih indah",
    "Kamu suka ngajarin aku buat lebih sabar",
    "Kamu tuh bestie, partner, dan cinta aku",
    "Suka pas kamu nunjukin care lewat hal kecil",
    "Kamu suka bikin aku senyum dari hal simpel",
    "Kamu tuh satu-satunya yang bisa bikin aku gugup",
    "Suka gaya kamu ngambek sok cool",
    "Kamu tuh love language-ku dalam bentuk manusia",
    "Kamu tuh rumah",
    "Suka pas kamu jawab ‘iya sayang’",
    "Kamu pinter banget bikin aku gak bisa marah",
    "Suka liat ekspresi kamu pas denger jokes receh aku",
    "Kamu tuh bikin semua tempat terasa lebih hangat",
    "Kamu tuh kayak teh hangat di pagi mendung",
    "Kamu tuh lucu banget pas ngantuk",
    "Kamu tuh checklist mimpi yang jadi nyata",
    "Suka gaya kamu bilang ‘iyaa aku tau’",
    "Kamu tuh bisa bikin aku semangat walau lagi down",
    "Kamu suka bikin aku mikir ‘kok bisa secinta ini?’",
    "Kamu tuh highlight hari-hariku",
    "Kamu tuh orang yang selalu aku tunggu",
    "Kamu tuh sumber ketenangan yang gak bisa dijelasin",
    "Kamu tuh alasan kenapa aku senyum tiap hari",
    "Suka banget liat kamu bahagia",
    "Kamu tuh hal paling indah yang pernah terjadi",
    "Suka pas kamu sok cuek padahal perhatian",
    "Kamu tuh paket lengkap, bonusnya aku cinta banget",
    "Aku suka semuanya tentang kamu, literally semuaa 🩷",
  ];

  const nextReason = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % loveReasons.length);
  }, [loveReasons.length]);

  const prevReason = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + loveReasons.length) % loveReasons.length
    );
  }, [loveReasons.length]);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying((prev) => !prev);
  }, []);

  // Optimize auto-play with proper cleanup
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(nextReason, 4000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, nextReason]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center py-16 px-4 bg-gradient-to-br from-purple-50/30 to-pink-50/30 w-full max-w-full overflow-hidden"
    >
      <div className="max-w-4xl mx-auto text-center w-full">
        <motion.h2
          className="font-handwriting text-4xl md:text-5xl text-purple-600 mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          100 Hal tentang kamu 💜
        </motion.h2>

        <div className="relative w-full max-w-2xl mx-auto">
          {/* Main carousel container with invisible click areas */}
          <div
            className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-purple-200 min-h-[300px] flex items-center justify-center"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            style={{ willChange: "auto" }}
          >
            {/* Invisible left click area */}
            <div
              className="absolute left-0 top-0 w-1/3 h-full cursor-pointer z-10"
              onClick={prevReason}
              aria-label="Previous reason"
            />

            {/* Invisible right click area */}
            <div
              className="absolute right-0 top-0 w-1/3 h-full cursor-pointer z-10"
              onClick={nextReason}
              aria-label="Next reason"
            />

            {/* Love reason number - using transform for better performance */}
            <motion.div
              className="absolute top-4 left-6 text-6xl font-handwriting text-purple-300 opacity-50"
              key={`number-${currentIndex}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.5, scale: 1 }}
              transition={{ duration: 0.5 }}
              style={{ willChange: "transform, opacity" }}
            >
              #{currentIndex + 1}
            </motion.div>

            {/* Current reason */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-center px-8"
                style={{ willChange: "transform, opacity" }}
              >
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
                  {loveReasons[currentIndex]}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Decorative hearts - optimized animations */}
            <motion.div
              className="absolute -top-4 -right-4 text-4xl"
              animate={{
                rotate: [0, 8, -8, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ willChange: "transform" }}
            >
              💕
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 text-3xl"
              animate={{
                rotate: [0, -8, 8, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              style={{ willChange: "transform" }}
            >
              💖
            </motion.div>
          </div>

          {/* Progress indicator */}
          <div className="mt-8 flex justify-center">
            <div className="flex space-x-2">
              {[...Array(Math.min(10, loveReasons.length))].map((_, i) => {
                const isActive =
                  i === Math.floor((currentIndex / loveReasons.length) * 10);
                return (
                  <motion.div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      isActive ? "bg-purple-400" : "bg-purple-200"
                    }`}
                    animate={{ scale: isActive ? 1.2 : 1 }}
                    style={{ willChange: "transform" }}
                  />
                );
              })}
            </div>
          </div>

          {/* Counter */}
          <motion.p
            className="mt-4 text-purple-500 font-medium"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {currentIndex + 1} dari {loveReasons.length} alasan
          </motion.p>

          {/* Auto-play toggle */}
          <motion.button
            onClick={toggleAutoPlay}
            className={`mt-6 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              isAutoPlaying
                ? "bg-purple-200 text-purple-700"
                : "bg-gray-200 text-gray-600"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ willChange: "transform" }}
          >
            {isAutoPlaying ? "Pause Auto-play ⏸️" : "Resume Auto-play ▶️"}
          </motion.button>

          {/* Hint text */}
          <p className="mt-2 text-sm text-purple-400 opacity-70">
            Klik kiri/kanan untuk navigasi, atau tunggu auto-play
          </p>
        </div>

        {/* Reduced floating hearts for performance - using transform */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                willChange: "transform",
              }}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 8, -8, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut",
              }}
            >
              {["💜", "💕", "💖"][i]}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
});

LoveList.displayName = "LoveList";

export default LoveList;
