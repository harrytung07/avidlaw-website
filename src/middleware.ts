import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Supported locales - hardcoded to match next.config.js
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
  
  // Skip middleware for non-HTML routes, api, static files, robots.txt, and sitemap.xml
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname.startsWith('/favicon') ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
  ) {
    return NextResponse.next();
  }
  
  // Redirect from / to /en (or default locale) permanently (308) for SEO equity consolidation
  if (pathname === '/') {
    const url = new URL(`/${defaultLocale}`, request.url);
    return NextResponse.redirect(url, 308);
  }
  
  // Check if the pathname already has a supported locale
  const pathLocale = getLocaleFromPath(pathname);
  
  // If URL has a supported locale
  if (pathLocale) {
    // Create a new URL without the locale prefix for internal routing
    const pathWithoutLocale = removeLocaleFromPath(pathname, pathLocale);
    
    // Clone the URL
    const newUrl = new URL(request.url);
    newUrl.pathname = pathWithoutLocale;
    
    // Forward locale and clean pathname via request headers for server components & metadata
    // When pathWithoutLocale is '/', set x-clean-pathname to '' to avoid trailing slash canonical mismatch
    const cleanPath = pathWithoutLocale === '/' ? '' : pathWithoutLocale;

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-locale', pathLocale);
    requestHeaders.set('x-clean-pathname', cleanPath);

    return NextResponse.rewrite(newUrl, {
      request: {
        headers: requestHeaders,
      },
    });
  }
  
  // For paths without a locale, redirect permanently (308) to add the default locale
  const url = new URL(`/${defaultLocale}${pathname}`, request.url);
  return NextResponse.redirect(url, 308);
}

// Match all routes except files, images, static files, robots.txt, and sitemap.xml
export const config = {
  matcher: [
    '/((?!_next/|api/|.*\\.|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
