// ─────────────────────────────────────────────────────────────────────────────
//  Kodagu Today — the verified daily news brief.
//
//  PROTOTYPE DATA: these are real items gathered from news sources, each with a
//  Trust Score. In production this table is filled daily by a scheduled agent
//  (Firecrawl gather → cluster/categorise/summarise/score → Supabase), with
//  🟢 Confirmed items auto-published and 🟡/🔴 held for review (hybrid model).
//
//  PRINCIPLE: aggregation, not original reporting. Every item links to its
//  sources. We never originate a claim, and we only publish items about
//  individuals when they are corroborated and in the public interest.
// ─────────────────────────────────────────────────────────────────────────────

export type TrustBadge = "confirmed" | "reported" | "unverified";

export type NewsCategory =
  | "People"
  | "Culture & Heritage"
  | "Sports"
  | "Agriculture"
  | "Technology"
  | "Business & Community"
  | "Environment & Wildlife"
  | "Civic & Governance"
  | "World & Kodagu";

// `key` is the stable match value stored on each item; `kn` is the Kannada
// display label shown when the site is in Kannada (the key never changes).
export const CATEGORIES: { key: NewsCategory; icon: string; kn: string }[] = [
  { key: "People", icon: "🧑", kn: "ಜನ" },
  { key: "Culture & Heritage", icon: "🪔", kn: "ಸಂಸ್ಕೃತಿ ಮತ್ತು ಪರಂಪರೆ" },
  // Kodagu is the "cradle of Indian hockey" — the Kodava Hockey Festival, KHPL,
  // and Kodava players in the national side make Sports a live, on-brand beat.
  { key: "Sports", icon: "🏑", kn: "ಕ್ರೀಡೆ" },
  { key: "Agriculture", icon: "🌱", kn: "ಕೃಷಿ" },
  { key: "Technology", icon: "💻", kn: "ತಂತ್ರಜ್ಞಾನ" },
  { key: "Business & Community", icon: "🏪", kn: "ವ್ಯಾಪಾರ ಮತ್ತು ಸಮುದಾಯ" },
  { key: "Environment & Wildlife", icon: "🐘", kn: "ಪರಿಸರ ಮತ್ತು ವನ್ಯಜೀವಿ" },
  { key: "Civic & Governance", icon: "🏛️", kn: "ನಾಗರಿಕ ಮತ್ತು ಆಡಳಿತ" },
  { key: "World & Kodagu", icon: "🌍", kn: "ಜಗತ್ತು ಮತ್ತು ಕೊಡಗು" },
];

export const BADGES: Record<
  TrustBadge,
  { label: string; labelKn: string; dot: string; note: string; noteKn: string }
> = {
  confirmed: {
    label: "Confirmed",
    labelKn: "ದೃಢೀಕೃತ",
    dot: "🟢",
    note: "Official source, or 2+ reliable outlets agree.",
    noteKn: "ಅಧಿಕೃತ ಮೂಲ, ಅಥವಾ 2+ ವಿಶ್ವಾಸಾರ್ಹ ಮಾಧ್ಯಮಗಳ ಒಪ್ಪಿಗೆ.",
  },
  reported: {
    label: "Reported",
    labelKn: "ವರದಿ",
    dot: "🟡",
    note: "One reliable outlet — not yet corroborated.",
    noteKn: "ಒಂದು ವಿಶ್ವಾಸಾರ್ಹ ಮಾಧ್ಯಮ — ಇನ್ನೂ ಖಚಿತಪಡಿಸಿಲ್ಲ.",
  },
  unverified: {
    label: "Unverified",
    labelKn: "ಪರಿಶೀಲಿಸದ",
    dot: "🔴",
    note: "Single low-tier or social source — treat with caution.",
    noteKn: "ಒಂದೇ ಕೆಳಮಟ್ಟದ ಅಥವಾ ಸಾಮಾಜಿಕ ಮೂಲ — ಎಚ್ಚರಿಕೆಯಿಂದ ಪರಿಗಣಿಸಿ.",
  },
};

export type NewsItem = {
  id: string;
  category: NewsCategory;
  headline: string;
  summary: string;
  // Optional Kannada rendering of the same item (filled by the bilingual
  // pipeline); the feed falls back to the English headline/summary when absent.
  headlineKn?: string;
  summaryKn?: string;
  badge: TrustBadge;
  score: number; // 0–100
  sources: { name: string; url: string }[];
  date: string;
};

