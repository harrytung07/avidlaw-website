"use client";

import React from "react";

export default function HideScrollbarStyles() {
  return (
    <style jsx global>{`
      .no-scrollbar {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
      }
      .no-scrollbar::-webkit-scrollbar {
        display: none;  /* Chrome, Safari and Opera */
      }
    `}</style>
  );
} 