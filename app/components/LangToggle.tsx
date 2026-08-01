"use client";

import { useRouter } from "next/navigation";
import type { Locale } from "../lib/i18n";

// English / Kannada switch. Writes the `locale` cookie and refreshes so the
// server components re-render in the chosen language.
export default function LangToggle({ locale }: { locale: Locale }) {
  const router = useRouter();

  function set(l: Locale) {
    if (l === locale) return;
    document.cookie = `locale=${l}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  }

  return (
    <div className="lang-toggle" role="group" aria-label="Language / ಭಾಷೆ">
      <button
        type="button"
        className={locale === "en" ? "is-active" : ""}
        aria-pressed={locale === "en"}
        onClick={() => set("en")}
      >
        EN
      </button>
      <button
        type="button"
        lang="kn"
        className={locale === "kn" ? "is-active" : ""}
        aria-pressed={locale === "kn"}
        onClick={() => set("kn")}
      >
        ಕನ್ನಡ
      </button>
    </div>
  );
}
