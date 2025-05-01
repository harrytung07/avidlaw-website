"use client";

import React, { useEffect, useRef, MouseEvent } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NavBar from './NavBar';
import { useTranslation } from '@/context/TranslationContext';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const { t } = useTranslation();
  const sectionRefs = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Skip in SSR
    if (typeof window === 'undefined') return;

    // Reset refs array
    sectionRefs.current = [];
    panelRefs.current = [];

    const panels = document.querySelectorAll('.panel');
    panels.forEach(panel => panelRefs.current.push(panel as HTMLDivElement));

    // Setup horizontal scroll
    const tween = gsap.to(panelRefs.current, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        end: () => "+=" + containerRef.current!.offsetWidth * (panels.length - 1)
      }
    });

    // Setup animations for each section
    panelRefs.current.forEach((panel, i) => {
      const heading = panel.querySelector('.section-heading');
      const content = panel.querySelector('.section-content');
      const divider = panel.querySelector('.divider');

      // Add image reveal animation for the history section (second panel)
      if (i === 1) {
        const imageReveal = panel.querySelector('.image-reveal-overlay');
        const historyHeading = panel.querySelector('.section-heading');
        const historyContent = panel.querySelector('.section-content');
        
        // Create a timeline for sequenced animations
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            containerAnimation: tween,
            start: "left-=200 center",
            end: "left+=600 center",
            scrub: 2,
            toggleActions: "play none none reverse"
          }
        });
        
        // First animation: image reveal
        if (imageReveal) {
          tl.to(imageReveal, { 
            scaleX: 0,
            opacity: 0,
            duration: 3.5,
            ease: "power1.inOut"
          });
        }
        
        // Second animation: text appears
        if (historyContent) {
          tl.fromTo(historyContent, 
            { y: 70, opacity: 0 },
            { 
              y: 0, 
              opacity: 1,
              duration: 2,
              ease: "power2.out"
            },
            ">=0"  // Start after previous animation
          );
        }
        
        // Third animation: title appears (faster than text)
        if (historyHeading) {
          tl.fromTo(historyHeading, 
            { y: 50, opacity: 0 },
            { 
              y: 0, 
              opacity: 1,
              duration: 1.5,
              ease: "power3.out"
            },
            "<0.2"  // Start 0.2 seconds after the text animation starts
          );
        }
      }
      // Animation for expertise section (third panel)
      else if (i === 2) {
        const imageReveal = panel.querySelector('.image-reveal-overlay');
        const expertiseHeading = panel.querySelector('.section-heading');
        const expertiseContent = panel.querySelector('.section-content');
        
        // Create a timeline for sequenced animations
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            containerAnimation: tween,
            start: "left-=100 center",
            end: "left+=700 center",
            scrub: 2,
            toggleActions: "play none none reverse"
          }
        });
        
        // First animation: image reveal
        if (imageReveal) {
          tl.to(imageReveal, { 
            scaleX: 0,
            opacity: 0,
            duration: 3.5,
            ease: "power1.inOut"
          });
        }
        
        // Second animation: text appears
        if (expertiseContent) {
          tl.fromTo(expertiseContent, 
            { y: 70, opacity: 0 },
            { 
              y: 0, 
              opacity: 1,
              duration: 2,
              ease: "power2.out"
            },
            ">=0"  // Start after previous animation
          );
        }
        
        // Third animation: title appears (faster than text)
        if (expertiseHeading) {
          tl.fromTo(expertiseHeading, 
            { y: 50, opacity: 0 },
            { 
              y: 0, 
              opacity: 1,
              duration: 1.5,
              ease: "power3.out"
            },
            "<0.2"  // Start 0.2 seconds after the text animation starts
          );
        }
      }
      // Animation for litigation services section (fourth panel)
      else if (i === 3) {
        const imageReveal = panel.querySelector('.image-reveal-overlay');
        const litigationHeading = panel.querySelector('.section-heading');
        const litigationContent = panel.querySelectorAll('.section-content');
        
        // Create a timeline for sequenced animations
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            containerAnimation: tween,
            start: "left-=100 center",
            end: "left+=700 center",
            scrub: 2,
            toggleActions: "play none none reverse"
          }
        });
        
        // First animation: image reveal
        if (imageReveal) {
          tl.to(imageReveal, { 
            scaleX: 0,
            opacity: 0,
            duration: 3.5,
            ease: "power1.inOut"
          });
        }
        
        // Second animation: text appears
        if (litigationContent && litigationContent.length > 0) {
          tl.fromTo(litigationContent, 
            { y: 70, opacity: 0 },
            { 
              y: 0, 
              opacity: 1,
              duration: 2,
              ease: "power2.out",
              stagger: 0.2
            },
            ">=0"  // Start after previous animation
          );
        }
        
        // Third animation: title appears (faster than text)
        if (litigationHeading) {
          tl.fromTo(litigationHeading, 
            { y: 50, opacity: 0 },
            { 
              y: 0, 
              opacity: 1,
              duration: 1.5,
              ease: "power3.out"
            },
            "<0.2"  // Start 0.2 seconds after the text animation starts
          );
        }
      }
      // Animation for solicitor services section (fifth panel)
      else if (i === 4) {
        const imageReveal = panel.querySelector('.image-reveal-overlay');
        const solicitorHeading = panel.querySelector('.section-heading');
        const solicitorContent = panel.querySelectorAll('.section-content');
        
        // Create a timeline for sequenced animations
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            containerAnimation: tween,
            start: "left-=100 center",
            end: "left+=700 center",
            scrub: 2,
            toggleActions: "play none none reverse"
          }
        });
        
        // First animation: image reveal
        if (imageReveal) {
          tl.to(imageReveal, { 
            scaleX: 0,
            opacity: 0,
            duration: 3.5,
            ease: "power1.inOut"
          });
        }
        
        // Second animation: text appears
        if (solicitorContent && solicitorContent.length > 0) {
          tl.fromTo(solicitorContent, 
            { y: 70, opacity: 0 },
            { 
              y: 0, 
              opacity: 1,
              duration: 2,
              ease: "power2.out",
              stagger: 0.2
            },
            ">=0"  // Start after previous animation
          );
        }
        
        // Third animation: title appears (faster than text)
        if (solicitorHeading) {
          tl.fromTo(solicitorHeading, 
            { y: 50, opacity: 0 },
            { 
              y: 0, 
              opacity: 1,
              duration: 1.5,
              ease: "power3.out"
            },
            "<0.2"  // Start 0.2 seconds after the text animation starts
          );
        }
      }
      // Animation for "Want to Dive Deeper?" section (sixth panel)
      else if (i === 5) {
        const diveHeading = panel.querySelector('.section-heading');
        const diveContent = panel.querySelector('.section-content');
        const diveDivider = panel.querySelector('.divider');
        const buttons = panel.querySelectorAll('a');
        
        // Create a timeline for sequenced animations
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            containerAnimation: tween,
            start: "left-=100 center",
            end: "left+=450 center",
            scrub: 0.3,
            toggleActions: "play complete none reverse"
          }
        });
        
        // Add buttons to timeline first but with immediate appearance
        if (buttons && buttons.length > 0) {
          tl.fromTo(buttons, 
            { opacity: 0 },
            { 
              opacity: 1,
              duration: 0.2,
              ease: "none"
            }
          );
        }
        
        // First animation: title appears
        if (diveHeading) {
          tl.fromTo(diveHeading, 
            { y: -50, opacity: 0 },
            { 
              y: 0, 
              opacity: 1,
              duration: 0.6,
              ease: "power3.out"
            },
            "<" // Start at the same time as previous animation
          );
        }
        
        // Second animation: divider appears
        if (diveDivider) {
          tl.fromTo(diveDivider, 
            { width: 0, opacity: 0 },
            { 
              width: "120px", 
              opacity: 1,
              duration: 0.6,
              ease: "power2.out"
            }
          );
        }
        
        // Third animation: text appears
        if (diveContent) {
          tl.fromTo(diveContent, 
            { y: 50, opacity: 0 },
            { 
              y: 0, 
              opacity: 1,
              duration: 0.7,
              ease: "power2.out"
            }
          );
        }
      }
      // Regular animations for other panels
      else {
        if (heading) {
          gsap.from(heading, { 
            y: 50, 
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: "left center",
              toggleActions: "play none none reverse"
            }
          });
        }

        if (divider) {
          gsap.from(divider, { 
            width: 0, 
            duration: 1,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: "left center",
              toggleActions: "play none none reverse"
            }
          });
        }

        if (content) {
          gsap.from(content, { 
            y: 70, 
            opacity: 0,
            duration: 1,
            delay: 0.3,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: "left center",
              toggleActions: "play none none reverse"
            }
          });
        }
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Function to navigate to a specific panel
  const navigateToPanel = (index: number) => {
    if (index < 0 || index >= panelRefs.current.length) return;
    
    // Using window.scrollTo to precisely control scroll position
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPerPanel = totalScroll / (panelRefs.current.length - 1);
    
      window.scrollTo({
      top: index * scrollPerPanel,
        behavior: 'smooth'
      });
  };

  // Add section to refs
  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };
   // --- Add the function to open the chatbot (copied from LawFirmLanding) ---
   const openChatbot = (event: MouseEvent<HTMLAnchorElement>) => { // Use HTMLAnchorElement if attaching to <a>
    const icon = document.getElementById('chatbotIcon');
    const panel = document.getElementById('chatbotPanel');

    if (icon && panel) {
      console.log("Opening chatbot panel directly via button click (About Page).");
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
    // Prevent default anchor tag navigation if needed (though we removed href)
    event.preventDefault();
  };
  // --- End function ---

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Nav Bar */}
      <NavBar />
      
      {/* Horizontal scroll container */}
      <div 
        ref={containerRef} 
        className="horizontal-scroll-container h-screen w-screen overflow-hidden"
      >
        <div className="panels-container flex h-full">
          {/* Section 1: About Avid Law */}
          <div className="panel w-screen h-screen flex-shrink-0 relative flex items-center justify-center" ref={addToRefs}>
        <div className="absolute inset-0 z-0">
          <Image 
                src="/sideBG.png" 
            alt="Background" 
            fill 
            className="object-cover" 
            priority
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
            <div className="relative z-10 max-w-4xl mx-auto px-8 text-center pt-20">
              <h1 className="text-5xl font-bold uppercase text-white mb-8 mt-12">
                {t('about.sectionTitle')}
                <div className="h-[3px] w-[120px] bg-[#FFC107] mx-auto mt-8"></div>
              </h1>
              <p className="text-l text-gray-300 max-w-3xl mx-auto mb-12">
                {t('about.sectionText')}
              </p>
          
              <button
                onClick={() => {
                  // Scroll to next panel using GSAP
                  const currentPanelIndex = 0; // First panel
                  navigateToPanel(currentPanelIndex + 1);
                }}
                className="group relative mt-6 inline-flex items-center gap-2 rounded-md bg-transparent px-8 py-3 font-semibold text-white border-2 border-[#FFC107] transition-all duration-300 hover:bg-[#FFC107] focus:outline-none"
              >
                {t('exploreButton.explore')}
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
      
          {/* Section 2: Our History */}
          <div className="panel w-screen h-screen flex-shrink-0 relative flex items-center justify-center" ref={addToRefs}>
        <div className="absolute inset-0 z-0">
          <Image 
                src="/sideBG.png" 
            alt="Background" 
            fill 
                className="object-cover opacity-100" 
          />
              <div className="absolute inset-0 bg-black/25"></div>
        </div>
        
            <div className="relative z-10 max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center gap-16">
              {/* Image with reveal effect */}
              <div className="w-full md:w-4/4 relative overflow-hidden shadow-2xl rounded-xl">
                <div className="relative h-[450px] w-full">
                    <Image 
                      src="/about1.jpg"
                    alt={t('about.historyTag')} 
                    fill 
                    className="object-cover object-top brightness-9" 
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-black/80 image-reveal-overlay"
                       style={{ 
                         pointerEvents: 'none',
                         transformOrigin: 'right',
                         transform: 'scaleX(1)'
                       }}>
                  </div>
                </div>
              </div>
              
              {/* Text content */}
              <div className="w-full md:w-1/2 text-left md:pl-6">
                <h2 className="section-heading text-4xl md:text-5xl font-bold text-[#FFC107] mb-12 ">{t('about.historyTag')}</h2>
                <p className="section-content text-l text-white leading-relaxed">
                  {t('about.historyText')}
                </p>
              </div>
            </div>
          </div>
      
          {/* Section 3: Our Expertise */}
          <div className="panel w-screen h-screen flex-shrink-0 relative flex items-center justify-center" ref={addToRefs}>
        <div className="absolute inset-0 z-0">
          <Image 
                src="/sideBG.png" 
            alt="Background" 
            fill 
                className="object-cover opacity-70" 
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
            
            <div className="relative z-10 max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center gap-16">
              {/* Text content - Left */}
              <div className="w-full md:w-1/2 text-left">
                <h2 className="section-heading text-4xl md:text-5xl font-bold text-[#FFC107] mb-12">{t('about.expertiseTag')}</h2>
                <p className="section-content text-l text-white leading-relaxed">
                  {t('about.expertiseText')}
                </p>
        </div>
        
              {/* Image with reveal effect - Right */}
              <div className="w-full md:w-2/3 relative overflow-hidden shadow-2xl rounded-lg">
                <div className="relative h-[450px] w-full">
                    <Image 
                      src="/about2.jpg"
                    alt={t('about.expertiseTag')} 
                      fill
                      className="object-cover"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-black/80 image-reveal-overlay"
                       style={{ 
                         pointerEvents: 'none',
                         transformOrigin: 'right',
                         transform: 'scaleX(1)'
                       }}>
                  </div>
                </div>
              </div>
            </div>
          </div>
      
          {/* Section 4: Litigation Services */}
          <div className="panel w-screen h-screen flex-shrink-0 relative flex items-center justify-center" ref={addToRefs}>
        <div className="absolute inset-0 z-0">
          <Image 
                src="/sideBG.png" 
            alt="Background" 
            fill 
                className="object-cover opacity-85" 
          />
              <div className="absolute inset-0 bg-black/35"></div>
        </div>
        
            <div className="relative z-10 max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center gap-24">
              {/* Text content - Left */}
              <div className="w-full md:w-1/2 text-left">
                <h2 className="section-heading text-4xl md:text-5xl font-bold text-[#FFC107] mb-12">{t('about.serviceTag')}</h2>
                <p className="section-content text-l text-white leading-relaxed mb-8">
                  {t('about.serviceText1')}
                </p>
                <p className="section-content text-l text-white leading-relaxed">
                  {t('about.serviceText2')}
                </p>
              </div>
              
              {/* Image with reveal effect - Right */}
              <div className="w-full md:w-1/2 relative overflow-hidden shadow-2xl rounded-lg">
                <div className="relative h-[800px] w-full">
                  <Image 
                    src="/about3.png" 
                    alt={t('about.serviceTag')} 
                    fill 
                    className="object-cover" 
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-black/80 image-reveal-overlay"
                       style={{ 
                         pointerEvents: 'none',
                         transformOrigin: 'right',
                         transform: 'scaleX(1)'
                       }}>
                  </div>
                </div>
              </div>
            </div>
          </div>
      
          {/* Section 5: Solicitor Services */}
          <div className="panel w-screen h-screen flex-shrink-0 relative flex items-center justify-center" ref={addToRefs}>
        <div className="absolute inset-0 z-0">
          <Image 
                src="/sideBG.png" 
            alt="Background" 
            fill 
                className="object-cover opacity-75" 
          />
              <div className="absolute inset-0 bg-black/35"></div>
        </div>
        
            <div className="relative z-10 max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center gap-16">
              {/* Image with reveal effect - Left */}
              <div className="w-full md:w-1/2 relative overflow-hidden shadow-2xl rounded-lg">
                <div className="relative h-[450px] w-full">
                  <Image 
                    src="/about4.png" 
                    alt={t('about.solicitorTag')} 
                    fill 
                    className="object-cover" 
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-black/80 image-reveal-overlay"
                       style={{ 
                         pointerEvents: 'none',
                         transformOrigin: 'right',
                         transform: 'scaleX(1)'
                       }}>
                  </div>
                </div>
              </div>
              
              {/* Text content - Right */}
              <div className="w-full md:w-1/2 text-left md:pl-6">
                <h2 className="section-heading text-4xl md:text-5xl font-bold text-[#FFC107] mb-12">{t('about.solicitorTag')}</h2>
                <p className="section-content text-l text-white leading-relaxed mb-8">
                  {t('about.solicitorText1')}
                </p>
                <p className="section-content text-l text-white leading-relaxed">
                  {t('about.solicitorText2')}
                </p>
              </div>
            </div>
          </div>
      
          {/* Section 6: Want to Dive Deeper? */}
          <div className="panel w-screen h-screen flex-shrink-0 relative flex items-center justify-center" ref={addToRefs}>
        <div className="absolute inset-0 z-0">
          <Image 
                src="/sideBG.png" 
            alt="Background" 
            fill 
                className="object-cover opacity-60" 
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
            
            <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
              <h2 className="section-heading text-4xl md:text-5xl font-bold text-[#FFC107] mb-8">{t('about.eveTitle')}</h2>
              <div className="divider h-[3px] w-[120px] bg-[#FFC107] mx-auto mb-12"></div>
              <p className="section-content text-xl text-white leading-relaxed mb-16 max-w-2xl mx-auto">
                {t('about.eveText')}
              </p>
              
              <div className="flex flex-col md:flex-row gap-6 justify-center mt-8">
                <a href="/team" className="group relative inline-flex items-center justify-center gap-2 rounded-md bg-transparent px-8 py-4 font-semibold text-white border-2 border-[#FFC107] transition-all duration-300 hover:bg-[#FFC107] focus:outline-none">
                  {t('about.eveButton')}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                
                <a
                  onClick={openChatbot}
                  role="button"
                  className="group relative inline-flex items-center justify-center gap-2 rounded-md bg-[#FFC107] px-8 py-4 font-semibold text-gray-900 transition-all duration-300 hover:bg-[#ffcb38] focus:outline-none cursor-pointer"
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
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 