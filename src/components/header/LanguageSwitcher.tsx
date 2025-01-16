'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaChevronDown } from 'react-icons/fa';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    // Add more languages here
  ];

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code); // Change the language
    setIsOpen(false); // Close the dropdown
  };

  return (
    <div className="relative inline-block">
      {/* Dropdown Button */}
      <button
        className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-sky-200 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Select Language"
      >
        Language <FaChevronDown
          className={`ml-2 transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 bg-white border rounded shadow-md dark:bg-gray-800 dark:border-gray-700"
          role="menu"
        >
          {languages.map(({ code, name }) => (
            <button
              key={code}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-600"
              onClick={() => handleLanguageChange(code)}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}