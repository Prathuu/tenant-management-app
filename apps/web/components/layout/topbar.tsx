"use client";

import { Glass } from "@/components/ui/glass";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { logout } from "@/features/auth/auth.api";
import { Button } from "@/components/ui/button";
import { PaletteSwitcher } from "@/components/ui/palette-switcher";

export default function Topbar() {
  return (
    <Glass className="flex items-center justify-between px-6 py-3">
      <h1 className="text-lg font-semibold">Dashboard</h1>

      <div className="flex items-center gap-3">
        <PaletteSwitcher />
        <ThemeToggle />
        <Button variant="destructive" onClick={logout} className="bg-primary">
          Logout
        </Button>
        <div className="bg-primary text-primary-foreground p-6 rounded-lg">
          Palette Test
        </div>
      </div>
    </Glass>
  );
}
