# i18n Implementierungsplan für ProjectPad

**Status:** 🔴 Noch nicht implementiert (Deutsch-only MVP)
**Aufwand:** ~6-8 Stunden
**Priorität:** Post-MVP (Nice-to-have)

## Warum ist i18n aufwendig?

ProjectPad ist aktuell **monolingual** (nur Deutsch) gebaut. Alle UI-Texte sind hardcodiert in den Komponenten. Eine Internationalisierung erfordert:

1. **Alle Texte extrahieren** (~100-150 Stellen in 9 Pages + 15-20 Komponenten)
2. **Zod-Validierungen übersetzen** (dynamische Fehlermeldungen)
3. **Datums-/Zahlenformatierung** anpassen
4. **i18n-Infrastruktur** aufsetzen (react-i18next)
5. **Übersetzungsdateien** erstellen und pflegen

## Empfohlene Library: react-i18next

**Vorteile:**
- De-facto Standard für React
- TypeScript-Support
- Lazy Loading von Übersetzungen
- Namespace-Support
- Gute Performance

**Alternative:** react-intl (mehr Features, aber komplexer)

---

## Schritt-für-Schritt Implementierung

### 1. Dependencies installieren

```bash
npm install react-i18next i18next i18next-browser-languagedetector
npm install -D @types/i18next
```

### 2. i18n Konfiguration erstellen

**Datei:** `src/lib/i18n.ts`

```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import de from '@/locales/de.json';
import pl from '@/locales/pl.json';

i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n to react-i18next
  .init({
    resources: {
      de: { translation: de },
      pl: { translation: pl },
    },
    fallbackLng: 'de', // Default language
    debug: import.meta.env.DEV,
    interpolation: {
      escapeValue: false, // React already escapes
    },
  });

export default i18n;
```

### 3. i18n Provider einbinden

**Datei:** `src/main.tsx`

```typescript
import './lib/i18n'; // Import BEFORE React

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### 4. Übersetzungsdateien erstellen

**Struktur:**
```
src/
└── locales/
    ├── de.json
    └── pl.json
