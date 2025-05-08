"use client";

import React, { useEffect, useRef, MouseEvent } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NavBar from './NavBar'; // Adjust path if needed
import { useTranslation } from '@/context/TranslationContext';
import Link from 'next/link';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const { t, locale } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<HTMLDivElement[]>([]); // Populated by addToRefs or querySelectorAll

  // Refs for GSAP instances for proper management and cleanup
  const masterTweenRef = useRef<gsap.core.Tween | null>(null);
  const masterScrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const panelTimelinesRef = useRef<gsap.core.Timeline[]>([]);

  const localePath = (path: string) => {
    if (path.startsWith(`/${locale}`)) return path;
    if (path.startsWith('/')) {
      return locale === 'en' ? path : `/${locale}${path}`;
    }
    return path;
  };

  useEffect(() => {
    if (typeof window === 'undefined' || !gsap || !ScrollTrigger) {
      console.error("GSAP or ScrollTrigger not loaded or running in SSR");
      return;
    }
    // It's okay to register again, GSAP handles it.
    // gsap.registerPlugin(ScrollTrigger);

    const containerElement = containerRef.current;
    // Use querySelectorAll for initial setup within useEffect to ensure all panels are caught
    // after initial render. addToRefs will also run but this ensures order and completeness for this effect.
    const currentPanels = Array.from(document.querySelectorAll<HTMLDivElement>('.panel'));
    panelRefs.current = currentPanels; // Update the ref with the queried panels

    if (currentPanels.length === 0 || !containerElement) {
        console.warn("GSAP setup: No panels found or container ref not set.");
        return;
    }

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);
    };
    window.addEventListener('resize', handleResize);

    // --- Horizontal Scroll Tween ---
    const masterTween = gsap.to(currentPanels, {
      xPercent: -100 * (currentPanels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerElement,
        pin: true,
        scrub: 0.5,
        end: () => "+=" + containerElement.offsetWidth * (currentPanels.length - 1),
        // onRefresh: (self) => console.log("Master ST refreshed:", self.start, self.end) // For debugging
      }
    });
    masterTweenRef.current = masterTween;
    if (masterTween.scrollTrigger) {
      masterScrollTriggerRef.current = masterTween.scrollTrigger as ScrollTrigger; // Cast if sure it's created
    }

    // --- Animation Settings ---
    const scrubStart = "left right-=100";
    const scrubEnd = "left center-=100";
    const scrubValue = 0.5;

    // --- Panel Animations ---
    panelTimelinesRef.current = []; // Clear before repopulating

    currentPanels.forEach((panel, i) => {
      const heading = panel.querySelector<HTMLElement>('.section-heading');
      const contentElements = panel.querySelectorAll<HTMLElement>('.section-content');
      const content = contentElements.length > 0 ? Array.from(contentElements) : null;
      const divider = panel.querySelector<HTMLElement>('.divider');
      const imageReveal = panel.querySelector<HTMLElement>('.image-reveal-overlay');
      const buttons = panel.querySelectorAll<HTMLAnchorElement | HTMLButtonElement>('a, button');

      
if (i === 0) { // Panel 0: About Avid Law (Animate on Load)
  const heading = panel.querySelector<HTMLElement>('.section-heading');
  // Ensure the divider selector is correct based on your HTML structure.
  // If it's inside the heading, it would be heading.querySelector('.divider')
  // If it's a direct child of the panel, panel.querySelector('.divider') is fine.
  const divider = panel.querySelector<HTMLElement>('.divider');
  const paragraphContent = panel.querySelector<HTMLParagraphElement>('p.section-content');
  const exploreButton = panel.querySelector<HTMLButtonElement>('button');

  // Animations for other elements in Panel 0 (delays for context):
  if (heading) {
      gsap.from(heading, { y: 50, opacity: 0, duration: 0.6, delay: 0.3, ease: "power3.out" });
  }
  if (divider) {
      gsap.set(divider, { width: 0, opacity: 0 });
      gsap.to(divider, { width: "120px", opacity: 1, duration: 0.8, delay: 0.5, ease: "power2.out" });
  }
  if (paragraphContent) {
      gsap.from(paragraphContent, { y: 70, opacity: 0, duration: 0.8, delay: 0.7, ease: "power2.out" });
  }

  // Animation for the Explore button
  if (exploreButton) {
      gsap.set(exploreButton, { y: 50, opacity: 0 }); // Initial state
      gsap.to(exploreButton, {
          y: 0,
          opacity: 1,
          duration: 0.7, // Duration of the button's own animation
          delay: 0.75,   // << REVISED DELAY (was 0.9s)
          ease: "power2.out"
      });
  }
} else { // Panels with Scrubbed Animations (Indices 1 through 5)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            containerAnimation: masterTween,
            start: scrubStart,
            end: scrubEnd,
            scrub: scrubValue,
            toggleActions: "play pause resume reverse"
          }
        });
        panelTimelinesRef.current.push(tl); // Store timeline for cleanup

        if (imageReveal) tl.to(imageReveal, { scaleX: 0, opacity: 0, duration: 1.0, ease: "power1.inOut" });
        if (heading) {
          tl.fromTo(heading,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
            imageReveal ? ">-0.6" : "<"
          );
        }
        if (divider && i === 5) { // Divider only in panel 5 (index 5)
          gsap.set(divider, { width: 0, opacity: 0 });
          tl.to(divider, { width: "120px", opacity: 1, duration: 0.6, ease: "power2.out" }, "<0.1");
        }
        if (content) {
          const paragraphs = Array.from(content).filter(el => el.tagName === 'P');
          if (paragraphs.length > 0) {
            tl.fromTo(paragraphs,
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.1 },
              "<0.1"
            );
          }
        }
        if (buttons && buttons.length > 0 && i === 5) { // Buttons only in panel 5 (index 5)
          const actionButtons = Array.from(buttons).filter(btn => btn.closest('.flex.gap-6'));
          if (actionButtons.length > 0) {
            tl.fromTo(actionButtons,
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.1 },
              ">-0.3"
            );
          }
        }
      }
    });

    // --- Cleanup ---
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);

      // Kill panel timelines and their ScrollTriggers
      panelTimelinesRef.current.forEach(tl => tl.kill());
      panelTimelinesRef.current = [];

      // Kill the master tween and its ScrollTrigger
      if (masterScrollTriggerRef.current) {
        masterScrollTriggerRef.current.kill();
        masterScrollTriggerRef.current = null;
      }
      if (masterTweenRef.current) {
        masterTweenRef.current.kill();
        masterTweenRef.current = null;
      }

      // Kill tweens for Panel 0 elements explicitly if needed, though clearProps might be enough
      if (currentPanels[0]) {
          const panel0Elements = currentPanels[0].querySelectorAll('.section-heading, p.section-content, .divider, button');
          gsap.killTweensOf(Array.from(panel0Elements));
      }
      // For other panels, tweens are part of timelines which are killed above.

      // Clear GSAP inline styles
      gsap.set(currentPanels, { clearProps: "transform" });
      const allAnimatedElements = currentPanels.flatMap(p =>
        Array.from(p.querySelectorAll('.section-heading, .section-content, .divider, a, button, .image-reveal-overlay'))
      );
      gsap.set(allAnimatedElements, { clearProps: "opacity,transform,width" });
      console.log("GSAP Cleanup Ran (Refactored)");
    };
  }, [locale]); // Add locale to dependencies if t() output changes structure/content that affects GSAP targets/layout significantly on locale change
                // If translations only change text content but not element existence or gross layout, [] might still be okay.
                // However, if panel content height changes drastically with locale, ScrollTrigger.refresh() might be needed.
                // For safety and to re-run animations if translated content appears differently, include locale.

  const navigateToPanel = (index: number) => {
    const currentMasterScrollTrigger = masterScrollTriggerRef.current;
    const currentContainer = containerRef.current;
    const numPanels = panelRefs.current.length; // Use the ref that's consistently populated

    if (!currentMasterScrollTrigger || !currentContainer || numPanels === 0) {
      console.error("Cannot navigate: GSAP master ScrollTrigger, container, or panels not ready.", { currentMasterScrollTrigger, currentContainer, numPanels });
      return;
    }
    if (index < 0 || index >= numPanels) {
      console.error(`Cannot navigate: Index ${index} is out of bounds for ${numPanels} panels.`);
      return;
    }

    const targetScroll = currentMasterScrollTrigger.start +
      ((currentMasterScrollTrigger.end - currentMasterScrollTrigger.start) * (index / (numPanels - 1 || 1)));
      // (numPanels - 1 || 1) to prevent division by zero if only one panel (though UI implies more)

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  const addToRefs = (el: HTMLDivElement | null) => {
    // This function helps collect panel DOM elements if you weren't using querySelectorAll in useEffect.
    // With the current useEffect using querySelectorAll('.panel'), this specific panelRefs.current population
    // for the GSAP setup is handled there. This can still be useful for other purposes or if you change strategy.
    if (el && !panelRefs.current.find(refEl => refEl === el)) { // Avoid duplicates if called multiple times
      // panelRefs.current.push(el); // If you want this to be the primary source.
                                 // Be mindful of timing relative to useEffect.
    }
  };

  const openChatbot = (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    event.preventDefault();
    const icon = document.getElementById('chatbotIcon');
    const panel = document.getElementById('chatbotPanel');
    if (icon && panel) {
      panel.style.display = 'flex';
      icon.style.display = 'none';
      // It's good practice to type window extensions
      (window as any).ignoreNextOutsideClick = true;
      if ((window as any).chatbotInstance?.focusInput) {
        (window as any).chatbotInstance.focusInput();
      }
      if ((window as any).chatbotInstance?.scrollToBottom) {
        (window as any).chatbotInstance.scrollToBottom(true);
      }
    } else {
      console.error("Chatbot icon or panel element not found.");
    }
  };

  // --- JSX Return ---
  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      <NavBar />
      <div ref={containerRef} className="horizontal-scroll-container relative h-screen w-screen overflow-hidden"> {/* Added relative for potential absolute children if any */}
        <div className="panels-container flex h-full w-max"> {/* w-max ensures it's wide enough for all panels */}

          {/* Section 1: About Avid Law */}
          {/* Ensure `addToRefs` is used if you rely on it for panelRefs.current population for GSAP */}
          <div className="panel w-screen h-screen flex-shrink-0 relative flex flex-col items-center justify-start pt-32 pb-10 md:pt-0 md:justify-center overflow-y-auto md:overflow-hidden" ref={addToRefs}>
            <div className="absolute inset-0 z-0">
              <Image src="/sideBG.png" alt="Background" fill style={{ objectFit: 'cover' }} priority /> {/* Explicit style objectFit */}
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
            <div className="relative z-10 max-w-4xl w-full mx-auto px-6 md:px-8 text-center pb-10 md:pb-0"> {/* Consider reducing pb-10 on mobile if content overflows too much */}
              <h1 className="section-heading text-4xl md:text-5xl font-bold uppercase text-white mb-6 md:mb-8 mt-4 md:mt-12">
                {t('about.sectionTitle')}
                <div className="divider h-[3px] w-[100px] md:w-[120px] bg-[#FFC107] mx-auto mt-6 md:mt-8"></div>
              </h1>
              <p className="section-content text-base md:text-l text-gray-300 max-w-3xl mx-auto mb-8 md:mb-12">
                {t('about.sectionText')}
              </p>
              <button
                onClick={() => navigateToPanel(1)}
                className="group relative mt-6 inline-flex items-center gap-2 rounded-md bg-transparent px-8 py-3 font-semibold text-white border-2 border-[#FFC107] transition-all duration-300 hover:bg-[#FFC107] hover:text-black focus:outline-none"
              >
                {t('exploreButton.explore')}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Section 2: Our History */}
          <div className="panel w-screen h-screen flex-shrink-0 relative flex flex-col items-center justify-start pt-24 pb-10 md:pt-0 md:justify-center overflow-y-auto md:overflow-hidden" ref={addToRefs}>
            <div className="absolute inset-0 z-0">
              <Image src="/sideBG.png" alt="Background" fill style={{ objectFit: 'cover', opacity: 1 }} /> {/* Explicit opacity */}
              <div className="absolute inset-0 bg-black/25"></div>
            </div>
            <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center gap-8 md:gap-16 pb-10 md:pb-0">
              <div className="w-full md:w-1/2 relative overflow-hidden shadow-2xl rounded-xl">
                <div className="relative h-[300px] md:h-[450px] w-full">
                  <Image src="/about1.jpg" alt={t('about.historyTag')} fill style={{ objectFit: 'cover', objectPosition: 'center md:top' }} className="brightness-90" /> {/* Adjusted brightness to avoid full black, objectPosition from class */}
                  <div className="absolute top-0 left-0 w-full h-full bg-black/80 image-reveal-overlay" style={{ pointerEvents: 'none', transformOrigin: 'right', transform: 'scaleX(1)' }}></div>
                </div>
              </div>
              <div className="w-full md:w-1/2 text-center md:text-left md:pl-6">
                <h2 className="section-heading text-3xl md:text-5xl font-bold text-[#FFC107] mb-6 md:mb-12 ">{t('about.historyTag')}</h2>
                <p className="section-content text-base md:text-l text-white leading-relaxed">
                  {t('about.historyText')}
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Our Expertise */}
          <div className="panel w-screen h-screen flex-shrink-0 relative flex flex-col items-center justify-start pt-24 pb-10 md:pt-0 md:justify-center overflow-y-auto md:overflow-hidden" ref={addToRefs}>
            <div className="absolute inset-0 z-0">
                <Image src="/sideBG.png" alt="Background" fill style={{ objectFit: 'cover', opacity: 0.7 }} /> {/* Explicit opacity */}
                <div className="absolute inset-0 bg-black/40"></div>
            </div>
            <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-8 flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16 pb-10 md:pb-0">
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <h2 className="section-heading text-3xl md:text-5xl font-bold text-[#FFC107] mb-6 md:mb-12">{t('about.expertiseTag')}</h2>
                    <p className="section-content text-base md:text-l text-white leading-relaxed">
                        {t('about.expertiseText')}
                    </p>
                </div>
                <div className="w-full md:w-1/2 relative overflow-hidden shadow-2xl rounded-lg">
                    <div className="relative h-[300px] md:h-[450px] w-full">
                        <Image src="/about2.jpg" alt={t('about.expertiseTag')} fill style={{ objectFit: 'cover' }}/>
                        <div className="absolute top-0 left-0 w-full h-full bg-black/80 image-reveal-overlay" style={{ pointerEvents: 'none', transformOrigin: 'right', transform: 'scaleX(1)' }}></div>
                    </div>
                </div>
            </div>
          </div>

          {/* Section 4: Litigation Services */}
          <div className="panel w-screen h-screen flex-shrink-0 relative flex flex-col items-center justify-start pt-24 pb-10 md:pt-0 md:justify-center overflow-y-auto md:overflow-hidden" ref={addToRefs}>
            <div className="absolute inset-0 z-0">
                <Image src="/sideBG.png" alt="Background" fill style={{ objectFit: 'cover', opacity: 0.85 }} /> {/* Explicit opacity */}
                <div className="absolute inset-0 bg-black/35"></div>
            </div>
            <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center gap-8 md:gap-16 lg:gap-24 pb-10 md:pb-0">
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <h2 className="section-heading text-3xl md:text-5xl font-bold text-[#FFC107] mb-6 md:mb-12">{t('about.serviceTag')}</h2>
                    <p className="section-content text-base md:text-l text-white leading-relaxed mb-4 md:mb-8">
                        {t('about.serviceText1')}
                    </p>
                    <p className="section-content text-base md:text-l text-white leading-relaxed">
                        {t('about.serviceText2')}
                    </p>
                </div>
                <div className="w-full md:w-1/2 relative overflow-hidden shadow-2xl rounded-lg">
                    <div className="relative h-[350px] md:h-[600px] w-full"> {/* Note: md:h-[600px] is quite tall */}
                        <Image src="/about3.png" alt={t('about.serviceTag')} fill style={{ objectFit: 'cover' }} />
                        <div className="absolute top-0 left-0 w-full h-full bg-black/80 image-reveal-overlay" style={{ pointerEvents: 'none', transformOrigin: 'right', transform: 'scaleX(1)' }}></div>
                    </div>
                </div>
            </div>
          </div>

          {/* Section 5: Solicitor Services */}
          <div className="panel w-screen h-screen flex-shrink-0 relative flex flex-col items-center justify-start pt-24 pb-10 md:pt-0 md:justify-center overflow-y-auto md:overflow-hidden" ref={addToRefs}>
            <div className="absolute inset-0 z-0">
                <Image src="/sideBG.png" alt="Background" fill style={{ objectFit: 'cover', opacity: 0.75 }} /> {/* Explicit opacity */}
                <div className="absolute inset-0 bg-black/35"></div>
            </div>
            <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-8 flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16 pb-10 md:pb-0">
                <div className="w-full md:w-1/2 relative overflow-hidden shadow-2xl rounded-lg">
                    <div className="relative h-[300px] md:h-[450px] w-full">
                        <Image src="/about4.png" alt={t('about.solicitorTag')} fill style={{ objectFit: 'cover' }} />
                        <div className="absolute top-0 left-0 w-full h-full bg-black/80 image-reveal-overlay" style={{ pointerEvents: 'none', transformOrigin: 'right', transform: 'scaleX(1)' }}></div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 text-center md:text-left md:pl-6">
                    <h2 className="section-heading text-3xl md:text-5xl font-bold text-[#FFC107] mb-6 md:mb-12">{t('about.solicitorTag')}</h2>
                    <p className="section-content text-base md:text-l text-white leading-relaxed mb-4 md:mb-8">
                        {t('about.solicitorText1')}
                    </p>
                    <p className="section-content text-base md:text-l text-white leading-relaxed">
                        {t('about.solicitorText2')}
                    </p>
                </div>
            </div>
          </div>

          {/* Section 6: Want to Dive Deeper? */}
          <div className="panel w-screen h-screen flex-shrink-0 relative flex flex-col items-center justify-start pt-24 md:pt-0 md:justify-center overflow-y-auto md:overflow-hidden" ref={addToRefs}>
            <div className="absolute inset-0 z-0">
                <Image src="/sideBG.png" alt="Background" fill style={{ objectFit: 'cover', opacity: 0.6 }} /> {/* Explicit opacity */}
                <div className="absolute inset-0 bg-black/40"></div>
            </div>
            <div className="relative z-10 max-w-4xl w-full mx-auto px-6 md:px-8 text-center pb-10 md:pb-0">
                <h2 className="section-heading text-4xl md:text-5xl font-bold text-[#FFC107] mb-6 md:mb-8">{t('about.eveTitle')}</h2>
                <div className="divider h-[3px] w-[100px] md:w-[120px] bg-[#FFC107] mx-auto mb-8 md:mb-12"></div>
                <p className="section-content text-lg md:text-xl text-white leading-relaxed mb-10 md:mb-16 max-w-2xl mx-auto">
                    {t('about.eveText')}
                </p>
                <div className="flex flex-col md:flex-row gap-6 justify-center mt-8">
                    <Link
                        href={localePath("/team")}
                        className="group relative inline-flex items-center justify-center gap-2 rounded-md bg-transparent px-8 py-4 font-semibold text-white border-2 border-[#FFC107] transition-all duration-300 hover:bg-[#FFC107] hover:text-black focus:outline-none"
                    >
                        {t('about.eveButton')}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                    <a
                        onClick={openChatbot}
                        role="button"
                        tabIndex={0} // for accessibility if it's not a native button
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openChatbot(e as any); }} // for accessibility
                        className="group relative inline-flex items-center justify-center gap-2 rounded-md bg-[#FFC107] px-8 py-4 font-semibold text-gray-900 transition-all duration-300 hover:bg-[#ffcb38] focus:outline-none cursor-pointer"
                    >
                        {t('eve.chatButton')}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                    </a>
                </div>
            </div>
          </div>

        </div> {/* End panels-container */}
      </div> {/* End horizontal-scroll-container */}
    </div> // End min-h-screen
  );
}