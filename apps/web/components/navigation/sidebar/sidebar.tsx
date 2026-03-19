"use client";

import { useState } from "react";
import { GlassPanel } from "@/components/glass/glass-panel";

import { SidebarHeader } from "./SidebarHeader";
import { SidebarProfile } from "./SidebarProfile";
import { SidebarNav } from "./SidebarNav";
import { SidebarFooter } from "./SidebarFooter";

type SidebarProps = {
  isMobile?: boolean;
  open?: boolean;
  onClose?: () => void;
};

export function Sidebar({ isMobile, open, onClose }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  // Mobile: don't render if closed
  if (isMobile && !open) return null;

  const isCollapsed = isMobile ? false : collapsed;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && (
        <div
          className="fixed inset-0 z-90 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <div
        className={`
        ${isMobile ? "fixed left-0 top-0 h-full z-100" : "relative"}
      `}
      >
        <GlassPanel>
          <div
            className={`
              h-screen
              flex flex-col
              transition-all duration-300
              ${isCollapsed ? "w-20 items-center py-4" : "w-64 p-2"}
            `}
          >
            <SidebarHeader
              collapsed={isCollapsed}
              isMobile={isMobile}
              toggle={() => {
                if (!isMobile) setCollapsed(!collapsed); // Only allow collapsing on desktop
              }}
            />

            <SidebarProfile collapsed={isCollapsed} />
            <SidebarNav collapsed={isCollapsed} />
            <SidebarFooter collapsed={isCollapsed} />
          </div>
        </GlassPanel>
      </div>
    </>
  );
}
