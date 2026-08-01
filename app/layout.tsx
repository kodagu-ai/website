import type { Metadata } from "next";
import { Barlow_Condensed, Noto_Sans_Kannada } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { site } from "./lib/site";
import { getLocale } from "./lib/getLocale";

// The header/footer/pages render from the `locale` cookie (EN/ಕನ್ನಡ), so every
// page must be rendered per-request rather than prerendered at build time.
export const dynamic = "force-dynamic";

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

// Kannada glyphs (Barlow Condensed is Latin-only). Latin text uses Barlow;
// Kannada characters fall through to this in the body font stack.
const kannada = Noto_Sans_Kannada({
  subsets: ["kannada"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-kannada",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = getLocale();
  return (
    <html lang={locale} className={`${barlow.variable} ${kannada.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
