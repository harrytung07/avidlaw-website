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
  h1: (props: any) => <h1 className="text-3xl md:text-4xl font-bold mt-10 mb-6 border-b border-gray-200 pb-3 text-gray-900" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-semibold mt-8 mb-4 border-b border-gray-200 pb-2 text-gray-800" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800" {...props} />,
  p: (props: any) => <p className="leading-relaxed my-4 text-gray-700" {...props} />,
  table: (props: any) => <div className="overflow-x-auto my-6"><table className="min-w-full border border-gray-300 divide-y divide-gray-300" {...props} /></div>,
  thead: (props: any) => <thead className="bg-gray-100" {...props} />,
  th: (props: any) => <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-l border-gray-300 first:border-l-0" {...props} />,
  tbody: (props: any) => <tbody className="bg-white divide-y divide-gray-200" {...props} />,
  tr: (props: any) => <tr className="hover:bg-gray-50" {...props} />,
  td: (props: any) => <td className="px-4 py-3 whitespace-normal text-sm text-gray-700 border-l border-gray-300 first:border-l-0" {...props} />,
  blockquote: (props: any) => <blockquote className="border-l-4 border-[#FFC107] pl-4 italic text-gray-600 my-4 bg-yellow-50/50 py-2" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside my-4 pl-4 space-y-1 text-gray-700" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside my-4 pl-4 space-y-1 text-gray-700" {...props} />,
  li: (props: any) => <li className="mb-1 text-gray-700" {...props} />,
  a: (props: any) => <a className="text-blue-600 hover:text-blue-800 hover:underline font-medium" {...props} />,
  img: (props: any) => (
    <div className="my-6">
      <Image
        src={props.src || ''}
        alt={props.alt || 'Article visual'}
        width={800}
        height={450}
        className="rounded-lg shadow-md object-cover mx-auto"
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
  const content = getLocalizedField(article.content, locale);

  const labels = {
    en: {
      home: 'Home',
      articles: 'Articles',
      backToArticles: 'Back to All Articles',
      scheduleConsultation: 'Schedule a Legal Consultation',
      published: 'Published:',
      authorBy: 'By',
    },
    'zh-Hans': {
      home: '首页',
      articles: '法律文库',
      backToArticles: '返回所有文章',
      scheduleConsultation: '预约资深律师咨询',
      published: '发布日期：',
      authorBy: '作者：',
    },
    'zh-Hant': {
      home: '首頁',
      articles: '法律文庫',
      backToArticles: '返回所有文章',
      scheduleConsultation: '預約資深律師諮詢',
      published: '發布日期：',
      authorBy: '作者：',
    },
  }[locale];

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
        url: `${siteConfig.url}/A.png`,
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
    <div className="min-h-screen bg-white text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />
      <NavBar />

      {/* Article Header Section */}
      <header className="relative pt-28 pb-16 bg-gray-100 border-b border-gray-200">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="text-xs text-gray-500 mb-6">
            <ol className="flex items-center justify-center space-x-2">
              <li>
                <Link href={`/${locale}`} className="hover:text-[#FFC107] transition-colors">
                  {labels.home}
                </Link>
              </li>
              <li><span>/</span></li>
              <li>
                <Link href={`/${locale}/articles`} className="hover:text-[#FFC107] transition-colors">
                  {labels.articles}
                </Link>
              </li>
              <li><span>/</span></li>
              <li className="text-gray-800 font-medium truncate max-w-xs sm:max-w-md" aria-current="page">
                {title}
              </li>
            </ol>
          </nav>

          <div className="inline-block px-3 py-1 bg-[#FFC107] text-zinc-950 font-bold text-xs uppercase tracking-wider rounded mb-4">
            {category}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-gray-900 mb-4 leading-tight">
            {title}
          </h1>

          <div className="flex flex-wrap justify-center items-center text-sm text-gray-500 gap-x-4 gap-y-1 mb-6">
            {article.date && (
              <span className="whitespace-nowrap">
                📅 {article.date}
              </span>
            )}
            <span className="whitespace-nowrap">
              👤 {labels.authorBy} {article.author} ({article.role})
            </span>
          </div>

          {article.image && (
            <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-lg border border-gray-200">
              <Image
                src={article.image}
                alt={title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      </header>

      {/* Article Content Section */}
      <main className="py-12 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <article className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 hover:prose-a:text-blue-800">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {content}
            </ReactMarkdown>
          </article>

          {/* Action Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href={`/${locale}/articles`}
              className="text-blue-600 hover:text-blue-800 hover:underline font-medium text-sm inline-flex items-center"
            >
              ← {labels.backToArticles}
            </Link>

            <a
              href={`/${locale}/#contact`}
              className="inline-flex items-center px-6 py-2.5 rounded-md bg-[#FFC107] text-zinc-950 font-bold text-sm hover:bg-[#ffcb38] transition-colors shadow-sm"
            >
              {labels.scheduleConsultation} →
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
