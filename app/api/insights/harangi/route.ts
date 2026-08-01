import { NextResponse } from "next/server";

// Live Harangi reservoir status (the dam inside Kodagu — its level and releases
// drive downstream flooding at Kushalnagar). Scraped from a Cauvery-basin
// reservoir monitor via Firecrawl; % full computed from storage ÷ capacity.
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
        url: "https://tnagriculture.in/ARS/home/reservoir",
        formats: ["json"],
        maxAge: 3_600_000,
        jsonOptions: {
          prompt:
            "From the reservoir storage/flow table, read the Harangi row using the column headers. Return present (live) storage, gross/full capacity, inflow and outflow in cusecs, and the date.",
          schema: {
            type: "object",
            properties: {
              presentStorage: { type: "number" },
              grossCapacity: { type: "number" },
              inflowCusecs: { type: "number" },
              outflowCusecs: { type: "number" },
              date: { type: "string" },
            },
            required: ["presentStorage", "grossCapacity"],
          },
        },
      }),
    });
    if (!res.ok) return NextResponse.json({ error: "unavailable" }, { status: 502 });

    const j = (await res.json())?.data?.json;
    const storage = Number(j?.presentStorage);
    const capacity = Number(j?.grossCapacity);
    if (!storage || !capacity) return NextResponse.json({ error: "no data" }, { status: 502 });

    const pctFull = Math.round((storage / capacity) * 100);
    const inflow = Math.round(Number(j?.inflowCusecs) || 0);
    const outflow = Math.round(Number(j?.outflowCusecs) || 0);

    let tone = "calm";
    let status = "Comfortable storage";
    if (outflow >= 3000) {
      tone = "extreme";
      status = "Releasing water — watch downstream river levels";
    } else if (pctFull >= 90) {
      tone = "high";
      status = "Near capacity";
    } else if (pctFull >= 55) {
      tone = "wet";
      status = inflow > outflow ? "Filling" : "Steady";
    }

    return NextResponse.json(
      {
        pctFull,
        storageTMC: +(storage / 1000).toFixed(1),
        capacityTMC: +(capacity / 1000).toFixed(1),
        inflow,
        outflow,
        date: j?.date || null,
        status,
        tone,
      },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200" } }
    );
  } catch (err) {
    console.error("harangi route error:", err);
    return NextResponse.json({ error: "unavailable" }, { status: 502 });
  }
}
