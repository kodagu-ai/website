import type { Metadata } from "next";
import Link from "next/link";
import SubmitForm from "./SubmitForm";

export const metadata: Metadata = {
  title: "Add to the Directory",
  description:
    "Submit yourself or your organization to the Kodagu.ai community directory. Reviewed before listing.",
};

export default function SubmitPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Link href="/community" className="back-link" style={{ color: "var(--ink-faint)" }}>
            ← Back to directory
          </Link>
          <div className="accent-bar" />
          <h1>Join the Directory</h1>
          <p className="prose" style={{ fontSize: "1.15rem", color: "var(--ink-soft)" }}>
            Tell us who you are and how you’d like to contribute. Submissions are
            reviewed before they go live, and everything here is opt-in — you’re
            in control of what’s shown.
          </p>
        </div>
      </section>

      <section style={{ paddingTop: 20 }}>
        <div className="container">
          <div className="submit-wrap">
            <SubmitForm />
          </div>
        </div>
      </section>
    </>
  );
}
