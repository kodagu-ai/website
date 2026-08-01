-- Bilingual news: Kannada headline + summary alongside the English ones.
-- The daily cron fills these; the feed shows them when the site is in Kannada
-- (falling back to English when a Kannada rendering is absent).
--
-- Safe to run anytime — the reader/ingest tolerate these columns being missing
-- (they retry without them), so there is no deploy-ordering requirement.

alter table public.news_items
  add column if not exists headline_kn text,
  add column if not exists summary_kn  text;
