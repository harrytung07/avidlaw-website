// src/app/news/[slug]/page.tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import Image from 'next/image';
import NavBar from '@/components/NavBar';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getRequestLocaleAndPath, buildLocalizedMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import { siteConfig } from '@/config/site';

interface NewsPost {
  slug: string;
  frontmatter: {
    title?: string;
    date?: string;
    author?: string;
    preview?: string;
    featuredImage?: string;
    [key: string]: any;
  };
  content: string;
}

const postsDirectory = path.join(process.cwd(), 'public/articles/news');

export async function generateStaticParams() {
  let filenames: string[] = [];
  try {
    filenames = fs.readdirSync(postsDirectory);
  } catch (error) {
    console.error("Error reading news directory for static params:", postsDirectory, error);
    return [];
  }

  return filenames
    .filter(filename => filename.endsWith('.md'))
    .map((filename) => ({
      slug: filename.replace('.md', ''),
    }));
}

async function getPostData(slug: string): Promise<NewsPost | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  try {
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    return { slug, frontmatter: data, content };
  } catch (err) {
    console.error(`Error processing file ${slug}.md:`, err);
    return null;
  }
}

const markdownComponents = {
  h1: (props: any) => <h1 className="text-3xl md:text-4xl font-bold mt-10 mb-6 border-b pb-3" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-semibold mt-8 mb-4 border-b pb-2" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-semibold mt-6 mb-3" {...props} />,
  p: (props: any) => <p className="leading-relaxed my-4" {...props} />,
  table: (props: any) => <div className="overflow-x-auto my-6"><table className="min-w-full border border-gray-300 divide-y divide-gray-300" {...props} /></div>,
  thead: (props: any) => <thead className="bg-gray-100" {...props} />,
  th: (props: any) => <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-l border-gray-300 first:border-l-0" {...props} />,
  tbody: (props: any) => <tbody className="bg-white divide-y divide-gray-200" {...props} />,
  tr: (props: any) => <tr className="hover:bg-gray-50" {...props} />,
  td: (props: any) => <td className="px-4 py-3 whitespace-normal text-sm text-gray-700 border-l border-gray-300 first:border-l-0" {...props} />,
  blockquote: (props: any) => <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside my-4 pl-4 space-y-1" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside my-4 pl-4 space-y-1" {...props} />,
  li: (props: any) => <li className="mb-1" {...props} />,
  a: (props: any) => <a className="text-blue-600 hover:text-blue-800 hover:underline" {...props} />,
  img: (props: any) => (
    <div className="my-6">
      <Image
        src={props.src || ''}
        alt={props.alt || 'Markdown image'}
        width={800}
        height={450}
        className="rounded-lg shadow-md object-cover mx-auto"
      />
    </div>
  ),
};

interface NewsArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: NewsArticlePageProps): Promise<Metadata> {
  const post = await getPostData(params.slug);
  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  const { locale } = getRequestLocaleAndPath();
  const cleanPath = `/news/${params.slug}`;
  const ogImg = post.frontmatter.featuredImage
    ? (post.frontmatter.featuredImage.startsWith('http')
        ? post.frontmatter.featuredImage
        : `${siteConfig.url}${post.frontmatter.featuredImage}`)
    : siteConfig.ogImage;

  return buildLocalizedMetadata({
    title: `${post.frontmatter.title || 'Legal News'} | Avid Law News`,
    description: post.frontmatter.preview || 'Legal news and case updates from Avid Law Corporation.',
    cleanPath,
    locale,
    ogImage: ogImg,
    type: 'article',
  });
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const post = await getPostData(params.slug);

  if (!post) {
    notFound();
  }

  const { locale } = getRequestLocaleAndPath();
  const cleanPath = `/news/${params.slug}`;
  const canonicalUrl = `${siteConfig.url}/${locale}${cleanPath}`;

  const breadcrumbLabels = {
    en: { home: 'Home', news: 'News' },
    'zh-Hans': { home: '首页', news: '最新要闻' },
    'zh-Hant': { home: '首頁', news: '最新要聞' },
  }[locale];

  const ogImg = post.frontmatter.featuredImage
    ? (post.frontmatter.featuredImage.startsWith('http')
        ? post.frontmatter.featuredImage
        : `${siteConfig.url}${post.frontmatter.featuredImage}`)
    : siteConfig.ogImage;

  // JSON-LD Article Schema
  const articleSchema = {
    '@type': 'Article',
    '@id': `${canonicalUrl}#article`,
    headline: post.frontmatter.title,
    description: post.frontmatter.preview || '',
    image: ogImg,
    datePublished: post.frontmatter.date || new Date().toISOString(),
    dateModified: post.frontmatter.date || new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: post.frontmatter.author || 'Avid Law',
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
    { name: breadcrumbLabels.home, url: `${siteConfig.url}/${locale}` },
    { name: breadcrumbLabels.news, url: `${siteConfig.url}/${locale}/news` },
    { name: post.frontmatter.title || 'Article', url: canonicalUrl },
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
      <div className="relative pt-28 pb-16 bg-gray-100">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="text-xs text-gray-500 mb-6">
            <ol className="flex items-center justify-center space-x-2">
              <li>
                <Link href={`/${locale}`} className="hover:text-[#FFC107] transition-colors">
                  {breadcrumbLabels.home}
                </Link>
              </li>
              <li><span>/</span></li>
              <li>
                <Link href={`/${locale}/news`} className="hover:text-[#FFC107] transition-colors">
                  {breadcrumbLabels.news}
                </Link>
              </li>
              <li><span>/</span></li>
              <li className="text-gray-800 font-medium truncate max-w-xs" aria-current="page">
                {post.frontmatter.title}
              </li>
            </ol>
          </nav>

          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
            {post.frontmatter.title || 'Untitled News Post'}
          </h1>
          <div className="flex flex-wrap justify-center items-center text-sm text-gray-500 gap-x-4 gap-y-1 mb-6">
            {post.frontmatter.date && (
              <span className="whitespace-nowrap">
                📅 {new Date(post.frontmatter.date).toLocaleDateString(locale === 'zh-Hans' ? 'zh-CN' : locale === 'zh-Hant' ? 'zh-TW' : 'en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            )}
            {post.frontmatter.author && (
              <span className="whitespace-nowrap">👤 By {post.frontmatter.author}</span>
            )}
          </div>
          {post.frontmatter.featuredImage && (
            <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={post.frontmatter.featuredImage}
                alt={post.frontmatter.title || 'Featured Image'}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      </div>

      {/* Article Content Section */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <article className="prose prose-lg max-w-none prose-headings:font-semibold prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {post.content}
            </ReactMarkdown>
          </article>

          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <Link href={`/${locale}/news`} className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
              ← {locale === 'zh-Hans' ? '返回所有要闻' : locale === 'zh-Hant' ? '返回所有要聞' : 'Back to All News'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
