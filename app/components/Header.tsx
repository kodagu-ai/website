import Link from "next/link";
import Wordmark from "./Wordmark";
import { GitHubIcon } from "./icons";
import { site } from "../lib/site";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <Link href="/" aria-label="Kodagu.ai home">
          <Wordmark size={1.55} />
        </Link>
        <nav className="nav">
          <Link href="/#projects">Projects</Link>
          <Link href="/about" className="hide-sm">About</Link>
          <Link href="/join">Get Involved</Link>
          <a
            href={site.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-dark nav-cta"
            style={{ padding: "9px 18px" }}
          >
            <GitHubIcon /> GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
