# XCLER Knowledge Base

Source content for the website assistant (text chat + voice). Every `.md` file in this folder — except `README.md`, `DATABASE.md` and everything under `assistant/` — is chunked, embedded with Jina and stored in Supabase (pgvector) for retrieval.

The blog is **not duplicated here**. The ingest script also reads `content/blog/en/*.md` and `content/blog/de/*.md` directly, so published articles are always searchable in their latest version.

## Folder structure

| Folder | What goes in it |
| --- | --- |
| `company/` | Who XCLER is, contact, pricing, process, FAQ, team |
| `services/` | One file per service page on xcler.dev |
| `projects/` | XCLER case studies (AegisFlow, Green Navigator, VisaPath, Overwatch AI) |
| `people/` | Public profiles of people connected to XCLER, taken from their own sites |
| `blog/` | Index of all articles so the assistant can recommend the right one |
| `assistant/` | **Not embedded.** Behaviour rules loaded into the system prompt |

## Document format

Each file starts with YAML frontmatter:

```yaml
---
id: service-ai-automation          # stable, unique, kebab-case
title: AI Automation Agency        # human-readable
category: service                  # company | service | project | person | blog-index
lang: en                           # language of this file
source_url: https://xcler.dev/en/services/ai-automation
updated: 2026-09-25
tags: [ai automation, rag, n8n]
---
```

## Writing rules (they make retrieval work)

1. **One topic per `##` section.** The ingest script splits on `##` headings, so every section must make sense on its own.
2. **Repeat the subject in each section.** Write "XCLER's workflow automation service uses n8n…", not "It uses n8n…". A chunk is retrieved without its neighbours.
3. **Keep sections between ~80 and ~450 words.** Longer sections are split further; shorter ones are merged with the next.
4. **Facts only.** No marketing claims that the assistant cannot back up. If a number is an estimate, say so.
5. **Link to the canonical page** (`source_url`) so answers can cite it.
6. **English is canonical.** Jina embeddings are multilingual, so German questions retrieve English chunks; the assistant answers in the user's language. Add a German file only when wording must be exact (legal, pricing terms).

## Chunking and embedding settings

| Setting | Value |
| --- | --- |
| Split | Markdown `##` headings, then paragraphs if a section exceeds ~450 words |
| Chunk prefix | `"{document title} > {section heading}\n\n"` prepended before embedding |
| Overlap | none between sections; ~40 words when a long section is split |
| Embedding model | `jina-embeddings-v3`, 1024 dimensions |
| Task (documents) | `retrieval.passage` |
| Task (queries) | `retrieval.query` |
| Change detection | SHA-256 of file content; unchanged files are skipped on re-ingest |

## Facts to confirm before launch

These are inconsistent across the website and the source sites. The knowledge base currently avoids stating them as fact:

- **Location.** The website FAQ says XCLER is "based in Berlin". The imprint lists a provider address in 54664 Hosten (Rheinland-Pfalz) and a postal address in Lahore, Pakistan; the phone number is Pakistani; maziz.me says Musharraf Aziz works from Lahore. The knowledge base says "Germany and DACH are the primary market, delivery is remote" and points to `/impressum` for legal details.
- **Roles of Sunbal Aziz and Anber Aziz.** Their profiles are included from their own sites, but neither is listed on the XCLER team page. Confirm how the assistant should describe their relationship to XCLER.
- **Testimonials.** Names on the site are abbreviated (e.g. "Ahmed K."). They are included as published.
- **Imprint email.** The imprint lists a personal Gmail address; the knowledge base uses `hello@xcler.dev` everywhere.
