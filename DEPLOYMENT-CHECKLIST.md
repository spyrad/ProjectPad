# 🚀 Deployment Checklist - ProjectPad

Schnelle Checkliste für Cloudflare Pages Deployment

## Vor dem Deployment

- [x] ✅ Build lokal erfolgreich (`npm run build`)
- [x] ✅ Tests passing (`npm test -- --run`)
- [x] ✅ Code auf GitHub gepusht
- [x] ✅ Supabase Projekt läuft
- [x] ✅ `public/_redirects` Datei erstellt (für Client-Side Routing)

## Cloudflare Setup (10-15 Min)

### 1. Account erstellen
- [ ] Gehe zu https://dash.cloudflare.com/sign-up
- [ ] Registriere dich mit Email
- [ ] Bestätige Email-Adresse

### 2. Projekt verbinden
- [ ] Klicke "Workers & Pages" → "Create application" → "Pages"
- [ ] Klicke "Connect to Git"
- [ ] Autorisiere GitHub
- [ ] Wähle Repository "ProjectPad"
- [ ] Klicke "Begin setup"

### 3. Build Settings
```
Project name: projectpad
Production branch: main
Build command: npm run build
Build output directory: dist
```

### 4. Environment Variables

**Wichtig:** Füge beide Variablen hinzu!

```
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Wo finde ich die Werte?**
1. Gehe zu https://supabase.com/dashboard
2. Wähle dein Projekt
3. Settings → API
4. Kopiere:
   - Project URL → `VITE_SUPABASE_URL`
   - anon/public key → `VITE_SUPABASE_ANON_KEY`

### 5. Deploy!
- [ ] Klicke "Save and Deploy"
- [ ] Warte 2-3 Minuten
- [ ] Status: Building → Deploying → Success ✅

### 6. Supabase URL Configuration

**Kritisch für Auth!**

1. Gehe zu Supabase Dashboard → Authentication → URL Configuration
2. Füge hinzu:
   - **Site URL:** `https://projectpad.pages.dev` (oder deine URL)
   - **Redirect URLs:** `https://projectpad.pages.dev/**`

### 7. Teste die Live-App
- [ ] Klicke "Visit site"
- [ ] Teste Signup
- [ ] Teste Login
- [ ] Erstelle Projekt
- [ ] Erstelle Notiz
- [ ] Teste Timeline
- [ ] Alles funktioniert? 🎉

## Nach dem Deployment

### Dokumentation
- [ ] Live-URL in `.ai/user-profile.md` eintragen
- [ ] Screenshot der Live-App machen
- [ ] Optional: Custom Domain einrichten

### Automatisches Deployment
Ab jetzt: **Jeder Push auf `main` = automatisches Deployment!**

### Monitoring
- Cloudflare Dashboard → dein Projekt → "Deployments"
- Sieh dir Build Logs an bei Fehlern

## Troubleshooting

### Build schlägt fehl
- Überprüfe Build-Logs in Cloudflare
- Teste lokal: `npm run build`
- Überprüfe Node.js Version (sollte 18+ sein)

### Auth funktioniert nicht
- Überprüfe Environment Variables in Cloudflare
- Überprüfe Supabase URL Configuration
- Beide URLs müssen mit `VITE_` prefix beginnen

### 404 bei Routing
- Stelle sicher, dass `public/_redirects` committed ist
- Inhalt: `/*    /index.html   200`

## 🎓 Zertifikat erreicht!

**Gratulation!** Mit dem Deployment hast du Modul 3 abgeschlossen:

- ✅ M2 - AI-First MVP Bootstrap (100%)
- ✅ M3 - Going LIVE on Prod (100%)
  - [3x1] Auth ✅
  - [3x2] Testing ✅
  - [3x3] E2E Tests ✅
  - [3x5] CI/CD ✅
  - [3x6] Deployment ✅

**Du hast jetzt:**
- 📱 Eine live Production App
- 🧪 Vollständige Test-Suite
- 🤖 Automatisches CI/CD
- 🛡️ Auth + RLS Security
- 📊 CRUD Features für MVP

## Nächste Schritte (Optional)

### UI-Polishing
- Dashboard mit Statistiken
- Farb-Theming pro Projekt
- Dark Mode
- Animationen & Transitions

Siehe `.ai/ui-improvements.md` für Details.

### Weitere Features
- Markdown-Support für Notizen
- Volltext-Suche
- AI-Features (Projekt-Zusammenfassung)
- Team-Kollaboration

## Support

**Detaillierte Anleitung:** `.ai/deployment-guide.md`

**Probleme?**
- Cloudflare Docs: https://developers.cloudflare.com/pages/
- Supabase Docs: https://supabase.com/docs

---

*Ready to Deploy! 🚀*
*10xDevs Zertifikat Sprint - 2026-01-08*
