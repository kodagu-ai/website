"use client";

import { useEffect, useMemo, useState } from "react";
import { NEWS, CATEGORIES, BADGES, type NewsCategory, type NewsItem } from "../lib/news";
import { S, type Locale } from "../lib/i18n";

// Friendly relative date. In Kannada, uses the localised Today/Yesterday/N-days
// labels; otherwise an en-GB date. Non-ISO strings pass through unchanged.
function fmtDate(s: string, locale: Locale): string {
  const t = Date.parse(s);
  if (Number.isNaN(t)) return s;
  const days = Math.floor((Date.now() - t) / 86_400_000);
  if (days <= 0) return S.news.today[locale];
  if (days === 1) return S.news.yesterday[locale];
  if (days < 7) return `${days} ${S.news.daysAgo[locale]}`;
  return new Date(t).toLocaleDateString(locale === "kn" ? "kn-IN" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function NewsFeed({ locale = "en" }: { locale?: Locale }) {
  const [cat, setCat] = useState<NewsCategory | "all">("all");
  // Start with the static seed so the feed renders instantly, then swap in the
  // live feed from the DB — including an empty one (a genuinely quiet week),
  // which we must honour rather than keeping the seed on screen.
  const [feed, setFeed] = useState<NewsItem[]>(NEWS);

  useEffect(() => {
    let live = true;
    fetch("/api/news")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: { items?: NewsItem[]; source?: string }) => {
        if (!live || !Array.isArray(d.items)) return;
        // Adopt the DB feed whenever it answered (db / db-empty). Keep the seed
        // only when the API fell back to it (source "static"/"static-error").
        if (d.source && d.source.startsWith("db")) setFeed(d.items);
        else if (d.items.length) setFeed(d.items);
      })
      .catch(() => {});
    return () => {
      live = false;
    };
  }, []);

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (const n of feed) m.set(n.category, (m.get(n.category) ?? 0) + 1);
    return m;
  }, [feed]);

  const items = useMemo(
    () => (cat === "all" ? feed : feed.filter((n) => n.category === cat)),
    [cat, feed]
  );

  const catMeta = (c: string) => CATEGORIES.find((x) => x.key === c);
  const catLabel = (c: string) => {
    const m = catMeta(c);
    return locale === "kn" && m ? m.kn : c;
  };
  const catIcon = (c: string) => catMeta(c)?.icon ?? "";
  // Show the Kannada headline/summary when present, else fall back to English.
  const kn = locale === "kn";

  return (
    <>
      <div className="news-filter">
        <button
          className={`news-chip${cat === "all" ? " is-active" : ""}`}
          onClick={() => setCat("all")}
          type="button"
        >
          {S.news.all[locale]} ({feed.length})
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            className={`news-chip${cat === c.key ? " is-active" : ""}`}
            onClick={() => setCat(c.key)}
            type="button"
          >
            {c.icon} {locale === "kn" ? c.kn : c.key} ({counts.get(c.key) ?? 0})
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="news-empty">{S.news.emptyCat[locale]}</p>
      ) : (
        <div className="news-list">
          {items.map((n) => {
            const b = BADGES[n.badge];
            const headline = kn && n.headlineKn ? n.headlineKn : n.headline;
            const summary = kn && n.summaryKn ? n.summaryKn : n.summary;
            return (
              <article className="news-card" key={n.id}>
                <div className="news-meta">
                  <span className="news-cat">
                    {catIcon(n.category)} {catLabel(n.category)}
                  </span>
                  <span className={`trust-badge ${n.badge}`} title={kn ? b.noteKn : b.note}>
                    {b.dot} {kn ? b.labelKn : b.label} · {n.score}
                  </span>
                </div>
                <h3 className="news-headline">{headline}</h3>
                <p className="news-summary">{summary}</p>
                <div className="news-foot">
                  <span className="news-sources">
                    {n.sources.length}{" "}
                    {n.sources.length > 1 ? S.news.sources[locale] : S.news.source[locale]}:{" "}
                    {n.sources.map((s, i) => (
                      <span key={s.url}>
                        <a href={s.url} target="_blank" rel="noreferrer">{s.name}</a>
                        {i < n.sources.length - 1 ? " · " : ""}
                      </span>
                    ))}
                  </span>
                  <span className="news-date">{fmtDate(n.date, locale)}</span>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}
