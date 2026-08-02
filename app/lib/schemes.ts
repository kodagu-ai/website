// ─────────────────────────────────────────────────────────────────────────────
//  Schemes & Compensation Decoder — the government support Kodagu residents are
//  entitled to but rarely find, in plain language: what it's for, who qualifies,
//  the benefit, and exactly how to claim.
//
//  ⚠️ Amounts and rules change and vary by case. Every entry carries a source +
//  an "as of" date; always confirm with the office before acting.
// ─────────────────────────────────────────────────────────────────────────────

export type Scheme = {
  slug: string;
  title: string;
  titleKn: string;
  icon: string;
  tag: string; // short category
  tagKn: string;
  forWhom: string; // one line: who/what it's for
  forWhomKn: string;
  benefit: string; // the headline benefit
  benefitKn: string;
  eligibility: string[];
  eligibilityKn: string[];
  howToApply: string[];
  howToApplyKn: string[];
  source: string;
  sourceUrl: string;
  asOf: string;
  featured?: boolean;
};

export const SCHEMES: Scheme[] = [
  {
    slug: "wildlife-compensation",
    title: "Wildlife loss compensation",
    titleKn: "ವನ್ಯಜೀವಿ ನಷ್ಟ ಪರಿಹಾರ",
    icon: "🐘",
    tag: "Human–wildlife conflict",
    tagKn: "ಮಾನವ–ವನ್ಯಜೀವಿ ಸಂಘರ್ಷ",
    forWhom:
      "Anyone in Kodagu who suffers crop, property, livestock, injury or loss of life from wild animals (elephant, tiger, leopard, bear, wild boar…).",
    forWhomKn:
      "ಕೊಡಗಿನಲ್ಲಿ ವನ್ಯಪ್ರಾಣಿಗಳಿಂದ (ಆನೆ, ಹುಲಿ, ಚಿರತೆ, ಕರಡಿ, ಕಾಡುಹಂದಿ…) ಬೆಳೆ, ಆಸ್ತಿ, ಜಾನುವಾರು, ಗಾಯ ಅಥವಾ ಪ್ರಾಣಹಾನಿ ಅನುಭವಿಸುವ ಯಾರಾದರೂ.",
    benefit:
      "Ex-gratia up to ₹20 lakh for death by a wild animal in Karnataka; crop, property, livestock and injury losses are paid per the Forest Department's assessment.",
    benefitKn:
      "ಕರ್ನಾಟಕದಲ್ಲಿ ವನ್ಯಪ್ರಾಣಿಯಿಂದ ಮರಣಕ್ಕೆ ₹20 ಲಕ್ಷದವರೆಗೆ ಎಕ್ಸ್-ಗ್ರೇಷಿಯಾ; ಬೆಳೆ, ಆಸ್ತಿ, ಜಾನುವಾರು ಮತ್ತು ಗಾಯದ ನಷ್ಟಗಳನ್ನು ಅರಣ್ಯ ಇಲಾಖೆಯ ಮೌಲ್ಯಮಾಪನದಂತೆ ಪಾವತಿಸಲಾಗುತ್ತದೆ.",
    eligibility: [
      "The loss was caused by a wild animal, in or near a forest range",
      "Reported promptly, before the damaged crop/property is cleared",
      "Applicant can show ID, land record (RTC/Pahani) and evidence of the loss",
    ],
    eligibilityKn: [
      "ನಷ್ಟವು ಅರಣ್ಯ ವ್ಯಾಪ್ತಿಯಲ್ಲಿ ಅಥವಾ ಸಮೀಪದಲ್ಲಿ ವನ್ಯಪ್ರಾಣಿಯಿಂದ ಉಂಟಾಗಿರಬೇಕು",
      "ಹಾನಿಗೊಂಡ ಬೆಳೆ/ಆಸ್ತಿಯನ್ನು ತೆಗೆಯುವ ಮೊದಲು ಕೂಡಲೇ ವರದಿ ಮಾಡಿರಬೇಕು",
      "ಅರ್ಜಿದಾರರು ಗುರುತಿನ ಚೀಟಿ, ಭೂ ದಾಖಲೆ (RTC/ಪಹಣಿ) ಮತ್ತು ನಷ್ಟದ ಪುರಾವೆ ತೋರಿಸಬೇಕು",
    ],
    howToApply: [
      "Report the incident immediately to your jurisdictional Range Forest Officer (RFO)",
      "Keep photographs of the damage; do not clear it before the officer's inspection",
      "For injury/death: keep medical records / post-mortem and FIR where applicable",
      "Submit the claim form with ID, RTC, photos and bank details to the Range office",
    ],
    howToApplyKn: [
      "ಘಟನೆಯನ್ನು ಕೂಡಲೇ ನಿಮ್ಮ ವ್ಯಾಪ್ತಿಯ ವಲಯ ಅರಣ್ಯ ಅಧಿಕಾರಿಗೆ (RFO) ವರದಿ ಮಾಡಿ",
      "ಹಾನಿಯ ಛಾಯಾಚಿತ್ರಗಳನ್ನು ಇಟ್ಟುಕೊಳ್ಳಿ; ಅಧಿಕಾರಿಯ ಪರಿಶೀಲನೆ ಮೊದಲು ಅದನ್ನು ತೆಗೆಯಬೇಡಿ",
      "ಗಾಯ/ಮರಣಕ್ಕೆ: ವೈದ್ಯಕೀಯ ದಾಖಲೆಗಳು / ಮರಣೋತ್ತರ ಪರೀಕ್ಷೆ ಮತ್ತು ಅನ್ವಯವಾದಲ್ಲಿ FIR ಇಟ್ಟುಕೊಳ್ಳಿ",
      "ಗುರುತಿನ ಚೀಟಿ, RTC, ಫೋಟೋಗಳು ಮತ್ತು ಬ್ಯಾಂಕ್ ವಿವರಗಳೊಂದಿಗೆ ಕ್ಲೈಮ್ ಫಾರ್ಮ್ ಅನ್ನು ವಲಯ ಕಚೇರಿಗೆ ಸಲ್ಲಿಸಿ",
    ],
    source: "Karnataka Forest Department (aranya.gov.in)",
    sourceUrl: "https://aranya.gov.in",
    asOf: "Jul 2026",
    featured: true,
  },
  {
    slug: "pmfby-crop-insurance",
    title: "Crop insurance — PMFBY",
    titleKn: "ಬೆಳೆ ವಿಮೆ — PMFBY",
    icon: "🌾",
    tag: "Crop protection",
    tagKn: "ಬೆಳೆ ರಕ್ಷಣೆ",
    forWhom:
      "Farmers growing notified crops who want protection against loss from weather, pests and disease.",
    forWhomKn:
      "ಹವಾಮಾನ, ಕೀಟ ಮತ್ತು ರೋಗದಿಂದ ಆಗುವ ನಷ್ಟದ ವಿರುದ್ಧ ರಕ್ಷಣೆ ಬಯಸುವ, ಅಧಿಸೂಚಿತ ಬೆಳೆ ಬೆಳೆಯುವ ರೈತರು.",
    benefit:
      "You pay only 2% of the sum insured for Kharif crops and 1.5% for Rabi (5% for commercial/horticultural); the government subsidises the rest. Payouts on assessed crop loss.",
    benefitKn:
      "ಖಾರಿಫ್ ಬೆಳೆಗಳಿಗೆ ವಿಮಾ ಮೊತ್ತದ ಶೇ.2 ಮತ್ತು ರಬಿಗೆ ಶೇ.1.5 (ವಾಣಿಜ್ಯ/ತೋಟಗಾರಿಕೆಗೆ ಶೇ.5) ಮಾತ್ರ ನೀವು ಪಾವತಿಸುತ್ತೀರಿ; ಉಳಿದದ್ದನ್ನು ಸರ್ಕಾರ ಸಬ್ಸಿಡಿ ನೀಡುತ್ತದೆ. ಮೌಲ್ಯಮಾಪಿತ ಬೆಳೆ ನಷ್ಟಕ್ಕೆ ಪಾವತಿ.",
    eligibility: [
      "Farmer (loanee or non-loanee) growing a crop notified for your area/season",
      "Have Aadhaar, a bank account, and land records (RTC) or valid tenancy proof",
      "Note: plantation crops may not be notified — check what's covered for Kodagu",
    ],
    eligibilityKn: [
      "ನಿಮ್ಮ ಪ್ರದೇಶ/ಋತುವಿಗೆ ಅಧಿಸೂಚಿತವಾದ ಬೆಳೆ ಬೆಳೆಯುವ ರೈತ (ಸಾಲಗಾರ ಅಥವಾ ಸಾಲಗಾರರಲ್ಲದವರು)",
      "ಆಧಾರ್, ಬ್ಯಾಂಕ್ ಖಾತೆ, ಮತ್ತು ಭೂ ದಾಖಲೆ (RTC) ಅಥವಾ ಮಾನ್ಯ ಗೇಣಿ ಪುರಾವೆ ಇರಬೇಕು",
      "ಗಮನಿಸಿ: ತೋಟದ ಬೆಳೆಗಳು ಅಧಿಸೂಚಿತವಾಗಿರದಿರಬಹುದು — ಕೊಡಗಿಗೆ ಯಾವುದು ಒಳಗೊಂಡಿದೆ ಎಂದು ಪರಿಶೀಲಿಸಿ",
    ],
    howToApply: [
      "In Karnataka, enroll through the state Samrakshane portal (not the national NCIP portal)",
      "Apply before the season's cut-off date; loanee farmers are enrolled via their bank",
      "Documents: Aadhaar, bank passbook, land record (RTC), mobile number",
    ],
    howToApplyKn: [
      "ಕರ್ನಾಟಕದಲ್ಲಿ, ರಾಜ್ಯದ ಸಂರಕ್ಷಣೆ ಪೋರ್ಟಲ್ ಮೂಲಕ ನೋಂದಾಯಿಸಿ (ರಾಷ್ಟ್ರೀಯ NCIP ಪೋರ್ಟಲ್ ಅಲ್ಲ)",
      "ಋತುವಿನ ಕೊನೆಯ ದಿನಾಂಕದ ಮೊದಲು ಅರ್ಜಿ ಸಲ್ಲಿಸಿ; ಸಾಲಗಾರ ರೈತರನ್ನು ಅವರ ಬ್ಯಾಂಕ್ ಮೂಲಕ ನೋಂದಾಯಿಸಲಾಗುತ್ತದೆ",
      "ದಾಖಲೆಗಳು: ಆಧಾರ್, ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್, ಭೂ ದಾಖಲೆ (RTC), ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
    ],
    source: "PMFBY · Karnataka Samrakshane",
    sourceUrl: "https://raitamitra.karnataka.gov.in",
    asOf: "2026",
  },
  {
    slug: "disaster-relief",
    title: "Natural-disaster relief (SDRF)",
    titleKn: "ಪ್ರಾಕೃತಿಕ ವಿಪತ್ತು ಪರಿಹಾರ (SDRF)",
    icon: "🌧️",
    tag: "Floods & landslides",
    tagKn: "ಪ್ರವಾಹ ಮತ್ತು ಭೂಕುಸಿತ",
    forWhom:
      "Households hit by floods, landslides or heavy-rain damage — the recurring risk across Kodagu since 2018.",
    forWhomKn:
      "ಪ್ರವಾಹ, ಭೂಕುಸಿತ ಅಥವಾ ಭಾರೀ ಮಳೆ ಹಾನಿಗೆ ಒಳಗಾದ ಕುಟುಂಬಗಳು — 2018ರಿಂದ ಕೊಡಗಿನಾದ್ಯಂತ ಪುನರಾವರ್ತಿತ ಅಪಾಯ.",
    benefit:
      "Relief for house damage, crop and land loss, livestock, and ex-gratia for injury or death, under the State Disaster Response Fund norms.",
    benefitKn:
      "ರಾಜ್ಯ ವಿಪತ್ತು ಪ್ರತಿಕ್ರಿಯೆ ನಿಧಿ ಮಾನದಂಡಗಳಡಿ ಮನೆ ಹಾನಿ, ಬೆಳೆ ಮತ್ತು ಭೂ ನಷ್ಟ, ಜಾನುವಾರು, ಮತ್ತು ಗಾಯ ಅಥವಾ ಮರಣಕ್ಕೆ ಎಕ್ಸ್-ಗ್ರೇಷಿಯಾ ಪರಿಹಾರ.",
    eligibility: [
      "Loss caused by a notified natural calamity (flood, landslide, heavy rain)",
      "Property/land in the affected revenue area; loss verified by revenue officials",
    ],
    eligibilityKn: [
      "ಅಧಿಸೂಚಿತ ಪ್ರಾಕೃತಿಕ ವಿಕೋಪದಿಂದ (ಪ್ರವಾಹ, ಭೂಕುಸಿತ, ಭಾರೀ ಮಳೆ) ಉಂಟಾದ ನಷ್ಟ",
      "ಬಾಧಿತ ಕಂದಾಯ ಪ್ರದೇಶದಲ್ಲಿ ಆಸ್ತಿ/ಭೂಮಿ; ನಷ್ಟವನ್ನು ಕಂದಾಯ ಅಧಿಕಾರಿಗಳು ಪರಿಶೀಲಿಸಿರಬೇಕು",
    ],
    howToApply: [
      "Report the loss to your Village Accountant / Tahsildar as soon as it is safe",
      "The revenue team conducts a joint survey (panchanama) of the damage",
      "Relief is disbursed via the Tahsildar / Deputy Commissioner's office to your bank account",
    ],
    howToApplyKn: [
      "ಸುರಕ್ಷಿತವಾದ ಕೂಡಲೇ ನಿಮ್ಮ ಗ್ರಾಮ ಲೆಕ್ಕಾಧಿಕಾರಿ / ತಹಶೀಲ್ದಾರರಿಗೆ ನಷ್ಟವನ್ನು ವರದಿ ಮಾಡಿ",
      "ಕಂದಾಯ ತಂಡ ಹಾನಿಯ ಜಂಟಿ ಸಮೀಕ್ಷೆ (ಪಂಚನಾಮೆ) ನಡೆಸುತ್ತದೆ",
      "ಪರಿಹಾರವನ್ನು ತಹಶೀಲ್ದಾರ್ / ಜಿಲ್ಲಾಧಿಕಾರಿ ಕಚೇರಿ ಮೂಲಕ ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ವಿತರಿಸಲಾಗುತ್ತದೆ",
    ],
    source: "Kodagu District Administration · Revenue Dept",
    sourceUrl: "https://kodagu.nic.in",
    asOf: "2026",
  },
];
