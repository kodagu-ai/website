import { createClient } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "./supabase/server";

// The single admin allowed into /admin. Not a secret — it's an allow-list of
// one. Everything under /admin verifies the signed-in user's email against it.
export const ADMIN_EMAIL = "poonacha@cyberhuman.ai";

// Returns the signed-in Supabase user IFF their (confirmed) email is the admin
// email, else null. Server-only. Used by middleware, the panel layout, every
// admin page and every admin API route as the single source of truth.
export async function getAdminUser() {
  try {
    const supabase = createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;
    if ((user.email || "").toLowerCase() !== ADMIN_EMAIL) return null;
    return user;
  } catch {
    return null;
  }
}

// Service-role client — bypasses RLS, so it can read/write the review-queue
// tables. Call ONLY after getAdminUser() has confirmed the caller is the admin.
// no-store fetch so admin views always reflect the latest rows.
export function serviceClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase service role not configured.");
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (u, i) => fetch(u, { ...i, cache: "no-store" }) },
  });
}
