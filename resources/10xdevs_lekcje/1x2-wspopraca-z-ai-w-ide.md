<!DOCTYPE html>![](https://assets-v2.circle.so/zgedksbngwhy2xf0h98miuqzs9k6)

## Wprowadzenie

Dzięki poprzedniej lekcji wiesz już, że zamiast poszukiwania jednego modelu do wszystkiego, warto raczej nastawić się na ciągłą eksplorację dostępnych na rynku opcji. Modele powinny pasować do twojego stacku, języka komunikacji i oczekiwań względem kosztów czy szybkości działania.

Teraz czas na zintegrowanie nowej wiedzy w środowisku 10xDevelopera. Rozpoczniemy od pracy z AI w IDE, a następnie przejdziemy do terminala. Rekomendacje i praktyki, które przedstawimy w kolejnych dwóch lekcjach, mogą być wykorzystana w wielu różnych konfiguracjach. U nas głównymi aktorami będą Cursor oraz Claude Code, czyli “best defaults”, ale poznasz również kierunki alternatywne, np. AI Assistant pod ekosystem JetBrains.

W trakcie pracy będziemy bazować na projekcie wprowadzającym, który znajdziesz [tutaj (10xWarmup)](https://github.com/przeprogramowani/10x-warmup/). 

&gt; 💡 Aby zaoszczędzić tokeny na etap “rozgrzewki”, komunikacja z AI będzie w tej lekcji prowadzona po angielsku. W razie pytań lub wątpliwości dodaj nowy wątek - mentorzy i społeczność pomogą ci zrozumieć każdy fragment tego materiału.

W tej lekcji przedstawimy ci najważniejsze funkcje edytora Cursor oraz przekrojowy zestaw narzędzi AI dla fanów edytorów od JetBrains. Zaczynamy!

## Wstępna konfiguracja

&gt; 🎨 Motyw edytora Cursor w tej lekcji: Sapphire + Material Icon Theme

W pierwszej części poznamy główne aspekty współpracy z AI na podstawie omówienia Cursora.

Rozpoczynamy od pobrania narzędzia [z tego linku](https://cursor.com/downloads), a następnie wyboru jednej [z dostępnych subskrypcji](https://cursor.com/pricing). Chociaż plan darmowy jest również dostępny, to jego limity wystarczą tylko na początkowe etapy współpracy z AI, a niektóre funkcje są zupełnie zablokowane. Właśnie dlatego my rekomendujemy plan Pro za 20$ na miesiąc z ew. opcją dodatkowego doładowania konta w miarę zużycia środków.

Na poniższym filmie zapoznamy się z ustawieniami narzędzia, a także z:

* głównym ustawieniem wpływającym na prywatność i bezpieczeństwo kodu - **Privacy Mode**
* znaczenie indeksowania projektu oraz jego odświeżanie
* pole wyboru modeli wspieranych przez edytor

Zobacz jak przeprowadzić wstępną konfigurację:

[FRAGMENT VIDEO](https://player.vimeo.com/video/1119788416?app_id=122963)

### 🔐 Ukrywanie plików wrażliwych

Z przedstawionego na filmie procesu indeksowania można wyłączyć wybrane pliki i foldery.

W tym celu dodaj do projektu plik _.cursorignore_ i podobnie jak w przypadku _.gitignore_ zdefiniuj tam pliki i wzorce ścieżek, których Cursor ma nie dodawać do indeksu. Dodane wartości rozszerzają wcześniej ignorowany zakres projektu, który Cursor tak czy tak ignoruje poprzez _.gitignore._

Możesz to rozważyć z dwóch powodów:

**Bezpieczeństwo**: Pliki zawierające dane wrażliwe, takie jak hasła czy adresy wewnętrznych API, mogą być trzymane pod szczególną ochroną. Jeśli z jakiegoś powodu trzymasz je w projekcie (**błąd!**), skorzystaj z pliku _.cursorignore_ aby wyłączyć je z kontekstu projektu.

**Szybkość**: W dużych projektach i monorepozytoriach wybrane fragmenty projektu mogą być wyłączone z procesu indeksowania, a tym samym ułatwiać Cursorowi nawigację po indeksie i jego szybsze przebudowywanie.

&gt; 👉 Plik .cursorignore dotyczy wyłącznie indeksowania - w przypadku posługiwania się Agentem i wczytywania plików na żądanie, LLM nadal może uzyskać dostęp do danego pliku. W rzeczywistości jest to działanie z kategorii “[security by obscurity](https://nordvpn.com/pl/cybersecurity/glossary/security-through-obscurity/?srsltid=AfmBOopt0Li26FWqux6DluGFUfYOVqjhtDZSMFun8DSqZsNnUxjc6ckw)” i nie adresuje źródła problemu - sekretów i plików wrażliwych przechowywanych w repozytorium.

Odpowiednikiem tego pliku dla narzędzi JetBrains, czyli AI Assistanta i Junie, jest **.aiignore** \- szczegóły pod [tym](https://www.jetbrains.com/help/ai-assistant/disable-ai-assistant.html#restrict-ai-assistant-usage-in-specific-files-or-folders) i [tym](https://www.jetbrains.com/help/junie/aiignore.html) adresem.

W narzędziu Cline te ustawienia skonfigurujesz w **.clineignore** \- szczegóły [pod tym linkiem](https://docs.cline.bot/prompting/prompt-engineering-guide).

Github Copilot rozwiązuje to przez [ustawienia administracyjne](https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot) \- globalnie lub dla każdego z repozytorium w ramach organizacji.

**🔐 Kluczowe ustawienia prywatności w innych usługach**

**Github Copilot -** Najważniejsze ustawienia znajdziesz w sekcji “Privacy” [pod tym linkiem](https://github.com/settings/copilot/features). Upewnij się, że wyłączyłeś udostępnianie danych a uczestnictwo w treningu modeli jest zablokowane. Pierwsza opcja, czyli “[suggestions matching public code](https://docs.github.com/en/copilot/how-tos/manage-your-account/manage-policies#enabling-or-disabling-suggestions-matching-public-code)” jest dość nietypowa i niespotykana w innych usługach tego typu - jej wyłączenie w praktyce kończy użyteczność Copilota, a wiele sugestii kodu będzie blokowanych ze względu na restrykcje. To opcja defensywna, dla firm które nie chcą wejść “all-in” w AI.

![](https://assets-v2.circle.so/ds3hqxvh4fnxcypa7x9q85faiqi2)

**JetBrains AI -** Upewnij się, że “Detailed Data Collection” jest **wyłączone:**

![](https://assets-v2.circle.so/bwkez1zpli239rhp918py0lsvswo)

**Cline -** w przeciwieństwie do innych usług, Cline nie wykorzystuje dodatkowej warstwy backendu przez którą przechodzi kod i twoje prompty. Komunikacja działa client-side, a wiadomości do AI wychodzą z edytora wprost do dostawców modeli gdzie obowiązują dedykowane polityki prywatności (np. [Claude API Privacy Policy](https://privacy.claude.com/en/articles/7996885-how-do-you-use-personal-data-in-model-training) czy [OpenAI API Privacy Policy](https://openai.com/pl-PL/policies/)). Zarówno OpenAI oraz Anthropic nie wykorzystują twoich danych wysyłanych przez API do treningu modeli.

## Pierwsze zapytania do AI

Po zapoznaniu się z konfiguracją przechodzimy do poznania trybu **Inline Edit.**

To edycja bieżącego fragmentu lub pliku, który mamy właśnie otwarty. Cursor wspiera trzy tryby wykorzystywania tej opcji:

* edycję zaznaczenia
* edycję całego pliku
* pytania o zaznaczony fragment

Obsługę tego trybu zobaczysz poniżej:

[FRAGMENT VIDEO](https://player.vimeo.com/video/1119788363?app_id=122963)

Tryb Inline Edit (Ctrl + \\ lub Cmd + \\) w narzędziu JetBrains AI Assistant:

![](https://assets-v2.circle.so/j4rmild1y92jwrq2wces5rujl7vl)

## Kontekst i formatowanie promptów

Jednym z kluczowych obszarów współpracy z AI, jakie będziemy poznawać w 10xDevs, jest tzw. Context Engineering, albo po prostu zarządzanie kontekstem konwersacji. Kontekst to wszystkie informacje, które pomagają modelowi lepiej rozumieć twoje intencje a także bieżące warunki projektowe.

Kontekstem dla AI mogą być:

* istniejące pliki lub foldery
* historia zmian z GITa
* treści pobierane ze stron www
* instrukcje użytkownika lub te definiowane na poziomie projektu

Biegłe wykorzystywanie kontekstu to klucz do otrzymywania jakościowych odpowiedzi z AI. Podstawy tej praktyki zobaczysz na poniższym filmie. Prezentujemy tam również **prompty z tagami XML**, jako sposób na lepszą organizację długich zapytań i wskazywanie, do czego służą poszczególne fragmentu promptów.

Obejrzyj kolejne nagranie:

[FRAGMENT VIDEO](https://player.vimeo.com/video/1119788294?app_id=122963)

## Chat - konwersacje o projekcie

Okno czatu, do którego przyzwyczaił nas ChatGPT, to jedna ze standardowych i najbardziej popularnych form interakcji z AI. W porównaniu do trybu **Inline Edit**, dedykowany panel czatu pozwala na bardziej przekrojową konwersację o całym projekcie.

W narzędziach dla programistów czat powinien być dodatkowo wyposażony w symbole służące do rozszerzania kontekstu, a także funkcje wspierające Developer Experience, takie jak podgląd wysycenia okna kontekstowego czy możliwość ponawiania rozmów od dowolnego fragmentu.

Ten kanał komunikacji z LLMami możesz wykorzystywać do:

* wstępnego planowania nowych funkcjonalności
* analizy i porównywania kilku istniejących plików w projekcie
* przeszukiwania historii GITa pod kątem momentu zmiany danego obszaru projektu
* szybkiego pozyskiwania nowej wiedzy (np. o frameworku, bibliotece czy API)

W skrócie - pozyskiwanie wiedzy w trybie read-only, bez dalszej ingerencji w projekt.

Jak to działa w Cursorze? Zobacz kolejny fragment:

[FRAGMENT VIDEO](https://player.vimeo.com/video/1119788135?app_id=122963)

### Przeszukiwanie indeksu

Nowoczesne edytory i pluginy wykorzystujące AI często polegają na indeksie przechowującej tzw. embeddingi ([info](https://stackoverflow.blog/2023/11/09/an-intuitive-introduction-to-text-embeddings/), [info](https://docs.cursor.com/context/codebase-indexing)) służące do rozszerzania kontekstu konwersacji z AI.

Do wersji 0.47 w Cursorze mogliśmy się odwołać do przeszukiwania indeksu z wykorzystaniem narzędzia “@Codebase” - co więcej, byliśmy tak przyzwyczajeni do tej funkcjonalności, że na kilku filmach zobaczysz to narzędzie w akcji.

Niestety, tempo zmian w świecie AI dopadło nas w trakcie realizacji materiałów - wersja 0.48 zamienia dedykowany symbol @Codebase na rzecz polecenia w języku naturalnym:

![](https://assets-v2.circle.so/crr44qkhp05l8iqi8el3nhkzz5yv)

Power-userzy Cursora nie będą zadowoleni, ale dla nowych użytkowników ta bardziej naturalna forma wywoływania narzędzi może być bardziej odpowiednia.

W praktyce, kiedy w 10xDevs zobaczysz rekomendację “@Codebase”, w danym scenariuszu przejdź na naturalne polecenie w stylu “rozpocznij od przeszukania zawartość projektu w poszukiwaniu (np. testów jednostkowych)”. Możesz również odwołać się wprost do nazwy [narzędzia](https://cursor.com/docs/agent/tools) (Codebase), dodając do prompta: “Wykorzystaj przeszukiwanie projektu z narzędziem Codebase”. 

![](https://assets-v2.circle.so/jxfpoi5jg6f6p2n0eydvjkmip0xn)

## Custom Commands - sposób na reużywalne prompty

Wraz z tym, jak nauczysz się efektywnej współpracy z AI, podniesie się również jakość promptów służących do realizacji codziennych zadań.

Warto wtedy **przenieść te najlepsze polecenia z prywatnego notatnika do repozytorium projektu** i sprawić, żeby były pod nadzorem systemu kontroli wersji. Nie tylko ułatwi ci to pracę wracając do projektu po dłuższej przerwie, ale również **ułatwi AI-Onboarding pozostałych członków zespołu**. 

Dodatkowo, dzięki funkcjom takim Custom Commands, wspieranym m.in. przez Cursora oraz Claude Code, zapisane polecenia będą mogły być szybko wczytywane do każdego kanału komunikacji z AI:

[FRAGMENT VIDEO](https://player.vimeo.com/video/1119788244?app_id=122963)

Więcej przykładowych komend znajdziesz [w dokumentacji Cursora](https://cursor.com/docs/agent/chat/commands).

### Prompt Files w Github Copilot

Reużywalne prompty projektowe umieść w folderze **.github/prompts** \- możesz się do nich odwoływać poprzez symbole lub bezpośrednio wskazując na dany plik. Co ważne, w Copilocie pliki z promptami mogą zawierać kontekstowe zmienne, czego Cursor jeszcze na dzisiaj nie obsługuje. Przykładowo:

* Bieżące zaznaczenie - ${selection}, ${selectedText}
* Bieżący plik - ${file}, ${fileBasename}, ${fileDirname}, ${fileBasenameNoExtension}
* Zmienne dynamiczne - ${input:variableName}, ${input:variableName:placeholder}

Szczegóły [pod tym linkiem](https://code.visualstudio.com/docs/copilot/customization/prompt-files).

### JetBrains Prompt Library

Bibliotekę promptów dla JetBrains skonfigurujesz z poziomu ustawień. Na dzisiaj polecenia wspierają jedną zmienną - $SELECTION. Miłym dodatkiem jest odwoływanie się do promptów z menu kontekstowego “AI Actions”:

![](https://assets-v2.circle.so/9c9wadxagpe3z8mvhsdb72n7pph5)

Szczegóły [pod tym linkiem](https://www.jetbrains.com/help/ai-assistant/settings-reference-prompt-library.html#custom%5Fprompt%5Fsettings).

## Instrukcje dla AI

Współpracując z AI, twoje polecenia powinny być maksymalnie precyzyjne. Czy to na poziomie stosowanych w projekcie wzorców, frameworków, wersji bibliotek, praktyk zespołowych czy konwencji związanych z dowolną technologią.

W praktyce, każdorazowe dodawanie do promptu fragmentów typu…

* napisz to w C# 10
* korzystaj z Reacta 19
* stosuj Inversion of Control

…byłoby co najmniej uciążliwe. Właśnie dlatego do projektu wprowadzamy stałe instrukcje dla AI.

To pliki tekstowe, w których umieszczamy powtarzalne fragmenty promptów, stosowane do większości poleceń w obrębie projektu. Określamy w nich konwencje i wymagania dotyczące wybranego tematu poruszanego z AI (np. generowania kodu Reacta, C#, Javy, kryteriów Code Review, stylu odpowiedzi etc.).

Zobacz jak to działa:

[FRAGMENT VIDEO](https://player.vimeo.com/video/1119788547?app_id=122963)

### Jak to działa u innych?

Wsparcie dla instrukcji oferuje rosnąca liczba narzędzi i edytorów AI:

* Github Copilot - **.github/instructions (**[**szczegóły**](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions)**)**
* JetBrains AI Assistant - **.aiassistant/rules (**[**szczegóły**](https://www.jetbrains.com/help/ai-assistant/settings-reference-rules.html)**)**
* JetBrains Junie - **.junie/guidelines.md** **(jeden plik -** [**szczegóły**](https://www.jetbrains.com/help/junie/customize-guidelines.html)**)**
* Windsurf - **.windsurf/rules (**[**szczegóły**](https://docs.windsurf.com/windsurf/cascade/memories#memories-and-rules)**)**

Ścieżki dla innych narzędzi znajdziesz na stronie [10xrules.ai](https://10xrules.ai/)

### Standard AGENTS.md

W ekosystemie AI-Assisted Developmentu trwają prace nad wspólnym formatem instrukcji umieszczanym w pliku [AGENTS.md](https://agents.md/).

Standard zyskał znaczące poparcie kluczowych graczy na rynku narzędzi AI, w tym OpenAI (Codex) oraz omawianego tutaj Cursora, jednak nie wszyscy chcą iść w tym kierunku. W gronie nieprzekonanych jest choćby Anthropic, którego Claude Code oczekuje pliku CLAUDE.md ([issue](https://github.com/anthropics/claude-code/issues/6235)).

![](https://assets-v2.circle.so/pifnqm7ug21vmsbqymmosdj668ft)

Docelowo ma być to standardowy sposób na definiowanie globalnych instrukcji dla Agentów pracujących w zakresie danego projektu. Jeden format ma adresować problem rozdrobnienia ekosystemu i różnych konwencji co do zawartości instrukcji oraz ścieżek, w których powinny być umieszczane.

Minusy? **Jeden plik utrudnia skalowanie reguł.** Twórcy Cursora mówią wprost, że w większych projektach nadal promują precyzyjne reguły w osobnych plikach, dotyczące niezależnych wątków lub akcji. Dokładnie tak jak na zaprezentowanym przez nas filmie.

## AI w JetBrains

Jeśli od lat pracujesz w ekosystemie JetBrains, przejście na forki VS Code takie jak Cursor lub Windsurf może być dla ciebie sporym wyzwaniem. Ale bez obaw - w tej konfiguracji również możesz korzystać z potencjału AI - warto tylko wyposażyć się w odpowiednie dodatki do IDE.

Użyteczne pluginy AI powinny spełniać te same funkcje, które dzisiaj oferuje Cursor:

* **model picker** i dostęp do najnowszych modeli (GPT-5 i inne)
* **tryb agentowy** (LLM wzbogacony o narzędzia edycji projektu - więcej niż “Chat with AI”)
* **obsługa instrukcji** dla AI (najlepiej precyzyjnych, rozłożonych na wiele plików per technologia)
* **akceptowalne opcje prywatności** i brak wymuszania udziału w procesie treningu modeli
* **pozytywny “Vibe Check”**, czyli skuteczna realizacja zadań z codziennej pracy programisty i brak problemów technicznych, powodujących frustrację i spadek komfortu pracy
* (nice-to-have) **reużywalne prompty** \- Slash Commands lub Prompt Files

Stąd, na dzisiaj polecamy:

* Claude Code w terminalu (omówiony w kolejne lekcji)
* Wtyczki z trybem Agenta - Cline, Windsurf lub Junie

Zobacz porównanie popularnych narzędzi na przykładzie edytora WebStorm:

[FRAGMENT VIDEO](https://player.vimeo.com/video/1120277389?app_id=122963)

## ✅ Rekomendowana konfiguracja

Nasz rekomendowany setup współpracy z AI w IDE to obecnie:

* Dla użytkowników ekosystemu VS Code - Cursor
* Dla użytkowników ekosystemu JetBrains - Cline/Windsurf/Junie lub Claude Code

Jeśli ze względu na firmowe polityki musisz pozostać przy Copilocie lub AI Assistant, postaraj się wynegocjować program pilotażowy lepszych narzędzi, a te dostępne niech posłużą wyłącznie za pierwszy (a nie finalny) krok w świecie programowania z AI.

---

## 🏁 Podsumowanie lekcji

Kluczowe elementy przygotowania się do skutecznej pracy z AI w IDE to:

1. Konfiguracja trybu prywatności dostosowana do potrzeb i poziomu ryzyka, wraz z analizą produktowej polityki prywatności (wyjście z procesu treningu modeli, warunkowe udostępnianie kodu, wpływ ustawień na funkcje usługi, etc.)
2. Zapoznanie się ze skrótami klawiszowymi najważniejszych funkcji - Chat, Inline Edit, Agent
3. Rozpoznanie i przetestowanie symboli poszerzających kontekst komunikacji (np. @File, @GIT)
4. Wprowadzenie projektowych “instrukcji dla AI” zgodnie z konwencją narzędzia
5. Iteracyjne rozwijanie reużywalnych promptów - Custom Commands / Prompt Files
6. Porównanie działania kilku wybranych modeli na tym samym zadaniu - każdy edytor może nieco inaczej obsługiwać sposób działania modelu, stąd warto szukać tych najlepiej zintegrowanych

Te etapy pozwolą ci płynnie wejść do świata współpracy z AI, niezależnie od stosowanego narzędzia.

## 👨‍💻Ćwiczenia praktyczne

**Zadanie 1: Poznaj główne funkcje preferowanego narzędzia AI**

**Cel:** Zapoznaj się z głównymi funkcjami edytorów współpracujących z AI.

**Instrukcje:**

1. Sklonuj repozytorium - &lt;https://github.com/przeprogramowani/10x-warmup/&gt;
2. Otwórz projekt w preferowanym narzędziu (nasza rekomendacja - Cursor lub edytory JetBrains z AI)
3. Zainstaluj zależności poleceniem **npm install** w terminalu
4. Poznaj skróty klawiszowe - tryb Inline Edit (jeśli dostępny) oraz Chat with AI
5. Dokończ implementację banking.ts rozszerzając kontekst polecenia o testy, dokumentację i typy
6. Potwierdź działanie modułu banking.ts uruchamiając testy poleceniem **npm test** w terminalu
7. Powtórz zadanie wybierając 2 inne modele, porównując każdą z implementacji pod kątem poprawnie działających testów i jakości wygenerowanego kodu

**Zadanie 2: Przeprowadź analizę testów i projektowej specyfikacji**

**Cel:** Porównaj działanie kilku modeli (jakość, koszt, szybkość działania) w analizie testów.

**Instrukcje:**

1. Kontynuuj pracę w projekcie **10x-warmup**
2. Wybierz jeden z preferowanych modeli i sprawdź w trybie Chat, czy testy (banking.test.ts) modułu bankowości odpowiadają zdefiniowanym wymaganiom (banking-spec.md)
3. Powtórz zadanie wybierając 2 inne modele, porównując każdą z konwersacji pod kątem zgodności odpowiedzi każdego modelu
4. W ramach eksperymentuj postaraj się znaleźć najtańszy dostępny model poprawnie realizujący to zadanie - dostępne cenniki szybko sprawdzisz na stronie &lt;https://openrouter.ai/models&gt; (**uwaga - najtańszy model może nie być właściwą opcją w bardziej zaawansowanych scenariuszach, jednak pozwoli ci to poznać przekrój dostępnych na rynku narzędzi**)

## Następny krok - współpraca z AI w Terminalu

W kolejnej lekcji poznasz alternatywną metodę współpracy z AI - narzędzie, które umożliwi komunikację z Agentem z poziomu Terminala.

Może to być warta uwagi opcja dla osób korzystających z IDE bez integracji z AI, a także dla osób, które preferują terminalowy tryb realizowania zadań technicznych.

![](https://assets-v2.circle.so/ekrtcr8j44qd531ut1i2iwox5c9h)