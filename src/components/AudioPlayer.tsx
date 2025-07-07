import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, SkipForward, SkipBack } from 'lucide-react';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Extended playlist with love songs
  const playlist = [
    {
      id: 1,
      title: "Perfect",
      artist: "Ed Sheeran",
      src: "/audio/our-song.mp3",
      thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop"
    },
    {
      id: 2,
      title: "All of Me",
      artist: "John Legend",
      src: "/audio/all-of-me.mp3",
      thumbnail: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=100&h=100&fit=crop"
    },
    {
      id: 3,
      title: "Thinking Out Loud",
      artist: "Ed Sheeran",
      src: "/audio/thinking-out-loud.mp3",
      thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&h=100&fit=crop"
    },
    {
      id: 4,
      title: "A Thousand Years",
      artist: "Christina Perri",
      src: "/audio/thousand-years.mp3",
      thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop"
    }
  ];

  const [currentTrack, setCurrentTrack] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const currentProgress = (audio.currentTime / audio.duration) * 100;
      setProgress(isNaN(currentProgress) ? 0 : currentProgress);
      setCurrentTime(audio.currentTime);
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      nextTrack();
    };

    const handleCanPlay = () => {
      if (!hasAutoPlayed) {
        // Auto-play after a delay to ensure user interaction
        setTimeout(() => {
          audio.play().then(() => {
            setIsPlaying(true);
            setHasAutoPlayed(true);
          }).catch(() => {
            // If autoplay fails, just mark as attempted
            setHasAutoPlayed(true);
          });
        }, 3000);
      }
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, [currentTrack, hasAutoPlayed]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = (clickX / rect.width) * 100;
    const newTime = (newProgress / 100) * duration;
    
    audio.currentTime = newTime;
    setProgress(newProgress);
  };

  return (
    <>
      {/* Audio element */}
      <audio
        ref={audioRef}
        src={playlist[currentTrack]?.src}
        preload="metadata"
      />

      {/* Desktop Player - Bottom Right */}
      <motion.div
        className="fixed bottom-6 right-6 z-50 hidden md:block"
        initial={{ opacity: 0, scale: 0.8, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.8, type: "spring" }}
      >
        <motion.div
          className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-purple-200 overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence>
            {isExpanded ? (
              <motion.div
                key="expanded"
                initial={{ width: 80, height: 80 }}
                animate={{ width: 350, height: 140 }}
                exit={{ width: 80, height: 80 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="p-4"
              >
                <div className="flex items-center space-x-4">
                  {/* Thumbnail */}
                  <div className="relative">
                    <img
                      src={playlist[currentTrack]?.thumbnail}
                      alt="Album art"
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <motion.div
                      className="absolute inset-0 border-4 border-purple-400 rounded-xl"
                      animate={{ rotate: isPlaying ? 360 : 0 }}
                      transition={{ 
                        duration: 8, 
                        repeat: isPlaying ? Infinity : 0, 
                        ease: "linear" 
                      }}
                    />
                  </div>

                  {/* Track info and controls */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-handwriting text-lg text-purple-700 truncate">
                      {playlist[currentTrack]?.title}
                    </h4>
                    <p className="text-purple-500 text-sm truncate">
                      {playlist[currentTrack]?.artist}
                    </p>
                    
                    {/* Progress bar */}
                    <div 
                      className="mt-2 h-2 bg-purple-100 rounded-full cursor-pointer relative"
                      onClick={handleProgressClick}
                    >
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                        style={{ width: `${progress}%` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>
                    
                    {/* Time display */}
                    <div className="flex justify-between text-xs text-purple-400 mt-1">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center space-x-2">
                    <motion.button
                      onClick={prevTrack}
                      className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center text-purple-600 shadow-md"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <SkipBack size={16} />
                    </motion.button>
                    
                    <motion.button
                      onClick={togglePlay}
                      className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </motion.button>
                    
                    <motion.button
                      onClick={nextTrack}
                      className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center text-purple-600 shadow-md"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <SkipForward size={16} />
                    </motion.button>
                  </div>
                </div>

                {/* Playlist selector */}
                <div className="mt-3 flex space-x-1 overflow-x-auto">
                  {playlist.map((track, index) => (
                    <motion.button
                      key={track.id}
                      onClick={() => setCurrentTrack(index)}
                      className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${
                        index === currentTrack 
                          ? 'bg-purple-400 text-white' 
                          : 'bg-purple-100 text-purple-600'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {track.title}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="collapsed"
                initial={{ width: 350, height: 140 }}
                animate={{ width: 80, height: 80 }}
                exit={{ width: 350, height: 140 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="relative"
              >
                <div className="w-20 h-20 relative">
                  <img
                    src={playlist[currentTrack]?.thumbnail}
                    alt="Album art"
                    className="w-full h-full rounded-2xl object-cover"
                  />
                  
                  <svg
                    className="absolute inset-0 w-full h-full -rotate-90"
                    viewBox="0 0 80 80"
                  >
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      fill="transparent"
                      stroke="rgba(139, 92, 246, 0.3)"
                      strokeWidth="3"
                    />
                    <motion.circle
                      cx="40"
                      cy="40"
                      r="36"
                      fill="transparent"
                      stroke="url(#gradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={226}
                      strokeDashoffset={226 - (226 * progress) / 100}
                      transition={{ duration: 0.1 }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#A855F7" />
                        <stop offset="100%" stopColor="#EC4899" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <motion.button
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-2xl backdrop-blur-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      animate={{ scale: isPlaying ? [1, 1.2, 1] : 1 }}
                      transition={{ duration: 0.6, repeat: isPlaying ? Infinity : 0 }}
                    >
                      {isPlaying ? (
                        <Pause size={24} className="text-white drop-shadow-lg" />
                      ) : (
                        <Play size={24} className="text-white drop-shadow-lg ml-1" />
                      )}
                    </motion.div>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute -top-2 -left-2 w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center text-white text-xs shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Volume2 size={12} />
        </motion.button>
      </motion.div>

      {/* Mobile Player - Bottom Center */}
      <motion.div
        className="fixed bottom-4 left-4 right-4 z-50 md:hidden"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.8, type: "spring" }}
      >
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-purple-200 p-4 max-w-xs mx-auto">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={playlist[currentTrack]?.thumbnail}
                alt="Album art"
                className="w-12 h-12 rounded-lg object-cover"
              />
              <motion.div
                className="absolute inset-0 border-2 border-purple-400 rounded-lg"
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ 
                  duration: 8, 
                  repeat: isPlaying ? Infinity : 0, 
                  ease: "linear" 
                }}
              />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-handwriting text-sm text-purple-700 truncate">
                {playlist[currentTrack]?.title}
              </h4>
              <p className="text-purple-500 text-xs truncate">
                {playlist[currentTrack]?.artist}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <motion.button
                onClick={prevTrack}
                className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center text-purple-600"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <SkipBack size={14} />
              </motion.button>
              
              <motion.button
                onClick={togglePlay}
                className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </motion.button>
              
              <motion.button
                onClick={nextTrack}
                className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center text-purple-600"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <SkipForward size={14} />
              </motion.button>
            </div>
          </div>

          <div 
            className="mt-3 h-2 bg-purple-100 rounded-full cursor-pointer"
            onClick={handleProgressClick}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AudioPlayer;
