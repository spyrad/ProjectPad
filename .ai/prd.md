# Product Requirements Document (PRD) - ProjectPad

## 1. Product Overview

### 1.1 Produktname
ProjectPad

### 1.2 Tagline
Persönlicher Projekt-Assistent mit Notepad-Feeling

### 1.3 Produktbeschreibung
ProjectPad ist ein Projekt-Journaling-Tool, das die Einfachheit von Notepad mit intelligenter Projektorganisation verbindet. Es ermöglicht schnelle Notizerfassung während Meetings und Besprechungen, wobei Notizen automatisch Projekten und beteiligten Personen zugeordnet werden können. Das Tool erfasst Projektkontext strukturiert (Ziele, Beteiligte, Deadlines) und bietet optional AI-gestützte Analyse und Empfehlungen.

### 1.4 Zielgruppe
- Projektverantwortliche, die mehrere Projekte gleichzeitig betreuen
- Freelancer mit verschiedenen Kundenprojekten
- Alle, die in Meetings schnell Notizen machen und diese später wiederfinden möchten

### 1.5 Technischer Stack
| Komponente | Technologie |
|------------|-------------|
| Frontend | React + TypeScript |
| Backend | Supabase (PostgreSQL + Auth + RLS) |
| Styling | Tailwind CSS + shadcn/ui |
| Forms | React Hook Form + Zod |
| Suche | Supabase Full-Text-Search |
| AI | OpenAI API (Standard), alternativ Claude/Gemini |

### 1.6 Sprache der Anwendung
Deutsch

---

## 2. User Problem

### 2.1 Problemstellung
Notizen aus Meetings und Besprechungen werden oft schnell im Notepad oder ähnlichen Tools erfasst. Diese einfache Art der Notizerfassung ist praktisch, hat aber gravierende Nachteile:

1. Notizen werden selten dokumentiert oder einem Projektverlauf zugeordnet
2. Projektverantwortliche verlieren den Überblick über den aktuellen Stand
3. Wichtige Informationen gehen verloren oder sind schwer wiederzufinden
4. Beziehungen zu Personen und Stakeholdern werden nicht erfasst
5. Kontext geht verloren - wer hat was gesagt, welche Entscheidungen wurden getroffen

### 2.2 Aktuelle Lösungen und deren Schwächen
| Lösung | Schwäche |
|--------|----------|
| Notepad/TextEdit | Keine Organisation, keine Suche, kein Projektbezug |
| Notion/Obsidian | Zu komplex für schnelle Notizen, Lernkurve |
| OneNote | Unübersichtlich bei vielen Projekten |
| Projektmanagement-Tools | Fokus auf Tasks, nicht auf Notizen/Journal |

### 2.3 Lösungsansatz
ProjectPad kombiniert:
- Die Einfachheit und Geschwindigkeit von Notepad (USP)
- Strukturierte Projektorganisation
- Zuordnung von Notizen zu Projekten UND Personen
- Chronologische Timeline pro Projekt
- Optional: AI-gestützte Analyse für Empfehlungen und Risikoerkennung

---

## 3. Functional Requirements

### 3.1 Authentifizierung
| ID | Anforderung | Priorität |
|----|-------------|-----------|
| FR-AUTH-01 | Email/Password Registrierung | Must Have |
| FR-AUTH-02 | Email/Password Login | Must Have |
| FR-AUTH-03 | Passwort zurücksetzen | Must Have |
| FR-AUTH-04 | Logout | Must Have |
| FR-AUTH-05 | Session-Management | Must Have |

### 3.2 Projektverwaltung
| ID | Anforderung | Priorität |
|----|-------------|-----------|
| FR-PROJ-01 | Projekt erstellen (Name, Beschreibung, Status, Ziele, Deadline) | Must Have |
| FR-PROJ-02 | Projekt bearbeiten | Must Have |
| FR-PROJ-03 | Projekt löschen | Must Have |
| FR-PROJ-04 | Projektliste anzeigen | Must Have |
| FR-PROJ-05 | Projekt-Detail mit Übersicht | Must Have |
| FR-PROJ-06 | Projektstatus ändern (Aktiv, Pausiert, Abgeschlossen) | Must Have |
| FR-PROJ-07 | Personen zu Projekt zuordnen | Must Have |
| FR-PROJ-08 | Personen von Projekt entfernen | Must Have |

