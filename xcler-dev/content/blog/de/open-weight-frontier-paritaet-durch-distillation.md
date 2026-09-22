---
id: distillation
slug: open-weight-frontier-paritaet-durch-distillation
slug_en: open-weight-frontier-parity-distillation
slug_de: open-weight-frontier-paritaet-durch-distillation
title: "Open-Weight-Modelle holen auf: Frontier-Parität durch Distillation"
excerpt: "Wie On-Policy-Distillation auf Token-Ebene Open-Weight-Modelle mit einem Bruchteil der Rechenleistung an geschlossene Frontier-APIs heranführt – und wie Sie Parität ehrlich prüfen."
seoTitle: "Open-Weight-Modelle & Distillation: Frontier-Parität erklärt"
seoDescription: "Wie Distillation Open-Weight-LLMs an geschlossene Frontier-Modelle heranführt: On-Policy-Distillation, MiMo, Lizenzen, Kosten und wann Self-Hosting in der EU lohnt."
publishedAt: "2026-09-19T09:00:00.000Z"
updatedAt: "2026-09-23T09:00:00.000Z"
author: Abeel Mehr
cover: /blog/blog-open-weight-distillation-cover.webp
coverAlt: "Wissensdestillation von einem großen Frontier-Modell in ein kleineres Open-Weight-Modell"
readingTime: 7
tags:
  - Open-Weight-Modelle
  - Wissensdestillation
  - MiMo
  - LLM Self-Hosting
  - On-Policy-Distillation
  - KI-Kosten
---

Einige Jahre lang war die Lage einfach: Die besten KI-Modelle waren geschlossen, nur über kostenpflichtige APIs erreichbar, und offene Modelle lagen deutlich zurück. Dieser Abstand schrumpft rasant. Open-Weight-Releases – darunter Xiaomis offene **MiMo**-Reihe mit Modellen wie **MiMo-V2.6 Pro** – und neue Forschung zu **On-Policy-Alignment-Distillation auf Token-Ebene** zeigen, dass starkes logisches Denken kein Budget eines Frontier-Labs mehr erfordert.

Für Unternehmen ist das mehr als eine Forschungsnachricht. Es verändert die Optionen bei **Kosten, Datenstandort und Kontrolle**. Dieser Artikel erklärt, was Distillation ist, warum die neuen Verfahren so gut funktionieren, wie man „Parität“ ehrlich beurteilt und wann Self-Hosting eines offenen Modells die richtige Wahl ist.

![Distillation-Pipeline: Lehrer-Frontier-Modell, On-Policy-Distillation auf Token-Ebene, Schüler-Open-Weight-Modell mit Frontier-Niveau bei weniger Rechenleistung](/blog/blog-distillation-pipeline.webp)

## Zunächst die Begriffe

- **Geschlossenes Modell:** Zugriff über eine API. Die Gewichte sehen Sie nie, der Anbieter steuert Updates, Preise und Verfügbarkeit.
- **Open-Weight-Modell:** Die trainierten Gewichte sind veröffentlicht, Sie können das Modell herunterladen und auf eigener Infrastruktur betreiben. Die Lizenz regelt, was erlaubt ist – manche sind großzügig, andere schränken kommerzielle Nutzung oder großflächigen Einsatz ein.
- **Open Source** im strengen Sinn umfasst zusätzlich Trainingscode und -daten. Die meisten „offenen“ LLMs sind Open-Weight, nicht vollständig Open Source.

## Was Distillation ist

Bei der **Wissensdestillation** wird ein kleineres „Schüler“-Modell darauf trainiert, ein größeres „Lehrer“-Modell nachzuahmen. Die Idee ist im maschinellen Lernen seit Jahren etabliert: Statt nur aus Rohdaten und richtigen Antworten zu lernen, lernt der Schüler aus der vollständigen Ausgabe des Lehrers – inklusive der Frage, wie sicher dieser bei jeder Alternative ist.

Bei Sprachmodellen heißt das: Der Schüler lernt nicht nur die finale Antwort des Lehrers, sondern die **Wahrscheinlichkeiten, die der Lehrer jedem möglichen nächsten Token zugewiesen hat**. Dieses Signal ist weit reichhaltiger als eine einzelne richtige Antwort – deshalb kann der Schüler mit vergleichsweise wenig Daten viel lernen.

