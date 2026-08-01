"use client";

import { useState } from "react";

// Submissions are emailed to the maintainer for review, then added to
// app/lib/directory.ts. No backend required. (Can be upgraded to a
// Supabase-backed form later — see the note on the page.)
const REVIEW_EMAIL = "poonacha@cyberhuman.ai";

export default function SubmitForm() {
  const [type, setType] = useState<"person" | "organization">("person");
  const [form, setForm] = useState({
    name: "",
    role: "",
    location: "",
    blurb: "",
    tags: "",
    website: "",
    github: "",
    other: "",
    projects: "",
    contact: "",
  });
  const [consent, setConsent] = useState(false);
  const [touched, setTouched] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const ready = form.name.trim() && form.blurb.trim() && consent;

  const composed = buildSubmission(type, form);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!ready) return;
    const subject = `Directory submission: ${form.name} (${type})`;
    window.location.href = `mailto:${REVIEW_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(composed)}`;
  }

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(
        `To: ${REVIEW_EMAIL}\nSubject: Directory submission: ${form.name} (${type})\n\n${composed}`
      );
    } catch {
      /* clipboard may be unavailable; the text is visible below regardless */
    }
  }

  return (
    <form className="submit-form" onSubmit={handleSubmit}>
      <div className="field">
        <label>Listing type</label>
        <div className="seg">
          <button
            type="button"
            className={`seg-btn${type === "person" ? " is-active" : ""}`}
            onClick={() => setType("person")}
          >
            A person
          </button>
          <button
            type="button"
            className={`seg-btn${type === "organization" ? " is-active" : ""}`}
            onClick={() => setType("organization")}
          >
            An organization
          </button>
        </div>
      </div>

      <div className="field">
        <label htmlFor="name">Name *</label>
        <input id="name" value={form.name} onChange={set("name")}
          placeholder={type === "person" ? "e.g. Ponnu Cariappa" : "e.g. Kodagu Wildlife Trust"} />
        {touched && !form.name.trim() && <span className="err">Please add a name.</span>}
      </div>

      <div className="field">
        <label htmlFor="role">{type === "person" ? "Role / title" : "Kind of organization"}</label>
        <input id="role" value={form.role} onChange={set("role")}
          placeholder={type === "person" ? "e.g. Developer, Coordinator, Wildlife biologist" : "e.g. NGO, College, Estate, Community group"} />
      </div>

      <div className="field">
        <label htmlFor="location">Location</label>
        <input id="location" value={form.location} onChange={set("location")} placeholder="e.g. Madikeri, Kodagu" />
      </div>

      <div className="field">
        <label htmlFor="blurb">Short description *</label>
        <textarea id="blurb" rows={3} value={form.blurb} onChange={set("blurb")}
          placeholder="One or two sentences about you / your organization and how you'd like to contribute." />
        {touched && !form.blurb.trim() && <span className="err">Please add a short description.</span>}
      </div>

      <div className="field">
        <label htmlFor="tags">{type === "person" ? "Skills" : "Focus areas"} (comma-separated)</label>
        <input id="tags" value={form.tags} onChange={set("tags")}
          placeholder={type === "person" ? "e.g. React, Maps, Translation" : "e.g. Conservation, Education"} />
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="website">Website</label>
          <input id="website" value={form.website} onChange={set("website")} placeholder="https://" />
        </div>
        <div className="field">
          <label htmlFor="github">GitHub</label>
          <input id="github" value={form.github} onChange={set("github")} placeholder="https://github.com/…" />
        </div>
      </div>

      <div className="field">
        <label htmlFor="projects">Projects you want to work on / support</label>
        <input id="projects" value={form.projects} onChange={set("projects")} placeholder="e.g. Aane Alert" />
      </div>

      <div className="field">
        <label htmlFor="contact">Your contact (so we can follow up) </label>
        <input id="contact" value={form.contact} onChange={set("contact")} placeholder="Email or phone — not published without asking" />
      </div>

      <label className="consent">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>I consent to this information being listed publicly on the Kodagu.ai community directory.</span>
      </label>
      {touched && !consent && <span className="err">Consent is required to be listed.</span>}

      <div className="submit-actions">
        <button type="submit" className="btn btn-primary" disabled={!ready}>
          Send submission ↗
        </button>
        <button type="button" className="btn btn-outline" onClick={copyToClipboard}>
          Copy as text
        </button>
      </div>
      <p className="submit-hint">
        “Send submission” opens your email app addressed to the maintainer. If it
        doesn’t, use “Copy as text” and email it to {REVIEW_EMAIL}.
      </p>
    </form>
  );
}

function buildSubmission(type: string, f: Record<string, string>): string {
  const lines = [
    `Type: ${type}`,
    `Name: ${f.name}`,
    f.role && `Role: ${f.role}`,
    f.location && `Location: ${f.location}`,
    `Description: ${f.blurb}`,
    f.tags && `Tags: ${f.tags}`,
    f.website && `Website: ${f.website}`,
    f.github && `GitHub: ${f.github}`,
    f.projects && `Projects: ${f.projects}`,
    f.contact && `Contact: ${f.contact}`,
    "",
    "Consent: yes — approved for public listing.",
  ].filter(Boolean);
  return lines.join("\n");
}
