import React from "react";
import type { Metadata } from 'next';
import { LawFirmLanding } from "../components/LawFirmLanding";
import { getRequestLocaleAndPath, buildLocalizedMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = getRequestLocaleAndPath();

  const titles = {
    en: 'Avid Law Corporation | Full-Service Law Firm in Richmond, BC',
    'zh-Hans': '安胜 · 弘人律师行 | 卑诗省列治文综合性律师事务所',
    'zh-Hant': '安勝 · 弘人律師行 | 卑詩省列治文綜合性律師事務所',
  };

  return buildLocalizedMetadata({
    title: titles[locale],
    description: siteConfig.description[locale],
    cleanPath: '',
    locale,
  });
}

export default function Page() {
  const { locale } = getRequestLocaleAndPath();

  const rootSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LegalService',
        '@id': `${siteConfig.url}/#legalservice`,
        name: siteConfig.name,
        alternateName: [
          siteConfig.chineseName,
          siteConfig.traditionalChineseName,
          "Avid Law",
          "CNS Law Corporation",
          "Redman Law",
        ],
        url: `${siteConfig.url}/${locale}`,
        logo: `${siteConfig.url}/Logo.svg`,
        image: `${siteConfig.url}/og-image.jpg`,
        telephone: siteConfig.telephone,
        email: siteConfig.email,
        priceRange: '$$',
        foundingDate: '2009',
        areaServed: {
          '@type': 'AdministrativeArea',
          name: siteConfig.areaServed,
        },
        currenciesAccepted: 'CAD',
        paymentAccepted: 'Cash, Credit Card, Bank Draft, Wire Transfer',
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '17:30',
          },
        ],
        location: [
          {
            '@type': 'Place',
            name: siteConfig.primaryOffice.name,
            address: {
              '@type': 'PostalAddress',
              streetAddress: siteConfig.primaryOffice.streetAddress,
              addressLocality: siteConfig.primaryOffice.addressLocality,
              addressRegion: siteConfig.primaryOffice.addressRegion,
              postalCode: siteConfig.primaryOffice.postalCode,
              addressCountry: siteConfig.primaryOffice.addressCountry,
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 49.1691,
              longitude: -123.1311,
            },
            hasMap: 'https://maps.google.com/?q=5811+Cooney+Road+Richmond+BC',
          },
          {
            '@type': 'Place',
            name: siteConfig.secondaryOffice.name,
            address: {
              '@type': 'PostalAddress',
              streetAddress: siteConfig.secondaryOffice.streetAddress,
              addressLocality: siteConfig.secondaryOffice.addressLocality,
              addressRegion: siteConfig.secondaryOffice.addressRegion,
              postalCode: siteConfig.secondaryOffice.postalCode,
              addressCountry: siteConfig.secondaryOffice.addressCountry,
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 49.1837,
              longitude: -123.1362,
            },
            hasMap: 'https://maps.google.com/?q=4000+No+3+Road+Richmond+BC',
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
      },
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        inLanguage: ['en', 'zh-Hans', 'zh-Hant'],
        publisher: {
          '@id': `${siteConfig.url}/#legalservice`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(rootSchema) }}
      />
      <LawFirmLanding />
    </>
  );
}
