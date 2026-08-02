import { SCHEMES } from "../lib/schemes";
import { S } from "../lib/i18n";
import { getLocale } from "../lib/getLocale";

export default function SchemesInsight() {
  const locale = getLocale();
  const kn = locale === "kn";
  return (
    <section className="insight" id="schemes">
      <div className="insight-head">
        <span className="insight-icon" aria-hidden="true">📜</span>
        <div>
          <div className="accent-bar" />
          <h2>{S.insights.schemesH2[locale]}</h2>
          <p className="insight-sub">{S.insights.schemesSub[locale]}</p>
        </div>
      </div>

      <div className="scheme-grid">
        {SCHEMES.map((s) => (
          <div className={`scheme-card${s.featured ? " is-featured" : ""}`} key={s.slug}>
            <div className="scheme-top">
              <span className="scheme-icon" aria-hidden="true">{s.icon}</span>
              <div>
                <span className="scheme-tag">{kn ? s.tagKn : s.tag}</span>
                <h3 className="scheme-title">{kn ? s.titleKn : s.title}</h3>
              </div>
            </div>

            <p className="scheme-for">{kn ? s.forWhomKn : s.forWhom}</p>

            <div className="scheme-benefit">
              <span className="scheme-benefit-label">{S.insights.whatYouGet[locale]}</span>
              <p>{kn ? s.benefitKn : s.benefit}</p>
            </div>

            <div className="scheme-cols">
              <div>
                <span className="scheme-col-label">{S.insights.whoQualifies[locale]}</span>
                <ul className="scheme-list">
                  {(kn ? s.eligibilityKn : s.eligibility).map((e, i) => (
                    <li key={i}>{e}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="scheme-col-label">{S.insights.howToClaim[locale]}</span>
                <ol className="scheme-steps">
                  {(kn ? s.howToApplyKn : s.howToApply).map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="scheme-foot">
              <a href={s.sourceUrl} target="_blank" rel="noreferrer" className="scheme-src">
                {s.source} ↗
              </a>
              <span className="scheme-asof">{S.insights.asOfLabel[locale]} {s.asOf}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="insight-disclaimer">
        <strong>{S.insights.schemesDisBold[locale]}</strong> {S.insights.schemesDisRest[locale]}
      </p>
    </section>
  );
}
