# Deployment Guide - Cloudflare Pages

## Übersicht

ProjectPad wird auf **Cloudflare Pages** deployed - eine moderne Plattform für statische Sites mit automatischem CI/CD.

**Vorteile:**
- ✅ Kostenlos für unbegrenzte Sites
- ✅ Automatisches Deployment bei Git Push
- ✅ Preview Deployments für PRs
- ✅ Global CDN für schnelle Ladezeiten
- ✅ Einfache Environment Variables Verwaltung
- ✅ HTTPS automatisch

## Voraussetzungen

- [x] GitHub Repository mit ProjectPad Code
- [x] Supabase Projekt mit Datenbank
- [ ] Cloudflare Account (kostenlos)

## Schritt-für-Schritt Anleitung

### 1. Cloudflare Account erstellen

1. Gehe zu [https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)
2. Registriere dich mit Email/Passwort
3. Bestätige deine Email-Adresse
4. Überspringe Domain-Setup (nicht benötigt für Pages)

### 2. Neues Pages Projekt erstellen

1. Im Cloudflare Dashboard:
   - Klicke auf **"Workers & Pages"** in der linken Sidebar
   - Klicke auf **"Create application"**
   - Wähle **"Pages"** Tab
   - Klicke auf **"Connect to Git"**

2. GitHub Verbindung:
   - Klicke auf **"Connect GitHub"**
   - Autorisiere Cloudflare für dein GitHub Account
   - Wähle dein **"ProjectPad"** Repository aus
   - Klicke auf **"Begin setup"**

### 3. Build Settings konfigurieren

Fülle die Felder wie folgt aus:

```
Project name: projectpad (oder dein Wunschname)
Production branch: main
```

**Build Settings:**
```
Framework preset: None (oder Vite)
Build command: npm run build
Build output directory: dist
```

**Root directory:** (leer lassen)

### 4. Environment Variables setzen

Klicke auf **"Add variable"** und füge folgende Variablen hinzu:

```
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR-ANON-KEY
```

**Wichtig:** Ersetze `YOUR-PROJECT` und `YOUR-ANON-KEY` mit deinen echten Supabase Werten!

