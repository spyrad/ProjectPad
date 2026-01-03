<!DOCTYPE html>![](https://assets-v2.circle.so/jcji1rah29twki9cp7g0pm9yojxp)

## Wprowadzenie

W tej lekcji rozpoczniemy praktykę ze standardowym workflow pracy z AI, które pozwala osiągać jakościowe efekty w każdej warstwie aplikacji: bazie danych, API oraz UI. Co ważne, będą to efekty zgodne z wymaganiami biznesowymi (zamiast realizacji opartych o przypadek i szczęście jak przy Vibe Codingu). Proces wygląda następująco:

1. Sesja planistyczna (db/api/ui) z podsumowaniem
2. Definiowanie wysokopoziomowego planu (db/api/ui)
3. Generowanie szczegółowego planu implementacji endpointa/widoku (api/ui)
4. Wdrożenie planu (db/api/ui)

W ten sposób gromadzimy jakościowy kontekst, który sprawia że sama implementacja przechodzi dużo szybciej i sprawniej. 

Co ważne, efekty pracy kumulują się na przestrzeni warstw - dobrze wykonana praca na poziomie bazy danych procentuje przy API i UI. Przejdziemy przez cały proces end-to-end, gdzie zobaczysz zarówno silne jak i słabe strony obecnie dostępnych LLMów. 

Mamy silne przekonanie, że sam proces przetrwa próbę czasu, a wraz ze wzrostem możliwości modeli będzie tylko prostszy i możliwy do przeprowadzenia na co raz bardziej złożonych projektach.

Na filmach zobaczysz pracę na przykładowym projekcie [przeprogramowani/10x-cards](https://github.com/przeprogramowani/10x-cards).

## Wprowadzenie do Supabase

![](https://assets-v2.circle.so/vey458cv8u19sz3mwi65aegbs85b)

[Supabase](https://supabase.com/) to open-source’owa platforma BaaS (Backend as a Service) oparta na bazie danych Postgres. Umożliwia szybkie tworzenie, zarządzanie i skalowanie backendu aplikacji bez konieczności budowania całej infrastruktury od podstaw. Dzięki swojej architekturze open-source, Supabase oferuje elastyczność, bezpieczeństwo i możliwość modyfikacji, co czyni ją idealnym rozwiązaniem zarówno dla małych projektów, jak i rozbudowanych systemów produkcyjnych.

![](https://assets-v2.circle.so/k3p1vvuwvgmpdvfjnpe31tp5mn4b)

**Integracja z technologiami**

Jednym z kluczowych atutów Supabase jest jego wszechstronna integracja z wieloma technologiami. Oto kilka przykładów:

* Frameworki frontendowe: Supabase doskonale współpracuje z popularnymi frameworkami, takimi jak Next.js, Astro i wiele innych (Poradniki integracji są dostępne [w dokumentacji](https://supabase.com/docs/guides/getting-started#framework-quickstarts))
* Narzędzia do zarządzania bazami danych: Platforma umożliwia korzystanie z narzędzi takich jak pgAdmin, co ułatwia monitorowanie i administrację bazą danych. Samo Supabase dostarcza świetne “Supabase Studio”, które daje nam pełen wgląd w bazę danych i możliwość jej modyfikacji.
* Narzędzia DevOps: Supabase integruje się z rozwiązaniami CI/CD takimi jak Github Actions, co pozwala na automatyzację procesów wdrażania aplikacji oraz zarządzania infrastrukturą.

**Ile trzeba zapłacić za to cudo?** 

Supabase oferuje elastyczny i atrakcyjny model cenowy, który sprawia, że jest to idealne rozwiązanie zarówno na potrzeby projektów edukacyjnych, jak i aplikacji produkcyjnych. Możemy pracować z Supabase w dwóch trybach:

1. **Lokalnie**: Możesz uruchomić Supabase **za darmo na własnym komputerze**, co pozwala na pełną kontrolę nad środowiskiem oraz szybki i bezpieczny development projektów z AI.
2. **Supabase** **Cloud**: Dla zastosowań produkcyjnych Supabase oferuje własną infrastrukturę w chmurze. Dostępny jest atrakcyjny darmowy plan, który umożliwia korzystanie z większości funkcjonalności platformy, idealny na początek projektu. Szczegóły znajdziesz [tutaj](https://supabase.com/pricing).

**Jak zacząć z Supabase?**

Rozpoczęcie pracy z Supabase jest proste i wymaga jedynie kilku podstawowych kroków:

1. [Instalacja Docker Desktop](https://docs.docker.com/desktop/setup/install/mac-install/): Pierwszym krokiem jest instalacja Docker Desktop, który pozwoli na uruchomienie środowiska lokalnego, niezbędnego do pracy z Supabase.
2. [Instalacja Supabase CLI](https://supabase.com/docs/guides/local-development/cli/getting-started): Kroki dla Twojego systemu i środowiska znajdziesz w dokumentacji.
3. W repozytorium projektu uruchom następnie komendy:  
   1. supabase init  
   2. supabase start

W ten sposób utworzysz lokalną instancję Supabase i jesteś gotowy do pracy nad bazą danych i API!

![](https://assets-v2.circle.so/4pix7bte8iiu7mci2c4bffh60jzx)

## Sesja planowania bazy danych

[FRAGMENT VIDEO](https://player.vimeo.com/video/1072853422?app_id=122963&amp;byline=0&amp;badge=0&amp;portrait=0&amp;title=0)

Prompt do sesji planistycznej bazy danych znajdziesz w 10xRules.ai Prompt Library - [Asystent planowania bazy danych](https://10xrules.ai/prompts?org=10xdevs&amp;collection=m2-bootstrap&amp;segment=l3-database&amp;prompt=bff6925d-bf5e-40b9-94b6-8cd5f721f2ae). 

Prompt do podsumowania sesji planistycznej - [Podsumowanie planowania bazy danych](https://10xrules.ai/prompts?org=10xdevs&amp;collection=m2-bootstrap&amp;segment=l3-database&amp;prompt=cd51feb5-5237-427c-ab2c-9e48de2fcadb).

Podsumowanie sesji planistycznej następnie kopiujemy do nowego wątku, w którym utworzymy dokument opisujący schemat bazy danych: db-plan.md.

## Definiowanie schematu bazy danych db-plan.md

[FRAGMENT VIDEO](https://player.vimeo.com/video/1072853394?app_id=122963&amp;byline=0&amp;badge=0&amp;portrait=0&amp;title=0)

Prompt do wygenerowania [db-plan](https://github.com/przeprogramowani/10x-cards/blob/master/.ai/db-plan.md) znajdziesz w 10xRules.ai Prompt Library - [Tworzenie schematu bazy danych](https://10xrules.ai/prompts?org=10xdevs&amp;collection=m2-bootstrap&amp;segment=l3-database&amp;prompt=a0f2515d-fe92-4d59-a387-431b698b8187). 

**Ważne**: Jeżeli korzystasz z Supabase, w db-plan.md należy wprost napisać że tabela “users” będzie obsługiwana przez Supabase Auth, jak na poniższym screenie. W innym przypadku migracja utworzy osobną tabelę public.users, która nie wniesie wszystkich dobrodziejstw dostępnych w [Supabase Auth](https://supabase.com/docs/guides/auth).

![](https://assets-v2.circle.so/2e4eg7ha4pmueul9oj8wvhwrh68a)

## Wdrażanie bazy danych poprzez migracje

[FRAGMENT VIDEO](https://player.vimeo.com/video/1072853370?app_id=122963&amp;byline=0&amp;badge=0&amp;portrait=0&amp;title=0)

Do wygenerowania migracji wykorzystaj prompt z 10xRules.ai Prompt Library - [Tworzenie migracji Supabase](https://10xrules.ai/prompts?org=10xdevs&amp;collection=m2-bootstrap&amp;segment=l3-database&amp;prompt=405b4de9-27b6-48f8-a4d9-f3a4c70655fb).

Aby wykonać migrację wywołaj komendę: _npx supabase migration up_

### Widok schematu bazy w Supabase Studio Schema Visualizer

Efektem końcowym pracy jest bazy danych o następującym schemacie:

![](https://assets-v2.circle.so/pix1eojgb859vuy95buzshgouawq)

Tabelę _auth_._users_ konfiguruje dla nas automatycznie Supabase, i bardzo dobrze.

O to podgląd całego schematu auth, który jest dostępny w Database &gt; Schema Visualizer:

![](https://assets-v2.circle.so/wdq8ibte4ykmiepwpkqymj3xp0bt)

Aby dodać nowego użytkownika wystarczy przejść do widoku Authentication &gt; Users i skorzystać z przycisku “Add user”. Jego ID wykorzystamy w kolejnej lekcji, a pełną obsługę Autha dodamy w drugim module.

![](https://assets-v2.circle.so/f6ljxf3mk0qe4e6m3e46pjw27scl)

Więcej informacji o Supabase Auth znajdziesz w [dedykowanym rozdziale dokumentacji](https://supabase.com/docs/guides/auth). Wdrożenie Supabase Auth będziemy szczegółowo omawiali w lekcji \[3x1\] Implementacja autentykacji z Supabase Auth.

## 🏁 Podsumowanie

W tej lekcji poznaliśmy standardowy workflow pracy z AI:

* **Proces czterostopniowy** \- efektywny przepływ pracy z AI obejmuje sesję planistyczną, definiowanie wysokopoziomowego planu, generowanie szczegółowego planu implementacji oraz wdrożenie, co zapewnia jakościowe efekty zgodne z wymaganiami biznesowymi.
* **Sesja planistyczna** \- wykorzystanie dedykowanych promptów z modelami reasoningowymi do zgromadzenia pytań, rekomendacji i podsumowania kluczowych decyzji projektowych dla bazy danych.
* **Definiowanie schematu** \- transformacja wyników sesji planistycznej w konkretny plan bazy danych (db-plan.md) zawierający tabele, relacje, indeksy i zasady bezpieczeństwa na poziomie wierszy (RLS).
* **Wdrożenie poprzez migracje** \- implementacja schematu bazy danych za pomocą migracji w Supabase, z wykorzystaniem specjalistycznych promptów generujących odpowiednie pliki SQL.
* **Supabase jako platforma** \- wykorzystanie open-source&#39;owej platformy BaaS opartej na PostgreSQL, która integruje się z popularnymi frameworkami, oferuje elastyczny plan darmowy i może być uruchamiana zarówno lokalnie jak i w chmurze.

Pamiętaj, że efekty pracy kumulują się na przestrzeni warstw - dobrze wykonana praca na poziomie bazy danych procentuje przy API i UI. Kluczowe jest gromadzenie jakościowego kontekstu, który sprawia że sama implementacja przechodzi szybciej i sprawniej.

## 👨‍💻 Ćwiczenia praktyczne

**Zadanie 1: Przeprowadzenie sesji planistycznej bazy danych**  
**Cel**: Wygenerowanie kompleksowej listy pytań, rekomendacji i podsumowania dla schematu bazy danych.  
**Instrukcje**:

1. Wykorzystaj prompt z sekcji &quot;Sesja planowania bazy danych&quot; dopasowując go do swojego projektu
2. Przeprowadź minimum dwie rundy pytań z modelem reasoningowym
3. Zapisz podsumowanie do wykorzystania w kolejnym zadaniu

**Ważne**: Upewnij się, że sesja planistyczna obejmuje wszystkie aspekty wymagane przez Twój projekt, w tym encje, relacje, bezpieczeństwo i skalowalność.

**Zadanie 2: Definiowanie schematu bazy danych**  
**Cel**: Stworzenie kompleksowego planu schematu bazy danych na podstawie wyników sesji planistycznej.  
**Instrukcje**:

1. Wykorzystaj prompt z sekcji &quot;Definiowanie schematu bazy danych db-plan.md&quot;
2. Przekaż modelowi PRD, notatki z sesji planistycznej oraz informacje o stacku technologicznym
3. Wygeneruj schemat bazy danych i poddaj go rewizji
4. Zapisz wygenerowany schemat jako .ai/db-plan.md

**Ważne**: Przeanalizuj otrzymany plan pod kątem zgodności z wymaganiami projektu i najlepszymi praktykami projektowania baz danych.

**Zadanie 3: Wdrożenie bazy danych poprzez migracje**  
**Cel**: Praktyczna implementacja zaprojektowanego schematu bazy danych.  
**Instrukcje**:

1. Jeśli korzystasz z Supabase:  
   * Wykorzystaj prompt z sekcji &quot;Wdrażanie bazy danych poprzez migracje&quot;  
   * Wygeneruj pliki migracji zgodne z konwencją nazewnictwa YYYYMMDDHHmmss\_short\_description.sql  
   * Umieść pliki w katalogu supabase/migrations/
2. Jeśli korzystasz z innego systemu:  
   * Dostosuj format migracji do wykorzystywanego narzędzia  
   * Upewnij się, że migracje zawierają odpowiednie komentarze i mechanizmy bezpieczeństwa
3. Uruchom migracje w środowisku deweloperskim
4. Zweryfikuj poprawność schematu w narzędziu do wizualizacji (np. Supabase Studio Schema Visualizer)

---

![](https://assets-v2.circle.so/xldwm47ax45zdgpk0oh5iam9h29h)