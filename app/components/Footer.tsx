import Link from "next/link";
import Wordmark from "./Wordmark";
import EmailSignup from "./EmailSignup";
import { site } from "../lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Wordmark size={1.7} onDark />
            <p className="footer-tag">
              A unified, open-source platform for Kodagu. Our people. Our land.
              Our future.
            </p>
            <div className="footer-signup">
              <span className="footer-signup-label">Get updates</span>
              <EmailSignup onDark />
            </div>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <h4>Explore</h4>
              <Link href="/#projects">Projects</Link>
              <Link href="/insights">Insights</Link>
              <Link href="/community">Community</Link>
              <Link href="/about">About</Link>
              <Link href="/join">Get Involved</Link>
            </div>
            <div className="footer-col">
              <h4>Community</h4>
              <a href={site.githubUrl} target="_blank" rel="noreferrer">GitHub</a>
              <a href={`mailto:${site.contactEmail}`}>Contact</a>
              <Link href="/join">Contribute</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {year} {site.name} — {site.tagline}</span>
          <span>Kodagu · Karnataka · India</span>
        </div>
      </div>
    </footer>
  );
}