### 3.3 Personenverwaltung (Kontakte)
| ID | Anforderung | Priorität |
|----|-------------|-----------|
| FR-PERS-01 | Person erstellen (Name, Rolle, Beschreibung, Expertise, Kontakt) | Must Have |
| FR-PERS-02 | Person bearbeiten | Must Have |
| FR-PERS-03 | Person löschen | Must Have |
| FR-PERS-04 | Kontaktliste anzeigen | Must Have |
| FR-PERS-05 | Person-Detail mit zugeordneten Projekten | Must Have |
| FR-PERS-06 | Alle Notizen zu einer Person anzeigen (projektübergreifend) | Must Have |

### 3.4 Notizverwaltung
| ID | Anforderung | Priorität |
|----|-------------|-----------|
| FR-NOTE-01 | Notiz erstellen (schnell, Notepad-Feeling) | Must Have |
| FR-NOTE-02 | Notiz bearbeiten | Must Have |
| FR-NOTE-03 | Notiz löschen | Must Have |
| FR-NOTE-04 | Notiz einem Projekt zuordnen (optional) | Must Have |
| FR-NOTE-05 | Notiz einer Person zuordnen (optional) | Must Have |
| FR-NOTE-06 | Timeline-Ansicht pro Projekt (chronologisch) | Must Have |
| FR-NOTE-07 | Markdown-Unterstützung in Notizen | Should Have |
| FR-NOTE-08 | Markdown-Preview Toggle | Should Have |

### 3.5 Suche
| ID | Anforderung | Priorität |
|----|-------------|-----------|
| FR-SRCH-01 | Volltext-Suche über Notizen | Should Have |
| FR-SRCH-02 | Suche über Projektnamen | Should Have |
| FR-SRCH-03 | Suche über Personennamen | Should Have |

### 3.6 AI-Features
| ID | Anforderung | Priorität |
|----|-------------|-----------|
| FR-AI-01 | Projekt-Zusammenfassung generieren (On-Demand) | Should Have |
| FR-AI-02 | Risikoerkennung basierend auf Personen/Zielen | Should Have |
| FR-AI-03 | Handlungsempfehlungen generieren | Should Have |
| FR-AI-04 | Task-Vorschläge anzeigen (nicht automatisch erstellen) | Should Have |
| FR-AI-05 | Periodische Zusammenfassung (täglich, In-App) | Should Have |
| FR-AI-06 | Insights-Tab pro Projekt | Should Have |

### 3.7 Navigation und UI
| ID | Anforderung | Priorität |
|----|-------------|-----------|
| FR-NAV-01 | Projektliste als Startseite (nach Login) | Must Have |
| FR-NAV-02 | Hauptnavigation mit Projekten und Kontakten | Must Have |
| FR-NAV-03 | Responsive Design (Desktop-First) | Must Have |

---

## 4. Product Boundaries

### 4.1 Im Scope (MVP)
- Single-User Anwendung (ein Benutzer pro Account)
- Projekte, Personen und Notizen CRUD
- N:M Beziehung zwischen Projekten und Personen
- Timeline-Ansicht pro Projekt
- Kontakte-Bereich mit projektübergreifender Notizansicht
- Email/Password Authentifizierung
- Deutsche Benutzeroberfläche

### 4.2 Im Scope (Should Have - wenn Zeit bleibt)
- AI-gestützte Analyse und Empfehlungen
- Markdown-Support in Notizen
- Volltext-Suche

### 4.3 Außerhalb des Scope (MVP)
| Feature | Geplant für |
|---------|-------------|
| Dashboard mit Statistiken | V1.1 |
| Social Logins (Google, GitHub) | V1.1 |
| Email-Benachrichtigungen | V1.1 |
| Team-Kollaboration (Multi-User) | V2 |
| Tags und Kategorien | V2 |
| Export-Funktionen (PDF, CSV) | V2 |
| Offline-Funktionalität | V2 |
| Mobile App | V2 |
| API für Drittanbieter | V2 |

