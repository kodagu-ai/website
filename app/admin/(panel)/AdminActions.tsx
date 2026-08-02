"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type Action = { label: string; status: string; tone?: "good" | "bad" | "muted" };

const toneStyle: Record<NonNullable<Action["tone"]>, React.CSSProperties> = {
  good: { borderColor: "#3a7d44", color: "#2f6b39" },
  bad: { borderColor: "#b23b3b", color: "#b23b3b" },
  muted: { borderColor: "var(--line, #d9d2c6)", color: "var(--ink-soft)" },
};

// Status-change buttons for one review row. Posts to an admin API route
// (auth-gated, service-role) and refreshes the server component on success.
export default function AdminActions({
  endpoint,
  id,
  current,
  actions,
}: {
  endpoint: "directory" | "sankalpa";
  id: string;
  current: string;
  actions: Action[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  async function set(status: string) {
    setError("");
    try {
      const res = await fetch(`/api/admin/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || `Request failed (${res.status})`);
      }
      startTransition(() => router.refresh());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    }
  }

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
      {actions.map((a) => {
        const active = a.status === current;
        return (
          <button
            key={a.status}
            onClick={() => set(a.status)}
            disabled={pending || active}
            title={active ? "Current status" : `Set to ${a.label}`}
            style={{
              padding: "5px 11px",
              borderRadius: 7,
              border: "1px solid",
              background: active ? "var(--wash, #f2ede2)" : "transparent",
              cursor: active ? "default" : "pointer",
              fontSize: "0.85rem",
              fontWeight: active ? 700 : 500,
              opacity: pending ? 0.6 : 1,
              ...(toneStyle[a.tone || "muted"]),
            }}
          >
            {active ? `✓ ${a.label}` : a.label}
          </button>
        );
      })}
      {error && <span style={{ color: "#b23b3b", fontSize: "0.8rem" }}>{error}</span>}
    </div>
  );
}
