import Link from "next/link";
import Wordmark from "./Wordmark";
import SiteNav from "./SiteNav";
import { getLocale } from "../lib/getLocale";
import { createSupabaseServerClient } from "../lib/supabase/server";

export default async function Header() {
  const locale = getLocale();
  let signedIn = false;

  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    try {
      const {
        data: { user },
      } = await createSupabaseServerClient().auth.getUser();
      signedIn = !!user;
    } catch {
      signedIn = false;
    }
  }

  return (
    <header className="site-header">
      <div className="container">
        <Link href="/" aria-label="Kodagu.ai home">
          <Wordmark size={1.55} />
        </Link>
        <SiteNav locale={locale} signedIn={signedIn} />
      </div>
    </header>
  );
}
