"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import enMessages from '../../locales/en/common.json';
import zhHansMessages from '../../locales/zh-Hans/common.json';
import zhHantMessages from '../../locales/zh-Hant/common.json';

// Define the shape of our messages object
type Messages = Record<string, string>;

// Create a mapping of our message files
const MESSAGES: Record<string, Messages> = {
  'en': enMessages,
  'zh-Hans': zhHansMessages,
  'zh-Hant': zhHantMessages,
};

// Create the context interface
interface TranslationContextType {
  t: (key: string) => string;
  locale: string;
}

// Create the context with default values
const TranslationContext = createContext<TranslationContextType>({
  t: (key: string) => key,
  locale: 'en',
});

// Create a provider component
export function TranslationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  // Extract locale from pathname
  let locale = 'en'; // Default locale
  if (pathname) {
    // Check if pathname starts with a locale prefix
    const pathnameSegments = pathname.split('/');
    if (pathnameSegments.length > 1 && pathnameSegments[1]) {
      const potentialLocale = pathnameSegments[1];
      if (potentialLocale === 'zh-Hans' || potentialLocale === 'zh-Hant') {
        locale = potentialLocale;
      }
    }
  }

  // Create translation function
  const t = (key: string): string => {
    const messages = MESSAGES[locale] || MESSAGES['en'];
    return messages[key] || key;
  };

  return (
    <TranslationContext.Provider value={{ t, locale }}>
      {children}
    </TranslationContext.Provider>
  );
}

// Create a custom hook to use the translation context
export function useTranslation() {
  return useContext(TranslationContext);
} 