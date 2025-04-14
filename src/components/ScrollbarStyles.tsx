"use client";

import React from "react";

const ScrollbarStyles: React.FC = () => {
  return (
    <style jsx global>{`
      .scrollbar-container::-webkit-scrollbar {
        width: 8px;
      }
      .scrollbar-container::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
      }
      .scrollbar-container::-webkit-scrollbar-thumb {
        background: #FFC107;
        border-radius: 4px;
      }
      .scrollbar-container::-webkit-scrollbar-thumb:hover {
        background: #e6ac00;
      }
    `}</style>
  );
};

export default ScrollbarStyles; 