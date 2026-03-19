"use client";

import { Building, HomeIcon, Receipt, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/dashboard", icon: HomeIcon },
    { label: "Tenants", href: "/dashboard/tenants", icon: Users },
    { label: "Billing", href: "/dashboard/billing", icon: Receipt },
    { label: "Payments", href: "/dashboard/payments", icon: Building },
  ];

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-md">
      <div className="flex justify-around rounded-full border border-white/10 bg-white/10 backdrop-blur-xl shadow-lg">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center px-3 py-2 rounded-full transition-all ${
                isActive ? "text-[rgb(var(--primary))]" : "text-white/60"
              }`}
            >
              <item.icon
                className={`w-5 h-5 mb-1 transition ${
                  isActive ? "text-primary" : "text-white/60"
                }`}
              />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
