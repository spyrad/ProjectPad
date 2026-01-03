---
title: "Checklista Modułu 2 - AI-First MVP"
module: "m2-bootstrap"
description: "Kompleksowa checklista budowy aplikacji od podstaw z AI"
source: "Przeprogramowani.pl - 10xDevs"
exported: "2025-11-20"
---

# Checklista Modułu 2 - Budowa Aplikacji od Podstaw

Kompleksowa checklista najważniejszych kroków z lekcji modułu 2 kursu 10xDevs - Budowa Aplikacji od Podstaw z AI. Każdy krok zawiera nazwę, opis, linki do promptów z 10xrules.ai oraz istotne uwagi.

**UWAGA**: Ta checklist jest uniwersalna - niezależna od stacku technologicznego. Skupia się na **metodyce pracy z AI**, nie na konkretnych narzędziach.

---

## Spis treści

- [[2x1] Planowanie projektu - kontekst dla AI](#2x1-planowanie-projektu---kontekst-dla-ai)
  - [Krok 1: Wybór pomysłu na projekt](#krok-1-wybór-pomysłu-na-projekt)
  - [Krok 2: Definicja MVP](#krok-2-definicja-mvp)
  - [Krok 3: Sesja planistyczna PRD](#krok-3-sesja-planistyczna-prd)
  - [Krok 4: Generowanie PRD](#krok-4-generowanie-prd)
  - [Krok 5: Wybór i weryfikacja stacku technologicznego](#krok-5-wybór-i-weryfikacja-stacku-technologicznego)
  - [Krok 6: Inicjalizacja repozytorium GitHub](#krok-6-inicjalizacja-repozytorium-github)
- [[2x2] Przygotowanie reguł dla AI i bootstrap projektu](#2x2-przygotowanie-reguł-dla-ai-i-bootstrap-projektu)
  - [Krok 1: Bootstrap projektu](#krok-1-bootstrap-projektu)
  - [Krok 2: Konfiguracja linterów i formaterów](#krok-2-konfiguracja-linterów-i-formaterów)
  - [Krok 3: Generowanie Rules for AI](#krok-3-generowanie-rules-for-ai)
  - [Krok 4: Generowanie README.md](#krok-4-generowanie-readmemd)
- [[2x3] Planowanie struktury danych z AI](#2x3-planowanie-struktury-danych-z-ai)
  - [Krok 1: Sesja planistyczna bazy danych](#krok-1-sesja-planistyczna-bazy-danych)
  - [Krok 2: Tworzenie schematu db-plan.md](#krok-2-tworzenie-schematu-db-planmd)
  - [Krok 3: Planowanie migracji](#krok-3-planowanie-migracji)
  - [Krok 4: Przygotowanie danych testowych](#krok-4-przygotowanie-danych-testowych)
- [[2x4] Projektowanie API z AI](#2x4-projektowanie-api-z-ai)
  - [Krok 1: Planowanie integracji modelu danych z aplikacją](#krok-1-planowanie-integracji-modelu-danych-z-aplikacją)
  - [Krok 2: Definiowanie specyfikacji API](#krok-2-definiowanie-specyfikacji-api)
  - [Krok 3: Generowanie typów DTO i Command Models](#krok-3-generowanie-typów-dto-i-command-models)
  - [Krok 4: Plan implementacji kluczowego endpointa](#krok-4-plan-implementacji-kluczowego-endpointa)
  - [Krok 5: Implementacja endpointa (workflow 3×3)](#krok-5-implementacja-endpointa-workflow-3×3)
  - [Krok 6: Testowanie endpointów](#krok-6-testowanie-endpointów)
- [[2x5] Projektowanie UI z AI](#2x5-projektowanie-ui-z-ai)
  - [Krok 1: Wybór biblioteki komponentów](#krok-1-wybór-biblioteki-komponentów)
  - [Krok 2: Sesja planistyczna architektury UI](#krok-2-sesja-planistyczna-architektury-ui)
  - [Krok 3: Generowanie ui-plan.md](#krok-3-generowanie-ui-planmd)
  - [Krok 4: Plan implementacji kluczowego widoku](#krok-4-plan-implementacji-kluczowego-widoku)
  - [Krok 5: Implementacja widoku (workflow 3×3)](#krok-5-implementacja-widoku-workflow-3×3)
- [[2x6] Integracja z LLM (opcjonalna)](#2x6-integracja-z-llm-opcjonalna)
  - [Krok 1: Wybór providera LLM](#krok-1-wybór-providera-llm)
  - [Krok 2: Plan serwisu LLM](#krok-2-plan-serwisu-llm)
  - [Krok 3: Implementacja serwisu LLM](#krok-3-implementacja-serwisu-llm)
  - [Krok 4: Integracja z funkcjonalnością aplikacji](#krok-4-integracja-z-funkcjonalnością-aplikacji)

[Sekcje końcowe]
- [Podsumowanie i certyfikacja](#podsumowanie-i-certyfikacja)
- [Zasoby i narzędzia](#zasoby-i-narzędzia)
- [Zasady pracy](#zasady-pracy)
- [Najczęstsze pytania (FAQ)](#najczęstsze-pytania-faq)

---

### [2x1] Planowanie projektu - kontekst dla AI

#### Krok 1: Wybór pomysłu na projekt
- **Opis**: Zdefiniuj problem użytkownika i zdecyduj nad jakim projektem będziesz pracować (10xCards, HealthyMeal, VibeTravels lub własny pomysł)
- **Prompt**: [Analiza pomysłu na projekt](https://10xrules.ai/prompts?org=10xdevs&collection=m2-bootstrap&segment=l1-planning&prompt=9e0681a5-fa5d-42cf-b764-82f16c7e6792)
- **Rola AI**: Analiza wykonalności pomysłu i identyfikacja potencjalnych wyzwań
- **Uwagi**:
  - Upewnij się, że projekt zawiera: funkcję CRUD, logikę biznesową, autentykację, możliwość testowania
  - To projekt 6-tygodniowy realizowany po godzinach - bądź realistyczny

#### Krok 2: Definicja MVP
- **Opis**: Określ najmniejszy zestaw funkcjonalności, granice projektu i kryteria sukcesu
- **Format dokumentu**:
  - Główny problem użytkownika
  - Lista funkcjonalności (co WCHODZI)
  - Lista wykluczeń (co NIE wchodzi w MVP)
  - Kryteria sukcesu
- **Rola AI**: Pomoc w określeniu zakresu MVP i priorytetyzacji funkcjonalności
- **Uwagi**: MVP to minimum viable product - nie próbuj zbudować wszystkiego od razu

#### Krok 3: Sesja planistyczna PRD
- **Opis**: Przeprowadź minimum 2 rundy pytań z modelem reasoningowym (Gemini 2.5 Pro / GPT-5)
- **Prompt**: [Asystent planowania PRD](https://10xrules.ai/prompts?org=10xdevs&collection=m2-bootstrap&segment=l1-planning&prompt=002f4b14-aae4-4108-b681-ecbef970ca3f)
- **Prompt**: [Podsumowanie sesji planistycznej PRD](https://10xrules.ai/prompts?org=10xdevs&collection=m2-bootstrap&segment=l1-planning&prompt=63d110aa-8f51-40f5-865b-c5f5717fee04)
- **Rola AI**: Analiza edge case'ów, przemyślenie niuansów projektu, zadawanie pytań prowokujących głębsze przemyślenie wymagań
- **Uwagi**: Model reasoningowy pomoże ci przemyśleć edge case'y i niuanse projektu

#### Krok 4: Generowanie PRD
- **Opis**: Wygeneruj kompleksowy dokument PRD (Product Requirements Document) zawierający User Stories, wymagania funkcjonalne i niefunkcjonalne
- **Prompt**: [Generowanie kompletnego PRD](https://10xrules.ai/prompts?org=10xdevs&collection=m2-bootstrap&segment=l1-planning&prompt=4ac8b7fe-6c04-4e56-83db-00e5e1d0691d)
- **Lokalizacja**: Zapisz w `.ai/prd.md`
- **Rola AI**: Generowanie strukturyzowanego PRD na podstawie sesji planistycznej
- **Uwagi**: PRD to "single source of truth" - będziesz się do niego odwoływać w każdej konwersacji z AI

#### Krok 5: Wybór i weryfikacja stacku technologicznego
- **Opis**: Zdefiniuj stack technologiczny i poproś AI o analizę dopasowania do MVP
- **Prompt**: [Analiza stacku technologicznego](https://10xrules.ai/prompts?org=10xdevs&collection=m2-bootstrap&segment=l1-planning&prompt=65b2fb71-4130-4be0-a0bf-a7532cff39d2)
- **Lokalizacja**: `.ai/tech-stack.md`
- **Dokumentuj decyzje**:
  - Wybrany stack z uzasadnieniem
  - Kryteria wyboru (szybkość MVP, znajomość technologii, dostępność talentów)
  - Potencjalne ryzyka i ograniczenia
- **Rola AI**: Weryfikacja czy stack wspiera wszystkie wymagania funkcjonalne z PRD
- **Uwagi**: Nie ma "najlepszego" stacku - wybierz ten który znasz lub chcesz się nauczyć

#### Krok 6: Inicjalizacja repozytorium GitHub
- **Opis**: Utwórz publiczne repo na GitHub, dodaj odpowiedni .gitignore, wykonaj pierwszy commit
- **Rola AI**: Zero w tym kroku - to manualny setup
- **Uwagi**:
  - Stosuj Conventional Commits (feat:, fix:, chore:, docs:)
  - Od razu dodaj .env do .gitignore

---

### [2x2] Przygotowanie reguł dla AI i bootstrap projektu

#### Krok 1: Bootstrap projektu
- **Opis**: Zainicjalizuj projekt używając oficjalnego narzędzia dla wybranego stacku
- **Zasada**: NIGDY nie generuj całego projektu od zera z AI
- **Dlaczego**:
  - Oficjalne narzędzia zapewniają sprawdzoną strukturę folderów
  - Zawierają konfigurację build tools i best practices
  - AI nie zna subtelności konfiguracji dla każdego stacku
- **Rola AI**: Zero w tym kroku - to manualny setup
- **Uwagi**: Znajdź oficjalne CLI w dokumentacji wybranego stacku (zapytaj AI: "Jakie jest oficjalne narzędzie CLI dla [twój stack]?")

#### Krok 2: Konfiguracja linterów i formaterów
- **Opis**: Skonfiguruj narzędzia do automatycznej kontroli jakości kodu (opcjonalne, zalecane)
- **Dlaczego**: Lintery/formatery wspierają agentów AI poprzez:
  - Automatyczne wykrywanie błędów składniowych
  - Informowanie AI o naruszeniach konwencji
  - Real-time feedback podczas generowania kodu
- **Rola AI**: Pomoc w konfiguracji reguł zgodnych z konwencjami projektu
- **Uwagi**: Zapytaj AI o rekomendowane narzędzia dla twojego stacku

#### Krok 3: Generowanie Rules for AI
- **Opis**: Wygeneruj reguły dla AI używając 10xRules.ai lub cursor.directory
- **Narzędzie**: [10xRules.ai](https://10xrules.ai/)
- **Alternatywa**: [cursor.directory](https://cursor.directory/) (gotowe szablony dla popularnych stacków)
- **Struktura plików** (dostosuj do stacku):
  - `shared.mdc` - ogólne zasady projektu (naming, architektura, git workflow)
  - `frontend.mdc` - zasady UI (jeśli dotyczy)
  - `backend.mdc` - zasady API/logiki biznesowej
  - `testing.mdc` - konwencje testowania
  - `[framework].mdc` - specyficzne zasady dla używanych technologii
- **Rola AI**: Generowanie reguł na podstawie PRD, tech-stack i konwencji stacku
- **Uwagi**:
  - Każdy plik <500 linii dla optymalnej wydajności AI
  - Regularnie aktualizuj reguły na podstawie doświadczeń
  - Cursor.directory ma gotowe szablony dla większości popularnych stacków

#### Krok 4: Generowanie README.md
- **Opis**: Wygeneruj README.md na podstawie PRD i tech-stack
- **Prompt**: [Generowanie README projektu](https://10xrules.ai/prompts?org=10xdevs&collection=m2-bootstrap&segment=l2-rules-for-ai&prompt=fd5efc36-7aff-4bd5-8e23-83378e8152b7)
- **Rola AI**: Generowanie README z opisem projektu, instrukcjami instalacji, zmiennymi środowiskowymi
- **Uwagi**: README powinien zawierać: opis projektu, stack, instrukcje instalacji, zmienne środowiskowe

---

### [2x3] Planowanie struktury danych z AI

#### Krok 1: Sesja planistyczna bazy danych
- **Opis**: Przeprowadź minimum 2 rundy pytań z modelem reasoningowym o strukturze bazy
- **Prompt**: [Asystent planowania bazy danych](https://10xrules.ai/prompts?org=10xdevs&collection=m2-bootstrap&segment=l3-database&prompt=bff6925d-bf5e-40b9-94b6-8cd5f721f2ae)
- **Prompt**: [Podsumowanie planowania bazy danych](https://10xrules.ai/prompts?org=10xdevs&collection=m2-bootstrap&segment=l3-database&prompt=cd51feb5-5237-427c-ab2c-9e48de2fcadb)
- **Rola AI**: Analiza relacji między encjami, identyfikacja potencjalnych problemów ze skalowalnością, przemyślenie normalizacji
- **Uwagi**: Przemyśl relacje między tabelami/kolekcjami, normalizację, indeksy

#### Krok 2: Tworzenie schematu db-plan.md
- **Opis**: Wygeneruj dokument opisujący schemat bazy danych
- **Prompt**: [Tworzenie schematu bazy danych](https://10xrules.ai/prompts?org=10xdevs&collection=m2-bootstrap&segment=l3-database&prompt=a0f2515d-fe92-4d59-a387-431b698b8187)
- **Lokalizacja**: `.ai/db-plan.md`
- **Co zawrzeć**:
  - Tabele/kolekcje z kolumnami/polami i typami danych
  - Relacje między encjami (1:1, 1:N, N:N)
  - Indeksy dla optymalizacji zapytań
  - Polityki bezpieczeństwa (role, permissions, row-level security)
  - Constrainty (unique, not null, foreign keys)
- **Rola AI**: Generowanie schematu na podstawie User Stories z PRD
- **Uwagi**:
  - Przemyśl mechanizmy bezpieczeństwa już na etapie planowania
  - Zapytaj AI o potencjalne problemy ze skalowalnością

#### Krok 3: Planowanie migracji
- **Opis**: Zaplanuj strategię wersjonowania schematu bazy (migracje)
- **Rola AI**: Pomoc w zaprojektowaniu migracji na podstawie db-plan.md
- **Kluczowe zasady** (poproś AI o implementację):
  - Migracje muszą być idempotentne (można uruchomić wielokrotnie)
  - Nazywaj migracje opisowo (YYYYMMDD_opis_zmiany)
  - NIGDY nie edytuj starych migracji - zawsze twórz nowe
  - Commituj migracje do Git razem z kodem
- **Uwagi**: Narzędzia do migracji zależą od stacku - zapytaj AI o rekomendacje dla twojego wyboru

#### Krok 4: Przygotowanie danych testowych
- **Opis**: Zaplanuj dane testowe (seed data) dla developmentu
- **Rola AI**: Generowanie seed scripts na podstawie schematu bazy
- **Co przygotować**:
  - Testowych użytkowników (jeśli aplikacja wymaga autentykacji)
  - Przykładowe dane dla każdej tabeli/kolekcji
  - Dane relacyjne (zachowujące więzy integralności)
- **Uwagi**:
  - Seed data pozwala szybko resetować bazę do stanu początkowego
  - Użyj realistycznych danych (nie "test1", "test2") - AI może pomóc wygenerować

---

### [2x4] Projektowanie API z AI

#### Krok 1: Planowanie integracji modelu danych z aplikacją
- **Opis**: Zaplanuj integrację modelu danych z logiką aplikacji
- **Rola AI**: Pomoc w zaprojektowaniu warstwy dostępu do danych
- **Kluczowe decyzje** (poproś AI o analizę):
  - Czy używasz ORM/ODM czy surowych zapytań?
  - Jak generować typy/modele z schematu bazy?
  - Gdzie umieścić logikę walidacji (baza, ORM, aplikacja)?
- **Uwagi**: Nie wszystkie stacki potrzebują generowania typów - zależy od języka programowania

#### Krok 2: Definiowanie specyfikacji API
- **Opis**: Wygeneruj api-plan.md z listą endpointów, kontraktów request/response, statusów HTTP
- **Prompt**: [Tworzenie planu REST API](https://10xrules.ai/prompts?org=10xdevs&collection=m2-bootstrap&segment=l4-api&prompt=b32d5dd1-f1ab-4695-b8d0-a0981df2a1a8)
- **Lokalizacja**: `.ai/api-plan.md`
- **Rola AI**: Generowanie specyfikacji API zgodnej z konwencjami (REST/GraphQL/tRPC)
- **Uwagi**: Zaplanuj API zgodnie z wybranym stylem architektonicznym

#### Krok 3: Generowanie typów DTO i Command Models
- **Opis**: Wygeneruj DTOs (Data Transfer Objects) i Command Models zgodne ze schematem bazy
- **Prompt**: [Generowanie typów DTO i Command Models](https://10xrules.ai/prompts?org=10xdevs&collection=m2-bootstrap&segment=l4-api&prompt=6c5a99ac-6036-494a-b5c5-60f6cc305534)
- **Rola AI**: Generowanie kontraktów API na podstawie db-plan i api-plan
- **Uwagi**: DTO !== Database Types (DTO to kontrakty API, mogą mieć inną strukturę)

#### Krok 4: Plan implementacji kluczowego endpointa
- **Opis**: Wygeneruj szczegółowy plan dla najważniejszego endpointa
- **Prompt**: [Plan implementacji endpointa REST API](https://10xrules.ai/prompts?org=10xdevs&collection=m2-bootstrap&segment=l4-api&prompt=7fa09cd6-4760-47c2-aae0-acde3d54740f)
- **Rola AI**: Szczegółowe zaplanowanie implementacji (walidacja, logika biznesowa, obsługa błędów)
- **Uwagi**: Plan powinien zawierać: walidację, obsługę błędów, logikę biznesową, response

#### Krok 5: Implementacja endpointa (workflow 3×3)
- **Opis**: Zaimplementuj endpoint używając workflow 3×3 (3 kroki → feedback → następne 3 kroki)
- **Prompt**: [Implementacja endpointu](https://10xrules.ai/prompts?org=10xdevs&collection=m2-bootstrap&segment=l4-api&prompt=d20e7b05-7964-4c1b-8d36-ffebffd9b970)
- **Workflow 3×3**:
  1. Implementuj walidację i parsing
  2. Implementuj logikę biznesową
  3. Implementuj obsługę błędów
  4. CODE REVIEW + FEEDBACK
  5. Następne 3 kroki...
- **Rola AI**: Implementacja kodu zgodnie z planem i regułami projektu
- **Uwagi**: Commituj po każdym działającym etapie

#### Krok 6: Testowanie endpointów
- **Opis**: Zaplanuj strategię testowania API
- **Rola AI**: Generowanie przykładowych requestów dla każdego endpointa
- **Uwagi**:
  - Testuj wszystkie przypadki: success, validation errors, server errors
  - Zapisz przykładowe requesty do dokumentacji API
  - AI może wygenerować testy dla narzędzi HTTP (curl, httpie, Postman) używanych w twoim stacku

---

### [2x5] Projektowanie UI z AI

#### Krok 1: Wybór biblioteki komponentów
- **Opis**: Zdecyduj czy używać biblioteki komponentów (opcjonalne)
- **Rola AI**: Analiza pros/cons dla twojego projektu
- **Kluczowe pytania** (zapytaj AI):
  - Czy stack ma popularną bibliotekę komponentów?
  - Jakie jest trade-off między customizacją a szybkością?
  - Czy projekt wymaga spójnego design systemu?
- **Uwagi**:
  - Dla MVP gotowe komponenty przyspieszają development
  - AI może pomóc w konfiguracji wybranej biblioteki

#### Krok 2: Sesja planistyczna architektury UI
- **Opis**: Przeprowadź minimum 2 rundy pytań z modelem reasoningowym o architekturę UI
- **Prompt**: [Asystent planowania architektury UI](https://10xrules.ai/prompts?org=10xdevs&collection=m2-bootstrap&segment=l5-ui&prompt=c7bfd30d-e413-41b7-85ee-026b092514bb)
- **Prompt**: [Podsumowanie sesji planowania UI](https://10xrules.ai/prompts?org=10xdevs&collection=m2-bootstrap&segment=l5-ui&prompt=e4457a5f-2c9c-4828-97f2-81a67f920fa3)
- **Tematy do przedyskutowania** (dostosuj do typu aplikacji):
  - Routing i nawigacja
  - Struktura komponentów (atomic design, feature-based, page-based)
  - State management (local, global, server state)
  - Strategia renderowania (CSR, SSR, SSG, ISR - zależnie od stacku)
  - Accessibility (WCAG standards)
- **Rola AI**: Analiza trade-offs różnych podejść w kontekście wybranego stacku
- **Uwagi**: Model reasoningowy pomoże przemyśleć architekturę UI dostosowaną do projektu

#### Krok 3: Generowanie ui-plan.md
- **Opis**: Wygeneruj wysokopoziomowy plan UI (widoki, nawigacja, główne komponenty)
- **Prompt**: [Generowanie wysokopoziomowego planu UI](https://10xrules.ai/prompts?org=10xdevs&collection=m2-bootstrap&segment=l5-ui&prompt=c0f17d5a-0dc2-40da-b129-f69e838343c4)
- **Lokalizacja**: `.ai/ui-plan.md`
- **Rola AI**: Generowanie planu UI na podstawie User Stories i sesji planistycznej
- **Uwagi**: Plan powinien opisywać strukturę stron, nie szczegóły CSS

#### Krok 4: Plan implementacji kluczowego widoku
- **Opis**: Wygeneruj szczegółowy plan dla najważniejszego widoku
- **Prompt**: [Szczegółowy plan implementacji widoku](https://10xrules.ai/prompts?org=10xdevs&collection=m2-bootstrap&segment=l5-ui&prompt=629e6ff0-3fac-44d2-abc1-aa90c161a845)
- **Rola AI**: Szczegółowe zaplanowanie implementacji (komponenty, props, stan, interakcje)
- **Uwagi**: Plan powinien zawierać: komponenty, props, stan, interakcje użytkownika

#### Krok 5: Implementacja widoku (workflow 3×3)
- **Opis**: Zaimplementuj widok używając workflow 3×3
- **Prompt**: [Implementacja widoku](https://10xrules.ai/prompts?org=10xdevs&collection=m2-bootstrap&segment=l5-ui&prompt=60599924-a4e8-482f-b882-fbae38a77817)
- **Workflow 3×3**:
  1. Layout i routing
  2. Główne komponenty UI
  3. Integracja z API
  4. CODE REVIEW + FEEDBACK
  5. Następne 3 kroki...
- **Rola AI**: Implementacja kodu zgodnie z planem i regułami projektu
- **Uwagi**:
  - Jeśli model się gubi, zatrzymaj pracę
  - Utwórz plik ze statusem implementacji
  - Kontynuuj w nowym wątku/konwersacji z kontekstem statusu

---

### [2x6] Integracja z LLM (opcjonalna)

**UWAGA**: Ta sekcja dotyczy TYLKO projektów wymagających integracji z modelami AI. Jeśli twoja aplikacja nie potrzebuje LLM - pomiń tę sekcję.

#### Krok 1: Wybór providera LLM
- **Opis**: Wybierz providera LLM zgodnie z wymaganiami projektu (TYLKO jeśli projekt wymaga AI)
- **Rola AI**: Pomoc w porównaniu różnych providerów i modeli
- **Kluczowe kryteria wyboru** (poproś AI o analizę):
  - Budżet (darmowe limity vs. płatne API)
  - Use case (chat, completion, embeddings, vision, audio)
  - Wymagania prywatności (cloud vs. local/self-hosted)
  - Structured outputs (czy potrzebne JSON mode?)
  - Latency i throughput
- **Zmienne środowiskowe**:
  - Dodaj API key do `.env`
  - NIGDY nie commituj kluczy do repo
  - Ustaw limity wydatków jeśli provider to umożliwia
- **Uwagi**:
  - Dla MVP rozpocznij od darmowych limitów lub najtańszych modeli
  - Testuj z małymi volumami przed skalowaniem

#### Krok 2: Plan serwisu LLM
- **Opis**: Zaplanuj architekturę integracji z LLM
- **Prompt**: [Generowanie planu serwisu LLM](https://10xrules.ai/prompts?org=10xdevs&collection=m2-bootstrap&segment=l6-business-logic&prompt=925e891f-7a5a-41aa-bafd-981616a29d1e)
- **Rola AI**: Pomoc w zaprojektowaniu abstrakcji nad API providera
- **Kluczowe decyzje**:
  - Bezpośrednie wywołania API vs. SDK vs. framework (LangChain, LlamaIndex)
  - Możliwość łatwej zamiany providera (adapter pattern)
  - Caching odpowiedzi (oszczędność kosztów)
  - Rate limiting i error handling
  - Monitoring (koszty, latency, błędy)
- **Uwagi**: Serwis powinien być uniwersalny - łatwa zmiana providera/modelu

#### Krok 3: Implementacja serwisu LLM
- **Opis**: Zaimplementuj serwis komunikacji z LLM
- **Prompt**: [Implementacja serwisu LLM](https://10xrules.ai/prompts?org=10xdevs&collection=m2-bootstrap&segment=l6-business-logic&prompt=6262a006-1df9-466a-be44-d8bffa691153)
- **Kluczowe elementy** (poproś AI o implementację):
  - Konfiguracja klienta (API key z .env)
  - Metody: completion, chat, embeddings (zależnie od use case)
  - Error handling (retry logic, fallback models, timeouty)
  - Logging wywołań (prompt, response, cost, latency)
- **Structured Outputs** (jeśli potrzebne):
  - Zapytaj AI jak dany provider obsługuje JSON mode
  - Implementuj walidację outputu (schema validation)
- **Rola AI**: Implementacja serwisu zgodnie z najlepszymi praktykami dla wybranego providera
- **Uwagi**:
  - Testuj z najtańszymi modelami
  - Implementuj circuit breaker dla ochrony przed nadmiernymi kosztami

#### Krok 4: Integracja z funkcjonalnością aplikacji
- **Opis**: Zintegruj serwis LLM z kluczową funkcjonalnością biznesową
- **Przykłady**:
  - Generowanie flashcards z tekstu
  - Sugestie przepisów na podstawie składników
  - Rekomendacje destynacji na podstawie preferencji
- **Rola AI**: Implementacja integracji zgodnie z wymaganiami z PRD
- **Uwagi**:
  - Rozpocznij od prostych przypadków
  - Rozbuduj o edge cases stopniowo
  - Monitoruj koszty w dashboardzie providera

---

## Zasoby i narzędzia

### Narzędzia do pracy z AI
- **10xRules.ai Prompt Library**: https://10xrules.ai/
- **10x-Magic-Docs**: https://github.com/przeprogramowani/10x-magic-docs (wzorce pracy z AI)
- **cursor.directory**: https://cursor.directory/ (gotowe reguły dla różnych stacków)
- **GitIngest**: https://gitingest.com/ (snapshot projektu dla AI)
- **Google AI Studio**: https://aistudio.google.com/ (darmowe testy modeli reasoningowych)

### Dokumentacja
Znajdź dokumentację dla wybranego stacku w oficjalnych źródłach:
- Framework frontendowy
- Backend/ORM
- Baza danych
- Provider LLM (jeśli dotyczy)
- Narzędzia do testowania

**Tip**: Zapytaj AI "Gdzie znajdę oficjalną dokumentację dla [technologia]?"

### Społeczność
- **Dyskusje - praktyka [10X]**: Zadawaj pytania o zadania praktyczne
- **Dyskusje - ogólne [10X]**: Ogólne dyskusje o AI i 10xDevs

---

## Zasady pracy

### Bezpieczeństwo
- ❌ NIGDY nie commituj plików `.env*` do repozytorium
- ✅ Dodaj `.env*` do `.gitignore` i `.cursorignore`
- ✅ Używaj sekretów GitHub dla danych wrażliwych w CI/CD
- ✅ Ustaw limity kredytowe na kluczach API (np. $1 dla testów)
- ✅ Włącz Privacy Mode w edytorach AI (Cursor, Copilot)
- ✅ Regularnie rotuj klucze API (co 3-6 miesięcy)

### Workflow Git
- ✅ Stosuj Conventional Commits:
  - `feat:` - nowa funkcjonalność
  - `fix:` - naprawa błędu
  - `chore:` - maintenance (dependencies, config)
  - `docs:` - dokumentacja
  - `refactor:` - refaktoryzacja bez zmian funkcjonalności
- ✅ Commituj zmiany po każdym działającym etapie
- ✅ Twórz checkpointy przed dużymi refaktoryzacjami
- ✅ Nazywaj branche opisowo (feat/auth, fix/login-error)

### Współpraca z AI (workflow 3×3)
- ✅ Zawsze przekazuj kontekst: PRD, tech-stack, db-plan, api-plan, ui-plan
- ✅ Używaj tagów XML dla strukturyzacji promptów
- ✅ Odwołuj się do plików przez `@` w edytorach AI
- ✅ Workflow 3×3:
  1. 3 kroki implementacji
  2. Code review + feedback
  3. Następne 3 kroki
  4. Repeat...
- ✅ Jeśli model się gubi:
  1. Zatrzymaj pracę
  2. Utwórz plik ze statusem implementacji
  3. Kontynuuj w nowym wątku z kontekstem statusu

### Wybór modeli AI
- **Planning & Architecture**: Modele reasoningowe (Gemini 2.5 Pro, GPT-5 Deep Reasoning)
- **Coding**: Wysokiej jakości modele (Claude 4.5 Sonnet, o3-mini)
- **Quick tasks**: Szybkie modele (Claude Haiku, GPT-4o-mini)
- **Context-heavy**: Duże context window (Gemini 2.5 Pro - 2M tokens)

### Testowanie
- ✅ Testy dodawaj na bieżąco, NIE na końcu projektu
- ✅ Unit testy: logika biznesowa, utils, serwisy
- ✅ E2E testy: user flows, krytyczne ścieżki
- ✅ Dedykowana baza dla E2E (nie local, nie prod)
- ✅ Czyszczenie danych testowych po każdej sesji (teardown)
- ❌ NIE testuj: prostych komponentów prezentacyjnych, third-party

---

## Najczęstsze pytania (FAQ)

**Q: Jaki stack technologiczny wybrać?**
A: Checklist jest uniwersalny - wybierz stack który:
   - Znasz lub chcesz się nauczyć
   - Ma aktywną społeczność i wsparcie AI (dobra dokumentacja)
   - Wspiera szybki development MVP

   Nie ma "najlepszego" stacku - każdy ma swoje trade-offs. Zapytaj AI o analizę porównawczą dla twojego use case.

**Q: Czy muszę publikować aplikację na produkcję?**
A: Dla certyfikatu podstawowego NIE. Dla certyfikatu z wyróżnieniem TAK.

**Q: Ile kosztuje zrealizowanie projektu?**
A: Minimum: $0
   - Baza danych: darmowe plany BaaS (Backend-as-a-Service) lub lokalna instalacja
   - LLM (jeśli potrzebne): darmowe limity większości providerów
   - Hosting: darmowe tier'y platform PaaS

   Maksimum dla MVP: $5-15/m
   - Zależy od wybranego stacku i potrzeb
   - Większość kosztów to LLM (jeśli używane intensywnie)

**Q: Jak długo zajmie zrealizowanie checklisty?**
A: Przy pracy 10-15h/tydzień: 3-4 tygodnie

**Q: Co jeśli utknę na którymś kroku?**
A: Zadaj pytanie w sekcji #Dyskusje - praktyka [10X] na platformie Circle. Społeczność i team 10xDevs pomogą!

---

**Powodzenia w budowie swojego projektu! 🚀**