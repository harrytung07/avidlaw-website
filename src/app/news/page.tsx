// src/app/news/page.tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
// ReactMarkdown and remarkGfm are NOT needed here anymore for full content rendering
import Link from 'next/link';
import Image from 'next/image';
import NavBar from '@/components/NavBar';

// Define the structure for news post data including frontmatter
interface NewsPost {
  slug: string;
  frontmatter: {
    [key: string]: any;
  };
  // content is not needed on this page anymore, only frontmatter
}

// --- Function to get news data (only frontmatter needed now) ---
function getNewsPosts(): NewsPost[] {
  const postsDirectory = path.join(process.cwd(), 'public/articles/news');
  let filenames: string[] = [];
  try {
       filenames = fs.readdirSync(postsDirectory);
  } catch (error) {
      console.error("Error reading news directory:", postsDirectory, error);
      return [];
  }

  const posts = filenames
     .filter(filename => filename.endsWith('.md'))
     .map((filename) => {
        const slug = filename.replace('.md', '');
        const fullPath = path.join(postsDirectory, filename);
        try {
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            // Only parse frontmatter, content is not needed for the list page
            const { data } = matter(fileContents);
            return { slug, frontmatter: data };
        } catch(err) {
            console.error(`Error processing file ${filename}:`, err);
            return null;
        }
      })
      .filter(post => post !== null) as NewsPost[]; // Type assertion

       posts.sort((postA, postB) => {
           const dateA = postA.frontmatter.date ? new Date(postA.frontmatter.date) : new Date(0);
           const dateB = postB.frontmatter.date ? new Date(postB.frontmatter.date) : new Date(0);
           return dateB.getTime() - dateA.getTime();
        });
  return posts;
}
// --- End Function ---


// --- News Page Component ---
export default function NewsPage() {
  const newsPosts = getNewsPosts();

  // Markdown components are NOT needed here anymore

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <NavBar />

      {/* Hero Section */}
      <div className="relative h-[70vh] md:h-[80vh] flex items-center justify-center text-center pt-20">
         <div className="absolute inset-0 z-0">
            <Image src="/bigBG.png" alt="Background" fill className="object-cover opacity-90" priority />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          <div className="relative z-10 px-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Firm News & Updates</h1>
            <div className="h-[3px] w-[160px] md:w-[220px] bg-[#FFC107] mx-auto mb-6"></div>
            <p className="text-lg text-white/90 max-w-3xl mx-auto">
              Stay informed about the latest legal developments, firm announcements, and community involvement from Avid Law.
            </p>
          </div>
       </div>

      {/* News Feed Section - Updated Layout */}
      <div className="relative py-16 bg-gray-50">
        <div className="absolute inset-0 z-0">
           <Image src="/whitePattern.jpg" alt="Pattern Background" fill className="object-cover opacity-10"/>
         </div>

        <div className="container relative z-10 mx-auto px-6 max-w-5xl"> {/* Increased max-w for grid */}
          {newsPosts.length === 0 ? (
             <p className="text-center text-gray-600 text-xl">No news articles found.</p>
           ) : (
            // Using a grid for better layout
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsPosts.map((post) => (
                <article key={post.slug} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group">
                  {post.frontmatter.featuredImage && (
                    <Link href={`/news/${post.slug}`} className="block relative h-48 w-full">
                      <Image
                        src={post.frontmatter.featuredImage}
                        alt={post.frontmatter.title || 'Article image'}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                  )}
                  <div className="p-6 flex flex-col flex-grow">
                     <h2 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-[#FFC107] transition-colors">
                        <Link href={`/news/${post.slug}`}>
                           {post.frontmatter.title || 'Untitled News Post'}
                        </Link>
                      </h2>
                      <div className="flex flex-wrap items-center text-xs text-gray-500 gap-x-3 gap-y-1 mb-3">
                        {post.frontmatter.date && ( <span className="whitespace-nowrap">📅 {new Date(post.frontmatter.date).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })}</span> )}
                        {post.frontmatter.author && ( <span className="whitespace-nowrap">👤 {post.frontmatter.author}</span> )}
                      </div>
                      {post.frontmatter.preview && (
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                          {post.frontmatter.preview}
                        </p>
                      )}
                      <div className="mt-auto">
                        <Link href={`/news/${post.slug}`} className="inline-block text-sm font-medium text-[#FFC107] hover:text-yellow-600 transition-colors">
                          Read More →
                        </Link>
                      </div>
                  </div>
                </article>
              ))}
            </div>
          )}
          {/* TODO: Add Pagination or "Load More" button if many articles */}
        </div>
      </div>
    </div>
  );
}

// Optional: Add metadata for SEO
export async function generateMetadata() {
  return {
    title: 'Avid Law News & Updates',
    description: 'Stay informed about the latest legal developments, firm announcements, and community involvement from Avid Law.',
  };
}