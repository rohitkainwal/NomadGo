import React, { useState } from 'react';
import { 
  IoArrowForward, 
  IoTimeOutline, 
  IoStar, 
  IoLocationOutline,
  IoCalendarClearOutline,
  IoPeopleOutline,
  IoHeartOutline,
  IoHeart,
  IoChevronForward,
  IoBedOutline,
  IoRestaurantOutline
} from 'react-icons/io5';
import { GiMountainClimbing, GiBeachBucket } from 'react-icons/gi';

const PackageCard = ({ 
  category, 
  title, 
  image, 
  price, 
  duration, 
  rating,
  location = "Goa, India",
  inclusions = ["Flights", "Hotel", "Meals"],
  isFeatured = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  const words = title.split(' ');
  const firstWord = words[0];
  const remainingWords = words.slice(1).join(' ');

  const getCategoryIcon = () => {
    switch(category.toLowerCase()) {
      case 'adventure': return <GiMountainClimbing className="text-emerald-400" size={18} />;
      case 'beach': return <GiBeachBucket className="text-blue-400" size={18} />;
      default: return <IoLocationOutline className="text-amber-400" size={18} />;
    }
  };

  return (
    <div 
      className="group relative w-full h-[520px] overflow-hidden rounded-3xl cursor-pointer bg-gradient-to-br from-gray-900 via-black to-gray-900 transition-all duration-700 hover:shadow-[0_40px_80px_rgba(var(--color-primary),0.2)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out"
        style={{ 
          backgroundImage: `url(${image})`,
          transform: isHovered ? 'scale(1.15) translateY(-10px)' : 'scale(1.05)',
          filter: isHovered ? 'brightness(1.1) contrast(1.05)' : 'brightness(0.9) contrast(1)'
        }}
      />

      {/* Advanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent" />
      
      {/* Animated Shimmer Effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)`,
          transform: 'translateX(-100%)',
          animation: isHovered ? 'shimmer 2s infinite' : 'none'
        }}
      />

      {/* Featured Badge */}
      {isFeatured && (
        <div className="absolute top-6 left-6 z-20">
          <span className="px-4 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-white shadow-lg animate-pulse">
            Featured
          </span>
        </div>
      )}

      {/* Category Tag with Icon */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full">
        {getCategoryIcon()}
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">
          {category}
        </span>
      </div>

      {/* Top Right Actions */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-3">
        {/* Rating Badge */}
        <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl shadow-xl backdrop-blur-sm">
          <IoStar className="text-white" size={12} />
          <span className="text-xs font-black text-white">{rating}</span>
        </div>
        
        {/* Like Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110"
        >
          {isLiked ? (
            <IoHeart className="text-rose-500" size={18} />
          ) : (
            <IoHeartOutline className="text-white" size={18} />
          )}
        </button>
      </div>

      {/* Location Badge */}
      <div className="absolute top-24 left-6 z-20 flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full">
        <IoLocationOutline className="text-blue-300" size={14} />
        <span className="text-xs font-medium text-white/90">{location}</span>
      </div>

      {/* Main Content - Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-7 z-20">
        {/* Hover Effect Border */}
        <div 
          className={`absolute inset-0 rounded-t-3xl bg-gradient-to-t from-[rgb(var(--color-primary))] via-transparent to-transparent transition-opacity duration-500 ${
            isHovered ? 'opacity-30' : 'opacity-0'
          }`}
        />

        <div className="relative">
          {/* Duration & Details */}
          <div className="flex items-center gap-4 text-white/80 text-xs mb-4 font-medium">
            <div className="flex items-center gap-1.5">
              <IoTimeOutline className="text-emerald-400" size={14} />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <IoPeopleOutline className="text-blue-400" size={14} />
              <span>2 Adults</span>
            </div>
            <div className="flex items-center gap-1.5">
              <IoCalendarClearOutline className="text-purple-400" size={14} />
              <span>All Inclusive</span>
            </div>
          </div>
          
          {/* Title with Enhanced Typography */}
          <h3 className="text-3xl font-light text-white mb-4 tracking-tight leading-tight">
            <span className="font-normal drop-shadow-lg">{firstWord}</span>{' '}
            <span className="font-serif italic opacity-80 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              {remainingWords}
            </span>
          </h3>

          {/* Inclusions */}
          <div className="flex items-center gap-3 mb-6">
            {inclusions.slice(0, 3).map((item, index) => (
              <div key={index} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg">
                {item === 'Hotel' && <IoBedOutline size={12} className="text-blue-300" />}
                {item === 'Meals' && <IoRestaurantOutline size={12} className="text-emerald-300" />}
                <span className="text-[10px] font-medium text-white/80">{item}</span>
              </div>
            ))}
            {inclusions.length > 3 && (
              <span className="text-[10px] text-white/50">+{inclusions.length - 3} more</span>
            )}
          </div>

          {/* Price & CTA Section */}
          <div className="flex items-center justify-between pt-5 border-t border-white/20">
            <div className="space-y-1">
              <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Starting From</p>
              <div className="flex items-end gap-2">
                <p className="text-2xl font-black text-white tracking-tighter">₹{price.toLocaleString()}</p>
                <span className="text-xs text-white/60 mb-1">per person</span>
              </div>
              <p className="text-[10px] text-white/40">+ Taxes & Fees</p>
            </div>
            
            {/* Animated CTA Button */}
            <button className="relative flex items-center gap-3 px-6 py-3.5 rounded-xl text-white font-medium overflow-hidden group/btn transition-all duration-500 hover:shadow-2xl hover:scale-105 active:scale-95">
              <div className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-primary-dark))] opacity-90 group-hover/btn:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
              <span className="relative z-10 font-semibold text-sm">Explore</span>
              <IoChevronForward className="relative z-10 transition-transform duration-500 group-hover/btn:translate-x-1" size={18} />
            </button>
          </div>

          {/* Quick View Details (Expands on Hover) */}
          <div 
            className={`mt-5 pt-5 border-t border-white/10 transition-all duration-500 overflow-hidden ${
              isHovered ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <IoBedOutline className="text-blue-300" size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-white/50">Stay</p>
                  <p className="text-xs font-medium text-white">5-Star Hotel</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <IoRestaurantOutline className="text-emerald-300" size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-white/50">Meals</p>
                  <p className="text-xs font-medium text-white">Breakfast & Dinner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Quick View Indicator */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-500 ${
        isHovered ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
      }`}>
        <div className="px-4 py-2 bg-black/60 backdrop-blur-xl rounded-full border border-white/20">
          <p className="text-xs text-white/70 font-medium">Hover for details</p>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;

// Add this to your global CSS
const shimmerStyle = `
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

// Note: Add shimmerStyle to your global stylesheet or use a CSS-in-JS solution