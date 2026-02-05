import React, { useState } from 'react';
import { 
  IoLocationSharp, 
  IoStar, 
  IoCalendarClear, 
  IoAirplaneOutline,
  IoChevronForward,
  IoHeartOutline,
  IoHeart,
  IoArrowForward,
  IoBedOutline,
  IoRestaurantOutline,
  IoCarOutline
} from 'react-icons/io5';
import { GiCampfire, GiPalmTree, GiMountainRoad, GiModernCity, GiSunrise } from 'react-icons/gi';

const DestinationCard = ({ 
  name, 
  properties = 25, 
  image, 
  span = "col-span-1", 
  rating = 4.5,
  bestSeason = "Oct-Mar",
  description = "Popular destination with stunning views",
  type = "beach"
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  const words = name.split(' ');
  const firstWord = words[0];
  const remainingWords = words.slice(1).join(' ');

  const getTypeIcon = () => {
    switch(type.toLowerCase()) {
      case 'beach': return <GiPalmTree className="text-amber-500" size={20} />;
      case 'mountain': return <GiMountainRoad className="text-emerald-500" size={20} />;
      case 'adventure': return <GiCampfire className="text-orange-500" size={20} />;
      case 'urban': return <GiModernCity className="text-blue-500" size={20} />;
      default: return <GiSunrise className="text-purple-500" size={20} />;
    }
  };

  const getTypeColor = () => {
    switch(type.toLowerCase()) {
      case 'beach': return 'bg-gradient-to-r from-amber-500/90 to-amber-600/90';
      case 'mountain': return 'bg-gradient-to-r from-emerald-500/90 to-emerald-600/90';
      case 'adventure': return 'bg-gradient-to-r from-orange-500/90 to-orange-600/90';
      case 'urban': return 'bg-gradient-to-r from-blue-500/90 to-blue-600/90';
      default: return 'bg-gradient-to-r from-purple-500/90 to-purple-600/90';
    }
  };

  const getTypeGradient = () => {
    switch(type.toLowerCase()) {
      case 'beach': return 'from-amber-500/20 to-amber-600/10';
      case 'mountain': return 'from-emerald-500/20 to-emerald-600/10';
      case 'adventure': return 'from-orange-500/20 to-orange-600/10';
      case 'urban': return 'from-blue-500/20 to-blue-600/10';
      default: return 'from-purple-500/20 to-purple-600/10';
    }
  };

  return (
    <div 
      className={`relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-500 hover:shadow-2xl ${span}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Container */}
      <div className="relative w-full h-full min-h-[400px]">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{ 
            backgroundImage: `url(${image})`,
            transform: isHovered ? 'scale(1.1)' : 'scale(1.05)'
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
      </div>

      {/* Top Section - Always Visible */}
      <div className="absolute top-0 left-0 right-0 p-6 z-20">
        {/* Top Row - Type & Rating */}
        <div className="flex justify-between items-start mb-4">
          {/* Type Badge */}
          <div className={`flex items-center gap-2 px-4 py-2 ${getTypeColor()} backdrop-blur-md rounded-full shadow-lg`}>
            {getTypeIcon()}
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-white">
              {type}
            </span>
          </div>

          {/* Right Side - Rating & Like */}
          <div className="flex items-center gap-2">
            {/* Rating */}
            <div className="flex items-center gap-1 px-3 py-1.5 bg-black/60 backdrop-blur-xl rounded-xl">
              <IoStar className="text-amber-400" size={12} />
              <span className="text-xs font-black text-white">{rating}</span>
            </div>
            
            {/* Like Button */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              className="p-2 rounded-lg bg-black/40 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110"
            >
              {isLiked ? (
                <IoHeart className="text-rose-500" size={18} />
              ) : (
                <IoHeartOutline className="text-white" size={18} />
              )}
            </button>
          </div>
        </div>

        {/* Properties Count */}
        <div className="flex items-center gap-2 text-white/90 mb-2">
          <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <span className="text-[10px] font-bold text-white">{properties}+</span>
          </div>
          <span className="text-sm font-medium tracking-wide">Properties</span>
        </div>
      </div>

      {/* Bottom Section - Main Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
        {/* Destination Name */}
        <h3 className="text-3xl md:text-4xl font-light text-white tracking-tight mb-3 leading-tight">
          <span className="font-normal drop-shadow-lg">{firstWord}</span>{' '}
          <span className="font-serif italic opacity-80 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            {remainingWords}
          </span>
        </h3>

        {/* Description - Short and visible */}
        <p className="text-white/80 text-sm mb-4 max-w-md leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Quick Info Bar */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg">
            <IoCalendarClear className="text-emerald-300" size={14} />
            <span className="text-xs font-medium text-white">{bestSeason}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg">
            <IoAirplaneOutline className="text-blue-300" size={14} />
            <span className="text-xs font-medium text-white">Easy Access</span>
          </div>
        </div>

        {/* View Packages Button - ALWAYS VISIBLE AND PROMINENT */}
        <div className={`transition-all duration-300 ${isHovered ? 'scale-105' : 'scale-100'}`}>
          <button className="group/btn relative w-full flex items-center justify-center px-6 py-4 rounded-2xl text-white font-semibold overflow-hidden shadow-xl hover:shadow-2xl active:scale-95">
            {/* Background - Solid primary color */}
            <div className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-primary-dark))] opacity-95 group-hover/btn:opacity-100 transition-opacity duration-300" />
            
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
            
            {/* Content */}
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                <IoLocationSharp className="text-[rgb(var(--color-primary))]" size={16} />
              </div>
              <span className="text-sm font-semibold tracking-wide">View Packages for {firstWord}</span>
              <IoArrowForward className="transition-transform duration-300 group-hover/btn:translate-x-2" size={18} />
            </div>
          </button>
        </div>
      </div>

      {/* Hover Overlay - Shows extra info WITHOUT hiding anything */}
      <div 
        className={`absolute inset-0 z-10 transition-all duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Semi-transparent color overlay based on type */}
        <div className={`absolute inset-0 bg-gradient-to-t ${getTypeGradient()}`} />
        
        {/* Activities Grid - Appears at the top on hover */}
        <div className="absolute top-24 left-0 right-0 p-6">
          <h4 className="text-lg font-bold text-white mb-3 text-center">Popular Activities</h4>
          <div className="grid grid-cols-2 gap-2">
            {['Beach Hopping', 'Water Sports', 'Local Cuisine', 'Sunset Views'].map((activity, index) => (
              <div key={index} className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                <div className="w-2 h-2 rounded-full bg-white" />
                <span className="text-xs text-white/90 font-medium">{activity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Accent Line - Shows on hover */}
      <div 
        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[rgb(var(--color-primary))] to-transparent transition-all duration-500 ${
          isHovered ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
        }`}
      />

      {/* Quick Stats Floating Bar - Appears on hover */}
      <div 
        className={`absolute top-6 left-1/2 -translate-x-1/2 z-30 transition-all duration-500 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-xl rounded-full border border-white/20 shadow-lg">
          {[
            { icon: IoBedOutline, label: 'Hotels' },
            { icon: IoRestaurantOutline, label: 'Food' },
            { icon: IoCarOutline, label: 'Tours' },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-1.5 px-2">
              <item.icon className="text-white/80" size={12} />
              <span className="text-xs text-white/80 font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;