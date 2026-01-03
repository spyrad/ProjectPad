# UI Architektur Plan - ProjectPad

## 1. Routes & Navigation

### Route-Struktur

```
/ (Public)
├── /login              - Login-Seite (US-002)
├── /register           - Registrierung (US-001)
└── /reset-password     - Passwort zurücksetzen (US-004)

/app (Protected - erfordert Auth)
├── /app/projects                    - Projektliste (US-010) [STARTSEITE]
├── /app/projects/new                - Neues Projekt (US-011)
├── /app/projects/:id                - Projekt-Detail (US-015)
│   ├── ?tab=overview                - Übersicht (default)
│   ├── ?tab=timeline                - Timeline (US-034)
│   └── ?tab=insights                - AI Insights (US-050, Should Have)
├── /app/projects/:id/edit           - Projekt bearbeiten (US-012)
│
├── /app/contacts                    - Kontaktliste (US-020)
├── /app/contacts/new                - Neue Person (US-021)
├── /app/contacts/:id                - Person-Detail (US-024)
├── /app/contacts/:id/edit           - Person bearbeiten (US-022)
│
├── /app/notes/new                   - Neue Notiz (US-030)
│   ├── ?project=:id                 - Mit Projekt vorausgewählt (US-031)
│   └── ?person=:id                  - Mit Person vorausgewählt
└── /app/notes/:id/edit              - Notiz bearbeiten (US-032)
```

### Navigation-Komponenten

**MainNav (für authenticated users)**
- Logo/App-Name (klickbar → Projektliste)
- Projekte (Link zu `/app/projects`)
- Kontakte (Link zu `/app/contacts`)
- Suche (Search bar, US-040, Should Have)
- User Menu (Dropdown):
  - Einstellungen (zukünftig)
  - Logout (US-003)

**Mobile Navigation (Burger Menu)**
- Gleiche Struktur wie MainNav, responsive umgesetzt

### Protected Routes

**Auth Guard Implementierung:**
```typescript
// Komponente: ProtectedRoute.tsx
- Prüft Supabase Session
- Redirect zu /login bei fehlender Session
- Speichert ursprüngliche URL für Redirect nach Login (US-005)
```

---

## 2. Komponenten-Architektur

### 2.1 Layout-Komponenten

#### AppLayout
**Zweck**: Haupt-Layout für authenticated Bereiche

```
┌─────────────────────────────────────────┐
│ MainNav                                 │
├─────────────────────────────────────────┤
│                                         │
│ Content Area (children)                 │
│                                         │
└─────────────────────────────────────────┘
```

**Props:**
- `children: ReactNode`

**Features:**
- Sticky Navigation
- Responsive (Desktop-First)
- Toast Container für Meldungen

---

#### AuthLayout
**Zweck**: Layout für Login/Register/Reset

```
┌─────────────────────────────────────────┐
│                                         │
│          ┌─────────────┐               │
│          │   Content   │               │
│          │             │               │
│          └─────────────┘               │
│                                         │
└─────────────────────────────────────────┘
```

**Props:**
- `children: ReactNode`
- `title?: string`

**Features:**
- Zentriert
- Card-basiertes Design
- Logo oben

---

### 2.2 Feature-Komponenten

#### Projekte

**ProjectList** (`/app/projects`)
- Komponenten:
  - `ProjectCard` (zeigt Name, Status, Deadline)
  - `EmptyState` (US-070)
  - Button "Neues Projekt" → `/app/projects/new`
- Features:
  - Gruppierung/Sortierung nach Status
  - Status-Badge (Aktiv/Pausiert/Abgeschlossen)
- State:
  - Supabase Query: `projects WHERE deleted_at IS NULL`

---

