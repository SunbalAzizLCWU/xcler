---
id: decoupled-agents
slug: entkoppelte-architekturen-computer-use-agenten
slug_en: decoupled-architectures-computer-use-agents
slug_de: entkoppelte-architekturen-computer-use-agenten
title: "Entkoppelte Architekturen für Computer-Use-Agenten: schnelle Entscheidungen, kluger Text"
excerpt: "Warum ein Screenshot an ein Frontier-Modell bei jedem Klick nicht skaliert – und wie die Trennung von Wahrnehmung, schnellen Entscheidungen und Textgenerierung das löst."
seoTitle: "Entkoppelte Architektur für Computer-Use-Agenten (2026)"
seoDescription: "Computer-Use- und Browser-Agenten skalierbar bauen: Wahrnehmung, schnelle Entscheidungsmodelle und Frontier-LLMs trennen. Architektur, Kosten, Latenz, Fallstricke."
publishedAt: "2026-09-21T09:00:00.000Z"
updatedAt: "2026-09-23T09:00:00.000Z"
author: Musharraf Aziz
cover: /blog/blog-decoupled-agents-cover.webp
coverAlt: "Entkoppelte Architektur für Computer-Use-Agenten trennt schnelle Entscheidungen von Textgenerierung"
readingTime: 8
tags:
  - Computer-Use-Agenten
  - Browser-Agenten
  - Agentenarchitektur
  - KI-Automatisierung
  - Jev
  - RPA
---

Computer-Use-Agenten sind KI-Systeme, die Software so bedienen wie ein Mensch: Sie betrachten den Bildschirm, bewegen die Maus, klicken, tippen und lesen das Ergebnis. Browser-Agenten sind die häufigste Form – sie füllen Webformulare aus, übertragen Daten zwischen Tools ohne API, prüfen Portale und ziehen Berichte.

Die erste Generation dieser Agenten war als einzelne Schleife gebaut: **Screenshot aufnehmen, an ein großes multimodales Modell senden, „Was als Nächstes?“ fragen, Antwort ausführen, wiederholen.** Das ergibt eindrucksvolle Demos. Im Produktivbetrieb ist es langsam, teuer und fehleranfällig.

Ein neues Muster löst es ab. Teams **entkoppeln** den Agenten in Schichten: Ein kleines, schnelles Modell übernimmt die vielen Routineentscheidungen, ein großes Modell wird nur aufgerufen, wenn echtes Denken oder Schreiben nötig ist. Der Launch von Entscheidungsmodellen wie [Jev von TypeSafe AI](/blog/typesafe-ai-jev-nicht-text-entscheidungsmodell) und offene Nachbauten wie APUS OpenJev haben diesen Wandel beschleunigt.

![Entkoppelter Stack für Computer-Use-Agenten: Wahrnehmung, schnelles Entscheidungsmodell, Frontier-LLM für Text, Aktoren](/blog/blog-decoupled-stack-diagram.webp)

## Warum die Ein-Modell-Schleife scheitert

Stellen Sie sich einen Agenten vor, der sich in ein Lieferantenportal einloggt, zwanzig Rechnungen herunterlädt und ablegt. Das können leicht 150 bis 300 Einzelaktionen sein. In der monolithischen Schleife kostet jede Aktion:

- **Einen Screenshot-Upload.** Hochauflösende Bilder sind in Tokens teuer.
- **Einen vollständigen Modellaufruf.** Frontier-Modelle brauchen häufig mehrere Sekunden pro Antwort.
- **Parsing.** Das Modell antwortet mit Text, der in eine Klickposition oder Tastatureingabe übersetzt werden muss.

Multipliziert mit Hunderten Schritten ergeben sich Läufe, die viele Minuten dauern und weit mehr kosten, als die Aufgabe wert ist. Schlimmer noch: Fehler summieren sich. Hat jeder Schritt eine kleine Fehlerwahrscheinlichkeit, enthält eine lange Kette fast sicher irgendwo einen Fehler.

Hinzu kommt ein subtileres Problem. Große Modelle sind darauf trainiert, hilfreich und beschreibend zu sein. Ist der Bildschirm uneindeutig, **erzählen sie gern eine plausible Aktion** – „Ich habe auf Speichern geklickt“ –, auch wenn der Button deaktiviert war. Ohne unabhängige Prüfung glaubt der Agent seiner eigenen Geschichte.

## Der entkoppelte Stack in vier Schichten

Das entkoppelte Muster teilt den Agenten in Schichten mit klaren Aufgaben.

### 1. Wahrnehmung: den Bildschirm günstig lesen
Bevor ein Modell Pixel betrachtet, extrahieren Sie so viel wie möglich in strukturierter Form:

