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

type Loc = "en" | "kn";

export const WHY_AT_RISK: Record<Loc, string[]> = {
  en: [
    "Kodagu sits on the steep, high-rainfall slopes of the Western Ghats. When prolonged, intense monsoon rain saturates the soil, pore-water pressure builds and hillsides give way — the mechanism behind the district's landslides.",
    "In August 2018, landslides killed around 20 people, damaged 4,056 homes and forced the evacuation of 18,000 residents across dozens of villages in Madikeri and Somwarpet taluks. In 2019 it happened again — Kodagu received about 935 mm of rain in nine days against a monthly average near 600 mm.",
    "The pattern is more frequent, more intense bursts of rain — which is why watching rainfall accumulation, not just today's forecast, matters here.",
  ],
  kn: [
    "ಕೊಡಗು ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ಕಡಿದಾದ, ಹೆಚ್ಚು ಮಳೆಯ ಇಳಿಜಾರುಗಳಲ್ಲಿದೆ. ದೀರ್ಘಕಾಲದ, ತೀವ್ರ ಮುಂಗಾರು ಮಳೆ ಮಣ್ಣನ್ನು ಸಂಪೂರ್ಣ ನೆನೆಸಿದಾಗ, ರಂಧ್ರ-ನೀರಿನ ಒತ್ತಡ ಹೆಚ್ಚಿ ಬೆಟ್ಟದ ಇಳಿಜಾರುಗಳು ಕುಸಿಯುತ್ತವೆ — ಇದೇ ಜಿಲ್ಲೆಯ ಭೂಕುಸಿತಗಳ ಹಿಂದಿನ ಕಾರಣ.",
    "2018ರ ಆಗಸ್ಟ್‌ನಲ್ಲಿ, ಭೂಕುಸಿತಗಳು ಸುಮಾರು 20 ಜನರನ್ನು ಬಲಿ ತೆಗೆದುಕೊಂಡವು, 4,056 ಮನೆಗಳಿಗೆ ಹಾನಿ ಮಾಡಿದವು ಮತ್ತು ಮಡಿಕೇರಿ ಹಾಗೂ ಸೋಮವಾರಪೇಟೆ ತಾಲ್ಲೂಕುಗಳ ಡಜನ್‌ಗಟ್ಟಲೆ ಹಳ್ಳಿಗಳಲ್ಲಿ 18,000 ನಿವಾಸಿಗಳನ್ನು ಸ್ಥಳಾಂತರಿಸಬೇಕಾಯಿತು. 2019ರಲ್ಲಿ ಮತ್ತೆ ಸಂಭವಿಸಿತು — ಮಾಸಿಕ ಸರಾಸರಿ ಸುಮಾರು 600 ಮಿ.ಮೀ ಇದ್ದರೆ, ಕೊಡಗು ಒಂಬತ್ತು ದಿನಗಳಲ್ಲಿ ಸುಮಾರು 935 ಮಿ.ಮೀ ಮಳೆ ಪಡೆಯಿತು.",
    "ಮಾದರಿ ಎಂದರೆ ಹೆಚ್ಚು ಆಗಾಗ, ಹೆಚ್ಚು ತೀವ್ರವಾದ ಮಳೆಯ ಸುರಿತ — ಆದ್ದರಿಂದ ಇಲ್ಲಿ ಇಂದಿನ ಮುನ್ಸೂಚನೆ ಮಾತ್ರವಲ್ಲ, ಮಳೆಯ ಒಟ್ಟು ಸಂಗ್ರಹವನ್ನು ಗಮನಿಸುವುದು ಮುಖ್ಯ.",
  ],
};

export const WARNING_SIGNS: Record<Loc, string[]> = {
  en: [
    "New cracks or bulges in the ground, roads, or walls",
    "Trees, poles or fences starting to tilt or lean",
    "Spring or stream water suddenly turning muddy, or flow changing sharply",
    "Rumbling sounds, or water seeping from a slope that was dry",
    "Doors/windows jamming as a structure shifts",
  ],
  kn: [
    "ನೆಲ, ರಸ್ತೆ ಅಥವಾ ಗೋಡೆಗಳಲ್ಲಿ ಹೊಸ ಬಿರುಕುಗಳು ಅಥವಾ ಉಬ್ಬುಗಳು",
    "ಮರಗಳು, ಕಂಬಗಳು ಅಥವಾ ಬೇಲಿಗಳು ವಾಲಲು ಆರಂಭಿಸುವುದು",
    "ಬುಗ್ಗೆ ಅಥವಾ ತೊರೆಯ ನೀರು ಇದ್ದಕ್ಕಿದ್ದಂತೆ ಕೆಸರಾಗುವುದು, ಅಥವಾ ಹರಿವು ತೀವ್ರವಾಗಿ ಬದಲಾಗುವುದು",
    "ಗುಡುಗುವ ಶಬ್ದಗಳು, ಅಥವಾ ಒಣಗಿದ್ದ ಇಳಿಜಾರಿನಿಂದ ನೀರು ಜಿನುಗುವುದು",
    "ಕಟ್ಟಡ ಸರಿದಂತೆ ಬಾಗಿಲು/ಕಿಟಕಿಗಳು ಸಿಕ್ಕಿಹಾಕಿಕೊಳ್ಳುವುದು",
  ],
};

