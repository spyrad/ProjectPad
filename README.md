# ProjectPad

Persönlicher Projekt-Assistent mit Notepad-Feeling

## Aktueller Status

🎊 **LIVE ON PRODUCTION + 10xDevs Zertifikat erreicht!** 🏆

**Live Demo:** https://projectpad.pages.dev

### Features (100% Complete)
- ✅ Complete authentication flow (Login/Signup/Logout)
- ✅ Projects CRUD mit Soft Delete
- ✅ Persons CRUD mit Soft Delete
- ✅ Notes CRUD mit Notepad-Feeling (Ctrl+Enter)
- ✅ Timeline-Ansicht mit Datums-Gruppierung
- ✅ N:M Zuordnungen (Projekte ↔ Personen)
- ✅ Notizen ↔ Personen Zuordnung
- ✅ PersonDetailPage mit Tabs
- ✅ Protected Routes & RLS Policies
- ✅ **Dashboard mit Live-Statistiken** (2026-01-12)
- ✅ **Toast Notifications** (sonner) (2026-01-12)
- ✅ **UI Polish** - Gradienten, Icons, verbesserte Empty States (2026-01-12)

### Production Ready
- ✅ **CI/CD Pipeline mit GitHub Actions** (2026-01-03)
- ✅ **Unit Tests mit Vitest (38 Tests)** (2026-01-06)
- ✅ **E2E Tests mit Playwright (3 Suites)** (2026-01-06)
- ✅ **Cloudflare Pages Deployment** (2026-01-10)
- ✅ **10xDevs Certification Validated** (2026-01-10)
- ✅ **UI/UX Polish** - Professional look & feel (2026-01-12)

### Certification Status: READY FOR SUBMISSION 🎓
Alle 7 Kriterien erfüllt - siehe **[Certification Report](.ai/certification-submission-report.md)**

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
| Notifications | Sonner (Toast Notifications) |

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

## Local Development Setup

1. Clone Repository
2. `npm install`
3. Supabase Projekt anlegen
4. DB Schema migrieren (aus `.ai/db-schema.sql`)
5. Environment Variables setzen (`.env.local` - siehe `.env.local.example`)
6. `npm run dev`

## Dokumentation

- **Planning Docs**: `.ai/` Verzeichnis
- **Rules for AI**: `.claude/rules/` Verzeichnis
- **PRD**: `.ai/prd.md` (37 User Stories)
- **DB Schema**: `.ai/db-schema.sql`
- **API Plan**: `.ai/api-plan.md`
- **UI Plan**: `.ai/ui-plan.md`
- **Deployment Guide**: `.ai/deployment-guide.md`

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

## Deployment

**✅ LIVE auf Cloudflare Pages:** https://projectpad.pages.dev

**Deployment Features:**
- ✅ Automatisches Deployment bei Git Push
- ✅ Environment Variables konfiguriert
- ✅ Cloudflare Pages Function für MIME-Type Fix
- ✅ Supabase Auth Integration (Production)

**Detaillierte Anleitung:** [Deployment Guide](.ai/deployment-guide.md)

## Certification

**Status:** ✅ READY FOR SUBMISSION

Alle 7 10xDevs-Zertifikat-Kriterien erfüllt:
1. ✅ Documentation (README + PRD + 11 docs)
2. ✅ Login Functionality (AuthContext + Supabase Auth)
3. ✅ Test Presence (41 tests: 38 Unit + 3 E2E)
4. ✅ Business Logic (6 React Query hooks + Validations)
5. ✅ CI/CD Configuration (GitHub Actions + Cloudflare Pages)
6. ✅ Database Setup (5 tables + RLS policies)
7. ✅ API Endpoints (Supabase REST API + 6 CRUD hooks)

**Vollständiger Report:** [Certification Submission Report](.ai/certification-submission-report.md)

---

## UI/UX Features

### Dashboard
- **Live-Statistiken**: Echtzeit-Anzeige von aktiven, abgeschlossenen und pausierten Projekten
- **Letzte Notizen**: Die 5 neuesten Notizen mit Timeline-Ansicht
- **Quick Actions**: Schnellzugriff auf Projekte, Kontakte und Notizen

### Toast Notifications
- **Erfolgs-Meldungen**: Bei erfolgreichen CRUD-Operationen (Erstellen/Bearbeiten/Löschen)
- **Fehler-Meldungen**: User-friendly Fehlermeldungen auf Deutsch
- **Position**: Top-right mit Close-Button
- **Powered by**: Sonner (by Vercel)

### Visual Design
- **Farbige Status-Badges** mit Icons:
  - Aktiv: Grün mit CheckCircle ✓
  - Pausiert: Gelb mit Pause ⏸
  - Abgeschlossen: Blau mit Trophy 🏆
- **Gradienten-Hintergründe** für Cards (Projekte/Personen/Notizen)
- **Lift-Animation** beim Hover über Cards
- **Verbesserte Empty States** mit großen Icons und hilfreichen Texten
- **Farbige Border** (border-l-4) für visuelle Hierarchie

---

*Erstellt mit Claude Code - 10xDevs Kurs*
- 2025-12-27: Projekt Bootstrap
- 2026-01-02: MVP fertiggestellt (100%)
- 2026-01-03: CI/CD Setup
- 2026-01-06: Full Test Coverage
- 2026-01-08: Deployment Dokumentation
- 2026-01-10: **LIVE on Production + Certification Validated** 🏆
- 2026-01-12: **UI/UX Polish** - Dashboard, Toast Notifications, Visual Design ✨
