-- Kodagu Sankalpa — capture entrants' social handles (all optional), so their
-- entries can be shared and the entrant tagged. Nullable; no policy changes
-- (RLS stays on, all access via the service-role API routes).

alter table public.sankalpa_entries
  add column if not exists x_handle  text,
  add column if not exists instagram text,
  add column if not exists linkedin  text;
