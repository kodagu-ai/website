import Link from "next/link";
import Wordmark from "./Wordmark";
import SiteNav from "./SiteNav";
import { getLocale } from "../lib/getLocale";

export default function Header() {
  const locale = getLocale();
  return (
    <header className="site-header">
      <div className="container">
        <Link href="/" aria-label="Kodagu.ai home">
          <Wordmark size={1.55} />
        </Link>
        <SiteNav locale={locale} />
      </div>
    </header>
  );
}
