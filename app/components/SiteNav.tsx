"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GitHubIcon } from "./icons";
import LangToggle from "./LangToggle";
import { site } from "../lib/site";
import { S, type Locale } from "../lib/i18n";

// Primary site navigation. On desktop it's the inline row; at ≤1000px it
// collapses to a hamburger that opens a full-screen panel containing EVERY
// link (previously some links were hidden with `.hide-sm` and unreachable on
// mobile — notably Insights). One source of links, rendered in both places.
export default function SiteNav({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // Close on Escape, and whenever the viewport grows back to desktop.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 1001px)");
    const onChange = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, []);

  // Lock body scroll while the mobile panel is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = (
    <>
      <Link href="/#projects" onClick={close}>{S.nav.projects[locale]}</Link>
      <Link href="/insights" onClick={close}>{S.nav.insights[locale]}</Link>
      <Link href="/community" onClick={close}>{S.nav.community[locale]}</Link>
      <Link href="/news" onClick={close}>{S.nav.news[locale]}</Link>
      {/* Standalone sub-brand page → plain <a> for a full-document load. */}
      <a href="/sankalpa">{S.nav.sankalpa[locale]}</a>
      <Link href="/about" onClick={close}>{S.nav.about[locale]}</Link>
      <Link href="/join" onClick={close}>{S.nav.join[locale]}</Link>
    </>
  );

  const github = (
    <a
      href={site.githubUrl}
      target="_blank"
      rel="noreferrer"
      className="btn btn-dark nav-cta"
      style={{ padding: "9px 18px" }}
      onClick={close}
    >
      <GitHubIcon /> {S.nav.github[locale]}
    </a>
  );

  return (
    <>
      {/* Desktop / wide inline nav */}
      <nav className="nav nav-desktop" aria-label="Primary">
        {links}
        <LangToggle locale={locale} />
        {github}
      </nav>

      {/* Mobile hamburger button */}
      <button
        type="button"
        className="nav-toggle"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
      >
        <span className={`nav-toggle-bars${open ? " is-open" : ""}`} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      {/* Mobile slide-down panel */}
      <div id="mobile-nav" className={`mobile-nav${open ? " is-open" : ""}`}>
        <div className="mobile-nav-links">
          {links}
          <div className="mobile-nav-foot">
            <LangToggle locale={locale} />
            {github}
          </div>
        </div>
      </div>

      {open && (
        <div className="mobile-nav-backdrop" onClick={close} aria-hidden="true" />
      )}
    </>
  );
}
