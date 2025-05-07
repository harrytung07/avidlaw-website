// src/app/news/NewsClient.tsx
"use client"; // Required for useState, useEffect

import Image from 'next/image';
import Link from 'next/link'; // Still used for NavBar internal links, or external if any
import NavBar from '@/components/NavBar';
import React, { useState, useEffect, MouseEvent } from 'react'; // Added
import { motion, AnimatePresence } from 'framer-motion'; // Added
import { X } from 'lucide-react'; // Added
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Define the structure for news post data including frontmatter AND content
export interface NewsPost {
  slug: string;
  frontmatter: {
    [key: string]: any;
    title?: string;
    date?: string;
    author?: string;
    featuredImage?: string;
    preview?: string;
  };
  content: string; // Added content for modal display
}

interface NewsClientProps {
  newsPosts: NewsPost[];
}


// --- News Page Component ---
export default function NewsClient({ newsPosts }: NewsClientProps) {
  

  const [showModal, setShowModal] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [selectedNewsPost, setSelectedNewsPost] = useState<NewsPost | null>(null);

  // Hide navbar when modal is open
  useEffect(() => {
    setShowNavbar(!showModal);
  }, [showModal]);

  const openNewsModal = (post: NewsPost) => {
    setSelectedNewsPost(post);
    setShowModal(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeNewsModal = () => {
    setShowModal(false);
    setSelectedNewsPost(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {showNavbar && <NavBar />}

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
          <Image src="/whitePattern.jpg" alt="Pattern Background" fill className="object-cover opacity-10" />
        </div>

        <div className="container relative z-10 mx-auto px-6 max-w-5xl">
          {newsPosts.length === 0 ? (
            <p className="text-center text-gray-600 text-xl">No news articles found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsPosts.map((post) => (
                <article key={post.slug} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group">
                  {post.frontmatter.featuredImage && (
                    <button onClick={() => openNewsModal(post)} className="block relative h-48 w-full focus:outline-none">
                      <Image
                        src={post.frontmatter.featuredImage}
                        alt={post.frontmatter.title || 'Article image'}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </button>
                  )}
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-[#FFC107] transition-colors">
                      <button onClick={() => openNewsModal(post)} className="text-left hover:underline focus:outline-none">
                        {post.frontmatter.title || 'Untitled News Post'}
                      </button>
                    </h2>
                    <div className="flex flex-wrap items-center text-xs text-gray-500 gap-x-3 gap-y-1 mb-3">
                      {post.frontmatter.date && (<span className="whitespace-nowrap">📅 {new Date(post.frontmatter.date).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })}</span>)}
                      {post.frontmatter.author && (<span className="whitespace-nowrap">👤 {post.frontmatter.author}</span>)}
                    </div>
                    {post.frontmatter.preview && (
                      <p className="text-sm text-gray-600 mb-4 flex-grow">
                        {post.frontmatter.preview}
                      </p>
                    )}
                    <div className="mt-auto">
                      <button
                        onClick={() => openNewsModal(post)}
                        className="inline-block text-sm font-medium text-[#FFC107] hover:text-yellow-600 transition-colors focus:outline-none"
                      >
                        Read More →
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
          {/* TODO: Add Pagination or "Load More" button if many articles */}
        </div>
      </div>

      {/* News Modal/Canvas */}
      <AnimatePresence>
        {showModal && selectedNewsPost && (
          <motion.div
            className="fixed inset-0 z-50 flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50"
              onClick={closeNewsModal}
            ></div>

            {/* Canvas */}
            <motion.div
              className="relative w-full md:w-[72%] h-full bg-[#333333] overflow-y-auto shadow-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            >
              {/* Close Button */}
              <button
                onClick={closeNewsModal}
                className="absolute top-6 left-6 z-50 p-2 text-white hover:text-[#FFC107] transition-colors"
                aria-label="Close news article"
              >
                <X size={28} />
              </button>

              {/* Article Content */}
              <div className="p-8 md:p-16 pt-24 text-white max-w-4xl mx-auto">
                {selectedNewsPost.frontmatter.featuredImage && (
                    <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
                        <Image
                            src={selectedNewsPost.frontmatter.featuredImage}
                            alt={selectedNewsPost.frontmatter.title || "News image"}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}
                <div className="mb-8">
                  {/* You can add a category display here if news posts have categories */}
                  {/* <span className="bg-[#FFC107] text-xs uppercase font-bold tracking-wide px-2 py-1 rounded text-black">
                    {selectedNewsPost.frontmatter.category}
                  </span> */}
                  {selectedNewsPost.frontmatter.date && (
                    <span className="text-white/70 text-sm">
                      {new Date(selectedNewsPost.frontmatter.date).toLocaleDateString('en-CA', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">{selectedNewsPost.frontmatter.title || "Untitled News Post"}</h1>

                {selectedNewsPost.frontmatter.author && (
                  <div className="flex items-center mb-12">
                    <Image /* Consider adding a generic author image or one from frontmatter if available */
                      src="/chatbot1.png" // Placeholder, update if you have author images
                      alt={selectedNewsPost.frontmatter.author || "Author"}
                      width={48}
                      height={48}
                      className="rounded-full mr-3"
                    />
                    <div>
                      <p className="font-medium text-white">{selectedNewsPost.frontmatter.author}</p>
                      {/* Add role if available in frontmatter */}
                      {/* <p className="text-sm text-white/70">{selectedNewsPost.frontmatter.role}</p> */}
                    </div>
                  </div>
                )}

                {/* Article Body - splitting paragraphs */}
                <div className="prose prose-lg prose-invert max-w-none text-white/90">
  <ReactMarkdown remarkPlugins={[remarkGfm]}>
    {selectedNewsPost.content}
  </ReactMarkdown>
</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

