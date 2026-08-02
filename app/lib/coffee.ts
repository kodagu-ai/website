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
type Loc = "en" | "kn";

export const OUTLOOK: Record<Loc, string[]> = {
  en: [
    "Global coffee has pulled back from its July highs. Arabica on ICE New York is trading near current levels (shown live above), and London Robusta — the benchmark that matters most for Kodagu — has retreated from a 5-month high set in early July, after ICE raised margin requirements and a weaker Brazilian real prompted funds to unwind positions.",
    "Two forces are pulling in opposite directions. Supporting prices: low exchange inventories and rain-delayed harvesting in Brazil. Weighing on them: Brazil's record 2026/27 crop and rising exports from Vietnam and Colombia. The near term stays tight; the medium term looks better supplied.",
    "For Kodagu, the local link is Robusta, not the Arabica headlines. CPA's farmgate board broadly tracks London Robusta futures multiplied by the rupee. With USD/INR soft (shown live above), a weaker rupee cushions local prices even when global futures dip — so watch London Robusta and the rupee together.",
  ],
  kn: [
    "ಜಾಗತಿಕ ಕಾಫಿ ತನ್ನ ಜುಲೈ ಗರಿಷ್ಠದಿಂದ ಹಿಂಜರಿದಿದೆ. ICE ನ್ಯೂಯಾರ್ಕ್‌ನಲ್ಲಿ ಅರೇಬಿಕಾ ಪ್ರಸ್ತುತ ಮಟ್ಟದ ಸಮೀಪ ವಹಿವಾಟಾಗುತ್ತಿದೆ (ಮೇಲೆ ಲೈವ್ ತೋರಿಸಲಾಗಿದೆ), ಮತ್ತು ಕೊಡಗಿಗೆ ಅತ್ಯಂತ ಮುಖ್ಯವಾದ ಮಾನದಂಡವಾದ ಲಂಡನ್ ರೊಬಸ್ಟಾ — ICE ಮಾರ್ಜಿನ್ ಅಗತ್ಯಗಳನ್ನು ಏರಿಸಿ, ದುರ್ಬಲ ಬ್ರೆಜಿಲಿಯನ್ ರಿಯಲ್ ನಿಧಿಗಳು ಸ್ಥಾನಗಳನ್ನು ಬಿಚ್ಚಿಡಲು ಪ್ರೇರೇಪಿಸಿದ ನಂತರ, ಜುಲೈ ಆರಂಭದ 5-ತಿಂಗಳ ಗರಿಷ್ಠದಿಂದ ಹಿಂಜರಿದಿದೆ.",
    "ಎರಡು ಶಕ್ತಿಗಳು ವಿರುದ್ಧ ದಿಕ್ಕಿನಲ್ಲಿ ಎಳೆಯುತ್ತಿವೆ. ಬೆಲೆಗಳಿಗೆ ಬೆಂಬಲ: ಕಡಿಮೆ ವಿನಿಮಯ ದಾಸ್ತಾನು ಮತ್ತು ಬ್ರೆಜಿಲ್‌ನಲ್ಲಿ ಮಳೆಯಿಂದ ವಿಳಂಬವಾದ ಕೊಯ್ಲು. ಒತ್ತಡ: ಬ್ರೆಜಿಲ್‌ನ ದಾಖಲೆ 2026/27 ಬೆಳೆ ಮತ್ತು ವಿಯೆಟ್ನಾಂ ಹಾಗೂ ಕೊಲಂಬಿಯಾದಿಂದ ಏರುತ್ತಿರುವ ರಫ್ತು. ಸಮೀಪ ಅವಧಿ ಬಿಗಿಯಾಗಿದೆ; ಮಧ್ಯಮ ಅವಧಿ ಉತ್ತಮ ಪೂರೈಕೆ ಕಾಣುತ್ತದೆ.",
    "ಕೊಡಗಿಗೆ, ಸ್ಥಳೀಯ ಕೊಂಡಿ ಅರೇಬಿಕಾ ಸುದ್ದಿಗಳಲ್ಲ, ರೊಬಸ್ಟಾ. CPA ಯ farmgate ಬೋರ್ಡ್ ಸ್ಥೂಲವಾಗಿ ಲಂಡನ್ ರೊಬಸ್ಟಾ ಫ್ಯೂಚರ್ಸ್ ಅನ್ನು ರೂಪಾಯಿಯಿಂದ ಗುಣಿಸಿದಂತೆ ಅನುಸರಿಸುತ್ತದೆ. USD/INR ದುರ್ಬಲವಾಗಿದ್ದಾಗ (ಮೇಲೆ ಲೈವ್), ಜಾಗತಿಕ ಫ್ಯೂಚರ್ಸ್ ಕುಸಿದರೂ ದುರ್ಬಲ ರೂಪಾಯಿ ಸ್ಥಳೀಯ ಬೆಲೆಗಳಿಗೆ ಆಸರೆ ನೀಡುತ್ತದೆ — ಆದ್ದರಿಂದ ಲಂಡನ್ ರೊಬಸ್ಟಾ ಮತ್ತು ರೂಪಾಯಿಯನ್ನು ಒಟ್ಟಿಗೆ ಗಮನಿಸಿ.",
  ],
};

