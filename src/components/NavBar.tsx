"use client";

import React, { useState, useEffect, MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "@/context/TranslationContext";

export default function NavBar() {
  const { t, locale } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  
  // Get path without locale prefix for route matching
  const getPathWithoutLocale = (path: string) => {
    const segments = path.split('/');
    // Check if the first segment is a locale
    if (segments.length > 1 && ['en', 'zh-Hans', 'zh-Hant'].includes(segments[1])) {
      return '/' + segments.slice(2).join('/');
    }
    return path;
  };
  
  const pathWithoutLocale = getPathWithoutLocale(pathname || '');
  const isAboutPage = pathWithoutLocale === "/about";
  const isHomePage = pathWithoutLocale === "/";
  
  // Helper to create locale-aware paths
  const localePath = (path: string) => {
    // If path is already absolute with locale, return it
    if (path.startsWith(`/${locale}`)) return path;
    
    // If path starts with /, add locale prefix
    if (path.startsWith('/')) {
      return locale === 'en' ? path : `/${locale}${path}`;
    }
    
    // For relative paths, return as is
    return path;
  };
  
  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  // Smooth scroll to section function
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Toggle menu function
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  // Handle contact link click
  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHomePage) {
      // If on home page, just scroll to the section
      scrollToSection(e, 'contact');
    }
    // If on another page, the default behavior of navigating to /#contact will occur
  };
  
  // Handle opening resources dropdown with a delay on close
  const handleResourcesEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setResourcesOpen(true);
  };
  
  const handleResourcesLeave = () => {
    const id = setTimeout(() => {
      setResourcesOpen(false);
    }, 300); // 300ms delay before closing
    setTimeoutId(id);
  };

  // --- Add the function to open the chatbot ---
  const openChatbot = () => { // No event needed unless attaching to an anchor
    const icon = document.getElementById('chatbotIcon');
    const panel = document.getElementById('chatbotPanel');

    if (icon && panel) {
      console.log("Opening chatbot panel directly via button click (NavBar).");
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
  };
  // --- End function ---

  return (
    <>
      <div 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 opacity-0 animate-fadeIn ${
          scrolled 
            ? isAboutPage 
              ? "bg-transparent py-2" 
              : "bg-black/70 backdrop-blur-md shadow-md py-2" 
            : "bg-transparent py-6"
        }`}
        style={{ animationDelay: '0.5s' }}
      >
        <div className="container mx-auto px-6 flex items-center justify-between relative">
          {/* Logo - always in top left */}
          <Link href={localePath("/")} className="relative z-10">
            <div className="transition-all duration-300">
              <Image 
                src="/Logo.svg" 
                alt={t("nav.altLogo")} 
                width={scrolled ? 160 : 200} 
                height={scrolled ? 56 : 70} 
                className={`brightness-150 filter transition-all duration-500 ${scrolled ? 'scale-95' : 'scale-100'}`}
                style={{ transformOrigin: 'left center' }}
              />
            </div>
          </Link>
          
          {/* Desktop Navigation elements - for About page, collapsed when scrolled */}
          <div 
            className={`hidden md:flex items-center space-x-8 transition-opacity duration-400 ease-in-out absolute right-6 ${
              isAboutPage && scrolled ? 'opacity-0 invisible' : 'opacity-100 visible'
            }`}
          >
            <Link
              href={localePath("/practice-areas")}
              className="text-white hover:text-[#FFC107] text-base font-medium uppercase tracking-wide"
            >
              {t("nav.practiceAreas")}
            </Link>
            <Link 
              href={localePath("/about")}
              className="text-white hover:text-[#FFC107] text-base font-medium uppercase tracking-wide"
            >
              {t("nav.about")}
            </Link>
            <Link 
              href={localePath("/team")}
              className="text-white hover:text-[#FFC107] text-base font-medium uppercase tracking-wide"
            >
              {t("nav.ourTeam")}
            </Link>
            
            {/* Resources Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={handleResourcesEnter}
              onMouseLeave={handleResourcesLeave}
            >
              <div className="text-white text-base font-medium uppercase tracking-wide flex items-center space-x-1 transition-colors cursor-default">
                <span className={resourcesOpen ? "text-[#FFC107]" : "group-hover:text-[#FFC107]"}>{t("nav.resources")}</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-4 w-4 transition-transform duration-300 ${resourcesOpen ? "rotate-180 text-[#FFC107]" : "text-white group-hover:text-[#FFC107]"}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {/* Dropdown Menu */}
              <div 
                className={`absolute left-0 mt-2 w-36 bg-black/50 backdrop-blur-md rounded shadow-lg transition-all duration-300 origin-top ${
                  resourcesOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"
                }`}
                onMouseEnter={handleResourcesEnter}
                onMouseLeave={handleResourcesLeave}
              >
                <Link 
                  href={localePath("/news")}
                  className="block px-4 py-3 text-sm text-white hover:text-[#FFC107] hover:bg-black/50 uppercase tracking-wide"
                >
                  {t("nav.news")}
                </Link>
                <Link 
                  href={localePath("/articles")}
                  className="block px-4 py-3 text-sm text-white hover:text-[#FFC107] hover:bg-black/50 uppercase tracking-wide"
                >
                  {t("nav.articles")}
                </Link>
              </div>
            </div>
            
            <a 
              href={isHomePage ? "#contact" : localePath("/#contact")}
              onClick={handleContactClick}
              className="text-white hover:text-[#FFC107] text-base font-medium uppercase tracking-wide"
            >
              {t("nav.contact")}
            </a>
            
            {/* Language Switcher - Added here */}
            <div className="flex items-center">
              <LanguageSwitcher />
            </div>
            
            <button
              className="h-[50px] w-[50px] flex items-center justify-center ml-4"
              onClick={openChatbot}
              aria-label={t("nav.chatWithEve")}
            >
              <Image
                src="/chatbot1.png"
                alt={t("nav.chatWithEve")}
                width={50}
                height={50}
                className="object-contain"
              />
            </button>
          </div>
          
          {/* Mobile Navigation Menu */}
          {menuOpen && (
            <div className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-6">
              <button 
                onClick={toggleMenu}
                className="absolute top-6 right-6 w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
              >
                <span className="w-6 h-0.5 bg-[#FFC107] transform rotate-45 translate-y-1"></span>
                <span className="w-6 h-0.5 bg-[#FFC107] transform -rotate-45"></span>
              </button>
              
              <div className="flex flex-col space-y-6 items-center">
                <Link
                  href={localePath("/practice-areas")}
                  className="text-white hover:text-[#FFC107] text-xl font-medium uppercase tracking-wide"
                  onClick={toggleMenu}
                >
                  {t("nav.practiceAreas")}
                </Link>
                <Link 
                  href={localePath("/about")}
                  className="text-white hover:text-[#FFC107] text-xl font-medium uppercase tracking-wide"
                  onClick={toggleMenu}
                >
                  {t("nav.about")}
                </Link>
                <Link 
                  href={localePath("/team")}
                  className="text-white hover:text-[#FFC107] text-xl font-medium uppercase tracking-wide"
                  onClick={toggleMenu}
                >
                  {t("nav.ourTeam")}
                </Link>
                <Link 
                  href={localePath("/news")}
                  className="text-white hover:text-[#FFC107] text-xl font-medium uppercase tracking-wide"
                  onClick={toggleMenu}
                >
                  {t("nav.news")}
                </Link>
                <Link 
                  href={localePath("/articles")}
                  className="text-white hover:text-[#FFC107] text-xl font-medium uppercase tracking-wide"
                  onClick={toggleMenu}
                >
                  {t("nav.articles")}
                </Link>
                <a 
                  href={isHomePage ? "#contact" : localePath("/#contact")}
                  onClick={(e) => {
                    toggleMenu();
                    if (isHomePage) scrollToSection(e, 'contact');
                  }}
                  className="text-white hover:text-[#FFC107] text-xl font-medium uppercase tracking-wide"
                >
                  {t("nav.contact")}
                </a>
                
                <button
                  className="h-[50px] w-[50px] flex items-center justify-center mt-4"
                  onClick={() => {
                    toggleMenu();
                    openChatbot();
                  }}
                  aria-label={t("nav.chatWithEve")}
                >
                  <Image
                    src="/chatbot1.png"
                    alt={t("nav.chatWithEve")}
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                </button>
              </div>
            </div>
          )}
          
          {/* Hamburger menu - visible on mobile or when scrolled on About page */}
          <div 
            className={`flex items-center space-x-4 transition-opacity duration-400 ease-in-out absolute right-6 ${
              isAboutPage 
                ? scrolled 
                  ? 'opacity-100 visible md:flex' 
                  : 'opacity-0 invisible md:hidden' 
                : 'md:hidden'
            }`}
          >
            <button 
              onClick={toggleMenu} 
              className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
            >
              <span className="w-6 h-0.5 bg-[#FFC107] transition-all"></span>
              <span className="w-6 h-0.5 bg-[#FFC107] transition-all"></span>
              <span className="w-6 h-0.5 bg-[#FFC107] transition-all"></span>
            </button>
            
            {/* Language Switcher - Added here for mobile/collapsed view */}
            <div className="flex items-center">
              <LanguageSwitcher />
            </div>
            
            <button
              className="h-[40px] w-[40px] flex items-center justify-center"
              onClick={openChatbot}
              aria-label={t("nav.chatWithEve")}
            >
              <Image
                src="/chatbot1.png"
                alt={t("nav.chatWithEve")}
                width={40}
                height={40}
                className="object-contain"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
} 