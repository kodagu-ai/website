"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "../../lib/supabase/client";

// Admin sign-in. The magic link is only ever sent to the one admin address, so
// even though anyone can load this page, only the admin's inbox can complete a
// login. The server (middleware + every admin page/route) is the real gate;
// this client check just avoids emailing non-admins.
const ADMIN_EMAIL = "poonacha@cyberhuman.ai";

export default function AdminLoginPage() {
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function sendLink(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    if (email.trim().toLowerCase() !== ADMIN_EMAIL) {
      setStatus("error");
      setMessage("This admin area is restricted.");
      return;
    }
    setStatus("sending");
    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithOtp({
        email: ADMIN_EMAIL,
        options: {
          emailRedirectTo: `${window.location.origin}/admin/auth/callback`,
        },
      });
      if (error) throw error;
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error ? err.message : "Could not send the link. Try again."
      );
    }
  }

  return (
    <section className="page-hero">
      <div className="container" style={{ maxWidth: 460 }}>
        <div className="accent-bar" />
        <h1>Kodagu.ai Admin</h1>
        {status === "sent" ? (
          <p className="prose" style={{ fontSize: "1.1rem", color: "var(--ink-soft)" }}>
            Check your inbox — a sign-in link is on its way to{" "}
            <strong>{ADMIN_EMAIL}</strong>. Open it on this device to enter the
            dashboard. You can close this tab.
          </p>
        ) : (
          <>
            <p
              className="prose"
              style={{ fontSize: "1.05rem", color: "var(--ink-soft)", marginBottom: 20 }}
            >
              Sign in to review community submissions and Sankalpa entries.
              We&apos;ll email you a one-time magic link.
            </p>
            <form onSubmit={sendLink} style={{ display: "grid", gap: 12 }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
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
              <button
                type="submit"
                className="btn btn-primary"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending…" : "Send me a magic link"}
              </button>
            </form>
            {message && (
              <p style={{ marginTop: 14, color: "#b23b3b", fontSize: "0.95rem" }}>
                {message}
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
