import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { NEWS } from "../../lib/news";

// Returns the published news feed from Supabase, falling back to the static
// seed (lib/news.ts) when the DB is empty or unconfigured. Dynamic + edge-cached
// so freshly-published items appear without a rebuild.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

    const published = ((data ?? []) as Row[])
      .filter((r) => r.status === "published")
      .sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
      .slice(0, 60);

    if (published.length === 0)
      return NextResponse.json(
        { items: NEWS, source: "static" },
        { headers: { "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600" } }
      );

    const items = published.map((r) => ({
      id: r.id,
      category: r.category,
      headline: r.headline,
      summary: r.summary,
      badge: r.badge,
      score: r.score,
      sources: r.sources ?? [],
      date: r.item_date ?? "",
    }));
    return NextResponse.json(
      { items, source: "db" },
      { headers: { "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600" } }
    );
  } catch (err) {
    console.error("news reader failed:", err);
    return NextResponse.json({ items: NEWS, source: "static-error" });
  }
}
