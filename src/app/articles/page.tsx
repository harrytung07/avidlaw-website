import Articles from '@/components/Articles';
import { Metadata } from 'next';

export default function ArticlesPage() {
  return <Articles />;
}

export const metadata: Metadata = {
  title: "Legal Insights & Articles | Avid Law",
  description: "Expert-written articles on various legal topics to help you navigate complex legal matters",
}; 