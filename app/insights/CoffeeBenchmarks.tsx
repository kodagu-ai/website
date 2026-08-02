"use client";

import { useEffect, useState } from "react";
import { S, type Locale } from "../lib/i18n";

type Market = {
  arabica: { usdPerLb: number; centsPerLb: number; changePct: number } | null;
  usdInr: number | null;
  asOf: string;
};

type Robusta = {
  price: number;
  changePct: number;
  currency: string;
  contract: string | null;
  unit: string;
} | null;

function Change({ pct }: { pct: number }) {
  const up = pct >= 0;
  return (
    <span className={`ci-chg ${up ? "up" : "down"}`}>
      {up ? "▲" : "▼"} {Math.abs(pct).toFixed(1)}%
    </span>
  );
}

export default function CoffeeBenchmarks({ locale = "en" }: { locale?: Locale }) {
  const [m, setM] = useState<Market | null>(null);
  const [mErr, setMErr] = useState(false);
  const [rob, setRob] = useState<Robusta>(null);
  const [robErr, setRobErr] = useState(false);

  useEffect(() => {
    let live = true;
    fetch("/api/coffee/market")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: Market) => live && setM(d))
      .catch(() => live && setMErr(true));
    fetch("/api/coffee/robusta")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: Robusta) => live && setRob(d))
      .catch(() => live && setRobErr(true));
    return () => {
      live = false;
    };
  }, []);

  return (
    <div className="ci-bench">
      {/* Robusta first — the benchmark Kodagu tracks */}
      <div className="ci-card ci-card-key">
        <div className="ci-card-label">{S.insights.cbRobusta[locale]}</div>
        {rob ? (
          <>
            <div className="ci-value">
              ${rob.price.toLocaleString("en-US")}
              <span className="ci-unit">{S.insights.perTonne[locale]}</span>
            </div>
            <div className="ci-sub">
              <Change pct={rob.changePct} /> {S.insights.cbToday[locale]}
              {rob.contract ? ` · ${rob.contract}` : ""}
            </div>
          </>
        ) : robErr ? (
          <>
            <div className="ci-value ci-value-sm">{S.insights.cbOffHigh[locale]}</div>
            <div className="ci-sub">{S.insights.cbLiveUnavail[locale]}</div>
          </>
        ) : (
          <div className="ci-skel" />
        )}
      </div>

      <div className="ci-card">
        <div className="ci-card-label">{S.insights.cbArabica[locale]}</div>
        {m?.arabica ? (
          <>
            <div className="ci-value">
              ${m.arabica.usdPerLb.toFixed(2)}
              <span className="ci-unit">{S.insights.perLb[locale]}</span>
            </div>
            <div className="ci-sub">
              {m.arabica.centsPerLb}¢ · <Change pct={m.arabica.changePct} /> {S.insights.cbToday[locale]}
            </div>
          </>
        ) : mErr ? (
          <div className="ci-sub">{S.insights.cbUnavail[locale]}</div>
        ) : (
          <div className="ci-skel" />
        )}
      </div>

      <div className="ci-card">
        <div className="ci-card-label">{S.insights.cbRupee[locale]}</div>
        {m?.usdInr ? (
          <>
            <div className="ci-value">₹{m.usdInr.toFixed(2)}</div>
            <div className="ci-sub">{S.insights.cbPerDollar[locale]}</div>
          </>
        ) : mErr ? (
          <div className="ci-sub">{S.insights.cbUnavail[locale]}</div>
        ) : (
          <div className="ci-skel" />
        )}
      </div>
    </div>
  );
}
