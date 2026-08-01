-- Kodagu Today — daily news items (filled by the scheduled curation agent)
--
-- The agent gathers, clusters, categorises, summarises and Trust-Scores news,
-- then POSTs to /api/news/ingest, which upserts here. 🟢 Confirmed items are
-- 'published' automatically; 🟡/🔴 are 'pending' for human review (hybrid).
-- RLS is ON with no policies — only the server routes (service_role) touch it.

create table if not exists public.news_items (
  id           text primary key,        -- stable slug for dedupe/upsert
  category     text not null,
  headline     text not null,
  summary      text not null,
  badge        text not null check (badge in ('confirmed', 'reported', 'unverified')),
  score        int,
  sources      jsonb not null default '[]'::jsonb,
  item_date    text,                     -- display date, e.g. 'Aug 2026'
  status       text not null default 'pending'
                 check (status in ('published', 'pending', 'rejected')),
  created_at   timestamptz not null default now(),
  published_at timestamptz
);

alter table public.news_items enable row level security;
-- (No policies: only service_role, which bypasses RLS, has access.)

create index if not exists news_items_feed_idx
  on public.news_items (status, created_at desc);
