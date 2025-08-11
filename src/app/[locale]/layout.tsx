import { Geist, Geist_Mono } from "next/font/google";
import "../../styles/globals.css";
import Header from '../../components/main/Header';
import Footer from '../../components/main/Footer';
import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import { headers } from 'next/headers';

declare global {
  interface Window {
    grecaptcha: any;
  }
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const themeScript = `
  (function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  })();
`;

export const metadata = {
  applicationName: 'Cevallos Systems',
  title: {
    default: 'Cevallos Systems',
    template: '%s | Cevallos Systems'
  },
  referrer: 'origin-when-cross-origin',
  icons: {
    icon: '/images/c-systems-logo.png'
  },
  authors: [{ name: 'Timothy C', url: 'https://cevallossystems.com' }],
  creator: 'Timothy Cevallos',
  publisher: 'Timothy Cevallos',
  keywords: ["Developer", "Web Developer"],
  openGraph: {
    title: {
      default: 'Cevallos Systems - Welcome',
      template: '%s - Cevallos Systems'
    },
    description: 'Timothy Cevallos - Full Stack Web Developer specializing in PHP, Laravel, WordPress, and scalable web platforms.',
    images: 'https://cevallossystems.com/images/c-systems-logo.png',
  }
};

export default async function Layout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // 👈 Mark as Promise
}) {
  const { children, params } = props;
  const { locale } = await params; // ✅ Await the params

  console.log('locale', locale);
  let messages;
  try {
    messages = (await import(`@/locales/${locale}.json`)).default;
     console.log('📦 Loaded messages for locale:', locale);
  } catch {
    messages = (await import(`@/locales/en.json`)).default;
  }

  return (
    <html lang={locale}>
      <head>
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body lang={locale} className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header locale={locale} />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
