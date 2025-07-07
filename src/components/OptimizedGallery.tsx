
import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart } from 'lucide-react';

// Exactly 12 optimized photos
const photos = [
  {
    id: 1,
    src: '/placeholder.svg',
    alt: 'Beautiful moment together',
    caption: 'Our first adventure ✨'
  },
  {
    id: 2,
    src: '/placeholder.svg',
    alt: 'Sunset walk',
    caption: 'Golden hour magic 🌅'
  },
  {
    id: 3,
    src: '/placeholder.svg',
    alt: 'Cozy evening',
    caption: 'Perfect night in 💕'
  },
  {
    id: 4,
    src: '/placeholder.svg',
    alt: 'Laughing together',
    caption: 'Your beautiful smile 😊'
  },
  {
    id: 5,
    src: '/placeholder.svg',
    alt: 'Beach day',
    caption: 'Sandy toes, happy hearts 🏖️'
  },
  {
    id: 6,
    src: '/placeholder.svg',
    alt: 'City exploration',
    caption: 'Urban adventures 🏙️'
  },
  {
    id: 7,
    src: '/placeholder.svg',
    alt: 'Picnic date',
    caption: 'Simple moments, big love 🧺'
  },
  {
    id: 8,
    src: '/placeholder.svg',
    alt: 'Dancing',
    caption: 'Dancing like nobody is watching 💃'
  },
  {
    id: 9,
    src: '/placeholder.svg',
    alt: 'Morning coffee',
    caption: 'Lazy Sunday mornings ☕'
  },
  {
    id: 10,
    src: '/placeholder.svg',
    alt: 'Hiking together',
    caption: 'Adventure buddies 🥾'
  },
  {
    id: 11,
    src: '/placeholder.svg',
    alt: 'Cooking together',
    caption: 'Kitchen chaos and love 👩‍🍳'
  },
  {
    id: 12,
    src: '/placeholder.svg',
    alt: 'Stargazing',
    caption: 'Under the stars ⭐'
  }
];

const OptimizedGallery = memo(() => {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<Set<number>>(new Set());

  const toggleLike = (photoId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPhotos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(photoId)) {
        newSet.delete(photoId);
      } else {
        newSet.add(photoId);
      }
      return newSet;
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Polaroid grid with better spacing - exactly 12 photos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            className="bg-white p-4 rounded-lg shadow-lg cursor-pointer transform-gpu hover:shadow-xl"
            initial={{ opacity: 0, y: 50, rotate: Math.random() * 6 - 3 }}
            whileInView={{ 
              opacity: 1, 
              y: 0, 
              rotate: Math.random() * 4 - 2 
            }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ 
              scale: 1.05, 
              rotate: 0,
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedPhoto(photo)}
          >
            {/* Photo container */}
            <div className="aspect-square bg-gray-100 rounded-sm mb-3 overflow-hidden relative">
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover"
                loading={index < 4 ? "eager" : "lazy"}
              />
              
              {/* Like button */}
              <motion.button
                onClick={(e) => toggleLike(photo.id, e)}
                className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm transition-colors ${
                  likedPhotos.has(photo.id) 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white/80 text-gray-600 hover:text-red-500'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart 
                  size={16} 
                  fill={likedPhotos.has(photo.id) ? "currentColor" : "none"}
                />
              </motion.button>
            </div>
            
            {/* Caption */}
            <p className="font-handwriting text-center text-gray-700 text-sm">
              {photo.caption}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Modal for selected photo */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white p-6 rounded-2xl max-w-2xl max-h-[90vh] overflow-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                className="w-full rounded-lg mb-4"
              />
              
              <p className="font-handwriting text-center text-gray-700 text-lg">
                {selectedPhoto.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

OptimizedGallery.displayName = 'OptimizedGallery';

export default OptimizedGallery;
