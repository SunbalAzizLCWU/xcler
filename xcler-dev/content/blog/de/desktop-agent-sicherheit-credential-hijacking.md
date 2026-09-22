---
id: "agent-security"
slug: "desktop-agent-sicherheit-credential-hijacking"
slug_en: "desktop-agent-security-credential-hijacking"
slug_de: "desktop-agent-sicherheit-credential-hijacking"
title: "Desktop-Agent-Sicherheit und persistentes Credential-Hijacking"
excerpt: "Agenten mit Screen-, Shell- und Token-Zugriff sind angreifbar. Prozess sandboxed halten und Credentials in einen Vault legen."
seoTitle: "Desktop-Agent-Sicherheit und persistentes Credential-Hijacking"
seoDescription: "Desktop-KI-Agent-Sicherheit: Credential Hijacking, OS-Hooks, Least-Privilege-Sandboxes und Checkliste für B2B-Teams."
publishedAt: "2026-09-15T09:00:00.000Z"
updatedAt: "2026-09-15T09:00:00.000Z"
author: Musharraf Aziz
cover: "/blog/blog-desktop-agent-security-cover.webp"
coverAlt: "Desktop-Agent-Sicherheit und persistentes Credential-Hijacking — XCLER KI-Insights Cover"
readingTime: 11
tags:
  - "Desktop-Agenten"
  - Credential Hijacking
  - Sandboxing
  - Least Privilege
  - "KI-Sicherheit"
  - "OS-Hooks"
---

Autonome Desktop-Agenten mit OS-Hooks, Screen- und Shell-Zugriff sind anfällig für **persistentes Credential-Hijacking**. Die Lösung ist nicht ein besserer Prompt, sondern **Sandboxing** und **Least Privilege**.

![Architektur: Least-Privilege Desktop-Agent](/blog/blog-agent-security-architecture.webp)

## Hardening-Checkliste

1. Eigener OS-User / Container
2. Clipboard und Passwortmanager default deny
3. Secrets in Vault, den der Agent nicht listen kann
4. Nur Short-Lived Tokens
5. Permissions quartalsweise auditieren

XCLER baut das in Lieferungen für [KI-Chatbots & Agenten](/leistungen/ki-chatbots-agenten) ein.

### FAQ

**Reicht ein separates Browser-Profil?**  
Nein. OS-Sandbox bevorzugt.
