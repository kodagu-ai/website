import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { ingestNewsItems } from "../../../lib/newsIngest";

// Daily "Kodagu Today" pipeline, run entirely in our own infra (no cloud
// sandbox / egress limits). Scheduled by Vercel Cron (see vercel.json):
//   1. GATHER  — Firecrawl search across Kodagu topics (English + Kannada + the
//                hyperlocal sites), collecting real candidate {title,url,date}.
//   2. CURATE  — Claude clusters/categorises/summarises/Trust-scores them, using
//                ONLY the real URLs we hand it (no fabrication), last 7 days only.
//   3. INGEST  — shared ingestNewsItems() upserts to news_items (confirmed +
//                reported publish live, unverified held for review).
export const runtime = "nodejs";
// Bilingual curation (English + Kannada) can run longer than 60s; needs a Pro
// plan to exceed 60. If the deploy is on Hobby this caps at 60 and the run may
// time out — in that case reduce the search count / item count below.
export const maxDuration = 300;

const MODEL = "claude-sonnet-5";

type Candidate = { title: string; url: string; snippet: string; date: string };

// One Firecrawl v2 search. `type` is "news" (dated) or "web" (for site: queries).
async function fcSearch(
  fcKey: string,
  query: string,
  type: "news" | "web"
): Promise<Candidate[]> {
  try {
    const r = await fetch("https://api.firecrawl.dev/v2/search", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${fcKey}` },
      body: JSON.stringify({
        query,
        sources: [{ type }],
        tbs: "qdr:w", // last week
        limit: 8,
      }),
    });
    if (!r.ok) {
      console.error("fcSearch failed", type, query, r.status);
      return [];
    }
    const j = await r.json();
    const arr = (j?.data?.[type] ?? j?.data?.news ?? j?.data?.web ?? j?.data ?? []) as unknown[];
    return (Array.isArray(arr) ? arr : [])
      .map((x) => {
        const o = x as Record<string, unknown>;
        return {
          title: String(o.title ?? "").slice(0, 200),
          url: String(o.url ?? ""),
          snippet: String(o.snippet ?? o.description ?? "").slice(0, 300),
          date: String(o.date ?? ""),
        };
      })
      .filter((c) => c.url.startsWith("http"));
  } catch (e) {
    console.error("fcSearch error", query, e);
    return [];
  }
}

const CURATION_SYSTEM = `You are the daily news curator for Kodagu.ai, a community hub for Kodagu (Coorg) district, Karnataka, India. You will receive today's date and a list of CANDIDATE news results (title, url, snippet, date) gathered from the web. Turn them into today's verified Kodagu brief.

HARD RULES:
- Use ONLY urls that appear verbatim in the CANDIDATES. NEVER invent or guess a url, headline, source, or date. If unsure, drop the item.
- RECENCY: include ONLY items published within the LAST 7 DAYS of today's date. Interpret relative dates ("12 hours ago", "2 days ago") against today's date; convert to ISO. If a candidate's date is older than 7 days or undeterminable, DROP it.
- Cluster duplicate stories across candidates into ONE item (combine their urls as sources).
- DEDUP: You will also receive ALREADY_PUBLISHED — items posted in the last several days (id + headline). Do NOT publish a fresh item for a story that is ALREADY there. If a candidate is the SAME ongoing story as an already-published one (even worded differently), and there is nothing genuinely new, DROP it. If there IS a genuinely new development of that same story, you MAY include it but you MUST reuse that item's EXACT id (copy it verbatim) so it updates in place instead of duplicating. Only mint a NEW slug id for a story that is NOT already in ALREADY_PUBLISHED.
- Aim for 5-8 items (hard max 8). A short, genuinely-recent brief is better than a padded stale one.

CATEGORIES (use EXACTLY one of these strings): "People", "Culture & Heritage", "Sports", "Agriculture", "Technology", "Business & Community", "Environment & Wildlife", "Civic & Governance", "World & Kodagu".

SOURCE TIERS (for scoring): Tier A (established/official, can reach confirmed): The Hindu, Deccan Herald, Times of India, New Indian Express, Indian Express, Hindustan Times, BusinessLine, Prajavani, Udayavani, Vijaya Karnataka, Kannada Prabha, Hockey India/ATP/official. Tier B (regional/hyperlocal, usually reported unless a 2nd outlet corroborates): Star of Mysore, The Kodagu Express, Shakthi Daily, TV9 Kannada, Asianet Suvarna, Public TV, News Karnataka, The News Minute. Tier C (opinion/blog/community, cap at reported/unverified): Coorg News (coorgnews.in), kodavaclan.com, small local papers.

TRUST BADGE: "confirmed" (score 80-95) = an official/Tier-A source OR >=2 independent reliable outlets (different mastheads) agree. "reported" (60-79) = a single reliable outlet, not yet corroborated. "unverified" (<60) = single Tier-C/blog/opinion. A lone low-tier source is never "confirmed".

For news about INDIVIDUALS: only corroborated, public-interest items — never unverified allegations about private people. Skip communal/inflammatory single-source items.

BILINGUAL: also provide a natural Kannada rendering of each item — "headlineKn" (Kannada headline) and "summaryKn" (Kannada summary, 1-2 sentences). Keep proper nouns/brand names (people, places, outlets) as-is; translate the rest into fluent Kannada. Do not transliterate word-for-word.

OUTPUT: a single JSON object and NOTHING else, shape:
{"items":[{"id":"lowercase-slug","category":"<one of the 9>","headline":"...","summary":"neutral 1-2 sentences in English","headlineKn":"ಕನ್ನಡ ಶೀರ್ಷಿಕೆ","summaryKn":"ಕನ್ನಡ ಸಾರಾಂಶ","sources":[{"name":"Outlet","url":"<verbatim candidate url>"}],"badge":"confirmed|reported|unverified","score":0,"date":"YYYY-MM-DD"}]}`;

type Recent = { id: string; headline: string; date: string | null };

async function curate(
  anthropicKey: string,
  today: string,
  candidates: Candidate[],
  recent: Recent[]
): Promise<unknown[]> {
  const userText =
    `Today's date: ${today}\n\nALREADY_PUBLISHED (${recent.length}) — do NOT duplicate these; reuse the exact id only for a genuinely new development:\n` +
    JSON.stringify(recent, null, 0) +
    `\n\nCANDIDATES (${candidates.length}):\n` +
    JSON.stringify(candidates, null, 0);
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": anthropicKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 8000,
      system: CURATION_SYSTEM,
      messages: [{ role: "user", content: userText }],
    }),
  });
  if (!r.ok) {
    const t = await r.text();
    throw new Error(`anthropic ${r.status}: ${t.slice(0, 200)}`);
  }
  const j = await r.json();
  const text: string = (j?.content ?? [])
    .map((b: { type?: string; text?: string }) => (b.type === "text" ? b.text : ""))
    .join("");
  // Extract the JSON object even if wrapped in prose/```json fences.
  const cleaned = text.replace(/```json\s*/gi, "").replace(/```/g, "");
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1)
    throw new Error(`no JSON in model output; raw="${text.slice(0, 200)}"`);
  const parsed = JSON.parse(cleaned.slice(start, end + 1));
  return Array.isArray(parsed?.items) ? parsed.items : [];
}

