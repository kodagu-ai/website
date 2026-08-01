// ─────────────────────────────────────────────────────────────────────────────
//  Kodagu Almanac — market prices + the towns we show weather for.
//
//  Weather is fetched live (Open-Meteo) via /api/almanac/weather.
//  Prices are the latest published figures from Kodagu sources, shown with the
//  source and the date they were last updated. To refresh, update the values
//  and `asOf` dates below (or wire the scheduled Firecrawl refresh).
// ─────────────────────────────────────────────────────────────────────────────

export type Town = { name: string; lat: number; lon: number };

// Five key towns across Kodagu district.
export const TOWNS: Town[] = [
  { name: "Madikeri", lat: 12.4208, lon: 75.7397 },
  { name: "Virajpet", lat: 12.1966, lon: 75.8069 },
  { name: "Kushalnagar", lat: 12.4646, lon: 75.956 },
  { name: "Somwarpet", lat: 12.5964, lon: 75.8497 },
  { name: "Gonikoppal", lat: 12.0499, lon: 75.9432 },
];

export type MarketItem = {
  crop: string;
  grade?: string;
  price: string;
  unit: string;
  source: string;
  sourceUrl: string;
  asOf: string;
};

// Latest published prices. Kodagu is primarily a Robusta coffee & pepper region.
export const MARKET: MarketItem[] = [
  {
    crop: "Coffee",
    grade: "Robusta Cherry",
    price: "₹9,400–10,200",
    unit: "/ 50 kg bag",
    source: "Coorg Planters’ Association",
    sourceUrl: "https://cpa.org.in",
    asOf: "16 Jun 2026",
  },
  {
    crop: "Coffee",
    grade: "Arabica Parchment",
    price: "₹21,500–22,200",
    unit: "/ 50 kg bag",
    source: "Coorg Planters’ Association",
    sourceUrl: "https://cpa.org.in",
    asOf: "16 Jun 2026",
  },
  {
    crop: "Pepper",
    grade: "Black pepper",
    price: "₹697",
    unit: "/ kg",
    source: "Coorg Planters’ Association",
    sourceUrl: "https://cpa.org.in",
    asOf: "16 Jun 2026",
  },
  {
    crop: "Paddy",
    grade: "Common (Dhan)",
    price: "₹2,650",
    unit: "/ quintal",
    source: "commodityonline · Madikeri APMC",
    sourceUrl:
      "https://www.commodityonline.com/mandiprices/district/karnataka/madikeri-kodagu/paddy-dhan-common",
    asOf: "6 Dec 2025",
  },
];
