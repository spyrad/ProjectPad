<!DOCTYPE html>![](https://assets-v2.circle.so/j5el8k1pto6ymo9l5uajv3zz54t1)

## Wprowadzenie

W poprzedniej lekcji pracowaliśmy nad przekrojową integracją aplikacji z nowym modułem do autentykacji. Ta funkcjonalność, wraz z istniejącym wcześniej kodem, może znacząco podnosić złożoność całego projektu. To z kolei wskazuje na potrzebę przyszłej refaktoryzacji.

Aby porządkowanie naszego projektu przebiegało bezproblemowo, teraz zajmiemy się zabezpieczeniem tego, co działa. W tym celu wdrożymy testy jednostkowe i e2e - w naszym stacku będą one oparte o Vitest (w tej lekcji) i Playwright (kolejna lekcja).

Zanim przejdziemy do implementacji testów, skupimy się na przygotowaniu kluczowego artefaktu inżynieryjnego, bez którego trudno mówić o systematycznym podejściu do jakości kodu.

## Test Plan

Czym jest Test Plan? Jest on fundamentalnym elementem procesu zapewnienia jakości, często pomijanym w mniejszych projektach i zespołach bez wystarczających zasobów - to coś, co możemy zmienić dzięki wykorzystaniu potencjału AI.

Test Plan to swoisty drogowskaz dla całego zespołu. Definiuje on zakres, strategię i metodologię testów, które przeprowadzimy. W naszym przypadku wykorzystamy nowoczesne podejście, łącząc tradycyjne praktyki z możliwościami, jakie oferują modele AI.

Współpracując z modelami AI, zbudujemy Test Plan, który nie tylko omówi podejście do testowania, wskaże na właściwe technologie, pokryje standardowe przypadki testowe, ale również pomoże nam zidentyfikować edge case&#39;y, które mogłyby umknąć naszej uwadze. AI posłuży nam jako sparring partner w burzy mózgów nad potencjalnymi scenariuszami testowymi.

Do utworzenia Test Planu nie wykorzystamy jednak gotowego prompta, a wydelegujemy to zadanie do modelu Claude 3.5 Sonnet w konsoli Anthropic (&lt;https://platform.claude.com/&gt;). Dodatkowo zobaczysz jak radzić sobie z sytuacjami, kiedy twój edytor nie do końca poprawnie interpretuje zawartość projektu, co może mieć istotne znaczenie w precyzyjnym określeniu scenariuszy testowych.

&gt; 📝 Ważne - Na filmie prezentujemy symbol @Codebase, którego wsparcie zostało wycofane w jednej z nowszych wersji edytora Cursor. Od teraz ten sam mechanizm wzbudza się poprzez polecenie językiem naturalnym zbliżonym do “Search Codebase before taking any action”. Więcej na ten temat w lekcji [#\[1x2\] Współpraca z AI w IDE](https://bravecourses.circle.so/c/lekcje-10x2/sections/681379/lessons/2580637) .

[FRAGMENT VIDEO](https://player.vimeo.com/video/1071147396?app_id=122963&amp;byline=0&amp;badge=0&amp;portrait=0&amp;title=0)

Jeśli nie chcesz przechodzić przez tworzenie prompta od zera, wykorzystaj gotowy przykład (pamiętaj u uzupełnieniu placeholderów odnośnikami do twoich elementów projektu - możesz też dodać nowe, dopasowane do twojego stacku):

[test-plan.mdc](https://assets-v2.circle.so/o1j55vquvsm9jg8g4wnzzyuiu8lq)

Dwie usługi, które po tej lekcji warto dodać do zakładek, to **GitIngest** oraz **Google AI Studio**.

![](https://assets-v2.circle.so/sa0nwh57fqtofvprqp78mwq4m93f)

Na filmie miałeś okazję zaobserwować, jak połączenie wiedzy o projekcie z modelami obsługującymi duży kontekst może generować naprawdę precyzyjne rezultaty.

* &lt;https://gitingest.com/&gt; (alternatywa: &lt;https://repomix.com/&gt;)
* &lt;https://aistudio.google.com/&gt;

**👉 Ważne:** Darmowe (1) korzystanie z modeli w Google AI Studio wiąże się z udostępnianiem konwersacji w celu ulepszania modeli (2). W warunkach szkolenia, budując projekt od zera możemy to zaakceptować, ale dla zastosowań komercyjnych należy przejść na wybraną integrację płatną albo korzystanie z modelu w edytorze, który stosuje “Privacy Mode” (np. Cursor).

![](https://assets-v2.circle.so/k8ydk56zxnwcstval4n85c6c1ewt)

Więcej informacji [pod tym linkiem](https://aistudio.google.com/plan%5Finformation).

---

Po przygotowaniu Test Planu, wykorzystajmy zdobyte informacje do konfiguracji środowiska.

## Konfiguracja środowiska

W tej części skupimy się na przygotowaniu projektu do rozwijania dwóch typów testów - jednostkowych oraz end-to-end.

Bazując na specyfikacji z Test Planu, zainstalujemy niezbędne biblioteki, które posłużą nam do weryfikacji zarówno izolowanych fragmentów kodu, jak i całościowego działania aplikacji. Musimy zadbać o to, by środowisko testowe było nie tylko funkcjonalne, ale również zoptymalizowane pod kątem wydajności i powtarzalności wyników.

Nasze testy jednostkowe oprzemy na Viteście, natomiast do testów e2e wykorzystamy Playwright - narzędzia te zdefiniowaliśmy wcześniej jako optymalne dla naszego stacku technologicznego. Rozpocznijmy więc proces konfiguracji, który pozwoli nam na płynne przejście od dokumentacji do praktycznej implementacji.

[FRAGMENT VIDEO](https://player.vimeo.com/video/1071147284?app_id=122963&amp;byline=0&amp;badge=0&amp;portrait=0&amp;title=0)

## Testy z Vitest

Testy jednostkowe stanowią pierwszy filar naszej strategii zapewnienia jakości kodu. W tej sekcji wykorzystamy wsparcie AI do wdrożenia pierwszego scenariusza dla renderowania reguł w 10xRules.

Ważnym elementem tej fazy jest zaplanowanie pracy przed przystąpieniem do pisania testów. Tutaj AI może służyć jako wartościowy partner, ale pamiętajmy - nawet najlepsze modele nie są w stanie &quot;czytać w naszych myślach&quot;. Skuteczna współpraca wymaga od nas jasnego komunikowania kontekstu, oczekiwań i specyfiki testowanego kodu.

Przejdźmy zatem do zaplanowania pierwszej partii testów jednostkowych.

[FRAGMENT VIDEO](https://player.vimeo.com/video/1071147066?app_id=122963&amp;byline=0&amp;badge=0&amp;portrait=0&amp;title=0)

W bardziej złożonych scenariuszach istotna będzie dyskusja o dependencjach. Po analizie kodu możemy zasugerować, które zależności chcemy mockować, a które warto pozostawić w oryginalnej formie. Przekazanie AI informacji o strukturze projektu, wzajemnych powiązaniach modułów oraz specyfice testowanych funkcji pozwoli uniknąć nieporozumień i znacząco przyspieszy proces.

Zamiast oczekiwać, że AI samo odkryje wszystkie niuanse naszej architektury, przygotujmy dla niego przejrzysty opis testowanego komponentu, jego interfejsu oraz współpracy z innymi częściami systemu. Taka proaktywna komunikacja zaowocuje bardziej trafnymi propozycjami testów i realnie przyspieszy naszą pracę.

Przykładowo, w trybie agentowym, kiedy AI może korzystać z przeszukiwania projektu, możemy rozpocząć pracę od prompta:

👉 Prompt [Wizualizacja Struktury Komponentów](https://10xrules.ai/prompts?org=10xdevs&amp;collection=m3-prod&amp;segment=l2-unit-tests&amp;prompt=59982e4c-9f0b-4362-b0b5-b75f53ecbc88).

Dzięki temu otrzymamy wycinek projektu, dzięki któremu wybierzemy te elementy, które można (i warto) testować poprzez unity:

```
RulePreview.tsx
├── Components
│   ├── RulePreviewTopbar
│   │   ├── RulesPath
│   │   ├── RulesPreviewActions
│   │   └── RulesPreviewCopyDownloadActions
│   ├── DependencyUpload
│   └── MarkdownContentRenderer
│       └── RulesPreviewCopyDownloadActions
│
├── Hooks
│   ├── useDependencyUpload
│   │   └── /api/upload-dependencies (API endpoint)
│   ├── useProjectStore
│   └── useTechStackStore
│
├── Services
│   └── RulesBuilderService
│       └── generateRulesContent()
│
└── Types
    └── RulesContent

Parent Component
└── TwoPane
    ├── RuleBuilder
    ├── RulePreview
    └── CollectionsSidebar
```

W konwersacji możemy iść dalej:

Prompt [Analiza Kandydatów do Testów Jednostkowych](https://10xrules.ai/prompts?org=10xdevs&amp;collection=m3-prod&amp;segment=l2-unit-tests&amp;prompt=1670ae8e-b0b8-4a99-a7e2-e8a858aa2d1f).

Po otrzymaniu sugestii możemy wybrać kierunek działania, dodając do tego reguły Vitest:

Prompt [Implementacja Testów Jednostkowych](https://10xrules.ai/prompts?org=10xdevs&amp;collection=m3-prod&amp;segment=l2-unit-tests&amp;prompt=97661e33-554f-42b1-ba32-864577095519).

[vitest-unit-testing.mdc](https://assets-v2.circle.so/kn3vu4axjqpw90bvxfz27jffg6ky)

Aby doprowadzić całe zadanie do końca, pracę AI skorygowałem na dwa sposoby:

* usunąłem jeden zbędny test, który z punktu widzenia aplikacji nie miał sensu (biblioteka bez reguł)
* wykonałem “inline edit” aby zapewnić zgodność typów wskazując na definicję we właściwym pliku

Drugi problem byłby pewnie do uniknięcia, gdybym od razu wskazał właściwe typy na poziomie prompta.

Finalnie, po tych zmianach uzyskałem kolejne 7 testów, które weryfikują teraz tworzenie reguł:

![](https://assets-v2.circle.so/y8wngti3nl6yja70sza22zivdci3)

### Tryb watch w testach z Agentem AI

Domyślna konfiguracja testów często zakłada pracę w trybie “watch”, czyli stale uruchomionego zadania połączonego z obserwowaniem zmieniających się plików:

```
{
  &quot;scripts&quot;: {
    &quot;test&quot;: &quot;vitest&quot;
  }
}
```

![](https://assets-v2.circle.so/gegj3p62mypx79jmro8ye5uobcw8)

Taki format uruchamiania testów nie jest zbyt wygodny przy współpracy z AI, gdzie agent może uruchomić testy, ale nie zawsze poradzi sobie z zamknięciem trybu “watch” bez naszej asysty.

Można to łatwo zaadresować wskazując na jawny “single run” - np. w Vitest poprzez:

```
&quot;test&quot;: &quot;vitest run&quot;
```

## 🏁 Podsumowanie lekcji

Tematyka zapewniania jakości aplikacji webowych zawiera w sobie mnóstwo elementów wpływających na postrzeganie produktu przez naszych użytkowników.

Zaprezentowany w tej lekcji Test Plan może być przydatnym dokumentem na poziomie całego zespołu, który działa jak “Single Source of Truth” całego procesu QA. Modele językowe, dla których tekst to idealny format komunikacji, radzą sobie z tym wyzwaniem naprawdę dobrze. Klucz do sukcesu - jak zwykle - to odpowiedni kontekst i jasne oczekiwania.

Zaprezentowaliśmy również konfigurację środowiska oraz wdrażanie pierwszych testów - będziemy mogli na tym bazować rozwijając projekt, a wzmianka “a teraz dodaj testy z regułami Vitest” powinna być obowiązkowym elementem każdej nowej funkcjonalności.

## 👨‍💻 Ćwiczenia praktyczne

### **Zadanie 1: Zbudowanie Test Planu**

**Cel:** Rozbuduj dokumentację projektową o Test Plan.

**Instrukcje:**

1. Przetestuj jedno z dwóch podejść - jedno oparte o globalne przeszukiwanie projektu przez Agenta na skutek jawnego polecenia, a drugie na GitIngest w połączeniu z Google AI Studio.

### **Zadanie 2: Konfiguracja środowiska i implementacja Unit Testów**

**Cel:** Wprowadź testy jednostkowe do projektu, chroniąc się przed potencjalnymi regresjami.

**Instrukcje:**

1. Na podstawie Test Planu wybierz scenariusz lub moduł do pokrycia testami jednostkowymi
2. Wprowadź Unit Testy w oparciu o preferowane narzędzie (dla Astro - Vitest).
![](https://assets-v2.circle.so/ekrtcr8j44qd531ut1i2iwox5c9h)