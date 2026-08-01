"use client";

import { useEffect, useMemo, useState } from "react";
import { NEWS, CATEGORIES, BADGES, type NewsCategory, type NewsItem } from "../lib/news";

export default function NewsFeed() {
  const [cat, setCat] = useState<NewsCategory | "all">("all");
  // Start with the static seed so the feed renders instantly, then swap in the
  // live published feed from the DB.
  const [feed, setFeed] = useState<NewsItem[]>(NEWS);

  useEffect(() => {
    let live = true;
    fetch("/api/news")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: { items?: NewsItem[] }) => live && d.items?.length && setFeed(d.items))
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

  const catIcon = (c: string) => CATEGORIES.find((x) => x.key === c)?.icon ?? "";

  return (
    <>
      <div className="news-filter">
        <button
          className={`news-chip${cat === "all" ? " is-active" : ""}`}
          onClick={() => setCat("all")}
          type="button"
        >
          All ({feed.length})
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            className={`news-chip${cat === c.key ? " is-active" : ""}`}
            onClick={() => setCat(c.key)}
            type="button"
          >
            {c.icon} {c.key} ({counts.get(c.key) ?? 0})
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="news-empty">
          No verified items in today&rsquo;s brief for this category. We only
          publish what we can source — nothing fabricated.
        </p>
      ) : (
        <div className="news-list">
          {items.map((n) => {
            const b = BADGES[n.badge];
            return (
              <article className="news-card" key={n.id}>
                <div className="news-meta">
                  <span className="news-cat">
                    {catIcon(n.category)} {n.category}
                  </span>
                  <span className={`trust-badge ${n.badge}`} title={b.note}>
                    {b.dot} {b.label} · {n.score}
                  </span>
                </div>
                <h3 className="news-headline">{n.headline}</h3>
                <p className="news-summary">{n.summary}</p>
                <div className="news-foot">
                  <span className="news-sources">
                    {n.sources.length} source{n.sources.length > 1 ? "s" : ""}:{" "}
                    {n.sources.map((s, i) => (
                      <span key={s.url}>
                        <a href={s.url} target="_blank" rel="noreferrer">{s.name}</a>
                        {i < n.sources.length - 1 ? " · " : ""}
                      </span>
                    ))}
                  </span>
                  <span className="news-date">{n.date}</span>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}
