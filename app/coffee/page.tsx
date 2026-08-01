import type { Metadata } from "next";
import Link from "next/link";
import CoffeeBenchmarks from "./CoffeeBenchmarks";
import { MARKET } from "../lib/almanac";
import { COFFEE_ASOF, OUTLOOK, DRIVERS, SEASONALITY, CHAIN } from "../lib/coffee";

export const metadata: Metadata = {
  title: "Coffee Intelligence",
  description:
    "Why Kodagu coffee prices move and when to sell — global futures, the rupee, and market drivers, connected to your farmgate price.",
};

export default function CoffeePage() {
  const localCoffee = MARKET.filter((m) => m.crop === "Coffee");

  return (
    <>
      <div className="detail-hero">
        <div className="container">
          <Link href="/#almanac" className="back-link">← Kodagu Almanac</Link>
          <div className="detail-title">
            <span className="d-icon" aria-hidden="true">☕</span>
            <div>
              <h1 style={{ margin: 0 }}>Coffee Intelligence</h1>
              <div className="detail-local">What moves your price — and when to sell</div>
            </div>
          </div>
          <p className="detail-lead">
            The global signals behind Kodagu's farmgate coffee price, in plain
            language — the picture growers rarely get to see connected.
          </p>
        </div>
        <div className="hero-strip" />
      </div>

      <div className="container">
        <section className="ci-section">
          <div className="almanac-section-label">Global benchmarks · live</div>
          <CoffeeBenchmarks />
        </section>

        <section className="ci-section">
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
        </section>

        <section className="ci-section">
          <div className="accent-bar" />
          <h2>What&rsquo;s moving the market</h2>
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
        </section>

        <section className="ci-section">
          <div className="accent-bar" />
          <h2>How a price in London reaches your estate</h2>
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
        </section>

        <section className="ci-section">
          <div className="accent-bar" />
          <h2>When to sell</h2>
          <p className="ci-prose">{SEASONALITY}</p>
        </section>

        <section className="ci-section ci-disclaimer">
          <p>
            <strong>Market information, not financial advice.</strong> Global
            prices are delayed and indicative; local figures are from the{" "}
            <a href="https://cpa.org.in" target="_blank" rel="noreferrer">Coorg Planters&rsquo; Association</a>.
            Always confirm with your buyer or broker before selling. Outlook as
            of {COFFEE_ASOF}.
          </p>
        </section>
      </div>
    </>
  );
}
