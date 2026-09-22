---
id: gdpr-chatbot
slug: dsgvo-konformer-ki-chatbot
slug_en: gdpr-compliant-ai-chatbot
slug_de: dsgvo-konformer-ki-chatbot
title: "DSGVO-konformer KI-Chatbot: Die praktische Checkliste für Unternehmen"
excerpt: "So betreiben Sie einen KI-Chatbot in der EU ohne Datenschutzprobleme: Hosting, Auftragsverarbeitung, Einwilligung, Datenminimierung, Löschfristen und EU AI Act."
seoTitle: "DSGVO-konformer KI-Chatbot: Checkliste für Unternehmen"
seoDescription: "KI-Chatbot DSGVO-konform betreiben: EU-Hosting, AVV, Einwilligung, Datenminimierung, Löschkonzept, Transparenzpflichten nach EU AI Act und praktische Checkliste."
publishedAt: "2026-09-06T08:00:00.000Z"
author: Musharraf Aziz
cover: /blog/blog-gdpr-ai-chatbot-cover.webp
coverAlt: "DSGVO-konformer KI-Chatbot geschützt durch EU-Datenschutzschild"
readingTime: 6
tags:
  - DSGVO Chatbot
  - Datenschutz KI
  - KI Compliance
  - EU AI Act
  - KI-Chatbot
  - Auftragsverarbeitung
---

Ein KI-Chatbot verarbeitet alles, was Besucher eintippen – Namen, E-Mail-Adressen, Bestellnummern, manchmal Gesundheits- oder Finanzangaben. Nach der DSGVO sind Sie verantwortlich dafür, wie diese Daten verarbeitet, gespeichert und an den Modellanbieter weitergegeben werden.

Diese Checkliste fasst zusammen, was wir für Kunden in Deutschland und der EU einrichten. Sie ist eine praktische Orientierung, **keine Rechtsberatung** – beziehen Sie für Ihren konkreten Fall Ihren Datenschutzbeauftragten ein.

![DSGVO-Checkliste für Chatbots: EU-Datenhaltung, AVV mit Anbieter, Einwilligung vor dem Chat, Datenminimierung, Löschkonzept, Übergabe an Menschen](/blog/blog-gdpr-chatbot-checklist.webp)

## 1. Datenflüsse kennen

Zeichnen Sie den Weg einer einzelnen Nachricht: Browser → Chat-Widget → Ihr Backend oder Ihre Automatisierungsplattform → Modellanbieter → Vektordatenbank → Logs. Notieren Sie für jede Station, wo sie gehostet wird und wer sie betreibt. Risiken lassen sich nur für Datenflüsse bewerten, die man kennt.

## 2. Verarbeitung in der EU bevorzugen

Wählen Sie Anbieter mit Verarbeitung in der EU oder hosten Sie Komponenten selbst: Automatisierungsschicht (etwa selbst gehostetes n8n), Vektordatenbank und Logs. Nutzen Sie beim Modell EU-Endpunkte, wo verfügbar. Gehen Daten in die USA, dokumentieren Sie Rechtsgrundlage und Übermittlungsmechanismus.

## 3. Auftragsverarbeitungsverträge abschließen

Jeder Anbieter, der in Ihrem Auftrag personenbezogene Daten verarbeitet, braucht einen **Auftragsverarbeitungsvertrag (AVV)**: Chat-Widget, Hosting, Modellanbieter, Vektordatenbank, E-Mail-Tools. Prüfen Sie, ob der Anbieter Ihre Daten zum Training nutzt, und schalten Sie das ab.

## 4. Einwilligung richtig umsetzen

- Laden Sie das Chat-Widget erst nach Zustimmung, wenn es Cookies setzt oder Daten an Dritte sendet.
- Zeigen Sie vor der ersten Nachricht einen kurzen Hinweis: was der Bot ist, dass er KI nutzt, und einen Link zur Datenschutzerklärung.
- Ergänzen Sie die Datenschutzerklärung um Chatbot, Anbieter, Zwecke und Speicherdauer.

## 5. Daten minimieren

