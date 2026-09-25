---
id: project-aegisflow
title: AegisFlow (InvoiceIQ) — XCLER Case Study
category: project
lang: en
source_url: https://xcler.dev/en/work/aegisflow
updated: 2026-09-25
tags: [aegisflow, invoiceiq, fintech, saas, risk management, lstm, gan, fastapi, supabase]
---

## AegisFlow overview

AegisFlow (also called InvoiceIQ) is an AI-powered financial intelligence and risk management SaaS built by XCLER. It is live as an enterprise FinTech platform: finance teams use it to classify client risk, forecast 30-, 60- and 90-day liquidity, and stress-test cash flow under adverse market conditions.

## The challenge AegisFlow solved

Finance teams needed one platform that combines enterprise reliability, audit-safe operations and advanced machine-learning forecasts without slowing down day-to-day decisions.

## How XCLER built AegisFlow

XCLER delivered a split architecture:

- **Frontend:** Next.js and React SaaS interface for finance operators, Tailwind CSS with a glassmorphism design system, Recharts for liquidity visualisation, PKR-first localisation, deployed on Vercel.
- **Backend and AI:** Python FastAPI services on Railway; K-Means clustering for risk tiers; LSTM models for 30/60/90-day liquidity forecasting; GAN simulation for macro-shock stress testing.
- **Data and security:** Supabase PostgreSQL as the transactional data layer, strict Row Level Security for tenant-safe access, Supabase Auth with magic-link login.

## AegisFlow delivery phases

1. Foundation and UI grid — relational data for clients and invoices, branded invoice generation.
2. AI processing pipeline — live database metrics feeding K-Means and LSTM models in real time.
3. Debugging and optimisation — fixed a 422 schema sync issue through strict JSON-to-Pydantic contracts, a Recharts negative-width bug and static date logic with a live time-sync.
4. Production readiness — production auth routing, Vercel Analytics and an in-app feedback loop into PostgreSQL.

## AegisFlow roadmap

Planned next steps: industry-specific regional shock simulations with GANs, and scheduled K-Means clustering via Supabase Edge Functions.

Related XCLER services: app development, web development, workflow automation.