// Distinctive words (>=4 chars) of a headline, lowercased and de-punctuated.
function keyWords(s: string): Set<string> {
  return new Set(
    (s || "").toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter((w) => w.length >= 4)
  );
}
// Overlap coefficient = shared / smaller set. Conservative "same story" test.
function sameStory(a: string, b: string): boolean {
  const A = keyWords(a), B = keyWords(b);
  if (A.size < 3 || B.size < 3) return false;
  let shared = 0;
  for (const t of A) if (B.has(t)) shared++;
  return shared >= 3 && shared / Math.min(A.size, B.size) >= 0.75;
}

// Belt-and-suspenders dedup: if the model minted a NEW id for a story that is
// clearly one already published (near-identical headline), remap it to that id
// so the upsert updates in place rather than creating a duplicate row.
function remapDuplicates(items: unknown[], recent: Recent[]): number {
  let remapped = 0;
  for (const raw of items) {
    const it = raw as { id?: unknown; headline?: unknown };
    if (!it || typeof it.id !== "string" || typeof it.headline !== "string") continue;
    if (recent.some((r) => r.id === it.id)) continue; // already reusing an id — good
    const match = recent.find((r) => sameStory(it.headline as string, r.headline));
    if (match) {
      it.id = match.id;
      remapped++;
    }
  }
  return remapped;
}

