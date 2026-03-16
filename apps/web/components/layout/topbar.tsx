import { GlassButton } from "../glass/glass-button";
import { GlassPanel } from "../glass/glass-panel";
import { PaletteSwitcher } from "../glass/palette-switcher";
import { ThemeToggle } from "../glass/theme-toggle";
import { Button } from "../ui/button";
export function Topbar() {
  return (
    <GlassPanel>
      <div className="h-16 flex items-center justify-between px-6">
        <h2 className="text-lg font-semibold">Dashboard</h2>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <PaletteSwitcher />
          <GlassButton appearance="filled">Logout</GlassButton>
        </div>
      </div>
    </GlassPanel>
  );
}
