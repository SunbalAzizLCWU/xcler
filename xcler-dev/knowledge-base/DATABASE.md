# Knowledge Base Database Design

Supabase Postgres with `pgvector` stores the knowledge base chunks, their Jina embeddings and the assistant's conversation logs. This file is **not embedded** — it documents the schema.

## Stack overview

| Layer | Choice | Notes |
| --- | --- | --- |
| Embeddings | Jina `jina-embeddings-v3` | 1024 dims, multilingual (DE/EN), task-specific LoRA: `retrieval.passage` / `retrieval.query` |
| Vector store | Supabase Postgres + `pgvector` | HNSW index, cosine distance |
| Keyword search | Postgres full-text search | `simple` config so German and English both work |
| Ranking | Hybrid: vector + full-text merged with Reciprocal Rank Fusion (RRF) | |
| LLM | Groq chat completions | e.g. `llama-3.3-70b-versatile`; confirm current model IDs in the Groq console |
| Speech-to-text | Groq `whisper-large-v3-turbo` | Supports German and English |
| Text-to-speech | Groq TTS | Check which voices and languages are available; German voice support may require a fallback |

Environment variables (server-side only, never `NEXT_PUBLIC_`):

```
GROQ_API_KEY=
JINA_API_KEY=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

## Tables

### `kb_documents` — one row per source file

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `uuid` PK | `gen_random_uuid()` |
| `slug` | `text` unique | frontmatter `id`, or `blog/{lang}/{slug}` for blog posts |
| `title` | `text` | |
| `category` | `text` | `company`, `service`, `project`, `person`, `blog`, `blog-index` |
| `lang` | `text` | `en` or `de` |
| `source_url` | `text` | canonical page used for citations |
| `source_path` | `text` | repo path, e.g. `knowledge-base/services/ai-automation.md` |
| `content_hash` | `text` | SHA-256 of file content for change detection |
| `updated_at` | `timestamptz` | |
| `created_at` | `timestamptz` | default `now()` |

### `kb_chunks` — retrievable sections

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `bigint` identity PK | |
| `document_id` | `uuid` FK → `kb_documents.id` | `on delete cascade` |
| `chunk_index` | `int` | order within the document |
| `heading` | `text` | the `##` heading |
| `content` | `text` | the chunk text shown to the LLM |
| `token_count` | `int` | approximate |
| `lang` | `text` | copied from the document for filtering |
| `metadata` | `jsonb` | tags, category, source_url |
| `embedding` | `vector(1024)` | Jina `retrieval.passage` |
| `fts` | `tsvector` generated | `to_tsvector('simple', heading || ' ' || content)` |

### `chat_sessions` and `chat_messages` — conversation log

Kept for quality review only, deleted automatically after 30 days (see retention).

| `chat_sessions` | Type | Notes |
| --- | --- | --- |
| `id` | `uuid` PK | generated client-side per visit |
| `locale` | `text` | `de` / `en` |
| `channel` | `text` | `text` or `voice` |
| `created_at` | `timestamptz` | |

| `chat_messages` | Type | Notes |
| --- | --- | --- |
| `id` | `bigint` identity PK | |
| `session_id` | `uuid` FK → `chat_sessions.id` | `on delete cascade` |
| `role` | `text` | `user`, `assistant` |
| `content` | `text` | transcript for voice turns |
| `citations` | `jsonb` | `[{chunk_id, source_url, title}]` |
| `latency_ms` | `int` | end-to-end for this turn |
| `feedback` | `smallint` | `1`, `-1` or null |
| `created_at` | `timestamptz` | |

No audio is stored — only transcripts.

## SQL

