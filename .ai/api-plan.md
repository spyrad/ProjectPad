# REST API Plan - ProjectPad

## Übersicht

ProjectPad verwendet **Supabase** als Backend. Das bedeutet:
- **Auto-generierte REST API** via PostgREST für alle Tabellen
- **Supabase Auth** für Authentifizierung
- **RLS Policies** für Autorisierung (serverseitig)
- **Edge Functions** für Business Logic (AI Features)

---

## 1. Ressourcen

| Ressource | Tabelle | Beschreibung |
|-----------|---------|--------------|
| `/auth/*` | auth.users | Authentifizierung (Supabase Auth) |
| `/rest/v1/projects` | projects | Projektverwaltung |
| `/rest/v1/persons` | persons | Kontaktverwaltung |
| `/rest/v1/project_persons` | project_persons | Projekt-Person Zuordnung |
| `/rest/v1/notes` | notes | Notizverwaltung |
| `/rest/v1/rpc/*` | functions | Custom Business Logic |

---

## 2. Authentifizierung (Supabase Auth)

### POST /auth/v1/signup
- **Beschreibung**: Neuen Benutzer registrieren
- **Auth**: Keine
- **Request Body**:
```json
{
  "email": "string (required)",
  "password": "string (required, min 8 chars)"
}
```
- **Response** (200):
```json
{
  "user": {
    "id": "uuid",
    "email": "string",
    "created_at": "timestamp"
  },
  "session": null
}
```
- **Errors**:
  - 400: `User already registered`
  - 422: `Password should be at least 8 characters`
- **PRD**: US-001

---

