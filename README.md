# ProjectPad

Persönlicher Projekt-Assistent mit Notepad-Feeling

## Aktueller Status

✅ **Bootstrap abgeschlossen** (2025-12-27)

- Vite + React + TypeScript Setup
- Tailwind CSS + shadcn/ui konfiguriert
- Projekt-Struktur erstellt
- React Router v6 Setup
- Basis-Dateien vorhanden

⏸️ **Noch offen**

- Supabase Projekt Setup
- DB Schema Migration
- Auth Flow Implementation
- CRUD Features

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

- `npm run dev` - Development Server
- `npm run build` - Production Build
- `npm run preview` - Preview Production Build
- `npm run lint` - ESLint

---

*Erstellt mit Claude Code - 2025-12-27*
