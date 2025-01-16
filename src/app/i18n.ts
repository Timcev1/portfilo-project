import i18n from 'i18next';

import { initReactI18next } from 'react-i18next';


i18n.use(initReactI18next).init({
  fallbackLng: 'en', // Fallback language
  supportedLngs: ['en', 'es'], // Supported languages
  interpolation: {
    escapeValue: false, // React already escapes values
  },
  resources: {
    en: {
      translation: {
        welcome: "Welcome",
        // Add your keys and translations here
      },
    },
    es: {
      translation: {
        welcome: "Bienvenido",
        // Add your keys and translations here
      },
    },
  },
});

export default i18n;
