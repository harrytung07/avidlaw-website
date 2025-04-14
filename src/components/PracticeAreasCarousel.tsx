"use client";

import React, { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

interface PracticeAreasCarouselProps {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

// Define subareas for each practice area
const practiceAreaDetails = {
  "Family Law": [
    "Prenuptial Agreement",
    "Separation/Divorce Agreement",
    "Matrimonial Properties Division",
    "Child Support",
    "Spouse Support",
    "Divorce Order",
    "Divorce Litigation"
  ],
  "Corporate & Commercial Law": [
    "Incorporation and Maintenance",
    "Commercial Contract Drafting",
    "Employment contract",
    "Shareholder Agreement",
    "Partnership Agreement",
    "Purchase and sale of businesses",
    "Commercial Lending",
    "Corporate Restructuring",
    "Franchise agreement"
  ],
  "Civil Litigation": [
    "Defamation",
    "Debt collection",
    "Shareholder disputes",
    "Construction and real estate disputes",
    "Contract disputes",
    "Fraud claims",
    "Estate litigations"
  ],
  "Conveyancing": [
    "Residential purchase and sale",
    "Residential mortgages including refinancing",
    "LOTR filing",
    "Commercial real estate purchase and sale"
  ],
  "Wills, Trust & Estates": [
    "Wills",
    "Representation Agreements",
    "Probate with and without will",
    "Estate Planning",
    "Document authentication with embassies",
    "Power of Attorney"
  ]
};

export default function PracticeAreasCarousel({ onMouseEnter, onMouseLeave }: PracticeAreasCarouselProps) {
  // Create autoplay plugin with options but don't store a reference to it
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', slidesToScroll: 1 }, 
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const practiceAreas = [
    { id: 1, title: 'Family Law', image: '/areas/family.png' },
    { id: 2, title: 'Corporate & Commercial Law', image: '/areas/corporate.png' },
    { id: 3, title: 'Civil Litigation', image: '/areas/litigation.png' },
    { id: 4, title: 'Conveyancing', image: '/areas/conveyance.png' },
    { id: 5, title: 'Wills, Trust & Estates', image: '/areas/will.png' },
  ];

  // Handle mouse enter - pause autoplay
  const handleMouseEnter = useCallback(() => {
    if (emblaApi?.plugins()?.autoplay?.stop) {
      emblaApi.plugins().autoplay.stop();
    }
    if (onMouseEnter) onMouseEnter();
  }, [emblaApi, onMouseEnter]);

  // Handle mouse leave - resume autoplay
  const handleMouseLeave = useCallback(() => {
    if (emblaApi?.plugins()?.autoplay?.play) {
      emblaApi.plugins().autoplay.play();
    }
    if (onMouseLeave) onMouseLeave();
  }, [emblaApi, onMouseLeave]);

  // Handle area card click
  const handleAreaClick = (areaTitle: string) => {
    setSelectedArea(areaTitle);
    setShowModal(true);
    // Ensure autoplay stops when modal is open
    if (emblaApi?.plugins()?.autoplay?.stop) {
      emblaApi.plugins().autoplay.stop();
    }
  };

  // Close modal and resume autoplay
  const closeModal = () => {
    setShowModal(false);
    setSelectedArea(null);
    if (emblaApi?.plugins()?.autoplay?.play) {
      emblaApi.plugins().autoplay.play();
    }
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showModal) {
      // Prevent scrolling on body when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal]);

  // Track selected index for display purposes
  useEffect(() => {
    if (!emblaApi) return;
    
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    
    emblaApi.on('select', onSelect);
    onSelect(); // Call once initially
    
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  // Close modal on escape key press
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showModal) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [showModal]);

  return (
    <div className="relative">
      {/* Modal for showing subareas */}
      {showModal && selectedArea && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/0 animate-fade-in"
          onClick={closeModal}
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0,
            animation: 'fadeInBg 0.3s ease forwards'
          }}
        >
          <style jsx>{`
            @keyframes fadeInBg {
              from { background-color: rgba(0, 0, 0, 0); }
              to { background-color: rgba(0, 0, 0, 0.95); }
            }
            
            @keyframes fadeInContent {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          <div 
            className="relative max-w-2xl w-full mx-4 overflow-hidden opacity-0"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            style={{
              animation: 'fadeInContent 0.4s ease 0.15s forwards'
            }}
          >
            <div className="p-6">
              <button 
                className="absolute top-4 right-4 text-white hover:text-[#FFC107] text-2xl"
                onClick={closeModal}
                aria-label="Close modal"
              >
                &times;
              </button>
              
              <h2 className="text-2xl font-bold text-white mb-3">
                {selectedArea}
              </h2>
              <div className="w-24 h-[2px] bg-[#FFC107] mb-10"></div>
              
              <div className="max-h-[70vh] overflow-y-auto pr-4 pl-2 pb-4">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {practiceAreaDetails[selectedArea as keyof typeof practiceAreaDetails].map((subarea, index) => (
                    <li 
                      key={index} 
                      className="flex items-center text-white py-2 px-2 hover:bg-[#FFC107]/10 hover:text-[#FFC107] rounded transition-all"
                    >
                      <span className="h-1.5 w-1.5 bg-white rounded-full mr-3"></span>
                      {subarea}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <div 
        className="embla select-none" 
        ref={emblaRef} 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
      >
        <div className="embla__container">
          {practiceAreas.map((area) => (
            <div className="embla__slide p-4 select-none" key={area.id}>
              <div 
                className="relative h-[350px] rounded-md overflow-hidden group cursor-pointer shadow-lg select-none"
                onClick={() => handleAreaClick(area.title)}
              >
                <Image 
                  src={area.image}
                  alt={area.title}
                  fill
                  draggable="false"
                  className="object-cover object-center z-0 transition-transform duration-500 group-hover:scale-110 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80 z-10 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20 bg-gradient-to-t from-black to-transparent pointer-events-none">
                  <h3 className="text-white uppercase font-bold text-lg select-none">{area.title}</h3>
                  <div className="w-12 h-[2px] bg-[#FFC107] mt-2 transition-all duration-300 group-hover:w-24"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation buttons */}
      <button 
        className="absolute top-1/2 left-4 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-black/40 backdrop-blur-sm border border-white/10 rounded-full hover:bg-[#FFC107]/80 hover:border-[#FFC107] transition-all duration-300 group"
        onClick={() => emblaApi?.scrollPrev()}
        aria-label="Previous slide"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="text-white group-hover:text-black transition-colors duration-300"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      
      <button 
        className="absolute top-1/2 right-4 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-black/40 backdrop-blur-sm border border-white/10 rounded-full hover:bg-[#FFC107]/80 hover:border-[#FFC107] transition-all duration-300 group"
        onClick={() => emblaApi?.scrollNext()}
        aria-label="Next slide"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="text-white group-hover:text-black transition-colors duration-300"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
      
      {/* Navigation dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {practiceAreas.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === selectedIndex ? 'bg-[#FFC107] w-6' : 'bg-gray-400'
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 