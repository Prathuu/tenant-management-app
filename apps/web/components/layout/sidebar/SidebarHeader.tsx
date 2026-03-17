import { IndentIncrease, IndentDecrease } from "lucide-react";

export function SidebarHeader({
  collapsed,
  toggle,
}: {
  collapsed: boolean;
  toggle: () => void;
}) {
  return (
    <div
      className={`flex items-center justify-${collapsed ? "center" : "between"} w-full mb-2`}
    >
      {!collapsed && (
        <div className="font-semibold text-lg">Tenant Manager</div>
      )}

      <button
        onClick={toggle}
        className="
          size-10
          rounded-full
          glass
          flex items-center justify-center
          hover:bg-white/10
          transition
        "
      >
        {collapsed ? (
          <IndentIncrease size={18} />
        ) : (
          <IndentDecrease size={18} />
        )}
      </button>
    </div>
  );
}
