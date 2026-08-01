import { NextResponse } from "next/server";

// Server-only. Adds an email to the "Kodagu.ai Updates" tag in Kit (ConvertKit)
// via the v4 API. Creates the subscriber if new. The API key never reaches the
// browser.
export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const apiKey = process.env.KIT_API_KEY;
  const tagId = process.env.KIT_TAG_ID;
  if (!apiKey || !tagId) {
    return NextResponse.json(
      { error: "Signups aren’t configured yet. Please check back soon." },
      { status: 503 }
    );
  }

  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const kitHeaders = {
    "Content-Type": "application/json",
    "X-Kit-Api-Key": apiKey,
  };

  try {
    // 1) Create (or upsert) the subscriber by email.
    const createRes = await fetch("https://api.kit.com/v4/subscribers", {
      method: "POST",
      headers: kitHeaders,
      body: JSON.stringify({ email_address: email }),
    });
    if (!createRes.ok) {
      const detail = await createRes.text();
      console.error("Kit create-subscriber failed:", createRes.status, detail.slice(0, 300));
      return NextResponse.json(
        { error: "Could not subscribe you right now. Please try again shortly." },
        { status: 502 }
      );
    }
    const created = await createRes.json();
    const subscriberId = created?.subscriber?.id;
    if (!subscriberId) {
      console.error("Kit create-subscriber: no id in response");
      return NextResponse.json(
        { error: "Could not subscribe you right now. Please try again shortly." },
        { status: 502 }
      );
    }

    // 2) Add the "Kodagu.ai Updates" tag to that subscriber.
    const tagRes = await fetch(
      `https://api.kit.com/v4/tags/${tagId}/subscribers/${subscriberId}`,
      { method: "POST", headers: kitHeaders }
    );
    if (!tagRes.ok) {
      const detail = await tagRes.text();
      console.error("Kit tag failed:", tagRes.status, detail.slice(0, 300));
      // The subscriber was created; treat as success so we don't double-charge UX.
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Kit subscribe error:", err);
    return NextResponse.json(
      { error: "Could not reach the mailing list. Please try again shortly." },
      { status: 502 }
    );
  }
}