export const WHAT_TO_DO: Record<Loc, string[]> = {
  en: [
    "During prolonged heavy rain, move away from steep slopes, cut-slopes below roads, and stream banks",
    "Keep an emergency bag ready — ID, documents, medicines, torch, power bank, water",
    "Never cross flooded roads or bridges; a landslide can follow a flood",
    "If you see warning signs, move to higher, stable ground and alert neighbours and the control room",
    "After the danger, claim losses under disaster relief (see the Schemes & Compensation blade)",
  ],
  kn: [
    "ದೀರ್ಘಕಾಲದ ಭಾರೀ ಮಳೆಯ ಸಮಯದಲ್ಲಿ, ಕಡಿದಾದ ಇಳಿಜಾರುಗಳು, ರಸ್ತೆಗಳ ಕೆಳಗಿನ ಕಟ್-ಇಳಿಜಾರುಗಳು ಮತ್ತು ತೊರೆಯ ದಂಡೆಗಳಿಂದ ದೂರ ಸರಿಯಿರಿ",
    "ತುರ್ತು ಚೀಲವನ್ನು ಸಿದ್ಧವಾಗಿಡಿ — ಗುರುತಿನ ಚೀಟಿ, ದಾಖಲೆಗಳು, ಔಷಧಿಗಳು, ಟಾರ್ಚ್, ಪವರ್ ಬ್ಯಾಂಕ್, ನೀರು",
    "ಪ್ರವಾಹದ ರಸ್ತೆ ಅಥವಾ ಸೇತುವೆಗಳನ್ನು ಎಂದಿಗೂ ದಾಟಬೇಡಿ; ಪ್ರವಾಹದ ನಂತರ ಭೂಕುಸಿತ ಸಂಭವಿಸಬಹುದು",
    "ಎಚ್ಚರಿಕೆ ಚಿಹ್ನೆಗಳು ಕಂಡರೆ, ಎತ್ತರದ, ಸ್ಥಿರವಾದ ನೆಲಕ್ಕೆ ಸರಿಯಿರಿ ಮತ್ತು ನೆರೆಹೊರೆಯವರಿಗೆ ಹಾಗೂ ನಿಯಂತ್ರಣ ಕೊಠಡಿಗೆ ತಿಳಿಸಿ",
    "ಅಪಾಯ ಕಳೆದ ನಂತರ, ವಿಪತ್ತು ಪರಿಹಾರದಡಿ ನಷ್ಟವನ್ನು ಕ್ಲೈಮ್ ಮಾಡಿ (ಯೋಜನೆಗಳು ಮತ್ತು ಪರಿಹಾರ ವಿಭಾಗ ನೋಡಿ)",
  ],
};

export type Contact = { label: string; labelKn: string; number: string; note?: string; noteKn?: string };
export const CONTACTS: Contact[] = [
  { label: "Emergency (all services)", labelKn: "ತುರ್ತು (ಎಲ್ಲಾ ಸೇವೆಗಳು)", number: "112" },
  { label: "Disaster helpline (toll-free)", labelKn: "ವಿಪತ್ತು ಸಹಾಯವಾಣಿ (ಟೋಲ್-ಫ್ರೀ)", number: "1077" },
  { label: "Kodagu district control room", labelKn: "ಕೊಡಗು ಜಿಲ್ಲಾ ನಿಯಂತ್ರಣ ಕೊಠಡಿ", number: "08272-221099", note: "also 08272-221077", noteKn: "08272-221077 ಸಹ" },
  { label: "Kodagu disaster support (WhatsApp)", labelKn: "ಕೊಡಗು ವಿಪತ್ತು ನೆರವು (ವಾಟ್ಸಾಪ್)", number: "8550001077" },
  { label: "Ambulance", labelKn: "ಆಂಬ್ಯುಲೆನ್ಸ್", number: "108" },
  { label: "Fire", labelKn: "ಅಗ್ನಿಶಾಮಕ", number: "101" },
];

export type Source = { label: string; labelKn: string; url: string };
export const CLIMATE_SOURCES: Source[] = [
  { label: "Kodagu District Administration (helplines)", labelKn: "ಕೊಡಗು ಜಿಲ್ಲಾ ಆಡಳಿತ (ಸಹಾಯವಾಣಿಗಳು)", url: "https://kodagu.nic.in/en/helpline/" },
  { label: "Karnataka State Disaster Management Authority", labelKn: "ಕರ್ನಾಟಕ ರಾಜ್ಯ ವಿಪತ್ತು ನಿರ್ವಹಣಾ ಪ್ರಾಧಿಕಾರ", url: "https://ksdma.karnataka.gov.in" },
  { label: "Down To Earth — 2018 Kodagu disaster", labelKn: "Down To Earth — 2018 ಕೊಡಗು ವಿಪತ್ತು", url: "https://www.downtoearth.org.in/climate-change/anxiety-grips-karnatakas-kodagu-after-keralas-wayanad-disaster-brings-memories-of-2018-catastrophe" },
  { label: "Mongabay — extreme rainfall in Kodagu (2019)", labelKn: "Mongabay — ಕೊಡಗಿನಲ್ಲಿ ತೀವ್ರ ಮಳೆ (2019)", url: "https://india.mongabay.com/2019/08/extreme-rainfall-devastates-kodagu-yet-again/" },
];
