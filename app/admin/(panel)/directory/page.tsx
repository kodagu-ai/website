import { serviceClient } from "../../../lib/adminAuth";
import AdminActions from "../AdminActions";

export const dynamic = "force-dynamic";

type Row = {
  id: string;
  created_at: string;
  type: string;
  name: string;
  role: string | null;
  location: string | null;
  blurb: string;
  tags: string | null;
  website: string | null;
  github: string | null;
  contact: string | null;
  status: string;
};

const ORDER: Record<string, number> = { pending: 0, approved: 1, rejected: 2 };

function fmtDate(iso: string) {
  // Stable, locale-independent date so server/client render identically.
  return iso ? iso.slice(0, 10) : "";
}

export default async function AdminDirectory() {
  const supabase = serviceClient();
  const { data, error } = await supabase
    .from("directory_submissions")
    .select(
      "id,created_at,type,name,role,location,blurb,tags,website,github,contact,status"
    )
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
      <h1 style={{ marginTop: 0 }}>Community directory</h1>
      <p style={{ color: "var(--ink-soft)", marginTop: -6 }}>
        Approving a person or organization publishes them to{" "}
        <a href="/community" target="_blank" rel="noreferrer">
          /community
        </a>{" "}
        automatically. Contact details are private and never shown publicly.
      </p>
      {error && (
        <p style={{ color: "#b23b3b" }}>Could not load submissions: {error.message}</p>
      )}
      {rows.length === 0 && !error && (
        <p style={{ color: "var(--ink-soft)" }}>No submissions yet.</p>
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
                marginBottom: 6,
              }}
            >
              <strong style={{ fontSize: "1.05rem" }}>
                {r.name}{" "}
                <span style={{ fontWeight: 400, color: "var(--ink-soft)", fontSize: "0.85rem" }}>
                  · {r.type}
                  {r.role ? ` · ${r.role}` : ""}
                  {r.location ? ` · ${r.location}` : ""}
                </span>
              </strong>
              <span style={{ fontSize: "0.8rem", color: "var(--ink-soft)" }}>
                {fmtDate(r.created_at)} · {r.status}
              </span>
            </div>
            <p style={{ margin: "6px 0", fontSize: "0.95rem" }}>{r.blurb}</p>
            <div style={{ fontSize: "0.82rem", color: "var(--ink-soft)", marginBottom: 12 }}>
              {r.tags && <span>tags: {r.tags} · </span>}
              {r.website && (
                <span>
                  <a href={r.website} target="_blank" rel="noreferrer">
                    website
                  </a>{" "}
                  ·{" "}
                </span>
              )}
              {r.github && (
                <span>
                  <a href={r.github} target="_blank" rel="noreferrer">
                    github
                  </a>{" "}
                  ·{" "}
                </span>
              )}
              {r.contact && <span>contact (private): {r.contact}</span>}
            </div>
            <AdminActions
              endpoint="directory"
              id={r.id}
              current={r.status}
              actions={[
                { label: "Approve", status: "approved", tone: "good" },
                { label: "Pending", status: "pending", tone: "muted" },
                { label: "Reject", status: "rejected", tone: "bad" },
              ]}
            />
          </article>
        ))}
      </div>
    </>
  );
}
