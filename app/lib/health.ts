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
    labelKn: "ಹೆಚ್ಚಿದೆ",
    tone: "high",
    line:
      "Heavy rain in parts of Kodagu. Post-flood disease risk stays high for 1–2 weeks even after the rain stops — leptospirosis, water-borne illness and snakebite especially.",
    lineKn:
      "ಕೊಡಗಿನ ಕೆಲವು ಭಾಗಗಳಲ್ಲಿ ಭಾರೀ ಮಳೆ. ಮಳೆ ನಿಂತ ನಂತರವೂ 1–2 ವಾರ ಪ್ರವಾಹೋತ್ತರ ರೋಗ ಅಪಾಯ ಹೆಚ್ಚಾಗಿರುತ್ತದೆ — ವಿಶೇಷವಾಗಿ ಲೆಪ್ಟೊಸ್ಪೈರೋಸಿಸ್, ನೀರಿನಿಂದ ಹರಡುವ ಕಾಯಿಲೆ ಮತ್ತು ಹಾವು ಕಡಿತ.",
  },
  wet: {
    label: "Watch",
    labelKn: "ಗಮನಿಸಿ",
    tone: "wet",
    line:
      "A wet spell across Kodagu. Mosquito-borne (dengue) and water-borne risk rises a few weeks into sustained rain — take the usual precautions.",
    lineKn:
      "ಕೊಡಗಿನಾದ್ಯಂತ ಒದ್ದೆ ಅವಧಿ. ನಿರಂತರ ಮಳೆಯ ಕೆಲವು ವಾರಗಳ ನಂತರ ಸೊಳ್ಳೆ-ಹರಡುವ (ಡೆಂಗ್ಯೂ) ಮತ್ತು ನೀರಿನಿಂದ ಹರಡುವ ಅಪಾಯ ಏರುತ್ತದೆ — ಸಾಮಾನ್ಯ ಮುನ್ನೆಚ್ಚರಿಕೆ ವಹಿಸಿ.",
  },
  calm: {
    label: "Seasonal baseline",
    labelKn: "ಋತುಮಾನದ ಸಾಮಾನ್ಯ",
    tone: "calm",
    line:
      "No heavy recent rain. Normal seasonal care — keep water containers covered and drinking water safe.",
    lineKn:
      "ಇತ್ತೀಚೆಗೆ ಭಾರೀ ಮಳೆ ಇಲ್ಲ. ಸಾಮಾನ್ಯ ಋತುಮಾನದ ಕಾಳಜಿ — ನೀರಿನ ಪಾತ್ರೆಗಳನ್ನು ಮುಚ್ಚಿಡಿ ಮತ್ತು ಕುಡಿಯುವ ನೀರನ್ನು ಸುರಕ್ಷಿತವಾಗಿಡಿ.",
  },
} as const;

