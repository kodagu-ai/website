import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Kodagu Shakthi Nadappu — walk registration. Free, but required and capped at
// 108 confirmed walkers. Public (no bearer, like the Sankalpa entry form);
// writes to shakti_registrations via service_role (RLS on, no policies).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CAP = 108;
const str = (v: unknown, max = 200): string | null =>
  typeof v === "string" ? v.trim().slice(0, max) || null : null;

// Non-fatal email notice to the organiser on each registration (Resend).
async function notifyOrganiser(row: Record<string, unknown>, remaining: number) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;
  const to = process.env.SHAKTI_NOTIFY_EMAIL || "machaiah@poonacha.com";
  const from = process.env.RESEND_FROM || "Kodagu Shakthi Nadappu <onboarding@resend.dev>";
  const s = (v: unknown) => (typeof v === "string" ? v : "");
  const line = (k: string, v: unknown) => (s(v) ? `${k}: ${s(v)}\n` : "");
  const text =
    "New Shakthi Nadappu registration\n\n" +
    line("Name", row.name) +
    line("Phone", row.phone) +
    line("Email", row.email) +
    line("Town", row.place) +
    line("Walking", row.distance) +
    line("Emergency", `${s(row.emergency_name)} ${s(row.emergency_phone)}`.trim() || null) +
    `\n${remaining} of ${CAP} places remaining.\n` +
    "\nReview registrations: https://www.kodagu.ai/admin/shakti";
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `Shakthi Nadappu registration: ${row.name || "(no name)"}`,
        text,
        reply_to: row.email || undefined,
      }),
    });
    if (!res.ok)
      console.error("shakti notify failed:", res.status, (await res.text()).slice(0, 200));
  } catch (e) {
    console.error("shakti notify threw:", e);
  }
}

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
  const phone = str(body.phone, 60);
  const distance = str(body.distance, 80);
  const emergency_name = str(body.emergencyName, 160);
  const emergency_phone = str(body.emergencyPhone, 60);
  const waiver = body.waiver === true;

  if (!name || !phone || !distance || !emergency_name || !emergency_phone)
    return NextResponse.json({ error: "Please fill all required fields." }, { status: 400 });
  if (!waiver)
    return NextResponse.json({ error: "Please confirm the fitness declaration." }, { status: 400 });

  try {
    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { fetch: (u, i) => fetch(u, { ...i, cache: "no-store" }) },
    });

    // Enforce the cap: count confirmed rows (filter in JS), reject at 108.
    const { data: existing, error: cErr } = await supabase
      .from("shakti_registrations")
      .select("status")
      .limit(2000);
    if (cErr) throw cErr;
    const registered = ((existing ?? []) as { status: string }[]).filter(
      (r) => r.status === "confirmed"
    ).length;
    if (registered >= CAP)
      return NextResponse.json({ error: "This year's walk is full.", full: true }, { status: 409 });

    const row = {
      name,
      phone,
      email: str(body.email, 200),
      place: str(body.place, 160),
      distance,
      emergency_name,
      emergency_phone,
      waiver: true,
      status: "confirmed",
    };
    const { error } = await supabase.from("shakti_registrations").insert(row);
    if (error) throw error;

    const remaining = Math.max(0, CAP - (registered + 1));
    await notifyOrganiser(row, remaining);
    return NextResponse.json({ ok: true, remaining });
  } catch (err) {
    console.error("shakti register failed:", err);
    return NextResponse.json({ error: "Could not save your registration." }, { status: 500 });
  }
}
