"use client";

import { useState, MouseEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import NavBar from "./NavBar";

type TeamMember = {
  id: number;
  name: string;
  image: string;
  title: string;
  description: string;
};

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const teamMembers: TeamMember[] = [
    { id: 1, name: "Adele Sun", image: "/members/1. Adele Sun.jpg", title: "Barrister & Solicitor", description: "Adele Sun graduated from the University of British Columbia with a Juris Doctor (JD). Adele worked for TD Bank Canada as a Senior Financial Analyst for four years before she moved to Vancouver to pursue her legal education. She received a MBA from the Richard Ivey School of Business of University of Western Ontario in 2001. Prior to her immigrating to Canada, Adele had worked in areas including education, marketing, and management in China after she graduated with distinction from Harbin Teachers University of China." },
    { id: 2, name: "David Chen", image: "/members/2. David Chen.jpg", title: "Barrister & Solicitor", description: "David is a shareholder of Avid Law. His practice consists of almost exclusively civil litigation and family litigation and he loves it. Like many others in the same era, he immigrated to Canada with his family when he was at a young age. Grew up in Richmond, he attended UBC for his Bachelor of Science with distinction. He went on to work for Health Canada in Ottawa where his interest in law was sparked.\nDavid worked at the Office of Legislative and Regulatory Modernization in Health Canada where he was reading existing and proposed legislations daily. The work was fascinating and he was set on delving deeper into the legal profession. Fast tracking a few years, David started his law school at the University of Victoria and later completed his Juris Doctor degree with the University of Ottawa. He articled with a prominent mid-size boutique firm in Ottawa and was called to the Ontario bar before returning to his home province to practice. \nDavid is tremendously proud to be serving the communities in the Lower Mainland and Okanagan. During his spare time, if any at all, he can be found hiking and camping at different parks and lakes in the province." },
    { id: 3, name: "Brent Desruisseaux", image: "/members/3. Brent Desruisseaux.jpg", title: "Barrister & Solicitor", description: "Brent Desruisseaux received his law degree from the University of Alberta in 2014. As a student, he volunteered his time with student legal services and the Edmonton Community Legal Centre providing pro bono legal services. Brent has maintained a general litigation practice following his admission to the Law Society of British Columbia in 2015 – he has successfully represented clients on a variety of civil, family, and criminal law matters. Brent understands that court can be an intimidating prospect for many clients and seeks to put them at ease by carefully explaining their rights and the range of possible outcomes. He finds immense personal and professional satisfaction protecting his clients' interests and helping them navigate the justice system. Although he believes his clients are usually best served by negotiating a fair settlement, there are times when it is necessary to forcefully advocate in the courtroom. In his free time, Brent enjoys gardening and exploring the great outdoors with his family." },
    { id: 4, name: "Abiel Kwok", image: "/members/ava.jpg", title: "Barrister & Solicitor", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { id: 5, name: "Corey Poon", image: "/members/4. Corey Poon.jpg", title: "Barrister & Solicitor", description: "Corey earned his Bachelor of Arts in Philosophy at the University of British Columbia. In 2021, Corey completed his Juris Doctor (Law) at Thompson Rivers University where he was a founding member of the Criminal Law Club. In his spare time, Corey enjoys busking and volunteering in the community. Corey has served as a summer clinician at the Law Students' Legal Advice Program representing low-income clients as well as volunteering at George Pearson Centre for the elderly." },
    { id: 6, name: "Howard Qu", image: "/members/5. Howard Qu.jpg", title: "Barrister & Solicitor", description: "Howard advised clients on a broad range of matters related to multiple levels of courts and tribunals. He engaged in contract, corporate, tenancy, estate, family, property, tort, and other areas of law. Howard graduated from the University of Windsor with a Juris Doctor Degree. Howard is fluent in English and Mandarin." },
    { id: 7, name: "Freja Li", image: "/members/6. Freja Li.jpg", title: "Barrister & Solicitor", description: "Prior to joining the Avid Law, Freja was an officer of a private equity management corporation in Vancouver. Freja completed her Master Degree of Laws at McGill University in 2020. Before that, she obtained a Bachelor Degree of Laws in China and interned as a legal assistant of the Executive Director of All China Lawyers Association. The previous educational and work experience enabled her to develop a good understanding of the laws of those two countries and expanded her ability to prioritize and manage multiple tasks under pressure." },
    { id: 8, name: "Nicole Tam", image: "/members/ava.jpg", title: "Barrister & Solicitor", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { id: 9, name: "Olivia Nicolaides", image: "/members/ava.jpg", title: "Barrister & Solicitor", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { id: 10, name: "Rachel Li", image: "/members/7. Rachel Li.jpg", title: "Barrister & Solicitor", description: "Rachel was born and raised in mainland China. After graduating from one of the top journalism schools in China, she pursued a master's degree in international journalism studies in Hong Kong. Her career started in Hong Kong as a journalist and editor for the national leading news agency in its Asian pacific bureau. Prior to attending law school, Rachel worked as a policy researcher in the Hong Kong legislator's office where she has accumulated extensive experience in public policy and legislation's scrutiny. Rachel is proficient in Mandarin, English, and Cantonese." },
    { id: 11, name: "Farrah Yang", image: "/members/8. Farrah Yang.jpg", title: "Paralegal", description: "Farrah has a Paralegal Certificate with a focus on Family Law and 10 years of experience as an legal assistant in the areas of family law, corporate law, civil litigation and conveyance." },
    { id: 12, name: "Ashley Wong", image: "/members/11. Ashley Wong.jpg", title: "Legal Assistant", description: "Ashley graduated from Birmingham City University in Business Administration, she also has a Diploma in Legal Studies (Professional Stream) from Hong Kong University School of Professional and Continuing Education, she speaks Cantonese, Mandarin and English." },
    { id: 13, name: "Jeannie Lee", image: "/members/10. Jeannie Lee.jpg", title: "Legal Assistant", description: "Jeannie is mainly responsible for the real estate conveyance; she speaks both English and Korean." },
    { id: 14, name: "Sarah Yan", image: "/members/ava.jpg", title: "Legal Assistant", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { id: 15, name: "Stella Li", image: "/members/12. Stella Li.jpg", title: "Legal Assistant", description: "Stella graduated from Simon Fraser University, in her spare time, she likes to travel." },
    { id: 16, name: "Sunny Zhang", image: "/members/9. Sunny Zhang.jpg", title: "Legal Assistant", description: "Sunny is responsible for the front desk." },
    { id: 17, name: "Diana Gao", image: "/members/ava.jpg", title: "Accountant", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { id: 18, name: "Lynn", image: "/members/ava.jpg", title: "OIC", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { id: 19, name: "Richard Zhu", image: "/members/ava.jpg", title: "IT Assistant", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
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

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* NavBar */}
      <NavBar />
      
      {/* Hero Section */}
      <section className="relative h-[100vh] flex items-center justify-center">
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
            Our Team
            <div className="h-[3px] w-[120px] bg-[#FFC107] mx-auto mt-8"></div>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Meet the dedicated professionals who make our firm exceptional
          </p>
          
          <button
            onClick={() => {
              const teamSection = document.getElementById('team-grid');
              if (teamSection) {
                const yOffset = -100; // Offset for navbar height
                const y = teamSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({
                  top: y,
                  behavior: 'smooth'
                });
              }
            }}
            className="group relative mt-8 inline-flex items-center gap-2 rounded-md bg-transparent px-8 py-3 font-semibold text-white border-2 border-[#FFC107] transition-all duration-300 hover:bg-[#FFC107] focus:outline-none"
          >
            EXPLORE
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
      </section>

      {/* Team Members Grid */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {teamMembers.slice(0, 10).map((member) => (
              <div
                key={member.id}
                className="group relative bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl mx-auto max-w-[260px] w-full"
              >
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={260}
                    height={260}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-3 text-center">
                  <h3 className="font-semibold text-gray-900 text-base">{member.name}</h3>
                  <p className="text-xs text-gray-600">{member.title}</p>
                </div>
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <button
                    onClick={() => handleMemberClick(member)}
                    className="group relative inline-flex items-center gap-2 rounded-md bg-transparent px-5 py-2 font-semibold text-white border-2 border-[#FFC107] transition-all duration-300 hover:bg-[#FFC107] focus:outline-none text-sm"
                  >
                    View Profile
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
            ))}
          </div>
          
          {/* Separator */}
          <div className="my-16">
            <div className="h-[2px] w-full bg-gray-500"></div>
          </div>
          
          {/* Support Staff */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {teamMembers.slice(10).map((member) => (
              <div
                key={member.id}
                className="group relative bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl mx-auto max-w-[260px] w-full"
              >
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={260}
                    height={260}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-3 text-center">
                  <h3 className="font-semibold text-gray-900 text-base">{member.name}</h3>
                  <p className="text-xs text-gray-600">{member.title}</p>
                </div>
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <button
                    onClick={() => handleMemberClick(member)}
                    className="group relative inline-flex items-center gap-2 rounded-md bg-transparent px-5 py-2 font-semibold text-white border-2 border-[#FFC107] transition-all duration-300 hover:bg-[#FFC107] focus:outline-none text-sm"
                  >
                    View Profile
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
            ))}
          </div>
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
          <h2 className="text-4xl md:text-4xl font-bold text-[#FFC107] mb-8">Not sure which lawyer is right for you?</h2>
          <div className="h-[3px] w-[120px] bg-[#FFC107] mx-auto mb-12"></div>
          <p className="text-xl text-white leading-relaxed mb-16 max-w-2xl mx-auto">
            Let Eve, our AI assistant, guide you to the best-suited lawyer based on your specific legal needs and circumstances.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center mt-8">
            <button
              // onClick={() => { alert("Chat with Eve feature will be implemented soon."); }} // OLD
              onClick={openChatbot} // <--- NEW: Call the function
              className="group relative inline-flex items-center justify-center gap-2 rounded-md bg-[#FFC107] px-8 py-4 font-semibold text-gray-900 transition-all duration-300 hover:bg-[#ffcb38] focus:outline-none"
            >
              Chat with Eve
              {/* ... svg ... */}
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
                    <div className="relative w-[300px] h-[300px] overflow-hidden rounded-lg shadow-lg">
                      <Image
                        src={selectedMember.image}
                        alt={selectedMember.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col text-left">
                    <h2 className="text-3xl font-bold text-white mb-3">{selectedMember.name}</h2>
                    <div className="h-[3px] w-[80px] bg-[#FFC107] mb-6"></div>
                    <p className="text-[#FFC107] font-medium text-xl mb-8">{selectedMember.title}</p>
                    <div className="prose prose-lg prose-invert text-gray-300 max-w-none space-y-4 mb-8">
                      <p>{selectedMember.description}</p>
                    </div>
                    
                    {selectedMember.title === "Barrister & Solicitor" && (
                    <button
                      onClick={(e: MouseEvent<HTMLButtonElement>) => { // Add type to event
                        e.stopPropagation(); // Keep this to prevent modal closing
                        // alert("Booking functionality will be implemented soon."); // Remove alert
                        openChatbot(); // <-- Call the function here
                      }}
                      className="group relative inline-flex items-center gap-2 rounded-md bg-transparent px-6 py-3 font-semibold text-white border-2 border-[#FFC107] transition-all duration-300 hover:bg-[#FFC107] focus:outline-none self-start"
                    >
                      Book Appointment
                      {/* ... svg ... */}
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
                    )}
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