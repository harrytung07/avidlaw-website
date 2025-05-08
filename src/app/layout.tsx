// src/app/layout.tsx

import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { LanguageProvider } from '@/context/LanguageContext';
import { TranslationProvider } from '@/context/TranslationContext';
import { ModalProvider } from '@/context/ModalContext';

export const metadata: Metadata = {
  title: 'Avid Law - Legal Excellence',
  description: 'Providing exceptional legal services with integrity and professionalism.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Add the link to your chatbot CSS file */}
        <link rel="stylesheet" href="/chatbot/chatbot.css" />
      </head>
      <body>
        <TranslationProvider>
          <LanguageProvider>
            <ModalProvider>
              {children}

              {/* Chatbot icon container - Added Tailwind for positioning */}
              <div
                id="chatbotIcon"
                // Tailwind classes for fixed positioning, z-index, and cursor
                className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-40 cursor-pointer p-2"
                style={{ display: 'none' }} // JS will control this visibility
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48" // Slightly adjusted size for better touch target
                  height="48"
                  viewBox="0 0 24 24"
                  fill="#FFC107" // Avid Law accent yellow
                  // className="drop-shadow-md" // Optional: adds a subtle shadow to the icon
                >
                  <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                </svg>
              </div>

              {/* Chatbot panel container - MODIFIED with Tailwind classes */}
              <div
                id="chatbotPanel"
                // REMOVED: inline style={{ display: 'none' }}
                // ADDED: Tailwind classes for responsive layout and initial hidden state
                className="
                  hidden                      /* Initially hidden; JS toggles display via inline style */
                  fixed inset-0 z-50         /* Mobile: full screen, high z-index */
                  bg-white                   /* Background */
                  flex flex-col              /* For internal layout (header, content, input) */
                  
                  md:top-auto md:left-auto   /* Desktop: Unset top/left from 'inset-0' */
                  md:bottom-6 md:right-6     /* Desktop: Position */
                  md:w-[380px]               /* Desktop: Width */
                  md:max-w-[calc(100vw-48px)]/* Desktop: Max width to prevent overflow */
                  md:h-[70vh]                /* Desktop: Height (viewport relative) */
                  md:max-h-[580px]           /* Desktop: Max height in pixels */
                  md:rounded-xl              /* Desktop: Rounded corners */
                  md:shadow-2xl              /* Desktop: Prominent shadow */
                  md:overflow-hidden         /* Desktop: Clip content to rounded corners */
                "
              >
                {/* Header: Styled with Tailwind for consistency */}
                <div className="chatbot-header flex items-center justify-between p-3 border-b bg-slate-100 md:rounded-t-xl">
                  <h3 className="chatbot-title font-semibold text-base text-slate-700">Avid Law Assistant</h3>
                  <button 
                    id="closeChatbot" 
                    aria-label="Close Chatbot" 
                    className="text-2xl text-slate-500 hover:text-slate-700 leading-none p-1"
                  >
                    &times;
                  </button>
                </div>

                {/* Content area: This will scroll */}
                <div id="chatbotContent" className="flex-grow p-3 sm:p-4 overflow-y-auto">
                  {/* Chatbot messages and input will be generated here by chatbot.js */}
                  {/* Ensure chatbot.js structures input field correctly below messages */}
                </div>
                
                {/* Note: The input field is typically part of what chatbot.js appends to chatbotContent
                     or places in a separate div below it. Ensure its styling in chatbot.css allows it
                     to sit correctly at the bottom of the panel, especially in full-screen mobile view.
                     You might need a footer div for the input if it's not part of chatbotContent's scroll.
                */}
              </div>
            </ModalProvider>
          </LanguageProvider>
        </TranslationProvider>

        {/* Load chatbot JavaScript */}
        <Script
          src="/chatbot/chatbot.js"
          strategy="afterInteractive" // Good strategy for non-critical scripts
        />
        <Analytics />
      </body>
    </html>
  );
}