<!DOCTYPE html>![](https://assets-v2.circle.so/htozlcp6chb7x5t360aqngijorou)

## Wprowadzenie

W poprzednich lekcjach przyjrzeliśmy się rekomendowanym przez nas narzędziom napędzanym sztuczną inteligencją, które wspierają codzienną pracę programisty. Zrozumieliśmy, jak działają dostępne modele językowe oraz jak mogą pomagać w rozwiązywaniu zadań w sposób bardziej efektywny. Teraz nadszedł moment, aby pójść krok dalej i poznać tryb pracy, który wprowadza zupełnie nową jakość do współpracy z AI – **Agentów AI**.

Agenci nie są tylko &quot;rozbudowanymi chatbotami&quot;. To systemy, które potrafią korzystać z narzędzi, podejmować decyzje i wykonywać zadania w naszym imieniu. Dzięki temu możemy delegować im bardziej złożone operacje i skupić się na logice oraz kreatywnych aspektach programowania, zamiast na powtarzalnych działaniach.

Ta lekcja została podzielona na trzy główne rozdziały, które krok po kroku przybliżą Ci temat agentów:

1. **Różnice między chatbotami a agentami**  
Zrozumiesz, czym agenci różnią się od znanych już chatbotów, jakie mają dodatkowe możliwości i dlaczego stanowią przełom w interakcji człowiek–AI.
2. **Wykorzystywanie wbudowanych narzędzi**  
Dowiesz się, jak agenci mogą korzystać z narzędzi wbudowanych, takich jak zarządzanie systemem plików, korzystanie z terminala czy wyszukiwanie danych w sieci.
3. **Korzystanie z narzędzi opartych o MCP**  
Poznasz podejście do integracji agentów z zewnętrznymi usługami i narzędziami za pomocą protokołu MCP, co otwiera im drogę do współpracy z całymi ekosystemami aplikacji.

## Agent vs Chatbot

**Zacznijmy od poznania kluczowych cech Agentów AI oraz ich różnic względem prostych systemów konwersacyjnych opartych o AI.** Jeśli do tej pory w programowaniu korzystałeś jedynie z podstawowej wersji ChataGPT, omija cię naprawdę wiele.

Chatboty takie jak ChatGPT czy Claude.ai z każdym miesiącem stają się coraz lepsze w **rozmawianiu o programowaniu - generują snippety z bibliotek, podpowiadają preferowane technologie, a nawet rozwiązują dylematy na poziomie architektury**. Problem pojawia się jednak wtedy, gdy próbujemy używać ich w praktycznym procesie rozwijania oprogramowania. **Chatboty działają z dala od kontekstu projektu**, co sprawia, że developer experience nie jest optymalny – fragmenty kodu czy dokumentacji trzeba dostarczać ręcznie, a samo wdrażanie sugerowanych zmian bywa powolne i żmudne (typowy copy/paste).

**Agenci AI idą o krok dalej** – nie tylko odpowiadają na pytania, ale mogą też korzystać z narzędzi, mieć dostęp do kontekstu projektu i wykonywać w nim realne akcje. Dzięki temu stają się faktycznymi współpracownikami, a nie tylko doradcami.

W tym filmie pokażemy, jak wygląda ta różnica w praktyce i dlaczego agenci zmieniają sposób, w jaki współpracujemy ze sztuczną inteligencją.

[FRAGMENT VIDEO](https://player.vimeo.com/video/1121270865?app_id=122963)

## Pierwsze ćwiczenia z narzędziami

Po poznaniu teoretycznych zagadnień czas przejść do praktyki. Na kolejnym filmie zobaczysz, jak Agenci AI potrafią **omijać ograniczenia klasycznego LLM-a** właśnie dzięki korzystaniu z tzw. _tool use_.

Przetestujemy kilka rzeczywistych scenariuszy, takich jak:

* generowanie mockowych danych,
* pobieranie aktualnej wiedzy z internetu,
* a także przeszukiwanie projektu w bardziej deterministyczny i przewidywalny sposób.

Dzięki temu przekonasz się, że współpraca z Agentami to nie tylko lepsza rozmowa, ale przede wszystkim wyższa jakość pracy z AI w programowaniu.

[FRAGMENT VIDEO](https://player.vimeo.com/video/1121481809?app_id=122963)

Przykłady komend z narzędziami znajdziesz w repozytorium [10x-warmup w folderze .cursor](https://github.com/przeprogramowani/10x-warmup/).

Pliki wykorzystywane jako parametry zapytań znajdują się w folderze 10x-warmup/_agent-sandbox._

### Dla ciekawskich - jak działa wywoływanie narzędzi i czym jest Agent Loop?

Kiedy LLM staje przed zadaniem, którego nie jest w stanie rozwiązać samym tekstem, „sięga” po dostępne narzędzia. Może to być np. wyszukiwarka internetowa, baza danych czy parser kodu. Model formułuje odpowiedź wskazującą na potrzebę użycia narzędzia, jego operator (np. Cursor) interpretuje to wywołując fizyczne narzędzie (najczęściej funkcję z określonymi parametrami), a następnie wynik wraca do wątku z AI.

![](https://assets-v2.circle.so/vnd024o13mdabybb3r10q9x40wr6)

Model językowy pełni tutaj rolę orkiestratora przepływu danych - odbiera polecenia, [dobiera narzędzia z puli dostępnych](https://platform.openai.com/docs/guides/function-calling), interpretuje wyniki działania narzędzi i zgodnie ze swoją wiedzą decyduje o tym, czy realizacja zadań dobiegła końca. Ten proces rzadko kończy się na jednym kroku. Cały cykl powtarza się, aż do uzyskania końcowej odpowiedzi. Ten właśnie mechanizm nazywamy **Agent Loop** – czyli pętlą działania agenta, w której iteracyjnie łączy on swoje wnioskowanie z wywoływaniem kolejnych narzędzi.

W praktyce daje to ogromną elastyczność – w przeciwieństwie do surowego LLMa, Agent nie musi mieć całej wiedzy „wbudowanej”, bo potrafi uczyć się i działać w trakcie pracy, korzystając z zasobów zewnętrznych.

## MCP, czyli zupełnie nowe narzędzia

Chociaż narzędzia wbudowane w Agenty AI są przydatne, ich liczba i możliwości mogą być niewystarczające w bardziej skomplikowanych scenariuszach. Często spotykamy się z sytuacją, w której dostępne narzędzia nie obejmują wszystkich potrzebnych funkcji, takich jak integracja z zewnętrznymi aplikacjami, wyspecjalizowanymi bazami danych, czy systemami analitycznymi. Ponadto, każde narzędzie musi być zaimplementowane w taki sposób, aby agent AI mógł je efektywnie wykorzystywać w ramach swojego cyklu działania.

Bez odpowiedniego mechanizmu integracji, każde oprogramowanie mogłoby wymagać indywidualnej implementacji, co skutkowałoby dużymi trudnościami w skalowaniu i współpracy między różnymi systemami.

W odpowiedzi na ten problem powstał [**Model Context Protocol (MCP)**](https://modelcontextprotocol.io/), który jest rozwiązaniem pozwalającym na łatwą integrację nowych narzędzi i usług z systemami AI. Dzięki MCP, agenci AI mogą sięgać po narzędzia zewnętrzne w sposób jednolity i przewidywalny, bez potrzeby tworzenia dedykowanych integracji przez każdego dostawcę.

W kolejnym fragmencie zobaczysz praktycznie wykorzystanie jednej z usług zintegrowanych poprzez MCP, a w ostatnim module przedstawimy ci teoretyczne, obszerne założenia tego protokołu.

[FRAGMENT VIDEO](https://player.vimeo.com/video/1121566514?app_id=122963)

### Integracja serwerów niestandardowych

Jeśli integrujesz niestandardowe serwery MCP, które nie posiadają wsparcia dla funkcji “one-click install”, utwórz plik **.cursor/mcp.json** i dostosuj jego zawartość wskazując na odpowiednie usługi - Cursor wykryje te ustawienia automatycznie.

**1) Dla MCP uruchamianych lokalnie:**

```
{
  // .cursor/mcp.json
  &quot;mcpServers&quot;: {
    &quot;context7&quot;: {
      &quot;command&quot;: &quot;npx&quot;,
      &quot;args&quot;: [&quot;-y&quot;, &quot;@upstash/context7-mcp&quot;, &quot;--api-key&quot;, &quot;YOUR_API_KEY&quot;]
    }
  }
}
```

**2) Dla MCP działających zdalnie:**

```
{
  // .cursor/mcp.json
  &quot;mcpServers&quot;: {
    &quot;context7&quot;: {
      &quot;url&quot;: &quot;https://mcp.context7.com/mcp&quot;,
      &quot;headers&quot;: {
        &quot;CONTEXT7_API_KEY&quot;: &quot;YOUR_API_KEY&quot;
      }
    }
  }
}
```

Więcej o konfiguracji MCP w Cursorze oraz serwery “one-click install” znajdziesz [w oficjalnej dokumentacji](https://cursor.com/docs/context/mcp).

Odpowiednik dla Copilota znajduje się [pod tym linkiem](https://docs.github.com/en/copilot/how-tos/provide-context/use-mcp/extend-copilot-chat-with-mcp), a dla JetBrains Junie [tutaj](https://www.jetbrains.com/help/junie/model-context-protocol-mcp.html).

### Poznaj usługę Context7

Przedstawiony na filmie Context7 **indeksuje całą oficjalną dokumentację projektu**, oczyszcza ją z zbędnych elementów i dzieli na małe fragmenty (np. poszczególne API z opisami). Do każdego fragmentu dodaje metadane (np. wersja, kategorie) i buduje wektorowy indeks umożliwiający semantyczne wyszukiwanie.

![](https://assets-v2.circle.so/ejgzs0bxumq2kn323zgcfdh265ln)

Dzięki temu, gdy pytasz o konkretną rzecz np. Supabase Auth, dostajesz **skondensowany, trafny wynik – kod i objaśnienie – wycięty prosto z dokumentacji**.

Twórcy chwalą się, że działa to zarówno dla często aktualizowanych frameworków jak Next.js, jak i mniej znanych paczek, których model mógł w ogóle nie widzieć w trakcie treningu.

Context7 daje do naszej dyspozycji dwa tryby: **ręczne wyszukiwanie** lub **automatyczne wstrzykiwanie przez MCP**. Ręczne korzystanie polega na wejściu na stronę [context7.com](http://context7.com/) i wybraniu interesującej biblioteki z katalogu. Następnie można wpisać szukaną frazę (np. nazwę metody lub problem, który chcemy rozwiązać). Serwis zwróci nam fragment dokumentacji – zwykle tytuł sekcji, krótki opis i blok kodu. Taki wynik można skopiować jednym kliknięciem, i wkleić do konwersacji lub zapisać w pliku .md jeżeli chcemy się odwołać do niego wielokrotnie. Drugą, przedstawioną na powyższym filmie opcją jest integracja poprzez serwer MCP.

![](https://assets-v2.circle.so/epiy3dj4t7tsaohkdl0zuz5x22xn)

Największą zaletą Context7 jest oszczędność czasu i dostęp do aktualnych wersji dokumentacji. Z punktu widzenia współpracy programisty z AI, korzyściami są:

* **Zawsze aktualna dokumentacja, dopasowana do wersji technologii** – możemy pobrać kontekst dla dokładnie tej wersji biblioteki, której używamy, dzięki czemu unikamy starych wzorców.
* **Rzeczywiste przykłady kodu ze źródła** – zamiast abstrakcyjnych opisów, model dostaje prawdziwy kod z dokumentacji, który z dużym prawdopodobieństwem zadziała od razu.
* **Zwięzłe i istotne informacje** – Context7 odfiltrowuje reklamy, treści marketingowe czy poboczne dygresje, dostarczając tylko to, co potrzebne (tytuł, opis, kod).
* **Darmowe dla użytkowników indywidualnych** – co obniża barierę wejścia; każdy może wypróbować bez opłat.
* **Integracja z edytorami przez MCP** – czyli możliwość automatycznego działania w tle, bez ręcznego kopiowania fragmentów przy każdym pytaniu.

Dzięki takiemu podejściu **redukujemy problem halucynacji i przestarzałych snippetów**, bo AI ma _świeże źródło prawdy_.

## 📚 Materiały dodatkowe

Poniższej znajdziesz listę narzędzi wspieranych przez najpopularniejszych Agentów AI w programowaniu:

* [Narzędzia dla Agenta Cursora](https://cursor.com/docs/agent/tools)
* [Narzędzia dla Agenta Claude Code](https://docs.claude.com/en/docs/claude-code/settings#tools-available-to-claude)
* [Narzędzia dla Agenta Github Copilota](https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode)
* [Narzędzia dla Agenta Cline](https://docs.cline.bot/exploring-clines-tools/cline-tools-guide)

## 🏁 Podsumowanie

Podczas gdy chatboty jak ChatGPT czy Claude działają z dala od kontekstu projektu i wymagają ręcznego dostarczania fragmentów kodu, **Agenci AI potrafią korzystać z narzędzi**, mieć dostęp do systemu plików i wykonywać w nim realne zmiany. Dzięki mechanizmowi zwanemu &quot;Agent Loop&quot; mogą iteracyjnie łączyć swoje wnioskowanie z wywoływaniem narzędzi, co czyni ich faktycznymi współpracownikami, a nie tylko doradcami programisty.

Zyskującym na popularności rozszerzeniem dla Agentów jest **katalog narzędzi oparty o Model Context Protocol (MCP)**. Jest to rozwiązanie umożliwiające integrację zewnętrznych narzędzi z systemami AI w sposób jednolity i przewidywalny. Dzięki takim rozwiązaniom programiści mogą delegować Agentom bardziej złożone operacje, korzystające nie tylko z bazowej wiedzy modelu, ale z dodatkowych usług wchodzących w skład środowiska programistycznego.

Wybierając preferowane narzędzie do współpracy z AI, **koniecznie sprawdź czy wspiera ono tryb agentowy**. Jest to obecnie standard efektywnej współpracy z modelami językowymi, a rosnąca w czasie sprawczość i autonomia AI to szansa na zyskanie cennego czasu - na odpoczynek lub strategiczne, wymagające uwagi zadania.

### **👨‍💻 Ćwiczenia praktyczne**

**Zadanie 1: Przetestuj dostępne narzędzia w Agencie AI**

**Cel**: Przetestowanie możliwości Agenta AI w oparciu o dostępne narzędzia.

**Instrukcje**:

1. Zapoznaj się z narzędziami wspieranymi przez Agenta AI w twoim IDE ([Cursor](https://cursor.com/docs/agent/tools), [Claude Code](https://docs.anthropic.com/en/docs/claude-code/settings#tools-available-to-claude))
2. Wykonaj pierwsze testy delegując do Agenta:
* Zarządzanie plikami w projekcie (odczyt, dodawanie, modyfikacja)
* Wykonywanie komend z terminala (np. curl, grep, ls, top - lub odpowiedniki)
* Wyszukiwanie danych z sieci (Web Search)

**Zadanie 2: Zaprojektuj reużywalny prompt dla Agenta AI**

**Cel**: Przetestowanie możliwości Agenta AI wykorzystującego publiczne API

**Instrukcje**:

1. Zapoznaj się z publicznym API serialu Rick and Morty - &lt;https://rickandmortyapi.com/documentation&gt;
2. Wyszukaj endpointy do pobierania **postaci** i **lokalizacji** w oparciu o podane ID
3. Zaprojektuj prompt, który zmusi Agenta do pobrania danych z dołączonego API, a następnie w oparciu o te dane wygenerowania krótkiej historii na 3 akapity. Przekazywane parametry:  
   * characterId  
   * locationId  
Przykładowo: “/rick-and-morty characterId: 5, locationId: 10”

**Zadanie 3: Przetestuj możliwości serwera MCP Context7**

**Cel**: Praktyczne zastosowanie serwera MCP Context7 do uzyskania aktualnej dokumentacji podczas pracy z nowymi technologiami. 

**Instrukcje**:

1. Zainstaluj serwer MCP Context7 w preferowanym narzędziu AI
2. Wybierz dowolną technologię z listy wspieranych przez [Context7.com](http://context7.com/) (wersja webowa)
3. Przeprowadź dwie konwersacje na temat wybranej technologii i jej API  
   * Bez korzystania z MCP Context7  
   * Z wykorzystaniem MCP Context7
4. Przeanalizuj różnice w jakości otrzymanych odpowiedzi

**Zadanie 4:** **Przetestuj możliwości innych usług opartych o MCP**

**Cel:** Poznanie praktycznych aspektów wykorzystania MCP poprzez dodanie i konfigurację gotowego serwera w edytorze.

**Instrukcje:**

1. Zapoznaj się z katalogami MCP - [tutaj](https://cursor.directory/mcp) lub [tutaj](https://github.com/punkpeye/awesome-mcp-servers)
2. Wybierz jedną z usług, z której korzystasz na codzień
3. Zainstaluj wybrany serwer w twoim narzędziu AI
4. Z poziomu Agenta przetestuj możliwości MCP - pobieranie danych lub aktualizowanie usługi
![](https://assets-v2.circle.so/ekrtcr8j44qd531ut1i2iwox5c9h)