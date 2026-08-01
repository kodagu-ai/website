// Kodagu.ai updates / announcements feed.
// Newest first. Add an item at the top when there's news worth sharing.

export type Update = {
  date: string; // ISO date, e.g. "2026-08-01"
  tag: "Launch" | "Project" | "Community" | "Update" | "Event";
  title: string;
  body: string;
  href?: string; // optional internal or external link
};

export const UPDATES: Update[] = [
  {
    date: "2026-08-01",
    tag: "Community",
    title: "Community directory is open",
    body: "People and organizations can now list themselves and find collaborators across Kodagu.",
    href: "/community",
  },
  {
    date: "2026-08-01",
    tag: "Launch",
    title: "Kodagu.ai is live",
    body: "The community open-source hub is online — our people, our land, our future.",
  },
  {
    date: "2026-07-31",
    tag: "Project",
    title: "Aane Alert enters development",
    body: "An open elephant early-warning network for human–elephant safety across Kodagu.",
    href: "/projects/aane-alert",
  },
];
