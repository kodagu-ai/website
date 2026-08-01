import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject, allProjectSlugs } from "../../lib/projects";
import { GitHubIcon } from "../../components/icons";

export function generateStaticParams() {
  return allProjectSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = getProject(params.slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.name,
    description: project.summary,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  return (
    <>
      <div className="detail-hero">
        <div className="container">
          <Link href="/#projects" className="back-link">
            ← All projects
          </Link>
          <div className="detail-title">
            <span className="d-icon" aria-hidden="true">{project.icon}</span>
            <div>
              <h1 style={{ margin: 0 }}>{project.name}</h1>
              {project.localName && (
                <div className="detail-local">{project.localName}</div>
              )}
            </div>
          </div>
          <p className="detail-lead">{project.tagline}</p>
          {project.liveUrl && (
            <div style={{ marginTop: 26 }}>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
                style={{ fontSize: "1.05rem", padding: "15px 30px" }}
              >
                Launch the app ↗
              </a>
            </div>
          )}
        </div>
        <div className="hero-strip" />
      </div>

      <div className="container">
        <div className="article">
          <div className="article-body">
            {project.sections?.map((s) => (
              <div key={s.heading}>
                <h2>{s.heading}</h2>
                {s.body.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            ))}

            {project.contribute && project.contribute.length > 0 && (
              <>
                <h2>How you can help</h2>
                <ul className="checklist">
                  {project.contribute.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
                <div style={{ marginTop: 28, display: "flex", gap: 14, flexWrap: "wrap" }}>
                  <Link href="/join" className="btn btn-primary">
                    Get Involved
                  </Link>
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-outline"
                    >
                      <GitHubIcon /> View Repository
                    </a>
                  )}
                </div>
              </>
            )}
          </div>

          <aside className="article-aside">
            <div className="card">
              <h4>Project details</h4>
              <div className="kv">
                <span className="k">Status</span>
                <span className="v">{project.status}</span>
              </div>
              <div className="kv">
                <span className="k">Category</span>
                <span className="v">{project.category}</span>
              </div>
              <div className="kv">
                <span className="k">Region</span>
                <span className="v">Kodagu, Karnataka</span>
              </div>
              <div className="kv">
                <span className="k">License</span>
                <span className="v">Open Source</span>
              </div>
            </div>

            {project.highlights && project.highlights.length > 0 && (
              <div className="card">
                <h4>Highlights</h4>
                <ul className="checklist">
                  {project.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
                style={{ width: "100%", justifyContent: "center", marginBottom: 12 }}
              >
                Launch the app ↗
              </a>
            )}

            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-dark"
                style={{ width: "100%", justifyContent: "center" }}
              >
                <GitHubIcon /> GitHub Repository
              </a>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}
