import { serviceClient } from "../../../lib/adminAuth";
import AdminActions from "../AdminActions";

export const dynamic = "force-dynamic";

type Row = {
  id: string;
  created_at: string;
  name: string;
  place: string | null;
  phone: string | null;
  email: string | null;
  entrant_type: string;
  team_name: string | null;
  area: string | null;
  problem: string;
  solution: string;
  impact: string | null;
  prior: string | null;
  link: string | null;
  x_handle?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
  status: string;
};

const ORDER: Record<string, number> = { new: 0, shortlisted: 1, winner: 2, rejected: 3 };

function fmtDate(iso: string) {
  return iso ? iso.slice(0, 10) : "";
}

const bare = (h: string) => h.replace(/^@+/, "").trim();
const xUrl = (h: string) => (/^https?:/i.test(h) ? h : `https://x.com/${bare(h)}`);
const igUrl = (h: string) => (/^https?:/i.test(h) ? h : `https://instagram.com/${bare(h)}`);
const liUrl = (h: string) => (/^https?:/i.test(h) ? h : `https://${h.replace(/^https?:\/\//, "")}`);

function Field({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <p style={{ margin: "6px 0", fontSize: "0.92rem" }}>
      <strong style={{ color: "var(--ink-soft)", fontWeight: 600 }}>{label}: </strong>
      {value}
    </p>
  );
}

export default async function AdminSankalpa() {
  const supabase = serviceClient();
  const { data, error } = await supabase
    .from("sankalpa_entries")
    // select * so the page keeps working whether or not the socials migration
    // (0007) has been applied yet.
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1000);

  const rows = (data ?? []) as Row[];
  rows.sort(
    (a, b) =>
      (ORDER[a.status] ?? 9) - (ORDER[b.status] ?? 9) ||
      b.created_at.localeCompare(a.created_at)
  );

  return (
    <>
      <h1 style={{ marginTop: 0 }}>Sankalpa entries</h1>
      <p style={{ color: "var(--ink-soft)", marginTop: -6 }}>
        Challenge submissions. Contact details are private (for your follow-up only).
      </p>
      {error && (
        <p style={{ color: "#b23b3b" }}>Could not load entries: {error.message}</p>
      )}
      {rows.length === 0 && !error && (
        <p style={{ color: "var(--ink-soft)" }}>No entries yet.</p>
      )}

      <div style={{ display: "grid", gap: 14 }}>
        {rows.map((r) => (
          <article
            key={r.id}
            style={{
              border: "1px solid var(--line, #e5ded1)",
              borderRadius: 10,
              padding: "16px 18px",
              opacity: r.status === "rejected" ? 0.6 : 1,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                flexWrap: "wrap",
                marginBottom: 4,
              }}
            >
              <strong style={{ fontSize: "1.05rem" }}>
                {r.name}
                {r.entrant_type === "team" && r.team_name ? ` · ${r.team_name}` : ""}{" "}
                <span style={{ fontWeight: 400, color: "var(--ink-soft)", fontSize: "0.85rem" }}>
                  · {r.entrant_type}
                  {r.place ? ` · ${r.place}` : ""}
                  {r.area ? ` · ${r.area}` : ""}
                </span>
              </strong>
              <span style={{ fontSize: "0.8rem", color: "var(--ink-soft)" }}>
                {fmtDate(r.created_at)} · {r.status}
              </span>
            </div>
            <Field label="Problem" value={r.problem} />
            <Field label="Solution" value={r.solution} />
            <Field label="Impact" value={r.impact} />
            <Field label="Prior work" value={r.prior} />
            {r.link && (
              <p style={{ margin: "6px 0", fontSize: "0.92rem" }}>
                <strong style={{ color: "var(--ink-soft)", fontWeight: 600 }}>Link: </strong>
                <a href={r.link} target="_blank" rel="noreferrer">
                  {r.link}
                </a>
              </p>
            )}
            {(r.x_handle || r.instagram || r.linkedin) && (
              <p style={{ margin: "6px 0", fontSize: "0.9rem" }}>
                <strong style={{ color: "var(--ink-soft)", fontWeight: 600 }}>Socials: </strong>
                {r.x_handle && (
                  <a href={xUrl(r.x_handle)} target="_blank" rel="noreferrer" style={{ marginRight: 10 }}>
                    X ({r.x_handle})
                  </a>
                )}
                {r.instagram && (
                  <a href={igUrl(r.instagram)} target="_blank" rel="noreferrer" style={{ marginRight: 10 }}>
                    Instagram ({r.instagram})
                  </a>
                )}
                {r.linkedin && (
                  <a href={liUrl(r.linkedin)} target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                )}
              </p>
            )}
            <p style={{ margin: "6px 0 12px", fontSize: "0.82rem", color: "var(--ink-soft)" }}>
              contact (private): {[r.email, r.phone].filter(Boolean).join(" · ") || "—"}
            </p>
            <AdminActions
              endpoint="sankalpa"
              id={r.id}
              current={r.status}
              actions={[
                { label: "New", status: "new", tone: "muted" },
                { label: "Shortlist", status: "shortlisted", tone: "good" },
                { label: "Winner", status: "winner", tone: "good" },
                { label: "Reject", status: "rejected", tone: "bad" },
              ]}
            />
          </article>
        ))}
      </div>
    </>
  );
}
