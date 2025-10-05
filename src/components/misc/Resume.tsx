'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

export default function ResumeButton() {
  const t = useTranslations('resume');

  return (
    <div className="text-center my-6">
      <a
        href="/files/TC-Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="
          inline-flex items-center justify-center
          px-6 py-3
          text-lg font-semibold
          text-white
          rounded-full
          bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
          shadow-md
          hover:shadow-lg hover:scale-105
          focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400
          transition-all duration-300
        "
      >
        {t('buttonText')}
      </a>
    </div>
  );
}
