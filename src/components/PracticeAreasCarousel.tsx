"use client";

import React, { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTranslation } from '@/context/TranslationContext';
import { useModal } from '@/context/ModalContext';

interface PracticeAreasCarouselProps {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const areaSlugMap: Record<string, string> = {
  'practiceAreas.corporateCommercialLaw': 'business-purchase-sale',
  'practiceAreas.conveyancing': 'commercial-real-estate',
  'practiceAreas.civilLitigation': 'shareholder-commercial-disputes',
  'practiceAreas.willsTrustEstates': 'wills-probate-estate-planning',
};

export default function PracticeAreasCarousel({ onMouseEnter, onMouseLeave }: PracticeAreasCarouselProps) {
  const { t, locale } = useTranslation();
  const { setModalOpen } = useModal();

  const localePath = (path: string) => {
    if (path.startsWith(`/${locale}`)) return path;
    if (path === '/' || path === '') return `/${locale}`;
    if (path === '/#contact' || path === '#contact') return `/${locale}#contact`;
    if (path.startsWith('/')) return `/${locale}${path}`;
    return `/${locale}/${path}`;
  };
  
  // Create autoplay plugin with options but don't store a reference to it
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', slidesToScroll: 1 }, 
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  // Define practice areas with translation keys
  const practiceAreas = [
    { id: 1, titleKey: 'practiceAreas.familyLaw', image: '/areas/family1.png' },
    { id: 2, titleKey: 'practiceAreas.corporateCommercialLaw', image: '/areas/corporate1.png' },
    { id: 3, titleKey: 'practiceAreas.civilLitigation', image: '/areas/litigation1.png' },
    { id: 4, titleKey: 'practiceAreas.conveyancing', image: '/areas/conveyance1.png' },
    { id: 5, titleKey: 'practiceAreas.willsTrustEstates', image: '/areas/will1.png' },
  ];

  // Define subareas for each practice area using translation keys
  const practiceAreaDetails: Record<string, string[]> = {
    'practiceAreas.familyLaw': [
      'practiceAreas.prenuptialAgreement',
      'practiceAreas.separationDivorceAgreement',
      'practiceAreas.matrimonialPropertiesDivision',
      'practiceAreas.childSupport',
      'practiceAreas.spouseSupport',
      'practiceAreas.divorceOrder',
      'practiceAreas.divorceLitigation',
      'practiceAreas.incorporationMaintenance',
      'practiceAreas.commercialContractDrafting'
    ],
    'practiceAreas.corporateCommercialLaw': [
      'practiceAreas.employmentContract',
      'practiceAreas.shareholderAgreement',
      'practiceAreas.partnershipAgreement',
      'practiceAreas.purchaseSaleBusinesses',
      'practiceAreas.commercialLending',
      'practiceAreas.corporateRestructuring',
      'practiceAreas.franchiseAgreement',
      'practiceAreas.defamation'
    ],
    'practiceAreas.civilLitigation': [
      'practiceAreas.shareholderDisputes',
      'practiceAreas.constructionRealEstateDisputes',
      'practiceAreas.contractDisputes',
      'practiceAreas.fraudClaims',
      'practiceAreas.estateLitigations',
      'practiceAreas.residentialPurchaseSale'
    ],
    'practiceAreas.conveyancing': [
      'practiceAreas.residentialMortgagesRefinancing',
      'practiceAreas.lotrFiling',
      'practiceAreas.commercialRealEstatePurchaseSale',
      'practiceAreas.wills',
      'practiceAreas.representationAgreements'
    ],
    'practiceAreas.willsTrustEstates': [
      'practiceAreas.probateWithWithoutWill',
      'practiceAreas.estatePlanning',
      'practiceAreas.notarization',
      'practiceAreas.documentAuthenticationEmbassies',
      'practiceAreas.powerOfAttorney',
      'practiceAreas.inheritance'
    ]
  };

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
  const handleAreaClick = (areaTitleKey: string) => {
    setSelectedArea(areaTitleKey);
    setShowModal(true);
    setModalOpen(true);
    if (emblaApi?.plugins()?.autoplay?.stop) {
      emblaApi.plugins().autoplay.stop();
    }
  };

  // Close modal and resume autoplay
  const closeModal = () => {
    setShowModal(false);
    setSelectedArea(null);
    setModalOpen(false);
    if (emblaApi?.plugins()?.autoplay?.play) {
      emblaApi.plugins().autoplay.play();
    }
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
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
    onSelect();
    
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

  // Clean up modal state when component unmounts
  useEffect(() => {
    return () => {
      if (showModal) {
        setModalOpen(false);
      }
    };
  }, [showModal, setModalOpen]);

  const viewAllText = locale === 'zh-Hans' ? '查看全部业务领域' : locale === 'zh-Hant' ? '查看全部業務領域' : 'View All Practice Areas';
  const detailedGuideText = locale === 'zh-Hans' ? '阅读重点法定指南' : locale === 'zh-Hant' ? '閱讀重點法定指南' : 'Read In-Depth Statutory Guide';

  return (
    <div className="relative">
      {/* Modal for showing subareas */}
      <AnimatePresence initial={false}>
        {showModal && selectedArea && (
          <motion.div
            key={selectedArea}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
          >
            {/* Static backdrop inside wrapper */}
            <div
              className="fixed inset-0 bg-[#0B1B48]/80 backdrop-blur-sm"
              onClick={closeModal}
            />

            {/* Modal dialog card */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="practice-area-modal-title"
              initial={{ y: 16, scale: 0.97 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 12, scale: 0.97 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative z-10 max-w-2xl w-full bg-white border border-zinc-200 text-zinc-900 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden overscroll-contain"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="absolute top-4 right-4 z-10 bg-zinc-100 hover:bg-zinc-200 p-2.5 rounded-full text-zinc-600 hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-[#FFC107] focus-visible:outline-none active:scale-[0.96] transition-[background-color,color,transform] duration-150"
                onClick={closeModal}
                aria-label={t("practiceAreas.closeModal") || "Close practice area modal"}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>

              <h2 id="practice-area-modal-title" className="text-2xl font-serif font-bold text-[#0B1B48] mb-2">
                {t(selectedArea)}
              </h2>
              <div className="w-16 h-1 bg-[#FFC107] rounded-full mb-6"></div>

              <div className="max-h-[55vh] overflow-y-auto pr-2 pb-2 overscroll-contain">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {practiceAreaDetails[selectedArea]?.map((subareaKey, index) => (
                    <li
                      key={index}
                      className="flex items-center text-zinc-800 font-medium text-sm py-2.5 px-3 bg-zinc-50 hover:bg-[#FFC107]/15 border border-zinc-200/80 rounded-lg transition-colors"
                    >
                      <span className="h-2 w-2 bg-[#FFC107] rounded-full mr-3 shrink-0"></span>
                      <span>{t(subareaKey)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct Crawlable Link in Modal Footer to Eliminate Orphan Pages */}
              <div className="mt-6 pt-5 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-3">
                <Link
                  href={localePath('/practice-areas')}
                  onClick={closeModal}
                  className="inline-flex items-center text-xs font-bold text-zinc-600 hover:text-[#0B1B48] transition-colors"
                >
                  <span>{viewAllText}</span>
                  <span className="ml-1 font-bold">→</span>
                </Link>

                {areaSlugMap[selectedArea] && (
                  <Link
                    href={localePath(`/practice-areas/${areaSlugMap[selectedArea]}`)}
                    onClick={closeModal}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#0B1B48] text-[#FFC107] hover:bg-[#132763] text-xs font-bold transition-all shadow-md"
                  >
                    <span>{detailedGuideText}</span>
                    <span>→</span>
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div 
        className="embla select-none" 
        ref={emblaRef} 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
      >
        <div className="embla__container">
          {practiceAreas.map((area) => {
            const areaSlug = areaSlugMap[area.titleKey];
            return (
              <div className="embla__slide p-4 select-none" key={area.id}>
                <div 
                  className="relative h-[350px] rounded-md overflow-hidden group cursor-pointer shadow-lg select-none"
                  onClick={() => handleAreaClick(area.titleKey)}
                >
                  <Image 
                    src={area.image}
                    alt={t(area.titleKey)}
                    fill
                    draggable="false"
                    className="object-cover object-center z-0 transition-transform duration-500 group-hover:scale-110 pointer-events-none"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20 bg-gradient-to-t from-black to-transparent pointer-events-none">
                    <h3 className="text-white uppercase font-bold text-lg select-none">{t(area.titleKey)}</h3>
                    <div className="w-12 h-[2px] bg-[#FFC107] mt-2 transition-[width] duration-300 ease-out group-hover:w-24"></div>

                    {/* Crawlable link for search engine discovery and non-JS clients */}
                    <div className="mt-3 pointer-events-auto">
                      <Link
                        href={localePath(areaSlug ? `/practice-areas/${areaSlug}` : '/practice-areas')}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center text-xs text-[#FFC107] hover:underline font-semibold"
                      >
                        <span>{detailedGuideText}</span>
                        <span className="ml-1 font-bold">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Navigation buttons */}
      <button 
        className="absolute top-1/2 left-4 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-black/40 backdrop-blur-sm border border-white/10 rounded-full hover:bg-[#FFC107]/80 hover:border-[#FFC107] active:scale-[0.96] transition-[background-color,border-color,transform] duration-200 ease-out group"
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
          className="text-white group-hover:text-black transition-colors duration-200"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      
      <button 
        className="absolute top-1/2 right-4 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-black/40 backdrop-blur-sm border border-white/10 rounded-full hover:bg-[#FFC107]/80 hover:border-[#FFC107] active:scale-[0.96] transition-[background-color,border-color,transform] duration-200 ease-out group"
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
          className="text-white group-hover:text-black transition-colors duration-200"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
      
      {/* Navigation dots with expanded 40px hit area */}
      <div className="flex justify-center items-center mt-6 space-x-1">
        {practiceAreas.map((_, index) => (
          <button
            key={index}
            className="relative p-2 flex items-center justify-center focus:outline-none"
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          >
            <span
              className={`block h-2 rounded-full transition-[width,background-color] duration-300 ease-out ${
                index === selectedIndex ? 'bg-[#FFC107] w-6' : 'bg-gray-400 w-2 hover:bg-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
