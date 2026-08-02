import HealthWatch from "./HealthWatch";
import { HEALTH_RISKS } from "../lib/health";
import { S } from "../lib/i18n";
import { getLocale } from "../lib/getLocale";

export default function MonsoonHealthInsight() {
  const locale = getLocale();
  const kn = locale === "kn";
  return (
    <section className="insight" id="health">
      <div className="insight-head">
        <span className="insight-icon" aria-hidden="true">🩺</span>
        <div>
          <div className="accent-bar" />
          <h2>{S.insights.healthH2[locale]}</h2>
          <p className="insight-sub">{S.insights.healthSub[locale]}</p>
        </div>
      </div>

      <div className="risk-alert">
        <strong>{S.insights.healthAlertBold[locale]}</strong> {S.insights.healthAlertMid[locale]}{" "}
        <a href="tel:112">112</a> {S.insights.healthAlertAmb[locale]} <a href="tel:108">108</a>.
      </div>

      <div className="ci-section">
        <div className="almanac-section-label">{S.insights.thisWeekLabel[locale]}</div>
        <HealthWatch locale={locale} />
      </div>

      <div className="ci-section">
        <h3 className="insight-h3">{S.insights.risksHead[locale]}</h3>
        <div className="health-grid">
          {HEALTH_RISKS.map((r) => (
            <div className="health-card" key={r.slug}>
              <div className="health-top">
                <span className="health-icon" aria-hidden="true">{r.icon}</span>
                <div>
                  <span className="health-tag">{kn ? r.tagKn : r.tag}</span>
                  <h4 className="health-name">{kn ? r.nameKn : r.name}</h4>
                </div>
              </div>
              <p className="health-why">{kn ? r.whyKn : r.why}</p>

              <div className="health-cols">
                <div>
                  <span className="health-col-label">{S.insights.watchForLabel[locale]}</span>
                  <ul className="health-list warn">
                    {(kn ? r.watchForKn : r.watchFor).map((w, i) => <li key={i}>{w}</li>)}
                  </ul>
                </div>
                <div>
                  <span className="health-col-label">{S.insights.preventLabel[locale]}</span>
                  <ul className="health-list do">
                    {(kn ? r.preventKn : r.prevent).map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
              </div>

              <div className="health-act">
                <span className="health-act-label">{S.insights.whenToActLabel[locale]}</span>
                <p>{kn ? r.actKn : r.act}</p>
              </div>

              <a href={r.sourceUrl} target="_blank" rel="noreferrer" className="health-src">
                {r.source} ↗
              </a>
            </div>
          ))}
        </div>
      </div>

      <p className="insight-disclaimer">{S.insights.healthDisclaimer[locale]}</p>
    </section>
  );
}
