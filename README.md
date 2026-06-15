<div align="center">

<img src="https://raw.githubusercontent.com/SunbalAzizLCWU/xcler/main/xcler-dev/public/logo.png" alt="Xcler Logo" width="180" />

# Xcler

**Digital Agency Website — Production-Grade Next.js 16 Application**

[![Next.js](https://img.shields.io/badge/Next.js-16.2.3-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Sanity](https://img.shields.io/badge/Sanity_CMS-v5-F03E2F?style=for-the-badge&logo=sanity&logoColor=white)](https://www.sanity.io/)
[![License](https://img.shields.io/badge/License-Private-red?style=for-the-badge)](#license)

[![i18n](https://img.shields.io/badge/i18n-DE_%7C_EN-green?style=flat-square&logo=googletranslate&logoColor=white)](https://next-intl-docs.vercel.app/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-purple?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com/)
[![Code Style](https://img.shields.io/badge/Code_Style-ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white)](https://eslint.org/)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Internationalization](#-internationalization)
- [CMS — Sanity Studio](#-cms--sanity-studio)
- [Pages & Routes](#-pages--routes)
- [Components](#-components)
- [Scripts](#-scripts)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌐 Overview

**Xcler** is the official website of Xcler — a German digital agency specializing in web development, app development, AI chatbots & agents, WordPress/Shopify solutions, and workflow automation. The codebase is a fully server-rendered, bilingual (German/English) marketing and lead-generation platform built with the latest Next.js App Router, React 19, and Sanity v5 as a headless CMS.

The site is optimized for SEO, Core Web Vitals, and conversion — featuring animated hero sections, a rotating keyword component, magnetic CTA buttons, a multi-step contact form, Sanity-powered blog, structured data (JSON-LD), cookie consent (Cookiebot), and WhatsApp integration.

---

## 🏛️ Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                          Vercel Edge                             │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Next.js 16 App Router (Turbopack)           │   │
│  │                                                          │   │
│  │   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐   │   │
│  │   │  [locale]   │   │   /admin    │   │  /studio    │   │   │
│  │   │  (DE / EN)  │   │  (leads +  │   │  (Sanity    │   │   │
│  │   │  pages      │   │   blogs)    │   │   Studio)   │   │   │
│  │   └──────┬──────┘   └──────┬──────┘   └─────────────┘   │   │
│  │          │                 │                              │   │
│  │   ┌──────▼──────────────────▼──────┐                     │   │
│  │   │     Server Components Layer    │                     │   │
│  │   │  (RSC — data fetching, i18n)   │                     │   │
│  │   └──────────────┬─────────────────┘                     │   │
│  │                  │                                        │   │
│  │   ┌──────────────▼─────────────────┐                     │   │
│  │   │    Client Components Layer     │                     │   │
│  │   │  (Framer Motion, forms, nav)   │                     │   │
│  │   └────────────────────────────────┘                     │   │
│  └──────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
          │                              │
          ▼                              ▼
  ┌───────────────┐             ┌────────────────┐
  │  Sanity CMS   │             │  Contact/Lead  │
  │  (Blog, Team, │             │  API Routes    │
  │   Pricing)    │             │  (Email + CRM) │
  └───────────────┘             └────────────────┘
```

---

## 🛠 Tech Stack

| Layer | Technology | Version |
|---|---|---|
| **Framework** | Next.js (App Router) | 16.2.3 |
| **UI Library** | React | 19.2.4 |
| **Language** | TypeScript | ^5 |
| **Styling** | Tailwind CSS v4 | ^4 |
| **Animation** | Framer Motion | ^12.38.0 |
| **CMS** | Sanity v5 | ^5.14.1 |
| **i18n** | next-intl | ^4.9.1 |
| **Icons** | Lucide React | ^1.8.0 |
| **Image Optimization** | Sharp | ^0.34.5 |
| **Build Tool** | Turbopack | (built-in) |
| **Linting** | ESLint 9 | ^9 |
| **Hosting** | Vercel | — |

---

## ✨ Features

### Core
- ⚡ **Next.js 16 App Router** with React Server Components and Turbopack for fast dev builds
- 🌍 **Bilingual (DE/EN)** with `next-intl` — localized URLs, server-side translations, and cookie-free locale detection
- 🎨 **Tailwind CSS v4** with a fully custom design token system (colors, fonts, animations)
- 🎞️ **Framer Motion** animations — page transitions, animated sections, rotating keyword hero, magnetic buttons

### Content & CMS
- 📝 **Sanity v5 headless CMS** — blog posts, team members, pricing plans, and rich tables
- 🗺️ **Auto-generated sitemap** (`/sitemap.xml`) and robots (`/robots.txt`)
- 📦 **Structured Data (JSON-LD)** for Organization, WebSite, and BreadcrumbList
- 🔗 **Portable Text** rendering for Sanity rich content

### UX & Conversion
- 📱 **Fully responsive** — mobile-first layout with `svh` units and adaptive typography
- 🧲 **Magnetic CTA buttons** for desktop hover engagement
- 💬 **WhatsApp floating button** for direct lead capture
- 📋 **Multi-step contact form** with server-side email dispatch and lead logging
- 🍪 **Cookie consent** via Cookiebot integration
- 🏷️ **Admin panel** (`/admin`) for managing leads and blog posts with authentication

### Performance & SEO
- 🖼️ **Next.js Image** optimization with Sharp
- 📐 **Core Web Vitals** optimized (`will-change`, `contain: paint`, `motion-safe` guard on animations)
- 🔍 **next-seo** for per-page Open Graph, Twitter cards, and canonical URLs
- 📊 **Vercel Speed Insights** integration

---

## 📁 Project Structure

```
xcler-main/
└── xcler-dev/                        # Main Next.js application
    ├── messages/
    │   ├── de.json                   # German translations
    │   └── en.json                   # English translations
    ├── public/
    │   ├── logo.png
    │   ├── og-image.webp
    │   ├── projects/                 # Case study images
    │   └── team/                     # Team member photos
    ├── src/
    │   ├── app/
    │   │   ├── [locale]/             # All public-facing pages (i18n-aware)
    │   │   │   ├── page.tsx          # Homepage
    │   │   │   ├── layout.tsx        # Root locale layout (fonts, metadata)
    │   │   │   ├── about/
    │   │   │   ├── blog/
    │   │   │   ├── contact/
    │   │   │   ├── pricing/
    │   │   │   ├── services/
    │   │   │   │   ├── web-development/
    │   │   │   │   ├── app-development/
    │   │   │   │   ├── ai-chatbots-agents/
    │   │   │   │   ├── workflow-automation/
    │   │   │   │   ├── wordpress-development-germany/
    │   │   │   │   └── shopify-development-germany/
    │   │   │   └── work/
    │   │   ├── admin/                # Internal admin panel
    │   │   ├── api/
    │   │   │   ├── contact/          # Contact form handler
    │   │   │   └── admin/            # Admin API routes (blogs, leads)
    │   │   └── studio/               # Embedded Sanity Studio
    │   ├── components/
    │   │   ├── layout/
    │   │   │   ├── Navbar.tsx
    │   │   │   └── Footer.tsx
    │   │   ├── sections/             # Page-level section components
    │   │   │   ├── HeroSection.tsx
    │   │   │   ├── ServicesSection.tsx
    │   │   │   ├── TeamSection.tsx
    │   │   │   ├── TestimonialsSection.tsx
    │   │   │   ├── WorkSection.tsx
    │   │   │   ├── ProcessSection.tsx
    │   │   │   ├── StatsSection.tsx
    │   │   │   ├── ContactSection.tsx
    │   │   │   ├── FAQSection.tsx
    │   │   │   ├── Pricing.tsx
    │   │   │   └── LogoMarquee.tsx
    │   │   ├── ui/                   # Reusable UI primitives
    │   │   │   ├── AnimatedSection.tsx
    │   │   │   ├── CookieBanner.tsx
    │   │   │   ├── LanguageSwitcher.tsx
    │   │   │   ├── MagneticButton.tsx
    │   │   │   ├── RotatingServiceKeyword.tsx
    │   │   │   └── WhatsAppButton.tsx
    │   │   └── seo/
    │   │       └── JsonLd.tsx
    │   ├── data/
    │   │   └── caseStudies.ts        # Static case study data
    │   ├── i18n/
    │   │   └── request.ts            # next-intl server config
    │   ├── lib/
    │   │   ├── canonical.ts
    │   │   ├── portableText.ts
    │   │   ├── structuredData.ts
    │   │   └── utils.ts
    │   ├── navigation.ts             # Typed, localized Link + routing
    │   └── sanity/
    │       ├── env.ts
    │       ├── lib/
    │       │   ├── blog.ts
    │       │   ├── client.ts
    │       │   ├── image.ts
    │       │   └── live.ts
    │       ├── migrations/
    │       └── schemaTypes/
    │           ├── blogPost.ts
    │           ├── teamMember.ts
    │           ├── pricingPlan.ts
    │           └── priceChart.ts
    ├── next.config.ts
    ├── tailwind.config.ts
    ├── postcss.config.mjs
    ├── sanity.config.ts
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 20.x
- **npm** ≥ 10.x (or `pnpm` / `yarn`)
- A **Sanity** project (free tier is sufficient)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/SunbalAzizLCWU/xcler.git
cd xcler/xcler-dev

# 2. Install dependencies
npm install

# 3. Copy the environment template and fill in your values
cp .env.example .env.local

# 4. Start the development server (Turbopack)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The default locale is **German (`de`)**. Visit [http://localhost:3000/en](http://localhost:3000/en) for the English version.

---

## 🔐 Environment Variables

Create a `.env.local` file in `xcler-dev/` with the following variables:

```env
# ─── Sanity CMS ───────────────────────────────────────────────────
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-04-13
SANITY_API_TOKEN=your_sanity_write_token        # Server-side only

# ─── Contact Form / Email ─────────────────────────────────────────
CONTACT_EMAIL_TO=hello@xcler.dev                # Where form submissions go
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password

# ─── Admin Panel ──────────────────────────────────────────────────
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password

# ─── Site URL (for canonical URLs + sitemap) ──────────────────────
NEXT_PUBLIC_SITE_URL=https://xcler.dev
```

> **Never commit `.env.local` to version control.** Add it to `.gitignore` (already included).

---

## 🌍 Internationalization

The site uses [`next-intl`](https://next-intl-docs.vercel.app/) for full server-side i18n.

| Locale | Default | URL prefix |
|--------|---------|------------|
| `de` (German) | ✅ Yes | None (e.g. `/leistungen`) |
| `en` (English) | No | `/en` prefix (e.g. `/en/services`) |

**Localized URL mapping** is defined in `src/navigation.ts`. Internal route keys (e.g. `/services`) are automatically resolved to locale-specific paths (e.g. `/leistungen` in German, `/en/services` in English) by the typed `Link` component exported from `navigation.ts`.

**Translation files** live in `messages/de.json` and `messages/en.json`. Each file contains namespaced keys mirroring the component hierarchy (e.g. `Hero`, `Navigation`, `Services`, `Footer`).

To add a new translated string:
1. Add the key to both `de.json` and `en.json`
2. Access it in a Server Component: `const t = await getTranslations({ locale, namespace: 'YourNamespace' })`
3. Access it in a Client Component: `const t = useTranslations('YourNamespace')`

---

## 🖊️ CMS — Sanity Studio

Sanity Studio is embedded at `/studio`. Schema types include:

| Schema | Description |
|--------|-------------|
| `blogPost` | Multilingual blog posts with Portable Text body, slug, author, tags, and SEO fields |
| `teamMember` | Team profiles with photo, role, and bio |
| `pricingPlan` | Dynamic pricing cards managed from the CMS |
| `priceChart` | Rich pricing comparison tables |

### Running Sanity migrations

```bash
# Backfill blog post localization (run once after migration)
npm run sanity:migrate:blog-localization
```

---

## 📄 Pages & Routes

| Internal Key | German URL | English URL | Description |
|---|---|---|---|
| `/` | `/` | `/en` | Homepage with Hero, Services, Work, Stats, Testimonials, FAQ |
| `/services` | `/leistungen` | `/en/services` | Services overview |
| `/services/web-development` | `/leistungen/webentwicklung` | `/en/services/web-development` | Web development service page |
| `/services/app-development` | `/leistungen/app-entwicklung` | `/en/services/app-development` | App development |
| `/services/ai-chatbots-agents` | `/leistungen/ki-chatbots-agenten` | `/en/services/ai-chatbots-agents` | AI chatbots & agents |
| `/services/workflow-automation` | `/leistungen/workflow-automatisierung` | `/en/services/workflow-automation` | Workflow automation |
| `/services/wordpress-development-germany` | `/leistungen/wordpress-entwicklung-deutschland` | `/en/services/wordpress-development-germany` | WordPress |
| `/services/shopify-development-germany` | `/leistungen/shopify-entwicklung-deutschland` | `/en/services/shopify-development-germany` | Shopify |
| `/work` | `/projekte` | `/en/work` | Portfolio / case studies |
| `/work/[slug]` | `/projekte/[slug]` | `/en/work/[slug]` | Individual case study |
| `/about` | `/ueber-uns` | `/en/about` | About the team |
| `/blog` | `/blog` | `/en/blog` | Blog listing (Sanity) |
| `/blog/[slug]` | `/blog/[slug]` | `/en/blog/[slug]` | Blog post detail |
| `/pricing` | `/preise` | `/en/pricing` | Pricing page |
| `/contact` | `/kontakt` | `/en/contact` | Contact form |
| `/admin` | `/admin` | `/admin` | Internal admin (auth-protected) |
| `/studio` | `/studio` | `/studio` | Sanity Studio (embedded) |

---

## 🧩 Components

### Section Components

| Component | Description |
|---|---|
| `HeroSection` | Full-viewport hero with animated background orbs, rotating service keyword, CTA buttons, and trust indicators |
| `ServicesSection` | Accordion-style services list with tech stacks and team lead avatars |
| `WorkSection` | Filterable project grid pulling from `caseStudies.ts` |
| `TeamSection` | Team member cards with photos (Sanity-powered) |
| `TestimonialsSection` | Client testimonial carousel |
| `ProcessSection` | Step-by-step how-we-work breakdown |
| `StatsSection` | Animated counter stats |
| `ContactSection` | Multi-step contact form with lead capture |
| `FAQSection` | Animated accordion FAQ |
| `Pricing` | Dynamic pricing cards from Sanity |
| `LogoMarquee` | Infinite scroll client/tech logo strip |

### UI Primitives

| Component | Description |
|---|---|
| `AnimatedSection` | Scroll-triggered fade/slide wrapper using Framer Motion |
| `MagneticButton` | Mouse-tracking magnetic hover effect for desktop CTAs |
| `RotatingServiceKeyword` | Animated word-cycle component used in the hero heading |
| `LanguageSwitcher` | Locale toggle that preserves current path |
| `WhatsAppButton` | Floating WhatsApp CTA with configurable number and message |
| `CookieBanner` | Cookiebot consent integration |

---

## 📜 Scripts

```bash
# Development server (Turbopack)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint (ESLint 9)
npm run lint

# Sanity: backfill blog localization migration
npm run sanity:migrate:blog-localization
```

---

## 🚢 Deployment

The project is designed for **Vercel** deployment.

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FSunbalAzizLCWU%2Fxcler)

1. Connect your GitHub repository to Vercel.
2. Set **Root Directory** to `xcler-dev`.
3. Add all [environment variables](#-environment-variables) in the Vercel dashboard.
4. Deploy. Vercel will auto-detect Next.js and configure the build.

### Manual / Self-hosted

```bash
npm run build
npm run start
# Listens on port 3000 by default
```

---

## 🤝 Contributing

Internal contributions follow these conventions:

1. **Branch naming:** `feat/description`, `fix/description`, `chore/description`
2. **Commits:** Use [Conventional Commits](https://www.conventionalcommits.org/) — e.g. `feat: add FAQ section to homepage`
3. **i18n:** Every UI string must have entries in both `messages/de.json` and `messages/en.json`
4. **Routes:** New pages must be registered in `src/navigation.ts` with localized pathnames for both locales
5. **Components:** Server Components by default — add `"use client"` only when browser APIs or React hooks are needed
6. **Linting:** Run `npm run lint` before opening a PR — the CI gate will fail on lint errors

---

## 📄 License

Copyright © 2026 Xcler. All rights reserved.

This codebase is **proprietary and confidential**. Unauthorized copying, distribution, or modification of any part of this repository, via any medium, is strictly prohibited without the express written permission of Xcler.

---

<div align="center">

Built with ❤️ by the [Xcler](https://xcler.dev) team · [xcler.dev](https://xcler.dev)

</div>
