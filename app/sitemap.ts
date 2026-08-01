import type { MetadataRoute } from "next";
import { site } from "./lib/site";
import { projects } from "./lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const lastModified = new Date();

  const pages: Array<{
    path: string;
    changeFrequency: "weekly" | "monthly";
    priority: number;
  }> = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/insights", changeFrequency: "weekly", priority: 0.8 },
    { path: "/community", changeFrequency: "weekly", priority: 0.8 },
    { path: "/community/submit", changeFrequency: "monthly", priority: 0.5 },
    { path: "/about", changeFrequency: "monthly", priority: 0.6 },
    { path: "/join", changeFrequency: "monthly", priority: 0.6 },
    ...projects.map((p) => ({
      path: `/projects/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return pages.map((p) => ({
    url: `${base}${p.path}`,
    lastModified,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