**ProjectDetail** (`/app/projects/:id`)
- Layout: Tab-basiert (shadcn/ui Tabs)
- Tabs:
  1. **Übersicht** (overview)
     - Komponenten:
       - `ProjectHeader` (Name, Status-Dropdown US-014)
       - `ProjectInfo` (Beschreibung, Ziele, Deadline)
       - `ProjectPeopleList` (Beteiligte Personen, US-015)
         - Button "Person hinzufügen" → Dialog (US-025)
         - Entfernen-Button pro Person (US-026)
       - Actions: Bearbeiten, Löschen (US-012, US-013)

  2. **Timeline** (timeline)
     - Komponenten:
       - `NoteList` (chronologisch, neueste oben, US-034)
       - `NoteCard` (Inhalt, Datum, zugeordnete Person)
       - Button "Neue Notiz" → `/app/notes/new?project=:id`
       - Gruppierung nach Tagen/Wochen
       - `EmptyState` (US-070)

  3. **Insights** (insights, Should Have)
     - Komponenten:
       - `InsightsPanel`
       - Button "Analysieren" (US-050)
       - `SummarySection`, `RisksSection`, `RecommendationsSection`, `TaskSuggestionsSection`

---

**ProjectForm** (`/app/projects/new`, `/app/projects/:id/edit`)
- Komponenten:
  - React Hook Form + Zod
  - Formfelder:
    - Name (Input, required)
    - Beschreibung (Textarea)
    - Status (Select: Aktiv/Pausiert/Abgeschlossen)
    - Ziele (Textarea, Markdown)
    - Deadline (DatePicker)
  - Submit-Button "Speichern"
  - Cancel-Button "Abbrechen"
- Features:
  - Validierung via Zod
  - Fehlermeldungen (US-071)
  - Erfolgsmeldung (Toast)

---

#### Personen (Kontakte)

**PersonList** (`/app/contacts`)
- Komponenten:
  - `PersonCard` (Name, Rolle)
  - Suchfeld (Filter nach Name, US-020)
  - Button "Neue Person"
  - `EmptyState` (US-070)
- State:
  - Supabase Query mit `ilike` Filter

---

**PersonDetail** (`/app/contacts/:id`)
- Komponenten:
  - `PersonHeader` (Name, Rolle)
  - `PersonInfo` (Beschreibung, Expertise, Kontakt)
  - `PersonProjects` (Liste zugeordneter Projekte, US-024)
  - `PersonNotes` (Alle Notizen zu dieser Person, US-024, US-035)
    - Notizen aus allen Projekten
    - Mit Projekt-Name angezeigt
    - Chronologisch sortiert
  - Actions: Bearbeiten, Löschen (US-022, US-023)

---

**PersonForm** (`/app/contacts/new`, `/app/contacts/:id/edit`)
- Komponenten:
  - React Hook Form + Zod
  - Formfelder:
    - Name (Input, required)
    - Rolle (Input)
    - Beschreibung (Textarea)
    - Expertise (Textarea)
    - Kontakt (Textarea)
  - Submit/Cancel Buttons
- Features:
  - Validierung via Zod
  - Fehlermeldungen (US-071)

---

#### Notizen

**NoteForm** (`/app/notes/new`, `/app/notes/:id/edit`)
- Komponenten:
  - **Großes Textfeld** (Textarea, Notepad-Feeling, US-030)
  - Projekt-Auswahl (Combobox/Select, optional)
  - Person-Auswahl (Combobox/Select, optional)
  - Toggle "Markdown Preview" (Should Have, US-060)
  - Submit-Button "Speichern" (Keyboard: Ctrl+Enter)
  - Cancel-Button
- Features:
  - Auto-Focus auf Textfeld
  - Autosave (localStorage Draft, US-072)
  - Projekt vorausgewählt wenn `?project=:id` (US-031)
  - Markdown-Unterstützung (Should Have, US-060)

---

**NoteCard** (verwendet in Timeline, PersonDetail)
- Props:
  - `note: Note`
  - `showProject?: boolean` (für PersonDetail)
  - `showPerson?: boolean` (für Timeline)
