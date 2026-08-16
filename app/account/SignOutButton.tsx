"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "../lib/supabase/client";
import { S, type Locale } from "../lib/i18n";

export default function SignOutButton({ locale }: { locale: Locale }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  return (
    <button
      type="button"
      className="btn btn-primary"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        try {
          await createSupabaseBrowserClient().auth.signOut();
        } finally {
          router.replace("/login");
          router.refresh();
        }
      }}
    >
      {busy ? S.auth.signingOut[locale] : S.auth.signOut[locale]}
    </button>
  );
}