- Fragen Sie nicht mehr ab als nötig. Ein FAQ-Bot braucht selten den vollständigen Namen.
- Maskieren oder entfernen Sie sensible Daten wie IBAN oder Gesundheitsangaben, bevor Text an das Modell geht.
- Halten Sie personenbezogene Daten aus der Wissensbasis heraus, außer sie sind nötig und zugriffsgeschützt.

## 6. Speicherdauer und Löschung festlegen

Legen Sie fest, wie lange Gesprächsprotokolle aufbewahrt werden – etwa 30 oder 90 Tage – und löschen Sie sie automatisch. Stellen Sie sicher, dass Sie die Gespräche einer Person auf Anfrage finden und löschen können.

## 7. Einen Menschen anbieten

Bieten Sie einen einfachen Weg zu einer Person, besonders bei Beschwerden, rechtlichen Fragen oder Entscheidungen, die den Nutzer betreffen. Das ist guter Service und senkt das Risiko.

## 8. Transparenz nach dem EU AI Act

Der EU AI Act verlangt, dass Menschen wissen, wenn sie mit einem KI-System interagieren. Für einen Kundenservice-Chatbot reichen meist eine klare Kennzeichnung wie „KI-Assistent“ und eine kurze Erklärung. Hochrisiko-Anwendungen – etwa Entscheidungen über Kredite oder Einstellungen – unterliegen deutlich strengeren Pflichten.

## 9. Das System absichern

- Admin-Bereiche und API-Schlüssel schützen, Schlüssel regelmäßig erneuern.
- Gegen Prompt Injection absichern: Der Bot darf keine Systemanweisungen oder Daten anderer Nutzer preisgeben.
- Zugriffe und Änderungen für Audits protokollieren.

## 10. Dokumentieren

Führen Sie eine kurze Dokumentation: Zweck, Datenkategorien, Anbieter, Rechtsgrundlage, Speicherdauer, Risikobewertung und – wo nötig – eine Datenschutz-Folgenabschätzung. Genau danach fragen Prüfer und Kunden.

## Welche Rechtsgrundlage gilt?

Jede Verarbeitung personenbezogener Daten braucht eine Rechtsgrundlage nach Art. 6 DSGVO. Bei Chatbots sind drei üblich:

- **Vertrag (Art. 6 Abs. 1 lit. b)** – wenn der Chat zur Abwicklung einer Bestellung, Buchung oder bestehenden Kundenbeziehung nötig ist.
- **Berechtigtes Interesse (Art. 6 Abs. 1 lit. f)** – für allgemeine Serviceanfragen, sofern Sie Ihr Interesse gegen das des Nutzers abwägen und dokumentieren.
- **Einwilligung (Art. 6 Abs. 1 lit. a)** – für optionale Funktionen, Marketing-Nachfassen oder wo Cookie- und Tracking-Regeln sie verlangen.

Unabhängig davon verlangen das deutsche **TDDDG** (ehemals TTDSG) und die EU-ePrivacy-Regeln eine Einwilligung, bevor Informationen auf dem Endgerät gespeichert oder ausgelesen werden – außer es ist unbedingt erforderlich. Ein Chat-Widget, das nicht notwendige Cookies setzt oder Drittanbieter-Skripte lädt, braucht daher oft eine Einwilligung, bevor es geladen wird.

Besondere Kategorien personenbezogener Daten – Gesundheit, Religion, Gewerkschaftszugehörigkeit und weitere nach Art. 9 – verlangen zusätzliche Sorgfalt. Könnten Nutzer solche Daten teilen, etwa beim Chatbot einer Arztpraxis, weisen Sie darauf hin, speichern Sie so wenig wie möglich und erwägen Sie strengeres Hosting.

## Beispiel: eine datenschutzfreundliche Architektur

Ein deutscher Versicherungsmakler möchte einen Chatbot, der Produktfragen beantwortet und Beratungstermine bucht.

