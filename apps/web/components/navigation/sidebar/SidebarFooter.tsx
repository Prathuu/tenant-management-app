import Link from "next/link";
import { Settings, LogOut, Moon } from "lucide-react";

import { GlassButton } from "@/components/glass/glass-button";
import { logout } from "@/features/auth/auth.api";

export function SidebarFooter({ collapsed }: { collapsed: boolean }) {
  return (
    <div className="w-full mt-2 pt-2 border-t border-white/10 flex flex-col">
      {/* Theme */}
      <GlassButton
        appearance="text"
        className={`
          ${collapsed ? "size-12 mx-auto" : "justify-start px-3 py-2"} rounded-full
        `}
      >
        <Moon size={18} />
        {!collapsed && "Theme"}
      </GlassButton>

      {/* Settings */}
      <GlassButton
        asChild
        appearance="text"
        className={`
          ${collapsed ? "size-12 mx-auto" : "justify-start px-3 py-2"} rounded-full
        `}
      >
        <Link href="/settings">
          <Settings size={18} />
          {!collapsed && "Settings"}
        </Link>
      </GlassButton>

      {/* Logout */}
      <GlassButton
        asChild
        appearance="text"
        className={`
          ${collapsed ? "size-12 mx-auto" : "justify-start px-3 py-2"} rounded-full
          text-red-400 hover:bg-red-500/10
        `}
        onClick={logout}
      >
        <Link href="/login">
          <LogOut size={18} />
          {!collapsed && "Logout"}
        </Link>
      </GlassButton>
    </div>
  );
}
