<!DOCTYPE html>![](https://assets-v2.circle.so/bvzz0e0glbxiwehv83r4y54xiiin)

## Wprowadzenie

W tej lekcji przyjrzymy się, jak wykorzystać agentów AI bezpośrednio w terminalu. Naszym głównym bohaterem będzie [**Claude Code**](https://claude.com/product/claude-code) (CC) – narzędzie od firmy Anthropic, z którym możemy przejść przez cały cykl pracy nad kodem: od planu zmian, przez generowanie diffa, uruchamianie testów, aż po utworzenie pull requesta (PR). Omówimy też ustawienia, koszta, zarządzanie kontekstem, automatyzację zadań, routing do zewnętrznych modeli oraz kwestie bezpieczeństwa.

Postawiliśmy Claude Code z kilku powodów: popularność narzędzia, najwyższa dojrzałość ekosystemu i sami korzystamy z tego rozwiązania. To nie oznacza, że Claude Code będzie najlepszym wyborem również dla Ciebie, stąd na koniec porównamy CC z alternatywami: [**Gemini CLI**](https://github.com/google-gemini/gemini-cli) od Google, [**Codex CLI**](https://github.com/openai/codex) od OpenAI oraz [**OpenCode**](https://github.com/sst/opencode), które jest projektem open-source tworzonym przez społeczność programistów. 

W tej lekcji skupiamy się na prezentacji samego narzędzia, podstaw workflow. Techniki pozwalające wycisnąć 100% możliwości z pracy z agentami, w CLI i IDE, przedstawimy w kolejnych lekcjach. 

## Dla kogo AI w terminalu?

AI w terminalu to rozwiązanie dla programistów, którzy już czują się komfortowo ze współpracą z AI i chcą delegować większe, bardziej złożone zadania. Jeśli dopiero zaczynasz swoją przygodę z AI w kodowaniu, IDE ze wsparciem AI będzie w zupełności wystarczające.

To opcja szczególnie warta rozważenia, jeśli masz budżet na dodatkowe narzędzia AI (20-200$ miesięcznie) i jesteś niezadowolony z ograniczeń GitHub Copilota czy innej usługi dostępnej w Twoim IDE.

**Ważne:** używanie AI w terminalu nie jest obowiązkowe ani kluczowe dla realizacji tego kursu. Możesz w pełni skorzystać z programu i uzyskać ogromną wartość ze stosowania AI w codziennej pracy, opierając się wyłącznie na narzędziach IDE.

## Wstępna konfiguracja

Aby zainstalować Claude Code, potrzebujesz Node.js (min. v18). Instalacja jest prosta, przez npm: _npm install -g @anthropic-ai/claude-code_. Pozostałe opcje instalacji znajdziesz w dokumentacji [Claude Code - Quick Start](https://docs.claude.com/en/docs/claude-code/quickstart).

Przed rozpoczęciem pracy, musisz utworzyć [konto Claude.ai](https://claude.com/pricing) i wykupić subskrypcję lub zasilić [klucz API w Claude Console](https://claude.com/pricing#api). Więcej informacji odnośnie kosztów znajdziesz poniżej, w sekcji “Plany pricingowe”.

### Plany pricingowe

Claude.ai oferuje trzy warianty subskrypcji: Pro ($20/msc), Max 5x ($100/msc) oraz Max 20x ($200/msc). Ich zwięzłe podsumowanie wygląda następująco:

![](https://assets-v2.circle.so/omovfm2t8uw6ecjihum43iqmomuf)

Limity dla każdego planu resetują się co 5 godzin.

**Wybierz Pro jeśli:**

* Dopiero zaczynasz z AI-assisted coding
* Pracujesz nad małymi projektami
* Chcesz nauczyć się workflow z Claude Code
* Kupujesz Claude Code głównie pod 10xDevs
* Masz budżet na AI w terminalu do 100 zł/miesiąc

**Wybierz Max 5x jeśli:**

* Chcesz stosować CC w codziennej pracy do wielu zadań
* Potrzebujesz dostępu do Opus do planowania i rozwiązywania trudnych zadań
* Pracujesz nad projektami średniej i dużej wielkości
* Chcesz wybrać optymalny plan pod kątem cena/jakość dla większości doświadczonych użytkowników
* Masz budżet na AI w terminalu do 400 zł/miesiąc

**Wybierz Max 20x jeśli:**

* Claude Code to Twoje główne narzędzie developmentu
* Pracujesz nad dużymi, złożonymi projektami
* Potrzebujesz ciągłego dostępu do AI
* Masz budżet na AI w terminalu do 800 zł lub zespół dzieli koszty między kilka osób

**Klucz API vs subskrypcje**

Claude Code można też używać przez klucze API z płatnością za tokeny. W praktyce typowy użytkownik zużywa średnio \~$6/dzień, a w 90\. percentyl najbardziej aktywnych użytkowników zużywa średnio &lt;$12/dzień, co miesięcznie daje ok. $100-200\. Przy intensywnym użyciu Opus 4 koszty rosną około 5x szybciej, więc równowartość planu Pro ($20) może się &quot;wypalić&quot; nawet w kilka godzin intensywnej pracy.

Korzystając z API, plan Pro zostaje przekroczony po około 3-4 dniach typowego użycia, Max 5x ($100) po \~17 dniach, a Max 20x ($200) po \~33 dniach. 

API ma sens przy automatyzacji procesów, budowaniu własnych narzędzi lub sporadycznym użyciu, ale dla regularnej pracy programistycznej plany abonamentowe są bardziej opłacalne. 

**Nasza rekomendacja**

Dla początkujących uczestników kursu 10xDevs polecamy plan Pro. Plan **Max 5x** będzie optymalny dla osób, które pierwsze kroki z AI mają za sobą i chcą wycisnąć z 100% możliwości z agentów AI (w pracy nad projektem certyfikacyjnym oraz w licznych innych zadaniach). 

Więcej informacji o planach pricingowych znajdziesz w dokumentacji [Using Claude Code with your Pro or Max plan](https://support.claude.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan).

## Pierwszy kontakt z Claude Code

Gdy masz już zainstalowane CC i wykupiony dostęp, wchodzisz do katalogu projektu w terminalu i uruchamiasz komendę _claude_, która startuje interaktywną sesję CLI z modelem (REPL) w kontekście bieżącego folderu. Pierwsze uruchomienie przeprowadzi Cię przez logowanie oraz wstępną konfigurację.

Claude Code wykorzystuje system **slash commands** – specjalne polecenia rozpoczynające się od slasha tudzież ukośnika /. Slash commands pozwalają szybko wykonywać częste operacje i konfigurować środowisko pracy. Te polecenia działają podobnie do skrótów w innych narzędziach - wystarczy wpisać komendę ze slashem na początku, a Claude Code automatycznie rozpozna i wykona odpowiednią akcję.

**Jak korzystać ze slash commands:**

* Wpisz polecenie zaczynające się od / (np. /init, /help)
* Claude Code automatycznie rozpozna komendę i wykona odpowiednią operację
* Niektóre komendy działają interaktywnie – mogą zadawać dodatkowe pytania lub wymagać potwierdzenia
* Listę dostępnych komend można uzyskać poprzez komendę /help

Zobacz jak wyglądają początki pracy z Claude Code na poniższym filmie:

[FRAGMENT VIDEO](https://player.vimeo.com/video/1122658729?app_id=122963)

Poniżej znajdziesz najważniejsze slash commands do konfiguracji startowej:

1. **Inicjalizacja kontekstu projektu (/init)**

Po rozpoczęciu pierwszej sesji należy wykonać polecenie /init. Claude Code przeskanuje projekt i utworzy plik **CLAUDE.md** z zarysami dokumentacji i kontekstem. Plik CLAUDE.md to pamięć kontekstowa – miejsce, gdzie możemy zapisać informacje, które asystent ma zawsze uwzględniać (np. instrukcje budowania, konwencje kodowania, skróty poleceń). Dzięki temu Claude automatycznie wczyta te wskazówki przy każdej sesji, co oszczędza tokeny i czas. 

Przykładowy plik kontekstowy CLAUDE.md dla projektu 10xRules.ai znajdziesz [tutaj](https://github.com/przeprogramowani/ai-rules-builder/blob/master/CLAUDE.md).

**Ważne:** Dbaj o zwięzłość CLAUDE.md – niech zawiera najważniejsze informacje, a nie całą dokumentację projektu. Plik ten można aktualizować ręcznie lub podczas pracy z CC używając prefiksu #, aby dodać nowe informacje do CLAUDE.md na podstawie kontekstu konwersacji.

Pozostałą dokumentację, która będzie zawierała szczegółowy opis projektu, przygotujemy w module 2 i 3\. Będziemy ją jawnie dołączali do promptów ukierunkowanych na realizację konkretnych zadań. 

1. **Konfiguracja terminala (/terminal-setup)**

Kolejne polecenie, które warto uruchomić na początku współpracy z CC to /terminal-setup. Automatycznie dostosuje ono nasz terminal, aby podnieść komfort pracy. Obecnie skupia się na obsłudze skrótu **Shift+Enter** do wprowadzania nowej linii w promptach (zamiast natychmiastowego wysyłania polecenia). Poprawia to komfort pisania wielolinijkowych poleceń, bez przypadkowego ich uruchamiania. Obecnie to część onboardingu do CC, narzędzie spyta Cię czy skonfigurować to dla Ciebie podczas pierwszego uruchomienia.

1. **Integracja z IDE (/ide)**

Ostatnie polecenie, które warto wykonać przy pierwszym kontakcie z Claude Code to /ide. Dzięki niemu zintegrujesz CC ze swoim edytorem. Claude Code będzie świadomy pliku w aktywnym oknie i zaznaczeń linijek kodu w jego zakresie. Dodatkowo wprowadzając zmiany będzie wyświetlał diffy w oknie edytora, co ułatwia prowadzenie code review na bieżąco.

### **Prywatność**

Domyślnie po zalogowaniu, nasze konwersacje w Claude Code nie są wykorzystywane do trenowania modeli – Anthropic przyjęło zasadę opt-in, czyli **nie trenuje na Twoich danych bez wyraźnej zgody**. Niemniej warto świadomie przejrzeć ustawienia prywatności na swoim koncie Anthropic (na stronie claude.ai w zakładce [Privacy](https://claude.ai/settings/data-privacy-controls)) i upewnić się, że opcja „Help improve Claude” jest wyłączona. Dzięki temu, nasze rozmowy nie będą wykorzystywane do trenowania modeli. 

![](https://assets-v2.circle.so/ev4m7agy1nuq2oqr1b42wd62z7qa)

To kluczowa opcja z punktu widzenia prywatności kodu. Pamiętaj jednak, że kod, który stanie się częścią Twoich konwersacji i tak trafia on do API razem z promptami. Jest on jednak przetwarzany jedynie do wygenerowania odpowiedzi i może być przechowywany na serwerach Anthropica przez 30 dni w celu wykrywania nadużyć i luk w aplikacji.

Więcej informacji o prywatność przy stosowaniu Claude Code znajdziesz [tutaj](https://docs.claude.com/en/docs/claude-code/security).

## Pierwsze zadanie z Claude Code

Zobacz jak wygląda standardowy workflow pracy z Claude Code: od problemu, przez realizację, po pull request:

[FRAGMENT VIDEO](https://player.vimeo.com/video/1122665547?app_id=122963)

### Wybór modelu

Claude Code za pomocą komendy **_/model_** pozwala wybierać między różnymi modelami z rodziny Anthropic Claude w zależności od zadania i subskrypcji. Standardowo używany jest model **Claude Sonnet 4** – najnowszy uniwersalny model wyróżniający się dużą sprawnością w kodowaniu i szybkim działaniem. 

Sonnet radzi sobie z wieloma zadaniami i ma solidne efektywne okno kontekstowe, co pozwala na komfortową pracę przy wielu zadaniach. 

Mocniejszy plan **Claude Opus 4.1** ma zwiększone zdolności planistyczne i „myśli” dłużej nad odpowiedzią, co przydaje się przy skomplikowanych problemach i planowaniu zmian. 

Warto wiedzieć, że Opus jest pięciokrotnie droższy od Sonneta, więc rozważnie gospodarujemy tym “zasobem”. Znacznie szybciej zużywa limity naszej subskrypcji lub kredyty na kluczu API. Miej również na uwadze, że dostęp do Opusa uzyskasz jedynie w subskrypcjach Max 5x i 20x lub przy pracy z kluczem API. 

Rekomendowana praktyka to **używać Sonneta do bieżącej pracy, i przełączać się na Opus na etapie planowania** zadań. Taka kombinacja zapewnia wysoką skuteczność bez szybkiego wyczerpania limitów. W tym celu skorzystaj z modelu _Opus Plan Mode_, dzięki czemu nie będziesz musiał się przełączać manualnie:

![](https://assets-v2.circle.so/pdyncm76ry8lblpc9jbbmkujifaw)

[Plan mode](https://docs.claude.com/en/docs/claude-code/common-workflows#use-plan-mode-for-safe-code-analysis) w CC sprawia, że narzędzie skupia się na działaniach planistycznych zamiast na implementacji kodu. Dopóki nie damy zielonego światła, model nie zacznie wprowadzać żadnych zmian. Aby aktywować Plan Mode należy dwukrotnie wcisnąć Shift+Tab:

![](https://assets-v2.circle.so/oi17h0jgjayt94eato6qmonbi74j)

Gdy Claude Code stworzy plan, zawsze wybieraj opcję “3\. Continue planning”. Dzięki temu zyskujemy przestrzeń na rewizję i ulepszenie planu.

![](https://assets-v2.circle.so/sjrrfnaj0i4isz80a7rrbsmt60rb)

Kiedy plan jest gotowy, przekaż dokument jako kontekst w nowej konwersacji i poproś CC o jego zaimplementowanie.

Szczegóły modelu pracy Plan→Act omawiamy w lekcji [1×6 o efektywnej pracy z AI (część 2)](https://bravecourses.circle.so/c/lekcje-10x2/sections/681379/lessons/2823743).

## Zarządzanie uprawnieniami

Claude Code implementuje warstwowy system uprawnień, który kontroluje, kiedy agent prosi o zgodę i do jakich zasobów ma dostęp. System ten opiera się na regułach _allow_/_ask_/_deny_, trybach pracy oraz zakresie katalogów, którymi można zarządzać na poziomie użytkownika (lokalnie), projektu (współdzielony plik konfiguracyjny w repo) lub zarządzać centralnie dla organizacji (plan Team/Enterprise).

Podstawowa logika jest prosta: operacje odczytu jak _Read_, _ls_ czy _grep_ nie wymagają zgody użytkownika, natomiast modyfikacje plików i wykonywanie poleceń _Bash_ już tak. Gdy zaznaczysz „Yes, don&#39;t ask again&quot; dla poleceń Bash, agent zapamięta zgodę na stałe dla danego katalogu i komendy. 

**Tryby uprawnień**

Claude Code oferuje cztery główne tryby pracy, które definiują poziom automatyzacji w podejmowaniu decyzji o uprawnieniach.

* Tryb **default** to standardowe zachowanie, gdzie agent pyta przy pierwszym użyciu każdego narzędzia. Jest to najbezpieczniejsza opcja dla początkujących użytkowników.
* Tryb **acceptEdits** automatycznie akceptuje edycje plików w danej sesji, co znacznie zmniejsza liczbę kliknięć, ale nadal wymaga potwierdzenia dla poleceń Bash.
* Tryb **plan**, czyli przedstawiony przed chwilą “Plan Mode”. Idealny gdy chcemy tylko analizować kod bez wprowadzania zmian. W tym trybie agent może tylko czytać i analizować, ale nie może wykonywać żadnych akcji modyfikujących.
* Z kolei tryb **bypassPermissions** całkowicie wyłącza wszystkie prompty o zgodę - należy go używać wyłącznie w bezpiecznym, odizolowanym środowisku.

  
Uprawnienia możemy konfigurować w następujących plikach:

**Globalne ustawienia użytkownika**

* _\~/.claude/settings.json_ \- lokalne ustawienia dla wszystkich projektów

**Ustawienia projektu**

* _.claude/settings.json_ \- ustawienia zespołowe dla projektu, commituj.
* _.claude/settings.local.json_ \- ustawienia osobiste dla projektu, nie commituj.

**Konfiguracja uprawnień bez ciągłego klikania**

Aby efektywnie pracować z Claude Code bez ciągłego potwierdzania każdej akcji, warto skonfigurować odpowiednie reguły uprawnień. Wszystkie ustawienia zapisujesz w pliku .claude/settings.json w katalogu projektu lub globalnie w \~/.claude/settings.json dla wszystkich projektów na Twoim urządzeniu.

Pierwszym krokiem jest włączenie trybu acceptEdits oraz stworzenie whitelisty bezpiecznych akcji. Możesz automatycznie zatwierdzać edycje w katalogach _src_ i _tests_, pozwolić na wykonywanie typowych poleceń jak testy czy linting, a jednocześnie zablokować dostęp do wrażliwych plików.

```
{
  &quot;permissions&quot;: {
    &quot;defaultMode&quot;: &quot;acceptEdits&quot;,
    &quot;allow&quot;: [
      &quot;Edit(src/**)&quot;,
      &quot;Edit(tests/**)&quot;,
      &quot;Write(src/**)&quot;,
      &quot;Bash(npm run test:*)&quot;,
      &quot;Bash(npm run lint)&quot;,
      &quot;Bash(git commit:*)&quot;,
      &quot;WebFetch(domain:github.com)&quot;
    ],
    &quot;ask&quot;: [
      &quot;Bash(git push:*)&quot;
    ],
    &quot;deny&quot;: [
      &quot;Read(./.env)&quot;,
      &quot;Read(./.env.*)&quot;,
      &quot;Read(./secrets/**)&quot;
    ],
    &quot;additionalDirectories&quot;: [&quot;../docs/&quot;]
  }
}
```

Warto wiedzieć, że wzorce dla poleceń Bash działają na zasadzie dopasowania prefiksowego, nie są to wyrażenia regularne czy wzorce glob. Stąd do kontroli zapytań HTTP lepiej używać _WebFetch(domain:...)_ niż próbować filtrować przez wzorce Bash.

**Bezpieczeństwo**

Bardzo istotnym aspektem konfiguracji uprawnień jest zabezpieczenie wrażliwych danych projektu przed niepożądanym włączeniem w kontekst modelu. Claude Code domyślnie może czytać wszystkie pliki z naszego projektu. Nie chcemy jednak, by np. plik .env z hasłami API czy klucze produkcyjne trafiły do prompta modelu, ponieważ naraża to nasze bezpieczeństwo (możliwe przechwycenie lub wyciek).

W pliku .claude/settings.json dodajemy wpis w sekcji permissions.deny ze wzorcami plików do wykluczenia. Poniższy przykład blokuje odczyt plików .env, wszystkiego w folderze secrets itp.:

```
{
  &quot;permissions&quot;: {
    &quot;deny&quot;: [
      &quot;Read(./.env)&quot;,
      &quot;Read(./.env.*)&quot;,
      &quot;Read(./secrets/**)&quot;,
      &quot;Read(./dist)&quot;
    ]
  }
}
```

Dzięki temu pliki pasujące do tych wzorców stają się **niedostępne** dla Claude’a – nawet jeśli o nie poprosimy, odmówi dostępu.

Więcej o zarządzaniu uprawnieniami znajdziesz w dokumentacji [Claude Code settings](https://docs.claude.com/en/docs/claude-code/settings#available-settings) oraz [Identity and Access Management](https://docs.claude.com/en/docs/claude-code/iam).

## Praca z kontekstem

Jedną z największych zalet Claude Code jest to, że **samodzielnie dba o zarządzanie kontekstem**. CLI jest uruchamiane lokalnie, dzięki czemu posiada wgląd w strukturę naszego repozytorium i może sam wyszukiwać potrzebne pliki. 

Gdy zadajemy pytanie typu: _„W którym pliku zdefiniowana jest funkcja generateReport?”_, Claude jest w stanie przeszukać kod i odpowiedzieć. Dzieje się to poprzez inteligentne przeszukiwanie projektu za pomocą narzędzi z wykorzystaniem pamięci ([CLAUDE.md](http://claude.md/) \+ bieżąca historia konwersacji). 

Jednak wielu interakcjach warto świadomie wpływać na kontekst, wskazując kluczowe pliki, dołączając specyfikację wymagań lub logi błędów, które nie są częścią kodu.

Możemy bezpośrednio powiedzieć CC, by spojrzał w określony plik. Np. _„Przejrzyj treść @src/utils/formatter.js i popraw funkcję formatDate zgodnie z nowymi wymaganiami @docs/new-requirements”_. 

Claude Code użyje wtedy narzędzia **Read(file)**, by otworzyć wskazany plik i włączy jego zawartość do kontekstu. Podobnie możemy **załączyć logi lub dokumenty**: prostym podejściem jest skopiowanie potrzebnych fragmentów do okna rozmowy. Przy bardziej zaawansowanych zadaniach lepiej jednak po prostu umieścić plik w folderze projektu i poprosić asystenta, by go przeczytał. Przykład: _„Zanalizuj plik @error\_trace.log - to log z produkcji - i powiedz, co powoduje błąd.”_ Jeżeli plik jest duży, rozsądnie jest usunąć fragmenty, które w oczywisty sposób nic nie wnoszą a jedynie zapchają nam kontekst konwersacji.

**Polecenie /context:** W trakcie dłuższej sesji warto kontrolować, jak wykorzystywany jest kontekst. Do tego służy komenda /context, która wyświetla szczegółowy **przegląd zużycia tokenów w bieżącej sesji**.

![](https://assets-v2.circle.so/c57e4bvxrwpiteyp8p2co7s6rk63)

Pokazuje ona, ile miejsca zajmują poszczególne komponenty kontekstu: wbudowane instrukcje systemowe (System prompt i tools), toole MCP (MCP tools), pamięć CLAUDE.md (Memory files) oraz zawartość aktualnej konwersacji (Messages). Nad komponentami widzimy również całościowe zużycie dostępnego okna kontekstowego (20k/200k - 10%).

**Zarządzanie kontekstem:** Gdy rozmowa z Claude Code staje się bardzo długa lub po wielu operacjach model zaczyna „zapominać” szczegóły z początku i/lub tracić zrozumienie realizowanego celu (tzw. _context rot i context drift_), warto świadomie **optymalizować kontekst** mając na uwadze poniższe zależności dotyczące zapełnienia kontekstu i pracy narzędzi opartych o LLM:

1. im mniejszy kontekst, tym większa efektywność i szybkość modelu
2. im mniejszy kontekst, tym wolniej zużywamy dostępne limity

Pierwsze polecenie, które warto znać to **_/compact_**. Podsumowuje dotychczasową rozmowę i zastępuje kontekst “Messages” podsumowaniem, zwalniając tym samym miejsce w oknie kontekstowym. Claude Code ma automatyczny mechanizm **auto-compact**, który sam wykona tę operację, gdy zbliżamy się do limitu pamięci. Jednak automatyczna kompresja może się uruchomić w losowym momencie (np. w środku realizacji zadania), co bywa niepożądane. Dlatego warto stosować /compact w kontrolowanych momentach – np. po zakończeniu pewnego etapu pracy, przed przejściem do kolejnego podzadania. 

Możemy też wskazać, co ma zostać zachowane: _&quot;/compact only keep the API design decisions and remove debug logs&quot;_ – wtedy Claude streszcza historię, pozbywając się przy tym mniej istotnych dywagacje. 

**Ważne:** warto mieć na uwadze, że **skuteczność komendy** **_/compact_** **bywa różna** \- czasem traci istotne informacje i Claude Code będzie musiał ponownie wczytać pliki, nad którymi pracował. To normalne: kompresja działa trochę jak _garbage collector_ w pamięci – czyści nieużytki, ale czasem także istotne szczegóły. Jednak co do zasady kompresja **spowalnia zapełnianie okna kontekstowego**, pozwalając pracować dłużej na wysokim poziomie efektywności. 

**Reset kontekstu (/clear):** Polecenie _/clear_ czyści całą historię bieżącej rozmowy i zaczyna od nowa (zachowując [CLAUDE.md](http://claude.md/), bo to stała pamięć projektu). To tak, jakbyśmy zakończyli sesję i rozpoczęli nową w tym samym katalogu. Claude „zapomina” więc, co zrobił, ale pozostaje w tym samym projekcie. 

Z /clear warto korzystać, gdy model zapętlił się w błędnych założeniach albo zabieramy się za zupełnie nowe zadanie i stara dyskusja nic już nie wnosi. 

## Rozszerzenia i automatyzacja pracy 

Claude Code jest pomyślany jako **agent automatyzujący zadania programistyczne**. Oprócz dialogu z modelem możemy definiować własne polecenia, skrypty i subagentów. To przenosi produktywność na kolejny poziom – często możemy jednym poleceniem załatwić całą sekwencję czynności. Oto kluczowe mechanizmy automatyzacji:

### **Custom Commands (własne komendy)**

![](https://assets-v2.circle.so/jli1jfzd9shnxa4q517qp4hm8kxv)

Podobnie jak w Cursorze, możemy uczyć Claude Code nowych poleceń poprzez utworzenie [Custom Commands](https://docs.claude.com/en/docs/claude-code/slash-commands), plików markdown w folderze _.claude/commands/_. Taki plik zawiera prompt/instrukcje, które mają być wywołane, gdy wpiszemy określone polecenie. Na przykład, chcemy szybko uruchamiać **code review** naszego kodu. Tworzymy plik .claude/commands/review.md z treścią:

```
You are an expert code reviewer:

## Review Priorities (in order):
1. **Logic errors and bugs** that could cause system failures
2. **Security vulnerabilities** and data protection issues
3. **Performance problems** that impact user experience
4. **Maintainability issues** that increase technical debt
5. **Code style and consistency** with project standards

## Review Process:
- Analyze code for business logic correctness
- Check error handling and edge case coverage
- Verify proper input validation and sanitization
- Assess impact on existing functionality
- Evaluate test coverage and quality

IMPORTANT: Only report significant issues that require action. Provide specific, actionable improvement suggestions.
```

Zapisujemy i teraz w trakcie sesji możemy wywołać po prostu komendę /project:review. Claude Code rozpozna, że to niestandardowa komenda projektu i wykona zawarty w niej prompt, np. generując raport z uwagami do nowego kodu. 

Komendy mogą być:

* **projektowe** (/project:nazwa) – zapisane lokalnie i współdzielone z zespołem w repo
* **globalne** (/user:nazwa) – zapisane w \~/.claude/commands/, dostępne we wszystkich projektach.

Custom commands to de facto **aliasy na prompty** – oszczędzają czas i zapewniają powtarzalność - warto dzielić się nimi z zespołem.

### **Hooks (automatyczne akcje)**

![](https://assets-v2.circle.so/ij3l3m6gj8p4jr99w9rj9sbkvw8q)

[_Hooks_](https://docs.claude.com/en/docs/claude-code/hooks-guide) to mechanizm wywoływania skryptów przed lub po wybranych zdarzeniach w Claude Code. Pozwalają one np. automatycznie uruchomić jakąś komendę po zakończeniu edycji pliku, lub zakończeniu pracy. Przykładowo, możemy ustawić **hook Stop** i wywołać powiadomienie w MacOS za pomocą [terminal-notifier](https://github.com/julienXX/terminal-notifier).

```
&quot;hooks&quot;: {
    &quot;Stop&quot;: [
      {
        &quot;matcher&quot;: &quot;&quot;,
        &quot;hooks&quot;: [
          {
            &quot;type&quot;: &quot;command&quot;,
            &quot;command&quot;: &quot;terminal-notifier -message \&quot;Claude Code Finished\&quot; -sound default&quot;
          }
        ]
      }
    ],
}
```

Dzięki temu dowiemy się, że Claude Code zakończył realizację zadania. Przydatne gdy na kilka minut zajmiemy się czymś innym.

Claude Code oferuje różne hooki, które mozesz skonfigurować na wiele sposobów w zależności od potrzeb. Poniżej kilka pomysłów: 

* **Walidacja bezpieczeństwa** (UserPromptSubmit) - Automatyczne blokowanie promptów z hasłami/kluczami API
* **Auto-formatowanie kodu** (PostToolUse) - Prettier, black, gofmt uruchamiane po zapisie pliku
* **Audit trail** (PostToolUse) - Logowanie wszystkich operacji MCP do pliku audytu z timestampami

Więcej inspiracji i sposobów dostosowania hooków do własnych potrzeb znajdziesz w dokumentacji [Get started with Claude Code hooks](https://docs.claude.com/en/docs/claude-code/hooks-guide) oraz [Hooks reference](https://docs.claude.com/en/docs/claude-code/hooks).

### **Subagenci**

![](https://assets-v2.circle.so/iu9k9ra0fvsqwe8eluf7sx12ehvm)

[Subagenci](https://docs.claude.com/en/docs/claude-code/sub-agents) to wyspecjalizowane instancje AI w Claude Code z własnym kontekstem i konfiguracją narzędzi. Definiujemy ich w plikach Markdown z nagłówkiem frontmatter, zgodnie z poniższym formatem:

```
---
name: your-sub-agent-name
description: Description of when this subagent should be invoked
tools: tool1, tool2, tool3  # Optional - inherits all tools if omitted
model: sonnet  # Optional - specify model alias or &#39;inherit&#39;
---

Your subagent&#39;s system prompt goes here. This can be multiple paragraphs
and should clearly define the subagent&#39;s role, capabilities, and approach
to solving problems.

Include specific instructions, best practices, and any constraints
the subagent should follow.
```

Podobnie jak w przypadku custom commands, możemy definiować subagentów w dwóch lokalizacjach:

* _.claude/agents/_ \- agenci zdefiniowani w ramach projektu
* \~/.claude/agents/ - globalni agenci użytkownika dostępni we wszystkich projektach

Subagentów możesz definiować ręcznie poprzez utworzenie pliku lub przez interfejs komendy /agents.

W ostatecznym rozrachunku to Claude Code podejmuje decyzję czy wydelegować zadanie do subagenta. Decyzję podejmuje na podstawie:

* Treści otrzymanego prompta (gdzie możemy poprosić o wykorzystanie subagenta)
* Pola _description_ w konfiguracji subagenta

Jeżeli nie chcesz, aby subagent był wywoływany automatycznie przez Claude Code bez Twojej prośby, warto w polu description zawrzeć frazę “Never use this subagent proactively, unless I reference its name in the prompt”.

Subagenci to funkcja eksperymentalna, która ma istotne ograniczenia:

* **Delegacja jest heurystyczna, nie deterministyczna.** Claude wybiera subagenta „na czuja” na podstawie opisu i kontekstu; jeśli definicje są mało precyzyjne, może uruchomić nie tego agenta albo wcale.
* **Izolacja kontekstu** \- subagent nie ma dostępu do historii głównej rozmowy, tylko do aktualnego zadania.
* **Start „na czysto” zwiększa czas oczekiwania.** Subagent przy każdym wywołaniu zaczyna z pustym kontekstem, co zauważalnie podnosi czas realizacji zadań.
* **Wysokie zużycie tokenów = wyższe koszty.** Samo zbieranie kontekstu zjada czas i tokeny; uruchomienie kilku subagentów potrafi „wypalić” budżet szybciej niż praca jednego agenta.

Mając to na uwadze, testuj subagentów bez większych oczekiwań a większość zadań pozostaw do realizacji głównemu agentowi Claude Code.

### Claude Code SDK

![](https://assets-v2.circle.so/baz8o8euimw5vbppyh17im8o42hh)

Claude Code to nie tylko narzędzie terminala - Anthropic udostępnia także [Claude Code SDK](https://docs.claude.com/en/docs/claude-code/sdk/sdk-overview), które pozwala programistom budować własnych agentów AI wykorzystujących te same możliwości. SDK jest zbudowany na tej samej podstawie co Claude Code i oferuje wszystkie jego funkcjonalności w formie interfejsu programistycznego.

SDK dostępne jest w trzech wersjach dostosowanych do różnych przypadków użycia:

* Headless Mode idealnie nadaje się do skryptów CLI i automatyzacji,
* TypeScript SDK wspiera aplikacje Node.js i webowe,
* Python SDK sprawdza się w aplikacjach Pythonowych i data science.

Wszystkie warianty oferują te same zaawansowane funkcje co sam Claude Code: automatyczne zarządzanie kontekstem, bogaty ekosystem narzędzi z obsługą MCP, precyzyjne uprawnienia dla agentów oraz produkcyjne funkcje jak obsługa błędów i monitoring.

Możliwości stosowania SDK są szerokie - od agentów przeprowadzających code review i audyty bezpieczeństwa, przez asystentów SRE diagnozujących problemy produkcyjne, po narzędzia biznesowe analizujące raporty finansowe czy wspomagające obsługę klienta. 

W kontekście naszego szkolenia, SDK okaże się szczególnie przydatne w późniejszych modułach, gdzie będziemy automatyzować procesy CI/CD i implementować system wstępnego code review w pipeline&#39;ach GitHub Actions.

Na razie wystarczy wiedzieć, że taka możliwość istnieje. Szczegóły przedstawimy w lekcjach o CI/CD.

## Najlepsze praktyki pracy z Claude Code

Najważniejszą regułą jest regularne czyszczenie kontekstu komendą /clear po zakończeniu każdego etapu pracy. W przeciwnym razie model niepotrzebnie przetwarza stare informacje, co zużywa tokeny. Równie istotne jest utrzymywanie dobrze napisanego CLAUDE.md zamiast ciągłego karmienia modelu tymi samymi informacjami.

Zamiast 10 osobnych promptów o plikach, lepiej raz poprosić: &quot;Przeanalizuj następujące 10 plików pod kątem X&quot;. Model zużyje więcej tokenów jednorazowo, ale zaoszczędzimy na wielokrotnym overheadzie niejawnego kontekstu systemowego. 

Kluczową umiejętnością jest rozbijanie problemów na odpowiednio małe części. Czasami doświadczysz, że Claude próbując zrobić dwa podobne zadania jednocześnie, polegnie po długiej walce, ale gdy podzielisz zadanie na dwa osobne PR-y, każdy pójdzie gładko w 10 minut.

Najlepszym sygnałem do podziału jest kręcenie się w kółko na zasadzie &quot;to dobry początek, ale nie działa dla X i Y...&quot;. Wtedy lepiej skupić się najpierw na X, potem na Y. Zamiast &quot;zaimplementuj kompletny system obsługi kont&quot; powiedz &quot;zaimplementuj logowanie&quot;, potem osobno &quot;dodaj rejestrację&quot; itd. Oby dwa z tych zadań są złożone, i takie prompty to za mało - musimy przygotować solidny plan, o czym będzie w dalszej części szkolenia.

Czasem CC może się zawiesić lub bardzo długo mielić jedno zadanie. Gdy narzędzie zawiesza się, użyj Ctrl+C i napisz modelowi: &quot;zakończono z mojej inicjatywy, kontynuuj&quot;. 

Gdy obserwujesz pracę Claude Code i widzisz, że idzie ona w złym kierunku - skorzystaj z klawisza Esc, która przerwie jego działanie - następnie wprowadź koretkę kursu za pomocą prompta wyjaśniającego naturę pomyłki agenta i co powinien zrobić zamiast tego.

## Routing do innych modeli i usług

![](https://assets-v2.circle.so/bf75sfxpswgiztzay6i2fesbha45)

Claude Code jest narzędziem mocno zintegrowanym z modelami Anthropic (Claude Sonnet/Opus), ale społeczność szybko odkryła, że można wykorzystać CC do obsługi innych modeli. 

Powstały narzędzia działające w charakterze proxy, które pozwala podmienić model w tle. Pomysł polega na tym, by oszukać Claude Code, że rozmawia z API Anthropic, podczas gdy zapytania kierowane są np. do modelu OpenAI czy xAI. W ten sposób możemy cieszyć się wygodą Claude Code używając zupełnie innego LLM na back-endzie. 

Istnieją projekty open-source, które to na to pozwalają - najpopularniejszym z nich jest [_claude-code-router_](https://github.com/musistudio/claude-code-router)_,_ który pozwala skonfigurować różne modele przez OpenRouter i inne usługi. 

OpenRouter oferuje zunifikowany endpoint API dla wielu modeli (OpenAI, xAI, Anthropic), wystarczy w konfiguracji wskazać nazwę modelu (np. gpt-5-high, grok-4-fast czy gemini-2.5-pro) - i reszta dzieje się automatycznie:

```
  {
      &quot;name&quot;: &quot;openrouter&quot;,
      &quot;api_base_url&quot;: &quot;https://openrouter.ai/api/v1/chat/completions&quot;,
      &quot;api_key&quot;: &quot;sk-xxx&quot;,
      &quot;models&quot;: [
        &quot;google/gemini-2.5-pro&quot;,
        &quot;x-ai/grok-4-fast&quot;,
        &quot;openai/gpt-5&quot;
      ],
      &quot;transformer&quot;: {
        &quot;use&quot;: [&quot;openrouter&quot;]
      }
    },
```

Oczywiście pewne funkcje specyficzne dla Claude mogą działać różnie w innych modelach, ale GPT-5, Gemini czy Grok wpięte w Claude Code radzą sobie świetnie, często zaskakując skutecznością. 

Jeśli więc mamy specyficzne potrzeby – np. potrzebujemy dużego okna kontekstowego Gemini (Google) lub chcemy porównać skuteczność różnych modeli w naszym projekcie - **Claude Code Router** daje nam tę elastyczność.

## Alternatywy: Codex CLI, Gemini CLI i OpenCode

Rynek rozwiązań AI w terminalu rozwija się dynamicznie. Poza Claude Code istnieją konkurencyjne usługi, które gonią lidera rynku. Przyjrzyjmy się trzem ważnym alternatywom, ich mocnym stronom i ograniczeniom, oraz kiedy warto po nie sięgnąć.

### **Codex CLI (OpenAI)**

![](https://assets-v2.circle.so/2g0eyztvc6fieh7b1ae3eeuos8av)

[Codex CLI ](https://github.com/openai/codex)jest napisany w **Rust** i dostępny na licencji **Apache-2.0**. Domyślnie używa **GPT-5** i **GPT-5-Codex**, oferując świetne możliwości multimodalne. 

W przeciwieństwie do Claude Code, Codex CLI jest w pełni open-source, co pozwala na pełną kontrolę nad narzędziem i jego modyfikację.

Codex CLI koncentruje się na **szybkości i automatyzacji**. Pozwala na bardzo szybkie wykonywanie zadań (mediana spadła z 48 do 5 sekund po aktualizacjach we wrześniu 2025). Claude Code preferuje **głębię rozumowania** i lepszą jakość kodu, ale za cenę większego zużycia tokenów (3-5x więcej na zadanie).

Codex CLI sprawdza się doskonale w scenariuszach wymagających szybkiego prototypowania, automatyzacji CI/CD, pracy nad UI na podstawie mockup&#39;ów. Jego multimodalne możliwości i token-efficiency czynią go idealnym dla start-up&#39;ów.

**Kiedy warto użyć Codex CLI?**

* **Koszt-efektywność dla zespołów** \- wliczony w subskrypcje ChatGPT lub tańszy w użyciu API ($1.25/1M tokenów vs $15/1M w Claude)
* **Multimodalne projektowanie UI** \- może analizować zrzuty ekranu, diagramy i mockup&#39;y bezpośrednio w CLI, tworząc kod na podstawie materiałów wizualnych
* **Szybkie iteracje** \- mediana 5 sekund na zadanie po aktualizacjach, znacząco szybsze niż Claude Code przy podobnych zadaniach

  
### **Gemini CLI (Google)**

![](https://assets-v2.circle.so/2ibnhqj7ryx1sxp3z7zxvqkhk11f)

[Gemini CLI](https://github.com/google-gemini/gemini-cli) to stosunkowo nowy gracz na rynku CLI (ogłoszony w czerwcu 2025),którywykorzystuje modele Gemini 2.5 Pro i Flash. Google zaprojektowało go jako odpowiedź na Claude Code, kładąc nacisk na **multimodalność i integrację ze swoim ekosystemem**. 

Jego największą zaletą jest **imponujący darmowy plan**: _do 1000 żądań dziennie_ (60 na minutę) bez opłat! W praktyce oznacza to, że indywidualny deweloper może korzystać bardzo intensywnie z AI, nie wydając ani centa – to coś, czego konkurencja (Anthropic/OpenAI) nie oferuje na taką skalę. 

Co więcej, Gemini 2.5 Pro ma **kontekst 1 miliona tokenów**, co stawia go w czołówce pod względem efektywnej pamięci modelu. 

Modele Google są multimodalne - potrafią przetwarzać nie tylko tekst, ale i obrazy - dzięki czemu Gemini CLI może np. analizować screenshoty czy diagram_y_. W praktyce oznacza to, że możemy mu przekazać zrzut ekranu z aplikacji czy stacktrace w formie obrazka, a on go zinterpretuje. To przewaga w pracy z frontendem - możemy zrobić screenshot błędu na stronie i poprosić AI o diagnozę. 

Oczywiście są też ograniczenia: obecnie Gemini CLI wymaga logowania Google (co może być minusem w kontekście prywatności - choć Google zapewnia, że nie używa danych bez pozwolenia, to jednak wiemy, że dane są zbierane). Imponujący plan darmowe może też w przyszłości ulec zmianie. Pamiętajmy również o mniejszej dojrzałości ekosystemu - Claude Code ma już mnóstwo pluginów i społeczność.

**Kiedy warto użyć Gemini CLI?** 

* Gdy kluczowy jest budżet: na darmowym planie można zrobić naprawdę dużo, więc dla niezależnego programisty to świetna opcja.
* Już pracujesz w ekosystemie Google i masz już subskrypcję Gemini Code Assist.
* Jeśli potrzebujemy **analizy multimodalnej lub webowej** \- np. diagnoza błędu zrzutu ekranu, poszukiwanie świeżych informacji - Gemini świetnie sobie z tym radzi.

  
### **OpenCode (sst/opencode)**

![](https://assets-v2.circle.so/a66wc6w9nfsh8bqpwkolu5uulw3s)

Jeśli szukasz rozwiązania, które nie uzależnia od jednego dostawcy AI, warto przyjrzeć się [**OpenCode**](https://opencode.ai/). To w pełni opensource’owe rozwiązanei, napisane w Go i TypeScript. 

Jego główna filozofia to **provider-agnostic** \- oznacza to, że nie jesteś przywiązany do Anthropic, OpenAI czy Google. Możesz podłączyć OpenCode do dowolnego z tych dostawców, a nawet do lokalnych modeli przez API takich jak Ollama czy inne frameworki. Dzięki takiemu podejściu unikasz vendor lock-in. To fajna przewaga w czasach, gdy rynek AI rozwija się tak dynamicznie i trudno przewidzieć, który dostawca będzie liderem za rok czy dwa.

Funkcjonalnie OpenCode oferuje podobne możliwości co Claude Code - czyta kod, edytuje pliki, uruchamia polecenia, planuje zadania. Jako projekt open-source rośnie dynamicznie, a społeczność regularnie dodaje nowe pluginy i integracje. 

Istotną zaletę OpenCode jest możliwość **samodzielnego hostowania i modyfikowania** \- idealne rozwiązanie dla firm, które nie chcą wysyłać swojego kodu do zewnętrznych usług. Możesz na przykład postawić OpenCode na własnym serwerze z lokalnym dużym modelem i mieć własnego agenta AI.

OpenCode wspiera ponad 75 modeli i serwisów AI, co robi wrażenie jak na stosunkowo młody projekt. Użytkownicy chwalą łatwość przesiadki - wszystko jest podobne do Claude Code, działa z istniejącymi kluczami API.

Brak dedykowanego wsparcia oznacza, że twórcy starają się nadążać za zmianami API różnych firm, ale zawsze może coś się zmienić. Taka jest jednak cena za wolność i kontrolę.

**Kiedy warto użyć OpenCode?**

* **Unikanie vendor lock-in** \- gdy nie chcesz uzależniać się od jednej firmy AI i wolisz mieć wybór między różnymi modelami
* **Prywatność i bezpieczeństwo** \- możesz hostować rozwiązanie lokalnie, odciąć telemetrię i sam decydować, co model widzi
* **Eksperymenty z nowymi modelami** \- łatwe testowanie najnowszych rozwiązań AI bez zmiany całego workflow

## 🤔 Z jakiego AI w CLI korzystać?

Na zakończenie porównania warto zaznaczyć: **nie ma jednego „najlepszego” rozwiązania dla wszystkich**. Claude Code wyróżnia się wygodą i dojrzałością, Gemini kusi szczodrym darmowym planem, Codex CLI wyróżnia się szybkością i efektywnością kosztową a OpenCode daje wolność od vendor lock-in. Wybór zależy od kontekstu: korporacja z restrykcjami może postawić na OpenCode z własnym modelem (żeby kod nie opuszczał firmy), indywidualny dev może najpierw spróbować Gemini (bo darmowe), a kiedy złapie zajawkę – sięgnie po Claude Code lub Codex CLI.

Dobrze, że mamy te opcje – konkurencja sprawia, że każdy z tych projektów szybko się rozwija, na czym korzystamy my, programiści. 

## 📚 Materiały dodatkowe

1. [Dokumentacja Claude Code](https://docs.claude.com/en/docs/claude-code/overview) \- jest ona bardzo rozbudowana, co jest jej silną i słabą stroną. Znajdziecie tam wszystkie informacje potrzebne do efektywnej pracy z tym narzędziem, ale łatwo się pogubić. Stąd w powyższej lekcji przygotowaliśmy dla Was odnośniki do najważniejszych stron opisujących omawiane funkcje i zagadnienia.
2. [**Awesome Claude Code**](https://github.com/hesreallyhim/awesome-claude-code) \- największa, stale aktualizowana „lista wszystkiego” do Claude Code: kategoria Slash-Commands z linkami do wielu repo, plus narzędzia, hooki, output-styles itd. Dobre jako radar trendów i nowych komend.
3. [**SuperClaude Framework (v4)**](https://github.com/SuperClaude-Org/SuperClaude%5FFramework) – zawiera ok. 25 komend pokrywających pełny cykl (od brainstormu po deploy) i sporo integracji MCP. Jeśli chcesz gotowy zestaw komend w stylu 10xDevs i spójny styl pracy, warto sprawdzić.
4. [**Claude Code Templates**](https://github.com/davila7/claude-code-templates)\- narzędzie CLI z katalogiem agentów i komend do przeglądania/instalacji (npx claude-code-templates@latest …). Dzięki UI rozwiązanie jest wygodne i łatwe w użyciu.
5. [**Claude-Command-Suite**](https://github.com/qdhenry/Claude-Command-Suite)\- duża, dobrze opisana paczka: \~150+ komend posortowanych w przestrzenie nazw (/dev:\*, /project:\*, /security:\* itd.) + kilkadziesiąt agentów i gotowe workflowy (code review, testy, security, release). Szybka instalacja pojedynczych komend przez curl do .claude/commands/. Świetne na start.
6. [**feiskyer/claude-code-settings**](https://github.com/feiskyer/claude-code-settings) \- zestaw ustawień, sub-agentów i własnych komend (np. workflow „Kiro”: /kiro:spec, /kiro:design, /kiro:execute) + integracje GitHub. Dobre jako lekka baza konfiguracji użytkownika z praktycznymi przykładami komend.
7. [**ian nuttall/claude-sessions**](https://github.com/iannuttall/claude-sessions) \- wąski, ale praktyczny zestaw komend do **zarządzania sesjami** (start/update/end/list) pod prefiksem /project:session-\*. Idealne, jeśli zależy Ci na ciągłości pracy i dokumentowaniu postępów.

##   
🧑🏻‍💻 Zadania praktyczne

Claude Code i inne narzędzia AI w terminalu pokazują swoją prawdziwą siłę przy większych, konkretnych zadaniach programistycznych. 

Takie zadania czekają na Was w ramach projektu zaliczeniowego, przez którego realizację przejdziemy w module 2 (Bootstrap) i module 3 (Going live on prod). To właśnie tam, gdy będziecie implementować logikę, konfigurować bazy danych, pisać testy i setupować CI/CD, będzie świetna okazja, aby uczynić przetestować te narzędzie w boju.

Te rzeczywiste scenariusze projektowe pokażą Wam, jak Claude Code radzi sobie z kontekstem całego projektu, jak pomaga w refaktoryzacji większych fragmentów kodu i jak wspiera w debugowaniu nieoczywistych problemów. 

## **🏁 Podsumowanie lekcji**

AI w terminalu to już nie ciekawostka, a jedno z kluczowych narzędzi dla 10xDevów, którzy chcą wycisnąć 100% możliwości z AI. 

Nauczyliśmy się dziś, jak korzystać z Claude Code oraz poznaliśmy alternatywy warte rozważenia. 

Mamy nadzieję, że ta lekcja dostarczyła Wam merytorycznej wiedzy, by pewnie korzystać z AI w terminalu, niezależnie od wybranego narzędzia. Powodzenia w dalszym eksplorowaniu możliwości AI!

---

![](https://assets-v2.circle.so/ekrtcr8j44qd531ut1i2iwox5c9h)