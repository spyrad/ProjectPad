<!DOCTYPE html>![](https://assets-v2.circle.so/hme7yu6bkmk11oa43a767ze5i2jw)

## Wprowadzenie

Wyobraź sobie czterech programistów, z których każdy może wykonywać wdrożenie na produkcję bezpośrednio ze swojej maszyny. Każdego z nich dotyczy święte prawo programowania pt. “u mnie działa” i wszyscy są przekonani, że ich konfiguracja lokalna jest identyczna jak ta na serwerze produkcyjnym.

Wdrożenia są realizowane do czasu, kiedy jeden z programistów (C) nie wdraża u siebie zmiany, której nie odwzorował u innych oraz na produkcji (np. migracja bazy) - wykonując deployment, w pełnym przekonaniu i zadowoleniu, nieświadomie powoduje produkcyjny incydent a część produktu staje się niedostępna.

![](https://assets-v2.circle.so/7td0l153fq540bjkdidlri6rhcli)

Indywidualny, w pełni niekontrolowany proces wdrożeń produkcyjnych po prostu nie działa.

W praktyce, pomiędzy środowiskiem lokalnym a produkcją wdrażane są dodatkowe zabezpieczenia mające zagwarantować przewidywalne aktualizacje i integralność środowisk. Może to być realizowane na kilku poziomach i na kilka sposobów:

* **Continuous Integration** \- polega na wdrożeniu dodatkowych etapów integracji i oceny kodu pochodzącego z wielu źródeł (np. z różnych branchy lub maszyn). Każda zmiana przechodzi przez jednolity zestaw kroków weryfikacji na “neutralnym gruncie”, zapobiegając wprowadzaniu błędów do wspólnego repozytorium.
* **Continuous Delivery** \- rozszerzeniem CI może być ciągła gotowość do wdrażania zmian - tutaj kod nie tylko jest weryfikowany automatycznie, ale również zamienia się w gotowe do wdrożenia “artefakty” których stan uznawany jest za “ready to deploy”.
* **Continuous Deployment** \- ciągłe wdrażanie to stan idealny, ale nie zawsze osiągalny. Mówimy o procesach, gdzie kod lub zmiana trafiają na produkcję bez potrzeby manualnej weryfikacji - całość kodu jest oceniana automatycznie i na tyle wiarygodnie, że do wdrożenia nie potrzeba tech leada ani managera (co nie oznacza, że zmianę od razu widzi u siebie klient - zob. [feature flagi](https://martinfowler.com/articles/feature-toggles.html)).

W praktyce, zespoły IT decydują się na mieszankę tych trzech praktyk. Większość dojrzałych zespołów implementuje ciągłą integrację i spójny zestaw testów, ale strategie wdrażania na produkcję mogą się różnić w zależności od złożoności produktu i skali firmy.

Najważniejsza różnica między wcześniejszym podejściem to jeden lub kilka kroków pośrednich pomiędzy zakończeniem pracy a opublikowaniem zmian u naszego użytkownika:

![](https://assets-v2.circle.so/mq84krbehqvgc87pd1p5vny9dczf)

W tej lekcji zobaczysz zestaw konkretnych praktyk i wyzwań dotyczących wdrażania CI/CD przy współpracy ze sztuczną inteligencją. Skorzystamy z faktu, że nasze repozytoria już teraz znajdują się na GitHubie, a tutaj już tylko krok do wykorzystania scenariuszy GitHub Actions.

## Poznajemy GitHub Actions z Magic Docs ✨

Zacznijmy od poznania technologii, z którą przyjdzie nam pracować w tej lekcji. Co prawda nasze szkolenie nie jest stricte poświęcone tematowi “GHA deep dive”, ale AI daje tutaj pole do przeprowadzania ciekawych eksperymentów:

[FRAGMENT VIDEO](https://player.vimeo.com/video/1072753507?app_id=122963&amp;byline=0&amp;badge=0&amp;portrait=0&amp;title=0)

Jeszcze raz podsumujmy wiedzę uzyskaną w naszej Magicznej Dokumentacji.

W GitHub Actions występuje kilka kluczowych pojęć:

1. **Workflow** \- Automatyczny proces składający się z jednego lub więcej zadań
2. **Event/Trigger** \- Zdarzenie, które wyzwala workflow (np. push, pull request)
3. **Job** \- Zestaw kroków wykonywanych na tym samym runnerze (serwerze)
4. **Step** \- Pojedyncze zadanie w ramach joba (np. unit testy)
5. **Action** \- Reużywalny, parametryzowany step (zob. [Composite Actions](https://docs.github.com/en/actions/sharing-automations/creating-actions/creating-a-composite-action))

Relacje tych elementów prezentują się następująco:

![](https://assets-v2.circle.so/vs5p4n6tjicl1qnkxl2mja7ozn6w)

Scenariusze będziemy tworzyć umieszczając je w głównym branchu naszego repozytorium, w folderze .github/workflows/{name}.yml - GitHub automatycznie rozpozna pierwszy scenariusz i aktywuje GitHub Actions na poziomie projektu.

```
name: Hello World Workflow

on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

jobs:
  hello:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Say Hello
        run: echo &quot;Hello, GitHub Actions!&quot;
```

Powyższy scenariusz będzie uruchamiany:

* po pushu na branch master
* w nowych Pull Requestach do brancha master

W efekcie:

* uruchomi się job “hello”
* będzie działał [na Ubuntu](https://docs.github.com/en/actions/using-github-hosted-runners/using-github-hosted-runners/about-github-hosted-runners#using-a-github-hosted-runner)
* wykona dwa kroki - checkout repozytorium i wypisanie wiadomości na konsolę

Wkrótce zobaczysz bardziej złożone scenariusze, ale ich składowe będą takie same - zdarzenie wyzwalające scenariusz, jeden lub kilka jobów, określenie środowiska oraz zestawu wykonywalnych akcji. Wszystko to w oparciu o pliki .yml, które z wykorzystaniem kontroli wersji są wersjonowane i łatwe do zmiany.

Jeśli chcesz pogłębić wiedzę o GitHub Actions, po ukończeniu lekcji jeszcze raz zapoznaj się z magic-docs oraz oficjalną dokumentacją:

* Repozytorium wraz z instrukcją znajdziesz tutaj - [10x-magic-docs](https://github.com/przeprogramowani/10x-magic-docs) ✨
* Oficjalna dokumentacja GitHub Actions - [pod tym linkiem](https://docs.github.com/en/actions/writing-workflows/quickstart).

## Pierwszy scenariusz i narzędzia dla Agenta AI

W ramach rozgrzewki z AI, utwórzmy pierwszy scenariusz testowy, którego rozwiniemy w oparciu o stack projektu. Od raz zaprezentujemy ci też pierwsze narzędzia, które mają za zadanie poszerzyć wiedzę modelu i umożliwić aktualizowanie całego workflow:

[FRAGMENT VIDEO](https://player.vimeo.com/video/1072765338?app_id=122963&amp;byline=0&amp;badge=0&amp;portrait=0&amp;title=0)

Tworząc scenariusze CI/CD w środowisku JavaScript/Node.js, plik **package.json** może być dla modelu istotnym źródłem kontekstu o dostępnych narzędziach. Odpowiednikiem tego pliku dla innych stacków technicznych może być:

* **Python**: pyproject.toml lub requirements.txt
* **Java**: pom.xml (dla Mavena) lub build.gradle (dla Gradle)
* **Ruby**: Gemfile
* **C#/.NET**: .csproj lub \*.sln
* **Rust**: Cargo.toml

Wskazanie na dostępne zależności, skrypty i narzędzia ułatwi AI pracę nad scenariuszem dopasowanym do potrzeb projektu.

Jak zauważyłeś, nie rozwiązuje to jednak wszystkich problemów, a przy generowaniu scenariuszy można się zmierzyć z problemem limitów wiedzy AI. Tutaj do gry wchodzą narzędzia takie jak terminal, publiczne API GitHuba, dodatkowa dokumentacja czy dedykowane instrukcje. 

### Terminal i publiczne API w regułach dla AI

Na pomysł z terminalem wpadłem w trybie “Chat with AI”, pytając model, jak korzystając z terminala i publicznych API mogę rozwiązać problem nieaktualnych akcji GHA. Wiedząc, że Agent Cursora jest w stanie wykonywać polecenia podstawiając do nich odpowiednie wartości, całość przekonwertowałem na reguły i… to działa!

Warto być świadomym tego, jakie narzędzia możesz wykorzystywać w każdym z edytorów - przykładowa lista dla Cursora znajduje się [w tym miejscu](https://docs.cursor.com/chat/tools). Rozszerzoną formę instrukcji, z których będziemy korzystać w budowaniu pierwszego scenariusza wysokiej jakości znajdziesz tutaj:

[github-action.mdc](https://assets-v2.circle.so/im1jsl3lb14mkz3gxt67sj0yskfp)

## Zabezpieczanie Pull Requestów

Przygotujmy teraz pierwszy scenariusz, który już na stałe może pozostać w naszym repozytorium.

Zajmiemy się popularnym przypadkiem w pracy zespołowej, gdzie programiści zgłaszają wiele równoległych Pull Requestów do brancha master.

Aby temu zapobiec, kod z każdego Pull Requesta:

* będzie sprawdzony pod kątem literówek i formatowania (lint)
* będzie weryfikowany przez zestaw testów (unit + e2e)
* zostanie podsumowany komentarzem o stanie zmian

Taki scenariusz naszkicowałem dyskutując z o3-mini, a teraz pokażę ci jak wygląda jego realizacja i testowanie:

[FRAGMENT VIDEO](https://player.vimeo.com/video/1072953987?app_id=122963&amp;byline=0&amp;badge=0&amp;portrait=0&amp;title=0)

Nowe elementy, które wprowadzamy na tym etapie, to:

* joby uruchamiane równolegle
* zależności ustawiane przez id: oraz needs: \[id\]
* dedykowane środowiska grupujące ustawienia naszego projektu
* sekrety globalne i środowiskowe
* artefakty

Te pięć elementów pozwoli ci tworzyć najbardziej zaawansowane scenariusze dopasowane do PRD i określonych warunków rozwijania projektu.

Wtyczkę GHA (VS Code / Windsurf / Cursor) znajdziesz [pod tym linkiem](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-github-actions).

Prompt, który możesz wykorzystać (i dostosować do siebie) wygląda następująco:

Prompt [Workflow CI/CD Pull Request](https://10xrules.ai/prompts?org=10xdevs&amp;collection=m3-prod&amp;segment=l5-cicd&amp;prompt=bcbd3637-ed8f-449b-a2c4-aa3057f6af34).

Tak jak wspomniałem na filmie, możesz rozpocząć od pełnej wersji, albo w trybie uproszczonym wprowadzić na początku sam linting i ew. unit testy. Testy E2E, które mogą być dla ciebie największym wyzwaniem, warto dobrze przemyśleć przed samą implementacją.

## 🏁 Podsumowanie lekcji

W tej lekcji wprowadziliśmy trzy narzędzia i techniki, które mogą znacznie podnieść jakość twoich projektów:

* kluczowe pojęcia i terminologię GitHub Actions
* terminalowe narzędzia dla Agenta AI
* automatyzację oceny jakości i zabezpieczanie Pull Requestów

Kształt scenariusza, który zbudowaliśmy w tej lekcji, jest ściśle powiązany z typem rozwijanego projektu. Automatyzacje w GitHub Actions mogą wyglądać jeszcze inaczej dla bibliotek, projektów Open Source, aplikacji wieloplatformych oraz twoich indie-startupów. Nie mamy jednak wątpliwości, że zdobyta wiedza i potencjał AI mogą być skutecznym architektem każdego nowego pomysłu w tym obszarze.

W kolejnej lekcji, kiedy uzyskamy dostęp do środowisk, będziemy bazować na zdobytej wiedzy aby wprowadzić nowy scenariusz dla mastera, pod Continuous Delivery.

W razie pytań lub wątpliwości czekamy na twoje uwagi i pomysły w sekcji [#Dyskusje - praktyka \[10X\]](https://bravecourses.circle.so/c/watki-dotyczace-lekcji-i-cwiczen) 

## 👨‍💻 Ćwiczenia praktyczne

### **Zadanie 1: Pull Request Workflow**

**Cel:** Zabezpieczenie brancha master poprzez weryfikowanie wszystkich Pull Requestów

**Instrukcje:** Wprowadź pierwszy scenariusz CI/CD rozwijając go na branchu master, w pliku .github/workflows/{name}.yml

1. Reaguj na nowe Pull Requesty do brancha master
2. Wykonaj ocenę jakości - linting i unit testy + (opcjonalnie) testy e2e
3. Przetestuj reguły z narzędziami terminalowymi dla ulepszenia jakości akcji

**Certyfikacja:**

🎖️ Powyższe ćwiczenie to jeden z elementów certyfikacji - przede wszystkim skupiamy się na wdrożeniu i poprawnym działaniu pierwszego scenariusza. Złożoność możesz dostosować do swoich potrzeb i określonego projektu, a testy e2e traktujemy opcjonalnie.

---

### **Zadanie 2: Nowa wiedza z Magic Docs**

**Cel:** Wykonaj eksperyment w środowisku dopasowanym do Agenta AI - Magic Docs

**Instrukcje:**

1. Sklonuj repozytorium [10x-magic-docs](https://github.com/przeprogramowani/10x-magic-docs)
2. Zainstaluj zależności przez \`npm install\`
3. Wykorzystaj instrukcję z README.md do wygenerowania nowej strony na dowolny temat
4. W sekcji [#Dyskusje - ogólne \[10X\]](https://bravecourses.circle.so/c/dyskusje-10x) pochwal się efektami
![](https://assets-v2.circle.so/ekrtcr8j44qd531ut1i2iwox5c9h)