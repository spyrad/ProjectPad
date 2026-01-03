---
title: "[4x2] Zrozumieć Legacy Code - analiza kodu"
course: "10xdevs-2"
source: "Przeprogramowani.pl"
exported: "2025-11-09"
format: "markdown"
---

![Ilustracja z lekcji](https://assets-v2.circle.so/becezefm1ammm9gvh4stls0bsmrf)

## Wprowadzenie

W poprzedniej lekcji zapoznaliśmy się z możliwościami Gemini 2.5 Pro w kontekście analizy dużych projektów legacy, a także tworzyliśmy rozbudowaną dokumentację onboardingową na podstawie historii git. 

Kolejnym krokiem w efektywnym wykorzystaniu LLM jest analiza konkretnych problemów (issues) i usprawnienie procesu debugowania.

Ta lekcja przedstawia kompletny proces analizy i debugowania konkretnego zgłoszenia błędu z repo excalidraw ([#9339](https://github.com/excalidraw/excalidraw/issues/9339)), wykorzystując funkcjonalności Gemini 2.5 Pro do:

- Tworzenia szczegółowego planu działania (action plan)
- Instrumentacji i analizy logów

W ramach bonusu zobaczysz również jak generować dokumentację kodu zgodnie z najpopularniejszymi standardami dla danego języka programowania (JSDoc, JavaDoc, Docstrings itd.), dzięki czemu analiza modułów będzie prostsza dla programistów i modeli wdrażających się w projekt w przyszłości.

## Bug w Excalidraw: Niestabilne połączenia strzałek ([#9339](https://github.com/excalidraw/excalidraw/issues/9339))

![Ilustracja z lekcji](https://assets-v2.circle.so/m20e2w95zx6m5yd5dqb1am6ldyr1)

Przeanalizujemy rzeczywisty problem z repozytorium Excalidraw, dotyczący strzałek, które nie pozostają poprawnie połączone z kształtami ([link](https://github.com/excalidraw/excalidraw/issues/9339)):

> **Tytuł:** Arrows don't stay connected to shape #9339
> 
> **Opis:** Creating an arrow from a shape to text in a way which means the arrow overlays the shape causes the arrow end to move around, as shown on the attached screenshots.

Jest to typowy przykład subtelnego błędu, który może być trudny do zdiagnozowania bez dokładnego zrozumienia architektury i przepływu danych w aplikacji.

## Etap 1: Tworzenie action planu z Gemini 2.5 Pro

Pierwszym krokiem, aby wykorzystać potencjał LLM w pracy nad problemem, jest stworzenie kompleksowego planu działania, który pomoże zorientować się w sytuacji i ustalić strategię debugowania. W tym celu wykorzystujemy prompt dla Gemini 2.5 Pro, który integruje:

- Dokument onboardingowy (stworzony w poprzedniej lekcji)
- Opis problemu (w tym przypadku issue #9339 z repo excalidraw)
- Strukturę wynikowego planu działania

### Struktura promptu dla action planu

Skorzystaj z prompta - [Plan działania do rozwiązywania problemu](https://10xrules.ai/prompts?org=10xdevs&collection=m4-legacy&segment=l2-analysis&prompt=72924dd9-a9f3-4444-b6ff-b0908cd53ed7).

Prompt zawiera instrukcje dla modelu, aby przeprowadził analizę w etapach:

1. Identyfikację istotnych części kodu
2. Analizę historii commitów git
3. Hipotezy dotyczące przyczyny problemu
4. Identyfikację potencjalnych osób do kontaktu
5. Pytania do dalszej analizy
6. Konkretne następne kroki

Zobacz jak w praktyce wygląda zastosowanie i analiza powyższego prompta na przykładzie Excalidraw:

🎥 **VIDEO**: [Watch here](https://player.vimeo.com/video/1077106367?app_id=122963&byline=0&badge=0&portrait=0&title=0)

W trakcie nagrywania lekcji, korzystając z Gemini 2.5 Pro, otrzymałem następujący action plan:

[arrows-dont-stay-connected-to-shape-#9339-action-plan.md](https://assets-v2.circle.so/a4aj67nc47oah5kkorcvoeizcdu1)

Taki plan działania jest nieoceniony, ponieważ:

- Identyfikuje kluczowe części kodu do zbadania
- Formułuje konkretne hipotezy dotyczące przyczyny problemu
- Wskazuje osoby, które mogą pomóc
- Zawiera listę pytań pomocniczych
- Definiuje praktyczne kroki do debugowania, w tym dodanie logów

Co nam to daje? Ogrom wartościowej wiedzy (nawet jeżeli trafią się pomyłki modelu, a trafią się) i poradzenie sobie z uczuciem przytłoczenia charakterystycznego dla wdrażania się w nowy, niebanalny projekt.

## Etap 2: Analiza kodu poprzez logowanie

Po stworzeniu action planu, kolejnym krokiem jest przeanalizowanie faktycznego działania kodu przy użyciu strategicznych console.logów, które pomogą zrozumieć przepływ danych i zachowanie aplikacji.

Również tutaj Gemini 2.5 Pro może służyć pomocą, analizując kod i sugerując najbardziej wartościowe miejsca do umieszczenia logów.

Etap 2 zaczynamy w nowej konwersacji. 

### Struktura promptu dodającego logi do kluczowych plików

Skorzystaj z prompta - [Strategiczna implementacja logowania](https://10xrules.ai/prompts?org=10xdevs&collection=m4-legacy&segment=l2-analysis&prompt=a73fd19b-fcf8-4bd6-95ff-0c5baf54e493).

### Przykładowa analiza i dodanie logów

Dla pliku [binding.ts](https://github.com/excalidraw/excalidraw/blob/master/packages/element/src/binding.ts), który został zidentyfikowany jako kluczowy dla problemu, Gemini 2.5 Pro może przeanalizować kod i zaproponować odpowiednie logi:

```
// packages/excalidraw/element/binding.ts

// Istniejąca funkcja
export function updateBoundElements(
  elements: readonly ExcalidrawElement[],
  changedElement: ExcalidrawElement
): ExcalidrawElement[] {

  // Dodane przez AI logi dla debugowania
  console.log(`[binding] updateBoundElements called for element:`, 
    JSON.stringify({
      id: changedElement.id,
      type: changedElement.type,
      x: changedElement.x,
      y: changedElement.y,
      width: changedElement.width,
      height: changedElement.height
    })
  );

  if (!changedElement.boundElements?.length) {
    return elements;
  }

  // Dodane przez AI logi dla debugowania
  console.log(`[binding] Element has ${changedElement.boundElements.length} bound elements:`, 
    JSON.stringify(changedElement.boundElements)
  );

  // Pozostały kod funkcji...
}

// Istniejąca funkcja
function getElligibleElementId(
  element: ExcalidrawElement,
  way: "center" | "outside",
  startPoint: Point,
  endPoint: Point
): string | null {

  // Dodane przez AI logi dla debugowania
  console.log(`[binding] getElligibleElementId called with way: ${way}`, 
    JSON.stringify({
      elementId: element.id,
      elementType: element.type,
      startPoint,
      endPoint
    })
  );

  // Pozostały kod funkcji...
}
```

Takie logi pozwalają:

- Śledzić kiedy i jak aktualizowane są powiązania między elementami
- Obserwować zmiany w pozycjach elementów
- Zrozumieć warunki, które wywołują problemy z wiązaniami strzałek

Dodawanie takich logów samodzielnie nie jest wcale banalnym zadaniem, zwłaszcza gdy mamy do przeanalizowania plik taki jak binding.ts, z 2,5k linii kodu logiki biznesowej.

## Etap 3: Analiza zebranych logów

Po zebraniu logów z aplikacji podczas reprodukcji błędu, Gemini 2.5 Pro pomaga nam w analizie tych danych diagnostycznych. Ta faza jest kluczowa dla zrozumienia rzeczywistego zachowania systemu i zidentyfikowania przyczyny problemu.

Po dodaniu logów do kluczowych funkcji i zebraniu danych podczas reprodukcji błędu, Gemini 2.5 Pro może przeanalizować zebrane logi (często zawierające setki lub tysiące linii) i wyciągnąć nowe wnioski na temat źródła problemu. 

Każdy problem jest inny, ale samodzielny proces analizy logów z Excalidraw byłby żmudny i trudny, ze względu na bardzo dużą ilość rerenderów komponentów React podczas reprodukcji błędu. Na szczęście dla Gemini 2.5 Pro to nie problem.

**Ważne**: etap 3 kontynuujemy w tej samej konwersacji co etap 2.

Prompt - [Analiza logów z reprodukucji błędów](https://10xrules.ai/prompts?org=10xdevs&collection=m4-legacy&segment=l2-analysis&prompt=4a3e5005-98b2-43eb-bf96-32dfaef3c92e).

## Etap 4: Synteza i aktualizacja action planu

Mamy ogrom nowych, użytecznych danych - teraz warto je zebrać i na tej podstawie zaktualizować action plan o nową wiedzę, którą zdobyliśmy podczas analizy. Prompt - [**Aktualizacja planu działania po sesji analizy**](https://10xrules.ai/prompts?org=10xdevs&collection=m4-legacy&segment=l2-analysis&prompt=00151de2-6444-47ff-9ccf-7468e7500104) wykorzystaj do podsumowania rozmowy z etapów 2 i 3.

Zobacz jak to wyglądało w praktyce:

🎥 **VIDEO**: [Watch here](https://player.vimeo.com/video/1077106388?app_id=122963&byline=0&badge=0&portrait=0&title=0)

O to action plan z pogłębioną analizą, który otrzymałem podczas nagrywania lekcji:

[arrows-dont-stay-connected-to-shape-#9339-action-plan.md](https://assets-v2.circle.so/hxsyhx21ws2l76udw50c8z0x4pnp)

Przyjrzyjmy w jakim stopniu zmienia się rozumienie problemu po analizie logów.

**Wstępna hipoteza (przed analizą logów)**

Początkowo, opierając się tylko na opisie problemu i dokumencie onboardingowym, hipoteza w action plan brzmiała:

```
## Root Cause Hypothesis
The most likely cause is a flaw in the geometric calculation used to determine the precise binding point of the arrow onto the *target* text element's boundary. This calculation (likely located in `binding.ts` or functions called from it/`linearElementEditor.ts`) might become unstable or produce incorrect results when the arrow's line segment visually overlaps the *source* shape. The instability could stem from:
- An incorrect assumption in the intersection algorithm.
- The algorithm being sensitive to floating-point inaccuracies in this specific geometric configuration.
- An edge case introduced or exposed by the recent normalization (`#9347`) or text handling (`#9364`) changes.

```

To dość ogólna hipoteza, wskazująca na kilka możliwych obszarów problemu.

Po szczegółowej analizie logów, Gemini 2.5 Pro przygotował znacznie bardziej rozbudowane i konkretne hipotezy:

```
## Root Cause Hypothesis 
The root cause is faulty logic within the `binding.ts:updateBoundPoint` function, specifically in the `else if (intersections.length === 1)` block.

When the arrow overlaps its source shape (the rectangle `jXk...` in the logs), the geometric configuration causes the arrow's `adjacentPoint` (the point next to the endpoint being calculated) to fall *inside* the source shape's calculated boundary plus the binding `gap`. In this specific scenario, `intersectElementWithLineSegment` correctly identifies that the line segment (from `adjacentPoint` towards the `focusPointAbsolute`) does not actually cross the gapped boundary and returns only a single "fallback" intersection point.

The bug lies in how `updateBoundPoint` handles this single intersection result. Instead of using the returned fallback point (which represents the point on the line segment at the original distance, effectively), the code incorrectly assigns the calculated `focusPointAbsolute` directly to the `newEdgePoint`. This causes the arrow's start point (bound to the source rectangle) to jump to this focus point, which is not the correct intersection with the element's boundary edge.

While the user observes the instability at the *text* end of the arrow, the initial error occurs during the update of the *start* point bound to the source rectangle. This incorrect start point update changes the arrow's overall geometry. In the subsequent update cycle, the calculation for the arrow's *end point* (bound to the text element `YqN...`) uses this new, incorrect start point, leading to the visible instability and unexpected movement observed at the text element end.

The large negative `focus` value (~ -1.58) calculated by `determineFocusDistance` for the start binding during overlap is likely a symptom of this geometric configuration (where the arrow segment points strongly away from the element's center relative to its axes/diagonals) rather than the root cause itself, although it contributes to determining the incorrect `focusPointAbsolute` that gets assigned when the faulty logic path is taken.

```

Zauważ jak drastycznie wzrosła precyzja - od ogólnego przypuszczenia do wskazania konkretnej linii kodu i próby dokładnego wyjaśnienia mechanizmu błędu (choć nie musi być ona prawdziwa, to już wymaga weryfikacji ze strony programisty). O to zaktualizowany action plan, który wykorzystuje kontekst konwersacji o logach.

Ta ewolucja rozumienia problemu pokazuje wartość wykorzystania Gemini 2.5 Pro w procesie analizy i debugowania.

## Wartość Gemini 2.5 Pro w kontekście analizy problemów

Zastosowanie Gemini 2.5 Pro do analizy złożonego błędu w dużym projekcie przynosi kilka kluczowych korzyści:

1\. **Kompleksowa analiza kodu** \- Z dużym efektywnym oknem kontekstowym, model może jednocześnie analizować dokumentację onboardingową, opis problemu, kod źródłowy i logi, co pozwala na głębsze zrozumienie złożonych zależności.

2\. **Efektywna hipoteza przyczyny problemu** \- model może analizować strukturę projektu i dane diagnostyczne, aby formułować precyzyjne hipotezy dotyczące przyczyny problemu, uwzględniające subtelne interakcje między komponentami.

3\. **Wsparcie w instrumentacji kodu** \- Gemini 2.5 Pro świetnie sugeruje miejsca do umieszczenia logów debugowania, koncentrując się na krytycznych ścieżkach przepływu danych.

4\. **Analiza wzorców w logach** \- model świetnie radzi sobie z analizą obszernych logów, wykrywając wzorce i anomalie, które mogą umknąć człowiekowi.

5. **Iteracyjne udoskonalanie hipotez** \- Wraz z pozyskiwaniem nowych danych z logów, model może aktualizować i udoskonalać swoje hipotezy, prowadząc stopniowo do coraz lepszego zrozumienia problemu. Nie ma co jednak co ukrywać, bez wsparcia człowieka samo Gemini 2.5 Pro najpewniej nie poradziłoby sobie z rozwiązaniem tak złożonego problemu.

## Ułatwianie przyszłej analizy kodu poprzez generowanie dokumentacji

Debugowanie i rozwiązywanie problemów byłoby znacznie prostsze, gdyby kod był odpowiednio udokumentowany. Niestety, w wielu projektach legacy dokumentacja jest niepełna, przestarzała lub całkowicie nieobecna. LLMy mogą pomóc nie tylko w analizie istniejących problemów, ale także w generowaniu wysokiej jakości dokumentacji, która ułatwi przyszłe zmagania z kodem.

### Wartość dokumentacji kodu w analizie projektów

Dobrze udokumentowany kod oferuje wiele korzyści:

1. **Szybsza orientacja** \- Nowi developerzy mogą szybciej zrozumieć działanie komponentów
2. **Redukcja czasu debugowania** \- Jasna dokumentacja wyjaśnia intencje, ograniczenia i warunki brzegowe
3. **Łatwiejsze refaktoryzacje** \- Zrozumienie wszystkich przypadków użycia przed zmianami
4. **Lepsza komunikacja w zespole** \- Wspólne zrozumienie funkcjonalności i interfejsów
5. **Lepsze wsparcie w IDE** \- edytory potrafią korzystać z dokumentacji zgodnej z najpopularniejszymi standardami (np. JSDoc)

### Wykorzystanie LLM do generowania dokumentacji

Dzięki zdolności do rozumienia kodu i jego kontekstu, LLMy mogą automatycznie generować dokumentację zgodną z popularnymi standardami branżowymi:

- **JSDoc/TSDoc** dla JavaScript/TypeScript
- **JavaDoc** dla Javy
- **Docstrings** dla Pythona
- **PHPDoc** dla PHP
- **XML Documentation Comments** dla C#

Co ważne, dla mniejszych plików możemy korzystać z tańszych/mniejszych modeli. Już Claude 3.5 Sonnet świetnie radził sobie z tym zadaniem, tak więc warto wybrać najtańszy model z obecnej topki np. Grok Code Fast 1 lub Claude 4.5 Haiku.

### Prompt do generowania dokumentacji

Prompt - [**Dodawanie profesjonalnej dokumentacji do modułu**](https://10xrules.ai/prompts?org=10xdevs&collection=m4-legacy&segment=l2-analysis&prompt=cd866cf0-e9fa-48ee-b5d5-7eaf75b8ac20) wykorzystaj jako wzorzec do generowania standardowej dokumentacji kodu dla dowolnych modułów w języku X. Warto go dostosować zgodnie z własnymi preferencjami i konwencjami.

Zobacz jak w praktyce wygląda generowanie JSdoców dla GenerationService w repozytorium 10x-cards:

🎥 **VIDEO**: [Watch here](https://player.vimeo.com/video/1077106427?app_id=122963&byline=0&badge=0&portrait=0&title=0)

## **🏁 Podsumowanie**

W tej lekcji poznaliśmy zaawansowane techniki wykorzystania Gemini 2.5 Pro do analizy złożonych problemów w dużych projektach legacy/brownfield:

- **Tworzenie action planu** \- strukturyzowane podejście do analizy błędów, wykorzystujące dokument onboardingowy i opis problemu do stworzenia kompleksowego planu działania z hipotezami, krokami i pytaniami do dalszej analizy.
- **Strategiczna instrumentacja kodu** \- wykorzystanie Gemini 2.5 Pro do sugerowania optymalnych miejsc do umieszczenia logów debugujących, co pozwala zbierać dokładne dane o zachowaniu aplikacji podczas reprodukcji błędu.
- **Analiza logów i wnioskowanie** \- zdolność modelu do przetwarzania obszernych logów (setki/tysiące linii) i wykrywania wzorców oraz anomalii, które prowadzą do identyfikacji rzeczywistej przyczyny problemu.
- **Iteracyjne udoskonalanie hipotez** \- proces stopniowego doprecyzowywania rozumienia problemu, od ogólnych przypuszczeń do konkretnych linii kodu i mechanizmów błędu.
- **Generowanie dokumentacji** \- automatyczne tworzenie dokumentacji zgodnej ze standardami dla danego języka (JSDoc, JavaDoc, Docstrings), co ułatwia przyszłą pracę z kodem i przyspiesza onboarding.

Kluczowym czynnikiem sukcesu jest duże okno kontekstowe Gemini 2.5 Pro, pozwalające na jednoczesną analizę wielu źródeł informacji i generowanie precyzyjnych wskazówek dla developera.

## **👨‍💻 Ćwiczenia praktyczne**

**Wszystkie poniższe ćwiczenia są opcjonalne.** W tym momencie kursu zalecamy priorytetyzować pracę nad aplikacją zaliczeniową. Przedstawione tutaj workflow analizy projektów brownfield i legacy na pewno przydadzą się w Waszej codziennej pracy programistycznej - rzeczywistość sama sprowokuje was do ich wykorzystania, gdy będziecie dołączać do nowych zespołów lub przejmować istniejące projekty. Wróćcie do tych ćwiczeń, gdy będziecie potrzebować efektywnych metod wdrażania się w nowe projekty.

**Zadanie 1: Stwórz action plan dla problemu**   
Cel: Wykorzystanie Gemini 2.5 Pro do analizy rzeczywistego błędu w Twoim projekcie.   
Instrukcje:

1. Wybierz otwarty issue lub znany błąd w projekcie nad którym pracujesz
2. Wykorzystaj dostarczony prompt do tworzenia action planu
3. Dostarcz modelowi dokument onboardingowy (lub skróconą wersję) oraz opis problemu
4. Przeanalizuj otrzymany action plan pod kątem przydatności i realizmu
5. Zapisz dokument jako punkt odniesienia do dalszej pracy nad błędem

**Zadanie 2: Dodaj strategiczne logi do swojego kodu**   
Cel: Przećwiczenie procesu instrumentacji kodu z pomocą AI.   
Instrukcje:

1. Wykorzystaj wygenerowany action plan z Zadania 1
2. Zastosuj prompt do dodawania logów dla kluczowych plików wskazanych w planie
3. Dodaj sugerowane logi do swojego kodu lokalnie
4. Uruchom aplikację i zbierz dane z logów podczas reprodukcji błędu
5. Przeanalizuj przydatność dodanych logów i oceń trafność sugestii modelu

**Zadanie 3: Przeprowadź analizę logów i zaktualizuj hipotezę**   
Cel: Wykorzystanie modelu do analizy zebranych danych i doprecyzowania hipotezy.   
Instrukcje:

1. Zbierz logi wygenerowane w Zadaniu 2
2. Wykorzystaj prompt do analizy logów i przekaż je modelowi
3. Porównaj wstępną hipotezę z nową analizą
4. Zaktualizuj action plan o nowe wnioski
5. Oceń, czy analiza modelu pomogła w lepszym zrozumieniu problemu

**Zadanie 4: Wygeneruj dokumentację dla modułu**   
Cel: Automatyczne tworzenie dokumentacji zgodnej ze standardami.   
Instrukcje:

1. Wybierz moduł w swoim projekcie, który potrzebuje dokumentacji
2. Dostosuj dostarczony prompt do języka programowania i konwencji w projekcie
3. Wygeneruj dokumentację dla wybranego modułu
4. Wprowadź wygenerowaną dokumentację do kodu
5. Sprawdź, czy IDE prawidłowo interpretuje dodaną dokumentację

![Ilustracja z lekcji](https://assets-v2.circle.so/ekrtcr8j44qd531ut1i2iwox5c9h)