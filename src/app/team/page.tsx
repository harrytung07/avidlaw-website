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

  const lawyers = [
    {
      name: "David C. Chen",
      role: "Barrister & Solicitor",
      slug: "david-chen",
      image: "/members/2. David Chen.jpg",
      languages: ["English", "Mandarin", "Cantonese"],
    },
    {
      name: "Adele Sun",
      role: "Barrister & Solicitor",
      slug: "adele-sun",
      image: "/members/Adele1.JPG",
      languages: ["English", "Mandarin"],
    },
    {
      name: "Brent Desruisseaux",
      role: "Barrister & Solicitor",
      slug: "brent-desruisseaux",
      image: "/members/3. Brent Desruisseaux.jpg",
      languages: ["English"],
    },
    {
      name: "Abiel Kwok",
      role: "Barrister & Solicitor",
      slug: "abiel-kwok",
      image: "/members/abiel1.JPG",
      languages: ["English", "Cantonese"],
    },
    {
      name: "Kun Dong",
      role: "Barrister & Solicitor",
      slug: "kun-dong",
      image: "/members/kun.jpg",
      languages: ["English", "Mandarin"],
    },
    {
      name: "Nicole Tam",
      role: "Barrister & Solicitor",
      slug: "nicole-tam",
      image: "/members/nicole.jpg",
      languages: ["English", "Cantonese"],
    },
    {
      name: "Corey Poon",
      role: "Barrister & Solicitor",
      slug: "corey-poon",
      image: "/members/4. Corey Poon.jpg",
      languages: ["English", "Cantonese"],
    },
    {
      name: "Howard Qu",
      role: "Barrister & Solicitor",
      slug: "howard-qu",
      image: "/members/5. Howard Qu.jpg",
      languages: ["English", "Mandarin"],
    },
    {
      name: "Rachel Li",
      role: "Barrister & Solicitor",
      slug: "rachel-li",
      image: "/members/7. Rachel Li.jpg",
      languages: ["English", "Mandarin"],
    },
  ];

  const attorneySchemas = lawyers.map((lawyer) => ({
    '@type': 'Attorney',
    '@id': `${siteConfig.url}/#attorney-${lawyer.slug}`,
    name: lawyer.name,
    jobTitle: lawyer.role,
    image: `${siteConfig.url}${lawyer.image}`,
    worksFor: {
      '@type': 'LegalService',
      '@id': `${siteConfig.url}/#legalservice`,
      name: siteConfig.name,
    },
    knowsLanguage: lawyer.languages,
  }));

  const jsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': [breadcrumbSchema, ...attorneySchemas],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />
      <TeamPage />
    </>
  );
}
