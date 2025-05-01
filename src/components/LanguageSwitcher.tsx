"use client";

import * as React from "react";
import { Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger 
        className="flex items-center justify-center space-x-1 text-white hover:text-[#FFC107] text-base font-medium uppercase tracking-wide focus:outline-none"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Globe className="h-5 w-5" />
        <span className="ml-1">{language}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-24 bg-black/70 backdrop-blur-md border-gray-800">
        <DropdownMenuRadioGroup value={language} onValueChange={(value) => setLanguage(value as 'ENG' | '简体' | '繁體')}>
          <DropdownMenuRadioItem 
            value="ENG" 
            className="text-white hover:text-[#FFC107] hover:bg-black/50 cursor-pointer"
          >
            ENG
          </DropdownMenuRadioItem>
          <DropdownMenuSeparator className="bg-gray-700" />
          <DropdownMenuRadioItem 
            value="简体" 
            className="text-white hover:text-[#FFC107] hover:bg-black/50 cursor-pointer"
          >
            简体
          </DropdownMenuRadioItem>
          <DropdownMenuSeparator className="bg-gray-700" />
          <DropdownMenuRadioItem 
            value="繁體" 
            className="text-white hover:text-[#FFC107] hover:bg-black/50 cursor-pointer"
          >
            繁體
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 