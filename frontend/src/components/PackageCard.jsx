import React from 'react';
import { IoArrowForward, IoTimeOutline, IoStar } from 'react-icons/io5';

const PackageCard = ({ category, title, image, price, duration, rating }) => {
  // Logic to split title for the sleek serif effect on the second word
  const words = title.split(' ');
  const firstWord = words[0];
  const remainingWords = words.slice(1).join(' ');

  return (
    <div className="group relative w-full h-[450px] overflow-hidden rounded-[24px] cursor-pointer bg-gray-200 dark:bg-gray-800 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Sleek Dark Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Category Tag */}
      <div className="absolute top-5 left-5 z-10">
        <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-white">
          {category}
        </span>
      </div>

      {/* Rating Tag */}
      <div className="absolute top-5 right-5 z-10 flex items-center gap-1 px-3 py-1 bg-amber-400 rounded-lg shadow-lg">
        <IoStar className="text-white" size={12} />
        <span className="text-[11px] font-black text-white">{rating}</span>
      </div>

      {/* Content Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
        <div className="flex items-center gap-2 text-white/70 text-xs mb-2 font-medium">
          <IoTimeOutline size={14} className="text-blue-400" />
          <span>{duration}</span>
        </div>
        
        <h3 className="text-2xl font-light text-white mb-4 tracking-tight">
          {firstWord} <span className="font-serif italic opacity-60">{remainingWords}</span>
        </h3>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div>
            <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Starting From</p>
            <p className="text-xl font-bold text-white tracking-tighter">₹{price}</p>
          </div>
          
          <button className="flex items-center justify-center w-12 h-12 rounded-xl bg-white text-black transition-all duration-500 group-hover:bg-[rgb(var(--color-primary))] group-hover:text-white group-hover:rotate-[-45deg]">
            <IoArrowForward size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;