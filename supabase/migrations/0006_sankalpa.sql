-- ─────────────────────────────────────────────────────────────────────────────
--  Kodagu Sankalpa — the innovation challenge.
--
--  Two tables: challenge ENTRIES and community THEME VOTES (to pick 2027's four
--  quarterly challenges). RLS is ON with NO policies on either table — all reads
--  and writes go through the service-role API routes (app/api/sankalpa/*), the
--  same model as directory_submissions.
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists public.sankalpa_entries (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  place         text,               -- village / town in Kodagu
  phone         text,               -- phone / WhatsApp
  email         text,
  entrant_type  text not null default 'individual'
                  check (entrant_type in ('individual', 'team')),
  team_name     text,
  area          text,               -- topic the idea addresses ('open' allowed)
  problem       text not null,
  solution      text not null,
  impact        text,               -- who it helps & how you'd know it worked
  prior         text,               -- anything already tried / built
  link          text,               -- photo / video / doc link
  status        text not null default 'new'
                  check (status in ('new', 'shortlisted', 'rejected', 'winner')),
  created_at    timestamptz not null default now()
);
alter table public.sankalpa_entries enable row level security;

create table if not exists public.sankalpa_votes (
  id          uuid primary key default gen_random_uuid(),
  ballot_id   text not null,        -- random id from the voter's browser (localStorage)
  topic_key   text not null,        -- one of the 10 topic keys (validated server-side)
  created_at  timestamptz not null default now()
);
alter table public.sankalpa_votes enable row level security;

create index if not exists sankalpa_votes_ballot_idx on public.sankalpa_votes (ballot_id);
create index if not exists sankalpa_votes_topic_idx  on public.sankalpa_votes (topic_key);
