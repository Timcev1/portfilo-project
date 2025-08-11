import { NextRequest, NextResponse } from 'next/server';

const SUPPORTED_LOCALES = ['en', 'es'];
const DEFAULT_LOCALE = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

    // ✅ Add this
  console.log(`🔥 Middleware running on: ${pathname}`);

  
  // Redirect /en -> /
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/en/, '') || '/';
    return NextResponse.redirect(url);
  }

  // Extract first path segment
  const firstSegment = pathname.split('/')[1];
  const isKnownLocale = SUPPORTED_LOCALES.includes(firstSegment);
  const isLocaleLike = /^[a-z]{2}$/.test(firstSegment);

  // Redirect unknown locale to /
  if (isLocaleLike && !isKnownLocale) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  // Inject default locale if no locale in path
  const response = NextResponse.next();
  const locale = isKnownLocale ? firstSegment : DEFAULT_LOCALE;
  response.headers.set('x-locale', locale);

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
