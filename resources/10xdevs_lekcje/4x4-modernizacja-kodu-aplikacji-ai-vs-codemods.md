---
title: "[4x4] Modernizacja kodu aplikacji - AI vs Codemods"
course: "10xdevs-2"
source: "Przeprogramowani.pl"
exported: "2025-11-09"
format: "markdown"
---

![Ilustracja z lekcji](https://assets-v2.circle.so/amx1949fng4ljg1ldijxo6rylhbc)

## Wprowadzenie

Każdy doświadczony programista prędzej czy później staje przed wyzwaniem modernizacji kodu aplikacji. Chcemy pracować z najnowszymi bibliotekami i frameworkami, korzystać z udogodnień nowinek technologicznych, no i nie narażać się na ryzyko luk bezpieczeństwa.

Niestety, z punktu widzenia biznesu taka modernizacja często brzmi jak nieuzasadniony koszt bez natychmiastowego zwrotu z inwestycji. Dodatkowo, bez jakościowych testów regresji, łatwo narazić się na pogorszenie doświadczeń użytkownika - nie dość, że będzie drogo, długo, to jeszcze nie zadziała.

Nic dziwnego, że w epoce Generatywnego AI wszyscy liczymy na to, że refaktoryzacje i modernizacje stacku wreszcie będzie można przeprowadzać niemal automatycznie. Na jakim etapie jesteśmy dzisiaj? 

Odpowiedź zależy od wielu zmiennych, ale wiele publicznie dostępnych opracowań wskazuje na obiecujące rezultaty modernizacji i refaktoryzacji projektów legacy/brownfield z wykorzystaniem modeli językowych. Niestety, przy charakterystycznych cechach tych rozwiązań, takich jak brak determinizmu czy brak dostępu do aktualizowanej na bieżąco wiedzy, nie możemy nastawiać się na pełną automatyzację. Warto więc podejść do tematu świadomie i popatrzeć na cały proces nieco szerzej.

## Język programowania a jakość współpracy z AI

Podstawowym czynnikiem, który będzie wpływał na jakość modernizacji danego stacku, jest sprawne poruszanie się modelu w danym języku programowania.

Jeszcze do niedawna, przy okazji największych premier tzw. “frontier modeli” (najlepszych modeli rozwijanych przez liderów branży AI), poznawaliśmy ich wyniki w benchmarku HumanEval. To zestaw 164 problemów w języku Python, które model musi zaimplementować spełniając przy tym wymagania testów jednostkowych.

Dzisiaj wyniki tego testu pojawiają się w trakcie premier dość rzadko - nie tylko dlatego, że osiągnięcie 100% poprawnych implementacji jest teraz w zasięgu wielu najlepszych modeli, ale przede wszystkim dlatego, że te wspomniane 100% rzadko kiedy przekłada się na otrzymywane wyniki w stacku różnym od Pythona (w przypadku bardziej złożonych problemów nie przekłada się nawet w Pythonie).

Aby uzyskać więcej wiedzy o użyteczności AI w innych technologiach, warto przeanalizować wyniki benchmarku [McEval](https://mceval.github.io/leaderboard.html). 

Wprowadza on dwa istotne rozszerzenia - po pierwsze, uśrednia wyniki testowanych modeli w kontekście aż 40 języków programowania. Po drugie, sprawdza on trzy aspekty współpracy AI i programisty:

- Generowanie algorytmów z opisu językowego (_Generate_)
- Uzupełnianie kodu (_Autocomplete_)
- Wyjaśnianie i dokumentowanie kodu (_Explain_)

Różnice między tymi typami zadań prezentuje dokumentacja:

![Ilustracja z lekcji](https://assets-v2.circle.so/nadyxzq9vbjiezw06u9mmfl8mrf5)

Chociaż **nie jest to badanie aktualizowane po Q2 2024**, to i tak można z niego wyciągnąć kilka ciekawych obserwacji (na przykładzie ówczesnego lidera - GPT-4o):

- Między kategoriami _Autocomplete_ a _Explain_ występuje umiarkowanie silna korelacja (0.63). W większości przypadków wyniki danego języka w obu tych kategoriach są zbliżone, ale istnieją istotne wyjątki warte podkreślenia.
- **JavaScript vs TypeScript** \- W kategorii Autocomplete nieco lepiej wypada ten pierwszy - 0.62 vs 0.56 (być może dzięki większej reprezentacji w danych treningowych). Jeśli jednak chodzi o Explain, to silne i deklaratywne typowanie TS nieznacznie odwraca tę relację (0.68 vs 0.7).
- **C vs C++ vs C#** \- C# osiąga najlepsze wyniki w Autocomplete, natomiast C++ znacząco poprawia wynik w Explain, prawdopodobnie przez złożoną, ale semantycznie wyrazistą strukturę kodu.
- **JSON vs Markdown vs HTML** – W każdym przypadku widać duże spadki w Explain względem Autocomplete. Model bardzo dobrze uzupełnia kod dzięki obszernym zbiorom danych treningowych, ale nie potrafi skutecznie wyjaśniać prostych struktur deklaratywnych.
- **Rust vs Go** \- Rust przewyższa Go w obu kategoriach, jednak przewaga ta maleje w Explain, co może świadczyć o tym, że kod w Go jest prostszy i bardziej przewidywalny semantycznie, co ułatwia modelowi generowanie opisów.

Badanie pokazuje, że nawet **w ramach jednego języka zadania takie jak autouzupełnianie kodu, generowanie dokumentacji czy pisanie nowych algorytmów może stać na różnym poziomie**, a do rzetelnej oceny niezbędna jest praktyka i skrojony na miarę zestaw testów (tym zajmiemy się w ostatnim module).

Badacze stojący za McEval opublikowali również [MdEval](https://arxiv.org/pdf/2411.02310) \- benchmark skupiony na debugowaniu - i tutaj, **w kontekście analizy kodu z błędami, wprost** **widać przewagę modeli reasoningowych** nad klasycznymi asystentami. Modele “myślące”, takie jak o1, o3 i inne, są w stanie generować więcej tekstu pomocniczego, który nakierowuje je na właściwe rozwiązanie. W toku rozumowania często pojawiają się też alternatywne ścieżki działania, co całościowo - na co wskazuje MdEval ale i praktyka - pomagają rozprawić się z trudnym problemem.

Tabele z wynikami znajdziesz [w tym miejscu](https://arxiv.org/pdf/2411.02310).

![Ilustracja z lekcji](https://assets-v2.circle.so/wz5ev9i9zeh0b5oceovhhcby5xea)

**Nowsze modele i przekrojowe zadania**

Benchmark, który daje nam więcej informacji o zdolnościach najnowszych modeli w kilku językach to [Aider Polyglot Benchmark](https://aider.chat/2024/12/21/polyglot.html#the-polyglot-benchmark) \- zawiera on 225 zadań rozłożonych między C++, Go, Javę, JavaScript, Pythona i Rusta.

Co ważne, mierzy on nie tylko skuteczność, ale również **koszt realizacji wszystkich zadań**. Dzięki temu uzyskujemy wartościową relację koszt/efekt, co ma znaczenie nawet dla hobbystów, nie mówiąc już o dużej skali przedsiębiorstwa. Ranking zaktualizowany po premierze GPT-5 prezentuje się następująco:

![Ilustracja z lekcji](https://assets-v2.circle.so/2rgjzhllpwpn9y4qyicwdbnyzs5i)

Szczególną uwagę zwracamy jednak na tabelkę “Cost” - bez tego trudno o realną ocenę modeli w kontekście programowania lub debugowania. W tym wymiarze w TOP 3 świetnie wypada GPT-5 (Medium Reasoning Effort).

### SWE Bench

Benchmarkiem, którego wynikami w Q3/Q4 2025r. wciąż chwalą się dostawcy największych modeli, jest [SWE Bench](https://www.swebench.com/) (wraz z wariantami typu Lite, Verified czy Full).

Jest to test oceniający zdolność modeli językowych do rozwiązywania rzeczywistych problemów inżynierii oprogramowania. Opisywany test stawia modelom (a konkretnie - Agentom AI tworzonym w oparciu o te modele) zadanie samodzielnego naprawienia błędów lub wdrożenia małych funkcji opisanych w autentycznych zgłoszeniach (issues) z popularnych repozytoriów open-source na GitHubie (głównie projektów Pythonowych, jak Django, NumPy czy Matplotlib).

Proces oceny naśladuje pracę programisty:

1. **Zadanie:** Model otrzymuje opis problemu (treść zgłoszenia z GitHuba) oraz dostęp do bazy kodu danego projektu.
2. **Działanie:** Model musi przeanalizować kod, zrozumieć problem, zlokalizować błąd i wygenerować odpowiednią poprawkę (tzw. _patch_).
3. **Weryfikacja:** Wygenerowany _patch_ jest automatycznie aplikowany do kodu, a następnie uruchamiana jest oryginalna suita testów projektu. O sukcesie świadczy poprawne przejście specyficznych testów, które wcześniej (przed poprawką) kończyły się błędem (tzw. testy _fail-to-pass_).

Benchmark ten jest trudny, ponieważ wymaga nie tylko generowania kodu, ale także nawigacji po dużych, złożonych repozytoriach, rozumienia zależności między różnymi plikami i modułami oraz precyzyjnego debugowania. Poniżej prezentujemy liderów października 2025:

![Ilustracja z lekcji](https://assets-v2.circle.so/cgb4tkfke19hat7f4q5dz7vj42fy)

## Translacje między językami programowania

Mówiąc o modernizacji stacku nie możemy pominąć tematu translacji, czyli tłumaczenia fragmentów systemu czy aplikacji z jednego języka programowania na drugi (nowszy, lepszy, bardziej bezpieczny).

To jeden z tych scenariuszy, gdzie w kontekście programowania AI może przynieść największe korzyści. Pojawiają się jednak nowe pytania - które języki programowania można transformować oraz jakie techniki wykorzystać, aby taka translacja była wysokiej jakości?

Po pierwsze - w kwestii języków rządzi mainstream. Im więcej danych treningowych i publicznych dyskusji o danym języku, tym lepsze efekty. Widać to pośrednio w funkcji [ChatGPT Canvas](https://openai.com/index/introducing-canvas/), gdzie firma OpenAI mogła umieścić dowolną liczbę języków do transformacji, a umieściła tylko sześć - zakładamy, że nie chodzi tutaj o losowy wybór albo dyskryminację Rusta/Go/Kotlina, a raczej przedstawienie listy dającej najlepsze rezultaty.

![Ilustracja z lekcji](https://assets-v2.circle.so/qd1ry1cyyil56utb4tseycpjmt6l)

W szerszym kontekście, problem translacji został omówiony w pracy _“ClassEval-T: Evaluating Large Language Models in Class-Level Code Translation” (_[_arxiv_](https://arxiv.org/pdf/2411.06145v4)_)._ Jej twórcy sprawdzają, jak różne modele językowe radzą sobie z tłumaczeniami większych fragmentów kodu (class-level) w Javie, Pythonie i C++. Testują oni trzy podejścia do translacji:

- **Holistyczne** \- model na wejściu dostaje całą klasę w języku A i ma zwrócić całą klasę w języku B
- **Stopniowe z zależnościami** \- model rozpoczyna pracę od tłumaczenia szkieletu klasy, otrzymując listę niezbędnych funkcji i zależności, przechodząc stopniowo do implementacji detali
- **Stopniowe bez zależności** \- podobnie jak powyżej, ale model nie otrzymuje referencyjnych zależności a wyłącznie przeznaczenie danej klasy lub funkcji

Twórcy badania przedstawiają pięć wniosków:

- **Złożoność problemu -** Wszystkie badane modele lepiej sprawdzają się w stopniowym tłumaczeniu pojedynczych funkcji niż translacji większych klas i całych modułów.
- **Komercyjna jakość** \- Komercyjne, duże modele wypadają przekrojowo lepiej niż modele Open Source. Dodatkowo, widać również dodatkowy bonus jakości w Pythonie względem Javy/C++.
- **Tłumaczenie holistyczne -** Najlepsze modele uzyskują pozytywne rezultaty w podejściu holistycznym, gdzie model ma w jednym podejściu przejść z języka A na B. Małe modele wykazują tutaj różną jakość i potrzebę wspomagania się mniejszymi fragmentami.
- **Techniki pomocnicze -** W translacjach można wykorzystywać uzupełniające się podejścia. Technika holistyczna pomaga modelowi zrozumieć całość problemu, a tłumaczenia mniejszych fragmentów dają więcej precyzji w generowaniu niezbędnych zależności.
- **Rodzaj błędów** \- Duża zależność pomiędzy typem języka a rodzajem uzyskiwanych błędów w trakcie translacji. Przykładowo, holistyczne tłumaczenia Javy i C++ do Pythona skutkowały praktycznie **zerową** liczbą błędów funkcyjnych i składniowych, a tłumaczenia odwrotne - Pythona do C++ - były mocno problematyczne.

Szczegółowe opracowanie wyników [znajdziesz pod tym linkiem](https://arxiv.org/pdf/2411.06145v4):

![Ilustracja z lekcji](https://assets-v2.circle.so/2gyoipz55d0q04wx5ff2cjvae6iz)

Główny wniosek twórców benchmarku? Aby uzyskać najlepsze efekty, zbuduj strategię stopniowej migracji (np. od ogółu do szczegółu) i na bieżąco weryfikuj działania modelu.

> Our findings indicate that, even at class-level granularity, LLMs struggle with structural integrity, dependency handling, and code correctness, **highlighting the necessity of a phased approach**

## Codemods vs AI Mods: Transformacje w dużej skali

Prawie każdy programista ze stażem dłuższym niż kilka miesięcy doświadczył zjawiska narastającego długu technicznego. Pojawia się on szczególnie tam, gdzie brakuje systematycznego planu rozwoju aspektów niefunkcjonalnych. Ten dług ma często źródło w filozofii "skoro działa, to nie ruszamy" - zespoły unikają modernizacji technologii z obawy przed wprowadzeniem nowych błędów lub z braku czasu na takie działania.

Problem narasta stopniowo, aż w końcu staje się niemożliwy do ignorowania, gdy:

- Zespół coraz wolniej dostarcza nowe funkcjonalności
- Liczba błędów wzrasta nieproporcjonalnie do zmian
- Wdrażanie nowych programistów do projektu zajmuje zbyt dużo czasu
- Implementacja nawet prostych zmian wymaga nieproporcjonalnie dużo pracy

W tym momencie konieczna staje się interwencja. Sposób radzenia sobie z problemem zależy od skali projektu:

**W małych projektach** zwykle stosuje się ręczne podejście - programiści systematycznie przepisują lub modernizują kod plik po pliku.

**W dużych projektach** zespoły często decydują się na opracowanie automatycznych narzędzi do transformacji kodu, znanych jako **codemods**. Są to specjalistyczne programy, które analizują i przekształcają kod źródłowy według określonych reguł.

Typowe zastosowania codemods obejmują:

- Aktualizację standardu języka (np. z ES5 do ES6 w JavaScript)
- Konwersję między językami (np. z JavaScript do TypeScript)
- Migrację między bibliotekami lub frameworkami (np. z Enzyme do React Testing Library)

Przykładami takich narzędzi są m.in. [jscodeshift](https://github.com/facebook/jscodeshift) (Facebook), [ts-migrate](https://github.com/airbnb/ts-migrate) (AirBnb) czy [OpenRewrite](https://docs.openrewrite.org/popular-recipe-guides) (Moderne).

Przykładowa modernizacja z jscodeshift (JavaScript - var → let) może wyglądać następująco:

```
module.exports = function (fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  return root
    .find(j.VariableDeclaration, {
      kind: "var",
    })
    .forEach((path) => {
      path.node.kind = "let";
    })
    .toSource();
};
```

Po uruchomieniu narzędzia, aplikuje ono podany przepis na konkretnym pliku:

![Ilustracja z lekcji](https://assets-v2.circle.so/8p8l06wcso4t5vo9kx4ecpgixzqo)

### Codemods - precyzja, skalowalność i przewidywalność

Transformacje wykonywane dzięki _codemodom_ wydają się zupełnym przeciwieństwem tego, na co piszemy się wykonując refaktoryzację z AI:

1. **Precyzja** \- prawidłowo skonfigurowane codemody mogą dokonywać transformacji z niemal stuprocentową dokładnością dla przypadków, dla których zostały zaprojektowane.
2. **Skalowalność** \- mogą być uruchamiane na tysiącach plików bez dodatkowych kosztów.
3. **Powtarzalność** \- transformacje są deterministyczne - za każdym razem dają te same rezultaty.
4. **Kontrola** \- programiści mają pełną kontrolę nad transformacjami i ich logiką.
5. **Brak ograniczeń związanych z poufnością** \- lokalne działanie nie zwiększa ryzyka wycieku kodu.

Brzmi jak refaktoryzacyjny AI-killer? Kiedy masz odpowiednie zasoby i wyspecjalizowany w tym temacie zespół, to jak najbardziej warto! Pamiętaj jednak o istotnych ograniczeniach tego podejścia:

1. **Brak kontekstu** \- codemody operują na wzorcach AST (Abstract Syntax Tree), ale brakuje im semantycznego zrozumienia kodu. Nie pojmują pełnych intencji, implikacji logiki biznesowej ani architektury systemu w sposób, w jaki potrafi to człowiek lub zaawansowane AI.
2. **Koszt utrzymania** \- choć codemody świetnie radzą sobie z predefiniowanymi transformacjami, tworzą nowy rodzaj długu technicznego: dług adaptacyjny. W miarę jak frameworki ewoluują w nieprzewidywalny sposób, utrzymanie codemodów wymaga ciągłych aktualizacji.
3. **Walka o brakujące 20%** \- w projektach o wysokim poziomie złożoności obietnica szybkiej modernizacji z codemodami często okazuje się iluzoryczna. Początkowa transformacja może pokryć 80% przypadków, ale pozostałe 20% wymaga nieproporcjonalnie dużego nakładu pracy.

Właśnie z tego powodu AI wydaje się być nie tyle alternatywą, co skutecznym rozszerzeniem statycznej transformacji kodu, jaką znamy z narzędzi takich jak jscodeshift czy OpenRewrite.

![Ilustracja z lekcji](https://assets-v2.circle.so/q6262gz6hl9ys5t8xgm634ih8vzz)

### AI jako rozszerzenie Codemodów

W domenie tzw. Developer Experience, eksperymenty z tranformowaniem kodu przy pomocy AI nie są niczym nowym. Modele językowe, nawet pomimo opisywanych wcześniej ograniczeń, dają zupełnie nową jakość względem klasycznych reguł w stylu codemods:

1. **Przykłady** \- dzięki wykorzystaniu kontekstu oraz zdolności nauki na przykładach, modele mogą transformować kod (A→B), bez definiowania problematycznego stanu pośredniego.
2. **Adaptacja** \- modele rozumujące mogą na bieżąco korygować scenariusz transformacji biorąc pod uwagę zdobywane w locie informacje, nawet kiedy pominie je programista.
3. **Nowa wiedza** \- AI może korzystać z wiedzy zdobytej na etapie treningu do wykonania lepszej transformacji, nawet wtedy, kiedy docelowych rozwiązań nie zna programista (np. _“w tym miejscu użyj powszechnie stosowanej biblioteki do wykonywania zapytań HTTP”_).
4. **Szybkie efekty -** proste transformacje kodu w języku naturalnym “zamień var na let” to dla obecnej generacji modeli praktycznie zerowe wyzwanie.

Po lewej reguła dla Claude Sonnet 4.5 (_Zamień var na let_) - po prawej reguła dla _jscodeshift_:

![Ilustracja z lekcji](https://assets-v2.circle.so/e5tpwzek5s8wvaaw0nio0jxoxwu0)

Niestety, poleganie wyłącznie na tym podejściu to inna kategoria znanych ci problemów:

- halucynacje
- brak determinizmu
- okazjonalne błędy składniowe
- ograniczenia okna kontekstowego

Które podejście w takim razie wybrać? Historia inżynierów Slacka pokazuje, że łączenie “starych tricków (codemods) z nowymi możliwościami (AI)” to optymalne podejście do modernizacji legacy.

### Case study Slacka: Konwersja z Enzyme do React Testing Library

Pod koniec 2023r. inżynierowie Slacka stanęli przed wyzwaniem konwersji ponad 15 000 testów z biblioteki Enzyme do React Testing Library (RTL). Enzyme nie oferował wsparcia dla najnowszej wersji Reacta 18, co wymusiło migrację w kierunku nowszej biblioteki. Aby zautomatyzować migrację, zespół Slacka próbował tradycyjnego podejścia opartego na transformacjach AST.

Na początku zidentyfikowano najczęściej używane metody Enzyme (_find, prop, simulate, text, update i inne_) i stworzono dla nich zestaw “przepisów”. Okazało się, że po utworzeniu reguł dla 10 najczęstszych metod Enzyme, zespół uzyskał jedynie 45% automatycznej konwersji kodu.

```
/* 
Źródło:  https://slack.engineering/balancing-old-tricks-with-new-feats-ai-powered-conversion-from-enzyme-to-react-testing-library-at-slack
*/
[
  { method: 'find', count: 13244 },
  { method: 'prop', count: 3050 },
  { method: 'simulate', count: 2755 },
  { method: 'text', count: 2181 },
  { method: 'update', count: 2147 },
  { method: 'instance', count: 1549 },
  { method: 'props', count: 1522 },
  { method: 'hostNodes', count: 1477 },
  { method: 'exists', count: 1174 },
  { method: 'first', count: 684 },
  ... and 55 more methods
]
```

W skali Slacka transformacje oparte o AST odsłoniły swoje ograniczenia:

1. Osiągnięcie 100% pokrycia było niemożliwe bez kosztownych inwestycji w samo na narzędzie do transformacji, gdzie niezbędny wysiłek przynosiłby okazjonalne zyski.
2. Niektóre transformacje zależały od kontekstu DOM renderowanego komponentu, do którego AST nie ma dostępu i nie potrafi go interpretować bez niestandardowych rozszerzeń.
3. Złożoność reguł rosła wykładniczo z każdą nową metodą.

Następnie zespół spróbował wykorzystać model językowy Claude 2.1 od Anthropic - chociaż dzisiaj nie znajdziemy go w żadnym rankingu liderów programowania, to wbudowane wady jak halucynacje czy brak determinizmu były odczuwalne w ten sam sposób. Podejście “AI-only” dało 40-60% skutecznych transformacji w zależności od problemu.

Przełom nastąpił dopiero wtedy, gdy zespół połączył oba podejścia, tworząc hybrydowe rozwiązanie:

1. **Kontekst dla AI** \- inżynierowie uruchamiali testy Enzyme i zapisywali renderowane drzewo DOM dla każdego przypadku testowego, dostarczając modelowi AI kluczowy kontekst.
2. **Kontrola LLM za pomocą promptów i AST** \- wykorzystali częściowo przekonwertowany kod z AST jako wejście dla modelu AI, co znacznie zmniejszyło liczbę halucynacji i nielogicznych konwersji.

W ten sposób osiągnięto skuteczność na poziomie 80%. Można przewidywać, że zdolności dzisiejszych modeli oraz scenariusze agentowe, przypominające chociażby te z lekcji o GitHub Actions, mogłyby podnieść jakość w okolice 90-100%.

![Ilustracja z lekcji](https://assets-v2.circle.so/ca2eeozw1myoeayd9btwaj6fep4h)

Z perspektywy czasu przedstawiony powyżej proces wygląda niemal identycznie do tego, jak działają Agenci AI w najlepszych edytorach typu Cursor czy Windsurf. Inżynierowie Slacka badali ten proces przeszło półtora roku temu i już wtedy zauważyli, że najlepsze efekty to połączenie przewidywalnej, statycznej analizy kodu ze zdolnościami AI w zakresie interpretacji poleceń, nauki na przykładach i złożonego rozumowania.

([Źródło](https://slack.engineering/balancing-old-tricks-with-new-feats-ai-powered-conversion-from-enzyme-to-react-testing-library-at-slack/))

### CodeConcise od Thoughtworks

Rozszerzeniem zastosowanego przez Slacka podejścia “AST+AI” jest wewnętrzne narzędzie CodeConcise rozwijane przez Thoughtworks. 

W jednym z [artykułów na blogu](https://martinfowler.com/articles/legacy-modernization-gen-ai.html) firma opisuje trzecią generację swojego rozwiązania. Poprzez parsowanie istniejącego kodu i przechowywanie jego AST w grafach wiedzy (Neo4J), inżynierowie ThoughtWorks mogą rozszerzać konwersacje prowadzone z AI o metadane na temat poszczególnych elementów kodu, ich relacji a także kolejności interpretowania poszczególnych węzłów.

![Ilustracja z lekcji](https://assets-v2.circle.so/vtr0o2audp1f3nxu12meiuqwvhy3)

Autorzy artykułu zauważają, że CodeConcise staje się asystentem w rosnącej liczbie zadań związanych z modernizacją projektów - chociaż początkowo jego potencjał dotyczył wyłącznie AST i struktury kodu, tak teraz graf wiedzy o kodzie zaczyna być rozszerzany o wymagania biznesowe czy funkcjonalne opisy danego obszaru aplikacji.

Wszystko to powiększa obszar wpływu AI na proces modernizacji - od planowania, przez mapowanie stanu obecnego na oczekiwany, aż do przeprowadzania finalnych migracji.

![Ilustracja z lekcji](https://assets-v2.circle.so/e68j3hfp9ya9p0cywyv3xi1z33h7)

## Drugie życie dokumentacji (oraz AI), czyli migration guides

Twórcy najlepszych bibliotek i frameworków dbają o to, aby na etapie migracji (szczególnie w kontekście tzw. breaking changes) nie pozostawiać użytkownika bez wsparcia. Stąd częste publikacje tzw. “migration guides” lub innych form dokumentacji, które przypadek po przypadku omawiają co zrobić na danym etapie procesu.

Dobre migration guide to zwykle:

- Szerszy kontekst - co robimy, w ramach jakiej technologii
- Opis przypadków - jak ze stanu A przejść do stanu B
- Przypadki brzegowe - jak rozwiązać niejednoznaczne sytuacje
- Dodatkowy tooling - jakie narzędzia CLI można wykorzystać w procesie

Przykład modyfikacji komponentów [w migracji Svelte 4 → 5](https://svelte.dev/docs/svelte/v5-migration-guide):

![Ilustracja z lekcji](https://assets-v2.circle.so/roz33w0idrxqx40901f4lo2lw2bw)

Tak się składa, że zdolności AI niemal idealnie wpasowują się w interpretowanie takich dokumentów - mamy tutaj wyjaśnienie kontekstu, techniczny język, przykłady stanu początkowego i końcowego, podział instrukcji na jasne etapy i obsługę przypadków brzegowych.

Zwykle, kiedy dług techniczny spłacamy w miarę regularnie, takie dokumenty zmieszczą się w oknie kontekstowym “na raz” - przykładowo [guide do Reacta 19](https://react.dev/blog/2024/04/25/react-19-upgrade-guide) to zaledwie 5 tys. tokenów:

![Ilustracja z lekcji](https://assets-v2.circle.so/z07or8kryqmx0lt9pnb76vdfosk7)

Poradniki migracji mogą być wykorzystywane jako naturalne rozszerzenie promptów wykorzystywanych w migracji technologii. Czy to jako załącznik z pliku Markdown, czy dodatkowa indeksowana dokumentacja w wybranym edytorze, np. Cursor:

![Ilustracja z lekcji](https://assets-v2.circle.so/20pyd3zadorvdciip6apz6qfyi82)

Kiedy takich dokumentów brakuje albo pracujemy w stacku legacy, można eksperymentować z dokumentacją kontekstową, generowaną przed rozpoczęciem właściwej migracji (co robi ten kod i co chcemy z nim zrobić).

Przykład takiego procesu znajdziemy w dokumentacji AWS, gdzie opisano kroki pomocnicze w konwersji kodu COBOL na zestaw mikroserwisów.

Proces rozpoczyna się od analizy istniejącego kodu przez narzędzie do statycznej analizy kodu, które generuje dokumentację dla różnych odbiorców oraz ocenia wykonalność migracji.

> Virtusa’s solution leverages Helio CodeAnalyzer to first understand the COBOL codebase to generate English documentation for different personas such as Business Analysts, System Architects, or Developers.

[(źródło)](https://aws.amazon.com/blogs/apn/accelerate-legacy-app-modernization-with-virtusa-and-aws-generative-ai/)

Następnie LLM dostępny przez Amazon Bedrock parsuje kod COBOL, dzieląc go na mniejsze sekcje i wyodrębniając kluczowe informacje o zmiennych, funkcjach i strukturach kontrolnych. Paradoksalnie, tutaj korzyścią jest brak zdolności uruchamiania kodu przez LLM (wymagająca infrastruktura), a jedynie wykonywana przez model wysokopoziomowa analiza semantyczna.

Po analizie, wszystkie składowe (zarówno kod źródłowy, dokumentacja techniczna i analiza napotkanych struktur) są wykorzystywane do generowania formatu docelowego (w artykule wspomniano o frameworku Spring Boot). 

## Architektura LLMów a modernizacja kodu

Warto pamiętać, że niektóre wady modernizacji projektu z AI będą wprost wynikać z powszechnie stosowanej architektury modeli opartej o tzw. transformery. Z tych najbardziej istotnych problemów można wymienić choćby te poniżej:

**📚 Limity okna kontekstowego:** Nie da się po prostu „wlać” całego kodu projektu do jednego promptu.Trzeba do problemu podejść strategicznie: dzielić migrację na etapy, przetwarzać pliki lub moduły pojedynczo, albo stosować opisane wyżej warstwy pośrednie (graf wiedzy, AST, LST, itp.). Nawet przy dużym oknie model może mieć trudność z utrzymaniem wszystkich szczegółów.

**🎲 Halucynacje i brak determinizmu:** LLMy mogą przekonująco halucynować, czyli generować pozornie wiarygodny kod, który jednak nie odpowiada rzeczywistości problemu. W kontekście modernizacji kodu halucynacje mogą oznaczać np. wymyślenie nieistniejącej funkcji pomocniczej, użycie złej nazwy metody, czy dodanie zbędnej logiki. Slack w swoim eksperymencie odnotował _znaczną_ zmienność jakości odpowiedzi Claude 2.1 – od „remarkably effective” po „disappointingly inadequate”

**👾 Brak gwarancji semantycznej zgodności:** Modele operują głównie na poziomie składni i statycznych podpowiedzi - w żadnym razie nie wykonują kodu i nie mają pewności co do runtime’u. Może więc zdarzyć się, że wygenerowany kod choć wygląda dobrze, to nie zachowuje się dokładnie tak samo jak oryginał w każdej sytuacji. Jest to krytycznie ważne w modernizacji legacy – celem jest przecież zachowanie identycznej funkcjonalności.

**❓ Ograniczona wiedza domenowa:** Modele mają wiedzę wynikającą ze zbioru treningowego, który z definicji jest przycięty do pewnej daty. W kontekście migracji oznacza to, że LLM może nie znać najnowszych (bardziej optymalnych niż te poznane) wersji frameworków czy narzędzi – np. jeśli projekt wymaga migracji do zupełnie nowej biblioteki, model może nie mieć o niej informacji i zacznie halucynować API. Co więcej, systemy legacy często korzystają z wewnętrznych, niestandardowych bibliotek, do których model również nie ma dostępu

Ten ostatni problem zaadresujemy w piątym module, gdzie już na początku zmierzymy się z ograniczeniami wiedzy programistycznego AI i poszukamy sposobów na to, jak ją aktualizować i poszerzać. 

Niezależnie od scenariusza i modelu, w przypadku modernizacji istniejącego systemu krytycznie ważne będą testy regresji na różnym poziomie aplikacji. W twoim projekcie musi istnieć mechanizm potwierdzający jakość funkcjonalną, który nie jest zależny od jej stanu technicznego (np. wersji JavaScript) - w praktyce najczęściej są to m.in. testowe buildy CI/CD czy test suite’y pokrywające kluczowe ścieżki użytkownika.

## 🏁 Podsumowanie lekcji

Choć sztuczna inteligencja znacząco przyspiesza modernizację i transformację kodu, nie jest automatycznym rozwiązaniem wszystkich problemów migracji w dużej skali. Jak potwierdzają obserwacje popularnych narzędzi i case study firm takich jak Slack, najskuteczniejsze podejścia łączą precyzję i przewidywalność technik opartych na AST z elastycznością i semantyczną świadomością modeli językowych. To hybrydowe rozwiązanie można obserwować również w edytorach, kiedy to Agenci Cursora, Windsurfa czy Copilota korzystają z klasycznej analizy kodu do korekty swoich zmian.

Podobnie jak w innych zadaniach, tutaj również kluczem do sukcesu jest dostarczanie AI odpowiedniego kontekstu (np. oczekiwanej struktury DOM, kodu komponentu, logów aplikacji, wyników testów, reguł linterów lub schematów). Ważne jest też precyzyjne kontrolowanie odpowiedzi poprzez starannie zaprojektowane prompty oraz podejście iteracyjne, rozpoczynające się od prostych przykładów pozwalających ocenić zachowanie modelu w twoim stacku.

Mimo wysokiej skuteczności AI w przekształcaniu kodu, weryfikacja efektów pozostaje niezbędnym etapem całego procesu. Warto więc inwestować w automatyczne testy sprawdzające poprawność konwersji oraz zapewniać różne formy toolingu - od reguł dla AI z których będą korzystać inni programiści na poziomie edytora, przez techniczne integracje i stosowanie serwerów MCP. Właśnie tym zajmiemy się w module piątym - INNOVATE.

## 👨‍💻 Ćwiczenia praktyczne

### **Zadanie 1: Konwersja do TypeScriptu**

**Cel:** Zmodernizuj 10xCMS konwertując JavaScript na TypeScript - połącz możliwości AI z klasycznym codemodem (ts-migrate).

> 👉 Podobne ćwiczenie możesz przeprowadzić na własnym projekcie legacy w JavaScript.

**Instrukcje:**

1. Z pomocą wybranego modelu AI przygotuj konfigurację masowej migracji z [ts-migrate](https://github.com/airbnb/ts-migrate) (plik ts-migrate-config.json).
2. Sprawdź, czy możliwa jest satysfakcjonująca konwersja projektu za pomocą jednego uruchomienia narzędzia ts-migrate. Jeśli nie - jakie braki i ograniczenia widzisz w tym podejściu?
3. (Alternatywnie) Przy pomocy AI konwertuj projekt plik po pliku - z jakimi ograniczeniami będziesz się mierzył w tym podejściu?
4. (Hybrydowo) Połącz możliwości AI oraz ts-migrate do wykonania pełnej migracji na TS.
![Ilustracja z lekcji](https://assets-v2.circle.so/ekrtcr8j44qd531ut1i2iwox5c9h)