### 4.4 Technische Grenzen
- Keine Offline-Unterstützung im MVP
- Keine Echtzeit-Kollaboration
- Keine Datei-Uploads in Notizen
- Keine Rich-Text-Formatierung (nur Markdown)

---

## 5. User Stories

### 5.1 Authentifizierung

#### US-001: Registrierung
- ID: US-001
- Titel: Als neuer Benutzer möchte ich mich registrieren können
- Beschreibung: Ein neuer Benutzer kann sich mit Email und Passwort registrieren, um die Anwendung zu nutzen.
- Akzeptanzkriterien:
  - Registrierungsformular mit Email und Passwort ist verfügbar
  - Email-Validierung (gültiges Format)
  - Passwort-Anforderungen werden angezeigt (min. 8 Zeichen)
  - Fehlermeldung bei bereits existierender Email
  - Nach erfolgreicher Registrierung wird der Benutzer zur Projektliste weitergeleitet
  - Bestätigungs-Email wird versendet (Supabase Standard)

#### US-002: Login
- ID: US-002
- Titel: Als registrierter Benutzer möchte ich mich einloggen können
- Beschreibung: Ein registrierter Benutzer kann sich mit seinen Zugangsdaten anmelden.
- Akzeptanzkriterien:
  - Login-Formular mit Email und Passwort ist verfügbar
  - Fehlermeldung bei falschen Zugangsdaten
  - Nach erfolgreichem Login wird der Benutzer zur Projektliste weitergeleitet
  - Session bleibt aktiv bis zum Logout oder Session-Timeout

#### US-003: Logout
- ID: US-003
- Titel: Als eingeloggter Benutzer möchte ich mich ausloggen können
- Beschreibung: Ein eingeloggter Benutzer kann sich aus der Anwendung abmelden.
- Akzeptanzkriterien:
  - Logout-Button ist in der Navigation sichtbar
  - Nach Logout wird der Benutzer zur Login-Seite weitergeleitet
  - Session wird serverseitig invalidiert

#### US-004: Passwort zurücksetzen
- ID: US-004
- Titel: Als Benutzer möchte ich mein Passwort zurücksetzen können
- Beschreibung: Ein Benutzer kann sein Passwort zurücksetzen, wenn er es vergessen hat.
- Akzeptanzkriterien:
  - "Passwort vergessen" Link auf der Login-Seite
  - Eingabefeld für Email-Adresse
  - Bestätigungsmeldung nach Absenden (unabhängig ob Email existiert)
  - Email mit Reset-Link wird versendet (wenn Account existiert)
  - Reset-Link führt zu Passwort-Ändern-Formular
  - Neues Passwort muss Anforderungen erfüllen

#### US-005: Geschützter Zugriff
- ID: US-005
- Titel: Als nicht eingeloggter Benutzer werde ich zur Login-Seite weitergeleitet
- Beschreibung: Alle geschützten Bereiche erfordern eine Authentifizierung.
- Akzeptanzkriterien:
  - Zugriff auf Projektliste ohne Login leitet zu Login-Seite
  - Zugriff auf Kontakte ohne Login leitet zu Login-Seite
  - Zugriff auf Projekt-Details ohne Login leitet zu Login-Seite
  - Nach Login wird zur ursprünglich angeforderten Seite weitergeleitet

### 5.2 Projektverwaltung

#### US-010: Projektliste anzeigen
- ID: US-010
- Titel: Als Benutzer möchte ich alle meine Projekte auf einen Blick sehen
- Beschreibung: Nach dem Login wird die Projektliste als Startseite angezeigt.
- Akzeptanzkriterien:
  - Liste aller Projekte des Benutzers wird angezeigt
  - Projekte zeigen: Name, Status, Deadline (falls vorhanden)
  - Projekte sind nach Status gruppiert oder sortierbar
  - Leerer Zustand mit Hinweis "Noch keine Projekte" und Button zum Erstellen
  - Klick auf Projekt öffnet Projekt-Detail

