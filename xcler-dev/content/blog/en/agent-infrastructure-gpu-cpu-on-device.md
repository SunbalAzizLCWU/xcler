---
id: agent-infra-2026
slug: agent-infrastructure-gpu-cpu-on-device
slug_en: agent-infrastructure-gpu-cpu-on-device
slug_de: agent-infrastruktur-gpu-cpu-on-device
title: "Agent Infrastructure: GPUs, CPU Fleets and On-Device Tool Calls"
excerpt: "Anthropic-scale CPU deals, GPU utilisation, on-device models for tool calling. How to place agent work so you are not renting a frontier GPU for a JSON parse."
seoTitle: "AI Agent Infrastructure: GPU vs CPU vs On-Device"
seoDescription: "Where to run AI agents in 2026: GPU reasoning, CPU retrieval and tools, on-device calls — utilisation, cost and GDPR for DACH production systems."
publishedAt: "2026-09-20T08:00:00.000Z"
author: Musharraf Aziz
cover: /blog/blog-agent-infra-cover.webp
coverAlt: "GPU, CPU and on-device layers for agent tool calls"
readingTime: 11
tags:
  - GPU
  - CPU
  - on-device AI
  - AI infrastructure
  - agentic AI
  - utilisation
---

Digital agents ate the week’s headlines; **infrastructure** paid the bill. Coverage of **large CPU capacity deals** (Anthropic and others), **GPU utilisation** anxiety, and **on-device models for tool calls** is the unglamorous counterpart to [cheaper frontier APIs](/en/blog/gpt-6-claude-opus-automation-cost).

Most of an agent’s wall-clock is not “thinking”. It is **waiting on tools**, parsing JSON, retrieving chunks, retrying HTTP. That work is a **CPU and network** problem. Putting it all on an H100 is how you buy a data-centre argument you did not need. (Grid and water constraints are the backdrop — we wrote about [clusters vs the grid](/en/blog/data-center-power-constraints-ai-clusters).)

![GPU cluster, CPU fleet, on-device tool calls](/blog/blog-agent-infra-diagram.webp)

## Place the work

| Work | Where | Why |
| --- | --- | --- |
| Long-horizon planning, hard coding | GPU / frontier API | Quality |
| RAG retrieve, rerank, schema validate | CPU, often EU VM | Cheap, easy to pin to Frankfurt |
| Tool execution (CRM, n8n, SQL) | CPU workers | No tensor required |
| Private tool routing, offline | On-device / edge small model | Latency, data gravity |

On-device tool calling this week is interesting for **field tablets** and **air-gapped benches**: a small model decides *which* API to hit; the payload never crosses to a US GPU. It will not replace Opus for a 40-page contract.

## Utilisation is a product metric

Idle GPUs during “the agent is waiting for SAP” are wasted capex. **Queue GPU jobs**; run waits on cheap workers. Durable execution ([enterprise agents](/en/blog/enterprise-multi-agent-systems-2026)) is an infra pattern as much as an orchestration pattern.

CPU fleets for tools also fail: thread explosions, leaked browsers, zombie Selenium. Cap concurrency. Recycle sandboxes.

## GDPR placement

If the prompt contains customer PII, the **reasoning hop** is a transfer. Keep retrieve-and-tool in EU even if you send a *redacted* plan to a frontier API. On-device does not magically solve backups of traces on a laptop.

## Worked example: field-service agent

Tablet on a shop floor: on-device model maps speech to `getManual(section)` and `createTicket`. Manuals live on-prem. Only anonymised failure clusters go to a cloud GPU weekly for prompt improvement. Minutes of GPU, hours of CPU, zero audio in the US.

## FAQ

**Should we reserve GPUs now?**
If you train or run large local models, maybe. If you call APIs, reserve **budget**, not boards.

**Are CPUs “back”?**
For agent *systems*, they never left. Deals for CPU capacity are the industry admitting that.

**Can n8n run next to the GPU box?**
Yes. Put n8n on CPU, models on a private endpoint, one VPC.

Infra is part of every [AI automation](/en/services/ai-automation) design we sign. [Share where data may not go](/en/contact) and we will draw the split before you sign a cloud commit.
