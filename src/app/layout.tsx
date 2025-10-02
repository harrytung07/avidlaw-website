// src/app/layout.tsx

import './globals.css';
import type { Metadata } from 'next';
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
      <body>
        <TranslationProvider>
          <LanguageProvider>
            <ModalProvider>
              {children}
            </ModalProvider>
          </LanguageProvider>
        </TranslationProvider>
        <Analytics />
      </body>
    </html>
  );
}