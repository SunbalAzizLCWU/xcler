create extension if not exists vector;

create table if not exists public.kb_documents (
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

create table if not exists public.kb_chunks (
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

create index if not exists kb_chunks_embedding_idx on public.kb_chunks
  using hnsw (embedding vector_cosine_ops);
create index if not exists kb_chunks_fts_idx on public.kb_chunks using gin (fts);
create index if not exists kb_chunks_lang_idx on public.kb_chunks (lang);

create table if not exists public.chat_sessions (
  id uuid primary key,
  locale text not null default 'de',
  channel text not null default 'text' check (channel in ('text', 'voice')),
  visitor_name text,
  visitor_email text,
  created_at timestamptz not null default now()
);

alter table public.chat_sessions add column if not exists visitor_name text;
alter table public.chat_sessions add column if not exists visitor_email text;
alter table public.chat_sessions add column if not exists ended_at timestamptz;
alter table public.chat_sessions add column if not exists transcript_sent_at timestamptz;
alter table public.chat_sessions add column if not exists end_reason text;

create table if not exists public.chat_messages (
  id bigint generated always as identity primary key,
  session_id uuid not null references public.chat_sessions(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  citations jsonb not null default '[]'::jsonb,
  latency_ms int,
  feedback smallint check (feedback in (-1, 1)),
  created_at timestamptz not null default now()
);

create index if not exists chat_messages_session_idx on public.chat_messages (session_id, created_at);

alter table public.kb_documents enable row level security;
alter table public.kb_chunks enable row level security;
alter table public.chat_sessions enable row level security;
alter table public.chat_messages enable row level security;

revoke all on table public.kb_documents from anon, authenticated;
revoke all on table public.kb_chunks from anon, authenticated;
revoke all on table public.chat_sessions from anon, authenticated;
revoke all on table public.chat_messages from anon, authenticated;

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
language sql
stable
as $$
with full_text as (
  select c.id,
         row_number() over (
           order by ts_rank_cd(c.fts, websearch_to_tsquery('simple', query_text)) desc
         ) as rank_ix
  from public.kb_chunks c
  where query_text is not null
    and length(trim(query_text)) > 0
    and c.fts @@ websearch_to_tsquery('simple', query_text)
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

grant execute on function public.match_kb_chunks(vector, text, int, text, float, float, int) to service_role;

do $$
begin
  perform cron.schedule(
    'delete-old-chat-logs',
    '0 3 * * *',
    $cron$ delete from public.chat_sessions where created_at < now() - interval '30 days' $cron$
  );
exception when others then
  raise notice 'pg_cron not available, skipping retention job';
end $$;
