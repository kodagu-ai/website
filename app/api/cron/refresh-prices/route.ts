import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { fetchRobusta } from "../../../lib/robusta";

// Scheduled by Vercel Cron (see vercel.json). Scrapes the Coorg Planters'
// Association price board via Firecrawl (it renders JS) and appends one row per
// commodity to `commodity_prices` — building a history for analytics.
export const runtime = "nodejs";
export const maxDuration = 60;

// CPA crop label -> our (crop, grade, unit)
const CPA_MAP: Record<string, { crop: string; grade: string; unit: string }> = {
  "Arabica Parchment": { crop: "Coffee", grade: "Arabica Parchment", unit: "/ 50 kg bag" },
  "Arabica Cherry": { crop: "Coffee", grade: "Arabica Cherry", unit: "/ 50 kg bag" },
  "Robusta Parchment": { crop: "Coffee", grade: "Robusta Parchment", unit: "/ 50 kg bag" },
  "Robusta Cherry": { crop: "Coffee", grade: "Robusta Cherry", unit: "/ 50 kg bag" },
  Pepper: { crop: "Pepper", grade: "Black pepper", unit: "/ kg" },
  Cardamom: { crop: "Cardamom", grade: "", unit: "/ 50 kg" },
};

function toNumber(s: string): number {
  return Number(s.replace(/[^0-9.]/g, ""));
}

function parseDate(dmy?: string): string | null {
  if (!dmy) return null;
  const m = dmy.match(/(\d{2})\/(\d{2})\/(\d{4})/);
  return m ? `${m[3]}-${m[2]}-${m[1]}` : null;
}

type Row = {
  crop: string;
  grade: string | null;
  price_text: string;
  price_min: number;
  price_max: number;
  unit: string;
  source: string;
  source_url: string;
  source_asof: string | null;
};

function parseCpa(markdown: string): Row[] {
  const asOf = parseDate(markdown.match(/Last updated on\s+([\d/]+)/i)?.[1]);
  const rows: Row[] = [];
  const re =
    /###\s+(Arabica Parchment|Arabica Cherry|Robusta Parchment|Robusta Cherry|Pepper|Cardamom)\s*\n[\s\S]{0,60}?####\s*Rs\.?\s*([0-9,]+)\s*(?:-\s*([0-9,]+))?\s*\/\s*([^\n]+)/gi;
  let m: RegExpExecArray | null;
  const seen = new Set<string>();
  while ((m = re.exec(markdown))) {
    const label = m[1].trim();
    if (seen.has(label)) continue;
    seen.add(label);
    const cfg = CPA_MAP[label];
    if (!cfg) continue;
    const min = toNumber(m[2]);
    const max = m[3] ? toNumber(m[3]) : min;
    const price_text =
      max !== min
        ? `₹${min.toLocaleString("en-IN")}–${max.toLocaleString("en-IN")}`
        : `₹${min.toLocaleString("en-IN")}`;
    rows.push({
      crop: cfg.crop,
      grade: cfg.grade || null,
      price_text,
      price_min: min,
      price_max: max,
      unit: cfg.unit,
      source: "Coorg Planters’ Association",
      source_url: "https://cpa.org.in",
      source_asof: asOf,
    });
  }
  return rows;
}

export async function GET(req: Request) {
  // Auth: Vercel Cron sends `Authorization: Bearer ${CRON_SECRET}`.
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.get("authorization");
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const fcKey = process.env.FIRECRAWL_API_KEY;
  const supaUrl = process.env.SUPABASE_URL;
  const supaKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!fcKey || !supaUrl || !supaKey) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  try {
    const fc = await fetch("https://api.firecrawl.dev/v1/scrape", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${fcKey}` },
      body: JSON.stringify({
        url: "https://cpa.org.in",
        formats: ["markdown"],
        onlyMainContent: true,
      }),
    });
    if (!fc.ok) {
      const t = await fc.text();
      console.error("Firecrawl scrape failed:", fc.status, t.slice(0, 200));
      return NextResponse.json({ error: "scrape failed" }, { status: 502 });
    }
    const payload = await fc.json();
    const markdown: string = payload?.data?.markdown ?? "";
    const rows = parseCpa(markdown);
    if (rows.length === 0) {
      return NextResponse.json({ error: "no prices parsed" }, { status: 502 });
    }

    // Also record London Robusta futures — builds Kodagu's key benchmark into history.
    const rob = await fetchRobusta(fcKey);
    if (rob) {
      rows.push({
        crop: "Robusta (London)",
        grade: "ICE futures",
        price_text: `$${rob.price.toLocaleString("en-US")}`,
        price_min: rob.price,
        price_max: rob.price,
        unit: "/ tonne",
        source: "ICE London (via Investing.com)",
        source_url: "https://www.investing.com/commodities/london-coffee",
        source_asof: null,
      });
    }

    const supabase = createClient(supaUrl, supaKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { error } = await supabase.from("commodity_prices").insert(rows);
    if (error) {
      console.error("commodity_prices insert failed:", error.message);
      return NextResponse.json({ error: "db insert failed" }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      inserted: rows.length,
      asOf: rows[0]?.source_asof,
      crops: rows.map((r) => `${r.crop}${r.grade ? " / " + r.grade : ""}: ${r.price_text}`),
    });
  } catch (err) {
    console.error("refresh-prices error:", err);
    return NextResponse.json({ error: "unexpected" }, { status: 500 });
  }
}
