"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Tenants", href: "/tenants" },
    { label: "Billing", href: "/billing" },
    { label: "Payments", href: "/payments" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background backdrop-blur-md">
      <div className="flex justify-around py-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <div
              className={`text-sm ${
                pathname === item.href ? "font-bold" : "opacity-60"
              }`}
            >
              {item.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
