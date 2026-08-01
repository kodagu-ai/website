import { NextResponse } from "next/server";

// Live London Robusta futures — the benchmark that matters most for Kodagu.
// No free API exists, so we scrape Investing.com via Firecrawl (renders JS,
// handles anti-bot) and read a structured quote. Edge-cached 30 min, and
// Firecrawl's own maxAge cache limits credit use.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function GET() {
  const key = process.env.FIRECRAWL_API_KEY;
  if (!key) return NextResponse.json({ error: "not configured" }, { status: 503 });

  try {
    const res = await fetch("https://api.firecrawl.dev/v1/scrape", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        url: "https://www.investing.com/commodities/london-coffee",
        formats: ["json"],
        maxAge: 1_800_000, // let Firecrawl serve a <30-min-old scrape to save credits
        jsonOptions: {
          prompt: "Extract the London Robusta Coffee futures quote.",
          schema: {
            type: "object",
            properties: {
              price: { type: "number" },
              previousClose: { type: "number" },
              currency: { type: "string" },
              contractMonth: { type: "string" },
            },
            required: ["price", "previousClose"],
          },
        },
      }),
    });
    if (!res.ok) {
      const t = await res.text();
      console.error("Firecrawl robusta failed:", res.status, t.slice(0, 200));
      return NextResponse.json({ error: "unavailable" }, { status: 502 });
    }
    const payload = await res.json();
    const j = payload?.data?.json;
    const price = Number(j?.price);
    const prev = Number(j?.previousClose);
    if (!price || !prev) return NextResponse.json({ error: "no data" }, { status: 502 });

    // Compute the change ourselves — the LLM's percent field is unreliable.
    const changePct = +(((price - prev) / prev) * 100).toFixed(2);

    return NextResponse.json(
      {
        price,
        prevClose: prev,
        changePct,
        currency: j.currency || "USD",
        contract: j.contractMonth || null,
        unit: "/ tonne",
        source: "ICE London (via Investing.com)",
        asOf: new Date().toISOString(),
      },
      { headers: { "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600" } }
    );
  } catch (err) {
    console.error("robusta route error:", err);
    return NextResponse.json({ error: "unavailable" }, { status: 502 });
  }
}