// The Trust Score is transparent by design — every item shows its sources.
export const NEWS: NewsItem[] = [
  {
    id: "elephant-conflict-deaths",
    category: "Environment & Wildlife",
    headline: "Human–elephant conflict deaths mount across Kodagu",
    summary:
      "A run of fatal wild-elephant attacks — including a coffee planter and the wife of a senior IPS officer at estates near Gonikoppal — has renewed alarm over human–elephant conflict, with several deaths reported across the district this year.",
    badge: "confirmed",
    score: 91,
    sources: [
      { name: "New Indian Express", url: "https://www.newindianexpress.com/states/karnataka/2026/Jun/05/wife-of-senior-ips-officer-dies-in-elephant-attack-near-gonikoppal-in-south-coorg" },
      { name: "The Hindu", url: "https://www.thehindu.com/news/national/karnataka/coffee-planter-killed-in-elephant-attack-in-kodagu/article70838708.ece" },
      { name: "Indian Express", url: "https://indianexpress.com/article/cities/bangalore/kodagu-elephant-attack-ips-officers-wife-killed-coffee-estate-10726824/" },
    ],
    date: "Jun 2026",
  },
  {
    id: "dubare-elephant-debate",
    category: "Environment & Wildlife",
    headline: "Dubare elephant-camp tragedy reignites the captive-elephant debate",
    summary:
      "A death at the Dubare elephant camp has renewed debate over captive-elephant tourism and habitat pressure in Kodagu. (Single analysis source — read critically.)",
    badge: "reported",
    score: 63,
    sources: [
      { name: "Daily Pioneer", url: "https://dailypioneer.com/news/dubare-tragedy-the-dangerous-illusion-of-tamed-elephants" },
    ],
    date: "May 2026",
  },
  {
    id: "homestay-registration",
    category: "Civic & Governance",
    headline: "Kodagu DC orders homestays to finish registration and renewal",
    summary:
      "The Deputy Commissioner directed officials to complete registration of new homestays and renew existing licences by the deadline — part of a push to regulate the district's booming stay tourism.",
    badge: "confirmed",
    score: 84,
    sources: [
      { name: "The Hindu", url: "https://www.thehindu.com/news/national/karnataka/complete-registration-and-renewal-of-homestays-by-march-31-kodagu-dc/article70611472.ece" },
    ],
    date: "Feb 2026",
  },
  {
    id: "disaster-readiness",
    category: "Civic & Governance",
    headline: "Police review monsoon disaster readiness in Kodagu",
    summary:
      "The Superintendent of Police reviewed precautionary measures for floods and landslides ahead of the monsoon, coordinating rescue and response across the district.",
    badge: "confirmed",
    score: 80,
    sources: [
      { name: "Times of India", url: "https://timesofindia.indiatimes.com/city/mysuru/sp-reviews-disaster-readiness-in-kodagu-district/articleshow/130997044.cms" },
    ],
    date: "May 2026",
  },
  {
    id: "ndps-spike",
    category: "Civic & Governance",
    headline: "Kodagu reports a spike in narcotics (NDPS) cases",
    summary:
      "Police registered dozens of narcotics cases in a single month, pointing to a rise in drug peddling and use in the district — official figures, reported by one outlet.",
    badge: "reported",
    score: 74,
    sources: [
      { name: "Times of India", url: "https://timesofindia.indiatimes.com/city/mysuru/kodagu-sees-spike-in-drug-cases-63-ndps-cases-registered-in-jan/articleshow/127915400.cms" },
    ],
    date: "Feb 2026",
  },
  {
    id: "tourism-safe",
    category: "Business & Community",
    headline: "Coorg hoteliers say Kodagu is safe for tourists",
    summary:
      "The Coorg Hotels and Resorts Association convened stakeholders to reassure visitors the district is safe, after weather and conflict concerns. (Industry-body claim — one source.)",
    badge: "reported",
    score: 70,
    sources: [
      { name: "Times of India", url: "https://timesofindia.indiatimes.com/city/mysuru/coorg-hotels-and-resorts-association-says-kodagu-district-safe-for-tourists/articleshow/131333899.cms" },
    ],
    date: "May 2026",
  },
  {
    id: "railway-demand",
    category: "Business & Community",
    headline: "Kodagu chamber renews demand for a railway link",
    summary:
      "The Kodagu District Chamber of Commerce and Industry pressed the government for rail connectivity, arguing it would boost trade and tourism — a long-standing and contested ask.",
    badge: "reported",
    score: 68,
    sources: [
      { name: "Times of India", url: "https://timesofindia.indiatimes.com/city/mysuru/kdcci-urges-railway-link-for-kodagu/articleshow/129169758.cms" },
    ],
    date: "Mar 2026",
  },
  {
    id: "hailstorm-crops",
    category: "Agriculture",
    headline: "Hailstorm and heavy rain damage crops and homes in Kodagu",
    summary:
      "Unseasonal hail and thundershowers damaged standing crops and houses in parts of the district — a reminder of the growing weather volatility facing growers.",
    badge: "reported",
    score: 72,
    sources: [
      { name: "Times of India", url: "https://timesofindia.indiatimes.com/city/mysuru/hailstorm-heavy-rain-damage-houses-and-crops-in-kodagu-district/articleshow/129638004.cms" },
    ],
    date: "Mar 2026",
  },
  {
    id: "global-coffee-forces",
    category: "World & Kodagu",
    headline: "Global coffee swings on Brazil and Vietnam — and Kodagu feels every move",
    summary:
      "World coffee prices have whipsawed on delayed Brazilian harvests, a stronger real and rising Vietnam exports. These are the global forces that set the farmgate price Kodagu's Robusta growers receive — see the Coffee Intelligence page for the live read.",
    badge: "confirmed",
    score: 86,
    sources: [
      { name: "Barchart", url: "https://www.barchart.com/story/news/2238703/coffee-prices-fall-as-brazils-coffee-harvest-expected-to-resume" },
      { name: "inkl", url: "https://www.inkl.com/news/coffee-prices-retreat-as-brazilian-real-weakness-spurs-long-liquidation" },
      { name: "IndexBox · Conab", url: "https://www.indexbox.io/blog/coffee-prices-show-divergent-trends-in-domestic-and-international-markets-conab-report-june-2026/" },
    ],
    date: "Jul 2026",
  },
];
