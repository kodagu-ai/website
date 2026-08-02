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
];

// ── Helpers ──────────────────────────────────────────────────────────────────

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function allProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
