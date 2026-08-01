import type { Metadata } from "next";
import { GitHubIcon } from "../components/icons";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Join the Kodagu.ai community — contribute code, verify sightings, translate, or propose a new project.",
};

const roles = [
  {
    title: "Developers",
    body: "Build and improve the projects — frontend, backend, mobile, data, and infrastructure. Every project is open source.",
  },
  {
    title: "Community Coordinators",
    body: "Be the trusted local link — verify information, onboard villages and estates, and keep projects grounded in reality.",
  },
  {
    title: "Designers & Translators",
    body: "Make everything clear and usable in Kodava thakk, Kannada, and English, with a design that respects the brand.",
  },
  {
    title: "Domain Experts",
    body: "Wildlife biologists, farmers, Forest Department partners, historians — your knowledge shapes what we build.",
  },
];

export default function JoinPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="accent-bar" />
          <h1>Get Involved</h1>
          <p className="prose" style={{ fontSize: "1.2rem", color: "var(--ink-soft)" }}>
            Kodagu.ai is built by the community, for the community. Here is how
            you can be part of it.
          </p>
        </div>
      </section>

      <section style={{ paddingTop: 20 }}>
        <div className="container">
          <div className="roles">
            {roles.map((r) => (
              <div className="role" key={r.title}>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
              </div>
            ))}
          </div>

          <div className="prose" style={{ marginTop: 48 }}>
            <h2>Start here</h2>
            <p>
              All our work lives on GitHub. Browse the projects, open an issue,
              or say hello — no contribution is too small.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 8 }}>
              <a href={site.githubUrl} target="_blank" rel="noreferrer" className="btn btn-dark">
                <GitHubIcon /> Visit our GitHub
              </a>
              <a href={`mailto:${site.contactEmail}`} className="btn btn-outline">
                Email the team
              </a>
            </div>
          </div>

          <div className="prose" style={{ marginTop: 44 }}>
            <h2>Propose a project</h2>
            <p>
              Have an idea that serves Kodagu — its people, land, language, or
              wildlife? This hub is designed to grow. Reach out with your idea and
              we will help you get it off the ground.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
