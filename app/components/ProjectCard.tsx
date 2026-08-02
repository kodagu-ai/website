import Link from "next/link";
import type { Project, ProjectStatus } from "../lib/projects";
import { S, type Locale } from "../lib/i18n";

const statusClass: Record<ProjectStatus, string> = {
  Live: "badge-live",
  Beta: "badge-beta",
  "In Development": "badge-dev",
  Planning: "badge-planning",
};

export default function ProjectCard({ project, locale = "en" }: { project: Project; locale?: Locale }) {
  const featured = project.featured;
  const kn = locale === "kn";
  return (
    // Note: the card is an <article>, not an <a>, so we can place multiple
    // links inside it. The "Explore project" link is a stretched link (its
    // ::after covers the whole card) — clicking anywhere on the card opens the
    // project page, while the "Launch app" link stays independently clickable.
    <article className={`project-card${featured ? " is-featured" : ""}`}>
      <div>
        {project.logo ? (
          <img
            src={project.logoMark || project.logo}
            alt={`${project.name} logo`}
            className="pc-logo"
          />
        ) : (
          <div className="pc-icon" aria-hidden="true">{project.icon}</div>
        )}
        <div className="pc-meta">
          <span className={`badge ${statusClass[project.status]}`}>{S.projStatus[project.status][locale]}</span>
          <span className="badge badge-category">{kn && project.categoryKn ? project.categoryKn : project.category}</span>
        </div>
        <div className="pc-meta" style={{ marginBottom: 4 }}>
          <h3 className="pc-name">{project.name}</h3>
          {project.localName && <span className="pc-local">{project.localName}</span>}
        </div>
        <p className="pc-tagline">{kn && project.taglineKn ? project.taglineKn : project.tagline}</p>
        <p className="pc-summary">{kn && project.summaryKn ? project.summaryKn : project.summary}</p>
        <div className="pc-foot">
          <Link
            href={`/projects/${project.slug}`}
            className="pc-link pc-stretched"
          >
            {S.card.explore[locale]} <span className="arrow">→</span>
          </Link>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="pc-launch"
            >
              {S.card.launch[locale]}
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
