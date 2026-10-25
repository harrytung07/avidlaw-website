"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NavBar from './NavBar';
import { useTranslation } from '@/context/TranslationContext';
import { Article, MultiLangContent } from '@/lib/articles';

interface ArticlesProps {
  initialArticles: Article[];
}

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
    en: "Our team is ready to provide expert advice tailored to your specific situation. Reach out today for a confidential consultation.",
    'zh-Hans': "安胜 · 弘人律师团队随时准备针对您的具体个案提供专业建议。立即联系我们进行法律咨询。",
    'zh-Hant': "安勝 · 弘人律師團隊隨時準備針對您的具體個案提供專業建議。立即聯繫我們進行法律諮詢。",
  },
  contactBtn: {
    en: "Book a Consultation",
    'zh-Hans': "预约法律咨询",
    'zh-Hant': "預約法律諮詢",
  }
};

export default function Articles({ initialArticles }: ArticlesProps) { 
  const { locale, t } = useTranslation();

  const localePath = (path: string) => {
    if (path.startsWith(`/${locale}`)) return path;
    if (path === '/' || path === '') return `/${locale}`;
    if (path === '/#contact' || path === '#contact') return `/${locale}#contact`;
    if (path.startsWith('/')) return `/${locale}${path}`;
    return `/${locale}/${path}`;
  };

  const getLocalizedContent = (content: string | MultiLangContent): string => {
    if (typeof content === 'string') return content;
    return content[locale as keyof MultiLangContent] || content.en || '';
  };

  const [selectedCategory, setSelectedCategory] = useState(getLocalizedContent(uiContent.allCategories));

  useEffect(() => {
    setSelectedCategory(getLocalizedContent(uiContent.allCategories));
  }, [locale]);

  const categories = [
    getLocalizedContent(uiContent.allCategories),
    ...Array.from(new Set(initialArticles.map(article => getLocalizedContent(article.category))))
  ];

  const filteredArticles = selectedCategory === getLocalizedContent(uiContent.allCategories)
    ? initialArticles
    : initialArticles.filter(article => getLocalizedContent(article.category) === selectedCategory);

  return (
    <div className="bg-zinc-100/70 text-zinc-900 min-h-screen">
      <NavBar />
      
      {/* Hero section */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-[#0B1B48] text-white overflow-hidden text-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/sideBG.png" 
            alt="Articles Background" 
            fill 
            className="object-cover opacity-20 brightness-110" 
            priority
          />
          <div className="absolute inset-0 bg-[#0B1B48]/85 mix-blend-multiply"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFC107]/15 border border-[#FFC107]/30 text-[#FFC107] text-xs font-semibold uppercase tracking-wider mb-6">
            Avid Law Legal Knowledge Base
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-6 text-balance">
            {getLocalizedContent(uiContent.heroTitle)}
          </h1>
          <div className="h-1 w-24 bg-[#FFC107] mx-auto mb-8 rounded-full"></div>
          <p className="text-base sm:text-lg md:text-xl text-zinc-200/90 leading-relaxed font-light text-pretty max-w-3xl mx-auto">
            {getLocalizedContent(uiContent.heroDescription)}
          </p>
        </div>
      </section>
      
      {/* Category filters & Article grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <div className="w-full overflow-x-auto pb-4 md:pb-0 no-scrollbar">
              <div className="flex space-x-2 md:space-x-3 min-w-max">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold min-h-[40px] flex items-center active:scale-[0.96] transition-[background-color,color,border-color,box-shadow,transform] duration-150 ease-out ${
                      selectedCategory === category
                        ? 'bg-[#0B1B48] text-[#FFC107] shadow-sm'
                        : 'bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900 shadow-xs'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <style jsx global>{`
              .no-scrollbar::-webkit-scrollbar { display: none; }
              .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
            
            {/* Article grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <div 
                  key={article.id} 
                  className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl border border-zinc-200 hover:border-[#FFC107] hover:-translate-y-0.5 transition-[border-color,box-shadow,transform] duration-200 ease-out flex flex-col group"
                >
                  {/* Image container */}
                  <div className="relative w-full h-[220px] bg-zinc-100 overflow-hidden outline outline-1 -outline-offset-1 outline-black/10">
                    <Image
                      src={article.image}
                      alt={getLocalizedContent(article.title)}
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#0B1B48]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                      <Link
                        href={localePath(`/articles/${article.id}`)}
                        className="bg-[#FFC107] text-[#0B1B48] font-bold py-2.5 px-5 rounded-lg shadow-lg shadow-[#FFC107]/20 hover:bg-[#ffcb38] hover:-translate-y-0.5 active:scale-[0.96] transition-[background-color,box-shadow,transform] duration-150 ease-out text-xs uppercase tracking-wider"
                      >
                        {getLocalizedContent(uiContent.readArticleBtn)}
                      </Link>
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center justify-between mb-3.5">
                      <span className="bg-[#0B1B48]/10 text-[#0B1B48] text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                        {getLocalizedContent(article.category)}
                      </span>
                      <span className="text-zinc-400 text-xs font-medium font-mono tabular-nums">{article.date}</span>
                    </div>

                    {/* Crawlable Title Link */}
                    <h3 className="font-serif font-bold text-lg text-zinc-900 group-hover:text-[#0B1B48] transition-colors mb-3 line-clamp-2 text-balance">
                      <Link
                        href={localePath(`/articles/${article.id}`)}
                        className="hover:text-[#0B1B48] transition-colors"
                      >
                        {getLocalizedContent(article.title)}
                      </Link>
                    </h3>

                    <p className="text-zinc-600 mb-6 text-sm line-clamp-3 flex-grow leading-relaxed text-pretty">
                      {getLocalizedContent(article.preview)}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-100">
                      <div className="flex items-center">
                        <Image src="/chatbot1.png" alt="Author" width={32} height={32} className="rounded-full mr-2.5 bg-zinc-100 shrink-0" />
                        <div>
                          <p className="font-semibold text-xs text-zinc-900">{article.author}</p>
                          <p className="text-[11px] text-zinc-500">{getLocalizedContent(article.role)}</p>
                        </div>
                      </div>

                      <Link
                        href={localePath(`/articles/${article.id}`)}
                        className="text-xs font-bold text-[#0B1B48] group-hover:text-[#b88600] inline-flex items-center gap-1 active:scale-[0.97] transition-[color,transform] duration-150 ease-out"
                      >
                        <span>{getLocalizedContent(uiContent.readArticleBtn)}</span>
                        <span className="transition-transform duration-200 group-hover:translate-x-1 shrink-0" aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to action section */}
      <section className="relative py-20 md:py-28 bg-[#0B1B48] text-white overflow-hidden text-center">
        <div className="absolute inset-0 z-0">
          <Image src="/sideBG.png" alt="Background" fill className="object-cover opacity-15 brightness-110" />
          <div className="absolute inset-0 bg-[#0B1B48]/85 mix-blend-multiply"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-6 text-balance">
            {getLocalizedContent(uiContent.ctaTitle)}
          </h2>
          <div className="h-1 w-24 bg-[#FFC107] mx-auto mb-8 rounded-full"></div>
          <p className="text-base sm:text-lg md:text-xl text-zinc-300 leading-relaxed mb-10 max-w-2xl mx-auto font-light text-pretty">
            {getLocalizedContent(uiContent.ctaDescription)}
          </p>
          
          <div className="flex justify-center">
            <Link
              href={localePath("/forms?type=consultation")} 
              className="group inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#FFC107] pl-8 pr-7 py-4 font-bold text-[#0B1B48] shadow-lg shadow-[#FFC107]/20 hover:bg-[#ffcb38] hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.96] transition-[background-color,box-shadow,transform] duration-150 ease-out focus:outline-none text-base"
            >
              <span>{getLocalizedContent(uiContent.contactBtn)}</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 shrink-0" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 text-zinc-400 py-10 border-t border-zinc-800 text-center">
        <p className="text-sm text-zinc-500">
          {t("footer.copyright").replace("{currentYear}", new Date().getFullYear().toString())}
        </p>
      </footer>
    </div>
  );
}
