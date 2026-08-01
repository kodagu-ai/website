"use client";

import { useEffect, useState } from "react";
import { HEALTH_LEVELS } from "../lib/health";

type Town = { name: string; recentMm: number };

// Derive the health-watch level from the heaviest recent rainfall across towns.
function levelFor(maxRecent: number): keyof typeof HEALTH_LEVELS {
  if (maxRecent >= 150) return "high";
  if (maxRecent >= 60) return "wet";
  return "calm";
}

export default function HealthWatch() {
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

  if (err)
    return (
      <div className="health-watch tone-calm">
        <div className="hw-level">Seasonal care</div>
        <p className="hw-line">
          Live rainfall is unavailable — take the usual monsoon precautions below.
        </p>
      </div>
    );

  if (!level) return <div className="health-watch"><div className="ci-skel" style={{ height: 90 }} /></div>;

  const info = HEALTH_LEVELS[level];
  return (
    <div className={`health-watch tone-${info.tone}`}>
      <div className="hw-top">
        <span className="hw-level">{info.label}</span>
        {peak && (
          <span className="hw-peak">
            heaviest recent rain: {peak.name} {peak.mm}mm / 3 days
          </span>
        )}
      </div>
      <p className="hw-line">{info.line}</p>
    </div>
  );
}
