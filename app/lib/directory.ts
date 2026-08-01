// ─────────────────────────────────────────────────────────────────────────────
//  Kodagu.ai — Community Directory
//
//  People and organizations in the Kodagu open-source community.
//
//  To ADD AN ENTRY (after approving a submission): copy one of the objects
//  below, change the fields, give it a unique `slug`, and it appears on the
//  /community page automatically. `projects` should list project slugs (from
//  lib/projects.ts) — the directory and project pages cross-link by these.
//
//  ⚠️ PRIVACY: only list people who have opted in / consented. Do not add
//  someone from an external source without their agreement.
// ─────────────────────────────────────────────────────────────────────────────

export type DirectoryType = "person" | "organization";

export type DirectoryEntry = {
  /** URL-safe unique id */
  slug: string;
  type: DirectoryType;
  name: string;
  /** Person: role / title. Organization: kind, e.g. "Community initiative". */
  role: string;
  location?: string;
  /** One or two sentences. */
  blurb: string;
  /** Skills (people) or focus areas (organizations). */
  tags?: string[];
  /** External links shown on the card. */
  links?: { label: string; url: string }[];
  /** Slugs of projects this entry contributes to / supports. */
  projects?: string[];
  /** Optional logo/avatar path in /public (mainly for organizations). */
  logo?: string;
  /** Featured entries sort first. */
  featured?: boolean;
};

export const directory: DirectoryEntry[] = [
  {
    slug: "poonacha-machaiah",
    type: "person",
    name: "Poonacha Machaiah",
    role: "Founder & Maintainer",
    location: "Kodagu, Karnataka",
    blurb:
      "Started Kodagu.ai to bring the Kodava community together around open-source projects that serve our land and people.",
    tags: ["Community", "Product", "Open Source"],
    links: [{ label: "Website", url: "https://kodagu.ai" }],
    projects: ["aane-alert"],
    featured: true,
  },
  {
    slug: "kodagu-ai",
    type: "organization",
    name: "Kodagu.ai",
    role: "Community initiative",
    location: "Kodagu, Karnataka",
    blurb:
      "The community open-source hub for Kodagu — building technology that protects our land, empowers our people, and preserves our heritage.",
    tags: ["Open Source", "Community", "Conservation"],
    links: [
      { label: "Website", url: "https://kodagu.ai" },
      { label: "GitHub", url: "https://github.com/kodagu-ai" },
    ],
    projects: ["aane-alert"],
    featured: true,
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

export function directoryByType(type: DirectoryType): DirectoryEntry[] {
  return directory.filter((e) => e.type === type);
}

/** Entries (people or orgs) associated with a given project slug. */
export function contributorsForProject(projectSlug: string): DirectoryEntry[] {
  return directory.filter((e) => e.projects?.includes(projectSlug));
}
