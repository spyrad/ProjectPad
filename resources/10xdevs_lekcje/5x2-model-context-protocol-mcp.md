---
title: "[5x2] Model Context Protocol (MCP)"
course: "10xdevs-2"
source: "Przeprogramowani.pl"
exported: "2025-11-09"
format: "markdown"
---

![Ilustracja z lekcji](https://assets-v2.circle.so/5k9s02ptodqueujql4zm87g3wd9k)

## Wprowadzenie

Przy pracy z agentami w środowisku programistycznym stajemy przed wyzwaniem efektywnej integracji LLM z zewnętrznymi źródłami danych i narzędziami. Do niedawna każda taka integracja wymagała budowania dedykowanych rozwiązań dla konkretnej kombinacji modelu i systemu, co tworzyło trudny do utrzymania problem M×N połączeń.

**Model Context Protocol (MCP)** powstał jako odpowiedź na tę potrzebę – uniwersalny, otwarty standard dla integracji LLM-ów z dowolnymi źródłami danych i narzędziami. Porównywany do "USB-C dla świata AI", MCP umożliwia modelom dostęp do aktualnych danych, wykonywanie akcji i korzystanie z zewnętrznych narzędzi poprzez jednolity interfejs komunikacyjny.

W kursie poznałeś już kilka serwerów MCP: [Context7](https://context7.com/) do dynamicznego ładowania wiedzy z dokumentacji modelu oraz [10x-mvp-tracker](https://github.com/przeprogramowani/10x-mvp-tracker) do śledzenia postępów przy realizacji projektu zaliczeniowego. 

W tej lekcji poznasz **architekturę MCP** opartą na wzorcu klient-serwer z wyraźnym podziałem na **narzędzia** (tools), **zasoby** (resources) i **szablony** (prompts). Dowiesz się, jak ten protokół został zaadoptowany przez największych graczy w branży – Anthropic, OpenAI i Google – oraz jak jest implementowany w popularnych edytorach kodu takich jak Cursor, Windsurf czy GitHub Copilot.

Omówimy **ekosystem MCP**, w tym referencyjne serwery (Filesystem, Git, Sequential Thinking) oraz narzędzia do tworzenia własnych integracji. Pokażemy Ci praktyczne przypadki użycia – od asystentów programisty z dostępem do dokumentacji firmowej, przez chatboty z dostępem do baz danych, po automatyzację zadań DevOps.

Poznasz również wyzwania związane z **bezpieczeństwem**, zarządzaniem zgodą użytkownika i weryfikacją kodu serwerów, a także dobre praktyki w implementacji własnych rozwiązań MCP. Ta wiedza pozwoli Ci wykorzystać pełen potencjał AI przez integrację z dowolnymi systemami zewnętrznymi, bez konieczności tworzenia dedykowanych wtyczek dla każdej kombinacji modelu i źródła danych.

## Geneza MCP – potrzeby i powstanie protokołu

Model Context Protocol narodził się jako odpowiedź na rosnącą potrzebę płynnej integracji modeli językowych (LLM) z zewnętrznymi źródłami danych i narzędziami. W miarę upowszechniania się asystentów AI okazało się, że nawet najbardziej zaawansowane modele pozostają „odcięte” od danych – zamknięte w silosach informacji z danych treningowych, z ograniczonym dostępem do plików, baz danych czy API. 

Dotychczas tworzenie integracji pomiędzy modelami a światem zewnętrznym oznaczało budowanie dedykowanych wtyczek lub API dla każdej kombinacji aplikacji i źródła danych, co określamy mianem problemu **M×N**. Jest to mało skalowalne: aby połączyć _M_ różnych modeli/agentów z _N_ systemami, potrzebujemy _M×N_ unikatowych integracji.

**MCP powstał, by rozwiązać ten problem** – dostarczyć **uniwersalny, otwarty standard** dla połączeń między LLM a dowolnymi źródłami danych czy narzędziami. Twórcy MCP porównują go do portu USB-C dla świata AI – jednolitego złącza, przez które można podłączyć różnorodne „peryferia” do dowolnego modelu.

Intensywny rozwój MCP rozpoczął się w 2024 roku, z inicjatywy firmy Anthropic (twórcy modeli Claude) we współpracy z partnerami z branży. 

Anthropic kierował się filozofią „dogfoodingu” – zanim ogłoszono standard publicznie, **rozbudowano go i przetestowano wewnętrznie na własnych projektach**. Przykładowo, [**Claude Desktop**](https://claude.ai/download) (aplikacja kliencka Anthropic) od wczesnego etapu zawierała obsługę MCP jako główny mechanizm dostępu modelu do danych użytkownika (np. plików na dysku). 

W efekcie MCP nie zadebiutował jako teoretyczna specyfikacja, lecz sprawdzony w praktyce protokół z gotowym ekosystemem: udostępniono od razu implementacje referencyjne serwerów (np. dostęp do systemu plików, repozytoriów Git, Slacka itp.) oraz pierwszego klienta (Claude Desktop).

W rozwój MCP od początku zaangażowała się społeczność **edytorów kodu „AI-native”**. Dobrym przykładem jest tu **Zed**. Zespół Zed poszukiwał sposobu, by asystent AI w edytorze mógł korzystać nie tylko z kodu źródłowego, ale i kontekstu spoza repozytorium – np. logów z produkcji, schematów baz danych czy telemetryki. 

Dlatego Zed nawiązał współpracę z Anthropic, stając się jednym z pierwszych testerów MCP. Już w dniu oficjalnej premiery (listopad 2024) ogłoszono dostępność rozszerzeń Zeda opartych o MCP – tzw. _context servers_, pozwalających np. pobrać w rozmowie z AI wyniki zapytania do bazy czy fragment logów za pomocą prostej komendy w edytorze. 

Co istotne, MCP jest niezależny od konkretnej aplikacji czy dostawcy AI: **„MCP nie jest na stałe powiązany z Zedem ani Anthropic; to protokół, a nie biblioteka, więc każdy może go użyć bez zależności od naszego kodu”** – podkreślał Richard Feldman z Zed. 

Wśród innych pionierów MCP wymienia się m.in. Replit, Codeium (Windsurf) i Sourcegraph, które szybko dostrzegły potencjał wspólnego standardu dla narzędzi programistycznych z AI.

Podsumowując genezę: **MCP zrodził się z praktycznej potrzeby** – ułatwienia modelom AI dostępu do aktualnego kontekstu i narzędzi – a jego projekt został ukształtowany w duchu otwartości i współpracy branżowej. 

Dzięki dogfoodingowi w Anthropic oraz wkładowi partnerów jak Zed, MCP wystartował z dojrzałą specyfikacją i zestawem pierwszych implementacji gotowych do użycia w realnych aplikacjach.

## Architektura Model Context Protocol

![Ilustracja z lekcji](https://assets-v2.circle.so/5vhbdnexma5957zzmx32fogf7ygn)

MCP opiera się na wzorcu komunikacji **stanowej** (stateful) **klient–serwer**, mediowanym przez hosta (aplikację AI, np. IDE). Dzięki temu każda sesja jest inicjowana, negocjowana i utrzymywana aż do zakończenia, co zapewnia izolację poszczególnych połączeń oraz jasne granice bezpieczeństwa między komponentami systemu. Omówmy poszczególne elementy systemu:

**Host -** To aplikacja AI lub agent (np. Claude Desktop, VS Code z Copilotem, Cursor, Windsurf), która:

- inicjuje i zarządza sesjami MCP,
- agreguje odpowiedzi z różnych serwerów,
- prezentuje użytkownikowi interfejs do zatwierdzania akcji i przeglądania dostępnych narzędzi. Host odpowiada też za polityki bezpieczeństwa (sandboxing serwerów, kontrola „roots” itp.) oraz za przekazywanie modelowi tylko tych danych i narzędzi, na które użytkownik wyraził zgodę.

**Klient** \-każdy klient jest komponentem osadzonym wewnątrz hosta:

- utrzymuje **1:1 połączenie** z pojedynczym serwerem MCP,
- prowadzi negocjację możliwości (capabilities) w fazie initialize/initialized,
- tłumaczy wywołania modelu (tools/call, resources/read, prompts/use) na komunikaty JSON-RPC i z powrotem zwraca wyniki serwera.

Dzięki izolacji klientów host może jednocześnie komunikować się z wieloma serwerami, zachowując odrębne zasady bezpieczeństwa dla każdej integracji.

**Serwer** \-serwer MCP to lekka usługa (lokalna lub zdalna), która:

- **eksponuje narzędzia (tools)** – funkcje wywoływalne przez model (np. zapytania do API, operacje na plikach),
- **udostępnia zasoby (resources)** – dane tylko-do-odczytu (pliki, rekordy bazy, wektory pamięci),
- **rejestruje prompty (prompts)** – predefiniowane szablony interakcji.

Serwer zgłasza swoje możliwości hostowi podczas inicjalizacji, a następnie obsługuje przychodzące żądania, zwracając odpowiednio sformatowane odpowiedzi zgodnie z JSON-RPC 2.0.

**Lokalne źródła danych** \-MCP pozwala hostowi wskazać katalogi lub bazy danych jako **roots**, które serwer następnie udostępnia w postaci **resources**. Przykłady:

- system plików (listowanie katalogów, odczyt plików),
- relacyjne bazy danych (read-only queries),
- trwała pamięć konwersacji (wektorowe lub grafowe bazy wiedzy).

Host decyduje, które ścieżki lub tabele są widoczne dla serwera, dzięki czemu zachowuje kontrolę nad zakresem udostępnianych danych.

**Zewnętrzne serwisy i źródła danych** \-Każdy serwer może mapować wywołania MCP na dowolne API lub usługi chmurowe:

- **REST/GraphQL** – narzędzia jako wrappery HTTP,
- **SSE/WebSocket/Streamable HTTP** – nasłuchiwanie zdarzeń w czasie rzeczywistym,
- **Multimodalne usługi** – generowanie obrazów, przetwarzanie wideo czy audio.

Dzięki takiej architekturze MCP może spełniać swoją rolę „USB-C dla AI” - to jednolite złącze, którym model może podłączyć się do rozmaitych systemów, nie martwiąc się o różnice w specyfikacji API czy formatowaniu danych.

## Kluczowe przewagi MCP nad OpenAPI i LSP

Jednym z założeń projektowych MCP było stworzenie **standardu integracji „AI-native”**, tzn. takiego, który od podstaw uwzględnia specyfikę pracy agentów AI i modeli językowych. 

W przeciwieństwie do istniejących rozwiązań (jak OpenAPI czy GraphQL), zaprojektowanych głównie z myślą o tradycyjnych aplikacjach i usługach webowych, **MCP skupia się na scenariuszach konwersacyjnych z udziałem LLM**, gdzie w trakcie generowania odpowiedzi model może potrzebować dodatkowych danych lub wykonać akcję. Twórcy MCP określają to jako podejście _“presentation-focused”_ – nastawione na to, **jak dane funkcje i informacje będą prezentowane i wykorzystywane przez LLM w interakcji z użytkownikiem**. 

**Prymitywy w MCP**

W praktyce oznacza to wprowadzenie odrębnych _prymitywów_ (funkcjonalnych komponentów) protokołu, mimo że pod spodem mogłyby one być zrealizowane podobnie. Zespół Anthropic początkowo rozważał, czy wszystkie możliwości nie sprowadzają się po prostu do wywołań funkcji (tools), ale doszedł do wniosku, że wyodrębnienie także **„prompts”** i **„resources”** jest bardzo użyteczne, bo wyraża odmienną **intencję** i pozwala inaczej zaprezentować te elementy w aplikacji . 

Takie podejście to inspiracja z LSP (Language Server Protocol). LSP to protokół standaryzujący komunikację między edytorami kodu (jak Visual Studio Code) a serwerami dostarczającymi inteligentne funkcje językowe (np. podpowiedzi składni, definicje). Celowo rozróżnia on typy zapytań (np. o podpowiedź vs. o definicję), aby edytor mógł odpowiednio zareagować i inaczej zaprezentować wyniki użytkownikowi. Dzięki temu edytor może np. wyświetlić wyniki w inny sposób. 

Analogicznie w MCP**:** podział na **Tools, Resources i Prompts** wynika z tego, że każdy z tych typów wymaga innej obsługi i prezentacji w interfejsie użytkownika (np. lista plików vs. wynik działania funkcji).

W MCP mamy do dyspozycji następujące prymitywy:

- **Tools (narzędzia)** – _wywoływalne funkcje_, które model może samodzielnie zainicjować. Stanowią odpowiednik _function calls_ dla LLM: model decyduje, że chce np. wykonać obliczenie, więc wykorzystuje narzędzie typu kalkulator. Tools są **kontrolowane przez model** (model-controlled) – to AI wybiera moment i sposób ich użycia w trakcie konwersacji. Przykładem może być narzędzie search\_web(query) otwierające wyszukiwarkę: model sam decyduje o jego wywołaniu, gdy uzna to za potrzebne.
- **Resources (zasoby)** – _dane kontekstowe_, typowo tylko do odczytu (read only), które MCP udostępnia modelowi. To mogą być pliki, dokumenty, rekordy bazy danych itp. **Kontrolę nad resources sprawuje aplikacja/host** (application-controlled) – innymi słowy, to środowisko (np. edytor) decyduje, jakie zasoby i w jakiej formie są widoczne dla modelu. Przykładowo edytor może automatycznie dołączyć zawartość pliku README.md jako resource, by model miał kontekst projektu. Jednak co do zasady, model sam z siebie nie „wynajdzie” resource, którego mu nie udostępniono. Resources najczęściej są włączane przez akcje użytkownika lub ustawienia (np. _„dodaj plik X do kontekstu AI”_).
- **Prompts (szablony/polecenia)** – _predefiniowane wzorce interakcji_ albo dodatkowe komunikaty, które mogą być wstawione do rozmowy. **Kontrolę nad prompts ma użytkownik** (user-controlled) – wywołuje się je świadomie, zwykle w formie komendy lub przycisku w interfejsie. Przykładem prompta jest np. _„Wyjaśnij poniższy kod”_ – gotowy szablon, który po wybraniu dostarcza modelowi instrukcję z miejscem na kontekst (np. zaznaczony kod). **Prompty różnią się od tooli** tym, że nie wykonują akcji, a raczej formułują pewien kontekst lub pytanie do modelu.

Oprócz powyższych, MCP definiuje jeszcze **Roots** i **Sampling**, które omówimy w dalszych sekcjach (to prymitywy bardziej zaawansowane, dotyczące klienta). 

**Stanowość i kontekstowość (różnice względem OpenAPI)**

Z punktu widzenia przewag nad standardowymi API warto jednak wspomnieć o idei **stanowości (stateful)**. **MCP został zaprojektowany jako protokół połączeniowy utrzymujący stan** – oznacza to, że klient i serwer najpierw się **inicjalizują i negocjują możliwości**, a potem mogą wymieniać wiele powiązanych komunikatów w ramach jednej sesji. To duża różnica w porównaniu z REST/OpenAPI, gdzie każde wywołanie jest niezależne i stateless. 

Twórcy protokołu uważają, że interakcje AI z czasem będą stawały się co raz bardziej oparte o stan, więc warto było od razu uwzględnić tę cechę. Stanowość ułatwia też negocjowanie funkcjonalności – np. serwer przy inicjalizacji zgłasza, że ma pewne toolsy i resources, a klient deklaruje, które z nich obsłuży (np. zgodnie z preferencjami użytkownika/firmy). To z kolei umożliwia dynamiczne dostosowanie interfejsu użytkownika: **MCP jest „presentation-focused” także w tym sensie, że funkcje dostępne w danej sesji mogą być prezentowane kontekstowo** (np. edytor wyświetli listę dostępnych narzędzi dopiero po połączeniu z serwerem MCP).

Kolejna przewaga MCP uwidacznia się w porównaniu z OpenAPI, które służy do opisania REST-owego interfejsu usług. OpenAPI zapewnia modele JSON-owych schematów endpointów, ale **nie niesie informacji wysokopoziomowej** przydatnej z punktu widzenia agenta AI. 

W MCP natomiast semantyka wbudowanych prymitywów odzwierciedla typowe potrzeby LLM: zamiast setek niskopoziomowych metod HTTP, mamy kilka kategorii integracji (tool/resource/prompt), co jest **bardziej zrozumiałe dla modelu**. 

Jak ujął to jeden z twórców MCP David Parra: _OpenAPI jest zbyt granularne – nie oddaje koncepcji specyficznych dla AI, takich jak intencjonalny podział na tools, resources oraz prompts. Wierzymy, że modele lepiej skorzystają z protokołu zaprojektowanego pod ich potrzeby, niż z surowego „oto nasze REST API, radź sobie”_. 

Dodatkowo OpenAPI nie precyzuje nic na temat prezentacji wyników w UI czy kwestii autoryzacji ze strony użytkownika, podczas gdy MCP od początku uwzględnia mechanizmy kontroli i zgód (np. zaleca, by każde użycie narzędzia wymagało potwierdzenia użytkownika, a serwer nie miał wglądu w całość promptu bez potrzeby).

**Language Server Protocol a MCP**

LSP (protokół serwera językowego) był ważną inspiracją dla MCP. Oba standardy dzielą filozofię, by odseparować implementację funkcjonalności od aplikacji klienckiej – w LSP edytor kodu nie „zna się” na wszystkich językach programowania, tylko komunikuje się przez ustandaryzowany protokół z serwerem języka (np. Pythona czy Go), który dostarcza podpowiedzi i analizę składni. 

MCP analogicznie pozwala aplikacji AI (np. IDE z agentem) na korzystanie z zewnętrznych integracji z usługą bez pisania implementacji dla każdej aplikacji od zera. 

**Różnice między standardami występują, i wynikają z obszaru zastosowań**. LSP jest stateless (każde otwarcie pliku czy zapytanie o podpowiedź jest odrębne) i dotyczy tylko tekstu/kodu, natomiast MCP musi obsłużyć konwersację z modelem, wykonywanie akcji i dostęp do potencjalnie wrażliwych danych – stąd dodatkowe elementy architektury (session, sampling, consent flows). 

Mimo to, wiele elementów protokołu MCP celowo oparto na sprawdzonych wzorcach LSP: wykorzystano np. format JSON-RPC 2.0 do kodowania komunikatów, podobny schemat inicjalizacji i negocjacji możliwości, czy ideę rejestrowania _handlerów_ dla poszczególnych metod. 

Zespół Anthropic przeanalizował również **błędy i ograniczenia LSP**, aby ich nie powtarzać w MCP. Przykładowo, LSP specyficznie modyfikuje standard JSON-RPC (co bywało krytykowane), zaś MCP trzyma się go bez zmian. 

Podsumowując, MCP można traktować jako „**LSP dla świata AI**” – analogię tę zauważało wielu komentatorów i sam zespół Anthropic – tyle że zaprojektowany od początku z myślą o potrzebach agentów AI, zamiast edytorów kodu.

**Przykład komunikacji JSON-RPC w MCP:** Poniżej znajdziesz przykładowe zapytanie MCP wywołujące narzędzie oraz format odpowiedzi. Zwróć uwagę na użycie pola method z nazwą prymitywu i na opakowanie wyniku w obiekt result zgodny z JSON-RPC 2.0.

```
// Klient (Host) -> Serwer MCP: prośba o wykonanie narzędzia "get_weather"
{
  "jsonrpc": "2.0",
  "id": 42,
  "method": "tools/call",
  "params": {
    "name": "get_weather",
    "arguments": { "location": "London" }
  }
}
```

```
// Serwer MCP -> Klient: odpowiedź z wynikiem działania narzędzia
{
  "jsonrpc": "2.0",
  "id": 42,
  "result": {
    "content": [
      { "type": "text/plain", "text": "Pogoda w Londynie: słonecznie, 15°C" }
    ],
    "metadata": null
  }
}
```

Jak widać, wywołanie narzędzia odbywa się przez metodę "tools/call" z nazwą funkcji i argumentami, a odpowiedź zawiera tablicę content z wynikiem (tu zwracany tekst). MCP standaryzuje taki format komunikacji dla wszystkich integracji – dzięki temu warstwa modelu może obsługiwać uniwersalne schematy (tools/list, tools/call, resources/read, prompts/list itp.), zamiast polegać na niestandardowych API.

**MCP wygrywa z podejściami typu OpenAPI tym, że jest świadomy kontekstu AI i dostarcza wyższy poziom abstrakcji dostosowany do konwersację z modelem**, a od LSP różni go orientacja na integrację danych i narzędzi (nie tylko edycję kodu) oraz wbudowane mechanizmy związane z bezpieczeństwem i zgodą użytkownika. 

To czyni go unikalnym rozwiązaniem, które **upraszcza tworzenie agentów AI** – developer buduje serwer MCP raz, a może z niego korzystać wiele modeli i aplikacji, bez każdorazowego dostosowywania integracji.

## Adopcja i momentum MCP – wsparcie gigantów i społeczności

Od momentu upublicznienia protokołu MCP (końcówka 2024) jego adopcja nabrała imponującego tempa, napędzana zarówno przez wiodących dostawców AI (Anthropic, OpenAI, Google), jak i entuzjastyczną społeczność developerów. 

**Anthropic** oczywiście od początku wspiera MCP jako autor specyfikacji i główny promotor standardu. Firma otworzyła cały projekt jako open-source i zachęciła innych do wspólnego rozwoju. Jak stwierdzili przedstawiciele Anthropic: _„Jesteśmy zaangażowani we wspólne budowanie MCP jako projektu open-source. Niezależnie czy jesteś twórcą narzędzi AI, przedsiębiorstwem chcącym wykorzystać swoje dane, czy early adopterem, zapraszamy do wspólnego tworzenia przyszłości kontekstowej AI”_. To otwarte podejście szybko przyniosło efekty sieciowe.

Na przełomie marca i kwietnia 2025 pojawiły się przełomowe deklaracje: **OpenAI** oficjalnie poinformowało, że **dodaje obsługę MCP w swoich produktach, w tym w aplikacji ChatGPT Desktop**. Sam Altman (CEO OpenAI) napisał: _„Ludzie uwielbiają MCP i z radością dodajemy wsparcie w naszych produktach. \[Jest\] dostępny od dziś w Agents SDK, a wsparcie w aplikacji desktop ChatGPT i Responses API nadchodzi wkrótce!”_. Był to znaczący sygnał – OpenAI, zamiast forsować własny standard, zdecydowało się **przyjąć protokół zaproponowany przez konkurenta (Anthropic)**, co w branży nowych technologii jest rzadkim przykładem kooperacji. 

Chwilę później **Google również ogłosiło dołączenie do inicjatywy MCP**. Demis Hassabis, CEO Google DeepMind, potwierdził w kwietniu 2025, że protokół MCP zostanie zaimplementowany w modelach **Google Gemini** i odpowiednich SDK. Hassabis określił MCP jako _„szybko stający się otwartym standardem agentów AI”_ i wyraził entuzjazm we współpracy nad jego dalszym rozwojem wspólnie z zespołem MCP i resztą branży. 

Fakt, że **trzech największych graczy AI (Anthropic, OpenAI, Google)** wspólnie wspiera jeden standard, dał MCP ogromny kredyt zaufania i zapewnił zasoby potrzebne do dynamicznego rozwoju.

Na szybkie tempo adopcji wpłynęły zarówno **czynniki techniczne**, jak i **biznesowe**. Po stronie technicznej sukces MCP wynika z **jakość** [**specyfikacji**](https://modelcontextprotocol.io/introduction) **i gotowe SDK (**[Python](https://github.com/modelcontextprotocol/python-sdk), [TypeScript](https://github.com/modelcontextprotocol/typescript-sdk), [Swift](https://github.com/modelcontextprotocol/swift-sdk), [Java](https://github.com/modelcontextprotocol/java-sdk), [Rust](https://github.com/modelcontextprotocol/rust-sdk), [Kotlin](https://github.com/modelcontextprotocol/kotlin-sdk), [C#](https://github.com/modelcontextprotocol/csharp-sdk)).

**„Specyfikacja MCP jest BARDZO dobra”** – zauważono w wielu analizach, co wyróżnia go na tle innych pomysłów integracji AI, często słabo udokumentowanych. Ponadto MCP nie wymaga porzucania istniejących rozwiązań, a raczej je uzupełnia. Można np. owrappować istniejące API OpenAPI w serwer MCP, co zresztą społeczność szybko zrobiła, tworząc _bridge_ tłumaczące jedno na drugie. Taka **komplementarność** sprawiła, że nawet firmy z własnymi systemami wtyczek (jak OpenAI Plugins) nie postrzegały MCP jako zagrożenia, a raczej jako szansę na uniwersalność. 

Z kolei czynniki biznesowe to głównie **efekt sieci i presja rynku**: im więcej popularnych narzędzi i aplikacji integruje MCP, tym bardziej opłaca się to kolejnym. Współpraca tu przynosi korzyści wszystkim – podobnie jak było z USB czy protokołem HTTP w internecie. 

W branży AI pojawiła się świadomość, że **fragmentacja ekosystemu wtyczek szkodzi** (zarówno użytkownikom, jak i developerom), a jeden otwarty standard może znacząco przyspieszyć innowacje.

Dużą rolę odegrała **społeczność open-source**. Anthropic od początku prowadzi rozwój MCP jawnie na GitHubie, z zaproszeniem do kontrybucji. Już w pierwszych miesiącach programiści open-source stworzyli **setki, a następnie tysiące własnych serwerów MCP** dla przeróżnych usług – od integracji z Dockerem czy Spotify po niestandardowe bazy wiedzy. Aktywnie działa też **forum dyskusyjne i grupy na Reddit/Discord**, gdzie użytkownicy dzielą się doświadczeniami. 

W rezultacie, w ciągu kilku miesięcy powstał efekt kuli śnieżnej: **„MCP stał się kwitnącym otwartym standardem z tysiącami integracji i rośnie dalej”** – pisał Mike Krieger z Anthropic w marcu 2025.

Pod koniec 2025 MCP faktycznie stało się powszechnym standardem wspieranym przez wszystkich topowych graczy na rynku AI.

### MCP w edytorach AI

Do sukcesu MCP przyczynili się też **dostawcy topowych edytorów AI**. Wspomniani wcześniej pionierzy (Zed, Replit, Sourcegraph, Codeium) wdrożyli MCP do swoich produktów już w fazie wstępnej. Od tamtej pory rozwiązania te ewoluowały pod nowymi nazwami lub w nowych wersjach, wciąż wspierając standard. 

Warto przeanalizować stan implementacji MCP w kluczowych narzędziach AI dla developerów:

- **GitHub Copilot / VS Code** \- Oferuje pełne, natywne wsparcie dla całej specyfikacji MCP, włączając w to **Tools, Resources, Authentication i Sampling**. Wyróżnia się zintegrowanym rynkiem i rejestrem MCP, co pozwala na łatwe wyszukiwanie i instalowanie serwerów bezpośrednio w edytorze. Umożliwia programistyczną rejestrację serwerów przez inne rozszerzenia VS Code oraz posiada zaawansowane mechanizmy kontroli dla firm, takie jak białe listy i polityki bezpieczeństwa. Implementacja jest stabilna i obsługuje zarówno lokalne (stdio), jak i zdalne (HTTP) serwery. Obecnie jest to najbardziej kompletne i gotowe do wdrożeń korporacyjnych rozwiązanie na rynku, bez widocznych braków w kluczowych funkcjonalnościach. We wrześniu wprowadzono [oficjalny rejestr MCP](https://github.com/mcp). Więcej informacji w [dokumentacji](https://docs.github.com/en/copilot/how-tos/provide-context/use-mcp/extend-copilot-chat-with-mcp).
- **Cursor** \- Posiada zaawansowany interfejs użytkownika zorientowany na pracę z agentami AI i oferuje katalog polecanych serwerów MCP. Niedawno dodano wsparcie dla zasobów MCP, ale implementacja protokołu jest węższa niż u konkurencji. Głównym problemem jest fundamentalna niestabilność; użytkownicy zgłaszają krytyczne błędy, przez które agent nie jest w stanie wykryć ani użyć skonfigurowanych narzędzi. Kluczowe funkcje, takie jak automatyczne zatwierdzanie narzędzi z białej listy, są zepsute, co wymusza na użytkownikach wielokrotne, ręczne potwierdzanie każdej akcji. Brakuje mu niezawodności niezbędnej do profesjonalnej pracy. Więcej informacji w [dokumentacji](https://cursor.com/docs/context/mcp).
- **Windsurf** \- Koncentruje się na stabilności i prostocie obsługi. Wyróżnia go interfejs do instalacji popularnych serwerów (np. Figma, Slack) jednym kliknięciem, bez potrzeby ręcznej konfiguracji plików JSON. Jego implementacja MCP jest dojrzała, wspiera zasoby i jest regularnie aktualizowana z naciskiem na poprawki błędów, co czyni go niezawodnym narzędziem. Posiada funkcje dla zespołów, takie jak firmowe białe listy dla serwerów. Brakuje mu jednak tak rozbudowanego ekosystemu i pełnego wsparcia dla całej specyfikacji protokołu, jakie oferuje VS Code. Więcej informacji w [dokumentacji](https://docs.windsurf.com/windsurf/cascade/mcp).
- **JetBrains AI Assistant** \- Jako klient MCP, jego wsparcie jest w fazie beta i jest bardzo ograniczone. Natywnie obsługuje wyłącznie lokalne serwery przez stdio, a połączenie ze zdalnymi serwerami HTTP wymaga instalacji dodatkowego proxy. Konfiguracja jest w pełni manualna i brakuje mu jakiegokolwiek rynku czy mechanizmu odkrywania serwerów. Jego unikalną siłą jest możliwość działania samego IDE jako wysokiej jakości _serwera_ MCP, udostępniając swoje zaawansowane narzędzia do analizy kodu i refaktoryzacji zewnętrznym klientom, takim jak Copilot. Więcej informacji w [dokumentacji](https://www.jetbrains.com/help/ai-assistant/mcp.html).

Wspólnym mianownikiem powyższych przykładów jest to, że **MCP zdobyło akceptację jako warstwa pośrednia integracji** w różnych środowiskach deweloperskich. **Momentum MCP** bierze się z tego, że każdy nowy uczestnik – czy to dostawca modelu (OpenAI, Google), czy producent narzędzia (edytor, platforma) – wzmacnia ekosystem i motywuje kolejnych do przyłączenia. 

Biznesowo tworzy się efekt _"jednego standardu"_, co ułatwia życie użytkownikom (mogą np. używać tych samych serwerów kontekstowych w różnych edytorach) i redukuje koszty po stronie vendorów (wspólny rozwój zamiast duplikacji). 

Już wczesny 2025 pokazał, że MCP **„wygrało” wyścig standardów** – nawet jeśli pojawią się alternatywy, trudniej będzie im zyskać tak szerokie poparcie. Jak ujął to niezależny analityk: _„To nie przypadek ani hype – kilka czynników złożyło się na sukces MCP: AI-native design, otwartość, dogfooding, podobieństwo do LSP i efekt sieci”_.

## Ekosystem serwerów i klientów MCP – implementacje i narzędzia

Potencjał protokołu MCP tkwi nie tylko w jego specyfikacji, ale w **praktycznym ekosystemie**: dostępnych serwerach (dostarczających funkcjonalności) oraz klientach (hostach), a także narzędziach ułatwiających tworzenie własnych integracji (SDK). Poniżej omawiamy główne składniki tego ekosystemu:.

**Referencyjne serwery MCP** – tuż po premierze Anthropic udostępnił [zestaw opensource’owych serwerów](https://github.com/modelcontextprotocol/servers) pokazujących możliwości MCP. Są one napisane w Pythonie lub TypeScript i pokrywają typowe przypadki użycia. Do najważniejszych należą:

- [**Filesystem**](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem) – serwer dający **bezpieczny dostęp do systemu plików** użytkownika. Umożliwia np. listowanie katalogów, czytanie plików, a (opcjonalnie, po konfiguracji) także ich modyfikację/zapis. W protokole MCP operacje te są udostępniane jako **resources** (pliki jako zasoby) oraz dodatkowe **tools** (np. narzędzie do utworzenia nowego pliku). Ten serwer jest kluczowy dla aplikacji desktopowych – np. Claude Desktop używa go, aby Claude mógł czytać pliki z komputera użytkownika **za zgodą** (to właśnie _roots_ – aplikacja wskazuje katalog root, do którego serwer plików ma dostęp).
- [**Sequential Thinking**](https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking) – to ciekawy przykład **serwera „metanarzędziowego”**, który dostarcza modelowi umiejętność lepszego rozwiązywania złożonych zadań poprzez **planowanie i ewaluację kolejnych kroków.** Serwer ten udostępnia jeden główny tool (np. sequential\_thinking\_tool), którego wywołanie powoduje, że serwer zaczyna współpracować z modelem, generując podzadania i korzystając z mechanizmu _sampling_. Innymi słowy, jest to sposób, by szybki model do implementacji mógł „poprosić” inny model o pomoc w przemyśleniu problemu, strukturyzując rozwiązanie krok-po-kroku. Implementacje Sequential Thinking wykorzystują często wiele _promptów_ wewnętrznie: np. serwer ten może przyjąć od modelu aktualną myśl i przez sampling uzyskać następny krok (lub ocenę odpowiedzi), co potem zwraca modelowi głównemu.
- [Git](https://github.com/modelcontextprotocol/servers/tree/main/src/git) \- serwer udostępniający **narzędzia do interakcji z repozytoriami Git**. Umożliwia obsługę repozytoriów git poprzez czytanie, przeszukiwanie i manipulowanie repozytoriami przy pomocy LLM. Serwer ten udostępnia szereg **tools** (narzędzi) do realizacji typowych operacji git, takich jak sprawdzanie statusu, wykonywanie commitów, czy zarządzanie branchami. Jest to szczególnie przydatne dla automatyzacji operacji na kodzie z wykorzystaniem AI, pozwalając modelom na bezpośrednią interakcję z kodem źródłowym zgromadzonym w repozytoriach.

Poza powyższymi, [lista serwerów referencyjnych dostępnych na Github](https://github.com/modelcontextprotocol/servers) jest długa:

![Ilustracja z lekcji](https://assets-v2.circle.so/urw9zhnd5s1abdno2ec92kmndepl)

Dodatkowo w repozytorium [awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) znajdziesz kilkaset serwerów utrzymywanych przez społeczność MCP, w tym wiele oficjalnych rozwiązań dostarczanych przez dostawców usług. Przykłady to: [Supabase](https://github.com/supabase-community/supabase-mcp), [Cloudflare](https://github.com/cloudflare/mcp-server-cloudflare).

Repozytorium awesome-mcp-servers ma już 73k gwiazdek na GitHubie i jest regularnie aktualizowane.

👉 Szukając MCP, **w pierwszej kolejności sprawdzaj czy istnieje oficjalny serwer** zanim sięgniesz po rozwiązanie open source od deva niepowiązanego z usługodawcą. W repo awesome-mcp-servers oficjalne serwery są oznaczone przez emoji medalu 🎖️

**Dlaczego to takie istotne? Bezpieczeństwo.** Ryzyko podatności lub hackingu ze strony twórcy jest mocno zależne od tego skąd podchodzi MCP. Jeżeli mówimy o oficjalnych MCP dostarczanych przez usługodawcę, to ryzyko jest naprawdę niskie i niczym się nie różni od popularnych bibliotek dostępnych w rejestrach typu npm. Jednak gdy mówimy o MCP od nieznanego deva, który akurat tworzy serwer pod daną usługę? Tutaj ryzyko jest znacznie wyższe. Warto przeanalizować kod serwera zanim postanowimy go uruchomić na naszej maszynie. Co ważne, to że istnieje oficjalny serwer wcale nie oznacza że nie ma anonimowych naśladowców - zawsze weryfikuj po repo serwera (kto jest jego autorem).

## Jak zbudować własny serwer MCP w TypeScript z Cloudflare Workers?

Kiedy mówimy o budowaniu własnego MCP, skupiamy się na implementacji **serwera**. Klient (np. Cursor) jest już gotowy i będzie komunikował się z naszym serwerem w celu odkrycia i wywołania dostępnych narzędzi.

W ekosystemie Node.js/TypeScript, warto korzystać z wielu [szablonów startowych przygotowanych do integracji z infrastrukturą Cloudflare Workers](https://github.com/cloudflare/ai/tree/main/demos) oraz[ SDK dla TypeScript](https://github.com/modelcontextprotocol/typescript-sdk). Na start polecamy starter [remote-mcp-authless](https://github.com/cloudflare/ai/tree/main/demos/remote-mcp-authless) (dla serwerów nie wymagających auth, jak w przypadku 10xRules.ai)

W ten sposób otrzymujemy boilerplate niezbędny do stworzenia serwera zgodnego z protokołem MCP, działającego jako Cloudflare Worker. Dzięki temu jesteśmy w stanie zbudować i zdeployować serwer w krótkim czasie.

Z takim setupem utworzyliśmy [ai-rules-builder/mcp-server](https://github.com/przeprogramowani/ai-rules-builder/tree/master/mcp-server), czyli serwer MCP, który pozwoli Wam korzystać z reguł [10xRules.ai](http://10xrules.ai/) bez opuszczania edytora. 

```
"10x-rules": {
      "url": "https://10x-rules-mcp-server.przeprogramowani.workers.dev/mcp"
},
```

Więcej informacji znajdziesz w [README.md naszego serwera](https://github.com/przeprogramowani/ai-rules-builder/blob/master/mcp-server/README.md).

W przyszłości planujemy również dodać wsparcie dostępu do Prompt Library, co będzie wymagało przejścia na serwer z autoryzacją.

**Definiowanie narzędzi**

W naszym podejściu narzędzia definiujemy jako oddzielne obiekty eksportowane z dedykowanego modułu ([rulesTools.ts](https://github.com/przeprogramowani/ai-rules-builder/blob/master/mcp-server/src/tools/rulesTools.ts)). Każdy obiekt narzędzia zawiera kluczowe informacje:

1. _name_: Unikalna nazwa identyfikująca narzędzie (np. \`listAvailableRules\`).
2. _description_: Krótki opis przeznaczenia narzędzia, widoczny dla klienta i modelu.
3. _inputSchema_: Schemat Zod definiujący oczekiwane parametry wejściowe. Dla narzędzi bez parametrów (jak \`listAvailableRulesTool\`) używamy \`z.object({}).optional()\`.
4. _outputSchema_: Schemat Zod definiujący strukturę danych zwracanych przez narzędzie.
5. _execute_: Asynchroniczna funkcja zawierająca logikę biznesową narzędzia. Przyjmuje zwalidowane dane wejściowe (jeśli istnieją) i zwraca wynik zgodny z \`outputSchema\`.

Przykład definicji narzędzia \`listAvailableRules\`:

```
export const listAvailableRulesTool = {
  name: 'listAvailableRules',
  description: 'Lists available AI library identifiers and their stacks, with instructions on how to get rules.',
  inputSchema: z.object({}).optional(),
  outputSchema: listAvailableRulesOutputSchema, // Use the new output schema
  async execute(): Promise<z.infer<typeof listAvailableRulesOutputSchema>> {
    const hierarchy = getRuleHierarchy();
    const availableLibraries = findLibraries(hierarchy);

    const result = {
        availableLibraries: availableLibraries,
        reminder: "Use the 'getRuleContent' tool with one of the 'identifier' values (e.g., 'REACT_CODING_STANDARDS') to get specific rules."
    };

    // Validate the final output structure
    const validation = listAvailableRulesOutputSchema.safeParse(result);
    if (!validation.success) {
        console.error('Output validation failed for listAvailableRules:', validation.error);
        // Fallback or throw error
        throw new Error('Internal server error: Failed to prepare available libraries list.');
    }
    return validation.data;
  },
};
```

**Rejestracja narzędzi w serwerze**

Mając zdefiniowane narzędzia, musimy je zarejestrować w instancji serwera MCP. Odbywa się to w głównym pliku serwera ([mcp-server/src/index.ts](https://github.com/przeprogramowani/ai-rules-builder/blob/master/mcp-server/src/index.ts)), w metodzie init() klasy MyMCP (rozszerzającej McpAgent z SDK). Używamy metody this.server.tool():

```
import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { listAvailableRulesTool, getRuleContentTool } from "./tools/rulesTools";
import { z } from 'zod';

// Define our MCP agent with tools
export class MyMCP extends McpAgent {
	server = new McpServer({
		name: "MCP Rules Server",
		version: "1.0.0",
	});

	async init() {
		// Register listAvailableRulesTool
		this.server.tool(
			listAvailableRulesTool.name,
            listAvailableRulesTool.description,
            async () => {
                const result = await listAvailableRulesTool.execute();
                return { content: [{ type: 'text', text: JSON.stringify(result) }] };
            }
		);

// reszta implementacji
```

SDK wraz z frameworkiem Cloudflare Workers zajmuje się obsługą żądań HTTP, routingiem do odpowiedniego narzędzia na podstawie toolName z żądania, oraz komunikacją zgodną z protokołem MCP. Naszym zadaniem jest zdefiniowanie logiki narzędzi oraz ich poprawne zarejestrowanie. 

Podczas pracy nad własnym serwerem nieocenionym narzędziem do testowania i debugowania jest [**MCP Inspector**](https://modelcontextprotocol.io/docs/tools/inspector) czyli interaktywne narzędzie (aplikacja webowa) pozwalające na połączenie z serwerem MCP i ręczne wywoływanie metod, podgląd komunikatów JSON-RPC, logów itp. 

Możesz je uruchomić lokalnie za pomocą komendy _npx @modelcontextprotocol/inspector@latest_

Będzie ono dostępne pod adresemhttp://localhost:6274**.** Następnie w drugiej sesji terminala odpalamy serwer MCP, np. pod adresem http://localhost:8787\. Dzięki temu możemy się z nim połączyć w MCP Inspector:

![Ilustracja z lekcji](https://assets-v2.circle.so/gid072fcm42ytwwyi08en9trwlf5)

To bardzo ułatwia diagnozę problemów – możemy sprawdzić, czy nasz serwer poprawnie zwraca listę tooli, jak wygląda jego odpowiedź, czy obsługuje równoległe żądania itd. 

### **Wdrożenie serwera MCP** 

Wdrożenie serwera MCP zbudowanego na bazie szablonu Cloudflare Workers jest elastyczne i może być dostosowane do różnych struktur projektowych. Omówmy dwa główne scenariusze:

**1\. Wdrożenie samodzielnego serwera MCP**

Jeśli budujesz i wdrażasz _tylko_ serwer MCP (bez powiązanej aplikacji frontendowej), proces jest znacznie prostszy. Zakładamy, że kod serwera znajduje się w dedykowanym repozytorium lub katalogu.

**Przygotowanie:** Potrzebujesz konta Cloudflare oraz zainstalowanego narzędzia [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/get-started/), wraz ze skonfigurowanymi sekretami _CLOUDFLARE\_API\_TOKEN_ i _CLOUDFLARE\_ACCOUNT\_ID_ w środowisku CI/CD czyli Github Actions. 

Plik konfiguracyjny Wranglera (_wrangler.toml_ lub _wrangler.jsonc_) w katalogu serwera powinien definiować nazwę workera i plik wejściowy (src/index.ts).

**Proces CI/CD (Przykład GitHub Actions):** Typowy worfklow dla samodzielnego serwera powinien wyglądać następująco:

```
  deploy-mcp-worker:
    name: Deploy Worker (mcp-server)
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version-file: '.nvmrc' # Assuming .nvmrc is in the root
          cache: 'npm'
          cache-dependency-path: '**/package-lock.json' # Cache npm deps for root and worker

      - name: Install dependencies
        run: npm ci

      - name: Deploy Worker (mcp-server)
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_WORKER_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: deploy
```

**Wynik:** Po pomyślnym wdrożeniu, serwer MCP będzie dostępny pod adresem URL przypisanym przez Cloudflare Workers ([nazwa-mcp-servera.twoje-subdomena.workers.dev](http://nazwa-mcp-servera.twoje-subdomena.workers.dev/)). Endpointem dla MCP będzie zazwyczaj /sse pod tym adresem (zależnie od konfiguracji w src/index.ts).

![Ilustracja z lekcji](https://assets-v2.circle.so/i8f24u81jvb4crh6eblv29wbcjpz)

Adres URL możemy znaleźć po wejściu w szczegóły workera i przejściu do zakładki “Settings”:

![Ilustracja z lekcji](https://assets-v2.circle.so/olu39z0yzcxycotxx0nrm5bk2trj)

**2\. Wdrożenie Serwera MCP z aplikacją (np. Astro) w monorepo (jak w ai-rules-builder)**

W naszym przypadku serwer MCP (mcp-server/) jest częścią większego projektu (monorepo) zawierającego również aplikację frontendową 10xRules.ai zbudowaną w Astro (src/). Proces wdrożenia jest bardziej złożony, ponieważ musimy wdrożyć obie części: aplikację na Cloudflare Pages i serwer MCP na Cloudflare Workers. 

Wykorzystujemy do tego worfklow GitHub Actions zdefiniowany w [.github/workflows/deploy-mcp-on-merge.yml](https://github.com/przeprogramowani/ai-rules-builder/blob/master/.github/workflows/deploy-mcp-on-merge.yml).

Niezależnie od tego, czy wdrażasz serwer MCP samodzielnie, czy jako część większej aplikacji w monorepo, kluczowe kroki deploymentu serwera są takie same. Wybór podejścia zależy od specyfiki Twojego projektu.

### Jak stworzyć własny serwer MCP z 10x workflow?

Musimy przejść przez klasyczny proces: planowanie, plan ogólny i implementacja.

Pierw wykorzystujemy [Prompt planistyczny dla serwerów MCP.](https://10xrules.ai/prompts?org=10xdevs&collection=m5-innovation&segment=l2-mcp&prompt=db727a4d-2413-456a-b44b-bebc270ef0d1)

Następnie [Prompt do podsumowania sesji planistycznej serwera MCP](https://10xrules.ai/prompts?org=10xdevs&collection=m5-innovation&segment=l2-mcp&prompt=880ffbdd-3269-424a-97d0-d8b3c48a33d2).

Potem [Prompt do planu implementacji serwera MCP](https://10xrules.ai/prompts?org=10xdevs&collection=m5-innovation&segment=l2-mcp&prompt=7aec23c6-2045-440a-bfbb-314130971df0).

I na końcu [Prompt do implementacji serwera MCP](https://10xrules.ai/prompts?org=10xdevs&collection=m5-innovation&segment=l2-mcp&prompt=f0fec032-92bc-4d35-87cb-abe708ac1f19).

W jednej konwersacji skupiaj się na implementacji 1-2 tooli, potem otwieraj nowe rozmowy i kontynuuj rozbudowę MCP. 

Pamiętaj, żeby działać w trybie MVP - zacznij od stworzenia i deploymentu prostego MCP, które będziesz stopniowo rozbudowywać o kolejne narzędzia.

### **Najlepsze praktyki przy tworzeniu serwerów MCP**

Z doświadczeń early-adopterów takich jak my wynika kilka wskazówek:

- **Odpowiednie opisy i schematy:** Należy zadbać o jasny description narzędzi oraz precyzyjny inputSchema (typy i wymagane pola). Model AI podejmuje decyzję o użyciu toola bazując [m.in](http://m.in/). na jego opisie, dlatego powinien on wyraźnie mówić co narzędzie robi. Trzeba też unikać zbyt ogólnych lub mylących nazw – np. nazwać narzędzie search\_docs zamiast search (gdyż model może mieć inne narzędzie search\_web i musi rozróżnić kontekst).
- **Bezpieczeństwo i zakres (scoping):** Projektując serwer, ograniczmy jego możliwości do niezbędnego minimum. Jeśli tworzymy narzędzie z dostępem do systemu operacyjnego, to rozważmy **whitelistę komend** zamiast pozwalać na dowolny input (by model nie wykonał rm -rf /). MCP pozwala hostowi na izolowanie serwerów, np. uruchomienie w oddzielnym procesie o ograniczonych uprawnieniach - warto z tego korzystać. Dane użytkownika (np. pliki) przekazujmy tylko jeśli użytkownik wyraźnie to zatwierdził. Pamiętajmy, że **opisy narzędzi od serwera nie są godne zaufanie z punktu widzenia hosta** – klient powinien je pokazać użytkownikowi, ale nie warto zakładać np. że narzędzie jest „bezpieczne”, dopóki nie dokona się samodzielnego audytu implementacji.
- **Zgoda użytkownika:** Implementując serwer, który wykonuje jakiekolwiek akcje (zapisu, wysyłania danych na zewnątrz), przyjmijmy że **każde wywołanie będzie wymagało potwierdzenia**. W praktyce aplikacja-klient MCP powinna wymusić potwierdzenie, ale serwer także może proaktywnie oczekiwać w protokole pewnych kroków (np. nie udostępniać pewnych tooli dopóki nie otrzyma odpowiedniego parametru autoryzacji). MCP obecnie nie posiada standardowego mechanizmu auth, więc najczęściej implementuje się to na poziomie konfiguracji – np. użytkownik musi podać token API w ustawieniach, inaczej serwer się nie połączy.
- **Wydajność i skalowalność:** Jeśli serwer ma obsługiwać długie strumienie danych lub wielu klientów, warto rozważyć implementację asynchroniczną i wykorzystanie mechanizmu **Streamable HTTP**. STDIO jest prosty, ale działa lokalnie – do zastosowań chmurowych lepiej nadaje się SSE (w specyfikacji MCP to obecnie główny transport HTTP). Dla intensywnych zastosowań (np. serwer Slack odbierający tysiące wiadomości) – należy zadbać o kolejkowanie i ewentualne skalowanie horyzontalne (można uruchomić wiele instancji serwera MCP za load balancerem SSE, choć to wciąż świeże rozwiązania).

Na koniec tej sekcji warto wspomnieć o _roots_ i _clients_ po stronie hosta. **Roots** pozwalają serwerowi uzyskać dostęp do plików **znajdujących się u klienta** – np. edytor może udostępnić katalog projektu jako root, dzięki czemu serwer Filesystem będzie mógł czytać pliki projektu na żądanie modelu. To potężne, ale ryzykowne – host musi zapewnić, że udostępnia tylko te ścieżki, na które użytkownik wyraził zgodę (np. wybierając folder). 

Można zaryzykować stwierdzenie, że **MCP obniża barierę budowy „pluginów do AI” do poziomu porównywalnego z pisaniem wtyczek np. do VS Code**. Ta dostępność spowodowała eksplozję kreatywności społeczności, co dalej napędza rozwój standardu.

## Ograniczenia i wyzwania protokołu MCP

Mimo licznych zalet, MCP mierzy się również z wyzwaniami – zarówno technicznymi, jak i związanymi z adopcją. Warto je zidentyfikować, aby zrozumieć bieżące ograniczenia protokołu i kierunki rozwoju (część z nich jest już adresowana w roadmapie).

**Nierównomierna adopcja niektórych funkcji:** Choć ogólne wsparcie dla MCP rośnie, w praktyce wiele implementacji klientów ogranicza się początkowo do obsługi narzędzi (tools), pomijając takie prymitywy jak **resources, prompts czy sampling**. 

![Ilustracja z lekcji](https://assets-v2.circle.so/j49lys8ebhjt8pjq2a68o0sap0si)

Powody są różne. **Resources** (zasoby) często budzą obawy o **prywatność i zużycie kontekstu** – udostępnienie całego dokumentu czy bazy wiedzy modelowi może łatwo wyczerpać okno kontekstu i generować koszty przez dużą ilość tokenów. Dlatego niektóre aplikacje na razie świadomie nie wspierają resource’ów. **Prompts** z kolei wymagają interfejsu pozwalającego użytkownikowi je wywołać (jak slash commands), co nie wszędzie było priorytetem. W efekcie np. Cursor 0.49 czy Copilot Agent Mode koncentrują się na toolach i ewentualnie roots, a pomijają prompts. **Sampling** to najbardziej zaawansowany mechanizm – daje ogromne możliwości, ale też budzi największe wątpliwości bezpieczeństwa. Wymaga ścisłej współpracy hosta (musi potwierdzać prompty) i dopracowania protokołu (by np. serwer nie miał wglądu w całą historię czatu, jedynie w potrzebne fragmenty). Obecnie stosunkowo niewiele serwerów używa sampling (głównie **Sequential Thinking** i parę eksperymentalnych), a i klientów go w pełni nie wspiera (w tabeli wsparcia nasi hostowioe ma przy Sampling ❌). To zrozumiałe – ta funkcja jest nowa i **wymaga zaufania między stronami**, co dopiero się buduje.

**Problemy z debugowaniem i złożonością integracji:** Protokół oparty na asynchronicznych komunikatach JSON-RPC bywa trudny do przeanalizowania bez odpowiednich narzędzi. Stąd inicjatywy jak [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector) czy oficjalne **przewodniki debugowania**. Wciąż jednak wyzwaniem pozostaje **testowanie integracji end-to-end** – np. czy dany serwer dobrze współdziała z danym modelem w typowych scenariuszach. Tego typu testy agentowe (symulacja dialogu AI z użyciem tooli) to w dużej mierze obszar badań i dopracowywania, zwłaszcza że modele stale się zmieniają.

**Bezpieczeństwo i zaufanie:** Z punktu widzenia wdrożeń u klientów korporacyjnych, kwestia bezpieczeństwa może być największą barierą. MCP z definicji umożliwia AI wykonywanie kodu i dostęp do danych. Specyfikacja kładzie na to nacisk, opisując zasady **Trust & Safety**. W praktyce jednak implementacja tych zasad spada na twórców hostów. Kluczowe wyzwania to:

- **Kontrola dostępu:** Host musi zagwarantować, że serwer MCP nie wyciągnie więcej danych niż powinien. Przykładowo, jeżeli udostępniamy root z katalogiem projektu, to serwer plików nie może wyjść poza ten katalog (np. odczytać /etc/passwd). Trzeba więc w serwerze plików zaimplementować sandbox ścieżek. Podobnie serwery integrujące się z API (np. e-mail) muszą pilnować zakresu – np. udostępnić tylko skrzynkę służbową, a nie prywatną.
- **Autoryzacja i uwierzytelnianie serwerów:** Obecna wersja MCP nie ma standardu wymiany tokenów czy kluczy między klientem a serwerem (to celowo – protokół pozostaje agnostyczny, a konkretne serwery mają swoje sposoby). Jednak w roadmapie wskazano potrzebę **MCP Registry i mechanizmów discovery** co zapewne wiąże się z reputacją i weryfikacją serwerów. Na razie użytkownik sam musi zdecydować, czy ufa danemu serwerowi (np. wczytanemu z internetu). Platformy takie jak VS Code rozwiązują to integrując serwery z systemem rozszerzeń – czyli serwer jest dostarczany przez extension z pewnym _publisher ID_, co buduje minimum zaufania. Niemniej, brak jednego centralnego mechanizmu autoryzacji jest wyzwaniem – nad którym trwają dyskusje (rozważane jest wprowadzenie np. handshake’a OAuth przy łączeniu z serwerem zdalnym, albo podpisywania manifestów serwerów).
- **Interakcja human in the loop:** Serwery korzystające z _tools_ mogą być wywoływane automatycznie przez model. Aby nie doprowadzić do niepożądanych akcji, aplikacje klienckie **wymuszają potwierdzenie** (poza drobnymi narzędziami typu obliczenia matematyczne). To jednak wprowadza tarcie w UX – użytkownik może być „zasypywany” prośbami o zgodę, jeśli model często używa narzędzi. Wyzwaniem jest zatem znalezienie równowagi: np. w Copilot Agent dodano opcję „always allow” dla danego toola podczas sesji. Z kolei w trybach jak Turbo Mode (Windsurf) czy YOLO (Cursor), developer może zdecydować się **świadomie** na danie modelowi więcej swobody (wtedy ryzyko i odpowiedzialność leżą po jego stronie). To otwarta kwestia designu interfejsu – jak informować i pytać użytkownika, by zachować bezpieczeństwo, ale nie zepsuć płynności pracy z AI.

**Scope narzędzi i unikanie nadużyć:** _Scopowanie_ narzędzi odnosi się do określania zakresu ich możliwości, wskazując **kiedy i jak model może z nich korzystać**. 

Przykład problemu: jeżeli model ma narzędzie delete\_file, może teoretycznie spróbować użyć go w nieodpowiednim momencie (np. przez niezrozumienie polecenia użytkownika). Dlatego host powinien móc np. **czasowo wyłączać pewne toolsy** albo udostępniać je tylko w określonych trybach. 

MCP nie ma jeszcze wbudowanego mechanizmu dynamicznej zmiany dostępności tooli podczas sesji (poza zamknięciem połączenia i otwarciem nowego z inną konfiguracją). Jest to wskazywane jako potencjalny kierunek rozwoju – żeby można było np. _„scope’ować”_ narzędzia do danego agenta lub zadania. 

W roadmapie pojawia się pojęcie **Agent Graphs** i namespace’ów, co sugeruje, że w przyszłości będzie możliwe tworzenie bardziej złożonych topologii agentów, gdzie nie każdy agent widzi wszystkie toolsy, tylko te w jego zakresie.

**Skalowalność i wydajność:** W kontekście dużych zastosowań (np. enterprise), rodzi się pytanie jak MCP **działa pod dużym obciążeniem**. JSON-RPC po TCP/SSE nie jest tak wydajny jak surowe gRPC czy inny binarny protokół – bo priorytetem jest czytelność i kompatybilność. Dla większości zastosowań to wystarcza (narzędzia nie są wołane aż tak często jak np. zapytania do bazy w klasycznym systemie). Jednak gdyby chcieć z MCP korzystać intensywnie (np. agent wykonujący **setki wywołań tooli na minutę**, co może się zdarzyć przy automatyzacji testów czy masowym przetwarzaniu dokumentów), pojawią się wąskie gardła. Obecnie brak doniesień o poważnych problemach, ale to częściowo dlatego, że agent zawsze ograniczony jest też _szybkością modelu_ – modele nie myślą błyskawicznie, więc i tak nie zasypią serwera tysiącem requestów na sekundę. Mimo to, **optymalizacja** będzie tematem, szczególnie w kwestii **streamingu danych** (np. odbieranie dużych plików jako resource – tu planowane jest wprowadzenie **streamingu chunków**).

Wspomniane wyżej **ograniczenia** nie przekreślają bynajmniej sukcesu MCP – raczej wskazują obszary wymagające pracy i ostrożności. Wiele z nich jest jawnie rozpoznanych przez twórców protokołu i społeczność, co widać w roadmapie:

- Planowane jest stworzenie **oficjalnego rejestru serwerów (MCP Registry)**, który ułatwi ich odkrywanie, ale też pozwoli dodać warstwę reputacji/bezpieczeństwa (np. oznaczenia zweryfikowanych dostawców). W październku 2025 jest on [w trakcie budowy](https://github.com/modelcontextprotocol/registry). W między czasie możemy korzystać z [rejestru Githuba](https://github.com/mcp).
- Rozważane są udoskonalenia dla agentów (np. wspomniane **Agent Graphs**) i interakcji z użytkownikiem, co pomoże w kwestii _scopingu_ i zarządzania złożonymi scenariuszami.
- Kładzie się nacisk na **multimodalność i streaming**, by protokół wspierał płynnie obrazy, wideo, dźwięk i inne typy danych (już dziś są pierwsze implementacje dla obrazów, jak w Cursor, ale oficjalne wsparcie np. dla video to trudniejsze zadanie).
- No i oczywiście **walidacja i testy** – standaryzacja przyniesie zestawy testów zgodności, co zredukuje problemy integracyjne.

Każda technologia we wczesnej fazie ma swoje ograniczenia – kluczowe jest, że społeczność MCP wykazuje się **świadomością i transparentnością** tych wyzwań. Dzięki temu użytkownicy wdrażają protokół rozważnie (np. zawsze z mechanizmami zgody), a rozwój idzie w kierunku ich adresowania.

## Rekomendacje, case studies i dobre praktyki

Na koniec sformułujmy kilka rekomendacji odnośnie wykorzystania MCP w projektach (zwłaszcza webowych) oraz przyjrzyjmy się krótkim case study obrazującym, jak MCP może usprawnić realne workflow. Dołączymy też **checklistę dobrych praktyk**, w tym aspekty bezpieczeństwa i weryfikacji kodu.

**Workflowy i narzędzia czerpiące największe korzyści z MCP:** Ogólnie, najwięcej zyskują te przypadki, gdzie **AI potrzebuje aktualnych, specyficznych danych lub możliwości działania**. Dlatego MCP świetnie pasuje do:

- **IDE i edytorów kodu** – bo tam AI asystent musi znać kontekst projektu, historię błędów, wyniki testów, itp. MCP zapewnia to wszystko (stąd jego adopcja w Cursor/Windsurf/Copilot).
- **Chatbotów biznesowych** – wszędzie tam, gdzie pytania klientów łączą się z danymi firmy (baza zamówień, stany kont, regulaminy) MCP pozwala sięgnąć do tych danych bez ryzyka halucynacji i bez konieczności budowania monolitycznego bota.
- **Agentów wykonujących czynności** – np. automatyzacja marketingu (AI generuje raporty i od razu publikuje je przez API), asystenci osobisti (rezerwacje, emaile – tu OpenAI Plugins już pokazały zapotrzebowanie). MCP unifikuje to, więc zamiast pisać integrację pod konkretny model, można napisać serwer MCP email i używać go z różnymi agentami.
- **Systemów edukacyjnych i analitycznych** – gdzie model może dynamicznie generować treści i testować je. Np. środowisko do nauki może dać modelowi narzędzia do kompilowania kodu, wykreślania wykresów (narzędzie plot), szukania dodatkowych materiałów – to wszystko zwiększa interaktywność i efektywność nauki użytkownika.

**Checklista bezpiecznego korzystania i budowania serwerów MCP:**

- **Zgoda użytkownika i kontrola:** Zawsze uzyskuj wyraźną zgodę użytkownika na dostęp do danych i wykonywanie akcji. Zaprojektuj interfejs tak, by użytkownik rozumiał, co AI chce zrobić (np. wyświetl opis narzędzia przed uruchomieniem). Umożliw opcję zatwierdzania per-akcję lub zaufania narzędziu na sesję, w zależności od kontekstu.
- **Minimalny zakres uprawnień:** Kieruj się zasadą _least privilege_. Udostępniaj tylko te zasoby i funkcje, które są niezbędne. Ograniczaj katalogi root do wymaganych ścieżek, stosuj whitelisty komend dla niebezpiecznych tooli. Im mniejszy zakres działania serwera, tym mniejsze ryzyko nadużyć.
- **Bezpieczne zarządzanie sekretami:** Jeśli serwer wymaga API key lub hasła (np. do bazy danych), nie przekazuj ich wprost w promptach. Użyj mechanizmów konfiguracyjnych hosta – np. bezpiecznego magazynu VS Code – aby serwer mógł pobrać token z environment, a nie z rozmowy. To zapobiega wyciekowi sekretów w razie błędu modelu.
- **Weryfikacja kodu serwera:** Korzystając z serwerów społeczności, przeglądaj ich kod źródłowy lub opinie innych. Uruchamiaj je w izolowanym środowisku (np. kontenerze). Upewnij się, że nie wysyłają danych do nieautoryzowanych miejsc i respektują protokół Trust & Safety (np. opis narzędzi nie zawiera _prompt injection_).
- **Intensywne testowanie i monitoring:** Przed wdrożeniem integracji, przetestuj ją z różnymi scenariuszami. Użyj **MCP Inspector** do symulacji odpowiedzi serwera i upewnienia się, że model reaguje prawidłowo. Monitoruj logi – zarówno po stronie serwera (czy nie zgłasza błędów), jak i hosta (czy model nie otrzymuje serii błędów JSON-RPC). W razie wykrycia częstych błędów narzędzi, rozważ ulepszenie opisów lub ograniczenie ich użycia.
- **Aktualizacja i zgodność ze specyfikacją:** Śledź zmiany w oficjalnej specyfikacji MCP (np. poprzez changelog na stronie projektu). Aktualizuj SDK w swoim kliencie/serwerze do najnowszych wersji, by mieć poprawki i nowe funkcje. Wykorzystuj testy zgodności (compliance tests), jeśli są dostępne, aby zweryfikować, że Twoja implementacja spełnia wymagania protokołu w najnowszej wersji.
- **Projektowanie doświadczenia użytkownika:** Pamiętaj, że celem jest usprawnienie pracy, a nie jej komplikacja. W interfejsie wyróżnij, kiedy AI użyło narzędzia (np. komunikat „**Called MCP tool**”) – jak robi to Cursor. Daj możliwość łatwego włączenia/wyłączenia integracji MCP w razie problemów. Zbieraj od użytkowników feedback, które narzędzia są dla nich najbardziej przydatne, a które sprawiają kłopoty.

## 🏁 Podsumowanie

W tej lekcji poznaliśmy Model Context Protocol - obecnie standard integracji modeli językowych z zewnętrznymi źródłami danych i narzędziami:

- **Geneza i cel MCP** \- protokół stworzony przez Anthropic w 2024 roku jako odpowiedź na problem integracji LLM z zewnętrznymi źródłami danych, porównywany do "USB-C dla świata AI", eliminujący problem budowania dedykowanych integracji dla każdej kombinacji modelu i źródła danych (problem M×N)
- **Architektura klient-serwer** \- komunikacja mediowana przez hosta (aplikację AI), gdzie klient jest komponentem osadzonym w hoście, a serwer udostępnia narzędzia, zasoby i szablony, zapewniając izolację i bezpieczeństwo
- **Prymitywy protokołu** \- MCP wprowadza trzy główne komponenty: tools (narzędzia wywoływalne przez model), resources (dane kontekstowe do odczytu) oraz prompts (predefiniowane wzorce interakcji), co odzwierciedla specyfikę pracy modeli AI
- **Szybka adopcja i wsparcie** \- protokół zyskał wsparcie największych graczy (Anthropic, OpenAI, Google) oraz popularnych edytorów kodu (Cursor, Windsurf, GitHub Copilot, JetBrains), co stworzyło efekt sieci i przyspieszyło rozwój ekosystemu
- **Implementacja i ekosystem** \- dostępne są referencyjne serwery (Filesystem, Git, Sequential Thinking) oraz narzędzia do tworzenia własnych serwerów w Python i TypeScript, z tysiącami integracji tworzonych przez społeczność
- **Wyzwania i dobre praktyki** \- kluczowe aspekty to bezpieczeństwo, zgoda użytkownika, minimalny zakres uprawnień i weryfikacja kodu serwerów, co zapewnia odpowiedzialne wykorzystanie protokołu

MCP stanowi obecnie jeden z najważniejszych kroków w kierunku uzbrojenia LLM-ów w praktyczną wiedzę i zdolność działania, potencjalnie stając się dla ekosystemu AI tym, czym kiedyś stały się standardy webowe dla internetu.

### 👨‍💻 Ćwiczenia praktyczne

> 👉 Jeśli pracujesz nad projektem zaliczeniowym, potraktuj poniższe ćwiczenie jako opcjonalne - podejdź do niego w momencie, kiedy znajdziesz więcej czasu.

**Zadanie 1:** Stworzenie własnego serwera MCP 

**Cel:** Zrozumienie architektury MCP poprzez implementację prostego serwera udostępniającego narzędzia.

**Instrukcje:**

1. Wybierz SDK dopasowane do Twojego tech stacku
2. Wykorzystaj prompty przedstawione w lekcji (sesja planistyczna, plan MCP, implementacja)
3. Wykonaj deployment przez Cloudflare

Wszystkie powyższe zadania pomogą w praktycznym zrozumieniu MCP i jego zastosowań w rzeczywistych projektach. Pamiętaj, że MCP jest stosunkowo nowym standardem, więc eksperymentowanie z różnymi konfiguracjami i przypadkami użycia jest kluczem do efektywnego wykorzystania jego potencjału.

![Ilustracja z lekcji](https://assets-v2.circle.so/ekrtcr8j44qd531ut1i2iwox5c9h)