'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import ThemeToggle from '../header/ThemeToggle';
import LanguageSwitcher from '../header/LanguageSwitcher';
import { useLocale, useTranslations } from 'next-intl';

const SECTIONS = ['about', 'skills', 'projects', 'contact'] as const;
type SectionId = typeof SECTIONS[number];

export default function Header({ locale: forcedLocale }: { locale?: string }) {
  const locale = forcedLocale || useLocale();
  const t = useTranslations('nav'); // add labels in your messages
  const [active, setActive] = useState<SectionId | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Scroll spy + shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        });
      },
      { rootMargin: '-50% 0px -45% 0px', threshold: 0.01 }
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
    () => [
      { id: 'about',    label: t('about') },
      { id: 'skills',   label: t('skills') },
      { id: 'projects', label: t('projects') },
      { id: 'contact',  label: t('contact') },
    ] as { id: SectionId; label: string }[],
    [t]
  );

  // Smooth scroll without losing locale segment
  const handleJump = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', `/${locale}#${id}`); // keeps URL hash tidy
  };

  return (
    <header
      className={[
        'sticky top-0 z-50',
        // glass + border
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
        {t('skipToContent', 'Skip to content')}
      </a>

      <nav className="mx-auto max-w-screen-xl flex items-center justify-between px-4 py-3">
        {/* Left: brand or logo slot (optional) */}
        <div className="flex items-center gap-2">
          {/* put logo here if needed */}
        </div>

        {/* Center: section nav */}
        <ul className="hidden md:flex items-center gap-2 rounded-full bg-black/[0.03] dark:bg-white/5 px-2 py-1 border border-black/5 dark:border-white/10">
          {links.map((l) => {
            const isActive = active === l.id;
            return (
              <li key={l.id}>
                <Link
                  href={`/${locale}#${l.id}`}
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