1. **Widget** auf der eigenen Domain des Maklers, erst nach Einwilligung geladen; ein kurzer Hinweis erklärt, dass Antworten KI-generiert sind.
2. **Backend** auf selbst gehostetem n8n in einem Frankfurter Rechenzentrum empfängt die Nachrichten.
3. **Maskierungsschritt** entfernt offensichtliche Kennungen wie Vertragsnummern und IBANs, bevor Text an das Modell geht.
4. **Sprachmodell** über einen EU-Endpunkt mit Business-Vertrag, ohne Training mit Kundendaten.
5. **Wissensbasis** in einer EU-gehosteten Vektordatenbank, nur mit Produkt- und FAQ-Inhalten, ohne Kundendaten.
6. **Terminbuchung** über die Kalender-API; gespeichert werden nur Name, E-Mail und Wunschtermin im CRM, gemäß den Löschregeln des Maklers.
7. **Protokolle** werden 30 Tage zur Qualitätsprüfung aufbewahrt und dann automatisch gelöscht.
8. **Übergabe an einen Makler** bei jeder Frage mit Beratungsbezug.

## Wann ist eine Datenschutz-Folgenabschätzung nötig?

Eine DSFA nach Art. 35 DSGVO ist erforderlich, wenn eine Verarbeitung voraussichtlich ein hohes Risiko für die Rechte der Betroffenen birgt. Bei Chatbots trifft das häufig zu, wenn:

- sensible Daten wie Gesundheits- oder Finanzangaben in großem Umfang verarbeitet werden,
- der Bot Entscheidungen trifft oder vorbereitet, die Menschen erheblich betreffen,
- neue Technologie mit umfangreicher Verarbeitung oder Profiling kombiniert wird.

Die deutschen Datenschutzaufsichtsbehörden veröffentlichen Listen von Verarbeitungen, die stets eine DSFA erfordern. Im Zweifel ist eine kurze, dokumentierte Abschätzung besser als keine.

## Typische Fehler

- Das Chat-Widget vor der Einwilligung laden.
- Ein privates KI-Konto statt eines Business-Tarifs mit Auftragsverarbeitungsvertrag nutzen.
- Vollständige Gesprächsprotokolle unbegrenzt aufbewahren.
- Kundendaten „für den Kontext“ in die Wissensbasis legen.
- Keine klare Kennzeichnung, dass der Nutzer mit einer KI spricht.
- Den Bot ohne menschliche Kontrolle rechtliche, medizinische oder finanzielle Beratung geben lassen.

## FAQ

**Dürfen wir ChatGPT DSGVO-konform auf unserer Website nutzen?**
Ja, mit dem richtigen Setup: Business-API oder Enterprise-Bedingungen, AVV, kein Training mit Ihren Daten, Einwilligung, Transparenz und minimierte Eingaben.

**Brauchen wir eine Datenschutz-Folgenabschätzung?**
Häufig ja, wenn der Bot sensible Daten oder große Mengen personenbezogener Daten verarbeitet. Fragen Sie Ihren Datenschutzbeauftragten.

**Müssen wir das Modell selbst hosten?**
Nein. Viele Unternehmen nutzen kommerzielle Modelle über EU-Endpunkte mit AVV. Selbsthosting lohnt sich bei sehr sensiblen Daten oder strengen internen Vorgaben.

**Was muss die Datenschutzerklärung zum Chatbot enthalten?**
Welche Daten zu welchen Zwecken auf welcher Rechtsgrundlage verarbeitet werden, welche Anbieter wo beteiligt sind, wie lange Daten gespeichert werden und wie Nutzer ihre Rechte ausüben.

**Können Nutzer die Löschung ihres Chatverlaufs verlangen?**
Ja. Nach der DSGVO besteht in den meisten Fällen ein Recht auf Löschung – Sie brauchen also einen Weg, die Gespräche einer Person zu finden und zu löschen.

**Stuft der EU AI Act Kundenservice-Chatbots als Hochrisiko ein?**
In der Regel nicht. Für die meisten Kundenservice-Bots gelten Transparenzpflichten – Nutzer müssen wissen, dass sie mit einer KI interagieren –, keine Hochrisiko-Anforderungen.

Wir entwickeln [KI-Chatbots und Agenten](/leistungen/ki-chatbots-agenten) mit EU-Hosting und Datenschutz ab dem ersten Tag. Zu den Kosten siehe [Was kostet ein KI-Chatbot?](/blog/ki-chatbot-kosten-2026). [Sprechen Sie mit uns über Ihren Anwendungsfall](/kontakt).
