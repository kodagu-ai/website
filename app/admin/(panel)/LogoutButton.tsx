"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "../../lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  return (
    <button
      onClick={async () => {
        setBusy(true);
        try {
          await createSupabaseBrowserClient().auth.signOut();
        } finally {
          router.push("/admin/login");
          router.refresh();
        }
      }}
      disabled={busy}
      style={{
        border: "1px solid var(--line, #d9d2c6)",
        background: "transparent",
        color: "var(--ink-soft)",
        borderRadius: 8,
        padding: "6px 12px",
        cursor: "pointer",
        fontSize: "0.9rem",
      }}
    >
      {busy ? "Logging out…" : "Log out"}
    </button>
  );
}
