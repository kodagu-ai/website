"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MARKET } from "../lib/almanac";
import { UPDATES } from "../lib/updates";

type TownWeather = {
  name: string;
  temp: number;
  feelsLike: number;
  humidity: number;
  wind: number;
  precip: number;
  hi: number;
  lo: number;
  label: string;
  icon: string;
};

type WeatherResp = { dateLabel: string; timeLabel: string; towns: TownWeather[] };

function fmtDate(iso: string): string {
  // "2026-08-01" -> "1 Aug"
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${d} ${months[(m || 1) - 1]}`;
}

type PriceItem = {
  crop: string;
  grade?: string;
  price: string;
  unit: string;
  sourceUrl?: string;
  asOf?: string;
};

export default function KodaguAlmanac() {
  const [wx, setWx] = useState<WeatherResp | null>(null);
  const [wxError, setWxError] = useState(false);
  // Start with the static seed so prices render instantly, then refresh from DB.
  const [prices, setPrices] = useState<PriceItem[]>(MARKET);

  useEffect(() => {
    let live = true;
    fetch("/api/almanac/weather")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: WeatherResp) => live && setWx(d))
      .catch(() => live && setWxError(true));
    fetch("/api/almanac/prices")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: { items?: PriceItem[] }) => live && d.items?.length && setPrices(d.items))
      .catch(() => {});
    return () => {
      live = false;
    };
  }, []);

  const coffee = prices.filter((p) => p.crop === "Coffee");
  const others = prices.filter((p) => p.crop !== "Coffee");

  return (
    <section className="section-alt">
      <div className="container">
        <div className="almanac">
          <div className="almanac-bar" />

          <div className="almanac-head">
            <div>
              <span className="almanac-kicker">❖ Kodagu Almanac</span>
              <h2 className="almanac-title">The district, today</h2>
            </div>
            <div className="almanac-when">
              {wx ? (
                <>
                  <span className="almanac-date">{wx.dateLabel}</span>
                  <span className="almanac-live"><i /> Live · {wx.timeLabel} IST</span>
                </>
              ) : (
                <span className="almanac-date">Kodagu, Karnataka</span>
              )}
            </div>
          </div>

          {/* Weather */}
          <div className="almanac-section-label">Weather across Kodagu</div>
          <div className="wx-row">
            {wx?.towns
              ? wx.towns.map((t) => (
                  <div className="wx-town" key={t.name}>
                    <div className="wx-top">
                      <span className="wx-name">{t.name}</span>
                      <span className="wx-icon">{t.icon}</span>
                    </div>
                    <div className="wx-temp">{t.temp}°</div>
                    <div className="wx-label">{t.label}</div>
                    <div className="wx-meta">
                      <span>H {t.hi}° · L {t.lo}°</span>
                      <span>💧 {t.humidity}%</span>
                      <span>🌬 {t.wind} km/h</span>
                    </div>
                  </div>
                ))
              : wxError
              ? <div className="wx-fallback">Live weather is unavailable right now.</div>
              : [0, 1, 2, 3, 4].map((i) => <div className="wx-town wx-skel" key={i} />)}
          </div>

          {/* Markets + Updates */}
          <div className="almanac-grid">
            <div className="almanac-col">
              <div className="almanac-section-label">Market prices</div>

              {coffee.length > 0 && (
                <div className="mkt-group">
                  <div className="mkt-group-head">
                    <span className="mkt-crop">Coffee</span>
                    <span className="mkt-group-unit">per 50 kg bag</span>
                  </div>
                  <ul className="mkt-sub">
                    {coffee.map((m) => (
                      <li className="mkt-sub-row" key={m.grade}>
                        <span className="mkt-grade">{m.grade}</span>
                        <span className="mkt-price">{m.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <ul className="mkt-list">
                {others.map((m) => (
                  <li className="mkt-item" key={`${m.crop}-${m.grade}`}>
                    <div className="mkt-left">
                      <span className="mkt-crop">{m.crop}</span>
                      {m.grade && <span className="mkt-grade">{m.grade}</span>}
                    </div>
                    <div className="mkt-right">
                      <span className="mkt-price">{m.price}</span>
                      <span className="mkt-unit">{m.unit}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <p className="mkt-note">
                Indicative prices — coffee, pepper &amp; cardamom from{" "}
                <a href="https://cpa.org.in" target="_blank" rel="noreferrer">Coorg Planters’ Association</a>,
                tea from{" "}
                <a href="https://www.teaboard.gov.in" target="_blank" rel="noreferrer">Tea Board India</a>{" "}
                (Coonoor auction), paddy from commodityonline (Madikeri APMC).
                Verify with your buyer before trading.
              </p>
            </div>

            <div className="almanac-col">
              <div className="almanac-section-label">Latest updates</div>
              <ul className="upd-list">
                {UPDATES.map((u) => {
                  const inner = (
                    <>
                      <div className="upd-meta">
                        <span className="upd-tag">{u.tag}</span>
                        <span className="upd-date">{fmtDate(u.date)}</span>
                      </div>
                      <div className="upd-title">{u.title}</div>
                      <div className="upd-body">{u.body}</div>
                    </>
                  );
                  return (
                    <li className="upd-item" key={u.title}>
                      {u.href ? (
                        <Link href={u.href} className="upd-link">{inner}</Link>
                      ) : (
                        inner
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
