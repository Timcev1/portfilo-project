import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import Header from '../components/main/Header';
import Footer from '../components/main/Footer';
import i18n from 'i18next';

//import './i18n'; // Ensure this path matches where you've saved your i18n file

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

export const metadata: Metadata = {
  title: "Cevallos Systems",
  description: "Creating full stack web solutions for anyone needing a digital presence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
