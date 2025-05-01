import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Supported locales - hardcoded to match next.config.js
// We can't directly import from next.config.js in middleware
const locales = ['en', 'zh-Hans', 'zh-Hant'];
const defaultLocale = 'en';

// Function to get locale from pathname or headers
function getLocaleFromPath(pathname: string) {
  const segments = pathname.split('/');
  if (segments.length > 1 && locales.includes(segments[1])) {
    return segments[1];
  }
  return null;
}

// Function to remove locale from path
function removeLocaleFromPath(pathname: string, locale: string) {
  if (pathname === `/${locale}`) return '/';
  return pathname.replace(`/${locale}`, '') || '/';
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for non-HTML routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next();
  }
  
  // Redirect from / to /en/ (or default locale)
  if (pathname === '/') {
    const url = new URL(`/${defaultLocale}`, request.url);
    return NextResponse.redirect(url);
  }
  
  // Check if the pathname already has a supported locale
  const pathLocale = getLocaleFromPath(pathname);
  
  // If URL has a supported locale
  if (pathLocale) {
    // Create a new URL without the locale prefix for internal routing
    const pathWithoutLocale = removeLocaleFromPath(pathname, pathLocale);
    
    // Clone the URL
    const newUrl = new URL(request.url);
    
    // Rewrite the path to the non-localized version
    // This preserves the original URL in the browser but internally
    // Next.js will route to the correct page
    newUrl.pathname = pathWithoutLocale;
    
    return NextResponse.rewrite(newUrl);
  }
  
  // For paths without a locale, redirect to add the default locale
  // This ensures all URLs in the browser include the locale
  const url = new URL(`/${defaultLocale}${pathname}`, request.url);
  return NextResponse.redirect(url);
}

// Match all routes except files, images, static files
export const config = {
  matcher: [
    // Skip all internal Next.js paths
    '/((?!_next/|api/|.*\\.|favicon.ico).*)',
  ],
}; 