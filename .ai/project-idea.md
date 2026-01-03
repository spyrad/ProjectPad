# Projektidee: ProjectPad

## Problem

Notizen aus Meetings und Besprechungen werden oft schnell im Notepad oder ähnlichen Tools erfasst. Diese einfache Art der Notizerfassung ist praktisch, hat aber Nachteile:

- Notizen werden selten dokumentiert oder einem Projektverlauf zugeordnet
- Projektverantwortliche verlieren den Überblick
- Wichtige Informationen gehen verloren oder sind schwer wiederzufinden
- Beziehungen zu Personen/Stakeholdern werden nicht erfasst

## Lösung

Ein Projekt-Journaling-Tool, das die Einfachheit von Notepad mit intelligenter Projektorganisation verbindet.

## Kernkonzept

**"Persönlicher Projekt-Assistent mit Notepad-Feeling"** - Schnelle Notizerfassung mit Projekt- und Personen-Zuordnung, optional AI-gestützte Analyse.

## Feature Scope (nach PRD Planning)

### Must Have (MVP)
- [x] Authentifizierung (Email/Password via Supabase)
- [x] Projekte CRUD (Name, Beschreibung, Status, Ziele, Deadline)
- [x] Personen CRUD (Name, Rolle, Beschreibung, Expertise, Kontakt)
- [ ] Personen zu Projekten zuordnen (N:M)
- [ ] Notizen CRUD mit optionaler Projekt- & Personen-Zuordnung
- [ ] Timeline-Ansicht pro Projekt
- [x] Kontakte-Bereich (eigener Menüpunkt)
- [ ] Alle Notizen zu einer Person (projektübergreifend)

### Should Have (MVP - wenn Zeit bleibt)
- [ ] AI: Projekt-Zusammenfassung (On-Demand)
- [ ] AI: Risikoerkennung
- [ ] AI: Handlungsempfehlungen
- [ ] AI: Task-Vorschläge
- [ ] AI: Periodische Zusammenfassung (täglich, In-App)
- [ ] Markdown-Support in Notizen
- [ ] Volltext-Suche

### V1.1 (nach MVP)
- [ ] Dashboard mit Statistiken
- [ ] Social Logins (Google, GitHub)
- [ ] Email-Benachrichtigungen

### V2 (Zukunft)
- [ ] Team-Kollaboration (Multi-User)
- [ ] Tags und Kategorien
- [ ] Export-Funktionen
- [ ] Offline-Funktionalität

## Zielgruppe

- Projektverantwortliche
- Freelancer mit mehreren Projekten
- Alle, die in Meetings schnell Notizen machen

## Technischer Stack (geplant)

| Bereich | Technologie |
|---------|-------------|
| Frontend | React + TypeScript + Tailwind + shadcn/ui |
| Backend | Supabase (PostgreSQL + Auth + RLS) |
| Forms | React Hook Form + Zod |
| AI | OpenAI API |

## Validierung

**Status**: Machbar mit reduziertem Scope

**Details**: Siehe `.ai/idea-validation.md`

## PRD

**Status**: Abgeschlossen (2025-12-16)

**Dokument**: `.ai/prd.md` (37 User Stories)

**Planning Summary**: `.ai/prd-planning-summary.md`

---
*Erstellt: 2025-12-14*
*Aktualisiert: 2025-12-31 (Personen CRUD implementiert)*
