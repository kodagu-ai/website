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

const pillars = [
  {
    icon: RootedIcon,
    title: "Rooted",
    body: "Proud of our heritage, our land, and the values that shape Kodava life.",
  },
  {
    icon: UnitedIcon,
    title: "United",
    body: "Stronger together — a community building shared tools for shared problems.",
  },
  {
    icon: InnovativeIcon,
    title: "Innovative",
    body: "Using open technology to make a real, meaningful impact on the ground.",
  },
  {
    icon: SustainableIcon,
    title: "Sustainable",
    body: "Building for a better, balanced future for Kodagu's people and nature.",
  },
];

export default function Home() {
  const sorted = [...projects].sort(
    (a, b) => Number(b.featured) - Number(a.featured)
  );

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="hero">
        <div className="container">
          <p className="eyebrow" style={{ color: "rgba(255,255,255,0.65)" }}>
            A unified platform for Kodagu
          </p>
          <h1 className="hero-tagline">
            Rooted in Heritage.
            <br />
            Driven by Purpose.
          </h1>
          <p className="lead">
            Kodagu.ai brings the Kodava community together to build open-source
            projects that protect our land, empower our people, and preserve our
            heritage for generations to come.
          </p>
          <div className="hero-actions">
            <Link href="/#projects" className="btn btn-primary">
              Explore Projects
            </Link>
            <a
              href={site.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost-light"
            >
              <GitHubIcon /> Contribute on GitHub
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
            <h2>What brings us together</h2>
            <p>
              Every project on Kodagu.ai is guided by four principles drawn from
              who we are as a community.
            </p>
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
            <h2>Community Projects</h2>
            <p>
              Open-source initiatives built by and for Kodagu. We are starting
              with one and growing from here — new projects join as the
              community builds them.
            </p>
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
                  Your project here
                </h3>
                <p className="pc-summary" style={{ marginTop: 8 }}>
                  Have an idea that serves Kodagu? This hub is built to grow.
                  <br />
                  <Link href="/join" style={{ color: "var(--red)", fontWeight: 600 }}>
                    Propose a project →
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
              <h2>Stay in the loop</h2>
              <p>
                Get occasional updates on new projects, milestones, and ways to
                help — sent only when there’s something worth sharing. No spam.
              </p>
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
            <h2>Build with us</h2>
            <p>
              Kodagu.ai is a community effort. Whether you write code, know the
              land, speak the language, or simply care — there is a place for you
              here.
            </p>
            <div className="hero-actions">
              <Link href="/join" className="btn btn-primary">
                Get Involved
              </Link>
              <a
                href={site.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost-light"
              >
                <GitHubIcon /> View the code
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
