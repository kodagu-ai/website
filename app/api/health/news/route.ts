import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Public, read-only health of the daily news pipeline. No secret — it exposes
// only freshness metadata (dates/ages/counts), never article content, so it is
// safe to point an uptime monitor or a scheduled agent at.
//
//   GET /api/health/news           → always 200, body has `stale` + `healthy`
//   GET /api/health/news?strict=1  → 503 when stale (so monitors alert on it)
//
// "stale" = the newest PUBLISHED item was ingested more than STALE_HOURS ago,
// which is the signal that the daily pipeline may have silently stopped.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STALE_HOURS = 36;

function ageHours(iso?: string | null): number | null {
  if (!iso) return null;
  const t = Date.parse(iso);
  return Number.isFinite(t) ? Math.round(((Date.now() - t) / 3_600_000) * 10) / 10 : null;
}

export async function GET(req: Request) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key)
    return NextResponse.json(
      { ok: false, healthy: false, error: "not configured" },
      { status: 503 }
    );

  try {
    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { fetch: (u, i) => fetch(u, { ...i, cache: "no-store" }) },
    });

    // Pull recent rows and reduce in JS (avoids the pooled-PostgREST predicate
    // quirks we hit elsewhere with .eq on status).
    const { data, error } = await supabase
      .from("news_items")
      .select("item_date,published_at,status")
      .limit(300);
    if (error) throw error;

    const published = ((data ?? []) as {
      item_date: string | null;
      published_at: string | null;
      status: string;
    }[]).filter((r) => r.status === "published");

    // Newest by ingest time. item_date is free-text ("Aug 2026", "2026-08-06"),
    // so we take the item_date FROM the most-recently-published row rather than
    // string-sorting the dates.
    const byNewest = [...published]
      .filter((r) => r.published_at)
      .sort((a, b) => (a.published_at! < b.published_at! ? 1 : -1));
    const newestPublishedAt = byNewest[0]?.published_at ?? null;
    const newestItemDate = byNewest[0]?.item_date ?? null;

    const ingestAgeHours = ageHours(newestPublishedAt);
    const stale = ingestAgeHours === null ? true : ingestAgeHours > STALE_HOURS;
    const healthy = !stale;

    const body = {
      ok: true,
      healthy,
      stale,
      staleThresholdHours: STALE_HOURS,
      newestItemDate,
      newestPublishedAt,
      ingestAgeHours,
      publishedCount: published.length,
      checkedAt: new Date().toISOString(),
    };

    const strict = new URL(req.url).searchParams.get("strict");
    return NextResponse.json(body, { status: strict && stale ? 503 : 200 });
  } catch (err) {
    return NextResponse.json(
      { ok: false, healthy: false, error: `${err}`.slice(0, 200) },
      { status: 503 }
    );
  }
}
