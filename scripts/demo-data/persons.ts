// Demo persons data for Polish "KPI Chatbot" project

export interface DemoPerson {
  name: string;
  role: string;
  description: string;
  expertise: string;
  contact: string;
}

export const demoPersons: DemoPerson[] = [
  {
    name: 'Anna Kowalska',
    role: 'Dyrektor Finansowy (CFO)',
    description: 'Odpowiedzialna za strategię finansową i nadzór nad projektem chatbota KPI',
    expertise: 'Strategia finansowa, raportowanie zarządcze, controlling',
    contact: 'anna.kowalska@firma.pl',
  },
  {
    name: 'Marek Nowak',
    role: 'Kierownik Raportowania',
    description: 'Product Owner projektu, definiuje wymagania biznesowe',
    expertise: 'Power BI, raportowanie KPI, analiza finansowa',
    contact: 'marek.nowak@firma.pl',
  },
  {
    name: 'Katarzyna Wiśniewska',
    role: 'Analityk Danych',
    description: 'Data Lead, odpowiedzialna za integrację źródeł danych',
    expertise: 'SQL, Python, data mining, dashboard design',
    contact: 'k.wisniewska@firma.pl',
  },
  {
    name: 'Piotr Zieliński',
    role: 'Specjalista ds. Controlingu',
    description: 'Domain Expert, definiuje model danych i KPI',
    expertise: 'SAP FI/CO, budżetowanie, koszt-analiza',
    contact: 'p.zielinski@firma.pl',
  },
  {
    name: 'Tomasz Lewandowski',
    role: 'Deweloper Backend',
    description: 'Tech Lead, implementuje backend i integracje',
    expertise: 'Node.js, API development, NLP, LLM integration',
    contact: 't.lewandowski@firma.pl',
  },
];
