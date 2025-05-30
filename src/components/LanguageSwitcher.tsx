"use client";

import * as React from "react";
import { Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/context/TranslationContext";
import { usePathname, useRouter } from "next/navigation";
import { useModal } from "@/context/ModalContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Map locales to display labels
const localeLabels: Record<string, string> = {
  'en': 'ENG',
  'zh-Hans': '简体',
  'zh-Hant': '繁體'
};

// Map between language context values and URL locales
const languageToLocale: Record<string, string> = {
  'ENG': 'en',
  '简体': 'zh-Hans',
  '繁體': 'zh-Hant'
};

// Map from URL locales to language context values
const localeToLanguage: Record<string, string> = {
  'en': 'ENG',
  'zh-Hans': '简体',
  'zh-Hant': '繁體'
};

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const { locale } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const { isAnyModalOpen } = useModal();
  
  // Get the current path without the locale prefix
  const getPathWithoutLocale = () => {
    const segments = pathname?.split('/') || [];
    // Check if the first segment is a locale
    if (segments.length > 1) {
      if (['en', 'zh-Hans', 'zh-Hant'].includes(segments[1])) {
        return '/' + segments.slice(2).join('/');
      }
    }
    return pathname || '/';
  };
  
  // Build path with new locale
  const getPathWithLocale = (newLocale: string) => {
    const basePath = getPathWithoutLocale();
    
    // If path is just "/" then don't add another slash after the locale
    if (basePath === "/") {
      return newLocale === 'en' ? '/' : `/${newLocale}`;
    }
    
    // For all other paths, add the locale prefix
    return newLocale === 'en' ? basePath : `/${newLocale}${basePath}`;
  };
  
  // Update language context when switching language
  const handleLanguageChange = (newLocale: string) => {
    // If a modal is open, don't allow language changes
    if (isAnyModalOpen) {
      console.log("Cannot change language while a modal is open");
      return;
    }
    
    // Update the language context for compatibility with current code
    setLanguage(localeToLanguage[newLocale] as any);
    
    // Get the new path with locale and navigate to it
    const newPath = getPathWithLocale(newLocale);
    router.push(newPath);
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger 
        className={`flex items-center justify-center space-x-1 text-white ${isAnyModalOpen ? 'opacity-50 cursor-not-allowed' : 'hover:text-[#FFC107] cursor-pointer'} text-base font-medium uppercase tracking-wide focus:outline-none`}
        onClick={(e) => {
          e.stopPropagation();
        }}
        disabled={isAnyModalOpen}
      >
        <Globe className="h-5 w-5" />
        <span className="ml-1">{localeLabels[locale] || 'ENG'}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-24 bg-black/70 backdrop-blur-md border-gray-800">
        <DropdownMenuRadioGroup value={locale}>
          <DropdownMenuRadioItem 
            value="en" 
            className={`text-white ${isAnyModalOpen ? 'opacity-50 cursor-not-allowed' : 'hover:text-[#FFC107] hover:bg-black/50 cursor-pointer'}`}
            onClick={() => handleLanguageChange('en')}
            disabled={isAnyModalOpen}
          >
            ENG
          </DropdownMenuRadioItem>
          <DropdownMenuSeparator className="bg-gray-700" />
          <DropdownMenuRadioItem 
            value="zh-Hans" 
            className={`text-white ${isAnyModalOpen ? 'opacity-50 cursor-not-allowed' : 'hover:text-[#FFC107] hover:bg-black/50 cursor-pointer'}`}
            onClick={() => handleLanguageChange('zh-Hans')}
            disabled={isAnyModalOpen}
          >
            简体
          </DropdownMenuRadioItem>
          <DropdownMenuSeparator className="bg-gray-700" />
          <DropdownMenuRadioItem 
            value="zh-Hant" 
            className={`text-white ${isAnyModalOpen ? 'opacity-50 cursor-not-allowed' : 'hover:text-[#FFC107] hover:bg-black/50 cursor-pointer'}`}
            onClick={() => handleLanguageChange('zh-Hant')}
            disabled={isAnyModalOpen}
          >
            繁體
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 