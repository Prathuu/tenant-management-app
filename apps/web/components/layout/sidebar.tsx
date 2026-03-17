"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronDown,
  LayoutDashboard,
  Home,
  Building,
  Users,
  Receipt,
  Settings,
  LogOut,
  SkipForward,
  StepForward,
  IndentIncrease,
  IndentDecrease,
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
      { name: "Billing", href: "/dashboard/billing", icon: Receipt },
    ],
  },
];

const bottomItems = [
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Logout", href: "/logout", icon: LogOut },
];

export function Sidebar() {
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    Dashboard: true,
  });

  const toggleSection = (name: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <GlassPanel>
      <div
        className={`
          h-[calc(100vh-3rem)]
          flex flex-col
          transition-all duration-300
          ${collapsed ? "w-20 items-center py-6 gap-6" : "w-64 p-6 gap-6"}
        `}
      >
        {/* Toggle */}
        <div className={`flex justify-${collapsed ? "center" : "end"} w-full`}>
          <GlassButton
            onClick={() => setCollapsed(!collapsed)}
            className="
              size-10
              rounded-full
              glass
              flex items-center justify-center
              transition
            "
          >
            {collapsed ? (
              <IndentIncrease size={18} />
            ) : (
              <IndentDecrease size={18} />
            )}
          </GlassButton>
        </div>

        {/* NAV */}
        <div className="flex flex-col flex-1 w-full">
          {collapsed ? (
            /* ---------------- COLLAPSED (ICON DOCK) ---------------- */
            <div className="flex flex-col items-center gap-2">
              {navItems[0].children.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <GlassButton
                    key={item.href}
                    asChild
                    appearance="text"
                    className={`
                      size-12
                      rounded-xl
                      flex items-center justify-center

                      ${
                        isActive
                          ? "bg-[rgb(var(--primary)/0.2)] text-[rgb(var(--primary))]"
                          : "text-muted-foreground hover:bg-white/10"
                      }
                    `}
                  >
                    <Link
                      href={item.href}
                      title={item.name}
                      className="flex items-center justify-center"
                    >
                      <Icon size={18} />
                    </Link>
                  </GlassButton>
                );
              })}
            </div>
          ) : (
            /* ---------------- EXPANDED ---------------- */
            <div className="flex flex-col gap-4">
              {navItems.map((section) => {
                const isOpen = openSections[section.name];
                const Icon = section.icon;

                return (
                  <div key={section.name} className="flex flex-col gap-1">
                    {/* Parent */}
                    <button
                      onClick={() => toggleSection(section.name)}
                      className="relative flex items-center gap-2 px-2 py-2 text-sm font-semibold"
                    >
                      <span className="absolute left-0 h-5 w-1 rounded bg-[rgb(var(--primary))]" />

                      <Icon size={18} />

                      {section.name}

                      <ChevronDown
                        size={14}
                        className={`ml-auto transition ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Children */}
                    {isOpen && (
                      <div className="flex flex-col gap-1 pl-4">
                        {section.children.map((item) => {
                          const isActive = pathname === item.href;
                          const ItemIcon = item.icon;

                          return (
                            <GlassButton
                              key={item.href}
                              asChild
                              appearance="text"
                              className={`
                                justify-start px-3 py-2 rounded-lg

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
                                <ItemIcon size={16} />
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
          )}
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col items-center mt-auto w-full">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return collapsed ? (
              <GlassButton
                key={item.href}
                asChild
                appearance="text"
                className="size-12 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-white/10"
              >
                <Link href={item.href} title={item.name}>
                  <Icon size={18} />
                </Link>
              </GlassButton>
            ) : (
              <GlassButton
                key={item.href}
                asChild
                appearance="text"
                className="justify-start px-3 py-2 rounded-lg text-muted-foreground hover:bg-white/10 w-full"
              >
                <Link href={item.href} className="flex items-center gap-3">
                  <Icon size={16} />
                  {item.name}
                </Link>
              </GlassButton>
            );
          })}
        </div>
      </div>
    </GlassPanel>
  );
}