```sql
create extension if not exists vector;

create table public.kb_documents (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null,
  lang text not null check (lang in ('en', 'de')),
  source_url text,
  source_path text not null,
  content_hash text not null,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table public.kb_chunks (
  id bigint generated always as identity primary key,
  document_id uuid not null references public.kb_documents(id) on delete cascade,
  chunk_index int not null,
  heading text,
  content text not null,
  token_count int,
  lang text not null,
  metadata jsonb not null default '{}'::jsonb,
  embedding vector(1024) not null,
  fts tsvector generated always as (
    to_tsvector('simple', coalesce(heading, '') || ' ' || content)
  ) stored,
  unique (document_id, chunk_index)
);

create index kb_chunks_embedding_idx on public.kb_chunks
  using hnsw (embedding vector_cosine_ops);
create index kb_chunks_fts_idx on public.kb_chunks using gin (fts);
create index kb_chunks_lang_idx on public.kb_chunks (lang);

create table public.chat_sessions (
  id uuid primary key,
  locale text not null default 'de',
  channel text not null default 'text' check (channel in ('text', 'voice')),
  created_at timestamptz not null default now()
);

create table public.chat_messages (
  id bigint generated always as identity primary key,
  session_id uuid not null references public.chat_sessions(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  citations jsonb not null default '[]'::jsonb,
  latency_ms int,
  feedback smallint check (feedback in (-1, 1)),
  created_at timestamptz not null default now()
);

create index chat_messages_session_idx on public.chat_messages (session_id, created_at);

-- Only the server (service role) touches these tables.
alter table public.kb_documents enable row level security;
alter table public.kb_chunks enable row level security;
alter table public.chat_sessions enable row level security;
alter table public.chat_messages enable row level security;
```

### Hybrid search function (vector + full-text, RRF)

```sql
create or replace function public.match_kb_chunks(
  query_embedding vector(1024),
  query_text text,
  match_count int default 8,
  filter_lang text default null,
  full_text_weight float default 1.0,
  semantic_weight float default 1.0,
  rrf_k int default 50
)
returns table (
  id bigint,
  document_id uuid,
  heading text,
  content text,
  metadata jsonb,
  score float
)
language sql stable
as $$
with full_text as (
  select c.id,
         row_number() over (
           order by ts_rank_cd(c.fts, websearch_to_tsquery('simple', query_text)) desc
         ) as rank_ix
  from public.kb_chunks c
  where c.fts @@ websearch_to_tsquery('simple', query_text)
    and (filter_lang is null or c.lang = filter_lang)
  limit least(match_count, 30) * 2
),
semantic as (
  select c.id,
         row_number() over (order by c.embedding <=> query_embedding) as rank_ix
  from public.kb_chunks c
  where filter_lang is null or c.lang = filter_lang
  order by c.embedding <=> query_embedding
  limit least(match_count, 30) * 2
)
select c.id, c.document_id, c.heading, c.content, c.metadata,
       coalesce(1.0 / (rrf_k + ft.rank_ix), 0.0) * full_text_weight +
       coalesce(1.0 / (rrf_k + s.rank_ix), 0.0) * semantic_weight as score
from full_text ft
full outer join semantic s on ft.id = s.id
join public.kb_chunks c on c.id = coalesce(ft.id, s.id)
order by score desc
limit least(match_count, 30);
$$;
```

Call it without `filter_lang` by default so German questions can use English chunks (cross-lingual retrieval), and pass `filter_lang` only for language-specific content such as legal text.

### Retention (GDPR)

```sql
-- Requires the pg_cron extension (enable in Supabase dashboard).
select cron.schedule(
  'delete-old-chat-logs',
  '0 3 * * *',
  $$ delete from public.chat_sessions where created_at < now() - interval '30 days' $$
);
```

## Ingestion flow

1. Read every `.md` in `knowledge-base/` (except `README.md`, `DATABASE.md`, `assistant/`) plus `content/blog/{en,de}/*.md`.
2. Parse frontmatter; compute SHA-256 of the file. Skip if `content_hash` is unchanged.
3. Split by `##` headings; split sections longer than ~450 words by paragraph with ~40 words overlap; merge sections shorter than ~80 words with the next one.
4. Prefix each chunk with `"{title} > {heading}"` and embed in batches with Jina (`task: retrieval.passage`, `dimensions: 1024`).
5. Upsert the document, delete its old chunks, insert the new chunks — in one transaction.
6. Delete documents whose source file no longer exists.

## Query flow (per user turn)

1. **Voice only:** audio → Groq Whisper → transcript.
2. Embed the question with Jina (`task: retrieval.query`).
3. `match_kb_chunks` → top 6–8 chunks.
4. Build the prompt: system rules from `assistant/behavior.md` + retrieved chunks with numbered sources + recent conversation turns.
5. Stream the answer from Groq; return citations (source URLs) to the UI.
6. **Voice only:** stream sentences to Groq TTS as they complete, so playback starts before the full answer is ready.
7. Log the turn to `chat_messages` without audio.
