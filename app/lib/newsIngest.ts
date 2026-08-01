import { createClient } from "@supabase/supabase-js";

// Shared news-ingest logic used by BOTH the public POST endpoint
// (/api/news/ingest) and the server-side daily cron (/api/cron/news), so the
// validation + hybrid publish rule live in exactly one place.
//
// Hybrid rule: 🟢 confirmed and 🟡 reported → published (both surface on the
// feed, each with its badge); 🔴 unverified → pending for human review.
// Upsert by id so re-runs dedupe rather than duplicate. `date` is the article's
// ISO publish date (YYYY-MM-DD); the reader keeps the feed to a recent window.

const VALID_BADGES = new Set(["confirmed", "reported", "unverified"]);
const str = (v: unknown, max = 2000) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export type IngestResult = {
  received: number;
  upserted: number;
  published: number;
  pending: number;
};

export async function ingestNewsItems(
  items: unknown[],
  supaUrl: string,
  supaKey: string
): Promise<IngestResult> {
  const now = new Date().toISOString();
  const rows = [];
  for (const raw of items.slice(0, 60)) {
    const it = raw as Record<string, unknown>;
    const id = str(it.id, 120)
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-|-$/g, "");
    const headline = str(it.headline, 300);
    const summary = str(it.summary, 1200);
    const category = str(it.category, 60);
    const badge = String(it.badge);
    if (!id || !headline || !summary || !category || !VALID_BADGES.has(badge)) continue;
    const published = badge === "confirmed" || badge === "reported";
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
    return { received: items.length, upserted: 0, published: 0, pending: 0 };

  const supabase = createClient(supaUrl, supaKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { error } = await supabase
    .from("news_items")
    .upsert(rows, { onConflict: "id", ignoreDuplicates: false });
  if (error) throw error;

  return {
    received: items.length,
    upserted: rows.length,
    published: rows.filter((r) => r.status === "published").length,
    pending: rows.filter((r) => r.status === "pending").length,
  };
}
