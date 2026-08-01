import { NextResponse } from "next/server";
import { fetchRobusta } from "../../../lib/robusta";

// Live London Robusta futures — the benchmark that matters most for Kodagu.
// Scrapes Investing.com via Firecrawl (shared helper). Edge-cached 30 min.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function GET() {
  const key = process.env.FIRECRAWL_API_KEY;
  if (!key) return NextResponse.json({ error: "not configured" }, { status: 503 });

  const q = await fetchRobusta(key);
  if (!q) return NextResponse.json({ error: "unavailable" }, { status: 502 });

  return NextResponse.json(
    {
      price: q.price,
      prevClose: q.prevClose,
      changePct: q.changePct,
      currency: q.currency,
      contract: q.contract,
      unit: "/ tonne",
      source: "ICE London (via Investing.com)",
      asOf: new Date().toISOString(),
    },
    { headers: { "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600" } }
  );
}
