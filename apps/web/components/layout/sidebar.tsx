"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GlassPanel } from "../glass/glass-panel";

import { Building, Users, CreditCard } from "lucide-react";

const navItems = [
  {
    name: "Buildings",
    href: "/dashboard/buildings",
    icon: Building,
  },
  {
    name: "Tenants",
    href: "/dashboard/tenants",
    icon: Users,
  },
  {
    name: "Billing",
    href: "/dashboard/billing",
    icon: CreditCard,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <GlassPanel>
      <div className="w-64 h-[calc(100vh-3rem)] p-6 flex flex-col gap-8">
        <h1 className="text-xl font-semibold">Tenant Manager</h1>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                flex items-center gap-3
                px-3 py-2
                rounded-lg
                transition
                hover:bg-white/10
                ${
                  isActive
                    ? "bg-[rgb(var(--primary))] text-[rgb(var(--primary))/0.25]"
                    : ""
                }
                `}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </GlassPanel>
  );
}
