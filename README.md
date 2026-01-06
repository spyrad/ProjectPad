# ProjectPad

Persönlicher Projekt-Assistent mit Notepad-Feeling

## Aktueller Status

🎉 **MVP zu 100% fertig + Full Test Coverage!** (2026-01-06)

- ✅ Complete authentication flow (Login/Signup/Logout)
- ✅ Projects CRUD mit Soft Delete
- ✅ Persons CRUD mit Soft Delete
- ✅ Notes CRUD mit Notepad-Feeling (Ctrl+Enter)
- ✅ Timeline-Ansicht mit Datums-Gruppierung
- ✅ N:M Zuordnungen (Projekte ↔ Personen)
- ✅ Notizen ↔ Personen Zuordnung
- ✅ PersonDetailPage mit Tabs
- ✅ Protected Routes & RLS Policies
- ✅ **CI/CD Pipeline mit GitHub Actions** (2026-01-03)
- ✅ **Unit Tests mit Vitest (38 Tests)** (2026-01-06)
- ✅ **E2E Tests mit Playwright** (2026-01-06)

🚀 **Nächster Schritt**

- **Deployment auf Cloudflare Pages** → Live Production URL!

## Tech Stack

| Bereich | Technologie |
|---------|-------------|
| Frontend | React + Vite + TypeScript |
| Routing | React Router v6 |
| State Management | TanStack Query (React Query) |
| Styling | Tailwind CSS + shadcn/ui |
| Backend | Supabase (PostgreSQL) |
| Auth | Supabase Auth + RLS |
| Forms | React Hook Form + Zod |
| Testing | Vitest (Unit) + Playwright (E2E) |
| CI/CD | GitHub Actions |

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Browser öffnet sich automatisch auf `http://localhost:5173`

### Build

```bash
npm run build
```

## Projekt-Struktur

```
src/
├── components/
│   ├── layout/       # Layout-Komponenten
│   ├── projects/     # Projekt-Komponenten
│   ├── persons/      # Personen-Komponenten
│   ├── notes/        # Notizen-Komponenten
│   ├── shared/       # Geteilte Komponenten
│   └── ui/           # shadcn/ui Komponenten
├── pages/           # Page-Komponenten
├── hooks/           # Custom Hooks
├── contexts/        # React Contexts
├── lib/             # Utilities & Helpers
└── types/           # TypeScript Types
```

## Nächste Schritte

1. Supabase Projekt anlegen
2. DB Schema migrieren (aus `.ai/db-schema.sql`)
3. Environment Variables setzen (`.env.local`)
4. DB-Types generieren
5. Auth Flow implementieren

## Dokumentation

- **Planning Docs**: `.ai/` Verzeichnis
- **Rules for AI**: `.claude/rules/` Verzeichnis
- **PRD**: `.ai/prd.md` (37 User Stories)
- **DB Schema**: `.ai/db-schema.sql`
- **API Plan**: `.ai/api-plan.md`
- **UI Plan**: `.ai/ui-plan.md`

## Scripts

### Development
- `npm run dev` - Development Server
- `npm run build` - Production Build
- `npm run preview` - Preview Production Build
- `npm run lint` - ESLint

### Testing
- `npm test` - Run Unit Tests (watch mode)
- `npm test -- --run` - Run Unit Tests (once)
- `npm run test:ui` - Open Vitest UI
- `npm run test:coverage` - Generate coverage report
- `npm run test:e2e` - Run E2E Tests (Playwright)
- `npm run test:e2e:ui` - Open Playwright UI
- `npm run test:e2e:headed` - Run E2E Tests (visible browser)
- `npm run test:all` - Run all tests (Unit + E2E)

## Testing

### Unit Tests (Vitest)
- ✅ 38 Tests total
- ✅ Utils Tests (Date formatting, Grouping)
- ✅ Validation Tests (Zod schemas)

### E2E Tests (Playwright)
- ✅ Auth Flow Tests
- ✅ Project CRUD Tests
- ✅ Notes Tests (Ctrl+Enter Feature)

## CI/CD

GitHub Actions Workflows:

- **PR Checks** (`.github/workflows/pr-checks.yml`)
  - Linting (ESLint)
  - Unit Tests (Vitest)
  - Build Check
  - Läuft bei jedem Pull Request

- **Hello World** (`.github/workflows/hello-world.yml`)
  - Test-Workflow für Learning
  - Läuft bei Push auf main

---

*Erstellt mit Claude Code - 10xDevs Kurs - 2025-12-27*
*MVP fertiggestellt - 2026-01-02*
*CI/CD Setup - 2026-01-03*
*Full Test Coverage - 2026-01-06*
