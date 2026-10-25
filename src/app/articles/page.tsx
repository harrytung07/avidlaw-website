import Articles from '@/components/Articles';
import type { Metadata } from 'next';
import { getSortedArticles } from '@/lib/articles';
import { getRequestLocaleAndPath, buildLocalizedMetadata, generateCollectionPageSchema } from '@/lib/seo';
import { siteConfig } from '@/config/site';

const descriptions = {
  en: 'Explore expert legal articles on real estate contracts, commercial litigation, business financing, and estate planning in British Columbia.',
  'zh-Hans': '查阅安胜 · 弘人律师行撰写的专业法律文章，深入解析卑诗省房地产买卖争议、商业诉讼、股权融资及遗嘱继承法律实务。',
  'zh-Hant': '查閱安勝 · 弘人律師行撰寫的專業法律文章，深入解析卑詩省房地產買賣爭議、商業訴訟、股權融資及遺囑繼承法律實務。',
};

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = getRequestLocaleAndPath();

  const titles = {
    en: 'Legal Insights & Articles | Avid Law Corporation',
    'zh-Hans': '法律文库与专业文章 | 安胜 · 弘人律师行',
    'zh-Hant': '法律文庫與專業文章 | 安勝 · 弘人律師行',
  };

  return buildLocalizedMetadata({
    title: titles[locale],
    description: descriptions[locale],
    cleanPath: '/articles',
    locale,
  });
}

export default async function ArticlesPage() {
  const { locale } = getRequestLocaleAndPath();
  const articles = await getSortedArticles();

  const breadcrumbLabels = {
    en: { home: 'Home', articles: 'Articles' },
    'zh-Hans': { home: '首页', articles: '专业文章' },
    'zh-Hant': { home: '首頁', articles: '專業文章' },
  }[locale];

  const breadcrumbItems = [
    { name: breadcrumbLabels.home, url: `${siteConfig.url}/${locale}` },
    { name: breadcrumbLabels.articles, url: `${siteConfig.url}/${locale}/articles` },
  ];

  const hasPart = articles.slice(0, 10).map((a) => {
    const title = typeof a.title === 'string' ? a.title : (a.title as any)[locale] || (a.title as any).en || '';
    const preview = typeof a.preview === 'string' ? a.preview : (a.preview as any)[locale] || (a.preview as any).en || '';
    return {
      name: title,
      url: `${siteConfig.url}/${locale}/articles/${a.id}`,
      description: preview,
    };
  });

  const articlesSchema = generateCollectionPageSchema({
    name: `${breadcrumbLabels.articles} | ${siteConfig.name}`,
    description: descriptions[locale],
    url: `${siteConfig.url}/${locale}/articles`,
    locale,
    breadcrumbItems,
    hasPart,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articlesSchema) }}
      />
      <Articles initialArticles={articles} />
    </>
  );
}
