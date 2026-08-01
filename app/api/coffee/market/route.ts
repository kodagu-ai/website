import { NextResponse } from "next/server";

// Live global benchmarks: Arabica coffee futures (ICE, via Yahoo) + USD/INR.
// Both free, no key. Cached 30 min. Robusta has no free live feed, so the page
// covers it qualitatively in the synthesised outlook.
export const revalidate = 1800;

async function yahooQuote(symbol: string) {
  const res = await fetch(
    `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=5d`,
    { headers: { "User-Agent": "Mozilla/5.0" }, next: { revalidate: 1800 } }
  );
  if (!res.ok) throw new Error(`yahoo ${symbol} ${res.status}`);
  const m = (await res.json())?.chart?.result?.[0]?.meta;
  if (!m?.regularMarketPrice) throw new Error("no price");
  const price = m.regularMarketPrice;
  const prev = m.chartPreviousClose ?? price;
  return {
    price,
    prevClose: prev,
    changePct: prev ? ((price - prev) / prev) * 100 : 0,
    currency: m.currency,
  };
}

export async function GET() {
  const out: Record<string, unknown> = { asOf: new Date().toISOString() };

  // Arabica futures (KC=F is quoted in US cents/lb).
  try {
    const a = await yahooQuote("KC=F");
    out.arabica = {
      // convert US cents/lb → US$/lb for readability
      usdPerLb: +(a.price / 100).toFixed(2),
      centsPerLb: +a.price.toFixed(1),
      changePct: +a.changePct.toFixed(1),
    };
  } catch (e) {
    console.error("arabica fetch failed:", e);
    out.arabica = null;
  }

  // USD/INR
  try {
    const fx = await fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 1800 },
    }).then((r) => r.json());
    const inr = fx?.rates?.INR;
    if (inr) out.usdInr = +Number(inr).toFixed(2);
    else out.usdInr = null;
  } catch (e) {
    console.error("fx fetch failed:", e);
    out.usdInr = null;
  }

  return NextResponse.json(out, {
    headers: { "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600" },
  });
}
