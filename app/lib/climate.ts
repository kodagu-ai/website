// ─────────────────────────────────────────────────────────────────────────────
//  Landslide & Climate Risk — a live rainfall watch plus grounded context and
//  preparedness for Kodagu, one of India's most landslide-prone districts.
//
//  ⚠️ SAFETY: This is a rainfall INDICATOR, not an official warning system and
//  not a landslide prediction. Always follow IMD and Kodagu district (KSNDMC /
//  DDMA) alerts. In an emergency call 112 or the disaster helpline 1077.
// ─────────────────────────────────────────────────────────────────────────────

// Rainfall bands (3-day accumulation, mm) → a plain intensity label + tone.
// Deliberately conservative wording; these describe rainfall, not slope risk.
export const RAIN_BANDS = [
  { max: 60, label: "Calm", tone: "calm" },
  { max: 150, label: "Wet", tone: "wet" },
  { max: 300, label: "Very wet", tone: "high" },
  { max: Infinity, label: "Extreme", tone: "extreme" },
] as const;

export function rainBand(mm: number) {
  return RAIN_BANDS.find((b) => mm <= b.max) ?? RAIN_BANDS[RAIN_BANDS.length - 1];
}

export const WHY_AT_RISK: string[] = [
  "Kodagu sits on the steep, high-rainfall slopes of the Western Ghats. When prolonged, intense monsoon rain saturates the soil, pore-water pressure builds and hillsides give way — the mechanism behind the district's landslides.",
  "In August 2018, landslides killed around 20 people, damaged 4,056 homes and forced the evacuation of 18,000 residents across dozens of villages in Madikeri and Somwarpet taluks. In 2019 it happened again — Kodagu received about 935 mm of rain in nine days against a monthly average near 600 mm.",
  "The pattern is more frequent, more intense bursts of rain — which is why watching rainfall accumulation, not just today's forecast, matters here.",
];

export const WARNING_SIGNS: string[] = [
  "New cracks or bulges in the ground, roads, or walls",
  "Trees, poles or fences starting to tilt or lean",
  "Spring or stream water suddenly turning muddy, or flow changing sharply",
  "Rumbling sounds, or water seeping from a slope that was dry",
  "Doors/windows jamming as a structure shifts",
];

export const WHAT_TO_DO: string[] = [
  "During prolonged heavy rain, move away from steep slopes, cut-slopes below roads, and stream banks",
  "Keep an emergency bag ready — ID, documents, medicines, torch, power bank, water",
  "Never cross flooded roads or bridges; a landslide can follow a flood",
  "If you see warning signs, move to higher, stable ground and alert neighbours and the control room",
  "After the danger, claim losses under disaster relief (see the Schemes & Compensation blade)",
];

export type Contact = { label: string; number: string; note?: string };
export const CONTACTS: Contact[] = [
  { label: "Emergency (all services)", number: "112" },
  { label: "Disaster helpline (toll-free)", number: "1077" },
  { label: "Kodagu district control room", number: "08272-221099", note: "also 08272-221077" },
  { label: "Kodagu disaster support (WhatsApp)", number: "8550001077" },
  { label: "Ambulance", number: "108" },
  { label: "Fire", number: "101" },
];

export type Source = { label: string; url: string };
export const CLIMATE_SOURCES: Source[] = [
  { label: "Kodagu District Administration (helplines)", url: "https://kodagu.nic.in/en/helpline/" },
  { label: "Karnataka State Disaster Management Authority", url: "https://ksdma.karnataka.gov.in" },
  { label: "Down To Earth — 2018 Kodagu disaster", url: "https://www.downtoearth.org.in/climate-change/anxiety-grips-karnatakas-kodagu-after-keralas-wayanad-disaster-brings-memories-of-2018-catastrophe" },
  { label: "Mongabay — extreme rainfall in Kodagu (2019)", url: "https://india.mongabay.com/2019/08/extreme-rainfall-devastates-kodagu-yet-again/" },
];