export type Driver = {
  effect: "up" | "down";
  text: string;
  textKn: string;
  source: string;
  url: string;
  date: string;
};

// What's pushing prices, with direction + source. ↑ = supportive, ↓ = bearish.
export const DRIVERS: Driver[] = [
  {
    effect: "down",
    text: "ICE margin hikes drained liquidity — Arabica fell ~4% and Robusta ~5% as funds unwound.",
    textKn: "ICE ಮಾರ್ಜಿನ್ ಏರಿಕೆ ದ್ರವ್ಯತೆಯನ್ನು ಬರಿದಾಗಿಸಿತು — ನಿಧಿಗಳು ಬಿಚ್ಚಿಟ್ಟಂತೆ ಅರೇಬಿಕಾ ~4% ಮತ್ತು ರೊಬಸ್ಟಾ ~5% ಕುಸಿದವು.",
    source: "Barchart",
    url: "https://www.barchart.com/story/news/2238703/coffee-prices-fall-as-brazils-coffee-harvest-expected-to-resume",
    date: "Jul 2026",
  },
  {
    effect: "down",
    text: "A weaker Brazilian real spurred long liquidation; September Arabica closed down ~4%.",
    textKn: "ದುರ್ಬಲ ಬ್ರೆಜಿಲಿಯನ್ ರಿಯಲ್ ಲಾಂಗ್ ಲಿಕ್ವಿಡೇಶನ್‌ಗೆ ಪ್ರೇರೇಪಿಸಿತು; ಸೆಪ್ಟೆಂಬರ್ ಅರೇಬಿಕಾ ~4% ಇಳಿಕೆಯೊಂದಿಗೆ ಮುಚ್ಚಿತು.",
    source: "inkl",
    url: "https://www.inkl.com/news/coffee-prices-retreat-as-brazilian-real-weakness-spurs-long-liquidation",
    date: "30 Jul 2026",
  },
  {
    effect: "up",
    text: "Low inventories and heavy rains in Brazil pushed world coffee prices up sharply this week.",
    textKn: "ಕಡಿಮೆ ದಾಸ್ತಾನು ಮತ್ತು ಬ್ರೆಜಿಲ್‌ನಲ್ಲಿ ಭಾರೀ ಮಳೆ ಈ ವಾರ ವಿಶ್ವ ಕಾಫಿ ಬೆಲೆಗಳನ್ನು ತೀವ್ರವಾಗಿ ಏರಿಸಿತು.",
    source: "Vietnam.vn",
    url: "https://www.vietnam.vn/en/gia-ca-phe-hom-nay-28-7-ton-kho-thap-mua-lon-tai-brazil-day-gia-ca-phe-the-gioi-tang-manh",
    date: "28 Jul 2026",
  },
  {
    effect: "down",
    text: "Brazil's record harvest and rising Vietnam & Colombia supply pressure prices medium-term.",
    textKn: "ಬ್ರೆಜಿಲ್‌ನ ದಾಖಲೆ ಕೊಯ್ಲು ಮತ್ತು ಏರುತ್ತಿರುವ ವಿಯೆಟ್ನಾಂ ಹಾಗೂ ಕೊಲಂಬಿಯಾ ಪೂರೈಕೆ ಮಧ್ಯಮ-ಅವಧಿಯಲ್ಲಿ ಬೆಲೆಗಳ ಮೇಲೆ ಒತ್ತಡ ಹೇರುತ್ತದೆ.",
    source: "IndexBox · Conab",
    url: "https://www.indexbox.io/blog/coffee-prices-show-divergent-trends-in-domestic-and-international-markets-conab-report-june-2026/",
    date: "Jun 2026",
  },
];

