'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import ThemeToggle from '../header/ThemeToggle';
import LanguageSwitcher from '../header/LanguageSwitcher';
import { useLocale, useTranslations } from 'next-intl';

const SECTIONS = ['about', 'skills', 'projects', 'contact'] as const;
type SectionId = typeof SECTIONS[number];

export default function Header({ locale: forcedLocale }: { locale?: string }) {
  // Call hooks at top level, no conditionals/inline boolean tricks
  const currentLocale = useLocale();
  const locale = forcedLocale ?? currentLocale;

  const t = useTranslations('nav');
  const [active, setActive] = useState<SectionId>('about'); // Default to 'about'
  const [scrolled, setScrolled] = useState(false);

  // Scroll spy + shadow on scroll
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 4);

      // If we're near the top, set 'about' as active
      if (scrollY < 100) {
        setActive('about');
      }
    };
    
    onScroll();
    window.addEventListener('scroll', onScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id as SectionId);
          }
        });
      },
      { 
        rootMargin: '-20% 0px -60% 0px', // More lenient top margin
        threshold: 0.01 
      }
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  const links = useMemo(
    () =>
      [
        { id: 'about', label: t('about') },
        { id: 'skills', label: t('skills') },
        { id: 'projects', label: t('projects') },
      ] satisfies ReadonlyArray<{ id: SectionId; label: string }>,
    [t]
  );

  // Smooth scroll without losing locale segment
  const handleJump = (e: React.MouseEvent<HTMLAnchorElement>, id: SectionId) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', `#${id}`);
  };

  return (
    <header
      className={[
        'sticky top-0 z-50',
        'bg-white/70 dark:bg-neutral-900/70',
        'backdrop-blur supports-[backdrop-filter]:backdrop-blur',
        'border-b border-black/5 dark:border-white/10',
        scrolled ? 'shadow-sm' : '',
      ].join(' ')}
      role="banner"
    >
      {/* Skip link for a11y */}
      <a
        href={`/${locale}#content`}
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-black text-white px-3 py-2 rounded"
      >
        {t('skipToContent')}
      </a>

      <nav className="mx-auto max-w-screen-xl flex items-center justify-between px-4 py-3">
        {/* Left: brand or logo slot (optional) */}
        <div className="flex items-center gap-2" />

        {/* Center: section nav */}
        <ul className="hidden md:flex items-center gap-2 rounded-full px-2 py-1 ">
          {links.map((l) => {
            const isActive = active === l.id;
            return (
              <li key={l.id}>
                <Link
                  href={`#${l.id}`}
                  onClick={(e) => handleJump(e, l.id)}
                  className={[
                    'px-3 py-1.5 text-sm font-medium rounded-full transition-colors',
                    isActive
                      ? 'bg-black/80 text-white dark:bg-white/90 dark:text-black'
                      : 'text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white',
                  ].join(' ')}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right: controls */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <LanguageSwitcher locale={locale} />
        </div>
      </nav>
    </header>
  );
}