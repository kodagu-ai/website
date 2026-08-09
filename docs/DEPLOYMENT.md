# Kodagu.ai — Architecture, Deployment & Debugging

A single reference for how the whole site is built, what external systems it
uses, and how to debug each moving part. Written for the founder/maintainer.

> **Golden rule:** the production site auto-deploys from `git push` to `main`
> (GitHub `kodagu-ai/website` → Vercel). A push lands live in ~30–90s. There is
> no manual build/deploy step.

---

## 1. At a glance

| Layer | What we use |
|---|---|
| Framework | **Next.js 14 (App Router)** + TypeScript, plain CSS |
| Hosting | **Vercel** (auto-deploy on push to `main`) |
| Database | **Supabase** (Postgres), project ref `hvqmhhhqmuuwzfosbeaw` |
| Auth (admin only) | **Supabase Auth** magic-link via `@supabase/ssr` |
| Scheduled jobs | **Vercel Cron** (`vercel.json`) |
| News curation | **Firecrawl** (search/scrape) + **Anthropic Claude** (`claude-sonnet-5`) |
| Insights data | Open-Meteo (weather), CPA (coffee/spice prices), Yahoo/Investing (robusta), er-api (₹) |
| Newsletter | **Kit** (ConvertKit) |
| Transactional email | **Resend** (optional; used for Sankalpa entry alerts) |
| Uptime alerting | **UptimeRobot** → `/api/health/news?strict=1` |
| Social posting | **Blotato** (connected, not yet wired into the app) |

Everything runs **inside our own infra** (Vercel + Supabase). The one thing
that is *not* on Vercel is a claude.ai scheduled routine — and we deliberately
moved off that for the news pipeline (see §11, egress).

---

## 2. Repo layout

```
app/
  page.tsx                     home page
  about/ community/ insights/ join/ news/   site pages
  community/submit/            directory submission form
  projects/[slug]/             project detail pages (data in lib/projects.ts)
  admin/                       admin panel (see §7)
    login/                     magic-link sign-in (ungated)
    auth/callback/             magic-link callback (exchangeCodeForSession)
    (panel)/                   gated area: dashboard, directory, sankalpa
  api/
    cron/news/                 daily news pipeline (Vercel cron)
    cron/refresh-prices/       daily insights/prices (Vercel cron)
    health/news/               public freshness endpoint (UptimeRobot)
    news/  news/ingest/        news reader + ingest
    directory/submit/          directory form handler
    admin/directory/  admin/sankalpa/   admin status-change actions (auth-gated)
    sankalpa/entry/  votes/  entrants/  Sankalpa backend
    almanac/  coffee/  insights/        insights data endpoints
    subscribe/                 Kit newsletter signup
  lib/                         data + helpers (see below)
  components/                  Header, Footer, SiteNav, ProjectCard, etc.
public/
  sankalpa/index.html          standalone Sankalpa sub-brand page (NOT a Next route)
  *.svg / *.png                logos & brand assets
supabase/migrations/           SQL migrations (run manually in Supabase)
middleware.ts                  gates /admin/*
vercel.json                    cron schedule
docs/DEPLOYMENT.md             this file
```

Key `app/lib/` files: `projects.ts` (all projects), `news.ts` + `newsIngest.ts`
(news model/ingest), `directory.ts` + `directoryDb.ts` (community directory),
`adminAuth.ts` (admin gate + service-role client), `i18n.ts` + `getLocale.ts`
(EN/Kannada), `supabase/{server,client}.ts` (SSR auth clients).

---

## 3. Environment variables

Set in **Vercel → Project → Settings → Environment Variables** (and mirrored in
`.env.local` for local dev). `NEXT_PUBLIC_*` are inlined into the browser bundle
at **build time** — changing them requires a **redeploy** (see §11).