- **DOM oder Accessibility-Tree** bei Webseiten und vielen Desktop-Anwendungen. Sie liefern Buttons, Felder, Beschriftungen und Zustände als Daten.
- **Leichtgewichtige Texterkennung (OCR) oder kleine Vision-Modelle** nur dort, wo keine strukturierten Daten verfügbar sind, etwa bei Altsoftware oder Remote-Desktops.
- **Änderungserkennung**, damit nur der Bildschirmbereich analysiert wird, der sich tatsächlich geändert hat.

Das Ergebnis ist eine kompakte Beschreibung des aktuellen Zustands, kein 4K-Bild.

### 2. Schnelle Entscheidungsschicht: die Routineauswahl
Die meisten Schritte einer Computer-Use-Aufgabe sind geschlossene Entscheidungen: Welcher dieser fünf Buttons? Ist die Seite schon geladen? Ist das die richtige Zeile? Scrollen? Ist die Aufgabe fertig? Ein schnelles Entscheidungsmodell – oder sogar feste Regeln plus kleiner Klassifikator – beantwortet das in Millisekunden und liefert ein typisiertes Ergebnis: Element-ID, Aktionstyp, Konfidenz.

Hier passen Entscheidungsmodelle wie Jev ganz natürlich. Sie liefern Auswahlen aus einem festen Satz und können daher kein Element erfinden, das es nicht gibt.

### 3. Denk- und Sprachschicht: das teure Modell, sparsam eingesetzt
Ein Frontier-LLM wird aufgerufen, wenn die Aufgabe es wirklich braucht:

- Die Entscheidungsschicht ist unsicher oder keine Option passt.
- Der Agent muss ein neues Teilziel planen („Das Portal hat sein Layout geändert, finde das Rechnungsarchiv“).
- Es muss etwas geschrieben werden: eine E-Mail, eine Zusammenfassung, eine CRM-Notiz, eine Erklärung für einen menschlichen Prüfer.

In einem gut gebauten Agenten übernimmt diese Schicht einen kleinen Teil der Schritte, aber den Großteil der „Intelligenz“.

### 4. Aktoren und Verifikation
Die Ausführungsschicht klickt, tippt, ruft APIs auf und verarbeitet Dateien – und **prüft das Ergebnis anschließend unabhängig**. Hat sich die URL geändert? Erscheint die Erfolgsmeldung? Existiert die heruntergeladene Datei in der erwarteten Größe? Die Verifikation darf sich nie darauf verlassen, dass das Modell Erfolg meldet.

## Die beiden Ansätze im Vergleich

| | Monolithische Schleife | Entkoppelter Stack |
| --- | --- | --- |
| Modellaufruf pro Schritt | Großes multimodales Modell | Kleines Entscheidungsmodell; großes Modell bei Eskalation |
| Eingabe pro Schritt | Vollständiger Screenshot | Strukturierter Zustand (DOM, Accessibility-Tree, Diff) |
| Typische Latenz pro Schritt | Sekunden | Millisekunden bei Routineschritten |
| Kostentreiber | Jeder Schritt | Vor allem Eskalationen und Text |
| Fehlererkennung | Selbstauskunft des Modells | Unabhängige Verifikation |
| Fehlersuche | Lange Protokolle lesen | Typisierte Entscheidungen je Schicht prüfen |

## Ein Praxisbeispiel

Ein mittelständisches Logistikunternehmen braucht jeden Morgen Daten aus einem Spediteursportal ohne API: Sendungsstatus, Zustellnachweise als PDF und Zuschlagsmitteilungen für mehrere hundert Sendungen.

**Monolithische Variante:** Ein multimodales Modell betrachtet jede Seite, liest jede Tabelle und klickt jeden Link. Das funktioniert – langsam – und liest gelegentlich eine Tabellenzeile falsch.

**Entkoppelte Variante:**

1. Ein zeitgesteuerter Workflow loggt sich mit Zugangsdaten aus einem Tresor ein.
2. Die Wahrnehmungsschicht liest die Sendungstabelle als strukturierte Zeilen aus dem DOM.
3. Fester Code ordnet die Zeilen internen Sendungsnummern zu; ein schnelles Entscheidungsmodell übernimmt unscharfe Fälle (Tippfehler, geteilte Sendungen) mit Konfidenzwert.
4. Downloads werden ausgeführt und per Dateiprüfung verifiziert.
5. Nur ungewöhnliche Zuschlagsmitteilungen gehen an ein großes Modell, das sie für das Operations-Team zusammenfasst.
6. Zuordnungen mit niedriger Konfidenz landen in einer Prüfliste für einen Menschen.

Der Routineteil läuft in einem Bruchteil der Zeit und Kosten, und das teure Modell tut, was es am besten kann: Ausnahmen lesen und erklären.

## Unsere Designregeln

