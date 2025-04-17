// src/app/news/page.tsx
import fs from 'fs'; // Node.js file system module
import path from 'path'; // Node.js path module
import matter from 'gray-matter'; // Parses frontmatter
import ReactMarkdown from 'react-markdown'; // Renders Markdown
import Link from 'next/link'; // Optional: If linking to individual news pages later
import NavBar from '@/components/NavBar'; // Assuming NavBar is in layout, otherwise import here if needed per page
import Image from 'next/image'; // For Hero section background

// Define the structure for news post data including frontmatter
interface NewsPost {
  slug: string; // Filename without extension, used as ID
  frontmatter: {
    [key: string]: any; // Allows any frontmatter keys (title, date, author, etc.)
  };
  content: string; // Markdown content
}

// --- Function to get news data ---
// NOTE: Reading directly from 'public' like this in a server component is
// generally okay for build time, but not ideal practice.
// It's better to place content files outside 'public' (e.g., 'src/content/news')
// and adjust the 'postsDirectory' path accordingly.
function getNewsPosts(): NewsPost[] {
  // Adjust the path if you move the 'news' folder outside 'public'
  const postsDirectory = path.join(process.cwd(), 'public/articles/news');
  let filenames: string[] = [];
  try {
       filenames = fs.readdirSync(postsDirectory);
  } catch (error) {
      console.error("Error reading news directory:", postsDirectory, error);
      // Return empty array or throw error if directory MUST exist
      return [];
  }


  const posts = filenames
     .filter(filename => filename.endsWith('.md')) // Only process markdown files
     .map((filename) => {
        // Create slug from filename
        const slug = filename.replace('.md', '');

        // Get full path to file
        const fullPath = path.join(postsDirectory, filename);

        let fileContents: string;
        try {
            fileContents = fs.readFileSync(fullPath, 'utf8');
        } catch(readError) {
             console.error(`Error reading file: ${fullPath}`, readError);
             return null; // Skip this file if unreadable
        }


        // Use gray-matter to parse the post metadata section
        // Add basic error handling for parsing
        try {
            const { data, content } = matter(fileContents);
            return {
              slug,
              frontmatter: data,
              content,
            };
        } catch(parseError) {
            console.error(`Error parsing markdown file: ${fullPath}`, parseError);
            return null; // Skip this file if unparseable
        }

      })
      .filter(post => post !== null) as NewsPost[]; // Filter out nulls from errors


      // Sort posts by date (newest first) - requires 'date' in frontmatter!
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

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* If NavBar is not in RootLayout, include it here */}
      {/* <NavBar /> */}

      {/* Hero Section (Optional - similar to Articles page?) */}
      <div className="relative h-[60vh] flex items-center justify-center text-center"> {/* Reduced height */}
         <div className="absolute inset-0 z-0">
           <Image
             src="/bigBG.png" // Use an appropriate background
             alt="Background"
             fill
             className="object-cover opacity-90"
             priority
           />
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
      <div className="relative py-16 bg-gray-50"> {/* Lighter background for news feed */}
        {/* Optional background pattern if desired */}
         <div className="absolute inset-0 z-0">
           <Image
             src="/whitePattern.jpg" // Example subtle pattern
             alt="Pattern Background"
             fill
             className="object-cover opacity-10"
           />
         </div>

        <div className="container relative z-10 mx-auto px-6 max-w-4xl"> {/* Centered content */}
          {newsPosts.length === 0 ? (
             <p className="text-center text-gray-600 text-xl">No news articles found.</p>
           ) : (
            <div className="space-y-12">
              {newsPosts.map((post) => (
                <article key={post.slug} className="bg-white p-6 md:p-8 rounded-lg shadow-md">
                  {/* Metadata */}
                  <div className="mb-4 border-b pb-4 border-gray-200">
                      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800 hover:text-[#FFC107] transition-colors">
                        {/* If making individual pages later, wrap in Link */}
                        {/* <Link href={`/news/${post.slug}`}> */}
                            {post.frontmatter.title || 'Untitled News Post'}
                        {/* </Link> */}
                      </h2>
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        {post.frontmatter.date && (
                          <span>📅 {new Date(post.frontmatter.date).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        )}
                        {post.frontmatter.author && (
                           <span>👤 By {post.frontmatter.author}</span>
                        )}
                      </div>
                  </div>

                  {/* Content Preview (Optional - could show full content) */}
                  {/* Using preview from frontmatter if it exists */}
                   {post.frontmatter.preview && (
                       <p className="text-gray-600 mb-6 italic">{post.frontmatter.preview}</p>
                   )}


                  {/* Full Content Rendered with ReactMarkdown */}
                   {/* Add prose class for basic typography styling from Tailwind Typography if installed */}
                   {/* npm install -D @tailwindcss/typography */}
                   {/* Add require('@tailwindcss/typography') to plugins in tailwind.config.js */}
                   <div className="prose prose-lg max-w-none">
                       <ReactMarkdown>{post.content}</ReactMarkdown>
                   </div>

                   {/* Optional Read More Link (if not showing full content) */}
                   {/* <div className="mt-6">
                       <Link href={`/news/${post.slug}`} className="text-[#FFC107] hover:text-black font-semibold">
                           Read More →
                       </Link>
                   </div> */}
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