import { headers } from 'next/headers';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export type Locale = 'en' | 'zh-Hans' | 'zh-Hant';

export function getRequestLocaleAndPath(): { locale: Locale; cleanPath: string } {
  try {
    const headersList = headers();
    const rawLocale = headersList.get('x-locale');
    const rawPath = headersList.get('x-clean-pathname');

    const locale: Locale =
      rawLocale === 'zh-Hans' || rawLocale === 'zh-Hant' ? rawLocale : 'en';
    const cleanPath = rawPath && rawPath.startsWith('/') ? rawPath : '/';

    return { locale, cleanPath };
  } catch {
    return { locale: 'en', cleanPath: '/' };
  }
}

interface BuildMetadataParams {
  title: string;
  description: string;
  cleanPath: string;
  locale?: Locale;
  ogImage?: string;
  type?: 'website' | 'article';
}

export function buildLocalizedMetadata({
  title,
  description,
  cleanPath,
  locale = 'en',
  ogImage,
  type = 'website',
}: BuildMetadataParams): Metadata {
  const normalizedPath = cleanPath === '/' ? '' : cleanPath.replace(/\/$/, '');
  const canonicalUrl = `${siteConfig.url}/${locale}${normalizedPath}`;
  const image = ogImage || siteConfig.ogImage;

  const ogLocaleMap: Record<Locale, string> = {
    en: 'en_CA',
    'zh-Hans': 'zh_CN',
    'zh-Hant': 'zh_TW',
  };

  return {
    title: `${title} | Avid Law`,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${siteConfig.url}/en${normalizedPath}`,
        'zh-Hans': `${siteConfig.url}/zh-Hans${normalizedPath}`,
        'zh-Hant': `${siteConfig.url}/zh-Hant${normalizedPath}`,
        'x-default': `${siteConfig.url}/en${normalizedPath}`,
      },
    },
    openGraph: {
      title: `${title} | Avid Law`,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: ogLocaleMap[locale],
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${title} - Avid Law Corporation`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Avid Law`,
      description,
      images: [image],
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
