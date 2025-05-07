// src/app/news/layout.tsx
import type { Metadata } from 'next';

// This is where you define the metadata specifically for the /news route
export const metadata: Metadata = {
  title: 'Avid Law News & Updates',
  description: 'Stay informed about the latest legal developments, firm announcements, and community involvement from Avid Law.',
  // You can add other metadata fields here if needed for the news section
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/*
        This layout is specific to the news section.
        It doesn't need to repeat all the providers or HTML structure
        from your root layout, as it will be nested within it.
        You can add specific structural elements for the news section here if needed,
        or just pass children through.
      */}
      {children}
    </>
  );
}