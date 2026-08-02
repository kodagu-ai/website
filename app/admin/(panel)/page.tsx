import Link from "next/link";
import { serviceClient } from "../../lib/adminAuth";

export const dynamic = "force-dynamic";

function tally<T extends string>(rows: { status: string }[], keys: T[]) {
  const out = Object.fromEntries(keys.map((k) => [k, 0])) as Record<T, number>;
  for (const r of rows) {
    const s = r.status as T;
    if (s in out) out[s] += 1;
  }
  return out;
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div
      style={{
        border: "1px solid var(--line, #e5ded1)",
        borderRadius: 10,
        padding: "16px 18px",
        minWidth: 120,
      }}
    >
      <div style={{ fontSize: "1.8rem", fontWeight: 700, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: "0.85rem", color: "var(--ink-soft)", marginTop: 6 }}>
        {label}
      </div>
    </div>
  );
}

export default async function AdminDashboard() {
  const supabase = serviceClient();

  const [dir, sank, votes] = await Promise.all([
    supabase.from("directory_submissions").select("status").limit(2000),
    supabase.from("sankalpa_entries").select("status").limit(2000),
    supabase
      .from("sankalpa_votes")
      .select("id", { count: "exact", head: true }),
  ]);

  const dirRows = (dir.data ?? []) as { status: string }[];
  const sankRows = (sank.data ?? []) as { status: string }[];
  const d = tally(dirRows, ["pending", "approved", "rejected"]);
  const s = tally(sankRows, ["new", "shortlisted", "winner", "rejected"]);
  const voteCount = votes.count ?? 0;

  const errored = dir.error || sank.error || votes.error;

  return (
    <>
      <h1 style={{ marginTop: 0 }}>Dashboard</h1>
      {errored && (
        <p style={{ color: "#b23b3b" }}>
          Could not load some data. Check the Supabase service-role env vars.
        </p>
      )}

      <h2 style={{ fontSize: "1.05rem", marginBottom: 12 }}>
        <Link href="/admin/directory">Community directory</Link>
      </h2>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
        <Stat label="Pending review" value={d.pending} />
        <Stat label="Approved (live)" value={d.approved} />
        <Stat label="Rejected" value={d.rejected} />
        <Stat label="Total" value={dirRows.length} />
      </div>

      <h2 style={{ fontSize: "1.05rem", marginBottom: 12 }}>
        <Link href="/admin/sankalpa">Sankalpa challenge</Link>
      </h2>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Stat label="New" value={s.new} />
        <Stat label="Shortlisted" value={s.shortlisted} />
        <Stat label="Winner" value={s.winner} />
        <Stat label="Rejected" value={s.rejected} />
        <Stat label="Entries total" value={sankRows.length} />
        <Stat label="Theme votes cast" value={voteCount} />
      </div>
    </>
  );
}
