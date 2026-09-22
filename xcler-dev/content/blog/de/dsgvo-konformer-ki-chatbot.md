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
readingTime: 9
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

## FAQ

**Dürfen wir ChatGPT DSGVO-konform auf unserer Website nutzen?**
Ja, mit dem richtigen Setup: Business-API oder Enterprise-Bedingungen, AVV, kein Training mit Ihren Daten, Einwilligung, Transparenz und minimierte Eingaben.

**Brauchen wir eine Datenschutz-Folgenabschätzung?**
Häufig ja, wenn der Bot sensible Daten oder große Mengen personenbezogener Daten verarbeitet. Fragen Sie Ihren Datenschutzbeauftragten.

**Müssen wir das Modell selbst hosten?**
Nein. Viele Unternehmen nutzen kommerzielle Modelle über EU-Endpunkte mit AVV. Selbsthosting lohnt sich bei sehr sensiblen Daten oder strengen internen Vorgaben.

Wir entwickeln [KI-Chatbots und Agenten](/leistungen/ki-chatbots-agenten) mit EU-Hosting und Datenschutz ab dem ersten Tag. Zu den Kosten siehe [Was kostet ein KI-Chatbot?](/blog/ki-chatbot-kosten-2026). [Sprechen Sie mit uns über Ihren Anwendungsfall](/kontakt).
