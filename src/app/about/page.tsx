import About from '@/components/About';
import type { Metadata } from 'next';
import { getRequestLocaleAndPath, buildLocalizedMetadata, generateAboutPageSchema } from '@/lib/seo';
import { siteConfig } from '@/config/site';

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = getRequestLocaleAndPath();

  const titles = {
    en: 'About Us | Avid Law Corporation',
    'zh-Hans': '关于我们 | 安胜 · 弘人律师行',
    'zh-Hant': '關於我們 | 安勝 · 弘人律師行',
  };

  const descriptions = {
    en: 'Learn about Avid Law Corporation, the largest law firm in Greater Vancouver founded by Sino-Canadian lawyers in 2009. Comprehensive legal services in English, Mandarin, and Cantonese.',
    'zh-Hans': '了解安胜 · 弘人律师行（Avid Law Corporation）。始创于2009年，是大温哥华地区规模领先的华裔创办综合性律师事务所，以诚信、可靠与卓越享誉业界。',
    'zh-Hant': '了解安勝 · 弘人律師行（Avid Law Corporation）。始創於2009年，是大溫哥華地區規模領先的華裔創辦綜合性律師事務所，以誠信、可靠與卓越享譽業界。',
  };

  return buildLocalizedMetadata({
    title: titles[locale],
    description: descriptions[locale],
    cleanPath: '/about',
    locale,
  });
}

export default function AboutPage() {
  const { locale } = getRequestLocaleAndPath();

  const breadcrumbLabels = {
    en: { home: 'Home', about: 'About Us' },
    'zh-Hans': { home: '首页', about: '关于我们' },
    'zh-Hant': { home: '首頁', about: '關於我們' },
  }[locale];

  const breadcrumbItems = [
    { name: breadcrumbLabels.home, url: `${siteConfig.url}/${locale}` },
    { name: breadcrumbLabels.about, url: `${siteConfig.url}/${locale}/about` },
  ];

  const aboutSchema = generateAboutPageSchema(locale, breadcrumbItems);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <About />
    </>
  );
}
