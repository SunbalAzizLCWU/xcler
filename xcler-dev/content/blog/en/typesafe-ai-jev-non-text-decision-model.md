---
id: jev
slug: "typesafe-ai-jev-non-text-decision-model"
slug_en: "typesafe-ai-jev-non-text-decision-model"
slug_de: "typesafe-ai-jev-nicht-text-entscheidungsmodell"
title: "Jev by TypeSafe AI: The Non-Text Decision Model Explained"
excerpt: "Jev returns typed choices, scores and probabilities in one parallel pass — built for sub-second routing and agent decisions without LLM hallucinations."
seoTitle: "Jev by TypeSafe AI: The Non-Text Decision Model Explained"
seoDescription: "Jev TypeSafe AI explained: non-text decision model latency, pricing, routing use cases and how DACH teams deploy it with n8n agents."
publishedAt: "2026-09-22T09:00:00.000Z"
updatedAt: "2026-09-22T09:00:00.000Z"
author: Musharraf Aziz
cover: "/blog/blog-jev-decision-model-cover.webp"
coverAlt: "Jev by TypeSafe AI: The Non-Text Decision Model Explained — XCLER AI insights cover"
readingTime: 12
tags:
  - Jev
  - TypeSafe AI
  - decision model
  - AI routing
  - "KI-Automatisierung"
  - agent decisions
  - DACH AI
---

Jev is a transformer that **refuses to write text**. TypeSafe AI — led by former OpenAI RLHF researcher Diogo Almeida — describes it as a System 1 model: it scores a fixed question set against state in one parallel pass and returns choices, numeric scores and probabilities with a confidence rating.

Public launch figures put latency in a **70–500 ms** band and input cost near **$0.042 per million tokens**, with outputs priced at zero because there is no completion stream. Treat those as vendor-reported. Measure them on your own traffic before you budget a product around them.

> Jev does not write. It classifies a fixed question set against state and returns typed primitives. That is why routing, game logic and sub-second agent steps fit — not emails or support replies.

![Jev parallel decision pass flowchart](/blog/blog-jev-flowchart.webp)

## Why non-text decisions matter for production agents

Autoregressive chat models invent tokens. Every extra token is another sample, another chance to drift, and another parse step if you asked for JSON. Jev drops that loop. You define the questions. The model sees state — a router payload, a tool trace, a game frame — and answers every question in one forward pass. The return type is a primitive: a choice, a score, a probability, plus confidence. There is no sentence to regex.

For **DACH and Benelux B2B teams** building voice or chat routers in German and English, that changes the failure mode. You can still pick the wrong queue. You cannot invent a fourth destination that was never on the menu.

## The engineering framework

1. **Finite action set** — transfer to billing, retry the tool, abstain. If the correct behavior is a paragraph, keep a language model behind an explicit gate.
2. **Stable questions** — product, legal and eval freeze the schema before traffic hits it.
3. **Confidence as control** — low confidence falls through to a human, rules engine or slower model.

XCLER ships this pattern inside [KI-Automatisierung](/en/services/ai-automation) and [KI-Chatbot](/en/services/ai-chatbots-agents) stacks: the decision model chooses the route; the LLM writes the sentence the customer hears.

## Latency, price and what to measure

| Signal | Launch claim | What you should log |
| --- | --- | --- |
| Latency | 70–500 ms | p50 / p95 on *your* payload size and region |
| Input price | ~$0.042 / MTok | tokens × real prompt size |
| Outputs | free | confirm no hidden completion billing |
| Confidence | rated | abstain rate vs wrong-route rate |

## Open reproductions (OpenJev and friends)

APUS OpenJev and similar sketches are useful for learning the interface: questions in, primitives out. They do not automatically copy calibration. A confidence number from one stack is not a probability from another until you measure it on the same traces.

## Rollout week for operators

1. Freeze the question list and version it in git.
2. Shadow-mode log state → primitive → confidence → latency.
3. Enable abstain path before high-confidence steering.
4. Flip one destination at a time during watched hours (CET for DACH desks).

### FAQ

**What is Jev?**  
A transformer decision model that does not generate text. It evaluates predefined questions against state in one parallel pass.

**When should you use Jev instead of a chat model?**  
When the next step is a closed decision: route, click, wait, score. Keep LLMs for prose.

**Are latency and price guaranteed?**  
No. Confirm on your payload, region and question count.

If you are designing a sub-second router for Germany, Austria or Switzerland, [contact XCLER](/en/contact) with the action set — we will tell you whether it is actually closed.
