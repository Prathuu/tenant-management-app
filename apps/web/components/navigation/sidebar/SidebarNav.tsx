"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Building,
  Users,
  Receipt,
  BedDouble,
  CircleGauge,
  Layers,
} from "lucide-react";

import { GlassButton } from "@/components/glass/glass-button";

const items = [
  { name: "Overview", href: "/dashboard", icon: Home },
  { name: "Buildings", href: "/dashboard/buildings", icon: Building },
  { name: "Tenants", href: "/dashboard/tenants", icon: Users },
  { name: "Billing", href: "/dashboard/billing", icon: Receipt },
  { name: "Rooms", href: "/dashboard/rooms", icon: BedDouble },
  { name: "Meters", href: "/dashboard/meters", icon: CircleGauge },
  { name: "Floors", href: "/dashboard/floors", icon: Layers },
];

export function SidebarNav({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-2 flex-1 w-full">
      {items.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <GlassButton
            key={item.href}
            asChild
            appearance="text"
            className={`
              ${
                collapsed ? "size-12 justify-center" : "justify-start px-3 py-2"
              }
              rounded-full

              ${
                isActive
                  ? "bg-[rgb(var(--primary)/0.15)] text-[rgb(var(--primary))]"
                  : "text-muted-foreground hover:bg-white/10"
              }
            `}
          >
            <Link
              href={item.href}
              className={`flex items-center gap-3 justify-center ${collapsed ? "mx-auto" : "w-full"}`}
              title={collapsed ? item.name : ""}
            >
              <Icon size={18} />
              {!collapsed && item.name}
            </Link>
          </GlassButton>
        );
      })}
    </div>
  );
}
