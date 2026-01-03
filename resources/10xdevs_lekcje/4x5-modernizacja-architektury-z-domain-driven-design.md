---
title: "[4x5] Modernizacja architektury z Domain-Driven Design"
course: "10xdevs-2"
source: "Przeprogramowani.pl"
exported: "2025-11-09"
format: "markdown"
---

![Ilustracja z lekcji](https://assets-v2.circle.so/4735yl8ectrvqy34jvmiahx9lv7n)

## Wprowadzenie

Przedstawiona w poprzedniej lekcji modernizacja kodu może złagodzić część najbardziej uciążliwych problemów z utrzymaniem projektu legacy, takich jak nieczytelny kod, brak typowania, niska jakość testów czy trudności z integracją nowych bibliotek. Przejście z JavaScriptu na TypeScript, uporządkowanie struktury katalogów czy wprowadzenie narzędzi do statycznej analizy kodu to kroki, które realnie poprawiają codzienną pracę zespołu.

Nie rozwiążą one jednak głębszych problemów, takich jak nieprzemyślany podział odpowiedzialności między modułami, zbyt silne sprzężenie komponentów, brak wyraźnych granic między warstwami aplikacji czy zależność od przestarzałych wzorców projektowych. Bez zmian w architekturze system nadal będzie trudny w rozwoju, a każda nowa funkcjonalność może wymagać kosztownych obejść i kompromisów

### Modernizacja architektury z AI

Architektura aplikacji to jedno z najtrudniejszych wyzwań, przed którymi staje każdy doświadczony programista. To obszar, w którym nie ma jednoznacznie uniwersalnych rozwiązań ani szablonów pasujących do każdego przypadku. Każdy projekt ma swój unikalny zestaw wymagań, ograniczeń technicznych, biznesowych i organizacyjnych, które wpływają na wybór optymalnego podejścia architektonicznego.

**Już na starcie chcemy jasno zaznaczyć:** Generatywne AI nie jest magicznym rozwiązaniem wszystkich problemów architektonicznych. Nie zastąpi dogłębnego zrozumienia domeny biznesowej, doświadczenia zespołu czy wiedzy na temat specyficznych ograniczeń technologicznych projektu.

Zamiast tego, Generatywne AI może stać się wartościowym sojusznikiem w procesie projektowania architektury - to dla nas narzędzie, które może:

- Wzbogacić proces myślowy i modelowanie systemu
- Zaproponować alternatywne ścieżki, o których nie mieliśmy pojęcia
- Pomóc w eksploracji różnych rozwiązań konkretnych problemów
- Przyspieszyć analizę trade-offów między różnymi opcjami architektonicznymi

Naszym celem jest pokazanie, jak mądrze wykorzystać możliwości AI, zachowując przy tym krytyczne myślenie i świadomość, że ostateczne decyzje architektoniczne zawsze pozostają w Twoich rękach.

### Modernizacja w kierunku zgodności z domeną biznesową

Wraz z dynamicznym rozwojem biznesu, wspierające go oprogramowanie musi nie tylko nadążać za zmianami, ale także precyzyjnie odzwierciedlać skomplikowane procesy i reguły rządzące daną branżą. Zbyt często jednak warstwa techniczna oddala się od rzeczywistych potrzeb biznesowych, co prowadzi do powstawania systemów trudnych w utrzymaniu i nie w pełni efektywnych.

Odpowiedzią na te wyzwania jest podejście znane jako **Domain-Driven Design (DDD)**. To nie jest konkretna technologia ani framework, ale filozofia projektowania oprogramowania, która stawia w centrum **domenę biznesową** \- czyli pewien pewien wycinek rzeczywistości, dla którego tworzymy rozwiązanie. Celem jest tworzenie oprogramowania, którego struktura, nazewnictwo i relacje między komponentami są bezpośrednim odzwierciedleniem modelu biznesowego.

W kontekście DDD, zastosowanie AI, w tym największych modeli językowych, wygląda naprawdę obiecująco. W końcu są to rozwiązania trenowane na ogromnych zbiorach danych, które widziały setki raportów, analiz i dokumentów z zakresu różnych dziedzin biznesowych. Przetestujemy to w praktyce przyglądając się tajnikom świata marketingu, w którym działa modernizowany przez nas system.

## Strategiczne rozpoznanie domeny biznesowej

Pierwszym krokiem modernizacji jest zanurzenie się w specyfikę badanego obszaru. W naszym przypadku jest to domena marketingu, ze szczególnym uwzględnieniem problematyki zarządzania treściami, które wspiera "10xCMS". Aby system rozwijał się zgodnie z “regułami gry”, musimy pozyskać wiedzę ekspercką, która często bywa ukryta lub rozproszona. Zastosujemy tu dwutorowe podejście wspierane przez AI.

Po pierwsze, przeprowadzimy dialog z wirtualnym ekspertem domenowym, odgrywającym rolę doświadczonego marketera. Celem tego etapu jest wstępne zidentyfikowanie kluczowych procesów, bolączek oraz zaczątków Języka Wszechobecnego (Ubiquitous Language).

Równolegle, wykorzystamy potencjał analityczny modeli Gemini, ChatGPT i [Claude.ai](http://claude.ai/) do przeprowadzenia głębokiego badania - tzw. "deep research". To proces, dzięki któremu Agenci AI zbiorą dla nas porcję kluczowych informacji na zadany temat. Przetestujmy obie ścieżki w praktyce:

🎥 **VIDEO**: [Watch here](https://player.vimeo.com/video/1128455350?app_id=122963)

Prompt do rozpoczęcia konsultacji z AI:

[domain-overview.md](https://assets-v2.circle.so/8328rlq60hhapxbvdt07ld3hty4t)

Ten prompt znajdziesz również [w Prompt Library](https://10xrules.ai/prompts?org=10xdevs&collection=m4-legacy&segment=domain-driven-design&prompt=e312deb5-460d-4365-9252-f771ffa8d1f9).

Metody, które właśnie przeanalizowaliśmy – dialog z wirtualnym ekspertem i głęboki research AI – zakładają, że to sztuczna inteligencja jest dla nas głównym _źródłem_ wiedzy o domenie. Jest to niezwykle przydatny scenariusz w sytuacji, gdy wchodzimy w zupełnie nowy dla nas obszar, dokumentacja jest szczątkowa lub nie mamy bezpośredniego dostępu do ludzi z biznesu.

Istnieje jednak **zupełnie alternatywny scenariusz**, równie częsty w projektach (szczególnie typu legacy). Co w sytuacji, gdy to _my_ – lub nasi koledzy z zespołu – posiadamy kluczową wiedzę domenową? Co, jeśli rozmawialiśmy z ekspertami, ale cała ta wiedza jest teraz nieuporządkowana, "ukryta" w naszych głowach, rozproszona w dziesiątkach notatek lub po prostu nie do końca uświadomiona?

W takim przypadku nie potrzebujemy, aby AI _udawało_ eksperta. Potrzebujemy partnera do dyskusji, który pomoże _nam_ tę wiedzę wydobyć, zwizualizować i ustrukturyzować.

Zamiast więc kontynuować pasywną analizę opartą na zewnętrznych danych, zbadajmy teraz **alternatywne podejście do zbierania informacji**. Wykorzystamy jedną z najskuteczniejszych technik warsztatowych DDD, ale w nowej, wspomaganej odsłonie.

W kolejnym fragmencie odwrócimy role. To _my_ wcielimy się w postać eksperta domenowego dysponującego wiedzą o procesach. Generatywna AI przejmie natomiast rolę _facylitatora_ – moderatora warsztatu, którego zadaniem będzie, krok po kroku, "wyciąganie" od nas tej wiedzy, zadawanie sondujących pytań i organizowanie chaosu informacyjnego.

## Event Storming Workshop z AI

Event Storming to warsztatowa technika modelowania procesów biznesowych opracowana przez Alberto Brandoliniego, mocno związana z podejściem Domain-Driven Designu. Polega na kolektywnym odkrywaniu i mapowaniu zdarzeń zachodzących w systemie przy pomocy prostych, kolorowych karteczek samoprzylepnych. Tradycyjnie odbywa się w formie spotkania, podczas którego uczestnicy - programiści, analitycy, eksperci domenowi i interesariusze biznesowi - współpracują przy dużej fizycznej przestrzeni (najczęściej ścianie pokrytej papierem).

Siłą Event Stormingu jest jego prostota i skuteczność - pozwala szybko zbudować wspólne zrozumienie domeny biznesowej, zidentyfikować problemy i odkryć potencjalne rozwiązania. Warsztat ten zwykle przebiega w określonych fazach:

1. **Odkrywanie zdarzeń domenowych** \- identyfikacja wszystkich istotnych zdarzeń w systemie
2. **Dodawanie komend** \- określenie, co wywołuje te zdarzenia
3. **Identyfikacja aktorów** \- kto lub co inicjuje poszczególne komendy
4. **Agregowanie w konteksty** \- grupowanie powiązanych elementów
5. **Definiowanie polityk i reguł biznesowych** \- co dzieje się w odpowiedzi na zdarzenia

## Dlaczego Event Storming odbywa się "na żywo"?

Event Storming tradycyjnie przeprowadza się w trybie stacjonarnym, z fizycznym spotkaniem wszystkich zaangażowanych osób. Jest ku temu kilka istotnych powodów:

- **Dynamika grupowa** \- bezpośrednia interakcja sprzyja szybkiej wymianie pomysłów i natychmiastowej informacji zwrotnej
- **Komunikacja niewerbalna** \- gesty, mimika i ton głosu dostarczają dodatkowego kontekstu
- **Demokratyzacja procesu** \- łatwiejsze włączenie wszystkich uczestników, niezależnie od ich pozycji w firmie
- **Kreatywny chaos** \- spontaniczne odkrycia często wynikają z nieformalnych dyskusji "na boku"

## AI jako moderator Event Stormingu

W poniższym przykładzie pokażemy, jak przeprowadzić mini-warsztat Event Stormingu z wykorzystaniem AI jako moderatora. Pamiętajmy jednak, że narzędzie to najlepiej sprawdza się jako uzupełnienie, a nie całkowite zastąpienie tradycyjnych technik. Kluczowe pozostaje krytyczne podejście do sugestii AI i weryfikowanie ich zgodności z rzeczywistymi potrzebami biznesowymi.

🎥 **VIDEO**: [Watch here](https://player.vimeo.com/video/1128495945?app_id=122963)

Do przeprowadzenia podobnych warsztatów w swoim IDE możesz wykorzystać poniższe pliki z instrukcjami:

Warsztat w przeglądarce (np. Claude.ai):

[remote-event-storming.md](https://assets-v2.circle.so/inpgu5dcg1pwgso230rlt83o4qmn)

Warsztat lokalny (np. Cursor lub Claude Code) - zamiast artefaktu użyj pliku **whiteboard.md**:

[event-storming.md](https://assets-v2.circle.so/w7w5h1pavl01sx1sueqbti6laft5)[whiteboard.md](https://assets-v2.circle.so/oj040pm7xzb2mnff2waqgpqyxn5b)

Prompt do warsztatów w obu wersjach (whiteboard vs artefakt) znajdziesz również [w Prompt Library](https://10xrules.ai/prompts?org=10xdevs&collection=m4-legacy&segment=domain-driven-design&prompt=454f0ce7-a205-4f7c-9023-ac84cdb67225).

### Jak działa Event Storming z moderatorem AI?

Model językowy prowadzi ustrukturyzowaną konwersację, która symuluje przebieg tradycyjnego warsztatu:

1. **Facylitacja procesu** \- AI przeprowadza nas przez kolejne fazy warsztatu, zadając ukierunkowane pytania i sugerując obszary wymagające głębszej analizy
2. **Dokumentacja na bieżąco** \- wszystkie odkryte elementy są natychmiast zapisywane i wizualizowane w formie diagramu Mermaid (nasz wirtualny whiteboard)
3. **Pomoc w identyfikacji elementów** \- AI może sugerować potencjalne zdarzenia, komendy czy aktorów na podstawie analizy kontekstu rozmowy
4. **Dynamiczna adaptacja** \- diagram jest aktualizowany w czasie rzeczywistym, pozwalając na natychmiastowe śledzenie postępów i iteracyjne udoskonalanie modelu

### Zalety podejścia opartego na AI

- **Dostępność** \- możliwość przeprowadzenia warsztatu w dowolnym miejscu i czasie
- **Ślad cyfrowy** \- automatyczna dokumentacja całego procesu
- **Strukturyzacja** \- AI pomaga utrzymać focus na kolejnych krokach metodyki
- **Inspiracja** \- model może sugerować elementy, które moglibyśmy przeoczyć
- **Szybki start** \- mniejsza bariera wejścia dla osób nieprzyzwyczajonych do Event Stormingu

Zachęcamy do przeprowadzanie krótkiej, nawet 15-20 minutowej sesji Event Stormingu w obszarze, który jest dla ciebie istotny - może to być projekt w ramach 10xDevs albo dowolne inne przedsięwzięcie, gdzie modelowanie procesu jest niezbędne do skutecznej implementacji.

Nawet jeśli nie wykorzystasz tego przykładu w sposób bezpośredni, to zwróć uwagę jak może wyglądać planowanie promptów konwersacyjnych, gdzie AI wciela się w moderatora spotkania.

Zastanów się, w jakich innych obszarach możesz wykorzystać tę wiedzę.

## Analiza strategiczna - subdomeny i bounded contexty

Po rozpoznaniu domeny na dwa sposoby - poprzez dialog z ekspertem domenowym oraz wizualizację i uporządkowanie tego, co przechowujemy w głowie - chcemy zbliżyć się do technicznej części naszego projektu. Zanim przejdziemy na poziom kodu, jeszcze przez chwilę pozostaniemy na nieco wyższym poziomie - takim, który pozwoli nam zauważyć duże składowe naszego projektu. To jest sedno **strategicznego Domain-Driven Design**.

### Czym są Subdomeny?

Musimy zdać sobie sprawę, że nie każda część naszego systemu jest tak samo ważna z biznesowego punktu widzenia. Ogólna domena biznesowa (np. "zarządzanie treścią w świecie marketingu" w 10xCMS) dzieli się na mniejsze obszary, czyli właśnie **subdomeny**. Ich identyfikacja jest kluczowa, by mądrze alokować zasoby – czas, pieniądze i najlepszych programistów.

W DDD wyróżniamy trzy główne typy subdomen:

- **Core Domain:** To jest absolutne serce naszego biznesu. To tutaj tkwi nasza unikalna wartość i przewaga konkurencyjna. Zwykle wiąże się ona z największą złożonością i wymaga ostrożności w definiowaniu wymagań.
- **Supporting Subdomain:** To procesy, które są niezbędne do działania domeny rdzennej, ale same w sobie nie stanowią przewagi konkurencyjnej. Często są dość skomplikowane i specyficzne dla naszej firmy, więc nie da się ich łatwo kupić.
- **Generic Subdomain:** To są problemy "rozwiązane". Standardowe funkcjonalności, które są potrzebne, ale tak samo, jak w setkach innych firm. Przykłady to "Autentykacja i zarządzanie użytkownikami", "Wysyłka powiadomień e-mail" czy "System płatności". Złotą zasadą jest: **nigdy nie implementuj domeny generycznej od zera**, jeśli nie musisz.

W pierwszej części analizy naszym celem będzie odkrycie subdomen, które wpływają na kształt i działanie systemu takiego jak 10xCMS. To jednak nie wszystko.

### Czym jest Bounded Context (Kontekst Ograniczony)?

Gdy wiemy już, _co_ jest dla nas ważne (subdomeny), musimy zastanowić się, _jak_ to zamodelować i zaimplementować. I tu pojawia się najważniejsze pojęcie strategicznego DDD: **Bounded Context (Kontekst Ograniczony)**.

Kontekst Ograniczony to **granica językowa i implementacyjna**. To precyzyjnie wyznaczony obszar, wewnątrz którego nasz Język Wszechobecny (Ubiquitous Language) ma jedno, spójne i niepodważalne znaczenie.

Klasyczny przykład: pomyśl o słowie "Klient".

- W Kontekście **Sprzedaży**, "Klient" to ktoś, kto ma historię zakupów, przypisany rabat i potencjał na przyszłe transakcje.
- W Kontekście **Wsparcia Technicznego**, "Klient" to ktoś, kto ma aktywną umowę serwisową i historię zgłoszeń (ticketów).

Próba stworzenia jednego, wspólnego modelu "Klienta" dla obu tych kontekstów prowadzi do koszmaru – modelu, który jest przeładowany, ma mnóstwo pól i skomplikowaną logikę warunkową.

Bounded Context mówi: "Nie rób tego!". Zamiast tego stwórz dwa osobne modele. W kontekście Sales będzie model Sales.Customer, a w kontekście Support będzie Support.Customer. Oba modele będą reprezentować tę samą osobę w świecie rzeczywistym, ale będą zawierać tylko te dane i logikę, które są potrzebne w _ich własnym_ kontekście.

Chcemy, aby każda subdomena była chroniona wewnątrz własnego, dobrze zdefiniowanego Bounded Contextu**.** To daje nam autonomię zespołów, chroni nasz najważniejszy model biznesowy przed "zanieczyszczeniem" przez inne części systemu i pozwala na niezależny rozwój i wdrażanie poszczególnych modułów.

Zidentyfikowanie subdomen i wyznaczenie granic Bounded Contexts to absolutny fundament nowoczesnej architektury rozwijanej w duchu DDD. Kiedy już mamy te klocki, pojawia się kolejne pytanie: jak mają się one ze sobą komunikować?

To prowadzi nas prosto do kolejnego kluczowego elementu strategicznego DDD: **Mapowania Kontekstów (Context Mapping)**. 

### Jak AI może pomóc w analizie strategicznej?

Przygotowane wcześniej dokumenty z opracowaniem domeny biznesowej będą wsadem do analizy strategicznej. Wspólnie z AI wykonamy klasyfikację subdomen, określimy konteksty, odkryjemy propozycję używanej terminologii i poznamy sprawdzone wzorce integracyjne:

🎥 **VIDEO**: [Watch here](https://player.vimeo.com/video/1128455452?app_id=122963)

Prompt do analizy znajdziesz [w Prompt Library](https://10xrules.ai/prompts?org=10xdevs&collection=m4-legacy&segment=domain-driven-design&prompt=7dc96777-4ca1-4aee-a1df-1ad2cfcea0da).

## Wdrożenie wzorców taktycznych - Content Studio

Przejście od strategicznego "co" do taktycznego "jak" jest momentem, w którym architektura spotyka się z kodem. Zdefiniowany w trakcie analizy Bounded Context, **"Content Studio"**, to idealne pole do zastosowania wzorców taktycznych DDD. Celem nie jest już tylko "żeby działało", ale aby struktura kodu – nazwy klas, metody i relacje między nimi – aktywnie modelowała i chroniła logikę biznesową.

Stosując wzorce takie jak Agregaty, Obiekty Wartości i Repozytoria, tworzymy kod, który nie jest tylko techniczną implementacją – staje się on żywym, precyzyjnym modelem domeny biznesowej. To kod, który łatwiej zrozumieć, bezpieczniej modyfikować i skuteczniej rozwijać wraz ze zmieniającymi się wymaganiami biznesu.

Zobaczymy to na kolejnym fragmencie:

🎥 **VIDEO**: [Watch here](https://player.vimeo.com/video/1128460049?app_id=122963)

Prompt startowy znajdziesz [w Prompt Library](https://10xrules.ai/prompts?org=10xdevs&collection=m4-legacy&segment=domain-driven-design&prompt=8344c81b-b447-4795-8ee0-1798decdd280).

## Druga strona medalu - na co uważać rozwijając architekturę do AI?

Entuzjazm związany z wykorzystaniem AI w projektowaniu architektury jest uzasadniony, ale byłoby nieodpowiedzialnością nie wspomnieć o ryzykach. Cechy modeli językowych, które czynią je tak potężnymi, mogą stać się poważną przeszkodą, jeśli nie będziemy ich świadomi. Naiwne zaufanie do sugestii AI w tak krytycznym obszarze jak architektura może prowadzić do kosztownych błędów.

Oto, jak specyfika LLM-ów może negatywnie wpłynąć na opisane wcześniej praktyki:

### 1\. Halucynacje jako fałszywe reguły biznesowe

Kiedy prosimy AI o wcielenie się w rolę **wirtualnego eksperta domenowego** (jak w naszej pierwszej metodzie), jesteśmy szczególnie narażeni na halucynacje. W tym kontekście "zmyślona" informacja nie jest tylko ciekawostką – staje się **fałszywym wymaganiem biznesowym**.

- **Ryzyko:** AI może z pełnym przekonaniem opisać nieistniejący proces marketingowy, wymyślić "typową bolączkę" użytkowników, która nie ma pokrycia w rzeczywistości, lub zaproponować termin do Języka Wszechobecnego, który wprowadza w błąd.
- **Konsekwencje:** Zespół może stracić tygodnie na projektowanie i implementowanie funkcjonalności, która rozwiązuje nieistniejący problem.

### 2\. Pułapka uśredniania i pozorna kompetencja

Modele LLM są trenowane na ogromnych, ale **generycznych zbiorach danych**. Ich wiedza to statystyczna średnia tego, co można znaleźć w internecie. To fundamentalny problem przy identyfikacji **domeny rdzennej (Core Domain)**.

- **Ryzyko:** Twoja domena rdzenna to z definicji coś **unikalnego** – to przewaga konkurencyjna Twojej firmy. AI, z natury skłonne do uśredniania, będzie miało tendencję do klasyfikowania Twoich unikalnych procesów jako "standardowych" lub "wspierających" (Supporting/Generic).
- **Konsekwencje:** Możesz nieświadomie "zlecić" AI zaprojektowanie Twojej przewagi konkurencyjnej tak, jakby była zwykłym modułem logowania. Zamiast inwestować w unikalny model, otrzymasz generyczne rozwiązanie, które osłabi pozycję biznesową produktu.

### 3\. Brak zrozumienia niuansów domeny

Podczas warsztatów **Event Storming**, AI pełni rolę facylitatora. Problem w tym, że model nie _rozumie_ logiki biznesowej – on tylko doskonale **naśladuje wzorce konwersacyjne** facylitatora.

- **Ryzyko:** Ludzki facylitator wyłapuje subtelne niespójności logiczne ("Chwila, mówiłeś wcześniej, że _Klient_ może to zrobić, a teraz mówisz, że tylko _Administrator_. Jak jest naprawdę?"). AI często tego nie potrafi. Będzie skrupulatnie zapisywać sprzeczne informacje, traktując je jako kolejne fakty do umieszczenia na diagramie (efekt potwierdzenia).
- **Konsekwencje:** Otrzymany diagram (np. Mermaid) może być technicznie poprawny, ale logicznie niespójny. Zawsze poddawaj tego typu artefakty rzeczowej ocenie.

### 4\. Ograniczenia kontekstu i "zapominanie"

Długie sesje modelowania strategicznego, takie jak mapowanie kontekstów czy Event Storming, dość szybko zapełniają okno kontekstowe modelu.

- **Ryzyko:** AI może "zapomnieć" o kluczowym zdarzeniu domenowym lub regule biznesowej, którą zdefiniowałeś na początku rozmowy. W połowie warsztatu jego sugestie mogą stać się sprzeczne z tym, co ustaliliście godzinę wcześniej. Unikaj tego efektu poprzez cząstkowe podsumowania rozmów.
- **Konsekwencje:** Model staje się zawodnym partnerem. Utrzymanie spójności całego modelu biznesowego spada wyłącznie na barki człowieka, który musi stale weryfikować, czy AI "pamięta" wszystkie założenia.

### 5\. Zbyt "czyste" i akademickie wzorce taktyczne

Gdy prosimy AI o pomoc we **wdrożeniu wzorców taktycznych** (Agregaty, Obiekty Wartości), model ma tendencję do generowania kodu, który jest **akademicko poprawny, ale czasami niepraktyczny**.

- **Ryzyko:** AI może zaproponować książkową implementację Agregatu, która w teorii wygląda pięknie, ale w praktyce (np. ze względu na wydajność lub specyficzne wymagania) jest nieefektywna. Może też tworzyć nadmiernie skomplikowane obiekty tam, gdzie wystarczyłoby proste rozwiązanie.
- **Konsekwencje:** Otrzymujemy kod, który jest zbyt złożony i sztywny. Zamiast elastyczności, zyskujemy architekturę, którą trudno dostosować do rzeczywistych zmian, ponieważ jest "zabetonowana" przez dogmatycznie zaimplementowane wzorce.

Ostatecznie, największym zagrożeniem jest **rezygnacja z krytycznego myślenia**. AI prezentuje swoje odpowiedzi (nawet te błędne) w sposób płynny i przekonujący. Łatwo jest przyjąć jego propozycję Bounded Contextu czy Agregatu za pewnik.

W rzeczywistości każda sugestia AI musi być traktowana jako hipoteza do weryfikacji, a nie jako gotowe rozwiązanie.

## 🏁 Podsumowanie lekcji

Generatywne AI nie zastępuje wiedzy i doświadczenia architekta, ale może znacząco przyspieszyć proces uczenia się i eksplorowania nowych koncepcji. Wykorzystując AI jako partnera w procesie projektowania, możemy szybciej testować różne podejścia, otrzymywać natychmiastową informację zwrotną i stopniowo udoskonalać nasze rozwiązania.

Pamiętajmy jednak, że ostateczna odpowiedzialność za podjęte decyzje architektoniczne zawsze spoczywa na nas. AI jest narzędziem, które poszerza nasze możliwości, ale to my, jako architekci i programiści, decydujemy o kształcie systemów, które tworzymy.

Zachęcamy do dalszego zgłębiania tematów takich jak:

- [**Event-Driven Architecture**](https://youtu.be/STKCRSUsyP0?si=Yghkd57Pr2eDSGJ5) \- projektowanie systemów opartych o zdarzenia
- [**Domain-Driven Design**](https://www.domainlanguage.com/ddd/blue-book/) \- głębsze zrozumienie modelowania domeny biznesowej
- [**Mikroserwisy**](https://youtu.be/j2AQ9eTZ3-0?si=QN9o%5FuKOdATh8zeh) \- budowa systemów złożonych z małych, niezależnych usług
- [**Reactive Systems**](https://youtu.be/tKRa0O7aepo?si=S%5FY%5FpnR569FgM4Aq) \- tworzenie głębokich systemów o dużej responsywności

Każdy z tych obszarów można pogłębiać zarówno z pomocą AI jako partnera do nauki, jak i w dedykowanych materiałach i programach szkoleniowych.

## 👨‍💻 Ćwiczenia praktyczne

### **Zadanie 1: Przeprowadź warsztat modelowania procesu z AI (Event Storming)**

**Cel:** Poznaj możliwości konwersacyjnego AI w planowaniu architektury aplikacji

**Instrukcje:**

1. Pobierz prompty warsztatowe - event-storming.md oraz whiteboard.md (pobierz z lekcji)
2. Wybierz jeden z procesów, który możesz w przyszłości wprowadzić w swoim projekcie (np. system powtórek oparty o fiszki, zarządzanie treningami na siłowni, rodzinny kalendarz wydarzeń)
3. Uruchom konwersację z wybranym modelem i przejdź przez kolejne części warsztatu, planując docelowe rozwiązanie i jego składowe.

### **Zadanie 2: Wdrożenie Workflow & Governance w 10xCMS**

**Cel:** Wprowadź nowy moduł w projekcie 10xCMS na podstawie istniejącego planu

**Instrukcje:**

1. (Opcjonalnie) Sklonuj projekt 10xCMS i przejdź na branch **upgrade-v1**
2. Przeanalizuj plan wdrożenia modułu Workflows & Governance (ostatni fragment na filmie)  
   1. Plan znajdziesz w folderze .cursor/plans/workflows-governance.md
3. Przetestuj możliwości Agenta AI w zakresie implementacji wzorców taktycznych DDD
![Ilustracja z lekcji](https://assets-v2.circle.so/ekrtcr8j44qd531ut1i2iwox5c9h)