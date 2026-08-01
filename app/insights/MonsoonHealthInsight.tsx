import HealthWatch from "./HealthWatch";
import { HEALTH_RISKS } from "../lib/health";

export default function MonsoonHealthInsight() {
  return (
    <section className="insight" id="health">
      <div className="insight-head">
        <span className="insight-icon" aria-hidden="true">🩺</span>
        <div>
          <div className="accent-bar" />
          <h2>Monsoon Health Watch</h2>
          <p className="insight-sub">
            The illnesses that rise with Kodagu&rsquo;s rain — what to watch for,
            how to prevent them, and when to get help.
          </p>
        </div>
      </div>

      <div className="risk-alert">
        <strong>⚠️ Health-risk awareness, not medical advice.</strong> If you or
        someone is unwell, see a doctor. In an emergency call{" "}
        <a href="tel:112">112</a> or an ambulance on <a href="tel:108">108</a>.
      </div>

      <div className="ci-section">
        <div className="almanac-section-label">This week&rsquo;s watch · from live rainfall</div>
        <HealthWatch />
      </div>

      <div className="ci-section">
        <h3 className="insight-h3">Monsoon health risks</h3>
        <div className="health-grid">
          {HEALTH_RISKS.map((r) => (
            <div className="health-card" key={r.slug}>
              <div className="health-top">
                <span className="health-icon" aria-hidden="true">{r.icon}</span>
                <div>
                  <span className="health-tag">{r.tag}</span>
                  <h4 className="health-name">{r.name}</h4>
                </div>
              </div>
              <p className="health-why">{r.why}</p>

              <div className="health-cols">
                <div>
                  <span className="health-col-label">Watch for</span>
                  <ul className="health-list warn">
                    {r.watchFor.map((w, i) => <li key={i}>{w}</li>)}
                  </ul>
                </div>
                <div>
                  <span className="health-col-label">Prevent</span>
                  <ul className="health-list do">
                    {r.prevent.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
              </div>

              <div className="health-act">
                <span className="health-act-label">When to act</span>
                <p>{r.act}</p>
              </div>

              <a href={r.sourceUrl} target="_blank" rel="noreferrer" className="health-src">
                {r.source} ↗
              </a>
            </div>
          ))}
        </div>
      </div>

      <p className="insight-disclaimer">
        Guidance drawn from WHO and India&rsquo;s National Centre for Disease
        Control, tied to Kodagu&rsquo;s live rainfall. It raises awareness of
        seasonal risk — it does not diagnose or treat. Follow your doctor and any
        district health advisories.
      </p>
    </section>
  );
}
