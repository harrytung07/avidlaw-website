"use client";

import { useState, MouseEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import NavBar from "./NavBar";
import { useTranslation } from "@/context/TranslationContext";

type TeamMember = {
  id: number;
  nameKey: string;
  image: string;
  titleKey: string;
  descriptionKey: string;
};

const TeamMemberCard = ({ member, onMemberClick, t }: { member: TeamMember, onMemberClick: (member: TeamMember) => void, t: (key: string) => string }) => (
  <div
    key={member.id}
    className="group relative bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl mx-auto max-w-[260px] w-full"
  >
    <div className="aspect-square overflow-hidden">
      <Image
        src={member.image}
        alt={t(member.nameKey)}
        width={260}
        height={260}
        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div className="p-3 text-center">
      <h3 className="font-semibold text-gray-900 text-base">{t(member.nameKey)}</h3>
      <p className="text-xs text-gray-600">{t(member.titleKey)}</p>
    </div>
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      <button
        onClick={() => onMemberClick(member)}
        className="group relative inline-flex items-center gap-2 rounded-md bg-transparent px-5 py-2 font-semibold text-white border-2 border-[#FFC107] transition-all duration-300 hover:bg-[#FFC107] focus:outline-none text-sm"
      >
        {t('team.viewProfile')}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>
  </div>
);

export default function TeamPage() {
  const { t } = useTranslation();
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const teamMembers: TeamMember[] = [
    { id: 1, nameKey: "team.name.AdeleSun", image: "/members/Adele1.JPG", titleKey: "team.title.AdeleSun", descriptionKey: "team.bio.AdeleSun" },
    { id: 2, nameKey: "team.name.DavidChen", image: "/members/2. David Chen.jpg", titleKey: "team.title.DavidChen", descriptionKey: "team.bio.DavidChen" },
    { id: 4, nameKey: "team.name.BrentDesruisseaux", image: "/members/3. Brent Desruisseaux.jpg", titleKey: "team.title.BrentDesruisseaux", descriptionKey: "team.bio.BrentDesruisseaux" },
    { id: 3, nameKey: "team.name.AbielKwok", image: "/members/abiel1.JPG", titleKey: "team.title.AbielKwok", descriptionKey: "" },
    { id: 20, nameKey: "team.name.KunDong", image: "/members/ava.jpg", titleKey: "team.title.KunDong", descriptionKey: "" },
    { id: 5, nameKey: "team.name.CoreyPoon", image: "/members/4. Corey Poon.jpg", titleKey: "team.title.CoreyPoon", descriptionKey: "team.bio.CoreyPoon" },
    { id: 6, nameKey: "team.name.HowardQu", image: "/members/5. Howard Qu.jpg", titleKey: "team.title.HowardQu", descriptionKey: "team.bio.HowardQu" },
    { id: 7, nameKey: "team.name.FrejaLi", image: "/members/6. Freja Li.jpg", titleKey: "team.title.FrejaLi", descriptionKey: "team.bio.FrejaLi" },
    { id: 8, nameKey: "team.name.NicoleTam", image: "/members/nicole.jpg", titleKey: "team.title.NicoleTam", descriptionKey: "" },
    { id: 9, nameKey: "team.name.OliviaNicolaides", image: "/members/ava.jpg", titleKey: "team.title.OliviaNicolaides", descriptionKey: "" },
    { id: 10, nameKey: "team.name.RachelLi", image: "/members/7. Rachel Li.jpg", titleKey: "team.title.RachelLi", descriptionKey: "team.bio.RachelLi" },
    { id: 11, nameKey: "team.name.FarrahYang", image: "/members/8. Farrah Yang.jpg", titleKey: "team.title.FarrahYang", descriptionKey: "team.bio.FarrahYang" },
    { id: 12, nameKey: "team.name.AshleyWong", image: "/members/11. Ashley Wong.jpg", titleKey: "team.title.AshleyWong", descriptionKey: "team.bio.AshleyWong" },
    { id: 13, nameKey: "team.name.JeannieLee", image: "/members/10. Jeannie Lee.jpg", titleKey: "team.title.JeannieLee", descriptionKey: "team.bio.JeannieLee" },
    { id: 14, nameKey: "team.name.SarahYan", image: "/members/ava.jpg", titleKey: "team.title.SarahYan", descriptionKey: "team.bio.SarahYan" },
    { id: 15, nameKey: "team.name.StellaLi", image: "/members/12. Stella Li.jpg", titleKey: "team.title.StellaLi", descriptionKey: "team.bio.StellaLi" },
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

    // --- Add the function to open the chatbot ---
  const openChatbot = () => { // No event param needed if not using stopPropagation
    const icon = document.getElementById('chatbotIcon');
    const panel = document.getElementById('chatbotPanel');

    if (icon && panel) {
      console.log("Opening chatbot panel directly via button click (Team Page).");
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
  const barristerSolicitorRoleString = t('team.title.AdeleSun'); // "Barrister & Solicitor"
  const articlingStudentRoleString = t('team.title.AbielKwok'); // "Articling Student"

  const barristersAndSolicitors = teamMembers.filter(
    member => t(member.titleKey) === barristerSolicitorRoleString &&
              !(member.nameKey === "team.name.AbielKwok" || member.nameKey === "team.name.KunDong") // Ensure articling students are not in this list
  );

  const articlingStudents = teamMembers.filter(
    member => (member.nameKey === "team.name.AbielKwok" || member.nameKey === "team.name.KunDong") &&
              t(member.titleKey) === articlingStudentRoleString
  );
  
  const supportStaff = teamMembers.filter(member =>
    !barristersAndSolicitors.some(bs => bs.id === member.id) &&
    !articlingStudents.some(as => as.id === member.id)
  );


  return (
    <div className="min-h-screen bg-white text-gray-900">
      <NavBar />
      
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/bigBG.png" 
            alt="Background" 
            fill 
            className="object-cover" 
            priority
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold uppercase text-white mb-6 pt-16 mt-10">
            {t('team.sectionTitle')}
            <div className="h-[3px] w-[120px] bg-[#FFC107] mx-auto mt-8"></div>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            {t('team.sectionDescription')}
          </p>
        </div>
      </section>

      <section id="team-grid" className="py-20 relative">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/bigBG.png" 
            alt="Background" 
            fill 
            className="object-cover opacity-70" 
          />
        </div>
        
        <div className="container relative z-10 mx-auto px-6">
          {/* Barristers & Solicitors */}
          {barristersAndSolicitors.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {barristersAndSolicitors.map((member) => (
                <TeamMemberCard key={member.id} member={member} onMemberClick={handleMemberClick} t={t} />
              ))}
            </div>
          )}
          
          {/* Separator 1: Between B&S and Articling Students, OR B&S and Support Staff if no Articling Students */}
          {barristersAndSolicitors.length > 0 && (articlingStudents.length > 0 || supportStaff.length > 0) && (
            <div className="my-14 md:my-24"> {/* Increased margin for better visual separation */}
              <div className="h-[4px] w-full bg-gray-400"></div>
            </div>
          )}
          
          {/* Articling Students */}
          {articlingStudents.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
              {articlingStudents.map((member) => (
                 <TeamMemberCard key={member.id} member={member} onMemberClick={handleMemberClick} t={t} />
              ))}
            </div>
          )}
          
          {/* Separator 2: Between Articling Students and Support Staff */}
          {articlingStudents.length > 0 && supportStaff.length > 0 && (
            <div className="my-12 md:my-24"> {/* Increased margin */}
              <div className="h-[4px] w-full bg-gray-400"></div>
            </div>
          )}
          
          {/* Support Staff */}
          {supportStaff.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {supportStaff.map((member) => (
                <TeamMemberCard key={member.id} member={member} onMemberClick={handleMemberClick} t={t} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Need Help Choosing Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/bigBG.png" 
            alt="Background" 
            fill 
            className="object-cover opacity-70" 
          />
          <div className="absolute inset-0 bg-black/40
          "></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-4xl md:text-4xl font-bold text-[#FFC107] mb-8">{t('team.needHelpQuestion')}</h2>
          <div className="h-[3px] w-[120px] bg-[#FFC107] mx-auto mb-12"></div>
          <p className="text-xl text-white leading-relaxed mb-16 max-w-2xl mx-auto">
            {t('team.eveDescription')}
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center mt-8">
            <button
              onClick={openChatbot}
              className="group relative inline-flex items-center justify-center gap-2 rounded-md bg-[#FFC107] px-8 py-4 font-semibold text-gray-900 transition-all duration-300 hover:bg-[#ffcb38] focus:outline-none"
            >
              {t('eve.chatButton')}
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedMember && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              exit={{ opacity: 0 }}
              onClick={handleOutsideClick}
              className="fixed inset-0 bg-black z-40"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-8 overflow-y-auto cursor-pointer"
              onClick={handleOutsideClick}
            >
              <div className="relative w-full max-w-4xl overflow-hidden">
                <button
                  onClick={handleOutsideClick}
                  className="absolute right-0 top-0 z-10 bg-gray-800 p-2 rounded-full text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="mx-auto">
                    <div className="relative w-[300px] overflow-hidden rounded-lg shadow-lg">
                      <Image
                        src={selectedMember.image}
                        alt={t(selectedMember.nameKey)}
                        //fill
                        width={300}
                        height={500}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col text-left">
                    <h2 className="text-3xl font-bold text-white mb-3">{t(selectedMember.nameKey)}</h2>
                    <div className="h-[3px] w-[80px] bg-[#FFC107] mb-6"></div>
                    <p className="text-[#FFC107] font-medium text-xl mb-8">{t(selectedMember.titleKey)}</p>
                    <div className="prose prose-lg prose-invert text-gray-300 max-w-none space-y-4 mb-8">
                      <p>{selectedMember.descriptionKey ? t(selectedMember.descriptionKey) : ""}</p>
                    </div>
                    
                    {selectedMember.titleKey === "team.title.AdeleSun" || 
                     selectedMember.titleKey === "team.title.DavidChen" || 
                     selectedMember.titleKey === "team.title.BrentDesruisseaux" || 
                     selectedMember.titleKey === "team.title.AbielKwok" || 
                     selectedMember.titleKey === "team.title.CoreyPoon" || 
                     selectedMember.titleKey === "team.title.HowardQu" || 
                     selectedMember.titleKey === "team.title.FrejaLi" || 
                     selectedMember.titleKey === "team.title.NicoleTam" || 
                     selectedMember.titleKey === "team.title.OliviaNicolaides" || 
                     selectedMember.titleKey === "team.title.RachelLi" ? (
                    <button
                      onClick={(e: MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation();
                        openChatbot();
                      }}
                      className="group relative inline-flex items-center gap-2 rounded-md bg-transparent px-6 py-3 font-semibold text-white border-2 border-[#FFC107] transition-all duration-300 hover:bg-[#FFC107] focus:outline-none self-start"
                    >
                      {t('attorneys.meetTeam')}
                       <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                       >
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                       </svg>
                    </button>
                    ) : null}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
} 