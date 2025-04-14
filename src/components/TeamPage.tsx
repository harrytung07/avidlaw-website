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
    { id: 1, name: "Adele Sun", image: "/members/1. Adele Sun.jpg", title: "Lawyer", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { id: 2, name: "David Chen", image: "/members/2. David Chen.jpg", title: "Lawyer", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { id: 3, name: "Brent Desruisseaux", image: "/members/3. Brent Desruisseaux.jpg", title: "Lawyer", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { id: 4, name: "Corey Poon", image: "/members/4. Corey Poon.jpg", title: "Lawyer", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { id: 5, name: "Howard Qu", image: "/members/5. Howard Qu.jpg", title: "Lawyer", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { id: 6, name: "Freja Li", image: "/members/6. Freja Li.jpg", title: "Lawyer", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { id: 7, name: "Rachel Li", image: "/members/7. Rachel Li.jpg", title: "Lawyer", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { id: 8, name: "Farrah Yang", image: "/members/8. Farrah Yang.jpg", title: "Legal Assistant", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { id: 9, name: "Sunny Zhang", image: "/members/9. Sunny Zhang.jpg", title: "Legal Assistant", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { id: 10, name: "Jeannie Lee", image: "/members/10. Jeannie Lee.jpg", title: "Legal Assistant", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { id: 11, name: "Ashley Wong", image: "/members/11. Ashley Wong.jpg", title: "Legal Assistant", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { id: 12, name: "Stella Li", image: "/members/12. Stella Li.jpg", title: "Legal Assistant", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
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
                    
                    {selectedMember.title === "Lawyer" && (
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