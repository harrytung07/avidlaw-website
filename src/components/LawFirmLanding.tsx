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
  // NEW: Holiday Modal State
  const [isHolidayModalOpen, setIsHolidayModalOpen] = useState(false);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);

  // --- NEW: History Data Definitions ---
  const historySlides = [
    {
      id: 1,
      year: t("intro.slide1.year"),
      tag: t("intro.slide1.tag"),
      title: t("intro.slide1.title"),
      text: t("intro.slide1.text"),
      image: "/intro1.jpg" 
    },
    {
      id: 2,
      year: t("intro.slide2.year"),
      tag: t("intro.slide2.tag"),
      title: t("intro.slide2.title"),
      text: t("intro.slide2.text"),
      image: "/merge.jpg" 
    }
  ];

  // --- NEW: Navigation Handlers ---
  const handleNextHistory = () => {
    setCurrentHistoryIndex((prev) => (prev + 1) % historySlides.length);
  };

  const handlePrevHistory = () => {
    setCurrentHistoryIndex((prev) => (prev - 1 + historySlides.length) % historySlides.length);
  };
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
            <div className="text-right relative opacity-0 animate-fadeIn w-full md:w-auto" style={{ animationDelay: '1.5s' }}>
              {/* ... (Decorative line, h1, and p tags remain the same) ... */}
              <div className="hidden md:block absolute left-[-30px] lg:left-[-50px] top-[-20px] lg:top-[-30px] bottom-[-2px] w-[3px] lg:w-[4px] bg-[#FFC107] z-20"></div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mb-3 sm:mb-4 text-white">
                {t("hero.title")}
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-white font-medium mb-6 sm:mb-8">
                {t("hero.subtitle")}
              </p>
              
              <div className="flex flex-col items-center md:items-end mt-8 md:mt-12 lg:mt-16 w-full sm:w-auto">
                <button
                  onClick={() => {
                    const el = document.getElementById("contact");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="border border-[#FFC107] text-[#FFC107] hover:bg-[#FFC107] hover:text-white transition-colors font-semibold px-8 py-3 rounded w-full sm:w-auto justify-center cursor-pointer"
                >
                  {t("hero.bookButton")}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* ... (Explore button remains the same) ... */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30 opacity-0 animate-fadeIn" style={{ animationDelay: '2.2s' }}>
          <ExploreButton />
        </div>
      </header>

      {/* Introduction Section with Historical Timeline */}
      <section id="about" className="py-20 relative overflow-hidden">
        {/* Common background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/bigBG1.png"
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
              <div className="w-[450px] h-[380px] relative mx-auto md:mx-0">
                {/* UPDATED: Dynamic Image Source */}
                <Image
                  key={historySlides[currentHistoryIndex].image} // Key forces re-render for smooth transition if needed
                  src={historySlides[currentHistoryIndex].image}
                  alt="Historical Photo"
                  fill
                  className="object-cover object-center opacity-90 transition-opacity duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-gradient-to-t from-black/90 to-transparent z-10">
                  <div className="text-center absolute bottom-4 left-0 right-0">
                    {/* UPDATED: Dynamic Tag */}
                    <p className="text-white uppercase font-bold text-sm tracking-wider">
                      {historySlides[currentHistoryIndex].tag}
                    </p>
                    <div className="w-16 h-[2px] bg-white mx-auto mt-2"></div>
                  </div>
                </div>
              </div>

              {/* Year and Carousel Navigation */}
              <div className="absolute bottom-[-80px] left-[170px] flex items-center z-20">
                <div className="h-[50px] w-[4px] bg-gray-400 mr-4"></div>
                {/* UPDATED: Dynamic Year */}
                <p className="text-[#FFC107] text-5xl font-serif italic">
                  {historySlides[currentHistoryIndex].year}
                </p>
                <div className="ml-6 flex space-x-6 select-none">
                  {/* UPDATED: Click Handlers */}
                  <span 
                    onClick={handlePrevHistory}
                    className="text-2xl cursor-pointer hover:text-gray-700 hover:scale-110 transition-transform"
                  >
                    «
                  </span>
                  <span 
                    onClick={handleNextHistory}
                    className="text-2xl cursor-pointer hover:text-gray-700 hover:scale-110 transition-transform"
                  >
                    »
                  </span>
                </div>
              </div>
            </div>

            {/* Right column - Text Block */}
            <div className="md:w-1/2 pt-0">
              <div className="relative px-8 py-10 z-10 ml-28 max-w-3xl mt-16">
                {/* UPDATED: Dynamic Title and Text */}
                <h3 className="text-xl font-serif font-bold text-black mb-7 transition-all duration-300">
                  {historySlides[currentHistoryIndex].title}
                </h3>
                <p className="text-[15px] text-gray-700 leading-7 mb-10 transition-all duration-300 min-h-[120px]">
                  {historySlides[currentHistoryIndex].text}
                </p>

                <div className="relative inline-block group">
                  <Link href={localePath("/about")}>
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
                <Link href={localePath("/team")}>
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
                      // Added padding to the grid container for mobile, responsive gap
                      className="absolute top-0 left-0 w-full h-full grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 p-1 sm:p-2"
                      style={{
                        transform: `translateX(${slideIndex * 100}%)`
                      }}
                    >
                      {slide.map((member) => ( // Removed memberIndex as key part, member.id is unique enough per slide context
                        <div
                          key={member.id} // Use member.id for key
                          className="p-1.5 sm:p-2 text-center flex flex-col"
                        >
                          <div className="w-full aspect-square relative mx-auto overflow-hidden shadow-lg rounded-md">
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              sizes="(max-width: 640px) 50vw, (max-width: 768px) 25vw, 220px"
                              className="object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-300" /* UPDATED */
                            />
                          </div>
                          {/* Revised Text Box (Tag) Below Image */}
                          <div className="bg-white py-1.5 sm:py-2 px-1.5 sm:px-2 w-full mx-auto relative group shadow-md mt-1.5 sm:mt-2 rounded-sm"> {/* Adjusted padding, removed flex centering for single line */}
                            <h3 className="font-semibold text-gray-800 text-xs sm:text-sm md:text-base group-hover:text-gray-900 relative z-10 truncate text-center"> {/* Ensured text-center, adjusted font sizes slightly */}
                              {member.name}
                            </h3>
                            {/* The <p> tag for member.title has been removed from here, title is now part of the member object and could be displayed if needed */}
                            <div className="absolute left-0 bottom-0 w-full h-[3px] bg-[#FFC107] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out"></div>
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
                <Link href={localePath("/practice-areas")}>
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

      
      {/* Contact and Location Footer Section */}
      <section id="contact" className="py-12 sm:py-16 md:py-20 relative">
        {/* MODIFIED: Added bg-gray-50 to lighten the background and differentiate the section */}
        <div className="absolute inset-0 z-0 bg-gray-50">
          <Image
            src="/bigBG.png"
            alt="Background"
            fill
            className="object-cover object-bottom opacity-40 brightness-105" // Adjusted opacity/brightness for the new background
          />
        </div>

        <div className="container mx-auto px-6 relative z-10 max-w-[1200px] py-[60px]">
          <div className="flex flex-wrap gap-12 md:gap-[48px]">
            {/* --- Left Column - Contact Information --- */}
            <div className="w-full md:w-[calc(50%-24px)] text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-6">
                <h2 className="text-[32px] font-bold text-[#222222] mr-3">{t("contact.sectionTitle")}</h2>
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
              </div>

              {/* Flex container for Phone and Email */}
              <div className="flex flex-col sm:flex-row gap-8 mb-6">
                <div className="flex-1">
                  <p className="font-semibold text-[16px] text-[#444444] mb-1">{t("contact.phoneLabel")}</p>
                  <button
                    onClick={() => copyToClipboard('+16042737565', t("contact.copyLabelPhone"))}
                    className="text-black hover:text-[#FFC107] transition-colors cursor-pointer flex items-center justify-center sm:justify-start"
                  >
                    +1 (604) 273-7565
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[16px] text-[#444444] mb-1">{t("contact.emailLabel")}</p>
                  <button
                    onClick={() => copyToClipboard('info@avid-law.com', t("contact.copyLabelEmail"))}
                    className="text-black hover:text-[#FFC107] transition-colors cursor-pointer flex items-center justify-center sm:justify-start"
                  >
                    info@avid-law.com
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Office Hours Section */}
              <div className="mb-8">
                <p className="font-semibold text-[16px] text-[#444444] mb-2">{officeHoursTitle}</p>
                <div className="text-black leading-relaxed">
                  <span>{t("contact.officeHoursPrefix")} </span>
                  {/* Clickable Link */}
                  <button 
                    onClick={() => setIsHolidayModalOpen(true)}
                    className="text-[#FF4500] font-bold hover:underline focus:outline-none"
                  >
                    {t("contact.statutoryHolidaysLink")}
                  </button>
                  
                  <br />
                  
                </div>
              </div>

              {/* Online Client Intake & Forms Portal Button */}
              <div className="pt-2">
                <Link
                  href={localePath("/forms?type=consultation")}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#0B1B48] text-[#FFC107] hover:bg-[#132763] font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg w-full sm:w-auto"
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
      {/* Holiday Modal */}
      {isHolidayModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsHolidayModalOpen(false)}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[85vh] overflow-hidden flex flex-col animate-fadeIn">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50">
              <h3 className="font-bold text-lg text-gray-800">
                {t("contact.holidayModalTitle") || "Upcoming Holiday Closures"}
              </h3>
              <button 
                onClick={() => setIsHolidayModalOpen(false)}
                className="p-1 rounded-full hover:bg-gray-200 transition-colors text-gray-500"
              >
                <X size={24} />
              </button>
            </div>

            {/* Scrollable List */}
            <div className="overflow-y-auto p-0">
              {activeHolidayGroups.map((group, gIdx) => (
                <div key={gIdx}>
                  <div className="bg-gray-100 px-5 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider sticky top-0">
                    {group.title}
                  </div>
                  {group.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="px-6 py-4 border-b border-gray-50 hover:bg-gray-50 transition-colors flex justify-between items-start group"
                    >
                      <div>
                        <p className="font-bold text-gray-800">{item.name[currentLang]}</p>
                        {item.note && (
                          <p className="text-xs font-semibold text-red-500 mt-1">
                            {item.note[currentLang]}
                          </p>
                        )}
                      </div>
                      <span className="text-sm text-gray-500 group-hover:text-gray-900 text-right w-1/2">
                        {item.date[currentLang]}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
              <button 
                onClick={() => setIsHolidayModalOpen(false)}
                className="text-sm font-semibold text-gray-600 hover:text-gray-900 px-6 py-2 rounded-md hover:bg-gray-100 transition-colors"
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