```

**Beispiel:** `src/locales/de.json`

```json
{
  "common": {
    "save": "Speichern",
    "cancel": "Abbrechen",
    "delete": "Löschen",
    "edit": "Bearbeiten",
    "create": "Erstellen",
    "search": "Suchen",
    "loading": "Lädt...",
    "error": "Ein Fehler ist aufgetreten"
  },
  "auth": {
    "login": "Anmelden",
    "signup": "Registrieren",
    "logout": "Abmelden",
    "email": "E-Mail",
    "password": "Passwort",
    "loginButton": "Anmelden",
    "signupButton": "Registrieren",
    "alreadyHaveAccount": "Bereits ein Konto?",
    "noAccount": "Noch kein Konto?"
  },
  "projects": {
    "title": "Projekte",
    "create": "Projekt erstellen",
    "edit": "Projekt bearbeiten",
    "delete": "Projekt löschen",
    "name": "Projektname",
    "description": "Beschreibung",
    "status": "Status",
    "goals": "Ziele",
    "deadline": "Deadline",
    "active": "Aktiv",
    "archived": "Archiviert",
    "completed": "Abgeschlossen",
    "emptyState": "Noch keine Projekte. Erstelle dein erstes Projekt!",
    "deleteConfirm": "Möchtest du dieses Projekt wirklich löschen?"
  },
  "notes": {
    "title": "Notizen",
    "create": "Notiz erstellen",
    "quickNote": "Schnelle Notiz",
    "content": "Inhalt",
    "emptyState": "Noch keine Notizen vorhanden",
    "placeholder": "Notiz schreiben... (Ctrl+Enter zum Speichern)",
    "saveShortcut": "Strg+Enter zum Speichern"
  },
  "persons": {
    "title": "Kontakte",
    "create": "Kontakt erstellen",
    "edit": "Kontakt bearbeiten",
    "name": "Name",
    "role": "Rolle",
    "expertise": "Expertise",
    "contactInfo": "Kontaktinformationen",
    "emptyState": "Noch keine Kontakte vorhanden"
  },
  "validation": {
    "required": "{{field}} ist erforderlich",
    "email": "Ungültige E-Mail-Adresse",
    "minLength": "{{field}} muss mindestens {{min}} Zeichen lang sein",
    "maxLength": "{{field}} darf maximal {{max}} Zeichen lang sein"
  },
  "toasts": {
    "projectCreated": "Projekt erfolgreich erstellt",
    "projectUpdated": "Projekt aktualisiert",
    "projectDeleted": "Projekt gelöscht",
    "noteSaved": "Notiz gespeichert",
    "error": "Ein Fehler ist aufgetreten"
  },
  "landing": {
    "title": "ProjectPad",
    "subtitle": "Dein persönlicher Projekt-Assistent mit Notepad-Feeling",
    "ctaStart": "Kostenlos starten",
    "ctaLogin": "Anmelden",
    "feature1Title": "Projekte verwalten",
    "feature1Desc": "Organisiere deine Projekte mit Status, Zielen und Deadlines",
    "feature2Title": "Kontakte zuordnen",
    "feature2Desc": "Verknüpfe Personen mit deinen Projekten und Notizen",
    "feature3Title": "Schnelle Notizen",
    "feature3Desc": "Notepad-Feeling für blitzschnelle Gedanken und Ideen",
    "feature4Title": "Timeline-Ansicht",
    "feature4Desc": "Behalte den Überblick mit chronologischer Projektverlauf",
    "tagline": "Schnell, einfach, fokussiert – für deine Projekte und Notizen"
  }
}
```

**Beispiel:** `src/locales/pl.json`

```json
{
  "common": {
    "save": "Zapisz",
    "cancel": "Anuluj",
    "delete": "Usuń",
    "edit": "Edytuj",
    "create": "Utwórz",
    "search": "Szukaj",
    "loading": "Ładowanie...",
    "error": "Wystąpił błąd"
  },
  "auth": {
    "login": "Zaloguj się",
    "signup": "Zarejestruj się",
    "logout": "Wyloguj",
    "email": "E-mail",
    "password": "Hasło",
    "loginButton": "Zaloguj",
    "signupButton": "Zarejestruj",
    "alreadyHaveAccount": "Masz już konto?",
    "noAccount": "Nie masz konta?"
  },
  "projects": {
    "title": "Projekty",
    "create": "Utwórz projekt",
    "edit": "Edytuj projekt",
    "delete": "Usuń projekt",
    "name": "Nazwa projektu",
    "description": "Opis",
    "status": "Status",
    "goals": "Cele",
    "deadline": "Termin",
    "active": "Aktywny",
    "archived": "Zarchiwizowany",
    "completed": "Zakończony",
    "emptyState": "Brak projektów. Utwórz swój pierwszy projekt!",
    "deleteConfirm": "Czy na pewno chcesz usunąć ten projekt?"
  }
}
```

### 5. Komponenten migrieren

**Vorher (hardcodiert):**

```typescript
// src/pages/ProjectsPage.tsx
export default function ProjectsPage() {
  return (
    <div>
      <h1>Projekte</h1>
      <Button>Projekt erstellen</Button>
    </div>
  );
}
```

**Nachher (mit i18n):**

```typescript
// src/pages/ProjectsPage.tsx
import { useTranslation } from 'react-i18next';

export default function ProjectsPage() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('projects.title')}</h1>
      <Button>{t('projects.create')}</Button>
    </div>
  );
}
```

### 6. Zod-Validierungen übersetzen

**Vorher:**

```typescript
// src/lib/validations.ts
export const projectSchema = z.object({
  name: z.string().min(1, 'Name ist erforderlich').max(100),
  description: z.string().optional(),
});
```

**Nachher:**

```typescript
// src/lib/validations.ts
import i18n from './i18n';

export const projectSchema = z.object({
  name: z
    .string()
    .min(1, i18n.t('validation.required', { field: i18n.t('projects.name') }))
    .max(100, i18n.t('validation.maxLength', { field: i18n.t('projects.name'), max: 100 })),
  description: z.string().optional(),
});
```

### 7. Datums-Formatierung

**Vorher:**

```typescript
new Date(date).toLocaleDateString('de-DE');
```

**Nachher:**

```typescript
import { useTranslation } from 'react-i18next';

