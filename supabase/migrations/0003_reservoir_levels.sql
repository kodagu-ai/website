-- Kodagu Almanac — reservoir level history (time-series for charting)
--
-- The daily cron appends one row per reservoir (currently Harangi). RLS is ON
-- with no policies — only the server routes (service_role) read/write.

create table if not exists public.reservoir_levels (
  id             bigint generated always as identity primary key,
  captured_at    timestamptz not null default now(),
  name           text not null,          -- 'Harangi'
  pct_full       numeric,
  storage_tmc    numeric,
  capacity_tmc   numeric,
  inflow_cusecs  integer,
  outflow_cusecs integer,
  source         text,
  source_date    text                    -- date string reported by the source
);

alter table public.reservoir_levels enable row level security;
-- (No policies: only service_role, which bypasses RLS, has access.)

create index if not exists reservoir_levels_latest_idx
  on public.reservoir_levels (name, captured_at desc);
