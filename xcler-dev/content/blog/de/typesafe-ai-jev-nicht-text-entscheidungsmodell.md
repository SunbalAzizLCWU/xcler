---
id: jev
slug: typesafe-ai-jev-nicht-text-entscheidungsmodell
slug_en: typesafe-ai-jev-non-text-decision-model
slug_de: typesafe-ai-jev-nicht-text-entscheidungsmodell
title: "Jev von TypeSafe AI: Das Entscheidungsmodell ohne Text erklärt"
excerpt: "Jev liefert typisierte Auswahlen, Scores und Wahrscheinlichkeiten in einem parallelen Durchlauf statt Text. Was es ist, wofür es taugt und wie Sie es testen."
seoTitle: "Jev von TypeSafe AI erklärt: Entscheidungsmodell ohne Text"
seoDescription: "Jev von TypeSafe AI erklärt: ein Entscheidungsmodell, das typisierte Auswahlen und Scores statt Text liefert. Latenz, Kosten, Einsatzfälle, Grenzen und Rollout."
publishedAt: "2026-09-22T09:00:00.000Z"
updatedAt: "2026-09-23T09:00:00.000Z"
author: Musharraf Aziz
cover: /blog/blog-jev-decision-model-cover.webp
coverAlt: "Jev von TypeSafe AI – Entscheidungsmodell mit typisierten Ausgaben statt Text"
readingTime: 10
tags:
  - Jev
  - TypeSafe AI
  - Entscheidungsmodell
  - KI-Routing
  - KI-Agenten
  - strukturierte Ausgabe
  - KI-Automatisierung
---

Die meisten KI-Produkte basieren heute auf Modellen, die schreiben. Sie senden einen Prompt, das Modell erzeugt Text Token für Token, und Ihr Code versucht, aus diesem Text eine Entscheidung herauszulesen. **Jev** von TypeSafe AI geht einen anderen Weg: Es schreibt überhaupt nicht.

Jev ist ein Transformer-basiertes Modell, das TypeSafe AI als „System 1“-Entscheidungsmaschine beschreibt. Sie geben ihm einen Satz **vorab festgelegter Fragen** und den aktuellen **Zustand** – ein Support-Ticket, ein Spielbild, eine Liste offener Browser-Tabs, einen Lead-Datensatz – und es beantwortet alle Fragen in **einem parallelen Durchlauf**. Die Antworten kommen als typisierte Werte zurück: eine Auswahl aus einer festen Liste, eine Zahl, eine Wahrscheinlichkeit, jeweils mit einer Konfidenzbewertung.

Das Unternehmen trat unter der Leitung von Diogo Almeida an die Öffentlichkeit, einem früheren OpenAI-Forscher, der an Reinforcement Learning from Human Feedback (RLHF) gearbeitet hat. Der Launch fiel aus drei Gründen auf: Geschwindigkeit, Preis und das Versprechen, dass keine Parsing-Fehler mehr auftreten.

> In einem Satz: Jev beantwortet vorab formulierte Fragen mit typisierten Werten, statt einen Absatz zu schreiben, den Sie anschließend interpretieren müssen.

![Jev-Entscheidungsfluss: Zustandsdaten in einem parallelen Durchlauf, Rückgabe von Auswahl, Score und Wahrscheinlichkeit mit Konfidenz](/blog/blog-jev-flowchart.webp)

## Was „ohne Text“ konkret bedeutet

Ein übliches großes Sprachmodell (LLM) arbeitet *autoregressiv*. Es sagt das nächste Token voraus, hängt es an, sagt das nächste voraus und so weiter. Bitten Sie es, eine Support-Queue zu wählen, schreibt es vielleicht „Billing“, „billing“, „Das Abrechnungsteam“ oder „Abrechnung – könnte aber auch technischer Support sein“. Ihr Code muss das auswerten, und manchmal scheitert er daran.

Jev lässt den Schreibschritt weg. Die möglichen Antworten stehen vor dem Aufruf fest. Das Modell bewertet sie gegen den Zustand und gibt das Ergebnis als Datentyp zurück, den Ihr Code bereits erwartet. Daraus ergeben sich drei Eigenschaften, die im Produktivbetrieb zählen:

