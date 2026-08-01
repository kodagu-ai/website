import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Kodagu.ai — Rooted in Heritage. Driven by Purpose.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Fetch a Barlow Condensed weight from Google Fonts for brand fidelity.
// Returns null on any failure so the image still renders with a default font.
async function loadBarlow(weight: number): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@${weight}`,
      { headers: { "User-Agent": "Mozilla/5.0" } }
    ).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const [bold, regular] = await Promise.all([loadBarlow(700), loadBarlow(400)]);
  const fonts = [
    bold && { name: "Barlow", data: bold, weight: 700 as const, style: "normal" as const },
    regular && { name: "Barlow", data: regular, weight: 400 as const, style: "normal" as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 400 | 700; style: "normal" }[];

  const family = fonts.length ? "Barlow" : "sans-serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#111111",
          padding: "0 90px",
          fontFamily: family,
          position: "relative",
        }}
      >
        {/* subtle brand glow */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -60,
            width: 620,
            height: 420,
            background: "radial-gradient(closest-side, rgba(212,175,55,0.22), transparent)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -160,
            right: -60,
            width: 620,
            height: 460,
            background: "radial-gradient(closest-side, rgba(200,16,46,0.28), transparent)",
            display: "flex",
          }}
        />

        <div
          style={{
            fontSize: 30,
            letterSpacing: 8,
            color: "rgba(255,255,255,0.6)",
            textTransform: "uppercase",
            fontWeight: 400,
            display: "flex",
          }}
        >
          Community open-source hub for Kodagu
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: 150,
            fontWeight: 700,
            letterSpacing: -3,
            marginTop: 18,
            lineHeight: 1,
          }}
        >
          <span style={{ color: "#ffffff" }}>KODAGU</span>
          <span style={{ color: "#D4AF37" }}>.</span>
          <span style={{ color: "#C8102E" }}>AI</span>
        </div>

        <div
          style={{
            fontSize: 52,
            fontWeight: 400,
            color: "rgba(255,255,255,0.85)",
            marginTop: 26,
            display: "flex",
          }}
        >
          Rooted in Heritage. Driven by Purpose.
        </div>

        {/* gradient accent bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 14,
            background: "linear-gradient(90deg, #D4AF37 0%, #C8102E 100%)",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined }
  );
}
