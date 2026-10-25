import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Metadata } from 'next';
import NavBar from '@/components/NavBar';
import { getArticleById, getAllArticleIds, MultiLangContent } from '@/lib/articles';
import { getRequestLocaleAndPath, buildLocalizedMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import { siteConfig } from '@/config/site';

interface ArticlePageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const ids = await getAllArticleIds();
  return ids.map((id) => ({
    id,
  }));
}

function getLocalizedField(field: string | MultiLangContent | undefined, locale: string): string {
  if (!field) return '';
  if (typeof field === 'string') return field;
  return field[locale as keyof MultiLangContent] || field.en || '';
}

function cleanMarkdownBody(rawBody: string, title: string): string {
  let body = rawBody.trimStart();
  const firstParaMatch = body.match(/^(\*\*[^*]+\*\*\s*\n\s*\n|^[^\n]+\n\s*\n)/);
  if (firstParaMatch) {
    const firstPara = firstParaMatch[1].replace(/\*\*/g, '').replace(/\*/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
    const cleanTitle = title.replace(/\s+/g, ' ').trim().toLowerCase();
    if (firstPara === cleanTitle || (cleanTitle.length > 10 && (cleanTitle.includes(firstPara) || firstPara.includes(cleanTitle)))) {
      body = body.slice(firstParaMatch[0].length).trimStart();
    }
  }
  return body;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await getArticleById(params.id);
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  const { locale } = getRequestLocaleAndPath();
  const title = getLocalizedField(article.title, locale);
  const preview = getLocalizedField(article.preview, locale);
  const cleanPath = `/articles/${params.id}`;
  const ogImg = article.image.startsWith('http')
    ? article.image
    : `${siteConfig.url}${article.image.startsWith('/') ? article.image : `/${article.image}`}`;

  return buildLocalizedMetadata({
    title: `${title} | Avid Law`,
    description: preview || 'Legal article and practical guide from Avid Law Corporation in British Columbia.',
    cleanPath,
    locale,
    ogImage: ogImg,
    type: 'article',
  });
}

const markdownComponents = {
  h1: (props: any) => <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0B1B48] mt-10 mb-4 pb-2 border-b border-zinc-200 text-balance" {...props} />,
  h2: (props: any) => <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0B1B48] mt-10 mb-4 pb-2 border-b border-zinc-200 text-balance" {...props} />,
  h3: (props: any) => <h3 className="text-lg sm:text-xl font-serif font-bold text-zinc-900 mt-8 mb-3 text-balance" {...props} />,
  p: (props: any) => <p className="text-base sm:text-[17px] text-zinc-700 leading-relaxed my-4 text-pretty" {...props} />,
  strong: (props: any) => <strong className="font-bold text-zinc-900" {...props} />,
  blockquote: (props: any) => <blockquote className="border-l-4 border-[#FFC107] bg-zinc-50 px-5 py-4 rounded-r-xl italic text-zinc-700 my-6 shadow-xs text-pretty" {...props} />,
  table: (props: any) => <div className="overflow-x-auto my-6 rounded-xl border border-zinc-200 shadow-sm"><table className="min-w-full text-sm text-left" {...props} /></div>,
  thead: (props: any) => <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-800 uppercase text-xs font-semibold" {...props} />,
  th: (props: any) => <th className="px-4 py-3 border-r border-zinc-200 last:border-r-0" {...props} />,
  tbody: (props: any) => <tbody className="bg-white divide-y divide-zinc-200" {...props} />,
  tr: (props: any) => <tr className="hover:bg-zinc-50/70 transition-colors" {...props} />,
  td: (props: any) => <td className="px-4 py-3 border-r border-zinc-200 last:border-r-0 text-zinc-700 text-pretty" {...props} />,
  ul: (props: any) => <ul className="list-disc list-outside my-5 pl-6 space-y-2.5 text-zinc-700 text-pretty" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-outside my-5 pl-6 space-y-2.5 text-zinc-700 text-pretty" {...props} />,
  li: (props: any) => <li className="leading-relaxed pl-1 marker:text-[#0B1B48] marker:font-bold" {...props} />,
  a: (props: any) => (
    <a
      {...props}
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="text-[#0B1B48] font-semibold underline decoration-[#FFC107] underline-offset-4 hover:text-[#FFC107] transition-colors"
    />
  ),
  img: (props: any) => (
    <div className="my-8 rounded-xl overflow-hidden shadow-md border border-zinc-200 outline outline-1 -outline-offset-1 outline-black/10">
      <Image
        src={props.src || ''}
        alt={props.alt || 'Article visual'}
        width={800}
        height={450}
        className="object-cover mx-auto"
      />
    </div>
  ),
};

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const article = await getArticleById(params.id);

  if (!article) {
    notFound();
  }

  const { locale } = getRequestLocaleAndPath();
  const cleanPath = `/articles/${params.id}`;
  const canonicalUrl = `${siteConfig.url}/${locale}${cleanPath}`;

  const title = getLocalizedField(article.title, locale);
  const category = getLocalizedField(article.category, locale);
  const preview = getLocalizedField(article.preview, locale);
  const rawContent = getLocalizedField(article.content, locale);
  const cleanedContent = cleanMarkdownBody(rawContent, title);
  const role = getLocalizedField(article.role, locale);

  const labels = {
    en: {
      home: 'Home',
      articles: 'Articles',
      backToArticles: 'Back to All Articles',
      scheduleConsultation: 'Schedule a Consultation',
      ctaTitle: 'Need Legal Counsel in British Columbia?',
      ctaDesc: 'Our experienced legal team provides strategic counsel tailored to your specific matters.',
      published: 'Published:',
      authorBy: 'By',
      copyright: '© {currentYear} Avid Law Corporation. All rights reserved.',
    },
    'zh-Hans': {
      home: '首页',
      articles: '法律文库',
      backToArticles: '返回所有文章',
      scheduleConsultation: '预约资深律师咨询',
      ctaTitle: '需要卑诗省专业法律支持？',
      ctaDesc: '安胜 · 弘人资深律师团队随时准备针对您的具体个案提供专业建议与诉讼代理。',
      published: '发布日期：',
      authorBy: '作者：',
      copyright: '© {currentYear} 安胜 · 弘人律师行 版权所有。',
    },
    'zh-Hant': {
      home: '首頁',
      articles: '法律文庫',
      backToArticles: '返回所有文章',
      scheduleConsultation: '預約資深律師諮詢',
      ctaTitle: '需要卑詩省專業法律支持？',
      ctaDesc: '安勝 · 弘人資深律師團隊隨時準備針對您的具體個案提供專業建議與訴訟代理。',
      published: '發布日期：',
      authorBy: '作者：',
      copyright: '© {currentYear} 安勝 · 弘人律師行 版權所有。',
    },
  }[locale as 'en' | 'zh-Hans' | 'zh-Hant'] || {
    home: 'Home',
    articles: 'Articles',
    backToArticles: 'Back to All Articles',
    scheduleConsultation: 'Schedule a Consultation',
    ctaTitle: 'Need Legal Counsel in British Columbia?',
    ctaDesc: 'Our experienced legal team provides strategic counsel tailored to your specific matters.',
    published: 'Published:',
    authorBy: 'By',
    copyright: '© {currentYear} Avid Law Corporation. All rights reserved.',
  };

  const ogImg = article.image.startsWith('http')
    ? article.image
    : `${siteConfig.url}${article.image.startsWith('/') ? article.image : `/${article.image}`}`;

  // JSON-LD Article Schema
  const articleSchema = {
    '@type': 'Article',
    '@id': `${canonicalUrl}#article`,
    headline: title,
    description: preview,
    image: ogImg,
    datePublished: article.date || new Date().toISOString(),
    dateModified: article.date || new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: article.author || 'Avid Law',
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/Logo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  };

  // JSON-LD Breadcrumb Schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: labels.home, url: `${siteConfig.url}/${locale}` },
    { name: labels.articles, url: `${siteConfig.url}/${locale}/articles` },
    { name: title, url: canonicalUrl },
  ]);

  const jsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': [articleSchema, breadcrumbSchema],
  };

  return (
    <div className="min-h-screen bg-zinc-100/70 text-zinc-900 flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />
      <NavBar />

      {/* Article Regal Navy Hero Header */}
      <header className="relative pt-32 pb-20 md:pt-36 md:pb-24 bg-[#0B1B48] text-white overflow-hidden text-center">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/sideBG.png"
            alt=""
            aria-hidden="true"
            fill
            className="object-cover opacity-15 brightness-110"
            priority
          />
          <div className="absolute inset-0 bg-[#0B1B48]/85 mix-blend-multiply" />
        </div>

        <div className="container relative z-10 mx-auto px-6 max-w-4xl">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="text-xs text-zinc-300 mb-6">
            <ol className="flex items-center justify-center space-x-2">
              <li>
                <Link
                  href={`/${locale}`}
                  className="hover:text-[#FFC107] rounded focus-visible:ring-2 focus-visible:ring-[#FFC107] focus-visible:outline-none transition-colors"
                >
                  {labels.home}
                </Link>
              </li>
              <li className="text-zinc-500"><span>/</span></li>
              <li>
                <Link
                  href={`/${locale}/articles`}
                  className="hover:text-[#FFC107] rounded focus-visible:ring-2 focus-visible:ring-[#FFC107] focus-visible:outline-none transition-colors"
                >
                  {labels.articles}
                </Link>
              </li>
              <li className="text-zinc-500"><span>/</span></li>
              <li className="text-[#FFC107] font-medium truncate max-w-xs sm:max-w-md" aria-current="page">
                {title}
              </li>
            </ol>
          </nav>

          {/* Category Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFC107]/15 border border-[#FFC107]/30 text-[#FFC107] text-xs font-bold uppercase tracking-wider mb-4">
            {category}
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold font-serif text-white mb-6 leading-tight max-w-4xl mx-auto text-balance">
            {title}
          </h1>

          <div className="flex flex-wrap justify-center items-center text-sm text-zinc-300 gap-x-4 gap-y-1">
            {article.date && (
              <span className="whitespace-nowrap font-mono tabular-nums">
                📅 {article.date}
              </span>
            )}
            <span className="whitespace-nowrap">
              👤 {labels.authorBy} {article.author} ({role})
            </span>
          </div>
        </div>
      </header>

      {/* Editorial Reading Card Container */}
      <main id="main-content" className="container mx-auto px-4 sm:px-6 max-w-4xl relative z-10 -mt-10 mb-16 flex-grow">
        <div className="bg-white rounded-2xl shadow-lg border border-zinc-200 p-6 sm:p-10 md:p-14">
          {article.image && (
            <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-md border border-zinc-200 outline outline-1 -outline-offset-1 outline-black/10 mb-10">
              <Image
                src={article.image}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-cover"
                priority
              />
            </div>
          )}

          <article className="prose prose-lg max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {cleanedContent}
            </ReactMarkdown>
          </article>

          {/* Polished Executive Consultation CTA Banner */}
          <div className="mt-12 bg-[#0B1B48] text-white rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
            <div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-white mb-1 text-balance">
                {labels.ctaTitle}
              </h3>
              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed text-pretty">
                {labels.ctaDesc}
              </p>
            </div>
            <Link
              href={`/${locale}/forms?type=consultation`}
              className="group/cta whitespace-nowrap rounded-lg bg-[#FFC107] pl-6 pr-5 py-3 font-bold text-[#0B1B48] shadow-md shadow-[#FFC107]/20 hover:bg-[#ffcb38] hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-[#FFC107] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1B48] focus-visible:outline-none transition-[background-color,box-shadow,transform] duration-150 ease-out text-sm shrink-0 inline-flex items-center gap-1.5"
            >
              <span>{labels.scheduleConsultation}</span>
              <span className="transition-transform duration-200 group-hover/cta:translate-x-1 shrink-0" aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Back Link */}
          <div className="mt-8 pt-6 border-t border-zinc-200 flex items-center justify-between">
            <Link
              href={`/${locale}/articles`}
              className="group/back text-xs sm:text-sm font-bold text-[#0B1B48] hover:text-[#b88600] inline-flex items-center gap-1.5 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-[#0B1B48] focus-visible:outline-none rounded px-1.5 py-0.5 transition-[color,transform] duration-150 ease-out"
            >
              <span className="transition-transform duration-200 group-hover/back:-translate-x-1 shrink-0" aria-hidden="true">←</span>
              <span>{labels.backToArticles}</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-zinc-950 text-zinc-400 py-10 border-t border-zinc-800 text-center">
        <p className="text-sm text-zinc-400">
          {labels.copyright.replace('{currentYear}', new Date().getFullYear().toString())}
        </p>
      </footer>
    </div>
  );
}
