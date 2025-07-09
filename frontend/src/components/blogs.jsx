import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, Star, Leaf, Calendar, Award, Shield } from 'lucide-react';

const Blog = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [mutedVideos, setMutedVideos] = useState(new Set());
  const [playingVideos, setPlayingVideos] = useState(new Set());
  const [hoveredCard, setHoveredCard] = useState(null);
  const [videoErrors, setVideoErrors] = useState(new Set());
  const videoRefs = useRef({});

  const API_BASE = import.meta.env.VITE_BASE_API;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`${API_BASE}/blogs`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (Array.isArray(data)) {
          const validVideos = data.filter(video => video.video);
          setVideos(validVideos);
          setMutedVideos(new Set(validVideos.map(video => video._id)));
        } else {
          console.error('Expected array but got:', typeof data);
          setVideos([]);
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  useEffect(() => {
    let interval;
    if (isAutoPlaying && videos.length > 0) {
      interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % Math.ceil(videos.length / getItemsPerSlide()));
      }, 9000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, videos.length]);

  const getItemsPerSlide = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth >= 1280) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % Math.ceil(videos.length / getItemsPerSlide()));
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + Math.ceil(videos.length / getItemsPerSlide())) % Math.ceil(videos.length / getItemsPerSlide()));
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const toggleMute = (videoId, e) => {
    e.stopPropagation();
    const newMutedVideos = new Set(mutedVideos);
    if (newMutedVideos.has(videoId)) {
      newMutedVideos.delete(videoId);
    } else {
      newMutedVideos.add(videoId);
    }
    setMutedVideos(newMutedVideos);
  };

  const togglePlay = async (videoId, e) => {
    e.stopPropagation();
    const video = videoRefs.current[videoId];
    if (video) {
      try {
        if (video.paused) {
          await video.play();
          setPlayingVideos(prev => new Set([...prev, videoId]));
        } else {
          video.pause();
          setPlayingVideos(prev => {
            const newSet = new Set(prev);
            newSet.delete(videoId);
            return newSet;
          });
        }
      } catch (err) {
        console.error('Video play error:', err);
        setVideoErrors(prev => new Set([...prev, videoId]));
      }
    }
  };

  const handleVideoError = (videoId) => {
    setVideoErrors(prev => new Set([...prev, videoId]));
  };

  const handleMouseEnter = (videoId) => {
    setHoveredCard(videoId);
    const video = videoRefs.current[videoId];
    if (video && !playingVideos.has(videoId) && !videoErrors.has(videoId)) {
      setTimeout(() => {
        if (videoRefs.current[videoId] && hoveredCard === videoId) {
          video.play().catch(err => {
            console.warn('Autoplay failed for video:', videoId, err.message);
          });
        }
      }, 300);
    }
  };

  const handleMouseLeave = (videoId) => {
    setHoveredCard(null);
    const video = videoRefs.current[videoId];
    if (video && !playingVideos.has(videoId)) {
      video.pause();
      video.currentTime = 0;
    }
  };

  const getCurrentSlideVideos = () => {
    const itemsPerSlide = getItemsPerSlide();
    const startIndex = currentSlide * itemsPerSlide;
    return videos.slice(startIndex, startIndex + itemsPerSlide);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center">
        <motion.div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-6"
          />
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-emerald-700 text-xl font-semibold"
          >
            Loading Premium Collection...
          </motion.p>
          <p className="text-emerald-600 mt-2">Authentic Masala Blends</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-hidden">
      {/* Professional Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-emerald-200/30 to-green-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-56 h-56 bg-gradient-to-r from-teal-200/30 to-emerald-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-r from-green-200/30 to-teal-200/30 rounded-full blur-2xl" />
        
        {/* Subtle Spice Pattern */}
        <div className="absolute inset-0 opacity-8">
          <div className="absolute top-16 right-1/4 text-4xl text-emerald-300/50"></div>
          <div className="absolute bottom-20 left-1/4 text-3xl text-green-300/50"></div>
          <div className="absolute top-1/2 left-8 text-3xl text-teal-300/50"></div>
          <div className="absolute top-1/3 right-8 text-3xl text-emerald-300/50"></div>
          <div className="absolute bottom-1/3 right-1/3 text-2xl text-green-300/50"></div>
          <div className="absolute top-2/3 left-1/2 text-3xl text-teal-300/50"></div>
        </div>
      </div>

      {/* Professional Header Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <div className="flex items-center justify-center mb-8">
            <div className="h-1 w-12 sm:w-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mr-4"></div>
            <span className="text-emerald-600 font-bold text-sm sm:text-lg tracking-wider uppercase">Premium Masala Collection</span>
            <div className="h-1 w-12 sm:w-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full ml-4"></div>
          </div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 text-gray-800 leading-tight"
          >
            Artisanal Spice
            <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent block sm:inline"> Mastery</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4"
          >
            Crafted with precision and passion, our premium masala blends represent generations of culinary expertise, delivering unparalleled depth and authenticity to every dish
          </motion.p>
          
          {/* Professional Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center items-center gap-8 mt-8 text-sm text-emerald-600"
          >
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              <span>Award Winning</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span>Quality Assured</span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5" />
              <span>100% Natural</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Professional Product Showcase */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
        {videos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center py-16 sm:py-20 bg-white/80 backdrop-blur-sm rounded-3xl border border-emerald-200/50 mx-4 shadow-lg"
          >
            <div className="text-5xl sm:text-6xl mb-6">🌿</div>
            <h3 className="text-xl sm:text-2xl font-bold text-emerald-700 mb-4">Premium Collection</h3>
            <p className="text-emerald-600 text-base sm:text-lg">Discover our handcrafted masala blends</p>
          </motion.div>
        ) : (
          <div className="relative">
            {/* Professional Navigation Controls */}
            {videos.length > getItemsPerSlide() && (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prevSlide}
                  className="absolute -left-2 sm:-left-6 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-emerald-50 text-emerald-600 p-3 sm:p-4 rounded-full shadow-xl border border-emerald-200 transition-all hover:shadow-2xl"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextSlide}
                  className="absolute -right-2 sm:-right-6 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-emerald-50 text-emerald-600 p-3 sm:p-4 rounded-full shadow-xl border border-emerald-200 transition-all hover:shadow-2xl"
                  aria-label="Next"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
              </>
            )}

            {/* Professional Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <AnimatePresence mode="wait">
                {getCurrentSlideVideos().map((video, index) => {
                  const videoUrl = video.video?.startsWith('http')
                    ? video.video
                    : `${API_BASE.replace('/api', '')}${video.video}`;

                  return (
                    <motion.div
                      key={`${video._id}-${currentSlide}`}
                      initial={{ opacity: 0, y: 60, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -60, scale: 0.9 }}
                      transition={{ 
                        duration: 0.7, 
                        delay: index * 0.15,
                        type: "spring",
                        bounce: 0.2
                      }}
                      whileHover={{ 
                        y: -8, 
                        transition: { duration: 0.3, type: "spring", bounce: 0.3 }
                      }}
                      className="group cursor-pointer"
                      onMouseEnter={() => handleMouseEnter(video._id)}
                      onMouseLeave={() => handleMouseLeave(video._id)}
                    >
                      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform-gpu bg-white">
                        
                        {/* Professional Video Container */}
                        <div className="relative h-80 sm:h-96 lg:h-[420px] overflow-hidden">
                          {videoErrors.has(video._id) ? (
                            <div className="w-full h-full bg-gradient-to-br from-emerald-100 via-green-100 to-teal-100 flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-4xl sm:text-5xl mb-4">🌿</div>
                                <span className="text-emerald-600 font-semibold text-sm sm:text-base">Loading Content...</span>
                              </div>
                            </div>
                          ) : (
                            <>
                              <video
                                ref={el => videoRefs.current[video._id] = el}
                                id={`video-${video._id}`}
                                src={videoUrl}
                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                                muted={mutedVideos.has(video._id)}
                                loop
                                playsInline
                                controls={false}
                                onError={() => handleVideoError(video._id)}
                              />
                              
                              {/* Professional Video Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30">
                                
                                {/* Professional Top Controls */}
                                <div className="absolute top-4 right-4 flex gap-2">
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(e) => toggleMute(video._id, e)}
                                    className="bg-black/60 backdrop-blur-md text-white p-2.5 rounded-full hover:bg-black/80 transition-all border border-white/20 shadow-lg"
                                    aria-label={mutedVideos.has(video._id) ? "Unmute" : "Mute"}
                                  >
                                    {mutedVideos.has(video._id) ? 
                                      <VolumeX className="w-4 h-4" /> : 
                                      <Volume2 className="w-4 h-4" />
                                    }
                                  </motion.button>
                                </div>

                                {/* Professional Center Play Button */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <motion.button
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ 
                                      scale: hoveredCard === video._id ? 1 : 0,
                                      opacity: hoveredCard === video._id ? 1 : 0
                                    }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(e) => togglePlay(video._id, e)}
                                    className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white p-5 rounded-full shadow-2xl backdrop-blur-sm border border-white/20"
                                    aria-label={playingVideos.has(video._id) ? "Pause" : "Play"}
                                  >
                                    {playingVideos.has(video._id) ? 
                                      <Pause className="w-7 h-7" /> : 
                                      <Play className="w-7 h-7 ml-0.5" />
                                    }
                                  </motion.button>
                                </div>

                                {/* Professional Category Badge */}
                                <div className="absolute top-4 left-4">
                                  <motion.span 
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider shadow-lg backdrop-blur-sm"
                                  >
                                    {video.category || 'Premium Blend'}
                                  </motion.span>
                                </div>

                                {/* Professional Quality Badge */}
                                <div className="absolute top-16 left-4">
                                  <motion.div 
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-2 rounded-full border border-emerald-400/30"
                                  >
                                    <Award className="w-3 h-3 text-emerald-400" />
                                    <span className="text-white text-xs font-medium">Artisanal</span>
                                  </motion.div>
                                </div>

                                {/* Professional Bottom Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                  <motion.h3 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-white text-xl lg:text-2xl font-bold mb-3 leading-tight drop-shadow-lg line-clamp-2"
                                  >
                                    {video.title}
                                  </motion.h3>
                                  
                                  <div className="flex justify-between items-center mb-3">
                                    <div className="flex items-center gap-2">
                                      <Calendar className="w-4 h-4 text-emerald-300" />
                                      <span className="text-emerald-200 text-sm font-medium">
                                        {new Date(video.createdAt).toLocaleDateString('en-US', {
                                          month: 'short',
                                          day: 'numeric',
                                          year: 'numeric'
                                        })}
                                      </span>
                                    </div>
                                    
                                    <div className="flex items-center gap-1">
                                      {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400 drop-shadow-sm" />
                                      ))}
                                    </div>
                                  </div>

                                  {/* Professional Quality Indicators */}
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <Leaf className="w-4 h-4 text-green-400" />
                                      <span className="text-white/90 text-xs font-medium">100% Natural</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Shield className="w-4 h-4 text-emerald-400" />
                                      <span className="text-white/90 text-xs font-medium">Quality Assured</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Professional Slide Indicators */}
            {videos.length > getItemsPerSlide() && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex justify-center mt-12 gap-3"
              >
                {Array.from({ length: Math.ceil(videos.length / getItemsPerSlide()) }).map((_, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => goToSlide(index)}
                    className={`h-3 rounded-full transition-all duration-500 shadow-md ${
                      currentSlide === index 
                        ? 'bg-gradient-to-r from-emerald-500 to-green-500 w-12' 
                        : 'bg-emerald-300 w-3 hover:bg-emerald-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;