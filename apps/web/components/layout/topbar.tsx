import { GlassPanel } from "../glass/glass-panel";

export function Topbar() {
  return (
    <GlassPanel>
      <div className="h-16 flex items-center justify-between px-6">
        <h2 className="text-lg font-semibold">Dashboard</h2>

        <div className="flex gap-4">
          <button>Theme</button>
          <button>Logout</button>
        </div>
      </div>
    </GlassPanel>
  );
}