#### US-011: Projekt erstellen
- ID: US-011
- Titel: Als Benutzer möchte ich ein neues Projekt anlegen
- Beschreibung: Ein Benutzer kann ein neues Projekt mit allen relevanten Informationen erstellen.
- Akzeptanzkriterien:
  - Button "Neues Projekt" ist in der Projektliste sichtbar
  - Formular mit Feldern: Name (Pflicht), Beschreibung, Status, Ziele, Deadline
  - Status-Dropdown mit Optionen: Aktiv, Pausiert, Abgeschlossen
  - Deadline-Picker für Datumsauswahl
  - Validierung: Name ist Pflichtfeld
  - Nach Erstellen wird zur Projekt-Detail-Seite weitergeleitet
  - Erfolgsmeldung wird angezeigt

#### US-012: Projekt bearbeiten
- ID: US-012
- Titel: Als Benutzer möchte ich ein Projekt bearbeiten können
- Beschreibung: Ein Benutzer kann alle Informationen eines bestehenden Projekts ändern.
- Akzeptanzkriterien:
  - Bearbeiten-Button in Projekt-Detail sichtbar
  - Formular zeigt aktuelle Werte vorausgefüllt
  - Alle Felder sind bearbeitbar
  - Änderungen werden nach Speichern übernommen
  - Erfolgsmeldung wird angezeigt
  - Abbrechen verwirft Änderungen

#### US-013: Projekt löschen
- ID: US-013
- Titel: Als Benutzer möchte ich ein Projekt löschen können
- Beschreibung: Ein Benutzer kann ein Projekt dauerhaft entfernen.
- Akzeptanzkriterien:
  - Löschen-Button in Projekt-Detail sichtbar
  - Bestätigungsdialog vor dem Löschen
  - Warnung: "Alle zugehörigen Notizen werden ebenfalls gelöscht"
  - Nach Löschen wird zur Projektliste weitergeleitet
  - Erfolgsmeldung wird angezeigt
  - Zuordnungen zu Personen werden entfernt (Personen bleiben erhalten)

#### US-014: Projektstatus ändern
- ID: US-014
- Titel: Als Benutzer möchte ich den Status eines Projekts schnell ändern
- Beschreibung: Der Projektstatus kann direkt in der Übersicht geändert werden.
- Akzeptanzkriterien:
  - Status-Dropdown in Projekt-Detail-Übersicht
  - Optionen: Aktiv, Pausiert, Abgeschlossen
  - Änderung wird sofort gespeichert
  - Visuelle Bestätigung der Änderung

#### US-015: Projekt-Detail anzeigen
- ID: US-015
- Titel: Als Benutzer möchte ich alle Details eines Projekts sehen
- Beschreibung: Die Projekt-Detail-Seite zeigt alle Informationen und ermöglicht Navigation.
- Akzeptanzkriterien:
  - Übersicht-Tab: Name, Beschreibung, Status, Ziele, Deadline
  - Liste der beteiligten Personen mit Rollen
  - Timeline-Tab: Chronologische Notizliste
  - Insights-Tab: AI-Analyse (Should Have)
  - Button zum Erstellen einer neuen Notiz
  - Button zum Hinzufügen von Personen

### 5.3 Personenverwaltung

#### US-020: Kontaktliste anzeigen
- ID: US-020
- Titel: Als Benutzer möchte ich alle meine Kontakte sehen
- Beschreibung: Der Kontakte-Bereich zeigt alle angelegten Personen.
- Akzeptanzkriterien:
  - Menüpunkt "Kontakte" in der Hauptnavigation
  - Liste aller Personen mit Name und Rolle
  - Suchfeld zum Filtern nach Name
  - Leerer Zustand mit Hinweis und Button zum Erstellen
  - Klick auf Person öffnet Person-Detail

