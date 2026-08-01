import { NextResponse } from "next/server";
import { ingestNewsItems } from "../../../lib/newsIngest";

// Secured write endpoint for news items. A caller (the daily cron, or a manual
// run) POSTs curated items here with a bearer secret; ingestNewsItems applies
// the shared validation + hybrid publish rule (🟢 confirmed + 🟡 reported →
// published, 🔴 unverified → pending) and upserts by id.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function POST(req: Request) {
  const secret = process.env.NEWS_INGEST_SECRET;
  const supaUrl = process.env.SUPABASE_URL;
  const supaKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret || !supaUrl || !supaKey)
    return NextResponse.json({ error: "not configured" }, { status: 503 });
  if (req.headers.get("authorization") !== `Bearer ${secret}`)
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let body: { items?: unknown[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }
  if (!Array.isArray(body.items) || body.items.length === 0)
    return NextResponse.json({ error: "no items" }, { status: 400 });

  try {
    const result = await ingestNewsItems(body.items, supaUrl, supaKey);
    if (result.upserted === 0)
      return NextResponse.json({ error: "no valid items" }, { status: 400 });
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("news ingest failed:", err);
    return NextResponse.json({ error: "db error" }, { status: 500 });
  }
}
