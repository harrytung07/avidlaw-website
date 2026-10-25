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
    <div
      role="button"
      tabIndex={0}
      aria-label="Scroll down team list"
      className="flex justify-end pr-6 mt-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC107] rounded-full"
      onClick={handleScrollDown}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleScrollDown();
        }
      }}
    >
      <div className="flex flex-col items-center p-2 rounded-full hover:bg-zinc-100 active:scale-[0.96] transition-[background-color,transform] duration-150 ease-out">
        <svg 
          className="w-6 h-6 text-[#FFC107] shrink-0" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="7 13 12 18 17 13"></polyline>
          <polyline points="7 6 12 11 17 6"></polyline>
        </svg>
      </div>
    </div>
  );
}