### POST /auth/v1/token?grant_type=password
- **Beschreibung**: Benutzer einloggen
- **Auth**: Keine
- **Request Body**:
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```
- **Response** (200):
```json
{
  "access_token": "jwt",
  "token_type": "bearer",
  "expires_in": 3600,
  "refresh_token": "string",
  "user": {
    "id": "uuid",
    "email": "string"
  }
}
```
- **Errors**:
  - 400: `Invalid login credentials`
- **PRD**: US-002

---

### POST /auth/v1/logout
- **Beschreibung**: Benutzer ausloggen
- **Auth**: Bearer Token (required)
- **Response** (204): No Content
- **PRD**: US-003

---

### POST /auth/v1/recover
- **Beschreibung**: Passwort-Reset Email senden
- **Auth**: Keine
- **Request Body**:
```json
{
  "email": "string (required)"
}
```
- **Response** (200): `{}` (immer erfolgreich, auch wenn Email nicht existiert)
- **PRD**: US-004

---

### PUT /auth/v1/user
- **Beschreibung**: Passwort ändern (nach Reset-Link)
- **Auth**: Bearer Token (from reset link)
- **Request Body**:
```json
{
  "password": "string (required, min 8 chars)"
}
```
- **Response** (200): Updated user object
- **PRD**: US-004

---

## 3. Projekte

### GET /rest/v1/projects
- **Beschreibung**: Alle Projekte des Benutzers abrufen
- **Auth**: Bearer Token (required)
- **Query Parameters**:
  - `select` - Spalten auswählen (default: `*`)
  - `status` - Filter nach Status (`eq.active`, `eq.paused`, `eq.completed`)
  - `order` - Sortierung (default: `created_at.desc`)
  - `limit` - Pagination (default: 50)
  - `offset` - Pagination Offset
  - `deleted_at` - `is.null` (nur nicht-gelöschte)
- **Response** (200):
```json
[
  {
    "id": "uuid",
    "name": "string",
    "description": "string | null",
    "status": "active | paused | completed",
    "goals": "string | null",
    "deadline": "date | null",
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
]
```
- **Standard-Aufruf**:
```
GET /rest/v1/projects?deleted_at=is.null&order=status.asc,created_at.desc
```
- **PRD**: US-010

---

### GET /rest/v1/projects?id=eq.{uuid}
- **Beschreibung**: Einzelnes Projekt abrufen
- **Auth**: Bearer Token (required)
- **Query Parameters**:
  - `select` - Mit Relationen: `*,project_persons(person_id,project_role,persons(id,name,role))`
- **Response** (200):
```json
[
  {
    "id": "uuid",
    "name": "string",
    "description": "string | null",
    "status": "active | paused | completed",
    "goals": "string | null",
    "deadline": "date | null",
    "created_at": "timestamp",
    "updated_at": "timestamp",
    "project_persons": [
      {
        "person_id": "uuid",
        "project_role": "string | null",
        "persons": {
          "id": "uuid",
          "name": "string",
          "role": "string | null"
        }
      }
    ]
  }
]
```
- **PRD**: US-015

---

### POST /rest/v1/projects
- **Beschreibung**: Neues Projekt erstellen
- **Auth**: Bearer Token (required)
- **Headers**:
  - `Prefer: return=representation`
- **Request Body**:
```json
{
  "name": "string (required, max 255)",
  "description": "string | null",
  "status": "active | paused | completed (default: active)",
  "goals": "string | null",
  "deadline": "date | null"
}
```
- **Response** (201):
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "name": "string",
  "status": "active",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```
- **Errors**:
  - 400: Validation error (name required)
- **PRD**: US-011

---

### PATCH /rest/v1/projects?id=eq.{uuid}
- **Beschreibung**: Projekt aktualisieren
- **Auth**: Bearer Token (required)
- **Headers**:
  - `Prefer: return=representation`
- **Request Body** (partial update):
```json
{
  "name": "string",
  "description": "string | null",
  "status": "active | paused | completed",
  "goals": "string | null",
  "deadline": "date | null"
}
```
- **Response** (200): Updated project object
- **PRD**: US-012, US-014

---

### DELETE /rest/v1/projects?id=eq.{uuid}
- **Beschreibung**: Projekt soft-löschen (archivieren)
- **Auth**: Bearer Token (required)
- **Implementierung**: Via RPC (siehe unten)
- **PRD**: US-013

---

## 4. Personen (Kontakte)

### GET /rest/v1/persons
- **Beschreibung**: Alle Kontakte des Benutzers abrufen
- **Auth**: Bearer Token (required)
- **Query Parameters**:
  - `select` - Spalten auswählen
  - `name` - Filter (`ilike.*suchbegriff*`)
  - `order` - Sortierung (default: `name.asc`)
  - `deleted_at` - `is.null`
- **Response** (200):
```json
[
  {
    "id": "uuid",
    "name": "string",
    "role": "string | null",
    "description": "string | null",
    "expertise": "string | null",
    "contact": "string | null",
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
]
```
- **PRD**: US-020

---

### GET /rest/v1/persons?id=eq.{uuid}
- **Beschreibung**: Einzelne Person mit zugeordneten Projekten
- **Auth**: Bearer Token (required)
- **Query Parameters**:
  - `select` - Mit Relationen: `*,project_persons(project_id,project_role,projects(id,name,status))`
- **PRD**: US-024

---

### POST /rest/v1/persons
- **Beschreibung**: Neue Person erstellen
- **Auth**: Bearer Token (required)
- **Request Body**:
```json
{
  "name": "string (required, max 255)",
  "role": "string | null (max 255)",
  "description": "string | null",
  "expertise": "string | null",
  "contact": "string | null"
}
```
- **Response** (201): Created person object
- **PRD**: US-021

---

### PATCH /rest/v1/persons?id=eq.{uuid}
- **Beschreibung**: Person aktualisieren
- **Auth**: Bearer Token (required)
- **Request Body**: Partial update
- **Response** (200): Updated person object
- **PRD**: US-022

---

### DELETE /rest/v1/persons?id=eq.{uuid}
- **Beschreibung**: Person soft-löschen
- **Auth**: Bearer Token (required)
- **Implementierung**: Via RPC `soft_delete_person`
- **PRD**: US-023

---

## 5. Projekt-Person Zuordnung

### GET /rest/v1/project_persons?project_id=eq.{uuid}
- **Beschreibung**: Alle Personen eines Projekts
- **Auth**: Bearer Token (required)
- **Query Parameters**:
  - `select`: `*,persons(id,name,role)`
- **Response** (200):
```json
[
  {
    "id": "uuid",
    "project_id": "uuid",
    "person_id": "uuid",
    "project_role": "string | null",
    "created_at": "timestamp",
    "persons": {
      "id": "uuid",
      "name": "string",
      "role": "string | null"
    }
  }
]
```
- **PRD**: US-015

---

### POST /rest/v1/project_persons
- **Beschreibung**: Person zu Projekt zuordnen
- **Auth**: Bearer Token (required)
- **Request Body**:
```json
{
  "project_id": "uuid (required)",
  "person_id": "uuid (required)",
  "project_role": "string | null"
}
```
- **Response** (201): Created assignment
- **Errors**:
  - 409: Person bereits zugeordnet (UNIQUE constraint)
- **PRD**: US-025

---

### DELETE /rest/v1/project_persons?project_id=eq.{uuid}&person_id=eq.{uuid}
- **Beschreibung**: Person von Projekt entfernen
- **Auth**: Bearer Token (required)
- **Response** (204): No Content
- **PRD**: US-026

---

## 6. Notizen

### GET /rest/v1/notes
- **Beschreibung**: Notizen abrufen (mit Filtern)
- **Auth**: Bearer Token (required)
- **Query Parameters**:
  - `project_id` - Filter nach Projekt (`eq.{uuid}` oder `is.null`)
  - `person_id` - Filter nach Person (`eq.{uuid}`)
  - `order` - Sortierung (default: `created_at.desc`)
  - `deleted_at` - `is.null`
  - `limit`, `offset` - Pagination
- **Response** (200):
```json
[
  {
    "id": "uuid",
    "content": "string",
    "project_id": "uuid | null",
    "person_id": "uuid | null",
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
]
```
- **PRD**: US-034, US-035

---

### GET /rest/v1/notes (Timeline-Ansicht)
- **Beschreibung**: Notizen eines Projekts chronologisch
- **Standard-Aufruf**:
```
GET /rest/v1/notes?project_id=eq.{uuid}&deleted_at=is.null&order=created_at.desc&select=*,persons(id,name)
```
- **PRD**: US-034

---

### GET /rest/v1/notes (Person-Notizen)
- **Beschreibung**: Alle Notizen zu einer Person (projektübergreifend)
- **Standard-Aufruf**:
```
GET /rest/v1/notes?person_id=eq.{uuid}&deleted_at=is.null&order=created_at.desc&select=*,projects(id,name)
```
- **PRD**: US-035

---

### POST /rest/v1/notes
- **Beschreibung**: Neue Notiz erstellen (Notepad-Feeling)
- **Auth**: Bearer Token (required)
- **Request Body**:
```json
{
  "content": "string (required)",
  "project_id": "uuid | null",
  "person_id": "uuid | null"
}
```
- **Response** (201): Created note
- **PRD**: US-030, US-031

---

### PATCH /rest/v1/notes?id=eq.{uuid}
- **Beschreibung**: Notiz bearbeiten
- **Auth**: Bearer Token (required)
- **Request Body**:
```json
{
  "content": "string",
  "project_id": "uuid | null",
  "person_id": "uuid | null"
}
```
- **Response** (200): Updated note (mit neuem `updated_at`)
- **PRD**: US-032, US-036, US-037

---

### DELETE /rest/v1/notes?id=eq.{uuid}
- **Beschreibung**: Notiz soft-löschen
- **Auth**: Bearer Token (required)
- **Implementierung**: Via RPC `soft_delete_note`
- **PRD**: US-033

---

## 7. RPC Endpoints (Business Logic)

### POST /rest/v1/rpc/soft_delete_project
- **Beschreibung**: Projekt archivieren (inkl. zugehöriger Notizen)
- **Auth**: Bearer Token (required)
- **Request Body**:
```json
{
  "project_uuid": "uuid"
}
```
- **Response** (200): `null`
- **Behavior**: Setzt `deleted_at` für Projekt und alle zugehörigen Notizen
- **PRD**: US-013

---

### POST /rest/v1/rpc/soft_delete_person
- **Beschreibung**: Person archivieren
- **Auth**: Bearer Token (required)
- **Request Body**:
```json
{
  "person_uuid": "uuid"
}
```
- **Response** (200): `null`
- **Behavior**:
  1. Entfernt Person aus allen Projekt-Zuordnungen
  2. Setzt `person_id = NULL` bei allen Notizen
  3. Setzt `deleted_at` für Person
- **PRD**: US-023

---

### POST /rest/v1/rpc/soft_delete_note
- **Beschreibung**: Notiz archivieren
- **Auth**: Bearer Token (required)
- **Request Body**:
```json
{
  "note_uuid": "uuid"
}
```
- **Response** (200): `null`
- **PRD**: US-033

---

### POST /rest/v1/rpc/search_notes
- **Beschreibung**: Volltext-Suche in Notizen
- **Auth**: Bearer Token (required)
- **Request Body**:
```json
{
  "search_query": "string (min 2 chars)"
}
```
- **Response** (200):
```json
[
  {
    "id": "uuid",
    "content": "string",
    "project_id": "uuid | null",
    "person_id": "uuid | null",
    "created_at": "timestamp"
  }
]
```
- **Sortierung**: Nach Relevanz (ts_rank)
- **PRD**: US-040

---

## 8. AI Endpoints (Should Have - Edge Functions)

### POST /functions/v1/analyze-project
- **Beschreibung**: AI-Analyse für ein Projekt generieren
- **Auth**: Bearer Token (required)
- **Request Body**:
```json
{
  "project_id": "uuid"
}
```
- **Response** (200):
```json
{
  "summary": "string",
  "risks": [
    {
      "title": "string",
      "description": "string",
      "severity": "low | medium | high"
    }
  ],
  "recommendations": ["string"],
  "suggested_tasks": [
    {
      "title": "string",
      "description": "string | null"
    }
  ]
}
```
- **Errors**:
  - 404: Project not found
  - 429: Rate limit exceeded
  - 500: AI provider error
- **PRD**: US-050, US-051, US-052, US-053

---

### POST /functions/v1/daily-summary
- **Beschreibung**: Tägliche Zusammenfassung generieren
- **Auth**: Bearer Token (required)
- **Response** (200):
```json
{
  "date": "date",
  "activity_summary": "string",
  "upcoming_deadlines": [
    {
      "project_id": "uuid",
      "project_name": "string",
      "deadline": "date",
      "days_remaining": "number"
    }
  ],
  "recommendations": ["string"]
}
```
- **PRD**: US-054

---

## 9. Validierung

### Projects
| Feld | Validierung |
|------|-------------|
| `name` | Required, 1-255 Zeichen |
| `description` | Optional, max 10.000 Zeichen |
| `status` | Enum: `active`, `paused`, `completed` |
| `goals` | Optional, max 10.000 Zeichen |
| `deadline` | Optional, gültiges Datum |

### Persons
| Feld | Validierung |
|------|-------------|
| `name` | Required, 1-255 Zeichen |
| `role` | Optional, max 255 Zeichen |
| `description` | Optional, max 5.000 Zeichen |
| `expertise` | Optional, max 2.000 Zeichen |
| `contact` | Optional, max 1.000 Zeichen |

### Notes
| Feld | Validierung |
|------|-------------|
| `content` | Required, 1-50.000 Zeichen |
| `project_id` | Optional, gültige UUID (existierendes Projekt) |
| `person_id` | Optional, gültige UUID (existierende Person) |

---

## 10. Error Response Format

Supabase/PostgREST Fehlerformat:

```json
{
  "code": "PGRST116",
  "details": null,
  "hint": null,
  "message": "JSON object requested, multiple (or no) rows returned"
}
```

### Häufige Fehlercodes

| HTTP Status | Code | Bedeutung |
|-------------|------|-----------|
| 400 | 22P02 | Ungültiger UUID-Wert |
| 401 | PGRST301 | JWT Token fehlt/ungültig |
| 403 | 42501 | RLS Policy Verletzung |
| 404 | PGRST116 | Keine Zeile gefunden |
| 409 | 23505 | Unique Constraint Verletzung |
| 422 | 22023 | Validierungsfehler |

---

## 11. Rate Limiting

| Endpoint | Limit | Fenster |
|----------|-------|---------|
| `/auth/*` | 10 Requests | 1 Minute |
| `/rest/v1/*` (GET) | 100 Requests | 1 Minute |
| `/rest/v1/*` (POST/PATCH/DELETE) | 50 Requests | 1 Minute |
| `/functions/v1/*` (AI) | 10 Requests | 1 Minute |

---

## 12. Frontend Integration (Supabase JS)

### Beispiel: Projekt erstellen
```typescript
const { data, error } = await supabase
  .from('projects')
  .insert({
    name: 'Neues Projekt',
    status: 'active'
  })
  .select()
  .single();
```

### Beispiel: Timeline laden
```typescript
const { data, error } = await supabase
  .from('notes')
  .select('*, persons(id, name)')
  .eq('project_id', projectId)
  .is('deleted_at', null)
  .order('created_at', { ascending: false });
```

### Beispiel: Volltext-Suche
```typescript
const { data, error } = await supabase
  .rpc('search_notes', { search_query: 'suchbegriff' });
```

---

## 13. PRD Coverage

| PRD Bereich | User Stories | API Coverage |
|-------------|--------------|--------------|
| Auth | US-001 bis US-005 | ✅ Vollständig |
| Projekte | US-010 bis US-015 | ✅ Vollständig |
| Personen | US-020 bis US-026 | ✅ Vollständig |
| Notizen | US-030 bis US-037 | ✅ Vollständig |
| Suche | US-040 | ✅ Vollständig |
| AI Features | US-050 bis US-054 | ⏳ Should Have |

---

*Erstellt: 2025-12-18*
*Status: Draft*
