---
id: agent-infra-2026
slug: agent-infrastruktur-gpu-cpu-on-device
slug_en: agent-infrastructure-gpu-cpu-on-device
slug_de: agent-infrastruktur-gpu-cpu-on-device
title: "Agent-Infrastruktur: GPUs, CPU-Flotten und On-Device-Tool-Calls"
excerpt: "CPU-Deals in Anthropic-Größe, GPU-Auslastung, On-Device-Modelle für Tool-Calls. So platzieren Sie Agentenarbeit, ohne eine Frontier-GPU für JSON-Parse zu mieten."
seoTitle: "KI-Agent-Infrastruktur: GPU vs. CPU vs. On-Device"
seoDescription: "Wo KI-Agenten 2026 laufen: GPU-Reasoning, CPU-Retrieval und Tools, On-Device-Calls — Auslastung, Kosten und DSGVO für DACH-Produktion."
publishedAt: "2026-09-20T08:00:00.000Z"
author: Musharraf Aziz
cover: /blog/blog-agent-infra-cover.webp
coverAlt: "GPU-, CPU- und On-Device-Schichten für Agent-Tool-Calls"
readingTime: 11
tags:
  - GPU
  - CPU
  - On-Device-KI
  - KI-Infrastruktur
  - Agentic AI
  - Auslastung
---

Digitale Agenten haben die Headlines gefressen; **Infrastruktur** hat die Rechnung bezahlt. Berichte über **große CPU-Kapazitätsdeals** (Anthropic und andere), **GPU-Utilisation** und **On-Device-Modelle für Tool-Calls** sind das unglamouröse Gegenstück zu [günstigeren Frontier-APIs](/blog/gpt-6-claude-opus-automatisierungskosten).

Die meiste Wanduhr eines Agenten ist kein „Denken“. Es ist **Warten auf Tools**, JSON parsen, Chunks holen, HTTP retried. Das ist **CPU und Netz**. Alles auf eine H100 zu legen, kauft Ihnen eine Rechenzentrumsdebatte, die Sie nicht brauchten. (Netz und Wasser im Hintergrund: [Cluster vs. Grid](/blog/rechenzentrum-stromknappheit-ki-cluster).)

![GPU-Cluster, CPU-Flotte, On-Device-Tool-Calls](/blog/blog-agent-infra-diagram.webp)

## Arbeit platzieren

| Arbeit | Wo | Warum |
| --- | --- | --- |
| Long-Horizon-Planung, hartes Coding | GPU / Frontier-API | Qualität |
| RAG, Rerank, Schema | CPU, oft EU-VM | günstig, Frankfurt |
| Tool-Execution (CRM, n8n, SQL) | CPU-Worker | kein Tensor |
| Private Tool-Routing, offline | On-Device / Edge | Latenz, Data Gravity |

On-Device-Tool-Calling ist spannend für **Field-Tablets** und **luftspaltige Bänke**: ein kleines Modell entscheidet, *welche* API; das Payload geht nicht auf eine US-GPU. Es ersetzt Opus nicht für einen 40-Seiten-Vertrag.

## Utilisation ist ein Produktmetrik

Idle-GPUs, während „der Agent auf SAP wartet“, sind versenktes Capex. **GPU-Jobs queuen**; Waits auf billigen Workern. Durable Execution ([Enterprise-Agenten](/blog/enterprise-multi-agenten-systeme-2026)) ist ein Infra-Muster.

CPU-Flotten scheitern auch: Thread-Explosionen, undichte Browser, Zombie-Selenium. Concurrency cappen. Sandboxes recyceln.

## DSGVO-Platzierung

Steht PII im Prompt, ist der **Reasoning-Hop** eine Übermittlung. Retrieve-and-Tool in der EU halten, auch wenn Sie einen *redigierten* Plan an eine Frontier-API schicken. On-Device löst keine Trace-Backups auf dem Laptop.

## Praxis: Field-Service-Agent

Tablet in der Halle: On-Device mappt Sprache auf `getManual(section)` und `createTicket`. Manuals on-prem. Nur anonymisierte Failure-Cluster gehen wöchentlich auf eine Cloud-GPU für Prompt-Verbesserung. Minuten GPU, Stunden CPU, kein Audio in den USA.

## FAQ

**GPUs reservieren?**
Wenn Sie große lokale Modelle trainieren oder fahren, vielleicht. Bei API-Calls **Budget** reservieren, keine Boards.

**Sind CPUs „zurück“?**
Für Agent-*Systeme* waren sie nie weg. CPU-Deals sind das Eingeständnis der Branche.

**n8n neben der GPU-Box?**
Ja. n8n auf CPU, Modelle auf privatem Endpoint, eine VPC.

Infra gehört in jedes [KI-Automatisierungs](/leistungen/ki-automatisierung)-Design. [Sagen Sie, wohin Daten nicht dürfen](/kontakt), bevor Sie einen Cloud-Commit unterschreiben.
