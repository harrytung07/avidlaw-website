// src/app/news/page.tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import Image from 'next/image';
import NavBar from '@/components/NavBar'; // <--- IMPORT NavBar HERE

// Define the structure for news post data including frontmatter
interface NewsPost {
  slug: string;
  frontmatter: {
    [key: string]: any;
  };
  content: string;
}

// --- Function to get news data ---
function getNewsPosts(): NewsPost[] {
  // Adjust the path if you move the 'news' folder outside 'public'
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
            const { data, content } = matter(fileContents);
            return { slug, frontmatter: data, content };
        } catch(err) {
            console.error(`Error processing file ${filename}:`, err);
            return null;
        }
      })
      .filter(post => post !== null) as NewsPost[];

       posts.sort((postA, postB) => { /* ... sorting logic ... */
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

  // --- Custom Components for Markdown Rendering ---
  const markdownComponents = {
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
  };
  // --- End Custom Components ---


  return (
    <div className="min-h-screen bg-white text-gray-900">
      <NavBar /> {/* <--- RENDER NavBar HERE --- */}

      {/* Hero Section */}
      <div className="relative h-[80vh] flex items-center justify-center text-center pt-20"> {/* Added pt-20 for NavBar space */}
         {/* ... Hero content ... */}
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

      {/* News Feed Section */}
      <div className="relative py-16 bg-gray-50">
        {/* ... Optional background pattern ... */}
        <div className="absolute inset-0 z-0">
           <Image src="/whitePattern.jpg" alt="Pattern Background" fill className="object-cover opacity-10"/>
         </div>

        <div className="container relative z-10 mx-auto px-6 max-w-4xl">
          {newsPosts.length === 0 ? (
             <p className="text-center text-gray-600 text-xl">No news articles found.</p>
           ) : (
            <div className="space-y-12">
              {newsPosts.map((post) => (
                <article key={post.slug} className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
                  {/* Metadata */}
                  <div className="mb-4 border-b pb-4 border-gray-200">
                     {/* ... Title, Date, Author ... */}
                     <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800 hover:text-[#FFC107] transition-colors">
                           {post.frontmatter.title || 'Untitled News Post'}
                      </h2>
                      <div className="flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-1">
                        {post.frontmatter.date && ( <span className="whitespace-nowrap">📅 {new Date(post.frontmatter.date).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}</span> )}
                        {post.frontmatter.author && ( <span className="whitespace-nowrap">👤 By {post.frontmatter.author}</span> )}
                      </div>
                  </div>
                  {/* Content Preview */}
                   {post.frontmatter.preview && ( <p className="text-gray-600 mb-6 italic">{post.frontmatter.preview}</p> )}
                  {/* Full Content Rendered */}
                   <div className="prose prose-lg max-w-none prose-headings:font-semibold prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic">
                      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                          {post.content}
                      </ReactMarkdown>
                   </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Optional Footer or CTA section */}
    </div>
  );
}