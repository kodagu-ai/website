import type { Metadata } from "next";
import { redirect } from "next/navigation";
import SignOutButton from "./SignOutButton";
import { createSupabaseServerClient } from "../lib/supabase/server";
import { getLocale } from "../lib/getLocale";
import { S } from "../lib/i18n";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Account",
  description: "Manage your Kodagu.ai account.",
};

export default async function AccountPage() {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    redirect("/login?error=Authentication+is+not+configured+locally");
  }

  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/account");

  const locale = getLocale();

  return (
    <section className="page-hero">
      <div className="container" style={{ maxWidth: 680 }}>
        <div className="accent-bar" />
        <h1>{S.auth.accountTitle[locale]}</h1>
        <p className="prose" style={{ fontSize: "1.05rem", color: "var(--ink-soft)" }}>
          {S.auth.accountLead[locale]}
        </p>
        <div
          style={{
            borderTop: "1px solid var(--line)",
            borderBottom: "1px solid var(--line)",
            padding: "20px 0",
            margin: "28px 0",
          }}
        >
          <div style={{ color: "var(--ink-soft)", fontSize: "0.9rem" }}>
            {S.auth.signedInAs[locale]}
          </div>
          <strong style={{ fontSize: "1.1rem" }}>{user.email}</strong>
        </div>
        <SignOutButton locale={locale} />
      </div>
    </section>
  );
}