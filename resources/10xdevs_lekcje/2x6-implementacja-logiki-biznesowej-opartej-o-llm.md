<!DOCTYPE html>![](https://assets-v2.circle.so/i8zf9qq4ab2xp347g02738yinpu0)

## Wprowadzenie

Na tym etapie nasz projekt zawiera w sobie najważniejsze elementy aplikacji webowych - bazę danych z określonym schematem tabel, endpointy API, kontrakty oraz użyteczny interfejs użytkownika.

Wprowadzając te składowe przekonałeś się, jak istotne w przypadku współpracy z AI jest planowanie wymagań oraz działań programisty, analizy różnych wariantów i scenariuszy projektu, odwoływanie się do kontekstu oraz dokumentowanie swoich decyzji.

W tej lekcji potencjał AI wykorzystamy jeszcze raz - tym razem nie w edytorze, ale w samym środku logiki biznesowej naszej aplikacji. Sprawimy, żeby z CRUDa zwiała NUDA, a to wszystko poprzez inteligentne funkcje modeli językowych.

Lecimy!

### Poznaj usługę OpenRouter

Integrację z modelami Generative AI można wykonać na wiele sposób. Mnogość modeli, technologii i sposobów dostępu może jednak przyprawiać o ból głowy. W tym celu zaproponujemy ci uniwersalny interfejs, przez który skomunikujesz się z AI - [Open Router](https://openrouter.ai/).

![](https://assets-v2.circle.so/tje5zcjh4sejavaw26olhl0f0p8s)

OpenRouter to “proxy”, które ujednolica sposób komunikacji z modelami - dostawcy modeli (np. Anthropic, OpenAI, Google) jak i poszczególne wersje stają się parametrami zapytań do tego samego endpointu. Dzięki temu możemy łatwo wymieniać dostępne opcje, przechodzić na bardziej korzystne cenniki i szybciej eksperymentować.

```
fetch(&quot;https://openrouter.ai/api/v1/chat/completions&quot;, {
  method: &quot;POST&quot;,
  headers: {
    &quot;Authorization&quot;: &quot;Bearer &lt;OPENROUTER_API_KEY&gt;&quot;,
    &quot;Content-Type&quot;: &quot;application/json&quot;
  },
  body: JSON.stringify({
    &quot;model&quot;: &quot;google/gemini-2.5-pro&quot;,
    &quot;messages&quot;: [
      {
        &quot;role&quot;: &quot;user&quot;,
        &quot;content&quot;: &quot;What is the meaning of life?&quot;
      }
    ]
  })
});
```

OpenRouter ma również tę zaletę, że zapłacisz za niego dokładnie tyle, na ile doładujesz swoje konto - to usługa działająca w modelu bez subskrypcji. Proponujemy rozpoczęcie od małej kwoty, pozwalającej na aktywowanie konta oraz ustawienie limitów [na poziomie klucza do API](https://openrouter.ai/settings/keys).

![](https://assets-v2.circle.so/y1837l9euvlq32ufxdkhzx000za9)

Tworząc nowe klucze pamiętaj o ustawianiu “Credit limit”. Dzięki temu nawet jeżeli Twój klucz wycieknie, złodziej będzie w stanie wykorzystać maksymalnie kwotę wskazaną w limicie. Na potrzeby kursu $1 to rozsądny limit (dla 90% uczestników), dla porównania my zużyliśmy zaledwie $0.3 przy budowie i testach 10x-cards z modelem [openai/gpt-4o-mini](https://openrouter.ai/openai/gpt-4o-mini).

Usługa umożliwia też komunikację z modelami oznaczonymi jako ([FREE 🎁](https://openrouter.ai/models?max%5Fprice=0)) - w takim przypadku występują jednak [limity wiadomości](https://openrouter.ai/docs/api-reference/limits):

&gt; **Free limit**: If you are using a free model variant (with an ID ending in **:free**), then you will be limited to 20 requests per minute and 200 requests per day. 

Na start proponujemy zapoznanie się z jednym z naszych filmów, gdzie pokazujemy jak z OpenRoutera można korzystać zarówno na poziomie edytora (wykorzystaj w ramach ciekawostki), jak i dostawcy modeli AI (w kontekście budowania nowej funkcjonalności).

[FRAGMENT VIDEO](https://www.youtube.com/embed/IGFk8IuKdbU?rel=0)

Zanim rozpoczniesz korzystanie z usługi, zadbaj też o dostosowanie ustawień prywatności (jeśli chcesz uzyskać 1-procentową 😎 zniżkę na tokeny, możesz udostępniać inputy/outputy twoich rozmów - na potrzeby projektu szkoleniowego może to być warte rozważenia):

&lt;https://openrouter.ai/settings/privacy&gt;

Klucz OPENROUTER\_API\_KEY należy zapisać w pliku .env (lub innym miejscu przechowywania zmiennych środowiskowych dla twojego tech-stacku). 

Ważne: pamiętaj, aby nigdy nie dodawać .env (i alternatyw) do repozytorium. Plik ze zmiennymi środowiskowymi powinnien być wskazany w .gitignore.

## Generujemy plan implementacji serwisu OpenRouter

[FRAGMENT VIDEO](https://player.vimeo.com/video/1072992080?app_id=122963)

Do stworzenia planu implementacji serwisu wykorzystaj prompt z 10xRules.ai Prompt Library - [Generowanie planu implementacji serwisu OpenRouter](https://10xrules.ai/prompts?org=10xdevs&amp;collection=m2-bootstrap&amp;segment=l6-business-logic&amp;prompt=925e891f-7a5a-41aa-bafd-981616a29d1e).

### Implementacja serwisu OpenRouter

[FRAGMENT VIDEO](https://player.vimeo.com/video/1072992053?app_id=122963&amp;byline=0&amp;badge=0&amp;portrait=0&amp;title=0)

Do zaimplementowania serwisu wykorzystaj prompt - [**Implementacja serwisu OpenRouter**](https://10xrules.ai/prompts?org=10xdevs&amp;collection=m2-bootstrap&amp;segment=l6-business-logic&amp;prompt=6262a006-1df9-466a-be44-d8bffa691153).

Poprawny format dla response\_format jest następujący:

```
response_format: { type: &#39;json_schema&#39;, json_schema: { name: &#39;weather&#39;, strict: true, schema: jsonSchemaObj } }
```

Polecamy dodatkowe materiały o Structured Outputs od Openrouter ([podstawy](https://openrouter.ai/docs/features/structured-outputs)) i Microsoft ([deep dive](https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/structured-outputs)).

## 🏁 Podsumowanie

W tej lekcji omówiliśmy integrację z modelami Generative AI w naszej aplikacji webowej:

* **OpenRouter jako uniwersalny interfejs** \- usługa działająca jako &quot;proxy&quot;, która ujednolica sposób komunikacji z różnymi modelami AI (Anthropic, OpenAI, Google), umożliwiając łatwą wymianę dostępnych opcji i szybsze eksperymentowanie bez konieczności zmiany kodu.
* **Ekonomiczny model finansowania** \- OpenRouter działa w modelu pay-as-you-go bez subskrypcji, pozwalając na doładowanie konta dokładnie taką kwotą, jakiej potrzebujemy. Możliwość ustawienia limitów kredytowych na poziomie kluczy API zapewnia bezpieczeństwo finansowe.
* **Dostęp do darmowych modeli** \- możliwość korzystania z modeli oznaczonych jako (FREE 🎁), choć z limitami (20 zapytań na minutę, 200 zapytań dziennie).
* **Konfiguracja i implementacja serwisu** \- podejście do tworzenia planu implementacji serwisu OpenRouter oraz jego realizacji.

Pamiętaj o przechowywaniu kluczy API w bezpieczny sposób (plik .env wykluczony z repozytorium przez .gitignore) oraz o rozważeniu ustawień prywatności w OpenRouter zgodnie z potrzebami projektu. 

Integracja modeli AI w logice biznesowej aplikacji pozwala wyjść poza podstawowe operacje CRUD i dodać inteligentne funkcje, które zwiększają atrakcyjność i użyteczność naszej aplikacji.

## 👨‍💻 Ćwiczenia praktyczne

**Zadanie 1: Konfiguracja OpenRouter** 

**Cel:** Założenie konta i skonfigurowanie OpenRouter do integracji z AI w Twojej aplikacji. 

**Instrukcje:**

1. Utwórz konto na platformie OpenRouter ([https://openrouter.ai](https://openrouter.ai/))
2. Doładuj konto minimalną kwotą ($5+) lub wybierz model oznaczony jako FREE 🎁
3. Wygeneruj klucz API z limitem kredytowym (sugerowany limit: $1 na testy)
4. Skonfiguruj ustawienia prywatności według własnych preferencji
5. Dodaj klucz API do pliku .env swojego projektu
6. Upewnij się, że plik .env jest dodany do .gitignore

**Ważne**: Pamiętaj o zabezpieczeniu swojego klucza API i ustawieniu limitu kredytowego, aby uniknąć nieprzewidzianych kosztów w przypadku wycieku klucza.  

**Zadanie 2: Generowanie planu implementacji serwisu OpenRouter** 

**Cel:** Stworzenie szczegółowego planu implementacji serwisu OpenRouter w Twojej aplikacji. 

**Instrukcje:**

1. Wykorzystaj prompt z sekcji &quot;Generujemy plan implementacji serwisu OpenRouter&quot; dostosowując go do Twojego stack&#39;u technologicznego
2. Wygeneruj i poddaj rewizji plan implementacji za pomocą modelu reasoningowego
3. Zapisz wygenerowany plan jako .ai/openrouter-service-implementation-plan.md

**Zadanie 3: Implementacja serwisu OpenRouter** 

**Cel:** Wykonanie pełnej implementacji serwisu OpenRouter zgodnie z wygenerowanym planem.

**Instrukcje:**

1. Wykorzystaj prompt z sekcji &quot;Implementacja serwisu OpenRouter&quot;
2. Zaimplementuj serwis OpenRouter
3. Etapowo wdrażaj plan implementacji, korzystając z worklow 3×3
4. Upewnij się, że implementacja obejmuje:  
   * Poprawną integrację z API  
   * Właściwą strukturę odpowiedzi z modelu  
   * Obsługę wszystkich opisanych funkcjonalności  
   * Kompletną obsługę błędów  
   * Zabezpieczenia zgodne z planem
5. Zintegruj zaimplementowany serwis z wybraną funkcjonalnością swojej aplikacji
6. Przetestuj integrację używając darmowego lub taniego modelu (np. gpt-4o-mini)

**Ważne**: Podczas implementacji zwróć szczególną uwagę na bezpieczne przechowywanie i wykorzystywanie klucza API oraz właściwą obsługę błędów komunikacji z serwisem zewnętrznym.

## 🏁 Podsumowanie modułu 1 i zapowiedź modułu 2

Gratulacje! Za tobą sześć intensywnych lekcji o budowaniu full-stackowej aplikacji webowej przy współpracy z LLM.

Mamy nadzieję, że przedstawione techniki, prompty i materiały dodatkowe umożliwią ci skuteczne realizowanie jednego z projektów, które opisaliśmy na otwarcie 10xDevs - jesteśmy ciekawi, na który projekt się zdecydowałeś - fiszki, podróże, potrawy, a może coś zupełnie innego?

W zależności od doświadczenia i dostępnego czasu, wybierz z naszych lekcji to, co dla ciebie najciekawsze i najbardziej przydatne w codziennej pracy. W kontekście pierwszego modułu i certyfikatu zadbaj o to, aby zrealizować:

* Utworzenie nowego projektu i repozytorium na GitHubie
* Wypracowanie dokumentu PRD opisującego główne funkcjonalności
* Podstawowe zarządzanie danymi (np. wyświetlanie i edycja)
* Fundamenty integracji z AI (np. przez Open Router i darmowy model Gemini Flash) lub logikę biznesową core’owej funkcji Twojego pomysłu

Te elementy będziesz mógł udokumentować na końcu szkolenia, w formularzu certyfikacyjnym - realizuj je w swoim tempie a w razie potrzeby dodawaj nowe wątki w [#Dyskusje - praktyka \[10X2\]](https://bravecourses.circle.so/c/dyskusje-praktyka-10x2) 

A co czeka cię w module trzecim?

* Integracja z Supabase Auth
* Testy jednostkowe i e2e
* Scenariusze CI/CD z GitHub Actions
* Wdrażanie na produkcję
* Zaskakujące narzędzia dla Agenta AI i magiczna dokumentacja ✨

Wspólnie ze społecznością 10xDevs zrealizujesz projekt od początku do końca - powodzenia!🚀 

![](https://assets-v2.circle.so/9zipmhsi9mlc7kddist5xwe0drxe)