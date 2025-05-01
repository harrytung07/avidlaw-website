"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import enMessages from '../../locales/en/common.json';
import zhHansMessages from '../../locales/zh-Hans/common.json';
import zhHantMessages from '../../locales/zh-Hant/common.json';

// Define the shape of our messages object
type Messages = Record<string, string>;

// Define supported locales
const SUPPORTED_LOCALES = ['en', 'zh-Hans', 'zh-Hant'];
const DEFAULT_LOCALE = 'en';

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
  locale: DEFAULT_LOCALE,
});

// Helper function to extract locale from pathname
function getLocaleFromPathname(pathname: string | null): string {
  if (!pathname) return DEFAULT_LOCALE;
  
  const segments = pathname.split('/');
  // Check if the first segment after the root is a supported locale
  if (segments.length > 1 && segments[1] && SUPPORTED_LOCALES.includes(segments[1])) {
    return segments[1];
  }
  
  return DEFAULT_LOCALE;
}

// Create a provider component
export function TranslationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  // Extract locale from pathname
  const locale = getLocaleFromPathname(pathname);

  // Create translation function
  const t = (key: string): string => {
    // Get the current messages based on the active locale
    const messages = MESSAGES[locale] || MESSAGES[DEFAULT_LOCALE];
    
    // Handle year replacement for copyright if the key is 'footer.copyright'
    if (key === 'footer.copyright') {
      const text = messages[key] || key;
      return text.replace('{year}', new Date().getFullYear().toString());
    }
    
    // Return the translation or the key itself if no translation is found
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