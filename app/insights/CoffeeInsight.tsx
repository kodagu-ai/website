import CoffeeBenchmarks from "./CoffeeBenchmarks";
import { MARKET } from "../lib/almanac";
import { COFFEE_ASOF, OUTLOOK, DRIVERS, SEASONALITY, CHAIN } from "../lib/coffee";
import { S } from "../lib/i18n";
import { getLocale } from "../lib/getLocale";

export default function CoffeeInsight() {
  const locale = getLocale();
  const kn = locale === "kn";
  const localCoffee = MARKET.filter((m) => m.crop === "Coffee");

  return (
    <section className="insight" id="coffee">
      <div className="insight-head">
        <span className="insight-icon" aria-hidden="true">☕</span>
        <div>
          <div className="accent-bar" />
          <h2>{S.insights.coffeeH2[locale]}</h2>
          <p className="insight-sub">{S.insights.coffeeSub[locale]}</p>
        </div>
      </div>

      <div className="ci-section">
        <div className="almanac-section-label">{S.insights.globalBench[locale]}</div>
        <CoffeeBenchmarks locale={locale} />
      </div>

      <div className="ci-section">
        <div className="almanac-section-label">{S.insights.cpaLocal[locale]}</div>
        <div className="ci-local">
          {localCoffee.map((m) => (
            <div className="ci-local-item" key={m.grade}>
              <span className="ci-local-grade">{m.grade}</span>
              <span className="ci-local-price">
                {m.price} <em>{m.unit}</em>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="ci-section">
        <h3 className="insight-h3">{S.insights.movingHead[locale]}</h3>
        <div className="ci-prose">
          {OUTLOOK[locale].map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <ul className="ci-drivers">
          {DRIVERS.map((d, i) => (
            <li key={i} className={`ci-driver ${d.effect}`}>
              <span className="ci-driver-dir">{d.effect === "up" ? "▲" : "▼"}</span>
              <span className="ci-driver-text">
                {kn ? d.textKn : d.text}{" "}
                <a href={d.url} target="_blank" rel="noreferrer" className="ci-driver-src">
                  {d.source}, {d.date}
                </a>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="ci-section">
        <h3 className="insight-h3">{S.insights.chainHead[locale]}</h3>
        <ol className="ci-chain">
          {CHAIN.map((c, i) => (
            <li key={i} className="ci-chain-step">
              <span className="ci-chain-num">{i + 1}</span>
              <div>
                <div className="ci-chain-label">{kn ? c.stepKn : c.step}</div>
                <div className="ci-chain-note">{kn ? c.noteKn : c.note}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="ci-section">
        <h3 className="insight-h3">{S.insights.sellHead[locale]}</h3>
        <p className="ci-prose">{SEASONALITY[locale]}</p>
      </div>

      <p className="insight-disclaimer">
        <strong>{S.insights.coffeeDisBold[locale]}</strong> {S.insights.coffeeDisMid[locale]}{" "}
        <a href="https://cpa.org.in" target="_blank" rel="noreferrer">Coorg Planters&rsquo; Association</a>.
        {" "}{S.insights.coffeeDisPost[locale]} {COFFEE_ASOF}.
      </p>
    </section>
  );
}
