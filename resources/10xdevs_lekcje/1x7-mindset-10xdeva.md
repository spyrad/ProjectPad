<!DOCTYPE html>![](https://assets-v2.circle.so/uv7jxgyfeud82smfpbb2rffqv30r)

## Wprowadzenie

AI-assisted development ma różne odsłony, ale obecnie dzieli się przede wszystkim na dwa odmienne podejścia. 

Na jednym końcu mamy vibe coding z AI - użytkownik generuje kod bez zrozumienia, polega na &quot;magii&quot; modeli i ma nadzieję, że &quot;jakoś to będzie&quot;. 

Na drugim końcu spec-driven development z AI - każde użycie AI ma jasny cel, wynik jest weryfikowany, a model wspiera realizację wcześniej zdefiniowanych wymagań.

![](https://assets-v2.circle.so/rdwt36oyvo1bxyydxxs8l45sstsw)

Niestety wiele osób całe zagadnienie programowania z AI określa mianem &quot;vibe codingu&quot;, co nie jest trafne i sprowadza wszelkie dyskusje w złym kierunku. Utożsamianie AI-assisted development z vibe codingiem sugeruje że koncentrujemy się wyłącznie na zastosowaniach hobbistycznych lub budowaniu PoCów. Nic bardziej mylnego.

Większość programistów pracujących z AI znajduje się gdzieś pośrodku. Bazują na swojej wiedzy o LLMach, która jest bardzo zróżnicowana, ale dbają o aspekty techniczne całego przedsięwzięcia. Tak więc na start nastawienie mamy bliższe spec-driven niż vibe codingu, chociaż przez braki w wiedzy i umiejętnościach efekty czasami przypominają vibe coding. 

Sposób, w jaki podchodzimy do pracy z AI, dramatycznie wpływa na jakość rezultatów - zarówno w krótkim, jak i długim terminie. Różnica między chaotycznym kopiowaniem sugestii a systematycznym wykorzystaniem AI jako innowacyjnego narzędzia to przepaść. 

Pamiętajmy jednak, że **AI trzeba opanować.** Od tego jest oczywiście kurs 10xDevs, ale nie obejdzie się bez samodzielnej pracy w wybranych usługach - świetną ku temu okazją jest projekt zaliczeniowy na certyfikat. Oczywiście zachęcamy do testowania i nabijania expa w efektywnym stosowaniu AI w większej ilości projektów i zadań - dzięki temu szybciej wejdziecie na kolejny poziom. 

W tej lekcji przejdziemy przez trzy kluczowe aspekty tej transformacji: fundamentalne różnice w podejściu do AI-assisted programming, praktyczne ograniczenia modeli językowych i kluczowe założenia sterowania agentami AI.

Zapraszamy do obejrzenia pierwszego filmu z tej lekcji, gdzie szerzej tłumaczymy różnice pomiędzy vibe codingiem a spec-driven development:

[FRAGMENT VIDEO](https://player.vimeo.com/video/1122619911?app_id=122963)

## Ograniczenia LLM w kontekście programowania

Niezależnie od naszego poziomu doświadczenia i nastawienia do programowania z AI, modele językowe mają fundamentalne ograniczenia: 

* Są trenowane na zamkniętych zbiorach danych i nie uczą się po zakończeniu treningu. Douczanie modelu w locie (in-context learning) jest póki co jedynym skutecznym sposobem na obchodzenie tego ograniczenia.
* Do wygenerowanej odpowiedzi dochodzą poprzez statystykę a nie logikę, co wprowadza ryzyko halucynacji oraz naszym zdaniem istotniejsze: ogranicza ich innowacyjność oraz adaptacyjność. Te ostatnie to istotna przewaga ludzi, więc na swój sposób “good for us” ale trzeba mieć to na uwadze i zarządzać własnymi oczekiwaniami.
* LLMy mają również istotne ograniczenia co do pamięci operacyjnej (tzw. okno kontekstowe), czyli ilości przetwarzanych tokenów w ramach jednej konwersacji zanim zdolności intelektualne zaczną skrajnie spadać. Niestety wartości deklarowane przez dostawców często trzeba dzielić przez 2-4 razy, jeżeli interesuje nas otrzymanie sensownej odpowiedzi, a nie byle jakiej bo model ogarnia 50% rozmowy.

Zapraszamy do nagrania gdzie szerzej omówimy ograniczenia LLMów i jak sobie z nimi radzić:

[FRAGMENT VIDEO](https://player.vimeo.com/video/1122670679?app_id=122963)

## Nadzór nad AI

Wbrew powszechnym opiniom, AI nie pisze produkcyjnego kodu samodzielnie. Programista cały czas jest i w przewidywalnej przyszłości będzie niezbędny w każdym etapie procesu wytwarzania oprogramowania. 

Jako specjaliści musimy wiedzieć, jak zarządzać pracą autonomicznych narzędzi, żeby cieszyć się najlepszymi efektami. I spać spokojnie, biorąc pełną odpowiedzialność za commitowany przez nas kod, który w dużej mierze będzie zaimplementowany przez AI.

W ostatnim filmie w tej lekcji przedstawiamy kluczowe zasady skutecznej współpracy z AI. Część z nich już przewinęła się w kursie, część dopiero przed nami - jednak są na tyle ważne, że zwracamy na nie uwagę i w lekcji zamykającej moduł rozgrzewkowy:

[FRAGMENT VIDEO](https://player.vimeo.com/video/1122674476?app_id=122963)

## 🏁 Podsumowanie

W tej lekcji omówiliśmy fundamentalne różnice w podejściach do AI-assisted development. Poznaliście spektrum od vibe codingu - gdzie AI jest traktowany jak magiczna różdżka generująca kod bez kontroli - po spec-driven development, gdzie każde użycie AI ma jasny cel i wynik jest systematycznie weryfikowany.

Omówiliśmy również kluczowe ograniczenia modeli językowych: od halucynacji, przez ograniczone okno kontekstowe, po statystyczne a nie logiczne podejście do generowania odpowiedzi. 

Najważniejsze: AI nie pisze produkcyjnego kodu samodzielnie – programista pozostaje niezbędny w każdym etapie procesu i musi umieć zarządzać autonomicznymi narzędziami.

I tym oto sposobem kończymy pierwszy tydzień 10xDevs 2.0 🚀

Mamy za sobą przygotowania z preworku i modułu 1, po czym rozpoczniemy pracę nad projektem certyfikacyjnym w modułach 2 i 3\. To właśnie tutaj zastosujecie spec-driven development w praktyce, budując rzeczywistą aplikację/moduł z pełną kontrolą nad procesem. 

Zachęcamy do przeczytania posta o projekcie certyfikacyjnym w [#Informacje i ogłoszenia \[10X2\]](https://bravecourses.circle.so/c/informacje-i-ogloszenia-10x-7e3fcb), gdzie znajdziecie szczegóły dotyczące wymagań i oceny. Kolejny tydzień otworzymy przewodnikiem po dalszej części kursu – podzielimy się sprawdzonymi radami, jak efektywnie pracować z materiałami i bez stresu zdobyć certyfikat 10xDevs 2.0\. Powodzenia z quizem i lekcjami w kolejnym module!

![](https://assets-v2.circle.so/ekrtcr8j44qd531ut1i2iwox5c9h)