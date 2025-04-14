"use client";

import React from "react";

export default function TeamScrollArrow() {
  const handleScrollDown = () => {
    const scrollContainer = document.querySelector('.scrollbar-container');
    if (scrollContainer) {
      scrollContainer.scrollTop += 100;
    }
  };

  return (
    <div className="flex justify-end pr-6 mt-1 cursor-pointer" onClick={handleScrollDown}>
      <div className="flex flex-col items-center">
        <svg 
          className="w-6 h-6 text-yellow-500" 
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
      </div>
    </div>
  );
} 