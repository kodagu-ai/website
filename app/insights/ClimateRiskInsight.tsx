import RainfallWatch from "./RainfallWatch";
import HarangiReservoir from "./HarangiReservoir";
import {
  WHY_AT_RISK,
  WARNING_SIGNS,
  WHAT_TO_DO,
  CONTACTS,
  CLIMATE_SOURCES,
} from "../lib/climate";
import { S } from "../lib/i18n";
import { getLocale } from "../lib/getLocale";

export default function ClimateRiskInsight() {
  const locale = getLocale();
  return (
    <section className="insight" id="risk">
      <div className="insight-head">
        <span className="insight-icon" aria-hidden="true">⛰️</span>
        <div>
          <div className="accent-bar" />
          <h2>{S.insights.riskH2[locale]}</h2>
          <p className="insight-sub">{S.insights.riskSub[locale]}</p>
        </div>
      </div>

      <div className="risk-alert">
        <strong>{S.insights.riskAlertBold[locale]}</strong>{" "}
        {S.insights.riskAlertMid[locale]} <a href="tel:112">112</a>{" "}
        {S.insights.riskAlertOr[locale]} <a href="tel:1077">1077</a>.
      </div>

      <div className="ci-section">
        <div className="almanac-section-label">{S.insights.rainfallLabel[locale]}</div>
        <RainfallWatch locale={locale} />
      </div>

      <div className="ci-section">
        <div className="almanac-section-label">{S.insights.harangiLabel[locale]}</div>
        <HarangiReservoir locale={locale} />
      </div>

      <div className="ci-section">
        <h3 className="insight-h3">{S.insights.whyHead[locale]}</h3>
        <div className="ci-prose">
          {WHY_AT_RISK[locale].map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>

      <div className="ci-section">
        <div className="risk-cols">
          <div>
            <h3 className="insight-h3">{S.insights.warnHead[locale]}</h3>
            <ul className="risk-list warn">
              {WARNING_SIGNS[locale].map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="insight-h3">{S.insights.doHead[locale]}</h3>
            <ul className="risk-list do">
              {WHAT_TO_DO[locale].map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="ci-section">
        <h3 className="insight-h3">{S.insights.contactsHead[locale]}</h3>
        <div className="contact-grid">
          {CONTACTS.map((c) => (
            <a className="contact" href={`tel:${c.number.replace(/[^0-9+]/g, "")}`} key={c.label}>
              <span className="contact-num">{c.number}</span>
              <span className="contact-lbl">
                {locale === "kn" ? c.labelKn : c.label}
                {c.note ? ` · ${locale === "kn" ? c.noteKn : c.note}` : ""}
              </span>
            </a>
          ))}
        </div>
      </div>

      <p className="insight-disclaimer">
        {S.insights.riskDisPre[locale]}{" "}
        {CLIMATE_SOURCES.map((s, i) => (
          <span key={s.url}>
            <a href={s.url} target="_blank" rel="noreferrer">{locale === "kn" ? s.labelKn : s.label}</a>
            {i < CLIMATE_SOURCES.length - 1 ? ", " : ""}
          </span>
        ))}
        {S.insights.riskDisPost[locale]}
      </p>
    </section>
  );
}
