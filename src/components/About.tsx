"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import NavBar from './NavBar';
import { useTranslation } from '@/context/TranslationContext';

export default function About() {
  const { t, locale } = useTranslation();
  const [isBookingBoxVisible, setBookingBoxVisible] = useState(false);
  const bookingBoxRef = useRef<HTMLDivElement>(null);

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
    <div className="min-h-screen bg-gray-800 text-white">
      <NavBar />
      
      {/* Hero Section: About Avid Law */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image src="/sideBG.png" alt="Background" fill className="object-cover brightness-110" priority />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="relative z-10 max-w-4xl w-full mx-auto px-6 md:px-8 text-center py-20">
          <h1 className="text-4xl md:text-5xl font-bold uppercase text-white mb-6 md:mb-8">
            {t('about.sectionTitle')}
            <div className="h-[3px] w-[100px] md:w-[120px] bg-[#FFC107] mx-auto mt-6 md:mt-8"></div>
          </h1>
          <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
            {t('about.sectionText')}
          </p>
        </div>
      </section>

      {/* Section: Our History */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 z-0">
          <Image src="/sideBG.png" alt="Background" fill className="object-cover brightness-110" />
          <div className="absolute inset-0 bg-black/15"></div>
        </div>
        <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="w-full md:w-1/2 relative overflow-hidden shadow-2xl rounded-xl">
              <div className="relative h-[300px] md:h-[450px] w-full">
                <Image 
                  src="/about1.jpg" 
                  alt={t('about.historyTag')} 
                  fill 
                  className="object-cover object-center brightness-90"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-bold text-[#FFC107] mb-6 md:mb-8">
                {t('about.historyTag')}
              </h2>
              <p className="text-base md:text-lg text-white leading-relaxed">
                {t('about.historyText')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Our Expertise */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 z-0">
          <Image src="/sideBG.png" alt="Background" fill className="object-cover brightness-105" />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16">
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-bold text-[#FFC107] mb-6 md:mb-8">
                {t('about.expertiseTag')}
              </h2>
              <p className="text-base md:text-lg text-white leading-relaxed">
                {t('about.expertiseText')}
              </p>
            </div>
            <div className="w-full md:w-1/2 relative overflow-hidden shadow-2xl rounded-lg">
              <div className="relative h-[300px] md:h-[450px] w-full">
                <Image 
                  src="/about2.jpg" 
                  alt={t('about.expertiseTag')} 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Litigation Services */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 z-0">
          <Image src="/sideBG.png" alt="Background" fill className="object-cover brightness-108" />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 lg:gap-24">
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-bold text-[#FFC107] mb-6 md:mb-8">
                {t('about.serviceTag')}
              </h2>
              <p className="text-base md:text-lg text-white leading-relaxed mb-4 md:mb-6">
                {t('about.serviceText1')}
              </p>
              <p className="text-base md:text-lg text-white leading-relaxed">
                {t('about.serviceText2')}
              </p>
            </div>
            <div className="w-full md:w-1/2 relative overflow-hidden shadow-2xl rounded-lg">
              <div className="relative h-[350px] md:h-[500px] w-full">
                <Image 
                  src="/about3.png" 
                  alt={t('about.serviceTag')} 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Solicitor Services */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 z-0">
          <Image src="/sideBG.png" alt="Background" fill className="object-cover brightness-105" />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16">
            <div className="w-full md:w-1/2 relative overflow-hidden shadow-2xl rounded-lg">
              <div className="relative h-[300px] md:h-[450px] w-full">
                <Image 
                  src="/about4.png" 
                  alt={t('about.solicitorTag')} 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-bold text-[#FFC107] mb-6 md:mb-8">
                {t('about.solicitorTag')}
              </h2>
              <p className="text-base md:text-lg text-white leading-relaxed mb-4 md:mb-6">
                {t('about.solicitorText1')}
              </p>
              <p className="text-base md:text-lg text-white leading-relaxed">
                {t('about.solicitorText2')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Book Consultation */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 z-0">
          <Image src="/sideBG.png" alt="Background" fill className="object-cover brightness-108" />
          <div className="absolute inset-0 bg-black/25"></div>
        </div>
        <div className="relative z-10 max-w-4xl w-full mx-auto px-6 md:px-8 text-center py-10">
          <h2 className="text-4xl md:text-5xl font-bold text-[#FFC107] mb-6 md:mb-8">
            {t('about.eveTitle')}
          </h2>
          <div className="h-[3px] w-[100px] md:w-[120px] bg-[#FFC107] mx-auto mb-8 md:mb-12"></div>
          <p className="text-lg md:text-xl text-white leading-relaxed mb-10 md:mb-16 max-w-2xl mx-auto">
            {t('about.eveText')}
          </p>
          
          {/* Booking Feature */}
          <div 
            ref={bookingBoxRef}
            className="relative flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setBookingBoxVisible(prevState => !prevState)}
              className="group relative inline-flex items-center justify-center gap-2 rounded-md bg-[#FFC107] px-8 py-4 font-semibold text-gray-900 transition-all duration-300 hover:bg-[#ffcb38] focus:outline-none"
            >
              {t('hero.bookButton')}
            </button>

            {/* Booking Box with QR Codes */}
            <div className={`absolute top-full mt-4 w-fit min-w-[420px] p-6 bg-black/70 backdrop-blur-sm border border-yellow-500/50 rounded-lg shadow-2xl transition-opacity duration-150 z-50 ${isBookingBoxVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <p className="text-white text-center text-sm mb-4 whitespace-nowrap">
                {t('hero.bookingBoxText')}
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
                  <p className="font-semibold text-xs text-white/90 mt-1">{t("about.qrCodeEnglish")}</p>
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
                  <p className="font-semibold text-xs text-white/90 mt-1">{t("about.qrCodeChinese")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10 border-t border-gray-700">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-gray-300">
            {t("footer.copyright").replace("{currentYear}", new Date().getFullYear().toString())}
          </p>
        </div>
      </footer>
    </div>
  );
}