1. **Keine erfundenen Optionen.** Das Modell kann keine Queue zurückgeben, die nicht auf Ihrer Liste steht – es gibt keinen Freitextkanal, in dem es sie erfinden könnte.
2. **Keine Parsing-Schicht.** Sie brauchen keine regulären Ausdrücke, keine JSON-Reparatur und keine Wiederholungen, wenn das Ausgabeformat bricht.
3. **Eingebaute Unsicherheit.** Jede Antwort trägt eine Konfidenz, mit der Sie entscheiden, ob Sie handeln oder übergeben.

Wichtig ist, genau zu benennen, was das *nicht* löst: Jev kann trotzdem die **falsche** Option aus Ihrer Liste wählen. Es beseitigt eine Klasse von Formatfehlern und erfundenen Antworten, macht aber nicht jede Entscheidung richtig.

## Die Launch-Zahlen – und wie man sie einordnet

Laut Launch-Materialien von TypeSafe AI gilt:

- **Latenz von etwa 70–500 Millisekunden** pro Aufruf.
- **Input-Preis um 0,042 US-Dollar pro Million Tokens.**
- **Outputs gelten als kostenlos**, weil keine Output-Tokens erzeugt werden.

Das sind Herstellerangaben. Sie helfen bei der Größenordnung – das Modell ist deutlich unterhalb von Frontier-Chatmodellen positioniert und bepreist –, sind aber keine Zusage für Ihre Last. Die Latenz hängt davon ab, wie viel Zustand Sie senden, wie viele Fragen Sie stellen und aus welcher Region Sie aufrufen. Ein Median von 70 ms und ein Ausreißer von 500 ms beschreiben zwei sehr unterschiedliche Nutzererlebnisse. Bevor Sie einen Produktplan auf diesen Zahlen aufbauen, messen Sie Ihr eigenes p50 und p95 auf echten Daten.

Auch „kostenlose Outputs“ lohnen einen zweiten Blick. Das hilft nur, wenn Ihre Kosten im Output lagen. Bei vielen Routing-Aufgaben ist der Input der lange Teil – Ticketverlauf, Seiteninhalt, Kontodaten. Dort sollten Sie rechnen.

## Wofür sich ein Entscheidungsmodell eignet

Jev ist überall interessant, wo der nächste Schritt eine **geschlossene Entscheidung** ist: Die gültigen Antworten sind vor dem Aufruf bekannt, und Geschwindigkeit zählt.

### Hochfrequentes Routing
Jede eingehende E-Mail, Chatnachricht oder jeder Anruf muss irgendwohin: Abrechnung, Terminvergabe, technischer Support, Vertrieb, ein Mensch oder „nichts davon“. Das ist eine klassische geschlossene Entscheidung. Ein Entscheidungsmodell trifft sie in deutlich unter einer Sekunde und liefert einen Konfidenzwert, den Sie mit einer Schwelle versehen können.

### Agentenschritte unter einer Sekunde
KI-Agenten, die einen Browser oder Desktop bedienen, treffen Dutzende kleiner Entscheidungen: diesen Button klicken, scrollen, warten, nächsten Tab öffnen, aufhören. Für jede davon einen vollständigen Screenshot an ein großes multimodales Modell zu schicken, ist langsam und teuer. Ein schnelles Entscheidungsmodell übernimmt die Routine, ein größeres Modell die seltenen, offenen Fälle. Diese Aufteilung beschreiben wir ausführlich in [entkoppelte Architekturen für Computer-Use-Agenten](/blog/entkoppelte-architekturen-computer-use-agenten).

### Spiellogik und Simulationen
Öffentliche Demos haben Modelle im Stil von Jev Spiele wie *Doom* und *Mario* spielen lassen: Das Modell sieht das aktuelle Bild und wählt eine Aktion aus einem erlaubten Satz – bewegen, springen, schießen, warten. Das ist ein guter Belastungstest für ein Modell ohne Text, gerade weil der Aktionsraum geschlossen und die Schleife schnell ist.

### Bewertung und Klassifizierung
Lead-Scoring, Betrugsverdacht, Moderationslabels, Prioritätsstufen, Stimmungsbänder. Immer wenn Sie heute ein Chatmodell bitten, „von 1 bis 5 zu bewerten“, und die Antwort dann auswerten, passt ein typisiertes Entscheidungsmodell natürlicher.

## Wofür es sich nicht eignet

Genauso klar sollten die Grenzen sein:

