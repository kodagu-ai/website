import type { Metadata } from "next";
import Link from "next/link";
import DirectoryExplorer from "./DirectoryExplorer";
import { directory } from "../lib/directory";
import { projects } from "../lib/projects";

export const metadata: Metadata = {
  title: "Community Directory",
  description:
    "The people and organizations building open-source projects with the Kodagu.ai community.",
};

export default function CommunityPage() {
  const projectNames = projects.map((p) => ({ slug: p.slug, name: p.name }));

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="accent-bar" />
          <h1>Community Directory</h1>
          <p className="prose" style={{ fontSize: "1.2rem", color: "var(--ink-soft)" }}>
            The people and organizations building Kodagu.ai together. Find
            collaborators, see who works on what, and add yourself to the map.
          </p>
          <div style={{ marginTop: 20 }}>
            <Link href="/community/submit" className="btn btn-primary">
              Add yourself or your organization
            </Link>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 24 }}>
        <div className="container">
          <DirectoryExplorer entries={directory} projectNames={projectNames} />
          <p className="dir-note">
            Listings are opt-in. Everyone here has asked to be included — we never
            add people from outside sources.
          </p>
        </div>
      </section>
    </>
  );
}
