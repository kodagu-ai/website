import Link from "next/link";
import ProjectCard from "./components/ProjectCard";
import {
  RootedIcon,
  UnitedIcon,
  InnovativeIcon,
  SustainableIcon,
  GitHubIcon,
} from "./components/icons";
import EmailSignup from "./components/EmailSignup";
import KodaguAlmanac from "./components/KodaguAlmanac";
import { projects } from "./lib/projects";
import { site } from "./lib/site";
import { getLocale, S } from "./lib/i18n";

export default function Home() {
  const locale = getLocale();
  const pillars = [
    { icon: RootedIcon, title: S.home.pRootedT[locale], body: S.home.pRootedB[locale] },
    { icon: UnitedIcon, title: S.home.pUnitedT[locale], body: S.home.pUnitedB[locale] },
    { icon: InnovativeIcon, title: S.home.pInnovativeT[locale], body: S.home.pInnovativeB[locale] },
    { icon: SustainableIcon, title: S.home.pSustainableT[locale], body: S.home.pSustainableB[locale] },
  ];
  const sorted = [...projects].sort(
    (a, b) => Number(b.featured) - Number(a.featured)
  );

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="hero">
        <div className="container">
          <p className="eyebrow" style={{ color: "rgba(255,255,255,0.65)" }}>
            {S.home.eyebrow[locale]}
          </p>
          <h1 className="hero-tagline">
            {S.home.heroLine1[locale]}
            <br />
            {S.home.heroLine2[locale]}
          </h1>
          <p className="lead">{S.home.lead[locale]}</p>
          <div className="hero-actions">
            <Link href="/#projects" className="btn btn-primary">
              {S.home.exploreProjects[locale]}
            </Link>
            <a
              href={site.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost-light"
            >
              <GitHubIcon /> {S.home.contributeGithub[locale]}
            </a>
          </div>
        </div>
        <div className="hero-strip" />
      </section>

      {/* ── Kodagu Almanac (live weather + market prices + updates) ── */}
      <KodaguAlmanac />

      {/* ── Pillars ──────────────────────────────────────────── */}
      <section>
        <div className="container">
          <div className="section-head">
            <div className="accent-bar" />
            <h2>{S.home.pillarsHead[locale]}</h2>
            <p>{S.home.pillarsSub[locale]}</p>
          </div>
          <div className="pillars">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div className="pillar" key={p.title}>
                  <Icon className="p-icon" />
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Projects ─────────────────────────────────────────── */}
      <section id="projects" className="section-alt">
        <div className="container">
          <div className="section-head">
            <div className="accent-bar" />
            <h2>{S.home.projectsHead[locale]}</h2>
            <p>{S.home.projectsSub[locale]}</p>
          </div>
          <div className="projects-grid">
            {sorted.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
            {/* Placeholder that invites the next project */}
            <div className="project-card coming">
              <div>
                <div className="pc-icon" aria-hidden="true">✨</div>
                <h3 className="pc-name" style={{ fontSize: "1.4rem" }}>
                  {S.home.yourProjectHere[locale]}
                </h3>
                <p className="pc-summary" style={{ marginTop: 8 }}>
                  {S.home.yourProjectBody[locale]}
                  <br />
                  <Link href="/join" style={{ color: "var(--red)", fontWeight: 600 }}>
                    {S.home.proposeProject[locale]}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stay updated ─────────────────────────────────────── */}
      <section className="section-alt">
        <div className="container">
          <div className="signup-band">
            <div className="signup-copy">
              <div className="accent-bar" />
              <h2>{S.home.stayHead[locale]}</h2>
              <p>{S.home.staySub[locale]}</p>
            </div>
            <div className="signup-form-wrap">
              <EmailSignup />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section>
        <div className="container">
          <div className="cta-band">
            <div className="accent-bar" />
            <h2>{S.home.ctaHead[locale]}</h2>
            <p>{S.home.ctaSub[locale]}</p>
            <div className="hero-actions">
              <Link href="/join" className="btn btn-primary">
                {S.home.getInvolved[locale]}
              </Link>
              <a
                href={site.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost-light"
              >
                <GitHubIcon /> {S.home.viewCode[locale]}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
