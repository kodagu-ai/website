import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { NEWS } from "../../lib/news";

// Returns the published news feed from Supabase, falling back to the static
// seed (lib/news.ts) when the DB is empty or unconfigured. Dynamic + edge-cached
// so freshly-published items appear without a rebuild.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ items: NEWS, source: "static" });

  // TEMP DEBUG: compare supabase-js vs raw PostgREST with the same env key.
  if (process.env.SUPABASE_URL) {
    try {
      const raw = await fetch(
        `${url}/rest/v1/news_items?select=id&status=eq.published`,
        { headers: { apikey: key, Authorization: `Bearer ${key}` }, cache: "no-store" }
      );
      const rawBody = await raw.json().catch(() => null);
      const sb = createClient(url, key, { auth: { persistSession: false } });
      const { data: sbData, error: sbErr } = await sb
        .from("news_items").select("id").eq("status", "published");
      return NextResponse.json({
        items: NEWS,
        source: "debug",
        _debug: {
          keyPrefix: key.slice(0, 6),
          keyLen: key.length,
          rawStatus: raw.status,
          rawCount: Array.isArray(rawBody) ? rawBody.length : rawBody,
          sbCount: sbData?.length ?? null,
          sbErr: sbErr?.message ?? null,
        },
      });
    } catch (e) {
      return NextResponse.json({ items: NEWS, source: "debug-err", _e: String(e) });
    }
  }

  try {
    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data, error } = await supabase
      .from("news_items")
      .select("id,category,headline,summary,badge,score,sources,item_date")
      .eq("status", "published")
      .order("created_at", { ascending: false })
      .limit(60);
    if (error) throw error;

    if (!data || data.length === 0)
      return NextResponse.json(
        { items: NEWS, source: "static" },
        { headers: { "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600" } }
      );

    const items = data.map((r) => ({
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