// Kodagu-specific seasonality — sharpens as the price history table grows.
export const SEASONALITY: Record<Loc, string> = {
  en: "Kodagu's Robusta harvest runs roughly December–February, when cherry and parchment move to market. Prices tend to firm through the lean pre-harvest months and soften as fresh crop arrives. As Kodagu.ai records each week's CPA board price, a data-driven sell-timing signal will build here.",
  kn: "ಕೊಡಗಿನ ರೊಬಸ್ಟಾ ಕೊಯ್ಲು ಸ್ಥೂಲವಾಗಿ ಡಿಸೆಂಬರ್–ಫೆಬ್ರವರಿ ನಡೆಯುತ್ತದೆ, ಆಗ ಚೆರಿ ಮತ್ತು ಪಾರ್ಚ್‌ಮೆಂಟ್ ಮಾರುಕಟ್ಟೆಗೆ ಬರುತ್ತವೆ. ಕೊಯ್ಲಿಗೆ ಮುಂಚಿನ ಕೊರತೆಯ ತಿಂಗಳುಗಳಲ್ಲಿ ಬೆಲೆಗಳು ಬಿಗಿಯಾಗುತ್ತವೆ ಮತ್ತು ಹೊಸ ಬೆಳೆ ಬಂದಂತೆ ಮೃದುವಾಗುತ್ತವೆ. Kodagu.ai ಪ್ರತಿ ವಾರದ CPA ಬೋರ್ಡ್ ಬೆಲೆಯನ್ನು ದಾಖಲಿಸಿದಂತೆ, ಡೇಟಾ-ಆಧಾರಿತ ಮಾರಾಟ-ಸಮಯ ಸೂಚನೆ ಇಲ್ಲಿ ರೂಪುಗೊಳ್ಳುತ್ತದೆ.",
};

// The chain most growers never see spelled out.
export const CHAIN: { step: string; stepKn: string; note: string; noteKn: string }[] = [
  { step: "London Robusta futures", stepKn: "ಲಂಡನ್ ರೊಬಸ್ಟಾ ಫ್ಯೂಚರ್ಸ್", note: "Global supply & demand set the world Robusta price.", noteKn: "ಜಾಗತಿಕ ಪೂರೈಕೆ ಮತ್ತು ಬೇಡಿಕೆ ವಿಶ್ವ ರೊಬಸ್ಟಾ ಬೆಲೆಯನ್ನು ನಿಗದಿಪಡಿಸುತ್ತವೆ." },
  { step: "× USD/INR", stepKn: "× USD/INR", note: "A weaker rupee lifts what that world price is worth in ₹.", noteKn: "ದುರ್ಬಲ ರೂಪಾಯಿ ಆ ವಿಶ್ವ ಬೆಲೆ ₹ ನಲ್ಲಿ ಎಷ್ಟು ಮೌಲ್ಯ ಎಂಬುದನ್ನು ಏರಿಸುತ್ತದೆ." },
  { step: "− export & handling", stepKn: "− ರಫ್ತು ಮತ್ತು ನಿರ್ವಹಣೆ", note: "Freight, curing, margins are deducted.", noteKn: "ಸಾಗಣೆ, ಕ್ಯೂರಿಂಗ್, ಮಾರ್ಜಿನ್‌ಗಳನ್ನು ಕಳೆಯಲಾಗುತ್ತದೆ." },
  { step: "= Indian farmgate", stepKn: "= ಭಾರತೀಯ farmgate", note: "The CPA board price you see for Kodagu.", noteKn: "ಕೊಡಗಿಗೆ ನೀವು ನೋಡುವ CPA ಬೋರ್ಡ್ ಬೆಲೆ." },
  { step: "→ your buyer", stepKn: "→ ನಿಮ್ಮ ಖರೀದಿದಾರ", note: "The rate your local buyer finally offers.", noteKn: "ನಿಮ್ಮ ಸ್ಥಳೀಯ ಖರೀದಿದಾರ ಕೊನೆಗೆ ನೀಡುವ ದರ." },
];
