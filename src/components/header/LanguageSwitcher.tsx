'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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
    <div className="transition-opacity duration-300 ease-in-out opacity-100">
      <label htmlFor="locale" className="sr-only">
        Language
      </label>
      <select
        id="locale"
        onChange={handleChange}
        value={selectedLocale}
        className="border rounded px-3 py-1 text-sm bg-white dark:bg-gray-800 text-black dark:text-white focus:ring focus:ring-sky-400"
        aria-label="Language"
      >
        {Object.entries(LANGUAGE_LABELS).map(([code, label]) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
