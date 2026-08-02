import { NextResponse } from "next/server";
import { getAdminUser, serviceClient } from "../../../lib/adminAuth";

// Admin-only: change a directory submission's review status. Auth-gated to the
// single admin; the write uses the service-role client (bypasses RLS) only
// AFTER the admin identity is verified. Approving publishes to /community.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VALID = new Set(["pending", "approved", "rejected"]);

export async function POST(req: Request) {
  const user = await getAdminUser();
  if (!user) return NextResponse.json({ error: "Not authorized." }, { status: 401 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const id = typeof body.id === "string" ? body.id : "";
  const status = typeof body.status === "string" ? body.status : "";
  if (!id || !VALID.has(status))
    return NextResponse.json({ error: "Bad id or status." }, { status: 400 });

  try {
    const { error } = await serviceClient()
      .from("directory_submissions")
      .update({ status })
      .eq("id", id);
    if (error) throw error;
    return NextResponse.json({ ok: true, status });
  } catch (err) {
    console.error("admin directory update failed:", err);
    return NextResponse.json({ error: "Update failed." }, { status: 500 });
  }
}
