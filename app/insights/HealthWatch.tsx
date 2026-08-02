"use client";

import { useEffect, useState } from "react";
import { HEALTH_LEVELS } from "../lib/health";
import { S, type Locale } from "../lib/i18n";

type Town = { name: string; recentMm: number };

// Derive the health-watch level from the heaviest recent rainfall across towns.
function levelFor(maxRecent: number): keyof typeof HEALTH_LEVELS {
  if (maxRecent >= 150) return "high";
  if (maxRecent >= 60) return "wet";
  return "calm";
}

export default function HealthWatch({ locale = "en" }: { locale?: Locale }) {
  const [level, setLevel] = useState<keyof typeof HEALTH_LEVELS | null>(null);
  const [peak, setPeak] = useState<{ name: string; mm: number } | null>(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    let live = true;
    fetch("/api/insights/rainfall")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: { towns: Town[] }) => {
        if (!live) return;
        const towns = d.towns ?? [];
        if (!towns.length) return setErr(true);
        const top = towns.reduce((a, b) => (b.recentMm > a.recentMm ? b : a));
        setPeak({ name: top.name, mm: top.recentMm });
        setLevel(levelFor(top.recentMm));
      })
      .catch(() => live && setErr(true));
    return () => {
      live = false;
    };
  }, []);

  const kn = locale === "kn";
  if (err)
    return (
      <div className="health-watch tone-calm">
        <div className="hw-level">{S.insights.hwSeasonalCare[locale]}</div>
        <p className="hw-line">{S.insights.hwUnavail[locale]}</p>
      </div>
    );

  if (!level) return <div className="health-watch"><div className="ci-skel" style={{ height: 90 }} /></div>;

  const info = HEALTH_LEVELS[level];
  return (
    <div className={`health-watch tone-${info.tone}`}>
      <div className="hw-top">
        <span className="hw-level">{kn ? info.labelKn : info.label}</span>
        {peak && (
          <span className="hw-peak">
            {S.insights.hwPeakPre[locale]} {peak.name} {peak.mm}mm / {S.insights.hwDays[locale]}
          </span>
        )}
      </div>
      <p className="hw-line">{kn ? info.lineKn : info.line}</p>
    </div>
  );
}