export async function GET(req: Request) {
  // Auth: Vercel Cron sends `Authorization: Bearer ${CRON_SECRET}`. We also accept
  // NEWS_INGEST_SECRET for manual triggering — it already authorizes writes to
  // news_items via /api/news/ingest, so it grants no new capability here.
  const cronSecret = process.env.CRON_SECRET;
  const ingestSecret = process.env.NEWS_INGEST_SECRET;
  const auth = req.headers.get("authorization") ?? "";
  const ok =
    (cronSecret && auth === `Bearer ${cronSecret}`) ||
    (ingestSecret && auth === `Bearer ${ingestSecret}`);
  if (!ok) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const fcKey = process.env.FIRECRAWL_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const supaUrl = process.env.SUPABASE_URL;
  const supaKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!fcKey || !anthropicKey || !supaUrl || !supaKey) {
    const missing = [
      !fcKey && "FIRECRAWL_API_KEY",
      !anthropicKey && "ANTHROPIC_API_KEY",
      !supaUrl && "SUPABASE_URL",
      !supaKey && "SUPABASE_SERVICE_ROLE_KEY",
    ].filter(Boolean);
    return NextResponse.json({ error: "not configured", missing }, { status: 503 });
  }

  try {
    const today = new Date().toISOString().slice(0, 10);

    // 1. GATHER — English news, Kannada news, and the two hyperlocal sites.
    const queries: { q: string; type: "news" | "web" }[] = [
      { q: "Kodagu Coorg Madikeri news", type: "news" },
      { q: "Kodagu coffee elephant rain landslide", type: "news" },
      { q: "Kodava hockey Coorg sports Kodagu tennis", type: "news" },
      { q: "ಕೊಡಗು ಮಡಿಕೇರಿ ಸುದ್ದಿ", type: "news" },
      { q: "Kodagu Madikeri site:shakthidaily.info", type: "web" },
      { q: "Kodagu Madikeri site:kodaguexpress.com", type: "web" },
    ];
    const results = await Promise.all(queries.map((x) => fcSearch(fcKey, x.q, x.type)));
    const byUrl = new Map<string, Candidate>();
    for (const c of results.flat()) if (!byUrl.has(c.url)) byUrl.set(c.url, c);
    const candidates = [...byUrl.values()].slice(0, 30);
    if (candidates.length === 0)
      return NextResponse.json({ error: "no candidates gathered" }, { status: 502 });

    // 1b. DEDUP CONTEXT — recently-ingested items (last ~10 days) so the model
    // doesn't re-publish the same story under a new slug. Fetch unfiltered and
    // window in JS (avoids the pooled-PostgREST predicate quirks we hit before).
    const supabase = createClient(supaUrl, supaKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { fetch: (u, i) => fetch(u, { ...i, cache: "no-store" }) },
    });
    const cutoff = Date.now() - 10 * 86_400_000;
    const { data: recentRows } = await supabase
      .from("news_items")
      .select("id,headline,item_date,created_at")
      .limit(200);
    const recent: Recent[] = ((recentRows ?? []) as { id: string; headline: string; item_date: string | null; created_at: string }[])
      .filter((r) => Date.parse(r.created_at) >= cutoff)
      .sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
      .slice(0, 40)
      .map((r) => ({ id: r.id, headline: r.headline, date: r.item_date }));

    // 2. CURATE
    const items = await curate(anthropicKey, today, candidates, recent);

    // 2b. DEDUP safety net (in case the model minted a new id for a known story)
    const remapped = remapDuplicates(items, recent);

    // 3. INGEST
    const result = await ingestNewsItems(items, supaUrl, supaKey);

    return NextResponse.json({
      ok: true,
      today,
      gathered: candidates.length,
      dedupAgainst: recent.length,
      remapped,
      curated: items.length,
      ...result,
      headlines: (items as { headline?: string; badge?: string; date?: string }[])
        .slice(0, 20)
        .map((i) => `${i.badge ?? "?"} · ${i.date ?? "?"} · ${i.headline ?? ""}`),
    });
  } catch (err) {
    console.error("cron/news error:", err);
    return NextResponse.json({ error: `${err}`.slice(0, 300) }, { status: 500 });
  }
}
