"use client";

import React, { useEffect, useState, MouseEvent } from 'react';
import Image from 'next/image';
import { Toaster } from 'react-hot-toast';
import NavBar from './NavBar';
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from '@/context/TranslationContext';

// Define the type for a practice area
interface PracticeArea {
  id: string;
  titleKey: string;
  image: string;
  descriptionKey: string;
  services: string[];
}

export default function PracticeAreas() {
  const { t } = useTranslation();
  
  // State for sticky nav
  const [activeSection, setActiveSection] = useState('family');
  const [isNavSticky, setIsNavSticky] = useState(false);

  // Check scroll position for sticky nav
  useEffect(() => {
    const handleScroll = () => {
      // Make nav sticky after hero section
      setIsNavSticky(window.scrollY > window.innerHeight * 0.6);
      
      // Determine active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < 300) {
          setActiveSection(section.id);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section function
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      // Get the top position of the section
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
      
      // Add offset to account for the fixed navbar (about 80px)
      const offset = 100;
      
      // Scroll to the section with the offset
      window.scrollTo({
        top: sectionTop - offset,
        behavior: 'smooth'
      });
    }
  };

  const practiceAreas: PracticeArea[] = [
    {
      id: 'family',
      titleKey: 'practiceAreas.familyLaw',
      image: '/areas/family.png',
      descriptionKey: 'practiceAreas.familyLawDescription',
      services: [
        'practiceAreas.prenuptialAgreement',
        'practiceAreas.separationDivorceAgreement',
        'practiceAreas.matrimonialPropertiesDivision',
        'practiceAreas.childSupport',
        'practiceAreas.spouseSupport',
        'practiceAreas.divorceOrder',
        'practiceAreas.divorceLitigation'
      ]
    },
    {
      id: 'corporate',
      titleKey: 'practiceAreas.corporateCommercialLaw',
      image: '/areas/corporate.png',
      descriptionKey: 'practiceAreas.corporateCommercialLawDescription',
      services: [
        'practiceAreas.incorporationMaintenance',
        'practiceAreas.commercialContractDrafting',
        'practiceAreas.employmentContract',
        'practiceAreas.shareholderAgreement',
        'practiceAreas.partnershipAgreement',
        'practiceAreas.purchaseSaleBusinesses',
        'practiceAreas.commercialLending',
        'practiceAreas.corporateRestructuring',
        'practiceAreas.franchiseAgreement'
      ]
    },
    {
      id: 'litigation',
      titleKey: 'practiceAreas.civilLitigation',
      image: '/areas/litigation.png',
      descriptionKey: 'practiceAreas.civilLitigationDescription',
      services: [
        'practiceAreas.defamation',
        'practiceAreas.debtCollection',
        'practiceAreas.shareholderDisputes',
        'practiceAreas.constructionRealEstateDisputes',
        'practiceAreas.contractDisputes',
        'practiceAreas.fraudClaims',
        'practiceAreas.estateLitigations'
      ]
    },
    {
      id: 'conveyancing',
      titleKey: 'practiceAreas.conveyancing',
      image: '/areas/conveyance.png',
      descriptionKey: 'practiceAreas.conveyancingDescription',
      services: [
        'practiceAreas.residentialPurchaseSale',
        'practiceAreas.residentialMortgagesRefinancing',
        'practiceAreas.lotrFiling',
        'practiceAreas.commercialRealEstatePurchaseSale'
      ]
    },
    {
      id: 'wills',
      titleKey: 'practiceAreas.willsTrustEstates',
      image: '/areas/will.png',
      descriptionKey: 'practiceAreas.willsTrustEstatesDescription',
      services: [
        'practiceAreas.wills',
        'practiceAreas.representationAgreements',
        'practiceAreas.probateWithWithoutWill',
        'practiceAreas.estatePlanning',
        'practiceAreas.documentAuthenticationEmbassies',
        'practiceAreas.powerOfAttorney'
      ]
    }
  ];
  
  // Create a section component without animations
  const PracticeAreaSection = ({ area, index }: { area: PracticeArea, index: number }) => {    
    return (
      <section 
        id={area.id}
        key={area.id} 
        className={`py-20 relative ${index % 2 === 0 ? 'bg-gray-100/30' : 'bg-gray-200/30'}`}
      >
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/bigBG.png" 
            alt="Background" 
            fill 
            className={`object-cover opacity-30 ${index % 2 === 0 ? 'brightness-100' : 'brightness-95'}`} 
          />
        </div>
        
        <div className="container relative z-10 mx-auto px-6">
          {/* Content container that leaves space for sidebar */}
          <div className="ml-auto w-full md:w-4/5">
            <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-16 items-center`}>
              {/* Image - reduced width to fit in the 4/5 container */}
              <div className="w-full md:w-2/5">
                <div className="rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:border-2 hover:border-[#FFC107]">
                  <div className="relative h-[300px] w-full">
                    <Image 
                      src={area.image}
                      alt={t(area.titleKey)}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              
              {/* Content - reduced width to fit in the 4/5 container */}
              <div className="w-full md:w-3/5">
                <h2 className="text-3xl font-bold uppercase mb-4">{t(area.titleKey)}</h2>
                <div className="h-[3px] w-[80px] bg-[#FFC107] mb-6"></div>
                <p className="text-lg text-gray-700 italic mb-8">{t(area.descriptionKey)}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {area.services.map((serviceKey: string, i: number) => (
                    <div key={i} className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-[#FFC107] mr-2"></div>
                      <span className="text-gray-800">{t(serviceKey)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // --- Add the function to open the chatbot ---
  const openChatbot = () => { // No event param needed here unless preventing default on an anchor
    const icon = document.getElementById('chatbotIcon');
    const panel = document.getElementById('chatbotPanel');

    if (icon && panel) {
      console.log("Opening chatbot panel directly via button click (Practice Areas Page).");
      panel.style.display = 'flex'; // Show panel
      icon.style.display = 'none';  // Hide icon

      // Set flag for the outside click listener in chatbot.js to ignore this event
      window.ignoreNextOutsideClick = true;

      // Optional: Try to focus input and scroll if the instance is available
      if (window.chatbotInstance && typeof window.chatbotInstance.focusInput === 'function') {
         window.chatbotInstance.focusInput();
      }
      if (window.chatbotInstance && typeof window.chatbotInstance.scrollToBottom === 'function') {
        window.chatbotInstance.scrollToBottom(true);
      }

    } else {
        console.error("Chatbot icon or panel element not found.");
    }
    // If attached to an anchor: event.preventDefault();
  };
  // --- End function ---

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Include NavBar at the top */}
      <NavBar />
      
      {/* Toast notifications */}
      <Toaster />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        {/* Background with overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/bigBG.png" 
            alt="Background" 
            fill 
            className="object-cover" 
            priority
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold uppercase text-white mb-6 pt-16 mt-10">
            {t('practiceAreas.pageTitle')}
            <div className="h-[3px] w-[120px] bg-[#FFC107] mx-auto mt-8"></div>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            {t('practiceAreas.heroDescription')}
          </p>
        </div>
      </section>
      
      {/* Side Navigation */}
      <AnimatePresence>
        {isNavSticky && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed left-0 top-1/3 z-50 flex flex-col bg-white/80 backdrop-blur-sm border-r border-gray-200 rounded-r-lg shadow-md"
          >
            <div className="py-4 px-2">
              {practiceAreas.map((area) => (
                <a
                  key={area.id}
                  href={`#${area.id}`}
                  onClick={(e) => scrollToSection(e, area.id)}
                  className={`group flex items-center py-2 px-3 text-sm rounded-md transition-colors my-1 ${
                    activeSection === area.id
                      ? 'bg-[#FFC107] text-gray-900 hover:bg-[#FFC107]'
                      : 'text-gray-800 hover:text-gray-900 hover:bg-gray-100/50'
                  }`}
                >
                  <span className="whitespace-nowrap">{t(area.titleKey)}</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Practice Area Blocks */}
      {practiceAreas.map((area, index) => (
        <PracticeAreaSection key={area.id} area={area} index={index} />
      ))}
      
      {/* Footer CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/bigBG.png" 
            alt="Background" 
            fill 
            className="object-cover opacity-40" 
          />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">{t('practiceAreas.eveTitle')}</h2>
          <div className="flex items-center justify-center">
            <button
              onClick={openChatbot}
              className="group relative inline-flex items-center gap-3 rounded-md bg-transparent px-8 py-3 font-semibold text-gray-900 border-2 border-[#FFC107] transition-all duration-300 hover:bg-[#FFC107] hover:text-white focus:outline-none"
            >
              <Image
                src="/chatbot.png"
                alt="Eve Bot"
                width={50}
                height={50}
              />
              {t('eve.chatButton')}
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
               >
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
               </svg>
            </button>
          </div>
        </div>
      </section>
      
      {/* Copyright Footer */}
      <div className="w-full py-6 relative">
        {/* Background with overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/bigBG.png" 
            alt="Background" 
            fill 
            className="object-cover opacity-40" 
          />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
        
        <p className="relative z-10 text-gray-900 text-sm text-center">
          {t('footer.copyright').replace('{currentYear}', new Date().getFullYear().toString())}
        </p>
      </div>
    </div>
  );
} 