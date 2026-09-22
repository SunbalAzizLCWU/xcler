---
id: gdpr-chatbot
slug: gdpr-compliant-ai-chatbot
slug_en: gdpr-compliant-ai-chatbot
slug_de: dsgvo-konformer-ki-chatbot
title: "GDPR-Compliant AI Chatbots: A Practical Checklist for EU Businesses"
excerpt: "How to run an AI chatbot in the EU without data protection headaches: hosting, data processing agreements, consent, data minimisation, retention and the EU AI Act."
seoTitle: "GDPR-Compliant AI Chatbot: Checklist for EU Companies"
seoDescription: "Run a GDPR-compliant AI chatbot: EU hosting, DPA, consent, data minimisation, retention, transparency duties under the EU AI Act and a practical checklist."
publishedAt: "2026-09-06T08:00:00.000Z"
author: Musharraf Aziz
cover: /blog/blog-gdpr-ai-chatbot-cover.webp
coverAlt: "GDPR-compliant AI chatbot protected by an EU data shield"
readingTime: 7
tags:
  - GDPR chatbot
  - DSGVO
  - AI compliance
  - EU AI Act
  - data protection
  - AI chatbot
---

An AI chatbot processes whatever visitors type into it — names, email addresses, order numbers, sometimes health or financial details. Under the GDPR that makes you responsible for how that data is handled, stored and shared with the model provider.

This checklist covers what we set up for clients in Germany and the EU. It is practical guidance, **not legal advice** — involve your data protection officer for your specific case.

![GDPR chatbot checklist: EU data residency, DPA with vendor, consent before chat, data minimisation, retention and deletion, human escalation](/blog/blog-gdpr-chatbot-checklist.webp)

## 1. Know your data flows

Draw the path of a single message: browser → chat widget → your backend or automation platform → language model provider → vector database → logs. For each hop, write down where it is hosted and who operates it. You cannot assess risk for flows you cannot see.

## 2. Prefer EU processing

Choose providers that process data in the EU, or host components yourself: the automation layer (for example self-hosted n8n), the vector database and the logs. For the model, use EU endpoints where available. If data goes to the US, document the legal basis and transfer mechanism.

## 3. Sign data processing agreements

Every provider that processes personal data on your behalf needs a **data processing agreement (DPA / AVV)**: chat widget, hosting, model provider, vector database, email tools. Check whether the provider uses your data to train models, and switch that off.

## 4. Get consent right

- Load the chat widget only after the visitor agrees, if it sets cookies or sends data to third parties.
- Show a short notice before the first message: what the bot is, that it uses AI, and a link to the privacy policy.
- Update your privacy policy with the chatbot, providers, purposes and retention periods.

## 5. Minimise data

- Do not ask for more than you need. An FAQ bot rarely needs a full name.
- Mask or strip sensitive data such as IBANs or health details before sending text to the model.
- Keep personal data out of the knowledge base unless it is necessary and access-controlled.

## 6. Set retention and deletion

Decide how long conversation logs are kept — for example 30 or 90 days — and delete them automatically. Make it possible to find and delete a person's conversations on request.

## 7. Offer a human

Provide an easy way to reach a person, especially for complaints, legal questions or decisions that affect the user. It is good service and reduces risk.

## 8. Be transparent under the EU AI Act

The EU AI Act requires that people know when they are interacting with an AI system. A clear label such as "AI assistant" and a short explanation are usually enough for a customer service chatbot. High-risk uses — for example decisions about credit or employment — carry much stricter duties.

## 9. Secure the system

- Protect admin panels and API keys; rotate keys regularly.
- Guard against prompt injection: the bot should not reveal system instructions or other users' data.
- Log access and changes for audits.

## 10. Document it

Keep a short record: purpose, data categories, providers, legal basis, retention, risk assessment and a data protection impact assessment where required. This is what auditors and customers will ask for.

## Which legal basis applies?

Every processing of personal data needs a legal basis under Article 6 GDPR. For chatbots, three are common:

- **Contract (Art. 6(1)(b))** — when the chat is needed to handle an order, booking or existing customer relationship.
- **Legitimate interest (Art. 6(1)(f))** — for general service enquiries, provided you balance your interest against the user's and document it.
- **Consent (Art. 6(1)(a))** — for optional features, marketing follow-ups or where local rules on cookies and tracking require it.

Separately, the German **TDDDG** (formerly TTDSG) and the EU ePrivacy rules require consent before storing or reading information on the user's device, unless it is strictly necessary. A chat widget that sets non-essential cookies or loads third-party scripts therefore often needs consent before it loads.

Special categories of data — health, religion, trade union membership and others under Article 9 — need extra care. If users might share them, for example in a medical practice chatbot, warn them, minimise what you store and consider stricter hosting.

## Example: a GDPR-friendly architecture

A German insurance broker wants a chatbot that answers product questions and books consultations.

1. **Widget** hosted on the broker's own domain, loaded only after consent; a short notice explains that answers are AI-generated.
2. **Backend** on self-hosted n8n in a Frankfurt data centre receives messages.
3. **Masking step** removes obvious personal identifiers such as policy numbers and IBANs before text reaches the model.
4. **Language model** accessed through an EU endpoint under a business agreement with no training on customer data.
5. **Knowledge base** in an EU-hosted vector database containing only product and FAQ content, no customer data.
6. **Booking** via calendar API; only name, email and preferred time are stored, in the CRM, under the broker's retention rules.
7. **Logs** kept for 30 days for quality review, then deleted automatically.
8. **Human handoff** to a broker for any advice-related question.

## When is a data protection impact assessment needed?

A DPIA under Article 35 GDPR is required when processing is likely to result in a high risk to people's rights. For chatbots this often applies when:

- sensitive data such as health or financial details is processed at scale,
- the bot makes or prepares decisions that significantly affect people,
- new technology is combined with large-scale processing or profiling.

German data protection authorities publish lists of processing types that always require a DPIA. When in doubt, a short, documented assessment is better than none.

## Common mistakes

- Loading the chat widget before consent.
- Using a consumer AI account instead of a business plan with a data processing agreement.
- Keeping full conversation logs indefinitely.
- Putting customer data into the knowledge base "for context".
- No clear label that the user is talking to an AI.
- Letting the bot give legal, medical or financial advice without a human in the loop.

## FAQ

**Can we use ChatGPT on our website under the GDPR?**
Yes, with the right setup: business API or enterprise terms, a DPA, no training on your data, consent, transparency and minimised inputs.

**Do we need a data protection impact assessment?**
Often yes if the bot processes sensitive data or large volumes of personal data. Ask your data protection officer.

**Is self-hosting the model required?**
No. Many companies use commercial models via EU endpoints with a DPA. Self-hosting makes sense for very sensitive data or strict internal policies.

**What must the privacy policy say about the chatbot?**
What data is processed, for which purposes, on which legal basis, which providers are involved and where, how long data is kept, and how users exercise their rights.

**Can users ask for their chat history to be deleted?**
Yes. Under the GDPR they have the right to erasure in most cases, so you need a way to find and delete a person's conversations.

**Does the EU AI Act classify customer service chatbots as high-risk?**
Usually not. Most customer service bots have transparency obligations — users must know they are dealing with AI — rather than high-risk requirements.

We build [AI chatbots and agents](/en/services/ai-chatbots-agents) with EU hosting and data protection built in from day one. For costs, see [what an AI chatbot costs](/en/blog/ai-chatbot-cost-2026). [Talk to us about your use case](/en/contact).
