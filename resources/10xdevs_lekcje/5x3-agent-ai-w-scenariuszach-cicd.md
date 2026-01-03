---
title: "[5x3] Agent AI w scenariuszach CI/CD"
course: "10xdevs-2"
source: "Przeprogramowani.pl"
exported: "2025-11-09"
format: "markdown"
---

![Ilustracja z lekcji](https://assets-v2.circle.so/j0mnqi1ngeoqzj0j765cu3ic8is5)

## Wprowadzenie

Przez większą część szkolenia 10xDevs byliśmy bezpośrednim przełożonym i opiekunem naszego Agenta AI. Wielokrotnie udowadniał on istotny wpływ na rozwój aplikacji, czy to poprzez przyśpieszanie implementacji, asystę w refaktoryzacji i modernizacji kodu, wspomaganie nas w nauce nowych konceptów czy dzielenie się opiniami, których oryginalnie nie braliśmy pod uwagę.

W tej lekcji poznasz jeden ze sposób na zapewnienie większego poziomu autonomii i automatyzacji naszego wirtualnego współpracownika. Będzie on mógł dzielić się feedbackiem i sugerować poprawki będąc bezpośrednio podłączonym do repozytorium. A jak to osiągniemy?

Wykorzystamy poznane w poprzednich lekcjach GitHub Actions. To nie tylko usługa do powtarzalnego budowania, testowania i wdrażania aplikacji, ale narzędzie otwierające nas na nowe scenariusze współpracy i integracji z AI.

W pierwszym etapie poznamy najprostszy sposób zintegrowania agenta z Github Actions, czyli workflow do code review z wykorzystaniem Claude Code Action. 

Następnie przedstawimy sposób na rozszerzanie dostępnych funkcji GHA i stworzysz własnego asystenta opartego o twój ulubiony model i dostawcę takiej usługi. 

Będziesz go mógł dodawać do dowolnego repozytorium, aby na bieżąco monitorował jakość i realizował dowolne, zdefiniowane przez ciebie zadanie (nawet, kiedy śpisz). Na końcu zobaczysz potencjał gotowej akcji wykorzystującej agenta Claude, która korzysta z poznanych wcześniej technik.

## Code Review z Claude Code Action

Zaczynamy od jednego z najprostszych sposobów na integrację AI z naszym repozytorium – gotowej akcji do _code review_. W tym materiale wideo zobaczysz, jak krok po kroku skonfigurować **Claude Code Action**, aby agent automatycznie analizował i komentował twoje Pull Requesty. Prześledzimy cały proces, od instalacji po działający przykład.

🎥 **VIDEO**: [Watch here](https://player.vimeo.com/video/1129953403?app_id=122963)

Najważniejsze odnośniki i punkty poruszone w wideo znajdziesz poniżej:

**Repozytorium akcji:** Tu znajdziesz kod źródłowy i szczegółową dokumentację Claude Code Action: <https://github.com/anthropics/claude-code-action>

**Instalacja aplikacji GitHub:** Aby akcja mogła działać, musisz najpierw zainstalować aplikację Claude w swoim repozytorium lub organizacji: <https://github.com/apps/claude>

**Konfiguracja uwierzytelnienia:** Akcja wymaga podania klucza dostępowego.

- **Opcja 1 (API):** Wygeneruj klucz ANTHROPIC\_API\_KEY w panelu na [platform.claude.com](http://platform.claude.com/).
- **Opcja 2 (OAuth):** Alternatywnie, jeśli masz subskrypcję Pro lub Max na [claude.ai](http://claude.ai/), możesz użyć tokena OAuth (CLAUDE\_CODE\_OAUTH\_TOKEN), który wygenerujesz lokalnie za pomocą komendy _claude setup-token_

**Przechowywanie klucza:** Klucz należy dodać jako _secret_ w ustawieniach repozytorium. W filmie pokazujemy, jak to zrobić z wykorzystaniem środowiska (np. o nazwie integration), aby zwiększyć bezpieczeństwo.

**Konfiguracja workflow:** W pliku [cca-review.yml](https://github.com/przeprogramowani/ai-rules-builder/blob/master/.github/workflows/cca-review.yml) twojego GitHub Action musisz wskazać, że workflow ma korzystać ze środowiska integration (lub innego, w którym przechowujesz klucz API).

**Pierwsze uruchomienie:** Nie zdziw się, jeśli w pull requeście dodającym workflow zobaczysz ostrzeżenie GHA a akcja nie zostanie wykonane. Jest to standardowe zachowanie GitHub Actions, która wymaga jednorazowego, ręcznego zatwierdzenia poprzez merge nowego workflow.

**Przykład działania:** Praktyczne zastosowanie akcji i jej komentarze analizujemy na konkretnym _PRze_ dotyczącym refaktoryzacji API w 10xRules: <https://github.com/przeprogramowani/ai-rules-builder/pull/82>

## Praca z Composite Actions

Do zbudowania własnej integracji wykorzystamy tzw. “Composite Actions” czyli sposób na to, aby scenariusze GHA rozszerzać poprzez niezależne akcje (a’la pluginy).

W trybie Composite Action możemy wyciągnąć zestaw kroków danego scenariusza do osobnego pliku, a następnie wstrzykiwać go na żądanie w wiele miejsc. Co najważniejsze, taka akcja kompozytowa może być rozwijana w niezależnym repozytorium, a cała integrację załatwia za nas GitHub Actions.

Composite Action to jeden z dwóch sposobów na tworzenie modularnych, łatwiejszych w zarządzaniu scenariuszy CI/CD (drugi to [reusable workflows](https://docs.github.com/en/actions/sharing-automations/reusing-workflows#creating-a-reusable-workflow) \- służący do niezależnych, złożonych scenariuszy).

### Tworzenie reużywalnej akcji

Posługiwanie się Composite Actions składa się z dwóch elementów:

1. Utworzenia niezależnego repozytorium z reużywalną akcją (np. github.com/john/ai-action)
2. Użycie akcji w repozytorium z twoim projektem (np. github.com/john/app)

_👉 Composite Action może też być rozwijana w podfolderze, w tym samym repo, ale taki format utrudni używanie akcji w innych projektach. Dlatego na start prezentujemy optymalny setup takiego rozwiązania, który ułatwi ci np. opublikowanie akcji w_ [_GitHub Actions Marketplace_](https://github.com/marketplace?type=actions)_._

![Ilustracja z lekcji](https://assets-v2.circle.so/e3fsbxvre5z4uhvc1fnsdyyffwmj)

Aby całość zadziałała tak jak na schemacie, na głównym poziomie repozytorium z akcją musi znajdować się plik **action.yml** oznaczony jako “composite”. Sama akcja, poprzez terminal, może wykonywać inne skrypty rozwijane w ramach tego samego repozytorium - to sposób na to, aby akcję GHA zintegrować z dowolnym AI SDK i preferowanej przez ciebie technologii (nie tylko JS):

```
/
├── action.yml
├── src
│      └── use-ai.js
└── dist
          └── use-ai.js
```

Samą akcję definiujemy jako zestaw kroków, który będzie uruchamiany w ramach głównego scenariusza:

```
# action.yml
name: AI Reviewer
description: Comment from AI

# GitHub Marketplace - Branding (Opcjonalne)
branding:
  icon: "terminal"
  color: "black"

# Parametry wejściowe
inputs:
  GOOGLE_API_KEY:
    description: "Google AI Studio API Key"

# Kroki danej akcji - wykorzystywane w scenariuszu konsumenta
runs:
  using: "composite"
  steps:
    - name: Run action
      run: node ${GITHUB_ACTION_PATH}/dist/use-ai.js
      shell: bash
      env:
        GOOGLE_API_KEY: ${{ inputs.GOOGLE_API_KEY }}
```

Zwracamy uwagę na kilka elementów:

- Definicja akcji musi zawierać klauzulę “**using: 'composite'**“ - oznacza to, że akcja będzie “wklejona” do nadrzędnego scenariusza (np. w osobnym repozytorium).
- Zauważ, że akcja nie ma zdefiniowanego triggera ani systemu operacyjnego, na którym jest uruchomiona - **decyduje o tym konsument akcji**.
- Z poziomu akcji możesz wykonać dowolny skrypt w danym repozytorium ale również wszystko to, co normalnie uruchomisz z poziomu terminala: **“** **_run:_** **_node ${GITHUB\_ACTION\_PATH}/dist/use-ai.js_** **”**
- Composite Action może być parametryzowana poprzez pola “**inputs**” - często będzie to np. tryb działania, klucz do danego API, itd. (🚨 Pamiętaj o zasadzie ograniczonego zaufania - konsumenci mogą tutaj wstrzykiwać potencjalnie niebezpieczne wartości)
- Akcje _composite_ muszą posiadać zdefiniowany **_shell_** do wywoływania poleceń.

### Testowa integracja z AI

Aby przetestować integrację, w repozytorium z testową akcją umieściłem prosty skrypt Node.js korzystający z klienta Google Generative AI. Wykorzystuję tutaj darmowy klucz z Google AI Studio (przekazywany jako zmienna środowiskowa) oraz model Gemini 2.5 Flash.

Na tym etapie integracja nie ma jeszcze świadomości repozytorium konsumenta, ale dzięki niej przetestujemy wywołanie Gemini z poziomu GHA.

```
// src/use-ai.js
import {GoogleGenAI} from "@google/genai";

const ai = new GoogleGenAI({apiKey: process.env.GOOGLE_API_KEY});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents:
      "Provide short example of a feedback to Pull Request - imagine that you are a reviewer.",
  });
  console.log(response.text);
}

main();
```

Tego typu skrypt jest częścią standardowego projektu Node/npm - inicjalizuję go poprzez _npm init,_ a następnie sam skrypt umieszczam w folderze src/use-ai.js.

### Uwaga na dodatkowe zależności

Jeśli twoja akcja posiada dodatkowe zależności (np. dowolne AI SDK), których nie chcesz instalować na poziomie docelowego projektu, musisz je spakować już na etapie publikowania akcji.

W moim przypadku posługuję się narzędziem [rolldown](https://rolldown.rs/), które uruchamiam lokalnie, otrzymuję plik wynikowy folderze _dist_ i wrzucam go na ten sam branch co akcja (również dodaję do GITa):

```
"scripts": {
    "build": "npx rolldown src/use-ai.js --file dist/use-ai.js"
},
```

Dzięki zbudowaniu skryptu i jego zależności do jednego pliku, na poziomie samej akcji nie muszę już wykonywać dodatkowej instalacji zależności ani oczekiwać, że w repozytorium konsumenta będzie taki sam setup projektu jak u mnie:

```
# action.yml
# ...

runs:
  using: "composite"
  steps:
    - name: Run action
      run: node ${GITHUB_ACTION_PATH}/dist/use-ai.js
      shell: bash
      env:
        GOOGLE_API_KEY: ${{ inputs.GOOGLE_API_KEY }}
```

### Jak używać nowej akcji

Po stronie konsumenta użycie akcji sprowadza się do rozbudowy scenariusza o nowy _step_. Poprzez klauzulę “uses” wskazujemy w nim właściciela i nazwę repozytorium, a także branch (ew. tag lub commit SHA) z plikiem _action.yml_. Resztą zajmie się GitHub Actions:

```
# pull-request.yml
name: Pull Request

on:
  pull_request:
    branches: [master]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - uses: przeprogramowani/ai-action@master
        with:
          GOOGLE_API_KEY: ${{ secrets.GOOGLE_API_KEY }}
```

Zwróć uwagę na dodatkowe kroki przed wywołaniem nowej akcji. W trybie “Composite” sami musimy zadbać o konfigurację środowiska na potrzeby całego scenariusza. Dlatego:

- Zawsze upewnij się, że na poziomie _joba_ używasz kompatybilnego OS-a (np. _ubuntu-latest_)
- Zadbaj o instalację niezbędnych zależności zanim uruchomisz akcję (np. _setup-node_)
- Wszystkie sekrety muszą być skonfigurowane w docelowym repozytorium projektu

Komunikat z modelu Gemini potwierdza poprawne wykonanie akcji w moim scenariuszu - oczywiście na teraz ta odpowiedź nie ma większego sensu, bo akcja nie jest jeszcze świadoma kontekstu repozytorium:

![Ilustracja z lekcji](https://assets-v2.circle.so/rqqaid1kbja0udy7yh84mbk6zubd)

Wiedząc jak łączyć ze sobą scenariusze GHA, reużywalne akcje oraz integrację z AI z poziomu skryptów Node.js (stack możesz dobrać wg preferencji), przejdźmy teraz do dwóch przykładowych scenariuszy z dostępem do repozytorium, które przy pomocy AI zadbają o jakość projektu.

## Dwa pomysły dla Agenta AI w CI/CD

Zobaczysz teraz dwa pomysły na to, jak AI może stać się realnym rozszerzeniem programistycznego workflow - solo i w zespole.

Pierwsze rozwiązanie to feedback do Pull Requestów - model językowy, na podstawie wprowadzanych zmian oraz określonego prompta, może wykonać precyzyjne **Code Review** wskazując na mocne i słabe strony danego rozwiązania. Prompt może być dopasowany do zespołowych wymagań, określonego stacku technicznego, a i sam model można zawsze aktualizować szukając optymalnego rozwiązania.

To znakomity sposób na pierwszą linię Code Review i zapewnienie minimalnego poziomu feedbacku do każdej zmiany, którą programiści chcą wdrożyć na główny branch:

```
// github.com/przeprogramowani/ai-action/blob/git-diff/src/code-review.js

export async function performAICodeReview(prDiff, apiKey) {
  if (!prDiff) {
    throw new Error("PR diff is empty or not provided");
  }

  if (!apiKey) {
    throw new Error("Google API key is required");
  }

  const ai = new GoogleGenAI({apiKey});

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `
        You are a senior software engineer reviewing a pull request.
        Conduct a thorough review of the PR based on provided diff.

        The PR diff is:

        <diff>
        ${prDiff}
        </diff>

        Focus on the following:
        - Code readability - is the code easy to understand?
        - Code performance - is the code efficient?
        - Code style - is the code style consistent?
        - Code duplication - is the code duplicated?
        - Code quality - is the code of high quality?

        You are allowed to use "N/A" for cases where the PR does not bring any changes in given area.
        `,
    });

    return response.text;
  } catch (error) {
    console.error("Error during AI review:", error);
    throw error;
  }
}
```

Druga propozycja to kontynuacja lekcji o pracy z kodem zastanym - tutaj wykorzystujemy przykładowy prompt do wyrównania różnic pomiędzy implementacją danego modułu, a jego dokumentacją.

To przydatny scenariusz, który możesz uruchamiać cyklicznie, np. w każdy weekend, a jego efekty poprzez nowy Pull Request mogą ocenić programiści.

```
// github.com/przeprogramowani/ai-action/blob/sync-docs/src/jsdoc-updater.js

export async function updateJSDocs(fileContent, apiKey) {
  if (!fileContent) {
    // Consider returning original content or throwing a more specific error
    console.warn(
      "File content is empty or not provided. Skipping JSDoc update."
    );
    return fileContent;
  }

  if (!apiKey) {
    throw new Error("Google API key is required");
  }

  // Initialize Google AI
  const ai = new GoogleGenAI({apiKey});

  // Updated prompt:
  const prompt = `
You are an AI assistant specialized in JavaScript documentation.
Your task is to analyze the provided JavaScript code and ensure JSDoc comments are present and accurate for functions, classes, and complex logic blocks. Do not comment self-explanatory code or one-liners.

**Instructions:**
1.  **Add missing JSDocs:** If a function, class, or significant logic block lacks documentation, add a complete JSDoc comment.
2.  **Fix broken JSDocs:** If an existing JSDoc comment is fundamentally incorrect (e.g., wrong parameter names, incorrect return type description, misleading description), update it to be accurate.
3.  **Do NOT make minor changes:** If JSDoc comments exist and are generally correct, do *not* modify them for minor rewording, style adjustments, or typo fixes.
4.  **Preserve Code:** Ensure the underlying JavaScript code logic remains completely unchanged.
5.  **Output:** Return the *entire* file content. If you made changes according to rules 1 or 2, return the modified content. If no changes were needed according to rule 3, return the original, unmodified content.
6.  **Format:** Output *only* the raw code content, without any markdown fences (like \`\`\`javascript) or explanations.

JavaScript code:
\`\`\`javascript
${fileContent}
\`\`\`
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  const updatedContent = response.text;
```

Oba scenariusze, a także ich wpływ na jakość projektu, omawiamy w poniższym filmie:

🎥 **VIDEO**: [Watch here](https://player.vimeo.com/video/1078088344?app_id=122963&byline=0&badge=0&portrait=0&title=0)

Szczegóły akcji możesz podejrzeć tutaj: <https://github.com/przeprogramowani/ai-action> 

Dla wszystkich tech leadów, managerów i programistów w platform teamach szczególnie interesujące powinny być akcje oparte na harmonogramach - GitHub Actions daje możliwość łatwej konfiguracji cyklu uruchamiania zadania, a w połączeniu z AI całość może dawać zaskakujące efekty.

Jak konfigurować harmonogramy:

```
┌───────────── minute (0 - 59)
│ ┌───────────── hour (0 - 23)
│ │ ┌───────────── day of the month (1 - 31)
│ │ │ ┌───────────── month (1 - 12 or JAN-DEC)
│ │ │ │ ┌───────────── day of the week (0 - 6 or SUN-SAT)
│ │ │ │ │
│ │ │ │ │
│ │ │ │ │
*    *   *   *   *
```

Przykładowo, dla scenariusza uruchamianego codziennie o 4:15 i 5:15 możesz ustawić:

```
on:
  schedule:
    - cron: "15 4,5 * * *"   # <=== Change this value
```

Pamiętaj też o trzech różnych gałęziach dla wariantów reużywalnej akcji opartej o ai:

- master (podstawowy przykład Composite Action)
- git-diff (AI Code Review na poziomie Pull Requestów)
- sync-docs (korygowanie dokumentacji)

## Dodatkowe uprawnienia

Budując bardziej zaawansowane scenariusze, szczególnie takie, które mogą wykonywać więcej akcji w obrębie twojego konta na GitHubie, warto poznać różnicę pomiędzy sposobami autentykacji wszystkich scenariuszy. Główna różnica dotyczy tzw. **Github Tokena** oraz **Personal Access Tokena**.

### GitHub Token (GITHUB\_TOKEN)

GitHub automatycznie tworzy sekret GITHUB\_TOKEN dla każdego uruchomienia workflow. Ten token jest dostępny w kontekście ${{ secrets.GITHUB\_TOKEN }} i umożliwia podstawowe operacje w ramach **tego samego repozytorium**, w którym działa workflow.

```
jobs:
  example_job:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Create Issue
        uses: actions/github-script@v7
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          script: |
            github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: 'Automatycznie utworzony issue',
              body: 'Ten issue został utworzony przez workflow'
            })
```

**Główne cechy:**

- Generowany automatycznie dla każdego workflow
- Wygasa po zakończeniu workflow
- Ma dostęp **tylko do repozytorium**, w którym działa workflow
- Ma ograniczone uprawnienia zgodnie z polityką repozytorium

Nie musisz wykonywać żadnych dodatkowych akcji, aby dzięki niemu odczytywać dane. Jeśli jednak ma on służyć do modyfikacji danych, musisz włączyć taką możliwość w ustawieniach danego repozytorium (**github.com/{owner}/{repo}/settings/actions**):

![Ilustracja z lekcji](https://assets-v2.circle.so/bwf00a2mb399v4sve27ps29zxa96)

## Personal Access Token (PAT)

Personal Access Token jest tokenem, który **tworzysz ręcznie** w swoich ustawieniach GitHuba.

Dla tego tokenu możesz wybrać dokładne uprawnienia do poszczególnych funkcji i elementów serwisu, a następnie używać go do zadań, które wykraczają poza możliwości domyślnego tokenu GHA.

```
jobs:
  cross_repo_job:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Create PR w innym repozytorium
        uses: actions/github-script@v6
        with:
          github-token: ${{ secrets.MY_PERSONAL_TOKEN }}
          script: |
            github.rest.pulls.create({
              owner: 'inna-organizacja',
              repo: 'inne-repo',
              title: 'Automatyczny PR',
              head: 'feature-branch',
              base: 'main',
              body: 'Ten PR został utworzony z workflow'
            })
```

**Główne cechy:**

- Tworzony ręcznie przez użytkownika GitHuba
- Możesz wybrać czas wygaśnięcia (np. 30 / 90 dni)
- Może mieć dostęp do wielu repozytoriów i organizacji
- Może mieć szerszy zakres uprawnień, np. do zarządzania kontem, zarządzania sekretami, itp.

**👉 Ważne:** Do zbudowania akcji **_sync-docs_**, z poziomu której mogę modyfikować pliki, tworzyć branche oraz Pull Requesty, wykorzystałem token z następującymi uprawnieniami:

![Ilustracja z lekcji](https://assets-v2.circle.so/pbryndad03tp9cnqgzcoiks11gn7)

Osobiste tokeny skonfigurujesz tutaj: <https://github.com/settings/personal-access-tokens/> 

## 🏁 Podsumowanie lekcji

Mówiąc o automatycznych scenariuszach dla Agenta AI, spora część dyskusji skupia się na prototypach opartych o platformy low-code/no-code (np. Make, Bubble lub n8n). O ile takie rozwiązanie ma sens w przypadku zadań ogólnego zastosowania, to w przypadku akcji w obrębie repozytorium takie automatyzacje są trudne w utrzymaniu. Z jednej strony żyją z dala od kodu, a po drugie mogą wymagać dodatkowej integracji z docelowym serwisem.

Alternatywa w postaci GitHub Actions zapewnia odpowiedni balans pomiędzy łatwością tworzenia scenariuszy a korzystaniem z wszystkich narzędzi inżyniera - w tym repozytoriów, systemu kontroli wersji czy możliwości pisania standardowego kodu (choćby w JavaScript).

Scenariusze, które z poziomu GHA możesz delegować do AI, to przykładowo:

1. Zautomatyzowane code review - AI może analizować pull requesty, identyfikować potencjalne błędy, problemy z wydajnością czy niezgodności ze standardami kodu.
2. Automatyczna dokumentacja - generowanie i aktualizowanie dokumentacji na podstawie zmian w kodzie źródłowym.
3. Refaktoryzacja kodu - identyfikacja i propozycje usprawnień istniejącego kodu, z możliwością generowania docelowych Pull Requestów.
4. Klasyfikacja i selekcja - możliwość wdrożenia reguł, które AI wykorzysta np. do powiadamiania odpowiedniego zespołu w zależności od zawartości Pull Requesta czy zmian w repozytorium.
5. Release notes - model może generować semantyczne notatki do kolejnych wersji projektu lub biblioteki, na podstawie serii commitów od ostatniego wdrożenia.

To tylko kilka przykładowych scenariuszy, z którymi możesz eksperymentować aby automatyzować wybrane fragmenty programistycznego workflow korzystając z potencjału AI.

## Ćwiczenia praktyczne

### **Zadanie 1: CHANGELOG.md z Gemini Flash**

**Cel:** Sprawdź możliwości Gemini Flash w kontekście tworzenia dokumentacji zmian projektowych

**Instrukcje:**

1. Utwórz nowy scenariusz CI/CD w obrębie repozytorium.
2. Wykorzystaj integrację z AI do analizy ostatnich commitów (np. 10) od momentu wywołania scenariusza.
3. Z poziomu CI/CD utwórz lub zaktualizuj plik CHANGELOG.md zawierający tekstowe podsumowanie zmian z danego okresu, który analizowało AI.
4. W przypadku zmian, z poziomu CI/CD utwórz nowy Pull Request ze zmianami Changeloga

---

Przykład dokumentu:

```
## 10xCMS - Changelog

### 07.04.2025 - 14.04.2025

- Wdrożono poprawki do styli na stronie głównej
- Zaktualizowano zależności w package.json
- Wykonano modernizację kodu client-side (jQuery -> Svelte)

### 01.04.2025 - 07.04.2025

- Rozbudowano endpointy do zarządzania kontem użytkownika
- Zmieniono sposób pobierania danych z CMS
```

![Ilustracja z lekcji](https://assets-v2.circle.so/ekrtcr8j44qd531ut1i2iwox5c9h)