"use client";

import { useState } from "react";
import { GlassPanel } from "@/components/glass/glass-panel";

import { SidebarHeader } from "./SidebarHeader";
import { SidebarProfile } from "./SidebarProfile";
import { SidebarNav } from "./SidebarNav";
import { SidebarFooter } from "./SidebarFooter";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <GlassPanel>
      <div
        className={`
          h-[calc(100vh-3rem)]
          flex flex-col
          transition-all duration-300
          ${collapsed ? "w-20 items-center py-4" : "w-64 p-2"}
        `}
      >
        <SidebarHeader
          collapsed={collapsed}
          toggle={() => setCollapsed(!collapsed)}
        />

        <SidebarProfile collapsed={collapsed} />

        <SidebarNav collapsed={collapsed} />

        <SidebarFooter collapsed={collapsed} />
      </div>
    </GlassPanel>
  );
}