### Klassische (Off-Policy-)Distillation
Beim traditionellen Ansatz erzeugt der Lehrer eine große Menge Beispielantworten, und der Schüler wird darauf trainiert, sie zu reproduzieren. Das funktioniert, hat aber eine bekannte Schwäche: Der Schüler übt nur an Texten des Lehrers. Im Einsatz muss er jedoch an **seine eigenen** Ausgaben anschließen, inklusive eigener Fehler, die er im Training nie gesehen hat. Kleine Fehler können sich aufschaukeln.

### On-Policy-Distillation auf Token-Ebene
Der neuere Ansatz dreht das um:

1. Der **Schüler** erzeugt eigene Antworten.
2. Der **Lehrer** bewertet die Ausgabe des Schülers **Token für Token** und zeigt, wo und wie stark er anders entschieden hätte.
3. Der Schüler wird in Richtung der Lehrer-Verteilung angepasst – und zwar an den Texten, die der Schüler tatsächlich produziert.

Weil der Schüler aus eigenen Versuchen lernt, lernt er auch, sich von eigenen Fehlern zu erholen. Forschung zu On-Policy-Verfahren zeigt, dass das oft dateneffizienter ist als reines Training auf Lehrer-Beispielen. Außerdem passt es gut zum Alignment: Die Präferenzen des Lehrers für sichere, hilfreiche Antworten werden auf derselben feinen Ebene übertragen.

## Warum das Rechenbudgets senkt

Ein Frontier-Modell von Grund auf zu trainieren, erfordert enorme Pretraining-Läufe. Distillation lässt kleinere Modelle viel davon deutlich günstiger erben:

- **Weniger Pretraining.** Schüler können auf einem bestehenden offenen Basismodell aufsetzen, statt bei null zu beginnen.
- **Weniger Post-Training-Daten.** Token-genaue Lehrersignale tragen pro Beispiel mehr Information als einfache Richtig/Falsch-Labels.
- **Kleinere Modelle im Betrieb.** Ein destilliertes Modell mit einem Bruchteil der Parameter reicht für viele Aufgaben – und ist viel günstiger und schneller im Betrieb.

Die viel diskutierten Releases von 2025, bei denen Reasoning-Modelle in kleinere offene Modelle destilliert wurden, zeigten, wie viel Fähigkeit sich so übertragen lässt. Der Trend seither ist stetig: Jede Generation offener Modelle schließt mehr von der Lücke bei Reasoning, Programmierung und Mehrsprachigkeit.

## „Parität“ ist eine Messung, keine Pressemitteilung

Anbieter und Releases behaupten oft, ein Frontier-Modell zu „erreichen“. Bevor Sie das für Ihren Einsatz glauben, prüfen Sie, wie Parität gemessen wurde:

- **Gleicher Benchmark, gleiche Einstellungen.** Temperatur, Prompt-Format und Anzahl der Versuche verändern Ergebnisse stark.
- **Kontamination.** Bekannte Benchmarks können in Trainingsdaten gelangt sein. Bevorzugen Sie neue oder private Evaluierungen.
- **Ihre Aufgaben, Ihre Sprachen.** Ein Modell kann bei englischen Mathematikaufgaben gleichziehen und bei deutscher Vertragssprache oder Ihrer Produktterminologie trotzdem zurückliegen.
- **Tool-Nutzung und langer Kontext.** Agentische Aufgaben, Function Calling und lange Dokumente sind bei kleineren Modellen oft schwächer, auch wenn Chat-Benchmarks gleich aussehen.
- **Sicherheitsverhalten.** Ablehnungsquoten und Robustheit gegen Manipulation können deutlich abweichen.

Die einzige Parität, die für ein Unternehmen zählt, ist **Parität auf Ihrem eigenen Testset** – einige hundert echte Beispiele aus Ihren Prozessen, bewertet so, wie Ihr Team sie bewerten würde.

## Wann Self-Hosting eines offenen Modells sinnvoll ist

| Situation | Geschlossene API | Selbst gehostetes Open-Weight-Modell |
| --- | --- | --- |
| Sie brauchen heute das absolut beste Reasoning | Meist besser | Oft nah dran, manchmal dahinter |
| Strenger Datenstandort (EU, On-Premise) | Abhängig vom Anbieter | Volle Kontrolle |
| Sehr hohes, gleichmäßiges Volumen | Kosten steigen mit Nutzung | Feste Infrastrukturkosten |
| Geringes oder schwankendes Volumen | Zahlung pro Nutzung, keine Leerlaufkosten | GPUs stehen womöglich still |
| Feintuning mit eigenen Daten | Eingeschränkt | Vollständig möglich |
| Kleines Team ohne ML-Betrieb | Einfach | Erfordert Know-how und Monitoring |

