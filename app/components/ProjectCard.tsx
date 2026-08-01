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
    <Link
      href={`/projects/${project.slug}`}
      className={`project-card${featured ? " is-featured" : ""}`}
    >
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
          <span className="pc-link">
            Explore project <span className="arrow">→</span>
          </span>
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
    </Link>
  );
}
