'use client';

import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa'; // Import icons for moon and sun

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null); // Start with null

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'; // Default to light
    setTheme(savedTheme as 'light' | 'dark'); // Set theme after client render

    // Apply the theme (class toggle) after page is mounted
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme); // Update theme state
    localStorage.setItem('theme', newTheme); // Store the new theme
    document.documentElement.classList.toggle('dark', newTheme === 'dark'); // Toggle theme class
  };

  // Return loading state if theme is not determined yet
  if (theme === null) {
    return <div>Loading...</div>;
  }

  return (
    <button
      aria-label="Toggle color theme"
      onClick={toggleTheme}
      className="p-2 rounded-md transition-all duration-300"
    >
      {theme === 'dark' ? (
        <FaSun className="text-yellow-500" /> // Sun icon for dark mode
      ) : (
        <FaMoon className="text-blue-500" /> // Moon icon for light mode
      )}
    </button>
  );
}