#### US-021: Person erstellen
- ID: US-021
- Titel: Als Benutzer möchte ich eine neue Person anlegen
- Beschreibung: Ein Benutzer kann eine neue Person mit allen relevanten Informationen erstellen.
- Akzeptanzkriterien:
  - Button "Neue Person" in Kontaktliste sichtbar
  - Formular mit Feldern: Name (Pflicht), Rolle, Beschreibung, Expertise, Kontaktdaten
  - Validierung: Name ist Pflichtfeld
  - Nach Erstellen wird zur Person-Detail-Seite weitergeleitet
  - Erfolgsmeldung wird angezeigt

#### US-022: Person bearbeiten
- ID: US-022
- Titel: Als Benutzer möchte ich eine Person bearbeiten können
- Beschreibung: Ein Benutzer kann alle Informationen einer bestehenden Person ändern.
- Akzeptanzkriterien:
  - Bearbeiten-Button in Person-Detail sichtbar
  - Formular zeigt aktuelle Werte vorausgefüllt
  - Alle Felder sind bearbeitbar
  - Änderungen werden nach Speichern übernommen
  - Erfolgsmeldung wird angezeigt

#### US-023: Person löschen
- ID: US-023
- Titel: Als Benutzer möchte ich eine Person löschen können
- Beschreibung: Ein Benutzer kann eine Person dauerhaft entfernen.
- Akzeptanzkriterien:
  - Löschen-Button in Person-Detail sichtbar
  - Bestätigungsdialog vor dem Löschen
  - Warnung wenn Person Projekten zugeordnet ist
  - Nach Löschen wird zur Kontaktliste weitergeleitet
  - Zuordnungen zu Projekten und Notizen werden entfernt
  - Erfolgsmeldung wird angezeigt

#### US-024: Person-Detail anzeigen
- ID: US-024
- Titel: Als Benutzer möchte ich alle Details einer Person sehen
- Beschreibung: Die Person-Detail-Seite zeigt alle Informationen und zugehörige Daten.
- Akzeptanzkriterien:
  - Alle Personendaten werden angezeigt (Name, Rolle, Beschreibung, Expertise, Kontakt)
  - Liste aller zugeordneten Projekte
  - Liste aller Notizen zu dieser Person (projektübergreifend)
  - Notizen sind chronologisch sortiert
  - Klick auf Projekt navigiert zum Projekt-Detail
  - Klick auf Notiz öffnet Notiz im Kontext

#### US-025: Person zu Projekt zuordnen
- ID: US-025
- Titel: Als Benutzer möchte ich eine Person einem Projekt zuordnen
- Beschreibung: Eine bestehende Person kann einem Projekt als Beteiligter hinzugefügt werden.
- Akzeptanzkriterien:
  - Button "Person hinzufügen" in Projekt-Detail
  - Dropdown/Suche zur Auswahl bestehender Personen
  - Option "Neue Person erstellen" im Dropdown
  - Rolle der Person im Projekt kann angegeben werden
  - Nach Zuordnung erscheint Person in der Beteiligtenliste
  - Eine Person kann mehreren Projekten zugeordnet werden

#### US-026: Person von Projekt entfernen
- ID: US-026
- Titel: Als Benutzer möchte ich eine Person von einem Projekt entfernen
- Beschreibung: Eine Zuordnung zwischen Person und Projekt kann aufgehoben werden.
- Akzeptanzkriterien:
  - Entfernen-Button neben jeder Person in der Beteiligtenliste
  - Bestätigungsdialog vor dem Entfernen
  - Person bleibt in der Kontaktliste erhalten
  - Notizen mit dieser Person bleiben erhalten

### 5.4 Notizverwaltung

#### US-030: Notiz erstellen (Notepad-Feeling)
- ID: US-030
- Titel: Als Benutzer möchte ich schnell eine Notiz erstellen
- Beschreibung: Eine Notiz kann in unter 10 Sekunden erstellt werden (USP).
- Akzeptanzkriterien:
  - Großes Textfeld für Notizinhalt (Notepad-Feeling)
  - Optionale Projekt-Auswahl (Dropdown)
  - Optionale Person-Auswahl (Dropdown)
  - Keyboard-Shortcut zum Speichern (Ctrl+Enter)
  - Automatisches Speichern des Entwurfs (optional)
  - Zeitstempel wird automatisch gesetzt
  - Fokus liegt sofort auf dem Textfeld