Nach unserer Erfahrung gewinnt meist ein **hybrides** Muster: eine geschlossene Frontier-API für seltene, schwere Reasoning-Aufgaben und ein destilliertes Open-Weight-Modell für volumenstarke, klar definierte Arbeit wie Klassifizierung, Extraktion, Routing und erste Antwortentwürfe.

## Versteckte Kosten offener Modelle

Offene Gewichte sind kostenlos herunterzuladen – der Betrieb nicht:

- **GPU-Infrastruktur** – Cloud-GPUs oder eigene Hardware, plus Redundanz.
- **Inferenz-Serving** – Batching, Skalierung und Latenzoptimierung mit Serving-Frameworks wie vLLM oder vergleichbaren Werkzeugen.
- **Monitoring und Evaluierung** – Qualitäts- und Sicherheitstests liegen jetzt bei Ihnen.
- **Updates** – neue Versionen kommen häufig, und jeder Wechsel muss neu getestet werden.
- **Lizenzprüfung** – kommerzielle Bedingungen, Nutzergrenzen und Namensnennungspflichten vor dem Produktivbetrieb prüfen.

## Was das für den DACH-Raum bedeutet

Für Unternehmen in Deutschland, Österreich und der Schweiz sind leistungsfähige Open-Weight-Modelle eine echte Chance. Sie machen es praktikabel, KI **in EU-Rechenzentren oder auf eigenen Servern** zu betreiben – das vereinfacht DSGVO-Diskussionen und passt zu Branchen mit strenger Vertraulichkeit wie Industrie, Recht, Gesundheit und Finanzen. Energiekosten und GPU-Verfügbarkeit spielen ebenfalls eine Rolle – mehr dazu in [Stromknappheit bei KI-Rechenzentren](/blog/rechenzentrum-stromknappheit-ki-cluster).

## Wie wir Modelle auswählen

Wenn wir [KI-Automatisierung](/leistungen/ki-automatisierung) für Kunden bauen, ist die Modellwahl eine gemessene Entscheidung, keine Markenvorliebe:

1. Aufgabe definieren und echte Beispiele sammeln.
2. Zwei oder drei geschlossene und offene Kandidaten auf demselben Set testen.
3. Qualität, Latenz, Kosten pro tausend Aufgaben und Datenverarbeitung vergleichen.
4. Das System so bauen, dass sich das Modell später ohne Neubau des Workflows austauschen lässt.

## FAQ

**Was ist ein Open-Weight-Modell?**
Ein Modell, dessen trainierte Gewichte veröffentlicht sind, sodass Sie es gemäß Lizenz auf eigener Infrastruktur betreiben können.

**Was ist On-Policy-Distillation?**
Ein Trainingsverfahren, bei dem ein kleineres Schüler-Modell eigene Antworten erzeugt und ein größeres Lehrer-Modell diese Token für Token bewertet – so lernt der Schüler aus seinen eigenen Fehlern.

**Sind offene Modelle so gut wie geschlossene Frontier-Modelle?**
Bei vielen Aufgaben inzwischen nah dran, teils gleichauf. Beim schwersten Reasoning, langen agentischen Aufgaben und manchen Sprachen liegen geschlossene Modelle oft noch vorn. Testen Sie mit eigenen Daten.

**Ist der Betrieb eines offenen Modells günstiger?**
Bei hohem, gleichmäßigem Volumen häufig ja. Bei geringem Volumen kann API-Abrechnung günstiger sein, weil im Leerlauf nichts anfällt.

**Können wir Open-Weight-Modelle DSGVO-konform nutzen?**
Self-Hosting in der EU gibt Ihnen volle Kontrolle über die Datenflüsse, was die DSGVO-Konformität erleichtern kann. Die üblichen Dokumentations-, Zugriffs- und Löschregeln gelten trotzdem.

Sie wollen wissen, ob ein offenes Modell Ihre Aufgaben bewältigt? [Schicken Sie uns eine Beispielaufgabe](/kontakt) – wir vergleichen es mit einer geschlossenen API.
