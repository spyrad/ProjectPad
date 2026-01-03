<!DOCTYPE html>![](https://assets-v2.circle.so/hgl2k040pdcfqn7fkrees09oksyk)

## Wprowadzenie

Cześć! Na start drugiego modułu mamy dla Ciebie zupełnie nowy przewodnik, który pomoże ci zrealizować praktyczną część szkolenia 10xDevs. Oto, co znajdziesz poniżej:

* opis nadchodzących modułów 10xDevs
* rekomendacje modeli dla dwóch podejść - “budżet nie gra roli” oraz “liczę każdą złotówkę” ;)
* narzędzie Prompt Library - wszystkie najważniejsze prompty szkolenia w jednym miejscu
* narzędzie MVP Tracker - błyskawiczna ocena gotowości Twojego projektu
* kryteria certyfikacji

Zaczynamy!

## Nadchodzące moduły, czyli praktyka, praktyka i jeszcze raz praktyka

![](https://assets-v2.circle.so/uyl9m6khj28gzjmxweazzrccxoaa)

Nadchodzące etapy 10xDevs, gdzie AI będzie odgrywać kluczową rolę, można podzielić na 3 kategorie:

* Zbuduj MVP wymarzonego projektu i wypuść go w świat - moduły 2 i 3
* Wykorzystaj AI w projektach Legacy i brownfield - moduł 4
* Oblicza AI dla innowatorów - moduł 5

Oto, czym będziemy się zajmować w praktyce:

### 👉 Moduł 2 - AI-First MVP Bootstrap

W tym module zdefiniujesz **Minimum Viable Product (MVP)** i stworzysz szczegółowy **Product Requirements Document (PRD)**, który posłuży jako fundament i kluczowy kontekst dla asystenta AI. Następnie, w oparciu o specyfikację przejdziesz przez pierwszą iterację rozwijania projektu na środowisku lokalnym. W warstwie backendowej, zaprojektujesz i wdrożysz schemat bazy danych w **PostgreSQL** z wykorzystaniem **Supabase** i mechanizmu migracji. Nauczysz się, jak sprawnie tworzyć **REST API**, generując kontrakty (**DTOs**), walidację i endpointy przy użyciu iteracyjnego podejścia **3x3**.

W części frontendowej zbudujesz interfejs użytkownika w oparciu o **Reacta** osadzonego w **Astro**, wykorzystując do tego **Tailwind CSS** i bibliotekę komponentów **shadcn/ui**. Na koniec zintegrujesz całość z modelami językowymi (LLM) poprzez usługę **OpenRouter**, implementując logikę biznesową wykraczającą poza standardowe operacje CRUD.

### 👉 Moduł 3 - Going LIVE on Prod

W tym module przygotujesz swoją aplikację do wdrożenia produkcyjnego. Zaimplementujesz kompletny system uwierzytelniania przy pomocy **Supabase Auth**. Następnie stworzysz strategię testowania: przy wsparciu AI opracujesz Test Plan, napiszesz testy jednostkowe z **Vitest** oraz testy end-to-end z **Playwright**, które zweryfikują kluczowe ścieżki użytkownika. Przedstawimy ci eksperymentalne zastosowania modeli multimodalnych, które mogą automatycznie rozpoznawać krytyczne ścieżki użytkownika.

Kolejnym krokiem będzie podniesienie jakości twojego MVP. Zoptymalizujesz istniejące formularze przy użyciu **react-hook-form** i **Zod** oraz wdrożysz zaawansowane mechanizmy bezpieczeństwa, takie jak **Row-Level Security (RLS)** w Supabase. Procesy te zautomatyzujesz za pomocą **GitHub Actions**, konfigurując scenariusze Continuous Integration (CI) i Continuous Deployment (CD). W ostatniej lekcji wdrożysz aplikację na produkcję, wykorzystując **Cloudflare** lub konteneryzację z **Dockerem** na **Digital Ocean**. Pozwoli ci to uzyskać certyfikat z wyróżnieniem.

### 👉 Moduł 4 - Modernizacja legacy z AI

Dzięki lekcjom czwartego modułu nauczysz się modernizować istniejące projekty (legacy i brownfield) z pomocą AI w bezpieczny sposób. Pracę rozpoczniemy w popularnym projekcie **Excalidraw**, gdzie wygenerujemy dokumentację wdrożeniową, a na podstawie zgłoszenia błędu nauczysz się diagnozować problemy przez strategiczne rozmieszczanie logów. Wdrożysz testy regresji w innowacyjny sposób: wykorzystasz **multimodalne AI** do analizy nagrania wideo z działania aplikacji, na podstawie którego zaimplementujesz scenariusze testowe w **Playwright**.

Następnie wspólnie przejdziemy do modernizacji architektury, przeprowadzając warsztat **Event Storming** napędzany przez AI, aby zaplanować migrację z monolitu na architekturę asynchroniczną i wejść w świat **Domain-Driven Design (DDD)**. Na poziomie kodu nauczymy się łączyć klasyczne transformacje statyczne (**codemods**) z elastycznością AI - pozwoli nam to przemigrować projekt z **JavaScriptu na TypeScript**.

### 👉 Moduł 5 - Innowacje techniczne z AI

W ostatnim module szkolenia skupimy się na kontekście zespołu oraz na twoim rozwoju w epoce AI. Na start celem będzie przekształcenie Agenta AI w pełnoprawnego członka zespołu. Nauczysz się rozszerzać jego wiedzę za pomocą **in-context learningu** i standardu **llms.txt**. Zbudujesz także własne serwery w standardzie **Model Context Protocol (MCP)**, np. w **TypeScript** na **Cloudflare Workers**.

Zobaczysz również jak krok po kroku integrować Agenta AI ze scenariuszami CI/CD w **GitHub Actions**, wykorzystując zarówno podejście ręczne, jak i **Claude Agent SDK**. Poznasz również framework **Promptfoo** do budowy środowisk testowych (evals), co pozwoli Ci budować osobiste i zespołowe suity testów dla LLMów - tych obecnych oraz prezentowanych w przyszłości.

Na zakończenie zaprosimy cię na specjalny odcinek podcastu, w którym omawiamy potencjalne ścieżki rozwoju programisty w epoce AI. Trzymamy kciuki, abyś pozostał z nami do końca!

## Rekomendacje modeli na część praktyczną (Październik 2025)

![](https://assets-v2.circle.so/7rmvjokpv4pdx38ggltorvcqn9dd)

Tworzenie kursów poświęconych sztucznej inteligencji to prawdziwe wyzwanie - modele AI rozwijają się w błyskawicznym tempie, a premiery zaskakują nas często w momencie wydawania wcześniej nagranych materiałów. Na szczęście, wersja modelu to tylko detal nad którym przeważa sposób posługiwania się AI na co dzień.

Pracując z materiałami wideo w kolejnych lekcjach, **zachęcamy Cię więc do realizowania przedstawionych scenariuszy programistycznych w podobny sposób jak na filmie** – ich logika, cele i techniki pozostają w pełni aktualne i wartościowe. W tym kontekście, modele nowej generacji mogą dane zadanie tylko ułatwić, a nie utrudnić (jeśli jest inaczej - mówimy o tym).

Aby jednak zapewnić Ci pracę na najnowszych narzędziach, zwracaj szczególną uwagę na **dodatkowe oznaczenia** najnowszych modeli w treści lekcji. Znajdziesz w nich nasze **zaktualizowane rekomendacje na październik 2025**, co pozwoli Ci połączyć uniwersalne strategie z najnowocześniejszą technologią.

Bazując na dostępnych benchmarkach oraz własnym doświadczeniu, w **październiku 2025** będziemy rekomendować następujące narzędzia:

### **🧠 Modele do sesji planistycznych**

👉 Przykład zadania: Przeanalizuj wymagania projektowe w poszukiwaniu błędnych założeń, przeprowadź warsztaty koncepcyjne, wykonaj analizę wybranego segmentu rynku.

![](https://assets-v2.circle.so/92xz8y8lua6chws489i1xfyc4pne)

Rekomendacje State-of-the-Art: Gemini 2.5 Pro, GPT-5-Medium/High, Claude 4.5 Extended Thinking

Rekomendacje budżetowe: Grok 4 Fast Reasoning

### **👨‍💻 Modele do kodowania**

### Problemy o wysokiej złożoności

👉 Przykład zadania: Wprowadź nową funkcjonalność end-to-end, przeprowadź kompleksowe debugowanie, wykonaj refaktoryzację w oparciu o wiele plików i zależności.

![](https://assets-v2.circle.so/9n88q0s59rj28mswq99eeseysnsb)

Rekomendacje State-of-the-Art: Claude Sonnet 4.5 Thinking, GPT-5-Codex, Gemini 2.5 Pro

Rekomendacje budżetowe: **GPT-5 Low, Grok Code Fast 1**

### Problemy o niskiej złożoności

👉 Przykład zadania: Zamień parametry funkcji na dedykowany interfejs, dodaj nowe pole do klasy, zaimplementuj krótki, popularny algorytm.

![](https://assets-v2.circle.so/x33h5oqkvd7kicwozd413bq0hafm)

Rekomendacje State-of-the-Art: Claude Sonnet 4.5 Thinking, GPT-5-Codex, Gemini 2.5 Pro

Rekomendacje budżetowe: **Grok Code Fast 1**

---

Pełne omówienie rekomendowanych modeli znajdziesz w lekcji [#\[1x1\] Wybór modelu do programowania wspomaganego AI](https://bravecourses.circle.so/c/lekcje-10x2/sections/681379/lessons/2580241). 

## Prompt Library w 10xRules.ai

![](https://assets-v2.circle.so/nmwqk3weukkbl8hgkc6eqj5kj6p4)

Dzięki niesamowitym możliwościom Claude Code 2.0 oraz Codex CLI przygotowaliśmy dla Was nowy moduł w aplikacji 10xRules.ai o nazwie Prompt Library. 

Za jego pomocą uzyskacie dostęp do wszystkich promptów wykorzystywanych w modułach 2-5 10xDevs. 

Koniecznie obejrzyj poniższą prezentację narzędzia, aby wiedzieć jak z niego korzystać w nadchodzących tygodniach:

[FRAGMENT VIDEO](https://player.vimeo.com/video/1124629854?app_id=122963)

**👉 Ważne**: Aby uzyskać dostęp do Prompt Library skorzystaj z tego linku: [Zaproszenie do organizacji 10xDevs w 10xRules.ai Prompt Library](https://10xrules.ai/invites/hRumK9NKNSgkEuKYojXj%5FbzYfmqhFKFPW5SJ7StqygQ).

* Jeżeli masz już konto w 10xRules.ai, zaloguj się na nie w pierwszej kolejności a następnie wejdź w powyższego linku.
* Jeżeli nie masz jeszcze konta, utwórz je za pomocą powyższego linku, potwierdź weryfikację maila i uzyskasz dostęp do [10xRules.ai/prompts](https://10xrules.ai/prompts).
![](https://assets-v2.circle.so/nh8b2kigkv4iwsa61lty6mbyw5ps)

Dostajesz taki komunikat? Kliknij w [link z zaproszeniem](https://10xrules.ai/invites/hRumK9NKNSgkEuKYojXj%5FbzYfmqhFKFPW5SJ7StqygQ).

## Tracker statusu projektu zaliczeniowego

![](https://assets-v2.circle.so/s4ii1atlz5lb4s09jr25ejz77akm)

Dla uczestników, którzy będą realizowali projekt zaliczeniowy w formie webowej przygotowaliśmy serwer MCP, który automatycznie sprawdzi status realizacji kryteriów certyfikacyjnych. Zobacz na filmie:

[FRAGMENT VIDEO](https://player.vimeo.com/video/1124629837?app_id=122963)

Korzystając z narzędzia zalecamy wykorzystanie modelu grok-code-fast-1\. W filmie wykorzystaliśmy prompta _“Check status of my project. use 10x-mvp-tracker mcp tool&quot;._

Szczegóły narzędzia i sposób konfiguracji serwera MCP dostosowany do wybranego narzędzia AI znajdziecie w repozytorium [10x-mvp-tracker](https://github.com/przeprogramowani/10x-mvp-tracker). To nowe narzędzie, mamy nadzieję że będzie dla Was pomocne. 

## Certyfikacja projektu - przewodnik

![](https://assets-v2.circle.so/b7grvaxm51hcbkddebeuv24aq5qj)

Najważniejsze informacje o procesie certyfikacji, a także polecaną przez nas formę nauki i podejście do organizacji czasu w trakcie szkolenia omawiamy we wpisie [#Projekt zaliczeniowy (10xDevs II)](https://bravecourses.circle.so/c/informacje-i-ogloszenia-10x-7e3fcb/projekt-zaliczeniowy).

Najważniejsze daty, które raz jeszcze przypominamy:

### 📅 Terminy Certyfikacji

* **Pierwszy:** 16.11.2025
* **Drugi:** 14.12.2025
* **Trzeci (ostateczny):** 01.02.2026

Każdy termin to wskazany dzień do 23:59.  
Po każdym terminie gwarantujemy projektowy feedback **do dwóch tygodni.**

**🥇 WAŻNE: Wyróżnienia** przyznajemy tylko w przypadku pierwszego i drugiego terminu (z zastrzeżeniem, że w drugim terminie będzie to trudniejsze).

**🎸 DEMO DAY:** **Projekty wyróżnione w pierwszym terminie** mają szansę trafić na demo day - webinar prezentujący najlepsze projekty z edycji.

## Startujemy!

Trzymamy kciuki za realizację projektu, udaną certyfikację i oczywiście współpracę ze społecznością 10xDevs II - na wszystkie pytania i wątpliwości do części praktycznej będziemy na bieżąco odpowiadać w sekcji: [#Dyskusje - praktyka \[10X2\]](https://bravecourses.circle.so/c/dyskusje-praktyka-10x2) \- do dzieła!

![](https://assets-v2.circle.so/ekrtcr8j44qd531ut1i2iwox5c9h)