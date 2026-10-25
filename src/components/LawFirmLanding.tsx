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
import { X, CalendarCheck } from "lucide-react";


export function LawFirmLanding() {
  const { t, locale } = useTranslation();

  // Team slide state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  // Holiday Modal State
  const [isHolidayModalOpen, setIsHolidayModalOpen] = useState(false);

  // History Data Definitions
  const historySlides = [
    {
      id: 1,
      year: t("intro.slide1.year"),
      tag: t("intro.slide1.tag"),
      title: t("intro.slide1.title"),
      text: t("intro.slide1.text"),
      summary: {
        en: "Founded in downtown Richmond as CNS Law Corporation, providing trusted multilingual legal representation across corporate, litigation, real estate, and family law.",
        "zh-Hans": "前身 CNS Law Corporation 于列治文市中心创立，深耕大温哥华华人社区，提供公司商事、民事诉讼、房产过户及家事法多语种服务。",
        "zh-Hant": "前身 CNS Law Corporation 於列治文市中心創立，深耕大溫哥華華人社區，提供公司商事、民事訴訟、房產過戶及家事法多語種服務。",
      },
      image: "/intro1.jpg" 
    },
    {
      id: 2,
      year: t("intro.slide2.year"),
      tag: t("intro.slide2.tag"),
      title: t("intro.slide2.title"),
      text: t("intro.slide2.text"),
      summary: {
        en: "CNS Law Corporation merged with Redman Law to form Avid Law Corporation, uniting senior litigators and solicitors into a premier full-service practice.",
        "zh-Hans": "CNS Law Corporation 与 Redman Law 完成战略合并，正式升级为安胜·弘人律师行，汇聚资深出庭与非诉律师团队，全面提升综合实力。",
        "zh-Hant": "CNS Law Corporation 與 Redman Law 完成戰略合併，正式升級為安勝·弘人律師行，匯聚資深出庭與非訴律師團隊，全面提升綜合實力。",
      },
      image: "/merge.jpg" 
    }
  ];

  const currentLang = (locale === 'zh-Hans' || locale === 'zh-Hant' ? locale : 'en') as 'en' | 'zh-Hans' | 'zh-Hant';

  // Trilingual Holiday Data Configuration with Statutory Holidays & Early Closures
  const holidaysData = [
    {
      yearTitle: {
        en: "2026 Statutory Holidays",
        "zh-Hans": "2026年法定节假日",
        "zh-Hant": "2026年法定節假日",
      },
      items: [
        {
          isoDate: "2026-11-11",
          date: {
            en: "Nov 11, 2026 (Wed)",
            "zh-Hans": "2026年11月11日 (周三)",
            "zh-Hant": "2026年11月11日 (週三)",
          },
          name: {
            en: "Remembrance Day",
            "zh-Hans": "阵亡将士纪念日",
            "zh-Hant": "陣亡將士紀念日",
          },
        },
        {
          isoDate: "2026-12-25",
          date: {
            en: "Dec 25, 2026 (Fri)",
            "zh-Hans": "2026年12月25日 (周五)",
            "zh-Hant": "2026年12月25日 (週五)",
          },
          name: {
            en: "Christmas Day",
            "zh-Hans": "圣诞节",
            "zh-Hant": "聖誕節",
          },
        },
      ],
    },
    {
      yearTitle: {
        en: "2027 Statutory Holidays",
        "zh-Hans": "2027年法定节假日",
        "zh-Hant": "2027年法定節假日",
      },
      items: [
        {
          isoDate: "2027-01-01",
          date: {
            en: "Jan 1, 2027 (Fri)",
            "zh-Hans": "2027年1月1日 (周五)",
            "zh-Hant": "2027年1月1日 (週五)",
          },
          name: {
            en: "New Year's Day",
            "zh-Hans": "元旦",
            "zh-Hant": "元旦",
          },
        },
        {
          isoDate: "2027-02-05",
          date: {
            en: "Feb 5, 2027 (Fri)",
            "zh-Hans": "2027年2月5日 (周五)",
            "zh-Hant": "2027年2月5日 (週五)",
          },
          name: {
            en: "Chinese New Year's Eve",
            "zh-Hans": "农历除夕",
            "zh-Hant": "農曆除夕",
          },
          note: {
            en: "Closes early at 1:00 PM",
            "zh-Hans": "下午 1:00 提前下班",
            "zh-Hant": "下午 1:00 提前下班",
          },
        },
        {
          isoDate: "2027-02-15",
          date: {
            en: "Feb 15, 2027 (Mon)",
            "zh-Hans": "2027年2月15日 (周一)",
            "zh-Hant": "2027年2月15日 (週一)",
          },
          name: {
            en: "Family Day",
            "zh-Hans": "家庭日",
            "zh-Hant": "家庭日",
          },
        },
        {
          isoDate: "2027-03-26",
          date: {
            en: "Mar 26, 2027 (Fri)",
            "zh-Hans": "2027年3月26日 (周五)",
            "zh-Hant": "2027年3月26日 (週五)",
          },
          name: {
            en: "Good Friday",
            "zh-Hans": "耶稣受难日",
            "zh-Hant": "耶穌受難日",
          },
        },
        {
          isoDate: "2027-05-24",
          date: {
            en: "May 24, 2027 (Mon)",
            "zh-Hans": "2027年5月24日 (周一)",
            "zh-Hant": "2027年5月24日 (週一)",
          },
          name: {
            en: "Victoria Day",
            "zh-Hans": "维多利亚日",
            "zh-Hant": "維多利亞日",
          },
        },
        {
          isoDate: "2027-07-01",
          date: {
            en: "Jul 1, 2027 (Thu)",
            "zh-Hans": "2027年7月1日 (周四)",
            "zh-Hant": "2027年7月1日 (週四)",
          },
          name: {
            en: "Canada Day",
            "zh-Hans": "加拿大国庆日",
            "zh-Hant": "加拿大國慶日",
          },
        },
        {
          isoDate: "2027-08-02",
          date: {
            en: "Aug 2, 2027 (Mon)",
            "zh-Hans": "2027年8月2日 (周一)",
            "zh-Hant": "2027年8月2日 (週一)",
          },
          name: {
            en: "B.C. Day",
            "zh-Hans": "卑诗日",
            "zh-Hant": "卑詩日",
          },
        },
        {
          isoDate: "2027-09-06",
          date: {
            en: "Sep 6, 2027 (Mon)",
            "zh-Hans": "2027年9月6日 (周一)",
            "zh-Hant": "2027年9月6日 (週一)",
          },
          name: {
            en: "Labour Day",
            "zh-Hans": "劳动节",
            "zh-Hant": "勞動節",
          },
        },
        {
          isoDate: "2027-09-30",
          date: {
            en: "Sep 30, 2027 (Thu)",
            "zh-Hans": "2027年9月30日 (周四)",
            "zh-Hant": "2027年9月30日 (週四)",
          },
          name: {
            en: "National Day for Truth and Reconciliation",
            "zh-Hans": "全国真相与和解日",
            "zh-Hant": "全國真相與和解日",
          },
        },
        {
          isoDate: "2027-10-11",
          date: {
            en: "Oct 11, 2027 (Mon)",
            "zh-Hans": "2027年10月11日 (周一)",
            "zh-Hant": "2027年10月11日 (週一)",
          },
          name: {
            en: "Thanksgiving Day",
            "zh-Hans": "感恩节",
            "zh-Hant": "感恩節",
          },
        },
        {
          isoDate: "2027-11-11",
          date: {
            en: "Nov 11, 2027 (Thu)",
            "zh-Hans": "2027年11月11日 (周四)",
            "zh-Hant": "2027年11月11日 (週四)",
          },
          name: {
            en: "Remembrance Day",
            "zh-Hans": "阵亡将士纪念日",
            "zh-Hant": "陣亡將士紀念日",
          },
        },
        {
          isoDate: "2027-12-27",
          date: {
            en: "Dec 27, 2027 (Mon)",
            "zh-Hans": "2027年12月27日 (周一)",
            "zh-Hant": "2027年12月27日 (週一)",
          },
          name: {
            en: "Christmas Day (Observed)",
            "zh-Hans": "圣诞节（补休）",
            "zh-Hant": "聖誕節（補休）",
          },
        },
      ],
    },
  ];

  // Automatic expiration filtering: keeps today and future dates, hides year group if all expired
  const todayStr = new Date().toISOString().split('T')[0];
  const activeHolidayGroups = holidaysData
    .map((group) => ({
      title: group.yearTitle[currentLang],
      items: group.items.filter((item) => item.isoDate >= todayStr),
    }))
    .filter((group) => group.items.length > 0);

  const officeHoursTitle = {
    en: "⏰ Office Hours:",
    "zh-Hans": "⏰ 办公时间：",
    "zh-Hant": "⏰ 辦公時間：",
  }[currentLang];

  const closeBtnLabel = {
    en: "Close",
    "zh-Hans": "关闭",
    "zh-Hant": "關閉",
  }[currentLang];

  // Helper to create locale-aware paths (always carries locale prefix to prevent 307 redirects)
  const localePath = (path: string) => {
    if (path.startsWith(`/${locale}`)) return path;
    if (path === '/' || path === '') return `/${locale}`;
    if (path === '/#contact' || path === '#contact') return `/${locale}#contact`;
    if (path.startsWith('/')) return `/${locale}${path}`;
    return `/${locale}/${path}`;
  };

  // Team members data
  const teamMembers = [
    { id: 1, name: "Adele Sun", title: t("team.title.AdeleSun"), image: "/members/Adele1.JPG" },
    { id: 2, name: "David Chen", title: t("team.title.DavidChen"), image: "/members/2. David Chen.jpg" },
    { id: 3, name: "Brent Desruisseaux", title: t("team.title.BrentDesruisseaux"), image: "/members/3. Brent Desruisseaux.jpg" },
    { id: 4, name: "Corey Poon", title: t("team.title.CoreyPoon"), image: "/members/4. Corey Poon.jpg" },
    { id: 5, name: "Howard Qu", title: t("team.title.HowardQu"), image: "/members/5. Howard Qu.jpg" },
    //{ id: 6, name: "Freja Li", title: t("team.title.FrejaLi"), image: "/members/6. Freja Li.jpg" },
    { id: 7, name: "Nicole Tam", title: t("team.title.NicoleTam"), image: "/members/nicole.jpg" },
    { id: 8, name: "Olivia Nicolaides", title: t("team.title.OliviaNicolaides"), image: "/members/olivia.JPG" },
    { id: 9, name: "Rachel Li", title: t("team.title.RachelLi"), image: "/members/7. Rachel Li.jpg" },
    { id: 10, name: "Abiel Kwok", title: t("team.title.AbielKwok"), image: "/members/abiel1.JPG" },
    { id: 11, name: "Kun Dong", title: t("team.title.KunDong"), image: "/members/kun.jpg" },
    { id: 12, name: "Farrah Yang", title: t("team.title.FarrahYang"), image: "/members/8. Farrah Yang.jpg" },
    { id: 14, name: "Jeannie Lee", title: t("team.title.JeannieLee"), image: "/members/10. Jeannie Lee.jpg" },
    { id: 16, name: "Sunny Zhang", title: t("team.title.SunnyZhang"), image: "/members/9. Sunny Zhang.jpg" },
  ];
  
  const itemsPerSlide = 4;
  const totalSlides = Math.ceil(teamMembers.length / itemsPerSlide);

  const teamSlides = Array.from({ length: totalSlides }, (_, i) =>
    teamMembers.slice(i * itemsPerSlide, (i * itemsPerSlide) + itemsPerSlide)
  );
  
  const allSlides = totalSlides > 0 ? [...teamSlides, teamSlides[0]] : [];
  const effectiveTotalSlides = totalSlides > 1 ? totalSlides : (totalSlides === 1 ? 1 : 0);

  // Handles the auto-scroll timer for the team carousel
  useEffect(() => {
    if (isAutoScrollPaused || isResetting || effectiveTotalSlides <= 1) return;

    const timer = setTimeout(() => {
      if (currentSlide === effectiveTotalSlides) {
        setIsResetting(true);
        setCurrentSlide(0);
        setTimeout(() => setIsResetting(false), 50);
      } else {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % (effectiveTotalSlides + (effectiveTotalSlides > 1 ? 1: 0) ) );
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentSlide, effectiveTotalSlides, isAutoScrollPaused, isResetting]);

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
    window.open(`https://maps.google.com/?q=${encodedAddress}`, '_blank');
  };


  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Toast notifications */}
      <Toaster />

      {/* Sticky NavBar - will be fixed at the top when scrolling */}
      <NavBar />

      {/* Hero Section */}
      <header className="relative h-[100vh] bg-gray-900 pt-0">
        {/* ... (The Gradient overlay and Background Image divs remain the same) ... */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-gray-800/50 z-10" />
        <div className="absolute inset-0 z-0">
        <Image
             src="/Spring.png"
             alt="Background"
             fill
             // CHANGE: replaced 'object-cover' with 'object-contain'
             // Added 'object-center' to ensure it stays in the middle
             className="object-contain object-center" 
             priority
           />
        </div>

        {/* Content container */}
        <div className="container relative z-20 mx-auto px-6 py-4 h-full flex flex-col">
          <div className="flex-1 flex items-center justify-center text-center md:justify-end md:text-right max-w-xl mx-auto md:ml-auto md:mx-0">
            {/* Slogan container */}
            <div className="text-right relative w-full md:w-auto">
              {/* Decorative vertical gold accent */}
              <div className="hidden md:block absolute left-[-30px] lg:left-[-50px] top-[-20px] lg:top-[-30px] bottom-[-2px] w-[3px] lg:w-[4px] bg-[#FFC107] z-20"></div>
              
              {/* Keyword Entity Eyebrow */}
              <div 
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFC107]/20 border border-[#FFC107]/40 text-[#FFC107] text-xs font-semibold uppercase tracking-wider mb-3 opacity-0 animate-fadeIn"
                style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
              >
                {locale === 'zh-Hans'
                  ? '卑诗省列治文综合性律师事务所'
                  : locale === 'zh-Hant'
                  ? '卑詩省列治文綜合性律師事務所'
                  : 'Full-Service Law Firm in Richmond, BC'}
              </div>

              <h1 
                className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mb-3 sm:mb-4 text-white text-balance opacity-0 animate-fadeIn"
                style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
              >
                {t("hero.title")}
              </h1>
              
              <p 
                className="text-lg sm:text-xl lg:text-2xl text-white font-medium mb-2 text-balance text-pretty opacity-0 animate-fadeIn"
                style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
              >
                {t("hero.subtitle")}
              </p>

              <p
                className="text-xs sm:text-sm text-zinc-300 font-light max-w-lg mb-6 sm:mb-8 text-balance text-pretty opacity-0 animate-fadeIn"
                style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}
              >
                {locale === 'zh-Hans'
                  ? '大温哥华资深出庭与事务律师团队，深耕公司商事、房产过户、民事诉讼、遗产规划及家庭法'
                  : locale === 'zh-Hant'
                  ? '大溫哥華資深出庭與事務律師團隊，深耕公司商事、房產過戶、民事訴訟、遺產規劃及家庭法'
                  : 'Trusted barristers & solicitors serving Greater Vancouver across corporate, real estate conveyancing, civil litigation, estate planning, and family law'}
              </p>
              
              <div 
                className="flex flex-col items-center md:items-end mt-8 md:mt-12 lg:mt-16 w-full sm:w-auto opacity-0 animate-fadeIn"
                style={{ animationDelay: '1.0s', animationFillMode: 'forwards' }}
              >
                <button
                  onClick={() => {
                    const el = document.getElementById("contact");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="border border-[#FFC107] text-[#FFC107] hover:bg-[#FFC107] hover:text-gray-950 active:scale-[0.96] transition-[background-color,color,transform] duration-150 ease-out font-semibold px-8 py-3 rounded w-full sm:w-auto justify-center cursor-pointer shadow-sm"
                >
                  {t("hero.bookButton")}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* ... (Explore button remains the same) ... */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30 opacity-0 animate-fadeIn" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
          <ExploreButton />
        </div>
      </header>

      {/* Introduction Section with Dual-Milestone Executive Layout */}
      <section id="about" className="py-20 md:py-28 relative bg-zinc-50 border-b border-zinc-200">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 lg:items-stretch">
            {/* Left Column: Firm Overview & Key Metrics */}
            <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B1B48]/10 text-[#0B1B48] border border-[#0B1B48]/20 text-xs font-bold uppercase tracking-wider mb-5">
                  ESTABLISHED 2009 • RICHMOND, BC
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1B48] tracking-tight text-balance">
                  {t("intro.companyName")}
                </h2>
                <div className="h-1 w-20 bg-[#FFC107] rounded-full my-5"></div>
                
                <h3 className="text-xl font-serif font-bold text-zinc-900 mb-3 text-balance">
                  {historySlides[0].title}
                </h3>
                <p className="text-base text-zinc-700 leading-relaxed mb-8 text-pretty">
                  {historySlides[0].text}
                </p>

                {/* 2x2 Key Highlights Grid */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8">
                  <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm">
                    <div className="text-2xl font-serif font-bold text-[#0B1B48] mb-1">2009</div>
                    <div className="text-xs text-zinc-600 font-medium">
                      {locale === 'zh-Hans' ? '创立于列治文' : locale === 'zh-Hant' ? '創立於列治文' : 'Founded in Richmond'}
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm">
                    <div className="text-2xl font-serif font-bold text-[#0B1B48] mb-1">15+</div>
                    <div className="text-xs text-zinc-600 font-medium">
                      {locale === 'zh-Hans' ? '专业法律团队' : locale === 'zh-Hant' ? '專業法律團隊' : 'Legal Professionals'}
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm">
                    <div className="text-lg sm:text-xl font-serif font-bold text-[#0B1B48] mb-1">
                      {locale === 'zh-Hans' ? '4种语言' : locale === 'zh-Hant' ? '4種語言' : '4 Languages'}
                    </div>
                    <div className="text-xs text-zinc-600 font-medium">
                      {locale === 'zh-Hans' ? '中(普/粤) · 英 · 韩四语服务' : locale === 'zh-Hant' ? '中(普/粵) · 英 · 韓四語服務' : 'English · Mandarin · Cantonese · Korean'}
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm">
                    <div className="text-2xl font-serif font-bold text-[#0B1B48] mb-1">2 Offices</div>
                    <div className="text-xs text-zinc-600 font-medium">
                      {locale === 'zh-Hans' ? '列治文双办公中心' : locale === 'zh-Hant' ? '列治文雙辦公中心' : 'Cooney Rd & Aberdeen'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative inline-block group">
                <Link href={localePath("/about")}>
                  <button className="h-[44px] pl-6 pr-5 bg-[#0B1B48] text-[#FFC107] uppercase text-xs font-bold tracking-wider rounded-lg shadow-md hover:bg-[#132763] active:scale-[0.96] transition-[background-color,transform,box-shadow] duration-150 ease-out whitespace-nowrap flex items-center gap-2">
                    <span>{t("intro.readMore")}</span>
                    <span>→</span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Column: Both 2009 & 2021 Milestones Displayed Together */}
            <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-between gap-5">
              {historySlides.map((slide) => (
                <div
                  key={slide.id}
                  className="flex-1 bg-white rounded-2xl p-5 shadow-md border border-zinc-200 hover:border-[#FFC107] hover:shadow-lg transition-[border-color,box-shadow] duration-200 ease-out flex flex-col sm:flex-row gap-5 items-center group"
                >
                  <div className="w-full sm:w-40 h-36 sm:h-full sm:min-h-[136px] max-h-[165px] relative rounded-lg overflow-hidden shrink-0 bg-zinc-100 outline outline-1 -outline-offset-1 outline-black/10 border border-zinc-100">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 bg-[#0B1B48]/90 text-[#FFC107] px-2.5 py-0.5 rounded text-xs font-bold font-serif tracking-wider shadow">
                      {slide.year}
                    </div>
                  </div>
                  <div className="flex-1 text-left flex flex-col justify-center">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B1B48] bg-[#0B1B48]/10 px-2 py-0.5 rounded inline-block mb-1.5 self-start">
                      {slide.tag}
                    </span>
                    <h4 className="text-base font-serif font-bold text-zinc-900 group-hover:text-[#0B1B48] transition-colors mb-1.5">
                      {slide.title}
                    </h4>
                    <p className="text-xs sm:text-[13px] text-zinc-600 leading-relaxed text-pretty">
                      {slide.summary[currentLang]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Attorney Showcase Section */}
      <section id="attorneys" className="py-20 md:py-28 relative bg-white border-b border-zinc-200">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-2/5">
              <div className="relative">
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1B48] uppercase mb-3 text-balance">
                  {t("attorneys.sectionTitle")}
                </h2>
                <div className="h-1 w-20 bg-[#FFC107] rounded-full mb-6"></div>

                <div className="h-[420px] overflow-y-auto pr-6 text-sm text-zinc-700 leading-relaxed mb-8 scrollbar-container">
                  <p className="mb-5 leading-relaxed text-pretty">
                    {t("attorneys.sectionText1")}
                  </p>
                  <p className="mb-5 leading-relaxed text-pretty">
                    {t("attorneys.sectionText2")}
                  </p>
                  <p className="mb-5 leading-relaxed text-pretty">
                    {t("attorneys.sectionText3")}
                  </p>
                  <p className="mb-5 leading-relaxed text-pretty">
                    {t("attorneys.sectionText4")}
                  </p>
                  <p className="mb-5 leading-relaxed text-pretty">
                    {t("attorneys.sectionText5")}
                  </p>
                  <p className="leading-relaxed text-pretty">
                    {t("attorneys.sectionText6")}
                  </p>
                </div>

                {/* Custom scrollbar styling */}
                <ScrollbarStyles />
              </div>

              <div className="relative inline-block group">
                <Link href={localePath("/team")}>
                  <button className="h-[44px] pl-6 pr-5 bg-[#0B1B48] text-[#FFC107] uppercase text-xs font-bold tracking-wider rounded-lg shadow-md hover:bg-[#132763] active:scale-[0.96] transition-[background-color,transform,box-shadow] duration-150 ease-out whitespace-nowrap flex items-center gap-2">
                    <span>{t("attorneys.meetTeam")}</span>
                    <span>→</span>
                  </button>
                </Link>
              </div>
            </div>
            <div className="md:w-3/5 w-full">
              {/* Team members grid display with smoother transition */}
              <div
                className="h-[620px] relative overflow-hidden rounded-2xl bg-zinc-50 border border-zinc-200 p-4"
                onMouseEnter={() => setIsAutoScrollPaused(true)}
                onMouseLeave={() => setIsAutoScrollPaused(false)}
              >
                <div
                  className="absolute inset-0 transition-transform duration-1000 ease-in-out z-10 will-change-transform"
                  style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                    transition: isResetting ? 'none' : 'transform 1000ms ease-in-out'
                  }}
                >
                  {allSlides.map((slide, slideIndex) => (
                    <div
                      key={slideIndex}
                      className="absolute top-0 left-0 w-full h-full grid grid-cols-2 grid-rows-2 gap-4 p-4"
                      style={{
                        transform: `translateX(${slideIndex * 100}%)`
                      }}
                    >
                      {slide.map((member) => (
                        <div
                          key={member.id}
                          className="bg-white rounded-xl overflow-hidden shadow-md border border-zinc-200 hover:border-[#FFC107] hover:shadow-lg transition-[border-color,box-shadow] duration-200 ease-out p-2.5 flex flex-col justify-between group h-full"
                        >
                          <div className="relative w-full flex-1 min-h-0 overflow-hidden rounded-lg bg-zinc-100 outline outline-1 -outline-offset-1 outline-black/10">
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              sizes="(max-width: 640px) 50vw, (max-width: 768px) 25vw, 220px"
                              className="object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div className="py-2 px-2 w-full text-center shrink-0">
                            <h3 className="font-serif font-bold text-zinc-900 text-xs sm:text-sm group-hover:text-[#0B1B48] truncate transition-colors">
                              {member.name}
                            </h3>
                            <div className="mt-1 h-[2px] w-8 bg-[#FFC107] mx-auto rounded-full"></div>
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
      <section id="services" className="py-20 md:py-28 relative bg-zinc-50 border-b border-zinc-200">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row gap-16 md:gap-20 items-center">
            <div className="md:w-1/2 w-full">
              <PracticeAreasCarousel
                onMouseEnter={() => setIsAutoScrollPaused(true)}
                onMouseLeave={() => setIsAutoScrollPaused(false)}
              />
            </div>

            <div className="md:w-1/2">
              <div className="relative">
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1B48] uppercase mb-3">
                  {t("practiceAreas.sectionTitle")}
                </h2>
                <div className="h-1 w-20 bg-[#FFC107] rounded-full mb-6"></div>

                <h3 className="text-xl font-serif font-bold text-zinc-900 mb-6 text-balance">
                  {t("practiceAreas.sectionSubtitle")}
                </h3>

                <div className="h-[360px] overflow-y-auto pr-6 text-sm text-zinc-700 leading-relaxed mb-8 scrollbar-container">
                  <p className="mb-5 leading-relaxed text-pretty">
                    {t("practiceAreas.sectionText1")}
                  </p>
                  <p className="mb-5 leading-relaxed text-pretty">
                    {t("practiceAreas.sectionText2")}
                  </p>
                  <p className="leading-relaxed text-pretty">
                    {t("practiceAreas.sectionText3")}
                  </p>
                </div>

                {/* Custom scrollbar styling */}
                <ScrollbarStyles />
              </div>

              <div className="relative inline-block group">
                <Link href={localePath("/practice-areas")}>
                  <button className="h-[44px] pl-6 pr-5 bg-[#0B1B48] text-[#FFC107] uppercase text-xs font-bold tracking-wider rounded-lg shadow-md hover:bg-[#132763] active:scale-[0.96] transition-[background-color,transform,box-shadow] duration-150 ease-out whitespace-nowrap flex items-center gap-2">
                    <span>{t("practiceAreas.viewAll")}</span>
                    <span>→</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      {/* Contact and Location Footer Section */}
      <section id="contact" className="py-16 md:py-24 relative bg-zinc-100/70 border-t border-zinc-200">
        <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          <div className="flex flex-wrap gap-12 md:gap-14">
            {/* --- Left Column - Contact Information --- */}
            <div className="w-full md:w-[calc(50%-28px)] text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-6">
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1B48] mr-3 text-balance">
                  {t("contact.sectionTitle")}
                </h2>
                <div className="relative w-10 h-10 flex items-center justify-center text-[#FFC107]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
              </div>

              {/* Flex container for Phone and Email */}
              <div className="flex flex-col sm:flex-row gap-6 mb-6">
                <div className="flex-1 bg-white p-5 rounded-xl border border-zinc-200 shadow-sm">
                  <p className="font-semibold text-xs uppercase tracking-wider text-zinc-500 mb-1">{t("contact.phoneLabel")}</p>
                  <button
                    onClick={() => copyToClipboard('+16042737565', t("contact.copyLabelPhone"))}
                    className="text-[#0B1B48] font-bold text-base hover:text-[#FFC107] active:scale-[0.96] transition-[color,transform] duration-150 ease-out cursor-pointer flex items-center justify-center sm:justify-start"
                  >
                    +1 (604) 273-7565
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
                <div className="flex-1 bg-white p-5 rounded-xl border border-zinc-200 shadow-sm">
                  <p className="font-semibold text-xs uppercase tracking-wider text-zinc-500 mb-1">{t("contact.emailLabel")}</p>
                  <button
                    onClick={() => copyToClipboard('info@avid-law.com', t("contact.copyLabelEmail"))}
                    className="text-[#0B1B48] font-bold text-base hover:text-[#FFC107] active:scale-[0.96] transition-[color,transform] duration-150 ease-out cursor-pointer flex items-center justify-center sm:justify-start"
                  >
                    info@avid-law.com
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Office Hours Section */}
              <div className="mb-8 bg-white p-5 rounded-xl border border-zinc-200 shadow-sm">
                <p className="font-semibold text-xs uppercase tracking-wider text-zinc-500 mb-2">{officeHoursTitle}</p>
                <div className="text-zinc-800 text-sm leading-relaxed">
                  <span>{t("contact.officeHoursPrefix")} </span>
                  {/* Clickable Link */}
                  <button 
                    onClick={() => setIsHolidayModalOpen(true)}
                    className="text-[#0B1B48] font-bold underline hover:text-[#FFC107] focus:outline-none"
                  >
                    {t("contact.statutoryHolidaysLink")}
                  </button>
                </div>
              </div>

              {/* Online Client Intake & Forms Portal Button */}
              <div className="pt-2">
                <Link
                  href={localePath("/forms?type=consultation")}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#0B1B48] text-[#FFC107] hover:bg-[#132763] active:scale-[0.96] font-bold text-sm tracking-wide transition-[background-color,transform,box-shadow] duration-150 ease-out shadow-md hover:shadow-lg w-full sm:w-auto"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>
                    {locale === "zh-Hans" || locale === "zh-Hant"
                      ? "在线预约法定咨询 / 填写问卷 →"
                      : "Book a Consultation Online / Forms →"}
                  </span>
                </Link>
              </div>

            </div>

            {/* Right Column - Office Addresses */}
            <div className="w-full md:w-[calc(50%-28px)] flex flex-col gap-6">
              {/* Pacific Business Centre Address Card */}
              <div className="bg-white p-6 sm:p-7 rounded-2xl shadow-md border border-zinc-200 hover:border-[#FFC107] hover:shadow-lg transition-[border-color,box-shadow] duration-200 ease-out max-w-[500px] mx-auto md:mx-0 w-full relative">
                <button
                  className="absolute top-4 right-4 p-2.5 min-w-[40px] min-h-[40px] flex items-center justify-center hover:bg-zinc-100 rounded-lg active:scale-[0.96] transition-[background-color,color,transform] duration-150 ease-out text-zinc-400 hover:text-[#0B1B48]"
                  onClick={() => copyToClipboard('5811 Cooney Road, Suite 602 North Tower, Richmond, British Columbia V6X 3M1, Canada', 'Pacific Business Centre address')}
                  aria-label="Copy address"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FFC107]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
                <div className="absolute top-4 right-14 group">
                  <button
                    className="p-2.5 min-w-[40px] min-h-[40px] flex items-center justify-center hover:bg-zinc-100 rounded-lg active:scale-[0.96] transition-[background-color,color,transform] duration-150 ease-out text-zinc-400 hover:text-[#0B1B48]"
                    onClick={() => openInMaps('5811 Cooney Road, Suite 602 North Tower, Richmond, British Columbia V6X 3M1, Canada')}
                    aria-label="View in map"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#0B1B48]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <span className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 px-2.5 py-1 bg-[#0B1B48] text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">View in Map</span>
                  </button>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 text-[#FFC107] shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg mb-2 text-[#0B1B48]">{t("contact.office1Title")}</h3>
                    <p className="text-zinc-600 text-sm mb-1">5811 Cooney Road</p>
                    <p className="text-zinc-600 text-sm mb-1">Suite 602 North Tower</p>
                    <p className="text-zinc-600 text-sm">Richmond, British Columbia V6X 3M1</p>
                    <p className="text-zinc-600 text-sm">Canada</p>
                  </div>
                </div>
              </div>

              {/* Aberdeen Square Address Card */}
              <div className="bg-white p-6 sm:p-7 rounded-2xl shadow-md border border-zinc-200 hover:border-[#FFC107] hover:shadow-lg transition-[border-color,box-shadow] duration-200 ease-out max-w-[500px] mx-auto md:mx-0 w-full relative">
                <button
                  className="absolute top-4 right-4 p-2.5 min-w-[40px] min-h-[40px] flex items-center justify-center hover:bg-zinc-100 rounded-lg active:scale-[0.96] transition-[background-color,color,transform] duration-150 ease-out text-zinc-400 hover:text-[#0B1B48]"
                  onClick={() => copyToClipboard('4000 No. 3 Road, Unit 5235, Richmond, British Columbia V6X 0J8, Canada', 'Aberdeen Square address')}
                  aria-label="Copy address"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FFC107]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
                <div className="absolute top-4 right-14 group">
                  <button
                    className="p-2.5 min-w-[40px] min-h-[40px] flex items-center justify-center hover:bg-zinc-100 rounded-lg active:scale-[0.96] transition-[background-color,color,transform] duration-150 ease-out text-zinc-400 hover:text-[#0B1B48]"
                    onClick={() => openInMaps('4000 No. 3 Road, Unit 5235, Richmond, British Columbia V6X 0J8, Canada')}
                    aria-label="View in map"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#0B1B48]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <span className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 px-2.5 py-1 bg-[#0B1B48] text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">View in Map</span>
                  </button>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 text-[#FFC107] shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg mb-2 text-[#0B1B48]">{t("contact.office2Title")}</h3>
                    <p className="text-zinc-600 text-sm mb-1">4000 No. 3 Road</p>
                    <p className="text-zinc-600 text-sm mb-1">Unit 5235</p>
                    <p className="text-zinc-600 text-sm">Richmond, British Columbia V6X 0J8</p>
                    <p className="text-zinc-600 text-sm">Canada</p>
                  </div>
                </div>
              </div>
            </div>
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
      {/* Holiday Modal */}
      {isHolidayModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
            onClick={() => setIsHolidayModalOpen(false)}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-2xl border border-zinc-200 w-full max-w-md max-h-[85vh] overflow-hidden flex flex-col animate-fadeIn">
            {/* Header */}
            <div className="flex items-center justify-between p-5 bg-[#0B1B48] text-white">
              <h3 className="font-serif font-bold text-lg text-white">
                {t("contact.holidayModalTitle") || "Upcoming Holiday Closures"}
              </h3>
              <button 
                onClick={() => setIsHolidayModalOpen(false)}
                className="p-2 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full hover:bg-white/10 active:scale-[0.96] transition-[background-color,color,transform] duration-150 text-zinc-300 hover:text-white"
              >
                <X size={22} />
              </button>
            </div>

            {/* Scrollable List */}
            <div className="overflow-y-auto p-0">
              {activeHolidayGroups.map((group, gIdx) => (
                <div key={gIdx}>
                  <div className="bg-zinc-100 px-5 py-2.5 text-xs font-bold text-[#0B1B48] uppercase tracking-wider sticky top-0 border-b border-zinc-200">
                    {group.title}
                  </div>
                  {group.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="px-6 py-4 border-b border-zinc-100 hover:bg-zinc-50 transition-colors flex justify-between items-start group"
                    >
                      <div>
                        <p className="font-bold text-zinc-900">{item.name[currentLang]}</p>
                        {item.note && (
                          <p className="text-xs font-semibold text-red-600 mt-1">
                            {item.note[currentLang]}
                          </p>
                        )}
                      </div>
                      <span className="text-sm text-zinc-500 group-hover:text-zinc-900 text-right w-1/2 font-medium">
                        {item.date[currentLang]}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 bg-zinc-50 border-t border-zinc-100 text-center">
              <button 
                onClick={() => setIsHolidayModalOpen(false)}
                className="text-sm font-semibold text-zinc-700 hover:text-[#0B1B48] px-6 py-2 rounded-lg hover:bg-zinc-200/60 active:scale-[0.96] transition-[background-color,color,transform] duration-150"
              >
                {closeBtnLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div> // End of main container
  );
}
