---
id: rag-chatbot
slug: rag-chatbot-unternehmenswissen
slug_en: rag-chatbot-company-knowledge
slug_de: rag-chatbot-unternehmenswissen
title: "RAG-Chatbots erklärt: So bauen Sie einen KI-Assistenten auf Ihrem Unternehmenswissen"
excerpt: "Was Retrieval-Augmented Generation ist, wie eine RAG-Pipeline Schritt für Schritt funktioniert und welche Fehler Unternehmens-Chatbots falsche Antworten geben lassen."
seoTitle: "RAG-Chatbot erklärt: KI-Assistent für Unternehmenswissen"
seoDescription: "Retrieval-Augmented Generation (RAG) für Unternehmen erklärt: Pipeline, Chunking, Vektorsuche, Quellenangaben, Kosten und typische Fehler beim Wissens-Chatbot."
publishedAt: "2026-09-12T08:00:00.000Z"
author: Musharraf Aziz
cover: /blog/blog-rag-knowledge-chatbot-cover.webp
coverAlt: "RAG-Chatbot macht Unternehmensdokumente zu KI-Antworten mit Quellenangabe"
readingTime: 10
tags:
  - RAG
  - Retrieval-Augmented Generation
  - Wissens-Chatbot
  - Vektordatenbank
  - KI-Assistent
  - Unternehmenssuche
---

Ein allgemeines Sprachmodell weiß viel über die Welt – und nichts über Ihre Preisliste, Ihre Rückgaberegeln oder das Produktupdate vom letzten Monat. **Retrieval-Augmented Generation (RAG)** löst das: Bevor das Modell antwortet, sucht das System die passenden Abschnitte in Ihren eigenen Dokumenten und gibt sie dem Modell als Kontext mit.

Das Ergebnis ist ein Assistent, der aus **Ihrem** Wissen antwortet, zu jeder Antwort die Quelle zeigen kann und sich aktualisieren lässt, indem Sie Dokumente ändern – ohne ein Modell neu zu trainieren.

![RAG-Pipeline: Dokumente, Chunking, Embeddings, Vektorindex, Retrieval, LLM-Antwort mit Quellen](/blog/blog-rag-pipeline-diagram.webp)

## So funktioniert eine RAG-Pipeline

1. **Dokumente sammeln.** PDFs, Confluence- oder Notion-Seiten, SharePoint, Hilfe-Center-Artikel, Produktdaten, Tickets.
2. **In Abschnitte teilen (Chunking).** Jedes Dokument in Passagen von einigen hundert Wörtern zerlegen, Überschriften und Tabellen bleiben erhalten.
3. **Embeddings erzeugen.** Jeder Abschnitt wird zu einem Vektor – einer Zahlenfolge, die seine Bedeutung abbildet.
4. **In einem Vektorindex speichern**, etwa Qdrant, PGVector, Pinecone oder Weaviate, mit Metadaten wie Quelle, Datum und Zugriffsebene.
5. **Abrufen (Retrieval).** Stellt jemand eine Frage, wird sie ebenfalls als Vektor dargestellt und die ähnlichsten Abschnitte werden geladen. Gute Systeme kombinieren das mit Stichwortsuche.
6. **Antwort mit Quellen erzeugen.** Frage und gefundene Abschnitte gehen an das Sprachmodell – mit der Anweisung, nur daraus zu antworten und die Quellen zu nennen.

## Warum RAG statt Fine-Tuning?

| | RAG | Fine-Tuning |
| --- | --- | --- |
| Wissen aktualisieren | Dokument ersetzen | Modell neu trainieren |
| Zeigt Quellen | Ja | Nein |
| Zugriffsrechte | Ja, über Metadatenfilter | Schwierig |
| Kosten für Änderungen | Gering | Hoch |
| Geeignet für | Fakten, Richtlinien, Produktdaten | Stil, Format, enge Aufgaben |

Für Unternehmenswissen ist RAG fast immer der richtige Einstieg. Fine-Tuning lohnt sich später für Tonalität oder spezielle Formate.

## Wo RAG-Projekte scheitern

- **Schlechtes Chunking.** Eine Tabelle wird halbiert oder die Überschrift geht verloren, die sagt, um welches Produkt es geht. Hier beginnen die meisten „der Bot liegt falsch“-Beschwerden.
- **Veraltete Quellen.** Drei Versionen derselben Richtlinie im Index – und der Bot zitiert die älteste. Sie brauchen einen Sync-Prozess und Versionsregeln.
- **Keine Zugriffskontrolle.** Ein Praktikant sollte keine Antworten aus Vorstandsprotokollen erhalten. Filtern Sie den Abruf nach Berechtigungen.
- **Kein „Das weiß ich nicht“.** Das Modell muss sagen dürfen – und angewiesen werden –, dass es keine Antwort findet, und an einen Menschen übergeben.
- **Keine Evaluation.** Ohne Testset aus echten Fragen und erwarteten Antworten wissen Sie nicht, ob eine Änderung etwas verbessert oder verschlechtert hat.

## Bewährte Praxis aus unseren Projekten

- **Hybride Suche** (Vektor plus Stichwort) für Artikelnummern, Namen und Codes, die rein semantische Suche übersieht.
- **Reranking** der besten Treffer, bevor sie an das Modell gehen.
- **Quellenangaben in jeder Antwort** mit Link zur Seite oder zum Dokument.
- **Wöchentliche Auswertung** unbeantworteter und schlecht bewerteter Fragen, die zu neuen Inhalten oder Korrekturen werden.
- **EU-Hosting** für Embeddings, Index und Modell bei sensiblen Daten.

## Typische Einsatzfälle

- Kundenservice-Assistent, der aus Ihrem Hilfe-Center antwortet und an Mitarbeitende übergibt.
- Interner Assistent für HR-Richtlinien, IT-Anleitungen und Vertriebs-Playbooks.
- Suche in technischer Dokumentation für Servicetechniker.
- Pre-Sales-Assistent für Produkt- und Kompatibilitätsfragen.

## FAQ

**Verhindert RAG Halluzinationen vollständig?**
Nein, aber es reduziert sie deutlich. Strenge Prompts, Quellenangaben und ein „Weiß ich nicht“-Pfad senken die Fehlerquote weiter.

**Wie viele Dokumente verkraftet ein RAG-System?**
Von einigen Dutzend bis zu Millionen. Schwierig ist nicht die Menge, sondern Quellen sauber und aktuell zu halten.

**Funktioniert das auf Deutsch und Englisch?**
Ja. Mehrsprachige Embedding-Modelle erlauben Fragen in einer Sprache und Treffer in Dokumenten einer anderen.

Wir bauen RAG-Assistenten im Rahmen unserer Leistungen für [KI-Chatbots und Agenten](/leistungen/ki-chatbots-agenten), meist auf n8n mit Vektorspeicher in der EU. [Sagen Sie uns, welches Wissen Sie nutzbar machen wollen](/kontakt) – wir skizzieren die Pipeline.
