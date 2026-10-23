import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { siteConfig } from '@/config/site';
import { practiceAreasData } from '@/lib/practiceAreasData';
import { getSortedArticles } from '@/lib/articles';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  const locales = siteConfig.locales;
  const now = new Date();

  const staticRoutes = [
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/practice-areas', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/team', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/articles', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/news', priority: 0.8, changeFrequency: 'weekly' as const },
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // 1. Static Routes across all 3 locales
  for (const route of staticRoutes) {
    const routePath = route.path;
    const languages: Record<string, string> = {
      en: `${baseUrl}/en${routePath}`,
      'zh-Hans': `${baseUrl}/zh-Hans${routePath}`,
      'zh-Hant': `${baseUrl}/zh-Hant${routePath}`,
      'x-default': `${baseUrl}/en${routePath}`,
    };

    for (const loc of locales) {
      sitemapEntries.push({
        url: `${baseUrl}/${loc}${routePath}`,
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages,
        },
      });
    }
  }

  // 2. High-Intent Practice Area Detail Pages
  for (const area of practiceAreasData) {
    const areaPath = `/practice-areas/${area.slug}`;
    const languages: Record<string, string> = {
      en: `${baseUrl}/en${areaPath}`,
      'zh-Hans': `${baseUrl}/zh-Hans${areaPath}`,
      'zh-Hant': `${baseUrl}/zh-Hant${areaPath}`,
      'x-default': `${baseUrl}/en${areaPath}`,
    };

    for (const loc of locales) {
      sitemapEntries.push({
        url: `${baseUrl}/${loc}${areaPath}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.9,
        alternates: {
          languages,
        },
      });
    }
  }

  // 3. News Articles from public/articles/news
  const newsDir = path.join(process.cwd(), 'public/articles/news');
  if (fs.existsSync(newsDir)) {
    try {
      const files = fs.readdirSync(newsDir).filter((file) => file.endsWith('.md'));
      for (const file of files) {
        const slug = file.replace(/\.md$/, '');
        const newsPath = `/news/${slug}`;
        let articleDate = now;

        try {
          const filePath = path.join(newsDir, file);
          const raw = fs.readFileSync(filePath, 'utf8');
          const { data } = matter(raw);
          if (data.date) {
            articleDate = new Date(data.date);
          }
        } catch {
          // fallback to now
        }

        const languages: Record<string, string> = {
          en: `${baseUrl}/en${newsPath}`,
          'zh-Hans': `${baseUrl}/zh-Hans${newsPath}`,
          'zh-Hant': `${baseUrl}/zh-Hant${newsPath}`,
          'x-default': `${baseUrl}/en${newsPath}`,
        };

        for (const loc of locales) {
          sitemapEntries.push({
            url: `${baseUrl}/${loc}${newsPath}`,
            lastModified: articleDate,
            changeFrequency: 'monthly',
            priority: 0.7,
            alternates: {
              languages,
            },
          });
        }
      }
    } catch (err) {
      console.error('Error reading news articles for sitemap:', err);
    }
  }

  // 4. Dedicated Legal Articles from getSortedArticles()
  try {
    const legalArticles = await getSortedArticles();
    for (const article of legalArticles) {
      const articlePath = `/articles/${article.id}`;
      let articleDate = now;
      if (article.date) {
        const parsed = new Date(article.date);
        if (!isNaN(parsed.getTime())) {
          articleDate = parsed;
        }
      }

      const languages: Record<string, string> = {
        en: `${baseUrl}/en${articlePath}`,
        'zh-Hans': `${baseUrl}/zh-Hans${articlePath}`,
        'zh-Hant': `${baseUrl}/zh-Hant${articlePath}`,
        'x-default': `${baseUrl}/en${articlePath}`,
      };

      for (const loc of locales) {
        sitemapEntries.push({
          url: `${baseUrl}/${loc}${articlePath}`,
          lastModified: articleDate,
          changeFrequency: 'monthly',
          priority: 0.7,
          alternates: {
            languages,
          },
        });
      }
    }
  } catch (err) {
    console.error('Error reading legal articles for sitemap:', err);
  }

  return sitemapEntries;
}
