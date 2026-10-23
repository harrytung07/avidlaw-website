import { redirect } from 'next/navigation';
import { getRequestLocaleAndPath } from '@/lib/seo';

export default function FormsPage() {
  const { locale } = getRequestLocaleAndPath();
  redirect(`/${locale}#contact`);
}
