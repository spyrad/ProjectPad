---
title: "[5x4] Ewaluacja modeli pod AI-Assisted Development"
course: "10xdevs-2"
source: "Przeprogramowani.pl"
exported: "2025-11-09"
format: "markdown"
---

![Ilustracja z lekcji](https://assets-v2.circle.so/lckrw4m07nomllcriwo4qndr4ies)

## Wprowadzenie

Jak rzetelnie sprawdzać, który model językowy naprawdę przyspieszy i ułatwi twoją pracę? Możesz to robić pośrednio poprzez codzienną praktykę, ale przy dużej skali i częstej zmienności modeli trudno o nadążanie za każdą nową opcją.

W tej lekcji poznasz rekomendowane przez nas narzędzie do testowania i porównywania różnych modeli językowych, optymalizacji promptów oraz wiarygodnej oceny tego, który model najlepiej sprawdzi się w konkretnych zadaniach programistycznych. Nie będą to jednak suche testy i akademickie benchmarki, a użyteczny framework i narzędzie do oceny LLMów pod kątem ich zdolności w preferowanym przez ciebie stacku technologicznym.

Zanim skupimy się na konkretnym przykładzie, najpierw przedstawimy ogólne założenia i najważniejsze zagadnienia ze świata testowania modeli.

## Evals, czyli ewaluacja modeli AI

Niezależnie od konkretnego narzędzia czy platformy, tzw. “_evale_” (testy modeli) sprowadzają się do kilku ustandaryzowanych praktyk.

Podstawowa forma testu będzie zawierać następujące elementy:

- **Dane wejściowe**  
   - Prompt lub łańcuch promptów wejściowych
- **Scenariusz testu**  
   - Oczekiwana poprawna odpowiedź lub kontynuacja konwersacji przez model (_ground truth_)  
   - Typ asercji (np. tekstowe _equals, contains, not contains, itd._)
- **Przedmiot testu**  
   - Odpowiedź testowanego modelu

W poniższym przykładzie trzykrotnie testujemy zachowanie tego samego modelu i sprawdzamy, czy rozumie zarówno pytanie jak i oczekiwania względem formatu odpowiedzi:

![Ilustracja z lekcji](https://assets-v2.circle.so/b263328c8cyt78wbsj7enrnz2u4q)

Po trzykrotnym uruchomieniu modelu z tymi samymi parametrami, uzyskujemy 33% poprawnych odpowiedzi. 

Aby uzyskać realne wyobrażenie o jakości danego modelu, najczęściej będziemy wykorzystywać nie jeden, a kilka testów (_batch_) wpływających na całe badanie. Aby badanie było miarodajne, prawdopodobnie chcielibyśmy zwiększyć skalę co najmniej o 50-100x.

### Wariantowanie promptów

Wiele narzędzi do testowania modeli wspiera dodatkowy wymiar testów, czyli parametryzację samego prompta wejściowego.

Osiągamy to poprzez:

- wprowadzenie zmiennych do prompta, np. {{country}}
- wykonanie testu na określonym zestawie danych testowych (tzw. dataset)

Rozszerzony scenariusz prezentuje poniższy schemat:

![Ilustracja z lekcji](https://assets-v2.circle.so/j6eihn1ubmvwhxqnywq1neck0aay)

W takim wariancie nasze badanie wykona się wg równania:

> **_1 prompt_** x **_liczba wierszy z datasetu_** x **_liczba powtórzeń danego scenariusza_**

Dzięki przetestowaniu 1 prompta dla 3 państw po 3 razy uzyskujemy 9 odpowiedzi z modelu.

Parametryzowanie promptów pozwala nam uzyskać znacznie lepszy obraz tego, jak wybrany model zachowuje się dla różnych danych wejściowych i dla różnego zestawu danych oczekiwanych.

Co ważne, same testy nie muszą działać wyłącznie z warunkiem typu “_equals_”, ale mogą też oceniać modele pod kątem właściwej klasyfikacji tekstu, zrozumienia poleceń, blokowania określonych zachowań czy unikania odpowiedzi na podchwytliwe pytania. Wszystko sprowadza się jednak do podobnych elementów - promptu wejściowego, odpowiedzi oczekiwanej oraz odpowiedzi generowanej przez model w trakcie testu (do oceny).

Testowanie w tym stylu wspierają choćby:

- [OpenAI - Evals na platformie oraz w API](https://platform.openai.com/docs/guides/evals)
- [Anthropic - Evals w Anthropic Console](https://docs.anthropic.com/en/docs/test-and-evaluate/eval-tool)

Obszerne teoretyczne omówienie całego tematu “evali” znajdziesz w otwartym repozytorium od HuggingFace:

<https://github.com/huggingface/evaluation-guidebook>

## Evals vs. AI-Assisted Development

Przedstawione powyżej informacje sprawdzą się dobrze w integracjach bazujących na tekście (np. planowanie projektu, klasyfikacja, konwersacje z AI), ale nie dają nam informacji o tym, czy odpowiedź może być faktycznie wykorzystywana do programowaniu w określonym stacku.

Miarodajne badanie powinno oceniać m.in. to, czy model:

- potrafi pisać kod w określonym języku programowania
- czy rozumie polecenia i spełnia założenia dot. logiki biznesowej
- czy kod przechodzi określone testy (np. jednostkowe)
- czy kod zawiera określone standardy lub wzorce (np. let/const zamiast var w JavaScript)
- czy kod spełnia wymagania dot. wydajności (np. unika zagnieżdżonych pętli)
- itd.

W tym celu musimy wykorzystać narzędzie, które nie tylko jest w stanie komunikować się z modelem i oceniać jego odpowiedzi w formie surowego tekstu, ale takie, który ten tekst konwertuje na rzeczywisty kod poddawany dalszej ocenie.

Jednym z takich narzędzi jest [Promptfoo](https://www.promptfoo.dev/), które można zintegrować z istniejącym projektem w dowolnym stacku, a następnie przy jego pomocy wykonywać ocenę jakości odpowiedzi z AI.

## Promptfoo w akcji

Na dobry początek zapoznaj się z filmem, w którym testujemy trzy różne modele pod kątem znajomości składni frameworka Svelte 5.

Obejrzyj ogólne założenia, a w dalszej części przejdziemy przez poszczególne etapy testowania:

🎥 **VIDEO**: [Watch here](https://player.vimeo.com/video/1079142959?app_id=122963&byline=0&badge=0&portrait=0&title=0)

Jak łatwo zauważyć, taka forma testowania modeli przynosi istotne korzyści względem ręcznego wywoływania setek promptów na wielu różnych platformach.

Promptfoo umożliwia łatwe porównywanie wielu modeli względem siebie, a ten sam prompt wejściowy może być poddany różnorodnym testom z odpowiednimi parametrami. Testy te mogą zawierać dowolne asercje dotyczące realnej oceny odpowiedzi i/lub kodu, a dodatkowo są uruchamiane równolegle, co przyśpiesza i automatyzuje cały proces testowania.

Ważnym aspektem jest również to, że całość konfigurowana jest poprzez deklaratywne ustawienia w pliku YAML - ustawienia projektu testowego mogą być śledzone przez GITa i edytowane z zachowaniem pełnej kontroli zmian (nie musimy bazować na dostawcy zewnętrznej platformy typu SaaS).

Aby dobrze zrozumieć działanie całego rozwiązania, przejdźmy przez najważniejsze kroki całego procesu testowania z promptfoo.

## Pierwsze kroki

Promptfoo jest rozwiązaniem publikowanym w dwóch rejestrach:

- w **npm**: <https://www.npmjs.com/package/promptfoo>
- w **homebrew**: <https://formulae.brew.sh/formula/promptfoo>

Narzędzie można wykorzystywać na kilka sposobów - po instalacji jako globalny util, jako narzędzie uruchamiane poprzez _npx_, a także jako lokalną zależność w projekcie:

```
# globalnie z npm:
npm install -g promptfoo
# lub
npx promptfoo@latest
# lub w projekcie:
npm install promptfoo -DE
# lub z homebrew:
brew install promptfoo
```

Polecenie _init_ utworzy dla ciebie pierwszą wersję konfiguracji projektu (_promptfooconfig.yaml_):

```
npx promptfoo@latest init
# lub, po instalacji
promptfoo init

# ==> promptfooconfig.yaml
```

Sama konfiguracja jest naprawdę intuicyjna - na poziomie projektu możemy definiować zestaw dostawców i wersji modeli, ich konfigurację, testowe prompty, a także wybrane asercje:

```
providers:
  - id: openai:gpt-5
    label: gpt-5
    config:
      apiKey: ######
      temperature: 0.7
      max_tokens: 1000

  - id: anthropic:messages:claude-sonnet-4-5-20250929
    label: sonnet-4_5
    config:
      apiKey: ######
      temperature: 0.7
      max_tokens: 1000

prompts:
  - 'Translate the following text to Polish: "{{sentence}}". Respond only with the translation, no other text.'

tests:
  - vars:
      sentence: How are you?
    assert:
      - type: equals
        value: Jak się masz?
  - vars:
      sentence: Wie gehts?
    assert:
      - type: equals
        value: Jak leci?

```

Konfigurację można uruchomić poleceniem “eval”, wskazując dodatkowo na opcjonalny plik wynikowy.

```
promptfoo eval --output results.txt
```

W efekcie otrzymamy podsumowanie naszego testu:

![Ilustracja z lekcji](https://assets-v2.circle.so/w36mz7bz8b5a5c4yxh9w90ii9vxk)

Niewątpliwą zaletą promptfoo jest duża liczba dostępnych modeli i samych integracji, w tym OpenRouter, OpenAI API, Anthropic API, Grok API, itd. - cała listę znajdziesz [tutaj](https://www.promptfoo.dev/docs/providers/) (można również budować niestandardowych _providerów_ przy pomocy JavaScriptu i Pythona).

Modele mogą być poddawane testom w wielu wymiarach - asercje mogą zawierać:

- deterministyczne kryteria jakości odpowiedzi, np. equals, contains, is-json, itd. - [więcej tutaj](https://www.promptfoo.dev/docs/configuration/expected-outputs/deterministic/)
- LLM-as-a-Judge (wybrany model ocenia odpowiedź modelu testowanego) - [konfiguracja](https://www.promptfoo.dev/docs/configuration/expected-outputs/model-graded/#overriding-the-llm-grader)
- odwołania do zewnętrznych plików (własne skrypty Node/Python do oceny jakości odpowiedzi)

O ile pierwsze dwa typy asercji mogą się przydać chociażby do oceny jakości planowania czy kreatywnej burzy mózgu prowadzonej przez AI, to ostatni element pozwoli nam rozszerzyć możliwości promptfoo pod AI-Assisted Development.

## Rozszerzanie możliwości promptfoo

Ogromną zaletą promptfoo jest możliwość zamiany promptów, testów i asercji tekstowych, na asynchroniczne funkcje pisane w językach JavaScript (CJS/ESM) oraz Python.

Najprostsza konfiguracja będzie zawierać jeden plik z eksportowanymi funkcjami (właściwa implementacja może zawierać dedykowane moduły na prompty, testy i asercje):

```
// evalConfig.js

export async function prompt() {
  return 'Translate the following text to Polish: "{{sentence}}". Respond only with the translation, no other text.';
}

export async function testCases() {
  return [
    {
      id: "test-1",
      description: "Test #1",
      vars: {sentence: "How are you?"},
      assert: [
        {
          type: "javascript",
          value: async (output, context) => {

           // - Run vitest
           // - Run eslint
           // - Run ...

            const pass = output === "Jak się masz?";
            return {
              pass,
              score: pass ? 1 : 0,
              reason: pass ? "Correct" : "Incorrect",
            };
          },
        },
      ],
    },
  ];
}

export async function teardownHook(hookName) {
  if (hookName === "afterAll") {
    // ... cleanup
  }
}
```

Do funkcji możemy się odwoływać poprzez ścieżkę do pliku oraz wskazanie konkretnej funkcji (jeśli nie decydujemy się na eksporty domyślne - wtedy nazwa funkcji jest zbędna):

```
# promptfooconfig.yaml

prompts:
  - file://evalConfig.js:prompt

tests:
  - file://evalConfig.js:testCases

extensions:
 - file://evalConfig.js:teardownHook
```

### Niestandardowy stack w promptfoo

Chociaż promptfoo natywnie korzysta z rozszerzeń Pythona i JavaScriptu, w obu językach możemy “zespawnować” zadania innego typu (np. testy jednostkowe .NET).

JavaScript:

```
// run-dotnet-xunit.mjs
import { execSync } from 'child_process';

const testProjectPath = './path/to/your/test/project';

try {
  console.log('Running .NET xUnit tests...');

  execSync(`dotnet test ${testProjectPath} --logger "xunit;LogFilePath=TestResults.xml"`, {
    stdio: 'inherit'
  });

  console.log('Tests completed successfully');
} catch (error) {
  console.error('Tests failed');
  process.exit(1);
}
```

**Ważne:** Pracując z promptfoo w standardzie importów ESM, musiałem ustawić na sztywno jedną z wersji bibliotek, która sprawiała problemy (downgrade z 3.x na 2.x):

```
"dependencies": {
    "estree-walker": "2.0.2"
 },
"overrides": {
    "estree-walker": "2.0.2"
  }
```

Python:

```
#!/usr/bin/env python3
# run_dotnet_xunit.py
import subprocess
import sys
from pathlib import Path

test_project_path = Path('./path/to/your/test/project')

print('Running .NET xUnit tests...')

try:
    subprocess.run(
        [
            'dotnet', 
            'test', 
            str(test_project_path),
            '--logger', 
            'xunit;LogFilePath=TestResults.xml'
        ],
        check=True, 
        text=True, 
        capture_output=False
    )

    print('Tests completed successfully')
except subprocess.CalledProcessError as e:
    print(f'Tests failed with exit code: {e.returncode}')
    sys.exit(e.returncode)
```

Stąd już prosta droga do prawdziwie skalowalnego, modularnego środowiska testów LLMów.

Przedstawiany na filmie projekt znajdziesz pod tym linkiem:

<https://github.com/przeprogramowani/10x-evals>

## Cache wyników testów

Z punktu widzenia budżetu na testy, promptfoo ma jeszcze jedną istotną zaletę - kiedy dany fragment konfiguracji się nie zmienia pomiędzy kolejnymi _test runami_, narzędzie wykorzystuje cache do szybkiego generowania zapisanych odpowiedzi.

Klucz cache’a budowany jest wg wzorca:

> {dostawca modelu + konfiguracja modelu + zawartość prompta + zmienne do prompta} => output

Dopóki żaden z czterech elementów wejściowych się nie zmienia, promptfoo będzie reużywać wcześniejsze odpowiedzi, a my unikniemy zbędnych kosztów.

Jeśli chcesz tymczasowo wyłączyć ten mechanizm, dodaj do polecenia _eval_ dodatkowy parametr:

```
promptfoo eval --no-cache
```

## Metodyczne wdrażanie evali

Chociaż twórcy promptfoo skupiają się w swojej dokumentacji przede wszystkim na integracjach technicznych w aplikacjach opartych na AI, to ich rekomendacje możemy z łatwością przekształcić w praktyczny workflow dla 10xDeva współpracującego z Agentami AI.

### Trzy obszary oceny AI

Trzy kluczowe obszary, które pozwolą nam budować wartościowe środowisko testów przekładające się na docelową współpracę z AI, to:

- **Development** \- ciągły rozwój scenariuszy i promptów do współpracy z AI (np. prompty z 10xDevs)
- **Evaluation** \- asercje do oceny przydatności modelu w określonym zadaniu
- **Production** \- praktyczna ocena modeli, które wypadły najlepiej w fazie testowania

Z [dokumentacji](https://www.promptfoo.dev/docs/intro/) promptfoo:

![Ilustracja z lekcji](https://assets-v2.circle.so/gnp8zfsee12zv4z1joegdibxslyz)

Jak pracować w tych obszarach? Kluczem do sukcesu jest podejście iteracyjne - zaczynamy od spięcia całego flow end-to-end, a dopiero potem rozszerzamy je o zaawansowane przypadki brzegowe:

1. **Zidentyfikuj scenariusz** \- wybierz wartościowy scenariusz współpracy z AI
2. **Utwórz pierwszy prompt** \- zaprojektuj podstawową wersję promptu rozwiązującego problem
3. **Minimalne asercje** \- określ 1-2 kluczowe testy weryfikujące poprawność odpowiedzi
4. **Zintegruj promptfoo** \- utwórz bazowy plik konfiguracyjny łączący prompt z asercjami
5. **Przetestuj na jednym modelu** \- uruchom testy na domyślnym modelu, aby sprawdzić działanie

### Przykład:

1. **Zadanie:** Implementacja komponentów w React przez Agenta AI
2. **Prompt:** Utwórz komponent w React + Tailwind + TypeScript wg {{spec}} bazując na {{rules}}
3. **Testy:** Asercje do oceny komponentu, wykorzystujące np. vitest, eslint, rules of hooks, itd.
4. **Tooling:** Integracja promptfoo - konfiguracja dostawcy modelu, promptu i testu
5. **Modele:** Testy na preferowanych modelach (np. Gemini 2.5 Pro, Claude 3.5 Sonnet, itd.)

### W kierunku sandboxa dużej skali

Po uruchomieniu podstawowego flow możesz systematycznie rozszerzać cały system tworząc skalowalne środowisko do oceny AI w najbardziej istotnych obszarach (dla ciebie, twojego zespołu lub całej firmy):

- **Rozbuduj asercje** \- dodaj bardziej szczegółowe testy sprawdzające specyficzne aspekty odpowiedzi - możesz wspomagać się asercjami deterministycznymi, kodem, a także LLM-as-a-Judge, gdzie polegasz na zdolnościach modeli AI.
- **Wprowadź warianty promptów** \- testuj różne sformułowania i struktury tego samego zadania, aby uzyskać bardziej przekrojowe środowisko do oceny modeli. W przypadku implementacji kodu mogą to być urozmaicone wymagania biznesowe lub przypadki brzegowe (tak jak w klasycznych testach).
- **Dodaj więcej modeli** \- porównaj wyniki między różnymi modelami AI, które pozwolą ci zauważyć istotne różnice w kosztach, szybkości i jakości odpowiedzi. Możesz korzystać z platform dużych firm jak OpenAI, Anthropic czy Grok, a także uniwersalnego integratora (OpenRouter).

Każda runda testów dostarczy ci cennych wniosków, dzięki którym udoskonalisz prompty, dokonasz selekcji modeli i zbudujesz bardziej precyzyjne asercje. Z każdą iteracją Twój system będzie stawał się coraz bardziej niezawodny, a ocena nowych modeli - szybsza i dokładniejsza.

Ten stopniowy rozwój pozwali uniknąć przeciążenia zbyt dużą liczbą zmiennych na początku, jednocześnie budując solidne fundamenty pod bardziej zaawansowane testy w przyszłości.

Pamiętaj również o poprzednich lekcjach - znając CI/CD takie jak GitHub Actions, testowanie z promptfoo możesz przekonwertować na cyklicznie uruchamiane scenariusze i raportowanie, do którego wgląd mogą mieć pozostali członkowie zespołu.

Czy brzmi to jak firmowy AI Leaderboard? Czemu nie!

## Evale modeli vs. praktyczne testy AI-toolingu

Należy pamiętać, że w zależności od konkretnego przypadku i scenariusza współpracy z AI, nasze testy będą oddawać rzeczywisty stan danego modelu na różne sposoby.

Przykładowo, kiedy budujemy integracje AI z CI/CD łącząc się bezpośrednio z API danej platformy hostującej modele, nie korzystamy z żadnej dodatkowej warstwy pośredniej. W tym przypadku evale będą **dobrym wskaźnikiem** przydatności modeli do budowanej funkcjonalności, bo nasze prompty możemy w 100% współdzielić między testami a praktyką.

Inaczej wygląda to w przypadku edytorów czy pluginów, które dostarczają własny backend lub realizują za kulisami prompt engineering.

Tutaj evale będą **częściowym wskaźnikiem** przydatności modeli - pokażą istotne różnice między poszczególnymi generacjami (np. GPT-3.5 → GPT-4 → GPT-5), ale w niektórych przypadkach mogą nie oddawać jakości współpracy np. z poziomu Cursora. Na to będzie składać się:

- ilość wbudowanego, ukrytego promptingu, który rozbudowuje nasze polecenia
- jakość integracji narzędzi z wybranymi modelami
- dostęp do źródeł zewnętrznych i umiejętność ich przeszukiwania ad-hoc
- poziom kompresowania kontekstu, wprowadzanego np. w Cursorze dla optymalizacji kosztów
![Ilustracja z lekcji](https://assets-v2.circle.so/00dee9aybl248grwpz0789kxfsk4)

Czym w takim wypadku evale są bezużyteczne? W żadnym wypadku - zwykle z dużym prawdopodobieństwem potwierdzą lub wykluczą:

- znajomość wybranego API, języka programowania lub technologii (wiedza w modelu)
- ostatnią znaną wersję wykorzystywanej technologii (np. rozmowy o .NET 9, React 19, itd.)
- jakość komunikacji w wybranym języku naturalnym (polskim, angielskim, itd.)
- testowanie znajomości praktyk i konceptów programistycznych (np. wzorzec X w języku Y)
- jakościową kontynuację łańcucha promptów (np. wyszukując luki w analizie wymagań)

Bazując na slajdzie z preworku (poniżej) można powiedzieć, że im więcej warstw pośrednich między naszym poleceniem a platformą AI, tym więcej potencjalnych różnic między evalem a praktyką (zarówno na plus jak i minus - po prostu trudno to przewidzieć dzięki samym testom).

## 🏁 Podsumowanie lekcji

Świat sztucznej inteligencji poddaje nas nieustannej presji testowania nowych modeli, technik promptowania oraz warunków dostawców, którzy rywalizują na koszty i szybkość działania poszczególnych systemów.

Aby trzymać rękę na pulsie i rozpoznawać optymalne dla nas rozwiązania w dużej skali, nie możemy polegać wyłącznie na testowaniu ręcznym, z poziomu edytora czy konsoli dostawcy. W tym kontekście polecanym przez nas rozwiązaniem będzie _promptfoo_ \- narzędzie pozwoli porównywać odpowiedzi setek dostępnych modeli poprzez deklaratywną konfigurację YAML a także zewnętrzne skrypty, gdzie umieścimy preferowane przez nas kryteria oceny.

Promptfoo najlepiej czuje się w środowisku JavaScript/Python, ale oba języki mogą wywoływać zewnętrzne, dostępne w ramach OS-a narzędzia z innego stacku. A stąd prosta droga do testowania sprawności AI w ulubionym stacku czy języku programowania.

Na koniec uczulamy jednak na fakt, że czym innym jest testowanie modelu w sposób bezpośredni, a czym innym jego wykorzystywanie np. poprzez Cursora czy Copilota. Warstwy pośrednie wprowadzane przez dostawców edytorów mogą zmieniać działanie danego LLMa, czego nie będziemy w stanie odtworzyć na poziomie testów. Właśnie dlatego kluczowe jest **łączenie codziennej praktyki z toolingiem do testowania** surowej formy modeli - obie aktywności dadzą nam pełny obraz tego, jak i kiedy zmieniać swoje nawyki współpracy z AI.

## 👨‍💻 Ćwiczenia praktyczne

### **Zadanie 1: Wykonaj pierwszy test promptfoo**

**Cel:** Przetestuj 3 modele - GPT-4o, GPT-5 oraz Gemini 2.5 Pro na wybranym prompcie

**Instrukcje:**

1. Zainicjalizuj promptfoo w konfiguracji pod zewnętrzne pliki (prompt + testy + asercje)
2. Zdefiniuj scenariusz testowy dla 3 modeli (np. generowanie kodu TypeScript)
3. Wprowadź test i jedną użyteczną asercję (np. wyszukiwanie typów, używanie kompilatora tsc)
4. Wykonaj test i sprawdź jakość modeli - podziel się wynikami na [#Dyskusje - praktyka \[10X\]](https://bravecourses.circle.so/c/watki-dotyczace-lekcji-i-cwiczen)

Powodzenia!

![Ilustracja z lekcji](https://assets-v2.circle.so/ekrtcr8j44qd531ut1i2iwox5c9h)