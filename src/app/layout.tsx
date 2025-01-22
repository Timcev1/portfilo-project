import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import Header from '../components/main/Header';
import Footer from '../components/main/Footer';
import BaseHead from '../components/main/Head';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

//This is here to avoid flashes when loading
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
      description: 'Creating full stack web solutions for anyone needing a digital presence',
      images: 'https://cevallossystems.com/images/c-systems-logo.png',
    }
  }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <BaseHead />
      </head>
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Header />

        {children}
        
        <Footer />
      </body>
    </html>
  );
}
