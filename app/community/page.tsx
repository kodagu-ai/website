import type { Metadata } from "next";
import Link from "next/link";
import DirectoryExplorer from "./DirectoryExplorer";
import { directory } from "../lib/directory";
import { projects } from "../lib/projects";
import { S } from "../lib/i18n";
import { getLocale } from "../lib/getLocale";

export const metadata: Metadata = {
  title: "Community Directory",
  description:
    "The people and organizations building open-source projects with the Kodagu.ai community.",
};

export default function CommunityPage() {
  const locale = getLocale();
  const projectNames = projects.map((p) => ({ slug: p.slug, name: p.name }));

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="accent-bar" />
          <h1>{S.community.title[locale]}</h1>
          <p className="prose" style={{ fontSize: "1.2rem", color: "var(--ink-soft)" }}>
            {S.community.lead[locale]}
          </p>
          <div style={{ marginTop: 20 }}>
            <Link href="/community/submit" className="btn btn-primary">
              {S.community.addYourself[locale]}
            </Link>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 24 }}>
        <div className="container">
          <DirectoryExplorer entries={directory} projectNames={projectNames} locale={locale} />
          <p className="dir-note">{S.community.note[locale]}</p>
        </div>
      </section>
    </>
  );
}
