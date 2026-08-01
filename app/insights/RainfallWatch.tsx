"use client";

import { useEffect, useState } from "react";

type Town = {
  name: string;
  recentMm: number;
  forecastMm: number;
  band: string;
  tone: string;
};
type Resp = { towns: Town[]; updated: string };

export default function RainfallWatch() {
  const [data, setData] = useState<Resp | null>(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    let live = true;
    fetch("/api/insights/rainfall")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: Resp) => live && setData(d))
      .catch(() => live && setErr(true));
    return () => {
      live = false;
    };
  }, []);

  if (err)
    return <p className="ci-note">Live rainfall data is unavailable right now.</p>;

  return (
    <>
      <div className="rain-grid">
        {data?.towns
          ? data.towns.map((t) => (
              <div className={`rain-town tone-${t.tone}`} key={t.name}>
                <div className="rain-top">
                  <span className="rain-name">{t.name}</span>
                  <span className="rain-band">{t.band}</span>
                </div>
                <div className="rain-figs">
                  <div>
                    <span className="rain-val">{t.recentMm}<i>mm</i></span>
                    <span className="rain-lbl">last 3 days</span>
                  </div>
                  <div>
                    <span className="rain-val">{t.forecastMm}<i>mm</i></span>
                    <span className="rain-lbl">next 3 days</span>
                  </div>
                </div>
              </div>
            ))
          : [0, 1, 2, 3, 4].map((i) => <div className="rain-town rain-skel" key={i} />)}
      </div>
      {data?.updated && (
        <p className="rain-updated">
          Rainfall accumulation, updated {data.updated} IST · a higher band means
          heavier recent rain, which raises landslide risk on steep slopes.
        </p>
      )}
    </>
  );
}
