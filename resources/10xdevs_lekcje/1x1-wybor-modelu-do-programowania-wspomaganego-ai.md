<!DOCTYPE html>![](https://assets-v2.circle.so/o1efuf7ebn1pzpe1oiqjuok4xpe7)

## Wprowadzenie

Witaj w pierwszym module programu 10xDevs - **_10xWorkflow_**!

Celem tego modułu jest stworzenie solidnych podstaw do efektywnej współpracy ze sztuczną inteligencją. Wspólnie zbudujemy mindset i nawyki, które pozwolą ci płynnie wejść w zupełnie nową epokę programowania.

Ten etap będzie także pomocny w realizacji projektu certyfikacyjnego, który stanowi główne zadanie na nadchodzące tygodnie. Zanim jednak zanurzymy się w szczegóły planowania Twojego nowego startupu i budowania jego kluczowych elementów (moduł drugi i trzeci), warto zacząć od przygotowania się do pracy z zupełnie nowym rodzajem współpracowników.

W ramach tego modułu omówimy m.in.:

* Klasyfikację dostępnych modeli, formy rozliczeń i nasze rekomendacje do programowania
* Kluczowe, praktyczne scenariusze współpracy z AI w IDE oraz terminalu
* Świadome zarządzanie Agentem AI i wzbogacanie go o nowe narzędzia
* Wykorzystanie AI do pozyskiwania nowej wiedzy
* Praktyczne porady wykorzystywania maksimum potencjału AI

Zaczynajmy!

## Wybór modelu

Jeszcze kilka miesięcy temu wybór modelu do programowania stał wyłącznie po stronie firmy dostarczającej daną usługę (np. GitHub Copilot). Dzisiaj, w rozwiązaniach takich jak Cursor, Windsurf czy Cline (i również Copilot) to użytkownik może wybierać z szerokiej palety dostępnych opcji.

![](https://assets-v2.circle.so/t0tnvls15428bwi5i5gujxr2vwnj)

Aby ułatwić ci wybór i umożliwić efektywną współpracę z AI, w tej lekcji odpowiemy na pytania:

* jaki model do programowania wybrać i dlaczego nie jeden,
* jak wykorzystywać modele do podnoszenia jakości promptów
* jak podchodzić do wyników testów syntetycznych (benchmarków),
* jakie źródła śledzić, aby być na bieżąco z najlepszymi modelami.

Wybór właściwego modelu będzie miał bezpośrednie przełożenie na jakość generowanego kodu, testów czy dokumentacji, ale też na mniej oczywiste aspekty jak koszt współpracy z AI, dostępne narzędzia, które można wykorzystywać (np. analiza obrazów lub korzystanie z zasobów sieci) oraz wspieranie konkretnego stacku technologicznego.

## Jaki model do programowania? Optymalny!

W świecie zarządzania projektami istnieje powiedzenie, które bardzo dobrze oddaje realia pracy z modelami językowymi:

&gt; Dobrze, szybko, tanio - wybierz dwa.

W świecie Generative AI te zależności wyglądają podobnie.

LLMy o **największej ilości wiedzy i umiejętnościach złożonego rozumowania** (np. [Grok 4](https://epoch.ai/data-insights/grok-4-training-resources) czy Claude 4.1 Opus) odpowiadają wolniej i wymagają niedostępnej dla większości z nas mocy obliczeniowej (stąd ich wysoka cena):

![](https://assets-v2.circle.so/1j4owmkmyfyhja19yhh3r6ucalty)

LLMy **odpowiadające szybciej** nie są tak wszechstronnie jak duże alternatywy (Gemma 3 od Google osiąga [42%](https://storage.googleapis.com/deepmind-media/gemma/Gemma3Report.pdf) poprawnych odpowiedzi w teście [GPQA Diamond](https://arxiv.org/abs/2311.12022), podczas gdy Grok 4 aż 87.7%):

![](https://assets-v2.circle.so/ce91tmdef5ouw9v1k9ja6kx6f6f4)

LLMy **gotowe do pobrania za free** \- najczęściej open source lub [open weights](https://promptmetheus.com/resources/llm-knowledge-base/open-weights-model) \- albo skupiają się na jednym konkretnym zadaniu, albo komunikują się w mniejszej liczbie języków, albo tak czy inaczej wymagają dużej ilości zasobów sprzętowych (zobacz rozmiar największego z rodziny [Qwen 3 Coder](https://openrouter.ai/qwen/qwen3-coder) w serwisie [ollama](http://ollama.com/)):

![](https://assets-v2.circle.so/afb9th3j0kdexazx24grtuc4gfa5)

Na szczęście, w codziennej pracy te skomplikowane zależności można uprościć. Zwykle do pracy produkcyjnej (czyt. intensywnej, ciągłej, innej niż krótkie eksperymenty z lokalnymi LLM) będziesz potrzebował dwóch typów modeli:

**1) Asystent (Koder) -** model do codziennych zadań typu generowanie kodu czy testów, wyspecjalizowany w domenie programowania, działający odpowiednio szybko:

* Claude Sonnet 4.5
* GPT-5-Codex (jeśli niedostępny - GPT-5)\*
* Gemini 2.5 Pro\*
* Wariant ekonomiczny - grok-code-fast-1

**2) Model rozumujący (Architekt)** \- poradzi sobie ze złożoną logiką, analizą wymagań i planowaniem (w codziennej pracy może jednak działać nieco wolniej i szybciej redukować stan konta lub limity zapytań):

* GPT-5-Codex / GPT-5 (Medium / High Reasoning Effort)\*
* Gemini 2.5 Pro\*
* Wariant ekonomiczny - grok-4-fast

&gt; 💡 Zarówno GPT-5 jak i Gemini 2.5 Pro są modelami “hybrydowymi” - pod jedną nazwą modelu kryje się kilka trybów działania, które można wymusić poleceniami lub ustawieniami edytora. Stąd ich duża elastyczność i dostosowanie do różnych rodzajów zadań.

[Cline Model Selection Guide](https://docs.cline.bot/getting-started/model-selection-guide):

![](https://assets-v2.circle.so/fm1f2su3augqinapl3pqon55eh0j)

---

O podziale na Koderów i Architektów, a także korzyściach, jakie można z niego wyciągnąć, jako jeden z pierwszych pisał m.in. twórca narzędzia konsolowego Aider - [źródło](https://aider.chat/2024/09/26/architect.html).

Jeśli skupiasz się na generowaniu kodu, chcesz modyfikować już istniejący albo piszesz dokumentację na bazie wcześniej utworzonych wymagań, zwykle odpowiednim wyborem będą szybko działające **modele-koderzy**.

Im więcej problemów otwartych, burz mózgów, analizy wstępnej, debugowania problemów i złożonego rozumowania, tym częściej powinieneś komunikować się z **modelami** **myślącymi**, lub w ramach tej samej rodziny modeli odblokowywać dodatkowy “reasoning effort”:

![](https://assets-v2.circle.so/t7pxthnaprdkt2lzw114jgeooshg)

&gt; 💡 W związku z tym, już na starcie zapominamy o “jednym najlepszym modelu”, a skupiamy się na poszukiwaniu optymalnego zestawu narzędzi dopasowanych do ciebie.

## Dostęp do modeli

W przypadku edytorów Cursor i Windsurf, a także pluginów jak Cline, najnowsze modele pojawiają się wraz z kolejnymi aktualizacjami tych usług - nie wymaga to dodatkowych akcji:

![](https://assets-v2.circle.so/lurxagj4geozsjwpa0ys7b4bq8hh)

Copilot podchodzi do tego nieco inaczej, korzystając z [ustawień profilu na GitHubie](https://github.com/settings/copilot/features). Zarówno na kontach indywidualnych jak i korporacyjnych, to właśnie tam znajdziesz przełączniki dla modeli:

![](https://assets-v2.circle.so/itrdjdo6xxvwnoovofre9793przq)

👉 Przełączniki służące do włączenia nowych modeli w usłudze Copilot znajdziesz w tym miejscu: &lt;https://github.com/settings/copilot&gt; \- upewnij się, że najnowsze modele z rodziny Claude i Gemini są włączone (**jeśli korzystasz z planu firmowego a modele nie są dostępne, poproś o to administratora usługi**).

## Dwie formy rozliczeń za komunikację z AI

Obecnie usługi AI wspierają dwie formy rozliczeń:

1) **Flat Rate -** Stała miesięczna subskrypcja, w ramach której otrzymujesz określoną liczbę zapytań do AI (np. Windsurf, Copilot).

![](https://assets-v2.circle.so/haxlfp6ge9l8spem42vg1ep7pmo4)

2) **Usage-based Pricing -** Miesięczne doładowanie konta wybraną kwotą i rozliczanie faktycznego zużycia według cennika modeli (np. Cursor, Zed).

![](https://assets-v2.circle.so/r5l8ihhcqyr4f3wq7jiccpbcgrad)

Jeszcze kilka miesięcy temu większość usług AI działała na zasadzie **stałych cen** (Flat Rate). W tym modelu **każde zapytanie kosztowało użytkownika tyle samo** \- niezależnie od tego, czy zadawał krótkie pytanie, czy prosił o szczegółową analizę. Problem polegał na tym, że dla twórców narzędzi **każde zapytanie generowało różne koszty** \- krótkie pytania były tanie, ale obszerne zadania mogły być bardzo drogie. To prowadziło do sytuacji, gdzie użytkownicy często nadużywali systemu, zadając bardzo długie i skomplikowane pytania za tę samą cenę.

Dlatego obecnie większość usług przechodzi na model **płatności za użytkowanie** (Usage-Based), który prawdopodobnie stanie się nowym standardem. W tej formie rozliczeń płacisz proporcjonalnie do tego, ile faktycznie wykorzystujesz:

* Za krótkie pytania płacisz mniej
* Za długie i złożone zapytania płacisz więcej
* Koszt zależy od objętości przetwarzanych danych

To oznacza, że teraz kluczowe jest **strategiczne dobieranie modeli AI**:

* Używaj tańszych modeli do codziennych zadań (np. generowanie kodu w popularnym języku, konwersacje bazujące na pytaniach zamkniętych, itd.)
* Wybieraj droższe, ale bardziej zaawansowane modele do skomplikowanych zadań (np. analiza kodu z dużym kontekstem, tworzenie złożonych planów, przekrojowe debugowanie systemu, itd.)

Dzięki temu możesz znacznie lepiej kontrolować swoje wydatki na usługi AI.

### **Tokeny - podstawa rozliczenia**

Model **Usage-Based** (za zużycie) opiera się na liczbie wymienionych tokenów w trakcie komunikacji z dostawcami wybranych modeli. Tokeny można rozumieć jak podstawową jednostkę informacji, która trafia do modelu językowego w trakcie odbierania zapytań i generowania odpowiedzi. 

![](https://assets-v2.circle.so/m1qzwocz2963lvb74ywbw7kkdk9k)

Na powyższym przykładzie widać, że wysyłając do modelu fragment funkcji JavaScript zapłacimy za 25 **tokenów na wejściu**. Na koszt wpłynie również liczba tokenów wygenerowanych przez model, co nazwiemy **tokenami wyjściowymi.** 

**Łączny koszt konwersacji: Tokens (In) + Tokens (Out)**

Obecnie większość modeli językowych określa swoje cenniki na podstawie miliona wymienionych tokenów In/Out - przykładowo, grok-code-fast-1…

![](https://assets-v2.circle.so/wyia3qxtxr4zxzrptc8fguyulob5)

…w porównaniu do GPT-5-Codex (1.25$ za 1mln tokenów wejściowych, 10$ za 1mln tokenów wyjściowych):

![](https://assets-v2.circle.so/yuy9h4by8kv2auc0dnvgir88i6gw)

Jeśli oba modele spełniają twoje oczekiwania, korzystanie z grok-code-fast-1 będzie 5-7x tańsze niż współpraca z alternatywą od OpenAI. To z kolei może się przełożyć na 5-7x więcej zapytań, które możesz wymienić z AI w ramach tej samej miesięcznej subskrypcji - zwracaj uwagę na cenniki, to podstawa opłacalnej współpracy z LLMami!

### Oferty specjalne

Od czasu do czasu na rynku pojawiają się oferty specjalne, które podnoszą konkurencyjność danej usługi i pozwalają korzystać z wybranych modeli w bardziej opłacalny sposób. I tak, przykładowo:

* Copilot oferuje nielimitowany dostęp do GPT-4.1 oraz GPT-5-mini
* Windsurf oferuje nielimitowany dostęp do własnego modelu SWE-1
* Usługa [OpenRouter.ai](https://openrouter.ai/) okresowo wypuszcza zniżki na modele (np. GPT-5 za 50% ceny) - często wymaga to niestety zgody na dzielenie się danymi
* Google pozwala korzystać ze swoich modeli Gemini za darmo, w ramach rate limitów i przy zgodzie na udostępnianie danych (autoryzując się kluczem z [https://ai.dev](https://ai.dev/))

Warto więc trzymać rękę na pulsie i wyszukiwać korzystne czasowo oferty.

![](https://assets-v2.circle.so/x1uxvrvaabv4obe4c0vs8egeqiar)

### Więcej tokenów za darmo

Jeśli budujesz side-projecty, startupy i projekty demo, które nie są związane restrykcjami dotyczącymi prywatności, możesz rozważyć udostępnienie technicznej komunikacji z OpenAI (prompty, uzupełnienia kodu, logi) - dzięki temu uzyskasz dostęp do określonej liczby darmowych tokenów np. dla GPT-5.

&gt; 💡 Jeśli rozważasz tę opcję, koniecznie utwórz nowy projekt grupujący klucze do API i nazwij go tak, aby wskazywać udostępnianie danych w ramach komunikacji (np. side-project). 

Konfiguracja znajduje się [w tym miejscu](https://platform.openai.com/settings/organization/data-controls/sharing) (wymagane konto na platformie OpenAI).

![](https://assets-v2.circle.so/86ezc5ag3ic6xt0323e34zzqq7rt)

W ramach tak skonfigurowanego projektu możesz teraz przepiąć się np. na Codex CLI lub inne narzędzia wspierające klucze OpenAI (Cline, Roo Code, Kilo Code) i testować wybrane modele za free.

## Obserwuj trendy i unikaj AI FOMO

O ile nie jesteś badaczem AI pracującym na uczelni lub w centrum AI R&amp;D, sprawdzanie każdego dostępnego na rynku modelu nie ma sensu. Zamiast tego skup się na śledzeniu kilku sprawdzonych źródeł, które pokazują popularność i aktywność wokół konkretnych rozwiązań.

**Aktywność społeczności**

Jedno z takich miejsc to [OpenRouter](https://openrouter.ai/), czyli interfejs do dziesiątek API modeli językowych. Nie tylko oferuje on konkretną funkcjonalność, czyli ujednolicony “gateway” do różnych LLMów, ale też wskazuje, na co najczęściej decydują się użytkownicy. Nie jest to syntetyczna ankieta środowiskowa, a realny monitoring przepływu zapytań do konkretnych modeli podzielony na kategorie.

Aktualnie widać, że grok-code-fast-1 od xAI przebija popularnością nawet Claude Sonneta!

![](https://assets-v2.circle.so/zzga326ecvw6ljcnq40vk8osqwep)

Rankingi OpenRoutera znajdziesz tutaj: &lt;https://openrouter.ai/rankings/programming?view=month&gt;

**Porównania anonimowe**

Kolejna opcja to [LM Arena](https://lmarena.ai/) \- usługa, na której “walczą” ze sobą modele. Uruchamiając nową sesję użytkownika, widzisz dwa interfejsy - to samo zapytanie kierowane jest do dwóch modeli o ukrytej nazwie. Otrzymując dwie odpowiedzi podejmujesz decyzję, która opcja bardziej do ciebie trafia. Wybrany model odkrywa swoją nazwę i otrzymuje dodatkowe punkty do rankingu.

Tutaj również znajdziesz rankingi najlepszych modeli, a dodatkowo możesz wziąć udział w projekcie przeprowadzając kilka testów i oceniając odpowiedzi:

![](https://assets-v2.circle.so/k5408i3cc618r6ef22a5d1e2wkfj)

Link do LMArena: &lt;https://lmarena.ai/&gt; \- ranking WebDev [pod tym linkiem](https://lmarena.ai/leaderboard/webdev).

**Benchmarki syntetyczne**

Najbardziej akademickie podejście do oceny jakości to benchmarki - testy syntetyczne, które pokazują jak model sprawdza się w określonej domenie (np. wiedza ogólna, logika, programowanie, wyłuskiwanie informacji, etc.).

![](https://assets-v2.circle.so/6dh28kqkuy0wnfdolhy2n2u8pg3h)

Popularne testy w kontekście programowania i nauk ścisłych to m.in.:

* LiveBench: &lt;https://livebench.ai/&gt;
* SWE Bench: &lt;https://www.swebench.com/&gt;
* GPQA Diamond: &lt;https://arxiv.org/abs/2311.12022&gt;

## Ostrożnie z poleganiem na benchmarkach

Benchmarki modeli językowych (testy syntetyczne, realizowane na z góry określonych zadaniach i problemach), choć użyteczne jako punkt odniesienia, nie powinny być traktowane jako ostateczny wyznacznik ich jakości. Źródłem niejasności wyników są m.in.:

1. **Nadmierna optymalizacja** \- twórcy modeli mogą celowo trenować swoje systemy pod kątem popularnych benchmarków, co prowadzi do efektu &quot;teaching to the test&quot;,
2. **Brak różnorodności kontekstów** \- testy syntetyczne często nie uwzględniają pełnego spektrum scenariuszy ze świata rzeczywistego, reprezentując wąski wycinek zastosowań,
3. **Zakażenie danych** \- poprawne odpowiedzi mogą być (niezamierzenie) uwzględnione w danych treningowych, co naturalnie zawyża wyniki,
4. **Pominięcie aspektów praktycznych** \- metryki rzadko mierzą wartości takie jak użyteczność, przyjazność dla użytkownika czy szybkość działania w rzeczywistych warunkach,
5. **Ograniczone definicje &quot;jakości&quot;** \- testy często mierzą precyzyjnie zdefiniowane zdolności, pomijając trudno mierzalne aspekty, jak kreatywność czy dopasowanie do kontekstu.

  
![](https://assets-v2.circle.so/u3enupcs8tvrz1ln1r564r9agmqx)

Praktyka pokazuje, że nawet najlepsze modele nie są jeszcze w pozycji zastąpienia programisty, a ich skuteczna obsługa jest znacznie ważniejsza niż poleganie na tabelach i wykresach.

Złożoność tego tematu pokazuje jeden z ciekawszych benchmarków w kontekście programowania, czyli [**SWE-Lancer**](https://arxiv.org/pdf/2502.12115) od OpenAI.

Stara się on wykazać, ile zadań pochodzących z serwisu dla freelancerów Upwork mogłoby być rozwiązanych przez najlepsze modele językowe. Opracowanie wskazuje, że modele zarabiają do 400 tys. $ z puli zadań o wartości 1 mln $.

Czy to oznacza, że AI może na siebie zarabiać?

![](https://assets-v2.circle.so/cbulvk4lzv8nq5dath9p8pb2rca9)

Kiedy wynikom przyjrzymy się nieco głębiej, zauważymy kilka wyzwań, które w dyskusji niestety często są pomijane:

* na efekty wpływa nie tylko sam model, ale narzędzia, do jakich ma dostęp (np. moduł do zarządzania plikami w projekcie lub wspomniany tam “User Tool” korzystający z Playwrighta) - w każdej z usług jak Cursor, Copilot czy Windsurf jakość takich narzędzi może być inna
* nawet 7-krotne powtarzanie zadania, w przypadku modeli takich jak GPT-4o, nie pozwala przekraczać bariery 20% realizowanych zadań
* modele rozumujące są w stanie podnosić jakość swoich odpowiedzi przy znacznie wydłużonym “run rate”, ale to z kolei wpływa na koszt obsługi całego rozwiązania
![](https://assets-v2.circle.so/xqnf7947gl4p7phqfl09d57a48kd)

Tego typu zmienne często wpływają na to, że wyniki testów nie przekładają się bezpośrednio na tzw. “**vibe check**”, czyli odczuwalną jakość współpracy z modelem kiedy nasze prompty nie są idealne, a warunki mniej uporządkowane niż w pracowni badawczej.

Stąd praktyka, praktyka i jeszcze raz praktyka - w twoim stacku i na twoich projektach.

## 💻 Programowanie z modelami lokalnymi

Wielu programistów zadaje nam pytania - a co z modelami lokalnymi, uruchamianymi na prywatnych laptopach lub komputerach? Przecież wydają się one znakomitym wyjściem dla osób, które chcą programować z AI, a przy tym dbają o prywatność i bezpieczeństwo wymienianych danych. W wielu korporacjach może to być jedyna opcja integracji AI ze środowiskiem programisty.

Jak dzisiaj wygląda stan modeli lokalnych? Za odpowiedź posłuży nam [analiza przygotowana przez twórców narzędzia Cline](https://docs.cline.bot/running-models-locally/read-me-first).

Wskazują oni, że lokalne modele AI to w rzeczywistości **drastycznie uproszczone kopie oryginalnych systemów**. Proces ich tworzenia, nazywany destylacją, można porównać do próby skompresowania wiedzy profesjonalnego szefa kuchni do podstawowej książki kucharskiej - zachowujemy proste przepisy, ale tracimy złożone techniki i intuicję.

**Problem wydajności vs możliwości**

Lokalne modele zachowują mały procent (Cline mówi o przedziale 1-26%) oryginalnej pojemności modelu macierzystego. To oznacza fundamentalne ograniczenia w kluczowych obszarach:

* Znacznie osłabione rozumienie złożonych kontekstów
* Ograniczona zdolność do wieloetapowego rozumowania
* Problematyczne korzystanie z narzędzi programistycznych
* Uproszczone procesy podejmowania decyzji

Twórcy Cline używają tutaj bardzo trafnego porównania - to jak próba uruchomienia środowiska deweloperskiego na kalkulatorze zamiast na komputerze. Podstawowe operacje mogą działać, ale złożone zadania stają się nieprzewidywalne.

**Rzeczywiste konsekwencje dla pracy programisty**

W praktyce oznacza to szereg problemów, które bezpośrednio wpływają na produktywność:

Analiza kodu staje się mniej precyzyjna, operacje na plikach mogą zawodzić, a automatyzacja przeglądarki działa niestabilnie. Najgorzej jest z wieloetapowymi zadaniami - te często po prostu się załamują w połowie procesu.

Do tego dochodzą kwestie techniczne: odpowiedzi są 5-10 razy wolniejsze niż w przypadku usług chmurowych, system zużywa ogromne zasoby (CPU, GPU, RAM), a komputer może stać się mniej dostępny dla innych zadań.

**Wymagania sprzętowe vs rzeczywiste możliwości**

Nawet przy minimalnych wymaganiach - nowoczesna karta graficzna z 8GB+ VRAM, 32GB RAM systemu, szybki dysk SSD i dobre chłodzenie - uruchamiamy mniejsze, mniej zdolne wersje modeli. 

Pełna wersja DeepSeek-R1 to 671 miliardów parametrów i 404GB wymaganej pamięci (model trzeba załadować w całości), podczas gdy lokalne wersje to &quot;rozwodnione&quot; warianty tej mocy.

![](https://assets-v2.circle.so/el8b911l4a7xl22y9p0xnrlos31o)

**Praktyczne podejście do tematu**

**Zespół Cline proponuje pragmatyczne rozwiązanie:** używać modeli chmurowych do złożonych zadań deweloperskich, operacji wymagających niezawodności narzędzi i krytycznych zmian w kodzie. Modele lokalne rezerwować dla prostego uzupełniania kodu, podstawowej dokumentacji i sytuacji, gdy prywatność jest najważniejsza.

**To realistyczne spojrzenie na obecny stan technologii** \- lokalne modele AI doskonale nadają się do nauki i eksperymentowania, ale w profesjonalnej pracy programisty wciąż nie zastąpią rozwiązań chmurowych w zakresie niezawodności i złożoności zadań.

## 📚 Materiały dodatkowe

Większość popularnych usług oferujących współpracę z AI utrzymuje własne rekomendacje co do preferowanych modeli. Kilka przykładów z dokumentacji znajdziesz poniżej:

* [Modele w edytorze VS Code / usłudze Github Copilot](https://docs.github.com/en/copilot/reference/ai-models/supported-models) oraz [rekomendacje](https://github.blog/ai-and-ml/github-copilot/under-the-hood-exploring-the-ai-models-powering-github-copilot/)
* [Modele w edytorze Cursor](https://docs.cursor.com/en/models)
* [Modele w edytorze Windsurf](https://docs.windsurf.com/windsurf/models)
* [Model Selection Guide ](https://docs.cline.bot/getting-started/model-selection-guide)od twórców Cline

### **👨‍💻 Ćwiczenia praktyczne**

**Zadanie 1: Weź udział w badaniu jakości modeli na platformie LM Arena**

**Cel**: Oceń modele tekstowe i dodaj swoją opinię do globalnych rankingów.

**Instrukcje**:

1. Wejdź na stronę &lt;https://lmarena.ai/&gt;
2. W polu tekstowym wpisz i wyślij: “_Rozpoczynam szkolenie 10xDevs dotyczące praktycznego wykorzystywania AI w pracy programisty - daj mi jedną kluczową poradę, która pomoże mi odnieść sukces._“
3. Poczekaj na odpowiedź dwóch modeli i wskaż ten preferowany - zwróć uwagę na nazwy modeli, które pojawią się po udzieleniu odpowiedzi (w razie problemów rozpocznij nową konwersację).
4. Możesz przetestować własne warianty prompta dodając kilka kolejnych ocen.

**Zadanie 2: Weź udział w badaniu jakości modeli na platformie LM Arena Web**

**Cel**: Oceń modele generujące UI i dodaj swoją opinię do globalnych rankingów.

**Instrukcje:**

1. Wejdź na stronę &lt;https://web.lmarena.ai/&gt;
2. W polu tekstowym wpisz i wyślij: “_Nowoczesny dashboard śledzenia postępów uczestnika szkolenia 10xDevs, ze wsparciem dla Dark Mode, śledzenie pięciu tygodni nauki, w minimalistycznym stylu z filmu TRON_“
3. Poczekaj na odpowiedź dwóch modeli i wskaż ten preferowany - zwróć uwagę na nazwy modeli, które pojawią się po udzieleniu odpowiedzi (w razie problemów rozpocznij nową konwersację).
4. Możesz przetestować własne warianty prompta dodając kilka kolejnych ocen.

**👏 Dodałeś kilka opinii?** Brawo! Twoja aktywność **wspiera rozwój społeczności AI** i pomaga innym programistom korzystać z coraz lepszych narzędzi.

## Następny krok - współpraca z AI w IDE i Terminalu

Po zgłębieniu teorii wyboru modeli i zrozumieniu różnic między koderami a architektami, czas przenieść tę wiedzę do praktyki codziennego programowania. Najważniejsze jest teraz to, jak skutecznie wykorzystać wybrane modele w rzeczywistych projektach - zarówno w edytorze kodu, gdzie spędzasz większość czasu, jak i w terminalu, który ostatnio stał się pełnoprawnym kanałem współpracy z LLMami.

W kolejnych lekcjach przyjrzymy się dwóm popularnym narzędziom, które napędzają transformację zawodu programisty. Zobaczysz konkretne przykłady i najlepsze praktyki, które od razu możesz zastosować w swoich projektach.

Ruszamy!

![](https://assets-v2.circle.so/ekrtcr8j44qd531ut1i2iwox5c9h)