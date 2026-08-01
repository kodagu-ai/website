import type { Metadata } from "next";
import NewsFeed from "./NewsFeed";
import { NEWS, BADGES } from "../lib/news";

export const metadata: Metadata = {
  title: "News — Kodagu Today",
  description:
    "Kodagu's verified daily brief: what's happening across the district and the Kodava community, aggregated from many sources, categorised, and rated for trust.",
};

export default function NewsPage() {
  const counts = {
    confirmed: NEWS.filter((n) => n.badge === "confirmed").length,
    reported: NEWS.filter((n) => n.badge === "reported").length,
    unverified: NEWS.filter((n) => n.badge === "unverified").length,
  };

  return (
    <>
      <div className="detail-hero">
        <div className="container">
          <p className="eyebrow" style={{ color: "rgba(255,255,255,0.6)" }}>
            News · updated daily
          </p>
          <div className="detail-title">
            <span className="d-icon" aria-hidden="true">📰</span>
            <div>
              <h1 style={{ margin: 0 }}>Kodagu Today</h1>
              <div className="detail-local">The verified daily brief</div>
            </div>
          </div>
          <p className="detail-lead">
            What&rsquo;s happening across Kodagu and the Kodava community —
            gathered from many sources, sorted by topic, and rated for how much
            you can trust it. The antidote to the WhatsApp rumour mill.
          </p>
        </div>
        <div className="hero-strip" />
      </div>

      <div className="container">
        <section className="news-section">
          {/* Trust legend */}
          <div className="trust-legend">
            <span className="trust-legend-title">How we rate</span>
            <div className="trust-legend-items">
              <span className="trust-badge confirmed">🟢 Confirmed · {counts.confirmed}</span>
              <span className="trust-badge reported">🟡 Reported · {counts.reported}</span>
              <span className="trust-badge unverified">🔴 Unverified · {counts.unverified}</span>
            </div>
            <p className="trust-legend-note">
              {BADGES.confirmed.note} {BADGES.reported.note} {BADGES.unverified.note}{" "}
              Every item links to its sources so you can judge for yourself.
            </p>
          </div>

          <NewsFeed />

          <div className="news-method">
            <h3 className="insight-h3">How this works</h3>
            <p>
              Kodagu.ai <strong>aggregates — it doesn&rsquo;t report</strong>. Each
              day we gather Kodagu news from established outlets, cluster the same
              story across sources, summarise it in plain language, and score it
              on source reliability, corroboration and verifiability. 🟢 Confirmed
              items publish automatically; 🟡 Reported and 🔴 Unverified items are
              held for human review before they appear.
            </p>
            <p className="news-disclaimer">
              This is a trust <em>signal</em>, not a guarantee, and not original
              journalism. We only publish items about individuals when they are
              corroborated and in the public interest. Spotted an error?{" "}
              <a href="mailto:poonacha@cyberhuman.ai?subject=Kodagu%20Today%20correction">
                Tell us
              </a>{" "}
              and we&rsquo;ll fix it.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
