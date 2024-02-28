// i18n.js (or any appropriate file for localization setup)
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en.json'; // Import en.json
import trTranslation from './locales/tr.json';
import zhTranslation from './locales/zh.json';
import deTranslation from './locales/de.json';
import ruTranslation from './locales/ru.json';
/***
 *
 *
 *
 */
i18n.use(initReactI18next).init({
  resources: {
    en: {
      // Specify language code
      translation: enTranslation, // Assign imported translations
    },
    tr: {
      translation: trTranslation,
    },
    def: {
      translation: deTranslation,
    },
    zh: {
      translation: zhTranslation,
    },
    ru: {
      translation: ruTranslation,
    },
    // Other languages can be added similarly
  },
  lng: 'en', // Set default language
  fallbackLng: 'en', // Fallback language in case translation is missing
  interpolation: {
    escapeValue: false, // React already does escaping
  },
});

export default i18n;
