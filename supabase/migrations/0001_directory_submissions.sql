-- Kodagu.ai — community directory submissions
-- Stores pending submissions from /community/submit for review.
--
-- Security model: Row Level Security is ON with NO policies, so the public
-- `anon` role cannot read or write this table at all. Inserts happen only
-- through the website's server route (/api/directory/submit), which uses the
-- service_role key (bypasses RLS). You review rows in the Supabase dashboard.

create table if not exists public.directory_submissions (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  type        text not null check (type in ('person', 'organization')),
  name        text not null,
  role        text,
  location    text,
  blurb       text not null,
  tags        text,
  website     text,
  github      text,
  projects    text,
  contact     text,
  consent     boolean not null default false,
  status      text not null default 'pending'
                check (status in ('pending', 'approved', 'rejected'))
);

alter table public.directory_submissions enable row level security;

-- (Intentionally no policies — only service_role, which bypasses RLS, has access.)

create index if not exists directory_submissions_status_idx
  on public.directory_submissions (status, created_at desc);
