import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import German translations
import deTranslation from '@/locales/de/translation.json';
import deValidation from '@/locales/de/validation.json';
import deAuth from '@/locales/de/auth.json';
import deProjects from '@/locales/de/projects.json';
import dePersons from '@/locales/de/persons.json';
import deNotes from '@/locales/de/notes.json';

// Import Polish translations
import plTranslation from '@/locales/pl/translation.json';
import plValidation from '@/locales/pl/validation.json';
import plAuth from '@/locales/pl/auth.json';
import plProjects from '@/locales/pl/projects.json';
import plPersons from '@/locales/pl/persons.json';
import plNotes from '@/locales/pl/notes.json';

// Translation resources
const resources = {
  de: {
    translation: deTranslation,
    validation: deValidation,
    auth: deAuth,
    projects: deProjects,
    persons: dePersons,
    notes: deNotes,
  },
  pl: {
    translation: plTranslation,
    validation: plValidation,
    auth: plAuth,
    projects: plProjects,
    persons: plPersons,
    notes: plNotes,
  },
};

i18n
  .use(LanguageDetector) // Auto-detect browser language
  .use(initReactI18next) // React integration
  .init({
    resources,
    fallbackLng: 'de', // Default to German
    supportedLngs: ['de', 'pl'],
    detection: {
      order: ['localStorage', 'navigator'], // Check localStorage first, then browser
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    interpolation: {
      escapeValue: false, // React already escapes
    },
    react: {
      useSuspense: false, // Avoid Suspense for now
    },
    debug: import.meta.env.DEV, // Debug mode in development
  });

export default i18n;
