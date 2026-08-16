-- Shared Kodagu.ai public identity profile.
-- Authentication credentials remain in auth.users; this table contains only
-- minimal application profile data keyed by the stable Supabase user UUID.

create table if not exists public.profiles (
  id                uuid primary key references auth.users (id) on delete cascade,
  display_name      text check (char_length(display_name) between 1 and 100),
  location          text check (char_length(location) <= 120),
  preferred_locale  text not null default 'en'
                      check (preferred_locale in ('en', 'kn')),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can read their own profile"
  on public.profiles for select
  to authenticated
  using ((select auth.uid()) = id);

create policy "Users can update their own profile"
  on public.profiles for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create or replace function public.create_profile_for_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id)
  values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists create_profile_after_signup on auth.users;
create trigger create_profile_after_signup
  after insert on auth.users
  for each row execute function public.create_profile_for_new_user();

-- Ensure accounts created before this migration also receive a profile row.
insert into public.profiles (id)
select id from auth.users
on conflict (id) do nothing;

revoke all on table public.profiles from anon;
grant select, update on table public.profiles to authenticated;