import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import PackageCard from './PackageCard';
import { 
  IoArrowForward, 
  IoPause, 
  IoPlay,
  IoChevronBack,
  IoChevronForward,
  IoStar
} from 'react-icons/io5';
import { GiWorld } from 'react-icons/gi';

const MovingCarousel = () => {
  const controls = useAnimationControls();
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const packages = [
    { 
      category: "Beach", 
      title: "Beach Escapes", 
      image: "/beach.jpg", 
      price: "24,999", 
      duration: "4N/5D", 
      rating: "4.9",
      location: "Goa, India",
      isFeatured: true 
    },
    { 
      category: "Mountain", 
      title: "Mountain Getaways", 
      image: "/mountain.jpg", 
      price: "18,500", 
      duration: "3N/4D", 
      rating: "4.8",
      location: "Manali, India",
      inclusions: ["Flights", "Hotel", "Meals"]
    },
    { 
      category: "Couple", 
      title: "Honeymoon Specials", 
      image: "/honeymoon.jpg", 
      price: "45,000", 
      duration: "5N/6D", 
      rating: "5.0",
      location: "Maldives",
      isFeatured: true
    },
    { 
      category: "Family", 
      title: "Family Holidays", 
      image: "/family.jpg", 
      price: "32,000", 
      duration: "4N/5D", 
      rating: "4.7",
      location: "Dubai, UAE",
      inclusions: ["Activities", "Hotel", "Breakfast"]
    },
    { 
      category: "Thrill", 
      title: "Adventure Trips", 
      image: "/adventure.jpg", 
      price: "12,999", 
      duration: "2N/3D", 
      rating: "4.9",
      location: "Rishikesh, India"
    },
    { 
      category: "Spirit", 
      title: "Spiritual Tours", 
      image: "/spiritual.jpg", 
      price: "15,500", 
      duration: "4N/5D", 
      rating: "4.6",
      location: "Varanasi, India"
    },
    { 
      category: "Luxury", 
      title: "Luxury Escapes", 
      image: "/luxury.jpg", 
      price: "75,000", 
      duration: "6N/7D", 
      rating: "4.9",
      location: "Switzerland",
      isFeatured: true
    },
    { 
      category: "Culture", 
      title: "Cultural Journeys", 
      image: "/culture.jpg", 
      price: "28,500", 
      duration: "5N/6D", 
      rating: "4.7",
      location: "Japan",
      inclusions: ["Guided Tours", "Accommodation"]
    },
  ];

  // Double the array for seamless looping
  const duplicatedPackages = [...packages, ...packages];

  // Auto-play logic
  useEffect(() => {
    if (isPlaying && !isHovered) {
      controls.start({
        x: "-50%",
        transition: {
          duration: 40,
          ease: "linear",
          repeat: Infinity,
        },
      });
    } else {
      controls.stop();
    }
  }, [isPlaying, isHovered, controls]);

  // Manual navigation
  const handlePrev = () => {
    const newIndex = currentIndex === 0 ? packages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    
    // Calculate scroll position
    const scrollX = -(newIndex * 380); // Card width + gap
    controls.start({
      x: scrollX,
      transition: { duration: 0.8, ease: "easeInOut" }
    });
  };

  const handleNext = () => {
    const newIndex = currentIndex === packages.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    
    const scrollX = -(newIndex * 380);
    controls.start({
      x: scrollX,
      transition: { duration: 0.8, ease: "easeInOut" }
    });
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="relative py-24 pt-12 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(var(--color-primary), 0.1) 0%, transparent 50%),
                            radial-gradient(circle at 75% 75%, rgba(var(--color-primary), 0.1) 0%, transparent 50%)`,
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="flex-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 mb-6 bg-gradient-to-r from-[rgb(var(--color-primary))]/10 to-[rgb(var(--color-primary-dark))]/10 backdrop-blur-sm rounded-full border border-[rgb(var(--color-primary))]/20">
              <GiWorld className="text-[rgb(var(--color-primary))]" size={16} />
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-[rgb(var(--color-primary))]">
                World Collections
              </span>
            </div>
            
            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight dark:text-white leading-[0.9] mb-4">
              Curated <br />
              <span className="font-serif italic opacity-80 dark:opacity-60 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Travel Experiences
              </span>
            </h2>
            
            {/* Subheading */}
            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed">
              Handpicked packages designed for every type of traveler. From beach vacations to mountain adventures.
            </p>
          </div>
          
          {/* CTA & Controls */}
          <div className="flex items-center gap-4">
            {/* Play/Pause Button */}
            <button 
              onClick={togglePlayPause}
              className="group relative p-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:border-[rgb(var(--color-primary))] transition-all duration-300"
            >
              {isPlaying ? (
                <IoPause className="text-gray-700 dark:text-gray-300 group-hover:text-[rgb(var(--color-primary))]" size={20} />
              ) : (
                <IoPlay className="text-gray-700 dark:text-gray-300 group-hover:text-[rgb(var(--color-primary))]" size={20} />
              )}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-[rgb(var(--color-primary))]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            {/* View All Button */}
            <button className="group relative px-6 py-3 rounded-xl text-white font-medium overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-xl">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-primary-dark))] opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              {/* Content */}
              <div className="relative z-10 flex items-center gap-2">
                <span className="font-semibold text-sm">View All</span>
                <IoArrowForward className="transition-transform duration-500 group-hover:translate-x-1" size={16} />
              </div>
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mb-12 p-6 bg-gradient-to-r from-white/50 to-white/30 dark:from-gray-900/50 dark:to-gray-800/30 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Packages', value: '50+', icon: '📦' },
              { label: 'Destinations', value: '25+', icon: '🌍' },
              { label: 'Happy Travelers', value: '10K+', icon: '😊' },
              { label: 'Avg. Rating', value: '4.8', icon: '⭐' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="text-2xl">{stat.icon}</div>
                <div>
                  <div className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button 
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-20 p-3 md:p-4 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-2xl hover:shadow-3xl hover:scale-110 hover:border-[rgb(var(--color-primary))] transition-all duration-300 group"
          >
            <IoChevronBack className="text-gray-700 dark:text-gray-300 group-hover:text-[rgb(var(--color-primary))]" size={24} />
          </button>

          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-20 p-3 md:p-4 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-2xl hover:shadow-3xl hover:scale-110 hover:border-[rgb(var(--color-primary))] transition-all duration-300 group"
          >
            <IoChevronForward className="text-gray-700 dark:text-gray-300 group-hover:text-[rgb(var(--color-primary))]" size={24} />
          </button>

          {/* Carousel Wrapper */}
          <div 
            className="cursor-grab active:cursor-grabbing overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div
              ref={containerRef}
              animate={controls}
              drag="x"
              dragConstraints={{ left: -3000, right: 0 }}
              dragElastic={0.1}
              className="flex gap-6 md:gap-8"
              style={{ width: "max-content" }}
              onDragEnd={(event, info) => {
                const threshold = 100;
                if (info.offset.x > threshold) {
                  handlePrev();
                } else if (info.offset.x < -threshold) {
                  handleNext();
                }
              }}
            >
              {duplicatedPackages.map((pkg, i) => (
                <motion.div 
                  key={i} 
                  className="w-[280px] sm:w-[320px] md:w-[380px] flex-shrink-0 select-none"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <PackageCard {...pkg} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {packages.slice(0, 6).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentIndex(i);
                  const scrollX = -(i * 380);
                  controls.start({
                    x: scrollX,
                    transition: { duration: 0.8, ease: "easeInOut" }
                  });
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex % packages.length === i
                    ? 'w-8 bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-primary-dark))]'
                    : 'w-3 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Decorative Gradient Fades */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white/90 dark:from-black/90 via-transparent to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white/90 dark:from-black/90 via-transparent to-transparent z-10 pointer-events-none" />
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16">
        <button className="group relative px-8 py-4 rounded-2xl text-white font-semibold overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-primary-dark))] opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          
          {/* Content */}
          <div className="relative z-10 flex items-center justify-center gap-3">
            <span className="text-lg">Explore All Collections</span>
            <IoArrowForward className="transition-transform duration-500 group-hover:translate-x-2" size={20} />
          </div>
        </button>
      </div>
    </section>
  );
};

export default MovingCarousel;