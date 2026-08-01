"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { DirectoryEntry } from "../lib/directory";

type ProjectName = { slug: string; name: string };

export default function DirectoryExplorer({
  entries,
  projectNames,
}: {
  entries: DirectoryEntry[];
  projectNames: ProjectName[];
}) {
  const [type, setType] = useState<"all" | "person" | "organization">("all");
  const [query, setQuery] = useState("");

  const nameForSlug = useMemo(() => {
    const m = new Map(projectNames.map((p) => [p.slug, p.name]));
    return (slug: string) => m.get(slug) ?? slug;
  }, [projectNames]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries
      .filter((e) => (type === "all" ? true : e.type === type))
      .filter((e) => {
        if (!q) return true;
        const hay = [e.name, e.role, e.location, e.blurb, ...(e.tags ?? [])]
          .join(" ")
          .toLowerCase();
        return hay.includes(q);
      })
      .sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [entries, type, query]);

  const counts = useMemo(
    () => ({
      all: entries.length,
      person: entries.filter((e) => e.type === "person").length,
      organization: entries.filter((e) => e.type === "organization").length,
    }),
    [entries]
  );

  const tabs: { key: "all" | "person" | "organization"; label: string }[] = [
    { key: "all", label: `All (${counts.all})` },
    { key: "person", label: `People (${counts.person})` },
    { key: "organization", label: `Organizations (${counts.organization})` },
  ];

  return (
    <>
      <div className="dir-controls">
        <div className="dir-tabs">
          {tabs.map((t) => (
            <button
              key={t.key}
              className={`dir-tab${type === t.key ? " is-active" : ""}`}
              onClick={() => setType(t.key)}
              type="button"
            >
              {t.label}
            </button>
          ))}
        </div>
        <input
          className="dir-search"
          type="search"
          placeholder="Search by name, skill, place…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search the directory"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="dir-empty">
          No matches yet.{" "}
          <Link href="/community/submit" style={{ color: "var(--red)", fontWeight: 600 }}>
            Add the first one →
          </Link>
        </p>
      ) : (
        <div className="dir-grid">
          {filtered.map((e) => (
            <div key={e.slug} className={`dir-card${e.featured ? " is-featured" : ""}`}>
              <div className="dir-card-head">
                {e.logo ? (
                  <img src={e.logo} alt={`${e.name} logo`} className="dir-avatar" />
                ) : (
                  <div className={`dir-avatar dir-avatar-mono type-${e.type}`} aria-hidden="true">
                    {initials(e.name)}
                  </div>
                )}
                <div>
                  <h3 className="dir-name">{e.name}</h3>
                  <div className="dir-role">{e.role}</div>
                </div>
                <span className={`badge ${e.type === "person" ? "badge-person" : "badge-org"}`}>
                  {e.type === "person" ? "Person" : "Org"}
                </span>
              </div>

              {e.location && <div className="dir-loc">◦ {e.location}</div>}
              <p className="dir-blurb">{e.blurb}</p>

              {e.tags && e.tags.length > 0 && (
                <div className="dir-tags">
                  {e.tags.map((t) => (
                    <span key={t} className="dir-tag">{t}</span>
                  ))}
                </div>
              )}

              {e.projects && e.projects.length > 0 && (
                <div className="dir-projects">
                  <span className="dir-projects-label">Works on:</span>{" "}
                  {e.projects.map((slug, i) => (
                    <span key={slug}>
                      <Link href={`/projects/${slug}`} className="dir-project-link">
                        {nameForSlug(slug)}
                      </Link>
                      {i < e.projects!.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
              )}

              {e.links && e.links.length > 0 && (
                <div className="dir-links">
                  {e.links.map((l) => (
                    <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="dir-link">
                      {l.label} ↗
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}
