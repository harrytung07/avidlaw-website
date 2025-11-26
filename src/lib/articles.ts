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
  id: string; // Changed from number to string (filename) for better uniqueness
  category: string | MultiLangContent;
  title: string | MultiLangContent;
  date: string;
  author: string;
  role: string;
  image: string;
  preview: string | MultiLangContent;
  content: string | MultiLangContent;
}

export async function getSortedArticles(): Promise<Article[]> {
  // We use the English folder as the "source of truth" for which articles exist
  const enDirectory = path.join(articlesDirectory, 'en');
  
  // If folder doesn't exist, return empty
  if (!fs.existsSync(enDirectory)) return [];

  const filenames = fs.readdirSync(enDirectory);

  const allArticlesData = filenames.map((filename) => {
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

    // Construct the MultiLangContent objects
    const constructField = (field: string): string | MultiLangContent => {
      // If it's a simple string in frontmatter (like date), return it directly
      // If it's text content, structure it
      return {
        en: enData?.data[field] || enData?.content || "",
        'zh-Hans': hansData?.data[field] || hansData?.content || enData?.data[field] || "",
        'zh-Hant': hantData?.data[field] || hantData?.content || enData?.data[field] || "",
      } as any; // Cast mainly because accessing data[field] vs content varies
    };

    return {
      id,
      date: base.data.date,
      author: base.data.author,
      role: base.data.role,
      image: base.data.featuredImage, // Mapping featuredImage from MD to image prop
      
      // Multi-lang fields (Frontmatter)
      title: {
        en: enData?.data.title || "",
        'zh-Hans': hansData?.data.title || enData?.data.title || "",
        'zh-Hant': hantData?.data.title || enData?.data.title || "",
      },
      category: {
        en: enData?.data.category || "General",
        'zh-Hans': hansData?.data.category || enData?.data.category || "General",
        'zh-Hant': hantData?.data.category || enData?.data.category || "General",
      },
      preview: {
        en: enData?.data.preview || "",
        'zh-Hans': hansData?.data.preview || enData?.data.preview || "",
        'zh-Hant': hantData?.data.preview || enData?.data.preview || "",
      },
      // Content (The body of the markdown)
      content: {
        en: enData?.content || "",
        'zh-Hans': hansData?.content || enData?.content || "",
        'zh-Hant': hantData?.content || enData?.content || "",
      },
    };
  });

  // Sort articles by date
  return allArticlesData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}