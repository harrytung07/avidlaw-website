"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import NavBar from "./NavBar";
import { useTranslation } from "@/context/TranslationContext";

type TeamMember = {
  id: number;
  nameKey: string;
  image: string;
  titleKey: string;
  descriptionKey: string;
};

const TeamMemberCard = ({ 
  member, 
  onMemberClick, 
  t 
}: { 
  member: TeamMember; 
  onMemberClick: (member: TeamMember) => void; 
  t: (key: string) => string; 
}) => (
  <button
    type="button"
    key={member.id}
    onClick={() => onMemberClick(member)}
    className="group relative bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl border border-zinc-200 hover:border-[#FFC107] hover:-translate-y-0.5 active:scale-[0.98] transition-[border-color,box-shadow,transform] duration-200 ease-out mx-auto max-w-[280px] w-full flex flex-col cursor-pointer focus-visible:ring-2 focus-visible:ring-[#FFC107] focus-visible:outline-none text-left"
  >
    <div className="aspect-square overflow-hidden bg-zinc-100 relative outline outline-1 -outline-offset-1 outline-black/5">
      <Image
        src={member.image}
        alt=""
        aria-hidden="true"
        width={280}
        height={280}
        className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
      />
    </div>
    <div className="p-4 text-center flex-grow flex flex-col justify-center bg-white w-full">
      <h3 className="font-serif font-bold text-zinc-900 text-lg group-hover:text-[#0B1B48] transition-colors text-balance">
        {t(member.nameKey)}
      </h3>
      <p className="text-xs font-semibold uppercase tracking-wider text-[#0B1B48] mt-1 text-balance">
        {t(member.titleKey)}
      </p>
    </div>
    <div aria-hidden="true" className="absolute inset-0 bg-[#0B1B48]/75 backdrop-blur-[2px] flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-4 pointer-events-none">
      <span
        className="group/btn relative inline-flex items-center gap-2 rounded-lg bg-[#FFC107] pl-5 pr-4 py-2.5 font-bold text-[#0B1B48] shadow-lg shadow-[#FFC107]/20 text-sm"
      >
        <span>{t('team.viewProfile')}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </span>
    </div>
  </button>
);

