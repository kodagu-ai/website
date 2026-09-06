import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Public, read-only live count for the Shakthi Nadappu registration counter.
// Exposes only aggregate numbers (never any registrant detail). Cap is 108.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CAP = 108;

export async function GET() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key)
    return NextResponse.json({ registered: 0, cap: CAP, remaining: CAP, full: false });

  try {
    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { fetch: (u, i) => fetch(u, { ...i, cache: "no-store" }) },
    });
    const { data, error } = await supabase
      .from("shakthi_registrations")
      .select("status")
      .limit(2000);
    if (error) throw error;
    // Filter in JS (avoids the pooled-PostgREST predicate quirk we hit elsewhere).
    const registered = ((data ?? []) as { status: string }[]).filter(
      (r) => r.status === "confirmed"
    ).length;
    const remaining = Math.max(0, CAP - registered);
    return NextResponse.json({ registered, cap: CAP, remaining, full: remaining <= 0 });
  } catch (err) {
    console.error("shakthi count failed:", err);
    return NextResponse.json({ registered: 0, cap: CAP, remaining: CAP, full: false });
  }
}
