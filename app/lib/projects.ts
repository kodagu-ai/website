// ─────────────────────────────────────────────────────────────────────────────
//  Kodagu.ai — Community Projects
//
//  This is the single source of truth for every project on the site.
//  To ADD A NEW PROJECT: copy one of the objects below, change the fields,
//  and it automatically appears on the home page and gets its own page at
//  /projects/<slug>. Nothing else to wire up.
// ─────────────────────────────────────────────────────────────────────────────

export type ProjectStatus = "Live" | "Beta" | "In Development" | "Planning";

export type Project = {
  /** URL-safe id, used for /projects/<slug> */
  slug: string;
  /** Display name */
  name: string;
  /** Name in Kodava/Kannada script, shown as a subtle accent (optional) */
  localName?: string;
  /** One-line summary shown on cards */
  tagline: string;
  taglineKn?: string;
  /** Short paragraph shown on the card / project header */
  summary: string;
  summaryKn?: string;
  /** Emoji or short glyph used as the card icon (fallback when no logo) */
  icon: string;
  /** Optional path to a logo image in /public. Overrides the emoji icon. */
  logo?: string;
  /** Optional compact mark (no wordmark) for the small card badge. Falls back
   *  to `logo` when unset. Use when the full logo is a wide lockup that reads
   *  poorly at ~56px. */
  logoMark?: string;
  status: ProjectStatus;
  /** Grouping label, e.g. "Wildlife & Conservation" */
  category: string;
  categoryKn?: string;
  /** Optional links */
  repoUrl?: string;
  liveUrl?: string;
  /** Longer content for the project's own page. Each section renders as a block. */
  sections?: { heading: string; body: string[] }[];
  sectionsKn?: { heading: string; body: string[] }[];
  /** Bullet highlights shown on the project page */
  highlights?: string[];
  highlightsKn?: string[];
  /** Ways people can help */
  contribute?: string[];
  contributeKn?: string[];
  /** Featured projects appear first and larger on the home page */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "aane-alert",
    name: "Aane Alert",
    localName: "ಆನೆ ಅಲರ್ಟ್",
    tagline: "An open early-warning network for human–elephant safety in Kodagu.",
    taglineKn: "ಕೊಡಗಿನಲ್ಲಿ ಮಾನವ–ಆನೆ ಸುರಕ್ಷತೆಗಾಗಿ ಒಂದು ಮುಕ್ತ ಮುನ್ನೆಚ್ಚರಿಕೆ ಜಾಲ.",
    summary:
      "Aane Alert is a community-run alerting system that warns residents, farmers, and estate workers when wild elephants move near villages, roads, and plantations — helping prevent dangerous encounters and crop loss across Kodagu.",
    summaryKn:
      "ಆನೆ ಅಲರ್ಟ್ ಒಂದು ಸಮುದಾಯ-ನಿರ್ವಹಿತ ಎಚ್ಚರಿಕೆ ವ್ಯವಸ್ಥೆ — ಕಾಡಾನೆಗಳು ಹಳ್ಳಿ, ರಸ್ತೆ ಮತ್ತು ತೋಟಗಳ ಸಮೀಪ ಚಲಿಸಿದಾಗ ನಿವಾಸಿಗಳು, ರೈತರು ಮತ್ತು ಎಸ್ಟೇಟ್ ಕಾರ್ಮಿಕರಿಗೆ ಎಚ್ಚರಿಸುತ್ತದೆ — ಕೊಡಗಿನಾದ್ಯಂತ ಅಪಾಯಕಾರಿ ಎದುರಾಗುವಿಕೆ ಮತ್ತು ಬೆಳೆ ನಷ್ಟವನ್ನು ತಡೆಯಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
    icon: "🐘",
    logo: "/aane-alert-logo.svg",
    status: "In Development",
    category: "Wildlife & Conservation",
    categoryKn: "ವನ್ಯಜೀವಿ ಮತ್ತು ಸಂರಕ್ಷಣೆ",
    featured: true,
    repoUrl: "https://github.com/kodagu-ai/aane-alert",
    liveUrl: "https://aane.kodagu.ai",
    highlights: [
      "Real-time alerts by SMS, WhatsApp, and app notification",
      "Community-sourced sightings, verified by local coordinators",
      "Maps of recent elephant movement and high-risk corridors",
      "Works in low-connectivity areas across Kodagu's estates and forests",
      "Free, open-source, and owned by the community",
    ],
    highlightsKn: [
      "SMS, ವಾಟ್ಸಾಪ್ ಮತ್ತು ಆ್ಯಪ್ ಅಧಿಸೂಚನೆಯ ಮೂಲಕ ನೈಜ-ಸಮಯದ ಎಚ್ಚರಿಕೆಗಳು",
      "ಸಮುದಾಯದಿಂದ ಬಂದ ದೃಶ್ಯಗಳು, ಸ್ಥಳೀಯ ಸಂಯೋಜಕರಿಂದ ಪರಿಶೀಲಿತ",
      "ಇತ್ತೀಚಿನ ಆನೆ ಚಲನೆ ಮತ್ತು ಹೆಚ್ಚಿನ-ಅಪಾಯದ ಕಾರಿಡಾರ್‌ಗಳ ನಕ್ಷೆಗಳು",
      "ಕೊಡಗಿನ ಎಸ್ಟೇಟ್ ಮತ್ತು ಕಾಡುಗಳಾದ್ಯಂತ ಕಡಿಮೆ-ಸಂಪರ್ಕದ ಪ್ರದೇಶಗಳಲ್ಲಿ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
      "ಉಚಿತ, ಮುಕ್ತ-ಮೂಲ ಮತ್ತು ಸಮುದಾಯದ ಒಡೆತನ",
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "Kodagu sits along ancient elephant corridors between the forests of the Western Ghats. As habitats fragment, herds increasingly cross farmland, coffee estates, roads, and the edges of villages.",
          "These encounters put lives at risk — for both people and elephants — and cause serious crop and property loss. Word of a nearby herd today travels slowly and unevenly: a phone call here, a WhatsApp message there. By the time a warning reaches everyone, it can be too late.",
        ],
      },
      {
        heading: "What Aane Alert does",
        body: [
          "Aane Alert turns scattered word-of-mouth into a fast, reliable, community-owned warning network. When an elephant is spotted, a verified alert goes out to everyone in the affected area — over SMS, WhatsApp, and push notification — so families, farmers, drivers, and estate workers can stay clear and stay safe.",
          "Sightings come from the community itself and are confirmed by trained local coordinators before an alert is sent, keeping warnings trustworthy. Over time, the movement data builds a living map of high-risk corridors that residents and the Forest Department can use to plan.",
        ],
      },
      {
        heading: "Built with and for the community",
        body: [
          "Aane Alert is free and open source. It is designed to work in Kodagu's real conditions — hilly terrain, patchy mobile coverage, and a mix of languages — and to be run by local people, not a distant company.",
          "This is the first project on Kodagu.ai. The goal is a template other regions facing human–wildlife conflict can adopt and adapt.",
        ],
      },
    ],
    sectionsKn: [
      {
        heading: "ಸಮಸ್ಯೆ",
        body: [
          "ಕೊಡಗು ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ಕಾಡುಗಳ ನಡುವಿನ ಪುರಾತನ ಆನೆ ಕಾರಿಡಾರ್‌ಗಳ ಉದ್ದಕ್ಕೂ ಇದೆ. ಆವಾಸಸ್ಥಾನಗಳು ತುಂಡಾಗುತ್ತಿದ್ದಂತೆ, ಆನೆ ಹಿಂಡುಗಳು ಹೆಚ್ಚಾಗಿ ಹೊಲ, ಕಾಫಿ ಎಸ್ಟೇಟ್, ರಸ್ತೆ ಮತ್ತು ಹಳ್ಳಿಗಳ ಅಂಚುಗಳನ್ನು ದಾಟುತ್ತವೆ.",
          "ಈ ಎದುರಾಗುವಿಕೆಗಳು ಜನ ಮತ್ತು ಆನೆ ಎರಡರ ಜೀವಗಳನ್ನೂ ಅಪಾಯಕ್ಕೆ ಒಡ್ಡುತ್ತವೆ — ಮತ್ತು ಗಂಭೀರ ಬೆಳೆ ಹಾಗೂ ಆಸ್ತಿ ನಷ್ಟ ಉಂಟುಮಾಡುತ್ತವೆ. ಹತ್ತಿರದ ಹಿಂಡಿನ ಸುದ್ದಿ ಇಂದು ನಿಧಾನವಾಗಿ ಮತ್ತು ಅಸಮಾನವಾಗಿ ಹರಡುತ್ತದೆ: ಇಲ್ಲಿ ಒಂದು ಫೋನ್ ಕರೆ, ಅಲ್ಲಿ ಒಂದು ವಾಟ್ಸಾಪ್ ಸಂದೇಶ. ಎಚ್ಚರಿಕೆ ಎಲ್ಲರಿಗೂ ತಲುಪುವಷ್ಟರಲ್ಲಿ, ತಡವಾಗಿರಬಹುದು.",
        ],
      },
      {
        heading: "ಆನೆ ಅಲರ್ಟ್ ಏನು ಮಾಡುತ್ತದೆ",
        body: [
          "ಆನೆ ಅಲರ್ಟ್ ಚದುರಿದ ಬಾಯಿಮಾತನ್ನು ವೇಗದ, ವಿಶ್ವಾಸಾರ್ಹ, ಸಮುದಾಯ-ಒಡೆತನದ ಎಚ್ಚರಿಕೆ ಜಾಲವಾಗಿ ಪರಿವರ್ತಿಸುತ್ತದೆ. ಆನೆ ಕಂಡಾಗ, ಬಾಧಿತ ಪ್ರದೇಶದ ಎಲ್ಲರಿಗೂ ಪರಿಶೀಲಿತ ಎಚ್ಚರಿಕೆ — SMS, ವಾಟ್ಸಾಪ್ ಮತ್ತು ಪುಶ್ ಅಧಿಸೂಚನೆಯ ಮೂಲಕ — ಹೋಗುತ್ತದೆ, ಇದರಿಂದ ಕುಟುಂಬಗಳು, ರೈತರು, ಚಾಲಕರು ಮತ್ತು ಎಸ್ಟೇಟ್ ಕಾರ್ಮಿಕರು ದೂರವಿದ್ದು ಸುರಕ್ಷಿತವಾಗಿರಬಹುದು.",
          "ದೃಶ್ಯಗಳು ಸಮುದಾಯದಿಂದಲೇ ಬರುತ್ತವೆ ಮತ್ತು ಎಚ್ಚರಿಕೆ ಕಳುಹಿಸುವ ಮೊದಲು ತರಬೇತಿ ಪಡೆದ ಸ್ಥಳೀಯ ಸಂಯೋಜಕರಿಂದ ಖಚಿತಪಡಿಸಲಾಗುತ್ತದೆ, ಇದರಿಂದ ಎಚ್ಚರಿಕೆಗಳು ವಿಶ್ವಾಸಾರ್ಹವಾಗಿರುತ್ತವೆ. ಕಾಲಾನಂತರದಲ್ಲಿ, ಚಲನೆಯ ಡೇಟಾ ನಿವಾಸಿಗಳು ಮತ್ತು ಅರಣ್ಯ ಇಲಾಖೆ ಯೋಜನೆಗಾಗಿ ಬಳಸಬಹುದಾದ ಹೆಚ್ಚಿನ-ಅಪಾಯದ ಕಾರಿಡಾರ್‌ಗಳ ಜೀವಂತ ನಕ್ಷೆಯನ್ನು ರೂಪಿಸುತ್ತದೆ.",
        ],
      },
      {
        heading: "ಸಮುದಾಯದೊಂದಿಗೆ, ಸಮುದಾಯಕ್ಕಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ",
        body: [
          "ಆನೆ ಅಲರ್ಟ್ ಉಚಿತ ಮತ್ತು ಮುಕ್ತ-ಮೂಲ. ಇದು ಕೊಡಗಿನ ನೈಜ ಪರಿಸ್ಥಿತಿಗಳಲ್ಲಿ — ಗುಡ್ಡಗಾಡು ಭೂಪ್ರದೇಶ, ಅಸಮ ಮೊಬೈಲ್ ಸಂಪರ್ಕ ಮತ್ತು ವಿವಿಧ ಭಾಷೆಗಳಲ್ಲಿ — ಕೆಲಸ ಮಾಡಲು ಮತ್ತು ದೂರದ ಕಂಪನಿಯಲ್ಲ, ಸ್ಥಳೀಯ ಜನರಿಂದ ನಡೆಸಲ್ಪಡಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.",
          "ಇದು Kodagu.ai ನ ಮೊದಲ ಯೋಜನೆ. ಮಾನವ–ವನ್ಯಜೀವಿ ಸಂಘರ್ಷ ಎದುರಿಸುತ್ತಿರುವ ಇತರ ಪ್ರದೇಶಗಳು ಅಳವಡಿಸಿಕೊಂಡು ಹೊಂದಿಸಬಹುದಾದ ಮಾದರಿ ರೂಪಿಸುವುದೇ ಗುರಿ.",
        ],
      },
    ],
    contribute: [
      "Developers: help build the alerting backend, maps, and mobile experience",
      "Local coordinators: verify sightings and onboard villages and estates",
      "Designers & translators: make alerts clear in Kodava thakk, Kannada, and English",
      "Domain experts: wildlife biologists and Forest Department partners to guide corridor mapping",
    ],
    contributeKn: [
      "ಡೆವಲಪರ್‌ಗಳು: ಎಚ್ಚರಿಕೆ ಬ್ಯಾಕೆಂಡ್, ನಕ್ಷೆಗಳು ಮತ್ತು ಮೊಬೈಲ್ ಅನುಭವ ನಿರ್ಮಿಸಲು ಸಹಾಯ ಮಾಡಿ",
      "ಸ್ಥಳೀಯ ಸಂಯೋಜಕರು: ದೃಶ್ಯಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಹಳ್ಳಿ ಹಾಗೂ ಎಸ್ಟೇಟ್‌ಗಳನ್ನು ಸೇರಿಸಿ",
      "ಡಿಸೈನರ್‌ಗಳು ಮತ್ತು ಅನುವಾದಕರು: ಕೊಡವ ತಕ್ಕ್, ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಎಚ್ಚರಿಕೆಗಳನ್ನು ಸ್ಪಷ್ಟಗೊಳಿಸಿ",
      "ಕ್ಷೇತ್ರ ಪರಿಣತರು: ಕಾರಿಡಾರ್ ನಕ್ಷೆಗೆ ಮಾರ್ಗದರ್ಶನ ನೀಡಲು ವನ್ಯಜೀವಿ ಜೀವಶಾಸ್ತ್ರಜ್ಞರು ಮತ್ತು ಅರಣ್ಯ ಇಲಾಖೆ ಪಾಲುದಾರರು",
    ],
  },
  {
    slug: "nela",
    name: "Nela",
    localName: "ನೆಲ",
    tagline:
      "An open, satellite-based read on landslide risk and land health across Kodagu.",
    taglineKn:
      "ಉಪಗ್ರಹ ಆಧಾರಿತ — ಕೊಡಗಿನ ಭೂಕುಸಿತ ಅಪಾಯ ಮತ್ತು ನೆಲದ ಆರೋಗ್ಯದ ಒಂದು ಮುಕ್ತ ಓದು.",
    summary:
      "Nela reads Kodagu's land from space every day and hands it back to the people who live here in plain Kannada. A transparent model turns free public satellite data into a simple landslide-risk map — plus layers for forest, soil & water, and crop & coffee — so residents, farmers, and panchayats can see what's changing on the ground.",
    summaryKn:
      "ನೆಲ ಪ್ರತಿದಿನ ಬಾಹ್ಯಾಕಾಶದಿಂದ ಕೊಡಗಿನ ನೆಲವನ್ನು ಓದಿ, ಅದನ್ನು ಇಲ್ಲಿ ವಾಸಿಸುವ ಜನರಿಗೆ ಸರಳ ಕನ್ನಡದಲ್ಲಿ ಹಿಂತಿರುಗಿಸುತ್ತದೆ. ಪಾರದರ್ಶಕ ಮಾದರಿಯು ಉಚಿತ ಸಾರ್ವಜನಿಕ ಉಪಗ್ರಹ ದತ್ತಾಂಶವನ್ನು ಸರಳ ಭೂಕುಸಿತ-ಅಪಾಯ ನಕ್ಷೆಯಾಗಿ ಪರಿವರ್ತಿಸುತ್ತದೆ — ಜೊತೆಗೆ ಕಾಡು, ಮಣ್ಣು ಮತ್ತು ನೀರು, ಬೆಳೆ ಮತ್ತು ಕಾಫಿ ಪದರಗಳು — ಇದರಿಂದ ನಿವಾಸಿಗಳು, ರೈತರು ಮತ್ತು ಪಂಚಾಯಿತಿಗಳು ನೆಲದ ಮೇಲೆ ಏನು ಬದಲಾಗುತ್ತಿದೆ ಎಂಬುದನ್ನು ನೋಡಬಹುದು.",
    icon: "🛰️",
    logo: "/nela-logo.svg",
    logoMark: "/nela-emblem.svg",
    status: "Beta",
    category: "Land & Climate Resilience",
    categoryKn: "ಭೂಮಿ ಮತ್ತು ಹವಾಮಾನ ಸ್ಥಿತಿಸ್ಥಾಪಕತೆ",
    featured: true,
    repoUrl: "https://github.com/poonacha-ai/nela",
    liveUrl: "https://nela.kodagu.ai",
    highlights: [
      "Daily landslide-risk map, colour-coded by hexagon cell, each with a plain-language 'why'",
      "Four layers on one map: landslide risk, forest & canopy, soil & water, crop & coffee",
      "Transparent model — risk = susceptibility (slope, forest loss, road-cuts) × trigger (rainfall + soil saturation), backtested on the 2018–2019 disasters",
      "Built from free public satellites: Copernicus, Sentinel, GPM, SMAP, Hansen",
      "Fast, offline-capable app in Kannada and English — your phone never processes imagery",
      "Free, open-source decision-support that complements official advisories, not replaces them",
    ],
    highlightsKn: [
      "ದೈನಂದಿನ ಭೂಕುಸಿತ-ಅಪಾಯ ನಕ್ಷೆ — ಷಟ್ಕೋನ ಕೋಶದ ಪ್ರಕಾರ ಬಣ್ಣ, ಪ್ರತಿಯೊಂದಕ್ಕೂ ಸರಳ ಭಾಷೆಯ 'ಏಕೆ' ವಿವರಣೆ",
      "ಒಂದೇ ನಕ್ಷೆಯಲ್ಲಿ ನಾಲ್ಕು ಪದರಗಳು: ಭೂಕುಸಿತ ಅಪಾಯ, ಕಾಡು ಮತ್ತು ಮೇಲ್ಛಾವಣಿ, ಮಣ್ಣು ಮತ್ತು ನೀರು, ಬೆಳೆ ಮತ್ತು ಕಾಫಿ",
      "ಪಾರದರ್ಶಕ ಮಾದರಿ — ಅಪಾಯ = ಸೂಕ್ಷ್ಮತೆ (ಇಳಿಜಾರು, ಕಾಡು ನಷ್ಟ, ರಸ್ತೆ-ಕಡಿತ) × ಪ್ರಚೋದನೆ (ಮಳೆ + ಮಣ್ಣಿನ ಶುದ್ಧತೆ), 2018–2019 ವಿಪತ್ತುಗಳ ವಿರುದ್ಧ ಪರೀಕ್ಷಿಸಲಾಗಿದೆ",
      "ಉಚಿತ ಸಾರ್ವಜನಿಕ ಉಪಗ್ರಹಗಳಿಂದ ನಿರ್ಮಿಸಲಾಗಿದೆ: Copernicus, Sentinel, GPM, SMAP, Hansen",
      "ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ವೇಗದ, ಆಫ್‌ಲೈನ್ ಸಾಮರ್ಥ್ಯದ ಆ್ಯಪ್ — ನಿಮ್ಮ ಫೋನ್ ಎಂದಿಗೂ ಚಿತ್ರಗಳನ್ನು ಸಂಸ್ಕರಿಸುವುದಿಲ್ಲ",
      "ಉಚಿತ, ಮುಕ್ತ-ಮೂಲ ನಿರ್ಧಾರ-ಸಹಾಯ ಸಾಧನ — ಅಧಿಕೃತ ಸೂಚನೆಗಳಿಗೆ ಪೂರಕ, ಬದಲಿ ಅಲ್ಲ",
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "Kodagu's hills are steep, its monsoon is intense, and its land is changing — forest thins, slopes are cut for roads and building, and soil saturates fast. The 2018 and 2019 landslides showed how quickly that combination can turn deadly.",
          "The data that could warn people — slope, rainfall, soil moisture, vegetation and forest loss — exists in public satellites, but it sits locked in formats and languages that no resident, farmer, or panchayat member can read in time.",
        ],
      },
      {
        heading: "What Nela does",
        body: [
          "Nela reads Kodagu's land from space and returns it in plain language to the people who live here. It shows a daily landslide-risk map — coloured from low to severe — with a simple Kannada explanation of why each area is rated the way it is.",
          "Four layers sit on one map: landslide risk, forest & canopy, soil & water, and crop & coffee. It works fast, offline, and free, so it's useful in exactly the low-connectivity conditions where warnings matter most.",
        ],
      },
      {
        heading: "How it works",
        body: [
          "Every day, free public satellites (Copernicus, Sentinel, GPM, SMAP, Hansen) record slope, rainfall, soil moisture, vegetation and forest loss. A nightly Google Earth Engine job divides the taluk into H3 hexagon cells and computes numbers for each one — your phone never processes imagery.",
          "A transparent model then rates risk as susceptibility (slope, forest loss, road-cuts) multiplied by trigger (rainfall + soil saturation), backtested against the 2018/2019 disasters. Built on open technology — Google Earth Engine, H3, Supabase/PostGIS, a Next.js PWA, and Leaflet/OpenStreetMap — Nela is open-source and decision-support: it complements official advisories, it does not guarantee outcomes. It currently covers Madikeri taluk, with the rest of Kodagu to follow.",
        ],
      },
    ],
    sectionsKn: [
      {
        heading: "ಸಮಸ್ಯೆ",
        body: [
          "ಕೊಡಗಿನ ಗುಡ್ಡಗಳು ಕಡಿದಾದವು, ಮಳೆ ತೀವ್ರ, ಮತ್ತು ನೆಲ ಬದಲಾಗುತ್ತಿದೆ — ಕಾಡು ತೆಳುವಾಗುತ್ತದೆ, ರಸ್ತೆ ಮತ್ತು ಕಟ್ಟಡಕ್ಕಾಗಿ ಇಳಿಜಾರುಗಳನ್ನು ಕತ್ತರಿಸಲಾಗುತ್ತದೆ, ಮಣ್ಣು ಬೇಗ ತೇವಗೊಳ್ಳುತ್ತದೆ. 2018 ಮತ್ತು 2019ರ ಭೂಕುಸಿತಗಳು ಈ ಸಂಯೋಜನೆ ಎಷ್ಟು ಬೇಗ ಮಾರಕವಾಗಬಲ್ಲದು ಎಂಬುದನ್ನು ತೋರಿಸಿದವು.",
          "ಜನರಿಗೆ ಎಚ್ಚರಿಸಬಲ್ಲ ದತ್ತಾಂಶ — ಇಳಿಜಾರು, ಮಳೆ, ಮಣ್ಣಿನ ತೇವ, ಸಸ್ಯ ಮತ್ತು ಕಾಡು ನಷ್ಟ — ಸಾರ್ವಜನಿಕ ಉಪಗ್ರಹಗಳಲ್ಲಿ ಇದೆ, ಆದರೆ ಅದು ಯಾವುದೇ ನಿವಾಸಿ, ರೈತ ಅಥವಾ ಪಂಚಾಯಿತಿ ಸದಸ್ಯರು ಸಮಯಕ್ಕೆ ಓದಲಾಗದ ರೂಪ ಮತ್ತು ಭಾಷೆಗಳಲ್ಲಿ ಬಂಧಿಯಾಗಿದೆ.",
        ],
      },
      {
        heading: "ನೆಲ ಏನು ಮಾಡುತ್ತದೆ",
        body: [
          "ನೆಲ ಬಾಹ್ಯಾಕಾಶದಿಂದ ಕೊಡಗಿನ ನೆಲವನ್ನು ಓದಿ, ಅದನ್ನು ಇಲ್ಲಿ ವಾಸಿಸುವ ಜನರಿಗೆ ಸರಳ ಭಾಷೆಯಲ್ಲಿ ಹಿಂತಿರುಗಿಸುತ್ತದೆ. ಇದು ದೈನಂದಿನ ಭೂಕುಸಿತ-ಅಪಾಯ ನಕ್ಷೆಯನ್ನು — ಕಡಿಮೆಯಿಂದ ತೀವ್ರದವರೆಗೆ ಬಣ್ಣಗಳಲ್ಲಿ — ಪ್ರತಿ ಪ್ರದೇಶಕ್ಕೆ ಆ ಮಟ್ಟ ಏಕೆ ಎಂಬ ಸರಳ ಕನ್ನಡ ವಿವರಣೆಯೊಂದಿಗೆ ತೋರಿಸುತ್ತದೆ.",
          "ಒಂದೇ ನಕ್ಷೆಯಲ್ಲಿ ನಾಲ್ಕು ಪದರಗಳು: ಭೂಕುಸಿತ ಅಪಾಯ, ಕಾಡು ಮತ್ತು ಮೇಲ್ಛಾವಣಿ, ಮಣ್ಣು ಮತ್ತು ನೀರು, ಬೆಳೆ ಮತ್ತು ಕಾಫಿ. ಇದು ವೇಗವಾಗಿ, ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿ ಮತ್ತು ಉಚಿತವಾಗಿ ಕೆಲಸ ಮಾಡುತ್ತದೆ — ಎಚ್ಚರಿಕೆ ಹೆಚ್ಚು ಮುಖ್ಯವಾಗುವ ಕಡಿಮೆ-ಸಂಪರ್ಕದ ಪರಿಸ್ಥಿತಿಗಳಲ್ಲೇ ಉಪಯುಕ್ತ.",
        ],
      },
      {
        heading: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
        body: [
          "ಪ್ರತಿದಿನ ಉಚಿತ ಸಾರ್ವಜನಿಕ ಉಪಗ್ರಹಗಳು (Copernicus, Sentinel, GPM, SMAP, Hansen) ಇಳಿಜಾರು, ಮಳೆ, ಮಣ್ಣಿನ ತೇವ, ಸಸ್ಯ ಮತ್ತು ಕಾಡು ನಷ್ಟವನ್ನು ದಾಖಲಿಸುತ್ತವೆ. ರಾತ್ರಿ ನಡೆಯುವ Google Earth Engine ಕೆಲಸ ತಾಲೂಕನ್ನು H3 ಷಟ್ಕೋನ ಕೋಶಗಳಾಗಿ ವಿಂಗಡಿಸಿ ಪ್ರತಿ ಕೋಶಕ್ಕೆ ಸಂಖ್ಯೆಗಳನ್ನು ಲೆಕ್ಕ ಹಾಕುತ್ತದೆ — ನಿಮ್ಮ ಫೋನ್ ಎಂದಿಗೂ ಚಿತ್ರಗಳನ್ನು ಸಂಸ್ಕರಿಸುವುದಿಲ್ಲ.",
          "ಪಾರದರ್ಶಕ ಮಾದರಿ ಅಪಾಯವನ್ನು ಸೂಕ್ಷ್ಮತೆ (ಇಳಿಜಾರು, ಕಾಡು ನಷ್ಟ, ರಸ್ತೆ-ಕಡಿತ) × ಪ್ರಚೋದನೆ (ಮಳೆ + ಮಣ್ಣಿನ ಶುದ್ಧತೆ) ಎಂದು ಲೆಕ್ಕ ಹಾಕುತ್ತದೆ, 2018/2019 ವಿಪತ್ತುಗಳ ವಿರುದ್ಧ ಪರೀಕ್ಷಿಸಲಾಗಿದೆ. ಮುಕ್ತ ತಂತ್ರಜ್ಞಾನದ ಮೇಲೆ — Google Earth Engine, H3, Supabase/PostGIS, Next.js PWA, ಮತ್ತು Leaflet/OpenStreetMap — ನಿರ್ಮಿಸಲಾಗಿದೆ. ನೆಲ ಮುಕ್ತ-ಮೂಲ ಮತ್ತು ನಿರ್ಧಾರ-ಸಹಾಯ ಸಾಧನ: ಅಧಿಕೃತ ಸೂಚನೆಗಳಿಗೆ ಪೂರಕ, ಫಲಿತಾಂಶದ ಖಾತರಿ ಅಲ್ಲ. ಸದ್ಯ ಮಡಿಕೇರಿ ತಾಲೂಕನ್ನು ಒಳಗೊಂಡಿದೆ, ಉಳಿದ ಕೊಡಗು ಮುಂದೆ ಸೇರಲಿದೆ.",
        ],
      },
    ],
    contribute: [
      "Developers: improve the Earth Engine pipeline, the risk model, and the PWA",
      "Local validators: ground-truth landslide and land-change signals against what you see on the ground",
      "Translators & designers: keep the 'why' explanations clear in Kannada and Kodava thakk",
      "Domain experts: geologists, hydrologists, and disaster-management / forest-department partners to refine the model",
    ],
    contributeKn: [
      "ಡೆವಲಪರ್‌ಗಳು: Earth Engine ಪೈಪ್‌ಲೈನ್, ಅಪಾಯ ಮಾದರಿ ಮತ್ತು PWA ಸುಧಾರಿಸಲು ಸಹಾಯ ಮಾಡಿ",
      "ಸ್ಥಳೀಯ ಪರಿಶೀಲಕರು: ಭೂಕುಸಿತ ಮತ್ತು ಭೂ-ಬದಲಾವಣೆ ಸೂಚನೆಗಳನ್ನು ನೆಲದ ಮೇಲೆ ನೀವು ನೋಡುವುದರೊಂದಿಗೆ ಹೋಲಿಸಿ ಖಚಿತಪಡಿಸಿ",
      "ಅನುವಾದಕರು ಮತ್ತು ಡಿಸೈನರ್‌ಗಳು: 'ಏಕೆ' ವಿವರಣೆಗಳನ್ನು ಕನ್ನಡ ಮತ್ತು ಕೊಡವ ತಕ್ಕ್‌ನಲ್ಲಿ ಸ್ಪಷ್ಟವಾಗಿ ಇರಿಸಿ",
      "ಕ್ಷೇತ್ರ ಪರಿಣತರು: ಮಾದರಿಯನ್ನು ಪರಿಷ್ಕರಿಸಲು ಭೂವಿಜ್ಞಾನಿಗಳು, ಜಲವಿಜ್ಞಾನಿಗಳು ಮತ್ತು ವಿಪತ್ತು-ನಿರ್ವಹಣೆ / ಅರಣ್ಯ ಇಲಾಖೆ ಪಾಲುದಾರರು",
    ],
  },
  {
    slug: "manabala",
    name: "Manabala",
    localName: "ಮನಬಲ",
    tagline:
      "Kodagu's community listening network — a trained listener near you, calming skills in Kannada, and help a tap away.",
    taglineKn:
      "ಕೊಡಗಿನ ಆಲಿಸುವ ಬಳಗ — ಹತ್ತಿರದ ತರಬೇತಿ ಪಡೆದ ಆಲಿಸುವವರು, ಕನ್ನಡದಲ್ಲಿ ಶಾಂತಗೊಳಿಸುವ ಕೌಶಲಗಳು, ಮತ್ತು ಒಂದೇ ಒತ್ತಿನಲ್ಲಿ ಸಹಾಯ.",
    summary:
      "Manabala is a community mental-wellbeing network for Kodagu. It connects you to a trained volunteer listener near you for a private, judgement-free conversation, teaches simple calming skills in Kannada, and keeps professional help close. It is peer listening — not medical treatment — conversations are never recorded, and a free 24/7 crisis line is always one tap away.",
    summaryKn:
      "ಮನಬಲ ಕೊಡಗಿನ ಸಮುದಾಯ ಮಾನಸಿಕ ಯೋಗಕ್ಷೇಮ ಬಳಗ. ಇದು ನಿಮ್ಮನ್ನು ಹತ್ತಿರದ ತರಬೇತಿ ಪಡೆದ ಸ್ವಯಂಸೇವಕ ಆಲಿಸುವವರೊಂದಿಗೆ ಖಾಸಗಿ, ತೀರ್ಪಿಲ್ಲದ ಮಾತುಕತೆಗೆ ಸೇರಿಸುತ್ತದೆ, ಕನ್ನಡದಲ್ಲಿ ಮನಸ್ಸು ಶಾಂತಗೊಳಿಸುವ ಸರಳ ಕೌಶಲಗಳನ್ನು ಕಲಿಸುತ್ತದೆ, ಮತ್ತು ವೃತ್ತಿಪರ ಸಹಾಯವನ್ನು ಹತ್ತಿರದಲ್ಲಿ ಇರಿಸುತ್ತದೆ. ಇದು ಸಹವರ್ತಿ ಆಲಿಸುವಿಕೆ — ವೈದ್ಯಕೀಯ ಚಿಕಿತ್ಸೆ ಅಲ್ಲ — ಮಾತುಕತೆ ಎಂದಿಗೂ ರೆಕಾರ್ಡ್ ಆಗುವುದಿಲ್ಲ, ಮತ್ತು ಉಚಿತ 24/7 ಸಹಾಯವಾಣಿ ಯಾವಾಗಲೂ ಒಂದೇ ಒತ್ತಿನಲ್ಲಿ ಇರುತ್ತದೆ.",
    icon: "🫂",
    status: "Beta",
    category: "Mental Health & Wellbeing",
    categoryKn: "ಮಾನಸಿಕ ಆರೋಗ್ಯ ಮತ್ತು ಯೋಗಕ್ಷೇಮ",
    featured: true,
    liveUrl: "https://manabala.kodagu.ai",
    highlights: [
      "Talk to a trained volunteer listener near you — private and judgement-free",
      "Learn 5 simple mind-calming skills, in plain Kannada",
      "Free 24/7 crisis line built in: Tele-MANAS 14416, one tap away",
      "Privacy first — conversations are never recorded; only minimal details are stored",
      "Works without login; sign-in is only needed to call a listener",
      "‘Mana’, a gentle AI companion, for a first conversation any time",
    ],
    highlightsKn: [
      "ಹತ್ತಿರದ ತರಬೇತಿ ಪಡೆದ ಸ್ವಯಂಸೇವಕ ಆಲಿಸುವವರೊಂದಿಗೆ ಮಾತನಾಡಿ — ಖಾಸಗಿ ಮತ್ತು ತೀರ್ಪಿಲ್ಲದೆ",
      "ಮನಸ್ಸು ಶಾಂತಗೊಳಿಸುವ 5 ಸರಳ ಕೌಶಲಗಳನ್ನು ಸರಳ ಕನ್ನಡದಲ್ಲಿ ಕಲಿಯಿರಿ",
      "ಉಚಿತ 24/7 ಸಹಾಯವಾಣಿ ಒಳಗೊಂಡಿದೆ: ಟೆಲಿ-ಮನಸ್ 14416, ಒಂದೇ ಒತ್ತಿನಲ್ಲಿ",
      "ಗೌಪ್ಯತೆ ಮೊದಲು — ಮಾತುಕತೆ ಎಂದಿಗೂ ರೆಕಾರ್ಡ್ ಆಗುವುದಿಲ್ಲ; ಕನಿಷ್ಠ ವಿವರ ಮಾತ್ರ ಉಳಿಸುತ್ತೇವೆ",
      "ಲಾಗಿನ್ ಇಲ್ಲದೆ ಬಳಸಬಹುದು; ಆಲಿಸುವವರಿಗೆ ಕರೆ ಮಾಡಲು ಮಾತ್ರ ಲಾಗಿನ್ ಬೇಕು",
      "‘ಮನ’, ಒಂದು ಸೌಮ್ಯ AI ಸಂಗಾತಿ — ಯಾವಾಗ ಬೇಕಾದರೂ ಮೊದಲ ಮಾತುಕತೆಗೆ",
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "In Kodagu, reaching out when your mind is heavy is hard — help is far, it often isn't in Kannada, and stigma keeps people silent. Many just want someone close by who will listen, without judgement.",
          "The distance is real: professional care is concentrated in a few towns, waits are long, and for young people, farmers, and estate workers a quiet conversation often never happens.",
        ],
      },
      {
        heading: "What Manabala does",
        body: [
          "Manabala shows you trained volunteer listeners near your town — Madikeri, Virajpet, Somwarpet, Kushalnagar, Gonikoppal and more — for a private, judgement-free conversation in your own language.",
          "Alongside listening, it teaches five simple mind-calming skills in Kannada, offers ‘Mana’ (a gentle AI companion) for a first conversation any time, and keeps the free 24/7 helpline one tap away. Most of it works without any login.",
        ],
      },
      {
        heading: "Care, privacy and safety",
        body: [
          "Listeners are trained community volunteers, not clinicians — they listen; they do not diagnose or prescribe. Every listener follows a code of conduct: keep conversations private, give no medical advice, and connect anyone in crisis — thoughts of self-harm or suicide — to Tele-MANAS 14416 straight away.",
          "Privacy is built in: conversations are never recorded and only minimal details are stored. Manabala complements professional mental-health care; it does not replace it. If you or someone you know is in danger, call 14416 (free, 24/7) or your local emergency services now.",
        ],
      },
    ],
    sectionsKn: [
      {
        heading: "ಸಮಸ್ಯೆ",
        body: [
          "ಕೊಡಗಿನಲ್ಲಿ ಮನಸ್ಸು ಭಾರವಾದಾಗ ಸಹಾಯ ಕೇಳುವುದು ಕಷ್ಟ — ಸಹಾಯ ದೂರ, ಹೆಚ್ಚಾಗಿ ಕನ್ನಡದಲ್ಲಿ ಇಲ್ಲ, ಮತ್ತು ಕಳಂಕ ಜನರನ್ನು ಮೌನವಾಗಿಸುತ್ತದೆ. ಹಲವರಿಗೆ ಬೇಕಾಗಿರುವುದು ಹತ್ತಿರದಲ್ಲೇ, ತೀರ್ಪಿಲ್ಲದೆ ಆಲಿಸುವ ಒಬ್ಬರು.",
          "ದೂರ ನಿಜ: ವೃತ್ತಿಪರ ಸೇವೆ ಕೆಲವೇ ಊರುಗಳಲ್ಲಿ ಕೇಂದ್ರೀಕೃತ, ಕಾಯುವಿಕೆ ಉದ್ದ, ಮತ್ತು ಯುವಜನ, ರೈತರು, ಎಸ್ಟೇಟ್ ಕಾರ್ಮಿಕರಿಗೆ ಒಂದು ಶಾಂತ ಮಾತುಕತೆ ಹೆಚ್ಚಾಗಿ ನಡೆಯುವುದೇ ಇಲ್ಲ.",
        ],
      },
      {
        heading: "ಮನಬಲ ಏನು ಮಾಡುತ್ತದೆ",
        body: [
          "ಮನಬಲ ನಿಮ್ಮ ಊರಿನ ಹತ್ತಿರದ ತರಬೇತಿ ಪಡೆದ ಸ್ವಯಂಸೇವಕ ಆಲಿಸುವವರನ್ನು ತೋರಿಸುತ್ತದೆ — ಮಡಿಕೇರಿ, ವಿರಾಜಪೇಟೆ, ಸೋಮವಾರಪೇಟೆ, ಕುಶಾಲನಗರ, ಗೋಣಿಕೊಪ್ಪಲು ಮತ್ತು ಇನ್ನಷ್ಟು — ನಿಮ್ಮದೇ ಭಾಷೆಯಲ್ಲಿ ಖಾಸಗಿ, ತೀರ್ಪಿಲ್ಲದ ಮಾತುಕತೆಗಾಗಿ.",
          "ಆಲಿಸುವಿಕೆಯ ಜೊತೆಗೆ, ಮನಸ್ಸು ಶಾಂತಗೊಳಿಸುವ ಐದು ಸರಳ ಕೌಶಲಗಳನ್ನು ಕನ್ನಡದಲ್ಲಿ ಕಲಿಸುತ್ತದೆ, ಯಾವಾಗ ಬೇಕಾದರೂ ಮೊದಲ ಮಾತುಕತೆಗೆ ‘ಮನ’ (ಸೌಮ್ಯ AI ಸಂಗಾತಿ) ಒದಗಿಸುತ್ತದೆ, ಮತ್ತು ಉಚಿತ 24/7 ಸಹಾಯವಾಣಿಯನ್ನು ಒಂದೇ ಒತ್ತಿನಲ್ಲಿ ಇರಿಸುತ್ತದೆ. ಬಹುಪಾಲು ಲಾಗಿನ್ ಇಲ್ಲದೆ ಬಳಸಬಹುದು.",
        ],
      },
      {
        heading: "ಆರೈಕೆ, ಗೌಪ್ಯತೆ ಮತ್ತು ಸುರಕ್ಷತೆ",
        body: [
          "ಆಲಿಸುವವರು ತರಬೇತಿ ಪಡೆದ ಸಮುದಾಯ ಸ್ವಯಂಸೇವಕರು, ವೈದ್ಯರಲ್ಲ — ಅವರು ಆಲಿಸುತ್ತಾರೆ; ರೋಗನಿರ್ಣಯ ಅಥವಾ ಔಷಧ ಸೂಚಿಸುವುದಿಲ್ಲ. ಪ್ರತಿ ಆಲಿಸುವವರೂ ನೀತಿ ಸಂಹಿತೆ ಪಾಲಿಸುತ್ತಾರೆ: ಮಾತುಕತೆ ಖಾಸಗಿಯಾಗಿ ಇಡುವುದು, ವೈದ್ಯಕೀಯ ಸಲಹೆ ನೀಡದಿರುವುದು, ಮತ್ತು ಗಂಭೀರ ಸಂದರ್ಭದಲ್ಲಿ — ಆತ್ಮಹತ್ಯೆ ಅಥವಾ ಹಾನಿಯ ಆಲೋಚನೆ — ಇರುವವರನ್ನು ತಕ್ಷಣ ಟೆಲಿ-ಮನಸ್ 14416 ಗೆ ಸೇರಿಸುವುದು.",
          "ಗೌಪ್ಯತೆ ಒಳಗೊಂಡಿದೆ: ಮಾತುಕತೆ ಎಂದಿಗೂ ರೆಕಾರ್ಡ್ ಆಗುವುದಿಲ್ಲ ಮತ್ತು ಕನಿಷ್ಠ ವಿವರ ಮಾತ್ರ ಉಳಿಸಲಾಗುತ್ತದೆ. ಮನಬಲ ವೃತ್ತಿಪರ ಮಾನಸಿಕ ಆರೋಗ್ಯ ಸೇವೆಗೆ ಪೂರಕ; ಅದಕ್ಕೆ ಬದಲಿ ಅಲ್ಲ. ನೀವು ಅಥವಾ ನಿಮಗೆ ಗೊತ್ತಿರುವವರು ಅಪಾಯದಲ್ಲಿದ್ದರೆ, ಈಗಲೇ 14416 (ಉಚಿತ, 24/7) ಅಥವಾ ಸ್ಥಳೀಯ ತುರ್ತು ಸೇವೆಗೆ ಕರೆ ಮಾಡಿ.",
        ],
      },
    ],
    contribute: [
      "Become a listener: train as a volunteer and hold space for people near you",
      "Clinicians & counsellors: help shape the code of conduct, training, and escalation paths",
      "Translators & designers: keep the calming skills and guidance clear in Kannada and Kodava thakk",
      "Developers: improve the app, the listener directory, and the privacy safeguards",
    ],
    contributeKn: [
      "ಆಲಿಸುವವರಾಗಿ: ಸ್ವಯಂಸೇವಕರಾಗಿ ತರಬೇತಿ ಪಡೆದು ನಿಮ್ಮ ಹತ್ತಿರದವರಿಗೆ ಸ್ಥಳ ಕೊಡಿ",
      "ವೈದ್ಯರು ಮತ್ತು ಆಪ್ತಸಮಾಲೋಚಕರು: ನೀತಿ ಸಂಹಿತೆ, ತರಬೇತಿ ಮತ್ತು ಸಂಪರ್ಕ ಮಾರ್ಗಗಳನ್ನು ರೂಪಿಸಲು ಸಹಾಯ ಮಾಡಿ",
      "ಅನುವಾದಕರು ಮತ್ತು ಡಿಸೈನರ್‌ಗಳು: ಶಾಂತಗೊಳಿಸುವ ಕೌಶಲ ಮತ್ತು ಮಾರ್ಗದರ್ಶನವನ್ನು ಕನ್ನಡ ಮತ್ತು ಕೊಡವ ತಕ್ಕ್‌ನಲ್ಲಿ ಸ್ಪಷ್ಟವಾಗಿ ಇರಿಸಿ",
      "ಡೆವಲಪರ್‌ಗಳು: ಆ್ಯಪ್, ಆಲಿಸುವವರ ಪಟ್ಟಿ ಮತ್ತು ಗೌಪ್ಯತೆ ಸುರಕ್ಷತೆಗಳನ್ನು ಸುಧಾರಿಸಿ",
    ],
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function allProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
