# PRD Planning Session - Zusammenfassung

## Projektübersicht

| Feld | Wert |
|------|------|
| **Name** | ProjectPad |
| **Tagline** | Persönlicher Projekt-Assistent mit Notepad-Feeling |
| **Sprache** | Deutsch |
| **Zielgruppe** | Projektverantwortliche, Freelancer, Meeting-Notizen-Ersteller |

---

## Kernproblem

Notizen aus Meetings werden schnell in Notepad erfasst, aber:
- Nicht dokumentiert oder Projekten zugeordnet
- Projektverantwortliche verlieren den Überblick
- Wichtige Informationen gehen verloren
- Beziehungen zu Personen/Stakeholdern werden nicht erfasst

---

## Lösung

Ein Projekt-Journaling-Tool, das:
- Schnelle, einfache Notizerfassung bietet (Notepad-Feeling)
- Notizen Projekten UND Personen zuordnet
- Projektkontext (Ziele, Beteiligte, Deadlines) strukturiert erfasst
- AI-gestützte Analyse und Empfehlungen ermöglicht

---

## Datenmodell (Entitäten)

### Projekt
| Feld | Typ | Required |
|------|-----|----------|
| Name | String | Ja |
| Beschreibung | Text | Nein |
| Status | Enum (Aktiv, Pausiert, Abgeschlossen) | Ja |
| Ziele | Text (Freitext) | Nein |
| Deadline | Date | Nein |
| Beteiligte Personen | Relation (N:M) | Nein |

### Person (Kontakt)
| Feld | Typ | Required |
|------|-----|----------|
| Name | String | Ja |
| Rolle/Beziehung | String | Nein |
| Beschreibung/Notiz | Text | Nein |
| Expertise | Text (Freitext) | Nein |
| Kontaktdaten | String | Nein |

*Personen sind wiederverwendbar und können mehreren Projekten zugeordnet werden.*

### Notiz
| Feld | Typ | Required |
|------|-----|----------|
| Inhalt | Text | Ja |
| Projekt | Relation | Nein (optional) |
| Person | Relation | Nein (optional) |
| Erstellt am | Timestamp | Ja (auto) |
| Bearbeitet am | Timestamp | Ja (auto) |

*Notizen können bearbeitet werden. Zuordnung zu Projekt und Person ist optional.*

---

## Feature-Priorisierung

### Must Have (MVP) - ✅ KOMPLETT (100%)
- [x] Authentifizierung (Email/Password via Supabase) ✅ 2025-12-30
- [x] Projekte CRUD (Name, Beschreibung, Status, Ziele, Deadline) ✅ 2025-12-30
- [x] Personen CRUD (Name, Rolle, Beschreibung, Expertise, Kontakt) ✅ 2025-12-31
- [x] Notizen CRUD mit optionaler Projekt-Zuordnung ✅ 2025-12-31
- [x] Timeline-Ansicht pro Projekt ✅ 2026-01-01
- [x] Kontakte-Bereich (eigener Menüpunkt) ✅ 2025-12-31
- [x] Projektliste als Startseite ✅ 2025-12-30
- [x] Personen ↔ Projekte Zuordnung (N:M UI) ✅ 2026-01-02
- [x] Notizen ↔ Personen Zuordnung (1:N UI) ✅ 2026-01-02
- [x] Alle Notizen zu einer Person (projektübergreifend - PersonDetailPage) ✅ 2026-01-02

### Should Have (MVP - wenn Zeit bleibt)
- [ ] UI-Polishing (siehe `.ai/ui-improvements.md`)
  - Quick Wins: Dashboard, Farben, Schatten (~2h)
  - Medium: Projekt-Farben, Dark Mode (~6h)
- [ ] AI: Projekt-Zusammenfassung (On-Demand)
- [ ] AI: Risikoerkennung basierend auf Personen/Zielen
- [ ] AI: Handlungsempfehlungen
- [ ] AI: Task-Vorschläge (nur Anzeige, nicht automatisch)
- [ ] AI: Periodische Zusammenfassung (täglich, In-App)
- [ ] Markdown-Support in Notizen
- [ ] Volltext-Suche

### V1.1 (nach MVP)
- [ ] Dashboard mit Statistiken/Übersicht
- [ ] Social Logins (Google, GitHub)
- [ ] Email-Benachrichtigungen

