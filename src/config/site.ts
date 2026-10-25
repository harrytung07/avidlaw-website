export const siteConfig = {
  name: "Avid Law Corporation",
  chineseName: "安胜 · 弘人律师行",
  traditionalChineseName: "安勝 · 弘人律師行",
  url: "https://www.avid-law.com",
  ogImage: "https://www.avid-law.com/og-image.jpg",
  foundedYear: 2009,
  telephone: "+1-604-273-7565",
  email: "info@avid-law.com",
  areaServed: "British Columbia",
  primaryOffice: {
    name: "Pacific Business Centre",
    streetAddress: "5811 Cooney Road, Suite 602 North Tower",
    addressLocality: "Richmond",
    addressRegion: "BC",
    postalCode: "V6X 3M1",
    addressCountry: "CA",
  },
  secondaryOffice: {
    name: "Aberdeen Square",
    streetAddress: "4000 No. 3 Road, Unit 5235",
    addressLocality: "Richmond",
    addressRegion: "BC",
    postalCode: "V6X 0J8",
    addressCountry: "CA",
  },
  description: {
    en: "Avid Law Corporation is a premier multi-service law firm based in Richmond, British Columbia. Founded in 2009, we provide trusted legal counsel in Corporate & Commercial Law, Commercial Real Estate & Conveyancing, Civil Litigation, Family Law, and Wills & Estates in English, Mandarin, and Cantonese.",
    "zh-Hans": "安胜 · 弘人律师行（Avid Law Corporation）是位于加拿大卑诗省列治文市的大型综合性律师事务所，成立于2009年。我们以普通话、粤语和英语，在公司商事法、商业地产与过户、民事诉讼、家庭法及遗嘱信托遗产等领域提供权威专业的法律服务。",
    "zh-Hant": "安勝 · 弘人律師行（Avid Law Corporation）是位於加拿大卑詩省列治文市的大型綜合性律師事務所，成立於2009年。我們以普通話、粵語及英語，在公司商事法、商業地產與過戶、民事訴訟、家庭法及遺囑信託遺產等領域提供權威專業的法律服務。",
  },
  locales: ["en", "zh-Hans", "zh-Hant"] as const,
  defaultLocale: "en" as const,
};

export type SiteConfig = typeof siteConfig;
