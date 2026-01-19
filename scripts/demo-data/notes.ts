// Demo notes data for Polish "KPI Chatbot" project

export interface DemoNote {
  content: string;
  personIndices: number[]; // Indices of persons involved (0-4)
  daysAgo: number; // Days ago from today
}

export const demoNotes: DemoNote[] = [
  {
    content: `Pierwsze spotkanie projektowe. Obecni: Anna (CFO), Marek, Katarzyna.

Omówione tematy:
- Cel projektu: automatyzacja dostępu do KPI poprzez chatbot
- Główne KPI do pokrycia: EBITDA, cash flow, wskaźniki płynności, rentowność
- Docelowi użytkownicy: zarząd, kontrolerzy, analitycy
- Timeline: 6 miesięcy do wdrożenia MVP

Decyzje:
- Używamy OpenAI GPT-4 jako base model
- Integracja z Power BI jako źródło danych
- Język: polski i angielski

Następne kroki: warsztat wymagań (Marek + Katarzyna)`,
    personIndices: [0, 1, 2], // Anna, Marek, Katarzyna
    daysAgo: 56, // ~8 weeks ago
  },
  {
    content: `Sesja z zespołem raportowania. Obecni: Marek, Katarzyna, Piotr.

Zdefiniowane wymagania funkcjonalne:
- Zapytania w języku naturalnym (PL/EN)
- Wizualizacja danych inline (wykresy, tabele)
- Historia konwersacji dla audytu
- Role-based access control

Przykładowe zapytania użytkowników:
- "Jaka była EBITDA w Q4 2025?"
- "Porównaj rentowność vs rok poprzedni"
- "Pokaż top 5 cost centers"

Ryzyka:
- Jakość danych w SAP (Piotr sprawdzi)
- Latencja API Power BI`,
    personIndices: [1, 2, 3], // Marek, Katarzyna, Piotr
    daysAgo: 49, // ~7 weeks ago
  },
  {
    content: `Spotkanie techniczne. Obecni: Tomasz (dev), Katarzyna, Marek.

Architektura:
- Frontend: React + TypeScript
- Backend: Node.js Express API
- LLM: OpenAI GPT-4 Turbo
- Data layer: Power BI REST API + SAP OData

Tomasz zaproponował:
- Function calling dla strukturowanych zapytań
- Semantic caching dla często używanych KPI
- Fallback do SQL queries gdy Power BI nie odpowiada

Do zrobienia:
- PoC integracji Power BI (Tomasz + Katarzyna)
- Definicja data model (Piotr + Marek)`,
    personIndices: [4, 2, 1], // Tomasz, Katarzyna, Marek
    daysAgo: 42, // 6 weeks ago
  },
  {
    content: `Planning pierwszego sprintu. Obecni: cały zespół.

Sprint 1 (2 tygodnie):
- Setup projektu (Tomasz)
- Power BI API exploration (Katarzyna)
- Dokumentacja data model (Piotr)
- UI mockupy (Marek feedback)

Metryki sukcesu:
- PoC chatbot odpowiada na 3 podstawowe zapytania KPI
- Czas odpowiedzi < 3s

Blokery:
- Czekamy na dostęp do Power BI workspace (Anna eskaluje)`,
    personIndices: [0, 1, 2, 3, 4], // Cały zespół
    daysAgo: 35, // 5 weeks ago
  },
  {
    content: `Quick sync. Obecni: Tomasz, Katarzyna.

Postęp:
✅ Power BI API connection działa
✅ Podstawowy chat UI gotowy
⏳ Function calling implementation in progress

Problemy:
- Power BI rate limiting (500 req/hour)
- Potrzebujemy cache layer (Tomasz implementuje Redis)

Katarzyna: "Musimy zoptymalizować queries, niektóre KPI ciągną 50k rows"`,
    personIndices: [4, 2], // Tomasz, Katarzyna
    daysAgo: 28, // 4 weeks ago
  },
  {
    content: `Prezentacja dla Anny (CFO). Obecni: Anna, Tomasz, Marek.

Zademonstrowane:
- Chat interface z przykładowymi zapytaniami
- Visualizacje inline (charts)
- Response time ~2s

Feedback Anny:
+ "Świetny progress, UI intuicyjny"
+ "Wykresy czytelne i profesjonalne"
- "Dodajcie export do Excel"
- "Chcę widzieć źródło danych w odpowiedzi (transparency)"

Anna approve'uje kontynuację. Budget OK.`,
    personIndices: [0, 4, 1], // Anna, Tomasz, Marek
    daysAgo: 21, // 3 weeks ago
  },
  {
    content: `Retro zespołu. Obecni: wszyscy.

Co poszło dobrze:
+ Szybka integracja Power BI
+ Dobra komunikacja w zespole
+ Tomasz super responsive

Co poprawić:
- Więcej testów (brak test coverage)
- Dokumentacja API endpoints
- Piotr potrzebuje więcej kontekstu tech

Action items:
- Katarzyna: setup Vitest
- Tomasz: API docs (Swagger)
- Marek: training sesja dla Piotra`,
    personIndices: [0, 1, 2, 3, 4], // Wszyscy
    daysAgo: 14, // 2 weeks ago
  },
  {
    content: `Sesja security. Obecni: Tomasz, external security consultant.

Findings:
⚠️  CRITICAL: API keys w environment variables (OK)
⚠️  MEDIUM: Brak rate limiting na chat endpoint
⚠️  LOW: Logging zawiera PII (do sanityzacji)

Tomasz implementuje:
- Express rate limiter (10 req/min per user)
- PII masking w logach
- RBAC integration z Active Directory

Consultant: "Overall architektura solid, małe fixes needed"`,
    personIndices: [4], // Tomasz (+ external consultant)
    daysAgo: 10,
  },
  {
    content: `Spotkanie SAP integration. Obecni: Piotr, Tomasz, SAP admin.

SAP admin wyjaśnia:
- OData endpoints dostępne
- Potrzebujemy service account (w trakcie)
- Data refresh co 1h (wystarczające)

Piotr pokazuje mapping:
- SAP Cost Centers → Power BI Dimensions
- SAP GL Accounts → KPI Categories

Tomasz: "Mogę mieć PoC w 3 dni jak dostanę credentials"

Risk: SAP downtime podczas monthly close (Piotr monitoruje)`,
    personIndices: [3, 4], // Piotr, Tomasz (+ SAP admin)
    daysAgo: 5,
  },
  {
    content: `Final review przed prod. Obecni: Anna, Marek, Tomasz.

Checklist:
✅ Performance tests passed (avg 1.8s response)
✅ Security audit cleared
✅ User acceptance testing z 5 użytkownikami
✅ Dokumentacja gotowa
✅ Rollback plan prepared
⏳ Training materiały (Marek finalizuje)

Anna decision: "Go live 15.06.2026"

Komunikacja:
- Marek: email do działu finansowego (100 users)
- Tomasz: monitoring setup (Grafana alerts)
- Katarzyna: support rotation schedule

🎉 Projekt on track!`,
    personIndices: [0, 1, 4], // Anna, Marek, Tomasz
    daysAgo: 1, // Gestern
  },
];
