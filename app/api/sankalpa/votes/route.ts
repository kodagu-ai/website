import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Kodagu Sankalpa — community vote to pick 2027's four quarterly challenges.
// GET returns live tallies; POST casts a ballot (up to 3 of the 10 topics).
// Both go through the service_role key (RLS on, no policies on sankalpa_votes).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Server-side allow-list — the only topic keys a ballot may contain. Keep in
// sync with the vote cards in public/sankalpa/index.html.
const TOPIC_KEYS = [
  "elephant",
  "coffee",
  "monsoon",
  "water",
  "waste",
  "tourism",
  "youth",
  "language",
  "labour",
  "health",
] as const;
const VALID = new Set<string>(TOPIC_KEYS);
const MAX_PICKS = 3;

function client(url: string, key: string) {
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    // Bypass Next's Data Cache so tallies are always fresh.
    global: { fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }) },
  });
}

async function tally(supabase: ReturnType<typeof client>) {
  const { data, error } = await supabase.from("sankalpa_votes").select("topic_key").limit(100000);
  if (error) throw error;
  const tallies: Record<string, number> = {};
  for (const k of TOPIC_KEYS) tallies[k] = 0;
  for (const row of (data ?? []) as { topic_key: string }[]) {
    if (row.topic_key in tallies) tallies[row.topic_key]++;
  }
  const total = Object.values(tallies).reduce((a, b) => a + b, 0);
  return { tallies, total };
}

export async function GET() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ error: "not configured" }, { status: 503 });
  try {
    return NextResponse.json(await tally(client(url, key)));
  } catch (err) {
    console.error("sankalpa votes GET failed:", err);
    return NextResponse.json({ error: "db error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ error: "not configured" }, { status: 503 });

  let body: { ballotId?: unknown; topics?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const ballotId = typeof body.ballotId === "string" ? body.ballotId.trim().slice(0, 64) : "";
  if (!ballotId) return NextResponse.json({ error: "missing ballot" }, { status: 400 });

  // Validate + dedupe the picks against the allow-list; cap at MAX_PICKS.
  const picks = Array.isArray(body.topics)
    ? [...new Set(body.topics.filter((t): t is string => typeof t === "string" && VALID.has(t)))].slice(0, MAX_PICKS)
    : [];
  if (picks.length === 0) return NextResponse.json({ error: "no valid topics" }, { status: 400 });

  try {
    const supabase = client(url, key);
    // One ballot per browser: clear this ballot's prior votes, then insert fresh.
    const del = await supabase.from("sankalpa_votes").delete().eq("ballot_id", ballotId);
    if (del.error) throw del.error;
    const ins = await supabase
      .from("sankalpa_votes")
      .insert(picks.map((topic_key) => ({ ballot_id: ballotId, topic_key })));
    if (ins.error) throw ins.error;
    return NextResponse.json({ ok: true, ...(await tally(supabase)) });
  } catch (err) {
    console.error("sankalpa votes POST failed:", err);
    return NextResponse.json({ error: "db error" }, { status: 500 });
  }
}
