import React from 'react';
import { IoTicketOutline, IoSparklesOutline } from 'react-icons/io5';

const OfferSection = () => {
  return (
    <section className="relative w-full max-w-[1400px] mx-auto h-[550px] md:h-[500px] my-24 overflow-hidden rounded-[40px] bg-black group">
      
      {/* Background Image with Zoom Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] group-hover:scale-110"
        style={{ backgroundImage: "url('/footer_image.webp')" }}
      />
      
      {/* Dark Gradient Overlay - Deepens on the left for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />

      {/* Snow Animation Layer */}
      <div className="snow-container absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="snowflake" />
        ))}
      </div>

      {/* Content Container - Split Layout */}
      <div className="relative z-10 h-full w-full flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-10 text-white gap-10">
        
        {/* Left Side: Headline */}
        <div className="flex-1 text-left">
          <div className="flex items-center gap-2 mb-4">
            <div className="px-3 py-1 bg-red-500 rounded-full text-[10px] font-bold uppercase tracking-widest animate-pulse">
              Limited Offer
            </div>
            <div className="flex items-center gap-1 text-amber-400">
              <IoSparklesOutline />
              <span className="text-xs font-medium uppercase tracking-tighter">Season Special</span>
            </div>
          </div>

          <h2 className="text-5xl lg:text-7xl font-light tracking-tighter leading-[0.9] mb-0">
            The Great <br />
            <span className="font-serif italic text-white/40">Winter</span> <br />
            Escape
          </h2>
        </div>

        {/* Right Side: Offer Details Card */}
        <div className="w-full max-w-sm p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl transform transition-transform duration-500 group-hover:-translate-y-2">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs text-white/60 uppercase tracking-widest font-bold mb-1">Get Flat</p>
              <h3 className="text-5xl font-black tracking-tighter text-white">30% OFF</h3>
            </div>
            <IoTicketOutline size={32} className="text-white/30 rotate-12" />
          </div>
          
          <p className="text-white/70 text-sm leading-relaxed mb-6">
            Use code <span className="text-white font-mono font-bold bg-white/20 px-2 py-0.5 rounded">NOMADWINTER</span>
          </p>

          <button className="w-full py-4 bg-white text-black rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg active:scale-95">
            Claim This Offer
          </button>
        </div>
      </div>

      {/* CSS for Snow Animation */}
      <style jsx>{`
        .snow-container { overflow: hidden; }
        .snowflake {
          position: absolute;
          width: 5px;
          height: 5px;
          background: white;
          border-radius: 50%;
          filter: blur(1px);
          opacity: 0.6;
          top: -10px;
          animation: fall linear infinite;
        }

        @keyframes fall {
          to { transform: translateY(520px); }
        }

        ${[...Array(20)].map((_, i) => `
          .snowflake:nth-child(${i+1}) {
            left: ${Math.random() * 100}%;
            animation-duration: ${4 + Math.random() * 6}s;
            animation-delay: ${Math.random() * 5}s;
            opacity: ${0.3 + Math.random() * 0.5};
          }
        `).join('')}
      `}</style>
    </section>
  );
};

export default OfferSection;