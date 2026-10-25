// src/app/news/page.tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Metadata } from 'next';
import NewsClient, { NewsPost } from './NewsClient';
import { getRequestLocaleAndPath, buildLocalizedMetadata, generateCollectionPageSchema } from '@/lib/seo';
import { siteConfig } from '@/config/site';

const descriptions = {
  en: 'Stay informed with recent British Columbia Court of Appeal decisions, statutory updates, and law firm announcements from Avid Law Corporation in Richmond, BC.',
  'zh-Hans': '查阅安胜 · 弘人律师行整理的最新卑诗省上诉法院判例解析、法律法规前沿速递与律所动态。',
  'zh-Hant': '查閱安勝 · 弘人律師行整理的最新卑詩省上訴法院判例解析、法律法規前沿速遞與律所動態。',
};

function getNewsPosts(): NewsPost[] {
  const postsDirectory = path.join(process.cwd(), 'public/articles/news');
  let filenames: string[] = [];
  try {
    filenames = fs.readdirSync(postsDirectory);
  } catch (error) {
    console.error("Error reading news directory:", postsDirectory, error);
    return [];
  }

  const posts = filenames
    .filter(filename => filename.endsWith('.md'))
    .map((filename) => {
      const slug = filename.replace('.md', '');
      const fullPath = path.join(postsDirectory, filename);
      try {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        return { slug, frontmatter: data, content };
      } catch (err) {
        console.error(`Error processing file ${filename}:`, err);
        return null;
      }
    })
    .filter(post => post !== null) as NewsPost[];

  posts.sort((postA, postB) => {
    const dateA = postA.frontmatter.date ? new Date(postA.frontmatter.date) : new Date(0);
    const dateB = postB.frontmatter.date ? new Date(postB.frontmatter.date) : new Date(0);
    return dateB.getTime() - dateA.getTime();
  });
  return posts;
}

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = getRequestLocaleAndPath();

  const titles = {
    en: 'Legal News & Case Updates | Avid Law Corporation',
    'zh-Hans': '最新法律要闻与判例解析 | 安胜 · 弘人律师行',
    'zh-Hant': '最新法律要聞與判例解析 | 安勝 · 弘人律師行',
  };

  return buildLocalizedMetadata({
    title: titles[locale],
    description: descriptions[locale],
    cleanPath: '/news',
    locale,
  });
}

export default async function NewsPage() {
  const { locale } = getRequestLocaleAndPath();
  const newsPosts = getNewsPosts();

  const breadcrumbLabels = {
    en: { home: 'Home', news: 'News' },
    'zh-Hans': { home: '首页', news: '最新要闻' },
    'zh-Hant': { home: '首頁', news: '最新要聞' },
  }[locale];

  const breadcrumbItems = [
    { name: breadcrumbLabels.home, url: `${siteConfig.url}/${locale}` },
    { name: breadcrumbLabels.news, url: `${siteConfig.url}/${locale}/news` },
  ];

  const hasPart = newsPosts.slice(0, 10).map((post) => ({
    name: post.frontmatter.title || post.slug,
    url: `${siteConfig.url}/${locale}/news/${post.slug}`,
    description: post.frontmatter.preview || '',
  }));

  const newsSchema = generateCollectionPageSchema({
    name: `${breadcrumbLabels.news} | ${siteConfig.name}`,
    description: descriptions[locale],
    url: `${siteConfig.url}/${locale}/news`,
    locale,
    breadcrumbItems,
    hasPart,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsSchema) }}
      />
      <NewsClient newsPosts={newsPosts} />
    </>
  );
}
