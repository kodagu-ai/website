import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { NEWS } from "../../lib/news";

// Returns the recent published news feed from Supabase, falling back to the
// static seed (lib/news.ts) only when the DB is unconfigured or unreachable.
// Dynamic so freshly-published items appear without a rebuild.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// "Kodagu Today" is a daily brief: only show items from the last WINDOW_DAYS,
// newest first. Older items age out of the feed automatically as the window
// slides. Published = 🟢 confirmed + 🟡 reported; 🔴 unverified stays gated.
const WINDOW_DAYS = 7;

// We fetch rows unfiltered and select `status = 'published'` in JS rather than
// with a PostgREST `.eq("status", ...)` predicate. On Vercel's pooled connection
// to Supabase, the server-side status filter on this (recently-created) table
// intermittently matched zero rows even though the rows plainly carry
// status='published' (an unfiltered read returns them correctly). Filtering in
// code sidesteps that and is trivially cheap for a small news table.
type Row = {
  id: string;
  category: string;
  headline: string;
  summary: string;
  badge: string;
  score: number | null;
  sources: unknown;
  item_date: string | null;
  status: string;
  created_at: string;
};

export async function GET() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ items: NEWS, source: "static" });

  try {
    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      // Bypass Next.js's App Router Data Cache, which otherwise memoizes
      // supabase-js's GET to PostgREST and serves a stale snapshot — newly
      // ingested items would never appear until the cache expired.
      global: { fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }) },
    });
    const { data, error } = await supabase
      .from("news_items")
      .select(
        "id,category,headline,summary,badge,score,sources,item_date,status,created_at"
      )
      .limit(200);
    if (error) throw error;

    // Sort/recency key: the article's publish date (item_date, ideally ISO),
    // falling back to when we ingested it if that date is missing/unparseable.
    const when = (r: Row) => {
      const t = r.item_date ? Date.parse(r.item_date) : NaN;
      return Number.isNaN(t) ? Date.parse(r.created_at) : t;
    };
    const cutoff = Date.now() - WINDOW_DAYS * 86_400_000;

    const recent = ((data ?? []) as Row[])
      .filter((r) => r.status === "published" && when(r) >= cutoff)
      .sort((a, b) => when(b) - when(a))
      .slice(0, 60);

    const items = recent.map((r) => ({
      id: r.id,
      category: r.category,
      headline: r.headline,
      summary: r.summary,
      badge: r.badge,
      score: r.score,
      sources: r.sources ?? [],
      date: r.item_date ?? "",
    }));
    // DB reachable but nothing recent → return an honest empty feed (a quiet
    // week), NOT the stale seed. The seed is only for cold start / DB down.
    return NextResponse.json(
      { items, source: "db", windowDays: WINDOW_DAYS },
      { headers: { "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600" } }
    );
  } catch (err) {
    console.error("news reader failed:", err);
    return NextResponse.json({ items: NEWS, source: "static-error" });
  }
}
