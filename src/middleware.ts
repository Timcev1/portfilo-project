import { NextRequest, NextResponse } from 'next/server';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, Locale } from './lib/constants';

const PUBLIC_FILE = /\.(.*)$/;

function isSupportedLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log('🔥 Middleware running on:', pathname);

  // Skip next for static files or API
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const firstSegment = pathname.split('/')[1];
  const isKnownLocale = isSupportedLocale(firstSegment);
  const isLocaleLike = /^[a-z]{2}$/.test(firstSegment);

  console.log('🌍 First segment:', firstSegment);
  console.log('✅ isKnownLocale:', isKnownLocale);
  console.log('🔤 isLocaleLike:', isLocaleLike);

  // ✅ Allow if already has supported locale
  if (isKnownLocale) {
    return NextResponse.next();
  }

  // ❌ Invalid locale (e.g., `/xx`)
  if (isLocaleLike && !isKnownLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}`;
    return NextResponse.redirect(url);
  }

  // 🛑 Prevent double-rewrites:
  // If the path is just `/`, we rewrite to `/<default>`
  if (pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}`;
    return NextResponse.rewrite(url);
  }

  // Leave all other routes alone — don't rewrite
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
