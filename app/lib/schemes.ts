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
  icon: string;
  tag: string; // short category
  forWhom: string; // one line: who/what it's for
  benefit: string; // the headline benefit
  eligibility: string[];
  howToApply: string[];
  source: string;
  sourceUrl: string;
  asOf: string;
  featured?: boolean;
};

export const SCHEMES: Scheme[] = [
  {
    slug: "wildlife-compensation",
    title: "Wildlife loss compensation",
    icon: "🐘",
    tag: "Human–wildlife conflict",
    forWhom:
      "Anyone in Kodagu who suffers crop, property, livestock, injury or loss of life from wild animals (elephant, tiger, leopard, bear, wild boar…).",
    benefit:
      "Ex-gratia up to ₹20 lakh for death by a wild animal in Karnataka; crop, property, livestock and injury losses are paid per the Forest Department's assessment.",
    eligibility: [
      "The loss was caused by a wild animal, in or near a forest range",
      "Reported promptly, before the damaged crop/property is cleared",
      "Applicant can show ID, land record (RTC/Pahani) and evidence of the loss",
    ],
    howToApply: [
      "Report the incident immediately to your jurisdictional Range Forest Officer (RFO)",
      "Keep photographs of the damage; do not clear it before the officer's inspection",
      "For injury/death: keep medical records / post-mortem and FIR where applicable",
      "Submit the claim form with ID, RTC, photos and bank details to the Range office",
    ],
    source: "Karnataka Forest Department (aranya.gov.in)",
    sourceUrl: "https://aranya.gov.in",
    asOf: "Jul 2026",
    featured: true,
  },
  {
    slug: "pmfby-crop-insurance",
    title: "Crop insurance — PMFBY",
    icon: "🌾",
    tag: "Crop protection",
    forWhom:
      "Farmers growing notified crops who want protection against loss from weather, pests and disease.",
    benefit:
      "You pay only 2% of the sum insured for Kharif crops and 1.5% for Rabi (5% for commercial/horticultural); the government subsidises the rest. Payouts on assessed crop loss.",
    eligibility: [
      "Farmer (loanee or non-loanee) growing a crop notified for your area/season",
      "Have Aadhaar, a bank account, and land records (RTC) or valid tenancy proof",
      "Note: plantation crops may not be notified — check what's covered for Kodagu",
    ],
    howToApply: [
      "In Karnataka, enroll through the state Samrakshane portal (not the national NCIP portal)",
      "Apply before the season's cut-off date; loanee farmers are enrolled via their bank",
      "Documents: Aadhaar, bank passbook, land record (RTC), mobile number",
    ],
    source: "PMFBY · Karnataka Samrakshane",
    sourceUrl: "https://raitamitra.karnataka.gov.in",
    asOf: "2026",
  },
  {
    slug: "disaster-relief",
    title: "Natural-disaster relief (SDRF)",
    icon: "🌧️",
    tag: "Floods & landslides",
    forWhom:
      "Households hit by floods, landslides or heavy-rain damage — the recurring risk across Kodagu since 2018.",
    benefit:
      "Relief for house damage, crop and land loss, livestock, and ex-gratia for injury or death, under the State Disaster Response Fund norms.",
    eligibility: [
      "Loss caused by a notified natural calamity (flood, landslide, heavy rain)",
      "Property/land in the affected revenue area; loss verified by revenue officials",
    ],
    howToApply: [
      "Report the loss to your Village Accountant / Tahsildar as soon as it is safe",
      "The revenue team conducts a joint survey (panchanama) of the damage",
      "Relief is disbursed via the Tahsildar / Deputy Commissioner's office to your bank account",
    ],
    source: "Kodagu District Administration · Revenue Dept",
    sourceUrl: "https://kodagu.nic.in",
    asOf: "2026",
  },
];
