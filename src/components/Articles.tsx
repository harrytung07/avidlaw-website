"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import NavBar from './NavBar';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTranslation } from '@/context/TranslationContext';
import ReactMarkdown from 'react-markdown'; 
// Import types from your library
import { Article, MultiLangContent } from '@/lib/articles';

interface ArticlesProps {
  initialArticles: Article[];
}

// 1. Define the UI Translations here
const uiContent = {
  heroTitle: {
    en: "Legal Insights & Articles",
    'zh-Hans': "法律见解与文章",
    'zh-Hant': "法律見解與文章",
  },
  heroDescription: {
    en: "Expert-written articles on various legal topics to help you navigate complex legal matters. Stay informed with our in-depth analyses, practical guides, and insightful perspectives.",
    'zh-Hans': "由专家撰写的各类法律文章，助您从容应对复杂的法律事务。通过我们深入的分析、实用的指南和独到的见解，让您随时掌握最新资讯。",
    'zh-Hant': "由專家撰寫的各類法律文章，助您從容應對複雜的法律事務。通過我們深入的分析、實用的指南和獨到的見解，讓您隨時掌握最新資訊。",
  },
  readArticleBtn: {
    en: "Read Article",
    'zh-Hans': "阅读文章",
    'zh-Hant': "閱讀文章",
  },
  allCategories: {
    en: "All Categories",
    'zh-Hans': "所有分类",
    'zh-Hant': "所有分類",
  },
  ctaTitle: {
    en: "Have Legal Questions?",
    'zh-Hans': "有法律疑问？",
    'zh-Hant': "有法律疑問？",
  },
  ctaDescription: {
    en: "Our team is ready to provide expert advice tailored to your specific situation. Reach out today for a consultation.",
    'zh-Hans': "我们的团队随时准备针对您的具体情况提供专家建议。立即联系我们进行咨询。",
    'zh-Hant': "我們的團隊隨時準備針對您的具體情況提供專家建議。立即聯繫我們進行諮詢。",
  },
  contactBtn: {
    en: "Contact Us",
    'zh-Hans': "联系我们",
    'zh-Hant': "聯絡我們",
  }
};

