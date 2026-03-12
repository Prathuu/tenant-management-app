"use client";

import { Glass } from "@/components/ui/glass";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { logout } from "@/features/auth/auth.api";
import { Button } from "@/components/ui/button";

export default function Topbar() {
  return (
    <Glass className="flex items-center justify-between px-6 py-3">
      <h1 className="text-lg font-semibold">Dashboard</h1>

      <div className="flex items-center gap-3">
        <ThemeToggle />

        <Button variant="destructive" onClick={logout}>
          Logout
        </Button>
      </div>
    </Glass>
  );
}
