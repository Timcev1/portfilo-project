'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Languages } from 'lucide-react';
import { LANGUAGE_LABELS, SUPPORTED_LOCALES } from '@/lib/constants';

export default function LanguageSwitcher({ locale }: { locale: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedLocale, setSelectedLocale] = useState(locale);

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale');

    const segments = pathname.split('/');
    const isAlreadyLocalized = SUPPORTED_LOCALES.includes(segments[1] as typeof SUPPORTED_LOCALES[number]);

    if (savedLocale && !isAlreadyLocalized) {
      segments[1] = savedLocale;
      router.replace(segments.join('/'));
    }
  }, [pathname, router]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    setSelectedLocale(nextLocale);
    localStorage.setItem('locale', nextLocale);

    const segments = pathname.split('/');
    segments[1] = nextLocale;
    router.replace(segments.join('/'));
  };

  return (
    <div className="relative">
      <label htmlFor="locale" className="sr-only">
        Language
      </label>
      <div className="relative inline-flex items-center">
        {/* Icon */}
        <Languages 
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none z-10" 
          aria-hidden="true"
        />
        
        {/* Select */}
        <select
          id="locale"
          onChange={handleChange}
          value={selectedLocale}
          className="
            appearance-none
            pl-10 pr-8 py-2
            rounded-lg
            text-sm font-medium
            bg-white dark:bg-gray-800
            text-gray-700 dark:text-gray-200
            border border-gray-200 dark:border-gray-700
            shadow-sm
            hover:border-gray-300 dark:hover:border-gray-600
            focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent
            transition-all duration-200
            cursor-pointer
          "
          aria-label="Language"
        >
          {Object.entries(LANGUAGE_LABELS).map(([code, label]) => (
            <option key={code} value={code}>
              {label}
            </option>
          ))}
        </select>

        {/* Dropdown Arrow */}
        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}