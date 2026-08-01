import Link from "next/link";
import Wordmark from "./Wordmark";
import { GitHubIcon } from "./icons";
import LangToggle from "./LangToggle";
import { site } from "../lib/site";
import { getLocale, S } from "../lib/i18n";

export default function Header() {
  const locale = getLocale();
  return (
    <header className="site-header">
      <div className="container">
        <Link href="/" aria-label="Kodagu.ai home">
          <Wordmark size={1.55} />
        </Link>
        <nav className="nav">
          <Link href="/#projects">{S.nav.projects[locale]}</Link>
          <Link href="/insights" className="hide-sm">{S.nav.insights[locale]}</Link>
          <Link href="/community">{S.nav.community[locale]}</Link>
          <Link href="/news">{S.nav.news[locale]}</Link>
          <Link href="/about" className="hide-sm">{S.nav.about[locale]}</Link>
          <Link href="/join" className="hide-sm">{S.nav.join[locale]}</Link>
          <LangToggle locale={locale} />
          <a
            href={site.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-dark nav-cta"
            style={{ padding: "9px 18px" }}
          >
            <GitHubIcon /> {S.nav.github[locale]}
          </a>
        </nav>
      </div>
    </header>
  );
}
