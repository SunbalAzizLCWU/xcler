---
id: whatsapp-automation
slug: whatsapp-business-automatisierung-ki
slug_en: whatsapp-business-automation-ai
slug_de: whatsapp-business-automatisierung-ki
title: "WhatsApp Business automatisieren mit KI: Termine, Bestellungen und Support rund um die Uhr"
excerpt: "So automatisieren Unternehmen WhatsApp Business mit KI: Terminbuchung, Bestellstatus, Lead-Qualifizierung und Übergabe an Menschen – plus Kosten und DSGVO-Grundlagen."
seoTitle: "WhatsApp Business Automatisierung mit KI: Leitfaden 2026"
seoDescription: "WhatsApp Business mit KI automatisieren: Terminbuchung, Bestellstatus, Lead-Qualifizierung und Übergabe über die WhatsApp Business Platform, n8n, Kosten und DSGVO."
publishedAt: "2026-09-05T08:00:00.000Z"
author: Mehru Seemab
cover: /blog/blog-whatsapp-automation-cover.webp
coverAlt: "WhatsApp Business Automatisierung mit KI verbindet Chats mit Kalender, CRM und Dokumenten"
readingTime: 9
tags:
  - WhatsApp Automatisierung
  - WhatsApp Business API
  - KI-Chatbot
  - Kundenservice Automatisierung
  - n8n
  - Conversational AI
---

Ihre Kunden nutzen WhatsApp jeden Tag. Viele schreiben lieber eine Nachricht, als anzurufen oder ein Formular auszufüllen. Mit der **WhatsApp Business Platform** (der offiziellen API) und einer KI-Schicht beantworten Sie diese Nachrichten sofort, buchen Termine, prüfen Bestellungen und übergeben komplexe Fälle an Ihr Team – rund um die Uhr.

![Ablauf der Nachrichtenautomatisierung: eingehende Nachricht, Absichtserkennung, dann Termin buchen, Bestellstatus oder Übergabe an Menschen](/blog/blog-whatsapp-automation-flow.webp)

## App oder API: Was Sie brauchen

- **WhatsApp Business App** – kostenlos, auf einem Telefon, mit Schnellantworten und einfachen Abwesenheitsnachrichten. Für sehr kleine Betriebe ausreichend.
- **WhatsApp Business Platform (API)** – für Automatisierung, mehrere Teammitglieder, Integrationen und KI. Zugang direkt über Meta oder über einen Business Solution Provider.

Für alles in diesem Artikel brauchen Sie die API.

## Fünf Automatisierungen, die gut funktionieren

### 1. Terminbuchung
Der Kunde schreibt „Kann ich am Donnerstag vorbeikommen?“. Die KI erkennt die Absicht, prüft Ihren Kalender, bietet freie Zeiten an und bucht den gewählten Termin – mit Bestätigung und Erinnerung am Vortag.

### 2. Bestell- und Lieferstatus
Der Kunde schickt eine Bestellnummer. Der Workflow sucht sie in Shop oder ERP und antwortet mit Status und Tracking-Link.

### 3. Lead-Qualifizierung
Neue Anfragen erhalten ein paar freundliche Fragen – Budget, Zeitraum, Standort –, und qualifizierte Leads landen mit Zusammenfassung im CRM.

### 4. FAQ und Produktfragen
Antworten aus Ihrer eigenen Wissensbasis per Retrieval, damit sie zu aktuellen Preisen und Regeln passen. Siehe [RAG-Chatbots erklärt](/blog/rag-chatbot-unternehmenswissen).

### 5. Übergabe an Menschen
Ist der Kunde unzufrieden, die Frage komplex oder die KI unsicher, wechselt das Gespräch mit vollständigem Verlauf in ein gemeinsames Postfach zu einer Person.

## So sieht das technische Setup aus

1. **WhatsApp Business Platform**, verbunden mit Ihrer verifizierten Geschäftsnummer.
2. **Eine Automatisierungsschicht** wie n8n, die eingehende Nachrichten per Webhook empfängt.
3. **Absichtserkennung und Antworten** mit einem Sprachmodell auf Basis Ihrer Wissensbasis.
4. **Integrationen** mit Kalender, CRM, Shop oder ERP.
5. **Ein gemeinsames Postfach**, in dem Ihr Team Gespräche übernimmt.
6. **Protokollierung und Monitoring**, um Gespräche auszuwerten und schwache Antworten zu verbessern.

## Regeln, die Sie beachten müssen

- **Opt-in.** Unternehmen dürfen Gespräche nur mit Personen beginnen, die einer Kontaktaufnahme per WhatsApp zugestimmt haben.
- **24-Stunden-Fenster.** Innerhalb von 24 Stunden nach der letzten Kundennachricht dürfen Sie frei antworten. Außerhalb brauchen Sie vorab genehmigte Vorlagen.
- **Vorlagen (Templates).** Erinnerungen, Bestätigungen und Marketingnachrichten laufen über von Meta genehmigte Vorlagen.
- **Handels- und Inhaltsrichtlinien** regeln, was Sie verkaufen und schreiben dürfen.

## Was es kostet

- **Gesprächsgebühren von Meta**, abhängig von Land und Kategorie (Marketing, Service-Updates, Authentifizierung, Kundenservice). Prüfen Sie die aktuelle Preisliste von Meta für Ihre Märkte.
- **Anbietergebühren**, wenn Sie einen Business Solution Provider nutzen.
- **KI-Modellnutzung**, meist gering pro Gespräch.
- **Einrichtung** von Abläufen und Integrationen, typischerweise einige tausend Euro für einen fokussierten Einsatzfall, mehr bei mehreren Integrationen.

## DSGVO-Grundlagen

WhatsApp wird von Meta betrieben – behandeln Sie es wie jeden externen Verarbeiter: Datenschutzerklärung anpassen, sauberes Opt-in einholen, personenbezogene Daten in der KI-Schicht minimieren, Automatisierung und Logs möglichst in der EU betreiben und Löschfristen festlegen. Unsere [DSGVO-Checkliste für Chatbots](/blog/dsgvo-konformer-ki-chatbot) gilt auch hier. Beziehen Sie Ihren Datenschutzbeauftragten ein.

## FAQ

**Kann die KI in mehreren Sprachen antworten?**
Ja. Sie antwortet in der Sprache, in der der Kunde schreibt – hilfreich bei internationaler Kundschaft.

**Wissen Kunden, dass sie mit einer KI schreiben?**
Das sollten sie. Kennzeichnen Sie den Assistenten klar und bieten Sie immer einen Weg zu einem Menschen.

**Dürfen wir Marketingnachrichten versenden?**
Nur an Kunden mit Opt-in, mit genehmigten Vorlagen und im Rahmen der Meta-Richtlinien.

Wir entwickeln WhatsApp- und Web-Chat-Automatisierungen im Rahmen unserer Leistungen für [KI-Chatbots und Agenten](/leistungen/ki-chatbots-agenten), meist auf n8n. [Sagen Sie uns, welche Gespräche Sie automatisieren möchten](/kontakt).
