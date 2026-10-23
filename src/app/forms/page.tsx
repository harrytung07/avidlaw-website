import Forms from '@/components/Forms';
import type { Metadata } from 'next';
import { getRequestLocaleAndPath, buildLocalizedMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import { siteConfig } from '@/config/site';

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = getRequestLocaleAndPath();

  const titles = {
    en: 'Client Intake Forms | Avid Law Corporation',
    'zh-Hans': '客户登记与委托表格 | 安胜 · 弘人律师行',
    'zh-Hant': '客戶登記與委託表格 | 安勝 · 弘人律師行',
  };

  const descriptions = {
    en: 'Access secure online client intake forms and legal questionnaire documents for Avid Law Corporation in Richmond, British Columbia.',
    'zh-Hans': '在线查阅并提交安胜 · 弘人律师行客户登记、房地产过户及公司法律事务委托表格。',
    'zh-Hant': '在線查閱並提交安勝 · 弘人律師行客戶登記、房地產過戶及公司法律事務委託表格。',
  };

  return buildLocalizedMetadata({
    title: titles[locale],
    description: descriptions[locale],
    cleanPath: '/forms',
    locale,
  });
}

export default function FormsPage() {
  const { locale } = getRequestLocaleAndPath();

  const breadcrumbLabels = {
    en: { home: 'Home', forms: 'Forms' },
    'zh-Hans': { home: '首页', forms: '表格' },
    'zh-Hant': { home: '首頁', forms: '表格' },
  }[locale];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: breadcrumbLabels.home, url: `${siteConfig.url}/${locale}` },
    { name: breadcrumbLabels.forms, url: `${siteConfig.url}/${locale}/forms` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Forms />
    </>
  );
}
