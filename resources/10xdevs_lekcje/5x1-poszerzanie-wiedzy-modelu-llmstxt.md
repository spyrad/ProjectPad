---
title: "[5x1] Poszerzanie wiedzy modelu - LLMs.txt"
course: "10xdevs-2"
source: "Przeprogramowani.pl"
exported: "2025-11-09"
format: "markdown"
---

## 

![Ilustracja z lekcji](https://assets-v2.circle.so/1fx5feeqoa74qditomizprh73c53)

## Wprowadzenie

Przy programowaniu z LLM coraz większym wyzwaniem staje się dostarczanie modelom aktualnej, dokładnej wiedzy. Choć współczesne LLM imponują swoimi możliwościami, borykają się z problemem nieaktualnych informacji, szczególnie w szybko rozwijających się dziedzinach takich jak web development.

W tej lekcji poznamy mechanizm **in-context learning** \- zdolność modeli AI do tymczasowego uczenia się z dostarczonego kontekstu bez potrzeby ponownego trenowania. Odkryjemy, jak przekazywać modelom aktualne informacje, aby generowały dokładniejszy i bardziej użyteczny kod.

Szczególną uwagę poświęcimy standardowi **llms.txt** zaproponowanemu przez Jeremy'ego Howarda - rozwiązaniu analogicznemu do robots.txt, lecz skierowanemu do modeli AI. Ten prosty plik w formacie Markdown stanowi skondensowane źródło wiedzy eksperckiej, ułatwiając modelom dotarcie do aktualnej dokumentacji projektów i bibliotek.

Wszystko to w celu usprawnienia codziennej pracy programistycznej i maksymalizacji korzyści płynących z wykorzystania narzędzi AI w procesie wytwarzania oprogramowania.

## Nauka modelu za pomocą kontekstu 

**In-context learning** to mechanizm, dzięki któremu duże modele językowe (LLM) potrafią dostosować się do nowych zadań lub informacji na podstawie dostarczonego kontekstu, bez potrzeby ponownego trenowania modelu. 

W praktyce oznacza to, że model otrzymuje w prompcie dodatkowe dane – np. opis zadania, reguły czy nawet przykłady – i **tymczasowo „uczy się” na ich podstawie** podczas generowania odpowiedzi. Wszystko dzieje się wyłącznie w trakcie wnioskowania (inference), a po zakończeniu konwersacji model nie zachowuje na stałe tej wiedzy. 

Innymi słowy, wiedza zdobyta w ten sposób jest ulotna – model zapomina ją po zakończeniu konwersacji. Mimo to, odpowiednio podany kontekst potrafi znacząco wpłynąć na jakość odpowiedzi modelu i pozwala mu wyjść poza ograniczenia własnego treningu.

W tym kursie wykorzystywaliśmy wielokrotnie in-context learning na różne sposoby. Podstawowym było tworzenie **dokumentów planistycznych** – plików tekstowych opisujących wymagania, architekturę lub plan działania dla danego zadania (prd.md, db-plan.md, endpoint-implementation-plan.md)

Tego typu „pomoce naukowe” dla AI są formą in-context learning, bo model podąża za dostarczonymi instrukcjami zamiast polegać wyłącznie na własnej (niekoniecznie aktualnej) wiedzy.

Inną formą in-context learning są **„Rules for AI”** (reguły dla AI), czyli plików z regułami, które są dołączane do kontekstu rozmowy. W praktyce są to po prostu dodatkowe instrukcje, które model traktuje je jako wytyczne podczas generowania kodu. 

Reguły i dokumenty planistyczne działają na podobnej zasadzie – to **my uczymy model w kontekście bieżącej sesji**, zamiast polegać jedynie na tym, co zostało w niego „wbudowane” podczas trenowania.

Dlaczego to takie ważne? Otóż nawet najnowocześniejsze modele mają ograniczenia, jeśli chodzi o aktualność wiedzy a tym bardziej zrozumienie potrzeb wybranej firmy, zespołu czy programisty.

LLMy są trenowane na ogromnych zbiorach danych, ale **są to dane historyczne** – np. do 2023/2024 roku. Jeżeli korzystamy z najnowszych bibliotek (Next.js 15, Tailwind 4 itp.), model często „halucynuje” nieistniejące API albo generuje niepoprawny kod. 

Dla web developera oznacza to, że **asystent AI bez dodatkowej wiedzy może w niektórych zadaniach wnosić więcej szkody niż pożytku.** Tutaj raz jeszcze musimy skorzystać z mechanizmu in-context learning.

Przykładem może być przekazanie fragmentów oficjalnej dokumentacji Next.js do konwersacji z Cursorem. Większość modeli ma ograniczoną wiedzę o technologiach wydanych w drugiej połowie 2024 roku, więc może nie znać szczegółów Next.js 15\. Możemy jednak skopiować z dokumentacji opis danego mechanizmu i dodać go do konwersacji z agentem . W ten sposób model „przeczyta” ten fragment i użyje go podczas generowania sugestii. 

Takie podejście jest skuteczne, choć ma swoje ograniczenia:

- ręczne kopiowanie dokumentacji bywa żmudne,
- kopiując całość łatwo przekroczyć okno kontekstowe,
- model może nie uchwycić szerszego obrazu jeśli dostarczymy mu wyrywkowe dane
- model może gubić informacje o szczegółach, jeżeli przekażemy mu za dużo informacji

Niemniej jednak, przekazywanie dokumentacji do kontekstu zwykle potrafi ukierunkować model na poprawne tory i zapobiec halucynacjom nieistniejących funkcji.

## llms.txt – propozycja standardu od Jeremy Howarda

Kolejnym aspektem problemu nieaktualnej wiedzy modeli jest standaryzacja sposobu, w jaki dostarczamy im aktualne informacje. Tutaj na scenę wchodzi plik **llms.txt** – zaproponowany we wrześniu 2024 r. standard autorstwa prof. Jeremy’ego Howarda ([llmstxt.org](https://llmstxt.org/))

![Ilustracja z lekcji](https://assets-v2.circle.so/pzbahggxim2zor8et5x5i0q8sc5y)

Stoi za nim prosta idea: skoro roboty sieciowe mają robots.txt i mapy witryn (sitemaps) do nawigacji po stronach, to stwórzmy analogiczny mechanizm dla modeli AI, aby **łatwo przekazać im skondensowaną wiedzę o zawartości strony lub projektu**.

**Czym jest llms.txt?** W dużym skrócie, to plik w formacie Markdown, umieszczany w głównym katalogu strony (pod URL /llms.txt), zawierający przyjazne dla AI streszczenie i spis treści dokumentacji danej strony czy projektu. Jeremy Howard opisuje go jako **„LLM-friendly content”** – zwięzłe, eksperckie informacje zebrane w jednym miejscu, **czytelne zarówno dla człowieka, jak i dla modelu**. 

![Ilustracja z lekcji](https://assets-v2.circle.so/a7olgbmetaz2v3kvgumzgjk561gs)

 _Przykład llms.txt dla strony_ [_astro.build/llms.txt_](https://astro.build/llms.txt)

Taki plik zwykle zawiera krótkie tło projektu, ważne wskazówki oraz listę odnośników do szczegółowych plików (np. dokumentacji) – przy czym w idealnym scenariuszu te szczegółowe strony również mają swoje wersje .md do łatwego przetworzenia przez AI. 

W efekcie model otrzymuje coś w rodzaju **skompresowanej dokumentacji**, którą może szybko wczytać w oknie kontekstu, zamiast próbować przeszukiwać setki podstron pełnych nawigacji, reklam czy zbędnego szumu ze standardowych stron HTML.

Standard **llms.txt** ma na celu **ułatwić modelom dotarcie do aktualnej wiedzy**. Zamiast liczyć, że model sam „wygrzebie” potrzebne informacje z internetu za pomocą wyszukiwarki @Web, możemy mu podać gotowe podsumowanie i ścieżki do źródeł. 

Rozwiązuje to częściowo problem **fragmentacji źródeł wiedzy** – obecnie dokumentacja bywa rozproszona (osobne strony dla każdej funkcji, blogi z poradami, wiki społeczności itp.), co utrudnia AI znalezienie konkretnej informacji w trakcie pojedynczej sesji. Dzięki llms.txt autor strony czy biblioteki może **zunifikować najważniejsze informacje w jednym pliku**, wskazując jednocześnie, gdzie szukać szczegółów. To znacznie zmniejsza obciążenie modelu – nie musi crawlować całej witryny, wystarczy że przeczyta przygotowane podsumowanie. 

Dobrze opracowany plik llms.txt **standaryzuje format** takich podsumowań, co oznacza, że różne narzędzia AI mogą go przetwarzać w zautomatyzowany sposób (np. parsować po nagłówkach, czytać listę plików).

Co ważne, llms.txt **nie zastępuje pełnej dokumentacji**, a raczej ją uzupełnia. Zwykle to plik względnie krótki, zawierający opisy i linki, ale bez całego kodu źródłowego dokumentacji. Dlatego często towarzyszy mu drugi plik – **llms-full.txt** – który zawiera już _pełną_ treść dokumentacji w jednym pliku (flattened content). Różnica jest taka, że llms.txt to **spis treści z opisami**, wymagający od narzędzia AI podążania za linkami, natomiast llms-full.txt to **wszystko w jednym**. Ten drugi bywa bardzo duże (setki tysięcy tokenów, przez co zwykle nie zmieści się w kontekście modelu. Jak sobie z tym poradzić? O tym w kolejnej sekcji.

Niezależnie od podejścia, standaryzacja jest kluczowa – ujednolicony format oznacza, że narzędzia deweloperskie mogą automatycznie rozpoznawać i wykorzystywać llms.txt, jeśli jest dostępny.

W ciągu ostatnich miesięcy coraz więcej projektów eksperymentuje z tym standardem. Przykładowo, Stripe udostępniło plik llms.txt dla swojej dokumentacji API, a społeczność Angulara zaproponowała dodanie takich plików do oficjalnej strony Angular.dev ([Github Issue](https://github.com/angular/angular/issues/60434) autorstwa kursanta 10xDevs, Pawła - pozdro!)

Można więc przypuszczać, że z czasem llms.txt stanie się tak oczywisty, jak dziś robots.txt – zwłaszcza jeśli IDE i edytory zaczną natywnie go obsługiwać. 

## 🏁 Podsumowanie

W tej lekcji poznaliśmy mechanizmy uzupełniania wiedzy modeli językowych oraz standaryzacji przekazywania im aktualnych informacji:

- **In-context learning** \- mechanizm pozwalający modelom językowym dostosować się do nowych zadań lub informacji bez ponownego trenowania, poprzez dostarczenie kontekstu w trakcie wnioskowania (dokumenty planistyczne, reguły dla AI).
- **Problem nieaktualnej wiedzy** \- nawet najnowocześniejsze modele mają ograniczenia dotyczące aktualności wiedzy, zwłaszcza o nowych technologiach, co prowadzi do "halucynowania" nieistniejących API lub generowania niepoprawnego kodu.
- **Standard llms.txt** \- zaproponowany przez Jeremy'ego Howarda format pliku Markdown umieszczanego w głównym katalogu strony, zawierający przyjazne dla AI streszczenie i spis treści dokumentacji, ułatwiający modelom dotarcie do aktualnej wiedzy.
- **Tryby konsumowania wiedzy** \- możliwość ręcznego wyszukiwania potrzebnych fragmentów dokumentacji lub automatycznego wstrzykiwania przez MCP

Pamiętaj, że wymienione techniki nie wykluczają się wzajemnie - najlepsze efekty osiągniesz łącząc je. Dzięki wykorzystaniu mechanizmów in-context learning, standardu llms.txt oraz narzędzi takich jak Context7, możesz znacząco poprawić jakość generowanego kodu i zredukować problemy związane z nieaktualnymi wzorcami.

### **👨‍💻 Ćwiczenia praktyczne**

> 👉 Jeśli pracujesz nad projektem zaliczeniowym, potraktuj poniższe ćwiczenie jako opcjonalne - podejdź do niego w momencie, kiedy znajdziesz więcej czasu.

**Zadanie 1: Porównanie skuteczności różnych metod dostarczania kontekstu**

**Cel**: Analiza efektywności różnych podejść do in-context learning.

**Instrukcje**:

1. Wybierz konkretne zadanie programistyczne wymagające znajomości najnowszej wersji frameworka/biblioteki
2. Przetestuj następujące metody dostarczania kontekstu:  
   - Bezpośrednie zapytanie bez dodatkowego kontekstu (baseline)  
   - Ręczne skopiowanie fragmentu dokumentacji z oficjalnej strony  
   - Wykorzystanie Context7 do wyszukania odpowiedniego fragmentu  
   - Użycie pełnego pliku llms.txt (jeśli dostępny dla danej technologii)
3. Dla każdej metody wykonaj to samo zadanie, korzystając z tego samego modelu AI
4. Ocenić wyniki pod kątem:  
   - Poprawności wygenerowanego kodu  
   - Liczby halucynacji lub błędnych sugestii  
   - Czasu potrzebnego na uzyskanie poprawnego rozwiązania  
   - Objętości kontekstu (liczby tokenów)
5. Udokumentuj wnioski, określając najefektywniejszą metodę dla wybranego zadania

**Ważne**: W zadaniach możesz wykorzystać różne modele AI (Claude, GPT, Gemini), aby porównać jak różne modele reagują na dostarczony kontekst. Celem jest nie tylko wykonanie zadań, ale także zrozumienie, jak efektywnie wykorzystywać mechanizm in-context learning w codziennej pracy.

![Ilustracja z lekcji](https://assets-v2.circle.so/ekrtcr8j44qd531ut1i2iwox5c9h)