export default function Articles({ initialArticles }: ArticlesProps) { 
  const { locale } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(
    initialArticles.length > 0 ? initialArticles[0] : null
  );

  // Helper function to get localized content
  // We cast the locale to ensure it matches the key type
  const getLocalizedContent = (content: string | MultiLangContent): string => {
    if (typeof content === 'string') return content;
    return content[locale as keyof MultiLangContent] || content.en;
  };

  // UPDATED: Initialize category state with the localized string
  const [selectedCategory, setSelectedCategory] = useState(getLocalizedContent(uiContent.allCategories));

  // Hide navbar when modal is open
  useEffect(() => {
    setShowNavbar(!showModal);
  }, [showModal]);

  // UPDATED: Update selected category when locale changes to keep the UI consistent
  useEffect(() => {
    // If the user had "All Categories" selected, update it to the new language
    // Otherwise, keep the specific category they selected (assuming category names are translated via article data)
    const allCatStr = getLocalizedContent(uiContent.allCategories);
    const prevAllCatEn = uiContent.allCategories.en;
    const prevAllCatHans = uiContent.allCategories['zh-Hans'];
    const prevAllCatHant = uiContent.allCategories['zh-Hant'];

    if ([prevAllCatEn, prevAllCatHans, prevAllCatHant].includes(selectedCategory)) {
        setSelectedCategory(allCatStr);
    }
  }, [locale]);

  const openArticle = (article: Article) => {
    setSelectedArticle(article);
    setShowModal(true);
    document.body.style.overflow = 'hidden'; 
  };

  const closeArticle = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto'; 
  };

  // UPDATED: Filter logic using the localized "All Categories" string
  const filteredArticles = selectedCategory === getLocalizedContent(uiContent.allCategories)
    ? initialArticles
    : initialArticles.filter(article => getLocalizedContent(article.category) === selectedCategory);

  // UPDATED: Categories list
  const categories = [getLocalizedContent(uiContent.allCategories), ...Array.from(new Set(initialArticles.map(article => getLocalizedContent(article.category))))];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {showNavbar && <NavBar />}
      
      {/* Hero section */}
      <div className="relative h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/bigBG.png" 
            alt="Background" 
            fill 
            className="object-cover opacity-90" 
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-6 flex flex-col items-center justify-center text-center h-full">
          <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto relative" style={{ top: '10vh' }}>
            
            {/* UPDATED: Dynamic Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 md:mb-8">
                {getLocalizedContent(uiContent.heroTitle)}
            </h1>
            
            <div className="h-[3px] w-[160px] md:w-[220px] bg-[#FFC107] mb-8 md:mb-12"></div>
            
            {/* UPDATED: Dynamic Description */}
            <p className="text-lg text-white/90 mb-8 md:mb-20">
              {getLocalizedContent(uiContent.heroDescription)}
            </p>
            
          </div>
        </div>
      </div>
      
      {/* Articles section */}
      <div id="articles-section" className="relative py-24">
        <div className="absolute inset-0 z-0">
          <Image src="/bigBG.png" alt="Background" fill className="object-cover opacity-50" />
        </div>
        
        <div className="container relative z-10 mx-auto px-6">
          <div>
            <div className="flex justify-start mb-12">
              <div className="w-full">
                <div className="overflow-x-auto py-2 no-scrollbar">
                  <div className="flex space-x-2 md:space-x-3">
                    {categories.map((category) => (
                      <button 
                        key={category}
                        className={`${
                          selectedCategory === category 
                            ? 'bg-[#FFC107] text-black' 
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                        } px-5 py-2.5 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Styles to hide scrollbar */}
            <style jsx global>{`
              .no-scrollbar::-webkit-scrollbar { display: none; }
              .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
            
            {/* Article grid */}
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
                  <div key={article.id} className="rounded-xl overflow-hidden shadow-lg bg-gray-100 flex flex-col">
                    <div className="relative group">
                      <div className="relative w-full h-[220px]">
                        <Image
                          src={article.image}
                          alt={getLocalizedContent(article.title)}
                          fill
                          className="object-cover transition-all duration-300 group-hover:blur-sm group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button
                            onClick={() => openArticle(article)}
                            className="bg-white text-black font-semibold py-2 px-4 rounded-md shadow-lg transform transition-all duration-300 hover:bg-[#FFC107] hover:scale-105 text-sm"
                          >
                            {/* UPDATED: Dynamic Button Text */}
                            {getLocalizedContent(uiContent.readArticleBtn)}
                          </button>
                        </div>
                      </div>

                      <div className="p-5 flex-grow flex flex-col">
                      <div className="flex items-center mb-3">
                        <span className="bg-[#FFC107] text-xs uppercase font-bold tracking-wide px-2 py-1 rounded text-black">
                          {getLocalizedContent(article.category)}
                        </span>
                        <span className="ml-3 text-gray-500 text-xs">{article.date}</span>
                      </div>

                      <h3
                        className="text-lg font-bold mb-3 hover:text-[#FFC107] cursor-pointer transition-colors min-h-[4.5rem] flex items-center" 
                        onClick={() => openArticle(article)}
                      >
                        <span>{getLocalizedContent(article.title)}</span>
                      </h3>

                      <p className="text-gray-700 mb-4 text-sm line-clamp-3 flex-grow">
                        {getLocalizedContent(article.preview)}
                      </p>

                      <div className="flex items-center mt-auto">
                        <Image src="/chatbot1.png" alt="Author" width={32} height={32} className="rounded-full mr-2" />
                        <div>
                          <p className="font-medium text-sm">{article.author}</p>
                          <p className="text-xs text-gray-500">{article.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call to action section */}
      <div className="relative py-20">
        <div className="absolute inset-0 z-0">
          <Image src="/bigBG.png" alt="Background" fill className="object-cover opacity-90" />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          {/* UPDATED: Dynamic CTA Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            {getLocalizedContent(uiContent.ctaTitle)}
          </h2>
          <div className="h-[3px] w-[120px] bg-[#FFC107] mx-auto mb-12"></div>
          {/* UPDATED: Dynamic CTA Description */}
          <p className="text-lg text-white leading-relaxed mb-12 max-w-2xl mx-auto">
            {getLocalizedContent(uiContent.ctaDescription)}
          </p>
          
          <div className="flex justify-center">
            <a 
              href="/#contact" 
              className="group relative inline-flex items-center justify-center gap-2 rounded-md bg-[#FFC107] px-8 py-4 font-semibold text-gray-900 transition-all duration-300 hover:bg-[#ffcb38] focus:outline-none"
            >
              {/* UPDATED: Dynamic Button */}
              {getLocalizedContent(uiContent.contactBtn)}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" 
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
      
      {/* Article Modal/Canvas - (Content already handled by ReactMarkdown update previously) */}
      <AnimatePresence>
        {showModal && selectedArticle && (
          <motion.div
            className="fixed inset-0 z-50 flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="fixed inset-0 bg-black/50" onClick={closeArticle}></div>

            <motion.div
              className="relative w-full md:w-[72%] h-full bg-[#333333] overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            >
              <button
                onClick={closeArticle}
                className="absolute top-4 right-4 md:top-6 md:left-6 z-50 p-2 text-white hover:text-[#FFC107] transition-colors"
              >
                <X size={28} /> 
              </button>

              <div className="p-6 pt-20 md:p-12 md:pt-24 lg:p-16 text-white max-w-4xl mx-auto">
                <div className="mb-6 md:mb-8"> 
                  <span className="bg-[#FFC107] text-xs uppercase font-bold tracking-wide px-2 py-1 rounded text-black">
                    {getLocalizedContent(selectedArticle.category)}
                  </span>
                  <span className="ml-3 md:ml-4 text-white/70 text-sm">{selectedArticle.date}</span>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8">{getLocalizedContent(selectedArticle.title)}</h1>

                <div className="flex items-center mb-8 md:mb-12">
                  <Image src="/chatbot1.png" alt="Author" width={48} height={48} className="rounded-full mr-3" />
                  <div>
                    <p className="font-medium text-white">{selectedArticle.author}</p>
                    <p className="text-sm text-white/70">{selectedArticle.role}</p>
                  </div>
                </div>

                <div className="prose prose-base md:prose-lg prose-invert max-w-none">
                  <ReactMarkdown
                    components={{
                      a: ({ node, ...props }) => (
                        <a {...props} target="_blank" rel="noopener noreferrer" className="text-[#FFC107] hover:underline" />
                      ),
                    }}
                  >
                    {getLocalizedContent(selectedArticle.content)}
                  </ReactMarkdown>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}