**Wo finde ich meine Supabase Keys?**
1. Gehe zu [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Wähle dein Projekt aus
3. Klicke auf **"Project Settings"** (Zahnrad unten links)
4. Gehe zu **"API"**
5. Kopiere:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon/public key** → `VITE_SUPABASE_ANON_KEY`

### 5. Deployment starten

1. Klicke auf **"Save and Deploy"**
2. Cloudflare startet den Build-Prozess
3. Warte 2-3 Minuten
4. Status-Anzeige: Building → Deploying → Success ✅

### 6. Live URL testen

Nach erfolgreichem Deployment:

1. Du bekommst eine URL: `https://projectpad.pages.dev` (oder mit deinem Projektnamen)
2. Klicke auf **"Visit site"**
3. Teste die App:
   - [ ] Signup funktioniert
   - [ ] Login funktioniert
   - [ ] Projekt erstellen
   - [ ] Notiz erstellen
   - [ ] Timeline-Ansicht

### 7. Custom Domain einrichten (Optional)

Falls du eine eigene Domain hast:

1. Gehe zu deinem Pages Projekt
2. Klicke auf **"Custom domains"** Tab
3. Klicke auf **"Set up a custom domain"**
4. Folge den Anweisungen (DNS Records setzen)

## Automatisches Deployment

Ab jetzt wird **jeder Push auf `main`** automatisch deployed:

1. Mache Änderungen in deinem Code
2. Commit und Push zu GitHub
3. Cloudflare erkennt den Push automatisch
4. Build wird gestartet
5. Nach 2-3 Minuten ist die neue Version live

## Preview Deployments für Pull Requests

Cloudflare erstellt automatisch **Preview URLs** für jeden PR:

1. Erstelle einen neuen Branch: `git checkout -b feature/my-feature`
2. Mache Änderungen und pushe
3. Erstelle einen Pull Request auf GitHub
4. Cloudflare deployed automatisch eine Preview-Version
5. Preview-URL erscheint als Kommentar im PR
6. Du kannst die Änderungen testen, bevor du mergst

## Environment Variables aktualisieren

Falls du später Environment Variables ändern musst:

1. Gehe zu deinem Pages Projekt in Cloudflare
2. Klicke auf **"Settings"** Tab
3. Scrolle zu **"Environment variables"**
4. Klicke auf **"Add variable"** oder bearbeite bestehende
5. Klicke auf **"Save"**
6. **Wichtig:** Triggere ein neues Deployment (Push oder Manual Redeploy)

## Troubleshooting

### Build schlägt fehl

**Error:** `Command failed: npm run build`

**Lösung:**
1. Überprüfe, ob der Build lokal funktioniert: `npm run build`
2. Überprüfe die Node.js Version in Cloudflare (sollte 18+ sein)
3. Stelle sicher, dass alle Dependencies in `package.json` sind

### Environment Variables fehlen

**Error:** `Missing Supabase environment variables`

**Lösung:**
1. Gehe zu Settings → Environment variables
2. Überprüfe, dass beide Variablen gesetzt sind
3. Stelle sicher, dass sie mit `VITE_` prefix beginnen
4. Triggere ein neues Deployment

### 404 Error bei Routing

**Problem:** Seiten wie `/app/projects` zeigen 404

**Lösung:**
Cloudflare Pages benötigt eine `_redirects` Datei für Client-Side Routing.

1. Erstelle `public/_redirects` mit folgendem Inhalt:
   ```
   /*    /index.html   200
   ```
2. Commit und Push
3. Neues Deployment wird getriggert

### Supabase Auth funktioniert nicht

**Problem:** Login/Signup schlägt fehl

**Lösung:**
1. Überprüfe die Supabase Environment Variables
2. Gehe zu Supabase Dashboard → Authentication → URL Configuration
3. Füge deine Cloudflare URL zu **"Site URL"** hinzu:
   ```
   https://projectpad.pages.dev
   ```
4. Füge zu **"Redirect URLs"** hinzu:
   ```
   https://projectpad.pages.dev/**
   ```

## Performance Optimierung (Optional)

### Bundle Size reduzieren

Aktuell: 642 KB (gzipped: 183 KB)

**Optimierungen:**
1. Dynamic Imports für Pages
2. Code Splitting
3. Tree Shaking Optimierung

Siehe `.ai/optimization-guide.md` für Details.

### Caching optimieren

Cloudflare Pages cached automatisch:
- HTML: 0 Minuten (immer frisch)
- Assets (CSS/JS): 1 Jahr (mit Hash im Dateinamen)

## Monitoring

### Build Logs

1. Gehe zu deinem Pages Projekt
2. Klicke auf **"View details"** eines Deployments
3. Sieh dir **"Build log"** an

### Analytics (Optional)

Cloudflare bietet kostenloses Analytics:
1. Gehe zu deinem Pages Projekt
2. Klicke auf **"Analytics"** Tab
3. Sieh dir Page Views, Unique Visitors, etc. an

## Kosten

**Cloudflare Pages Free Tier:**
- ✅ Unbegrenzte Sites
- ✅ Unbegrenzte Requests
- ✅ 500 Builds pro Monat
- ✅ 1 concurrent build
- ✅ 20,000 files per site

**Supabase Free Tier:**
- ✅ 500 MB Datenbank
- ✅ 1 GB File Storage
- ✅ 2 GB Bandbreite
- ✅ 50,000 Monthly Active Users

Für ein persönliches MVP ist beides mehr als genug!

## Nächste Schritte nach Deployment

1. [ ] URL mit Freunden/Familie teilen
2. [ ] Feedback sammeln
3. [ ] Optional: Custom Domain einrichten
4. [ ] Optional: UI-Polishing (siehe `.ai/ui-improvements.md`)
5. [ ] Optional: Dark Mode implementieren
6. [ ] Optional: Analytics einrichten

## Support

- **Cloudflare Docs:** https://developers.cloudflare.com/pages/
- **Supabase Docs:** https://supabase.com/docs
- **GitHub Issues:** https://github.com/spyrad/ProjectPad/issues

---

*Erstellt: 2026-01-08*
*ProjectPad Deployment Guide für 10xDevs Zertifikat*
