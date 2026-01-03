<!DOCTYPE html>![](https://assets-v2.circle.so/wspd5ikiogij8bgax9vxk6k8dyu4)

## Wprowadzenie

W tej lekcji zajmiemy się warstwą REST API zgodnie z procesem, który poznałeś w poprzedniej lekcji. Dodatkowo poznasz workflow 3x3, który zapewnia świetny balans pomiędzy sprawczością agenta a kontrolą i code review programisty.

## Inicjalizacja Supabase w warstwie API

[FRAGMENT VIDEO](https://player.vimeo.com/video/1072853088?app_id=122963&amp;byline=0&amp;badge=0&amp;portrait=0&amp;title=0)

Aby wygenerować typy database.types.ts na podstawie schematu bazy danych, wykorzystałem komendę Supabase CLI:

```
supabase gen types typescript --local &gt; src/db/database.types.ts
```

Do inicjalizacji Supabase w projekcie opartym o Astro wykorzystałem następujący przepis dla agenta:

```
# Supabase Astro Initialization

This document provides a reproducible guide to create the necessary file structure for integrating Supabase with your Astro project.

## Prerequisites

- Your project should use Astro 5, TypeScript 5, React 19, and Tailwind 4.
- Install the `@supabase/supabase-js` package.
- Ensure that `/supabase/config.toml` exists
- Ensure that a file `/src/db/database.types.ts` exists and contains the correct type definitions for your database.

IMPORTANT: Check prerequisites before perfoming actions below. If they&#39;re not met, stop and ask a user for the fix.

## File Structure and Setup

### 1. Supabase Client Initialization

Create the file `/src/db/supabase.client.ts` with the following content:

```ts
import { createClient } from &#39;@supabase/supabase-js&#39;;

import type { Database } from &#39;../db/database.types.ts&#39;;

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseAnonKey = import.meta.env.SUPABASE_KEY;

export const supabaseClient = createClient&lt;Database&gt;(supabaseUrl, supabaseAnonKey);
```

This file initializes the Supabase client using the environment variables `SUPABASE_URL` and `SUPABASE_KEY`.


### 2. Middleware Setup

Create the file `/src/middleware/index.ts` with the following content:

```ts
import { defineMiddleware } from &#39;astro:middleware&#39;;

import { supabaseClient } from &#39;../db/supabase.client.ts&#39;;

export const onRequest = defineMiddleware((context, next) =&gt; {
  context.locals.supabase = supabaseClient;
  return next();
});
```

This middleware adds the Supabase client to the Astro context locals, making it available throughout your application.


### 3. TypeScript Environment Definitions

Create the file `src/env.d.ts` with the following content:

```ts
/// &lt;reference types=&quot;astro/client&quot; /&gt;

import type { SupabaseClient } from &#39;@supabase/supabase-js&#39;;
import type { Database } from &#39;./db/database.types.ts&#39;;

declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient&lt;Database&gt;;
    }
  }
}