export default function TeamPage() {
  const { t, locale } = useTranslation();
  const activeLocale = (locale === 'zh-Hans' || locale === 'zh-Hant' ? locale : 'en') as 'en' | 'zh-Hans' | 'zh-Hant';

  const localePath = (path: string) => {
    if (path.startsWith(`/${locale}`)) return path;
    if (path === '/' || path === '') return `/${locale}`;
    if (path === '/#contact' || path === '#contact') return `/${locale}#contact`;
    if (path.startsWith('/')) return `/${locale}${path}`;
    return `/${locale}/${path}`;
  };
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const teamMembers: TeamMember[] = [
    { id: 1, nameKey: "team.name.AdeleSun", image: "/members/Adele1.JPG", titleKey: "team.title.AdeleSun", descriptionKey: "team.bio.AdeleSun" },
    { id: 2, nameKey: "team.name.DavidChen", image: "/members/2. David Chen.jpg", titleKey: "team.title.DavidChen", descriptionKey: "team.bio.DavidChen" },
    { id: 4, nameKey: "team.name.BrentDesruisseaux", image: "/members/3. Brent Desruisseaux.jpg", titleKey: "team.title.BrentDesruisseaux", descriptionKey: "team.bio.BrentDesruisseaux" },
    { id: 3, nameKey: "team.name.AbielKwok", image: "/members/abiel1.JPG", titleKey: "team.title.AbielKwok", descriptionKey: "" },
    { id: 20, nameKey: "team.name.KunDong", image: "/members/kun.jpg", titleKey: "team.title.KunDong", descriptionKey: "" },
    { id: 21, nameKey: "team.name.BrighamYang", image: "/members/ava.jpg", titleKey: "team.title.BrighamYang", descriptionKey: "" },
    { id: 5, nameKey: "team.name.CoreyPoon", image: "/members/4. Corey Poon.jpg", titleKey: "team.title.CoreyPoon", descriptionKey: "team.bio.CoreyPoon" },
    { id: 6, nameKey: "team.name.HowardQu", image: "/members/5. Howard Qu.jpg", titleKey: "team.title.HowardQu", descriptionKey: "team.bio.HowardQu" },
    { id: 8, nameKey: "team.name.NicoleTam", image: "/members/nicole.jpg", titleKey: "team.title.NicoleTam", descriptionKey: "team.bio.NicoleTam" },
    { id: 9, nameKey: "team.name.OliviaNicolaides", image: "/members/olivia.JPG", titleKey: "team.title.OliviaNicolaides", descriptionKey: "" },
    { id: 10, nameKey: "team.name.RachelLi", image: "/members/7. Rachel Li.jpg", titleKey: "team.title.RachelLi", descriptionKey: "team.bio.RachelLi" },
    { id: 11, nameKey: "team.name.FarrahYang", image: "/members/8. Farrah Yang.jpg", titleKey: "team.title.FarrahYang", descriptionKey: "team.bio.FarrahYang" },
    { id: 13, nameKey: "team.name.JeannieLee", image: "/members/10. Jeannie Lee.jpg", titleKey: "team.title.JeannieLee", descriptionKey: "team.bio.JeannieLee" },
    { id: 14, nameKey: "team.name.MonaBai", image: "/members/ava.jpg", titleKey: "team.title.MonaBai", descriptionKey: "team.bio.MonaBai" },
    { id: 16, nameKey: "team.name.SunnyZhang", image: "/members/9. Sunny Zhang.jpg", titleKey: "team.title.SunnyZhang", descriptionKey: "team.bio.SunnyZhang" },
    { id: 17, nameKey: "team.name.DianaGao", image: "/members/ava.jpg", titleKey: "team.title.DianaGao", descriptionKey: "team.bio.DianaGao" },
    { id: 18, nameKey: "team.name.Lynn", image: "/members/ava.jpg", titleKey: "team.title.Lynn", descriptionKey: "team.bio.Lynn" },
    { id: 19, nameKey: "team.name.RichardZhu", image: "/members/ava.jpg", titleKey: "team.title.RichardZhu", descriptionKey: "team.bio.RichardZhu" },
  ];

  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(member);
  };

  const handleOutsideClick = () => {
    setSelectedMember(null);
  };

  useEffect(() => {
    if (!selectedMember) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedMember(null);
      }
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedMember]);

  const barristerSolicitorRoleString = t('team.title.AdeleSun'); // "Barrister & Solicitor"
  const articlingStudentRoleString = t('team.title.BrighamYang'); // "Articling Student"

  const barristersAndSolicitors = teamMembers
    .filter(member => t(member.titleKey) === barristerSolicitorRoleString)
    .sort((a, b) => {
      const nameA = t(a.nameKey);
      const nameB = t(b.nameKey);

      const adeleName = t("team.name.AdeleSun");
      const davidName = t("team.name.DavidChen");

      if (nameA === adeleName) return -1;
      if (nameB === adeleName) return 1;
      if (nameA === davidName) return -1;
      if (nameB === davidName) return 1;

      return nameA.localeCompare(nameB);
    });

  const articlingStudents = teamMembers.filter(
    member => t(member.titleKey) === articlingStudentRoleString
  );
  
  const supportStaff = teamMembers.filter(member =>
    !barristersAndSolicitors.some(bs => bs.id === member.id) &&
    !articlingStudents.some(as => as.id === member.id)
  );

  const heroBadge = {
    en: "Avid Law Corporation • Legal Team",
    "zh-Hans": "安胜 · 弘人律师行 • 专业律师与法律团队",
    "zh-Hant": "安勝 · 弘人律師行 • 專業律師與法律團隊",
  }[activeLocale];

  const categoryTitles = {
    barristers: {
      en: "Barristers & Solicitors",
      "zh-Hans": "执业律师与出庭大律师",
      "zh-Hant": "執業律師與出庭大律師",
    }[activeLocale],
    students: {
      en: "Articling Students",
      "zh-Hans": "实习律师",
      "zh-Hant": "實習律師",
    }[activeLocale],
    support: {
      en: "Legal Support & Conveyancing Team",
      "zh-Hans": "法律助理与过户团队",
      "zh-Hant": "法律助理與過戶團隊",
    }[activeLocale],
  };

  return (
    <div className="min-h-screen bg-zinc-100/70 text-zinc-900">
      <NavBar />
      
      <main id="main-content">
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-[#0B1B48] text-white overflow-hidden text-center">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image 
            src="/sideBG.png" 
            alt="" 
            aria-hidden="true"
            fill 
            className="object-cover opacity-20 brightness-110" 
            priority
          />
          <div className="absolute inset-0 bg-[#0B1B48]/85 mix-blend-multiply"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFC107]/15 border border-[#FFC107]/30 text-[#FFC107] text-xs font-semibold uppercase tracking-wider mb-6">
            {heroBadge}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold uppercase text-white mb-6 tracking-wide text-balance">
            {t('team.sectionTitle')}
          </h1>
          <div className="h-1 w-24 bg-[#FFC107] mx-auto mb-8 rounded-full"></div>
          <p className="text-base sm:text-lg md:text-xl text-zinc-200/90 max-w-3xl mx-auto leading-relaxed font-light text-pretty">
            {t('team.sectionDescription')}
          </p>
        </div>
      </section>

      {/* Team Grid Section */}
      <section id="team-grid" className="py-20 md:py-28 relative">
        <div className="container relative z-10 mx-auto px-6 max-w-7xl">
          {/* Category: Barristers & Solicitors */}
          {barristersAndSolicitors.length > 0 && (
            <div className="mb-20">
              <div className="text-center md:text-left mb-10">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B1B48] mb-3 text-balance">
                  {categoryTitles.barristers}
                </h2>
                <div className="h-1 w-16 bg-[#FFC107] mx-auto md:mx-0 rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {barristersAndSolicitors.map((member) => (
                  <TeamMemberCard key={member.id} member={member} onMemberClick={handleMemberClick} t={t} />
                ))}
              </div>
            </div>
          )}
          
          {/* Category: Articling Students */}
          {articlingStudents.length > 0 && (
            <div className="mb-20">
              <div className="text-center md:text-left mb-10">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B1B48] mb-3 text-balance">
                  {categoryTitles.students}
                </h2>
                <div className="h-1 w-16 bg-[#FFC107] mx-auto md:mx-0 rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {articlingStudents.map((member) => (
                  <TeamMemberCard key={member.id} member={member} onMemberClick={handleMemberClick} t={t} />
                ))}
              </div>
            </div>
          )}
          
          {/* Category: Support Staff */}
          {supportStaff.length > 0 && (
            <div>
              <div className="text-center md:text-left mb-10">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B1B48] mb-3 text-balance">
                  {categoryTitles.support}
                </h2>
                <div className="h-1 w-16 bg-[#FFC107] mx-auto md:mx-0 rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {supportStaff.map((member) => (
                  <TeamMemberCard key={member.id} member={member} onMemberClick={handleMemberClick} t={t} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Ready to Schedule Section */}
      <section className="py-20 md:py-28 relative bg-[#0B1B48] text-white overflow-hidden text-center">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image 
            src="/sideBG.png" 
            alt="" 
            aria-hidden="true"
            fill 
            className="object-cover opacity-15 brightness-110" 
          />
          <div className="absolute inset-0 bg-[#0B1B48]/85 mix-blend-multiply"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-6 text-balance">
            {t('team.needHelpQuestion')}
          </h2>
          <div className="h-1 w-24 bg-[#FFC107] mx-auto mb-8 rounded-full"></div>
          <p className="text-base sm:text-lg md:text-xl text-zinc-300 leading-relaxed mb-10 max-w-2xl mx-auto font-light text-pretty">
            {t('team.eveDescription')}
          </p>
          
          <div className="flex justify-center">
            <Link
              href={localePath('/forms?type=consultation')}
              className="group inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#FFC107] pl-8 pr-7 py-4 font-bold text-[#0B1B48] shadow-lg shadow-[#FFC107]/20 hover:bg-[#ffcb38] hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.96] transition-[background-color,box-shadow,transform] duration-150 ease-out focus-visible:ring-2 focus-visible:ring-[#FFC107] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1B48] focus-visible:outline-none text-base"
            >
              <span>{t('hero.bookButton')}</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 shrink-0" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 text-zinc-400 py-10 border-t border-zinc-800 text-center">
        <p className="text-sm text-zinc-400">
          {t("footer.copyright").replace("{currentYear}", new Date().getFullYear().toString())}
        </p>
      </footer>

      {/* Detail Modal */}
      <AnimatePresence initial={false}>
        {selectedMember && (
          <motion.div
            key={selectedMember.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 overscroll-contain"
          >
            {/* Static Backdrop inside the single animated wrapper */}
            <div
              className="fixed inset-0 bg-[#0B1B48]/80 backdrop-blur-sm cursor-pointer"
              onClick={handleOutsideClick}
            />

            {/* Modal Card */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="team-member-modal-title"
              initial={{ y: 16, scale: 0.97 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 12, scale: 0.97 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative z-10 w-full max-w-3xl bg-white border border-zinc-200 text-zinc-900 rounded-3xl shadow-2xl p-6 sm:p-10 md:p-12 overflow-hidden overscroll-contain"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={handleOutsideClick}
                className="absolute right-4 top-4 z-10 min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-900 active:scale-[0.96] transition-[background-color,color,transform] duration-150 ease-out focus-visible:ring-2 focus-visible:ring-[#FFC107] focus-visible:outline-none cursor-pointer"
                aria-label={
                  activeLocale === 'zh-Hans'
                    ? "关闭个人简介"
                    : activeLocale === 'zh-Hant'
                    ? "關閉個人簡介"
                    : "Close team member profile"
                }
              >
                <X className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden="true" />
              </button>

              <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-center">
                <div className="md:col-span-5 flex justify-center">
                  <div className="relative w-[240px] sm:w-[260px] aspect-square overflow-hidden rounded-xl shadow-sm border border-zinc-200/80 outline outline-1 -outline-offset-1 outline-black/10 bg-zinc-100">
                    <Image
                      src={selectedMember.image}
                      alt={t(selectedMember.nameKey)}
                      width={280}
                      height={280}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                </div>

                <div className="md:col-span-7 flex flex-col text-left">
                  <h2 id="team-member-modal-title" className="text-2xl sm:text-3xl font-serif font-bold text-[#0B1B48] mb-2 text-balance">
                    {t(selectedMember.nameKey)}
                  </h2>
                  <div className="mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0B1B48] bg-[#FFC107]/20 px-3 py-1 rounded-full inline-block text-balance">
                      {t(selectedMember.titleKey)}
                    </span>
                  </div>
                  <div className="h-1 w-16 bg-[#FFC107] mb-6 rounded-full"></div>
                  <div className="text-zinc-700 leading-relaxed text-sm sm:text-base space-y-4 max-h-[300px] overflow-y-auto pr-2 overscroll-contain">
                    <p className="text-pretty">{selectedMember.descriptionKey ? t(selectedMember.descriptionKey) : ""}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}