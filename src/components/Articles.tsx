"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NavBar from './NavBar';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTranslation } from '@/context/TranslationContext';
import ReactMarkdown from 'react-markdown'; 
import { Article, MultiLangContent } from '@/lib/articles';

interface ArticlesProps {
  initialArticles: Article[];
}

// 1. Define the UI Translations
const uiContent = {
  heroTitle: {
    en: "Legal Insights & Articles",
    'zh-Hans': "法律见解与深度文章",
    'zh-Hant': "法律見解與深度文章",
  },
  heroDescription: {
    en: "Expert-written articles on various legal topics to help you navigate complex legal matters. Stay informed with our in-depth analyses, practical guides, and insightful perspectives.",
    'zh-Hans': "由资深律师团队撰写的各类法律文章，助您从容应对复杂的法律事务。通过深入的成文法分析与实用指南，随时掌握最新法律资讯。",
    'zh-Hant': "由資深律師團隊撰寫的各類法律文章，助您從容應對複雜的法律事務。透過深入的成文法分析與實用指南，隨時掌握最新法律資訊。",
  },
  readArticleBtn: {
    en: "Read Article",
    'zh-Hans': "阅读完整文章",
    'zh-Hant': "閱讀完整文章",
  },
  allCategories: {
    en: "All Categories",
    'zh-Hans': "所有分类",
    'zh-Hant': "所有分類",
  },
  ctaTitle: {
    en: "Have Legal Questions?",
    'zh-Hans': "面临法律疑问或纠纷？",
    'zh-Hant': "面臨法律疑問或糾紛？",
  },
  ctaDescription: {
    en: "Our team is ready to provide expert advice tailored to your specific situation. Reach out today for a consultation.",
    'zh-Hans': "安胜 · 弘人律师团队随时准备针对您的具体个案提供专业建议。立即联系我们进行法律咨询。",
    'zh-Hant': "安勝 · 弘人律師團隊隨時準備針對您的具體個案提供專業建議。立即聯繫我們進行法律諮詢。",
  },
  contactBtn: {
    en: "Contact Us",
    'zh-Hans': "立即联系律师",
    'zh-Hant': "立即聯繫律師",
  }
};

