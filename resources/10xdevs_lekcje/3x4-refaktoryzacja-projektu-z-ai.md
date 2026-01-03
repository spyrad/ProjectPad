<!DOCTYPE html>![](https://assets-v2.circle.so/8t9pk3raz7201twd6hql4xptvucf)

## Wprowadzenie

W tej lekcji zaprezentujemy ci kilka technik i scenariuszy refaktoryzacji projektu z AI, które mogą być przydatne do łatwiejszego utrzymywania aplikacji. Na początku proponujemy zapoznanie się z całością lekcji, a następnie wdrożenie tych zmian, które wydają ci się najbardziej interesujące.

Zawartość tej lekcji potraktuj jako sugestie - nie są one częścią głównej certyfikacji uczestnika 10xDevs, ale mogą zapewnić łatwiejszy rozwój i utrzymanie projektu, jeśli zdecydujesz się na udostępnienie go publicznie.

Jeśli potrzebujesz więcej czasu na realizację kluczowych elementów aplikacji z poprzednich lekcji, możesz kontynuować swoją pracę, a do materiałów poniżej wrócić w preferowanym przez ciebie momencie.

## 🕵️‍♀️ AI Detektyw

W poszukiwaniu kandydatów do refaktoryzacji można wykorzystać “AI Detektywa” wycelowanego w kierunku danego folderu lub modułu. Tam, w oparciu o nasze instrukcje, model na podstawie narzędzia jak “search directory” czy “terminal command” wykona odpowiednie operacje starając się odpowiedzieć na nasze zadanie.

Przykładowo, aby wyszukać najdłuższe pliki w folderze, bazujemy na trybie agenta w Cursorze:

Prompt [Analiza Złożoności Komponentów](https://10xrules.ai/prompts?org=10xdevs&amp;collection=m3-prod&amp;segment=l4-refactor&amp;prompt=f3391adb-6ae4-41ec-aedd-9d23964fd704).

W trakcie działania Agenta widać wykorzystywane komendy i efekty:

![](https://assets-v2.circle.so/46rq00l04dnmxxs9wfcyzk1bef9s)

Prośba o ścieżki do plików ułatwia dalszą eksplorację każdego modułu:

![](https://assets-v2.circle.so/vsgooc0k1pszczind3osudwaymqp)

W zależności od złożoności prompta, konkretnych wytycznych i naszej intuicji, w analizie mogą się pojawić określone sugestie dalszych kroków:

![](https://assets-v2.circle.so/nt3amfhn2jbb5pk37xoxhiekydff)

Jeśli chcesz poznać opinię AI nt. twojego projektu, przetestuj “AI Detektywa”, dzięki któremu uzyskasz feedback nt. określonych folderów czy zestawu plików. Poszukiwania możesz połączyć z regułami dla AI, które pozwolą modelowi ocenić stan plików względem twoich oczekiwań.

Aby rozszerzyć precyzję prompta do analizy i krytycznej oceny plików, rozpocznij od “Chat with AI” pytając o najlepsze branżowe standardy i wzorce w danym obszarze lub technologii.

## Refaktoryzacja formularzy

Jedną z najbardziej uniwersalnych rekomendacji do refaktoryzacji projektu jest wyszukiwanie tych elementów, które łamią tzw. “Single Responsibility Principle”. W momencie pisania tej lekcji, jakość komponentów formularzy w 10xRules zdecydowanie nie podążała za tą zasadą:

* komponenty formularze utrzymywały stan lokalny
* zajmowały się walidacją
* komunikowały się backendem
* obsługiwały błędy
* a dodatkowo… definiowały “look &amp; feel”, czyli to, co powinny robić przede wszystkim

Podejść do refaktoryzacji tego problemu jest kilka, ale główne zasady sprowadzają się do wyniesienia logiki (walidacji, obsługi błędów i zapytań) do osobnych plików lub modułów. Na poniższym filmie zobaczysz, jak zrealizowałem te zmiany z [Zodem](https://zod.dev/) oraz [react-hook-form](https://www.react-hook-form.com/):

[FRAGMENT VIDEO](https://player.vimeo.com/video/1072073819?app_id=122963&amp;byline=0&amp;badge=0&amp;portrait=0&amp;title=0)

Jak widać, nie obyło się bez małych problemów, ale wtedy zadziałała moja wiedza o projekcie. To kolejny dowód na to, o czym pisaliśmy we wstępie - im więcej wiedzy i doświadczenia inżynierskiego, tym lepsze efekty refaktoryzacji (nawet przy współpracy z AI). Pamiętaj o tym szlifując swoje umiejętności techniczne - nawet delegując musisz wiedzieć, co chcesz osiągnąć i z jakim ryzykiem może się to wiązać.

Główny prompt, który wykorzystałem do przeprowadzenia refaktoryzacji, znajdziesz poniżej:

Prompt [Plan Refaktoryzacji React Hook Form](https://10xrules.ai/prompts?org=10xdevs&amp;collection=m3-prod&amp;segment=l4-refactor&amp;prompt=80d351f0-ec77-4776-9a77-fbb03e533b07).

**👉 Ważne:** Zadbaj o to, żeby reguły walidacji logowania nie konfliktowały z zakładaniem konta - inaczej użytkownik założy konto z loginem i hasłem, którego nie będzie mógł wykorzystać 😅

## Responsywny interfejs użytkownika

Responsywny i adaptujący się do rozmiaru ekranu interfejs to standard nowoczesnych aplikacji webowych. Niestety, programiści korzystający z modeli językowych często nie uzyskują oczekiwanych efektów po wydaniu ogólnikowego polecenia w stylu &quot;spraw, aby interfejs był responsywny&quot;. Na tym etapie szkolenia 10xDevs znasz już powód - to brak niezbędnego kontekstu technicznego. Bez określenia używanej technologii, aktualnego stanu kodu ani docelowych rozdzielczości, model nie jest w stanie zaproponować rozwiązania problemu.

Problemem jest również niejednoznaczność terminu &quot;responsywny&quot;, który może oznaczać różne podejścia techniczne - od media queries po przekierowania na dedykowane podstrony w zależności od platformy użytkownika. Skuteczniejsza komunikacja wymaga precyzyjnych poleceń zawierających informacje o technologiach, konkretnych elementach i ich oczekiwanym zachowaniu w różnych scenariuszach.

A co jeśli nie wiemy, jakie rozwiązanie będzie optymalne? Problem z kolekcjami w 10xRules, który widzisz na poniższym screenie, można przecież rozwiązać na kilka sposobów:

![](https://assets-v2.circle.so/bb7occ9gpa51yzinemz29q0iuivc)

Zamiast przeskakiwać do implementacji losowego pomysłu, rozpocznijmy od przetestowania kreatywności modelu dołączając screenshot oraz niezbędny kontekst:

![](https://assets-v2.circle.so/pza27imfjn5xa7vq8jja93ta3vaa)

Model zwrócił trzy propozycje zmian:

* Pełnoekranowy sidebar na mobile z animowanym przejściem
* Bottom Sheet na mobile
* Panele jako pełnoprawne strony, z nawigacją na dole ekranu

Żeby wybrać preferowaną opcję, wydałem kolejne polecenie:

Prompt [Ocena Dostępności](https://10xrules.ai/prompts?org=10xdevs&amp;collection=m3-prod&amp;segment=l4-refactor&amp;prompt=1373b4bb-e85e-4ff0-8560-3749a153c41a).

Jedna z propozycji wypadła naprawdę słabo - argumentacja wyglądała tak jak poniżej:

![](https://assets-v2.circle.so/4a5kw865avxgitxiughd1raw3upo)

Rekomendacją została nawigacja na dole ekranu:

![](https://assets-v2.circle.so/o35cy9j1ndps4d7iscm1mxyrz85l)

W tym momencie przeszedłem na tryb agenta i utworzyłem checkpoint do nowej konwersacji:

Prompt [Specyfikacja Nawigacji Mobilnej](https://10xrules.ai/prompts?org=10xdevs&amp;collection=m3-prod&amp;segment=l4-refactor&amp;prompt=ba905c95-e59c-4c50-915d-33c1675b9e57).

Możesz wykorzystać szkielet takiego dokumentu aby utworzyć plan zmian u siebie:

[mobile-navigation.md](https://assets-v2.circle.so/4zyclemrwum0n0vmqlev8fgp2rl6)

Tutaj trzy praktyczne uwagi:

* nie chcę, aby w specyfikacji była zawarta konkretna implementacja - w razie problemów pozwoli to eksperymentować z wieloma promptami i modelami
* chcę pozostawić referencje do komponentów, aby w kolejnej konwersacji zwiększyć precyzję wdrażania zmian
* zabezpieczam się przed zmianami trybu desktop, który działa zgodnie z oczekiwaniami

Najlepsze efekty z poniższym (dość skrótowym) promptem dał mi Claude 4.5 Sonnet:

Prompt [Implementacja Nawigacji Mobilnej](https://10xrules.ai/prompts?org=10xdevs&amp;collection=m3-prod&amp;segment=l4-refactor&amp;prompt=0961cf8a-64c0-4f2d-87dd-2f9e190ae06e).

Drobne korekty (np. padding i usunięcie zbędnych ikonek) pozwoliły mi osiągnąć oczekiwany efekt:

[FRAGMENT VIDEO](https://player.vimeo.com/video/1071932629?app_id=122963&amp;byline=0&amp;badge=0&amp;portrait=0&amp;title=0)

## Korzystanie z instrukcji migracji

Do przeprowadzenia refaktoryzacji z AI znakomicie sprawdzą się wszelkiego rodzaju dokumenty takie jak _changelogi_ czy _migration guide_, które w bezpośredni sposób opisują jak przejść z punktu A do punktu B (np. inny sposób posługiwania się określoną funkcją czy API biblioteki). Dla AI ten _migration guide_ będzie jak obszerny i precyzyjny prompt, który napisał doświadczony programista.

Przykładami takich dokumentów mogą być:

* &lt;https://react.dev/blog/2024/04/25/react-19-upgrade-guide&gt;
* &lt;https://svelte.dev/docs/svelte/v5-migration-guide&gt;
* &lt;https://laravel.com/docs/12.x/upgrade&gt;

Tego typu instrukcje jako tekst możemy na czas współpracy z AI dodać do projektu, albo wykorzystać funkcje takie jak “Custom Docs” w Cursorze (Symbol “@Docs” w trakcie konwersacji), aby edytor sam zbudował wiedzę na dany temat:

![](https://assets-v2.circle.so/23hwlhs27k0nua7rocjfihou056m)

Powyższą dokumentację dodałem do projektu jako “R19Migration”, a następnie użyłem prostego prompta w trybie “Chat with AI” wskazując na wybrany folder:

Prompt [Ocena migracji do React 19](https://10xrules.ai/prompts?org=10xdevs&amp;collection=m3-prod&amp;segment=l4-refactor&amp;prompt=a058e099-0a27-4aa4-9642-e95db490959c).

Zwracam tutaj uwagę, że celowo rozdzielam etap analizy od wdrażania zmian, żeby w pierwszym kroku sprawdzić jak model interpretuje zalecenia z wybranego dokumentu.

W 10xRules (React 18.3) ocena komponentów wypadła pozytywnie:

![](https://assets-v2.circle.so/a33b1nspx9225ns66f5rq0mhxff3)

Ten sam mechanizm warto przetestować na innych projektach, gdzie sugestii do refaktoryzacji może być znacznie więcej. Efektem ubocznym precyzyjnych instrukcji dla innych programistów jest to, że modele AI zaczynają dzięki nim działać znacznie lepiej.

## Eksperymenty domenowe

Na projektach dużej skali możesz również eksperymentować z wyodrębnianiem domen w stylu DDD, analizując potencjalne wzorce strategiczne i taktyczne, które można wprowadzić do projektu (pamiętaj jednak, że bycie Domain-Driven nie oznacza wyłącznie zmian na poziomie klas czy funkcji, ale współpracy całej organizacji - w tym biznesu).

Prompt [Restrukturyzacja Domain-Driven Design](https://10xrules.ai/prompts?org=10xdevs&amp;collection=m3-prod&amp;segment=l4-refactor&amp;prompt=b642dc6a-9a46-4884-89f6-90c2c73cd44d).

Tego typu prompty będą przydatne do analizy projektu, którym zajmiemy się w module trzecim.

## Supabase i Row-Level Security

[Row-Level Security (RLS)](https://supabase.com/docs/guides/database/postgres/row-level-security) to dodatkowy mechanizm bezpieczeństwa w PostgreSQL, który umożliwia kontrolę dostępu do danych na poziomie poszczególnych wierszy. Dzięki RLS możemy definiować polityki bezpieczeństwa, które określają, które wiersze danej tabeli mogą być odczytywane, modyfikowane lub usuwane przez konkretnych użytkowników. 

W bibliotekach Supabase jest to o tyle istotne, że SDK udostępnia bezpośrednie połączenie do bazy danych z również z frontendu. Bez RLS użytkownicy mogliby potencjalnie uzyskać dostęp do wszystkich danych. 

Jeśli do tej pory nie włączyłeś tej funkcji, o braku RLS dowiesz się bezpośrednio z panelu projektu:

![](https://assets-v2.circle.so/f6x6c99ubxp1gm0mscxsrn7gto28)

Włączając RLS dla tabeli możemy zdefiniować polityki określające, które wiersze mogą być odczytywane, modyfikowane lub usuwane przez konkretnych użytkowników. Supabase integruje ten mechanizm ze swoim systemem autoryzacji poprzez funkcje takie jak auth.uid(), które pozwalają na łatwe tworzenie polityk ograniczających dostęp do danych na podstawie tożsamości użytkownika. 

W naszych projektach możemy [wykorzystać prompt z dokumentacji](https://supabase.com/docs/guides/getting-started/ai-prompts/database-create-migration) jako kolejną regułę dla AI, tworząc nową migrację z włączeniem RLS na wszystkie operacje CRUD. Przy okazji możemy się odwołać do schematu bazy:

Prompt [Migracja Row Level Security](https://10xrules.ai/prompts?org=10xdevs&amp;collection=m3-prod&amp;segment=l4-refactor&amp;prompt=3ae72005-117a-4b04-9dcd-3f74e10903bd).

Po utworzeniu pliku z migracją warto zapoznać się ze szczegółami. Jeśli akceptujemy zmiany, możemy zaaplikować dane na bazie poprzez _supabase db push_:

![](https://assets-v2.circle.so/uowsxx98ocjnltqx967o5i3mq8i1)

Po zastosowaniu migracji, ostrzeżenie o braku RLS zniknie, a w politykach bazy będziemy mogli się zapoznać z wdrożonymi politykami:

![](https://assets-v2.circle.so/cl1imshorzval8yxwc6i9dlvl2wl)

Pamiętaj, aby zmiany wprowadzić zarówno na bazie lokalnej, jak i tej do testów e2e. Do przełączania między bazami w Supabase CLI służy polecenie _supabase link_.

## 🏁 Podsumowanie lekcji

W przypadku refaktoryzacji z AI chyba najmocniej widać zależność jakości współpracy od doświadczenia programisty. W końcu żeby coś zmienić na lepsze, musimy to “coś” znać i wiedzieć, jak może wyglądać po refaktoryzacji. Stąd wiele propozycji refaktoryzacji może się rozpoczynać w trybie “Chat with AI”, gdzie otrzymujemy partnera do rozmowy, a nie magiczną różdżkę do kompletnej odmiany projektu.

No i traktujmy refaktoryzację jako proces ciągły, polegający na krytycznej ocenie stanu projektu, gdzie prompty to wyłącznie dodatek do naszych obserwacji i sugestii AI. Przedstawione techniki pogłębimy w module trzecim.

Zwracamy też uwagę, że refaktoryzacja nie powinna, ale w praktyce może wpływać na zachowanie aplikacji. Aby ustrzec się przed błędami “bez powrotu”, pamiętaj o:

* regularnym commitowaniu zmian, które zweryfikowałeś i które działają poprawnie
* regularnym rozszerzaniu zestaw testów automatycznych
* uzupełnianiu dokumentacji o szczegóły wprowadzonych zmian
* tworzeniu cząstkowych “specyfikacji” zmian, które zaprojektujesz dyskutując z AI

## 👨‍💻 Ćwiczenia praktyczne

### **Zadanie 1: Przetestuj możliwości “AI Detektywa”**

**Cel:** Przeanalizuj wybrany folder lub moduł pod kątem redukcji złożoności i ulepszenia jakości.

**Instrukcje:**

1. Zaktualizuj przedstawiony prompt do przeszukiwania plików i folderów w taki sposób, aby brał pod uwagę wszystkie rozszerzenia plików.
2. Przetestuj jego działanie w wybranym obszarze projektu.
3. Wprowadź jedną lub kilka sugestii refaktoryzacji uzyskanych od AI.

### **Zadanie 2: (Opcjonalne) Wprowadź zabezpieczenia RLS**

**Cel:** Zabezpiecz dane użytkowników wprowadzając mechanizm weryfikacji dostępu.

**Instrukcje:**

1. Zweryfikuj stan RLS na najważniejszych tabelach w twojej bazie Supabase.
2. Jeśli RLS jest wyłączony, skorzystaj z reguł dla Supabase oraz [prompta do migracji](https://supabase.com/docs/guides/getting-started/ai-prompts/database-create-migration) aby wprowadzić nowe zabezpieczenia.

### **Zadanie 3: (Opcjonalne) Analiza UI z Gemini 2.0 Flash**

**Cel:** Sprawdź możliwości Gemini 2.0 Flash w kontekście oceny interfejsu użytkownika

**Instrukcje:**

1. Nagraj krótki film z poruszania się po aplikacji (10-20 sekund)
2. Wejdź do [Google AI Studio](https://aistudio.google.com/prompts/new%5Fchat) i wybierz model Gemini 2.0 Flash
3. Napisz prompt, którzy zmusi model do oceny interfejsu aplikacji - sprawdź jak modele obecnej generacji radzą sobie z “oglądaniem twojego projektu” np. pod kątem responsywności
4. Podziel się wynikami testów na kanale [#Dyskusje - praktyka \[10X\]](https://bravecourses.circle.so/c/watki-dotyczace-lekcji-i-cwiczen)
![](https://assets-v2.circle.so/ekrtcr8j44qd531ut1i2iwox5c9h)