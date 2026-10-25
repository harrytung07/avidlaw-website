"use client";

import Image from 'next/image';
import Link from 'next/link';
import NavBar from '@/components/NavBar';
import { useTranslation } from '@/context/TranslationContext';
import React from 'react';

export interface NewsPost {
  slug: string;
  frontmatter: {
    [key: string]: any;
    title?: string;
    date?: string;
    author?: string;
    featuredImage?: string;
    preview?: string;
  };
  content: string;
}

interface NewsClientProps {
  newsPosts: NewsPost[];
}

const uiContent = {
  en: {
    eyebrow: "Avid Law Corporation • Press & Updates",
    heroTitle: "Firm News & Updates",
    heroDescription: "Stay informed about the latest legal developments, firm announcements, and community involvement from Avid Law.",
    readMore: "Read More →",
    noNews: "No news articles found.",
  },
  'zh-Hans': {
    eyebrow: "安胜 · 弘人律师行 • 最新资讯与媒体动态",
    heroTitle: "律所新闻与动态",
    heroDescription: "及时了解安胜 · 弘人律师行的最新法律动态、重大公告及社区参与活动。",
    readMore: "阅读全文 →",
    noNews: "暂无新闻文章。",
  },
  'zh-Hant': {
    eyebrow: "安勝 · 弘人律師行 • 最新資訊與媒體動態",
    heroTitle: "律所新聞與動態",
    heroDescription: "及時了解安勝 · 弘人律師行的最新法律動態、重大公告及社區參與活動。",
    readMore: "閱讀全文 →",
    noNews: "暫無新聞文章。",
  },
};

export default function NewsClient({ newsPosts }: NewsClientProps) {
  const { locale, t } = useTranslation();
  const currentLocale = (locale === 'zh-Hans' || locale === 'zh-Hant' ? locale : 'en') as 'en' | 'zh-Hans' | 'zh-Hant';
  const content = uiContent[currentLocale];

  return (
    <div className="min-h-screen bg-zinc-100/70 text-zinc-900">
      <NavBar />

      <main id="main-content">
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-[#0B1B48] text-white overflow-hidden text-center">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image 
            src="/sideBG.png" 
            alt="" 
            aria-hidden="true"
            fill 
            className="object-cover opacity-20 brightness-110" 
            priority 
          />
          <div className="absolute inset-0 bg-[#0B1B48]/85 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFC107]/15 border border-[#FFC107]/30 text-[#FFC107] text-xs font-semibold uppercase tracking-wider mb-6">
            {content.eyebrow}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-6 text-balance">
            {content.heroTitle}
          </h1>
          <div className="h-1 w-24 bg-[#FFC107] mx-auto mb-8 rounded-full"></div>
          <p className="text-base sm:text-lg md:text-xl text-zinc-200/90 leading-relaxed font-light text-pretty max-w-3xl mx-auto">
            {content.heroDescription}
          </p>
        </div>
      </section>

      {/* News Feed Section */}
      <section className="relative py-16 md:py-24">
        <div className="container relative z-10 mx-auto px-6 max-w-6xl">
          {newsPosts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-xs border border-zinc-200">
              <p className="text-zinc-600 text-lg text-pretty">{content.noNews}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsPosts.map((post) => (
                <article 
                  key={post.slug} 
                  className="bg-white rounded-2xl shadow-xs hover:shadow-xl border border-zinc-200 hover:border-[#FFC107] hover:-translate-y-0.5 transition-[border-color,box-shadow,transform] duration-200 ease-out overflow-hidden flex flex-col group"
                >
                  {post.frontmatter.featuredImage && (
                    <Link
                      href={`/${locale}/news/${post.slug}`}
                      className="block relative h-48 w-full bg-zinc-100 overflow-hidden outline outline-1 -outline-offset-1 outline-black/10 focus-visible:ring-2 focus-visible:ring-[#FFC107] focus-visible:outline-none"
                    >
                      <Image
                        src={post.frontmatter.featuredImage}
                        alt={post.frontmatter.title || 'Article image'}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    </Link>
                  )}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex flex-wrap items-center text-xs text-zinc-600 gap-x-3 gap-y-1 mb-3">
                      {post.frontmatter.date && (
                        <span className="whitespace-nowrap font-medium font-mono tabular-nums">
                          📅 {new Date(post.frontmatter.date).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      )}
                      {post.frontmatter.author && (
                        <span className="whitespace-nowrap font-medium">👤 {post.frontmatter.author}</span>
                      )}
                    </div>

                    <h2 className="text-lg font-serif font-bold mb-3 text-zinc-900 group-hover:text-[#0B1B48] transition-colors line-clamp-2 text-balance">
                      <Link
                        href={`/${locale}/news/${post.slug}`}
                        className="hover:text-[#0B1B48] focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:outline-none rounded transition-colors"
                      >
                        {post.frontmatter.title || 'Untitled News Post'}
                      </Link>
                    </h2>

                    {post.frontmatter.preview && (
                      <p className="text-sm text-zinc-600 mb-5 flex-grow line-clamp-3 leading-relaxed text-pretty">
                        {post.frontmatter.preview}
                      </p>
                    )}

                    <div className="mt-auto pt-4 border-t border-zinc-100 flex items-center justify-between">
                      <Link
                        href={`/${locale}/news/${post.slug}`}
                        className="text-xs font-bold text-[#0B1B48] group-hover:text-[#b88600] inline-flex items-center gap-1 active:scale-[0.97] transition-[color,transform] duration-150 ease-out focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:outline-none rounded px-1"
                      >
                        <span>{content.readMore}</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 text-zinc-400 py-10 border-t border-zinc-800 text-center">
        <p className="text-sm text-zinc-400">
          {t("footer.copyright").replace("{currentYear}", new Date().getFullYear().toString())}
        </p>
      </footer>
    </div>
  );
}