export default function Articles({ initialArticles }: ArticlesProps) { 
  const { locale } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(
    initialArticles.length > 0 ? initialArticles[0] : null
  );

  const localePath = (path: string) => {
    if (path.startsWith(`/${locale}`)) return path;
    if (path === '/' || path === '') return `/${locale}`;
    if (path === '/#contact' || path === '#contact') return `/${locale}#contact`;
    if (path.startsWith('/')) return `/${locale}${path}`;
    return `/${locale}/${path}`;
  };

  // Helper function to get localized content
  const getLocalizedContent = (content: string | MultiLangContent): string => {
    if (typeof content === 'string') return content;
    return content[locale as keyof MultiLangContent] || content.en || '';
  };

  const [selectedCategory, setSelectedCategory] = useState(getLocalizedContent(uiContent.allCategories));

  useEffect(() => {
    setSelectedCategory(getLocalizedContent(uiContent.allCategories));
  }, [locale]);

  // Hide navbar when modal is open
  useEffect(() => {
    if (showModal) {
      setShowNavbar(false);
      document.body.style.overflow = 'hidden';
    } else {
      setShowNavbar(true);
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  // Extract unique categories dynamically based on current locale
  const categories = [
    getLocalizedContent(uiContent.allCategories),
    ...Array.from(new Set(initialArticles.map(article => getLocalizedContent(article.category))))
  ];

  // Filter articles based on selected category
  const filteredArticles = selectedCategory === getLocalizedContent(uiContent.allCategories)
    ? initialArticles
    : initialArticles.filter(article => getLocalizedContent(article.category) === selectedCategory);

  const openArticle = (article: Article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  const closeArticle = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Conditionally render navbar */}
      {showNavbar && <NavBar />}
      
      {/* Hero section */}
      <div className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/bigBG.png" 
            alt="Articles Background" 
            fill 
            className="object-cover opacity-90" 
            priority
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {getLocalizedContent(uiContent.heroTitle)}
          </h1>
          <div className="h-[3px] w-[120px] bg-[#FFC107] mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            {getLocalizedContent(uiContent.heroDescription)}
          </p>
        </div>
      </div>
      
      {/* Category filters */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="w-full overflow-x-auto pb-4 md:pb-0 no-scrollbar">
              <div className="flex space-x-2 md:space-x-4 min-w-max">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-[#FFC107] text-gray-900 shadow-md font-bold'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="py-4">
            <style jsx global>{`
              .no-scrollbar::-webkit-scrollbar { display: none; }
              .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
            
            {/* Article grid */}
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
                  <div key={article.id} className="rounded-xl overflow-hidden shadow-lg bg-gray-100 flex flex-col group border border-gray-200 hover:border-[#FFC107] transition-all">
                    <div className="relative flex flex-col h-full">
                      {/* Image container */}
                      <div className="relative w-full h-[220px]">
                        <Image
                          src={article.image}
                          alt={getLocalizedContent(article.title)}
                          fill
                          className="object-cover transition-all duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Link
                            href={localePath(`/articles/${article.id}`)}
                            className="bg-[#FFC107] text-zinc-950 font-bold py-2 px-5 rounded-md shadow-lg transform transition-all duration-300 hover:bg-[#ffcb38] hover:scale-105 text-sm"
                          >
                            {getLocalizedContent(uiContent.readArticleBtn)}
                          </Link>
                        </div>
                      </div>

                      <div className="p-5 flex-grow flex flex-col">
                        <div className="flex items-center mb-3">
                          <span className="bg-[#FFC107] text-xs uppercase font-bold tracking-wide px-2 py-1 rounded text-black">
                            {getLocalizedContent(article.category)}
                          </span>
                          <span className="ml-3 text-gray-500 text-xs">{article.date}</span>
                        </div>

                        {/* Crawlable Title Link */}
                        <h3 className="text-lg font-bold mb-3 min-h-[4rem] flex items-center">
                          <Link
                            href={localePath(`/articles/${article.id}`)}
                            className="hover:text-[#FFC107] transition-colors line-clamp-2"
                          >
                            {getLocalizedContent(article.title)}
                          </Link>
                        </h3>

                        <p className="text-gray-700 mb-4 text-sm line-clamp-3 flex-grow">
                          {getLocalizedContent(article.preview)}
                        </p>

                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
                          <div className="flex items-center">
                            <Image src="/chatbot1.png" alt="Author" width={32} height={32} className="rounded-full mr-2" />
                            <div>
                              <p className="font-medium text-xs text-gray-900">{article.author}</p>
                              <p className="text-[11px] text-gray-500">{article.role}</p>
                            </div>
                          </div>

                          <Link
                            href={localePath(`/articles/${article.id}`)}
                            className="text-xs font-bold text-[#FFC107] hover:underline inline-flex items-center"
                          >
                            <span>{getLocalizedContent(uiContent.readArticleBtn)}</span>
                            <span className="ml-1">→</span>
                          </Link>
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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            {getLocalizedContent(uiContent.ctaTitle)}
          </h2>
          <div className="h-[3px] w-[120px] bg-[#FFC107] mx-auto mb-12"></div>
          <p className="text-lg text-white leading-relaxed mb-12 max-w-2xl mx-auto">
            {getLocalizedContent(uiContent.ctaDescription)}
          </p>
          
          <div className="flex justify-center">
            <a 
              href={localePath("/#contact")} 
              className="group relative inline-flex items-center justify-center gap-2 rounded-md bg-[#FFC107] px-8 py-4 font-semibold text-gray-900 transition-all duration-300 hover:bg-[#ffcb38] focus:outline-none shadow-lg"
            >
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
      
      {/* Slide-over Modal retained for inline preview if triggered */}
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
                aria-label="Close article"
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

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8">
                  {getLocalizedContent(selectedArticle.title)}
                </h1>

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
