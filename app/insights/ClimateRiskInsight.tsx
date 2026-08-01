import RainfallWatch from "./RainfallWatch";
import {
  WHY_AT_RISK,
  WARNING_SIGNS,
  WHAT_TO_DO,
  CONTACTS,
  CLIMATE_SOURCES,
} from "../lib/climate";

export default function ClimateRiskInsight() {
  return (
    <section className="insight" id="risk">
      <div className="insight-head">
        <span className="insight-icon" aria-hidden="true">⛰️</span>
        <div>
          <div className="accent-bar" />
          <h2>Landslide &amp; Climate Risk</h2>
          <p className="insight-sub">
            A live rainfall watch for Kodagu, with the context and the steps that
            matter when the monsoon turns dangerous.
          </p>
        </div>
      </div>

      <div className="risk-alert">
        <strong>⚠️ This is a rainfall indicator, not an official warning.</strong>{" "}
        It never replaces IMD or Kodagu district (KSNDMC / DDMA) alerts. In an
        emergency, call <a href="tel:112">112</a> or the disaster helpline{" "}
        <a href="tel:1077">1077</a>.
      </div>

      <div className="ci-section">
        <div className="almanac-section-label">Rainfall watch · live</div>
        <RainfallWatch />
      </div>

      <div className="ci-section">
        <h3 className="insight-h3">Why Kodagu is at risk</h3>
        <div className="ci-prose">
          {WHY_AT_RISK.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>

      <div className="ci-section">
        <div className="risk-cols">
          <div>
            <h3 className="insight-h3">Warning signs</h3>
            <ul className="risk-list warn">
              {WARNING_SIGNS.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="insight-h3">What to do</h3>
            <ul className="risk-list do">
              {WHAT_TO_DO.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="ci-section">
        <h3 className="insight-h3">Emergency contacts · Kodagu</h3>
        <div className="contact-grid">
          {CONTACTS.map((c) => (
            <a className="contact" href={`tel:${c.number.replace(/[^0-9+]/g, "")}`} key={c.label}>
              <span className="contact-num">{c.number}</span>
              <span className="contact-lbl">
                {c.label}
                {c.note ? ` · ${c.note}` : ""}
              </span>
            </a>
          ))}
        </div>
      </div>

      <p className="insight-disclaimer">
        Rainfall is live from Open-Meteo; district context from{" "}
        {CLIMATE_SOURCES.map((s, i) => (
          <span key={s.url}>
            <a href={s.url} target="_blank" rel="noreferrer">{s.label}</a>
            {i < CLIMATE_SOURCES.length - 1 ? ", " : ""}
          </span>
        ))}
        . Bands describe rainfall intensity, not slope stability. Always follow
        official IMD and Kodagu district alerts.
      </p>
    </section>
  );
}
