import type { Metadata } from "next";
import Link from "next/link";
import CoffeeInsight from "./CoffeeInsight";
import SchemesInsight from "./SchemesInsight";
import ClimateRiskInsight from "./ClimateRiskInsight";
import MonsoonHealthInsight from "./MonsoonHealthInsight";
import { S } from "../lib/i18n";
import { getLocale } from "../lib/getLocale";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "AI-powered intelligence for Kodagu — coffee market signals, government schemes & compensation, and more of what residents can't easily find, made clear.",
};

export default function InsightsPage() {
  const locale = getLocale();
  return (
    <>
      <div className="detail-hero">
        <div className="container">
          <Link href="/#almanac" className="back-link">{S.insights.back[locale]}</Link>
          <div className="detail-title">
            <span className="d-icon" aria-hidden="true">🔎</span>
            <div>
              <h1 style={{ margin: 0 }}>{S.insights.title[locale]}</h1>
              <div className="detail-local">{S.insights.sub[locale]}</div>
            </div>
          </div>
          <p className="detail-lead">{S.insights.lead[locale]}</p>
          <div className="insights-nav">
            <a href="#coffee">{S.insights.navCoffee[locale]}</a>
            <a href="#schemes">{S.insights.navSchemes[locale]}</a>
            <a href="#risk">{S.insights.navRisk[locale]}</a>
            <a href="#health">{S.insights.navHealth[locale]}</a>
          </div>
        </div>
        <div className="hero-strip" />
      </div>

      <div className="container">
        <CoffeeInsight />
        <SchemesInsight />
        <ClimateRiskInsight />
        <MonsoonHealthInsight />
      </div>
    </>
  );
}
