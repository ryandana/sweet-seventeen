import { motion } from 'framer-motion';
import { useState } from 'react';

const Gallery = () => {
  const [imageLoaded, setImageLoaded] = useState<Record<string, boolean>>({});

  // Expanded photo collection with more variety
  const images = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=500&fit=crop',
      alt: 'Beautiful moment together',
      caption: 'Our first adventure 💜',
      hangDelay: 0
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=600&fit=crop',
      alt: 'Cozy moment',
      caption: 'Lazy Sunday vibes ✨',
      hangDelay: 0.5
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=450&fit=crop',
      alt: 'Dreamy night',
      caption: 'Under the stars 🌟',
      hangDelay: 1
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=550&fit=crop',
      alt: 'Nature walk',
      caption: 'Peaceful moments 🌿',
      hangDelay: 1.5
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop',
      alt: 'Sweet memories',
      caption: 'Always laughing 😊',
      hangDelay: 2
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=650&fit=crop',
      alt: 'Home together', 
      caption: 'Home is wherever you are 🏠',
      hangDelay: 2.5
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=480&fit=crop',
      alt: 'Cuddle time',
      caption: 'Perfect cuddle weather 🐱',
      hangDelay: 3
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=520&fit=crop',
      alt: 'Dancing together',
      caption: 'Our favorite song 🎵',
      hangDelay: 3.5
    },
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=580&fit=crop',
      alt: 'Beach sunset',
      caption: 'Golden hour magic 🌅',
      hangDelay: 4
    },
    {
      id: 10,
      src: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=440&fit=crop',
      alt: 'Coffee date',
      caption: 'Morning coffee dates ☕',
      hangDelay: 4.5
    },
    {
      id: 11,
      src: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=500&fit=crop',
      alt: 'Road trip',
      caption: 'Adventure awaits 🚗',
      hangDelay: 5
    },
    {
      id: 12,
      src: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=620&fit=crop',
      alt: 'Picnic day',
      caption: 'Perfect picnic day 🧺',
      hangDelay: 5.5
    }
  ];

  const handleImageLoad = (id: number) => {
    setImageLoaded(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
      {images.map((image, index) => (
        <motion.div
          key={image.id}
          initial={{ opacity: 0, y: 100, rotate: Math.random() * 8 - 4 }}
          whileInView={{ opacity: 1, y: 0, rotate: Math.random() * 6 - 3 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            duration: 0.8, 
            delay: index * 0.1,
            type: "spring",
            stiffness: 80
          }}
          animate={{
            y: [0, -8, 0],
            rotate: [
              Math.random() * 6 - 3, 
              Math.random() * 8 - 4, 
              Math.random() * 6 - 3
            ],
            transition: {
              y: {
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: image.hangDelay
              },
              rotate: {
                duration: 6 + Math.random() * 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: image.hangDelay + 1
              }
            }
          }}
          whileHover={{ 
            scale: 1.08, 
            rotate: 0,
            zIndex: 10,
            y: -12,
            transition: { duration: 0.3 }
          }}
          className="break-inside-avoid mb-6 group cursor-pointer"
        >
          {/* Hanging string effect */}
          <div className="relative">
            <motion.div
              className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-0.5 h-6 bg-purple-300 origin-top"
              animate={{
                scaleY: [1, 1.1, 1],
                opacity: [0.7, 0.9, 0.7]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: image.hangDelay
              }}
            />
            
            {/* Pin/nail at top */}
            <motion.div
              className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-purple-400 rounded-full shadow-md"
              animate={{
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: image.hangDelay + 0.5
              }}
            />

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 border border-purple-100">
              <div className="relative overflow-hidden rounded-xl">
                {!imageLoaded[image.id] && (
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 animate-pulse rounded-xl" />
                )}
                <img
                  src={image.src}
                  alt={image.alt}
                  className={`w-full h-auto object-cover rounded-xl transition-all duration-500 ${
                    imageLoaded[image.id] ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => handleImageLoad(image.id)}
                  loading="lazy"
                />
                
                {/* Overlay with caption */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent rounded-xl flex items-end p-4"
                >
                  <p className="text-white font-handwriting text-lg">
                    {image.caption}
                  </p>
                </motion.div>
              </div>
              
              {/* Decorative elements */}
              <div className="flex justify-between items-center mt-3 px-2">
                <div className="flex space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-purple-300 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2, 
                        delay: i * 0.2 + image.hangDelay
                      }}
                    />
                  ))}
                </div>
                <motion.div
                  className="text-purple-400 text-xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 3, 
                    delay: index * 0.5 + image.hangDelay
                  }}
                >
                  💜
                </motion.div>
              </div>

              {/* Polaroid-style tape decoration */}
              <div className="absolute -top-2 -right-2 w-8 h-4 bg-white/60 rounded-sm shadow-sm transform rotate-45" />
              <div className="absolute -top-2 -left-2 w-8 h-4 bg-white/60 rounded-sm shadow-sm transform -rotate-45" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Gallery;
