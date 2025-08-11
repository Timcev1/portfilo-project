export const SUPPORTED_LOCALES = ['en', 'es'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export const LANGUAGE_LABELS: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
};
