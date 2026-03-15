"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GlassPanel } from "../glass/glass-panel";

import { Building, Users, CreditCard, LayoutDashboard } from "lucide-react";

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
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

        <nav className="flex flex-col gap-1 relative">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                relative
                flex items-center gap-3
                px-4 py-2.5
                rounded-lg
                transition-all
                duration-200
                group
                hover:bg-white/10 hover:shadow-[0_0_12px_rgba(255,255,255,0.08)]

                ${
                  isActive
                    ? "text-[color:var(--primary-color)]"
                    : "text-white/80"
                }
                `}
              >
                {/* Sliding indicator */}

                {isActive && (
                  <span
                    className="
                    absolute left-0
                    h-6 w-[3px]
                    rounded-full
                    bg-[color:var(--primary-color)]
                    transition-all
                    "
                  />
                )}

                <Icon
                  size={18}
                  className="
transition
duration-200
group-hover:scale-110
group-hover:text-[color:var(--primary-color)]
"
                />

                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </GlassPanel>
  );
}
