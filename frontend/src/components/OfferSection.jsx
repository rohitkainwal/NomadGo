import React, { useState } from 'react';
import { 
  IoTicketOutline, 
  IoSparklesOutline, 
  IoSnowOutline,
  IoStar,
  IoTimeOutline,
  IoGiftOutline,
  IoArrowForward,
  IoCloseCircle
} from 'react-icons/io5';
import { GiWinterGloves } from 'react-icons/gi';

const OfferSection = () => {
  const [isClaimed, setIsClaimed] = useState(false);
  const [showTimer, setShowTimer] = useState(true);

  // Countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  // Snowflakes array for better performance
  const snowflakes = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: Math.random() * 100,
    duration: Math.random() * 5 + 5,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.5 + 0.3,
  }));

  const handleClaimOffer = () => {
    setIsClaimed(true);
    setTimeout(() => setIsClaimed(false), 3000);
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto my-24 px-4">
      {/* Background Container */}
      <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-gray-900 via-black to-blue-900/30 group cursor-pointer">
        
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-10000 group-hover:scale-110"
            style={{ backgroundImage: "url('/footer_image.webp')" }}
          />
          {/* Animated Gradient Mesh */}
          <div 
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
                           radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)`,
              animation: 'float 20s ease-in-out infinite',
            }}
          />
        </div>

        {/* Multi-layer Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-purple-900/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

        {/* Animated Snowflakes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {snowflakes.map((flake) => (
            <div
              key={flake.id}
              className="absolute rounded-full bg-gradient-to-b from-white to-blue-100"
              style={{
                width: `${flake.size}px`,
                height: `${flake.size}px`,
                left: `${flake.left}%`,
                top: '-10px',
                opacity: flake.opacity,
                filter: 'blur(0.5px)',
                animation: `fall linear infinite`,
                animationDuration: `${flake.duration}s`,
                animationDelay: `${flake.delay}s`,
              }}
            />
          ))}
        </div>

        {/* Floating Elements */}
        <div className="absolute top-8 left-8 z-10">
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 backdrop-blur-xl rounded-full shadow-2xl animate-pulse">
            <IoSparklesOutline className="text-white" size={14} />
            <span className="text-xs font-bold uppercase tracking-widest text-white">Limited Time</span>
          </div>
        </div>

        {/* Close Timer Button */}
        {showTimer && (
          <button
            onClick={() => setShowTimer(false)}
            className="absolute top-8 right-8 z-10 p-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-colors duration-300"
            aria-label="Close timer"
          >
            <IoCloseCircle className="text-white/60" size={18} />
          </button>
        )}

        {/* Main Content */}
        <div className="relative z-10 h-full w-full flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-16 py-12 lg:py-16 text-white gap-8 lg:gap-12">
          
          {/* Left Side: Headline & Features */}
          <div className="flex-1 text-left">
            {/* Badge Group */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 backdrop-blur-sm rounded-full">
                <GiWinterGloves className="text-white" size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">Winter Exclusive</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <IoStar className="text-amber-400" size={14} />
                <span className="text-xs font-medium">Premium Only</span>
              </div>
            </div>

            {/* Main Heading */}
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-light tracking-tight leading-[0.9] mb-4">
              The Ultimate <br />
              <span className="font-serif italic opacity-80 bg-gradient-to-r from-white via-blue-200 to-cyan-100 bg-clip-text text-transparent">
                Winter
              </span>{' '}
              <span className="font-light opacity-30">Escape</span>
            </h2>

            {/* Subheading */}
            <p className="text-white/70 text-base sm:text-lg lg:text-xl max-w-xl leading-relaxed mb-6">
              Experience luxury winter getaways with exclusive discounts on snow destinations, cozy stays, and adventure packages.
            </p>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                { icon: IoSnowOutline, text: 'Snow Activities Included' },
                { icon: IoGiftOutline, text: 'Free Winter Gear Rental' },
                { icon: IoTicketOutline, text: 'Flexible Cancellation' },
                { icon: IoSparklesOutline, text: 'Premium Accommodation' },
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <feature.icon className="text-blue-300" size={16} />
                  <span className="text-sm text-white/80">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Offer Card */}
          <div className="w-full max-w-sm">
            <div className="relative">
              {/* Timer - Shows when enabled */}
              {showTimer && (
                <div className="absolute -top-16 left-0 right-0 z-20">
                  <div className="bg-gradient-to-r from-black/80 to-gray-900/80 backdrop-blur-2xl rounded-2xl p-4 border border-white/10 shadow-2xl">
                    <div className="flex items-center gap-2 mb-2">
                      <IoTimeOutline className="text-red-400" size={16} />
                      <span className="text-xs font-bold uppercase tracking-wider text-white/80">Offer Ends In</span>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      {Object.entries(timeLeft).map(([unit, value]) => (
                        <div key={unit} className="text-center">
                          <div className="text-2xl font-black text-white bg-black/40 rounded-lg px-3 py-2">
                            {value.toString().padStart(2, '0')}
                          </div>
                          <div className="text-[10px] uppercase tracking-wider text-white/60 mt-1">
                            {unit}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Offer Card */}
              <div className={`relative p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 shadow-2xl transition-all duration-500 group-hover:shadow-3xl ${
                isClaimed ? 'animate-pulse' : ''
              }`}>
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-white/20 rounded-tl-3xl" />
                <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-white/20 rounded-tr-3xl" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-white/20 rounded-bl-3xl" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-white/20 rounded-br-3xl" />

                {/* Discount Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full shadow-xl">
                    <span className="text-sm font-black uppercase tracking-wider text-white">Special Offer</span>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <p className="text-xs text-white/60 uppercase tracking-widest font-bold mb-2">Save Up To</p>
                  <div className="relative">
                    <h3 className="text-7xl font-black tracking-tighter text-white leading-none">
                      30%
                    </h3>
                    <div className="absolute -top-2 -right-4">
                      <IoTicketOutline size={32} className="text-white/20 rotate-12" />
                    </div>
                  </div>
                  <p className="text-lg font-medium text-white/80 mt-2">On Winter Packages</p>
                </div>

                {/* Code Display */}
                <div className="mb-6 p-4 bg-gradient-to-r from-black/40 to-black/20 rounded-xl border border-white/10">
                  <p className="text-xs text-white/60 uppercase tracking-wider font-bold mb-2">Use Promo Code</p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xl font-mono font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                      NOMADWINTER24
                    </span>
                    <button className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                      <span className="text-xs font-medium">Copy</span>
                    </button>
                  </div>
                </div>

                {/* Claim Button */}
                <button
                  onClick={handleClaimOffer}
                  disabled={isClaimed}
                  className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all duration-300 relative overflow-hidden group/btn ${
                    isClaimed 
                      ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg' 
                      : 'bg-gradient-to-r from-white to-blue-50 text-gray-900 hover:shadow-2xl hover:scale-[1.02] active:scale-95'
                  }`}
                >
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                  
                  <div className="relative z-10 flex items-center justify-center gap-2">
                    {isClaimed ? (
                      <>
                        <IoSparklesOutline size={18} />
                        <span>Offer Claimed!</span>
                      </>
                    ) : (
                      <>
                        <span>Claim This Offer</span>
                        <IoArrowForward className="transition-transform duration-300 group-hover/btn:translate-x-1" size={18} />
                      </>
                    )}
                  </div>
                </button>

                {/* Terms */}
                <p className="text-center text-xs text-white/40 mt-4">
                  Valid on bookings made before Dec 31, 2024
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-xl rounded-full">
            <IoSparklesOutline className="text-blue-300" size={14} />
            <span className="text-xs text-white/70">Scroll for more winter destinations</span>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes fall {
          to { transform: translateY(100vh); }
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(10px, -10px) scale(1.05); }
        }
      `}</style>
    </section>
  );
};

export default OfferSection;