- Komponenten:
  - Inhalt (mit Markdown-Rendering, Should Have)
  - Datum (relative Zeit: "vor 2 Stunden")
  - Zugeordnete Person/Projekt (Badge)
  - Actions: Bearbeiten, Löschen (US-032, US-033)

---

**Timeline** (verwendet in ProjectDetail)
- Komponenten:
  - `NoteList` mit Gruppierung nach Datum
  - `DateSeparator` ("Heute", "Gestern", "12.12.2024")
  - `NoteCard`
  - Button "Neue Notiz"
  - `EmptyState` (US-070)
- Features:
  - Infinite Scroll (optional)
  - Sortierung: neueste oben (US-034)

---

### 2.3 Shared Komponenten (shadcn/ui)

#### UI-Bibliothek
Verwendete shadcn/ui Komponenten:

| Komponente | Verwendung |
|------------|------------|
| `Button` | Alle Actions |
| `Input` | Text-Felder |
| `Textarea` | Mehrzeilige Eingaben, Notizen |
| `Select` | Dropdown (Status, Projekt-/Personen-Auswahl) |
| `Combobox` | Searchable Dropdowns |
| `Dialog` | Modals (Person zuordnen, Bestätigungen) |
| `AlertDialog` | Lösch-Bestätigungen (US-073) |
| `Card` | Projekt-/Personen-Cards |
| `Badge` | Status, Rollen |
| `Tabs` | Projekt-Detail |
| `Separator` | Visuelle Trennung |
| `Toast` | Erfolgs-/Fehlermeldungen |
| `Form` | React Hook Form Integration |
| `Label` | Formular-Labels |
| `Calendar` | Date Picker für Deadline |

---

#### Custom Shared Komponenten

**EmptyState**
- Props:
  - `title: string`
  - `description?: string`
  - `actionLabel?: string`
  - `onAction?: () => void`
- Verwendung: Leere Listen (US-070)

---

**ConfirmDialog**
- Props:
  - `title: string`
  - `description: string`
  - `confirmLabel?: string`
  - `onConfirm: () => void`
- Verwendung: Lösch-Bestätigungen (US-073)

---

**SearchBar** (Should Have)
- Props:
  - `onSearch: (query: string) => void`
  - `placeholder?: string`
- Features:
  - Debounced Input (500ms)
  - Min. 2 Zeichen (US-040)

---

**MarkdownEditor** (Should Have)
- Props:
  - `value: string`
  - `onChange: (value: string) => void`
  - `preview?: boolean`
- Features:
  - Syntax Highlighting
  - Preview Toggle (US-060)

---

**StatusBadge**
- Props:
  - `status: 'active' | 'paused' | 'completed'`
- Farben:
  - Aktiv: Grün
  - Pausiert: Gelb
  - Abgeschlossen: Grau

---

**DateDisplay**
- Props:
  - `date: string | Date`
  - `format?: 'relative' | 'absolute'`
- Features:
  - Relative Zeit ("vor 2 Stunden", US-034)
  - Absolute Zeit ("12.12.2024, 14:30")

---

## 3. State Management Strategie

### 3.1 Server State (Supabase Daten)

**Empfehlung: TanStack Query (React Query)**

**Warum React Query?**
- Optimiert für Supabase
- Caching, Background Refetching
- Optimistic Updates
- Einfache Invalidierung

**Query-Organisation:**
```typescript
// hooks/queries/useProjects.ts
export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .is('deleted_at', null)
        .order('status', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });
}

// hooks/mutations/useCreateProject.ts
export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newProject: ProjectInsert) => {
      const { data, error } = await supabase
        .from('projects')
        .insert(newProject)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    }
  });
}
```

**Query Keys Konvention:**
```typescript
// Query Keys
['projects']                          // Alle Projekte
['projects', id]                      // Einzelnes Projekt
['projects', id, 'notes']             // Notizen eines Projekts
['persons']                           // Alle Personen
['persons', id]                       // Einzelne Person
['persons', id, 'notes']              // Notizen einer Person
['notes']                             // Alle Notizen (global)
['search', query]                     // Suchergebnisse
```

