import { NextResponse } from "next/server";
import { fetchHarangi, harangiStatus } from "../../../lib/harangi";

// Live Harangi reservoir status (the dam inside Kodagu — its level and releases
// drive downstream flooding at Kushalnagar). Uses the shared Firecrawl helper.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function GET() {
  const key = process.env.FIRECRAWL_API_KEY;
  if (!key) return NextResponse.json({ error: "not configured" }, { status: 503 });

  const d = await fetchHarangi(key);
  if (!d) return NextResponse.json({ error: "unavailable" }, { status: 502 });

  const { status, tone } = harangiStatus(d);

  return NextResponse.json(
    { ...d, status, tone },
    { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200" } }
  );
}
