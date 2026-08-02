"use client";

import { useEffect, useState } from "react";
import { S, type Locale } from "../lib/i18n";

type Town = {
  name: string;
  recentMm: number;
  forecastMm: number;
  band: string;
  tone: string;
};
type Resp = { towns: Town[]; updated: string };

// Map the API's English band label to Kannada.
const BAND_KN: Record<string, string> = {
  Calm: S.insights.bandCalm.kn,
  Wet: S.insights.bandWet.kn,
  "Very wet": S.insights.bandVeryWet.kn,
  Extreme: S.insights.bandExtreme.kn,
};

export default function RainfallWatch({ locale = "en" }: { locale?: Locale }) {
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

  if (err) return <p className="ci-note">{S.insights.rainUnavail[locale]}</p>;
  const kn = locale === "kn";

  return (
    <>
      <div className="rain-grid">
        {data?.towns
          ? data.towns.map((t) => (
              <div className={`rain-town tone-${t.tone}`} key={t.name}>
                <div className="rain-top">
                  <span className="rain-name">{t.name}</span>
                  <span className="rain-band">{kn ? BAND_KN[t.band] ?? t.band : t.band}</span>
                </div>
                <div className="rain-figs">
                  <div>
                    <span className="rain-val">{t.recentMm}<i>mm</i></span>
                    <span className="rain-lbl">{S.insights.rainLast3[locale]}</span>
                  </div>
                  <div>
                    <span className="rain-val">{t.forecastMm}<i>mm</i></span>
                    <span className="rain-lbl">{S.insights.rainNext3[locale]}</span>
                  </div>
                </div>
              </div>
            ))
          : [0, 1, 2, 3, 4].map((i) => <div className="rain-town rain-skel" key={i} />)}
      </div>
      {data?.updated && (
        <p className="rain-updated">
          {S.insights.rainUpdatedPre[locale]} {data.updated} {S.insights.rainUpdatedPost[locale]}
        </p>
      )}
    </>
  );
}