const { i18n } = useTranslation();
new Date(date).toLocaleDateString(i18n.language); // 'de' oder 'pl'
```

### 8. Language Switcher Component

**Datei:** `src/components/shared/LanguageSwitcher.tsx`

```typescript
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'de', name: 'Deutsch' },
    { code: 'pl', name: 'Polski' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            className={i18n.language === lang.code ? 'bg-accent' : ''}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### 9. TypeScript-Typisierung für Übersetzungen

**Datei:** `src/types/i18next.d.ts`

```typescript
import 'react-i18next';
import type de from '@/locales/de.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: typeof de;
    };
  }
}
```

→ Dadurch gibt TypeScript Autovervollständigung für `t('projects.title')`

---

## Betroffene Dateien

### Pages (9 Dateien)
- `src/pages/HomePage.tsx` - Landing Page
- `src/pages/LoginPage.tsx` - Login
- `src/pages/SignupPage.tsx` - Registrierung
- `src/pages/DashboardPage.tsx` - Dashboard
- `src/pages/ProjectsPage.tsx` - Projekte-Liste
- `src/pages/ProjectDetailPage.tsx` - Projekt-Detail
- `src/pages/PersonsPage.tsx` - Kontakte
- `src/pages/PersonDetailPage.tsx` - Kontakt-Detail
- `src/pages/NotesPage.tsx` - Notizen

### Komponenten (~15-20 Dateien)
- `src/components/layout/AppLayout.tsx` - Navigation
- `src/components/projects/ProjectForm.tsx` - Projekt-Formular
- `src/components/projects/ProjectCard.tsx` - Projekt-Karte
- `src/components/notes/NoteForm.tsx` - Notiz-Formular
- `src/components/persons/PersonForm.tsx` - Kontakt-Formular
- `src/components/shared/EmptyState.tsx` - Leerzustände
- ... und weitere

### Validierungen
- `src/lib/validations.ts` - Alle Zod-Schemas

### Error Handling
- Toast-Nachrichten (überall verstreut)
- Error Messages in Components

---

## Aufwandsschätzung

| Aufgabe | Aufwand |
|---------|---------|
| Setup (i18n, Config, Types) | 1h |
| Übersetzungsdateien erstellen (de + pl) | 2h |
| Pages migrieren (9 Dateien) | 2h |
| Komponenten migrieren (~15 Dateien) | 2h |
| Zod-Validierungen | 1h |
| Language Switcher + UI | 0.5h |
| Testing & Bugfixes | 1h |
| **GESAMT** | **~8-9h** |

---

## Best Practices

### 1. Namespaces nutzen
```typescript
// Gruppierung nach Features
t('projects.title')
t('notes.create')
t('common.save')
```

### 2. Interpolation für dynamische Werte
```typescript
t('validation.minLength', { field: 'Name', min: 3 })
// Output (de): "Name muss mindestens 3 Zeichen lang sein"
// Output (pl): "Nazwa musi mieć co najmniej 3 znaki"
```

### 3. Pluralisierung
```typescript
// de.json
{
  "projects": {
    "count_one": "{{count}} Projekt",
    "count_other": "{{count}} Projekte"
  }
}

// Nutzung
t('projects.count', { count: 1 }) // "1 Projekt"
t('projects.count', { count: 5 }) // "5 Projekte"
```

### 4. Lazy Loading für Performance
```typescript
// Nur aktive Sprache laden
i18n.init({
  backend: {
    loadPath: '/locales/{{lng}}.json',
  },
});
```

---

## Migration-Strategie

### Option A: Big Bang (nicht empfohlen)
- Alles auf einmal migrieren
- Hohes Risiko für Bugs
- App ist während Migration nicht nutzbar

### Option B: Schrittweise (empfohlen)
1. Setup + Config
2. Common Strings (Buttons, Labels)
3. Auth Pages (Login/Signup)
4. Main Pages (Projects, Notes, Persons)
5. Validierungen & Error Messages
6. Polish (Testing & Refinement)

**Vorteil:** App bleibt während Migration funktional

---

## Wann sollte i18n implementiert werden?

### ✅ Implementieren, wenn:
- Polnische Nutzer gewonnen werden sollen
- Internationalisierung zur Produktstrategie gehört
- Zeit für 8-9h Implementierung verfügbar ist

### ❌ Noch warten, wenn:
- MVP-Validierung noch nicht abgeschlossen
- Nur deutschsprachige Nutzer geplant
- Andere Features höhere Priorität haben

---

## Alternativen

### Minimale i18n (nur wichtigste Texte)
Falls Full-i18n zu aufwendig:
- Nur Login/Signup übersetzen
- UI bleibt auf Deutsch
- Aufwand: ~2h statt 8h

### Machine Translation für Quick-Win
- DeepL API für automatische Übersetzungen
- Manuelles Review nur für wichtige Texte
- Aufwand: ~4h

---

## Quellen & Links

- [react-i18next Docs](https://react.i18next.com/)
- [i18next Docs](https://www.i18next.com/)
- [Zod + i18next Integration](https://github.com/aiji42/zod-i18n)

---

**Fazit:** i18n ist für ProjectPad machbar, aber sollte erst nach MVP-Validierung implementiert werden. Die Infrastruktur ist gut dokumentiert und kann bei Bedarf in 1-2 Wochen umgesetzt werden.
