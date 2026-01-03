---
title: "[4x1] Zrozumieć Legacy Code - onboarding"
course: "10xdevs-2"
source: "Przeprogramowani.pl"
exported: "2025-11-09"
format: "markdown"
---

![Ilustracja z lekcji](https://assets-v2.circle.so/suqr6p4cwdllecrjc13buztrfsq4)

## Wprowadzenie

W pracy developera nieustannie stajemy przed wyzwaniem pracy z istniejącymi systemami. Niezależnie od tego, czy dołączamy do nowego zespołu, przejmujemy projekt po poprzednikach, czy stajemy przed zadaniem modernizacji wieloletniego systemu - konieczność zrozumienia zastanego kodu jest naszą codziennością.

W tym module skupimy się na dwóch kluczowych kontekstach pracy z zastanym kodem: legacy i brownfield. Choć często używane zamiennie, te terminy opisują różne sytuacje i wymagają odmiennego podejścia.

**Legacy code** to kod, który istnieje od dłuższego czasu, często nieobjęty testami, słabo udokumentowany, napisany w przestarzałych technologiach. To system, który "działa i nie ruszamy", bo boimy się konsekwencji zmian.

**Brownfield** natomiast to projekty istniejące, ale niekoniecznie przestarzałe - to cały ekosystem zastanego kodu, infrastruktury i procesów, do których musimy się zintegrować. Może to być nowoczesny system, który przejmujemy po innym zespole, lub projekt klienta, do którego dołączamy jako konsultanci.

W tej lekcji nauczysz się wykorzystywać nowoczesne narzędzia AI do szybkiego onboardingu w obu tych scenariuszach. Pokażemy Ci, jak efektywnie zrozumieć strukturę projektu, zidentyfikować kluczowe komponenty i przygotować się do bezpiecznej modernizacji lub rozbudowy systemu. 

Będziemy wykorzystywali LLMy do analizy kodu, generowania diagramów i tworzenia brakującej dokumentacji - wszystko po to, aby skrócić czas potrzebny na efektywne rozpoczęcie pracy z istniejącym kodem.

## Praktyczne zastosowania w analizie kodu

![Ilustracja z lekcji](https://assets-v2.circle.so/bz821m8mj5hgvlwcawowken7a3dl)

Zaczniemy od prezentacji jak wykorzystać potencjał Gemini 2.5 Pro do analizy dużych projektów brownfield, na przykładzie [Excalidraw](https://excalidraw.com/) \- aplikacji open-source liczącej ponad 150 tysięcy linii kodu TypeScript i React.

Excalidraw to narzędzie do tworzenia wirtualnych tablic do współpracy, które umożliwia łatwe szkicowanie diagramów o odręcznym charakterze. Świetnie sprawdza się przy planowaniu architektury oraz tworzeniu materiałów wizualnych do prezentacji.

W każdym z naszym kursów mamy kilka diagramów stworzonych z użyciem Excalidraw, więc cenimy ten projekt za wartość którą wnosi do naszych szkoleń. 

Dwie najbliższe lekcją obejmują:

1. Lekcja 4×1: Tworzenie kompleksowego dokumentu onboardingowego dla nowych developerów w dwóch wydaniach:  
   1. Brownfield ([repo Excalidraw](https://github.com/excalidraw/excalidraw))  
   2. Legacy ([repo 10xCMS](https://github.com/przeprogramowani/10x-cms))
2. Lekcja 4×2: Generowanie action planu do wsparcia nas w procesie debugowania zastanego kodu na przykładzie issue zgłoszonego w repo excalidraw
3. Lekcja 4×2: Wykorzystanie action planu przy analizie i debugowaniu problemu:  
   1. Sugestie i implementacja logów w kodzie, które pomogą nam w analizie problemu  
   2. Analiza zgromadzonych logów, aby wypracować lepsze hipotezy dotyczącymi źródeł problemów - może być ich bardzo dużo, tak jak to zaobserwujesz w filmie (91k tokenów)  
   3. Iteracyjna aktualizacja action planu na podstawie nowych informacji

Jest się czego uczyć i testować, więc przejdźmy do czynów!

## Wdrażanie się w duże projekty - jak to zrobić szybko i z głową?

Historia Git to nieocenione źródło wiedzy o projekcie, które często pozostaje niewykorzystane. Zapisana w niej ewolucja kodu stanowi mapę dla każdego, kto chce zrozumieć rzeczywistą strukturę i dynamikę rozwoju aplikacji. 

W kontekście wprowadzania nowych deweloperów do projektu, analiza historii repozytorium pozwala w praktyczny sposób zastosować zasadę Pareto - zrozumienie 20% kluczowego kodu może dać nam 80% wiedzy o całym systemie, której potrzebujemy wdrażając się w codebase.

Przedstawione w tej lekcji skrypty Git służą do odkrywania "hot spotów" - najczęściej modyfikowanych modułów i plików w repozytorium. Ta informacja jest szczególnie cenna przy:

- Onboardingu nowych członków zespołu
- Planowaniu refaktoryzacji
- Identyfikacji potencjalnych obszarów ryzyka
- Priorytetyzacji code review

W połączeniu z modelami językowymi, takimi jak Gemini 2.5 Pro, analiza strukturalna bazująca na historii zmian dostarcza kontekstu niezbędnego do głębszego zrozumienia architektury projektu. Model AI, mając dostęp do informacji o częstotliwości zmian i powiązaniach między plikami, może lepiej interpretować logikę biznesową i sugerować rozwiązania zgodne z ustalonymi wzorcami w projekcie.

## Skrypty git do analizy hotspotów

### 1\. Skrypt do analizy plików

Ten skrypt identyfikuje najczęściej modyfikowane pliki w repozytorium w ciągu ostatniego roku, co pozwala określić hot spoty kodu - miejsca, gdzie zachodzi najwięcej zmian i które mogą wymagać szczególnej uwagi.

**Dla systemów Unix/Linux:**

```
git log --since="1 year ago" --pretty=format:"" --name-only --no-merges | \
  grep -vE "${EXCLUDE_PATTERN_GREP:-^$}" | \
  grep '.' | \
  sort | \
  uniq -c | \
  sort -nr | \
  head -n 10 | \
  awk '{count=$1; $1=""; sub(/^[ \t]+/, ""); print $0 ": " count " changes"}' | cat
```

### Omówienie skryptu krok po kroku

1. _git log --since="1 year ago"_ \- pobiera historię commitów z ostatniego roku
2. _\--pretty=format:""_ \- usuwa opis commitów, zostawiając tylko nazwy plików
3. _\--name-only_ \- wyświetla tylko nazwy zmienionych plików
4. _\--no-merges_ \- wyklucza merge commity, co daje czystszy obraz zmian
5. _grep -vE "${EXCLUDE\_PATTERN\_GREP:-^$}"_ \- filtruje niechciane pliki według wzorca regex
6. _grep '.'_ \- usuwa puste linie
7. _sort | uniq -c_ \- zlicza wystąpienia każdego pliku
8. _sort -nr_ \- sortuje malejąco według liczby zmian
9. _head -n 10_ \- wybiera 10 najczęściej modyfikowanych plików
10. _awk '{...}'_ \- formatuje wynik do czytelnej postaci "nazwa\_pliku: X changes"

### Ustawianie EXCLUDE\_PATTERN\_GREP

Zmienna EXCLUDE\_PATTERN\_GREP pozwala wykluczyć pliki według wzorca regex. Przykłady użycia:

```
# Wykluczenie plików konfiguracyjnych
EXCLUDE_PATTERN_GREP='(\.yml$|\.yaml$|\.config\.js$)'

# Wykluczenie testów i dokumentacji
EXCLUDE_PATTERN_GREP='(test|spec|docs?/)'

# Wykluczenie plików z node_modules i build
EXCLUDE_PATTERN_GREP='(node_modules|dist|build|\.gitignore)'

# Złożony wzorzec - wyklucza wiele typów plików
EXCLUDE_PATTERN_GREP='(\.svg$|\.png$|\.jpg$|package-lock\.json|yarn\.lock|\.md$)'

# Użycie w skrypcie
EXCLUDE_PATTERN_GREP='(test|spec)' 
git log --since="1 year ago" --pretty=format:"" --name-only --no-merges | \
  grep -vE "${EXCLUDE_PATTERN_GREP:-^$}" | \
  grep '.' | \
  sort | \
  uniq -c | \
  sort -nr | \
  head -n 10 | \
  awk '{count=$1; $1=""; sub(/^[ \t]+/, ""); print $0 ": " count " changes"}' | cat
```

Właściwe EXCLUDE\_PATTERN\_GREP najłatwiej ustalić poprzez uruchomienie skryptu. Jeżeli rzucą nam się w oczy jakieś pliki, które trafią do top10 a niewiele wniosą do analizy hot spotów (np. package.json, pliki i18n, fonty) to warto dodać je do ścieżki wykluczeń.

**Dla Windows:**

Rekomendowanym sposobem jest wykorzystanie tego samego skryptów przez [Git Bash](https://gitforwindows.org/) lub Windows Subsystem for Linux (WSL). Alternatywnie przygotowaliśmy skrypt PowerShell:

```
git log --since="1 year ago" --pretty=format:"" --name-only --no-merges | 
  Where-Object { $_ -match '\S' } | 
  Where-Object { $_ -notmatch "" } | 
  Group-Object | 
  Sort-Object -Property Count -Descending | 
  Select-Object -First 10 | 
  ForEach-Object { "$($_.Name): $($_.Count) changes" }

```

### 2\. Skrypt do analizy modułów

Kolejny skrypt analizuje, które moduły (katalogi) są najczęściej modyfikowane, dostarczając informacji o ogólnej strukturze projektu i kluczowych obszarach rozwoju.

**Dla systemów Unix/Linux:**

```
git log --since="1 year ago" --pretty=format:"" --name-only --no-merges | \
  grep -vE "${EXCLUDE_PATTERN_GREP:-^$}" | \
  grep '.' | \
  awk -F/ -v OFS=/ 'NF > 1 {$NF = ""; print $0 } NF <= 1 { print "." }' | \
  sed 's|/*$||' | \
  sed 's|^\\.$|project root|' | \
  sort | \
  uniq -c | \
  sort -nr | \
  head -n 10 | \
  awk '{count=$1; $1=""; sub(/^[ \t]+/, ""); print $0 ": " count " changes"}' | cat
```

**Dla Windows (PowerShell):**

```
git log --since="1 year ago" --pretty=format:"" --name-only --no-merges | 
  Where-Object { $_ -match '\S' } | 
  Where-Object { $_ -notmatch "(package\.json$|package-lock\.json$|yarn\.lock$|^node_modules/|^dist/|^build/|\.log$|\.svg$|\.png$|\.ico$|\.map$|\.d\.ts$|README\.md$|\.gitignore$|CHANGELOG\.md$|LICENSE$)" } | 
  ForEach-Object {
    if ($_ -match "/") {
      $parts = $_ -split "/"
      $parts[0..($parts.Length-2)] -join "/"
    } else {
      "project root"
    }
  } | 
  Group-Object | 
  Sort-Object -Property Count -Descending | 
  Select-Object -First 10 | 
  ForEach-Object { "$($_.Name): $($_.Count) changes" }

```

### 3\. Skrypt do Analizy Kontrybutorów

Ten skrypt identyfikuje najaktywniejszych kontrybutorów projektu, dostarczając informacji o tym, kto najlepiej zna repozytorium i poszczególne jego obszary.

**Dla systemów Unix/Linux:**

```
git log --since="1 year ago" --pretty=format:"%an <%ae>" --no-merges |\
  sort |\
  uniq -c |\
  sort -nr |\
  head -n 5 |\
  awk '{count=$1; $1=""; sub(/^[ \t]+/, ""); print $0 ": " count " commits"}'
```

**Dla Windows (PowerShell):**

```
git log --since="1 year ago" --pretty=format:"%an <%ae>" --no-merges | 
  Group-Object | 
  Sort-Object -Property Count -Descending | 
  Select-Object -First 5 | 
  ForEach-Object { "$($_.Name): $($_.Count) commits" }
```

### Wyniki Analizy Excalidraw

**Najczęściej modyfikowane pliki**

```
packages/excalidraw/components/App.tsx: 86 changes
packages/excalidraw/element/binding.ts: 36 changes
packages/excalidraw/types.ts: 27 changes
packages/excalidraw/tests/__snapshots__/history.test.tsx.snap: 27 changes
packages/excalidraw/data/restore.ts: 27 changes
```

Analiza pokazuje, że centralnym elementem aplikacji jest App.tsx z 86 zmianami, co sugeruje, że jest to "serce" aplikacji, które integruje większość funkcjonalności. Znaczącą rolę odgrywają również mechanizmy wiązania elementów (binding.ts) oraz definicje typów (types.ts).

**Najaktywniejsze moduły**

```
packages/excalidraw/components: 380 changes
packages/excalidraw/element: 369 changes
packages/excalidraw/actions: 288 changes
packages/excalidraw: 259 changes
packages/excalidraw/tests: 231 changes
```

Te wyniki ujawniają, że największa aktywność koncentruje się wokół komponentów UI, logiki rysowania, systemu akcji i testów. To daje jasny obraz architektury aplikacji opartej na komponentach React z wydzieloną logiką elementów i systemem akcji.

**Najaktywniejsi kontrybutorzy**

```
David Luzar <5153846+dwelle@users.noreply.github.com>: 99 commits
Márk Tolmács <mark@lazycat.hu>: 45 commits
Marcel Mraz <marcel@excalidraw.com>: 35 commits
Ryan Di <ryan.weihao.di@gmail.com>: 26 commits
Aakansha Doshi <aakansha1216@gmail.com>: 16 commits
```

Te informacje identyfikują głównych ekspertów projektu, do których można się zwrócić z pytaniami dotyczącymi konkretnych obszarów.

## Wstępna analiza projektu

Za chwilę w formie video przedstawimy prompt dla Gemini 2.5 Pro, który wykorzystuje zebrane dane do automatycznego generowania planu onboardingu dla nowych deweloperów. Jest to szczególnie wartościowe dla dużych projektów, ponieważ:

1. **Automatycznie identyfikuje kluczowe obszary** \- Na podstawie analizy git, AI może wskazać najważniejsze moduły i pliki wymagające szczególnego zrozumienia.
2. **Określa ostatnie kierunki rozwoju** \- Informacje o najczęściej modyfikowanych plikach pokazują, gdzie obecnie skupiony jest wysiłek zespołu.
3. **Identyfikuje ekspertów dziedzinowych** \- Analiza kontrybutorów pomaga wskazać, kto ma wiedzę ekspercką w poszczególnych obszarach.
4. **Tworzy ustrukturyzowany dokument wprowadzający** \- Generuje dokument zawierający wszystkie niezbędne informacje dla nowego dewelopera, w tym sekcje:  
   - Przegląd projektu  
   - Kluczowe moduły  
   - Główni kontrybutorzy  
   - Obszary złożoności  
   - Pytania dla zespołu  
   - Kolejne kroki (jak zacząć)  
   - Pomocne zasoby (issue tracking, komunikacja z core team)

Zobacz zastosowanie prompta w praktyce na przykładzie repozytorium Excalidraw:

🎥 **VIDEO**: [Watch here](https://player.vimeo.com/video/1077106311?app_id=122963&byline=0&badge=0&portrait=0&title=0)

**Ważne dla userów Cursora:** w lekcji korzystałem z wersji modelu Gemini 2.5 Pro (MAX), która jest dodatkowo płatna za każde zapytanie i wywołanie narzędzi. 

👉 Aby uniknąć dodatkowych kosztów, korzystaj z “gemini-2.5-pro” (więcej informacji znajdziesz w [cenniku modeli Cursora](https://docs.cursor.com/settings/models)). MAX pozwala pracować na kontekście przekraczającym 120 tysięcy tokenów. 

Skorzystaj z prompta - [Wstępna analiza projektu](https://10xrules.ai/prompts?org=10xdevs&collection=m4-legacy&segment=l1-onboarding&prompt=7abc8860-a01b-414d-9d56-25facb0030cc).

Poniżej plik onboarding.md dla Excalidraw wygenerowany z tym promptem podczas nagrywania lekcji:

[onboarding.md](https://assets-v2.circle.so/6f78tvjg3odnd5km1axp7gjf5guc)

Ten dokument zawiera wstępny przegląd projektu, opisuje jego strukturę, identyfikuje kluczowe moduły i najaktywniejsze obszary, a także sugeruje pytania dla zespołu i kolejne kroki dla nowego dewelopera.

Ważne: aby osiągnąć dobre efekty potrzebujemy modelu reasoningowego z dużym efektywnym oknem kontekstowym. Gemini 2.5 Pro, GPT-5 i Claude 4.5 Sonnet zapewniają tutaj stabilne wyniki. 

## Pogłębianie dokumentacji onboardingowej 

Wcześniej omówiliśmy, jak wykorzystać skrypty git do stworzenia podstawowego dokumentu onboardingowego dla nowych deweloperów dołączających do projektu. Teraz pójdziemy o krok dalej i wykonany pogłębioną analizę modułów i plików przy użyciu Gemini 2.5 Pro, co pozwoli nam stworzyć znacznie bardziej kompleksowy i wartościowy dokument onboardingowy.

## Strategia pogłębionej analizy

Po wygenerowaniu podstawowego dokumentu onboardingowego możemy zastosować serię wyspecjalizowanych promptów, które pomogą nam dokładniej zrozumieć strukturę projektu i najważniejsze elementy kodu. Przedstawione prompty tworzą trzyetapowy proces pogłębiania analizy, który wykonujemy w ramach jednej konwersacji z Gemini 2.5 Pro. 

### 

## Pogłębiona analiza projektu Excalidraw (case study)

🎥 **VIDEO**: [Watch here](https://player.vimeo.com/video/1077106289?app_id=122963&byline=0&badge=0&portrait=0&title=0)

W przypadku projektu Excalidraw, ta pogłębiona analiza pozwoliła zidentyfikować:

1. **Rzeczywiste zależności między modułami** \- np. jak dokładnie packages/excalidraw/components wchodzi w interakcje z packages/element
2. **Kluczowe pliki integracyjne** \- jak App.tsx (86 zmian) łączy wszystkie elementy systemu
3. **Obszary aktywnego rozwoju** \- np. obsługa wiązań między elementami (binding.ts z 36 zmianami)
4. **Potencjalne wyzwania** \- identyfikacja plików z wysoką częstotliwością zmian i wieloma kontrybutorami

### 1\. Prompt do analizy modułów

Skorzystaj z prompta - [**Dogłębna analiza głównych modułów**](https://10xrules.ai/prompts?org=10xdevs&collection=m4-legacy&segment=l1-onboarding&prompt=284e77e5-2cb3-4995-b5c6-0f6b4ae01603)

**Kluczowe elementy tego promptu:**

- Identyfikacja wszystkich głównych modułów z dokumentu onboardingowego
- Analiza historii git dla każdego modułu
- Podsumowanie roli, struktury i ostatnich obszarów aktywności dla każdego modułu
- Analiza relacji między modułami

**Wartość dla onboardingu:** Ten prompt pozwala uzyskać głębsze zrozumienie każdego modułu, bazując nie tylko na statycznych opisach, ale także na rzeczywistej historii zmian w kodzie. Szczególnie cenne jest odkrywanie wzorców i trendów w ostatniej aktywności, co daje nowym deweloperom wgląd w aktualne priorytety zespołu.

## 2\. Prompt do analizy kluczowych plików

Skorzystaj z prompta - [**Analiza kluczowych plików**](https://10xrules.ai/prompts?org=10xdevs&collection=m4-legacy&segment=l1-onboarding&prompt=8a063d3a-f71a-41f5-8b8d-bf42717bdd17)

**Trzy fazy analizy plików:**

1. **Identyfikacja** \- określenie 10 najważniejszych plików na podstawie częstotliwości zmian
2. **Analiza historii git** \- badanie ostatnich commitów do każdego pliku
3. **Analiza zawartości plików** \- badanie rzeczywistego kodu i jego struktury

**Wartość dodana:** Ten prompt pozwala przejść od wysokopoziomowej analizy modułów do szczegółowych informacji o konkretnych plikach. Dla nowego dewelopera zrozumienie kluczowych plików, ich przeznaczenia oraz ostatnich zmian jest nieocenione. Szczególnie wartościowe jest powiązanie plików z ogólną architekturą systemu, które Gemini 2.5 Pro opisuje naprawdę nieźle (chociaż wciąż nieidealnie).

## 3\. Prompt do syntezy i aktualizacji dokumentu onboardingowego

Skorzystaj z prompta - [Synteza dokumentacji onboardingowej](https://10xrules.ai/prompts?org=10xdevs&collection=m4-legacy&segment=l1-onboarding&prompt=3b5f1ca8-82a4-4753-8c96-d72261eed8c8).

**Kluczowe elementy aktualizacji:**

- Wzbogacenie opisów modułów o nowe odkrycia
- Aktualizacja informacji o kluczowych kontrybutorach
- Synteza aktualnych obszarów rozwoju i priorytetów
- Identyfikacja potencjalnych obszarów złożoności
- Tworzenie celnych pytań dla zespołu
- Rekomendacja konkretnych kroków dla nowych deweloperów

**Wartość końcowa:** Ten prompt pozwala połączyć wszystkie znalezione informacje w spójny, zaktualizowany dokument onboardingowy, który będzie znacznie bardziej wartościowy dla nowych deweloperów niż wersja początkowa. Dokument zawiera nie tylko statyczne opisy, ale także informacje o aktualnych trendach rozwoju, potencjalnych wyzwaniach i konkretnych krokach do podjęcia.

O to pogłębiony plik onboardingowy, który wygenerowałem podczas nagrywania lekcji:

[onboarding.md](https://assets-v2.circle.so/idh73dysos8nsv6fv1zxqocaljvl)

Przedstawione prompty tworzą kompleksowy proces analizy projektu, który znacząco wzbogaca dokumentację onboardingową. Przy użyciu Gemini 2.5 Pro, można szybko stworzyć dogłębny obraz projektu dla nowych deweloperów, oszczędzając im tygodni samodzielnej eksploracji kodu i pozwalając szybciej stać się produktywnymi członkami zespołu.

Ta metodologia jest szczególnie wartościowa dla dużych projektów o złożonej strukturze, takich jak Excalidraw, gdzie zrozumienie architektury i ostatnich trendów rozwoju jest kluczowe dla efektywnej pracy.

## Analiza projektów bez rozbudowanej historii git

Do tej pory omawialiśmy metody analizy projektów z wykorzystaniem bogatej historii git, która stanowi cenny źródło informacji o kluczowych modułach, plikach i kontrybutorach. Jednak w praktyce często spotykamy projekty, które:

1. Są na wczesnym etapie rozwoju
2. Miały niedawno zresetowaną historię git
3. Zostały zmigrowane z innego systemu kontroli wersji
4. Mają nieczytelną lub niejednolitą historię commitów

W takich przypadkach analiza wyłącznie w oparciu o historię git może być niewystarczająca lub wręcz niemożliwa. Dla takich projektów potrzebujemy innego podejścia, które koncentruje się na bezpośredniej eksploracji struktury repozytorium.

## Prompt do analizy projektów bez rozbudowanej historii git

Przedstawiony prompt zapewnia kompleksowe podejście do analizy projektów bez polegania na historii git:

Skorzystaj z prompta - [Analiza projektu bez historii git](https://10xrules.ai/prompts?org=10xdevs&collection=m4-legacy&segment=l1-onboarding&prompt=1aa0d2e3-e45f-4810-ac35-28841df40952).

### Kluczowe elementy tego prompta:

**1\. Eksploracja struktury projektu**

Zamiast polegać na historii git, model bezpośrednio analizuje strukturę katalogów używając narzędzia list\_dir. To pozwala zidentyfikować główne komponenty projektu.

```
- Use list_dir to understand the directory structure.
- Identify key directories (e.g., src, docs, tests).
- Write down the main directories you've found.
```

**2\. Analiza modułów i komponentów**

Model używa narzędzi file\_search i file\_read do identyfikacji i analizy głównych plików źródłowych, co pozwala określić architekturę projektu.

```
- Use file_search and file_read to identify and examine main source code files.
- Determine the project's primary programming language(s) and frameworks.
- List each core module/component you've identified, numbering them as you go.
```

**3\. Przegląd dokumentacji**

Strategiczne wyszukiwanie i analiza plików dokumentacji (README, CONTRIBUTING) dostarcza informacji o celach projektu i procesach deweloperskich.

```
- Search for and read README files, CONTRIBUTING guidelines, and other documentation.
- Extract information about project setup, running tests, and development workflows.
```

**4\. Identyfikacja ostatnich prac**

Mimo braku rozbudowanej historii git, model może użyć podstawowych komend git do zrozumienia ostatnich zmian.

```
- Use the following command git log command to understand recent developments:
  git --no-pager log --stat -n 10
```

**5\. Pozostałe elementy analizy**

Prompt zawiera również wskazówki dotyczące identyfikacji:

- Kluczowych kontrybutorów
- Potencjalnych obszarów złożoności
- Informacji o konfiguracji środowiska deweloperskiego
- Pomocnych zasobów i dokumentacji zewnętrznej

W kolejnym filmie znajdziesz case study z zastosowania tej metody na aplikacji legacy [10xCMS](https://github.com/przeprogramowani/10x-cms), którą utworzyliśmy na potrzeby tego kursu i będzie ona wykorzystywana w dalszych lekcjach ([#\[3x3\] Testy regresji z multimodalnym AI](https://bravecourses.circle.so/c/lekcje-video-i-nagrania-spotkan-10x/sections/523706/lessons/1962759) i kolejne)

🎥 **VIDEO**: [Watch here](https://player.vimeo.com/video/1077106273?app_id=122963&byline=0&badge=0&portrait=0&title=0)

Tutaj również możemy wykonać analizę pogłębioną (analiza modułów i kluczowych plików jak w Excalidraw), tyle że ich listę musimy wyciągnąć samodzielnie na bazie własnej oceny. Pierwsza wersja dokumentu onboardingowego stanowi tutaj świetny punkt startu i ułatwia nam samodzielny rekonesans.

O to dokument onboardingowy dla projektu 10xCMS, który wygenerowałem podczas nagrywania lekcji:

[onboarding.md](https://assets-v2.circle.so/cqxc4g6xhc80u7xq6u76om6qpnbv)

PS. Dla utrudnienia życia Gemini 2.5 Pro przed pracą nad dokumentem onboardingowym, usunąłem lokalnie Rules for AI. Stanowiły dobrą dokumentację projektu, w prawdziwym projekcie legacy byśmy tego nie mieli - tak więc zgodnie z zasadą #zerorezyserki, nie ma miękkiej gry. 

**Podsumowanie**

Metoda analizy projektów bez polegania na historii git jest uzupełnieniem wcześniej omówionych technik. Pozwala na tworzenie kompleksowych dokumentów onboardingowych nawet dla projektów, które nie mają bogatej historii commitów.

W praktyce, najlepsze rezultaty osiąga się często przez łączenie obu podejść - wykorzystanie historii git tam, gdzie jest dostępna i wartościowa, oraz bezpośrednią eksplorację repozytorium dla uzupełnienia brakujących informacji.

Gemini 2.5 Pro, dzięki swojemu dużemu oknu kontekstowemu i zdolności do analizy kodu, jest idealnym narzędziem do przeprowadzania takich złożonych analiz, znacząco przyspieszając proces onboardingu nowych deweloperów w różnorodnych projektach legacy i brownfield.

## 🏁 Podsumowanie

W tej lekcji poznaliśmy kluczowe aspekty wdrażania się w istniejące projekty z wykorzystaniem nowoczesnych narzędzi AI:

- **Analiza historii Git** \- wykorzystanie skryptów do identyfikacji hot spotów w kodzie poprzez analizę najczęściej modyfikowanych plików i modułów, co pomaga określić kluczowe obszary projektu
- **Gemini 2.5 Pro** \- model AI zalecany do pracy z dużymi (i małymi) projektami ze względu na duże okno kontekstowe (1M tokenów) i wysoki współczynnik efektywności przy długich rozmowach (90.6% przy 128k tokenów)
- **Automatyzacja tworzenia dokumentacji onboardingowej** \- wykorzystanie AI do generowania kompleksowego dokumentu wprowadzającego dla nowych deweloperów, zawierającego analizę struktury projektu, kluczowych modułów, kontrybutorów oraz sugerowanego planu działania
- **Pogłębiona analiza projektu** \- metodyczne podejście do zrozumienia projektu w trzech etapach: analiza modułów, analiza kluczowych plików oraz synteza i aktualizacja dokumentu onboardingowego
- **Alternatywne podejście dla projektów bez historii Git** \- strategie analizy projektów z ograniczoną historią wersji, koncentrujące się na bezpośredniej eksploracji struktury repozytorium i analizie zawartości plików

Pamiętaj, że efektywny onboarding wymaga zarówno wykorzystania narzędzi AI jak i samodzielnej eksploracji kodu. Kluczem jest połączenie automatycznej analizy z samodzielną eksploracją.

## 👨‍💻 Ćwiczenia praktyczne

**Wszystkie poniższe ćwiczenia są opcjonalne**. W tym momencie kursu zalecamy priorytetyzować pracę nad aplikacją zaliczeniową. Przedstawione tutaj workflow analizy projektów brownfield i legacy na pewno przydadzą się w Waszej codziennej pracy programistycznej - rzeczywistość sama sprowokuje was do ich wykorzystania, gdy będziecie dołączać do nowych zespołów lub przejmować istniejące projekty. Wróćcie do tych ćwiczeń, gdy będziecie potrzebować efektywnych metod wdrażania się w nowe projekty. Można również wypróbować tych metod na aplikacjach zaliczeniowych, ale to projekty które są małe, więc zadanie jest dużo prostsze.

**Zadanie 1: Analiza hot spotów w repozytorium**  
**Cel:** Zidentyfikowanie kluczowych plików i modułów w projekcie  
**Instrukcje:**

1. Wybierz repozytorium Git (może być to Twój projekt lub dowolny projekt open-source)
2. Uruchom skrypty z lekcji do analizy najczęściej modyfikowanych plików i modułów
3. Przeanalizuj wyniki i stwórz notatkę z 5 najważniejszymi obszarami projektu
4. Spróbuj zrozumieć, dlaczego te obszary są tak często modyfikowane
5. Porównaj swoje obserwacje z dokumentacją projektu, jeśli jest dostępna

**Zadanie 2: Stworzenie dokumentu onboardingowego**  
**Cel:** Przygotowanie kompleksowego dokumentu onboardingowego dla projektu  
**Instrukcje:**

1. Wykorzystaj prompt do analizy projektu z lekcji, dostosowując go do swojego repozytorium
2. Przekaż modelowi AI wyniki analizy hot spotów (pliki, moduły, kontrybutorzy)
3. Wygeneruj podstawowy dokument onboardingowy
4. Sprawdź, czy wygenerowany dokument jest zgodny z rzeczywistą strukturą projektu
5. Zapisz dokument jako .ai/onboarding.md w swoim repozytorium

**Zadanie 3: Pogłębiona analiza repozytorium**  
**Cel:** Szczegółowe zrozumienie projektu  
**Instrukcje:**

1. Użyj prompta do szczegółowej analizy top modułów
2. Użyj prompta do szczegółowej analizy top plików
3. Użyj prompta do podsumowania i aktualizacji onboarding.md

**Zadanie 4: Analiza projektu bez rozbudowanej historii Git**  
**Cel:** Zastosowanie alternatywnego podejścia do analizy projektu  
**Instrukcje:**

1. Znajdź projekt z niewielką ilością commitów lub słabo rozwiniętą historią Git (np. aplikacja zaliczeniowa)
2. Wykorzystaj prompt do analizy projektów bez historii Git
3. Przeprowadź eksplorację struktury projektu używając narzędzi file\_read, file\_search i list\_dir
4. Wygeneruj dokument onboardingowy bazujący na bezpośredniej analizie struktury
5. Porównaj efekty tej metody z analizą opartą o historię Git

![Ilustracja z lekcji](https://assets-v2.circle.so/ekrtcr8j44qd531ut1i2iwox5c9h)