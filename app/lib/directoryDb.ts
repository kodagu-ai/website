import { createClient } from "@supabase/supabase-js";
import type { DirectoryEntry } from "./directory";

// Server-only: reads APPROVED community-directory submissions from Supabase and
// maps them to DirectoryEntry, so the /community page publishes them without a
// code edit. The curated static list (app/lib/directory.ts) is merged on top.
// Fails soft (returns []) if the DB is unreachable, so the page always renders.

type Row = {
  id: string;
  type: string;
  name: string;
  role: string | null;
  location: string | null;
  blurb: string;
  tags: string | null;
  website: string | null;
  github: string | null;
  status: string;
};

function slugify(s: string): string {
  return (
    s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 50) || "entry"
  );
}

export async function fetchApprovedDirectory(): Promise<DirectoryEntry[]> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return [];
  try {
    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      // no-store so newly-approved entries appear without waiting on a cache.
      global: { fetch: (u, i) => fetch(u, { ...i, cache: "no-store" }) },
    });
    const { data, error } = await supabase
      .from("directory_submissions")
      .select("id,type,name,role,location,blurb,tags,website,github,status,created_at")
      .limit(500);
    if (error) throw error;

    // Filter status in JS (avoids the pooled-PostgREST predicate quirks we hit
    // elsewhere) and map to the public DirectoryEntry shape — contact is never
    // included, so private details stay private.
    return ((data ?? []) as Row[])
      .filter((r) => r.status === "approved")
      .map((r) => {
        const links: { label: string; url: string }[] = [];
        if (r.website) links.push({ label: "Website", url: r.website });
        if (r.github) links.push({ label: "GitHub", url: r.github });
        const tags = r.tags
          ? r.tags.split(",").map((t) => t.trim()).filter(Boolean).slice(0, 8)
          : undefined;
        return {
          slug: `${slugify(r.name)}-${r.id.slice(0, 8)}`,
          type: r.type === "organization" ? "organization" : "person",
          name: r.name,
          role: r.role || (r.type === "organization" ? "Organization" : "Community member"),
          location: r.location || undefined,
          blurb: r.blurb,
          tags,
          links: links.length ? links : undefined,
        } as DirectoryEntry;
      });
  } catch (err) {
    console.error("fetchApprovedDirectory failed:", err);
    return [];
  }
}
