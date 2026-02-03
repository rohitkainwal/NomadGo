import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import PackageCard from './PackageCard';

const MovingCarousel = () => {
  const controls = useAnimationControls();
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const packages = [
    { category: "Beach", title: "Beach Escapes", image: "/beach.jpg", price: "24,999", duration: "4N/5D", rating: "4.9" },
    { category: "Mountain", title: "Mountain Getaways", image: "/mountain.jpg", price: "18,500", duration: "3N/4D", rating: "4.8" },
    { category: "Couple", title: "Honeymoon Specials", image: "/honeymoon.jpg", price: "45,000", duration: "5N/6D", rating: "5.0" },
    { category: "Family", title: "Family Holidays", image: "/family.jpg", price: "32,000", duration: "4N/5D", rating: "4.7" },
    { category: "Thrill", title: "Adventure Trips", image: "/adventure.jpg", price: "12,999", duration: "2N/3D", rating: "4.9" },
    { category: "Spirit", title: "Spiritual Tours", image: "/spiritual.jpg", price: "15,500", duration: "4N/5D", rating: "4.6" },
  ];

  // Double the array for seamless looping
  const duplicatedPackages = [...packages, ...packages];

  // Auto-play logic
  useEffect(() => {
    if (!isHovered) {
      controls.start({
        x: "-50%",
        transition: {
          duration: 30,
          ease: "linear",
          repeat: Infinity,
        },
      });
    } else {
      controls.stop();
    }
  }, [isHovered, controls]);

  return (
    <section className="py-24 pt-12 bg-white dark:bg-black/95 overflow-hidden">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-16 text-center px-6">
        <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-[rgb(var(--color-primary))] mb-4">
          Explore Nomadgo
        </span>
        <h2 className="text-4xl md:text-5xl font-light tracking-tight dark:text-white">
          World <span className="font-serif italic opacity-30">Collections</span>
        </h2>
      </div>

      {/* Draggable & Auto-moving Container */}
      <div 
        className="cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          ref={containerRef}
          animate={controls}
          drag="x"
          dragConstraints={{ left: -2500, right: 0 }} // Adjust based on content width
          className="flex gap-8 px-8 whitespace-nowrap"
          style={{ width: "max-content" }}
        >
          {duplicatedPackages.map((pkg, i) => (
            <div 
              key={i} 
              className="w-[300px] md:w-[380px] flex-shrink-0 select-none"
            >
              <PackageCard {...pkg} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Decorative Gradient Fades for edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-black to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default MovingCarousel;