# ProjectPad - Projektspezifische Konventionen

## Projektübersicht

**ProjectPad** ist ein persönlicher Projekt-Assistent mit Notepad-Feeling für schnelle Notizerfassung mit Projekt- und Personen-Zuordnung.

### Kernfeatures (MVP)
- Projekte verwalten (CRUD)
- Personen/Kontakte verwalten (CRUD)
- Personen zu Projekten zuordnen (N:M)
- Notizen mit Projekt- & Personen-Zuordnung
- Timeline-Ansicht pro Projekt
- Kontakte-Bereich (projektübergreifend)

### UI-Sprache
**Deutsch** - Alle UI-Texte, Labels, Fehlermeldungen und Benachrichtigungen in deutscher Sprache.

## Datenbankstruktur

### Tabellen
- `projects` - Projekte mit Soft Delete
- `notes` - Notizen mit Soft Delete
- `persons` - Personen/Kontakte mit Soft Delete
- `project_persons` - N:M Zuordnung Projekte ↔ Personen
- `note_persons` - N:M Zuordnung Notizen ↔ Personen

### Soft Delete Pattern
Alle Haupttabellen haben `deleted_at` für Soft Delete:
```typescript
// Soft Delete via RPC
await supabase.rpc('soft_delete_project', { project_id: id });

// IMMER soft-deleted Records ausschließen
const { data } = await supabase
  .from('projects')
  .select('*')
  .is('deleted_at', null);
```

### Volltext-Suche
Notizen haben `search_vector` (tsvector) für schnelle Volltext-Suche:
```typescript
const { data } = await supabase.rpc('search_notes_fulltext', {
  search_query: 'meeting',
});
```

## Routen-Struktur

```
/ (Root)
├── /login              # Login-Seite
├── /signup             # Registrierung
└── /app (Protected)    # Hauptbereich (geschützt)
    ├── /               # Dashboard / Übersicht
    ├── /projects       # Projekte-Liste
    ├── /projects/:id   # Projekt-Detail mit Timeline
    ├── /persons        # Kontakte-Liste
    ├── /persons/:id    # Kontakt-Detail (alle Notizen zu dieser Person)
    └── /notes          # Alle Notizen (optional)
```

## Komponenten-Struktur

```
src/
├── components/
│   ├── layout/
│   │   ├── AppLayout.tsx          # Haupt-Layout mit Navigation
│   │   ├── AuthLayout.tsx         # Layout für Login/Signup
│   │   └── ProtectedRoute.tsx     # Route Guard für Auth
│   ├── projects/
│   │   ├── ProjectList.tsx        # Liste aller Projekte
│   │   ├── ProjectCard.tsx        # Projekt-Karte
│   │   ├── ProjectForm.tsx        # Formular (Create/Edit)
│   │   └── ProjectTimeline.tsx    # Timeline mit Notizen
│   ├── persons/
│   │   ├── PersonList.tsx         # Liste aller Kontakte
│   │   ├── PersonCard.tsx         # Kontakt-Karte
│   │   ├── PersonForm.tsx         # Formular (Create/Edit)
│   │   └── PersonProjectList.tsx  # Projekte einer Person
│   ├── notes/
│   │   ├── NoteList.tsx           # Liste von Notizen
│   │   ├── NoteCard.tsx           # Notiz-Karte
│   │   ├── NoteForm.tsx           # Formular (Create/Edit)
│   │   └── QuickNoteForm.tsx      # Schnell-Erfassung (Notepad-Feeling)
│   └── shared/
│       ├── EmptyState.tsx         # Leerer Zustand
│       ├── LoadingSpinner.tsx     # Lade-Indikator
│       ├── ErrorMessage.tsx       # Fehler-Anzeige
│       ├── ConfirmDialog.tsx      # Bestätigungs-Dialog
│       ├── SearchBar.tsx          # Suchleiste
│       └── DateGroup.tsx          # Datums-Gruppierung
├── pages/
│   ├── LoginPage.tsx
│   ├── SignupPage.tsx
│   ├── DashboardPage.tsx
│   ├── ProjectsPage.tsx
│   ├── ProjectDetailPage.tsx
│   ├── PersonsPage.tsx
│   └── PersonDetailPage.tsx
├── hooks/
│   ├── useProjects.ts             # React Query: Projects CRUD
│   ├── useNotes.ts                # React Query: Notes CRUD
│   ├── usePersons.ts              # React Query: Persons CRUD
│   └── useAuth.ts                 # Auth Hook (from Context)
├── contexts/
│   └── AuthContext.tsx            # Auth State & Actions
├── types/
│   ├── database.ts                # Supabase generated types
│   ├── entities.ts                # Domain entities
│   └── api.ts                     # API types
├── lib/
│   ├── supabase.ts                # Supabase client
│   ├── utils.ts                   # cn() helper
│   └── validations.ts             # Zod schemas
└── App.tsx
```

