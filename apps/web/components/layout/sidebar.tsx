"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside style={{ width: 220, padding: 20, borderRight: "1px solid #eee" }}>
      <h3>Tenant Manager</h3>

      <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Link href="/dashboard/buildings">Buildings</Link>
        <Link href="/dashboard/tenants">Tenants</Link>
        <Link href="/dashboard/billing">Billing</Link>
      </nav>
    </aside>
  );
}
