// Demo project data for Polish "KPI Chatbot" project

export interface DemoProject {
  name: string;
  description: string;
  status: 'active' | 'archived' | 'completed';
  goals: string;
  deadline: string;
}

export const demoProject: DemoProject = {
  name: 'Wdrożenie chatbota KPI dla działu finansowego',
  status: 'active',
  description:
    'Implementacja inteligentnego chatbota do analizy i raportowania kluczowych wskaźników efektywności (KPI) dla działu finansowego. System ma umożliwić szybki dostęp do danych finansowych poprzez naturalny język.',
  goals: `- Automatyzacja raportowania KPI
- Redukcja czasu odpowiedzi na zapytania o dane finansowe o 70%
- Integracja z systemami SAP i Power BI
- Wsparcie dla języka polskiego i angielskiego`,
  deadline: '2026-06-30',
};
