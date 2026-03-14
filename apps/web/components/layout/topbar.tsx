"use client";

import { ThemeToggle } from "@/components/ui/theme-toggle";
import { PaletteSwitcher } from "@/components/ui/palette-switcher";
import { useLogout } from "@/features/auth/auth.hooks";

export default function Header() {
  const logout = useLogout();
  return (
    <header className="glass flex items-center justify-between px-6 py-4">
      <h2 className="text-lg font-semibold">Dashboard</h2>

      <div className="flex items-center gap-4">
        <div className="glass flex items-center gap-3 px-4 py-2 rounded-full">
          <PaletteSwitcher />
          <ThemeToggle />
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