#### US-031: Notiz aus Projekt-Kontext erstellen
- ID: US-031
- Titel: Als Benutzer möchte ich eine Notiz direkt aus einem Projekt erstellen
- Beschreibung: Beim Erstellen einer Notiz aus der Projekt-Timeline ist das Projekt vorausgewählt.
- Akzeptanzkriterien:
  - Button "Neue Notiz" in Projekt-Detail/Timeline
  - Projekt ist automatisch vorausgewählt
  - Person kann optional ausgewählt werden
  - Nach Speichern erscheint Notiz in der Timeline

#### US-032: Notiz bearbeiten
- ID: US-032
- Titel: Als Benutzer möchte ich eine Notiz bearbeiten können
- Beschreibung: Eine bestehende Notiz kann nachträglich geändert werden.
- Akzeptanzkriterien:
  - Bearbeiten-Button an jeder Notiz
  - Textfeld zeigt aktuellen Inhalt
  - Projekt- und Person-Zuordnung kann geändert werden
  - "Bearbeitet am" Zeitstempel wird aktualisiert
  - Änderungen werden nach Speichern übernommen

#### US-033: Notiz löschen
- ID: US-033
- Titel: Als Benutzer möchte ich eine Notiz löschen können
- Beschreibung: Eine Notiz kann dauerhaft entfernt werden.
- Akzeptanzkriterien:
  - Löschen-Button an jeder Notiz
  - Bestätigungsdialog vor dem Löschen
  - Notiz wird aus Timeline und Person-Detail entfernt
  - Erfolgsmeldung wird angezeigt

#### US-034: Timeline-Ansicht
- ID: US-034
- Titel: Als Benutzer möchte ich alle Notizen eines Projekts chronologisch sehen
- Beschreibung: Die Timeline zeigt alle Notizen eines Projekts in zeitlicher Reihenfolge.
- Akzeptanzkriterien:
  - Notizen sind nach Erstellungsdatum sortiert (neueste oben)
  - Jede Notiz zeigt: Inhalt, Datum, zugeordnete Person (falls vorhanden)
  - Gruppierung nach Tagen/Wochen für bessere Übersicht
  - Leerer Zustand mit Hinweis "Noch keine Notizen"
  - Schnellzugriff zum Erstellen neuer Notizen

#### US-035: Notizen einer Person anzeigen
- ID: US-035
- Titel: Als Benutzer möchte ich alle Notizen zu einer Person sehen
- Beschreibung: Alle Notizen, die einer bestimmten Person zugeordnet sind, werden angezeigt.
- Akzeptanzkriterien:
  - Liste in Person-Detail verfügbar
  - Notizen aus allen Projekten werden angezeigt
  - Jede Notiz zeigt: Inhalt, Datum, zugehöriges Projekt
  - Chronologische Sortierung
  - Klick auf Notiz zeigt Kontext (Projekt)

#### US-036: Notiz Projekt zuordnen (nachträglich)
- ID: US-036
- Titel: Als Benutzer möchte ich eine Notiz nachträglich einem Projekt zuordnen
- Beschreibung: Eine "lose" Notiz ohne Projektzuordnung kann später zugeordnet werden.
- Akzeptanzkriterien:
  - Dropdown zur Projektauswahl beim Bearbeiten
  - Option "Kein Projekt" zum Entfernen der Zuordnung
  - Notiz erscheint nach Zuordnung in Projekt-Timeline

#### US-037: Notiz Person zuordnen (nachträglich)
- ID: US-037
- Titel: Als Benutzer möchte ich eine Notiz nachträglich einer Person zuordnen
- Beschreibung: Eine Notiz kann nachträglich einer Person zugeordnet werden.
- Akzeptanzkriterien:
  - Dropdown zur Personenauswahl beim Bearbeiten
  - Option "Keine Person" zum Entfernen der Zuordnung
  - Notiz erscheint nach Zuordnung in Person-Detail

