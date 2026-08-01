"use client";

import { useEffect, useState } from "react";

type Data = {
  pctFull: number;
  storageTMC: number;
  capacityTMC: number;
  inflow: number;
  outflow: number;
  date: string | null;
  status: string;
  tone: string;
};

export default function HarangiReservoir() {
  const [d, setD] = useState<Data | null>(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    let live = true;
    fetch("/api/insights/harangi")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((x: Data) => live && setD(x))
      .catch(() => live && setErr(true));
    return () => {
      live = false;
    };
  }, []);

  if (err)
    return <p className="ci-note">Live Harangi reservoir data is unavailable right now.</p>;
  if (!d) return <div className="harangi-card"><div className="ci-skel" style={{ height: 130 }} /></div>;

  return (
    <div className={`harangi-card tone-${d.tone}`}>
      <div className="harangi-main">
        <div className="harangi-pct">
          {d.pctFull}<span>% full</span>
        </div>
        <div className="harangi-meta">
          <div className="harangi-status">{d.status}</div>
          <div className="harangi-store">
            {d.storageTMC} / {d.capacityTMC} TMC
            {d.date ? ` · ${d.date}` : ""}
          </div>
        </div>
      </div>

      <div className="harangi-bar">
        <div
          className="harangi-fill"
          style={{ width: `${Math.min(100, Math.max(2, d.pctFull))}%` }}
        />
      </div>

      <div className="harangi-flows">
        <span><b>{d.inflow.toLocaleString("en-IN")}</b> cusecs in</span>
        <span><b>{d.outflow.toLocaleString("en-IN")}</b> cusecs released</span>
      </div>

      <p className="harangi-note">
        Harangi sits inside Kodagu; heavy releases raise the Cauvery downstream —
        watch Kushalnagar and low-lying riverside areas. Source: Karnataka Water
        Resources (Cauvery-basin monitor).
      </p>
    </div>
  );
}
