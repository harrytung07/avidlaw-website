"use client";

import React from 'react';
import Image from 'next/image';
import NavBar from './NavBar';
import { useTranslation } from '@/context/TranslationContext';

interface FormItem {
  id: string;
  titleKey: string;
  url: string;
  qrCodeUrl: string;
  descriptionKey?: string;
}

export default function Forms() {
  const { t } = useTranslation();

  const forms: FormItem[] = [
    {
      id: 'consultation-english',
      titleKey: 'forms.consultationEnglish',
      url: 'https://form.jotform.com/252606090442249',
      qrCodeUrl: 'https://www.jotform.com/uploads/cnslawcorp/form_files/252606090442249_1758317253_qrcode_muse.png',
      descriptionKey: 'forms.consultationDescription'
    },
    {
      id: 'consultation-chinese',
      titleKey: 'forms.consultationChinese',
      url: 'https://form.jotform.com/252597283337063',
      qrCodeUrl: 'https://www.jotform.com/uploads/cnslawcorp/form_files/252597283337063_1758240491_qrcode_muse.png',
      descriptionKey: 'forms.consultationDescription'
    },
    {
      id: 'will-english',
      titleKey: 'forms.willEnglish',
      url: 'https://form.jotform.com/252654636396266',
      qrCodeUrl: 'https://www.jotform.com/uploads/cnslawcorp/form_files/252654636396266_1759444495_qrcode_muse.png',
      descriptionKey: 'forms.willDescription'
    },
    {
      id: 'will-chinese',
      titleKey: 'forms.willChinese',
      url: 'https://form.jotform.com/252645811384056',
      qrCodeUrl: 'https://www.jotform.com/uploads/cnslawcorp/form_files/252645811384056_1759444599_qrcode_muse.png',
      descriptionKey: 'forms.willDescription'
    },
    {
      id: 'prenup',
      titleKey: 'forms.prenup',
      url: 'https://form.jotform.com/252717142715051',
      qrCodeUrl: 'https://www.jotform.com/uploads/cnslawcorp/form_files/252717142715051_1759444661_qrcode_muse.png',
      descriptionKey: 'forms.prenupDescription'
    },
    {
      id: 'divorce',
      titleKey: 'forms.divorce',
      url: 'https://form.jotform.com/252595582513059',
      qrCodeUrl: 'https://www.jotform.com/uploads/cnslawcorp/form_files/252595582513059_1759444702_qrcode_muse.png',
      descriptionKey: 'forms.divorceDescription'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <NavBar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/bigBG.png" 
            alt="Background" 
            fill 
            className="object-cover opacity-90" 
            priority
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 pt-16 mt-10">
            {t('forms.pageTitle')}
            <div className="h-[3px] w-[120px] bg-[#FFC107] mx-auto mt-8"></div>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            {t('forms.pageDescription')}
          </p>
        </div>
      </section>

      {/* Forms Grid Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/bigBG.png" 
            alt="Background" 
            fill 
            className="object-cover opacity-40" 
          />
        </div>
        
        <div className="container relative z-10 mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            {/* Introduction */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('forms.sectionTitle')}
              </h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                {t('forms.sectionDescription')}
              </p>
            </div>

            {/* Forms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {forms.map((form) => (
                <div 
                  key={form.id}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200"
                >
                  <div className="p-6">
                    {/* Form Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 text-center min-h-[56px] flex items-center justify-center">
                      {t(form.titleKey)}
                    </h3>
                    
                    {/* Description */}
                    {form.descriptionKey && (
                      <p className="text-sm text-gray-600 mb-6 text-center min-h-[48px] flex items-center justify-center">
                        {t(form.descriptionKey)}
                      </p>
                    )}
                    
                    {/* QR Code */}
                    <div className="flex justify-center mb-4">
                      <a 
                        href={form.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block hover:scale-105 transition-transform duration-300"
                      >
                        <div className="relative w-[200px] h-[200px] bg-white p-2 rounded-lg border-2 border-gray-200">
                          <Image
                            src={form.qrCodeUrl}
                            alt={`QR Code for ${t(form.titleKey)}`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </a>
                    </div>
                    
                    {/* Link Button */}
                    <div className="text-center">
                      <a
                        href={form.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFC107] hover:bg-[#ffcb38] text-gray-900 font-semibold rounded transition-colors duration-300"
                      >
                        {t('forms.openForm')}
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-4 w-4" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Help Section */}
            <div className="mt-16 bg-gray-50 rounded-lg p-8 text-center border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {t('forms.helpTitle')}
              </h3>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                {t('forms.helpText')}
              </p>
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded transition-colors duration-300"
              >
                {t('forms.contactUs')}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-gray-400">
            {t("footer.copyright").replace("{currentYear}", new Date().getFullYear().toString())}
          </p>
        </div>
      </footer>
    </div>
  );
}

