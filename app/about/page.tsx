import type { Metadata } from "next";
import Link from "next/link";
import {
  RootedIcon,
  UnitedIcon,
  InnovativeIcon,
  SustainableIcon,
} from "../components/icons";

export const metadata: Metadata = {
  title: "About",
  description:
    "Kodagu.ai is the digital identity and initiative hub for the Kodava community — bringing together technology, tradition, and purpose.",
};

const values = [
  { icon: RootedIcon, title: "Heritage", body: "We honor the history, culture, and land that shape us." },
  { icon: UnitedIcon, title: "Community", body: "We believe in the power of unity and collective progress." },
  { icon: InnovativeIcon, title: "Innovation", body: "We embrace technology to solve real problems." },
  { icon: SustainableIcon, title: "Sustainability", body: "We are committed to protecting our environment and resources." },
];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="accent-bar" />
          <h1>About Kodagu.ai</h1>
        </div>
      </section>

      <section style={{ paddingTop: 20 }}>
        <div className="container">
          <div className="prose">
            <p style={{ fontSize: "1.35rem", color: "var(--ink)" }}>
              Kodagu.ai is the digital identity and initiative hub for the Kodava
              community. It brings together technology, tradition, and purpose to
              build solutions that protect our land, empower our people, and
              preserve our heritage for generations to come.
            </p>
            <p>
              Kodagu — nestled in the Western Ghats of Karnataka — is a land of
              coffee estates, sacred forests, rivers, and a proud, distinct
              culture. As the world changes, our community faces new challenges:
              protecting wildlife and people alike, sustaining the land, and
              carrying our language and traditions forward.
            </p>
            <p>
              This platform is a home for open-source projects that meet those
              challenges. Each one is free to use, built in the open, and owned
              by the community it serves. We start small and grow with purpose —
              one meaningful project at a time.
            </p>

            <h2>Our values</h2>
          </div>

          <div className="value-grid">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div className="v-item" key={v.title}>
                  <Icon className="p-icon" />
                  <h3>{v.title}</h3>
                  <p>{v.body}</p>
                </div>
              );
            })}
          </div>

          <div className="prose" style={{ marginTop: 40 }}>
            <h2>Get involved</h2>
            <p>
              Whether you are a developer, a designer, a wildlife expert, a
              translator, or simply someone who cares about Kodagu, there is a
              place for you here.
            </p>
            <Link href="/join" className="btn btn-primary" style={{ marginTop: 8 }}>
              Join the community
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
