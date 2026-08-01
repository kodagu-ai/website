// The Kodagu.ai wordmark, rebuilt in Barlow Condensed to match the brand book:
//   KODAGU  ·(gold dot)·  AI(red)
// Rendered as text so it stays crisp at any size and works on light/dark.

export default function Wordmark({
  size = 1.5,
  onDark = false,
}: {
  /** font-size in rem */
  size?: number;
  onDark?: boolean;
}) {
  return (
    <span
      className={`wordmark${onDark ? " on-dark" : ""}`}
      style={{ fontSize: `${size}rem` }}
      aria-label="Kodagu.ai"
    >
      <span className="wm-base">KODAGU</span>
      <span className="wm-dot">.</span>
      <span className="wm-ai">AI</span>
    </span>
  );
}
