import Link from "next/link";
import Wordmark from "./Wordmark";
import EmailSignup from "./EmailSignup";
import { site } from "../lib/site";
import { S, t } from "../lib/i18n";
import { getLocale } from "../lib/getLocale";

export default function Footer() {
  const year = new Date().getFullYear();
  const locale = getLocale();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Wordmark size={1.7} onDark />
            <p className="footer-tag">{S.footer.tag[locale]}</p>
            <div className="footer-signup">
              <span className="footer-signup-label">{S.footer.getUpdates[locale]}</span>
              <EmailSignup onDark locale={locale} />
            </div>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <h4>{S.footer.explore[locale]}</h4>
              <Link href="/#projects">{S.nav.projects[locale]}</Link>
              <Link href="/insights">{S.nav.insights[locale]}</Link>
              <Link href="/community">{S.nav.community[locale]}</Link>
              <Link href="/news">{S.nav.news[locale]}</Link>
              <Link href="/about">{S.nav.about[locale]}</Link>
              <Link href="/join">{S.nav.join[locale]}</Link>
            </div>
            <div className="footer-col">
              <h4>{S.footer.community[locale]}</h4>
              <a href={site.githubUrl} target="_blank" rel="noreferrer">{S.nav.github[locale]}</a>
              <a href={`mailto:${site.contactEmail}`}>{S.footer.contact[locale]}</a>
              <Link href="/join">{S.footer.contribute[locale]}</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {year} {site.name} — {t(locale, S.tagline)}</span>
          <span>{S.footer.place[locale]}</span>
        </div>
      </div>
    </footer>
  );
}
