"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "../lib/supabase/client";
import { S, type Locale } from "../lib/i18n";

export default function LoginForm({
  locale,
  next,
  initialError,
}: {
  locale: Locale;
  next: string;
  initialError: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    initialError ? "error" : "idle"
  );
  const [message, setMessage] = useState(initialError);

  async function sendLink(event: React.FormEvent) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    try {
      const supabase = createSupabaseBrowserClient();
      const callback = new URL("/auth/callback", window.location.origin);
      callback.searchParams.set("next", next);
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: callback.toString(),
          shouldCreateUser: true,
        },
      });
      if (error) throw error;
      setStatus("sent");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Could not send the sign-in link."
      );
    }
  }

  if (status === "sent") {
    return (
      <div>
        <h2 style={{ marginBottom: 8 }}>{S.auth.checkEmail[locale]}</h2>
        <p className="prose" style={{ color: "var(--ink-soft)" }}>
          {S.auth.sentBody[locale]} <strong>{email}</strong>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={sendLink} style={{ display: "grid", gap: 12 }}>
      <label htmlFor="account-email" style={{ fontWeight: 600 }}>
        {S.auth.email[locale]}
      </label>
      <input
        id="account-email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        autoComplete="email"
        required
        style={{
          padding: "12px 14px",
          fontSize: "1rem",
          border: "1px solid var(--line, #d9d2c6)",
          borderRadius: 8,
          background: "var(--paper, #fff)",
          color: "var(--ink)",
        }}
      />
      <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? S.auth.sending[locale] : S.auth.sendLink[locale]}
      </button>
      {message && (
        <p role="alert" style={{ color: "#b23b3b", margin: 0 }}>
          {message}
        </p>
      )}
    </form>
  );
}