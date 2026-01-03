<!DOCTYPE html>![](https://assets-v2.circle.so/aybccjvdpterr421fymfp02su30x)

## Wprowadzenie

Dzięki poprzedniej lekcji wiesz już, jak działają programistyczni agenci AI.

Teraz czas na fundamenty tej współpracy: sam sposób komunikacji z modelami językowymi. W tej lekcji zagłębimy się w mechanikę promptowania – od wyboru języka komunikacji (polski czy angielski?), przez budowę skutecznych poleceń, aż po zaawansowane techniki jak meta-prompting i Metoda Sokratejska.

Nie będzie to akademicki wykład z teorii. Każda z tych technik jest przez nas wykorzystywana niemal codziennie w pracy nad kodem. Zobaczysz, dlaczego typowe prompty zawodzą, jak odwrócić role i pozwolić AI pytać Cię o potrzebny kontekst, oraz jak wykorzystać modele do nauki nowych technologii bez przekopywania się przez Google.

Rozpocznijmy od pytania, które każdy programista zadaje sobie na początku pracy z AI…

## 1\. Język konwersacji

Polski vs angielski: w jakim języku promptować LLMy? **Odpowiedź brzmi… to zależy.** Powszechna mądrość internetowa głosi z przekonaniem, że jedyną słuszną ścieżką jest język angielski. Jednak badania pokazują, że nie zawsze angielski dominuje. W badaniu [**OneRuler**](https://arxiv.org/pdf/2503.01996) (porównującym modele w 26 językach) okazało się, że **angielski wcale nie jest najlepszy** – zajął dopiero 6\. miejsce, **ustępując m.in. językowi polskiemu, który wypadł najlepiej**. W zadaniach typu “needle-in-a-haystack” (wyszukiwanie _igły w stogu siana_ – ważnej informacji ukrytej w długim tekście) polski osiągnął najwyższą skuteczność. Było to zaskoczenie nawet dla autorów badania.

![](https://assets-v2.circle.so/w93xkfr1ruon22ivintvji4hatrx)

**Dlaczego polski mógł pokonać angielski?** Autorzy nie dają jednoznacznej odpowiedzi, ale możemy przypuszczać kilka rzeczy:

* **Struktura języka polskiego:** Polski ma cechy morfologiczne (przypadki, odmiany) i składniowe, które być może ułatwiają modelom wyciąganie informacji z długiego kontekstu. Możliwe, że fleksyjność pomaga modelowi śledzić zależności na dłuższym dystansie tekstu.
* **Spójność semantyczna:** Rozbudowana morfologia polska sprawia, że pewne powtórzenia czy związki wyrazów są bardziej oczywiste (np. zgadzają się końcówki gramatyczne), co może pomagać modelowi utrzymać kontekst i sens przez wiele zdań.
* **Efekty “magazynowania” informacji:** Wyniki sugerują, że modele językowe mogą efektywniej **przechowywać i wyszukiwać informacje w językach słowiańskich**, mimo że nie były na nie specjalnie trenowane. Być może wewnętrzna reprezentacja wiedzy w modelu sprzyja takim językom (hipoteza do dalszych badań).

### Tokenizacja a koszt: ukryty “podatek” za język polski

Jednak **nie samym długim kontekstem żyje programista**. W praktycznej pracy - zwłaszcza z kodem - ogromne znaczenie ma **efektywność tokenizacji** i związane z tym _koszty_. Topowe modele (OpenAI GPT-4, Anthropic Claude, Google Gemini itd.) wykorzystują tzw. **tokenizery**, czyli systemy zamieniające tekst na tokeny – podstawowe jednostki informacji, na których operuje LLM. I tutaj od razu widać **silną optymalizację pod język angielski**.

![](https://assets-v2.circle.so/jq1a970aqxtucm3kwp9y93g5vqhd)

Weźmy fragment tego samego prompta w obu językach. **W tokenizerze GPT-4** (cl100k) angielska wersja przekłada się na _202 tokeny_, podczas gdy polska wersja potrzebuje aż _300 tokenów_ – czyli o **48% więcej**. 

![](https://assets-v2.circle.so/fat7stxxq99a5z4pjdezn2nhf6m9)

Podobnie w modelu Claude 3.5 od Anthropica: angielski prompt to ok. _211 tokenów_, polski aż _354 tokeny_ (o **67% więcej**). To realne pomiary, które pokazują skalę problemu. Nie jest to odosobniony przypadek – badania wykazują, że tokenizery OpenAI potrafią użyć \~**1,6× więcej tokenów** dla języków romańskich (np. włoski), **2,6× więcej** dla słowiańskich w innych alfabetach (np. bułgarski), a nawet **3× więcej** dla niektórych języków arabskich, w porównaniu do tego samego tekstu po angielsku. 

Podsumowując, **model “postrzega” tekst polski jako znacznie dłuższy ciąg tokenów niż równoważny tekst angielski**.

&gt; **Dlaczego tak się dzieje?** Tokenizer GPT-4 został wytrenowany głównie na języku angielskim (oraz kodzie). Zawiera on \~100 000 najczęstszych sekwencji znaków (słów, cząstek słów) - ale przygniatającą większość stanowią fragmenty angielskie oraz programistyczne. Słowa polskie nie były priorytetem - wiele z nich nie istnieje jako samodzielne tokeny i model musi je **rozbijać na mniejsze kawałki**. Dla przykładu, długie słowo po niemiecku _“Wahrscheinlichkeit”_ (prawdopodobieństwo) rozbije na 8 tokenów, gdy angielskie _“probability”_ to tylko 1 token. Podobnie polskie wyrazy często są cięte na kilka tokenów. 

### Koszty i wydajność – “językowy podatek” za polski

Większa liczba tokenów to **konkretne konsekwencje**:

* **💰 Wyższy koszt:** Usługi LLM (API OpenAI, Anthropic itp.) rozliczają nas _za token_. Ten sam prompt/problem opisany po polsku może zużyć \~50% (lub więcej) tokenów niż po angielsku, co oznacza proporcjonalnie wyższą opłatę za każde zapytanie.
* **🐢 Większa latencja:** Więcej tokenów to również **wolniejsze działanie**. Model musi przetworzyć dłuższą sekwencję, więc odpowiedź pojawi się z większym opóźnieniem.
* **🧠 Szybsze wypełnienie kontekstu:** Każdy model ma _ograniczone okno kontekstu_. Jeśli język “marnuje” tokeny, to w to okno **zmieści się mniej faktycznej treści**. W praktyce oznacza to, że dłuższe rozmowy po polsku szybciej osiągną granice pamięci modelu niż te po angielsku.

Warto dodać, że **im bliżej zapełnienia okna kontekstu, tym modele radzą sobie gorzej z trudnymi zadaniami** – spada ich zdolność do głębokiego rozumienia tekstu. Język jako taki ma tu drugorzędne znaczenie, ale **używając polskiego szybciej doprowadzimy model do tego słabszej wydajności pracy**, bo szybciej zapełnimy kontekst tokenami.

**Dobra wiadomość:** W typowych rozmowach programistycznych **duża część promptu i odpowiedzi to kod**, a nie opis w naturalnym języku. Kod (słowa kluczowe, nazwy funkcji, zmiennych) jest z reguły identyczny niezależnie od języka komunikacji z modelem, więc **“nadwyżka” tokenów za polski dotyczy głównie opisów, poleceń i wyjaśnień**, a nie samego kodu. To łagodzi nieco problem – realnie nasz prompt często składa się w sporej części z uniwersalnych elementów (kod, znaki specjalne, angielskie nazwy bibliotek itp.), które _i tak_ są tokenizowane tak samo. Mimo to, różnica potrafi być odczuwalna.

### Zmiany w pricingach - koniec miesiąca miodowego

Na przestrzeni ostatniego półrocza **zmieniło się podejście do pricingu** usług opartych o LLM. Jeszcze niedawno większość narzędzi kusiła stałą opłatą abonamentową za zapytania (np. Cursor, Windsurf, czy JetBrains AI w początkowej fazie). **Teraz prawie wszędzie płacimy za faktyczne zużycie tokenów** po cenach dostawcy modelu. 

Tylko GitHub Copilot i Windsurf pozostali przy ryczałcie – nadal płacisz \~$10/$15 miesięcznie i możesz wykorzystać 300/500 zapytań, niezależnie od ilości tokenów. Czy tak pozostanie na długo? Ciężko powiedzieć. Zmiana u reszty usługodawców nie była przypadkowa - musieli dużo dokładać do biznesu ze względu na duże zużycie tokenów wśród power userów.

Inni dostawcy natomiast przeszli na model _usage-based_: przykładowo **Cursor Pro** za $20/miesiąc daje pulę kredytów odpowiadającą $20 do wydania na modele. **JetBrains AI Assistant** podobnie wprowadził _AI Credits_ – liczba kredytów równa kwocie abonamentu (np. 10 kredytów za $10) i każdy kredyt odpowiada $1 USD wydanemu na zapytania do modeli. 

💡 **Co to oznacza?** Jeśli korzystasz z narzędzia rozliczanego za tokeny (OpenAI API bezpośrednio, pluginy/IDE na własny klucz API, lub abonamenty z kredytami), **używanie języka polskiego realnie zwiększy zużycie tokenów, a więc koszt**. 

Trudno podać jedną wartość, bo zależy to od stylu promptów, długości odpowiedzi i domeny, ale można przyjąć orientacyjnie że **polskie opisy mogą wymagać \~50% więcej tokenów** niż ich angielskie odpowiedniki. Jeżeli Twoje zapytania to głównie praca nad kodem - będzie to mniejsza różnica. Niemniej, **warto mieć świadomość tego “ukrytego kosztu”.**

## Rekomendacje 🇵🇱 vs 🇬🇧 (09/2025)

1. **Korzystasz z usług ryczałtowych (abonament za zapytania)** – obecnie to właściwie tylko GitHub Copilot i Windsurf (ew. lokalne/open-source modele, gdzie koszt to “tylko” zużycie prądu i koszt sprzętu 😉). W takiej sytuacji możesz śmiało **promptować po polsku**, jeśli tak Ci wygodniej. Nie musisz się martwić o liczbę tokenów - płacisz z góry za dostęp. Jeśli wolisz język angielski - droga wolna! Przy bardzo długich wątkach może to dać pewne korzyści (mniej obciążone okno kontekstu, nieco szybsze odpowiedzi), ale różnice nie będą kolosalne w codziennych zastosowaniach. Najważniejsze, abyś **efektywnie przekazał modelowi swoje polecenie** \- język dobierz taki, w jakim sam najlepiej formułujesz myśli.
2. **Płacisz za tokeny (klucz API, usage-based plan)** \- tu warto już kalkulować. Jeśli Twój budżet jest ograniczony lub intensywnie korzystasz z modelu, **rozważ przejście na angielski** przy promptowaniu. **Angielski jest bardziej “optymalny” tokenowo**, więc za tę samą pracę zapłacisz mniej (i potencjalnie otrzymasz więcej informacji zanim wyczerpiesz limit kontekstu). Z kolei jeśli koszt nie gra kluczowej roli bo masz budżet i/lub nie jesteś power userem, a pisanie po polsku daje Ci większy komfort i precyzję - _śmiało kontynuuj po polsku_.

Na koniec podkreślmy: w 10xDevs nadal posługujemy się głównie promptami po polsku – chcemy, by treści były maksymalnie przystępne dla wszystkich uczestników. Przekonasz się sam, że **o sukcesie rozmowy z LLM decyduje przede wszystkim jakość prompta (jasność polecenia, przekazany kontekst)**, a nie język naturalny, w którym go sformułujesz. Jeśli polski ułatwia Ci wyrażenie dokładnie tego, o co Ci chodzi - korzystaj z niego. świadomość różnic kosztowych między językami traktuj jako ciekawostkę i dodatkowy **pro tip**, jak zoptymalizować pracę z narzędziami AI.

## 2\. Anatomia prompta czyli prompt engineering w pigułce

Wielu programistów odczuwa frustrację podczas pracy z AI - otrzymują odpowiedzi, które są zbyt ogólne, nieprecyzyjne lub zupełnie mijają się z intencją. Często nie rozumieją, dlaczego ich proste pytanie „napisz mi funkcję do XYZ&quot; daje inne rezultaty niż szczegółowy prompt ze szkolenia 10xDevs. Takie podejście prowadzi do paszczy “vibe codingu” - sytuacji, gdzie efektywność pracy z AI zależy od szczęścia, a nie od systematycznego podejścia.

Podstawowy problem tkwi w braku zrozumienia, jak modele językowe przetwarzają instrukcje i na jakie elementy promptu są najbardziej wrażliwe. Bez znajomości anatomii prompta programiści nie potrafimy świadomie kontrolować jakości odpowiedzi ani nie rozumiemy, dlaczego czasami otrzymujemy świetny kod, a czasami coś zupełnie bezużytecznego.

### Pięć fundamentalnych elementów prompta

Skuteczny prompt składa się z pięciu kluczowych elementów, które działają jak komponenty dobrze zaprojektowanego API:

![](https://assets-v2.circle.so/8nel1dnfjzbnafguum77cco8df89)

Poniżej omówimy wszystkie 5 elementów, tak abyś zrozumiał jak świadomie stosować je we własnych promptach oraz radzić sobie z analizą rozbudowanych promptów, które poznasz na dalszym etapie tego kursu:

### Polecenie

![](https://assets-v2.circle.so/i7lyk8qyi22fc5mw3cb8xcxehfus)

**Polecenie** stanowi serce każdego prompta, ale jego złożoność może znacznie wykraczać poza proste &quot;napisz funkcję&quot;. W praktyce programistycznej polecenia dzielą się na kilka kategorii wymagających różnego podejścia.

**Proste polecenia operacyjne** zaczynają się od czasownika i są jasno zdefiniowane: &quot;Zrefaktoryzuj tę funkcję aby używała async/await&quot;, &quot;Napisz test jednostkowy dla UserService&quot;, &quot;Debuguj błąd w komponencie LoginForm&quot;. Te polecenia działają najlepiej gdy zadania są proste.

**Złożone polecenia wieloetapowe** wymagają szczegółowej specyfikacji kroków i oczekiwanej struktury rezultatu. Przykład z prompta onboardingowego do nowych repo, który poznacie w module 4, pokazuje jak polecenie może zawierać precyzyjne instrukcje dotyczące użycia dostępnych narzędzi i wykorzystania procesu myślenia modelu. 

**Zarządzanie procesem myślenia** staje się kluczowe przy pracy z modelami reasoningowymi. Tutaj polecenie może zawierać meta-instrukcje dotyczące procesu rozwiązywania problemu: &quot;Przed implementacją przeanalizuj wszystkie edge cases&quot;, &quot;Jeśli napotkasz niejednoznaczność, zadaj pytania pogłębiające&quot; czy &quot;Pokazuj swój proces myślenia step-by-step&quot;. Te instrukcje pomagają modelowi organizować swoją pracę i unikać pochopnych rozwiązań.

Złożone polecenia tworzy się wspólnie z AI, wykorzystując technikę Metapromptingu, którą poznasz w dalszej części tej lekcji.

Kluczem do skutecznego polecenia jest balans między precyzją a elastycznością - wystarczająco szczegółowe, by uzyskać oczekiwany rezultat, ale nie na tyle restrykcyjne, by blokować kreatywne rozwiązania problemu.

### Kontekst

![](https://assets-v2.circle.so/4tjtqoo8m3i0lg7dbowpey8dhjkx)

**Kontekst** stanowi drugą warstwę - tutaj informujemy model o naszej sytuacji, celach i ograniczeniach. Zamiast zakładać, że AI wie, że jesteśmy fullstack developerem pracującym w stacku X nad projektem Y, wprost mu to mówimy. Kontekst w praktyce składa się z kilku kluczowych kategorii informacji:

* **Referencje do plików i folderów** powinny być bezpośrednio związane z realizowanym zadaniem. Jeśli prosimy o refaktoryzację komponentu, warto wskazać &quot;Komponent @src/components/UserProfile.tsx, używa hooków @src/hooks/useUserData.ts i typy z @src/types/User.ts&quot;. Przy pracy z API można dodać &quot;Endpointy są zdefiniowane w @src/api/userService.ts, a schemat odpowiedzi w @src/schemas/userSchema.ts&quot;. Te konkretne ścieżki pomagają AI zrozumieć istniejące zależności i konwencje nazewnictwa.
* **Szerszy opis techniczny** obejmuje stack technologiczny, strukturę projektu i procesy developerskie. Informacje o stacku typu &quot;React 18 z TypeScript 5.2, Vite jako bundler, TanStack Query do state managementu, Tailwind CSS do stylowania&quot; określają ramy techniczne. Równie istotne są detale o strukturze projektu - &quot;Komponenty w src/components/, hooki w src/hooks/, utils w src/lib/&quot; oraz procesów - &quot;npm run dev do developmentu, npm run build:prod do buildowania, npm run test:coverage do testów z pokryciem, npm run lint:fix do automatycznych poprawek&quot;. Te informacje pomagają AI proponować rozwiązania zgodne z istniejącymi workflows. Warto je trzymać w plikach pamięci pokroju CLAUDE.md, AGENTS.md czy Cursor Rules.
* **Szerszy opis produktowy** dostarcza kontekstu biznesowego opartego na dokumentach typu PRD (Product Requirements Docs), o których więcej dowiesz się w module 2\. Informacje o problemie - &quot;Użytkownicy porzucają koszyk w 73% przypadków na etapie płatności&quot;, o target userach - &quot;Główni użytkownicy to busy profesjonaliści 25-45 lat kupujący z mobilnych&quot;, o wymaganiach funkcjonalnych - &quot;Checkout musi działać offline, synchronizować po powrocie połączenia i obsłużyć Apple Pay&quot; oraz o KPI - &quot;Cel to zwiększenie conversion rate z 2.3% do 4.5% w Q2&quot;. Ten kontekst pomaga AI zrozumieć nie tylko co budować, ale dlaczego i dla kogo.

  
### Format

![](https://assets-v2.circle.so/5wz5z56vc5200tirtq7eubipvyzf)

**Format** stanowi często niedocenianą, ale krytyczną część prompta, która określa strukturę i prezentację odpowiedzi. Dla programistów odpowiedni format może oznaczać różnicę między kodem gotowym do wklejenia do IDE a tekstem wymagającym żmudnego przepisywania.

**Markdown z blokami kodu** pozostaje standardem dla dokumentacji kontekstowej i technicznej. Można poprosić o &quot;Odpowiedz w markdown z przykładami kodu w blokach \`\`\`typescript&quot;, co daje czytelną strukturę z podświetlaną składnią, łatwą do skopiowania do README czy dokumentacji API.

**Zdefiniowane szablony markdown** pozwalają na jeszcze większą kontrolę nad strukturą. Można określić szkielet odpowiedzi wraz z opisem każdej sekcji:

```
# [Nazwa komponentu]
[Krótki opis funkcjonalności i zastosowania]

## API Reference
[Szczegółowy opis interfejsu, parametrów i typów]

## Usage Examples  
[Praktyczne przykłady użycia z komentarzami]

## Integration Notes
[Informacje o zależnościach i wymaganiach środowiska]

## Testing Strategy
[Podejście do testowania i przykłady test cases]
```

**Formaty zorientowane na działanie** mogą obejmować instrukcje step-by-step i checklisy. Format &quot;Lista kroków z komendami CLI&quot; sprawdza się przy instrukcjach deploymentu. &quot;Checklista z checkboxami markdown&quot; jest idealny do code review czy przechodzenia przez procedury release’u.

**Strukturalne formaty danych** jak JSON i YAML są szczególnie przydatne przy automatyzacji i integracji z narzędziami. Polecenie &quot;Zwróć konfigurację w formacie JSON&quot; może skutkować odpowiedzią gotową do zapisania w pliku konfiguracyjnym.

**Specjalistyczne formaty** dostosowane do konkretnych narzędzi to kolejny poziom optymalizacji. &quot;Format kompatybilny z JSDoc&quot;, &quot;Swagger/OpenAPI specification&quot;, &quot;Docker Compose YAML&quot; czy &quot;GitHub Actions workflow&quot; pokazują AI, że potrzebujemy outputu gotowego do użycia w określonym kontekście technicznym.

Określenie formatu na końca prompta pozwala uniknąć &quot;szumu&quot; w postaci wprowadzeń, podsumowań czy niepotrzebnych wyjaśnień, dostarczając zawartość gotową do bezpośredniego wykorzystania w workflow programistycznym.

### Rola

![](https://assets-v2.circle.so/y2i40fu2wkj8exufx1fmb6u9ksy8)

**Rola** w nowoczesnych promptach programistycznych straciła na znaczeniu w porównaniu do wczesnych dni pracy z modelami językowymi, ale pozostaje wartościowym elementem ze względu na prostotę implementacji i potencjalne korzyści przy minimalnym koszcie.

**Spadek znaczenia** wynika z faktu, że współczesne modele są lepiej wytrenowane na zadaniach technicznych i nie wymagają już explicite wskazania, że mają być &quot;ekspertem programistą&quot; czy &quot;senior developerem&quot;. Polecenie &quot;zrefaktoryzuj ten kod&quot; jest dla modelu jasne bez dodawania &quot;Jesteś doświadczonym programistą z 10-letnim stażem&quot;. Kontekst techniczny i jakość polecenia mają dziś znacznie większy wpływ na rezultat.

**Łatwość dodania** sprawia, że rola pozostaje atrakcyjną opcją. Dodanie fraz typu &quot;Jako experienced React developer&quot; czy &quot;W roli senior backend engineera&quot; zajmuje kilka sekund i nie zwiększa znacząco długości prompta. To jedna z najszybszych optymalizacji, jaką można wprowadzić bez żadnego ryzyka pogorszenia wyników.

**Zawężanie domeny pracy** stanowi główną wartość roli w kontekście programistycznym. Określenie &quot;Jako DevOps engineer&quot; może skierować model w kierunku rozwiązań infrastrukturalnych, podczas gdy &quot;Jako frontend developer&quot; zasugeruje koncentrację na user experience w przeglądarce. Rola działa jak soczewka, przez którą model interpretuje zadanie.

### Format

![](https://assets-v2.circle.so/5uph64m82rshp58l868mx2hgsy60)

**Przykłady** w kontekście promptów programistycznych często stanowią najmniej przydatny element, szczególnie przy typowych zadaniach deweloperskich jak pisanie funkcji, refaktoryzacja czy debugowanie. W przeciwieństwie do innych dziedzin, gdzie few-shot learning znacząco poprawia wyniki, programowanie opiera się na jasnych specyfikacjach i standardach, które lepiej wyrażać przez kontekst i format.

**Ograniczona przydatność w codziennym developmencie** wynika z faktu, że większość zadań programistycznych ma jasno zdefiniowane reguły i konwencje. Prompt &quot;Napisz funkcję do walidacji email&quot; nie wymaga przykładów - AI rozumie czym jest walidacja email z kontekstu swojego treningu. Dodanie przykładów może wręcz wprowadzać niepotrzebne ograniczenia czy bias w kierunku konkretnej implementacji.

**Kluczowe zastosowanie w integracjach technicznych** pojawia się tam, gdzie potrzebujemy ścisłej kontroli nad formatem outputu i trzymania się specyficznych, dynamicznych wzorców. W scenariuszach automatyzacji, gdzie odpowiedź AI ma być przetwarzana przez inne systemy, przykłady często są niezbędne. 

## Najlepsze praktyki

Skuteczny prompt składa się z pięciu elementów o jasnej hierarchii ważności. 

Najważniejsze jest **polecenie** \- jasne działanie zaczynające się od czasownika, oraz **kontekst** \- informacje o sytuacji, stacku technologicznym i referencjach do plików. Te dwa elementy stanowią fundament i powinny być dopracowane w pierwszej kolejności.

**Format** określa strukturę odpowiedzi (JSON, markdown, szablony) i pomaga uniknąć niepotrzebnego &quot;szumu&quot;, podczas gdy **rola** zawęża domenę pracy modelu, choć straciła na znaczeniu w porównaniu do wcześniejszych modeli. 

**Przykłady** są najmniej przydatne przy AI-assisted developmencie - mają zastosowanie głównie w automatyzacji i integracjach wymagających dodatkowej kontroli działania modelu.

Ta hierarchia pozwala uniknąć przypadkowego &quot;vibe codingu&quot; i świadomie wpływać na jakość odpowiedzi AI.

## Najczęstsze błędy

Większość problemów z promptami wynika z zaniedbania fundamentów na rzecz „upiększania&quot; roli czy dodawania zbędnych elementów. Programiści często zaczynają od „Jesteś ekspertem z 20-letnim doświadczeniem w...&quot; zamiast skupić się na jasnym opisaniu problemu i oczekiwanego rezultatu.

Kolejny popularny błąd to ignorowanie ograniczeń kontekstu. Modele mają określone limity tokenów, a programiści często próbują „wpakować&quot; cały kod projektu do prompta, oczekując magicznych rozwiązań. Lepiej podzielić zadanie na mniejsze części i iteracyjnie pracować z AI.

## 3\. Meta-Prompting

Masz w głowie jasny cel, piszesz polecenie do LLMa, wciskasz &quot;Enter&quot; i... otrzymujesz odpowiedź, która jest kompletnie nie na temat. Jest zbyt ogólna, ignoruje kluczowe instrukcje albo po prostu nie spełnia Twoich oczekiwań. Poprawiasz prompt raz, drugi, trzeci, tracąc cenny czas i energię na &quot;walkę&quot; z maszyną.

A co, jeśli zamiast zgadywać, czego AI od nas oczekuje, moglibyśmy zapytać o to wprost? Co, jeśli moglibyśmy użyć samego modelu językowego do naprawienia i udoskonalenia naszego niedziałającego polecenia?

To jest właśnie idea [**meta-promptingu**](https://cookbook.openai.com/examples/enhance%5Fyour%5Fprompts%5Fwith%5Fmeta%5Fprompting) – techniki polegającej na zleceniu AI zadania z &quot;meta-poziomu&quot;: analizy i przepisania naszego własnego promptu, aby stał się on bardziej skuteczny. Zamiast traktować AI jak czarną skrzynkę, czynimy je aktywnym partnerem w procesie komunikacji.

**Dlaczego zwykłe prompty zawodzą?**

Często zdarza się, że jedyną przeszkodą dzielącą nas od uzyskania jakościowej odpowiedzi od AI jest niska jakość naszych zapytań. Typowe problemy to:

* **Brak kontekstu:** AI nie wie, kim jesteś, jakie masz doświadczenie, czego konkretnie oczekujesz,
* **Niejednoznaczność:** Polecenie można zinterpretować na wiele sposobów (np. “krótko opisz”),
* **Brak zdefiniowanego formatu:** Model nie wie, czy powinien się trzymać określonej struktury,
* **Rozumowanie w złym kierunku:** Proces rozumowania modelu pozostaje bez kontroli.

Meta-prompting rozwiązuje ten problem u źródła, wykorzystując &quot;wiedzę&quot; modelu o tym, jak sam lubi być instruowany. Co ważne, technika sprowadza się do jednego meta-prompta, który możesz wykorzystywać w wielu domenach i zadaniach.

**Meta-prompting w praktyce: Uniwersalny szablon**

Poniżej znajduje się szablon, który możesz wykorzystać za każdym razem, gdy Twój prompt nie przynosi oczekiwanych rezultatów. Składa się on z dwóch części: polecenia dla AI, aby ulepszyło Twój prompt, oraz miejsca na wklejenie Twojego oryginalnego, &quot;słabego&quot; polecenia.

```
Jesteś światowej klasy ekspertem od inżynierii promptów (prompt engineering). Twoim zadaniem jest przeanalizowanie i przepisanie poniższego, niedziałającego lub nieefektywnego polecenia, aby stało się ono precyzyjne, bogate w kontekst i w pełni zrozumiałe dla modelu językowego.

Obecne problemy, które musimy zaadresować:
- Model nie trzyma się zadanej w poleceniu długości odpowiedzi
- Model halucynuje i losowo przypisuje wersję frameworka X

Ulepszając prompt, skup się na następujących elementach:
1.  **Nadanie Roli:** Zaproponuj konkretną rolę lub personę dla AI (np. &quot;Jesteś seniorem programistą Pythona&quot;, &quot;Działaj jak ekspert od marketingu&quot;).
2.  **Dodanie Kontekstu:** Wzbogać prompt o niezbędne informacje, które pomogą modelowi zrozumieć cel i tło zadania.
3.  **Sprecyzowanie Celu:** Wyostrz cel polecenia, aby był jednoznaczny.
4.  **Zdefiniowanie Formatu:** Określ dokładny format wyjściowy odpowiedzi (np. tabela Markdown, lista JSON, fragment kodu).
5.  **Dodanie Ograniczeń:** Wprowadź zasady i ograniczenia, które ukierunkują odpowiedź (np. &quot;Nie używaj biblioteki X&quot;, &quot;Odpowiedź ma być zwięzła&quot;).

Po przepisaniu promptu, w osobnej sekcji zatytułowanej &quot;Wyjaśnienie Zmian&quot;, krótko opisz, dlaczego wprowadziłeś dane modyfikacje i jak wpłyną one na jakość odpowiedzi.

Oto polecenie do poprawy:
[--- TUTAJ WKLEJ SWÓJ ORYGINALNY, SŁABY PROMPT ---]
```

**Przykład ulepszonego prompta z Claude 4.1 Opus:**

Prompt bazowy:

```
Wygeneruj serwis do walidacji formularzy w najnowszej dostępnej wersji frameworka Angular
```

Prompt ulepszony:

```
Jesteś doświadczonym architektem aplikacji Angular z 10-letnim doświadczeniem w budowaniu skalowalnych rozwiązań enterprise. Specjalizujesz się w najnowszych wzorcach projektowych i najlepszych praktykach Angular.

**Zadanie:** Zaprojektuj i zaimplementuj kompletny serwis do walidacji formularzy w Angular.

**Kontekst:** Serwis będzie wykorzystywany w aplikacji e-commerce obsługującej tysiące użytkowników dziennie. Musi wspierać zarówno walidację synchroniczną, jak i asynchroniczną (np. sprawdzanie unikalności emaila w bazie danych). Aplikacja będzie rozwijana przez zespół 5 programistów, więc kod musi być czytelny i łatwy w utrzymaniu.

**Wymagania techniczne:**
1. PRZED rozpoczęciem implementacji, użyj narzędzia web_search aby sprawdzić najnowszą stabilną wersję Angular (sprawdź oficjalną stronę angular.io lub npm)
2. Wykorzystaj Reactive Forms API
3. Zaimplementuj następujące walidatory:
   - Standardowe (required, email, min/max length, pattern)
   - Własne (PESEL, NIP, numer telefonu PL)
   - Asynchroniczne (sprawdzanie unikalności w API)
4. Obsłuż wielojęzyczne komunikaty błędów (i18n ready)
5. Zastosuj TypeScript strict mode
6. Dodaj obsługę walidacji cross-field (np. potwierdzenie hasła)

**Format odpowiedzi:**
1. Najpierw podaj informację o użytej wersji Angular (po sprawdzeniu aktualnej wersji)
2. Struktura plików (tree view)
3. Kod serwisu głównego z komentarzami
4. Przykładowe walidatory (2-3 najważniejsze)
5. Przykład użycia w komponencie
6. Testy jednostkowe dla kluczowych funkcjonalności

**Ograniczenia:**
- Używaj tylko wbudowanych możliwości Angular (bez zewnętrznych bibliotek walidacji)
- Kod ma być zgodny z Angular Style Guide
- Maksymalna złożoność cyklomatyczna metod: 10
- Wszystkie publiczne metody muszą mieć JSDoc
- Użyj standalone components (jeśli wersja &gt;= 14)

**Dodatkowe wytyczne:**
- Priorytetyzuj wydajność - walidatory nie mogą blokować UI
- Zastosuj memoizację gdzie to możliwe
- Uwzględnij debouncing dla walidatorów asynchronicznych
```

Oczywiście tak przygotowanego prompta nie musisz akceptować bezkrytycznie. Zauważ jednak ile dodatkowej wiedzy i kontekstu, które teraz możesz dostosować, znalazło się w nowym poleceniu.

Efektem ubocznym meta-promptingu jest nie tylko podnoszenie jakości poleceń, ale również zwiększanie świadomości odnośnie tego, jak może wyglądać komunikacja z AI biorąc pod uwagę oczekiwania samego… AI.

[FRAGMENT VIDEO](https://player.vimeo.com/video/1122643300?app_id=122963)

## 4\. Metoda Sokratejska

Kontekst to klucz do skutecznej współpracy z AI, ale nawet najlepsze modele AI nie potrafią pozyskać go w sposób automatyczny. Można to odczuć szczególnie mocno wtedy, kiedy opisujesz problem najlepiej, jak potrafisz, podajesz wszystkie znane Ci szczegóły, ale odpowiedź modelu wciąż jest zbyt ogólna, niepraktyczna lub po prostu nie trafia w sedno. Czujesz, że utknąłeś, bo nie masz pojęcia, jakie jeszcze informacje mogłyby pomóc AI w wygenerowaniu idealnego rozwiązania. To częsty problem – wiemy, jaki jest cel, ale nie jesteśmy pewni, jakie detale są kluczowe dla jego osiągnięcia.

W takich chwilach, zamiast samemu zgadywać, czego może potrzebować model, odwróć role i pozwól aby to on przejął inicjatywę. Właśnie na tym polega tzw. Metoda Sokratejska.

Metoda Sokratejska to prosta, ale niezwykle skuteczna technika polegająca na dodaniu do prompta polecenia, które zmusza model do zadawania pytań doprecyzowujących. Zamiast dostarczać gotową, ale potencjalnie niekompletną specyfikację, prosisz AI, aby samo zidentyfikowało luki w Twoim opisie.

**Kluczowy zwrot, który odmieni Twoją rozmowę z AI:**

&gt; Zanim rozpoczniesz pracę, zadaj mi \[5-10\] pytań, które pomogą Ci lepiej zrozumieć mój obecny kontekst, docelowe oczekiwania oraz wszystko to, o czym mogłem zapomnieć.

Zobaczmy, jak to działa w praktyce.

**Scenariusz: Budowa silnika rekomendacji**

Wyobraź sobie, że masz za zadanie stworzyć system rekomendacji dla platformy e-commerce.

**🛑 Prompt standardowy (ryzyko ogólnikowej odpowiedzi):**

&gt; Potrzebuję kodu w Pythonie do silnika rekomendacji produktowej dla sklepu internetowego. Użyj biblioteki scikit-learn.

Odpowiedź na taki prompt będzie prawdopodobnie poprawna technicznie, ale generyczna. Otrzymasz przykład oparty na losowych danych, który niewiele Ci powie o wdrożeniu go w Twoim konkretnym przypadku.

**✅ Prompt z Metodą Sokratejską (gwarancja dopasowania):**

&gt; Potrzebuję kodu w Pythonie do silnika rekomendacji produktowej dla sklepu internetowego. Użyj biblioteki scikit-learn.
&gt; 
&gt; **Zanim rozpoczniesz, zadaj mi 10 pytań, które pomogą Ci lepiej zrozumieć specyfikę mojego biznesu i wymagania techniczne.**

Nagle rozmowa nabiera zupełnie innej dynamiki. Model, zamiast generować kod, może zadać następujące pytania:

1. Jakie typy danych o użytkownikach i produktach posiadasz (np. historia zakupów, oceny, kliknięcia, atrybuty produktów)?
2. Czy rekomendacje mają być generowane w czasie rzeczywistym, czy mogą być obliczane wsadowo (np. raz na dobę)?
3. Jaki jest główny cel rekomendacji: zwiększenie sprzedaży (cross-selling), odkrywanie nowości czy personalizacja strony głównej?
4. Jak duży jest zbiór danych (liczba użytkowników, produktów, interakcji)?
5. Jakiego rodzaju rekomendacji potrzebujesz: opartej na współpracy (inni użytkownicy kupili...), na treści (podobne produkty) czy hybrydowej?
6. W jaki sposób planujesz mierzyć skuteczność silnika rekomendacji?
7. Jaka jest obecna architektura technologiczna (baza danych, język backendu)?
8. Czy system ma radzić sobie z problemem &quot;zimnego startu&quot; (nowi użytkownicy/produkty)?
9. Czy istnieją jakieś ograniczenia biznesowe (np. nie rekomenduj produktów z niskim marginesem)?
10. Jaki jest Twój poziom zaawansowania w temacie machine learningu, abym mógł dostosować złożoność kodu i wyjaśnień?

Odpowiadając na te pytania, dostarczasz modelowi niezwykle bogaty kontekst, który pozwala mu stworzyć rozwiązanie skrojone na miarę.

Metoda Sokratejska to Twoja tajna broń na sytuacje, w których czujesz, że Twój opis problemu jest niewystarczający. Zamiast biernie czekać na odpowiedź, aktywnie angażujesz AI w proces definiowania wymagań. Przenosisz ciężar identyfikacji kluczowych informacji z siebie na model, co pozwala odkryć &quot;nieznane niewiadome&quot; i drastycznie podnieść jakość końcowego rezultatu.

To zmiana myślenia: z wydawania poleceń na prowadzenie partnerskiego dialogu.

## 5\. Pozyskiwanie nowej wiedzy

Znasz to uczucie? Jesteś w połowie interesującego artykułu lub nowego kursu, wszystko idzie gładko, aż nagle trafiasz na ścianę. Nowe pojęcie, którego nie rozumiesz. Konfiguracja, która nie działa. Błąd, którego znaczenia nie potrafisz rozszyfrować.

Przed epoką LLMów pierwszym odruchem było wpisanie zapytania w Google lub w wyszukiwarce StackOverflow: _&quot;Czym jest GitHub Actions?&quot;_ albo _&quot;Co oznacza ten błąd w JavaScript?&quot;_. W odpowiedzi dostajesz lawinę informacji – reklamy, linki do dokumentacji, blogi różnej jakości, ogólnikowe definicje, które rodzą więcej pytań niż odpowiedzi. Po 30 minutach frustrującego przekopywania się przez nieistotne treści jesteś jeszcze bardziej zdezorientowany niż na początku. Straciłeś czas i zapał.

Dzisiaj tego typu przeszkody możesz omijać w znacznie bardziej efektywny sposób - wszystko to dzięki najlepszym modelom AI oraz odpowiedniemu sposobowi promptowania, na skutek którego pobierana wiedza będzie dostosowywana do twojej obecnej wiedzy i doświadczenia.

### Odblokuj się w nauce z AI

W 10xDevs zachęcamy do kontaktu z AI od startu do mety całego szkolenia. Nie tylko w kontekście budowania własnych projektów, ale również przy poznawaniu zagadnień umożliwiających ukończenie całego materiału. Kiedy w trakcie szkolenia napotkasz nieznany termin lub dane ćwiczenie będzie zbyt wymagające, spróbuj potraktować AI jak koło ratunkowe.

[FRAGMENT VIDEO](https://player.vimeo.com/video/1122649106?app_id=122963)

Poniższy prompt pomocniczy możesz modyfikować zgodnie z własnym doświadczeniem i potrzebami. Żeby AI było w stanie ci pomóc, w poleceniu musisz przekazać odpowiedni kontekst.

### Uniwersalny szablon promptu

Całość może wyglądać tak jak poniżej - detale możesz dostosować do własnych potrzeb:

```
Jesteś doświadczonym {{DevOps Engineerem}} - z twoją pomocą chciałbym zrozumieć nowe zagadnienie.

Mój poziom wiedzy: {{zaawansowany}} w technologii {{JavaScript}}.
Mam {{6 lat}} doświadczenia z {{Reactem, Reduxem i Jenkinsem}}.

Cel nauki: Chcę zrozumieć {{GitHub Actions}} aby {{zbudować pierwszy scenariusz CI/CD w repozytorium na GitHubie}}.

Napotykam następującą blokadę: {{nie rozumiem czym różni się job od workflow i na jakim systemie powinny być uruchamiane zadania - Ubuntu czy Windows?}}.

Proszę o wyjaśnienie tego zagadnienia krok po kroku, zaczynając od {{podstaw}} i przechodząc do {{zaawansowanych aspektów/praktycznego zastosowania}}.

Najlepiej uczę się poprzez {{wizualizacje problemu i schematy praktyczne}}.
Preferuję odpowiedź w formie {{krótkiej instrukcji z przykładami/rozbudowanego wyjaśnienia z komentarzami/projektu demonstracyjnego/serii ćwiczeń o rosnącej trudności}}.

Czy możesz mi pomóc zrozumieć to zagadnienie i odblokować się w nauce?
```

Tego typu prompt będzie działał jak jedno z wielu narzędzi, które możesz wykorzystywać w nowoczesnym dev-workflow napędzanym AI. Dostosuj wybrane stałe, takie jak twoje doświadczenie i znajomość technologii i na bieżąco modyfikuj zmienne, czyli wiedzę, którą chcesz zdobyć.

Pamiętaj jednak, że w zależności od wybranego modelu efekty mogą się różnić. Najlepsze rezultaty dadzą tutaj największe modele chmurowe, o najbardziej przekrojowej i możliwej do adaptowania wiedzy - GPT-5, Claude 4 Sonnet / 4.1 Opus, Grok 4 lub Gemini 2.5 Pro.

### Anatomia skutecznego promptu

Żeby lepiej zrozumieć działanie takiego polecenia, przeanalizujmy jego elementy krok po kroku.

**1\. Rola asystenta**

Służy do ukierunkowania modelu AI na konkretną perspektywę, z której ma udzielać odpowiedzi, co pomaga w otrzymaniu bardziej spersonalizowanego i dopasowanego do twoich potrzeb wsparcia. Pozwala również minimalizować efekt halucynacji AI, kiedy jeden wyraz ma zbyt ogólne znaczenie, a model nie do końca rozumie tzw. przestrzeń problemu (np. aplikacja - desktopowa, webowa, czy radcy prawnego?).

Przykład:

_Jesteś doświadczonym DevOps Engineerem - z twoją pomocą chciałbym zrozumieć nowe zagadnienie._

**Inne warianty:**

* _Działaj jako mentor programowania specjalizujący się w React i TypeScript_
* _Wciel się w rolę doświadczonego architekta oprogramowania, który opanował wzorce projektowe_
* _Bądź jak cierpliwy nauczyciel JavaScript, który krok po kroku prowadzi mnie przez szkolenie_

**2\. Twoje doświadczenie**

Ten element dostarcza kontekstu o twoim aktualnym poziomie wiedzy, co pozwala AI dostosować poziom szczegółowości i złożoności odpowiedzi. Wymienione technologie pozwolą asystentowi AI stosować bardziej trafne metafory i analogie do tego, co znasz już dziś.

Przykład:

_Mój poziom wiedzy: zaawansowany w technologii JavaScript._

_Mam 6 lat doświadczenia z Reactem, Reduxem i Jenkinsem._

**Inne warianty:**

* _Mam 2 lata doświadczenia w programowaniu w JavaScript, znam podstawy Reacta_
* _Jestem początkującym programistą z 3-miesięcznym doświadczeniem w HTML i CSS_
* _Pracuję jako frontend developer od 4 lat, znam dobrze Vue.js a teraz poznaję backend od zera_

**3\. Twój cel**

Cel pozwala określić, czego chcesz się nauczyć i do czego zamierzasz to wykorzystać. To z kolei pomaga AI skupić się na najbardziej istotnych dla ciebie aspektach tematu. Może to być również etap szkolenia, na którym jesteś chwilowo zablokowany.

Przykład:

_Cel nauki: Chcę zrozumieć GitHub Actions aby zbudować pierwszy scenariusz CI/CD w repozytorium na GitHubie._

**Inne warianty:**

* _Chcę zrozumieć architekturę Micro Frontends, aby móc zaimplementować ją w projekcie firmowym_
* _Potrzebuję nauczyć się zarządzania stanem w dużej aplikacji React z biblioteką Zustand_
* _Moim celem jest zrozumienie podstawowych technik optymalizacji wydajności w aplikacjach Node.js_

**4\. Problem**

Identyfikuje konkretną przeszkodę, którą napotkałeś, co umożliwia AI precyzyjne zaadresowanie twojej blokady i dostarczenie rozwiązania skierowanego dokładnie na twoje trudności.

Przykład:

_Napotykam następującą blokadę: nie rozumiem czym różni się job od workflow i na jakim systemie powinny być uruchamiane zadania - Ubuntu czy Windows?._

_Proszę o wyjaśnienie tego zagadnienia krok po kroku, zaczynając od podstaw i przechodząc do zaawansowanych aspektów/praktycznego zastosowania._

**5\. Oczekiwania i format**

Oba elementy komunikują, w jaki sposób najlepiej przyswajasz wiedzę oraz w jakiej formie chciałbyś otrzymać odpowiedź. Dzięki temu AI postara się dostarczyć informacje w sposób najbardziej przystępny i użyteczny dla ciebie.

Przykład:

_Najlepiej uczę się poprzez wizualizacje problemu i schematy praktyczne._

_Preferuję odpowiedź w formie krótkiej instrukcji z przykładami/rozbudowanego wyjaśnienia z komentarzami/projektu demonstracyjnego/serii ćwiczeń o rosnącej trudności._

**Inne warianty:**

* _Potrzebuję wyjaśnienia krok po kroku z przykładami kodu, który będę mógł uruchomić lokalnie_
* _Preferuję odpowiedź opartą o analogie i metafory odnoszące się do obecnego doświadczenia_
* _Chciałbym otrzymać szczegółowe wyjaśnienie z diagramami koncepcyjnymi_

### Pogłębianie zdobytej wiedzy

Gdy wypróbujesz przedstawiony powyżej szablon, możesz iść jeszcze dalej:

1. **Promptowanie iteracyjne:** Pierwsza odpowiedź AI to często dopiero początek. Wejdź w dialog z asystentem AI, który dzięki pierwszej wiadomości zrozumiał twoje oczekiwania i doświadczenie.  
   * **Poproś o doprecyzowanie:** _&quot;OK, to ma sens. Ale czy możesz to porównać do Jenkinsa, skoro mam z nim doświadczenie?&quot;_  
   * **Zmień perspektywę:** _&quot;Dziękuję. A teraz wyjaśnij mi to samo, ale z perspektywy bezpieczeństwa.&quot;_  
   * **Poproś o kod:** _&quot;Świetnie. Czy możesz teraz wygenerować minimalny, działający plik workflow.yml dla tego scenariusza?&quot;_
2. **Uczenie na przykładach (Few-Shot Prompting):** Czasami najłatwiej pokazać, o co Ci chodzi. Zanim zadasz pytanie, daj modelowi przykład.  
   * **Przykład:** _&quot;Chcę, żebyś wyjaśniał mi pojęcia w zwięzły sposób, używając analogii. Przykład: &#39;Docker jest jak standardowy kontener transportowy dla kodu. Nieważne, co jest w środku, każdy port wie, jak go obsłużyć&#39;. A teraz, używając tego stylu, wyjaśnij mi, czym jest Kubernetes.&quot;_

W jednej z kolejnych lekcji zobaczysz, jak tego typu rozwijające konwersacje można przekonwertować na kreatywną, generatywną aplikację webową, dzięki której pozyskiwanie wiedzy staje się jeszcze prostsze.

## 🧑🏻‍💻 Ćwiczenia praktyczne

Poniżej przygotowaliśmy kilka ćwiczeń, które pomogą Ci przetestować nowe techniki w praktyce. Ich realizacja jest opcjonalna, nie są wymagane aby otrzymać certyfikat ukończenia kursu. Mimo to, zachęcamy do ich przerobienia - dzięki temu lepiej zapamiętasz te kluczowe sposoby na efektywną współpracę z AI i będzie łatwiej ci z nich skorzystać w potrzebie.

**1\. Meta-prompting w akcji**

**Cel:** Użycie AI do naprawienia własnego, nieskutecznego prompta.   
  
**Czas:** 25 minut.  
  
**Kroki:**

1. Przypomnij sobie sytuację, gdy AI zwróciło Ci słabą lub niepełną odpowiedź. Skopiuj ten prompt z historii konwersacji w usłudze lub odtwórz taki prompt z pamięci.
2. Skopiuj uniwersalny szablon do **meta-promptingu** z lekcji.
3. W miejscu \[--- TUTAJ WKLEJ SWÓJ ORYGINALNY, SŁABY PROMPT ---\] wklej swoje polecenie.
4. Wklej całość do modelu i pozwól mu przeprojektować Twoje zapytanie.
5. Przeanalizuj zaproponowane zmiany i sekcję &quot;Wyjaśnienie Zmian&quot;. Czy teraz rozumiesz, dlaczego pierwotny prompt nie działał dobrze?

  
**2\. Odwróć role z Metodą Sokratejską**

**Cel:** Doświadczenie, jak AI może pomóc w zdefiniowaniu wymagań, zadając trafne pytania.   
  
**Czas:** 20 minut.  
  
**Kroki:**

1. Pomyśl o nowej, nietrywialnej funkcjonalności, którą chciałbyś dodać do swojego projektu (np. system notyfikacji, panel ustawień użytkownika, prosty moduł analityczny).
2. Napisz prompt, który ogólnie opisuje Twój cel, np. Chcę zbudować system notyfikacji w mojej aplikacji React. Powiadomienia mają pojawiać się w prawym górnym rogu.
3. Na końcu prompta dodaj magiczną formułkę: Zanim zaczniesz, zadaj mi 5-10 pytań, które pomogą Ci lepiej zrozumieć kontekst biznesowy, wymagania techniczne i wszystko, o czym mogłem zapomnieć.
4. Odpowiedz na pytania zadane przez AI. Zwróć uwagę, o ilu ważnych aspektach (np. obsługa błędów, stan, typy notyfikacji) nie pomyślałeś na początku.

  
**3\. Twoje osobiste koło ratunkowe w nauce**

**Cel:** Szybkie zrozumienie nowego pojęcia technicznego w kontekście Twojej aktualnej wiedzy.   
  
**Czas:** 20 minut.

**Kroki:**

1. Wybierz jedną technologię lub koncept z kursu 10xDevs (np. **GitHub Actions**, **Docker**, **Event Storming**), którego jeszcze dobrze nie rozumiesz.
2. Skopiuj **Uniwersalny szablon promptu do nauki** z lekcji.
3. Wypełnij go swoimi danymi:  
   * {{Twoja rola}} (np. Frontend Developer)  
   * {{Twój poziom wiedzy i technologie}} (np. zaawansowany w JS, 5 lat doświadczenia z React)  
   * {{Cel nauki}} (np. zrozumieć GitHub Actions, aby zautomatyzować testy)  
   * {{Twoja blokada}} (np. nie rozumiem różnicy między step a job)  
   * {{Jak się uczysz}} (np. przez praktyczne przykłady kodu)
4. Wyślij prompt i oceń, czy wyjaśnienie AI jest lepiej dopasowane do Ciebie niż standardowa definicja z Google.

  
**4\. Pogłębianie wiedzy przez dialog**

**Cel:** Przećwiczenie iteracyjnego promptowania, aby wyciągnąć więcej wiedzy z AI.   
  
**Czas:** 15 minut.  
  
**Kroki:**

1. To kontynuacja **Ćwiczenia 3**. Masz już podstawowe wyjaśnienie nowego pojęcia.
2. Zadaj AI trzy pytania pogłębiające, korzystając z sugestii z lekcji:  
   * **Porównanie:** OK, rozumiem. A jak to się ma do \[technologia, którą znasz\], np. Jenkinsa? Jakie są główne różnice?  
   * **Prośba o kod:** Świetnie. Wygeneruj mi teraz minimalny, działający przykład pliku konfiguracyjego dla tego scenariusza.  
   * **Zmiana perspektywy:** Dziękuję. A teraz wyjaśnij mi, na co muszę zwrócić uwagę pod kątem bezpieczeństwa, implementując to rozwiązanie.

## 🏁 Podsumowanie

Za Tobą pierwsza porcja kompleksowego podejścia do współpracy z modelami językowymi w kontekście programistycznym. 

Zaczęliśmy od fundamentalnej kwestii wyboru języka komunikacji. Polski może przewyższać angielski w zadaniach wymagających długiego kontekstu, ale generuje więcej tokenów (nawet o 50-67%), co przekłada się na wyższe koszty przy płatności za użycie. Nie ma jednej odpowiedzi dotyczącej z jakiego języka korzystać: zależy to od Twojej sytuacji i preferencji.

Kluczem do sukcesu przy promptowaniu jest zrozumienie anatomii prompta, gdzie najważniejsze są jasne polecenie i dobrze zdefiniowany kontekst, podczas gdy elementy jak rola czy przykłady mają drugorzędne znaczenie w typowych zadaniach programistycznych.

Meta-prompting to technika wykorzystująca AI do analizy i przepisania własnego promptu, gdzie zamiast zgadywać, czego model oczekuje, pytamy go wprost o ulepszenie naszego polecenia. Typowe prompty zawodzą z powodu braku kontekstu, niejednoznaczności i niezdefiniowanego formatu. Uniwersalny szablon meta-promptingu rozwiązuje te problemy poprzez nadanie roli, dodanie kontekstu, sprecyzowanie celu i wprowadzenie ograniczeń. 

Równie skuteczna jest Metoda Sokratejska, gdzie odwracamy role i pozwalamy AI przejąć inicjatywę, zadając 5-10 pytań doprecyzowujących – to transformuje proces z wydawania poleceń na prowadzenie partnerskiego dialogu, który odkrywa &quot;nieznane niewiadome&quot;.

Kolejnym zastosowaniem jest pozyskiwanie nowej wiedzy, gdzie AI może zastąpić frustrujące przeszukiwanie Google, dostarczając wyjaśnienia dostosowane do Twojego poziomu i doświadczenia. Skuteczny prompt edukacyjny zawiera rolę asystenta, Twój poziom wiedzy, konkretny cel nauki, napotkaną blokadę oraz preferowany format odpowiedzi, podczas gdy techniki jak promptowanie iteracyjne czy Few-Shot Prompting pozwalają pogłębiać zdobytą wiedzę przez dialog i uczenie na przykładach.

W następnej lekcji czeka na Ciebie kolejne 5 technik efektywnej współpracy z AI, udanej nauki!

---

![](https://assets-v2.circle.so/ekrtcr8j44qd531ut1i2iwox5c9h)