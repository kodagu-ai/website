// ─────────────────────────────────────────────────────────────────────────────
//  Kodagu Coffee Intelligence — the "why are prices moving, when should I sell"
//  layer that connects global coffee markets to a Kodagu grower's farmgate price.
//
//  Live pieces (Arabica futures, USD/INR) come from /api/coffee/market.
//  The narrative + drivers below are synthesised from market news and refreshed
//  periodically. Each carries a date + source so nothing is presented as
//  certain. This is market information, NOT financial advice.
// ─────────────────────────────────────────────────────────────────────────────

export const COFFEE_ASOF = "1 Aug 2026";

// A plain-language read of the market, framed for a Kodagu (majority-Robusta)
// grower. Refresh these paragraphs when the market shifts materially.
export const OUTLOOK: string[] = [
  "Global coffee has pulled back from its July highs. Arabica on ICE New York is trading near current levels (shown live above), and London Robusta — the benchmark that matters most for Kodagu — has retreated from a 5-month high set in early July, after ICE raised margin requirements and a weaker Brazilian real prompted funds to unwind positions.",
  "Two forces are pulling in opposite directions. Supporting prices: low exchange inventories and rain-delayed harvesting in Brazil. Weighing on them: Brazil's record 2026/27 crop and rising exports from Vietnam and Colombia. The near term stays tight; the medium term looks better supplied.",
  "For Kodagu, the local link is Robusta, not the Arabica headlines. CPA's farmgate board broadly tracks London Robusta futures multiplied by the rupee. With USD/INR soft (shown live above), a weaker rupee cushions local prices even when global futures dip — so watch London Robusta and the rupee together.",
];

export type Driver = {
  effect: "up" | "down";
  text: string;
  source: string;
  url: string;
  date: string;
};

// What's pushing prices, with direction + source. ↑ = supportive, ↓ = bearish.
export const DRIVERS: Driver[] = [
  {
    effect: "down",
    text: "ICE margin hikes drained liquidity — Arabica fell ~4% and Robusta ~5% as funds unwound.",
    source: "Barchart",
    url: "https://www.barchart.com/story/news/2238703/coffee-prices-fall-as-brazils-coffee-harvest-expected-to-resume",
    date: "Jul 2026",
  },
  {
    effect: "down",
    text: "A weaker Brazilian real spurred long liquidation; September Arabica closed down ~4%.",
    source: "inkl",
    url: "https://www.inkl.com/news/coffee-prices-retreat-as-brazilian-real-weakness-spurs-long-liquidation",
    date: "30 Jul 2026",
  },
  {
    effect: "up",
    text: "Low inventories and heavy rains in Brazil pushed world coffee prices up sharply this week.",
    source: "Vietnam.vn",
    url: "https://www.vietnam.vn/en/gia-ca-phe-hom-nay-28-7-ton-kho-thap-mua-lon-tai-brazil-day-gia-ca-phe-the-gioi-tang-manh",
    date: "28 Jul 2026",
  },
  {
    effect: "down",
    text: "Brazil's record harvest and rising Vietnam & Colombia supply pressure prices medium-term.",
    source: "IndexBox · Conab",
    url: "https://www.indexbox.io/blog/coffee-prices-show-divergent-trends-in-domestic-and-international-markets-conab-report-june-2026/",
    date: "Jun 2026",
  },
];

// Kodagu-specific seasonality — sharpens as the price history table grows.
export const SEASONALITY =
  "Kodagu's Robusta harvest runs roughly December–February, when cherry and parchment move to market. Prices tend to firm through the lean pre-harvest months and soften as fresh crop arrives. As Kodagu.ai records each week's CPA board price, a data-driven sell-timing signal will build here.";

// The chain most growers never see spelled out.
export const CHAIN: { step: string; note: string }[] = [
  { step: "London Robusta futures", note: "Global supply & demand set the world Robusta price." },
  { step: "× USD/INR", note: "A weaker rupee lifts what that world price is worth in ₹." },
  { step: "− export & handling", note: "Freight, curing, margins are deducted." },
  { step: "= Indian farmgate", note: "The CPA board price you see for Kodagu." },
  { step: "→ your buyer", note: "The rate your local buyer finally offers." },
];
