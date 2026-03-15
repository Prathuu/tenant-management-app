import { GlassPanel } from "../glass/glass-panel";
import { PaletteSwitcher } from "../glass/palette-switcher";

export function Topbar() {
  return (
    <GlassPanel>
      <div className="h-16 flex items-center justify-between px-6">
        <h2 className="text-lg font-semibold">Dashboard</h2>

        <div className="flex items-center gap-4">
          <PaletteSwitcher />

          <button>Logout</button>
        </div>
      </div>
    </GlassPanel>
  );
}
