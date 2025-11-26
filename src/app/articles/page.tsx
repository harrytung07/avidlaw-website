import Articles from '@/components/Articles';
import { Metadata } from 'next';
import { getSortedArticles } from '@/lib/articles';

export const metadata: Metadata = {
  title: "Legal Insights & Articles | Avid Law",
  description: "Expert-written articles on various legal topics to help you navigate complex legal matters",
};

export default async function ArticlesPage() {
  // Fetch data on the server
  const articles = await getSortedArticles();

  // Pass data to the Client Component
  return <Articles initialArticles={articles} />;
}