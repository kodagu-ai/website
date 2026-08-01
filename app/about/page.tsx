import type { Metadata } from "next";
import Link from "next/link";
import {
  RootedIcon,
  UnitedIcon,
  InnovativeIcon,
  SustainableIcon,
} from "../components/icons";
import { getLocale, S } from "../lib/i18n";

export const metadata: Metadata = {
  title: "About",
  description:
    "Kodagu.ai is the digital identity and initiative hub for the Kodava community — bringing together technology, tradition, and purpose.",
};

export default function AboutPage() {
  const locale = getLocale();
  const values = [
    { icon: RootedIcon, title: S.about.vHeritageT[locale], body: S.about.vHeritageB[locale] },
    { icon: UnitedIcon, title: S.about.vCommunityT[locale], body: S.about.vCommunityB[locale] },
    { icon: InnovativeIcon, title: S.about.vInnovationT[locale], body: S.about.vInnovationB[locale] },
    { icon: SustainableIcon, title: S.about.vSustainabilityT[locale], body: S.about.vSustainabilityB[locale] },
  ];
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="accent-bar" />
          <h1>{S.about.title[locale]}</h1>
        </div>
      </section>

      <section style={{ paddingTop: 20 }}>
        <div className="container">
          <div className="prose">
            <p style={{ fontSize: "1.35rem", color: "var(--ink)" }}>{S.about.p1[locale]}</p>
            <p>{S.about.p2[locale]}</p>
            <p>{S.about.p3[locale]}</p>

            <h2>{S.about.valuesHead[locale]}</h2>
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

          <div className="prose founder" style={{ marginTop: 48 }}>
            <div className="accent-bar" />
            <h2>{S.about.founderHead[locale]}</h2>
            <h3 className="founder-name">Poonacha Machaiah</h3>
            <p>{S.about.fp1[locale]}</p>
            <p>{S.about.fp2[locale]}</p>
            <p>{S.about.fp3[locale]}</p>
            <p>{S.about.fp4[locale]}</p>
          </div>

          <div className="prose" style={{ marginTop: 40 }}>
            <h2>{S.about.getInvolvedHead[locale]}</h2>
            <p>{S.about.getInvolvedBody[locale]}</p>
            <Link href="/join" className="btn btn-primary" style={{ marginTop: 8 }}>
              {S.about.joinCommunity[locale]}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
