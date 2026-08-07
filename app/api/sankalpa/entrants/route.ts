import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Public, privacy-limited feed of recent Sankalpa entrants, for the page ticker.
// Exposes ONLY a first name + town — never contact details, email, phone, or the
// idea itself — and skips rejected entries. Read-only, no-store so it stays live.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ entrants: [], count: 0 });

  try {
    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { fetch: (u, i) => fetch(u, { ...i, cache: "no-store" }) },
    });
    const { data, error } = await supabase
      .from("sankalpa_entries")
      .select("name,place,status,created_at")
      .limit(300);
    if (error) throw error;

    const rows = ((data ?? []) as {
      name: string | null;
      place: string | null;
      status: string;
      created_at: string;
    }[])
      .filter((r) => r.name && r.status !== "rejected")
      .sort((a, b) => (a.created_at < b.created_at ? 1 : -1));

    // First name only + town. Nothing else leaves the server.
    const entrants = rows.slice(0, 40).map((r) => ({
      firstName: (r.name || "").trim().split(/\s+/)[0].slice(0, 24),
      place: ((r.place || "").trim() || null)?.slice(0, 40) ?? null,
    }));

    return NextResponse.json({ entrants, count: rows.length });
  } catch (err) {
    console.error("sankalpa entrants failed:", err);
    return NextResponse.json({ entrants: [], count: 0 });
  }
}
