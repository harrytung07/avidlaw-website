// src/app/layout.tsx

import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { LanguageProvider } from '@/context/LanguageContext';
import { TranslationProvider } from '@/context/TranslationContext';
import { ModalProvider } from '@/context/ModalContext';
// Remove the Image import if no longer needed elsewhere in this file
// import Image from 'next/image';

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

              {/* Chatbot icon container */}
              <div id="chatbotIcon" style={{ display: 'none' }}>
                {/* Replace Image/Previous SVG with the new yellow chat SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50" // Adjust size as needed
                  height="50" // Adjust size as needed
                  viewBox="0 0 24 24"
                  fill="#FFC107" // Set desired yellow color
                >
                  <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                </svg>
              </div>

              {/* Chatbot panel container */}
              <div id="chatbotPanel" style={{ display: 'none' }}>
                {/* Header */}
                <div className="chatbot-header">
                  <h3 className="chatbot-title">Avid Law Assistant</h3>
                  <button id="closeChatbot" aria-label="Close Chatbot">×</button>
                </div>
                {/* Content area where chatbot.js will render messages */}
                <div id="chatbotContent">
                  {/* Chatbot messages and input will be generated here by chatbot.js */}
                </div>
              </div>
            </ModalProvider>
          </LanguageProvider>
        </TranslationProvider>

        {/* Load chatbot JavaScript */}
        <Script
          src="/chatbot/chatbot.js"
          strategy="afterInteractive"
        />
        <Analytics />
      </body>
    </html>
  );
}