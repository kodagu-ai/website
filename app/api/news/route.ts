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
  // TEMP DIAG (build: db-diag-1): booleans only, no secrets — remove after debugging.
  const diag: Record<string, unknown> = {
    build: "db-diag-3",
    hasUrl: !!url,
    hasKey: !!key,
    keyLen: key ? key.length : 0,
    // Project ref (subdomain) is not a secret — it's in every browser request.
    urlHost: url ? url.replace(/^https?:\/\//, "").split(".")[0] : null,
  };
  if (!url || !key)
    return NextResponse.json({ items: NEWS, source: "static", _diag: diag });

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
    diag.rawCount = data ? data.length : null;
    diag.err = error ? `${error.code ?? ""}:${error.message ?? error}` : null;
    // Unfiltered probe: how many rows of ANY status does this project see?
    const all = await supabase.from("news_items").select("id,status");
    diag.allCount = all.data ? all.data.length : null;
    diag.allErr = all.error ? `${all.error.code ?? ""}:${all.error.message ?? ""}` : null;
    // Exact status strings Vercel sees, JSON-encoded to expose any whitespace/case.
    diag.statuses = all.data
      ? all.data.map((r: { id: string; status: string }) => `${r.id}=${JSON.stringify(r.status)}`)
      : null;
    if (error) throw error;

    if (!data || data.length === 0)
      return NextResponse.json(
        { items: NEWS, source: "static", _diag: diag },
        { headers: { "Cache-Control": "no-store" } }
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
      { items, source: "db", _diag: diag },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("news reader failed:", err);
    diag.caught = `${err}`;
    return NextResponse.json({ items: NEWS, source: "static-error", _diag: diag });
  }
}
