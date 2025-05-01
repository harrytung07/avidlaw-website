"use client";

import React, { useEffect, useState, MouseEvent } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import ExploreButton from "./ExploreButton";
import NavBar from "./NavBar";
import ScrollbarStyles from "./ScrollbarStyles";
import PracticeAreasCarousel from "./PracticeAreasCarousel";
import "./embla.css";
import { toast, Toaster } from "react-hot-toast";
import Link from "next/link";
import { useTranslation } from "@/context/TranslationContext";

declare global {
  interface Window {
    chatbotInstance?: any; // Or a more specific type if you define one
    ignoreNextOutsideClick?: boolean;
  }
}

export function LawFirmLanding() {
  const { t } = useTranslation();
  
  // Team members data
  const teamMembers = [
    { id: 1, name: "Adele Sun", title: t("attorneys.roleManagingPartner"), image: "/members/1. Adele Sun.jpg" },
    { id: 2, name: "David Chen", title: t("attorneys.roleSeniorAssociate"), image: "/members/2. David Chen.jpg" },
    { id: 3, name: "Brent Desruisseaux", title: t("attorneys.roleFamilyLawSpecialist"), image: "/members/3. Brent Desruisseaux.jpg" },
    { id: 4, name: "Corey Poon", title: t("attorneys.roleCorporateLawSpecialist"), image: "/members/4. Corey Poon.jpg" },
    { id: 5, name: "Howard Qu", title: t("attorneys.roleLitigationExpert"), image: "/members/5. Howard Qu.jpg" },
    { id: 6, name: "Freja Li", title: t("attorneys.roleEstatePlanningAttorney"), image: "/members/6. Freja Li.jpg" },
    { id: 7, name: "Rachel Li", title: t("attorneys.roleFamilyLawSpecialist"), image: "/members/7. Rachel Li.jpg" },
    { id: 8, name: "Farrah Yang", title: t("attorneys.roleCorporateLawSpecialist"), image: "/members/8. Farrah Yang.jpg" },
    { id: 9, name: "Sunny Zhang", title: t("attorneys.roleLegalAssistant"), image: "/members/9. Sunny Zhang.jpg" },
    { id: 10, name: "Jeannie Lee", title: t("attorneys.roleLegalAssistant"), image: "/members/10. Jeannie Lee.jpg" },
    { id: 11, name: "Ashley Wong", title: t("attorneys.roleLegalAssistant"), image: "/members/11. Ashley Wong.jpg" },
    { id: 12, name: "Stella Li", title: t("attorneys.roleLegalAssistant"), image: "/members/12. Stella Li.jpg" },
  ];

  // Team slide state
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = Math.ceil(teamMembers.length / 4);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Group team members into sets of 4 for pagination
  const teamSlides = Array.from({ length: totalSlides }, (_, i) => 
    teamMembers.slice(i * 4, (i * 4) + 4)
  );

  // Add the first slide again at the end for continuous scrolling
  const allSlides = [...teamSlides, teamSlides[0]];

  // Slide change timer
  useEffect(() => {
    // Don't set timer if auto-scrolling is paused
    if (isAutoScrollPaused || isResetting) return;
    
    const timer = setTimeout(() => {
      if (currentSlide === totalSlides) {
        // If we've displayed the duplicate first slide, quickly reset to the real first slide
        setIsResetting(true);
        setCurrentSlide(0);
        // Allow time for the slide to reset without animation
        setTimeout(() => setIsResetting(false), 50);
      } else {
        // Otherwise just advance to the next slide
        setCurrentSlide(currentSlide + 1);
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [currentSlide, totalSlides, isAutoScrollPaused, isResetting]);

  // Copy to clipboard function
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success(`${label} ${t("contact.copyButtonTooltip")}`, {
          duration: 2000,
          position: 'bottom-center',
          style: {
            background: '#333',
            color: '#fff',
          },
        });
      })
      .catch((err) => {
        toast.error(t("contact.copyFailedTooltip"), {
          duration: 2000,
          position: 'bottom-center',
        });
        console.error('Failed to copy: ', err);
      });
  };

  // Open address in Google Maps
  const openInMaps = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  // --- Function to open the chatbot ---
  const openChatbot = () => { // No event needed here anymore
    const icon = document.getElementById('chatbotIcon');
    const panel = document.getElementById('chatbotPanel');

    if (icon && panel) {
      console.log("Opening chatbot panel directly via button click.");
      panel.style.display = 'flex'; // Show panel
      icon.style.display = 'none';  // Hide icon

      // --- Add this line ---
      // Set flag for the outside click listener in chatbot.js to ignore this event
      window.ignoreNextOutsideClick = true;
      // --- End added line ---


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
  };
  // --- End function ---
  
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Toast notifications */}
      <Toaster />
      
      {/* Sticky NavBar - will be fixed at the top when scrolling */}
      <NavBar />
      
      {/* Hero Section */}
      <header className="relative h-[100vh] bg-gray-900 pt-0">
        {/* Gradient overlay - visible immediately without delay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-800/70 z-10" />
        
        {/* Background image with darker initial state */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/A.png" 
            alt="Background" 
            fill 
            className="object-cover object-bottom" 
            priority
          />
        </div>
        
        {/* Navbar is already handled with its own animation in NavBar.tsx */}
        
        {/* Content container */}
        <div className="container relative z-20 mx-auto px-6 py-4 h-full flex flex-col">
          <div className="flex-1 flex items-center justify-end max-w-xl ml-auto">
            {/* Slogan and buttons - appear after navbar */}
            <div className="text-right relative opacity-0 animate-fadeIn" style={{ animationDelay: '1.5s' }}>
              <div className="absolute left-[-50px] top-[-30px] bottom-[-2px] w-[4px] bg-[#FFC107] z-20"></div>
              <h1 className="text-5xl font-bold uppercase mb-4 text-white">
                {t("hero.title")}
              </h1>
              <p className="text-2xl text-white font-medium mb-6">
                {t("hero.subtitle")}
              </p>
              <div className="flex justify-end mt-16">
                <button 
                  className="border border-[#FFC107] text-[#FFC107] hover:bg-[#FFC107] hover:text-white transition-colors font-semibold px-5 py-2 rounded flex items-center"
                  onClick={openChatbot}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  {t("hero.chatButton")}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Explore button at bottom center - appears last */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30 opacity-0 animate-fadeIn" style={{ animationDelay: '2.2s' }}>
          <ExploreButton />
        </div>
      </header>

      {/* Introduction Section with Historical Timeline */}
      <section id="about" className="py-20 relative overflow-hidden">
        {/* Common background image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/bigBG.png" 
            alt="Background" 
            fill 
            className="object-cover opacity-50 brightness-99" 
          />
        </div>
        
        {/* Decorative Background Boxes */}
        <div className="absolute top-16 -left-1/4 w-[60%] h-[350px] bg-white opacity-90 z-0"
          style={{
            backgroundImage: `radial-gradient(#00000005 1px, transparent 1px)`,
            backgroundSize: "8px 8px"
          }}
        ></div>
        <div className="absolute top-[330px] left-[30%] right-0 bottom-0 bg-white opacity-90 z-0"
          style={{
            backgroundImage: `radial-gradient(#00000005 1px, transparent 1px)`,
            backgroundSize: "8px 8px"
          }}
        ></div>
        
        <div className="container mx-auto px-6 relative z-10">
          {/* Company name above the bottom box with vertical line extending from it */}
          <div className="flex flex-col md:flex-row items-start relative">
            <div className="md:w-1/2"></div>
            <div className="md:w-1/2 relative">
              {/* Yellow vertical line - extending from company name down but not all the way */}
              <div className="absolute left-0 top-[32px] bottom-[-200px] w-[4px] bg-[#FFC107] z-20"></div>
              <h2 className="text-[42px] font-serif uppercase tracking-wide text-black mb-24 ml-36 mt-12">{t("intro.companyName")}</h2>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-start">
            {/* Left column - Historical Image */}
            <div className="md:w-1/2 mb-12 md:mb-0 relative z-20">
              <div className="w-[450px] h-[380px] relative shadow-md mx-auto md:mx-0">
                <Image 
                  src="/intro.png" 
                  alt="Historical Photo" 
                  fill 
                  className="object-cover opacity-90 grayscale" 
                />
                <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-gradient-to-t from-black/90 to-transparent z-10">
                  <div className="text-center absolute bottom-4 left-0 right-0">
                    <p className="text-white uppercase font-bold text-sm tracking-wider">
                      {t("intro.historyTag")}
                    </p>
                    <div className="w-16 h-[2px] bg-white mx-auto mt-2"></div>
                  </div>
                </div>
              </div>
              
              {/* Year and Carousel Navigation - inside box 2 */}
              <div className="absolute bottom-[-80px] left-[170px] flex items-center z-20">
                <div className="h-[50px] w-[4px] bg-gray-400 mr-4"></div>
                <p className="text-[#FFC107] text-5xl font-serif italic">{t("intro.year")}</p>
                <div className="ml-6 flex space-x-6">
                  <span className="text-2xl cursor-pointer hover:text-gray-700">«</span>
                  <span className="text-2xl cursor-pointer hover:text-gray-700">»</span>
                </div>
              </div>
            </div>
            
            {/* Right column - Firm Introduction Text Block */}
            <div className="md:w-1/2 pt-0">
              {/* Content directly within bottom white box */}
              <div className="relative px-8 py-10 z-10 ml-28 max-w-3xl mt-16">
                <h3 className="text-xl font-serif font-bold text-black mb-7">{t("intro.sectionTitle")}</h3>
                <p className="text-[15px] text-gray-700 leading-7 mb-10">
                  {t("intro.sectionText")}
                </p>
                
                <div className="relative inline-block group">
                  <Link href="/about">
                    <button className="h-[40px] w-[160px] px-5 bg-gray-400 text-black uppercase text-xs font-bold tracking-wider rounded-sm z-10 relative overflow-hidden transition-colors duration-300 whitespace-nowrap">
                      <span className="relative z-10">{t("intro.readMore")}</span>
                      <span className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#FFC107] group-hover:w-full transition-all duration-300 ease-in-out"></span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Attorney Showcase Section */}
      <section id="attorneys" className="py-20 relative overflow-hidden">
        {/* Common background image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/bigBG.png" 
            alt="Background" 
            fill 
            className="object-cover opacity-50 brightness-125" 
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="md:w-2/5">
              <div className="relative">
                <div className="h-[460px] overflow-y-auto pr-6 text-base text-gray-700 leading-relaxed mb-11 scrollbar-container">
                  <h2 className="text-3xl font-bold uppercase mb-8">{t("attorneys.sectionTitle")}</h2>
                  
                  <p className="mb-6 text-sm leading-relaxed">
                    {t("attorneys.sectionText1")}
                  </p>
                  <p className="mb-6 text-sm leading-relaxed">
                    {t("attorneys.sectionText2")}
                  </p>
                  <p className="mb-6 text-sm leading-relaxed">
                    {t("attorneys.sectionText3")}
                  </p>
                  <p className="mb-6 text-sm leading-relaxed">
                    {t("attorneys.sectionText4")}
                  </p>
                  <p className="mb-6 text-sm leading-relaxed">
                    {t("attorneys.sectionText5")}
                  </p>
                  <p className="text-sm leading-relaxed">
                    {t("attorneys.sectionText6")}
                  </p>
                </div>
                
                {/* Custom scrollbar styling */}
                <ScrollbarStyles />
              </div>
              
              <div className="relative inline-block group">
                <Link href="/team">
                  <button className="h-[40px] w-[180px] px-5 bg-gray-400 text-black uppercase text-xs font-bold tracking-wider rounded-sm z-10 relative overflow-hidden transition-colors duration-300 whitespace-nowrap">
                    <span className="relative z-10">{t("attorneys.meetTeam")}</span>
                    <span className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#FFC107] group-hover:w-full transition-all duration-300 ease-in-out"></span>
                  </button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              {/* Team members grid display with smoother transition */}
              <div 
                className="h-[700px] relative overflow-hidden"
                onMouseEnter={() => setIsAutoScrollPaused(true)}
                onMouseLeave={() => setIsAutoScrollPaused(false)}
              >
                {/* Grey background boxes */}
                <div className="absolute top-[-70px] left-[-90px] w-[250px] h-[500px] opacity-50 z-0">
                  <Image 
                    src="/memberGrey.jpg" 
                    alt="Background Pattern" 
                    fill 
                    className="object-cover brightness-90"
                  />
                </div>
                <div className="absolute top-[140px] right-[-70px] w-[250px] h-[500px] opacity-50 z-0">
                  <Image 
                    src="/memberGrey.jpg" 
                    alt="Background Pattern" 
                    fill 
                    className="object-cover brightness-90"
                  />
                </div>
                
                <div 
                  className="absolute inset-0 transition-transform duration-1000 ease-in-out z-10"
                  style={{ 
                    transform: `translateX(-${currentSlide * 100}%)`,
                    transition: isResetting ? 'none' : 'transform 1000ms ease-in-out'
                  }}
                >
                  {allSlides.map((slide, slideIndex) => (
                    <div 
                      key={slideIndex}
                      className="absolute top-0 left-0 w-full h-full grid grid-cols-2 gap-2"
                      style={{
                        transform: `translateX(${slideIndex * 100}%)`
                      }}
                    >
                      {slide.map((member, memberIndex) => (
                        <div 
                          key={`${slideIndex}-${member.id}`}
                          className={`p-4 text-center ${memberIndex >= 2 ? 'transform -translate-y-8' : ''}`}
                        >
                          <div className="w-[220px] h-[220px] relative mx-auto overflow-hidden shadow-lg">
                            <Image 
                              src={member.image}
                              alt={member.name}
                              fill
                              className="object-cover object-center scale-110"
                            />
                          </div>
                          <div className="bg-white py-2 px-4 w-[220px] mx-auto relative group shadow-md">
                            <h3 className="font-bold text-gray-900 text-sm group-hover:text-gray-900 relative z-10">{member.name}</h3>
                            <div className="absolute left-0 bottom-0 w-full h-[4px] bg-[#FFC107] transform origin-left group-hover:h-full transition-all duration-150 ease-out"></div>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas Section */}
      <section id="services" className="py-20 relative overflow-hidden">
        {/* Common background image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/bigBG.png" 
            alt="Background" 
            fill 
            className="object-cover opacity-50 brightness-99" 
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row gap-24">
            <div className="md:w-1/2">
              <PracticeAreasCarousel 
                onMouseEnter={() => setIsAutoScrollPaused(true)}
                onMouseLeave={() => setIsAutoScrollPaused(false)}
              />
            </div>
            
            <div className="md:w-2/5">
              <div className="relative">
                <div className="h-[460px] overflow-y-auto pr-6 text-base text-gray-700 leading-relaxed mb-11 scrollbar-container">
                  <h2 className="text-3xl font-bold uppercase mb-8">{t("practiceAreas.sectionTitle")}</h2>
                  
                  <h3 className="text-xl font-serif font-bold text-black mb-7">{t("practiceAreas.sectionSubtitle")}</h3>
                  
                  <p className="mb-6 text-sm leading-relaxed">
                    {t("practiceAreas.sectionText1")}
                  </p>
                  <p className="mb-6 text-sm leading-relaxed">
                    {t("practiceAreas.sectionText2")}
                  </p>
                  <p className="text-sm leading-relaxed">
                    {t("practiceAreas.sectionText3")}
                  </p>
                    </div>
                
                {/* Custom scrollbar styling */}
                <ScrollbarStyles />
                  </div>
              
              <div className="relative inline-block group">
                <Link href="/practice-areas">
                  <button className="h-[40px] w-[200px] px-5 bg-gray-400 text-black uppercase text-xs font-bold tracking-wider rounded-sm z-10 relative overflow-hidden transition-colors duration-300 whitespace-nowrap">
                    <span className="relative z-10">{t("practiceAreas.viewAll")}</span>
                    <span className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#FFC107] group-hover:w-full transition-all duration-300 ease-in-out"></span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eve Chatbot Introduction Section */}
      <section className="py-20 relative overflow-hidden" style={{ height: "80vh" }}>
        {/* Marble textured background */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/bigBG.png" 
            alt="Marble Background" 
            fill 
            className="object-cover opacity-50 brightness-125" 
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 h-full flex flex-col items-center justify-center text-center max-w-[1200px] py-[80px]">
          <h2 className="text-[32px] font-bold text-[#222222] mb-4">
            {t("eve.sectionTitle")}
          </h2>
          
          <p className="text-[18px] text-[#444444] leading-relaxed mb-8 max-w-[720px]">
            {t("eve.sectionText")}
          </p>
          
          <div className="relative w-[120px] h-[120px] mb-8">
            <Image 
              src="/chatbot.png" 
              alt="Eve AI Assistant" 
              fill
              className="object-contain"
            />
          </div>
          
          <button 
            className="w-[200px] h-[50px] bg-[#FFC107] text-black font-semibold rounded-lg shadow-md hover:bg-[#e6ac00] transition-colors duration-300"
            onClick={openChatbot}
          >
            {t("eve.chatButton")}
          </button>
        </div>
      </section>

      {/* Contact and Location Footer Section */}
      <section id="contact" className="py-20 relative overflow-hidden" style={{ height: "80vh" }}>
        {/* Common background image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/bigBG.png" 
            alt="Background" 
            fill 
            className="object-cover opacity-50 brightness-99" 
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 max-w-[1200px] py-[60px]">
          <div className="flex flex-wrap gap-12 md:gap-[48px]">
            {/* Left Column - Contact Information */}
            <div className="w-full md:w-[calc(50%-24px)] text-center md:text-left">
              <div className="flex items-center mb-6">
                <h2 className="text-[32px] font-bold text-[#222222] mr-3">{t("contact.sectionTitle")}</h2>
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="font-semibold text-[16px] text-[#444444] mb-1">{t("contact.phoneLabel")}</p>
                <button
                  onClick={() => copyToClipboard('+16042737565', t("contact.copyLabelPhone"))}
                  className="text-black hover:text-[#FFC107] transition-colors cursor-pointer flex items-center"
                >
                  +1 (604) 273-7565
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
              
              <div className="mb-6">
                <p className="font-semibold text-[16px] text-[#444444] mb-1">{t("contact.emailLabel")}</p>
                <button
                  onClick={() => copyToClipboard('info@avid-law.com', t("contact.copyLabelEmail"))}
                  className="text-black hover:text-[#FFC107] transition-colors cursor-pointer flex items-center"
                >
                  info@avid-law.com
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
              
              {/* Office Hours Section */}
              <div className="mb-6">
                <p className="font-semibold text-[16px] text-[#444444] mb-2">Office Hours:</p>
                <p className="text-gray-700 leading-relaxed">
                  {t("contact.officeHours")}
                </p>
              </div>
            </div>
            
            {/* Right Column - Office Addresses */}
            <div className="w-full md:w-[calc(50%-24px)] flex flex-col gap-6">
              {/* Pacific Business Centre Address Card */}
              <div className="bg-white p-6 rounded-lg shadow-md max-w-[500px] mx-auto md:mx-0 w-full relative">
                <button 
                  className="absolute top-3 right-3 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                  onClick={() => copyToClipboard('5811 Cooney Road, Suite 602 North Tower, Richmond, British Columbia V6X 3M1, Canada', 'Pacific Business Centre address')}
                  aria-label="Copy address"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FFC107]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
                <div className="absolute top-3 right-12 group">
                  <button 
                    className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                    onClick={() => openInMaps('5811 Cooney Road, Suite 602 North Tower, Richmond, British Columbia V6X 3M1, Canada')}
                    aria-label="View in map"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FFC107]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <span className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">View in Map</span>
                  </button>
                </div>
                <div className="flex">
                  <div className="mr-4 text-[#FFC107]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-[#444444]">{t("contact.office1Title")}</h3>
                    <p className="mb-1">5811 Cooney Road</p>
                    <p className="mb-1">Suite 602 North Tower</p>
                    <p>Richmond, British Columbia V6X 3M1</p>
                    <p>Canada</p>
                  </div>
                </div>
              </div>
              
              {/* Aberdeen Square Address Card */}
              <div className="bg-white p-6 rounded-lg shadow-md max-w-[500px] mx-auto md:mx-0 w-full relative">
                <button 
                  className="absolute top-3 right-3 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                  onClick={() => copyToClipboard('4000 No. 3 Road, Unit 5235, Richmond, British Columbia V6X 0J8, Canada', 'Aberdeen Square address')}
                  aria-label="Copy address"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FFC107]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
                <div className="absolute top-3 right-12 group">
                  <button 
                    className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                    onClick={() => openInMaps('4000 No. 3 Road, Unit 5235, Richmond, British Columbia V6X 0J8, Canada')}
                    aria-label="View in map"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FFC107]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <span className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">View in Map</span>
                  </button>
                </div>
                <div className="flex">
                  <div className="mr-4 text-[#FFC107]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-[#444444]">{t("contact.office2Title")}</h3>
                    <p className="mb-1">4000 No. 3 Road</p>
                    <p className="mb-1">Unit 5235</p>
                    <p>Richmond, British Columbia V6X 0J8</p>
                    <p>Canada</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-gray-400">
            {t("footer.copyright").replace("{currentYear}", new Date().getFullYear().toString())}
          </p>
        </div>
      </footer>
    </div>
  );
} 