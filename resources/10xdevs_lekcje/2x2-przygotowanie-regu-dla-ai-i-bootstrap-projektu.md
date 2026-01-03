<!DOCTYPE html>![](https://assets-v2.circle.so/oe4qosa4528bmgd6hum1bwxw66fy)

## Wprowadzenie

Sztuczna inteligencja zmienia sposób, w jaki pracujemy jako programiści, ale jej skuteczność zależy w dużej mierze od tego, jak dopasujemy ją do potrzeb naszego projektu. W tej lekcji skupimy się na odpowiednim przygotowaniu środowiska projektowego oraz stworzeniu reguł dla AI, które znacząco podniosą jakość generowanego kodu.

Dlaczego to takie ważne? Nawet najlepsze modele językowe, jak Claude Sonnet, mogą generować kod niedostosowany do konkretnych wymagań projektu, używać nieaktualnych wzorców albo być niespójne ze standardami przyjętymi w zespole. Problem ten jest szczególnie widoczny, gdy pracujemy z nowymi wersjami frameworków (np. Angular 19, Svelte), wydanymi już po dacie knowledge cutoff dla danego modelu AI (obecnie standardem knowledge cutoff jest końcówka 2024, początek 2025 roku).

W ramach tej lekcji nauczysz się:

* Skonfigurować lintery i narzędzia statycznej analizy kodu wspierające pracę z AI
* Tworzyć efektywne Rules for AI dostosowane do różnych edytorów
* Aktualizować dokumentację projektu wraz z wprowadzaniem zmian i rozszerzeń

Zaczynajmy!

## Generowanie szkieletu aplikacji

![](https://assets-v2.circle.so/6cx0sd0fxvfcsocwqs1q8u2e0o36)

Czy kiedykolwiek próbowałeś poprosić AI o wygenerowanie całego projektu od zera? Jeśli tak, to zapewne zauważyłeś problemy: niekompletne pliki, nieaktualne zależności, błędy w konfiguracji. 

**Dlaczego (na dzisiaj) nie warto generować projektu od zera z AI**

Generowanie całego projektu od podstaw przy użyciu AI to ryzykowne podejście z kilku powodów:

* **Niespójność struktury** \- AI może pominąć istotne pliki konfiguracyjne i zastosować suboptymalną strukturę folderów/plików
* **Nieaktualne zależności** \- LLMy mogą proponować przestarzałe, lecz popularne wersje bibliotek
* **Trudności w debugowaniu** \- wiele problemów może ujawnić się dopiero w trakcie pracy

Stąd warto skorzystać z oficjalnych narzędzi do bootstrapowania projektów, a modele wykorzystywać do rozbudowy i dostosowania istniejącego szkieletu.

### Dwie ścieżki do wyboru

Dla uczestników 10xDevs przewidujemy dwie ścieżki rozwijania projektów:

* **z supportem mentorów**, gdzie wykorzystujemy stack _Astro+React+TypeScript_
* **autorską**, gdzie stack dobierasz samemu (z oczywistych powodów nasz support jest tutaj ograniczony - nie możemy być ekspertami od każdej technologii na rynku)

W przypadku pierwszego scenariusza, gdzie oferujemy pełne wsparcie supportowe, optymalną konfigurację środowiska zapewni ci szablon repozytorium o nazwie **10x-Astro-Starter.** Rozwinięcie projektu w oparciu o nasze konwencje znajdziesz poniżej.

W przypadku ścieżki autorskiej, bootstrap powinieneś oprzeć o sprawdzone w danym community narzędzia CLI lub pluginy, które przygotowują dla ciebie repozytorium, np.:

* .NET CLI (&lt;https://learn.microsoft.com/en-us/dotnet/core/tools/&gt;)
* Spring Boot Starter (&lt;https://start.spring.io/&gt;)
* Django Starter (&lt;https://docs.djangoproject.com/en/5.2/topics/install/&gt;)

**Pierwsze kroki z szablonem 10x-Astro-Starter**

Aby ułatwić ci start z rekomendowanymi przez nas technologiami, przygotowaliśmy szablon zoptymalizowany pod współpracę z AI. Obejrzyj poniższy film aby zapoznać się ze stosem technologicznym projektu i - jeśli budujesz projekt w tych samych technologiach - sklonować szablon na swój dysk.

&gt; 👉 Pierwsze kroki z repozytorium **10x-Astro-Starter** prezentowaliśmy jeszcze na etapie preworku. Jeśli pominąłeś ten fragment, to teraz jest najlepsza pora aby do niego wrócić. 

[FRAGMENT VIDEO](https://player.vimeo.com/video/1118322850?app_id=122963)

**👉 Dla użytkowników Windowsa:** Jeśli przy uruchomieniu projektu napotkasz wiadomości błędów z narzędzia rollup (_Cannot find module @rollup/rollup-win32-x64_), usuń plik package-lock.json, folder node\_modules i raz jeszcze wykonaj polecenie **npm install**. Upewnij się również, że pracujesz z Node 22\. W najnowszej wersji projektu 10x-astro-starter błąd nie powinien już występować.

### Konfiguracja ręczna w stacku Astro + React + TypeScript

Jeśli z jakiegoś powodu nie chcesz korzystać z naszego startera, do utworzenia projektu możesz wykorzystać oficjalne CLI Astro wraz z niezbędnymi pluginami.

Dla projektów bazujących na Astro, React i TypeScript, proces jest opisany w [dokumentacji Astro](https://docs.astro.build/en/install-and-setup/):

![](https://assets-v2.circle.so/bsdljnqgl0kf3w53bqly7xt0rw2v)

Przed rozpoczęciem pracy z projektem, należy również zadbać o odpowiednią wersję Node.js. W pliku _.nvmrc_ (dla użytkowników [nvm](https://github.com/nvm-sh/nvm)) ustawimy wymaganą wersję 22, która jest obecnie oznaczona jako LTS.

Realizując ten krok bez delegowania zadania do AI **zachowasz kontrolę nad efektem finalnym** \- dzięki temu masz pewność, że struktura projektu jest zgodna z najnowszymi standardami, a wprowadzone zależności są aktualne i faktycznie dostosowane do twoich potrzeb. 

To jeden z przypadków, w których odstawienie modeli jest rozsądnym podejściem, które będzie procentowało przez całe życie projektu.

## Środowisko przyjazne AI

Wstępne założenia co do środowiska zoptymalizowanego pod AI przedstawiliśmy w lekcji [#\[0x6\] Full-Stack Environment dla 10xDeva](https://bravecourses.circle.so/c/lekcje-10x2/sections/681279/lessons/2580562) \- teraz pogłębimy wybrane rekomendacje, które w praktyce wdrożyliśmy w naszym szablonie projektu.

### Statyczna analiza kodu i jej wpływ na pracę modeli

Lintery i formattery to narzędzia do statycznej analizy kodu, które pomagają wykrywać błędy, niespójności i potencjalne problemy w projekcie. W ekosystemie JavaScript/TypeScript najpopularniejszymi rozwiązaniami są [ESLint](https://eslint.org/) oraz [Prettier](https://prettier.io/).

Agenci AI, których znajdziesz w topowych rozwiązaniach takich jak Cursor, Windsurf czy Claude Code, wykorzystują informacje o błędach i ostrzeżeniach zwracanych przez te narzędzia, aby w czasie rzeczywistym wprowadzać poprawki do wygenerowanego kodu.

**Wyzwania z konfiguracją ESLint**

Konfiguracja ESLint dla projektu łączącego Astro, React i TypeScript jest czasochłonna i frustrująca - ekosystem ESlint przechodził na przestrzeni ostatnich lat duże zmiany (nowy format konfiguracji) i opiera się na współpracy wielu zależności. 

Modele mają ograniczoną skuteczność we wspieraniu nas przy tego typu zadaniach. Dlaczego? Poprawna konfiguracja ESLint łącząca Astro, React i TypeScript nie jest szeroko opisana w internecie, a większość źródeł nt. ESLint bazuje na starym formacie konfiguracji i nieaktualnych wersjach zależności. 

Oczywiście za pomocą wyspecjalizowanych promptów moglibyśmy sobie poradzić z tym problemem, tylko warto zadać sobie pytanie: po co? Konfiguracja linterów od zera to wyzwanie, które występuje jednorazowo przy bootstrapie projektu i nie jest kluczowe dla sukcesu biznesowego projektu.

W takich przypadkach, jak za starych dobrych czasów, lepiej skorzystać z dokumentacji i doświadczenia kolegów po fachu prosto z Github Issues:

* [Dokumentacja eslint-plugin-astro](https://ota-meshi.github.io/eslint-plugin-astro/user-guide/)
* [Jak skonfigurować Astro + React + TypeScript](https://github.com/ota-meshi/eslint-plugin-astro/issues/388)[ w ESLint (Github Issue)](https://github.com/ota-meshi/eslint-plugin-astro/issues/388)

Nie chcesz poświęcać na to czasu? Nie ma problemu, możesz skorzystać z naszego startera [10x-astro-starter](https://github.com/przeprogramowani/10x-astro-starter), który dostarcza gotowy szkielet z Astro, Reactem, Tailwindem oraz TypeScriptem w połączeniu z działającą konfiguracją ESLint, Prettier, [husky](https://github.com/typicode/husky) oraz [lint-staged](https://github.com/lint-staged/lint-staged).

## **Reguły dla AI, czyli personalizacja modeli**

Samo posiadanie dobrze skonfigurowanych linterów to dopiero początek. Prawdziwy potencjał współpracy z asystentami AI realizuje się, gdy dostosujemy modele do specyficznych wymagań naszego projektu za pomocą “Rules for AI”.

**Dlaczego personalizacja AI jest niezbędna?**

Modele językowe, nawet te najbardziej zaawansowane, mają swoje ograniczenia. Zostały wytrenowane na ogólnodostępnych danych, które mogą nie być dostosowane do konwencji i praktyk, na których zależy nam w projekcie. Problem staje się szczególnie widoczny, gdy:

1. Pracujesz z technologiami, które zostały wydane lub znacząco zaktualizowane po dacie knowledge cut-off modelu
2. Twój zespół stosuje niestandardowe konwencje nazewnictwa lub architektury
3. Projekt wymaga specyficznego podejścia do testowania, logowania czy obsługi błędów

Bez odpowiednich wytycznych, nawet najlepszy model AI może generować kod, który wymaga znaczących poprawek, co może niwelować korzyści płynące z jego wykorzystania.

**Problemy kodu generowanego bez Rules for AI**

Zanim przejdziemy do tworzenia reguł, zobaczmy przykładowy kod, który możemy otrzymać z modelu bez konfiguracji odpowiednich reguł. Dla stacku z Astro, React, TypeScript i Tailwind, może to wyglądać następująco:

```
// Przykładowy kod wygenerowany bez Rules for AI
class FlashcardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false,
      question: this.props.question,
      answer: this.props.answer
    };
  }

  componentWillMount() {
    console.log(&#39;Component will mount&#39;);
  }

  flipCard() {
    this.setState({ isFlipped: !this.state.isFlipped });
  }

  render() {
    return (
      &lt;div className=&quot;flashcard-container&quot; onClick={() =&gt; this.flipCard()}&gt;
        &lt;div className={this.state.isFlipped ? &#39;hidden&#39; : &#39;&#39;}&gt;
          &lt;h3&gt;{this.state.question}&lt;/h3&gt;
        &lt;/div&gt;
        &lt;div className={!this.state.isFlipped ? &#39;hidden&#39; : &#39;&#39;}&gt;
          &lt;p&gt;{this.state.answer}&lt;/p&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    );
  }
}
```

Powyższy kod ma liczne problemy. Wykorzystuje komponent klasowy zamiast funkcyjnego, stosuje przestarzałe metody cyklu życia (componentWillMount), brakuje również statycznego typowania (TypeScript) i klas Tailwind CSS do stylowania.

**Co zyskasz dzięki personalizacji?**

* **Lepsza integracja**  \- modele lepiej zrozumieją strukturę i filozofię Twojego projektu
* **Spójność kodu** \- LLMy będą generowały rozwiązania bardziej zgodne z konwencjami i stackiem stosowanym w projekcie
* **Wyższą jakość** \- uwzględnienie specyficznych wymagań dotyczących jakości, bezpieczeństwa, wydajności czy testowania
* **Oszczędność czasu** \- mniej poprawek i refaktoryzacji wygenerowanego kodu

To istotne korzyści, stąd warto poznać mechanizmy personalizacji oferowane w wykorzystywanym przez Ciebie edytorze. 

## Reguły dla AI na przykładzie Cursora

Opcje personalizacji Cursora znajdziesz w ustawieniach, w sekcji “Rules &amp; Memories” - mamy tutaj dostępnych kilka warstw dostosowywania narzędzia do naszych potrzeb:

* User Rules - globalne reguły dołączane do każdego projektu
* Project Rules - lokalny reguły rozwijane na poziomie projektu
* Memories - automatycznie tworzone notatki na temat twoich preferencji
* Zewnętrzne formaty - obecnie wsparcie dla [CLAUDE.md](http://claude.md/) oraz [AGENTS.md](http://agents.md/)

  
![](https://assets-v2.circle.so/rahhvses8gejoi8ib2oy7vxb6q92)

Poszczególne typy reguł można wykorzystać w następującym kontekście:

* **User Rules** \- preferencje użytkownika co do języka komunikacji z AI, stylu odpowiedzi, etc.:  
   * “Odpowiadaj wyłącznie w języku polskim, w bezpośredni sposób”  
   * “Unikaj bezpośrednich odpowiedzi - zawsze pytaj o niuanse i wykrywaj sprzeczności”
* **Project Rules** \- konwencje projektowo-zespołowe, wersje technologii, stosowane wzorce:  
   * “Tworząc komponenty Reacta zawsze stosuj tzw. _Rules of Hooks”_  
   * “Rozwijaj style w oparciu o Tailwind - nie twórz dedykowanych plików CSS”  
   * “Powtarzalne fragmenty logiki API przenoś do warstwy middleware”
* **Memories** \- tworzone automatycznie, opcje konfiguracji sprowadzają się do “Włącz / Wyłącz”  
   * “Po zakończonej implementacji testy nie powinny być uruchamiane automatycznie”
* [**CLAUDE.md**](http://claude.md/) **/** [**AGENTS.md**](http://agents.md/) \- uproszczone pliki Markdown, dające Agentom podstawowy wgląd w strukturę projektu, ogólne konwencje i praktyki rozwijania kodu

Dodatkowo, na planach Team i Enterprise administratorzy organizacji mogą definiować zespołowe instrukcje, które będą automatycznie wczytywane do edytorów wszystkich członków zespołu. 

Zarządzanie regułami odbywa się z poziomu panelu Admina na stronie Cursor.com:

![](https://assets-v2.circle.so/osawygjs7z2eblggtbskfrb9breg)

Z punktu widzenia indywidualnych kontrybutorów do projektu, najbardziej istotne będą reguły utrzymywane na poziomie projektu, w katalogu **.cursor/rules/{rule}.mdc**. Mogę one działać w jednym z czterech trybów:

* **Always** \- załączane do każdego prompta
* **Auto Attached** \- bazujące na wzorcach ścieżek do plików w oparciu o format glob, np. “\*.ts, _.tsx,_ .jsx”
* **Agent Requested** \- opis zastosowania zasady, który pomaga podjąć decyzję agentowi Cursora czy warto skorzystać z tych reguł przy realizacji zadania
* **Manual** \- zasada musi być przekazana do kontekstu w ramach prompta za pomocą symbolu @ (tak jak pliki)

### Przykładowa organizacja reguł dla Cursora

Poniżej prezentujemy przykład dla projektu w naszym ulubionym stacku do 10x developmentu czyli TypeScript, Astro, React z Shadcn i Tailwind oraz Supabase.

```
/
│── .cursor/
│   ├── rules/
│   │   ├── shared.mdc    # Reguły współdzielone 
│   │   ├── frontend.mdc  # Współdzielone reguły dla frontendu
│   │   ├── astro.mdc     # Reguły dla komponentów Astro 
│   │   ├── react.mdc     # Reguły dla komponentów React 
│   │   ├── backend.mdc   # Zasady dla API i interakcji z DB

```

Każdy plik .mdc zawiera specyficzne reguły dla danego obszaru projektu. Reguły mogą obejmować:

* Najlepsze praktyki,
* Konwencje nazewnictwa,
* Styl i format kodu,
* Struktury folderów i plików,
* Warunki brzegowe projektu,
* Złe praktyki i antywzorce.

Nasz plik shared.mdc wygląda następująco:

```
---
Rule Type: Always
---

# AI Rules for {{project-name}}

{{project-description}}

## Tech Stack

- Astro 5
- TypeScript 5
- React 19
- Tailwind 4

## Project Structure

When introducing changes to the project, always follow the directory structure below:

- `./src` - source code
- `./src/layouts` - Astro layouts
- `./src/pages` - Astro pages
- `./src/pages/api` - API endpoints
- `./src/components` - client-side components written in Astro (static) and React (dynamic)
- `./src/assets` - static internal assets
- `./public` - public assets

When modifying the directory structure, always update this section.

## Coding practices

### Guidelines for clean code

- Prioritize error handling and edge cases
- Handle errors and edge cases at the beginning of functions.
- Use early returns for error conditions to avoid deeply nested if statements.
- Place the happy path last in the function for improved readability.
- Avoid unnecessary else statements; use if-return pattern instead.
- Use guard clauses to handle preconditions and invalid states early.
- Implement proper error logging and user-friendly error messages.
- Consider using custom error types or error factories for consistent error handling.

```

Reguły dopasowane po wzorcu do nazwy lub typu pliku są automatycznie dołączane do kontekstu, gdy Cursor pracuje nad zadaniem spełniającym te kryteria – to daje _granularną kontrolę_ nad zachowaniem AI w różnych częściach kodu. Możesz dodawać je również ręcznie, w taki sam sposób jak przy odwołaniach do konkretnych plików.

Zacznijmy od frontend.mdc, który określa współdzielone zasady dla wszystkich rozwiązań frontendowych w naszym projekcie:

```
---
Rule Type: Auto Attached
globs: &#39;**/*.tsx, **/*.jsx, **/*.astro&#39;
---

## Frontend

### General Guidelines

- Use Astro components (.astro) for static content and layout
- Implement framework components in React only when interactivity is needed

### Guidelines for Styling

#### Tailwind

- Use the @layer directive to organize styles into components, utilities, and base layers
- Use arbitrary values with square brackets (e.g., w-[123px]) for precise one-off designs
- Implement the Tailwind configuration file for customizing theme, plugins, and variants
- Leverage the theme() function in CSS for accessing Tailwind theme values
- Implement dark mode with the dark: variant
- Use responsive variants (sm:, md:, lg:, etc.) for adaptive designs
- Leverage state variants (hover:, focus:, active:, etc.) for interactive elements

### Guidelines for Accessibility

#### ARIA Best Practices

- Use ARIA landmarks to identify regions of the page (main, navigation, search, etc.)
- Apply appropriate ARIA roles to custom interface elements that lack semantic HTML equivalents
- Set aria-expanded and aria-controls for expandable content like accordions and dropdowns
- Use aria-live regions with appropriate politeness settings for dynamic content updates
- Implement aria-hidden to hide decorative or duplicative content from screen readers
- Apply aria-label or aria-labelledby for elements without visible text labels
- Use aria-describedby to associate descriptive text with form inputs or complex elements
- Implement aria-current for indicating the current item in a set, navigation, or process
- Avoid redundant ARIA that duplicates the semantics of native HTML elements


```

A teraz w możemy skupić się na pliku poświęconemu react.mdc. Dzięki bardziej ogólnemu globowi w frontend.mdc te zasady również będą dołączane w akcjach dotyczących Reacta.

```
---
Rule Type: Auto Attached
globs: &#39;**/*.tsx, **/*.jsx&#39;
---

### Guidelines for React

#### React Coding Standards

- Use functional components with hooks instead of class components
- Implement React.memo() for expensive components that render often with the same props
- Utilize React.lazy() and Suspense for code-splitting and performance optimization
- Use the useCallback hook for event handlers passed to child components to prevent unnecessary re-renders
- Prefer useMemo for expensive calculations to avoid recomputation on every render
- Implement useId() for generating unique IDs for accessibility attributes
- Consider using the new useOptimistic hook for optimistic UI updates in forms
- Use useTransition for non-urgent state updates to keep the UI responsive

Key Principles
- Use functional, declarative programming. Avoid classes.
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError).
- Favor named exports for components.
- Use TypeScript for all code. Prefer interfaces over types.
- File structure: imports, types, main component, subcomponents, helpers, static content.
- Use Zod for form validation.
- Use Zustand for state managament.
- Use Shadcn UI, Radix, and Tailwind CSS for components and styling.

```

Tego typu reguły możesz tworzyć z poziomu ustawień edytora, ale również z poziomu konsoli wywoływanej skrótem CMD+SHIFT+P / CTRL+SHIFT+P (podobnie jak VS Code):

![](https://assets-v2.circle.so/t296dv0scmwzknrrr6146o90naek)

Cursor Rules wspiera również **dziedziczenie reguł** – można definiować **ogólne** zasady w jednym pliku i odnosić się do nich w bardziej szczegółowych regułach za pomocą referencji **@**.

### Dobre praktyki rozwijania reguł wg twórców Cursora

* Utrzymuj reguły poniżej 500 linii tekstu
* Rozbijaj długie pliki na wiele mniejszych, o konkretnym przeznaczeniu
* Dostarczaj przykłady lub referencje do plików
* Unikaj niejasnych zwrotów - staraj się pisać reguły tak jak techniczną dokumentację
* Twórz nowe reguły jeśli zauważysz, że w wielu promptach powtarzasz te same instrukcje

### Dedykowane reguły vs [AGENTS.md](http://agents.md/)

[AGENTS.md](http://agents.md/) to rozwijający się, otwarty standard definiowania instrukcji dla agentów AI, wspierany przez coraz większą liczbę narzędzi (m.in. Cursor czy Codex). Pozwala on na zachowanie spójnych wytycznych dla AI niezależnie od używanego edytora czy narzędzia.

![](https://assets-v2.circle.so/zfxwo11xioxjo08cpesfumkvt9ur)

Pomimo zyskującego na popularności standardu [AGENTS.md](http://agents.md/), nasza rekomendacja to tworzenie dedykowanych, precyzyjnych reguł w folderze .cursor/rules . Plik dla Agentów zmusza nas do opisywania wielu różnych aspektów projektu w jednym pliku, co w wielu zadaniach może prowadzić do zaciemniania kontekstu i niepotrzebnego wykorzystywania dodatkowych tokenów. Precyzyjne, wieloplikowe reguły pozwalają ci dołączać do konwersacji tylko te instrukcje, które w danej sytuacji powinny wpływać na realizowane zadanie.

## Zobacz nasz poradnik personalizacji (Cursor, Copilot, Claude Code, JetBrains)

![](https://assets-v2.circle.so/4vijeyqjtfw59nc4kpj4ms9t6vmc)

👉 Jeśli pracujesz w środowiskach innych niż Cursor, zapoznaj się z naszym poradnikiem [“Personalizacja AI dla programisty”](https://bravecourses.notion.site/personalizacja-ai), który dogłębnie omawia zagadnienia instrukcji dla AI w różnych ekosystemach programowania.

## Definiowanie Rules for AI 

**Wsparcie w procesie definiowania reguł: 10xRules.ai**

[10xRules.ai](https://10xrules.ai/) to aplikacja webowa, który pomaga w generowaniu reguł dla AI na podstawie informacji o projekcie. Narzędzie przyspiesza proces definiowania reguł dla dowolnego stacku technologicznego - nie musimy robić tego samodzielnie od zera. Dodatkowo, dedykowany serwer MCP ułatwia pobieranie reguł przez twojego Agenta - wprost do projektu! 

![](https://assets-v2.circle.so/vfe52j331ldup56wb44i4ud04mm5)

Proces korzystania z 10xRules.ai wygląda następująco:

1. **Wybierz sposób dostarczenia informacji o projekcie**:  
   * Ręczne wybranie technologii z dostępnej listy  
   * Przesłanie pliku package.json (dla projektów Node.js)  
   * Przesłanie pliku requirements.txt (dla projektów Python)
2. **Generowanie reguł**:  
   * Narzędzie automatycznie dostosowuje reguły do formatu wybranego edytora (Cursor, Copilot, itp.)  
   * Upewnij się, że wszystkie potrzebne reguły zostały dodane  
   * Pobierz pliki z regułami lub skopiuj je bezpośrednio do edytora
3. **Zapisz reguły w formacie zgodnym z Twoim edytorem**
4. **Doprecyzuj szczegóły reguł**:  
   * Wersje technologii  
   * Konwencje nazewnictwa  
   * Struktura katalogów  
   * Preferowane wzorce i konwencje

Nie znalazłeś u nas zasad dostosowanych do Twojego stacku? Skorzystaj z konkurencyjnego rozwiązania jakim jest [cursor.directory](https://cursor.directory/) i/lub zgłoś PRa do 10xRules - więcej informacji znajdziesz w [repozytorium projektu](https://github.com/przeprogramowani/ai-rules-builder).

Teraz, gdy rozumiesz już dlaczego personalizacja AI jest tak ważna i jak działa w poszczególnych edytorach, przejdźmy do omówienia reguł dla AI dostosowanego do stacku projektu 10xCards:

[FRAGMENT VIDEO](https://player.vimeo.com/video/1072852676?app_id=122963&amp;byline=0&amp;badge=0&amp;portrait=0&amp;title=0)

## Aktualizacja dokumentacji ze wsparciem AI

Na tym etapie mamy przygotowany szkielet projektu. Możemy teraz wygenerować plik README.md, które przekaże najważniejsze informacje o projekcie:

[FRAGMENT VIDEO](https://player.vimeo.com/video/1072852659?app_id=122963&amp;byline=0&amp;badge=0&amp;portrait=0&amp;title=0)

Prompt do wygenerowania README znajdziesz w 10xRules.ai Prompt Library - [Generowanie README projektu](https://10xrules.ai/prompts?org=10xdevs&amp;collection=m2-bootstrap&amp;segment=l2-rules-for-ai&amp;prompt=fd5efc36-7aff-4bd5-8e23-83378e8152b7).

## 🏁 Podsumowanie

W tej lekcji poznaliśmy kluczowe aspekty personalizacji AI dla programisty:

* **Samodzielny bootstrap** \- zamiast “kopać się z AI”, lepiej oprzeć się na oficjalnych szablonach i podwinąć rękawy. Świadomość ograniczeń modeli jest kluczem do satysfakcjonującej pracy z ich wykorzystaniem.
* **Integracja z linterami** \- jeżeli pracujesz z Cursorem lub Windsurfem w ekosystemach JS/TS lub Python, narzędzia statycznej analizy kodu automatycznie dostarczą cenne wskazówki dla AI. Pracujesz w innym setupie? Tak czy inaczej warto inwestować w konfigurację statycznej analizy kodu na poziomie edytora, przekazywanie feedbacku z linterów do modeli będzie wymagało jednak więcej pracy manualnej (przynajmniej na razie 😉)
* **Personalizacja z AI** \- reguły dla AI redukują halucynacje i podnoszą jakość kodu bez konieczności ciągłego powtarzania naszych preferencji i oczekiwań. Miej jednak na uwadze, że modele traktują te reguły jako przydatne sugestie a nie przykazania.

Pamiętaj, że nawet najlepiej skonfigurowane AI jest wciąż tylko narzędziem, które wymaga pilnego nadzoru. Konfiguracja linterów i reguły dla AI pomagają modelom generować lepszy kod, ale to 10xDev jest odpowiedzialny za końcową ocenę jakości kodu i wprowadzanie niezbędnych poprawek.

## 👨‍💻 Ćwiczenia praktyczne

**Zadanie 1: Konfiguracja projektu**

**Cel:** Utworzenie i skonfigurowanie projektu z odpowiednimi regułami dla AI.

**Instrukcje:**

1a. Jeżeli pracujesz z rekomendowanym stackiem Astro/React/TS:

* Sklonuj repozytorium [10x-astro-starter](https://github.com/przeprogramowani/10x-astro-starter) i przekopiuj jego zawartość do repozytorium projektu
* Pamiętaj o modyfikacji pola “name” w package.json i package-lock.json
* Upewnij się, że masz zainstalowany [Node.js w wersji 22](https://nodejs.org/en/download)
* Upewnij się, że masz zainstalowane wtyczki: [Astro](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode), [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) oraz [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

  
1b. Jeżeli pracujesz z własnym stackiem:

* Wykorzystaj preferowane metody bootstrapowania projektu w danym ekosystemie
* Odwiedź strony [10xRules.ai](https://10xrules.ai/) oraz [cursor.directory](https://cursor.directory/), i wyszukaj reguły dla wykorzystywanych technologii
* Pobierz wygenerowane pliki w formacie dla Twojego edytora
* Zaimplementuj pobrane reguły w swoim projekcie

**Ważne**: Pamiętaj o opisie stacku i struktury projektu. Nie przesadzaj z ilością reguł, stawiaj na konkrety i nie popadaj w perfekcjonizm - możesz edytować reguły z czasem, na bazie ekspertymentów.

**👉 Ku pokrzepieniu serc**: po wykonaniu tego zadania, będziemy mogli ponownie zbić piątkę z modelami i osiągać imponujące rezultaty w zaskakującym tempie.

![](https://assets-v2.circle.so/s0q5ar8vqcyq1hqxne8m5slk20dj)

**Zadanie 2 (Opcjonalne): Porównanie kodu generowanego z regułami i bez reguł**

**Cel:** Praktyczne zrozumienie wpływu Rules for AI na jakość generowanego kodu.

**Instrukcje:**

1. Dla wybranego edytora, wyłącz na chwilę Rules for AI:  
   * Cursor/Copilot/JetBrains: Przełącz wszystkie reguły w tryb “Manual”  
   * Inne edytory - Zmień nazwę plików i folderów z regułami sprzecznie z konwencją, aby edytor przestał z nich korzystać

  
1. Poproś AI o wygenerowanie komponentu lub endpointa dopasowanego do kontekstu Twojego projektu. Przykładowy prompt:

```
Wygeneruj komponent fiszki (Flashcard). Komponent powinien wyświetlać pytanie, a po kliknięciu pokazywać odpowiedź. Przygotuj stronę /flashcards, która będzie wyświetlała przykładową fiszkę dotyczącą Reacta.
```

1. Zobacz jak agent poradził sobie z realizacją zadania (bardzo możliwe, że próba skończy się porażką i chaosem)
2. Wycofaj wprowadzone zmiany i przywróć Rules for AI do stanu wyjściowego.
3. Poproś AI o ponowną realizację zadania, z wykorzystaniem tego samego prompta. Dodaj jednak bezpośrednią referencję do plików z regułami (to istotne, aby na 100% zostały zaaplikowane również dla nowych plików). Przykładowy prompt dla Cursora:

```
Wygeneruj komponent fiszki (Flashcard). Komponent powinien wyświetlać pytanie, a po kliknięciu pokazywać odpowiedź. Przygotuj stronę /flashcards, która będzie wyświetlała przykładową fiszkę dotyczącą Reacta. 

@shared.mdc @frontend.mdc @react.mdc @astro.mdc
```

1. Porównaj dwie sesje pracy agenta, zwracając uwagę na:
* Czy agent rozpoznał strukturę projektu?
* Czy agent wykorzystał poprawnie stack?
* Zgodność z najlepszymi praktykami
1. Wycofaj wprowadzone zmiany, pracą nad aplikacją zajmiemy się w kolejnych lekcjach ;).

### Zadanie 3: Generowanie README z wykorzystaniem PRD i tech-stack

**Cel:** Praktyczne wykorzystanie AI do generowania dokumentacji projektu.

**Instrukcje:**

1. Poproś model rozumujący o wygenerowanie kompletnego README.md na podstawie prompta z lekcji.
1. Oceń wygenerowany README pod kątem:
* Kompletności informacji
* Czytelności i organizacji
* Zgodności z prd.md i tech-stack.md
1. Wprowadź niezbędne korekty i zacommituj plik.

---

![](https://assets-v2.circle.so/ekrtcr8j44qd531ut1i2iwox5c9h)