import PracticeAreas from '@/components/PracticeAreas';
import type { Metadata } from 'next';
import { getRequestLocaleAndPath, buildLocalizedMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import { siteConfig } from '@/config/site';

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = getRequestLocaleAndPath();

  const titles = {
    en: 'Practice Areas | Avid Law Corporation',
    'zh-Hans': '业务领域与法律实务 | 安胜 · 弘人律师行',
    'zh-Hant': '業務領域與法律實務 | 安勝 · 弘人律師行',
  };

  const descriptions = {
    en: "Explore Avid Law Corporation's comprehensive legal practice areas in British Columbia: Corporate & Commercial Law, Real Estate Transactions, Civil Litigation, Family Law, and Wills & Estates.",
    'zh-Hans': '查阅安胜 · 弘人律师行在卑诗省的核心法律业务领域：公司商事法、商业地产买卖过户、民事诉讼、家庭法及遗嘱信托遗产继承。',
    'zh-Hant': '查閱安勝 · 弘人律師行在卑詩省的核心法律業務領域：公司商事法、商業地產買賣過戶、民事訴訟、家庭法及遺囑信託遺產繼承。',
  };

  return buildLocalizedMetadata({
    title: titles[locale],
    description: descriptions[locale],
    cleanPath: '/practice-areas',
    locale,
  });
}

export default function PracticeAreasPage() {
  const { locale } = getRequestLocaleAndPath();

  const breadcrumbLabels = {
    en: { home: 'Home', practiceAreas: 'Practice Areas' },
    'zh-Hans': { home: '首页', practiceAreas: '业务领域' },
    'zh-Hant': { home: '首頁', practiceAreas: '業務領域' },
  }[locale];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: breadcrumbLabels.home, url: `${siteConfig.url}/${locale}` },
    { name: breadcrumbLabels.practiceAreas, url: `${siteConfig.url}/${locale}/practice-areas` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PracticeAreas />
    </>
  );
}