## UX-Konventionen

### Notepad-Feeling
Das Herzstück von ProjectPad ist die schnelle Notizerfassung:

```typescript
// QuickNoteForm.tsx
<Textarea
  placeholder="Notiz schreiben... (Ctrl+Enter zum Speichern)"
  className="min-h-[300px] resize-none font-mono text-base"
  autoFocus
  onKeyDown={(e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      handleSubmit();
    }
  }}
/>
```

**Features:**
- Großes Textfeld (min. 300px Höhe)
- Auto-Focus beim Öffnen
- Monospace-Font für "Notepad-Gefühl"
- `Ctrl+Enter` zum Speichern
- Kein Resize (feste Höhe)

### Timeline-Gruppierung
Notizen in Timeline-Ansicht nach Datum gruppieren:

```typescript
// Gruppierung: Heute / Gestern / Datum
const groups = [
  { label: 'Heute', notes: todayNotes },
  { label: 'Gestern', notes: yesterdayNotes },
  { label: '15.12.2024', notes: olderNotes },
];
```

### Datums-Formatierung
```typescript
// Deutsche Formatierung
const germanDate = new Date(date).toLocaleDateString('de-DE', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});
// Output: 27.12.2024

// Relative Formatierung (für Timeline)
function formatRelativeDate(date: string): string {
  const today = new Date();
  const noteDate = new Date(date);

  if (isSameDay(today, noteDate)) return 'Heute';
  if (isYesterday(noteDate)) return 'Gestern';

  return noteDate.toLocaleDateString('de-DE');
}
```

## Status-Werte

### Projekt-Status
```typescript
type ProjectStatus = 'active' | 'archived' | 'completed';

const statusLabels: Record<ProjectStatus, string> = {
  active: 'Aktiv',
  archived: 'Archiviert',
  completed: 'Abgeschlossen',
};

const statusColors: Record<ProjectStatus, string> = {
  active: 'bg-green-500',
  archived: 'bg-gray-500',
  completed: 'bg-blue-500',
};
```

## Error Handling

### User-Friendly Fehlermeldungen (Deutsch)
```typescript
const errorMessages: Record<string, string> = {
  'Invalid login credentials': 'Ungültige Anmeldedaten',
  'Email already registered': 'E-Mail bereits registriert',
  'Network error': 'Netzwerkfehler - bitte später erneut versuchen',
  'Database error': 'Datenbankfehler - bitte später erneut versuchen',
  'Not found': 'Nicht gefunden',
  'Unauthorized': 'Keine Berechtigung',
};

function translateError(error: string): string {
  return errorMessages[error] || 'Ein unbekannter Fehler ist aufgetreten';
}
```

### Toast Notifications
```typescript
// Erfolgs-Meldungen
toast.success('Projekt erfolgreich erstellt');
toast.success('Notiz gespeichert');

// Fehler-Meldungen
toast.error('Fehler beim Erstellen des Projekts');
toast.error('Notiz konnte nicht gespeichert werden');

// Info-Meldungen
toast.info('Projekt archiviert');
```

## Keyboard Shortcuts

| Shortcut | Aktion |
|----------|--------|
| `Ctrl+Enter` | Notiz speichern (in NoteForm) |
| `Ctrl+K` | Suche öffnen (geplant) |
| `/` | Quick Note erstellen (geplant) |
| `Esc` | Dialog schließen |

