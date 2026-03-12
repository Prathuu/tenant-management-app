"use client";

import Link from "next/link";
import { Glass } from "@/components/ui/glass";

export default function Sidebar() {
  return (
    <Glass className="h-full w-64 p-4 flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Tenant Manager</h2>

      <nav className="flex flex-col gap-2">
        <Link href="/dashboard/buildings">Buildings</Link>
        <Link href="/dashboard/tenants">Tenants</Link>
        <Link href="/dashboard/billing">Billing</Link>
      </nav>
    </Glass>
  );
}
