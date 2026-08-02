import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Kodagu Sankalpa — challenge entry submissions. Public form (no bearer, like
// the community directory submit); writes to sankalpa_entries via service_role
// (RLS on, no policies). Entries are reviewed before any are shortlisted.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const str = (v: unknown, max = 500): string | null =>
  typeof v === "string" ? v.trim().slice(0, max) || null : null;

// Readable label for a topic key (for the directory role/tags).
const AREA_LABELS: Record<string, string> = {
  open: "Open innovation",
  elephant: "Human–Elephant coexistence",
  coffee: "Coffee & spice livelihoods",
  monsoon: "Monsoon & landslide resilience",
  water: "Water security",
  waste: "Waste & plastics",
  tourism: "Responsible tourism",
  youth: "Youth skills & jobs",
  language: "Kodava language & heritage",
  labour: "Farm labour & mechanisation",
  health: "Rural health",
};

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

    // If the entrant opted in, also file them into the Kodagu.ai community
    // directory review queue (same table/flow as /api/directory/submit).
    // Non-fatal: a directory hiccup must not fail the challenge entry.
    if (body.joinDirectory === true) {
      const areaLabel = AREA_LABELS[row.area ?? "open"] ?? "Open innovation";
      const summary = (row.solution || row.problem || "").slice(0, 240);
      try {
        const dir = await supabase.from("directory_submissions").insert({
          type: entrantType === "team" ? "organization" : "person",
          name: entrantType === "team" ? row.team_name || row.name : row.name,
          role: "Kodagu Sankalpa entrant",
          location: row.place,
          blurb: `Kodagu Sankalpa entrant (${areaLabel}). ${summary}`.slice(0, 2000),
          tags: areaLabel,
          website: row.link,
          contact: row.email || row.phone, // private — for follow-up, not shown publicly
          consent: true,
        });
        if (dir.error) console.error("sankalpa→directory insert failed:", dir.error.message);
      } catch (e) {
        console.error("sankalpa→directory insert threw:", e);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("sankalpa entry failed:", err);
    return NextResponse.json({ error: "Could not save your entry." }, { status: 500 });
  }
}
