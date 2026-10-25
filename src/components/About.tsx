"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NavBar from './NavBar';
import { useTranslation } from '@/context/TranslationContext';

export default function About() {
  const { t, locale } = useTranslation();
  const localePath = (path: string) => {
    if (path.startsWith(`/${locale}`)) return path;
    if (path === '/' || path === '') return `/${locale}`;
    if (path === '/#contact' || path === '#contact') return `/${locale}#contact`;
    if (path.startsWith('/')) return `/${locale}${path}`;
    return `/${locale}/${path}`;
  };

  const heritageTag = locale === 'zh-Hans' 
    ? '创所历程 • 发展沿革' 
    : locale === 'zh-Hant' 
    ? '創所歷程 • 發展沿革' 
    : 'OUR HERITAGE • ESTABLISHED IN 2009';

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <NavBar />
      
      {/* Hero Section: About Avid Law */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-[#0B1B48] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/sideBG.png" alt="Background" fill className="object-cover opacity-20 brightness-110" priority />
          <div className="absolute inset-0 bg-[#0B1B48]/80 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 max-w-4xl w-full mx-auto px-6 md:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFC107]/15 border border-[#FFC107]/30 text-[#FFC107] text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
            {heritageTag}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-6 uppercase tracking-wide">
            {t('about.sectionTitle')}
          </h1>
          <div className="h-1 w-24 bg-[#FFC107] mx-auto mb-8 rounded-full"></div>
          <p className="text-base sm:text-lg md:text-xl text-zinc-200/90 max-w-3xl mx-auto leading-relaxed font-light">
            {t('about.sectionText')}
          </p>
        </div>
      </section>

      {/* Section: Our History */}
      <section className="relative py-20 md:py-28 bg-white border-b border-zinc-200/80">
        <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="w-full md:w-1/2">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-zinc-200 bg-white p-1.5 group">
                <div className="relative h-[300px] md:h-[420px] w-full rounded-xl overflow-hidden">
                  <Image 
                    src="/about1.jpg" 
                    alt={t('about.historyTag')} 
                    fill 
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left">
              <div className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-[#0B1B48] uppercase bg-[#0B1B48]/10 rounded-md mb-3">
                Avid Law • Richmond, BC
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0B1B48] mb-6">
                {t('about.historyTag')}
              </h2>
              <div className="h-1 w-16 bg-[#FFC107] mb-6 mx-auto md:mx-0 rounded-full"></div>
              <p className="text-base md:text-lg text-zinc-700 leading-relaxed">
                {t('about.historyText')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Our Expertise */}
      <section className="relative py-20 md:py-28 bg-zinc-50 border-b border-zinc-200/80">
        <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16">
            <div className="w-full md:w-1/2">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-zinc-200 bg-white p-1.5 group">
                <div className="relative h-[300px] md:h-[420px] w-full rounded-xl overflow-hidden">
                  <Image 
                    src="/about2.jpg" 
                    alt={t('about.expertiseTag')} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left">
              <div className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-[#0B1B48] uppercase bg-[#0B1B48]/10 rounded-md mb-3">
                Multilingual Legal Excellence
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0B1B48] mb-6">
                {t('about.expertiseTag')}
              </h2>
              <div className="h-1 w-16 bg-[#FFC107] mb-6 mx-auto md:mx-0 rounded-full"></div>
              <p className="text-base md:text-lg text-zinc-700 leading-relaxed">
                {t('about.expertiseText')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Litigation Services */}
      <section className="relative py-20 md:py-28 bg-white border-b border-zinc-200/80">
        <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 lg:gap-20">
            <div className="w-full md:w-1/2">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-zinc-200 bg-white p-1.5 group">
                <div className="relative h-[320px] md:h-[460px] w-full rounded-xl overflow-hidden">
                  <Image 
                    src="/about3.png" 
                    alt={t('about.serviceTag')} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left">
              <div className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-[#0B1B48] uppercase bg-[#0B1B48]/10 rounded-md mb-3">
                Advocacy & Resolution
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0B1B48] mb-6">
                {t('about.serviceTag')}
              </h2>
              <div className="h-1 w-16 bg-[#FFC107] mb-6 mx-auto md:mx-0 rounded-full"></div>
              <p className="text-base md:text-lg text-zinc-700 leading-relaxed mb-4">
                {t('about.serviceText1')}
              </p>
              <p className="text-base md:text-lg text-zinc-700 leading-relaxed">
                {t('about.serviceText2')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Solicitor Services */}
      <section className="relative py-20 md:py-28 bg-zinc-50 border-b border-zinc-200/80">
        <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16">
            <div className="w-full md:w-1/2">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-zinc-200 bg-white p-1.5 group">
                <div className="relative h-[300px] md:h-[420px] w-full rounded-xl overflow-hidden">
                  <Image 
                    src="/about4.png" 
                    alt={t('about.solicitorTag')} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left">
              <div className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-[#0B1B48] uppercase bg-[#0B1B48]/10 rounded-md mb-3">
                Commercial & Advisory Practice
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0B1B48] mb-6">
                {t('about.solicitorTag')}
              </h2>
              <div className="h-1 w-16 bg-[#FFC107] mb-6 mx-auto md:mx-0 rounded-full"></div>
              <p className="text-base md:text-lg text-zinc-700 leading-relaxed mb-4">
                {t('about.solicitorText1')}
              </p>
              <p className="text-base md:text-lg text-zinc-700 leading-relaxed">
                {t('about.solicitorText2')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Book Consultation CTA */}
      <section className="relative py-20 md:py-28 bg-[#0B1B48] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/sideBG.png" alt="Background" fill className="object-cover opacity-15 brightness-110" />
          <div className="absolute inset-0 bg-[#0B1B48]/85 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 max-w-4xl w-full mx-auto px-6 md:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            {t('about.eveTitle')}
          </h2>
          <div className="h-1 w-24 bg-[#FFC107] mx-auto mb-8 rounded-full"></div>
          <p className="text-base sm:text-lg md:text-xl text-zinc-300 leading-relaxed mb-10 max-w-2xl mx-auto">
            {t('about.eveText')}
          </p>
          
          <div className="flex flex-col items-center justify-center">
            <Link
              href={localePath('/forms?type=consultation')}
              className="group relative inline-flex items-center justify-center gap-2 rounded-lg bg-[#FFC107] px-8 py-4 font-bold text-[#0B1B48] transition-all duration-300 hover:bg-[#ffcb38] hover:shadow-xl focus:outline-none shadow-lg text-base"
            >
              <span>{t('hero.bookButton')}</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 text-zinc-400 py-10 border-t border-zinc-800">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-zinc-500">
            {t("footer.copyright").replace("{currentYear}", new Date().getFullYear().toString())}
          </p>
        </div>
      </footer>
    </div>
  );
}