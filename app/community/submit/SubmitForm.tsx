"use client";

import { useState } from "react";
import { S, type Locale } from "../../lib/i18n";

// Submissions POST to /api/directory/submit, which stores them securely in
// Supabase for review. If that ever fails, we fall back to an email link.
const REVIEW_EMAIL = "poonacha@cyberhuman.ai";

type Status = "idle" | "submitting" | "success" | "error";

export default function SubmitForm({ locale = "en" }: { locale?: Locale }) {
  const [type, setType] = useState<"person" | "organization">("person");
  const [form, setForm] = useState({
    name: "",
    role: "",
    location: "",
    blurb: "",
    tags: "",
    website: "",
    github: "",
    projects: "",
    contact: "",
  });
  const [consent, setConsent] = useState(false);
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const ready = Boolean(form.name.trim() && form.blurb.trim() && consent);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!ready || status === "submitting") return;
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/directory/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, ...form, consent }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  function mailtoFallback() {
    const subject = `Directory submission: ${form.name} (${type})`;
    const body = [
      `Type: ${type}`,
      `Name: ${form.name}`,
      form.role && `Role: ${form.role}`,
      form.location && `Location: ${form.location}`,
      `Description: ${form.blurb}`,
      form.tags && `Tags: ${form.tags}`,
      form.website && `Website: ${form.website}`,
      form.github && `GitHub: ${form.github}`,
      form.projects && `Projects: ${form.projects}`,
      form.contact && `Contact: ${form.contact}`,
      "",
      "Consent: yes — approved for public listing.",
    ]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:${REVIEW_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  if (status === "success") {
    return (
      <div className="submit-success">
        <div className="submit-success-mark">✓</div>
        <h2>{S.form.successTitle[locale]}</h2>
        <p>
          {S.form.successPre[locale]} {form.name} {S.form.successPost[locale]}
        </p>
        <a href="/community" className="btn btn-outline">{S.form.backToDir[locale]}</a>
      </div>
    );
  }

  return (
    <form className="submit-form" onSubmit={handleSubmit}>
      <div className="field">
        <label>{S.form.listingType[locale]}</label>
        <div className="seg">
          <button type="button" className={`seg-btn${type === "person" ? " is-active" : ""}`} onClick={() => setType("person")}>
            {S.form.aPerson[locale]}
          </button>
          <button type="button" className={`seg-btn${type === "organization" ? " is-active" : ""}`} onClick={() => setType("organization")}>
            {S.form.anOrg[locale]}
          </button>
        </div>
      </div>

      <div className="field">
        <label htmlFor="name">{S.form.nameLbl[locale]}</label>
        <input id="name" value={form.name} onChange={set("name")}
          placeholder={type === "person" ? "e.g. Ponnu Cariappa" : "e.g. Kodagu Wildlife Trust"} />
        {touched && !form.name.trim() && <span className="err">{S.form.nameErr[locale]}</span>}
      </div>

      <div className="field">
        <label htmlFor="role">{type === "person" ? S.form.roleP[locale] : S.form.roleO[locale]}</label>
        <input id="role" value={form.role} onChange={set("role")}
          placeholder={type === "person" ? "e.g. Developer, Coordinator, Wildlife biologist" : "e.g. NGO, College, Estate, Community group"} />
      </div>

      <div className="field">
        <label htmlFor="location">{S.form.locationLbl[locale]}</label>
        <input id="location" value={form.location} onChange={set("location")} placeholder="e.g. Madikeri, Kodagu" />
      </div>

      <div className="field">
        <label htmlFor="blurb">{S.form.blurbLbl[locale]}</label>
        <textarea id="blurb" rows={3} value={form.blurb} onChange={set("blurb")}
          placeholder="One or two sentences about you / your organization and how you'd like to contribute." />
        {touched && !form.blurb.trim() && <span className="err">{S.form.blurbErr[locale]}</span>}
      </div>

      <div className="field">
        <label htmlFor="tags">{type === "person" ? S.form.skills[locale] : S.form.focus[locale]} {S.form.commaSep[locale]}</label>
        <input id="tags" value={form.tags} onChange={set("tags")}
          placeholder={type === "person" ? "e.g. React, Maps, Translation" : "e.g. Conservation, Education"} />
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="website">{S.form.website[locale]}</label>
          <input id="website" value={form.website} onChange={set("website")} placeholder="https://" />
        </div>
        <div className="field">
          <label htmlFor="github">GitHub</label>
          <input id="github" value={form.github} onChange={set("github")} placeholder="https://github.com/…" />
        </div>
      </div>

      <div className="field">
        <label htmlFor="projects">{S.form.projectsLbl[locale]}</label>
        <input id="projects" value={form.projects} onChange={set("projects")} placeholder="e.g. Aane Alert" />
      </div>

      <div className="field">
        <label htmlFor="contact">{S.form.contactLbl[locale]}</label>
        <input id="contact" value={form.contact} onChange={set("contact")} placeholder="Email or phone" />
      </div>

      <label className="consent">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>{S.form.consent[locale]}</span>
      </label>
      {touched && !consent && <span className="err">{S.form.consentErr[locale]}</span>}

      {status === "error" && (
        <div className="submit-error">
          <p>{errorMsg || S.form.couldNotSend[locale]}</p>
          <button type="button" className="btn btn-outline" onClick={mailtoFallback}>
            {S.form.emailInstead[locale]}
          </button>
        </div>
      )}

      <div className="submit-actions">
        <button type="submit" className="btn btn-primary" disabled={!ready || status === "submitting"}>
          {status === "submitting" ? S.form.sending[locale] : S.form.send[locale]}
        </button>
      </div>
      <p className="submit-hint">{S.form.hint[locale]}</p>
    </form>
  );
}
