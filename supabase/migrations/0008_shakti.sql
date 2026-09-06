-- ─────────────────────────────────────────────────────────────────────────────
--  Kodagu Shakthi Nadappu — the annual walk. Free registrations, capped at 108.
--
--  RLS is ON with NO policies — all reads/writes go through the service-role API
--  routes (app/api/shakti/*), the same model as sankalpa_entries. The cap is
--  enforced in the register route (count confirmed rows, reject at 108).
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists public.shakti_registrations (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  name             text not null,
  phone            text not null,
  email            text,
  place            text,               -- town / village in Kodagu
  distance         text,               -- 1km / 5km / 10km / full ~35km / completion
  emergency_name   text,
  emergency_phone  text,
  waiver           boolean not null default false,   -- fitness + at-own-risk confirmed
  status           text not null default 'confirmed'
                     check (status in ('confirmed', 'cancelled', 'waitlist')),
  notes            text                 -- organiser notes (admin only)
);
alter table public.shakti_registrations enable row level security;

create index if not exists shakti_registrations_status_idx
  on public.shakti_registrations (status, created_at desc);
