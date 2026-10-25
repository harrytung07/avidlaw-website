"use client";

import React, { useState, useEffect } from "react";
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
  
  const pathname = usePathname();

  const getPathWithoutLocale = (path: string) => {
    const segments = path.split('/');
    if (segments.length > 1 && ['en', 'zh-Hans', 'zh-Hant'].includes(segments[1])) {
      return '/' + segments.slice(2).join('/');
    }
    return path;
  };

  const pathWithoutLocale = getPathWithoutLocale(pathname || '');
  const isHomePage = pathWithoutLocale === "/" || pathWithoutLocale === "";

  const localePath = (path: string) => {
    if (path.startsWith(`/${locale}`)) return path;
    if (path === '/' || path === '') return `/${locale}`;
    if (path === '/#contact' || path === '#contact') return `/${locale}#contact`;
    if (path.startsWith('/')) return `/${locale}${path}`;
    return `/${locale}/${path}`;
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setScrolled(currentScrollY > 60);
      
      if (currentScrollY < 100) {
        setVisible(true);
      } else if (currentScrollY < lastScrollY) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 150) {
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
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMenuOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'auto';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'auto';
    }
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
  };

  const handleBookClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHomePage) {
      scrollToSection(e, 'contact');
    }
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

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-[#FFC107] focus:text-[#0B1B48] focus:font-bold focus:rounded-md focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#0B1B48] text-sm"
      >
        Skip to main content
      </a>
      <header
        className={`fixed left-0 right-0 z-50 transition-[top,padding,background-color,box-shadow] duration-300 ease-out opacity-0 animate-fadeIn ${
          visible ? "top-0" : "-top-28"
        } ${
          scrolled
            ? "py-3.5 bg-black/90 backdrop-blur-md shadow-lg"
            : "py-5 md:py-6 bg-transparent"
        }`}
        style={{
          animationDelay: "0.2s",
          animationFillMode: "forwards"
        }}
      >
        <div className="container mx-auto px-6 flex justify-between items-center relative">
          {/* Logo with substantial executive presence */}
          <Link href={localePath("/")} className="relative z-10 flex items-center">
            <Image
              src="/Logo.svg"
              alt={t("nav.altLogo")}
              width={190}
              height={64}
              priority
              className={`w-auto brightness-150 transition-[height] duration-300 ease-out ${
                scrolled ? "h-11 sm:h-12" : "h-12 sm:h-14 md:h-16"
              }`}
            />
          </Link>

          {/* Desktop Navigation links */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center space-x-8">
            <Link
              href={localePath("/practice-areas")}
              className="text-white hover:text-[#FFC107] focus-visible:ring-2 focus-visible:ring-[#FFC107] focus-visible:outline-none rounded px-1.5 py-0.5 transition-colors font-medium text-base uppercase tracking-wide"
            >
              {t("nav.practiceAreas")}
            </Link>
            <Link
              href={localePath("/about")}
              className="text-white hover:text-[#FFC107] focus-visible:ring-2 focus-visible:ring-[#FFC107] focus-visible:outline-none rounded px-1.5 py-0.5 transition-colors font-medium text-base uppercase tracking-wide"
            >
              {t("nav.about")}
            </Link>
            <Link
              href={localePath("/team")}
              className="text-white hover:text-[#FFC107] focus-visible:ring-2 focus-visible:ring-[#FFC107] focus-visible:outline-none rounded px-1.5 py-0.5 transition-colors font-medium text-base uppercase tracking-wide"
            >
              {t("nav.ourTeam")}
            </Link>
            
            {/* Resources Dropdown */}
            <div 
              className="relative"
              onMouseEnter={handleResourcesEnter}
              onMouseLeave={handleResourcesLeave}
            >
              <button 
                type="button"
                aria-expanded={resourcesOpen}
                aria-haspopup="true"
                className="text-white hover:text-[#FFC107] focus-visible:ring-2 focus-visible:ring-[#FFC107] focus-visible:outline-none rounded transition-colors font-medium text-base uppercase tracking-wide flex items-center gap-1.5 py-2 px-1"
                onClick={() => setResourcesOpen(!resourcesOpen)}
              >
                <span>{t("nav.resources")}</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-4 w-4 transition-transform duration-200 ${resourcesOpen ? 'rotate-180 text-[#FFC107]' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu (Removed /forms per sunsetting) */}
              <div 
                className={`absolute top-full left-0 w-48 p-1.5 bg-black/95 backdrop-blur-md border border-zinc-800 rounded-lg shadow-2xl transition-[opacity,transform] duration-200 ease-out ${
                  resourcesOpen 
                    ? 'opacity-100 translate-y-0 pointer-events-auto' 
                    : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
              >
                <Link
                  href={localePath("/news")}
                  className="block px-3.5 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-white hover:bg-[#FFC107]/20 focus-visible:ring-2 focus-visible:ring-[#FFC107] focus-visible:outline-none transition-colors"
                >
                  {t("nav.news")}
                </Link>
                <Link
                  href={localePath("/articles")}
                  className="block px-3.5 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-white hover:bg-[#FFC107]/20 focus-visible:ring-2 focus-visible:ring-[#FFC107] focus-visible:outline-none transition-colors"
                >
                  {t("nav.articles")}
                </Link>
                <Link
                  href={localePath("/forms")}
                  className="block px-3.5 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-white hover:bg-[#FFC107]/20 focus-visible:ring-2 focus-visible:ring-[#FFC107] focus-visible:outline-none transition-colors"
                >
                  {t("nav.forms")}
                </Link>
              </div>
            </div>

            <a
              href={isHomePage ? "#contact" : localePath("/#contact")}
              onClick={handleContactClick}
              className="text-white hover:text-[#FFC107] focus-visible:ring-2 focus-visible:ring-[#FFC107] focus-visible:outline-none rounded px-1.5 py-0.5 transition-colors font-medium text-base uppercase tracking-wide"
            >
              {t("nav.contact")}
            </a>

            <div className="flex items-center pl-2">
              <LanguageSwitcher />
            </div>

            {/* Direct Booking Button - Links to Consultation Intake Form */}
            <Link
              href={localePath("/forms?type=consultation")}
              className="border-2 border-[#FFC107] bg-[#FFC107] text-gray-950 hover:bg-[#ffcb38] hover:border-[#ffcb38] active:scale-[0.96] transition-[background-color,border-color,transform,box-shadow] duration-150 ease-out font-semibold px-6 py-2.5 rounded uppercase text-sm tracking-wide shadow-md focus-visible:ring-2 focus-visible:ring-[#FFC107] focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
            >
              {t("nav.bookButton")}
            </Link>
          </nav>

          {/* Hamburger menu button with 44x44px minimum hit area */}
          <div className="flex items-center space-x-4 md:hidden z-20">
            <button
              type="button"
              onClick={toggleMenu}
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
              className="w-11 h-11 min-w-[44px] min-h-[44px] flex flex-col items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#FFC107] focus-visible:outline-none rounded active:scale-[0.96] transition-[transform,box-shadow] duration-150 ease-out"
            >
              <span
                className={`w-6 h-0.5 bg-white transition-[transform,opacity] duration-300 ease-out ${
                  menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`w-6 h-0.5 bg-white transition-[transform,opacity] duration-300 ease-out ${
                  menuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`w-6 h-0.5 bg-white transition-[transform,opacity] duration-300 ease-out ${
                  menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-40 bg-black/95 flex flex-col justify-between py-12 px-6 md:hidden overflow-y-auto overscroll-contain"
        >
          <div className="flex justify-between items-center w-full">
            <Link href={localePath("/")} onClick={toggleMenu}>
              <Image
                src="/Logo.svg"
                alt={t("nav.altLogo")}
                width={190}
                height={64}
                className="w-auto h-12 brightness-150"
              />
            </Link>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <button
                type="button"
                onClick={toggleMenu}
                className="text-white hover:text-[#FFC107] focus-visible:ring-2 focus-visible:ring-[#FFC107] focus-visible:outline-none p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg active:scale-[0.96] transition-[color,transform] duration-150 cursor-pointer"
                aria-label="Close menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-6 my-auto text-center py-8">
            <Link
              href={localePath("/practice-areas")}
              onClick={toggleMenu}
              className="text-white hover:text-[#FFC107] focus-visible:ring-2 focus-visible:ring-[#FFC107] focus-visible:outline-none rounded px-3 py-1 text-xl font-medium uppercase tracking-wide"
            >
              {t("nav.practiceAreas")}
            </Link>
            <Link
              href={localePath("/about")}
              onClick={toggleMenu}
              className="text-white hover:text-[#FFC107] focus-visible:ring-2 focus-visible:ring-[#FFC107] focus-visible:outline-none rounded px-3 py-1 text-xl font-medium uppercase tracking-wide"
            >
              {t("nav.about")}
            </Link>
            <Link
              href={localePath("/team")}
              onClick={toggleMenu}
              className="text-white hover:text-[#FFC107] focus-visible:ring-2 focus-visible:ring-[#FFC107] focus-visible:outline-none rounded px-3 py-1 text-xl font-medium uppercase tracking-wide"
            >
              {t("nav.ourTeam")}
            </Link>
            <Link
              href={localePath("/news")}
              onClick={toggleMenu}
              className="text-white hover:text-[#FFC107] focus-visible:ring-2 focus-visible:ring-[#FFC107] focus-visible:outline-none rounded px-3 py-1 text-xl font-medium uppercase tracking-wide"
            >
              {t("nav.news")}
            </Link>
            <Link
              href={localePath("/articles")}
              onClick={toggleMenu}
              className="text-white hover:text-[#FFC107] focus-visible:ring-2 focus-visible:ring-[#FFC107] focus-visible:outline-none rounded px-3 py-1 text-xl font-medium uppercase tracking-wide"
            >
              {t("nav.articles")}
            </Link>
            <Link
              href={localePath("/forms")}
              onClick={toggleMenu}
              className="text-white hover:text-[#FFC107] focus-visible:ring-2 focus-visible:ring-[#FFC107] focus-visible:outline-none rounded px-3 py-1 text-xl font-medium uppercase tracking-wide"
            >
              {t("nav.forms")}
            </Link>
            <a
              href={isHomePage ? "#contact" : localePath("/#contact")}
              onClick={(e) => {
                toggleMenu();
                if (isHomePage) scrollToSection(e, 'contact');
              }}
              className="text-white hover:text-[#FFC107] focus-visible:ring-2 focus-visible:ring-[#FFC107] focus-visible:outline-none rounded px-3 py-1 text-xl font-medium uppercase tracking-wide"
            >
              {t("nav.contact")}
            </a>

            {/* Direct Mobile Booking Button pointing to Consultation Form */}
            <div className="pt-4 w-full max-w-xs">
              <Link
                href={localePath("/forms?type=consultation")}
                onClick={toggleMenu}
                className="block w-full text-center px-6 py-3 rounded-md bg-[#FFC107] text-zinc-950 font-bold text-base uppercase tracking-wide shadow-md hover:bg-[#ffcb38] active:scale-[0.96] transition-[background-color,transform] duration-150 ease-out focus-visible:ring-2 focus-visible:ring-[#FFC107] focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
              >
                {t("nav.bookButton")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
