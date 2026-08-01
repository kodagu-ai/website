-- Kodagu Almanac — commodity price history (time-series for analytics)
--
-- Every scheduled scrape appends one row per commodity, so this table is a
-- full history you can chart later. The almanac shows the latest row per
-- (crop, grade). RLS is ON with no policies — only the server routes
-- (service_role) read/write; the public cannot touch it directly.

create table if not exists public.commodity_prices (
  id           bigint generated always as identity primary key,
  captured_at  timestamptz not null default now(),
  crop         text not null,          -- 'Coffee' | 'Pepper' | 'Paddy' | 'Cardamom'
  grade        text,                   -- 'Robusta Cherry', 'Arabica Parchment', ...
  price_text   text not null,          -- display string, e.g. '₹9,400–10,200'
  price_min    numeric,                -- numeric low  (for analytics)
  price_max    numeric,                -- numeric high (for analytics)
  unit         text not null,          -- '/ 50 kg bag' | '/ kg' | '/ quintal'
  source       text not null,          -- 'Coorg Planters’ Association', ...
  source_url   text,
  source_asof  date,                   -- 'last updated' date reported by the source
  raw          jsonb                   -- optional raw capture for debugging
);

alter table public.commodity_prices enable row level security;
-- (No policies: only service_role, which bypasses RLS, has access.)

create index if not exists commodity_prices_latest_idx
  on public.commodity_prices (crop, grade, captured_at desc);
