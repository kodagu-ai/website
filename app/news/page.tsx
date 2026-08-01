import type { Metadata } from "next";
import NewsFeed from "./NewsFeed";
import { BADGES } from "../lib/news";
import { S } from "../lib/i18n";
import { getLocale } from "../lib/getLocale";

export const metadata: Metadata = {
  title: "News — Kodagu Today",
  description:
    "Kodagu's verified daily brief: what's happening across the district and the Kodava community, aggregated from many sources, categorised, and rated for trust.",
};

export default function NewsPage() {
  const locale = getLocale();
  const badgeLabel = (b: "confirmed" | "reported" | "unverified") =>
    locale === "kn" ? BADGES[b].labelKn : BADGES[b].label;
  const badgeNote = (b: "confirmed" | "reported" | "unverified") =>
    locale === "kn" ? BADGES[b].noteKn : BADGES[b].note;

  return (
    <>
      <div className="detail-hero">
        <div className="container">
          <p className="eyebrow" style={{ color: "rgba(255,255,255,0.6)" }}>
            {S.news.eyebrow[locale]}
          </p>
          <div className="detail-title">
            <span className="d-icon" aria-hidden="true">📰</span>
            <div>
              <h1 style={{ margin: 0 }}>{S.news.brandTitle[locale]}</h1>
              <div className="detail-local">{S.news.brandSub[locale]}</div>
            </div>
          </div>
          <p className="detail-lead">{S.news.lead[locale]}</p>
        </div>
        <div className="hero-strip" />
      </div>

      <div className="container">
        <section className="news-section">
          {/* Trust legend */}
          <div className="trust-legend">
            <span className="trust-legend-title">{S.news.howWeRate[locale]}</span>
            <div className="trust-legend-items">
              <span className="trust-badge confirmed">🟢 {badgeLabel("confirmed")}</span>
              <span className="trust-badge reported">🟡 {badgeLabel("reported")}</span>
              <span className="trust-badge unverified">🔴 {badgeLabel("unverified")}</span>
            </div>
            <p className="trust-legend-note">
              {badgeNote("confirmed")} {badgeNote("reported")} {badgeNote("unverified")}{" "}
              {S.news.legendTail[locale]}
            </p>
          </div>

          <NewsFeed locale={locale} />

          <div className="news-method">
            <h3 className="insight-h3">{S.news.worksHead[locale]}</h3>
            <p>{S.news.worksBody[locale]}</p>
            <p className="news-disclaimer">
              {S.news.disclaimerPre[locale]}{" "}
              <a href="mailto:poonacha@cyberhuman.ai?subject=Kodagu%20Today%20correction">
                {S.news.tellUs[locale]}
              </a>{" "}
              {S.news.disclaimerPost[locale]}
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