---

### 3.2 Client State

**Auth State**
```typescript
// contexts/AuthContext.tsx
type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
};

// Provider nutzt Supabase Auth Listener
```

**Verwendung:**
- Zugriffskontrolle (ProtectedRoute)
- User Menu
- RLS (via Supabase Session)

---

**UI State**
- Tab-Auswahl: URL Query Parameter (`?tab=timeline`)
- Dialog-Zustand: Lokaler State (`useState`)
- Form-Zustand: React Hook Form
- Toast-Meldungen: shadcn/ui Toast System

---

**Form State**
- React Hook Form für alle Formulare
- Zod für Validierung
- Controlled Components via `<Form>` aus shadcn/ui

---

### 3.3 URL State

**Filter & Pagination:**
```typescript
// /app/projects?status=active
// /app/contacts?search=john
// /app/projects/:id?tab=timeline

// Hook: useSearchParams (React Router)
const [searchParams, setSearchParams] = useSearchParams();
const tab = searchParams.get('tab') || 'overview';
```

**Vorteile:**
- Shareable URLs
- Browser Back/Forward
- State Persistence

---

## 4. Forms & Validierung

### 4.1 Zod Schemas

**Projekt-Schema:**
```typescript
// schemas/project.schema.ts
import { z } from 'zod';

export const projectSchema = z.object({
  name: z.string()
    .min(1, 'Name ist erforderlich')
    .max(255, 'Name darf maximal 255 Zeichen haben'),
  description: z.string()
    .max(10000, 'Beschreibung darf maximal 10.000 Zeichen haben')
    .optional()
    .nullable(),
  status: z.enum(['active', 'paused', 'completed'])
    .default('active'),
  goals: z.string()
    .max(10000, 'Ziele dürfen maximal 10.000 Zeichen haben')
    .optional()
    .nullable(),
  deadline: z.date()
    .optional()
    .nullable()
});

export type ProjectFormData = z.infer<typeof projectSchema>;
```

**Person-Schema:**
```typescript
export const personSchema = z.object({
  name: z.string()
    .min(1, 'Name ist erforderlich')
    .max(255, 'Name darf maximal 255 Zeichen haben'),
  role: z.string()
    .max(255, 'Rolle darf maximal 255 Zeichen haben')
    .optional()
    .nullable(),
  description: z.string()
    .max(5000, 'Beschreibung darf maximal 5.000 Zeichen haben')
    .optional()
    .nullable(),
  expertise: z.string()
    .max(2000, 'Expertise darf maximal 2.000 Zeichen haben')
    .optional()
    .nullable(),
  contact: z.string()
    .max(1000, 'Kontakt darf maximal 1.000 Zeichen haben')
    .optional()
    .nullable()
});
```

**Notiz-Schema:**
```typescript
export const noteSchema = z.object({
  content: z.string()
    .min(1, 'Inhalt ist erforderlich')
    .max(50000, 'Inhalt darf maximal 50.000 Zeichen haben'),
  project_id: z.string().uuid().optional().nullable(),
  person_id: z.string().uuid().optional().nullable()
});
```

**Auth-Schemas:**
```typescript
export const loginSchema = z.object({
  email: z.string().email('Ungültige E-Mail-Adresse'),
  password: z.string().min(8, 'Passwort muss mindestens 8 Zeichen haben')
});

export const registerSchema = z.object({
  email: z.string().email('Ungültige E-Mail-Adresse'),
  password: z.string().min(8, 'Passwort muss mindestens 8 Zeichen haben'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwörter stimmen nicht überein',
  path: ['confirmPassword']
});
```

---

### 4.2 React Hook Form Integration

**Beispiel: ProjectForm**
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema, type ProjectFormData } from '@/schemas/project.schema';

