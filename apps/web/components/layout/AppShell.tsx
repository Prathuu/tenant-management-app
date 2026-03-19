"use client";

import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import { Topbar } from "@/components/navigation/topbar";
import { Sidebar } from "@/components/navigation/sidebar/sidebar";
import { BottomNav } from "../navigation/BottomNav";

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Example: hide layout on login page
  const isAuthPage = pathname.startsWith("/login");

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Desktop */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <Sidebar
          isMobile
          open={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
        />
      </div>

      {/* Main Area */}
      <div className="flex flex-1 flex-col">
        {/* Top Bar */}
        <Topbar title="" onMenuClick={() => setMobileSidebarOpen(true)} />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-5">{children}</main>

        {/* Mobile Bottom Nav */}
        <div className="md:hidden">
          <BottomNav />
        </div>
      </div>
    </div>
  );
}
