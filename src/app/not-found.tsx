// src/app/not-found.tsx
import Link from 'next/link';
import NavBar from '@/components/NavBar'; // Assuming you want NavBar here too

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <NavBar />
      <div className="container mx-auto px-6 py-24 text-center flex flex-col items-center justify-center" style={{minHeight: 'calc(100vh - 80px)'}}> {/* Adjust 80px if NavBar height is different */}
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Sorry, the page you are looking for does not exist or may have been moved.
        </p>
        <Link href="/" className="px-6 py-3 bg-[#FFC107] text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}