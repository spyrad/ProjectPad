<!DOCTYPE html>![](https://assets-v2.circle.so/in9osuoqx3ap0hhfs2ob081v706j)

## Wprowadzenie

Dzięki poprzedniej lekcji znasz już fundamenty skutecznej komunikacji z AI. To podstawy, które pozwalają świadomie kontrolować jakość odpowiedzi zamiast polegać na szczęściu.

W tej lekcji poznasz kolejne pięć technik, które przekształcą Twoją pracę z AI z prostej wymiany pytań i odpowiedzi w strukturalny proces rozwoju oprogramowania. Dowiesz się jak wykorzystać modele do systematycznego eksplorowania przestrzeni rozwiązań, planowania złożonych zadań implementacyjnych i unikania typowych pułapek poznawczych, które prowadzą do błędnych decyzji technicznych.

Nauczysz się również ratować konwersacje, które zeszły na manowce - zamiast frustrować się kolejnymi nieudanymi iteracjami, poznasz konkretne strategie ich odblokowania. Na koniec odkryjesz jak wykorzystać tekstowe formaty wizualizacji, od prostych diagramów ASCII przez Mermaid aż po SVG, aby tworzyć dokumentację techniczną i schematy bez walki z narzędziami graficznymi.

Te techniki będą kluczowe w module drugim i trzecim, gdzie przejdziesz od teorii do praktyki, budując własny projekt od analizy wymagań po deployment. Zaczynamy od pierwszej z nich - strukturalnego brainstormingu.

## 1\. Brainstorming i eksploracja rozwiązań

![](https://assets-v2.circle.so/irabjtgqml5474e2tddpfa33dnxe)

Gdy stajemy przed nowym wyzwaniem technicznym - czy to spłacanie długu technicznego w starszej aplikacji, wybór architektury dla nowego modułu, czy optymalizacja wydajności - naturalne jest, że nasza pierwsza intuicja kieruje nas w stronę rozwiązań, które już znamy. To mechanizm obronny umysłu: skracamy czas podejmowania decyzji, opierając się na wcześniejszych doświadczeniach. Problem polega na tym, że często to pierwsze rozwiązanie, które przychodzi nam do głowy, nie jest optymalne.

W przypadku spłacania długu technicznego w aplikacji legacy możemy automatycznie myśleć o &quot;wielkim przepisaniu&quot; lub stopniowej migracji komponent po komponencie. Tymczasem istnieje jeszcze szereg innych podejść.

### **Patrz szerzej - z AI to prostsze**

Modele językowe, dzięki swojej ekspozycji na ogromną ilość dokumentacji technicznej, case studies, artykułów i dyskusji programistycznych, mają wyjątkowo szeroką świadomość najpopularniejszych problemów w branży i sposobów ich rozwiązywania. W tym kontekście topowy LLM jest jak bardzo doświadczony senior developer, który pracował w dziesiątkach projektów i widział, jak różne zespoły radziły sobie z podobnymi wyzwaniami. Kluczowa różnica polega na tym, że AI nie ma uprzedzeń wynikających z ostatnich projektów - nie będzie faworyzować rozwiązania tylko dlatego, że ostatnio sprawdziło się w konkretnym kontekście.

Efektywna eksploracja przestrzeni rozwiązań z AI wymaga zmiany podejścia z &quot;jak to zrobić?&quot; na &quot;w ile sposobów można to zrobić?&quot;. Zamiast od razu prosić model o konkretne rozwiązanie, warto rozpocząć od szerszego spojrzenia na problem i systematycznego przeglądu dostępnych opcji.

Pierwszym krokiem jest właściwe sformułowanie kontekstu. Dobrze przygotowany prompt eksploracyjny powinien zawierać opis obecnego stanu systemu, ograniczenia (czasowe, budżetowe, techniczne), cele które chcemy osiągnąć oraz zespół i jego kompetencje. W przypadku modernizacji legacy aplikacji warto też opisać krytyczne funkcjonalności, które nie mogą być przerwane, oraz obszary systemu, które sprawiają największe problemy.

Następnie model może pomóc w mapowaniu różnych strategii podejścia do problemu. Na przykład dla zadłużenia technicznego może zaproponować podejścia stopniowe (incremental), rewolucyjne (big bang), hybrydowe, czy selektywne. Każde z tych podejść można dalej rozłożyć na konkretne taktyki i techniki. AI może też pomóc w identyfikacji trade-offów - na przykład czy priorytetem jest minimalizacja ryzyka, szybkość dostarczenia, koszt utrzymania w długim terminie, czy elastyczność przyszłych zmian.

### Najlepsze praktyki

Rozpoczynaj sesję eksploracyjną od jasnego zdefiniowania ram problemu, ale unikaj przedwczesnego zawężania opcji. Zamiast pytać &quot;jak najlepiej zrefaktoryzować ten moduł?&quot;, zapytaj &quot;jakie są różne sposoby uporania się z problemami tego modułu?&quot;.

Wykorzystuj AI do generowania różnorodnych perspektyw. Możesz poprosić model o spojrzenie na problem z punktu widzenia różnych ról: architekta systemu, testera, specjalisty od bezpieczeństwa, product managera czy osoby odpowiedzialnej za koszty. Każda z tych perspektyw może ujawnić aspekty, które wcześniej były niewidoczne.

Stawiaj na iteracyjną eksplorację. Rozpocznij od szerokiego przeglądu opcji, a następnie zagłębiaj się w najbardziej obiecujące kierunki. AI doskonale radzi sobie z tym rodzajem &quot;drążenia&quot; - może rozwijać każde podejście na coraz bardziej szczegółowe poziomy, od strategii biznesowej przez taktyki techniczne po konkretne narzędzia i biblioteki.

Dokumentuj proces eksploracji, najlepiej w formie notatki w pliku markdown. AI może pomóc w organizowaniu zebranych pomysłów, grupowaniu podobnych podejść czy identyfikowaniu zależności między różnymi opcjami. Ta dokumentacja będzie bezcenna podczas późniejszego podejmowania decyzji i może służyć jako punkt odniesienia dla podobnych wyzwań w przyszłości.

### Najczęstsze błędy

Jednym z najczęstszych błędów jest zbyt wczesne przejście do szczegółów implementacji. Gdy AI zaproponuje interesujące podejście, naturalne jest, że chcemy od razu dowiedzieć się &quot;jak to dokładnie zrobić?&quot;. Problem polega na tym, że można przegapić inne, potencjalnie lepsze opcje, które model mógłby zaproponować, gdyby miał więcej czasu na eksplorację.

Kolejnym błędem jest przyjmowanie pierwszego rozwiązania, które &quot;brzmi sensownie&quot;. AI ma tendencję do przedstawiania opcji w sposób przekonujący, ale to nie oznacza, że pierwsza propozycja jest optymalna. Warto zawsze poprosić o alternatywy lub kontrargumenty, szczególnie jeśli model wydaje się zbyt pewny swojej rekomendacji. Więcej na ten temat w sekcji “3\. Promptowanie bez efektu potwierdzenia”.

Należy również uważać na pułapkę overthinkingu - sytuacji, gdy eksploracja staje się celem samym w sobie. AI może generować nieskończenie wiele teoretycznych podejść, ale w pewnym momencie trzeba przejść do oceny praktyczności i podjęcia decyzji. Ustal z góry kryteria, według których będziesz oceniać opcje, oraz deadline na zakończenie fazy eksploracyjnej (np. 2 godzinny blok czasu).

Częstym problemem jest też izolowanie eksploracji od reszty zespołu. Brainstorming z AI może być tak produktywny, że zapomina się o włączeniu innych osób w proces. Tymczasem różnorodność perspektyw ludzkich często ujawnia ograniczenia lub możliwości, których model nie jest w stanie przewidzieć - szczególnie te związane z kulturą organizacyjną, polityką wewnętrzną czy ograniczeniami nietechnicznymi.

## 2\. Planowanie zadań

![](https://assets-v2.circle.so/xd9enh70iyjogjy1xsg1zhh2lkf7)

Po udanej fazie eksploracji i wyborze konkretnego rozwiązania, wielu programistów popełnia kluczowy błąd - przechodzi bezpośrednio do implementacji z promptami w stylu &quot;zaimplementuj ten pomysł&quot; lub &quot;napisz kod dla tej funkcjonalności&quot;. To podejście prowadzi do chaotycznego procesu, w którym AI generuje kod fragmentami, często tracąc z oczu szerszy kontekst i architekturę rozwiązania.

Modele językowe, mimo swojej mocy, mają ograniczoną &quot;pamięć roboczą&quot; i koncentrują się głównie na bezpośrednim kontekście promptu. Gdy prosimy je o implementację bez szczegółowego planu, generują kod na podstawie najbardziej oczywistych interpretacji naszych wymagań. Problem polega na tym, że te oczywiste interpretacje mogą nie uwzględniać niuansów naszego konkretnego przypadku użycia, istniejącej architektury czy przyszłych potrzeb.

Dodatkowo, praca bez planu utrudnia iterację i wprowadzanie poprawek. Gdy wygenerowany kod nie spełnia oczekiwań, trudno jest zidentyfikować, czy problem leży w implementacji, czy w nieprecyzyjnym zdefiniowaniu wymagań. Rezultatem są długie sesje “poprawiania po AI&quot; zamiast systematycznego dojścia do rozwiązania.

### Systematyczne planowanie wspólnie z AI

Skuteczne planowanie z AI wymaga przejścia przez strukturalny proces, który przekształca pomysł wysokiego poziomu w szczegółowy, wykonalny plan implementacji. Ten proces powinien zakończyć się dokumentem w formacie Markdown, który służy jako kompletna specyfikacja zadania.

Fajną możliwością wykorzystania Claude Code jest wbudowany &quot;Plan Mode&quot;, który został specjalnie zaprojektowany do tego rodzaju zadań planistycznych. Plan Mode automatycznie strukturyzuje proces planowania, prowadząc przez kolejne etapy: od analizy wymagań, przez projektowanie architektury, aż po szczegółowe zadania implementacyjne. 

W innych narzędziach możemy osiągnąć podobny efekt za pomocą prompta _“Utwórz szczegółowy plan działania zawierający analizę wymagań, projekt architektury, obsługę edge case’ów, obsługę błędów, testy, decyzje do podjęcia, rabbit holes i listę zadań do zaimplementowania”_.

W modułach 2-4 spotkasz się z wieloma promptami planistycznymi, które utworzyliśmy za pomocą metapromptingu.

### Najlepsze praktyki

Każdy plan stworzony przez AI wymaga rewizji programisty przed implementacją. Przeglądając plan od AI pamiętaj o &quot;Definition of Done&quot; dla całego projektu. Dobrze zdefiniowane DoD powinno obejmować nie tylko funkcjonalności, ale też aspekty jakościowe: wydajność, bezpieczeństwo, dokumentację.

Wykorzystuj AI do modelowania edge case&#39;ów i scenariuszy błędów już na etapie planowania. Model może pomóc w systematycznym przejściu przez różne scenariusze &quot;what if&quot; - co się stanie przy awaryjnych obciążeniach, jak system zachowa się przy niepoprawnych danych wejściowych, jak obsłużyć scenariusze częściowej awarii. Te rozważania na etapie planowania są znacznie tańsze niż późniejsze poprawki w kodzie.

Warto włączyć w proces planowania rozważania o testowaniu - od testów jednostkowych przez integracyjne po end-to-end. AI może pomóc w identyfikacji kluczowych przypadków testowych i zaproponować strategię mockowania zależności zewnętrznych. Planowanie testów równolegle z planowaniem implementacji często ujawnia problemy z testowalnością architektury, które można łatwo naprawić na tym etapie.

### Najczęstsze błędy

Jednym z najczęstszych błędów jest tworzenie planów na zbyt wysokim poziomie abstrakcji. Plan w stylu &quot;zaimplementuj API, dodaj frontend, napisz testy&quot; nie jest wystarczająco szczegółowy, aby można było go efektywnie realizować z AI. Dobry plan powinien być na tyle szczegółowy, że każde zadanie można zrealizować bez dodatkowych decyzji.

Kolejny błąd to ignorowanie stanu projektu podczas planowania. AI może zaproponować eleganckie rozwiązanie, które nie pasuje do obecnej architektury lub konwencji projektu. Zawsze warto dostarczyć modelowi kontekst o istniejącym kodzie - struktura katalogów, używane biblioteki, wzorce architektoniczne, konwencje pisania kodu.

Częstym problemem jest też brak review planu przed przejściem do implementacji. Plan stworzony przez AI może zawierać błędy logiczne, nieoptymalną architekturę lub rozwiązania, które nie pasują do kontekstu firmy. Warto zawsze przejrzeć plan z zespołem lub przynajmniej z jedną dodatkową osobą, zanim rozpocznie się implementację.

Nie ignoruj też aspektów bezpieczeństwa i compliance. AI może nie być świadome specyficznych wymagań regulacyjnych w twojej branży lub zasad w Twojej firmie. Te aspekty powinny być jawnie uwzględnione w planie, jeżeli mają wpływ na realizację planu.

## 3\. Promptowanie bez efektu potwierdzenia

Przygotowujesz się do pracy nad nowym projektem lub rozszerzeniem istniejącego - masz w głowie preferowaną bibliotekę, framework lub architekturę. Twój pomysł wydaje się znakomity. Wpisujesz go w okno czatu AI, a model z entuzjazmem przytakuje, chwali Twoje podejście i utwierdza Cię w przekonaniu, że to jedyna słuszna droga. Czujesz się świetnie, ale czy na pewno otrzymałeś najlepszą możliwą radę? A może wpadłeś w pułapkę &quot;potakiwacza&quot;?

Zjawisko to, profesjonalnie nazywane **sycophancy**, było jakiś czas temu [powodem mocnego bólu głowy autorów ChataGPT](https://openai.com/index/sycophancy-in-gpt-4o/). Oznacza ono tendencję modeli językowych do dostosowywania swoich odpowiedzi tak, aby zgadzały się z opinią lub preferencjami użytkownika, nawet jeśli są one błędne lub nieoptymalne. AI, zamiast być obiektywnym ekspertem, staje się cyfrowym &quot;yes-manem&quot;.

To poważne ryzyko. Potwierdzając nasze uprzedzenia, model może nieświadomie zachęcić nas do podjęcia złych decyzji technologicznych, zignorowania lepszych alternatyw i zahamowania krytycznego myślenia.

[FRAGMENT VIDEO](https://player.vimeo.com/video/1122637177?app_id=122963)

### Przejmij kontrolę nad rozmową

Kluczem do uniknięcia pochlebstw jest zmiana sposobu zadawania pytań. Zamiast szukać potwierdzenia (🛑 **Czy to dobry pomysł?**), korzystaj z analizy (✅ **Jakie są wady i zalety tego pomysłu?**) i unikaj sugerowania twoich preferencji.

Oto 5 przykładowych technik promptowania, które zmuszą model do krytycznego myślenia i dostarczą Ci znacznie bardziej wartościowych odpowiedzi.

**1\. Adwokat diabła**

Ten prompt zmusza model do aktywnego szukania słabości w Twoim rozumowaniu.

```
Rozważam {{wprowadzenie etapu intensywnego testowania przed deploymentem, pracując w metodologii Agile}}.

Działaj jako skrajnie sceptyczny i doświadczony architekt oprogramowania. Bądź moim adwokatem diabła. Twoim jedynym zadaniem jest znalezienie wszystkich możliwych słabości, ukrytych kosztów, ryzyk technologicznych i powodów, dla których ten pomysł może się nie powieść w praktyce.
```

**2\. Porównanie alternatyw**

Zamiast skupiać się na jednym rozwiązaniu, poproś o analizę konkurencyjnych opcji.

```
Rozważam {{wprowadzenie etapu intensywnego testowania przed deploymentem, pracując w metodologii Agile}}.

Zamiast oceniać mój wybór, przedstaw mi trzy najlepsze alternatywne podejścia. Dla każdego z nich stwórz tabelę porównawczą w formacie Markdown, uwzględniającą: koszt, skalowalność, krzywą uczenia się i kluczowe ograniczenia.
```

**3\. Analiza &#39;Pre-Mortem**

To niezwykle skuteczna technika kreatywnego myślenia, która polega na wyobrażeniu sobie porażki projektu, zanim się jeszcze zaczął.

```
W moim zespole wdrożyliśmy {{etap intensywnego testowania przed deploymentem, pracując w metodologii Agile}}.

Niestety, pomysł okazał się on kompletną katastrofą. Napisz szczegółową analizę &#39;pre-mortem&#39;, wyjaśniając krok po kroku, jakie błędne założenia, decyzje technologiczne i niedocenione ryzyka doprowadziły do tej porażki.
```

**4\. Zmiana ról i perspektyw**

Każdy problem wygląda inaczej z różnych punktów widzenia. Poproś AI, aby je zasymulowało.

```
Rozważam {{wprowadzenie etapu intensywnego testowania przed deploymentem, pracując w metodologii Agile}}.

Twoim zadaniem jest wyczucie odbioru tego pomysłu przez poszczególnych członków mojego zespołu, tj.:

a) frontend developera
b) specjalisty ds. bezpieczeństwa
c) Chief Revenue Officera

Rozważ jak mój pomysł wpłynie na ich codzienną pracę oraz priorytety i motywację do efektywnej pracy w dłuższej perspektywie. Przedstaw uwagi każdej z tych osób w osobnych sekcjach. W przypadku negatywnego odbioru pomysłu przez conajmniej jedną z tych ról, zaproponuj bardziej korzystną alternatywę zgodną z dobrymi praktykami.
```

**5\. Poszukiwanie &#39;nieznanych niewiadomych&#39;**

Ten prompt jest idealny do odkrywania rzeczy, o których nawet nie wiesz, że powinieneś o nie zapytać.

```
Rozważam {{wprowadzenie etapu intensywnego testowania przed deploymentem, pracując w metodologii Agile}}.

Jakie są &#39;nieznane niewiadome&#39; w tym podejściu, o których powinienem wiedzieć przed rozpoczęciem pracy?
```

### Podsumowanie

Traktuj AI jak niezwykle inteligentnego, ale pozbawionego własnej inicjatywy stażystę. Domyślnie będzie się z Tobą zgadzać, bo tak został nauczony. Twoim zadaniem jako świadomego operatora jest tworzenie promptów, które zmuszą go do wyjścia z tej strefy komfortu. Używając powyższych technik, zamienisz potulnego &quot;potakiwacza&quot; w wartościowego partnera do krytycznej analizy, co bezpośrednio przełoży się na jakość Twojej pracy.

## 4\. Ratowanie problematycznych konwersacji

Każdy programista pracujący z AI zna to frustrujące uczucie - rozpoczynamy z prostym zadaniem, model generuje kod, który prawie działa, więc prosimy o małą poprawkę. Po kilku iteracjach okazuje się, że naprawiając jedną rzecz, AI psuje dwie kolejne. Kod staje się coraz bardziej chaotyczny, pojawiają się błędy, które wcześniej nie istniały, a my mamy wrażenie, że cofamy się zamiast iść do przodu.

Szczególnie problematyczne są sytuacje, gdy zaczynamy &quot;łatać&quot; wygenerowany kod zamiast przemyśleć problem u podstaw. AI może zaproponować quick fix dla konkretnego błędu, ale ten fix może nie pasować do ogólnej architektury rozwiązania. W rezultacie otrzymujemy kod, który technicznie działa, ale jest trudny do zrozumienia, testowania i utrzymania.

![](https://assets-v2.circle.so/so1in0b3tvm48ngw74we7ions576)

Dodatkowym problemem jest narastająca frustracja użytkownika, która często prowadzi do mniej precyzyjnych promptów. Gdy coś nie działa tak jak oczekujemy, naturalne jest, że zaczynamy używać bardziej emocjonalnego języka (&quot;to nadal nie działa&quot;, &quot;napraw to wreszcie&quot;) zamiast precyzyjnych instrukcji. AI może interpretować takie prompty na różne sposoby, co dodatkowo pogarsza sytuację.

### Konsolidacja i reset

Kluczem do ratowania problematycznych konwersacji jest rozpoznanie momentu, gdy dialog staje się antyproduktywny. Warto wtedy zastosować strategiczny reset z zachowaniem wartościowych wniosków. 

Pierwszy krok to obiektywna ocena sytuacji - czy ostatnie kilka iteracji faktycznie przybliża nas do celu, czy raczej wprowadza więcej problemów niż rozwiązuje.

Gdy stwierdzimy, że konwersacja zeszła na manowce, najlepszym rozwiązaniem jest poproszenie modelu o podsumowanie dotychczasowych wniosków i rozpoczęcie nowego wątku z odświeżonym kontekstem. 

Prosząc model o podsumowanie warto wylistować konkretne elementy, które zostały zaimplementowane poprawnie, zidentyfikować miejsca gdzie poprzednie podejście nie sprawdziło się, oraz zaktualizować wymagania o nowe informacje, które odkryliśmy w trakcie eksperymentów. To szczególnie ważne - często pierwotne założenia okazują się niepełne lub nieprecyzyjne dopiero w trakcie implementacji. Oto przykładowy prompt:

```
Zatrzymajmy się na chwilę i przeanalizujmy dotychczasową konwersację. Czuję, że zamiast zbliżać się do rozwiązania, zaczynamy kręcić się w kółko i wprowadzać więcej problemów niż rozwiązujemy.

Potrzebuję od Ciebie szczegółowego, obiektywnego podsumowania naszej dotychczasowej pracy, które pomoże mi rozpocząć nową konwersację z czystym kontekstem. Skup się na konkretach, nie na ogólnikach.

**Co działa i powinno zostać zachowane:**
Opisz wszystkie elementy, które zostały poprawnie zaimplementowane i nie wymagają zmian. Dla każdego elementu wyjaśnij dlaczego działa dobrze i jakie konkretnie wymaganie spełnia.

**Gdzie nasze podejście zawiodło:**
Zidentyfikuj momenty w tej konwersacji, w których zaczęliśmy schodzić na manowce. Jakie decyzje implementacyjne okazały się błędne? Które próby naprawy pogarszały sytuację zamiast ją poprawiać? Bądź szczegółowy - zamiast &quot;kod nie działa&quot;, opisz precyzyjnie jakie zachowanie obserwujemy, czego oczekujemy, oraz jakie konkretne błędy występują.

**Czego się nauczyliśmy:**
Jakie nowe informacje odkryliśmy w trakcie eksperymentów? Które z pierwotnych założeń okazały się niepełne lub nieprecyzyjne? Czy pojawiły się dodatkowe wymagania lub ograniczenia, których nie uwzględniliśmy na początku?

**Zaktualizowany kontekst problemu:**
Na podstawie wszystkich powyższych wniosków sformułuj kompletny opis problemu, jaki powinienem przekazać w nowej konwersacji. Ten opis powinien być na tyle szczegółowy, że niezależny programista mógłby zrozumieć co dokładnie próbujemy osiągnąć, bez dostępu do tej konwersacji.

Zapisz podsumowanie w conversation-summary-{timestamp}.md
```

Nowa konwersja powinna rozpocząć się od ulepszonego prompta, który zawiera pełny kontekst problemu i jasno zdefiniowane oczekiwania oraz podsumowanie z poprzedniej próby. 

### **Najlepsze praktyki**

Naucz się rozpoznawać sygnały ostrzegawcze problematycznej konwersacji. Zwykle są to takie symptomy: model zaczyna wprowadzać zmiany, których nie było w planie, kod staje się coraz bardziej skomplikowany bez dodania nowej funkcjonalności, pojawiają się błędy w miejscach, które wcześniej działały poprawnie, oraz gdy czujesz frustrację i zaczynasz używać mniej precyzyjnych instrukcji.

Wprowadź zasadę &quot;trzech prób&quot; - jeśli trzeci fix wprowadza nowe problemy, to znak, że konwersacja wymaga resetu. Ta zasada pomoże ci uniknąć długich sesji frustrującego debugowania z AI, które rzadko prowadzą do satysfakcjonujących rezultatów.

### **Najczęstsze błędy**

Najczęstszym błędem jest zbyt długie trwanie przy problematycznej konwersacji w nadziei, że &quot;kolejna poprawka na pewno to naprawi&quot;. To myślenie przypomina sunk cost fallacy - im więcej czasu zainwestowaliśmy w obecną konwersację, tym trudniej jest ją porzucić, nawet gdy staje się kontrproduktywna.

Unikaj też błędu &quot;obciążania winą AI&quot; - gdy konwersacja nie idzie dobrze, łatwo jest przyjąć postawę, że &quot;model jest głupi&quot; lub &quot;AI nie rozumie&quot;. W rzeczywistości problematyczne konwersacje często wynikają z niedostatecznie precyzyjnych instrukcji, sprzecznych wymagań, lub problemów z kontekstem. Obiektywna analiza zwykle ujawnia obszary, w których można poprawić komunikację z modelem.

Kolejnym błędem jest rozpoczynanie nowej konwersacji bez odpowiedniego podsumowania poprzedniej. Jeśli po prostu skopiujesz kod z problemami do nowego chatu i powiesz &quot;napraw to&quot;, prawdopodobnie napotkasz podobne problemy. Nowa konwersacja powinna być świadomym fresh start z lepiej przygotowanym kontekstem.

Nie ignoruj też wzorców w problemach, które napotykasz. Jeśli regularnie musisz resetować konwersacje przy podobnych typach zadań, to może wskazywać na systematyczne problemy z tym jak formułujesz pierwotne wymagania lub jak strukturyzujesz prompty. Warto przeanalizować te wzorce i dostosować swoje podejście.

## 5\. Diagramy i schematy

Na początku współpracy z AI korzystamy przede wszystkim ze zdolności modeli do procesowania tekstu – zadajemy tekstowe pytanie i otrzymujemy tekstową odpowiedź. Zdarza się jednak, że problem, nad którym pracujemy, jest zbyt złożony, by opisać go słowami. Architektura systemu, przepływ danych, zależności między komponentami – to wszystko łatwiej zrozumieć, gdy można to **zobaczyć**.

Czy wystarczy więc zmusić model językowy do rysowania? Modele multimodalne (procesujące wiele formatów jednocześnie) faktycznie radzą sobie z tym problemem coraz lepiej, ale do spójnych diagramów technicznych wciąż bardzo daleka droga. Wystarczy tylko przetestować GPT-5 na dość prostym poleceniu:

```
Utwórz wizualizację uproszczonej architektury trójwarstwowej (klient, serwer aplikacji, baza danych), pokazując przepływ zapytania od klienta do bazy i z powrotem. Do każdej warstwy dodaj etykiety w języku polskim wyjaśniające znaczenie danych elementów. Format 16:9.
```

Efekt? Daleki od oczekiwanego.

![](https://assets-v2.circle.so/6qqlmilysctx141sgj8nmixkxfnt)

Midjourney interpretuje to polecenie w jeszcze bardziej kreatywny sposób:

![](https://assets-v2.circle.so/63lcyktnke7mq41l5me1hwlx54vm)

Czy oznacza to, że diagramy i schematy techniczne są poza zasięgiem AI? Nic bardziej mylnego - rozwiązanie polega jednak na dobraniu formatu innego niż obraz. Paradoksalnie - nadal tekstowego.

[FRAGMENT VIDEO](https://player.vimeo.com/video/1122662194?app_id=122963)

### Interaktywne artefakty

Webowe usługi AI najnowszej generacji (ChatGPT, Claude.AI) są w stanie tworzyć i wyświetlać dla nas mini-aplikacje w formie interaktywnych artefaktów. Zwykle opierają się one na stacku HTML + CSS + JS, ze szczególnym uwzględnieniem bibliotek takich jak React czy Three.js - to ciekawy, choć dość złożony i podatny na błędy sposób testowania swoich pomysłów “w 3D”.

Niestety, w tej metodzie jesteśmy też podatni na wszystkie próby “one-shotowania” aplikacji z wykorzystaniem AI - okazjonalne błędy logiki, halucynacje czy brakujące importy. Stąd, poza początkowym promptem, prawdopodobnie będziesz zmuszony korygować AI dodatkowymi poleceniami, weryfikując m.in. stan konsoli w przeglądarce.

Poniżej prompt dla ChataGPT:

```
Utwórz aplikację HTML + JavaScript + CSS z wykorzystaniem Three.js, która zawiera schemat uproszczonej architektury trójwarstwowej (klient, serwer aplikacji, baza danych), pokazując przepływ zapytania od klienta do bazy i z powrotem. Do każdej warstwy dodaj etykiety w języku polskim wyjaśniające znaczenie danych elementów.
```

### Diagramy ASCII ART

Popularnym i niezwykle uniwersalnym formatem wizualizacji, z którym dobrze radzą sobie modele językowe, jest [ASCII ART](https://pl.wikipedia.org/wiki/ASCII-Art). To grafika tworzona za pomocą znaków z tablicy ASCII. Jest idealna do szybkich schematów, które muszą być czytelne w każdym środowisku tekstowym – od terminala po komentarze w kodzie.

**Kiedy używać?**

* Do prostych diagramów blokowych.
* Do ilustracji przepływu sterowania w algorytmach.
* Gdy potrzebujesz wizualizacji, którą możesz wkleić dosłownie wszędzie.

**Przykład promptu:**

```
Utwórz wizualizację uproszczonej architektury trójwarstwowej (klient, serwer aplikacji, baza danych), pokazując przepływ zapytania od klienta do bazy i z powrotem. Do każdej warstwy dodaj etykiety w języku polskim wyjaśniające znaczenie danych elementów.. Zastosuj format ASCII ART.
```

### Diagramy Mermaid

Tam, gdzie analizujesz lub debugujesz złożone przepływy informacji, użyteczne mogą się okazać diagramy [Mermaid](https://mermaid.js.org/). To potężny dodatek do Markdowna, który pozwala generować diagramy z tekstu.

**Kiedy używać?**

* Do diagramów sekwencji, przepływu, wykresów Gantta, diagramów klas.
* Do dokumentacji technicznej w plikach [README.md](http://readme.md/).
* Gdy potrzebujesz estetycznego, czytelnego diagramu, który łatwo edytować.

**Przykład promptu:**

```
Przedstaw cykl życia zapytania HTTP z formularza na serwer, z zachowaniem produkcyjnych elementów aplikacji webowej (Load Balancer, Web Server, API, Baza Danych). Zastosuj format Mermaid jako diagram sekwencji.
```

Schemat utworzony przez AI możesz wkleić do edytora online [Mermaid Live](https://mermaid.live/edit) lub użyć pluginu w swoim edytorze kodu (np. [Markdown Preview Mermaid](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid) dla VS Code), oznaczając snippet jako mermaid.

### Grafika wektorowa na żądanie

Czy wiesz, że AI może tworzyć dla Ciebie obrazy, które nie tracą na jakości przy skalowaniu? SVG (Scalable Vector Graphics) to format obrazu oparty na XML. Oznacza to, że jest to czysty tekst, który przeglądarka renderuje jako grafikę. Możesz poprosić AI o wygenerowanie kodu SVG dla ikon, prostych ilustracji czy elementów UI.

**Kiedy używać?**

* Do tworzenia niestandardowych ikon do projektu.
* Do generowania prostych wizualizacji danych.
* Gdy potrzebujesz grafiki, którą możesz łatwo modyfikować (np. zmieniać kolory przez CSS).

**Przykład promptu:**

```
Wygeneruj kod SVG dla ikony &#39;usuń&#39;. Ikona powinna przedstawiać kosz na śmieci w minimalistycznym stylu, w kolorze #FF5252, o wymiarach 24x24 piksele, z zaokrąglonymi rogami.
```

### LaTeX i Tabele Markdown

Wizualizacja to nie tylko obrazki. To także czytelne i jednoznaczne przedstawienie wzorów matematycznych, algorytmów czy ustrukturyzowanych danych.

**a) LaTeX dla wzorów**

Jeśli pracujesz z matematyką, fizyką lub algorytmiką, poproś AI o formatowanie wzorów za pomocą LaTeX. Jest to standard w świecie naukowym, wspierany przez wiele parserów Markdown.

**Przykład promptu:**

```
Wyjaśnij działanie funkcji aktywacji Sigmoid używanej w sieciach neuronowych i przedstaw jej wzór matematyczny w formacie LaTeX.
```

**b) Tabele Markdown dla danych**

Zamiast prosić o listę danych w przypadkowej formie, zażądaj od AI przedstawienia ich w postaci tabeli. To natychmiast poprawia czytelność i ułatwia porównywanie informacji.

**Przykład promptu:**

```
Mam listę zależności w projekcie: react, react-dom, typescript, eslint, prettier. Stwórz tabelę w formacie Markdown, która będzie zawierać nazwę biblioteki, jej typ (np. &#39;production&#39;, &#39;development&#39;) i krótki opis przeznaczenia.
```

Opanowanie tekstowych formatów wizualizacji to kolejny krok w efektywnej współpracy z AI. Zamiast być pasywnym odbiorcą tekstu, możesz zlecać modelowi tworzenie ustrukturyzowanych, graficznych reprezentacji danych. Przedstawione formaty – ASCII Art oraz diagramy Mermaid, rozszerzone o SVG, LaTeX i tabele Markdown - powinny na stałe wejść do twojego przybornika narzędzi AI.  

### 🧑🏻‍💻 Ćwiczenia praktyczne

Poniżej przygotowaliśmy kilka ćwiczeń, które pomogą Ci przetestować nowe techniki w praktyce. Ich realizacja jest opcjonalna, nie są wymagane aby otrzymać certyfikat ukończenia kursu. Mimo to, zachęcamy do ich przerobienia - dzięki temu lepiej zapamiętasz te kluczowe sposoby na efektywną współpracę z AI i będzie łatwiej ci z nich skorzystać w potrzebie.

**1\. Burza mózgów: Spłata długu technicznego**

**Cel:** Wykorzystanie AI do szerokiej eksploracji rozwiązań, unikając przywiązania do pierwszego pomysłu.

**Czas:** 20 minut

**Kroki:**

1. Wybierz jeden konkretny problem z długiem technicznym w Twoim aktualnym projekcie (np. przestarzała zależność, skomplikowany moduł).
2. Sformułuj prompt dla AI, w którym dokładnie opisujesz ten problem i jego kontekst biznesowy.
3. Poproś AI o wygenerowanie pięciu odrębnych strategii rozwiązania problemu.
4. Wskaż, aby każda propozycja została krótko przeanalizowana z perspektywy różnych ról (np. architekta, menedżera produktu).
5. Przeanalizuj wyniki i zastanów się, której strategii nie brałeś wcześniej pod uwagę.

  
**2\. Post-Mortem zablokowanej konwersacji**

**Cel:** Nauka ratowania nieudanych konwersacji z AI i wyciągania z nich wniosków.

**Czas:** 15 minut

**Kroki:**

1. Przejrzyj historię swoich rozmów z AI i znajdź jedną, która stała się chaotyczna lub nieproduktywna.
2. Użyj promptu z sekcji do “4\. Ratowanie konwersacji z AI”, prosząc AI o podsumowanie.
3. Dokonaj przeglądu podsumowania, wprowadź poprawki i rozpraw się z problemem (jeżeli wcześniej stanąłeś w miejscu).

**3\. Adwokat Diabła dla twojej ulubionej biblioteki**

**Cel:** Aktywne przełamywanie efektu potwierdzenia i krytyczna ocena własnych wyborów.

**Czas:** 15 minut

**Kroki:**

1. Wybierz jedną bibliotekę lub framework, z którego korzystasz w projekcie i uważasz za doskonały wybór.
2. Przygotuj prompt, w którym prosisz AI o wcielenie się w rolę &quot;adwokata diabła&quot; lub skrajnie sceptycznego architekta oprogramowania.
3. Poproś o znalezienie i wypunktowanie wszystkich potencjalnych wad, ryzyk technicznych i ukrytych kosztów związanych z tą technologią.
4. Zastanów się, czy któreś z wymienionych ryzyk są realne w Twoim projekcie.

**4\. Tabela porównawcza alternatyw**

**Cel:** Ustrukturyzowane porównywanie opcji w celu podjęcia świadomej decyzji.

**Czas:** 15 minut

**Kroki:**

1. Wybierz jedną bibliotekę, której używasz w projekcie (np. do zarządzania stanem).
2. Poproś AI o znalezienie trzech popularnych alternatyw dla tej biblioteki.
3. Zleć AI stworzenie tabeli w formacie Markdown, która porówna wszystkie cztery opcje.
4. Wskaż, że tabela ma zawierać kolumny: Nazwa, Główne przeznaczenie, Popularność (np. gwiazdki na GitHub) i Kluczowe ograniczenie.

  
## 🏁 Podsumowanie

W tej lekcji opanowałeś kolejne pięć technik efektywnego wykorzystywania AI w codziennej pracy programisty. Dzięki strukturalnemu brainstormingowi potrafisz teraz patrzeć na dany problem szerzej niż wcześniej, planowanie zadań pomoże Ci rozkładać złożone wyzwania na wykonalne kroki, a techniki anti-bias sprawią, że unikniesz typowych pułapek myślowych i skłonności modeli do pochlebstw. Wiesz już również jak wybrnąć z problematycznych konwersacji (zamiast w gniewie anulować subskrypcję Twojej usługi AI). Poradzisz sobie również z tworzeniem diagramów, które mogą wzbogacić dokumentację projektu i prezentacje.

Te umiejętności będą kluczowe w module drugim - możesz z nich korzystać już od samego początku, na etapie przygotowywania docelowego kształtu projektu, a także dalej - podczas implementowania kolejnych fragmentów aplikacji.

W efekcie, korzystanie z AI będzie prawdziwą przyjemnością, a nie chaotycznym eksperymentem.

![](https://assets-v2.circle.so/ekrtcr8j44qd531ut1i2iwox5c9h)