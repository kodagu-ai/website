import { SCHEMES } from "../lib/schemes";

export default function SchemesInsight() {
  return (
    <section className="insight" id="schemes">
      <div className="insight-head">
        <span className="insight-icon" aria-hidden="true">📜</span>
        <div>
          <div className="accent-bar" />
          <h2>Schemes &amp; Compensation Decoder</h2>
          <p className="insight-sub">
            The government support Kodagu residents are entitled to — what it&rsquo;s
            for, who qualifies, and exactly how to claim it.
          </p>
        </div>
      </div>

      <div className="scheme-grid">
        {SCHEMES.map((s) => (
          <div className={`scheme-card${s.featured ? " is-featured" : ""}`} key={s.slug}>
            <div className="scheme-top">
              <span className="scheme-icon" aria-hidden="true">{s.icon}</span>
              <div>
                <span className="scheme-tag">{s.tag}</span>
                <h3 className="scheme-title">{s.title}</h3>
              </div>
            </div>

            <p className="scheme-for">{s.forWhom}</p>

            <div className="scheme-benefit">
              <span className="scheme-benefit-label">What you get</span>
              <p>{s.benefit}</p>
            </div>

            <div className="scheme-cols">
              <div>
                <span className="scheme-col-label">Who qualifies</span>
                <ul className="scheme-list">
                  {s.eligibility.map((e, i) => (
                    <li key={i}>{e}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="scheme-col-label">How to claim</span>
                <ol className="scheme-steps">
                  {s.howToApply.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="scheme-foot">
              <a href={s.sourceUrl} target="_blank" rel="noreferrer" className="scheme-src">
                {s.source} ↗
              </a>
              <span className="scheme-asof">as of {s.asOf}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="insight-disclaimer">
        <strong>Guidance, not official confirmation.</strong> Amounts, eligibility
        and deadlines change and vary case by case. Always verify with the named
        office before acting. Kodagu.ai is not affiliated with any government body.
      </p>
    </section>
  );
}
