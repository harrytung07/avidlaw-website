import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Define directories
const articlesDirectory = path.join(process.cwd(), 'public/articles');

export interface MultiLangContent {
  en: string;
  'zh-Hans': string;
  'zh-Hant': string;
}

export interface Article {
  id: string;
  category: MultiLangContent;
  title: MultiLangContent;
  date: string;
  author: string;
  role: MultiLangContent;
  image: string;
  preview: MultiLangContent;
  content: MultiLangContent;
}

export const CATEGORY_TRANSLATIONS: Record<string, { 'zh-Hans': string; 'zh-Hant': string }> = {
  'Real Estate': { 'zh-Hans': '房产与不动产', 'zh-Hant': '房產與不動產' },
  'Corporate Law': { 'zh-Hans': '公司与商业法', 'zh-Hant': '公司與商業法' },
  'Family Law': { 'zh-Hans': '家庭与婚姻法', 'zh-Hant': '家庭與婚姻法' },
  'Civil Litigation': { 'zh-Hans': '民事与商业诉讼', 'zh-Hant': '民事與商業訴訟' },
  'Wills & Estates': { 'zh-Hans': '遗嘱与遗产规划', 'zh-Hant': '遺囑與遺產規劃' },
  'Litigation': { 'zh-Hans': '诉讼业务', 'zh-Hant': '訴訟業務' },
  'General': { 'zh-Hans': '综合法律', 'zh-Hant': '綜合法律' },
};

export const ROLE_TRANSLATIONS: Record<string, { 'zh-Hans': string; 'zh-Hant': string }> = {
  'Barrister & Solicitor': { 'zh-Hans': '出庭律师兼事务律师', 'zh-Hant': '出庭律師兼事務律師' },
  'Legal Counsel': { 'zh-Hans': '法律顾问', 'zh-Hant': '法律顧問' },
  'Managing Lawyer': { 'zh-Hans': '主任律师', 'zh-Hant': '主任律師' },
  'Articling Student': { 'zh-Hans': '出庭律师兼事务律师', 'zh-Hant': '出庭律師兼事務律師' },
};

function normalizeDate(rawDate?: string): string {
  if (!rawDate) return '';
  const parsed = Date.parse(rawDate);
  if (!isNaN(parsed)) {
    const d = new Date(parsed);
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, '0');
    const day = String(d.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  return rawDate;
}

export async function getSortedArticles(): Promise<Article[]> {
  // We use the English folder as the "source of truth" for which articles exist
  const enDirectory = path.join(articlesDirectory, 'en');
  
  // If folder doesn't exist, return empty
  if (!fs.existsSync(enDirectory)) return [];

  const filenames = fs.readdirSync(enDirectory).filter((f) => f.endsWith('.md'));

  const allArticlesData: Article[] = filenames.map((filename) => {
    // Remove ".md" from file name to get id
    const id = filename.replace(/\.md$/, '');

    // Helper to read and parse a specific language file
    const getFileContent = (langFolder: string) => {
      const fullPath = path.join(articlesDirectory, langFolder, filename);
      if (fs.existsSync(fullPath)) {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        return matter(fileContents);
      }
      return null;
    };

    // Read all versions
    const enData = getFileContent('en');
    const hansData = getFileContent('zh-Hans');
    const hantData = getFileContent('zh-Hant');

    // Fallback: If a translation is missing, use English
    const base = enData || hansData || hantData;
    
    if (!base) {
      throw new Error(`Could not find content for ${filename}`);
    }

    const rawEnCategory = (enData?.data.category || base.data.category || 'General').trim();
    const hansCat = CATEGORY_TRANSLATIONS[rawEnCategory]?.['zh-Hans'] || hansData?.data.category || rawEnCategory;
    const hantCat = CATEGORY_TRANSLATIONS[rawEnCategory]?.['zh-Hant'] || hantData?.data.category || rawEnCategory;

    const rawRole = (base.data.role || 'Legal Counsel').trim();
    const hansRole = ROLE_TRANSLATIONS[rawRole]?.['zh-Hans'] || rawRole;
    const hantRole = ROLE_TRANSLATIONS[rawRole]?.['zh-Hant'] || rawRole;

    const rawDate = base.data.date || enData?.data.date || '';
    const isoDate = normalizeDate(rawDate);

    return {
      id,
      date: isoDate,
      author: base.data.author || 'Avid Law',
      role: {
        en: rawRole,
        'zh-Hans': hansRole,
        'zh-Hant': hantRole,
      },
      image: base.data.featuredImage || '/article1.png',
      
      // Multi-lang fields (Frontmatter)
      title: {
        en: enData?.data.title || base.data.title || '',
        'zh-Hans': hansData?.data.title || enData?.data.title || base.data.title || '',
        'zh-Hant': hantData?.data.title || enData?.data.title || base.data.title || '',
      },
      category: {
        en: rawEnCategory,
        'zh-Hans': hansCat,
        'zh-Hant': hantCat,
      },
      preview: {
        en: enData?.data.preview || base.data.preview || '',
        'zh-Hans': hansData?.data.preview || enData?.data.preview || base.data.preview || '',
        'zh-Hant': hantData?.data.preview || enData?.data.preview || base.data.preview || '',
      },
      // Content (The body of the markdown)
      content: {
        en: enData?.content || base.content || '',
        'zh-Hans': hansData?.content || enData?.content || base.content || '',
        'zh-Hant': hantData?.content || enData?.content || base.content || '',
      },
    };
  });

  // Sort articles in true reverse-chronological order
  return allArticlesData.sort((a, b) => {
    const timeA = Date.parse(a.date) || 0;
    const timeB = Date.parse(b.date) || 0;
    return timeB - timeA;
  });
}

export async function getArticleById(id: string): Promise<Article | undefined> {
  const articles = await getSortedArticles();
  return articles.find((article) => article.id === id);
}

export async function getAllArticleIds(): Promise<string[]> {
  const articles = await getSortedArticles();
  return articles.map((article) => article.id);
}
