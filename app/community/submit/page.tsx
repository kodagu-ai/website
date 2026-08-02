import type { Metadata } from "next";
import Link from "next/link";
import SubmitForm from "./SubmitForm";
import { S } from "../../lib/i18n";
import { getLocale } from "../../lib/getLocale";

export const metadata: Metadata = {
  title: "Add to the Directory",
  description:
    "Submit yourself or your organization to the Kodagu.ai community directory. Reviewed before listing.",
};

export default function SubmitPage() {
  const locale = getLocale();
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Link href="/community" className="back-link" style={{ color: "var(--ink-faint)" }}>
            {S.submitP.back[locale]}
          </Link>
          <div className="accent-bar" />
          <h1>{S.submitP.title[locale]}</h1>
          <p className="prose" style={{ fontSize: "1.15rem", color: "var(--ink-soft)" }}>
            {S.submitP.lead[locale]}
          </p>
        </div>
      </section>

      <section style={{ paddingTop: 20 }}>
        <div className="container">
          <div className="submit-wrap">
            <SubmitForm locale={locale} />
          </div>
        </div>
      </section>
    </>
  );
}
