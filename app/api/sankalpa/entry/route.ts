import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Kodagu Sankalpa — challenge entry submissions. Public form (no bearer, like
// the community directory submit); writes to sankalpa_entries via service_role
// (RLS on, no policies). Entries are reviewed before any are shortlisted.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const str = (v: unknown, max = 500): string | null =>
  typeof v === "string" ? v.trim().slice(0, max) || null : null;

export async function POST(req: Request) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ error: "Not configured." }, { status: 503 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = str(body.name, 160);
  const problem = str(body.problem, 3000);
  const solution = str(body.solution, 3000);
  if (!name || !problem || !solution)
    return NextResponse.json({ error: "Name, problem and solution are required." }, { status: 400 });

  const entrantType = body.entrantType === "team" ? "team" : "individual";

  const row = {
    name,
    place: str(body.place, 160),
    phone: str(body.phone, 60),
    email: str(body.email, 200),
    entrant_type: entrantType,
    team_name: str(body.teamName, 160),
    area: str(body.area, 60),
    problem,
    solution,
    impact: str(body.impact, 3000),
    prior: str(body.prior, 3000),
    link: str(body.link, 500),
  };

  try {
    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { error } = await supabase.from("sankalpa_entries").insert(row);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("sankalpa entry failed:", err);
    return NextResponse.json({ error: "Could not save your entry." }, { status: 500 });
  }
}
