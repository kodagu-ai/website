// Shared Harangi reservoir fetch (Cauvery-basin monitor via Firecrawl).
// Used by the live /api/insights/harangi route and the daily price cron.

export type HarangiData = {
  pctFull: number;
  storageTMC: number;
  capacityTMC: number;
  inflow: number;
  outflow: number;
  date: string | null;
};

export async function fetchHarangi(apiKey: string): Promise<HarangiData | null> {
  try {
    const res = await fetch("https://api.firecrawl.dev/v1/scrape", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
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
    if (!res.ok) {
      console.error("Firecrawl harangi failed:", res.status);
      return null;
    }
    const j = (await res.json())?.data?.json;
    const storage = Number(j?.presentStorage);
    const capacity = Number(j?.grossCapacity);
    if (!storage || !capacity) return null;
    return {
      pctFull: Math.round((storage / capacity) * 100),
      storageTMC: +(storage / 1000).toFixed(1),
      capacityTMC: +(capacity / 1000).toFixed(1),
      inflow: Math.round(Number(j?.inflowCusecs) || 0),
      outflow: Math.round(Number(j?.outflowCusecs) || 0),
      date: j?.date || null,
    };
  } catch (err) {
    console.error("fetchHarangi error:", err);
    return null;
  }
}

// Derive a plain status + tone from the numbers (shared by route + tile).
export function harangiStatus(d: HarangiData): { status: string; tone: string } {
  if (d.outflow >= 3000)
    return { status: "Releasing water — watch downstream river levels", tone: "extreme" };
  if (d.pctFull >= 90) return { status: "Near capacity", tone: "high" };
  if (d.pctFull >= 55)
    return { status: d.inflow > d.outflow ? "Filling" : "Steady", tone: "wet" };
  return { status: "Comfortable storage", tone: "calm" };
}
