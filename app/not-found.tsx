import Link from "next/link";

export default function NotFound() {
  return (
    <section style={{ padding: "120px 0", textAlign: "center" }}>
      <div className="container">
        <div className="accent-bar" style={{ margin: "0 auto 22px" }} />
        <h1>Page not found</h1>
        <p style={{ color: "var(--ink-soft)", fontSize: "1.15rem" }}>
          The page you are looking for does not exist or has moved.
        </p>
        <Link href="/" className="btn btn-primary" style={{ marginTop: 20 }}>
          Back home
        </Link>
      </div>
    </section>
  );
}
