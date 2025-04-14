"use client";

import React from "react";

export default function ExploreButton() {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setTimeout(() => {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  return (
    <a 
      href="#about" 
      onClick={handleClick}
      className="group flex items-center px-6 py-3 border border-white/30 backdrop-blur-sm transition-all duration-150 hover:bg-black/80 rounded-md"
    >
      <svg 
        className="w-5 h-5 mr-3 text-[#FFC107]" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <polyline points="7 13 12 18 17 13"></polyline>
        <polyline points="7 6 12 11 17 6"></polyline>
      </svg>
      <span className="text-white uppercase tracking-wider text-sm font-bold">Explore</span>
    </a>
  );
} 