import { cookies } from "next/headers";
import type { Locale } from "./i18n";

// Server-only: reads the `locale` cookie set by the header LangToggle. Kept in
// its own module (imports next/headers) so client components can import the S
// dictionary from ./i18n without pulling in a server-only dependency.
export function getLocale(): Locale {
  const v = cookies().get("locale")?.value;
  return v === "kn" ? "kn" : "en";
}