### 5.5 Suche (Should Have)

#### US-040: Volltext-Suche
- ID: US-040
- Titel: Als Benutzer möchte ich nach Inhalten suchen können
- Beschreibung: Eine globale Suche durchsucht Notizen, Projekte und Personen.
- Akzeptanzkriterien:
  - Suchfeld in der Hauptnavigation
  - Suche durchsucht: Notizinhalt, Projektnamen, Personennamen
  - Ergebnisse sind nach Typ gruppiert
  - Klick auf Ergebnis navigiert zum entsprechenden Detail
  - Mindestens 2 Zeichen für Suche erforderlich

### 5.6 AI-Features (Should Have)

#### US-050: Projekt-Zusammenfassung generieren
- ID: US-050
- Titel: Als Benutzer möchte ich eine AI-Zusammenfassung meines Projekts
- Beschreibung: Die AI analysiert alle Notizen und erstellt eine Zusammenfassung.
- Akzeptanzkriterien:
  - Button "Analysieren" im Insights-Tab des Projekts
  - Ladeindikator während der Generierung
  - Zusammenfassung zeigt: Kernpunkte, Fortschritt, offene Themen
  - Generierung basiert auf allen Notizen des Projekts
  - Fehlermeldung bei API-Problemen

#### US-051: Risikoerkennung
- ID: US-051
- Titel: Als Benutzer möchte ich potenzielle Risiken erkennen
- Beschreibung: Die AI identifiziert Risiken basierend auf Projektdaten.
- Akzeptanzkriterien:
  - Teil der Insights-Analyse
  - Berücksichtigt: Ziele, Deadline, beteiligte Personen, Notizinhalte
  - Risiken werden mit Begründung angezeigt
  - Priorisierung nach Schweregrad

#### US-052: Handlungsempfehlungen
- ID: US-052
- Titel: Als Benutzer möchte ich Handlungsempfehlungen erhalten
- Beschreibung: Die AI schlägt konkrete nächste Schritte vor.
- Akzeptanzkriterien:
  - Teil der Insights-Analyse
  - Basiert auf aktuellen Projektstand und Zielen
  - Empfehlungen sind konkret und umsetzbar
  - Berücksichtigt Expertise der beteiligten Personen

#### US-053: Task-Vorschläge
- ID: US-053
- Titel: Als Benutzer möchte ich Task-Vorschläge sehen
- Beschreibung: Die AI generiert Aufgabenvorschläge basierend auf der Analyse.
- Akzeptanzkriterien:
  - Teil der Insights-Analyse
  - Tasks werden als Liste angezeigt
  - Jeder Task hat Titel und optionale Beschreibung
  - Tasks werden NICHT automatisch erstellt
  - Option zum manuellen Übernehmen (zukünftige Version)

#### US-054: Periodische Zusammenfassung
- ID: US-054
- Titel: Als Benutzer möchte ich täglich eine Übersicht erhalten
- Beschreibung: Die App generiert täglich eine Zusammenfassung aller aktiven Projekte.
- Akzeptanzkriterien:
  - Wird In-App beim Login angezeigt (wenn neue Zusammenfassung verfügbar)
  - Enthält: Aktivität der letzten 24h, anstehende Deadlines, Empfehlungen
  - Kann weggeklickt/geschlossen werden
  - Generierung erfolgt automatisch (Backend-Job)

### 5.7 Markdown (Should Have)

#### US-060: Markdown in Notizen
- ID: US-060
- Titel: Als Benutzer möchte ich Markdown in Notizen verwenden
- Beschreibung: Notizen unterstützen Markdown-Formatierung.
- Akzeptanzkriterien:
  - Basis-Markdown wird unterstützt (Überschriften, Listen, Fett, Kursiv, Code)
  - Toggle-Button für Preview-Modus
  - Rohtext-Ansicht zeigt Markdown-Syntax
  - Preview-Ansicht rendert Markdown

### 5.8 Edge Cases und Fehlerbehandlung

