import { GlassPanel } from "../glass/glass-panel";
import Link from "next/link";

export function Sidebar() {
  return (
    <GlassPanel>
      <div className="w-64 h-screen p-6 flex flex-col gap-6">
        <h1 className="text-xl font-bold">Tenant Manager</h1>

        <nav className="flex flex-col gap-3">
          <Link href="/dashboard/buildings">Buildings</Link>

          <Link href="/dashboard/tenants">Tenants</Link>

          <Link href="/dashboard/billing">Billing</Link>
        </nav>
      </div>
    </GlassPanel>
  );
}
