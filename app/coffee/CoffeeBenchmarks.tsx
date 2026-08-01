"use client";

import { useEffect, useState } from "react";

type Market = {
  arabica: { usdPerLb: number; centsPerLb: number; changePct: number } | null;
  usdInr: number | null;
  asOf: string;
};

function Change({ pct }: { pct: number }) {
  const up = pct >= 0;
  return (
    <span className={`ci-chg ${up ? "up" : "down"}`}>
      {up ? "▲" : "▼"} {Math.abs(pct).toFixed(1)}%
    </span>
  );
}

export default function CoffeeBenchmarks() {
  const [m, setM] = useState<Market | null>(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    let live = true;
    fetch("/api/coffee/market")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: Market) => live && setM(d))
      .catch(() => live && setErr(true));
    return () => {
      live = false;
    };
  }, []);

  if (err) return <p className="ci-note">Live market data is unavailable right now.</p>;

  return (
    <div className="ci-bench">
      <div className="ci-card">
        <div className="ci-card-label">Arabica · ICE New York</div>
        {m?.arabica ? (
          <>
            <div className="ci-value">
              ${m.arabica.usdPerLb.toFixed(2)}
              <span className="ci-unit">/ lb</span>
            </div>
            <div className="ci-sub">
              {m.arabica.centsPerLb}¢ · <Change pct={m.arabica.changePct} /> today
            </div>
          </>
        ) : (
          <div className="ci-skel" />
        )}
      </div>

      <div className="ci-card">
        <div className="ci-card-label">Rupee · USD / INR</div>
        {m?.usdInr ? (
          <>
            <div className="ci-value">₹{m.usdInr.toFixed(2)}</div>
            <div className="ci-sub">per US dollar · a weaker ₹ lifts farmgate prices</div>
          </>
        ) : (
          <div className="ci-skel" />
        )}
      </div>

      <div className="ci-card ci-card-muted">
        <div className="ci-card-label">London Robusta</div>
        <div className="ci-value ci-value-sm">Off July high</div>
        <div className="ci-sub">Kodagu's key benchmark — see outlook. Live feed coming.</div>
      </div>
    </div>
  );
}
