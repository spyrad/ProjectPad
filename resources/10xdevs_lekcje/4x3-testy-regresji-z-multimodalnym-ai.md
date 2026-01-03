---
title: "[4x3] Testy regresji z multimodalnym AI"
course: "10xdevs-2"
source: "Przeprogramowani.pl"
exported: "2025-11-09"
format: "markdown"
---

![Ilustracja z lekcji](https://assets-v2.circle.so/a9id67ygv41n7va376qs2oxtkdge)

## Wprowadzenie

W poprzedniej lekcji pokazaliśmy ci zestaw scenariuszy, w których AI może ułatwić wdrożenie do projektów typu brownfield i legacy. W tego typu rozwiązaniach mało który element jest zoptymalizowany pod kątem współpracy z AI, ale i tak nowa technologia już dzisiaj pokazuje swój potencjał.

W kolejnych trzech lekcjach, na przykładzie zasłużonego projektu [10xCMS](https://github.com/przeprogramowani/10x-cms), skupimy się nie tylko na analizie, ale i wdrażaniu konkretnych zmian w bezpieczny i sprawny sposób. Aby upewnić się, że po naszej akcji stan projektu nie pogorszy się jeszcze bardziej, zaczniemy od testów regresji stabilizujących kluczowe obszary i domeny całego rozwiązania.

Zrobimy to jednak nieco inaczej niż w przypadku poprzednich lekcji o testach - nie będziemy bazować na samym kodzie, ale na **video, z którego AI wyciągnie kluczowe wnioski** o działaniu projektu i wdrożeniu testów. Zaczynajmy!

## Poznaj 10xCMS

![Ilustracja z lekcji](https://assets-v2.circle.so/uyagt31waa9qxv8ozfkwh8ufww1i)

10xCMS to _innowacyjny_ systemCMS do zarządzania treściami w formacie headless. Zawiera on w sobie trzy główne elementy:

- Pracę z kolekcjami treści, które można wystawiać przez publiczne API
- Katalog mediów, które można osadzać w treściach
- Webhooki informujące o zmianie na danej kolekcji

Niestety, na dzisiaj jego stan jest daleki od oczekiwanego - projekt złapał technologicznego laga, a naszym zadaniem będzie go odkurzyć (zarówno na poziomie technicznym jak i funkcjonalnym).

Repozytorium znajdziesz pod tym linkiem - <https://github.com/przeprogramowani/10x-cms> 

Możesz je sklonować do siebie, lub utworzyć fork i rozwijać niezależnie na podstawie lekcji i ćwiczeń modułu czwartego. Szybki rzut oka na stack wskazuje, że czeka nas podróż w czasie:

- Node 16 (data wydania - kwiecień 2021)
- Zarządzanie dependencjami z narzędziem Bower
- JavaScript (standard ES5) do obsługi kluczowej logiki biznesowej
- jQuery do zapewniania interakcji i animacji
- Bootstrap jako dostawca styli dla warstwy UI
- Lokalna, wrzucona do repozytorium baza SQLite

Aby zbudować intuicję na temat projektu możesz wykorzystać wiedzę z poprzedniej lekcji, a także w trybie “free roam” spędzić kilka minut testując i klikając po aplikacji lokalnie. 

Dane do logowania znajdziesz w pliku \`.env.development\`

```
ADMIN_USERNAME=10xadmin
ADMIN_PASSWORD=10xpassword
```

## Testy regresji - bezpieczna refaktoryzacja

Po wstępnym rozpoznaniu aplikacji, z pierwszymi informacjami na temat jej stanu, chcielibyśmy rozpocząć od wdrożenia testów regresji. To dobra praktyka, która pozwoli nam bezpiecznie wdrażać kolejne usprawnienia czy to na poziomie architektury, czy stacku technicznego.

W testach zdefiniujemy scenariusze dla kluczowych obszarów aplikacji, takich jak logowanie, nawigacja, zarządzanie kolekcjami czy webhookami, których zachowanie nie może się pogorszyć na skutek naszej pracy.

Możemy to osiągnąć na kilka sposobów.

### 1) Implementacja manualna

Podstawowe i sprawdzone podejście to implementacja manualna. Zapoznajemy się z wymaganiami, a następnie sami decydujemy jaki rodzaj testów i w jakiej ilości ma się pojawić w naszej aplikacji.

Zalety:

- ✅ pełna kontrola nad procesem i kosztem implementacji
- ✅ wysoka stabilność testów od pierwszego wdrożonego scenariusza

Wady:

- ❌ czas na zrozumienie wymagań i technologii
- ❌ czas implementowania scenariuszy
- ❌ jakość testów zależna od doświadczenia programisty

### 2) Test Generator

Drugim pomysłem może być szybkie wygenerowanie kilku kluczowych testów e2e przez [Playwright Test Generator](https://playwright.dev/docs/codegen) \- narzędzie pozwala nam przeprowadzić nagrywaną sesję użytkownika w specjalnie przygotowanej przeglądarce. Śledząc akcje oraz elementy, na których wykonujemy działania, na bieżąco tworzy dla nas kod dopasowany do frameworka.

Działanie tego narzędzia możesz zobaczyć na krótkim filmie od twórców Playwrighta:

🎥 **VIDEO**: [Watch here](https://www.youtube.com/embed/LM4yqrOzmFE?rel=0)

Zalety:

- ✅ przyśpieszenie procesu tworzenia podstawowych testów e2e
- ✅ precyzja w odwzorowaniu selektorów UI w kodzie testów
- ✅ łatwy punkt startowy do dalszej refaktoryzacji z AI

Wady:

- ❌ manualny nadzór nad testami, scenariuszami i organizacją kodu
- ❌ kompatybilność z wybranymi edytorami ([wtyczka VS Code](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright))
- ❌ generowanie testów bez dodatkowego zadbania o wzorce, lepsze selektory czy modularyzację

### 3) Współpraca z AI

Trzecie podejście, które prezentujemy w 10xDevs, to innowacyjne wykorzystanie kombinacji promptów, wymagań projektowych i multimodalnych modeli takich jak Gemini 2.5 Flash, które są w stanie analizować zarówno tekst, obraz jak i udostępnione video.

Wspomniany model przeanalizuje dla nas swobodny film z akcji użytkownika, przekonwertuje swoje notatki w test plan, a my ten dokument wykorzystamy do tego, aby Agent wdrożył do projektu konkretne, oparte o wzorce projektowe scenariusze.

Zalety:

- ✅ szybka analiza ścieżek i kluczowych scenariuszy biznesowych
- ✅ możliwość standaryzacji podejścia do testowania (np. z wykorzystaniem [POM](https://playwright.dev/docs/pom))
- ✅ możliwość tworzenia dodatkowej dokumentacji i test planu

Wady:

- ❌ brak bezpośredniego dostępu do selektorów z poziomu video
- ❌ początkowy narzut na integrację i przygotowanie nagrania

Przedstawione podejście ma zarówno mocne jak i słabe strony, ale może to być interesujący punkt startowy do dalszego eksperymentowania, np. przez dedykowane zespoły platformowe czy DevEx, tworzące tooling dla reszty organizacji.

Na rynku pojawiają się pierwsze komercyjne usługi podobnego typu, ale ich stawki mogą być dla wielu nie do zaakceptowania:

- <https://reflect.run/> (subskrypcja od 200$/mc)
- <https://owlity.ai/pricing> (subskrypcja od 299$/mc)

Na nasze potrzeby zbudujemy coś znacznie tańszego, co dodatkowo możemy rozliczać z własnym kluczem do API.

## Przygotowanie klipu

Na dobry początek potrzebujemy nagrania prezentującego kluczowe scenariusze biznesowe, elementy interfejsu oraz akcje użytkownika. Zwiększenie rozmiaru wskaźnika oraz włączenie opcji takich jak “Pokazuj kliknięcia myszą” (np. w QuickTime) może podnieść jakość analizy video.

![Ilustracja z lekcji](https://assets-v2.circle.so/q26jclzrqq0h3ek606lw1aow7wg6)

Nagranie powinno być w jednym z popularnych formatów, np.:

- video/mp4
- video/mpeg
- video/mov

[Dokumentacja pracy z video](https://ai.google.dev/gemini-api/docs/vision?lang=node#prompting-video) wspomina o tym, że okno kontekstowe modelu Gemini Flash (1 mln tokenów) umożliwia analizę nawet do godziny nagrania, ale na nasze potrzeby potrzebujemy klipu od kilku sekund (jeden scenariusz testowy) do kilku minut (przejście przez kluczowe fragmenty aplikacji).

Dla zmniejszenia rozmiaru, możemy eksperymentować z liczbą klatek na sekundę (mało, ale nie przesadnie mało aby scenariusze miały logiczną ciągłość a nie przeskoki po stronach) - całość może być zautomatyzowana z [ffmpeg](https://www.ffmpeg.org/).

```
ffmpeg -i 10xcms.mov -r 24 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k 10xcms_24fps.mov
```

Mój klip wejściowy trwa 1 minutę i waży ok 1.2MB:

🎥 **VIDEO**: [Watch here](https://player.vimeo.com/video/1075258895?app_id=122963&byline=0&badge=0&portrait=0&title=0)

## Modele multimodalne i analiza video

Do analizy powyższego klipu wykorzystamy optymalny kosztowo, multimodalny model Gemini 2.5 Flash z imponującym oknem kontekstowym 1 mln tokenów, który pomoże nam analizować sesję użytkownika (w dowolnym kontekście - w tej lekcji akurat jako wsad do testowania aplikacji).

![Ilustracja z lekcji](https://assets-v2.circle.so/7mc72179wx37qocryycmq1lzrn2s)

Kilka słów wyjaśnienia całego procesu poniżej:

- Analizę video możemy testować za darmo w Google AI Studio (wtedy dzielimy się danymi)
- Wyjście z trybu dzielenia się danymi wymaga doładowanego klucza API
- Klucz do API możemy wykorzystać w AI Studio ale i w autorskich integracjach (np. z Node.js)
- Nagrania do 20MB możemy dołączać do promptów w trybie inline, większe pliki wymagają uprzedniego uploadu z wykorzystaniem tzw. File API
- Film dzielony jest na poszczególne klatki, a jedna klatka to 258 tokenów, stąd:  
   - 60 sekund filmu w 24fps = 60 × 24 = 1440 klatek \* 258 tokenów \~= 40k tokenów per prompt
- Optymalizacja filmu to oszczędność kosztów, ale i potencjalny spadek jakości odpowiedzi.
- W filmach z audio koszt dodatkowy to ok. 30 tokenów za 1 sek. dźwięku

**🚨 Ważne:** Ćwiczenia i analizę projektów komercyjnych zawsze przeprowadzaj na danych testowych i bazie innej niż produkcyjna (nie danych klientów).

Pełna dokumentacja techniczna znajduje się [pod tym linkiem](https://ai.google.dev/gemini-api/docs/vision?lang=node#prompting-video).

## Testowanie z 10x-test-plannerem 🎥

Wykonując kilka pierwszych eksperymentów na AI Studio uznaliśmy, że nie jest to na tyle płynny proces, żeby wdrożyć go w programistyczną codzienność. Całość przypomina pierwsze tygodnie z ChatemGPT, kiedy musieliśmy co chwilę wyskakiwać do przeglądarki. Zwykle nie lubimy wychodzić z terminali i edytorów, a najlepsze narzędzia powinny być zawsze pod ręką.

Zdecydowaliśmy się na opakowanie integracji z Gemini 2.5 Flash biblioteką na npm, z której możesz korzystać w formie command-line utila, podając dwa główne argumenty:

```
npx @10xdevspl/test-planner --video=user-session.mov --outDir=./e2e
```

Jeśli masz zainstalowane narzędzie ffmpeg, to możesz dodatkowo optymalizować nagrania zmniejszając ich liczbę klatek przed analizą:

```
npx @10xdevspl/test-planner --video=user-session.mov --outDir=./e2e --optimize --fps=15
```

Narzędzie będzie jeszcze potrzebowało zmiennej środowiskowej (lub .env) - np. z Google AI Studio:

```
GEMINI_API_KEY=###
```

Test planner wykorzystuje modele Gemini do analizy wskazanego video. Na jego podstawie przygotowywany jest test plan oraz instrukcje dla AI, które można wykorzystać do implementacji docelowych testów.

Video może zawierać jeden lub kilka scenariuszy - ważne jest aby jasno wskazać na interakcje i kluczowe elementy aplikacji, które chcemy pokryć testami. Stąd rekomendacje dużych kursorów, “zoomowania” na interfejs oraz oznaczania miejsc, w które klikamy.

Pracę z tym narzędziem zobaczysz na poniższym filmie:

🎥 **VIDEO**: [Watch here](https://player.vimeo.com/video/1075952671?app_id=122963&byline=0&badge=0&portrait=0&title=0)

## Jak to działa i do czego może się przydać?

Analiza video przeprowadzana przez Gemini 2.5 Flash daje naprawdę obiecujące rezultaty - w kontekście tej lekcji plik wejściowy pomaga w generowaniu test planu i reguł dla AI, ale nietrudno wyobrazić sobie inne scenariusze jak chociażby analiza bugów czy poprawek w interfejsie użytkownika.

Co ważne, próg wejścia do budowania takich integracji jest naprawdę niski.

```
const testPlan = await googleGenAi.models.generateContent({
    model,
    contents: [
      {
        fileData: {
          fileUri: videoMetadata.fileUri,
          mimeType: videoMetadata.mimeType,
        },
      },
      {
        role: "user",
        text: createTestPlanPrompt(),
      },
    ],
  });
```

Pliki do 20MB można dołączać bezpośrednio do promptów, a te większe najpierw wrzucać na dedykowany storage, z którego uzyskujemy adres zasobu (URI). Przy uploadzie warto poczekać aż status przetwarzania zamieni się na “ACTIVE” - właśnie wtedy możemy rozpoczynać promptowanie.

```
{
  "3x2-10xcms_24fps.mov": {
    "name": "files/9b6fvwpwhqpj",
    "mimeType": "video/mov",
    "uri": "https://generativelanguage.googleapis.com/v1beta/files/9b6fvwpwhqpj",
    "state": "ACTIVE",
    "source": "UPLOADED",
    "videoMetadata": {
      "videoDuration": "78s"
    }
  }
}
```

Sam prompt powinien jasno wskazywać na zadanie, które chcemy zrealizować przy pomocy załącznika - w naszym przypadku jest to przygotowanie biznesowego test-planu, który podsumowuje widoczne scenariusze i elementy aplikacji:

```
You are a QA analyst and automation strategist tasked with analyzing a video recording of a user interacting with a web application. Your goal is to create a clear, business-focused test plan based *only* on the provided video recording. This plan will guide the creation of E2E tests.

Please analyze the video by following these steps:
- Watch the entire video carefully, focusing on the user's journey, objectives, and the application's responses.
- Identify distinct business scenarios or user workflows demonstrated (e.g., Registering a new account, Searching for products, Completing a purchase, Updating profile information).
- For each scenario, perform the following analysis:

...
```

Reguły promptingu się nie zmieniają - możemy korzystać z selektorów, ról, dodatkowego kontekstu czy rozbijania problemu na kilka etapów. W przypadku narzędzia CLI możemy też zrezygnować ze streamingu odpowiedzi, bo częściowe wyniki nie są dla nas niezbędne.

Repozytorium projektu i kluczowe prompty (src/prompts) znajdziesz tutaj - <https://github.com/przeprogramowani/10x-test-planner> 

Czekamy na feedback i potencjalne kontrybucje - to kolejny projekt Open Source, który uruchomiliśmy w ramach 10xDevs.

## 🏁 Podsumowanie lekcji

Pamiętaj, że bezpieczna refaktoryzacja nieznanego ci projektu wymaga solidnych testów regresji. Nasze eksperymenty z 10xCMS udowadniają, że możesz znacząco przyspieszyć ten proces wykorzystując AI do analizy nagrań interakcji z aplikacją. Zamiast spędzać dni na ręcznym pisaniu scenariuszy testowych, rozważ narzędzia takie jak **@10xdevspl/test-planner**, które przekształcą Twoje nagranie w gotowy plan testów.

Wybierając między podejściem manualnym, generatorami testów a AI, pamiętaj o balansie między czasem implementacji a jakością testów. Model Gemini 2.5 Flash może być Twoim cennym sojusznikiem - za niewielką cenę tokenów otrzymujesz analizę, która oszczędza godziny pracy zespołu. Nawet jeśli nie uzyskasz jakości produkcyjnej za pierwszym podejściem, to otrzymasz solidny framework do dalszej rozbudowy i dostosowania wszystkich scenariuszy.

Myśląc o skali, możesz eksperymentować z optymalizacją nagrań (np. zmniejszając fps), aby zmaksymalizować efektywność przy minimalnych kosztach.

Kluczem do sukcesu w modernizacji projektów legacy jest łączenie tradycyjnych praktyk inżynierskich z nowymi możliwościami AI. Nie musisz inwestować w drogie rozwiązania komercyjne - jak pokazała ta lekcja, próg wejścia do tworzenia własnych integracji z modelami multimodalnymi jest zaskakująco niski. 

Wykorzystaj te narzędzia jako pierwszy krok w bezpiecznej transformacji przestarzałych systemów, tworząc solidną podstawę do dalszych usprawnień architektonicznych i funkcjonalnych.

## 👨‍💻 Ćwiczenia praktyczne

### **Zadanie 1: Zaimplementuj testy regresji w 10x-CMS**

**Cel:** Zabezpieczenie projektu testami ułatwi dalszą refaktoryzację projektu.

**Instrukcje:**

1. Zapoznaj się z README projektu [Test Planner](https://github.com/przeprogramowani/10x-test-planner)
2. Wygeneruj darmowy klucz do [Google AI Studio](https://aistudio.google.com/apikey)
3. Nagraj krótki klip z jednym lub kilkoma akcjami użytkownika w [10x-cms](https://github.com/przeprogramowani/10x-cms)  
   1. Możesz wykorzystać ten klip:  
   [3x2-10xcms\_24fps.mov](https://assets-v2.circle.so/ktgskt324ol3z4th9khrz3xklgrm)
4. Wykorzystaj test-planner i Agenta AI do wdrożenia kilku testów bazujących na nagraniu aplikacji.
![Ilustracja z lekcji](https://assets-v2.circle.so/ekrtcr8j44qd531ut1i2iwox5c9h)