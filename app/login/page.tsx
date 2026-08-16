import type { Metadata } from "next";
import LoginForm from "./LoginForm";
import { getLocale } from "../lib/getLocale";
import { S } from "../lib/i18n";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Kodagu.ai account.",
};

function safeNextPath(value: string | string[] | undefined): string {
  const path = Array.isArray(value) ? value[0] : value;
  if (!path || !path.startsWith("/") || path.startsWith("//")) return "/account";
  return path;
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: { next?: string | string[]; error?: string | string[] };
}) {
  const locale = getLocale();
  const error = Array.isArray(searchParams.error)
    ? searchParams.error[0]
    : searchParams.error || "";

  return (
    <section className="page-hero">
      <div className="container" style={{ maxWidth: 500 }}>
        <div className="accent-bar" />
        <h1>{S.auth.loginTitle[locale]}</h1>
        <p className="prose" style={{ fontSize: "1.05rem", color: "var(--ink-soft)" }}>
          {S.auth.loginLead[locale]}
        </p>
        <div style={{ marginTop: 24 }}>
          <LoginForm
            locale={locale}
            next={safeNextPath(searchParams.next)}
            initialError={error}
          />
        </div>
      </div>
    </section>
  );
}