import React from 'react';
import DestinationCard from './DestinationCard';

const Destinations = () => {
  // Fixed data with correct span logic for a 3-column, 2-row grid
  const destinationData = [
    { 
      name: "Manali Himachal", 
      properties: "120+", 
      image: "/manali.jpg", 
      span: "md:col-span-2 md:row-span-1 h-[400px]" 
    },
    { 
      name: "Leh Ladakh", 
      properties: "85+", 
      image: "/leh.jpg", 
      span: "md:col-span-1 md:row-span-2 h-[400px] md:h-full" // Tall card
    },
    { 
      name: "Goa Beaches", 
      properties: "250+", 
      image: "/beach.jpg", 
      span: "md:col-span-1 md:row-span-1 h-[400px]" 
    },
    { 
      name: "Kashmir Valley", 
      properties: "95+", 
      image: "/kashmir.jpg", 
      span: "md:col-span-1 md:row-span-1 h-[400px]" 
    },
    { 
      name: "Udaipur Rajasthan", 
      properties: "140+", 
      image: "/udaipur.jpg", 
      span: "md:col-span-2 md:row-span-1 h-[400px]" 
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-24 bg-white dark:bg-black">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
        <div className="flex-1">
          <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-blue-500 mb-4 block">
            Top Destinations
          </span>
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter dark:text-white leading-[0.9]">
            Find Yourself <br /> 
            <span className="font-serif italic opacity-30">Somewhere New</span>
          </h2>
        </div>
        <button className="group flex items-center gap-3 px-8 py-4 rounded-full border border-black/10 dark:border-white/10 text-sm font-bold tracking-widest uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300">
          Explore All
          <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:animate-ping" />
        </button>
      </div>

      {/* The Fixed Masonry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto">
        {destinationData.map((dest, i) => (
          <DestinationCard key={i} {...dest} />
        ))}
      </div>
      
      {/* Mobile Button */}
      <button className="w-full mt-8 md:hidden px-8 py-4 rounded-full border border-black/10 dark:border-white/10 text-sm font-bold tracking-widest uppercase">
        Explore All Destinations
      </button>
    </section>
  );
};

export default Destinations;