- **Alles, was Text braucht.** E-Mails, Zusammenfassungen, Support-Antworten, Berichte und Erklärungen brauchen ein Modell, das schreibt. Nutzen Sie Jev, um zu entscheiden, *was* passiert, und ein LLM, um zu formulieren, *wie* es gesagt wird.
- **Offene Fragen.** Wenn Sie die gültigen Antworten nicht vorab auflisten können, haben Sie noch kein Entscheidungsproblem.
- **Fragen, die sich stündlich ändern.** Ein Entscheidungsmodell funktioniert am besten mit einem stabilen, geprüften und versionierten Fragenkatalog.
- **Mehrstufiges Denken mit neuen Informationen.** Eine Abfolge von Aktionen zu planen, die von unterwegs gewonnenen Erkenntnissen abhängt, bleibt Aufgabe eines Agenten auf Basis eines Reasoning-Modells.

## Vergleich mit anderen Ansätzen

| Ansatz | Ausgabe | Typische Latenz | Häufigster Fehler | Geeignet für |
| --- | --- | --- | --- | --- |
| Regeln / if-else | Fest | Sofort | Bricht bei unbekannten Fällen | Stabile, einfache Logik |
| Klassischer ML-Klassifikator | Label + Score | Sehr schnell | Braucht gelabelte Trainingsdaten | Hohes Volumen, enge Aufgaben |
| LLM mit JSON-Ausgabe | Text, zu Daten geparst | Sekunden | Formatfehler, erfundene Werte | Flexibel, geringes Volumen |
| Entscheidungsmodell (wie Jev) | Typisierte Auswahl + Konfidenz | Unter einer Sekunde (Herstellerangabe) | Falsche Wahl aus gültigem Satz | Schnelle geschlossene Entscheidungen ohne Trainingsdaten |

Reizvoll ist die Mitte: Sie bekommen die Flexibilität von „beschreib einfach die Frage“, die LLMs bieten, ohne einen eigenen Klassifikator zu trainieren – mit einer Ausgabe, die sich wie ein Klassifikator verhält.

## Gute Fragen formulieren

Der größte Teil der Qualität eines Entscheidungsmodells steckt im Fragenkatalog, nicht im Modell. Diese Regeln wenden wir an:

1. **Jede zulässige Antwort aufschreiben.** Kann eine Fachabteilung eine Option nicht in wenigen Worten benennen, ist es vermutlich Text und keine Entscheidung.
2. **Immer eine Ausweichoption einbauen**, etwa „nichts davon“ oder „braucht einen Menschen“. Ein Modell, das sich nie enthalten darf, rät.
3. **Optionen trennscharf halten.** „Abrechnung“ und „Rechnungsfrage“ als getrennte Optionen teilen die Wahrscheinlichkeit auf und verzerren Ihre Kennzahlen.
4. **Den Fragenkatalog versionieren.** Legen Sie ihn mit einer ID im Repository ab und protokollieren Sie die ID neben jeder Entscheidung. Nach sechs Monaten ist das der einzige Weg zu erklären, warum sich das System anders verhalten hat.
5. **Vor dem Livegang einfrieren.** Fachbereich, Betrieb und – wo relevant – Rechtsabteilung prüfen die Liste, bevor echter Traffic darauf trifft.

## Ein sicherer Rollout-Plan

Für jede neue Entscheidungskomponente empfehlen wir denselben Ablauf, und er passt hier gut:

**Woche 1 – Schattenbetrieb.** Ihr bisheriger Router bleibt verantwortlich. Dieselben Eingaben gehen parallel an das Entscheidungsmodell, und Sie protokollieren Zustand, Antwort, Konfidenz, Latenz und Version des Fragenkatalogs. Noch keine Aktion auf Basis seiner Antworten.

**Woche 2 – vergleichen.** Gehen Sie Abweichungen mit der Person durch, der der Prozess gehört – nicht nur mit dem Modell. Manche Abweichungen zeigen Fehler in Ihren alten Regeln, andere schlecht formulierte Fragen. Korrigieren Sie die Fragen, bevor Sie dem Modell die Schuld geben.

**Woche 3 – zuerst der Enthaltungspfad.** Antworten mit niedriger Konfidenz gehen an Ihren bestehenden menschlichen oder regelbasierten Weg. Antworten mit hoher Konfidenz bleiben im Schattenbetrieb. Sie testen die Übergabe, nicht die Schlagzeilen-Genauigkeit.

**Ab Woche 4 – ein Ziel nach dem anderen.** Lassen Sie Antworten mit hoher Konfidenz ein einzelnes Ziel steuern, zu Zeiten, in denen Sie beobachten können. Erweitern Sie erst, wenn die Zahlen halten.

