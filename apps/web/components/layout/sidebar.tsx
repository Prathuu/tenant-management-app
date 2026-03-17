"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Building,
  ChevronDown,
  CreditCard,
  Home,
  LayoutDashboard,
  Users,
} from "lucide-react";

import { GlassPanel } from "../glass/glass-panel";
import { GlassButton } from "../glass/glass-button";

const navItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    children: [
      { name: "Overview", href: "/dashboard", icon: Home },
      { name: "Buildings", href: "/dashboard/buildings", icon: Building },
      { name: "Tenants", href: "/dashboard/tenants", icon: Users },
      { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <GlassPanel>
      <div className="w-64 h-[calc(100vh-3rem)] p-6 flex flex-col gap-6">
        <h1 className="text-xl font-semibold">Tenant Manager</h1>

        {navItems.map((section) => {
          const [open, setOpen] = useState(true);

          const Icon = section.icon;

          return (
            <div key={section.name} className="flex flex-col gap-2">
              <button
                onClick={() => setOpen(!open)}
                className="
                  relative flex items-center gap-2 px-3 py-2
                  text-sm font-semibold
                "
              >
                <span className="absolute left-0 h-5 w-1 rounded bg-[rgb(var(--primary))]" />

                <Icon size={18} />

                {section.name}

                <ChevronDown
                  size={16}
                  className={`ml-auto transition ${open ? "rotate-180" : ""}`}
                />
              </button>

              {open && (
                <div className="flex flex-col gap-1 pl-4">
                  {section.children.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                      <GlassButton
                        key={item.href}
                        asChild
                        appearance="text"
                        className={`
                          justify-start
                          pl-6 pr-3 py-2
                          rounded-2xl
                          transition-all

                          ${
                            isActive
                              ? "bg-[rgb(var(--primary)/0.12)] text-[rgb(var(--primary))]"
                              : "text-muted-foreground hover:bg-white/10"
                          }
                        `}
                      >
                        <Link
                          href={item.href}
                          className="flex items-center gap-3"
                        >
                          <item.icon size={16} />
                          {item.name}
                        </Link>
                      </GlassButton>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </GlassPanel>
  );
}
