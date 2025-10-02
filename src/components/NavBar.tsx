"use client";

import React, { useState, useEffect, useRef, MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "@/context/TranslationContext";

export default function NavBar() {
  const { t, locale } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [isBookingBoxVisible, setBookingBoxVisible] = useState(false);
  const bookingBoxRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const getPathWithoutLocale = (path: string) => {
    const segments = path.split('/');
    if (segments.length > 1 && ['en', 'zh-Hans', 'zh-Hant'].includes(segments[1])) {
      return '/' + segments.slice(2).join('/');
    }
    return path;
  };

  const pathWithoutLocale = getPathWithoutLocale(pathname || '');
  const isAboutPage = pathWithoutLocale === "/about";
  const isHomePage = pathWithoutLocale === "/";

  const localePath = (path: string) => {
    if (path.startsWith(`/${locale}`)) return path;
    if (path.startsWith('/')) {
      return locale === 'en' ? path : `/${locale}${path}`;
    }
    return path;
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scrolled state for background color
      setScrolled(currentScrollY > 100);
      
      // Determine visibility based on scroll direction
      if (currentScrollY < 100) {
        // Always show navbar at the top
        setVisible(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 150) {
        // Scrolling down - hide navbar (but only after scrolling past 150px)
        setVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    // Prevent body scroll when menu is open
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function to restore body scroll when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHomePage) {
      scrollToSection(e, 'contact');
    }
    // For other pages, default navigation to /#contact (locale handled by localePath)
  };

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
    }, 300);
    setTimeoutId(id);
  };

  // Handle click outside to close booking box
  useEffect(() => {
    function handleClickOutside(event: globalThis.MouseEvent) {
      if (bookingBoxRef.current && !bookingBoxRef.current.contains(event.target as Node)) {
        setBookingBoxVisible(false);
      }
    }
    if (isBookingBoxVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isBookingBoxVisible, bookingBoxRef]);

  return (
    <>
      <div
        className={`fixed left-0 right-0 z-50 transition-all duration-300 opacity-0 animate-fadeIn ${
          visible ? 'top-0' : '-top-32'
        } ${
          scrolled
            ? "bg-black/70 backdrop-blur-md shadow-md py-2"
            : "bg-transparent py-6"
        }`}
        style={{ animationDelay: '0.5s' }}
      >
        <div className="container mx-auto px-6 flex items-center justify-between relative">
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

          {/* Desktop Navigation elements */}
          <div
            className="hidden md:flex items-center space-x-8 transition-opacity duration-400 ease-in-out absolute right-6 opacity-100 visible"
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
              <div
                className={`absolute left-0 mt-2 w-36 bg-black/50 backdrop-blur-md rounded shadow-lg transition-all duration-300 origin-top ${
                  resourcesOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"
                }`}
                onMouseEnter={handleResourcesEnter} // Keep open if mouse enters dropdown
                onMouseLeave={handleResourcesLeave} // Close if mouse leaves dropdown
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
            <div className="flex items-center">
              <LanguageSwitcher />
            </div>
            
            {/* Book Button with Booking Box */}
            <div className="relative" ref={bookingBoxRef}>
              <button
                onClick={() => setBookingBoxVisible(prevState => !prevState)}
                className="border-2 border-[#FFC107] bg-[#FFC107] text-gray-900 hover:bg-[#ffcb38] transition-colors font-semibold px-6 py-2 rounded uppercase text-sm tracking-wide"
              >
                {t("nav.bookButton")}
              </button>
              
              {/* Booking Box */}
              <div className={`absolute top-full right-0 mt-4 w-fit min-w-[420px] p-6 bg-black/70 backdrop-blur-sm border border-yellow-500/50 rounded-lg shadow-2xl transition-opacity duration-150 ${isBookingBoxVisible ? 'opacity-100 z-50' : 'opacity-0 pointer-events-none'}`}>
                <p className="text-white text-center text-sm mb-4 whitespace-nowrap">
                  {t("nav.bookingBoxText")}
                </p>
                <div className="flex justify-center gap-6">
                  {/* English QR Code */}
                  <div className="flex flex-col items-center gap-2 text-center">
                    <a href="https://form.jotform.com/252606090442249" target="_blank" rel="noopener noreferrer">
                      <Image
                        src="https://www.jotform.com/uploads/cnslawcorp/form_files/252606090442249_1758317253_qrcode_muse.png"
                        alt="QR Code for English booking form"
                        width={100}
                        height={100}
                        className="rounded-md"
                      />
                    </a>
                    <p className="font-semibold text-xs text-white/90 mt-1">{t("nav.qrCodeEnglish")}</p>
                  </div>
                  
                  {/* Chinese QR Code */}
                  <div className="flex flex-col items-center gap-2 text-center">
                    <a href="https://form.jotform.com/252597283337063" target="_blank" rel="noopener noreferrer">
                      <Image
                        src="https://www.jotform.com/uploads/cnslawcorp/form_files/252597283337063_1758240491_qrcode_muse.png"
                        alt="QR Code for Chinese booking form"
                        width={100}
                        height={100}
                        className="rounded-md"
                      />
                    </a>
                    <p className="font-semibold text-xs text-white/90 mt-1">{t("nav.qrCodeChinese")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hamburger menu container */}
          <div
            className="flex items-center space-x-4 transition-opacity duration-400 ease-in-out absolute right-6 md:hidden z-20 opacity-100 visible"
          >
            <button
              onClick={toggleMenu}
              className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
              aria-label={t("nav.toggleMenu") || "Toggle menu"}
            >
              <span className="w-6 h-0.5 bg-[#FFC107] transition-all"></span>
              <span className="w-6 h-0.5 bg-[#FFC107] transition-all"></span>
              <span className="w-6 h-0.5 bg-[#FFC107] transition-all"></span>
            </button>
            <div className="flex items-center">
              <LanguageSwitcher />
            </div>
            
            {/* Mobile Book Button - Simple version without popup */}
            <button
              onClick={() => {
                // On mobile, directly navigate to contact section or show simple link
                const section = document.getElementById('contact');
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = localePath('/#contact');
                }
              }}
              className="border-2 border-[#FFC107] bg-[#FFC107] text-gray-900 hover:bg-[#ffcb38] transition-colors font-semibold px-4 py-2 rounded uppercase text-xs tracking-wide"
            >
              {t("nav.bookButton")}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu - MODIFIED FOR SCROLLING */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/95 z-[60] p-6 flex flex-col"> {/* Ensure higher z-index than navbar itself if needed, main overlay */}
          <button
            onClick={toggleMenu}
            className="absolute top-6 right-6 w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none z-10"
            aria-label={t("nav.closeMenu") || "Close menu"} // Provide a fallback for aria-label
          >
            <span className="w-6 h-0.5 bg-[#FFC107] transform rotate-45 translate-y-[0.20rem]"></span> {/* Adjusted for better X */}
            <span className="w-6 h-0.5 bg-[#FFC107] transform -rotate-45 -translate-y-[0.05rem]"></span> {/* Adjusted for better X */}
          </button>

          {/* Scrollable content area */}
          {/* pt-20 to push content below potential header/close button, adjust as needed */}
          {/* pb-6 for some bottom padding within the scrollable area */}
          <div className="flex-grow overflow-y-auto flex items-center justify-center pt-20 pb-6">
            <div className="flex flex-col space-y-6 items-center text-center">
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

            </div>
          </div>
        </div>
      )}
    </>
  );
}