---
id: jev
slug: typesafe-ai-jev-non-text-decision-model
slug_en: typesafe-ai-jev-non-text-decision-model
slug_de: typesafe-ai-jev-nicht-text-entscheidungsmodell
title: "Jev by TypeSafe AI: The Non-Text Decision Model Explained"
excerpt: "Jev returns typed choices, scores and probabilities in one parallel pass instead of generating text. What it is, where it fits, and how to test it on your own traffic."
seoTitle: "Jev by TypeSafe AI Explained: The Non-Text Decision Model"
seoDescription: "Jev by TypeSafe AI explained: a decision model that returns typed choices and scores instead of text. Latency, pricing, use cases, limits and a rollout plan."
publishedAt: "2026-09-22T09:00:00.000Z"
updatedAt: "2026-09-23T09:00:00.000Z"
author: Musharraf Aziz
cover: /blog/blog-jev-decision-model-cover.webp
coverAlt: "Jev by TypeSafe AI — non-text decision model returning typed outputs"
readingTime: 10
tags:
  - Jev
  - TypeSafe AI
  - decision model
  - AI routing
  - AI agents
  - structured output
  - AI automation
---

Most AI products today are built on models that write. You send a prompt, the model produces text one token at a time, and your code tries to pull a decision out of that text. **Jev**, from TypeSafe AI, takes a different route: it does not write at all.

Jev is a Transformer-based model that TypeSafe AI describes as a "System 1" decision engine. You give it a set of **predefined questions** and the current **state** — a support ticket, a game frame, a list of open tabs, a lead record — and it answers every question in **one parallel pass**. The answers come back as typed values: a choice from a fixed list, a number, a probability, each with a confidence rating.

The company came out of stealth led by Diogo Almeida, a former OpenAI researcher who worked on reinforcement learning from human feedback (RLHF). The launch drew attention for three reasons: speed, price and the promise of no parsing failures.

> In one sentence: Jev answers questions you wrote in advance with typed values, instead of writing a paragraph you then have to interpret.

![Jev decision flow: state data into a single parallel pass, returning choice, score and probability with confidence](/blog/blog-jev-flowchart.webp)

## What "non-text" actually means

A normal large language model (LLM) is *autoregressive*. It predicts the next token, appends it, predicts the next one, and so on. If you ask it to pick a support queue, it may write "Billing", "billing", "The billing team", or "Billing — but it could also be technical support". Your code then has to parse that, and sometimes it fails.

Jev skips the writing step. The possible answers are fixed before the call. The model scores them against the state and returns the result as a data type your code already expects. That gives you three properties that matter in production:

1. **No invented options.** The model cannot return a queue that is not on your list, because there is no free-text channel to invent it in.
2. **No parsing layer.** You do not need regular expressions, JSON repair or retries when the output format breaks.
3. **Built-in uncertainty.** Every answer carries a confidence rating you can use to decide whether to act or hand over.

It is important to be precise about what this does *not* solve. Jev can still pick the **wrong** option from your list. It removes a class of formatting failures and made-up answers; it does not make every decision correct.

## The launch numbers — and how to treat them

TypeSafe AI's launch materials describe:

- **Latency of about 70–500 milliseconds** per call.
- **Input pricing around $0.042 per million tokens.**
- **Outputs described as free**, because no output tokens are generated.

Those are vendor figures. They are useful as a sense of scale — this is priced and positioned far below frontier chat models — but they are not a promise about your workload. Latency depends on how much state you send, how many questions you ask, and which region you call from. A 70 ms median and a 500 ms tail describe two very different user experiences. Before you build a product plan around these numbers, measure your own p50 and p95 latency on real payloads.

"Free outputs" also deserves a second look. It only helps if your cost was the output. For many routing tasks the long part is the input — the ticket history, the page content, the account data. That is where you should do the maths.

## Where a decision model fits

Jev is interesting wherever the next step is a **closed decision**: the set of valid answers is known before the call, and speed matters.

### High-frequency routing
Every incoming email, chat message or call has to go somewhere: billing, scheduling, technical support, sales, a human, or "none of these". This is a classic closed decision. A decision model can make it in well under a second and return a confidence value you can threshold.

### Sub-second agent steps
AI agents that operate a browser or desktop make dozens of small choices: click this button, scroll, wait, open the next tab, stop. Sending a full screenshot to a large multimodal model for each of those choices is slow and expensive. A fast decision model can handle the routine choices and leave the rare, open-ended ones to a larger model. We cover this split in detail in [decoupled architectures for computer-use agents](/en/blog/decoupled-architectures-computer-use-agents).

### Game logic and simulations
Public demos have used Jev-style models to play games such as *Doom* and *Mario*: the model sees the current frame and picks an action from a legal set — move, jump, fire, wait. That is a good stress test for a non-text model precisely because the action set is closed and the loop is fast.

### Scoring and classification
Lead scoring, fraud flags, content moderation labels, priority levels, sentiment bands. Any time you currently ask a chat model to "rate this from 1 to 5" and then parse the answer, a typed decision model is a more natural fit.

## Where it does not fit

Be equally clear about the limits:

