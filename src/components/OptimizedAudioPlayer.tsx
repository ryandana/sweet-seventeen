import { useState, useRef, useEffect, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, SkipForward, SkipBack, Music } from 'lucide-react';

const OptimizedAudioPlayer = memo(() => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Extended playlist with more songs
  const playlist = [
    {
      id: 1,
      title: "Perfect",
      artist: "Ed Sheeran",
      src: "/audio/perfect.mp3",
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
    },
    {
      id: 5,
      title: "Make You Feel My Love",
      artist: "Adele",
      src: "/audio/make-you-feel-my-love.mp3",
      thumbnail: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=100&h=100&fit=crop"
    },
    {
      id: 6,
      title: "At Last",
      artist: "Etta James",
      src: "/audio/at-last.mp3",
      thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=100&h=100&fit=crop"
    },
    {
      id: 7,
      title: "Lucky",
      artist: "Jason Mraz",
      src: "/audio/lucky.mp3",
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&h=100&fit=crop"
    },
    {
      id: 8,
      title: "Can't Help Myself",
      artist: "Four Tops",
      src: "/audio/cant-help-myself.mp3",
      thumbnail: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=100&h=100&fit=crop"
    }
  ];

  const [currentTrack, setCurrentTrack] = useState(0);

  const updateProgress = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const currentProgress = (audio.currentTime / audio.duration) * 100;
    setProgress(isNaN(currentProgress) ? 0 : currentProgress);
    setCurrentTime(audio.currentTime);
  }, []);

  const updateDuration = useCallback(() => {
    const audio = audioRef.current;
    if (audio) setDuration(audio.duration);
  }, []);

  const handleEnded = useCallback(() => {
    nextTrack();
  }, []);

  const handleCanPlay = useCallback(() => {
    if (!hasAutoPlayed) {
      setTimeout(() => {
        const audio = audioRef.current;
        if (audio) {
          audio.play().then(() => {
            setIsPlaying(true);
            setHasAutoPlayed(true);
          }).catch(() => {
            setHasAutoPlayed(true);
          });
        }
      }, 3000);
    }
  }, [hasAutoPlayed]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

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
  }, [currentTrack, updateProgress, updateDuration, handleEnded, handleCanPlay]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const nextTrack = useCallback(() => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
  }, [playlist.length]);

  const prevTrack = useCallback(() => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
  }, [playlist.length]);

  const selectTrack = useCallback((index: number) => {
    setCurrentTrack(index);
  }, []);

  const formatTime = useCallback((time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = (clickX / rect.width) * 100;
    const newTime = (newProgress / 100) * duration;
    
    audio.currentTime = newTime;
    setProgress(newProgress);
  }, [duration]);

  return (
    <>
      <audio
        ref={audioRef}
        src={playlist[currentTrack]?.src}
        preload="metadata"
      />

      {/* Desktop Player */}
      <motion.div
        className="fixed bottom-6 right-6 z-50 hidden md:block"
        initial={{ opacity: 0, scale: 0.8, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.8, type: "spring" }}
      >
        <motion.div
          className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-purple-200 overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence>
            {isExpanded ? (
              <motion.div
                key="expanded"
                initial={{ width: 80, height: 80 }}
                animate={{ 
                  width: showPlaylist ? 450 : 350, 
                  height: showPlaylist ? 400 : 140 
                }}
                exit={{ width: 80, height: 80 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="p-4"
              >
                <div className="flex items-center space-x-4 mb-2">
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

                  <div className="flex-1 min-w-0">
                    <h4 className="font-handwriting text-lg text-purple-700 truncate">
                      {playlist[currentTrack]?.title}
                    </h4>
                    <p className="text-purple-500 text-sm truncate">
                      {playlist[currentTrack]?.artist}
                    </p>
                    
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
                    
                    <div className="flex justify-between text-xs text-purple-400 mt-1">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

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

                {/* Playlist toggle button */}
                <div className="flex justify-between items-center">
                  <motion.button
                    onClick={() => setShowPlaylist(!showPlaylist)}
                    className="flex items-center space-x-2 px-3 py-1 bg-purple-100 rounded-full text-purple-600 text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Music size={14} />
                    <span>{showPlaylist ? 'Hide' : 'Show'} Playlist</span>
                  </motion.button>
                </div>

                {/* Expanded playlist */}
                <AnimatePresence>
                  {showPlaylist && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 max-h-48 overflow-y-auto"
                    >
                      <h5 className="font-handwriting text-lg text-purple-700 mb-2">Our Love Songs 💕</h5>
                      <div className="space-y-2">
                        {playlist.map((track, index) => (
                          <motion.button
                            key={track.id}
                            onClick={() => selectTrack(index)}
                            className={`w-full flex items-center space-x-3 p-2 rounded-lg text-left transition-colors ${
                              index === currentTrack 
                                ? 'bg-purple-200 text-purple-800' 
                                : 'hover:bg-purple-50 text-purple-600'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <img
                              src={track.thumbnail}
                              alt={track.title}
                              className="w-8 h-8 rounded object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate text-sm">{track.title}</p>
                              <p className="text-xs opacity-70 truncate">{track.artist}</p>
                            </div>
                            {index === currentTrack && isPlaying && (
                              <motion.div
                                className="text-purple-500"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 1 }}
                              >
                                🎵
                              </motion.div>
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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

      {/* Mobile Player */}
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
});

OptimizedAudioPlayer.displayName = 'OptimizedAudioPlayer';

export default OptimizedAudioPlayer;
