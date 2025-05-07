// src/app/news/[slug]/page.tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import Image from 'next/image';
import NavBar from '@/components/NavBar';
import { notFound } from 'next/navigation';

// Define the structure for news post data including frontmatter
interface NewsPost {
  slug: string;
  frontmatter: {
    [key: string]: any;
  };
  content: string;
}

const postsDirectory = path.join(process.cwd(), 'public/articles/news');

// --- Function to get all news post slugs for generateStaticParams ---
export async function generateStaticParams() {
  let filenames: string[] = [];
  try {
    filenames = fs.readdirSync(postsDirectory);
  } catch (error) {
    console.error("Error reading news directory for static params:", postsDirectory, error);
    return [];
  }

  return filenames
    .filter(filename => filename.endsWith('.md'))
    .map((filename) => ({
      slug: filename.replace('.md', ''),
    }));
}

// --- Function to get a single news post data by slug ---
async function getPostData(slug: string): Promise<NewsPost | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  try {
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    return { slug, frontmatter: data, content };
  } catch (err) {
    console.error(`Error processing file ${slug}.md:`, err);
    return null;
  }
}

// --- Custom Components for Markdown Rendering (same as your news/page.tsx) ---
const markdownComponents = {
    h1: (props: any) => <h1 className="text-3xl md:text-4xl font-bold mt-10 mb-6 border-b pb-3" {...props} />,
    h2: (props: any) => <h2 className="text-2xl font-semibold mt-8 mb-4 border-b pb-2" {...props} />,
    h3: (props: any) => <h3 className="text-xl font-semibold mt-6 mb-3" {...props} />,
    p: (props: any) => <p className="leading-relaxed my-4" {...props} />,
    table: (props: any) => <div className="overflow-x-auto my-6"><table className="min-w-full border border-gray-300 divide-y divide-gray-300" {...props} /></div>,
    thead: (props: any) => <thead className="bg-gray-100" {...props} />,
    th: (props: any) => <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-l border-gray-300 first:border-l-0" {...props} />,
    tbody: (props: any) => <tbody className="bg-white divide-y divide-gray-200" {...props} />,
    tr: (props: any) => <tr className="hover:bg-gray-50" {...props} />,
    td: (props: any) => <td className="px-4 py-3 whitespace-normal text-sm text-gray-700 border-l border-gray-300 first:border-l-0" {...props} />,
    blockquote: (props: any) => <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4" {...props} />,
    ul: (props: any) => <ul className="list-disc list-inside my-4 pl-4 space-y-1" {...props} />,
    ol: (props: any) => <ol className="list-decimal list-inside my-4 pl-4 space-y-1" {...props} />,
    li: (props: any) => <li className="mb-1" {...props} />,
    a: (props: any) => <a className="text-blue-600 hover:text-blue-800 hover:underline" {...props} />,
    img: (props: any) => ( // Custom image renderer for markdown if needed
      <div className="my-6">
        <Image
          src={props.src || ''}
          alt={props.alt || 'Markdown image'}
          width={800} // Adjust as needed
          height={450} // Adjust as needed
          className="rounded-lg shadow-md object-cover mx-auto"
        />
      </div>
    ),
};
// --- End Custom Components ---

interface NewsArticlePageProps {
  params: {
    slug: string;
  };
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const post = await getPostData(params.slug);

  if (!post) {
    notFound(); // Triggers the not-found.tsx page
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <NavBar />

      {/* Article Header Section */}
      <div className="relative pt-28 pb-16 bg-gray-100"> {/* Added pt-28 for NavBar space and some top padding */}
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
            {post.frontmatter.title || 'Untitled News Post'}
          </h1>
          <div className="flex flex-wrap justify-center items-center text-sm text-gray-500 gap-x-4 gap-y-1 mb-6">
            {post.frontmatter.date && (
              <span className="whitespace-nowrap">
                📅 {new Date(post.frontmatter.date).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            )}
            {post.frontmatter.author && (
              <span className="whitespace-nowrap">👤 By {post.frontmatter.author}</span>
            )}
          </div>
          {post.frontmatter.featuredImage && (
            <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={post.frontmatter.featuredImage}
                alt={post.frontmatter.title || 'Featured Image'}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      </div>

      {/* Article Content Section */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <article className="prose prose-lg max-w-none prose-headings:font-semibold prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {post.content}
            </ReactMarkdown>
          </article>

          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <Link href="/news" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
              ← Back to All News
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Optional: Add metadata for SEO
export async function generateMetadata({ params }: NewsArticlePageProps) {
  const post = await getPostData(params.slug);
  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }
  return {
    title: `${post.frontmatter.title} | Avid Law News`,
    description: post.frontmatter.preview || 'News article from Avid Law.',
    // openGraph: {
    //   title: post.frontmatter.title,
    //   description: post.frontmatter.preview,
    //   images: post.frontmatter.featuredImage ? [{ url: post.frontmatter.featuredImage }] : [],
    // },
  };
}