- **Anything that needs prose.** Emails, summaries, support replies, reports and explanations need a model that writes. Use Jev to decide *what* happens and an LLM to write *how* it is said.
- **Open-ended questions.** If you cannot list the valid answers in advance, you do not have a decision problem yet.
- **Questions that change every hour.** A decision model works best when the question set is stable, reviewed and versioned.
- **Multi-step reasoning with new information.** Planning a sequence of actions that depends on what you discover along the way is still a job for an agent built on a reasoning model.

## How it compares to other options

| Approach | Output | Typical latency | Main failure mode | Best for |
| --- | --- | --- | --- | --- |
| Rules / if-else | Fixed | Instant | Breaks on unseen cases | Stable, simple logic |
| Classic ML classifier | Label + score | Very fast | Needs labelled training data | High-volume, narrow tasks |
| LLM with JSON output | Text parsed to data | Seconds | Format errors, invented values | Flexible, low volume |
| Decision model (Jev-style) | Typed choice + confidence | Sub-second (vendor claim) | Wrong choice from valid set | Fast closed decisions without training data |

The attractive part is the middle ground: you get the flexibility of "just describe the question" that LLMs offer, without training a custom classifier, while getting output that behaves like a classifier.

## Designing good questions

Most of the quality of a decision model comes from the question set, not the model. Some rules we apply:

1. **Write every legal answer down.** If a stakeholder cannot name an option in a few words, it is probably prose, not a decision.
2. **Always include an escape option** such as "none of these" or "needs a human". A model that is never allowed to abstain will guess.
3. **Keep options mutually exclusive.** "Billing" and "Invoice question" as separate options will split probability and confuse your metrics.
4. **Version the question set.** Store it in your repository with an ID, and log that ID next to every decision. Six months later it is the only way to explain why the system behaved differently.
5. **Freeze before traffic.** Product, operations and — where relevant — legal should review the list before it goes live.

## A safe rollout plan

We recommend the same rollout for any new decision component, and it works well here:

**Week 1 — shadow mode.** Keep your current router in charge. Send the same inputs to the decision model in parallel and log state, answer, confidence, latency and question-set version. Do not act on its answers yet.

**Week 2 — compare.** Review disagreements with the person who owns the process, not just with the model. Some disagreements will reveal bugs in your old rules; others will reveal badly written questions. Fix the questions before you blame the model.

**Week 3 — abstain path first.** Route low-confidence answers to your existing human or rules-based path. Keep high-confidence answers in shadow. You are testing the handover, not the headline accuracy.

**Week 4 onwards — one destination at a time.** Let high-confidence answers steer a single destination during hours you can monitor. Expand only when the numbers hold.

Track three rates separately: **correct**, **wrong** and **abstained**. Do not merge them into one accuracy figure — a system that never abstains can look accurate while being confidently wrong on the cases that matter.

## Open reproductions: OpenJev and others

After the launch, open-source reproductions appeared, including **APUS OpenJev**. They are useful for learning the interface — questions in, typed primitives out — and for running experiments without a bill. Keep two caveats in mind:

- **Calibration does not transfer automatically.** A confidence of 0.9 from one implementation is not the same as 0.9 from another until you measure it on the same data.
- **Latency and cost are different systems.** Self-hosting shifts cost from API fees to GPUs and operations.

Treat a reproduction as a way to understand the pattern, and the hosted model you actually use as a separate system with its own measurements.

## What this means for businesses in Germany and the EU

For companies in the DACH region, a decision model can be an attractive building block for **customer service routing, lead qualification and internal ticket triage** — the processes where speed and predictability matter and where you would rather not have free text generated about customers at all. As with any AI service, check where data is processed, sign a data processing agreement, and minimise the personal data you send in the state.

At XCLER we treat decision models as one component in a larger system: the decision model chooses the route, a workflow executes it, and a language model writes the message the customer sees. You can read more about how we combine these in [AI agents vs workflow automation](/en/blog/ai-agents-vs-workflow-automation) and on our [AI automation](/en/services/ai-automation) page.

## FAQ

**What is Jev?**
Jev is a Transformer-based decision model from TypeSafe AI. Instead of generating text, it evaluates predefined questions against the current state in one parallel pass and returns typed answers — choices, scores and probabilities — with a confidence rating.

**Who is behind TypeSafe AI?**
The company launched out of stealth led by Diogo Almeida, a former OpenAI researcher who worked on RLHF.

**Is Jev a replacement for ChatGPT or Claude?**
No. It is a complement. Use a decision model for fast, closed choices and a language model when you need written output or open-ended reasoning.

**Are the latency and price figures guaranteed?**
No. The 70–500 ms latency and roughly $0.042 per million input tokens are launch figures from the vendor. Measure them on your own payloads, question counts and regions.

**Does a decision model eliminate hallucinations?**
It eliminates invented options and formatting failures, because it can only return values you defined. It can still choose the wrong option, so you need confidence thresholds and a human fallback.

**What is OpenJev?**
An open-source reproduction of the Jev approach. It is useful for learning and testing, but its calibration and performance are not identical to the hosted model.

Planning a sub-second router for support, sales or operations? [Contact XCLER](/en/contact) with your list of possible outcomes. The first thing we will check is whether that list is truly closed.
