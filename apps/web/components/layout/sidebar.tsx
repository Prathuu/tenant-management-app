"use client";

import { usePathname } from "next/navigation";
import { GlassPanel } from "../glass/glass-panel";
import Link from "next/link";

export function Sidebar() {
  const pathname = usePathname();
  const navItems = [
    {
      name: "Buildings",
      href: "/dashboard/buildings",
    },
    {
      name: "Tenants",
      href: "/dashboard/tenants",
    },
    {
      name: "Billing",
      href: "/dashboard/billing",
    },
  ];
  return (
    <GlassPanel>
      <div className="w-64 h-screen p-6 flex flex-col gap-6">
        <h1 className="text-xl font-bold">Tenant Manager</h1>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="bg-[rgb(var(--primary))/0.25]
text-[rgb(var(--primary))] hover:bg-white/10"
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </GlassPanel>
  );
}
