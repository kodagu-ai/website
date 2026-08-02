"use client";

import { createBrowserClient } from "@supabase/ssr";

// Browser Supabase client for the admin login page (magic-link send) and the
// log-out button. Uses the PUBLIC anon key only — no data access.
export function createSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
  return createBrowserClient(url, anon);
}
