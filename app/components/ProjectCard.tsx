import Link from "next/link";
import type { Project, ProjectStatus } from "../lib/projects";

const statusClass: Record<ProjectStatus, string> = {
  Live: "badge-live",
  Beta: "badge-beta",
  "In Development": "badge-dev",
  Planning: "badge-planning",
};

export default function ProjectCard({ project }: { project: Project }) {
  const featured = project.featured;
  return (
    // Note: the card is an <article>, not an <a>, so we can place multiple
    // links inside it. The "Explore project" link is a stretched link (its
    // ::after covers the whole card) — clicking anywhere on the card opens the
    // project page, while the "Launch app" link stays independently clickable.
    <article className={`project-card${featured ? " is-featured" : ""}`}>
      <div>
        {project.logo ? (
          <img
            src={project.logo}
            alt={`${project.name} logo`}
            className="pc-logo"
          />
        ) : (
          <div className="pc-icon" aria-hidden="true">{project.icon}</div>
        )}
        <div className="pc-meta">
          <span className={`badge ${statusClass[project.status]}`}>{project.status}</span>
          <span className="badge badge-category">{project.category}</span>
        </div>
        <div className="pc-meta" style={{ marginBottom: 4 }}>
          <h3 className="pc-name">{project.name}</h3>
          {project.localName && <span className="pc-local">{project.localName}</span>}
        </div>
        <p className="pc-tagline">{project.tagline}</p>
        <p className="pc-summary">{project.summary}</p>
        <div className="pc-foot">
          <Link
            href={`/projects/${project.slug}`}
            className="pc-link pc-stretched"
          >
            Explore project <span className="arrow">→</span>
          </Link>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="pc-launch"
            >
              Launch app ↗
            </a>
          )}
        </div>
      </div>
      {featured && (
        <div className="pc-featured-media" aria-hidden="true">
          {project.logo ? (
            <img src={project.logo} alt="" className="pc-featured-logo" />
          ) : (
            <span style={{ fontSize: "8rem", lineHeight: 1 }}>{project.icon}</span>
          )}
        </div>
      )}
    </article>
  );
}