export function ProjectForm({ project, onSubmit }: ProjectFormProps) {
  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: project || {
      name: '',
      description: '',
      status: 'active',
      goals: '',
      deadline: null
    }
  });

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Weitere Felder... */}
        <Button type="submit">Speichern</Button>
      </form>
    </Form>
  );
}
```

---

### 4.3 Fehlerbehandlung

**Validierungsfehler (US-071):**
- Inline-Fehler unter Feldern (via `<FormMessage>`)
- Pflichtfelder mit `*` markiert
- Submit-Button disabled bei Fehlern

**Netzwerkfehler (US-072):**
```typescript
// Error Handling in Mutations
const createProject = useCreateProject();

const handleSubmit = async (data: ProjectFormData) => {
  try {
    await createProject.mutateAsync(data);
    toast({
      title: 'Projekt erstellt',
      description: 'Das Projekt wurde erfolgreich erstellt.'
    });
    navigate(`/app/projects/${newProject.id}`);
  } catch (error) {
    toast({
      title: 'Fehler',
      description: 'Das Projekt konnte nicht erstellt werden. Bitte versuchen Sie es erneut.',
      variant: 'destructive'
    });
  }
};
```

**Autosave bei Netzwerkfehler (Notizen, US-072):**
```typescript
// LocalStorage Draft
useEffect(() => {
  const draft = localStorage.getItem('note-draft');
  if (draft) {
    form.reset(JSON.parse(draft));
  }
}, []);

// Save draft on change
const content = form.watch('content');
useEffect(() => {
  localStorage.setItem('note-draft', JSON.stringify({ content }));
}, [content]);

