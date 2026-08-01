import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Secured write endpoint for the daily news curation agent. The agent gathers +
// scores news, then POSTs items here with a bearer secret. We apply the hybrid
// rule (🟢 confirmed → published, 🟡/🔴 → pending for review) and upsert by id
// so re-runs dedupe rather than duplicate.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const VALID_BADGES = new Set(["confirmed", "reported", "unverified"]);
const str = (v: unknown, max = 2000) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

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

  const now = new Date().toISOString();
  const rows = [];
  for (const raw of body.items.slice(0, 60)) {
    const it = raw as Record<string, unknown>;
    const id = str(it.id, 120).toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-|-$/g, "");
    const headline = str(it.headline, 300);
    const summary = str(it.summary, 1200);
    const category = str(it.category, 60);
    const badge = String(it.badge);
    if (!id || !headline || !summary || !category || !VALID_BADGES.has(badge)) continue;
    const published = badge === "confirmed";
    const sources = Array.isArray(it.sources)
      ? (it.sources as Record<string, unknown>[])
          .filter((s) => s && typeof s.url === "string")
          .map((s) => ({ name: str(s.name, 80) || "source", url: str(s.url, 500) }))
          .slice(0, 6)
      : [];
    rows.push({
      id,
      category,
      headline,
      summary,
      badge,
      score: Number.isFinite(Number(it.score)) ? Math.round(Number(it.score)) : null,
      sources,
      item_date: str(it.date, 40) || null,
      status: published ? "published" : "pending",
      published_at: published ? now : null,
    });
  }
  if (rows.length === 0)
    return NextResponse.json({ error: "no valid items" }, { status: 400 });

  try {
    const supabase = createClient(supaUrl, supaKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { error } = await supabase
      .from("news_items")
      .upsert(rows, { onConflict: "id", ignoreDuplicates: false });
    if (error) throw error;
    return NextResponse.json({
      ok: true,
      received: body.items.length,
      upserted: rows.length,
      published: rows.filter((r) => r.status === "published").length,
      pending: rows.filter((r) => r.status === "pending").length,
    });
  } catch (err) {
    console.error("news ingest failed:", err);
    return NextResponse.json({ error: "db error" }, { status: 500 });
  }
}
