import React, { useState, useEffect } from "react";
import FloatingBookingWidget from "./FloatingBookingWidget";

const Banner = () => {
  const [activeTab, setActiveTab] = useState('Local');
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const images = [
    "/hero4.jpg",
    "/hero1.jpg",
    "/hero2.jpg",
    "/hero3.jpg"
  ];

  useEffect(() => {
    if (isHovering) return; // Pause carousel on hover
    
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [images.length, isHovering]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-inter bg-gradient-to-br from-gray-900 via-black to-gray-900 dark:from-black dark:via-gray-900 dark:to-black">
      
      {/* Background Carousel with enhanced overlay */}
      <div 
        className="absolute inset-0"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {images.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-2000 ease-in-out ${
              index === currentImage 
                ? "opacity-100 scale-105" 
                : "opacity-0 scale-100 pointer-events-none"
            }`}
            style={{ 
              backgroundImage: `url('${img}')`,
              backgroundPosition: 'center 30%'
            }}
          />
        ))}
        
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
        
        {/* Animated gradient mesh */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(var(--color-primary), 0.1) 0%, transparent 50%),
                              radial-gradient(circle at 75% 75%, rgba(var(--color-primary), 0.1) 0%, transparent 50%)`,
            backgroundSize: '50% 50%',
            animation: 'float 20s ease-in-out infinite'
          }} />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-between px-4 pt-24 pb-20 md:pb-24">
        
        {/* Top Content Section */}
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12 animate-in fade-in slide-in-from-top-6 duration-1000">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 text-xs font-medium tracking-[0.3em] uppercase bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-white/90 hover:bg-white/10 transition-all duration-300 group cursor-default">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-emerald-400 animate-pulse" />
                <span className="group-hover:tracking-[0.4em] transition-all duration-500">
                  Premium Travel Experience
                </span>
              </div>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] font-light tracking-[-0.02em] text-white mb-6">
              <span className="font-normal block mb-2">Explore The World</span>
              <span className="font-serif italic text-white/60 text-3xl sm:text-4xl md:text-5xl lg:text-6xl block">
                With <span className="not-italic font-normal text-white/90">NomadGo</span>
              </span>
            </h1>

            {/* Divider */}
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent my-8 mx-auto" />

            {/* Subtitle */}
            <div className="max-w-2xl mx-auto">
              <p className="text-base md:text-lg font-light text-white/70 leading-relaxed tracking-wide px-4">
                Curated journeys and seamless cab experiences crafted for modern explorers. 
                <span className="block mt-3 text-white/90 font-normal italic text-sm md:text-base">
                  Travel freely • Discover deeply • Experience fully
                </span>
              </p>
            </div>

            {/* Carousel Controls */}
            <div className="flex justify-center items-center gap-4 mt-10">
              {/* Dots */}
              <div className="flex gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`h-1.5 transition-all duration-500 rounded-full focus:outline-none focus:ring-2 focus:ring-white/30 ${
                      i === currentImage 
                        ? "w-8 bg-gradient-to-r from-blue-400 to-emerald-400" 
                        : "w-3 bg-white/30 hover:bg-white/50"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
              
              {/* Manual Controls */}
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => setCurrentImage(prev => prev === 0 ? images.length - 1 : prev - 1)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 hover:scale-110 active:scale-95"
                  aria-label="Previous slide"
                >
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setCurrentImage(prev => prev === images.length - 1 ? 0 : prev + 1)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 hover:scale-110 active:scale-95"
                  aria-label="Next slide"
                >
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Widget Section - Centered with proper spacing */}
        <div className="w-full max-w-6xl mx-auto mt-8 md:mt-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
          <FloatingBookingWidget activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 md:mt-16 animate-pulse">
          <div className="flex flex-col items-center gap-2 text-white/40 text-xs tracking-wider">
            <span>Scroll to explore</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Fade - Fixed */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/70 to-transparent z-0 pointer-events-none" />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[1px] h-[1px] bg-white/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${15 + Math.random() * 20}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              boxShadow: `0 0 ${Math.random() * 20 + 10}px rgba(255, 255, 255, 0.1)`
            }}
          />
        ))}
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
      `}</style>
    </div>
  );
};

export default Banner;