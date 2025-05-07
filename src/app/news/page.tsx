// src/app/news/page.tsx
// This is a SERVER COMPONENT. No "use client" here.

import fs from 'fs'; // OK here
import path from 'path'; // OK here
import matter from 'gray-matter'; // OK here
import NewsClient, { NewsPost } from './NewsClient'; // Import the client component and type

// --- Function to get news data (can be here or in a separate lib/utils file) ---
// Ensure NewsPost interface is defined or imported if it's not in NewsClient.tsx
// For this example, assuming NewsPost is exported from NewsClient.tsx
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
        const { data, content } = matter(fileContents); // data is frontmatter
        return { slug, frontmatter: data, content };
      } catch (err) {
        console.error(`Error processing file ${filename}:`, err);
        return null;
      }
    })
    .filter(post => post !== null) as NewsPost[];

  posts.sort((postA, postB) => {
    const dateA = postA.frontmatter.date ? new Date(postA.frontmatter.date) : new Date(0);
    const dateB = postB.frontmatter.date ? new Date(postB.frontmatter.date) : new Date(0);
    return dateB.getTime() - dateA.getTime();
  });
  return posts;
}
// --- End Function ---

// The Page component itself (Server Component)
export default async function NewsPage() {
  const newsPosts = getNewsPosts(); // Fetch data on the server

  return <NewsClient newsPosts={newsPosts} />; // Pass data to the Client Component
}