| Var | Secret? | Used by | Notes |
|---|---|---|---|
| `SUPABASE_URL` | no | all server routes | `https://hvqmhhhqmuuwzfosbeaw.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | **yes** | all server data access | bypasses RLS — server-only, never expose |
| `NEXT_PUBLIC_SUPABASE_URL` | no | admin auth (browser) | same URL, needed by `@supabase/ssr` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | no (public-safe) | admin auth (browser) | RLS protects data; grants nothing alone |
| `FIRECRAWL_API_KEY` | **yes** | news + prices crons | search/scrape |
| `ANTHROPIC_API_KEY` | **yes** | news cron | Claude curation |
| `CRON_SECRET` | **yes** | cron routes | Vercel Cron bearer |
| `NEWS_INGEST_SECRET` | **yes** | news ingest + manual trigger | `kni_…` (manual run bearer) |
| `KIT_API_KEY` / `KIT_TAG_ID` | **yes** | `/api/subscribe` | newsletter |
| `RESEND_API_KEY` | **yes** | Sankalpa entry email | **optional**; if unset, email is skipped |
| `RESEND_FROM` | no | Sankalpa entry email | defaults to `onboarding@resend.dev` |
| `SANKALPA_NOTIFY_EMAIL` | no | Sankalpa entry email | defaults to `poonacha@cyberhuman.ai` |

**Admin email** is a non-secret constant in code: `ADMIN_EMAIL =
"poonacha@cyberhuman.ai"` in `app/lib/adminAuth.ts`.

---

## 4. Database (Supabase)

Project ref **`hvqmhhhqmuuwzfosbeaw`**. All tables are **RLS ON with no
policies** — meaning the public `anon` role can't touch them; every read/write
goes through a server route using the **service-role key** (which bypasses RLS).

### Migrations (`supabase/migrations/`, run manually in the SQL Editor)

| File | Table(s) |
|---|---|
| 0001 | `directory_submissions` (community directory queue) |
| 0002 | `commodity_prices` (daily prices history) |
| 0003 | `reservoir_levels` (Harangi history) |
| 0004 | `news_items` (news feed) |
| 0005 | `news_items` +Kannada columns (`headline_kn`, `summary_kn`) |
| 0006 | `sankalpa_entries`, `sankalpa_votes` |
| 0007 | `sankalpa_entries` +social columns (`x_handle`, `instagram`, `linkedin`) |

Migrations are **not auto-applied** — you paste the SQL into Supabase → SQL
Editor. Server code is written to **degrade gracefully** if a migration hasn't
run yet (e.g. the Sankalpa insert retries without the social columns; the news
ingest retries without the Kannada columns), so a forgotten migration never
takes the site down — it just drops the new fields until you run it.

### Two Supabase gotchas baked into the code (don't "fix" them)

1. **Filter in JS, not PostgREST.** On Vercel's pooled connection, a server-side
   `.eq("status","published")` on a newly-added column intermittently matched
   **0 rows** with no error. Fix: fetch unfiltered (`.limit(N)`) and filter in
   JS. Used in `news`, `directoryDb`, `health/news`, `entrants`.
2. **No-store fetch.** Next's Data Cache memoizes supabase-js GETs even under
   `force-dynamic`. Fix: pass `global: { fetch: (u,i)=>fetch(u,{...i,cache:"no-store"}) }`
   to `createClient` on any reader that must be live.

---

## 5. The site & i18n

- Next App Router, server-rendered, `force-dynamic` layout.
- **EN / ಕನ್ನಡ toggle**: cookie-based locale, an `S` dictionary of `{en,kn}`
  strings in `lib/i18n.ts`, Noto Sans Kannada font. `getLocale()` lives in a
  **separate** `lib/getLocale.ts` (it imports `next/headers`, which can't be
  pulled into client components).
- **Mobile nav**: `components/SiteNav.tsx` — inline nav ≥1001px, hamburger +
  panel ≤1000px. The Sankalpa page has its own separate hamburger.

**Debug:** view source / DevTools; if a translation is missing it falls back to
EN. Layout is `force-dynamic`, so there's no stale-cache class of bug here.

---

## 6. Community directory

- **Submit:** `/community/submit` → `POST /api/directory/submit` → inserts into
  `directory_submissions` (status `pending`).
- **Review:** in the admin panel (`/admin/directory`) — Approve / Pending /
  Reject.
- **Auto-publish:** `/community` merges the curated static list
  (`lib/directory.ts`) with `status='approved'` DB rows via
  `fetchApprovedDirectory()` (`lib/directoryDb.ts`). So approving a row makes it
  appear live — no code edit. Contact details are never exposed publicly.

**Debug:** if an approved entry doesn't show, check its `status` is exactly
`approved` in Supabase; the reader filters status in JS and is no-store, so it's
live within a page load.

---

## 7. Admin panel (`/admin`)

Founder-only, magic-link. See also `memory/admin-panel.md`.

- **Auth:** Supabase Auth `signInWithOtp` gated to `ADMIN_EMAIL`. `middleware.ts`
  protects `/admin/*` (redirects to `/admin/login`); the panel layout and every
  admin API route **re-check** `getAdminUser()` (email === ADMIN_EMAIL).
- **Two clients:** the **anon** key (public) only reads the session cookie; all
  data reads/writes use the **service-role** client, and only *after* the admin
  check.
- **Pages:** dashboard (counts), `/admin/directory`, `/admin/sankalpa` (status
  actions New/Shortlist/Winner/Reject; shows entrant socials + contact).
- **APIs:** `/api/admin/{directory,sankalpa}` — auth-gate → service-role update.

**Access flow:** visit `/admin` → login → magic link to `poonacha@cyberhuman.ai`
→ click → dashboard.

**One-time setup:** `NEXT_PUBLIC_SUPABASE_*` in Vercel; Supabase → Auth → URL
Configuration → add redirect `https://www.kodagu.ai/admin/auth/callback`.

**Debug:** "can't sign in" almost always = a `NEXT_PUBLIC_*` var changed but the
site wasn't redeployed (browser bundle still has the old value — §11), or the
redirect URL isn't whitelisted in Supabase Auth.

---

## 8. News pipeline (the daily brief)

The flagship scheduled routine. See `memory/news-pipeline.md` for depth.

- **Trigger:** Vercel Cron `POST/GET /api/cron/news`, `vercel.json` schedule
  `30 1 * * *` = **01:30 UTC = 7:00 AM IST**. `maxDuration 300`.
- **Flow:** Firecrawl `/search` gathers EN + Kannada + hyperlocal candidates →
  Claude (`claude-sonnet-5`, Anthropic Messages API) clusters, categorises and
  Trust-scores using only the real gathered URLs → dedupes against the last ~10
  days → shared `ingestNewsItems()` upserts into `news_items`.
- **Publish rule:** 🟢 confirmed + 🟡 reported → `published`; 🔴 unverified →
  `pending` (human review).
- **Reader:** `/api/news` returns only the last 7 days, newest-first, no-store.
- **Auth:** `Authorization: Bearer <CRON_SECRET>` (Vercel) **or**
  `Bearer <NEWS_INGEST_SECRET>` (manual).

**Manual run (also the debug tool):**
```bash
curl -sS "https://www.kodagu.ai/api/cron/news" \
  -H "Authorization: Bearer $NEWS_INGEST_SECRET"
```
It returns JSON: `{ gathered, dedupAgainst, curated, received, published, pending, headlines[] }`.
A run takes ~60s. `published: 0` is normal on a quiet/duplicate news day (dedup
suppressed everything) — it's **not** a failure.

**Debug checklist:**
- Feed stale? First `curl /api/health/news` (see §9).
- Manually trigger the cron (above) — if it returns `ok:true` with counts, the
  pipeline is healthy; the scheduled trigger just may not have fired.
- `gathered: 0` → Firecrawl issue (key/quota).
- "no JSON in model output" / 500 → Anthropic issue (key/quota) or a transient
  model hiccup; re-run.
- Duplicates appearing → the dedup net; re-running the same day is safe (upsert).
- Did the *schedule* fire? Vercel → Project → **Cron Jobs** shows each job's last
  run + status. (The cron code running is separate from the schedule firing.)

---

## 9. News health check + email alerting

- **Endpoint:** `GET /api/health/news` (public, read-only, no secret). Returns
  `{ healthy, stale, staleThresholdHours: 36, newestItemDate, ingestAgeHours, … }`.
  `stale=true` when the newest **published** item was ingested >36h ago.
  `?strict=1` returns **HTTP 503** when stale (200 when healthy).
- **Alerting:** an **UptimeRobot** HTTP monitor points at
  `https://www.kodagu.ai/api/health/news?strict=1`. Healthy → 200 (Up); stale →
  503 (Down) → UptimeRobot emails you. Also catches total site/Vercel outage.
- Verified end-to-end (forced a 503, monitor emailed Down + recovery).
- A claude.ai cloud routine `kodagu-news-health` was created for this but is
  **disabled** (UptimeRobot superseded it — the cloud sandbox can't send email
  and can't `curl` our domain; see §11).

**Debug:** `curl /api/health/news` shows the exact freshness. If UptimeRobot
isn't alerting, check the monitor's alert-contact is ticked and the URL includes
`?strict=1`.

---

## 10. Insights & daily prices

- **Cron:** `/api/cron/refresh-prices`, `vercel.json` `0 1 * * *` = **01:00 UTC**.
  Scrapes CPA (`cpa.org.in`) coffee/spice prices via Firecrawl → inserts into
  `commodity_prices`; also records Harangi reservoir into `reservoir_levels`.
- **Live data endpoints** (called from the Insights page / almanac tiles):
  - `api/almanac/weather` → Open-Meteo (`api.open-meteo.com`)
  - `api/almanac/prices`, `api/coffee/market`, `api/coffee/robusta` → CPA /
    Yahoo Finance / Investing / er-api (₹ rate)
  - `api/insights/harangi`, `api/insights/rainfall` → reservoir / rainfall
- Insights "blades" (climate, health, schemes, coffee) are static bilingual
  content in `lib/*.ts`.

**Debug:** these are best-effort external scrapes — if a tile shows stale/empty,
the upstream source likely changed layout; check the corresponding `lib/*.ts`
fetcher. Failures are non-fatal (the page still renders).

---

## 11. Sankalpa (the innovation challenge)

`/sankalpa` is a **standalone static page** — `public/sankalpa/index.html`, its
own coffee/gold branding, served at the clean `/sankalpa` via a `rewrites()`
entry in `next.config.mjs`. It is **not** a Next route; it's plain HTML + vanilla
JS that calls our API routes.

**Backend (Next API routes + Supabase):**
- `POST /api/sankalpa/entry` — saves an entry to `sankalpa_entries`; optionally
  mirrors into `directory_submissions` (the "join directory" opt-in); emails the
  founder via Resend if `RESEND_API_KEY` is set; graceful-degrades if migration
  0007 (socials) isn't run.
- `GET/POST /api/sankalpa/votes` — theme voting (10 topics, pick ≤3, dedupe by
  browser ballot id).
- `GET /api/sankalpa/entrants` — **public, privacy-limited** feed for the page
  ticker: first name + town only, never contact/idea, skips rejected.
- **Entry form** captures name/place/contact/idea + optional **X/Instagram/
  LinkedIn** handles + a content-use consent (grants Kodagu.ai the right to
  showcase/promote the entry).
- **Ticker** ("Ideas coming in") under the hero scrolls recent entrants.
- **Self-share** buttons on the success screen (X/WhatsApp/LinkedIn/Copy) so
  entrants post to their own accounts.
- Review entries in `/admin/sankalpa`.

**Debug:**
- Test a submission: `POST /api/sankalpa/entry` should return `{ok:true}`; the
  row appears in `sankalpa_entries` (query in Supabase or see `/admin/sankalpa`).
- No entry email? `RESEND_API_KEY` must be set in Vercel **and** the site
  redeployed; with the default `onboarding@resend.dev` sender, Resend only
  delivers to the **Resend account's own** email.
- Ticker empty? It's hidden when there are no (non-rejected) entries — that's by
  design.

---

## 12. Cron / scheduled jobs

| Job | Where | Schedule (UTC) | Local (IST) |
|---|---|---|---|
| News brief | `vercel.json` → `/api/cron/news` | `30 1 * * *` | 7:00 AM |
| Prices + reservoir | `vercel.json` → `/api/cron/refresh-prices` | `0 1 * * *` | 6:30 AM |
| News freshness alert | **UptimeRobot** → `/api/health/news?strict=1` | every 5 min | — |
| ~~News health routine~~ | claude.ai routine (disabled) | — | — |

Vercel Cron sends `Authorization: Bearer $CRON_SECRET`. We deliberately keep the
health check on **UptimeRobot (external)** rather than adding a 3rd Vercel cron:
it needs no extra cron slot (Vercel's Hobby tier caps cron jobs at 2), and an
external monitor also catches a total site/Vercel outage that an on-Vercel cron
never could.

---

## 13. Deploy flow

1. Commit + `git push origin main`.
2. Vercel auto-builds & deploys (~30–90s). No CLI needed (the Vercel CLI token
   is expired — that does **not** block git-push deploys).
3. `public/` assets and API routes go live at the same time.

**Verify a deploy landed:** `curl` the changed endpoint/asset on
`https://www.kodagu.ai` and look for the new content (a byte-size change for an
asset, a new field for an endpoint). Auto-deploy is reliable within ~a minute.

---

## 14. Debugging runbook — the five gotchas that cost real time

1. **`NEXT_PUBLIC_*` needs a redeploy.** These are inlined into the browser
   bundle at build time. Adding/changing one in Vercel does nothing to already-
   deployed pages until you **redeploy**. (Caused the admin login "URL and API
   key are required" error.)
2. **PostgREST `.eq` on new columns → 0 rows on Vercel's pooled connection.**
   Filter in JS instead (already done in the readers).
3. **Next Data Cache memoizes supabase-js GETs.** Use the no-store fetch
   override on live readers (already done).
4. **`npm run build` corrupts the running `next dev`.** Running a production
   build overwrites `.next`, which the dev server depends on → "Cannot find
   module './xxx.js'" / 500s locally. Fix: `rm -rf .next && npm run dev`. (Prod
   is unaffected — this is local only.)
5. **claude.ai cloud routines can't reach our domain via `curl`.** The cloud
   sandbox is default-deny egress: `curl` to `www.kodagu.ai` → 403. The proxied
   **WebFetch tool works**. This is why the news pipeline lives on Vercel (not a
   cloud routine) and why any monitoring routine must use WebFetch, not curl.

**General approach to "a routine isn't working":**
1. Hit the routine's endpoint directly with `curl` (+ the right bearer) and read
   the JSON it returns — every cron/health route returns structured status.
2. Check the data in Supabase (the source of truth).
3. Check **Vercel → Cron Jobs** for whether the *schedule* fired and its status.
4. Check **Vercel → Deployments → (latest) → Functions/Logs** for runtime errors.
5. For env issues, remember §14.1 (redeploy after `NEXT_PUBLIC_*` changes).

---

## 15. Fresh-environment setup checklist

1. Vercel project connected to `kodagu-ai/website`, auto-deploy on `main`.
2. All env vars from §3 set in Vercel (Production).
3. Supabase project `hvqmhhhqmuuwzfosbeaw`; run every migration in
   `supabase/migrations/` in order.
4. Supabase → Auth → URL Configuration → add `…/admin/auth/callback`; Email
   provider on.
5. `vercel.json` crons registered (automatic on deploy).
6. UptimeRobot monitor on `/api/health/news?strict=1` with your email as alert
   contact.
7. (Optional) Resend account + `RESEND_API_KEY` for Sankalpa entry emails.

---

*Keep this doc in sync when you add a subsystem, a table, an env var, or a cron.*
