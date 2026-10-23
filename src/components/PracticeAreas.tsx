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
    if (path.startsWith('/')) {
      return locale === 'en' ? path : `/${locale}${path}`;
    }
    return path;
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
        className={`py-20 relative ${index % 2 === 0 ? 'bg-gray-100/30' : 'bg-gray-200/30'}`}
      >
        <div className="absolute inset-0 z-0">
          <Image 
            src="/bigBG.png" 
            alt="Background" 
            fill 
            className={`object-cover opacity-30 ${index % 2 === 0 ? 'brightness-100' : 'brightness-95'}`} 
          />
        </div>
        
        <div className="container relative z-10 mx-auto px-6">
          <div className="ml-auto w-full md:w-4/5">
            <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-16 items-center`}>
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
              
              <div className="w-full md:w-3/5">
                <h2 className="text-3xl font-bold uppercase mb-4">{t(area.titleKey)}</h2>
                <div className="h-[3px] w-[80px] bg-[#FFC107] mb-6"></div>
                <p className="text-lg text-gray-700 italic mb-8">{t(area.descriptionKey)}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {area.services.map((serviceKey: string, i: number) => (
                    <div key={i} className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-[#FFC107] mr-2 shrink-0"></div>
                      <span className="text-gray-800 text-sm">{t(serviceKey)}</span>
                    </div>
                  ))}
                </div>

                {/* Direct Crawlable Links to Detailed Practice Area Sub-Pages */}
                {area.detailedSubLinks && area.detailedSubLinks.length > 0 && (
                  <div className="pt-4 border-t border-gray-300">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                      {localizedText.relatedGuides}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {area.detailedSubLinks.map((subLink) => (
                        <Link
                          key={subLink.slug}
                          href={localePath(`/practice-areas/${subLink.slug}`)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-gray-300 text-xs font-medium text-gray-900 hover:border-[#FFC107] hover:bg-[#FFC107]/10 transition-colors shadow-sm"
                        >
                          <span>{subLink.defaultTitle}</span>
                          <span className="text-[#FFC107] font-bold">→</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <NavBar />
      <Toaster />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[480px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/bigBG.png" 
            alt="Background" 
            fill 
            className="object-cover" 
            priority
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold uppercase text-white mb-6 pt-16 mt-6">
            {t('practiceAreas.pageTitle')}
            <div className="h-[3px] w-[120px] bg-[#FFC107] mx-auto mt-6"></div>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            {t('practiceAreas.heroDescription')}
          </p>
        </div>
      </section>
      
      {/* Dedicated Section: In-Depth Practice Area Transactional Guides Hub */}
      <section id="featured-guides" className="py-16 bg-zinc-950 text-white border-b border-zinc-800">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-[#FFC107] uppercase bg-[#FFC107]/10 rounded-full border border-[#FFC107]/20 mb-3">
              British Columbia Legal Resources
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">
              {localizedText.inDepthTitle}
            </h2>
            <div className="h-[2px] w-20 bg-[#FFC107] mx-auto mb-4"></div>
            <p className="text-sm sm:text-base text-zinc-400">
              {localizedText.inDepthSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {practiceAreasData.map((item) => (
              <div
                key={item.slug}
                className="flex flex-col justify-between p-6 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-[#FFC107]/60 transition-all duration-300 shadow-lg group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#FFC107] bg-[#FFC107]/10 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    <span className="text-xs text-zinc-500 font-mono">BC Law</span>
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-white group-hover:text-[#FFC107] transition-colors mb-2.5">
                    {item.title[activeLocale]}
                  </h3>
                  <p className="text-xs text-zinc-300 leading-relaxed line-clamp-3 mb-4">
                    {item.directAnswer[activeLocale]}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-800">
                  <Link
                    href={localePath(`/practice-areas/${item.slug}`)}
                    className="inline-flex items-center text-xs font-semibold text-[#FFC107] group-hover:translate-x-1 transition-transform"
                  >
                    <span>{localizedText.readGuide}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5 ml-1.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
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
      <AnimatePresence>
        {isNavSticky && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed left-0 top-1/3 z-50 hidden md:flex flex-col bg-white/90 backdrop-blur-sm border-r border-gray-200 rounded-r-lg shadow-md"
          >
            <div className="py-4 px-2">
              <a
                href="#featured-guides"
                onClick={(e) => scrollToSection(e, 'featured-guides')}
                className={`group flex items-center py-2 px-3 text-xs font-semibold rounded-md transition-colors my-1 ${
                  activeSection === 'featured-guides'
                    ? 'bg-[#FFC107] text-gray-900'
                    : 'text-gray-800 hover:text-gray-900 hover:bg-gray-100/50'
                }`}
              >
                <span className="whitespace-nowrap">★ Guides Hub</span>
              </a>
              {practiceAreas.map((area) => (
                <a
                  key={area.id}
                  href={`#${area.id}`}
                  onClick={(e) => scrollToSection(e, area.id)}
                  className={`group flex items-center py-2 px-3 text-xs rounded-md transition-colors my-1 ${
                    activeSection === area.id
                      ? 'bg-[#FFC107] text-gray-900 hover:bg-[#FFC107]'
                      : 'text-gray-800 hover:text-gray-900 hover:bg-gray-100/50'
                  }`}
                >
                  <span className="whitespace-nowrap">{t(area.titleKey)}</span>
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
      
      {/* Footer Booking Section */}
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{t('practiceAreas.eveTitle')}</h2>
          <div className="h-[3px] w-[120px] bg-[#FFC107] mx-auto mb-10"></div>
          <p className="text-lg text-gray-700 leading-relaxed mb-12 max-w-2xl mx-auto">
            {t('practiceAreas.bookingDescription')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center mt-8">
            <div className="flex flex-col items-center gap-2 text-center">
              <a href="https://form.jotform.com/252606090442249" target="_blank" rel="noopener noreferrer">
                <Image
                  src="https://www.jotform.com/uploads/cnslawcorp/form_files/252606090442249_1758317253_qrcode_muse.png"
                  alt="QR Code for English booking form"
                  width={150}
                  height={150}
                  className="rounded-lg shadow-lg hover:scale-105 transition-transform"
                />
              </a>
              <p className="font-semibold text-sm text-gray-800 mt-1">{t("practiceAreas.qrCodeEnglish")}</p>
            </div>

            <div className="flex flex-col items-center gap-2 text-center">
              <a href="https://form.jotform.com/252597283337063" target="_blank" rel="noopener noreferrer">
                <Image
                  src="https://www.jotform.com/uploads/cnslawcorp/form_files/252597283337063_1758240491_qrcode_muse.png"
                  alt="QR Code for Chinese booking form"
                  width={150}
                  height={150}
                  className="rounded-lg shadow-lg hover:scale-105 transition-transform"
                />
              </a>
              <p className="font-semibold text-sm text-gray-800 mt-1">{t("practiceAreas.qrCodeChinese")}</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Copyright Footer */}
      <div className="w-full py-6 relative">
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