interface ImportMetaEnv {
  readonly SUPABASE_URL: string;
  readonly SUPABASE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

This file augments the global types to include the Supabase client on the Astro `App.Locals` object, ensuring proper typing throughout your application.
```

Oprócz TypeScript, Supabase pozwala na generowanie typów w językach Go oraz Swift ([dokumentacja supabase gen types](https://supabase.com/docs/reference/cli/supabase-gen-types)). Poradniki inicjalizacji Supabase w innych technologiach webowych znajdziesz w dokumentacji [Supabase Framework Quickstarts](https://supabase.com/docs/guides/getting-started#framework-quickstarts).

Aby dokończyć konfigurację, należy umieścić url i anon key do bazy w pliku .env. Tutaj przykładowe wartości konfiguracyjne, które możesz podejrzeć za pomocą komendy _supabase start_ w repo projektu:

![](https://assets-v2.circle.so/akei5n04cnhykm0jveo83e1lgd2y)

**Ważne**: Od wersji Supabase CLI 2.48.x, aby uzyskać dostęp do anon key należy skorzystać z komendy _supabase status -o env_

Na tej podstawie poprawna konfiguracja .env dla mojej lokalnej konfiguracji wygląda następująco:

```
SUPABASE_URL=http://127.0.0.1:54321
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
```

## Definiowanie specyfikacji API

[FRAGMENT VIDEO](https://player.vimeo.com/video/1072853050?app_id=122963&amp;byline=0&amp;badge=0&amp;portrait=0&amp;title=0)

Do wygenerowania api-plan.md wykorzystaj prompt z 10xRules.ai Prompt Library - [Tworzenie planu REST API](https://10xrules.ai/prompts?org=10xdevs&amp;collection=m2-bootstrap&amp;segment=l4-api&amp;prompt=b32d5dd1-f1ab-4695-b8d0-a0981df2a1a8).

## Generowanie typów na podstawie schematu bazy danych

[FRAGMENT VIDEO](https://player.vimeo.com/video/1072852990?app_id=122963&amp;byline=0&amp;badge=0&amp;portrait=0&amp;title=0)

Do wygenerowania DTOsów i Command Modeli w TypeScript wykorzystaj prompt z 10xRules.AI Prompt Library - [Generowanie typów DTO i Command Models](https://10xrules.ai/prompts?org=10xdevs&amp;collection=m2-bootstrap&amp;segment=l4-api&amp;prompt=6c5a99ac-6036-494a-b5c5-60f6cc305534).

## Plan implementacji endpointa POST /generations

[FRAGMENT VIDEO](https://player.vimeo.com/video/1072853016?app_id=122963&amp;byline=0&amp;badge=0&amp;portrait=0&amp;title=0)

Do wygenerowania szczegółowego planu implementacji endpointa wykorzystaj prompt 10xRules.AI Prompt Library - [**Plan implementacji endpointa REST API**](https://10xrules.ai/prompts?org=10xdevs&amp;collection=m2-bootstrap&amp;segment=l4-api&amp;prompt=7fa09cd6-4760-47c2-aae0-acde3d54740f).

## Poprawiamy niespójne nazewnictwo

[FRAGMENT VIDEO](https://player.vimeo.com/video/1072852956?app_id=122963&amp;byline=0&amp;badge=0&amp;portrait=0&amp;title=0)

## Implementujemy endpoint /generations 

[FRAGMENT VIDEO](https://player.vimeo.com/video/1072991524?app_id=122963&amp;byline=0&amp;badge=0&amp;portrait=0&amp;title=0)

Do implementacji wykorzystaj prompt z 10xRules.ai Prompt Library - [Implementacja endpointu (workflow 3×3)](https://10xrules.ai/prompts?org=10xdevs&amp;collection=m2-bootstrap&amp;segment=l4-api&amp;prompt=d20e7b05-7964-4c1b-8d36-ffebffd9b970).

### Workflow 3x3

W filmie o implementacji endpointa przedstawiłem mój ulubiony sposób współpracy z agentami w IDE. Dodaj do dowolnego prompta następujący fragment, a aktywujesz tryb “3x3”:

```
&lt;implementation_approach&gt;
Realizuj maksymalnie 3 kroki planu implementacji, podsumuj krótko co zrobiłeś i opisz plan na 3 kolejne działania - zatrzymaj w tym momencie pracę i czekaj na mój feedback.
&lt;/implementation_approach&gt;
```

Dzięki niemu uzyskujesz sweet spot pomiędzy sprawczością agenta a własną kontrolą, możliwością nadążania za wprowadzanymi zmianami i wprowadzania niezbędnych korekt kursu. 

W ramach każdej iteracji agent wróci do Ciebie z krótkim podsumowaniem wykonanych działań oraz planem na kolejne 3 kroki. Twoim zadaniem jest code review wykonanych kroków i analiza dalszych planów agenta. W odpowiedzi przekaż mu:

```
Feedback do dotychczasowych działań:
[lista punktowana z odniesieniem do poszczególnych zaraportowanych kroków] &lt;- jeżeli krok został wykonany w 100% dobrze, pomiń punkt lub napisz &quot;OK&quot;

Feedback do planowanych kroków:
[lista punktowana z odniesieniem do poszczególnych pranowanych kroków] &lt;- jeżeli nie masz zastrzeżeń, napisz &quot;OK&quot;

[pozostałe uwagi] &lt;- jeżeli masz dodatkowe uwagi, napisz je tutaj
```

Co do pozostałych uwag mogą to być prośby o krótsze/dłuższe opisy wykonanych działań i planów, przeniesienie uwagi agenta na określony aspekt pracy (np. zwróć większą uwagę na obsługę błędów itd.).

**Ważne**: Takie podejście szczególnie fajnie sprawdza się przy pracy z AI w IDE. Agenci w terminalu, tacy jak Claude Code, lepiej pracują na “autopilocie” i wygodniej sprawdza się finalny efekt ich pracy. 

## Szybkie testy endpointa z generowanym curlem

Nie chcesz tracić czasu na Postmana lub przeklikywanie się przez UI, aby przetestować endpoint? Zanim zdefiniujesz testy automatyczne, świetnym sposobem jest wygenerowanie i wykonanie curl z poziomu edytora:

[FRAGMENT VIDEO](https://player.vimeo.com/video/1072852944?app_id=122963&amp;byline=0&amp;badge=0&amp;portrait=0&amp;title=0)

## 🏁 Podsumowanie

W tej lekcji poznaliśmy proces generowania kontraktów i endpointów REST API z wykorzystaniem AI:

* **Inicjalizacja Supabase w projekcie** \- przedstawiliśmy sposób konfiguracji Supabase w projekcie Astro z wykorzystaniem agentów, w tym tworzenie pliku clienta oraz middleware. Wykorzystaliśmy Supabase CLI do automatycznego wygenerowania typów TypeScript z bazy danych.
* **Definiowanie specyfikacji API** \- poznaliśmy prompt do tworzenia kompleksowego planu REST API na podstawie schematu bazy danych i PRD. Plan zawiera zasoby, endpointy, uwierzytelnianie oraz logikę biznesową.
* **Generowanie typów na podstawie schematu bazy danych** \- poznaliśmy sposób automatycznego generowania DTOs (Data Transfer Objects) i Command Models dla API, zachowując spójność z modelem bazy danych.
* **Szczegółowy plan implementacji endpointów** \- nauczyliśmy się jak tworzyć dokładne plany implementacji endpoint-by-endpoint z uwzględnieniem struktury żądania, odpowiedzi, przepływu danych, bezpieczeństwa i obsługi błędów.
* **Workflow 3×3** \- poznaliśmy efektywny sposób współpracy z agentem AI podczas implementacji, gdzie agent realizuje 3 kroki planu, raportuje postęp i proponuje kolejne 3 działania. Ten model zapewnia równowagę między autonomią AI a kontrolą programisty.

Pamiętaj, że generatywne AI doskonale radzi sobie z rutynowymi elementami tworzenia API, ale nadal wymaga nadzoru i weryfikacji ze strony programisty, szczególnie w zakresie logiki biznesowej i bezpieczeństwa.

## 👨‍💻 Ćwiczenia praktyczne

**Zadanie 1: Inicjalizacja Supabase w projekcie**

**Cel:** Skonfigurowanie Supabase jako Backend-as-a-Service w Twoim projekcie.

**Instrukcje:**

1. Zainstaluj pakiet @supabase/supabase-js w swoim projekcie (lub [innego klienta dla Twojego stacku](https://supabase.com/docs/reference))
2. Wykorzystaj przykładowy kod z sekcji &quot;Inicjalizacja Supabase w warstwie API&quot; do stworzenia plików:  
   * /src/db/supabase.client.ts - do inicjalizacji klienta Supabase  
   * /src/middleware/index.ts - do dodania klienta Supabase do kontekstu Astro  
   * /src/env.d.ts - do rozszerzenia definicji typów dla zmiennych środowiskowych
3. Użyj komendy Supabase CLI do wygenerowania typów TypeScript:  
```  
supabase gen types typescript --local &gt; src/db/database.types.ts  
```
4. Dodaj wymagane zmienne środowiskowe SUPABASE\_URL i SUPABASE\_KEY do pliku .env

**Ważne**: Upewnij się, że plik .env jest dodany do .gitignore, aby zabezpieczyć klucze dostępu przed wyciekiem. 

**Zadanie 2: Generowanie specyfikacji API**

**Cel:** Stworzenie kompleksowego planu REST API dla Twojego projektu.

**Instrukcje:**

1. Wykorzystaj prompt z sekcji &quot;Definiowanie specyfikacji API&quot;, dostosowując go do schematu bazy danych w Twoim projekcie
2. Wygeneruj specyfikację API przy użyciu modelu reasoningowego i przeprowadź rewizję poprawności struktury danych, warunków oraz logiki biznesowej
3. Zapisz wygenerowany plan jako api-plan.md
4. Przejrzyj i w razie potrzeby skoryguj wygenerowaną specyfikację

**Zadanie 3: Planowanie implementacji kluczowego endpointa/ów**

**Cel:** Stworzenie szczegółowego planu implementacji dla kluczowego endpointa/ów dla funkcji aplikacji, nad którą pracujesz.

**Instrukcje:**

1. Zidentyfikuj najważniejszy endpoint(y) dla głównej funkcjonalności Twojego projektu
2. Wykorzystaj prompt z sekcji &quot;Plan implementacji endpointa POST /generations&quot;
3. Wygeneruj i przeanalizuj plan implementacji
4. Zapisz wygenerowany plan jako \[nazwa-endpointa\]-implementation-plan.md

**Przykładowo**: Do obsługi funkcji generowania fiszek w 10xCards będziemy potrzebowali dwóch endpointów: POST generations (rozpoczęcie procesu generowania) oraz POST flashcards (zapis zaakceptowanych fiszek).

**Zadanie 4: Implementacja endpointa**

**Cel:** Wdrożenie zaplanowanego endpointa w Twojej aplikacji.

**Instrukcje:**

1. Wykorzystaj prompt z sekcji &quot;Implementujemy endpoint /generations&quot;
1. Po każdej iteracji (3×3) przeprowadź code review i przekaż feedback
2. Kontynuuj implementację aż do ukończenia endpointa
3. Wygeneruj i wykonaj polecenia curl do przetestowania endpointa
4. Upewnij się, że implementacja zawiera:  
   * Prawidłową walidację danych wejściowych  
   * Właściwą obsługę błędów  
   * Zgodność z wygenerowanym planem implementacji

**Ważne**: Podczas implementacji zwróć szczególną uwagę na bezpieczeństwo API, poprawną obsługę błędów oraz zgodność z zasadami implementacji backendu.

**Co dalej?** Przygotuj pozostałe endpointy, które będą potrzebne do implementacji głównej funkcji/pierwszego widoku. Zaimplementuj widok zgodnie ze wskazówkami z kolejnej lekcji. Rozwijając dalej aplikację (np. lista CRUD) zaimplementuj endpointy niezbędne do obsługi tego widoku.

![](https://assets-v2.circle.so/05fcqi7bjxfhshkjmex1np1p7xyl)