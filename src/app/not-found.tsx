import Link from 'next/link';
import NavBar from '@/components/NavBar';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0B1B48] text-white flex flex-col">
      <NavBar />
      <div className="container mx-auto px-6 py-24 text-center flex flex-col items-center justify-center flex-grow">
        <h1 className="text-6xl sm:text-7xl font-serif font-bold text-[#FFC107] mb-4">404</h1>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4 text-balance">
          Page Not Found / 页面未找到
        </h2>
        <p className="text-zinc-300 text-sm sm:text-base max-w-md mb-8 text-pretty leading-relaxed">
          Sorry, the page you are looking for does not exist or may have been moved.
          <br className="hidden sm:inline" />
          抱歉，您访问的页面不存在或已被移除。
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-[#FFC107] text-[#0B1B48] font-bold text-sm hover:bg-[#ffcb38] active:scale-[0.97] transition-[background-color,transform] duration-150 ease-out shadow-lg shadow-[#FFC107]/20 cursor-pointer"
        >
          Go to Homepage / 返回网站首页
        </Link>
      </div>
    </div>
  );
}
