"use client";

import { useEffect, useState } from "react";
import { S, type Locale } from "../lib/i18n";

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

export default function HarangiReservoir({ locale = "en" }: { locale?: Locale }) {
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

  if (err) return <p className="ci-note">{S.insights.harangiUnavail[locale]}</p>;
  if (!d) return <div className="harangi-card"><div className="ci-skel" style={{ height: 130 }} /></div>;

  return (
    <div className={`harangi-card tone-${d.tone}`}>
      <div className="harangi-main">
        <div className="harangi-pct">
          {d.pctFull}<span>{S.insights.pctFull[locale]}</span>
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
        <span><b>{d.inflow.toLocaleString("en-IN")}</b> {S.insights.cusecsIn[locale]}</span>
        <span><b>{d.outflow.toLocaleString("en-IN")}</b> {S.insights.cusecsReleased[locale]}</span>
      </div>

      <p className="harangi-note">{S.insights.harangiNote[locale]}</p>
    </div>
  );
}
