import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { MARKET } from "../../../lib/almanac";

// Returns the latest price per displayed commodity from the history table,
// falling back to the static seed in lib/almanac.ts when the DB is empty or
// unavailable. Cached 1h.
export const runtime = "nodejs";
// Query the DB live (the scraper populates it out-of-band); the CDN caches the
// response via the Cache-Control header below, so Supabase isn't hit per visit.
export const dynamic = "force-dynamic";

function fmtAsOf(d?: string | null): string | undefined {
  if (!d) return undefined;
  const dt = new Date(d + "T00:00:00Z");
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(dt);
}

export async function GET() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Fallback to the static seed if the DB isn't wired up yet.
  if (!url || !key) return NextResponse.json({ items: MARKET, source: "static" });

  try {
    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data, error } = await supabase
      .from("commodity_prices")
      .select("crop,grade,price_text,unit,source,source_url,source_asof,captured_at")
      .order("captured_at", { ascending: false })
      .limit(200);
    if (error) throw error;

    const latest = new Map<string, (typeof data)[number]>();
    for (const row of data ?? []) {
      const k = `${row.crop}|${row.grade ?? ""}`;
      if (!latest.has(k)) latest.set(k, row);
    }

    // MARKET defines the display order + the fallback; override each with its
    // latest DB reading when available.
    const items = MARKET.map((seed) => {
      const row = latest.get(`${seed.crop}|${seed.grade ?? ""}`);
      if (row) {
        return {
          crop: row.crop,
          grade: row.grade ?? seed.grade,
          price: row.price_text,
          unit: row.unit,
          source: row.source,
          sourceUrl: row.source_url ?? seed.sourceUrl,
          asOf: fmtAsOf(row.source_asof) ?? seed.asOf,
        };
      }
      return seed; // static fallback for anything not yet in the DB (tea, paddy)
    });

    return NextResponse.json(
      { items, source: data && data.length ? "db" : "static" },
      { headers: { "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600" } }
    );
  } catch (err) {
    console.error("almanac prices read failed:", err);
    return NextResponse.json({ items: MARKET, source: "static-error" });
  }
}