- **APIs vor Bildschirmen.** Hat ein System eine API, nutzen Sie sie. Computer-Use-Agenten schließen Lücken, sie ersetzen keine Integrationen.
- **Den Aktionsraum klein halten.** Ein Agent, der nur klicken, tippen, auswählen, scrollen, herunterladen und stoppen darf, ist leichter zu kontrollieren als einer mit freien Befehlen.
- **Latenzbudgets trennen.** Messen Sie Entscheidungs- und Sprachlatenz als getrennte Kennzahlen mit eigenen Zielen.
- **Typisierte Entscheidungen protokollieren.** Speichern Sie für jeden Schritt Zustand, gewählte Aktion, Konfidenz und Ergebnis. So werden Fehler reproduzierbar.
- **Bei niedriger Konfidenz eskalieren, nicht erst bei Fehlern.** Wenn ein Fehler sichtbar wird, ist der Agent womöglich schon mehrere Schritte auf dem falschen Weg.
- **Menschliche Freigabe für Unumkehrbares.** Bestellungen absenden, E-Mails verschicken, Datensätze löschen und Zahlungen auslösen sollten eine ausdrückliche Bestätigung erfordern, bis es eine lange, belastbare Erfolgsbilanz gibt.

## Sicherheit

Agenten, die einen Desktop oder Browser steuern, sind mächtig und damit attraktive Ziele. Betreiben Sie sie in einer isolierten Umgebung, geben Sie ihnen nur die nötigen Zugangsdaten und gehen Sie davon aus, dass jede gelesene Webseite Anweisungen enthalten kann, die den Agenten kapern sollen (Prompt Injection). Ausführlich dazu: [Desktop-Agent-Sicherheit und Credential-Hijacking](/blog/desktop-agent-sicherheit-credential-hijacking).

## Wann sich ein Computer-Use-Agent überhaupt lohnt

Computer-Use-Agenten sind sinnvoll, wenn:

- ein System keine nutzbare API und keinen Export hat,
- die Aufgabe sich wiederholt, aber für klassische RPA-Skripte (Robotic Process Automation) zu variabel ist,
- das Volumen den Aufwand rechtfertigt, der Prozess sich aber zu oft ändert für starre Skripte.

Sie sind das falsche Werkzeug, wenn es eine API gibt, ein einfacher Export und Import reicht oder der Prozess so unvorhersehbar ist, dass ohnehin ein Mensch die meisten Entscheidungen treffen muss.

## Einbettung in einen größeren Automatisierungs-Stack

In unseren Projekten stehen Computer-Use-Agenten selten allein. Meist sind sie ein Schritt in einem größeren Workflow auf n8n oder Make: Der Workflow startet den Agenten, übergibt die Eingaben, erhält strukturierte Ergebnisse und fährt mit festen Schritten fort – ERP aktualisieren, Team benachrichtigen, Ticket anlegen. So bleibt der Agent fokussiert, und der gesamte Prozess ist nachvollziehbar. Wie wir das aufsetzen, zeigen unsere Seiten zur [Workflow-Automatisierung](/leistungen/workflow-automatisierung) und [KI-Automatisierung](/leistungen/ki-automatisierung).

## FAQ

**Was ist ein Computer-Use-Agent?**
Ein KI-System, das Software über die Benutzeroberfläche bedient – Bildschirm lesen, klicken, tippen – statt über eine API.

**Warum nicht einfach für jeden Schritt ein multimodales Frontier-Modell nutzen?**
Für Demos funktioniert das, im großen Maßstab ist es aber langsam und teuer, Fehler summieren sich bei langen Aufgaben, und das Modell meldet womöglich Erfolge, die nicht eingetreten sind. Ein entkoppelter Stack setzt das große Modell nur dort ein, wo es Mehrwert bringt.

**Brauche ich ein spezielles Entscheidungsmodell wie Jev?**
Nein. Die Entscheidungsschicht kann aus Regeln, einem kleinen Klassifikator oder einem Entscheidungsmodell bestehen. Modelle wie Jev sind attraktiv, weil sie keine Trainingsdaten brauchen und typisierte Auswahlen mit Konfidenz liefern.

**Ist das dasselbe wie RPA?**
Es überschneidet sich. Klassische RPA folgt festen Skripten. Entkoppelte Agenten verbinden die Zuverlässigkeit von Skripten mit KI für die variablen Schritte.

**Wie verhindern Sie teure Fehler des Agenten?**
Mit unabhängiger Verifikation nach jeder Aktion, Konfidenzschwellen, einem kleinen Aktionsraum und menschlicher Freigabe für alles Unumkehrbare.

Haben Sie ein Portal oder Altsystem, das Stunden an manuellem Klicken frisst? [Erzählen Sie uns davon](/kontakt) – wir skizzieren, ob eine API, ein Workflow oder ein Computer-Use-Agent die richtige Lösung ist.
