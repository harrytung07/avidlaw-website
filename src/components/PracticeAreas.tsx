"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import NavBar from './NavBar';
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from '@/context/TranslationContext';
import { practiceAreasData } from '@/lib/practiceAreasData';

interface DetailedSubLink {
  slug: string;
  titleKey: string;
  defaultTitle: string;
}

interface PracticeArea {
  id: string;
  titleKey: string;
  image: string;
  descriptionKey: string;
  services: string[];
  detailedSubLinks?: DetailedSubLink[];
}

export default function PracticeAreas() {
  const { t, locale } = useTranslation();
  
  // State for sticky nav
  const [activeSection, setActiveSection] = useState('featured-guides');
  const [isNavSticky, setIsNavSticky] = useState(false);

  const activeLocale = (locale === 'zh-Hans' || locale === 'zh-Hant' ? locale : 'en') as 'en' | 'zh-Hans' | 'zh-Hant';

  const localePath = (path: string) => {
    if (path.startsWith(`/${locale}`)) return path;
    if (path === '/' || path === '') return `/${locale}`;
    if (path === '/#contact' || path === '#contact') return `/${locale}#contact`;
    if (path.startsWith('/')) return `/${locale}${path}`;
    return `/${locale}/${path}`;
  };

  // Check scroll position for sticky nav
  useEffect(() => {
    const handleScroll = () => {
      setIsNavSticky(window.scrollY > window.innerHeight * 0.6);
      
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

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
      const offset = 100;
      window.scrollTo({
        top: sectionTop - offset,
        behavior: 'smooth'
      });
    }
  };

  const practiceAreas: PracticeArea[] = [
    {
      id: 'corporate',
      titleKey: 'practiceAreas.corporateCommercialLaw',
      image: '/areas/corporate1.png',
      descriptionKey: 'practiceAreas.corporateCommercialLawDescription',
      services: [
        'practiceAreas.employmentContract',
        'practiceAreas.shareholderAgreement',
        'practiceAreas.partnershipAgreement',
        'practiceAreas.purchaseSaleBusinesses',
        'practiceAreas.commercialLending',
        'practiceAreas.corporateRestructuring',
        'practiceAreas.franchiseAgreement',
        'practiceAreas.defamation'
      ],
      detailedSubLinks: [
        {
          slug: 'business-purchase-sale',
          titleKey: 'practiceAreas.detailed.businessPurchaseSale',
          defaultTitle: 'Buying & Selling a Business in BC (Asset vs. Share Purchase)',
        },
        {
          slug: 'commercial-leasing',
          titleKey: 'practiceAreas.detailed.commercialLeasing',
          defaultTitle: 'Commercial Leasing & NNN Negotiations',
        },
        {
          slug: 'shareholder-agreements',
          titleKey: 'practiceAreas.detailed.shareholderAgreements',
          defaultTitle: "Shareholders' Agreements & Governance",
        },
      ],
    },
    {
      id: 'conveyancing',
      titleKey: 'practiceAreas.conveyancing',
      image: '/areas/conveyance1.png',
      descriptionKey: 'practiceAreas.conveyancingDescription',
      services: [
        'practiceAreas.residentialMortgagesRefinancing',
        'practiceAreas.lotrFiling',
        'practiceAreas.commercialRealEstatePurchaseSale',
        'practiceAreas.wills',
        'practiceAreas.representationAgreements'
      ],
      detailedSubLinks: [
        {
          slug: 'commercial-real-estate',
          titleKey: 'practiceAreas.detailed.commercialRealEstate',
          defaultTitle: 'Commercial Real Estate, LOTR & Title Acquisitions',
        },
      ],
    },
    {
      id: 'litigation',
      titleKey: 'practiceAreas.civilLitigation',
      image: '/areas/litigation1.png',
      descriptionKey: 'practiceAreas.civilLitigationDescription',
      services: [
        'practiceAreas.shareholderDisputes',
        'practiceAreas.constructionRealEstateDisputes',
        'practiceAreas.contractDisputes',
        'practiceAreas.fraudClaims',
        'practiceAreas.estateLitigations',
        'practiceAreas.residentialPurchaseSale'
      ],
      detailedSubLinks: [
        {
          slug: 'shareholder-commercial-disputes',
          titleKey: 'practiceAreas.detailed.commercialDisputes',
          defaultTitle: 'Shareholder, Partnership & Contract Litigation in BC Supreme Court',
        },
      ],
    },
    {
      id: 'wills',
      titleKey: 'practiceAreas.willsTrustEstates',
      image: '/areas/will1.png',
      descriptionKey: 'practiceAreas.willsTrustEstatesDescription',
      services: [
        'practiceAreas.probateWithWithoutWill',
        'practiceAreas.estatePlanning',
        'practiceAreas.notarization',
        'practiceAreas.documentAuthenticationEmbassies',
        'practiceAreas.powerOfAttorney',
        'practiceAreas.inheritance'
      ],
      detailedSubLinks: [
        {
          slug: 'wills-probate-estate-planning',
          titleKey: 'practiceAreas.detailed.willsProbate',
          defaultTitle: 'BC Wills, Probate Administration & Estate Planning under WESA',
        },
      ],
    },
    {
      id: 'family',
      titleKey: 'practiceAreas.familyLaw',
      image: '/areas/family1.png',
      descriptionKey: 'practiceAreas.familyLawDescription',
      services: [
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
    },
  ];

  const localizedText = {
    en: {
      inDepthTitle: 'In-Depth Transactional Guides & Legal Analysis',
      inDepthSubtitle: 'Explore our comprehensive statutory breakdowns, comparative analyses, and procedural guides across core British Columbia legal fields.',
      readGuide: 'Read Detailed Legal Guide',
      relatedGuides: 'Specialized Transactional Sub-Pages & Statutory Guides:',
    },
    'zh-Hans': {
      inDepthTitle: '卑诗省重点商业与法律事务专栏（深度实务指南）',
      inDepthSubtitle: '深入查阅符合卑诗成文法与司法判例的商业交易、公司治理、商事诉讼及遗产规划专题深度解析。',
      readGuide: '查阅完整法律与法规指南',
      relatedGuides: '重点细分法律业务与法定程序深度专栏：',
    },
    'zh-Hant': {
      inDepthTitle: '卑詩省重點商業與法律事務專欄（深度實務指南）',
      inDepthSubtitle: '深入查閱符合卑詩成文法與司法判例的商業交易、公司治理、商事訴訟及遺產規劃專題深度解析。',
      readGuide: '查閱完整法律與法規指南',
      relatedGuides: '重點細分法律業務與法定程序深度專欄：',
    },
  }[activeLocale];

  const PracticeAreaSection = ({ area, index }: { area: PracticeArea; index: number }) => {    
    return (
      <section 
        id={area.id}
        key={area.id} 
        className="py-10 md:py-14 bg-zinc-50"
      >
        <div className="container relative z-10 mx-auto px-6 max-w-7xl">
          <div className="ml-auto w-full md:w-[90%] lg:w-[86%]">
            <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm hover:shadow-lg border border-zinc-200 hover:border-zinc-300 transition-[box-shadow,border-color] duration-200 ease-out">
              <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12 items-center`}>
                <div className="w-full md:w-2/5">
                  <div className="rounded-xl overflow-hidden shadow-sm border border-zinc-200/80 outline outline-1 -outline-offset-1 outline-black/5 group">
                    <div className="relative h-[260px] sm:h-[300px] w-full">
                      <Image 
                        src={area.image}
                        alt={t(area.titleKey)}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="w-full md:w-3/5">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B1B48] mb-3 text-balance">{t(area.titleKey)}</h2>
                  <div className="h-1 w-16 bg-[#FFC107] mb-5 rounded-full"></div>
                  <p className="text-base text-zinc-600 italic mb-6 leading-relaxed text-pretty">{t(area.descriptionKey)}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {area.services.map((serviceKey: string, i: number) => (
                      <div key={i} className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-[#FFC107] mr-3 shrink-0"></div>
                        <span className="text-zinc-800 font-medium text-sm">{t(serviceKey)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Direct Crawlable Links to Detailed Practice Area Sub-Pages */}
                  {area.detailedSubLinks && area.detailedSubLinks.length > 0 && (
                    <div className="pt-5 border-t border-zinc-100">
                      <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">
                        {localizedText.relatedGuides}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {area.detailedSubLinks.map((subLink) => (
                          <Link
                            key={subLink.slug}
                            href={localePath(`/practice-areas/${subLink.slug}`)}
                            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-zinc-50 border border-zinc-200 text-xs font-semibold text-zinc-800 hover:border-[#FFC107] hover:bg-[#FFC107]/10 active:scale-[0.96] transition-[background-color,border-color,color,transform] duration-150 ease-out shadow-xs"
                          >
                            <span>{subLink.defaultTitle}</span>
                            <span className="text-[#0B1B48] font-bold" aria-hidden="true">→</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <NavBar />
      <Toaster />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-[#0B1B48] text-white overflow-hidden text-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/sideBG.png" 
            alt="Background" 
            fill 
            className="object-cover opacity-20 brightness-110" 
            priority
          />
          <div className="absolute inset-0 bg-[#0B1B48]/85 mix-blend-multiply"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFC107]/15 border border-[#FFC107]/30 text-[#FFC107] text-xs font-semibold uppercase tracking-wider mb-6">
            British Columbia Full-Service Law Firm
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold uppercase text-white mb-6 tracking-wide text-balance">
            {t('practiceAreas.pageTitle')}
          </h1>
          <div className="h-1 w-24 bg-[#FFC107] mx-auto mb-8 rounded-full"></div>
          <p className="text-base sm:text-lg md:text-xl text-zinc-200/90 leading-relaxed font-light text-pretty max-w-3xl mx-auto">
            {t('practiceAreas.heroDescription')}
          </p>
        </div>
      </section>
      
      {/* Dedicated Section: In-Depth Practice Area Transactional Guides Hub */}
      <section id="featured-guides" className="py-16 md:py-20 bg-zinc-100/80 border-b border-zinc-200">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-[#0B1B48] uppercase bg-[#0B1B48]/10 rounded-full border border-[#0B1B48]/20 mb-3">
              British Columbia Legal Resources
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#0B1B48] mb-4 text-balance">
              {localizedText.inDepthTitle}
            </h2>
            <div className="h-1 w-20 bg-[#FFC107] mx-auto mb-5 rounded-full"></div>
            <p className="text-sm sm:text-base text-zinc-600 text-pretty">
              {localizedText.inDepthSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {practiceAreasData.map((item) => (
              <div
                key={item.slug}
                className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-zinc-200 hover:border-[#FFC107] shadow-xs hover:shadow-xl hover:-translate-y-0.5 transition-[border-color,box-shadow,transform] duration-200 ease-out group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B1B48] bg-[#FFC107]/20 px-2.5 py-1 rounded-md">
                      {item.category}
                    </span>
                    <span className="text-xs text-zinc-400 font-mono tabular-nums">BC Law</span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-zinc-900 group-hover:text-[#0B1B48] transition-colors mb-2.5 text-balance">
                    {item.title[activeLocale]}
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed line-clamp-3 mb-4 text-pretty">
                    {item.directAnswer[activeLocale]}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-100">
                  <Link
                    href={localePath(`/practice-areas/${item.slug}`)}
                    className="inline-flex items-center text-xs font-bold text-[#0B1B48] group-hover:text-[#b88600] active:scale-[0.97] transition-[color,transform] duration-150 ease-out"
                  >
                    <span>{localizedText.readGuide}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5 ml-1.5 transition-transform duration-200 group-hover:translate-x-1 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Side Navigation */}
      <AnimatePresence initial={false}>
        {isNavSticky && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed left-0 top-1/3 z-50 hidden md:flex flex-col bg-white/95 backdrop-blur-md border border-zinc-200 border-l-0 rounded-r-xl shadow-xl overflow-hidden py-3 px-2 max-w-[210px]"
          >
            <div className="space-y-1">
              <a
                href="#featured-guides"
                onClick={(e) => scrollToSection(e, 'featured-guides')}
                className={`group flex items-center py-2 px-3 text-xs rounded-lg active:scale-[0.98] transition-[background-color,color,box-shadow,transform] duration-150 ease-out ${
                  activeSection === 'featured-guides'
                    ? 'bg-[#0B1B48] text-[#FFC107] font-bold shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 font-medium'
                }`}
              >
                <span className="truncate">★ Guides Hub</span>
              </a>
              {practiceAreas.map((area) => (
                <a
                  key={area.id}
                  href={`#${area.id}`}
                  onClick={(e) => scrollToSection(e, area.id)}
                  className={`group flex items-center py-2 px-3 text-xs rounded-lg active:scale-[0.98] transition-[background-color,color,box-shadow,transform] duration-150 ease-out ${
                    activeSection === area.id
                      ? 'bg-[#0B1B48] text-[#FFC107] font-bold shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 font-medium'
                  }`}
                >
                  <span className="truncate">{t(area.titleKey)}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Practice Area Blocks */}
      <div className="py-8 bg-zinc-50">
        {practiceAreas.map((area, index) => (
          <PracticeAreaSection key={area.id} area={area} index={index} />
        ))}
      </div>
      
      {/* Footer Booking Section */}
      <section className="py-20 md:py-28 relative bg-[#0B1B48] text-white overflow-hidden text-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/sideBG.png" 
            alt="Background" 
            fill 
            className="object-cover opacity-15 brightness-110" 
          />
          <div className="absolute inset-0 bg-[#0B1B48]/85 mix-blend-multiply"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-6 text-balance">
            {t('practiceAreas.eveTitle')}
          </h2>
          <div className="h-1 w-24 bg-[#FFC107] mx-auto mb-8 rounded-full"></div>
          <p className="text-base sm:text-lg md:text-xl text-zinc-300 leading-relaxed mb-10 max-w-2xl mx-auto font-light text-pretty">
            {t('practiceAreas.bookingDescription')}
          </p>
          
          <div className="flex justify-center">
            <Link
              href={localePath('/forms?type=consultation')}
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[#FFC107] pl-8 pr-7 py-4 font-bold text-[#0B1B48] shadow-lg shadow-[#FFC107]/20 hover:bg-[#ffcb38] hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97] transition-[background-color,box-shadow,transform] duration-150 ease-out focus:outline-none text-base"
            >
              <span>{t('hero.bookButton')}</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 shrink-0" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Copyright Footer */}
      <footer className="w-full py-8 bg-zinc-950 text-zinc-400 border-t border-zinc-800 text-center text-sm">
        <p className="text-zinc-500">
          {t('footer.copyright').replace('{currentYear}', new Date().getFullYear().toString())}
        </p>
      </footer>
    </div>
  );
}