### V2 (Zukunft)
- [ ] Team-Kollaboration (Multi-User)
- [ ] Tags und Kategorien
- [ ] Export-Funktionen
- [ ] Offline-Funktionalität

---

## Technische Entscheidungen

| Aspekt | Entscheidung |
|--------|--------------|
| **Tech Stack** | React + Supabase (empfohlen) |
| **Auth** | Supabase Auth (Email/Password) |
| **Editor** | Einfaches Textarea (Notepad-Feeling), Markdown-Preview als Toggle |
| **Suche** | Supabase Full-Text-Search |
| **LLM Provider** | OpenAI (Standard), alternativ Claude/Gemini |
| **AI Trigger** | On-Demand + Periodisch (täglich, In-App) |
| **AI Anzeige** | "Insights"-Tab pro Projekt |
| **Offline** | Nicht im MVP |

---

## UI-Struktur (grob)

```
├── Login/Register
├── Projektliste (Startseite)
│   └── Projekt-Detail
│       ├── Übersicht (Status, Ziele, Deadline, Beteiligte)
│       ├── Timeline (Notizen chronologisch)
│       ├── Insights (AI-Analyse, Should Have)
│       └── Notiz erstellen/bearbeiten
├── Kontakte
│   └── Person-Detail
│       ├── Infos (Name, Rolle, Expertise, Kontakt)
│       ├── Zugeordnete Projekte
│       └── Alle Notizen zu dieser Person
└── Settings
```

---

## Erfolgskriterien

| Metrik | Ziel |
|--------|------|
| MVP deployed | In 6-8 Wochen live |
| Selbst nutzbar | Du verwendest es für eigene Projekte |
| Notiz-Erstellung | < 10 Sekunden vom Öffnen bis Speichern |
| Projekt-Übersicht | Alle aktiven Projekte auf einen Blick |

---

## Risiken & Mitigationen

| Risiko | Mitigation |
|--------|------------|
| Scope Creep durch AI-Features | AI als "Should Have" - nur wenn Zeit bleibt |
| Komplexes Datenmodell (N:M) | Supabase vereinfacht Relationen |
| Editor-Komplexität | Einfaches Textarea, kein Rich-Text im MVP |
| Zeitknappheit | Strikte Priorisierung, Supabase statt eigenem Backend |

---

## Nächste Schritte

1. [ ] PRD generieren (`/10x:prd:generation`)
2. [ ] Tech Stack finalisieren (`.ai/tech-stack.md`)
3. [ ] DB Schema planen (`.ai/db-plan.md`)
4. [ ] API Plan erstellen (`.ai/api-plan.md`)
5. [ ] UI Plan erstellen (`.ai/ui-plan.md`)

---

## Aktueller Status (2026-01-02)

**🎉 MVP-Fortschritt: 100% (Alle Must-Have Features komplett!) 🎉**

✅ **Alle Features implementiert:**
- Auth Flow (Login, Signup, Protected Routes)
- Projekte CRUD (mit ProjectDetailPage, Timeline & Beteiligte-Tab)
- Personen CRUD (mit PersonDetailPage, Projekte & Notizen-Tabs)
- Notizen CRUD (mit Notepad-Feeling, Projekt & Person Zuordnung)
- Timeline mit Datums-Gruppierung (Heute/Gestern/Datum)
- N:M Zuordnungen UI (Personen ↔ Projekte)
- 1:N Zuordnungen UI (Notizen ↔ Personen)
- PersonDetailPage (Alle Projekte & Notizen einer Person)

**Technische Daten:**
- Build: ✅ Erfolgreich (642 KB Bundle, 183 KB gzip)
- TypeScript: ✅ Keine Fehler
- Komponenten: 40+ Components
- Hooks: 15+ Custom Hooks
- Pages: 7 Pages
- Routes: 8 Protected Routes

**Zeitplan:**
- Geplant: 6-8 Wochen (bis 25.01 - 08.02.2026)
- Tatsächlich: ~3 Wochen (14.12.2025 - 02.01.2026)
- **→ 3-5 Wochen VOR dem Zeitplan! 🚀**

**Nächste Schritte (Optional):**
1. UI-Polishing (~2h Quick Wins)
2. Testing & Bug Fixing
3. Deployment (MVP LIVE)

---

*Erstellt: 2025-12-16*
*Aktualisiert: 2026-01-02*