Messen Sie drei Quoten getrennt: **richtig**, **falsch** und **enthalten**. Fassen Sie sie nicht zu einer Genauigkeitszahl zusammen – ein System, das sich nie enthält, kann genau wirken und bei den wichtigen Fällen trotzdem selbstsicher falsch liegen.

## Offene Nachbauten: OpenJev und andere

Nach dem Launch erschienen Open-Source-Nachbauten, darunter **APUS OpenJev**. Sie helfen, die Schnittstelle zu verstehen – Fragen rein, typisierte Werte raus – und ohne Rechnung zu experimentieren. Zwei Einschränkungen sollten Sie kennen:

- **Kalibrierung überträgt sich nicht automatisch.** Eine Konfidenz von 0,9 aus einer Implementierung entspricht nicht 0,9 aus einer anderen, bis Sie es auf denselben Daten gemessen haben.
- **Latenz und Kosten sind ein anderes System.** Selbsthosting verlagert Kosten von API-Gebühren zu GPUs und Betrieb.

Nutzen Sie einen Nachbau, um das Muster zu verstehen, und betrachten Sie das gehostete Modell, das Sie tatsächlich einsetzen, als eigenes System mit eigenen Messwerten.

## Was das für Unternehmen in Deutschland und der EU bedeutet

Für Unternehmen im DACH-Raum kann ein Entscheidungsmodell ein attraktiver Baustein für **Routing im Kundenservice, Lead-Qualifizierung und interne Ticket-Triage** sein – also genau die Prozesse, in denen Geschwindigkeit und Vorhersehbarkeit zählen und in denen Sie ohnehin ungern Freitext über Kunden erzeugen lassen. Wie bei jedem KI-Dienst gilt: Prüfen Sie den Ort der Datenverarbeitung, schließen Sie einen Auftragsverarbeitungsvertrag und minimieren Sie die personenbezogenen Daten im Zustand.

Bei XCLER behandeln wir Entscheidungsmodelle als einen Baustein in einem größeren System: Das Entscheidungsmodell wählt den Weg, ein Workflow führt ihn aus, und ein Sprachmodell formuliert die Nachricht, die der Kunde sieht. Mehr dazu, wie wir das kombinieren, lesen Sie in [KI-Agenten vs. Workflow-Automatisierung](/blog/ki-agenten-vs-workflow-automatisierung) und auf unserer Seite zur [KI-Automatisierung](/leistungen/ki-automatisierung).

## FAQ

**Was ist Jev?**
Jev ist ein Transformer-basiertes Entscheidungsmodell von TypeSafe AI. Statt Text zu erzeugen, bewertet es vorab festgelegte Fragen gegen den aktuellen Zustand in einem parallelen Durchlauf und liefert typisierte Antworten – Auswahlen, Scores und Wahrscheinlichkeiten – mit einer Konfidenzbewertung.

**Wer steht hinter TypeSafe AI?**
Das Unternehmen trat unter der Leitung von Diogo Almeida an die Öffentlichkeit, einem ehemaligen OpenAI-Forscher mit Schwerpunkt RLHF.

**Ersetzt Jev ChatGPT oder Claude?**
Nein, es ergänzt sie. Nutzen Sie ein Entscheidungsmodell für schnelle, geschlossene Auswahlen und ein Sprachmodell, wenn Sie Text oder offenes Denken brauchen.

**Sind Latenz und Preis garantiert?**
Nein. Die 70–500 ms Latenz und rund 0,042 US-Dollar pro Million Input-Tokens sind Launch-Angaben des Herstellers. Messen Sie sie mit Ihren eigenen Daten, Fragenzahlen und Regionen.

**Beseitigt ein Entscheidungsmodell Halluzinationen?**
Es beseitigt erfundene Optionen und Formatfehler, weil es nur Werte zurückgeben kann, die Sie definiert haben. Es kann trotzdem die falsche Option wählen – Sie brauchen also Konfidenzschwellen und eine menschliche Rückfallebene.

**Was ist OpenJev?**
Ein Open-Source-Nachbau des Jev-Ansatzes. Er eignet sich zum Lernen und Testen, Kalibrierung und Leistung entsprechen aber nicht dem gehosteten Modell.

Sie planen einen Router unter einer Sekunde für Support, Vertrieb oder Betrieb? [Kontaktieren Sie XCLER](/kontakt) mit Ihrer Liste möglicher Ergebnisse. Als Erstes prüfen wir, ob diese Liste wirklich geschlossen ist.
