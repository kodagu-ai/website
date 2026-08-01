import type { Metadata } from "next";
import Link from "next/link";
import CoffeeInsight from "./CoffeeInsight";
import SchemesInsight from "./SchemesInsight";
import ClimateRiskInsight from "./ClimateRiskInsight";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "AI-powered intelligence for Kodagu — coffee market signals, government schemes & compensation, and more of what residents can't easily find, made clear.",
};

export default function InsightsPage() {
  return (
    <>
      <div className="detail-hero">
        <div className="container">
          <Link href="/#almanac" className="back-link">← Kodagu Almanac</Link>
          <div className="detail-title">
            <span className="d-icon" aria-hidden="true">🔎</span>
            <div>
              <h1 style={{ margin: 0 }}>Kodagu Insights</h1>
              <div className="detail-local">Intelligence that&rsquo;s hard to find, made clear</div>
            </div>
          </div>
          <p className="detail-lead">
            Using AI to pull together scattered market, government and local data
            into insights Kodagu residents rarely get to see — and can act on.
          </p>
          <div className="insights-nav">
            <a href="#coffee">☕ Coffee Market</a>
            <a href="#schemes">📜 Schemes &amp; Compensation</a>
            <a href="#risk">⛰️ Landslide &amp; Climate Risk</a>
          </div>
        </div>
        <div className="hero-strip" />
      </div>

      <div className="container">
        <CoffeeInsight />
        <SchemesInsight />
        <ClimateRiskInsight />
      </div>
    </>
  );
}
