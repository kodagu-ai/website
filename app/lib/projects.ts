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
  /** Short paragraph shown on the card / project header */
  summary: string;
  /** Emoji or short glyph used as the card icon (fallback when no logo) */
  icon: string;
  /** Optional path to a logo image in /public. Overrides the emoji icon. */
  logo?: string;
  status: ProjectStatus;
  /** Grouping label, e.g. "Wildlife & Conservation" */
  category: string;
  /** Optional links */
  repoUrl?: string;
  liveUrl?: string;
  /** Longer content for the project's own page. Each section renders as a block. */
  sections?: { heading: string; body: string[] }[];
  /** Bullet highlights shown on the project page */
  highlights?: string[];
  /** Ways people can help */
  contribute?: string[];
  /** Featured projects appear first and larger on the home page */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "aane-alert",
    name: "Aane Alert",
    localName: "ಆನೆ ಅಲರ್ಟ್",
    tagline: "An open early-warning network for human–elephant safety in Kodagu.",
    summary:
      "Aane Alert is a community-run alerting system that warns residents, farmers, and estate workers when wild elephants move near villages, roads, and plantations — helping prevent dangerous encounters and crop loss across Kodagu.",
    icon: "🐘",
    logo: "/aane-alert-logo.svg",
    status: "In Development",
    category: "Wildlife & Conservation",
    featured: true,
    repoUrl: "https://github.com/kodagu-ai/aane-alert",
    highlights: [
      "Real-time alerts by SMS, WhatsApp, and app notification",
      "Community-sourced sightings, verified by local coordinators",
      "Maps of recent elephant movement and high-risk corridors",
      "Works in low-connectivity areas across Kodagu's estates and forests",
      "Free, open-source, and owned by the community",
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
    contribute: [
      "Developers: help build the alerting backend, maps, and mobile experience",
      "Local coordinators: verify sightings and onboard villages and estates",
      "Designers & translators: make alerts clear in Kodava thakk, Kannada, and English",
      "Domain experts: wildlife biologists and Forest Department partners to guide corridor mapping",
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
