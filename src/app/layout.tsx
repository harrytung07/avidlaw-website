// src/app/layout.tsx

import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { LanguageProvider } from '@/context/LanguageContext';
import { TranslationProvider } from '@/context/TranslationContext';
import { ModalProvider } from '@/context/ModalContext';
import { getRequestLocaleAndPath } from '@/lib/seo';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Avid Law Corporation | Premier Law Firm in Richmond, BC',
    template: '%s | Avid Law Corporation',
  },
  description: 'Avid Law Corporation provides trusted legal counsel in Corporate & Commercial Law, Real Estate Conveyancing, Civil Litigation, Family Law, and Wills & Estates in Richmond, BC.',
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    telephone: true,
    date: false,
    address: true,
    email: true,
    url: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#0B1B48',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { locale } = getRequestLocaleAndPath();

  return (
    <html lang={locale} className="antialiased">
      <body>
        <TranslationProvider initialLocale={locale}>
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
