import TeamPage from "@/components/TeamPage";
import type { Metadata } from 'next';
import { getRequestLocaleAndPath, buildLocalizedMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import { siteConfig } from '@/config/site';

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = getRequestLocaleAndPath();

  const titles = {
    en: 'Our Legal Team | Avid Law Corporation',
    'zh-Hans': '专业律师团队 | 安胜 · 弘人律师行',
    'zh-Hant': '專業律師團隊 | 安勝 · 弘人律師行',
  };

  const descriptions = {
    en: 'Meet the dedicated barristers, solicitors, and legal professionals at Avid Law Corporation in Richmond, BC. Serving clients in English, Mandarin, and Cantonese.',
    'zh-Hans': '结识安胜 · 弘人律师行出庭大律师、事务律师及专业法律团队。立足列治文，以专业、敬业与多语种优势为大温各界提供高标准法律服务。',
    'zh-Hant': '結識安勝 · 弘人律師行出庭大律師、事務律師及專業法律團隊。立足列治文，以專業、敬業與多語種優勢為大溫各界提供高標準法律服務。',
  };

  return buildLocalizedMetadata({
    title: titles[locale],
    description: descriptions[locale],
    cleanPath: '/team',
    locale,
  });
}

export default function Team() {
  const { locale } = getRequestLocaleAndPath();

  const breadcrumbLabels = {
    en: { home: 'Home', team: 'Our Team' },
    'zh-Hans': { home: '首页', team: '律师团队' },
    'zh-Hant': { home: '首頁', team: '律師團隊' },
  }[locale];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: breadcrumbLabels.home, url: `${siteConfig.url}/${locale}` },
    { name: breadcrumbLabels.team, url: `${siteConfig.url}/${locale}/team` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <TeamPage />
    </>
  );
}
