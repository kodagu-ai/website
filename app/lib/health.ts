// ─────────────────────────────────────────────────────────────────────────────
//  Monsoon Health Watch — connects Kodagu's live rainfall/flood signals to the
//  health risks that rise in the monsoon, with plain, sourced guidance.
//
//  ⚠️ This is health-risk AWARENESS, not medical advice or diagnosis. If you or
//  someone is unwell, see a doctor. In an emergency call 112 or ambulance 108.
// ─────────────────────────────────────────────────────────────────────────────

// The "watch" level is derived (client-side) from the heaviest recent rainfall
// across the 5 towns — see the /api/insights/rainfall feed.
export const HEALTH_LEVELS = {
  high: {
    label: "Elevated",
    tone: "high",
    line:
      "Heavy rain in parts of Kodagu. Post-flood disease risk stays high for 1–2 weeks even after the rain stops — leptospirosis, water-borne illness and snakebite especially.",
  },
  wet: {
    label: "Watch",
    tone: "wet",
    line:
      "A wet spell across Kodagu. Mosquito-borne (dengue) and water-borne risk rises a few weeks into sustained rain — take the usual precautions.",
  },
  calm: {
    label: "Seasonal baseline",
    tone: "calm",
    line:
      "No heavy recent rain. Normal seasonal care — keep water containers covered and drinking water safe.",
  },
} as const;

export type HealthRisk = {
  slug: string;
  icon: string;
  name: string;
  tag: string;
  why: string;
  watchFor: string[];
  prevent: string[];
  act: string;
  source: string;
  sourceUrl: string;
  // which watch levels highlight this risk
  levels: ("high" | "wet" | "calm")[];
};

export const HEALTH_RISKS: HealthRisk[] = [
  {
    slug: "leptospirosis",
    icon: "🦠",
    name: "Leptospirosis",
    tag: "Bacterial · floodwater",
    why:
      "Spread by water or mud contaminated with the urine of infected animals (especially rats and cattle). It enters through cuts or through wet skin, eyes and mouth — a real risk for anyone wading through floodwater or working in wet fields.",
    watchFor: [
      "High fever with chills, 2 days to 4 weeks after exposure",
      "Severe muscle pain, especially in the calves",
      "Red eyes, bad headache",
      "Sometimes jaundice (yellow eyes or skin)",
    ],
    prevent: [
      "Avoid wading in floodwater or mud where you can",
      "Wear boots and gloves for fieldwork; cover any cuts",
      "Wash thoroughly with clean water after contact",
      "Control rats and store food covered",
    ],
    act: "See a doctor early if you get fever after contact with floodwater — it is treatable with antibiotics but dangerous if left late.",
    source: "WHO",
    sourceUrl: "https://www.who.int/news-room/fact-sheets/detail/leptospirosis",
    levels: ["high"],
  },
  {
    slug: "dengue",
    icon: "🦟",
    name: "Dengue & mosquito-borne",
    tag: "Mosquito · standing water",
    why:
      "Aedes mosquitoes breed in small pools of clean, still water that collect after rain — in pots, tyres, tanks, tarpaulins and blocked drains. Cases rise a few weeks into the monsoon.",
    watchFor: [
      "Sudden high fever",
      "Severe headache and pain behind the eyes",
      "Body and joint pain (‘breakbone’)",
      "Rash, nausea",
    ],
    prevent: [
      "Empty, cover or scrub water containers weekly",
      "Don’t let water collect in tyres, pots, tarps",
      "Use nets and repellent, especially dawn and dusk",
    ],
    act: "Get a fever checked. Go to hospital urgently for warning signs — bleeding, severe stomach pain, constant vomiting or drowsiness.",
    source: "WHO",
    sourceUrl: "https://www.who.int/news-room/fact-sheets/detail/dengue-and-severe-dengue",
    levels: ["high", "wet"],
  },
  {
    slug: "water-borne",
    icon: "💧",
    name: "Water-borne illness",
    tag: "Water · food",
    why:
      "Floods and damaged pipes mix sewage into drinking water, causing diarrhoea, cholera, typhoid and hepatitis A (jaundice). Young children are most at risk.",
    watchFor: [
      "Diarrhoea and vomiting",
      "Stomach cramps and fever",
      "Yellow eyes or skin (jaundice)",
    ],
    prevent: [
      "Drink only boiled or properly treated water",
      "Wash hands with soap before eating and after the toilet",
      "Eat freshly cooked hot food; avoid cut fruit from outside",
    ],
    act: "For a child or elder with diarrhoea, start ORS (oral rehydration) at once and see a doctor — dehydration is the real danger.",
    source: "NCDC / WHO",
    sourceUrl: "https://ncdc.mohfw.gov.in",
    levels: ["high", "wet"],
  },
  {
    slug: "snakebite",
    icon: "🐍",
    name: "Snakebite",
    tag: "Snakes · monsoon",
    why:
      "Heavy rain and flooding flush snakes out of burrows and fields and into homes and paths — encounters rise sharply in the monsoon, and snakebite is a leading rural cause of death in India.",
    watchFor: [
      "Pain and swelling at the bite",
      "Drooping eyelids or trouble breathing (some venoms)",
      "Bleeding that won’t stop, dark urine",
    ],
    prevent: [
      "Clear brush and rubble near the house; store firewood away from doors",
      "Use a torch and wear closed footwear after dark",
      "Shake out footwear, bedding and stored clothes",
    ],
    act: "If bitten: stay calm and still, keep the limb below heart level and immobile, and get to a hospital fast (108). Do NOT cut, suck, or tie a tourniquet — anti-venom saves lives.",
    source: "WHO",
    sourceUrl: "https://www.who.int/news-room/fact-sheets/detail/snakebite-envenoming",
    levels: ["high"],
  },
];