## Performance

### React Query Cache-Zeiten
```typescript
// Default Query Options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 Minuten
      gcTime: 1000 * 60 * 30, // 30 Minuten (früher: cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
```

### Optimistic Updates
```typescript
// Sofortige UI-Updates bei Mutations
const createNoteMutation = useMutation({
  mutationFn: createNote,
  onMutate: async (newNote) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: ['notes'] });

    // Snapshot current value
    const previousNotes = queryClient.getQueryData(['notes']);

    // Optimistically update
    queryClient.setQueryData(['notes'], (old) => [...old, newNote]);

    return { previousNotes };
  },
  onError: (err, newNote, context) => {
    // Rollback on error
    queryClient.setQueryData(['notes'], context.previousNotes);
  },
  onSettled: () => {
    // Refetch after mutation
    queryClient.invalidateQueries({ queryKey: ['notes'] });
  },
});
```

## Testing (Geplant für Post-MVP)

### Unit Tests (Vitest)
- Utility functions
- Custom hooks
- Zod validations

### E2E Tests (Playwright)
- Kritische User Flows
- Auth Flow (Login/Signup)
- Notiz erstellen → Projekt zuordnen
- Timeline-Ansicht

## Deployment (Geplant)

### Cloudflare Pages
- Automatisches Deployment bei Push to `main`
- Preview Deployments für PRs
- Environment Variables in Cloudflare Dashboard

### Environment Variables
```env
# Production
VITE_SUPABASE_URL=https://production.supabase.co
VITE_SUPABASE_ANON_KEY=prod-key

# Development
VITE_SUPABASE_URL=https://dev.supabase.co
VITE_SUPABASE_ANON_KEY=dev-key
```

## Git Workflow

### Branch Strategy
```
main (production)
└── develop (development)
    ├── feature/project-crud
    ├── feature/notes-timeline
    └── fix/auth-redirect
```

### Commit Messages (Deutsch oder Englisch)
```
feat: Projekt-CRUD implementiert
fix: Timeline-Gruppierung korrigiert
docs: README aktualisiert
style: Tailwind-Klassen optimiert
refactor: useProjects Hook vereinfacht
test: E2E Tests für Auth hinzugefügt
```

## AI Features (Should Have - Optional)

Falls Zeit für AI-Features bleibt:

### On-Demand Features
- Projekt-Zusammenfassung (Button klicken → AI generiert Summary)
- Risikoerkennung in Notizen
- Handlungsempfehlungen
- Task-Vorschläge

### LLM Provider
- **Standard**: OpenAI (GPT-4o-mini für MVP)
- **Alternative**: Claude API (falls Budget verfügbar)

### Implementation
```typescript
// Edge Function für AI Features
const summary = await supabase.functions.invoke('generate-summary', {
  body: { projectId: project.id },
});
```

## Wichtige Hinweise

- ✅ **Desktop-First**: Responsive, aber Desktop-Ansicht priorisieren
- ✅ **Deutsch**: Alle UI-Texte in deutscher Sprache
- ✅ **Soft Delete**: Niemals hard delete, immer `deleted_at` setzen
- ✅ **RLS**: Alle Tabellen haben Row Level Security
- ✅ **Type Safety**: TypeScript strict mode, keine `any` types
- ✅ **shadcn/ui**: Keine Custom UI Components (außer Domain-spezifisch)
- ⏸️ **AI Features**: Nice-to-have, nicht kritisch für MVP
- ⏸️ **Markdown**: Should Have für Notizen, nicht Must Have

## Scope Management

### Must Have (MVP)
- Auth (Email/Password)
- Projekte CRUD
- Personen CRUD
- Notizen CRUD
- Timeline-Ansicht
- Projekt-Personen Zuordnung

### Should Have (wenn Zeit bleibt)
- AI-Features (On-Demand)
- Markdown-Support
- Volltext-Suche

### Won't Have (V1.1+)
- Dashboard mit Statistiken
- Social Logins
- Email-Benachrichtigungen
- Team-Kollaboration
- Tags & Kategorien
- Export-Funktionen
