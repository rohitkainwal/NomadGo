import React, { useState } from 'react';
import DestinationCard from './DestinationCard';
import { IoArrowForward, IoSearchOutline, IoFilterOutline } from 'react-icons/io5';

const Destinations = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Enhanced data with more details for the cards
  const destinationData = [
    { 
      name: "Manali Himachal", 
      properties: "120+", 
      image: "/manali.jpg", 
      span: "md:col-span-2 md:row-span-1 h-[400px]",
      rating: 4.8,
      bestSeason: "Oct-Feb",
      description: "Snow-capped mountains and adventure sports",
      type: "mountain"
    },
    { 
      name: "Leh Ladakh", 
      properties: "85+", 
      image: "/leh.jpg", 
      span: "md:col-span-1 md:row-span-2 h-[400px] md:h-full",
      rating: 4.9,
      bestSeason: "Jun-Sep",
      description: "High-altitude desert with monasteries",
      type: "adventure"
    },
    { 
      name: "Goa Beaches", 
      properties: "250+", 
      image: "/beach.jpg", 
      span: "md:col-span-1 md:row-span-1 h-[400px]",
      rating: 4.5,
      bestSeason: "Nov-Feb",
      description: "Tropical beaches and vibrant nightlife",
      type: "beach"
    },
    { 
      name: "Kashmir Valley", 
      properties: "95+", 
      image: "/kashmir.jpg", 
      span: "md:col-span-1 md:row-span-1 h-[400px]",
      rating: 4.7,
      bestSeason: "Apr-Oct",
      description: "Paradise on earth with houseboats",
      type: "mountain"
    },
    { 
      name: "Udaipur Rajasthan", 
      properties: "140+", 
      image: "/udaipur.jpg", 
      span: "md:col-span-2 md:row-span-1 h-[400px]",
      rating: 4.6,
      bestSeason: "Oct-Mar",
      description: "City of lakes and palaces",
      type: "urban"
    },
  ];

  const filters = ['All', 'Beach', 'Mountain', 'Adventure', 'Urban', 'Heritage'];

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(var(--color-primary), 0.1) 0%, transparent 50%),
                            radial-gradient(circle at 75% 75%, rgba(var(--color-primary), 0.1) 0%, transparent 50%)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-12 md:mb-16">
          <div className="flex-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 mb-6 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 backdrop-blur-sm rounded-full border border-blue-500/20 dark:border-blue-400/20">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 animate-pulse" />
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-blue-600 dark:text-blue-400">
                Top Destinations
              </span>
            </div>
            
            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight dark:text-white leading-[0.9] mb-4">
              Discover Your{' '}
              <span className="font-serif italic opacity-80 dark:opacity-60 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Next Adventure
              </span>
            </h2>
            
            {/* Subheading */}
            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed">
              From serene beaches to majestic mountains, explore handpicked destinations with premium stays and experiences.
            </p>
          </div>
          
          {/* CTA Button */}
          <button className="group relative px-8 py-4 rounded-xl text-white font-medium overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-primary-dark))] opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            {/* Content */}
            <div className="relative z-10 flex items-center gap-3">
              <span className="font-semibold tracking-wider">Explore All</span>
              <IoArrowForward className="transition-transform duration-500 group-hover:translate-x-2" size={18} />
            </div>
          </button>
        </div>

        {/* Filter Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800">
              <IoFilterOutline className="text-gray-600 dark:text-gray-400" size={18} />
            </div>
            <h3 className="text-lg font-semibold dark:text-white">Filter by Type</h3>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-primary-dark))] text-white shadow-lg'
                    : 'bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8 md:mb-12">
          <div className="relative max-w-md">
            <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search destinations, activities, or experiences..."
              className="w-full pl-12 pr-4 py-3.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
            />
          </div>
        </div>

        {/* The Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 auto-rows-auto">
          {destinationData.map((dest, i) => (
            <DestinationCard key={i} {...dest} />
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-12 md:mt-16 p-6 md:p-8 bg-gradient-to-r from-white/50 to-white/30 dark:from-gray-900/50 dark:to-gray-800/30 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Destinations', value: '50+', color: 'from-blue-500 to-cyan-500' },
              { label: 'Properties', value: '2,500+', color: 'from-emerald-500 to-green-500' },
              { label: 'Happy Travelers', value: '10,000+', color: 'from-amber-500 to-orange-500' },
              { label: 'Avg. Rating', value: '4.8/5', color: 'from-purple-500 to-pink-500' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile CTA */}
        <button className="w-full mt-8 md:hidden px-6 py-4 rounded-xl bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-primary-dark))] text-white font-semibold flex items-center justify-center gap-3">
          <span>Explore All Destinations</span>
          <IoArrowForward size={18} />
        </button>
      </div>
    </section>
  );
};

export default Destinations;