#### US-070: Leere Zustände
- ID: US-070
- Titel: Als neuer Benutzer sehe ich hilfreiche leere Zustände
- Beschreibung: Bei leeren Listen werden hilfreiche Hinweise angezeigt.
- Akzeptanzkriterien:
  - Projektliste leer: "Noch keine Projekte. Erstellen Sie Ihr erstes Projekt!"
  - Kontaktliste leer: "Noch keine Kontakte. Fügen Sie Ihren ersten Kontakt hinzu!"
  - Timeline leer: "Noch keine Notizen in diesem Projekt."
  - Jeweils mit Call-to-Action Button

#### US-071: Validierungsfehler
- ID: US-071
- Titel: Als Benutzer erhalte ich klare Fehlermeldungen
- Beschreibung: Bei Validierungsfehlern werden verständliche Meldungen angezeigt.
- Akzeptanzkriterien:
  - Pflichtfelder werden markiert
  - Fehlermeldungen erscheinen unter dem betroffenen Feld
  - Meldungen sind auf Deutsch und verständlich
  - Formular kann nicht abgesendet werden bei Fehlern

#### US-072: Netzwerkfehler
- ID: US-072
- Titel: Als Benutzer werde ich über Netzwerkprobleme informiert
- Beschreibung: Bei Verbindungsproblemen wird eine Fehlermeldung angezeigt.
- Akzeptanzkriterien:
  - Toast-Nachricht bei fehlgeschlagenen API-Aufrufen
  - Retry-Option bei temporären Fehlern
  - Keine Datenverlust bei Speicherfehler (lokaler Draft)

#### US-073: Lösch-Bestätigung
- ID: US-073
- Titel: Als Benutzer muss ich Löschungen bestätigen
- Beschreibung: Vor dem Löschen von Daten wird eine Bestätigung eingeholt.
- Akzeptanzkriterien:
  - Bestätigungsdialog bei: Projekt löschen, Person löschen, Notiz löschen
  - Dialog zeigt Konsequenzen (z.B. "X Notizen werden gelöscht")
  - Abbrechen-Option ist prominent
  - Keine versehentlichen Löschungen durch Doppelklick

---

## 6. Success Metrics

### 6.1 Technische Metriken
| Metrik | Ziel | Messmethode |
|--------|------|-------------|
| MVP deployed | In 6-8 Wochen | Deployment-Datum |
| Ladezeit (initial) | < 3 Sekunden | Lighthouse |
| Ladezeit (Navigation) | < 1 Sekunde | Browser DevTools |
| Uptime | > 99% | Supabase Dashboard |
| Fehlerrate (API) | < 1% | Logging |

### 6.2 Benutzermetriken
| Metrik | Ziel | Messmethode |
|--------|------|-------------|
| Notiz-Erstellung | < 10 Sekunden | Manueller Test |
| Projekte pro Benutzer | Mindestens 3 aktive | Datenbank |
| Notizen pro Woche | Mindestens 5 | Datenbank |
| Selbst nutzbar | Ja | Eigene Verwendung |

### 6.3 Qualitätsmetriken
| Metrik | Ziel | Messmethode |
|--------|------|-------------|
| Test Coverage | > 70% | Vitest |
| E2E Tests | Kritische Pfade | Playwright |
| Accessibility | WCAG 2.1 AA | Lighthouse |
| Mobile Responsive | Funktionsfähig | Manueller Test |

---

## Anhang

### A. Glossar
| Begriff | Definition |
|---------|------------|
| Projekt | Zentrale Organisationseinheit mit Zielen, Deadline und Beteiligten |
| Person/Kontakt | Wiederverwendbare Referenz auf eine beteiligte Person |
| Notiz | Textbasierter Journaleintrag mit optionaler Zuordnung |
| Timeline | Chronologische Ansicht aller Notizen eines Projekts |
| Insights | AI-generierte Analyse und Empfehlungen |

### B. Referenzen
- PRD Planning Summary: `.ai/prd-planning-summary.md`
- Idea Validation: `.ai/idea-validation.md`
- Project Idea: `.ai/project-idea.md`

---

Erstellt: 2025-12-16
Version: 1.0
Status: Draft
