import { NextResponse } from "next/server";
import { TOWNS } from "../../../lib/almanac";
import { rainBand } from "../../../lib/climate";

// Live rainfall watch for the 5 Kodagu towns — daily precipitation for the last
// 3 days (accumulation / soil saturation proxy) and the next 3 (incl. today),
// via Open-Meteo. Free, no key. Cached 1h.
export const revalidate = 3600;

const sum = (a: number[]) => a.reduce((t, n) => t + (Number(n) || 0), 0);

export async function GET() {
  const lat = TOWNS.map((t) => t.lat).join(",");
  const lon = TOWNS.map((t) => t.lon).join(",");
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&daily=precipitation_sum&past_days=3&forecast_days=3&timezone=Asia%2FKolkata`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`open-meteo ${res.status}`);
    const data = await res.json();
    const arr = Array.isArray(data) ? data : [data];

    const towns = TOWNS.map((t, i) => {
      const daily = arr[i]?.daily?.precipitation_sum ?? [];
      // With past_days=3 & forecast_days=3 → [d-3, d-2, d-1, today, d+1, d+2]
      const recent = Math.round(sum(daily.slice(0, 3))); // last 3 completed days
      const upcoming = Math.round(sum(daily.slice(3, 6))); // today + next 2 days
      const band = rainBand(recent);
      return { name: t.name, recentMm: recent, forecastMm: upcoming, band: band.label, tone: band.tone };
    });

    const updated = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date());

    return NextResponse.json(
      { towns, updated },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200" } }
    );
  } catch (err) {
    console.error("rainfall watch failed:", err);
    return NextResponse.json({ error: "unavailable" }, { status: 502 });
  }
}
