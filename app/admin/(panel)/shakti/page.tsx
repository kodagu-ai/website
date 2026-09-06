import { serviceClient } from "../../../lib/adminAuth";
import AdminActions from "../AdminActions";

export const dynamic = "force-dynamic";

const CAP = 108;

type Row = {
  id: string;
  created_at: string;
  name: string;
  phone: string | null;
  email: string | null;
  place: string | null;
  distance: string | null;
  emergency_name: string | null;
  emergency_phone: string | null;
  waiver: boolean;
  status: string;
};

const ORDER: Record<string, number> = { confirmed: 0, waitlist: 1, cancelled: 2 };

function fmtDate(iso: string) {
  return iso ? iso.slice(0, 10) : "";
}

export default async function AdminShakti() {
  const supabase = serviceClient();
  // select * so the page works before/after migration 0008.
  const { data, error } = await supabase
    .from("shakti_registrations")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(2000);

  const rows = (data ?? []) as Row[];
  rows.sort(
    (a, b) =>
      (ORDER[a.status] ?? 9) - (ORDER[b.status] ?? 9) ||
      b.created_at.localeCompare(a.created_at)
  );
  const confirmed = rows.filter((r) => r.status === "confirmed").length;
  const remaining = Math.max(0, CAP - confirmed);

  return (
    <>
      <h1 style={{ marginTop: 0 }}>Shakthi Nadappu — registrations</h1>
      <p style={{ color: "var(--ink-soft)", marginTop: -6 }}>
        Free walk registrations, capped at {CAP}. Cancelling a walker frees a place.
        Contact details are private.
      </p>
      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          margin: "18px 0 26px",
        }}
      >
        {[
          ["Confirmed", confirmed],
          ["Places open", remaining],
          ["Waitlist", rows.filter((r) => r.status === "waitlist").length],
          ["Cancelled", rows.filter((r) => r.status === "cancelled").length],
        ].map(([label, value]) => (
          <div
            key={label as string}
            style={{
              border: "1px solid var(--line, #e5ded1)",
              borderRadius: 10,
              padding: "14px 18px",
              minWidth: 110,
            }}
          >
            <div style={{ fontSize: "1.7rem", fontWeight: 700, lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: "0.82rem", color: "var(--ink-soft)", marginTop: 5 }}>
              {label}
            </div>
          </div>
        ))}
      </div>

      {error && (
        <p style={{ color: "#b23b3b" }}>Could not load registrations: {error.message}</p>
      )}
      {rows.length === 0 && !error && (
        <p style={{ color: "var(--ink-soft)" }}>No registrations yet.</p>
      )}

      <div style={{ display: "grid", gap: 12 }}>
        {rows.map((r) => (
          <article
            key={r.id}
            style={{
              border: "1px solid var(--line, #e5ded1)",
              borderRadius: 10,
              padding: "14px 18px",
              opacity: r.status === "cancelled" ? 0.55 : 1,
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
                {r.name}{" "}
                <span style={{ fontWeight: 400, color: "var(--ink-soft)", fontSize: "0.85rem" }}>
                  · {r.distance || "—"}
                  {r.place ? ` · ${r.place}` : ""}
                </span>
              </strong>
              <span style={{ fontSize: "0.8rem", color: "var(--ink-soft)" }}>
                {fmtDate(r.created_at)} · {r.status}
              </span>
            </div>
            <p style={{ margin: "4px 0", fontSize: "0.9rem", color: "var(--ink-soft)" }}>
              contact (private): {[r.phone, r.email].filter(Boolean).join(" · ") || "—"}
              {r.emergency_name || r.emergency_phone
                ? ` · emergency: ${[r.emergency_name, r.emergency_phone].filter(Boolean).join(" ")}`
                : ""}
              {r.waiver ? " · ✓ waiver" : " · ⚠ no waiver"}
            </p>
            <AdminActions
              endpoint="shakti"
              id={r.id}
              current={r.status}
              actions={[
                { label: "Confirmed", status: "confirmed", tone: "good" },
                { label: "Waitlist", status: "waitlist", tone: "muted" },
                { label: "Cancel", status: "cancelled", tone: "bad" },
              ]}
            />
          </article>
        ))}
      </div>
    </>
  );
}
