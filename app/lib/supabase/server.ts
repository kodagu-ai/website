import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

// SSR Supabase client for Server Components + Route Handlers. Uses the PUBLIC
// anon key (safe to expose) purely to read/refresh the signed-in user's session
// from cookies — it grants no data access (the tables are RLS-on with no
// policies). Data reads/writes use the service-role client in adminAuth.ts,
// only AFTER the admin identity is verified.
export function createSupabaseServerClient() {
  const cookieStore = cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }
  return createServerClient(url, anon, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Called from a Server Component render (cookies are read-only there).
          // The middleware refreshes the session cookie, so this is safe to skip.
        }
      },
    },
  });
}
