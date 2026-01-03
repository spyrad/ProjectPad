# Database Planning Summary - ProjectPad

## Entscheidungen

### 1. Soft Delete
- **Entscheidung:** Soft Delete mit `deleted_at TIMESTAMP` für `projects`, `notes`, `persons`
- **Begründung:** Notizen sind der Kern-Wert der App. Versehentliches Löschen soll wiederherstellbar sein.
- **Verhalten:**
  - Notiz löschen → `deleted_at = NOW()`
  - Projekt löschen → Projekt + alle zugehörigen Notizen archiviert
  - Person löschen → Person archiviert, Notizen bleiben (nur Zuordnung entfernt)

### 2. Projekt-Ziele
- **Entscheidung:** `goals TEXT` als Freitext
- **Begründung:** Markdown-Support erlaubt strukturierte Listen. Keine separate Tabelle nötig im MVP.

### 3. Rollen-Konzept
- **Entscheidung:** Zwei Rollen-Felder
  - `persons.role` = Allgemeine Rolle (z.B. "Product Owner")
  - `project_persons.project_role` = Rolle in diesem Projekt (z.B. "Stakeholder")
- **Begründung:** Eine Person kann in verschiedenen Projekten verschiedene Rollen haben.

### 4. Lose Notizen
- **Entscheidung:** Notizen können ohne Projekt- und Personenzuordnung existieren
- **Begründung:** PRD sagt "optionale" Zuordnung. Später zuordnen ist möglich (US-036, US-037).

### 5. Kontaktdaten
- **Entscheidung:** `contact TEXT` als Freitext
- **Begründung:** MVP-einfach. Kann Email, Telefon, LinkedIn etc. enthalten.

### 6. Timestamps
- **Entscheidung:** `created_at` und `updated_at` für alle Entitäten
- **Begründung:** Automatisch via Supabase Trigger. Nützlich für Debugging und spätere Features.

### 7. Projektstatus
- **Entscheidung:** PostgreSQL ENUM `project_status`
- **Werte:** `active`, `paused`, `completed`
- **Begründung:** Typsicher, klare Werte.

### 8. Performance-Indizes
- **Entscheidung:**
  - Composite Index auf `notes(project_id, created_at DESC)` für Timeline
  - Partial Indizes auf nicht-gelöschte Zeilen
- **Begründung:** Timeline ist die häufigste Abfrage.

### 9. Volltext-Suche
- **Entscheidung:** `tsvector` Spalte für `notes.content` vorbereiten
- **Begründung:** Should Have Feature, kann später aktiviert werden ohne Schema-Migration.

### 10. AI-Insights
- **Entscheidung:** Keine Tabelle im MVP
- **Begründung:** AI-Output wird on-demand generiert. Persistierung in V1.1.

---

## Entitäten

### users (Supabase Auth)
- Verwaltet von Supabase Auth (`auth.users`)
- Eigene `profiles` Tabelle nicht nötig im MVP

### projects
| Spalte | Typ | Constraints |
|--------|-----|-------------|
| id | UUID | PK, DEFAULT gen_random_uuid() |
| user_id | UUID | FK → auth.users, NOT NULL |
| name | VARCHAR(255) | NOT NULL |
| description | TEXT | |
| status | project_status | DEFAULT 'active' |
| goals | TEXT | |
| deadline | DATE | |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() |
| deleted_at | TIMESTAMPTZ | |

### persons
| Spalte | Typ | Constraints |
|--------|-----|-------------|
| id | UUID | PK, DEFAULT gen_random_uuid() |
| user_id | UUID | FK → auth.users, NOT NULL |
| name | VARCHAR(255) | NOT NULL |
| role | VARCHAR(255) | |
| description | TEXT | |
| expertise | TEXT | |
| contact | TEXT | |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() |
| deleted_at | TIMESTAMPTZ | |

### project_persons (Junction Table)
| Spalte | Typ | Constraints |
|--------|-----|-------------|
| id | UUID | PK, DEFAULT gen_random_uuid() |
| project_id | UUID | FK → projects, NOT NULL |
| person_id | UUID | FK → persons, NOT NULL |
| project_role | VARCHAR(255) | |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |
| | | UNIQUE(project_id, person_id) |

### notes
| Spalte | Typ | Constraints |
|--------|-----|-------------|
| id | UUID | PK, DEFAULT gen_random_uuid() |
| user_id | UUID | FK → auth.users, NOT NULL |
| project_id | UUID | FK → projects (nullable) |
| person_id | UUID | FK → persons (nullable) |
| content | TEXT | NOT NULL |
| content_search | TSVECTOR | Generated |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() |
| deleted_at | TIMESTAMPTZ | |

---

## Beziehungen

```
auth.users (1) ──────< (N) projects
auth.users (1) ──────< (N) persons
auth.users (1) ──────< (N) notes

projects (N) >────────< (N) persons  [via project_persons]

projects (1) ──────< (N) notes  [optional]
persons  (1) ──────< (N) notes  [optional]
```

---

## RLS Policies

Alle Tabellen haben Row Level Security aktiviert:
- SELECT: `user_id = auth.uid() AND deleted_at IS NULL`
- INSERT: `user_id = auth.uid()`
- UPDATE: `user_id = auth.uid() AND deleted_at IS NULL`
- DELETE: `user_id = auth.uid()` (setzt deleted_at)

---

*Erstellt: 2025-12-18*
