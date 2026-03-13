import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="glass w-64 p-6 flex flex-col justify-between">
      <div className="space-y-6">
        <h1 className="text-xl font-semibold">Tenant Manager</h1>

        <nav className="space-y-3 text-sm">
          <Link
            href="/dashboard/buildings"
            className="block px-3 py-2 rounded-lg hover:bg-white/10 transition"
          >
            Buildings
          </Link>

          <Link
            href="/dashboard/tenants"
            className="block px-3 py-2 rounded-lg hover:bg-white/10 transition"
          >
            Tenants
          </Link>

          <Link
            href="/dashboard/billing"
            className="block px-3 py-2 rounded-lg hover:bg-white/10 transition"
          >
            Billing
          </Link>
        </nav>
      </div>

      <div className="w-10 h-10 rounded-full glass flex items-center justify-center">
        N
      </div>
    </aside>
  );
}
