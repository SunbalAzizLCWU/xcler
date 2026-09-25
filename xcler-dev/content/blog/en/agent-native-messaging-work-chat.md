---
id: agent-native-messaging
slug: agent-native-messaging-work-chat
slug_en: agent-native-messaging-work-chat
slug_de: agent-native-messaging-arbeit-chat
title: "Agent-Native Messaging: When Work Chat Stops Being a Human Inbox"
excerpt: "Apps like Ando are challenging Slack with agents in the thread — goals, tools and durable jobs instead of status pings. How to try it without abandoning M365."
seoTitle: "Agent-Native Messaging vs Slack in 2026"
seoDescription: "Agent-native work chat vs Slack bots: durable jobs in the thread, tool access, GDPR and a hybrid with Teams or Slack you can actually govern."
publishedAt: "2026-09-21T08:00:00.000Z"
author: Musharraf Aziz
cover: /blog/blog-agent-messaging-cover.webp
coverAlt: "Agent-native inbox panes on a dark Signal grid"
readingTime: 11
tags:
  - agent-native
  - Slack
  - Microsoft Teams
  - work chat
  - AI agents
  - Ando
---

Work chat is full of humans pretending to be routers: “can you check SAP?”, paste, wait, ping. **Agent-native messaging** — Ando is the name in this week’s briefings — inverts that. You state a **goal in the thread**. An agent with tools runs a **durable job**. People only show up for risk.

That challenges Slack/Teams as the default OS of work. It does not automatically replace them in a German GmbH with a works council.

![Human chat versus bot versus agent-native thread](/blog/blog-agent-messaging-diagram.webp)

## Why Slack bots felt thin

A slash-command bot is a form. It has no job memory, no wait-on-approval, no right to a slow ERP. You still copy the result into the channel. Agent-native chat treats the **thread as the ticket**: state, artefacts, and a pause until a human emoji-approves a wire.

## What to copy even if you stay on Teams

- One thread = one job id.
- Agent identity visible (not “looks like Lisa”).
- Tools listed in the first bot message.
- Approval as a structured card, not a vibe.
- Transcript retained 30 days; **no silent training** on HR channels.

You can bolt this onto Slack/Teams with n8n and [workflow automation](/en/services/workflow-automation). You do not have to migrate the company to a new chat OS this quarter.

## Risks unique to “the agent lives here”

- **Oversharing**: the agent can read a channel it should not. Scope tokens per space.
- **Works council / co-determination** in Germany: monitoring and automated performance are sensitive. Involve HR early.
- **Shadow IT**: five teams install five Ando-like tools. Pick one pattern.

## Worked example: logistics exception channel

Instead of @here for a failed delivery, a bot starts a job: pull scan events, draft a customer SMS, wait. A dispatcher taps Approve. The human chat is three messages, not forty. Same idea as [voice loops](/en/blog/voice-multimodal-workflow-automation), different surface.

## FAQ

**Must we leave Slack?**
No. Require job-shaped threads and an agent with a contract.

**Is this a helpdesk?**
It becomes one if you skip a real ticket store. Mirror into your ITSM.

**GDPR?**
Chat is personal data. EU hosting, DPA, retention, no audio.

If you want agent-native behaviour on the chat you already pay for, [we will map channels to jobs](/en/contact).
