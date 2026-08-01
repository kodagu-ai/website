import type { Metadata } from "next";
import { GitHubIcon } from "../components/icons";
import { site } from "../lib/site";
import { S } from "../lib/i18n";
import { getLocale } from "../lib/getLocale";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Join the Kodagu.ai community — contribute code, verify sightings, translate, or propose a new project.",
};

export default function JoinPage() {
  const locale = getLocale();
  const roles = [
    { title: S.join.devT[locale], body: S.join.devB[locale] },
    { title: S.join.coordT[locale], body: S.join.coordB[locale] },
    { title: S.join.designT[locale], body: S.join.designB[locale] },
    { title: S.join.expertT[locale], body: S.join.expertB[locale] },
  ];
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="accent-bar" />
          <h1>{S.join.title[locale]}</h1>
          <p className="prose" style={{ fontSize: "1.2rem", color: "var(--ink-soft)" }}>
            {S.join.lead[locale]}
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
            <h2>{S.join.startHead[locale]}</h2>
            <p>{S.join.startBody[locale]}</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 8 }}>
              <a href={site.githubUrl} target="_blank" rel="noreferrer" className="btn btn-dark">
                <GitHubIcon /> {S.join.visitGithub[locale]}
              </a>
              <a href={`mailto:${site.contactEmail}`} className="btn btn-outline">
                {S.join.emailTeam[locale]}
              </a>
            </div>
          </div>

          <div className="prose" style={{ marginTop: 44 }}>
            <h2>{S.join.proposeHead[locale]}</h2>
            <p>{S.join.proposeBody[locale]}</p>
          </div>
        </div>
      </section>
    </>
  );
}
