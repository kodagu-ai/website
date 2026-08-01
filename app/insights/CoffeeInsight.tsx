import CoffeeBenchmarks from "./CoffeeBenchmarks";
import { MARKET } from "../lib/almanac";
import { COFFEE_ASOF, OUTLOOK, DRIVERS, SEASONALITY, CHAIN } from "../lib/coffee";

export default function CoffeeInsight() {
  const localCoffee = MARKET.filter((m) => m.crop === "Coffee");

  return (
    <section className="insight" id="coffee">
      <div className="insight-head">
        <span className="insight-icon" aria-hidden="true">☕</span>
        <div>
          <div className="accent-bar" />
          <h2>Coffee Market Intelligence</h2>
          <p className="insight-sub">
            What moves your farmgate price — and when to sell. The global signals,
            in plain language.
          </p>
        </div>
      </div>

      <div className="ci-section">
        <div className="almanac-section-label">Global benchmarks · live</div>
        <CoffeeBenchmarks />
      </div>

      <div className="ci-section">
        <div className="almanac-section-label">Kodagu farmgate · CPA board</div>
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
        <h3 className="insight-h3">What&rsquo;s moving the market</h3>
        <div className="ci-prose">
          {OUTLOOK.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <ul className="ci-drivers">
          {DRIVERS.map((d, i) => (
            <li key={i} className={`ci-driver ${d.effect}`}>
              <span className="ci-driver-dir">{d.effect === "up" ? "▲" : "▼"}</span>
              <span className="ci-driver-text">
                {d.text}{" "}
                <a href={d.url} target="_blank" rel="noreferrer" className="ci-driver-src">
                  {d.source}, {d.date}
                </a>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="ci-section">
        <h3 className="insight-h3">How a price in London reaches your estate</h3>
        <ol className="ci-chain">
          {CHAIN.map((c, i) => (
            <li key={i} className="ci-chain-step">
              <span className="ci-chain-num">{i + 1}</span>
              <div>
                <div className="ci-chain-label">{c.step}</div>
                <div className="ci-chain-note">{c.note}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="ci-section">
        <h3 className="insight-h3">When to sell</h3>
        <p className="ci-prose">{SEASONALITY}</p>
      </div>

      <p className="insight-disclaimer">
        <strong>Market information, not financial advice.</strong> Global prices
        are delayed and indicative; local figures are from the{" "}
        <a href="https://cpa.org.in" target="_blank" rel="noreferrer">Coorg Planters&rsquo; Association</a>.
        Confirm with your buyer before selling. Outlook as of {COFFEE_ASOF}.
      </p>
    </section>
  );
}
