import { Suspense } from "react";
import Forms from "@/components/Forms";
import type { Metadata } from "next";
import {
  getRequestLocaleAndPath,
  buildLocalizedMetadata,
  generateBreadcrumbSchema,
} from "@/lib/seo";
import { siteConfig } from "@/config/site";

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = getRequestLocaleAndPath();

  const titles = {
    en: "Client Intake & Legal Questionnaires | Avid Law Corporation",
    "zh-Hans": "客户登记与法定问卷中心 | 安胜 · 弘人律师行",
    "zh-Hant": "客戶登記與法定問卷中心 | 安勝 · 弘人律師行",
  };

  const descriptions = {
    en: "Complete secure online client intake forms and family law questionnaires for Avid Law Corporation in Richmond, BC. Attorney-client privileged.",
    "zh-Hans": "在线安全填写安胜 · 弘人律师行咨询预约登记表及卑诗省家庭法离婚问卷。严格受律师执业保密特权保护。",
    "zh-Hant": "在線安全填寫安勝 · 弘人律師行諮詢預約登記表及卑詩省家庭法離婚問卷。嚴格受律師執業保密特權保護。",
  };

  return buildLocalizedMetadata({
    title: titles[locale],
    description: descriptions[locale],
    cleanPath: "/forms",
    locale,
  });
}

export default function FormsPage() {
  const { locale } = getRequestLocaleAndPath();

  const breadcrumbLabels = {
    en: { home: "Home", forms: "Forms & Intake" },
    "zh-Hans": { home: "首页", forms: "客户表格与问卷" },
    "zh-Hant": { home: "首頁", forms: "客戶表格與問卷" },
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
      <Suspense
        fallback={
          <div className="min-h-screen bg-zinc-900 flex items-center justify-center text-white">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FFC107]"></div>
          </div>
        }
      >
        <Forms />
      </Suspense>
    </>
  );
}
