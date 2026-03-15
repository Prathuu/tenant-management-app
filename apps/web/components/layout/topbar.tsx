import { GlassPanel } from "../glass/glass-panel";
import { PaletteSwitcher } from "../glass/palette-switcher";
import { ThemeToggle } from "../glass/theme-toggle";
export function Topbar() {
  return (
    <GlassPanel>
      <div className="h-16 flex items-center justify-between px-6">
        <h2 className="text-lg font-semibold">Dashboard</h2>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <PaletteSwitcher />

          <button
            className="
px-4 py-2
rounded-lg
text-white
bg-[color:var(--primary-color)]
hover:opacity-90
transition
"
          >
            Logout
          </button>
        </div>
      </div>
    </GlassPanel>
  );
}
