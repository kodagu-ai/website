import { NextResponse } from "next/server";
import { TOWNS } from "../../../lib/almanac";

// Live weather for the five Kodagu towns via Open-Meteo (free, no key).
// Cached for 30 minutes so we don't hammer the upstream on every visit.
export const revalidate = 1800;

// WMO weather code → label + emoji (standard interpretation).
function describe(code: number): { label: string; icon: string } {
  const map: Record<number, [string, string]> = {
    0: ["Clear", "☀️"],
    1: ["Mainly clear", "🌤️"],
    2: ["Partly cloudy", "⛅"],
    3: ["Overcast", "☁️"],
    45: ["Fog", "🌫️"],
    48: ["Rime fog", "🌫️"],
    51: ["Light drizzle", "🌦️"],
    53: ["Drizzle", "🌦️"],
    55: ["Heavy drizzle", "🌧️"],
    61: ["Light rain", "🌦️"],
    63: ["Rain", "🌧️"],
    65: ["Heavy rain", "🌧️"],
    66: ["Freezing rain", "🌧️"],
    67: ["Freezing rain", "🌧️"],
    71: ["Light snow", "🌨️"],
    73: ["Snow", "🌨️"],
    75: ["Heavy snow", "❄️"],
    80: ["Rain showers", "🌦️"],
    81: ["Rain showers", "🌧️"],
    82: ["Violent showers", "⛈️"],
    95: ["Thunderstorm", "⛈️"],
    96: ["Thunderstorm", "⛈️"],
    99: ["Thunderstorm", "⛈️"],
  };
  return { label: map[code]?.[0] ?? "—", icon: map[code]?.[1] ?? "🌡️" };
}

export async function GET() {
  const lat = TOWNS.map((t) => t.lat).join(",");
  const lon = TOWNS.map((t) => t.lon).join(",");
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m` +
    `&daily=temperature_2m_max,temperature_2m_min` +
    `&timezone=Asia%2FKolkata&forecast_days=1`;

  try {
    const res = await fetch(url, { next: { revalidate: 1800 } });
    if (!res.ok) throw new Error(`open-meteo ${res.status}`);
    const data = await res.json();
    const arr = Array.isArray(data) ? data : [data];

    const towns = TOWNS.map((t, i) => {
      const d = arr[i] ?? {};
      const c = d.current ?? {};
      const daily = d.daily ?? {};
      const { label, icon } = describe(Number(c.weather_code));
      return {
        name: t.name,
        temp: Math.round(Number(c.temperature_2m)),
        feelsLike: Math.round(Number(c.apparent_temperature)),
        humidity: Math.round(Number(c.relative_humidity_2m)),
        wind: Math.round(Number(c.wind_speed_10m)),
        precip: Number(c.precipitation) || 0,
        hi: Math.round(Number(daily.temperature_2m_max?.[0])),
        lo: Math.round(Number(daily.temperature_2m_min?.[0])),
        label,
        icon,
      };
    });

    const dateLabel = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());

    const timeLabel = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date());

    return NextResponse.json(
      { dateLabel, timeLabel, towns },
      { headers: { "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600" } }
    );
  } catch (err) {
    console.error("almanac weather failed:", err);
    return NextResponse.json({ error: "weather unavailable" }, { status: 502 });
  }
}
