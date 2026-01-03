<!DOCTYPE html>![](https://assets-v2.circle.so/vzcyvmpj4d4wh4o5pnoh4417nes6)

## Wprowadzenie

W trzecim module skupimy się na pięciu nowych aspektach pracy 10xDeva z aplikacją webową, które podniosą jej jakość, ułatwią współpracę na poziomie zespołu i pozwolą ją udostępnić pod publicznym adresem URL. 

Będą to:

* obsługa systemu kont i logowania
* wdrożenie testów
* refaktoryzacja logiki biznesowej
* zaprojektowanie scenariusza ciągłej integracji i wdrażania (CI/CD)
* publikacja aplikacji na środowisko produkcyjne

Pierwszy element z tej listy pozwoli nam zarządzać danymi w bardziej bezpieczny sposób - chcemy uniknąć sytuacji, w której każdy użytkownik może wykonać dowolną akcję w bazie.

## 🔐 Bezpieczna praca z danymi wrażliwymi

W trzecim module wprowadzimy co najmniej dwa nowe środowiska (e2e i produkcyjne) oraz bazy chmurowe - korzystanie z tych elementów wymaga posługiwania się kluczami dostępowymi, co wśród świadomych użytkowników AI powinno budzić pewne obawy (co jeśli model “połknie” klucz i pojawi się on u drugiego uczestnika 10xDevs?). Przejdźmy przez kilka poziomów świadomego korzystania z AI.

**Poziom pierwszy** \- proces treningu i aktualizowania danych treningowych modelu nie jest tak prosty, jak wielu uważa. Modele **nie są globalną bazą danych** z jedną instancją, gdzie każdy wrzuca i odczytuje co tylko chce. Po stronie firm tworzących modele [problem danych wrażliwych jest dobrze znany](https://openai.com/index/our-approach-to-ai-safety/) i część z nich jest filtrowana na etapie przygotowywania danych dla kolejnej wersji modelu - a jeśli nie, to dostajesz [dodatkowe narzędzia](https://docs.anthropic.com/en/prompt-library/pii-purifier) aby o to zadbać. Dla twórców modeli bardziej istotne będą dane behawioralne - np. to, jak użytkownik reaguje na zachowania modelu, jak długie prowadzi konwersacje albo kiedy decyduje się je kończyć - niż jakie ma klucze do Windowsa albo do API na AWS.

![](https://assets-v2.circle.so/tuafjhrz0apohrqabgdqlmkjj31o)

[(GPT-4 Model Card)](https://arxiv.org/pdf/2410.21276v1)

Staramy się w to wierzyć, ale nie zatrzymujemy się na tym poziomie.

**Poziom drugi** \- koniecznie włącz dodatkowe opcje prywatności. W każdej komercyjnej usłudze wykorzystującej AI prawdopodobnie znajdziesz “toggla” pozwalającego ci wyłączyć udostępnianie danych. Traktujmy to jako must-have bezpiecznego korzystania z funkcji AI.

W Cursorze ta opcja znajduje się w ustawieniach, w sekcji General:

![](https://assets-v2.circle.so/bkqyniggphwlhs8qv4ngqj3zvx6u)

W Copilocie będą to [ustawienia na profilu](https://github.com/settings/copilot) GitHub:

![](https://assets-v2.circle.so/lj27oaihcovj15p0y3d1d27rqqfq)

W JetBrains AI Assistant będą to ustawienia w sekcji Tools:

![](https://assets-v2.circle.so/cgts51752a5lf9nxlq0xfq2r3ijm)

W ChatGPT - Ustawienia i kontrolki danych:

![](https://assets-v2.circle.so/h8lyta4cclqe7y771ukz9tr53gjr)

**Poziom trzeci -** Dodając do projektu pliki, wobec których chcesz zadbać o dodatkową prywatność, warto korzystać z konwencji wspieranych przez edytory. W wybranych usługach już sam .gitignore wyklucza wybrane pliki z indeksowania pod AI, a dodatkowo możesz stosować dedykowane pliki wykluczeń, opisywane:

* dla Copilota - [pod tym linkiem](https://docs.github.com/en/copilot/managing-copilot/configuring-and-auditing-content-exclusion/excluding-content-from-github-copilot#configuring-content-exclusions-for-your-repository)
* dla Cursora - [pod tym linkiem](https://docs.cursor.com/context/ignore-files)
* dla Claude Code - [pod tym linkiem](https://docs.claude.com/en/docs/claude-code/settings#excluding-sensitive-files)
* dla Windsurfa - [pod tym linkiem](https://docs.windsurf.com/context-awareness/local-indexing#windsurfignore)

**Poziom czwarty** \- nie przechowuj danych wrażliwych w kodzie aplikacji ani systemie kontroli wersji (Git - .gitignore), a danych do produkcji **w ogóle nie przechowuj** w obrębie aplikacji i edytora. W kolejnych lekcjach zobaczysz, jak w bezpieczny sposób przekazywać je z wykorzystaniem sekretów na Cloudflare, Github Actions oraz w Dockerze. Alternatywa to serwer sekretów i usługi pokroju Vaulta, co ma swoje trade-offy innego rodzaju - krótko omówimy to w ostatniej lekcji modułu trzeciego.

**Poziom piąty** \- zadbaj o anonimizację i prowadź rozmowy z AI na pewnym poziomie poufności. Nawet pomimo włączonych opcji prywatności część danych może być utrzymywana na serwerach firm zewnętrznych w postaci logów i danych do analityki całej integracji. Nawet jeśli dane nie trafią bezpośrednio do modelu, to wciąż mogą podróżować po sieci. W tym celu unikaj konkretnych wartości takich jak numery kart, PIN, PESELe, wyniki finansowe twojej firmy, etc. W większości przypadków nie są to też dane, których AI potrzebuje, ale i tak zawsze zwracamy na to uwagę.

---

Stosowanie powyższych zaleceń zwiększy twoje bezpieczeństwo i prywatność konwersacji z AI. 

Równie ważne jest to, aby stosowanie określonych narzędzi opierać na dokładnej analizie polityk prywatności i świadomej ocenie stosunku korzyści do zagrożeń.

Dyskusje o ryzyku AI często sprowadzają się do obaw o &quot;wyciek kodu na serwery zewnętrzne&quot;, co przy głębszej analizie wydaje się przesadą. Warto zauważyć, że masowa adopcja AI nie była przełomowym momentem w przechowywaniu danych na zewnętrznych serwerach - od lat akceptujemy to korzystając z usług jak Google Drive, GitHub, Slack, Jira czy Linear, gdzie udostępniamy znacznie więcej informacji o naszych projektach niż w rozmowach z AI.

Wiodący dostawcy usług AI (AWS Bedrock, Google Vertex AI, Azure AI Services) traktują kwestie prywatności bardziej poważnie niż sami twórcy modeli. Powód? Wymogi audytów korporacyjnych i konieczność spełniania rygorystycznych standardów. W środowisku biznesowym żaden dostawca AI nie może ignorować prywatności klientów, gdyż oznaczałoby to utratę swojej części rynku enterprise.

Oceniając narzędzia AI, należy racjonalnie rozważyć faktyczne praktyki bezpieczeństwa konkretnych dostawców oraz realną wartość, jaką ich rozwiązania wnoszą do naszego projektu, zamiast kierować się ogólnymi obawami.

Szczegóły polityk prywatności dla popularnych usług znajdziesz poniżej:

* &lt;https://github.com/features/copilot/#faq&gt;
* &lt;https://www.cursor.com/privacy&gt;
* &lt;https://www.anthropic.com/news/updates-to-our-consumer-terms&gt;
* &lt;https://windsurf.com/security&gt;
* &lt;https://www.jetbrains.com/help/ai/data-collection-and-use-policy.html&gt;
* &lt;https://aider.chat/docs/legal/privacy.html&gt;

## Kontynuacja projektu i aktualizacja wymagań

W kolejnych lekcjach zachęcamy do kontynuacji pracy nad własnym projektem. Podobnie jak ty, my również będziemy rozwijać nasz własny projekt, 10xRules, którego MVP znajduje się na produkcji, ale teraz czas na pracę nad wersją “2.0”.

Rozpocznijmy od krótkiego filmu, gdzie przedstawimy obecny stan naszego projektu oraz brakujące elementy dotyczące uwierzytelniania, na których skupimy się w dalszej części lekcji.

[FRAGMENT VIDEO](https://player.vimeo.com/video/1070772921?app_id=122963&amp;byline=0&amp;badge=0&amp;portrait=0&amp;title=0)

W 10xRules moim celem będzie zaktualizowanie dostęp do komponentu “kolekcji reguł” w taki sposób, żeby wymagał on aktywnej sesji użytkownika. Nie chciałbym jednak, aby reszta aplikacji wymagała logowania.

Aby wyjaśnić oczekiwania, które następnie przekażę do Agenta AI, dodaję nowe wpisy do **project-prd.md**. Zaznaczam przy tym odpowiednie relacje między historyjkami (w nawiasach poniżej):

```
// project-prd.md

## US-003: Kolekcje reguł

- Tytuł: Kolekcje reguł
- Opis: Jako użytkownik chcę móc zapisywać i edytować zestawy reguł, aby szybko wykorzystywać sprawdzone rozwiązania w różnych projektach.
- Kryteria akceptacji:
  - Użytkownik może zapisać aktualny zestaw reguł (US-001) jako kolekcję (nazwa, opis, reguły).
  - Użytkownik może aktualizować kolekcję.
  - Użytkownik może usunąć kolekcję.
  - Użytkownik może przywrócić kolekcję do poprzedniej wersji (pending changes).
  - Funkcjonalność kolekcji nie jest dostępna bez logowania się do systemu (US-004).

## US-004: Bezpieczny dostęp i uwierzytelnianie

- Tytuł: Bezpieczny dostęp
- Opis: Jako użytkownik chcę mieć możliwość rejestracji i logowania się do systemu w sposób zapewniający bezpieczeństwo moich danych.
- Kryteria akceptacji:
  - Logowanie i rejestracja odbywają się na dedykowanych stronach.
  - Logowanie wymaga podania adresu email i hasła.
  - Rejestracja wymaga podania adresu email, hasła i potwierdzenia hasła.
  - Użytkownik MOŻE korzystać z tworzenia reguł &quot;ad-hoc&quot; bez logowania się do systemu (US-001).
  - Użytkownik NIE MOŻE korzystać z funkcji Kolekcji bez logowania się do systemu (US-003).
  - Użytkownik może logować się do systemu poprzez przycisk w prawym górnym rogu.
  - Użytkownik może się wylogować z systemu poprzez przycisk w prawym górnym rogu w głównym @Layout.astro.
  - Nie korzystamy z zewnętrznych serwisów logowania (np. Google, GitHub).
  - Odzyskiwanie hasła powinno być możliwe.
```

**👉 Tip: Zanim przejdziesz dalej, zaktualizuj lub rozbuduj User Stories biorąc pod uwagę nową funkcjonalność (np. czy wejście na daną stronę jest możliwe bez logowania?).**

**👉 Friendly tip**: W twoim projekcie User Stories powinny dotyczyć projektu, który realizowałeś w module pierwszym, a nie reguł z 10xRules.

Jeśli wprowadziłeś zmiany, albo PRD zawiera już szczegóły rejestracji i logowania, przejdź do kolejnej sekcji, gdzie zintegrujemy aplikację z modułem uwierzytelniania.

## Uwierzytelnianie od zera czy Supabase Auth?

Implementacja bezpiecznego systemu logowania i rejestracji od podstaw to złożone zadanie wymagające specjalistycznej wiedzy z zakresu bezpieczeństwa. Wiąże się to z wieloma wyzwaniami:

* Prawidłowe hashowanie i przechowywanie haseł
* Obsługa sesji i [tokenów JWT](https://supabase.com/docs/guides/auth/jwts)
* Obsługa uwierzytelniania wieloetapowego
* Zabezpieczenie przed popularnymi atakami
* Implementacja mechanizmów odzyskiwania dostępu
* Integracja z zewnętrznymi dostawcami tożsamości

Czasami zdarza się, że tam, gdzie liczy się pełna transparentność i dostęp do każdej linijki kodu, tego typu moduły rozwijane są “in-house”. W naszym przypadku, w projekcie na zdecydowanie wcześniejszym etapie rozwoju, możemy się zdecydować na rozwiązanie “off-the-shelf”.

[Supabase Auth](https://supabase.com/docs/guides/auth) to jeden z modułów usługi Supabase, który pozwoli nam w szybki sposób dostarczyć niezbędne wymagania w zakresie uwierzytelniania. Dzięki niemu uzyskujemy gotowe tabele w bazie wspierające zaawansowane scenariusze potwierdzania tożsamości oraz integrację z wieloma dostawcami profili użytkownika, w tym Github czy Google.

Przykładowe tabele, które otrzymujesz “out-of-the-box” w schemacie “auth” widać poniżej:

![](https://assets-v2.circle.so/wbitpy2y0ypxsultl4teihyobmdt)

Znajdziesz je pod linkiem poniżej (zastąp PROJECT\_ID odpowiednią wartością):

&lt;https://supabase.com/dashboard/project/PROJECT%5FID/database/schemas?schema=auth&gt;

### Czym wyróżnia się Supabase Auth?

Supabase Auth wyróżnia się kilkoma kluczowymi cechami:

* Integracja z istniejącą bazą danych PostgreSQL
* Gotowe SDK dla popularnych frameworków frontendowych
* Wsparcie dla wielu metod uwierzytelniania (email/hasło, OAuth, magic link)
* [Row Level Security (RLS)](https://supabase.com/docs/guides/database/postgres/row-level-security) \- powiązanie tożsamości użytkownika z uprawnieniami do danych
* Wbudowane zarządzanie sesjami i tokenami JWT
* Możliwość personalizacji szablonów email

W naszym projekcie będzie to idealny sposób na szybkie wdrożenie rejestracji i logowania.

Pierwsza wersja tej funkcjonalności będzie wykorzystywać standardowe połączenie login + hasło.

Opis SDK pod JavaScript, Swift, Kotlin i Pythona znajdziesz [pod tym linkiem](https://supabase.com/docs/guides/auth/passwords).

![](https://assets-v2.circle.so/epafr7g11g15vwper4a2rl7zilzs)

## Przygotowanie do implementacji

Po wstępnym zapoznaniu się z Supabase Auth wykorzystajmy AI do zdefiniowania architektury całej funkcjonalności.

Do tego celu możesz wykorzystać najlepsze modele do programowania (np. Claude Sonnet 4.5), a także modele reasoningowe (np. Gemini 2.5 Pro czy GPT-5 Medium/High Reasoning).

Poza opracowaniem planu w formie tekstu, w kolejnym przykładzie skupimy się też na dodatkowej dokumentacji w formie [schematów Mermaid](https://mermaid.js.org/):

[FRAGMENT VIDEO](https://player.vimeo.com/video/1070772862?app_id=122963&amp;byline=0&amp;badge=0&amp;portrait=0&amp;title=0)

Prompt, który wykorzystałem do zbudowania specyfikacji znajduje się poniżej:

👉 Prompt do generowania specyfikacji przeznaczony dla modeli reasoningowych znajdziesz w 10xRules.ai Prompt Library - [**Specyfikacja Architektury Autentykacji**](https://10xrules.ai/prompts?org=10xdevs&amp;collection=m3-prod&amp;segment=l1-auth&amp;prompt=dab016a1-30c3-4312-a764-56e59f847354).

Na filmie wspominam, że przygotowany plan może wymagać korekt. Ja zdecydowałem się na ręczne uwagi do AI, natomiast ty możesz wykorzystać kolejny prompt do wykonania “cross-checku” wymagań i planu architektury.

👉 Prompt do cross-checku wymagań i planu architektury - [**Walidacja Specyfikacji Autentykacji**](https://10xrules.ai/prompts?org=10xdevs&amp;collection=m3-prod&amp;segment=l1-auth&amp;prompt=8e8dac09-a2c3-4801-8f20-243cdcadd2fb)

W zależności od efektów, możesz zastosować lub odrzucić uwagi uzyskane z modelu AI.

### Diagramy Mermaid

Mermaid to język do tworzenia diagramów oparty na składni podobnej do Markdown. Jego siłą jest możliwość reprezentowania złożonych struktur za pomocą prostego tekstu, co czyni go idealnym narzędziem do współpracy z modelami językowymi. Mocno korzysta z nich plugin Cline, który swoją funkcjonalność [“Memory Bank”](https://docs.cline.bot/prompting/cline-memory-bank) opiera właśnie o format Mermaid.

Kiedy współpracujesz z modelami AI przy projektowaniu architektury aplikacji, Mermaid oferuje kilka kluczowych korzyści:

1. **Tekstowa reprezentacja** \- modele AI coraz lepiej radzą sobie z generowaniem kodu Mermaid na podstawie Twoich wymagań i zawartości projektu, co pozwala na szybkie tworzenie diagramów bez konieczności używania narzędzi graficznych
2. **Precyzyjna komunikacja** \- zamiast długich opisów struktury aplikacji, możesz poprosić model o diagram, który przedstawi relacje między komponentami
3. **Łatwa iteracja** \- gdy zmienia się koncepcja architektury, wystarczy poprosić model o modyfikację diagramu, a nie tworzyć go od nowa
4. **Różnorodność diagramów** \- od przepływów (flowcharts), przez diagramy sekwencji, po diagramy klas czy stanów - wszystko w jednolitym formacie

Dobrą praktyką jest iteracyjne doprecyzowanie architektury poprzez dialog z modelem, prosząc o rozbudowanie lub modyfikację diagramu w odpowiedzi na zmieniające się wymagania.

![](https://assets-v2.circle.so/pmouakfc0emvm0425uy2ymkd0vzg)

W projekcie możesz wykorzystać udostępnione przez nas reguły aby wykonać kilka eksperymentów z tym formatem dokumentowania projektu.

👉 Prompt do [**Diagram Przepływu Autentykacji**](https://10xrules.ai/prompts?org=10xdevs&amp;collection=m3-prod&amp;segment=l1-auth&amp;prompt=95da7239-3fed-4511-907d-cf5b3c026105)**.**

Poniżej znajdują się pliki reguł, które możesz wykorzystać do zbudowania diagramów - **pamiętaj o dostosowaniu zawartości do twojej funkcjonalności:**

[mermaid-diagram-auth.mdc](https://assets-v2.circle.so/gh7np20s9o0p64kp2cjlib12p6k8)[mermaid-diagram-journey.mdc](https://assets-v2.circle.so/jg8h8bok8nllvworwo023n1gtnqw)[mermaid-diagram-ui.mdc](https://assets-v2.circle.so/m2sifwlreuagzrtvwp0kxqxciy8q)

## Implementacja procesu logowania

Po zdefiniowaniu wymagań i wstępnej wersji architektury, przejdziemy teraz przez wszystkie warstwy aplikacji implementując funkcjonalność logowania.

Do poprawnej implementacji całego zadania w Astro możesz wykorzystać kolejny plik z regułami, do którego odwołamy się współpracując z AI - w trakcie integracji skoryguj zawartość tak, aby dopasować instrukcje do twojego projektu (np. nazewnictwo zmiennych środowiskowych, w tym kluczy):

[supabase-auth.mdc](https://assets-v2.circle.so/c6bw1n66cammeiyhawz13v6ds054)

Dla zwiększenia szans na udaną implementację, kontynuujemy podejście krokowe - pierwsze dwa etapy za nami, a pozostałe cztery będziemy implementować stopniowo:

1\. Analiza wymagań ✅  
2\. Planowanie architektury ✅  
3\. Nowe elementy UI 🔄  
4\. Endpointy API 🔄  
5\. Integracja z Supabase Auth 🔄  
6\. Testy i bugfixing 🔄

Jest to podejście różne od popularnego “one-shot”, gdzie na skutek jednego prompta akceptujemy improwizację modelu i działanie bez określonych wytycznych, ale w przypadku bardziej złożonej funkcjonalności zdecydowanie procentuje:

* Model wymaga mniejszej ilości informacji, a kontekst nie wykracza poza Context Window
* Tworzymy częste “checkpointy” które łatwo odwrócić
* Podsumowanie zmian możemy stopniowo commitować i dokumentować
* W przypadku błędów trudniej o “rollback” dobrze działającej funkcjonalności

Cały proces zobaczysz na poniższym filmie:

[FRAGMENT VIDEO](https://player.vimeo.com/video/1070772724?app_id=122963&amp;byline=0&amp;badge=0&amp;portrait=0&amp;title=0)

Jak widać na poniższym filmie, nie obyło się bez chwilowych problemów, ale iterowanie i wskazywanie problemów w konwersacji pomogło wyprowadzić całe rozwiązanie na prostą.

Jeśli chcesz rozpocząć w taki sam sposób jak na filmie, wykorzystaj prompt [Implementacja UI Autentykacji](https://10xrules.ai/prompts?org=10xdevs&amp;collection=m3-prod&amp;segment=l1-auth&amp;prompt=f26a2606-2eaa-4400-93d7-e1ff6d92d171).

✅ Działa? Dodaj nowy commit - jesteś krok bliżej do ukończenia tego etapu!

Co dalej? Czas na backend - możesz wykorzystać lub dostosować poniższy prompt (na końcu rozszerzamy współpracę AI o pytania dodatkowe aby zaadresować ewentualne luki w planowaniu):

👉 Prompt [**Planowanie Integracji Backendu Logowania**](https://10xrules.ai/prompts?org=10xdevs&amp;collection=m3-prod&amp;segment=l1-auth&amp;prompt=1b538016-8e16-44a2-8ab1-c8b9a8ea75a2)**.**

W moim przypadku pytania dotyczyły zmiennych środowiskowych, obsługi UX oraz samego klienta Supabase:

```
1. Zmienne środowiskowe są już ustawione
2. Prezentuj błędy inline na formularzu
3. Po zalogowaniu wykonaj przeładowanie strony server-side
4. Zabezpiecz stronę @generate.astro
5. @supabase.client.ts - rozbuduj klienta zgodnie z @supabase-auth.mdc 
```

Dodatkowo, zaraz po implementacji logowania wskazałem na rozbudowę layoutu:

👉 Prompt [Implementacja Funkcjonalności Wylogowania](https://10xrules.ai/prompts?org=10xdevs&amp;collection=m3-prod&amp;segment=l1-auth&amp;prompt=cb281a1b-295f-4f3b-8aea-3510669b3191).

W 10xCards uzyskałem następujące efekty:

![](https://assets-v2.circle.so/bj7ssox6fi106inc4fzfe9lwwcl6)![](https://assets-v2.circle.so/jzr8yr0u94hufhb18fk0ipvktqwi)

Pamiętaj, że na każdym etapie konwersacji możesz wykorzystywać dodatkowy kontekst, co podniesie jakość konwersacji z AI. W przypadku implementacji logowania będą to:

* wymagania PRD
* stack technologiczny
* plan architektury
* reguły dla AI
* komunikaty w UI
* logi w terminalu
* błędy w konsoli

## Troubleshooting

Przechodząc ten scenariusz w 10xCards miałem okazję przekonać się jak ważne są poprawne i precyzyjne wymagania - w pośpiechu nie rozbudowałem PRD o zależności logowania względem strony głównej, no więc strona główna nie wymagała logowania - model zadziałał zgodnie z tym, co znalazł w dokumentacji 😅

Na szczęście model nie obraził się i nadal chciał współpracować:

Prompt [Implementacja Ochrony](https://10xrules.ai/prompts?org=10xdevs&amp;collection=m3-prod&amp;segment=l1-auth&amp;prompt=ea627ec0-2f1c-444f-b2e2-66c14d1a7196) [Routingu](https://10xrules.ai/prompts?org=10xdevs&amp;collection=m3-prod&amp;segment=l1-auth&amp;prompt=ea627ec0-2f1c-444f-b2e2-66c14d1a7196).

W trakcie implementacji warto też obserwować logi - jeśli w twoim projekcie Astro wprowadzisz middleware weryfikujący nagłówki (w runtime) to upewnij się, że strona związana z autentykacją nie jest generowana statycznie:

```
19:54:39 [WARN] `Astro.request.headers` was used when rendering the route `src/pages/index.astro&#39;`. `Astro.request.headers` is not available on prerendered pages. If you need access to request headers, make sure that the page is server-rendered using `export const prerender = false;` or by setting `output` to `&quot;server&quot;` in your Astro config to make all your pages server-rendered by default
```

Zgodnie z komunikatem, można to [obsłużyć na dwa sposoby](https://docs.astro.build/en/guides/on-demand-rendering/):

* w pełni przejść na renderowanie server-side (w astro.config.mjs - _output: &quot;server&quot;)_
* dodawać _export const prerender = false;_ na stronach Astro

## Wdrożenie rejestracji

Udana implementacja procesu logowania oraz jakościowe “Rules for AI” to dwie składowe skutecznego wdrożenia rejestracji użytkowników.

W 10xRules całość zaimplementowałem bazując na dokumentacji (supabase-auth.mdc) oraz wzorcach istniejącego formularza oraz strony do logowania - całość nie wymagała ode mnie żadnych korekt!

(Jeśli korzystasz z bazy lokalnej - pomiń fragment o linku do potwierdzenia konta - to zachowanie domyślnie włączone dla projektów chmurowych)

👉 Prompt [Implementacja Backendu Rejestracji](https://10xrules.ai/prompts?org=10xdevs&amp;collection=m3-prod&amp;segment=l1-auth&amp;prompt=bbcf6060-3ab7-4010-8904-5c666de7845a).

Witać tutaj potencjał tzw. “vertical slice’ingu” czyli przechodzącej przez wszystkie warstwy funkcjonalności, która dla AI staje się odniesieniem do przyszłych poleceń. Jeśli zbudujesz referencję do funkcjonalności A (np. formularz, strona, backend - typowy kawałek CRUDa), generowanie funkcjonalności B wg wzorca przebiega praktycznie bez przeszkód.

Na koniec lekcji trzymam kciuki za udaną implementację całego procesu również u ciebie:

![](https://assets-v2.circle.so/9ucnat0d3frv7g8if3mxm4snijkb)

### Konfiguracja URL

Wdrażając funkcjonalność zakładania konta na produkcję pamiętaj, aby na końcu modułu, już po wdrożeniu, zaktualizować URL do aplikacji produkcyjnej (np. link wystawiany przez Cloudflare). W przeciwnym wypadku maile do użytkowników będą zawierać przekierowanie na localhost:3000.

![](https://assets-v2.circle.so/r6ply9bv6k4lypxydzn89medfyva)

To ustawienie znajdziesz pod adresem:

```
https://supabase.com/dashboard/project/{{project_id}}/auth/url-configuration
```

## 🏁 Podsumowanie lekcji

W tej lekcji poznałeś metodykę wdrażania systemu uwierzytelniania w aplikacji webowej przy wsparciu modeli AI. Zamiast budować własny system od podstaw, na etapie MVP warto wykorzystać gotowe rozwiązania jak Supabase Auth. Zauważ też, że podejście krokowe (analiza → planowanie → implementacja UI → implementacja logiki biznesowej → testy) przynosi lepsze efekty niż metoda &quot;one-shot&quot;. 

Wykorzystując modele AI, zyskujesz możliwość szybkiego tworzenia planów architektury w oparciu o wymagania, generowania diagramów Mermaid do wizualizacji procesów oraz weryfikacji zgodności planów z założeniami. Możesz łatwo iterować i wprowadzać poprawki w odpowiedzi na napotkane problemy, co znacząco przyspiesza proces implementacji.

Pamiętaj jednak o ograniczeniach modeli AI. Mogą wprowadzać niespójności między planami a rzeczywistymi wymaganiami i często wymagają korekt oraz precyzyjnych wskazówek. Przy zbyt złożonych zadaniach napotykają na problemy z context window, dlatego zawsze dziel pracę na mniejsze etapy i regularnie weryfikuj postępy. W ten sposób unikniesz typowych problemów i efektywnie doprowadzisz funkcjonalność logowania i rejestracji do działającego stanu.

## 👨‍💻 Ćwiczenia praktyczne

### **Zadanie 1: Aktualizacja User Stories**

**Cel:** Zaktualizuj PRD o User Stories związane z uwierzytelnianiem

**Instrukcje:**

1. Uruchom aplikację i zastanów się, które elementy projektu powinny zależeć od stanu logowania i rejestracji (strony otwarte dla każdego, tylko dla zalogowanych, wyświetlanie statusu użytkownika).
2. Zaktualizuj PRD o nowe wymagania dotyczące modułu uwierzytelniania i jego wpływu na resztę projektu.

### **Zadanie 2: Architektura** uwierzytelniania

**Cel:** Wykorzystaj dostępne prompty do zbudowania planu architektury nowego systemu do uwierzytelniania opartego o Supabase Auth. Wprowadź instrukcje tekstowe oraz przykładowy diagram Mermaid.

**Instrukcje:**

1. Przeprowadź konwersację z wybranym modelem
2. Przeanalizuj jakość specyfikacji - w razie potrzeby wprowadź niezbędne korekty
3. Zapisz plan w pliku “.ai/auth-spec.md”
4. Wygeneruj 1-3 diagramy Mermaid które będą uzupełniać dokumentację projektu

### **Zadanie 3: Wdrożenie logowania**

**Cel:** Wprowadź mechanizm logowania oparty o Supabase Auth. Przed rozpoczęciem pracy upewnij się, że w twojej bazie znajduje się conajmniej jeden użytkownik z loginem i hasłem.

**Instrukcje:**

1. Pobierz instrukcje integracji Astro z Supabase lub przeanalizuj integrację we własnym stacku projektu zgodnie z dokumentacją Supabase (sekcja “Client Libraries” - &lt;https://supabase.com/docs&gt;)
2. W oparciu o instrukcje integracji oraz specyfikację architektury wprowadź nowe elementy interfejsu użytkownika - strony i komponenty
3. Przeprowadź integrację w backendzie - utwórz nowe endpointy oraz serwisy korzystające z Supabase Auth umożliwiając logowanie użytkownika.

### **Zadanie 4: (Opcjonalne) Rejestracja i odzyskiwanie hasła**

**Cel:** Wprowadź mechanizm rejestracji i odzyskiwania hasła oparty o Supabase Auth.

**Instrukcje:**

1. Wykorzystaj dokumentację, wymagania projektowe i architekturę projektu do wdrożenia rejestracji i odzyskiwania hasła.
2. Jeśli AI nie współpracuje, wykonaj klasyczne kodowanie ręczne, jak w 2024 😎:

```
const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${new URL(request.url).origin}/auth/login`,
      },
});
```

![](https://assets-v2.circle.so/ekrtcr8j44qd531ut1i2iwox5c9h)