"use client";

import { useState } from "react";
import { S, type Locale } from "../lib/i18n";

type Status = "idle" | "submitting" | "success" | "error";

// Branded email capture. Posts to /api/subscribe, which adds the address to the
// "Kodagu.ai Updates" tag in Kit. Works on light (default) or dark sections.
export default function EmailSignup({ onDark = false, locale = "en" }: { onDark?: boolean; locale?: Locale }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setMsg("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <p className={`signup-success${onDark ? " on-dark" : ""}`}>{S.email.success[locale]}</p>
    );
  }

  return (
    <form className={`signup${onDark ? " on-dark" : ""}`} onSubmit={handleSubmit}>
      <div className="signup-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-label="Email address"
          className="signup-input"
          disabled={status === "submitting"}
        />
        <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
          {status === "submitting" ? S.email.joining[locale] : S.email.keepPosted[locale]}
        </button>
      </div>
      {status === "error" && <span className="signup-err">{msg}</span>}
    </form>
  );
}
