import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Runs on the server only. Uses the Supabase service_role key (never exposed to
// the browser) to insert a submission. The table has RLS on with no policies,
// so this route is the only way in — the public can't write to it directly.
export const runtime = "nodejs";

const str = (v: unknown, max = 500) =>
  typeof v === "string" ? v.trim().slice(0, max) || null : null;

export async function POST(req: Request) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return NextResponse.json(
      { error: "The submission service is not configured yet." },
      { status: 503 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const type = body.type === "organization" ? "organization" : "person";
  const name = str(body.name, 200);
  const blurb = str(body.blurb, 2000);
  const consent = body.consent === true;

  if (!name || !blurb) {
    return NextResponse.json(
      { error: "Name and description are required." },
      { status: 400 }
    );
  }
  if (!consent) {
    return NextResponse.json(
      { error: "Consent is required to be listed." },
      { status: 400 }
    );
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { error } = await supabase.from("directory_submissions").insert({
    type,
    name,
    role: str(body.role, 200),
    location: str(body.location, 200),
    blurb,
    tags: str(body.tags, 300),
    website: str(body.website, 300),
    github: str(body.github, 300),
    projects: str(body.projects, 300),
    contact: str(body.contact, 200),
    consent: true,
  });

  if (error) {
    // Log server-side; return a generic message to the client.
    console.error("directory submission insert failed:", error.message);
    return NextResponse.json(
      { error: "Could not save your submission. Please try again shortly." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