// Clear draft after successful submit
const handleSubmit = async (data) => {
  // ...submit
  localStorage.removeItem('note-draft');
};
```

---

## 5. UI/UX Patterns

### 5.1 Notepad-Feeling (USP, US-030)

**Schnelle Notizerfassung < 10 Sekunden:**
1. Button "Neue Notiz" prominent in Navigation
2. Dialog/Modal öffnet sich
3. Großes Textfeld mit Auto-Focus
4. Keyboard Shortcut: `Ctrl+Enter` zum Speichern
5. Minimale Ablenkung (Projekt/Person optional)

**Implementierung:**
```typescript
// NoteQuickAdd.tsx
export function NoteQuickAdd({ projectId }: { projectId?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Neue Notiz</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <NoteForm projectId={projectId} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
```

---

### 5.2 Lösch-Bestätigungen (US-073)

**Dialog-Struktur:**
```typescript
// components/ConfirmDeleteDialog.tsx
type DeleteType = 'project' | 'person' | 'note';

interface ConfirmDeleteDialogProps {
  type: DeleteType;
  itemName: string;
  consequences?: string; // z.B. "12 Notizen werden gelöscht"
  onConfirm: () => void;
}
```

**Beispiel:**
```
┌───────────────────────────────────────┐
│ Projekt löschen?                      │
├───────────────────────────────────────┤
│ Möchten Sie das Projekt "Website      │
│ Redesign" wirklich löschen?           │
│                                       │
│ ⚠️ 12 Notizen werden ebenfalls       │
│    gelöscht.                          │
│                                       │
│ Diese Aktion kann nicht rückgängig   │
│ gemacht werden.                       │
│                                       │
│         [Abbrechen]  [Löschen]       │
└───────────────────────────────────────┘
```

---

### 5.3 Leere Zustände (US-070)

**Komponente: EmptyState**
```typescript
<EmptyState
  icon={<FolderIcon className="w-12 h-12 text-muted-foreground" />}
  title="Noch keine Projekte"
  description="Erstellen Sie Ihr erstes Projekt, um mit dem Journaling zu beginnen."
  actionLabel="Neues Projekt"
  onAction={() => navigate('/app/projects/new')}
/>
```

**Verwendungsorte:**
- Projektliste leer
- Kontaktliste leer
- Timeline leer
- Person-Notizen leer

---

### 5.4 Timeline-Gruppierung (US-034)

**Gruppierung nach Datum:**
```
┌─────────────────────────────────────────┐
│ Heute                                   │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ Notiz 1 - vor 2 Stunden             │ │
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │ Notiz 2 - vor 5 Stunden             │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ Gestern                                 │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ Notiz 3 - Gestern, 14:30            │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ 18.12.2024                              │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ Notiz 4 - 18.12.2024, 10:15         │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

**Implementierung:**
```typescript
function groupNotesByDate(notes: Note[]) {
  const today = startOfDay(new Date());
  const yesterday = startOfDay(subDays(new Date(), 1));

  return notes.reduce((groups, note) => {
    const noteDate = startOfDay(new Date(note.created_at));

    let label: string;
    if (isEqual(noteDate, today)) {
      label = 'Heute';
    } else if (isEqual(noteDate, yesterday)) {
      label = 'Gestern';
    } else {
      label = format(noteDate, 'dd.MM.yyyy', { locale: de });
    }

    if (!groups[label]) {
      groups[label] = [];
    }
    groups[label].push(note);
    return groups;
  }, {} as Record<string, Note[]>);
}
```

---

### 5.5 Markdown Preview (Should Have, US-060)

**Toggle zwischen Edit & Preview:**
```
┌───────────────────────────────────────┐
│ [Edit] [Preview]                      │
├───────────────────────────────────────┤
│                                       │
│ # Überschrift                         │
│ - Liste 1                             │
│ - Liste 2                             │
│                                       │
└───────────────────────────────────────┘
```

**Library: react-markdown**
```typescript
import ReactMarkdown from 'react-markdown';

{preview ? (
  <ReactMarkdown>{content}</ReactMarkdown>
) : (
  <Textarea value={content} onChange={...} />
)}
```

---

## 6. Responsive Design

### 6.1 Breakpoints (Tailwind)

```typescript
// tailwind.config.ts
screens: {
  'sm': '640px',   // Mobile
  'md': '768px',   // Tablet
  'lg': '1024px',  // Desktop
  'xl': '1280px',  // Large Desktop
}
```

### 6.2 Desktop-First Ansatz (PRD: US-NAV-03)

**Navigation:**
- Desktop (≥1024px): Horizontal Navigation mit Links
- Tablet/Mobile (<1024px): Burger Menu

**Projekt-Detail:**
- Desktop: Tabs horizontal
- Mobile: Tabs als Dropdown/Accordion

**Forms:**
- Desktop: Zweispaltig (Label links, Input rechts)
- Mobile: Einspaltig

---

## 7. Accessibility (WCAG 2.1 AA, PRD Qualitätsmetriken)

### 7.1 Anforderungen

- Keyboard Navigation (Tab, Enter, Esc)
- Focus Indicators (sichtbar)
- ARIA Labels für Icons
- Semantic HTML (h1, h2, nav, main, etc.)
- Farbkontraste ≥ 4.5:1

### 7.2 shadcn/ui

Alle shadcn/ui Komponenten sind bereits WCAG-konform:
- Button: `aria-label` für Icon-Buttons
- Dialog: Focus Trap, Esc zum Schließen
- Form: Labels mit `htmlFor`

---

## 8. Performance-Optimierungen

### 8.1 Code Splitting

```typescript
// React.lazy für Route-basiertes Splitting
const ProjectList = lazy(() => import('@/pages/ProjectList'));
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'));
const ContactList = lazy(() => import('@/pages/ContactList'));

// In Routes
<Suspense fallback={<LoadingSpinner />}>
  <Route path="/app/projects" element={<ProjectList />} />
</Suspense>
```

### 8.2 React Query Optimierungen

- Stale Time: 5 Minuten (Daten gelten als frisch)
- Cache Time: 10 Minuten (Cache bleibt erhalten)
- Background Refetch bei Window Focus

```typescript
// lib/queryClient.ts
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      refetchOnWindowFocus: true
    }
  }
});
```

### 8.3 Optimistic Updates

**Beispiel: Projektstatus ändern (US-014)**
```typescript
const updateProjectStatus = useMutation({
  mutationFn: async ({ id, status }) => {
    const { error } = await supabase
      .from('projects')
      .update({ status })
      .eq('id', id);
    if (error) throw error;
  },
  onMutate: async ({ id, status }) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: ['projects', id] });

    // Snapshot previous value
    const previousProject = queryClient.getQueryData(['projects', id]);

    // Optimistically update
    queryClient.setQueryData(['projects', id], (old) => ({
      ...old,
      status
    }));

    return { previousProject };
  },
  onError: (err, variables, context) => {
    // Rollback on error
    queryClient.setQueryData(['projects', variables.id], context.previousProject);
  },
  onSettled: (data, error, variables) => {
    // Refetch after mutation
    queryClient.invalidateQueries({ queryKey: ['projects', variables.id] });
  }
});
```

---

## 9. Folder-Struktur

```
src/
├── components/
│   ├── layouts/
│   │   ├── AppLayout.tsx
│   │   └── AuthLayout.tsx
│   ├── projects/
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectDetail.tsx
│   │   ├── ProjectForm.tsx
│   │   ├── ProjectHeader.tsx
│   │   ├── ProjectInfo.tsx
│   │   └── ProjectPeopleList.tsx
│   ├── persons/
│   │   ├── PersonCard.tsx
│   │   ├── PersonDetail.tsx
│   │   ├── PersonForm.tsx
│   │   └── PersonNotes.tsx
│   ├── notes/
│   │   ├── NoteCard.tsx
│   │   ├── NoteForm.tsx
│   │   ├── NoteList.tsx
│   │   └── Timeline.tsx
│   ├── shared/
│   │   ├── EmptyState.tsx
│   │   ├── ConfirmDialog.tsx
│   │   ├── SearchBar.tsx
│   │   ├── StatusBadge.tsx
│   │   ├── DateDisplay.tsx
│   │   └── MarkdownEditor.tsx
│   └── ui/ (shadcn/ui)
│       ├── button.tsx
│       ├── input.tsx
│       ├── dialog.tsx
│       └── ...
├── pages/
│   ├── auth/
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   └── ResetPasswordPage.tsx
│   ├── projects/
│   │   ├── ProjectListPage.tsx
│   │   ├── ProjectDetailPage.tsx
│   │   ├── ProjectNewPage.tsx
│   │   └── ProjectEditPage.tsx
│   ├── contacts/
│   │   ├── ContactListPage.tsx
│   │   ├── ContactDetailPage.tsx
│   │   ├── ContactNewPage.tsx
│   │   └── ContactEditPage.tsx
│   └── notes/
│       ├── NoteNewPage.tsx
│       └── NoteEditPage.tsx
├── hooks/
│   ├── queries/
│   │   ├── useProjects.ts
│   │   ├── useProject.ts
│   │   ├── usePersons.ts
│   │   ├── useNotes.ts
│   │   └── useSearch.ts
│   ├── mutations/
│   │   ├── useCreateProject.ts
│   │   ├── useUpdateProject.ts
│   │   ├── useDeleteProject.ts
│   │   └── ...
│   └── useAuth.ts
├── contexts/
│   └── AuthContext.tsx
├── lib/
│   ├── supabase.ts
│   ├── queryClient.ts
│   └── utils.ts
├── schemas/
│   ├── project.schema.ts
│   ├── person.schema.ts
│   ├── note.schema.ts
│   └── auth.schema.ts
├── types/
│   ├── database.types.ts (Supabase generiert)
│   └── index.ts
├── App.tsx
└── main.tsx
```

---

## 10. Routing Setup

**Library: React Router v6**

```typescript
// App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/app/projects" element={<ProjectListPage />} />
            <Route path="/app/projects/new" element={<ProjectNewPage />} />
            <Route path="/app/projects/:id" element={<ProjectDetailPage />} />
            <Route path="/app/projects/:id/edit" element={<ProjectEditPage />} />

            <Route path="/app/contacts" element={<ContactListPage />} />
            <Route path="/app/contacts/new" element={<ContactNewPage />} />
            <Route path="/app/contacts/:id" element={<ContactDetailPage />} />
            <Route path="/app/contacts/:id/edit" element={<ContactEditPage />} />

            <Route path="/app/notes/new" element={<NoteNewPage />} />
            <Route path="/app/notes/:id/edit" element={<NoteEditPage />} />
          </Route>
        </Route>

        {/* Redirects */}
        <Route path="/" element={<Navigate to="/app/projects" replace />} />
        <Route path="*" element={<Navigate to="/app/projects" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## 11. PRD Coverage

| PRD Feature | User Stories | UI Coverage |
|-------------|--------------|-------------|
| Auth | US-001 bis US-005 | ✅ Login, Register, Reset, Logout, Protected Routes |
| Projekte | US-010 bis US-015 | ✅ Liste, Detail (Tabs), Form, Status-Dropdown, Personen-Zuordnung |
| Personen | US-020 bis US-026 | ✅ Liste, Detail, Form, Projekt-Zuordnung, Person-Notizen |
| Notizen | US-030 bis US-037 | ✅ Notepad-Feeling, Timeline, Form, Zuordnung |
| Suche | US-040 | ✅ SearchBar (Should Have) |
| AI Features | US-050 bis US-054 | ✅ Insights-Tab (Should Have) |
| Markdown | US-060 | ✅ MarkdownEditor (Should Have) |
| Edge Cases | US-070 bis US-073 | ✅ EmptyState, Validierung, Fehler, Bestätigungen |

---

## 12. Implementierungs-Prioritäten

### Phase 1: Core MVP (Must Have)
1. **Auth** (US-001 bis US-005)
   - LoginPage, RegisterPage, ResetPasswordPage
   - AuthContext, ProtectedRoute
2. **Projekte** (US-010 bis US-015)
   - ProjectListPage, ProjectDetailPage (Übersicht + Timeline)
   - ProjectForm
3. **Personen** (US-020 bis US-026)
   - ContactListPage, ContactDetailPage
   - PersonForm
4. **Notizen** (US-030 bis US-037)
   - NoteForm (Notepad-Feeling)
   - Timeline, NoteCard
5. **Shared Components**
   - EmptyState, ConfirmDialog, StatusBadge, DateDisplay

### Phase 2: Should Have (wenn Zeit bleibt)
1. **Suche** (US-040)
   - SearchBar in Navigation
   - Globale Suche
2. **Markdown** (US-060)
   - MarkdownEditor in NoteForm
   - Preview Toggle
3. **AI Features** (US-050 bis US-054)
   - Insights-Tab in ProjectDetail
   - Edge Functions Integration

---

## 13. Testing-Strategie

### Unit Tests (Vitest)
- Komponenten: Form-Validierung, State-Updates
- Hooks: React Query Hooks
- Utils: Date-Formatting, Grouping-Logic

### E2E Tests (Playwright)
**Kritische Pfade:**
1. **Happy Path: Projekt erstellen & Notiz hinzufügen**
   - Registrieren → Projekt erstellen → Notiz erstellen → Timeline anzeigen
2. **Person zu Projekt zuordnen**
   - Person erstellen → Projekt öffnen → Person zuordnen → In Beteiligtenliste sichtbar
3. **Notiz-Zuordnung**
   - Notiz erstellen → Person zuordnen → In Person-Detail sichtbar
4. **Auth Flow**
   - Logout → Login → Redirect zur ursprünglichen Seite

---

## Nächste Schritte

Nach diesem UI Plan:
1. **Rules for AI** erstellen → `.claude/rules/` (empfohlene Coding Standards)
2. **Projekt Bootstrap** starten:
   - Vite + React + TypeScript Setup
   - Tailwind CSS + shadcn/ui Installation
   - Supabase Client Setup
   - React Router + React Query Setup
3. **Erste Komponenten** implementieren (Phase 1)

---

*Erstellt: 2025-12-21*
*Version: 1.0*
*Status: Draft*
