import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject } from "../../lib/projects";
import { contributorsForProject } from "../../lib/directory";
import { GitHubIcon } from "../../components/icons";
import { S } from "../../lib/i18n";
import { getLocale } from "../../lib/getLocale";

// Rendered per-request so the header/footer follow the EN/ಕನ್ನಡ locale cookie.
export const dynamic = "force-dynamic";

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

  const locale = getLocale();
  const kn = locale === "kn";
  const contributors = contributorsForProject(project.slug);
  const sections = kn && project.sectionsKn ? project.sectionsKn : project.sections;
  const contribute = kn && project.contributeKn ? project.contributeKn : project.contribute;
  const highlights = kn && project.highlightsKn ? project.highlightsKn : project.highlights;

  return (
    <>
      <div className="detail-hero">
        <div className="container">
          <Link href="/#projects" className="back-link">
            {S.projPage.backAll[locale]}
          </Link>
          <div className="detail-title">
            {project.logo ? (
              <img
                src={project.logo}
                alt={`${project.name} logo`}
                className="d-logo"
                style={{ height: 64, width: "auto", display: "block" }}
              />
            ) : (
              <span className="d-icon" aria-hidden="true">{project.icon}</span>
            )}
            <div>
              <h1 style={{ margin: 0 }}>{project.name}</h1>
              {project.localName && (
                <div className="detail-local">{project.localName}</div>
              )}
            </div>
          </div>
          <p className="detail-lead">{kn && project.taglineKn ? project.taglineKn : project.tagline}</p>
          {project.liveUrl && (
            <div style={{ marginTop: 26 }}>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
                style={{ fontSize: "1.05rem", padding: "15px 30px" }}
              >
                {S.projPage.launchApp[locale]}
              </a>
            </div>
          )}
        </div>
        <div className="hero-strip" />
      </div>

      <div className="container">
        <div className="article">
          <div className="article-body">
            {sections?.map((s) => (
              <div key={s.heading}>
                <h2>{s.heading}</h2>
                {s.body.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            ))}

            {contribute && contribute.length > 0 && (
              <>
                <h2>{S.projPage.howHelp[locale]}</h2>
                <ul className="checklist">
                  {contribute.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
                <div style={{ marginTop: 28, display: "flex", gap: 14, flexWrap: "wrap" }}>
                  <Link href="/join" className="btn btn-primary">
                    {S.home.getInvolved[locale]}
                  </Link>
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-outline"
                    >
                      <GitHubIcon /> {S.projPage.viewRepo[locale]}
                    </a>
                  )}
                </div>
              </>
            )}
          </div>

          <aside className="article-aside">
            <div className="card">
              <h4>{S.projPage.details[locale]}</h4>
              <div className="kv">
                <span className="k">{S.projPage.status[locale]}</span>
                <span className="v">{S.projStatus[project.status][locale]}</span>
              </div>
              <div className="kv">
                <span className="k">{S.projPage.category[locale]}</span>
                <span className="v">{kn && project.categoryKn ? project.categoryKn : project.category}</span>
              </div>
              <div className="kv">
                <span className="k">{S.projPage.region[locale]}</span>
                <span className="v">{S.projPage.regionVal[locale]}</span>
              </div>
              <div className="kv">
                <span className="k">{S.projPage.license[locale]}</span>
                <span className="v">{S.projPage.openSource[locale]}</span>
              </div>
            </div>

            {highlights && highlights.length > 0 && (
              <div className="card">
                <h4>{S.projPage.highlights[locale]}</h4>
                <ul className="checklist">
                  {highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            )}

            {contributors.length > 0 && (
              <div className="card">
                <h4>{S.projPage.community[locale]}</h4>
                <ul className="contrib-list">
                  {contributors.map((c) => (
                    <li key={c.slug} className="contrib">
                      <span className="contrib-name">{c.name}</span>
                      <span className="contrib-role">{c.role}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/community" className="contrib-link">
                  {S.projPage.seeFullDir[locale]}
                </Link>
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
                {S.projPage.launchApp[locale]}
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
                <GitHubIcon /> {S.projPage.githubRepo[locale]}
              </a>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}
