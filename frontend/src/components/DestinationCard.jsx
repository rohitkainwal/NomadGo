import React from 'react';
import { IoLocationSharp } from 'react-icons/io5';

const DestinationCard = ({ name, properties, image, span }) => {
  return (
    <div className={`relative overflow-hidden rounded-[32px] group cursor-pointer ${span}`}>
      {/* Background Image */}
      <img 
        src={image} 
        alt={name}
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
      />

      {/* Glass Overlay - Appears on Hover */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
        <div className="flex items-center gap-2 text-white/80 mb-2">
          <IoLocationSharp size={16} className="text-[rgb(var(--color-primary))]" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase">{properties} Properties</span>
        </div>
        <h3 className="text-3xl md:text-4xl font-light text-white tracking-tighter">
          {name.split(' ')[0]} <span className="font-serif italic opacity-60">{name.split(' ').slice(1).join(' ')}</span>
        </h3>
        
        {/* Hidden Detail - Slides up on hover */}
        <div className="h-0 overflow-hidden group-hover:h-8 group-hover:mt-4 transition-all duration-500">
          <span className="text-white text-sm font-medium border-b border-white/40 pb-1 uppercase tracking-widest">
            View Destination
          </span>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;