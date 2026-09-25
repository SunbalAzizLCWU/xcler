---
id: project-visapath
title: VisaPath — XCLER Case Study
category: project
lang: en
source_url: https://xcler.dev/en/work/visapath
updated: 2026-09-25
tags: [visapath, travel tech, b2c saas, groq, llama 3, supabase, maptiler, route optimization]
---

## VisaPath overview

VisaPath is a B2C travel-tech SaaS built by XCLER that helps digital nomads, frequent travellers and expats optimise visa strategy across one or more citizenships. It combines global access maps, AI route optimisation and embassy information. VisaPath is live.

## The challenge VisaPath solved

Travellers with one or more passports had no reliable single workflow to compare visa access, optimise multi-country trips and manage embassy logistics.

## How XCLER built VisaPath

- **Frontend:** Next.js App Router with SSR-ready SaaS architecture; Tailwind CSS, Radix UI and Framer Motion; MapTiler SDK for interactive global access and route maps.
- **Data, auth and security:** Supabase PostgreSQL with `profiles` and `user_passports` tables; strict Row Level Security isolating each user's data; Supabase Auth; Pro-tier feature gating with API-level edge rate limiting.
- **AI engine:** Llama 3 via the Groq API for route optimisation; constraint-aware itinerary generation for multi-country travel with visa-cost, transport and route trade-offs.

## VisaPath delivery phases

1. Core platform and identity layer, including multi-passport identity models.
2. Global access intelligence — destination eligibility across citizenship combinations.
3. AI route optimiser — constraints turned into optimised routes with cost and transport suggestions.
4. Monetisation and scale controls — subscription-aware gating and API protection.

## VisaPath roadmap

Planned: richer real-time embassy appointment signals and collaborative trip planning for team and family accounts.

Related XCLER services: app development, web development, AI chatbots and agents, workflow automation.
