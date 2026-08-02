import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminUser } from "../../lib/adminAuth";
import LogoutButton from "./LogoutButton";

export const dynamic = "force-dynamic";

// Server-side gate for the whole admin panel. Middleware already blocks
// non-admins, but we re-check here (defence in depth) so a page never renders
// data without a verified admin session.
export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");

  return (
    <section style={{ paddingTop: 24 }}>
      <div className="container">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            alignItems: "baseline",
            justifyContent: "space-between",
            borderBottom: "1px solid var(--line, #e5ded1)",
            paddingBottom: 16,
            marginBottom: 24,
          }}
        >
          <div style={{ display: "flex", gap: 20, alignItems: "baseline", flexWrap: "wrap" }}>
            <strong style={{ fontSize: "1.15rem" }}>Kodagu.ai Admin</strong>
            <nav style={{ display: "flex", gap: 16, fontSize: "0.95rem" }}>
              <Link href="/admin">Dashboard</Link>
              <Link href="/admin/directory">Directory</Link>
              <Link href="/admin/sankalpa">Sankalpa</Link>
            </nav>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--ink-soft)" }}>
              {user.email}
            </span>
            <LogoutButton />
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
