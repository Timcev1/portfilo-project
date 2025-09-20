import { NextRequest, NextResponse } from 'next/server';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, Locale } from './lib/constants';

const PUBLIC_FILE = /\.(.*)$/;

function isSupportedLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files or API
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split('/'); // e.g. ['', 'about'] or ['', 'en', 'about']
  const firstSegment = segments[1] || '';
  const isKnownLocale = isSupportedLocale(firstSegment);
  const isLocaleLike = /^[a-z]{2}$/.test(firstSegment);

  // ✅ Already has a supported locale: proceed
  if (isKnownLocale) {
    return NextResponse.next();
  }

  // ❌ Looks like a locale but unsupported -> redirect to default + rest of path
  if (isLocaleLike && !isKnownLocale) {
    const url = request.nextUrl.clone();
    // drop the invalid first segment and keep the rest
    const rest = '/' + segments.slice(2).join('/');
    url.pathname = `/${DEFAULT_LOCALE}${rest === '/' ? '' : rest}`;
    return NextResponse.redirect(url);
  }

  // 🧭 No locale segment at all -> rewrite to default + full path
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
