import React, { useState, useEffect } from "react";
import FloatingBookingWidget from "./FloatingBookingWidget";

const Banner = () => {
  const [activeTab, setActiveTab] = useState('Cabs');
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    "/hero4.jpg",
    "/hero1.jpg",
    "/hero2.jpg",
    "/hero3.jpg"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-inter bg-white dark:bg-gray-900">
      {/* Background Carousel */}
      {images.map((img, index) => (
        <div
          key={img}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[2000ms] ease-in-out ${
            index === currentImage ? "opacity-100 scale-105" : "opacity-0 scale-100"
          } transition-transform duration-[10000ms]`}
          style={{ backgroundImage: `url('${img}')` }}
        />
      ))}

      {/* Modern Overlay */}
      <div className="absolute inset-0 bg-black/30 bg-gradient-to-b from-black/50 via-transparent to-black/80" />

      {/* Content Container - Added pb-32 to prevent widget from hitting the absolute bottom */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-12 pb-32">
        
        {/* Middle Content Section */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16 animate-in fade-in slide-in-from-top-6 duration-1000">
          <span className="inline-flex items-center gap-2 px-5 py-2 mb-8 text-[10px] md:text-[11px] font-medium tracking-[0.4em] uppercase bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white/80">
            <span className="w-1 h-1 rounded-full bg-white/40 animate-pulse" />
            Premium Travel Experience
          </span>
          
          <h1 className="text-3xl sm:text-5xl md:text-[4.5rem] leading-[1.1] font-light tracking-[-0.03em] text-white">
            Explore with <br />
            <span className="font-serif italic opacity-50 font-normal">Nomadgo</span> <br />
            Beyond Boundaries
          </h1>

          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent my-8" />

          <p className="text-sm md:text-lg font-light text-white/70 max-w-[520px] leading-relaxed tracking-wide px-4">
            Curated journeys and seamless cab experiences crafted for modern explorers.
            <span className="block mt-2 text-white/90 font-medium italic">
              Travel freely. Discover deeply.
            </span>
          </p>

          {/* Carousel Dots */}
          <div className="flex gap-2 mt-8">
            {images.map((_, i) => (
              <div 
                key={i}
                className={`h-1 transition-all duration-500 rounded-full ${
                  i === currentImage ? "w-8 bg-white" : "w-2 bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* The Widget - Removed translate-y-4 to keep it stable */}
        <div className="w-full max-w-6xl mx-auto">
          <FloatingBookingWidget activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>

      {/* Decorative Bottom Fade - Fixed: Lowered z-index to 5 and reduced height */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-gray-900 to-transparent z-0 pointer-events-none" />
    </div>
  );
};

export default Banner;