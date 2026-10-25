import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import NavBar from '@/components/NavBar';
import {
  practiceAreasData,
  getPracticeAreaBySlug,
  getAllPracticeAreaSlugs,
  SupportedLocale,
} from '@/lib/practiceAreasData';
import { siteConfig } from '@/config/site';
import { getRequestLocaleAndPath, buildLocalizedMetadata, generateBreadcrumbSchema } from '@/lib/seo';

interface PracticeAreaPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return getAllPracticeAreaSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PracticeAreaPageProps): Promise<Metadata> {
  const area = getPracticeAreaBySlug(params.slug);
  if (!area) {
    return {
      title: 'Practice Area Not Found',
    };
  }

  const { locale } = getRequestLocaleAndPath();
  const cleanPath = `/practice-areas/${params.slug}`;

  return buildLocalizedMetadata({
    title: area.metaTitle[locale],
    description: area.metaDescription[locale],
    cleanPath,
    locale,
  });
}

export default async function PracticeAreaSlugPage({ params }: PracticeAreaPageProps) {
  const area = getPracticeAreaBySlug(params.slug);
  if (!area) {
    notFound();
  }

  const { locale } = getRequestLocaleAndPath();

  // Localized texts
  const labels = {
    en: {
      home: 'Home',
      practiceAreas: 'Practice Areas',
      practiceBadge: 'British Columbia Law Practice',
      sidebarDesc: 'Consult with experienced lawyers regarding your transaction, contract, or court matter in British Columbia.',
      executiveSummaryTitle: 'Executive Legal Summary (British Columbia)',
      statutoryHeading: 'Governing BC Statutory & Regulatory Framework',
      proceduresHeading: 'Key Transactional & Legal Procedures',
      comparisonHeading: 'Comparative Legal Analysis & Structuring',
      faqHeading: 'Frequently Asked Legal Questions',
      bookConsultation: 'Schedule a Consultation',
      contactCounsel: 'Contact Legal Counsel',
      phoneLabel: 'Direct Line:',
      officeLabel: 'Offices:',
      primaryOffice: 'Richmond - Cooney Road (Pacific Business Centre)',
      secondaryOffice: 'Richmond - No. 3 Road (Aberdeen Square)',
      lawSocietyDisclaimer:
        'Legal information presented is specific to the laws of British Columbia, Canada. Content is for informational purposes and does not constitute a solicitor-client relationship.',
      copyright: '© {currentYear} Avid Law Corporation. All rights reserved.',
    },
    'zh-Hans': {
      home: '首页',
      practiceAreas: '业务领域',
      practiceBadge: '卑诗省法律实务专页',
      sidebarDesc: '就您在卑诗省的商业交易、合同起草或法庭诉讼事务，预约资深律师进行保密法律咨询。',
      executiveSummaryTitle: '卑诗省法律核心要点概述（BLUF Summary）',
      statutoryHeading: '卑诗省适用成文法与监管法规依据',
      proceduresHeading: '核心法律程序与交易交割实操',
      comparisonHeading: '法律机制对比与架构分析',
      faqHeading: '常见法律实务问答（FAQ）',
      bookConsultation: '预约资深律师咨询',
      contactCounsel: '联系我们',
      phoneLabel: '电话专线：',
      officeLabel: '办公地址：',
      primaryOffice: '列治文中心 - 库尼路办公室（太平洋商业中心）',
      secondaryOffice: '列治文时代坊 - 三号路办公室（时代广场）',
      lawSocietyDisclaimer:
        '本页法律资讯仅适用于加拿大卑诗省法律。内容仅供参考，不构成正式的律师与客户委托代理关系。',
      copyright: '© {currentYear} 安胜 · 弘人律师行 版权所有。',
    },
    'zh-Hant': {
      home: '首頁',
      practiceAreas: '業務領域',
      practiceBadge: '卑詩省法律實務專頁',
      sidebarDesc: '就您在卑詩省的商業交易、合同起草或法庭訴訟事務，預約資深律師進行保密法律諮詢。',
      executiveSummaryTitle: '卑詩省法律核心要點概述（BLUF Summary）',
      statutoryHeading: '卑詩省適用成文法與監管法規依據',
      proceduresHeading: '核心法律程序與交易交割實操',
      comparisonHeading: '法律機制對比與架構分析',
      faqHeading: '常見法律實務問答（FAQ）',
      bookConsultation: '預約資深律師諮詢',
      contactCounsel: '聯繫我們',
      phoneLabel: '電話專線：',
      officeLabel: '辦公地址：',
      primaryOffice: '列治文中心 - 庫尼路辦公室（太平洋商業中心）',
      secondaryOffice: '列治文時代坊 - 三號路辦公室（時代廣場）',
      lawSocietyDisclaimer:
        '本頁法律資訊僅適用於加拿大卑詩省法律。內容僅供參考，不構成正式的律師與客戶委託代理關係。',
      copyright: '© {currentYear} 安勝 · 弘人律師行 版權所有。',
    },
  }[locale];

  const currentPath = `/practice-areas/${area.slug}`;
  const canonicalUrl = `${siteConfig.url}/${locale}${currentPath}`;

  // Structured Data (JSON-LD) Schemas
  const legalServiceSchema = {
    '@type': 'LegalService',
    '@id': `${canonicalUrl}#legalservice`,
    name: `${area.title[locale]} - ${siteConfig.name}`,
    description: area.metaDescription[locale],
    url: canonicalUrl,
    telephone: siteConfig.telephone,
    email: siteConfig.email,
    priceRange: '$$',
    areaServed: {
      '@type': 'AdministrativeArea',
      name: siteConfig.areaServed,
    },
    currenciesAccepted: 'CAD',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:30',
      },
    ],
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: siteConfig.primaryOffice.streetAddress,
        addressLocality: siteConfig.primaryOffice.addressLocality,
        addressRegion: siteConfig.primaryOffice.addressRegion,
        postalCode: siteConfig.primaryOffice.postalCode,
        addressCountry: siteConfig.primaryOffice.addressCountry,
      },
      {
        '@type': 'PostalAddress',
        streetAddress: siteConfig.secondaryOffice.streetAddress,
        addressLocality: siteConfig.secondaryOffice.addressLocality,
        addressRegion: siteConfig.secondaryOffice.addressRegion,
        postalCode: siteConfig.secondaryOffice.postalCode,
        addressCountry: siteConfig.secondaryOffice.addressCountry,
      },
    ],
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: labels.home, url: `${siteConfig.url}/${locale}` },
    { name: labels.practiceAreas, url: `${siteConfig.url}/${locale}/practice-areas` },
    { name: area.title[locale], url: canonicalUrl },
  ]);

  const faqSchema = {
    '@type': 'FAQPage',
    '@id': `${canonicalUrl}#faq`,
    mainEntity: area.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question[locale],
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer[locale],
      },
    })),
  };

  const jsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': [legalServiceSchema, breadcrumbSchema, faqSchema],
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-[#FFC107] selection:text-black">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />

      <NavBar />

      <main className="pt-24 pb-20">
        {/* Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
          <nav aria-label="Breadcrumb" className="text-xs text-zinc-400">
            <ol className="flex items-center space-x-2">
              <li>
                <Link
                  href={`/${locale}`}
                  className="hover:text-[#FFC107] transition-colors"
                >
                  {labels.home}
                </Link>
              </li>
              <li>
                <span className="text-zinc-600">/</span>
              </li>
              <li>
                <Link
                  href={`/${locale}/practice-areas`}
                  className="hover:text-[#FFC107] transition-colors"
                >
                  {labels.practiceAreas}
                </Link>
              </li>
              <li>
                <span className="text-zinc-600">/</span>
              </li>
              <li className="text-[#FFC107] font-medium truncate max-w-xs sm:max-w-md" aria-current="page">
                {area.title[locale]}
              </li>
            </ol>
          </nav>
        </div>

        {/* Hero Section */}
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-zinc-800">
          <div className="max-w-4xl">
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-[#FFC107] uppercase bg-[#FFC107]/10 rounded-full border border-[#FFC107]/20 mb-4">
              {labels.practiceBadge}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight text-balance">
              {area.title[locale]}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed text-pretty max-w-3xl">
              {area.heroDescription[locale]}
            </p>
          </div>

          {/* Bottom-Line-Up-Front (BLUF) Direct Answer Summary Box for AI Overviews / Google Snippets */}
          <div
            id="executive-summary"
            className="mt-8 p-6 sm:p-7 rounded-2xl bg-zinc-900/90 border border-zinc-800 border-l-4 border-l-[#FFC107] outline outline-1 -outline-offset-1 outline-white/5 shadow-xl"
          >
            <div className="flex items-center space-x-2 text-xs font-semibold text-[#FFC107] uppercase tracking-wider mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{labels.executiveSummaryTitle}</span>
            </div>
            <p className="text-base sm:text-lg text-zinc-100 font-sans font-medium leading-relaxed text-pretty">
              {area.directAnswer[locale]}
            </p>
          </div>
        </header>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left 2 Columns: Core Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Statutory Framework Anchors */}
              <section aria-labelledby="statutory-framework-heading" className="space-y-4">
                <h2
                  id="statutory-framework-heading"
                  className="text-xl sm:text-2xl font-serif font-semibold text-white border-b border-zinc-800 pb-3 flex items-center gap-2 text-balance"
                >
                  <span className="w-2 h-6 bg-[#FFC107] inline-block rounded-sm"></span>
                  {labels.statutoryHeading}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {area.statutoryFramework[locale].map((statute, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800/80 outline outline-1 -outline-offset-1 outline-white/5 flex items-start space-x-3 hover:border-zinc-700/80 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-[#FFC107] shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                      <span className="text-xs sm:text-sm text-zinc-300 font-mono leading-snug tabular-nums">
                        {statute}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Key Procedures */}
              <section aria-labelledby="key-procedures-heading" className="space-y-4">
                <h2
                  id="key-procedures-heading"
                  className="text-xl sm:text-2xl font-serif font-semibold text-white border-b border-zinc-800 pb-3 flex items-center gap-2 text-balance"
                >
                  <span className="w-2 h-6 bg-[#FFC107] inline-block rounded-sm"></span>
                  {labels.proceduresHeading}
                </h2>
                <div className="space-y-4 pt-2">
                  {area.keyProcedures[locale].map((proc, idx) => (
                    <div
                      key={idx}
                      className="p-5 sm:p-6 rounded-xl bg-zinc-900 border border-zinc-800 outline outline-1 -outline-offset-1 outline-white/5 hover:border-zinc-700/90 transition-[border-color] duration-150 ease-out"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#FFC107]/15 text-[#FFC107] text-xs font-bold font-mono border border-[#FFC107]/30 tabular-nums shrink-0">
                          {idx + 1}
                        </span>
                        <h3 className="text-base font-semibold text-white text-balance">
                          {proc.title}
                        </h3>
                      </div>
                      <p className="text-sm text-zinc-300 pl-10 leading-relaxed text-pretty">
                        {proc.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Semantic HTML Comparison Table */}
              <section aria-labelledby="comparison-table-heading" className="space-y-4">
                <h2
                  id="comparison-table-heading"
                  className="text-xl sm:text-2xl font-serif font-semibold text-white border-b border-zinc-800 pb-3 flex items-center gap-2 text-balance"
                >
                  <span className="w-2 h-6 bg-[#FFC107] inline-block rounded-sm"></span>
                  {area.comparisonTable.title[locale]}
                </h2>
                <p className="text-xs text-zinc-400 text-pretty">
                  {labels.comparisonHeading}
                </p>
                <div className="overflow-x-auto rounded-xl border border-zinc-800 outline outline-1 -outline-offset-1 outline-white/5 shadow-xl">
                  <table className="w-full text-left text-sm text-zinc-200">
                    <thead className="bg-zinc-900/95 text-xs uppercase tracking-wider text-zinc-400 border-b border-zinc-800">
                      <tr>
                        <th scope="col" className="px-5 py-3.5 font-semibold text-[#FFC107]">
                          {area.comparisonTable.headers[locale][0]}
                        </th>
                        <th scope="col" className="px-5 py-3.5 font-semibold text-white">
                          {area.comparisonTable.headers[locale][1]}
                        </th>
                        <th scope="col" className="px-5 py-3.5 font-semibold text-white">
                          {area.comparisonTable.headers[locale][2]}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/80 bg-zinc-950/60 font-sans">
                      {area.comparisonTable.rows.map((row, rIdx) => (
                        <tr
                          key={rIdx}
                          className="hover:bg-zinc-900/60 transition-colors"
                        >
                          <td className="px-5 py-4 font-medium text-white align-top whitespace-normal min-w-[140px] text-pretty">
                            {row.dimension[locale]}
                          </td>
                          <td className="px-5 py-4 text-zinc-300 align-top leading-relaxed min-w-[200px] text-pretty">
                            {row.optionA[locale]}
                          </td>
                          <td className="px-5 py-4 text-zinc-300 align-top leading-relaxed min-w-[200px] text-pretty">
                            {row.optionB[locale]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Long-Tail Conversational FAQs (< 80 words each) */}
              <section aria-labelledby="faqs-heading" className="space-y-4 pt-4">
                <h2
                  id="faqs-heading"
                  className="text-xl sm:text-2xl font-serif font-semibold text-white border-b border-zinc-800 pb-3 flex items-center gap-2 text-balance"
                >
                  <span className="w-2 h-6 bg-[#FFC107] inline-block rounded-sm"></span>
                  {labels.faqHeading}
                </h2>
                <div className="space-y-4 pt-2">
                  {area.faqs.map((faq, fIdx) => (
                    <article
                      key={fIdx}
                      className="p-5 sm:p-6 rounded-xl bg-zinc-900/90 border border-zinc-800 outline outline-1 -outline-offset-1 outline-white/5 hover:border-zinc-700/80 transition-colors"
                    >
                      <h3 className="text-base font-semibold text-[#FFC107] mb-2 flex items-start gap-2 text-balance">
                        <span className="text-zinc-500 font-mono text-sm shrink-0">Q:</span>
                        <span>{faq.question[locale]}</span>
                      </h3>
                      <p className="text-sm text-zinc-300 pl-6 leading-relaxed text-pretty">
                        {faq.answer[locale]}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column: Sticky Consultation Sidebar & Office Info */}
            <aside aria-label="Legal Counsel Contact" className="space-y-6">
              <div className="sticky top-28 rounded-2xl bg-zinc-900 border border-zinc-800 outline outline-1 -outline-offset-1 outline-white/5 p-6 sm:p-7 shadow-2xl space-y-6">
                <div>
                  <h3 className="text-lg font-serif font-bold text-white mb-2 text-balance">
                    {labels.bookConsultation}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed text-pretty">
                    {labels.sidebarDesc}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <a
                    href={`/${locale}/forms?type=consultation`}
                    className="w-full inline-flex items-center justify-center min-h-[44px] px-5 py-3 rounded-lg bg-[#FFC107] text-zinc-950 font-bold text-sm shadow-md shadow-[#FFC107]/20 hover:bg-[#ffcb38] hover:shadow-lg active:scale-[0.97] transition-[background-color,box-shadow,transform] duration-150 ease-out"
                  >
                    {labels.bookConsultation}
                  </a>
                  <a
                    href={`tel:${siteConfig.telephone}`}
                    className="w-full inline-flex items-center justify-center min-h-[44px] px-5 py-3 rounded-lg border border-zinc-700 bg-zinc-800/80 text-white font-medium text-sm hover:border-[#FFC107] hover:bg-zinc-800 active:scale-[0.97] transition-[border-color,background-color,transform] duration-150 ease-out font-mono tabular-nums"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2 text-[#FFC107] shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    {siteConfig.telephone}
                  </a>
                </div>

                <div className="border-t border-zinc-800 pt-5 space-y-4 text-xs text-zinc-300">
                  <div>
                    <span className="font-semibold text-white block mb-1 text-balance">
                      {labels.primaryOffice}
                    </span>
                    <p className="text-zinc-400">
                      {siteConfig.primaryOffice.streetAddress}
                      <br />
                      {siteConfig.primaryOffice.addressLocality}, {siteConfig.primaryOffice.addressRegion} {siteConfig.primaryOffice.postalCode}
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold text-white block mb-1 text-balance">
                      {labels.secondaryOffice}
                    </span>
                    <p className="text-zinc-400">
                      {siteConfig.secondaryOffice.streetAddress}
                      <br />
                      {siteConfig.secondaryOffice.addressLocality}, {siteConfig.secondaryOffice.addressRegion} {siteConfig.secondaryOffice.postalCode}
                    </p>
                  </div>
                </div>

                <div className="border-t border-zinc-800 pt-4">
                  <p className="text-[11px] text-zinc-500 leading-normal text-pretty">
                    {labels.lawSocietyDisclaimer}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 text-zinc-400 py-10 border-t border-zinc-800 text-center text-sm">
        <p className="text-zinc-400 font-mono tabular-nums">
          {labels.copyright.replace('{currentYear}', new Date().getFullYear().toString())}
        </p>
      </footer>
    </div>
  );
}
