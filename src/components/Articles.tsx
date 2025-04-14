"use client";

import React, { useState, useEffect, MouseEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NavBar from './NavBar';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Sample article content
const sampleArticle = {
  title: "Breach of Property Purchase Contract",
  category: "Real Estate",
  date: "May 15, 2023",
  author: "John Williams",
  role: "Real Estate Law Specialist",
  content: `"I have signed a contract to buy a house, but I regret the decision and no longer wish to proceed with the transaction. Can I get my deposit back?

In real estate transactions, some buyers may change their minds after signing a purchase contract and removing conditions, due to changes in their own financial situation or changes in the overall market. This is particularly common when buying pre-construction properties, as the time between signing the contract and completion can be quite long, during which unexpected changes may occur. What are the consequences for the buyer in such cases? Usually, the buyer has already paid a significant deposit, and they may wonder if they can get it back.

Under common law, this situation is called a breach of contract. The party that breaches the contract is required to compensate the innocent party for any actual losses suffered. If there are no losses, there is no compensation. In many transactions, a deposit cannot simply be forfeited because it often does not correspond to actual losses. Even if the contract stipulates that the deposit will be forfeited, the court often deems this to be a penalty clause and declares it invalid. Does this mean that if the seller can relist the property at the original price and sell it, or even sell it at a higher price in a good market, without actually suffering a loss, the buyer can get the deposit back?

The case of Tang v. Zhang, 2013 BCCA 52, tells us that it is not so easy for the buyer to get the deposit back. In this case, a buyer named Zhang and a seller named Tang signed a contract to purchase a property for a total price of $2.03 million. The buyer paid a deposit of $100,000. The contract stipulated that the deposit would be absolutely forfeited on account of damages if the buyer breached the contract. When the buyer breached the contract and did not want to proceed with the transaction before completion, the seller quickly resold the property at a higher price. The British Columbia Supreme Court ruled that the buyer could get the deposit back, based on the general rule of breach of contract under common law, that there is no compensation if there is no loss. However, the seller appealed the decision to the British Columbia Court of Appeal, which overturned the Supreme Court ruling, holding that the deposit could not be refunded.

The reason for the Court of Appeal's decision is based on a decision by an English court over a hundred years ago, Howe v. Smith (1884) 27 Ch. D. 89 (C.A.). This decision held that in real estate transactions, a deposit is a form of earnest money used to bind the transaction and encourage the buyer to complete it. Once the buyer breaches the contract, the deposit cannot be refunded. The Court of Appeal held that this English decision had been adopted by Canadian courts, and therefore should be applied in this case. Therefore, the seller, Tang, even though he suffered no loss as a result of the buyer's breach and actually profited from the resale of the property, had the right to keep the deposit, making a double profit.`
};

// Additional article for the full-width card
const contractArticle = {
  title: "Ignore the Contract and Lose Everything",
  category: "Business Law",
  date: "March 28, 2025",
  author: "Sun Zihan",
  role: "Business Law Specialist",
  content: `Mr. Mo never dreamed that because of a loan of only 250,000 yuan, he would lose the gold mine with reserves worth 160 million yuan and all mining equipment. In addition, he was sentenced to pay the other party more than 400,000 yuan in litigation costs. This is tantamount to going bankrupt!

Mr. Mo inherited more than 1,200 acres of gold mining rights in BC inland from his father. The stretch of mountains, the boundless territory at a glance, is full of infinite hope. The geological prospecting report shows that the mining area can make a net profit of 750,000 yuan in half a year, and a net profit of 7 million yuan in five years.

In 2010, after spending more than 800,000 yuan to apply for a mining license and purchase equipment, everything was ready, and only more than 200,000 yuan was needed to add some equipment and labor to make a big splash. Mr. Mo began to raise 250,000 loans. A Mr. Du took the initiative to come to the door. Mr. Du is well-informed and powerful. Mr. Du is willing to provide loans with an annual interest rate of 12%. The two chatted happily and hit it off. Mr. Du also said that he is interested in deepening cooperation in the future, including buying part of the mining rights. Mr. Mo expresses this cautiously, sincerity, take your time.

Mr. Du acted boldly, as long as Mr. Mo said the number, he would write a check immediately. In just one month, more than 160,000 yuan was paid, which solved Mr. Mo's urgent needs time and time again. Could you ask for a better partner? When Mr. Mo asked for another 50,000 yuan to buy equipment, Mr. Du said that my lawyer said that no matter how good the relationship is, we should make a formal legal document about our business. Mr. Mo was so focused on digging out the gold as soon as possible, so he simply agreed, you can get it if you want.

Mr. Du quickly brought a set of legal documents, including loan agreement, mortgage preservation agreement and IOU. Mr. Mo comes from a business family, and he has borrowed money before, so he knows that these are routine documents in commercial loans. The lawyer wrote dozens of pages of miscellaneous words and sentences. Mr. Mo felt that he knew the basic content, and finding another lawyer to review the documents would not be the same thing. So I took a rough look, confirmed that the interest rate of the loan amount was correct, and signed it with a swipe of a pen.

After the contract was signed, Mr. Du began to ask to intervene in the operation and management of the gold mine, and the relationship between the two took a turn for the worse. Just a few months later, when Mr. Mo received a letter from Mr. Du's lawyer requesting the immediate repayment of all the loans (more than 300,000 yuan at this time) and the immediate transfer of 50% of the mining rights to Mr. Du, he couldn't help feeling angry: what? Gotta give me some time to fundraise, too? Besides, it's only 300,000 yuan, why should I have half of the mining rights? Mr. Du did not say anything else, and directly sued Mr. Mo for breach of the loan contract, demanding performance and compensation.`
};

export default function Articles() {
  const [showModal, setShowModal] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(sampleArticle);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  // Hide navbar when modal is open
  useEffect(() => {
    setShowNavbar(!showModal);
  }, [showModal]);

  const openArticle = (article: typeof sampleArticle) => {
    setSelectedArticle(article);
    setShowModal(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const handleOpenSampleArticle = () => {
    openArticle(sampleArticle);
  };

  const handleOpenContractArticle = () => {
    openArticle(contractArticle);
  };

  const closeArticle = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  // Add a list of all articles for filtering
  const allArticles = [
    {
      id: 1,
      category: "Business Law",
      title: "Ignore the Contract and Lose Everything",
      date: "March 28, 2025",
      author: "Sun Zihan",
      role: "Business Law Specialist",
      image: "/article2.png",
      preview: "Mr. Mo never dreamed that because of a loan of only 250,000 yuan, he would lose the gold mine with reserves worth 160 million yuan and all mining equipment.",
      openHandler: handleOpenContractArticle
    },
    {
      id: 2,
      category: "Family Law",
      title: "Common Questions about Separation Agreements",
      date: "March 15, 2025",
      author: "Jane Smith",
      role: "Family Law Specialist",
      image: "/about1.jpg",
      preview: "Navigating separation can be challenging and emotionally taxing. This guide explores the legal landscape of separation agreements in British Columbia.",
      openHandler: handleOpenSampleArticle
    },
    {
      id: 3,
      category: "Wills & Estates",
      title: "Frequently Asked Questions about Wills",
      date: "February 20, 2025",
      author: "Michael Johnson",
      role: "Estate Planning Specialist",
      image: "/about4.png",
      preview: "Planning for the future is essential. This article addresses common questions about creating and maintaining a valid will in British Columbia.",
      openHandler: handleOpenSampleArticle
    },
    {
      id: 4,
      category: "Civil Litigation",
      title: "How to Handle Defamation Claims",
      date: "February 15, 2025",
      author: "David Lee",
      role: "Litigation Specialist",
      image: "/article3.png",
      preview: "Understanding defamation law is crucial in today's connected world. Learn about slander, libel, and the legal remedies available to protect your reputation.",
      openHandler: handleOpenSampleArticle
    },
    {
      id: 5,
      category: "Family Law",
      title: "How to File a Divorce",
      date: "January 30, 2025",
      author: "Sarah Williams",
      role: "Family Law Specialist",
      image: "/article4.png",
      preview: "Filing for divorce can be a complex process. This practical guide walks you through each step, from initial filing to final decree, in British Columbia's legal system.",
      openHandler: handleOpenSampleArticle
    },
    {
      id: 6,
      category: "Corporate Law",
      title: "Equity Financing for BC Companies",
      date: "January 15, 2025",
      author: "Robert Chen",
      role: "Corporate Law Specialist",
      image: "/article5.png",
      preview: "Explore the various equity financing options available to British Columbia companies. From venture capital to angel investors, understand the legal implications of each approach.",
      openHandler: handleOpenSampleArticle
    },
    {
      id: 7,
      category: "Real Estate",
      title: "Commercial Property Transactions",
      date: "December 10, 2024",
      author: "Jennifer Park",
      role: "Real Estate Specialist",
      image: "/article6.png",
      preview: "Commercial real estate deals involve unique legal considerations. From due diligence to closing, learn the essential steps to secure your commercial property investment.",
      openHandler: handleOpenSampleArticle
    },
    {
      id: 8,
      category: "Family Law",
      title: "Property Division During Divorce",
      date: "November 25, 2024",
      author: "Laura Thompson",
      role: "Family Law Specialist",
      image: "/article7.png",
      preview: "Understanding how property is divided during a divorce is essential for protecting your assets. This guide covers British Columbia's laws on matrimonial property division.",
      openHandler: handleOpenSampleArticle
    },
    {
      id: 9,
      category: "Wills & Estates",
      title: "Inheritance Rights and Considerations",
      date: "November 5, 2024",
      author: "Thomas Wilson",
      role: "Estate Planning Specialist",
      image: "/article8.png",
      preview: "Complex family structures can lead to challenges in inheritance. This article examines the rights of spouses, children, and other beneficiaries under British Columbia estate law.",
      openHandler: handleOpenSampleArticle
    }
  ];

  // Filter articles based on selected category
  const filteredArticles = selectedCategory === "All Categories" 
    ? allArticles 
    : allArticles.filter(article => article.category === selectedCategory);

  // Categories for the pills (derived from articles data)
  const categories = ["All Categories", ...Array.from(new Set(allArticles.map(article => article.category)))];

  // --- Add the function to open the chatbot ---
  const openChatbot = (event: MouseEvent<HTMLAnchorElement>) => { // Use HTMLAnchorElement
    const icon = document.getElementById('chatbotIcon');
    const panel = document.getElementById('chatbotPanel');

    if (icon && panel) {
      console.log("Opening chatbot panel directly via button click (Articles Page).");
      panel.style.display = 'flex'; // Show panel
      icon.style.display = 'none';  // Hide icon

      // Set flag for the outside click listener in chatbot.js to ignore this event
      window.ignoreNextOutsideClick = true;

      // Optional: Try to focus input and scroll if the instance is available
      if (window.chatbotInstance && typeof window.chatbotInstance.focusInput === 'function') {
         window.chatbotInstance.focusInput();
      }
      if (window.chatbotInstance && typeof window.chatbotInstance.scrollToBottom === 'function') {
        window.chatbotInstance.scrollToBottom(true);
      }

    } else {
        console.error("Chatbot icon or panel element not found.");
    }
    // Prevent default anchor tag navigation
    event.preventDefault();
  };
  // --- End function ---

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Include NavBar at the top */}
      {showNavbar && <NavBar />}
      
      {/* Hero section with background */}
      <div className="relative h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/bigBG.png" 
            alt="Background" 
            fill 
            className="object-cover opacity-90" 
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-6 flex flex-col items-center justify-center text-center h-full">
          <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto relative" style={{ top: '10vh' }}>
            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 md:mb-8">Legal Insights & Articles</h1>
            
            {/* Yellow decorative line */}
            <div className="h-[3px] w-[160px] md:w-[220px] bg-[#FFC107] mb-8 md:mb-12"></div>
            
            {/* Introduction text */}
            <p className="text-lg text-white/90 mb-8 md:mb-20">
              Expert-written articles on various legal topics to help you navigate complex legal matters. 
              Stay informed with our in-depth analyses, practical guides, and insightful perspectives.
            </p>
            
            {/* EXPLORE button */}
            <a 
              href="#articles-section"
              className="group relative inline-flex items-center justify-center gap-2 rounded-md bg-transparent px-8 py-4 font-semibold text-white border-2 border-[#FFC107] transition-all duration-300 hover:bg-[#FFC107] hover:text-black focus:outline-none"
              onClick={(e) => {
                e.preventDefault();
                const articlesSection = document.getElementById('articles-section');
                if (articlesSection) {
                  const navbarHeight = 100; // Approximate navbar height
                  const topPosition = articlesSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
                  window.scrollTo({
                    top: topPosition,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              EXPLORE
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      {/* Articles section */}
      <div id="articles-section" className="relative py-24">
        {/* Background for articles section */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/bigBG.png" 
            alt="Background" 
            fill 
            className="object-cover opacity-50" 
          />
        </div>
        
        <div className="container relative z-10 mx-auto px-6">
          {/* Featured article */}
          <div className="mb-20 pt-10">
            <h2 className="text-3xl font-bold mb-12">Featured Articles</h2>
            <div className="bg-gray-100 rounded-xl shadow-xl overflow-hidden">
              <div className="flex flex-col lg:flex-row h-full">
                {/* Large image */}
                <div className="w-full lg:w-1/2 relative min-h-[500px] lg:min-h-full">
                  <Image 
                    src="/article1.png" 
                    alt="Featured Article" 
                    fill 
                    className="object-cover" 
                  />
                </div>
                
                {/* Article content */}
                <div className="w-full lg:w-1/2 p-8">
                  <div className="flex items-center mb-6">
                    <span className="bg-[#FFC107] text-xs uppercase font-bold tracking-wide px-2 py-1 rounded text-black">
                      {selectedArticle.category}
                    </span>
                    <span className="ml-4 text-gray-500 text-sm">{selectedArticle.date}</span>
                  </div>
                  
                  <h3 
                    className="text-2xl font-bold mb-4 hover:text-[#FFC107] cursor-pointer transition-colors"
                    onClick={handleOpenSampleArticle}
                  >
                    {selectedArticle.title}
                  </h3>
                  
                  <p className="text-gray-700 mb-8 line-clamp-5">
                    In real estate transactions, buyers may change their minds after signing a purchase contract. What happens to your deposit when you decide not to proceed? This comprehensive guide explores the legal landscape of contract breaches in British Columbia, examining key court decisions such as Tang v. Zhang, and explaining why it's not always easy to get your deposit back even when the seller suffers no loss.
                  </p>
                  
                  <div className="flex items-center">
                    <Image 
                      src="/chatbot1.png" 
                      alt="Author" 
                      width={40} 
                      height={40} 
                      className="rounded-full mr-3" 
                    />
                    <div>
                      <p className="font-medium">{selectedArticle.author}</p>
                      <p className="text-sm text-gray-500">{selectedArticle.role}</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleOpenSampleArticle}
                    className="inline-flex items-center mt-8 px-6 py-3 bg-white border-2 border-[#FFC107] text-black font-medium rounded-md hover:bg-[#FFC107] transition-colors"
                  >
                    Read Article
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 ml-2" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* More articles section */}
          <div>
            <div className="flex justify-start mb-12">
              {/* Categories UI with click handlers */}
              <div className="w-full">
                <div className="overflow-x-auto py-2 no-scrollbar">
                  <div className="flex space-x-2 md:space-x-3">
                    {categories.map((category) => (
                      <button 
                        key={category}
                        className={`${
                          selectedCategory === category 
                            ? 'bg-[#FFC107] text-black' 
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                        } px-5 py-2.5 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Add styles to hide scrollbar */}
            <style jsx global>{`
              .no-scrollbar::-webkit-scrollbar {
                display: none;
              }
              
              .no-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}</style>
            
            {/* Article grid with filtered articles */}
            <div className="space-y-12">
              {/* Articles grid - 3 column layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
                  <div key={article.id} className="rounded-xl overflow-hidden shadow-lg bg-gray-100 flex flex-col">
                    <div className="relative group">
                      <div className="relative w-full h-[220px]">
                        <Image 
                          src={article.image} 
                          alt={article.title} 
                          fill 
                          className="object-cover transition-all duration-300 group-hover:blur-sm group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button 
                            onClick={article.openHandler}
                            className="bg-white text-black font-semibold py-2 px-4 rounded-md shadow-lg transform transition-all duration-300 hover:bg-[#FFC107] hover:scale-105 text-sm"
                          >
                            Read Article
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-5 flex-grow flex flex-col">
                        <div className="flex items-center mb-3">
                          <span className="bg-[#FFC107] text-xs uppercase font-bold tracking-wide px-2 py-1 rounded text-black">
                            {article.category}
                          </span>
                          <span className="ml-3 text-gray-500 text-xs">{article.date}</span>
                        </div>
                        
                        <h3 
                          className="text-lg font-bold mb-3 hover:text-[#FFC107] cursor-pointer transition-colors"
                          onClick={article.openHandler}
                        >
                          {article.title}
                        </h3>
                        
                        <p className="text-gray-700 mb-4 text-sm line-clamp-3">
                          {article.preview}
                        </p>
                        
                        <div className="flex items-center mt-auto">
                          <Image 
                            src="/chatbot1.png" 
                            alt="Author" 
                            width={32} 
                            height={32} 
                            className="rounded-full mr-2" 
                          />
                          <div>
                            <p className="font-medium text-sm">{article.author}</p>
                            <p className="text-xs text-gray-500">{article.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call to action section */}
      <div className="relative py-20">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/bigBG.png" 
            alt="Background" 
            fill 
            className="object-cover opacity-90" 
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Have Legal Questions?</h2>
          <div className="h-[3px] w-[120px] bg-[#FFC107] mx-auto mb-12"></div>
          <p className="text-lg text-white leading-relaxed mb-12 max-w-2xl mx-auto">
            Our team is ready to provide expert advice tailored to your specific situation. 
            Reach out today for a consultation.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <a 
              href="/#contact" 
              className="group relative inline-flex items-center justify-center gap-2 rounded-md bg-transparent px-8 py-4 font-semibold text-white border-2 border-[#FFC107] transition-all duration-300 hover:bg-[#FFC107] hover:text-black focus:outline-none"
            >
              Contact Us
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            
            <a
              // href="/chat" // REMOVE href
              onClick={openChatbot} // ADD onClick
              role="button" // ADD role
              className="group relative inline-flex items-center justify-center gap-2 rounded-md bg-[#FFC107] px-8 py-4 font-semibold text-gray-900 transition-all duration-300 hover:bg-[#ffcb38] focus:outline-none cursor-pointer" // ADD cursor-pointer
            >
              Chat with Eve
              {/* ... svg ... */}
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
            </a>
          </div>
        </div>
      </div>
      
      {/* Article Modal/Canvas */}
      <AnimatePresence>
        {showModal && (
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
              onClick={closeArticle}
            ></div>
            
            {/* Canvas */}
            <motion.div
              className="relative w-[72%] h-full bg-[#333333] overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            >
              {/* Close Button */}
              <button 
                onClick={closeArticle}
                className="absolute top-6 left-6 z-50 p-2 text-white hover:text-[#FFC107] transition-colors"
              >
                <X size={24} />
              </button>
              
              {/* Article Content */}
              <div className="p-16 pt-24 text-white max-w-4xl mx-auto">
                <div className="mb-8">
                  <span className="bg-[#FFC107] text-xs uppercase font-bold tracking-wide px-2 py-1 rounded text-black">
                    {selectedArticle.category}
                  </span>
                  <span className="ml-4 text-white/70 text-sm">{selectedArticle.date}</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-8">{selectedArticle.title}</h1>
                
                <div className="flex items-center mb-12">
                  <Image 
                    src="/chatbot1.png" 
                    alt="Author" 
                    width={48} 
                    height={48} 
                    className="rounded-full mr-3" 
                  />
                  <div>
                    <p className="font-medium text-white">{selectedArticle.author}</p>
                    <p className="text-sm text-white/70">{selectedArticle.role}</p>
                  </div>
                </div>
                
                {/* Article Body - splitting paragraphs */}
                <div className="prose prose-lg prose-invert max-w-none">
                  {selectedArticle.content.split('\n\n').map((paragraph, i) => (
                    <p key={i} className={`mb-6 ${i === 0 ? 'text-xl leading-relaxed' : 'leading-relaxed'}`}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 