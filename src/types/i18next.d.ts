import 'i18next';

// Import translation files to infer types
import translation from '@/locales/de/translation.json';
import validation from '@/locales/de/validation.json';
import auth from '@/locales/de/auth.json';
import projects from '@/locales/de/projects.json';
import persons from '@/locales/de/persons.json';
import notes from '@/locales/de/notes.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: typeof translation;
      validation: typeof validation;
      auth: typeof auth;
      projects: typeof projects;
      persons: typeof persons;
      notes: typeof notes;
    };
  }
}