export type HealthRisk = {
  slug: string;
  icon: string;
  name: string;
  nameKn: string;
  tag: string;
  tagKn: string;
  why: string;
  whyKn: string;
  watchFor: string[];
  watchForKn: string[];
  prevent: string[];
  preventKn: string[];
  act: string;
  actKn: string;
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
    nameKn: "ಲೆಪ್ಟೊಸ್ಪೈರೋಸಿಸ್",
    tag: "Bacterial · floodwater",
    tagKn: "ಬ್ಯಾಕ್ಟೀರಿಯಾ · ಪ್ರವಾಹ ನೀರು",
    why:
      "Spread by water or mud contaminated with the urine of infected animals (especially rats and cattle). It enters through cuts or through wet skin, eyes and mouth — a real risk for anyone wading through floodwater or working in wet fields.",
    whyKn:
      "ಸೋಂಕಿತ ಪ್ರಾಣಿಗಳ (ವಿಶೇಷವಾಗಿ ಇಲಿ ಮತ್ತು ದನ) ಮೂತ್ರದಿಂದ ಕಲುಷಿತವಾದ ನೀರು ಅಥವಾ ಕೆಸರಿನಿಂದ ಹರಡುತ್ತದೆ. ಇದು ಗಾಯಗಳ ಮೂಲಕ ಅಥವಾ ಒದ್ದೆ ಚರ್ಮ, ಕಣ್ಣು ಮತ್ತು ಬಾಯಿಯ ಮೂಲಕ ಪ್ರವೇಶಿಸುತ್ತದೆ — ಪ್ರವಾಹ ನೀರಿನಲ್ಲಿ ನಡೆಯುವ ಅಥವಾ ಒದ್ದೆ ಹೊಲಗಳಲ್ಲಿ ಕೆಲಸ ಮಾಡುವ ಯಾರಿಗಾದರೂ ನಿಜವಾದ ಅಪಾಯ.",
    watchFor: [
      "High fever with chills, 2 days to 4 weeks after exposure",
      "Severe muscle pain, especially in the calves",
      "Red eyes, bad headache",
      "Sometimes jaundice (yellow eyes or skin)",
    ],
    watchForKn: [
      "ಸಂಪರ್ಕದ 2 ದಿನದಿಂದ 4 ವಾರದೊಳಗೆ ಚಳಿಯೊಂದಿಗೆ ತೀವ್ರ ಜ್ವರ",
      "ತೀವ್ರ ಸ್ನಾಯು ನೋವು, ವಿಶೇಷವಾಗಿ ಮೀನಖಂಡಗಳಲ್ಲಿ",
      "ಕೆಂಪು ಕಣ್ಣುಗಳು, ತೀವ್ರ ತಲೆನೋವು",
      "ಕೆಲವೊಮ್ಮೆ ಕಾಮಾಲೆ (ಹಳದಿ ಕಣ್ಣು ಅಥವಾ ಚರ್ಮ)",
    ],
    prevent: [
      "Avoid wading in floodwater or mud where you can",
      "Wear boots and gloves for fieldwork; cover any cuts",
      "Wash thoroughly with clean water after contact",
      "Control rats and store food covered",
    ],
    preventKn: [
      "ಸಾಧ್ಯವಿದ್ದಲ್ಲಿ ಪ್ರವಾಹ ನೀರು ಅಥವಾ ಕೆಸರಿನಲ್ಲಿ ನಡೆಯುವುದನ್ನು ತಪ್ಪಿಸಿ",
      "ಹೊಲದ ಕೆಲಸಕ್ಕೆ ಬೂಟು ಮತ್ತು ಕೈಗವಸು ಧರಿಸಿ; ಗಾಯಗಳನ್ನು ಮುಚ್ಚಿ",
      "ಸಂಪರ್ಕದ ನಂತರ ಶುದ್ಧ ನೀರಿನಿಂದ ಚೆನ್ನಾಗಿ ತೊಳೆಯಿರಿ",
      "ಇಲಿಗಳನ್ನು ನಿಯಂತ್ರಿಸಿ ಮತ್ತು ಆಹಾರವನ್ನು ಮುಚ್ಚಿಟ್ಟುಕೊಳ್ಳಿ",
    ],
    act: "See a doctor early if you get fever after contact with floodwater — it is treatable with antibiotics but dangerous if left late.",
    actKn: "ಪ್ರವಾಹ ನೀರಿನ ಸಂಪರ್ಕದ ನಂತರ ಜ್ವರ ಬಂದರೆ ಬೇಗ ವೈದ್ಯರನ್ನು ಕಾಣಿ — ಇದನ್ನು ಆಂಟಿಬಯಾಟಿಕ್‌ಗಳಿಂದ ಗುಣಪಡಿಸಬಹುದು ಆದರೆ ತಡವಾದರೆ ಅಪಾಯಕಾರಿ.",
    source: "WHO",
    sourceUrl: "https://www.who.int/news-room/fact-sheets/detail/leptospirosis",
    levels: ["high"],
  },
  {
    slug: "dengue",
    icon: "🦟",
    name: "Dengue & mosquito-borne",
    nameKn: "ಡೆಂಗ್ಯೂ ಮತ್ತು ಸೊಳ್ಳೆ-ಹರಡುವ",
    tag: "Mosquito · standing water",
    tagKn: "ಸೊಳ್ಳೆ · ನಿಂತ ನೀರು",
    why:
      "Aedes mosquitoes breed in small pools of clean, still water that collect after rain — in pots, tyres, tanks, tarpaulins and blocked drains. Cases rise a few weeks into the monsoon.",
    whyKn:
      "ಈಡಿಸ್ ಸೊಳ್ಳೆಗಳು ಮಳೆಯ ನಂತರ ಸಂಗ್ರಹವಾಗುವ ಸ್ವಚ್ಛ, ನಿಂತ ನೀರಿನ ಸಣ್ಣ ಗುಂಡಿಗಳಲ್ಲಿ ಸಂತಾನೋತ್ಪತ್ತಿ ಮಾಡುತ್ತವೆ — ಮಡಕೆ, ಟೈರು, ಟ್ಯಾಂಕ್, ಟಾರ್ಪಾಲಿನ್ ಮತ್ತು ಕಟ್ಟಿಕೊಂಡ ಚರಂಡಿಗಳಲ್ಲಿ. ಮುಂಗಾರಿನ ಕೆಲವು ವಾರಗಳ ನಂತರ ಪ್ರಕರಣಗಳು ಏರುತ್ತವೆ.",
    watchFor: [
      "Sudden high fever",
      "Severe headache and pain behind the eyes",
      "Body and joint pain (‘breakbone’)",
      "Rash, nausea",
    ],
    watchForKn: [
      "ಇದ್ದಕ್ಕಿದ್ದಂತೆ ತೀವ್ರ ಜ್ವರ",
      "ತೀವ್ರ ತಲೆನೋವು ಮತ್ತು ಕಣ್ಣುಗಳ ಹಿಂದೆ ನೋವು",
      "ದೇಹ ಮತ್ತು ಕೀಲು ನೋವು (‘ಎಲುಬು ಮುರಿಯುವ’ ನೋವು)",
      "ಚರ್ಮದ ಮೇಲೆ ಗುಳ್ಳೆ, ವಾಕರಿಕೆ",
    ],
    prevent: [
      "Empty, cover or scrub water containers weekly",
      "Don’t let water collect in tyres, pots, tarps",
      "Use nets and repellent, especially dawn and dusk",
    ],
    preventKn: [
      "ವಾರಕ್ಕೊಮ್ಮೆ ನೀರಿನ ಪಾತ್ರೆಗಳನ್ನು ಖಾಲಿ ಮಾಡಿ, ಮುಚ್ಚಿ ಅಥವಾ ಉಜ್ಜಿ ತೊಳೆಯಿರಿ",
      "ಟೈರು, ಮಡಕೆ, ಟಾರ್ಪಾಲಿನ್‌ಗಳಲ್ಲಿ ನೀರು ಸಂಗ್ರಹವಾಗಲು ಬಿಡಬೇಡಿ",
      "ಸೊಳ್ಳೆ ಪರದೆ ಮತ್ತು ನಿವಾರಕ ಬಳಸಿ, ವಿಶೇಷವಾಗಿ ಮುಂಜಾನೆ ಮತ್ತು ಸಂಜೆ",
    ],
    act: "Get a fever checked. Go to hospital urgently for warning signs — bleeding, severe stomach pain, constant vomiting or drowsiness.",
    actKn: "ಜ್ವರವನ್ನು ಪರೀಕ್ಷಿಸಿಕೊಳ್ಳಿ. ಎಚ್ಚರಿಕೆ ಚಿಹ್ನೆಗಳಿದ್ದರೆ — ರಕ್ತಸ್ರಾವ, ತೀವ್ರ ಹೊಟ್ಟೆ ನೋವು, ನಿರಂತರ ವಾಂತಿ ಅಥವಾ ಅರೆನಿದ್ರೆ — ತಕ್ಷಣ ಆಸ್ಪತ್ರೆಗೆ ಹೋಗಿ.",
    source: "WHO",
    sourceUrl: "https://www.who.int/news-room/fact-sheets/detail/dengue-and-severe-dengue",
    levels: ["high", "wet"],
  },
  {
    slug: "water-borne",
    icon: "💧",
    name: "Water-borne illness",
    nameKn: "ನೀರಿನಿಂದ ಹರಡುವ ಕಾಯಿಲೆ",
    tag: "Water · food",
    tagKn: "ನೀರು · ಆಹಾರ",
    why:
      "Floods and damaged pipes mix sewage into drinking water, causing diarrhoea, cholera, typhoid and hepatitis A (jaundice). Young children are most at risk.",
    whyKn:
      "ಪ್ರವಾಹ ಮತ್ತು ಹಾನಿಗೊಂಡ ಪೈಪ್‌ಗಳು ಒಳಚರಂಡಿಯನ್ನು ಕುಡಿಯುವ ನೀರಿನೊಂದಿಗೆ ಬೆರೆಸುತ್ತವೆ, ಇದರಿಂದ ಭೇದಿ, ಕಾಲರಾ, ಟೈಫಾಯ್ಡ್ ಮತ್ತು ಹೆಪಟೈಟಿಸ್ A (ಕಾಮಾಲೆ) ಉಂಟಾಗುತ್ತದೆ. ಚಿಕ್ಕ ಮಕ್ಕಳಿಗೆ ಹೆಚ್ಚು ಅಪಾಯ.",
    watchFor: [
      "Diarrhoea and vomiting",
      "Stomach cramps and fever",
      "Yellow eyes or skin (jaundice)",
    ],
    watchForKn: [
      "ಭೇದಿ ಮತ್ತು ವಾಂತಿ",
      "ಹೊಟ್ಟೆ ಸೆಳೆತ ಮತ್ತು ಜ್ವರ",
      "ಹಳದಿ ಕಣ್ಣು ಅಥವಾ ಚರ್ಮ (ಕಾಮಾಲೆ)",
    ],
    prevent: [
      "Drink only boiled or properly treated water",
      "Wash hands with soap before eating and after the toilet",
      "Eat freshly cooked hot food; avoid cut fruit from outside",
    ],
    preventKn: [
      "ಕುದಿಸಿದ ಅಥವಾ ಸರಿಯಾಗಿ ಸಂಸ್ಕರಿಸಿದ ನೀರನ್ನು ಮಾತ್ರ ಕುಡಿಯಿರಿ",
      "ಊಟದ ಮೊದಲು ಮತ್ತು ಶೌಚದ ನಂತರ ಸಾಬೂನಿನಿಂದ ಕೈ ತೊಳೆಯಿರಿ",
      "ತಾಜಾ ಬೇಯಿಸಿದ ಬಿಸಿ ಆಹಾರ ಸೇವಿಸಿ; ಹೊರಗಿನ ಕತ್ತರಿಸಿದ ಹಣ್ಣುಗಳನ್ನು ತಪ್ಪಿಸಿ",
    ],
    act: "For a child or elder with diarrhoea, start ORS (oral rehydration) at once and see a doctor — dehydration is the real danger.",
    actKn: "ಭೇದಿ ಇರುವ ಮಗು ಅಥವಾ ಹಿರಿಯರಿಗೆ ತಕ್ಷಣ ORS (ಜಲಸಂಜೀವಿನಿ) ಆರಂಭಿಸಿ ಮತ್ತು ವೈದ್ಯರನ್ನು ಕಾಣಿ — ನಿರ್ಜಲೀಕರಣವೇ ನಿಜವಾದ ಅಪಾಯ.",
    source: "NCDC / WHO",
    sourceUrl: "https://ncdc.mohfw.gov.in",
    levels: ["high", "wet"],
  },
  {
    slug: "snakebite",
    icon: "🐍",
    name: "Snakebite",
    nameKn: "ಹಾವು ಕಡಿತ",
    tag: "Snakes · monsoon",
    tagKn: "ಹಾವುಗಳು · ಮುಂಗಾರು",
    why:
      "Heavy rain and flooding flush snakes out of burrows and fields and into homes and paths — encounters rise sharply in the monsoon, and snakebite is a leading rural cause of death in India.",
    whyKn:
      "ಭಾರೀ ಮಳೆ ಮತ್ತು ಪ್ರವಾಹ ಹಾವುಗಳನ್ನು ಬಿಲ ಮತ್ತು ಹೊಲಗಳಿಂದ ಹೊರಹಾಕಿ ಮನೆ ಮತ್ತು ದಾರಿಗಳಿಗೆ ತರುತ್ತವೆ — ಮುಂಗಾರಿನಲ್ಲಿ ಎದುರಾಗುವಿಕೆ ತೀವ್ರವಾಗಿ ಏರುತ್ತದೆ, ಮತ್ತು ಭಾರತದಲ್ಲಿ ಹಾವು ಕಡಿತ ಗ್ರಾಮೀಣ ಸಾವಿನ ಪ್ರಮುಖ ಕಾರಣಗಳಲ್ಲೊಂದು.",
    watchFor: [
      "Pain and swelling at the bite",
      "Drooping eyelids or trouble breathing (some venoms)",
      "Bleeding that won’t stop, dark urine",
    ],
    watchForKn: [
      "ಕಡಿತದ ಸ್ಥಳದಲ್ಲಿ ನೋವು ಮತ್ತು ಊತ",
      "ಕಣ್ಣುರೆಪ್ಪೆ ಜೋಲುಬೀಳುವುದು ಅಥವಾ ಉಸಿರಾಟದ ತೊಂದರೆ (ಕೆಲವು ವಿಷಗಳು)",
      "ನಿಲ್ಲದ ರಕ್ತಸ್ರಾವ, ಕಪ್ಪು ಮೂತ್ರ",
    ],
    prevent: [
      "Clear brush and rubble near the house; store firewood away from doors",
      "Use a torch and wear closed footwear after dark",
      "Shake out footwear, bedding and stored clothes",
    ],
    preventKn: [
      "ಮನೆಯ ಬಳಿ ಪೊದೆ ಮತ್ತು ಕಸವನ್ನು ತೆಗೆಯಿರಿ; ಸೌದೆಯನ್ನು ಬಾಗಿಲಿನಿಂದ ದೂರ ಇಡಿ",
      "ಕತ್ತಲಾದ ನಂತರ ಟಾರ್ಚ್ ಬಳಸಿ ಮತ್ತು ಮುಚ್ಚಿದ ಪಾದರಕ್ಷೆ ಧರಿಸಿ",
      "ಪಾದರಕ್ಷೆ, ಹಾಸಿಗೆ ಮತ್ತು ಇಟ್ಟ ಬಟ್ಟೆಗಳನ್ನು ಕೊಡವಿ ನೋಡಿ",
    ],
    act: "If bitten: stay calm and still, keep the limb below heart level and immobile, and get to a hospital fast (108). Do NOT cut, suck, or tie a tourniquet — anti-venom saves lives.",
    actKn: "ಕಡಿದರೆ: ಶಾಂತವಾಗಿ ಮತ್ತು ಸ್ಥಿರವಾಗಿರಿ, ಕೈಕಾಲನ್ನು ಹೃದಯ ಮಟ್ಟದ ಕೆಳಗೆ ಮತ್ತು ಚಲನೆಯಿಲ್ಲದಂತೆ ಇಡಿ, ಮತ್ತು ಬೇಗ ಆಸ್ಪತ್ರೆಗೆ ತಲುಪಿ (108). ಕತ್ತರಿಸಬೇಡಿ, ಹೀರಬೇಡಿ, ಅಥವಾ ಬಿಗಿಯಾಗಿ ಕಟ್ಟಬೇಡಿ — ವಿಷ-ನಿರೋಧಕ (ಆಂಟಿ-ವೆನಂ) ಜೀವ ಉಳಿಸುತ್ತದೆ.",
    source: "WHO",
    sourceUrl: "https://www.who.int/news-room/fact-sheets/detail/snakebite-envenoming",
    levels: ["high"],
  },
];
