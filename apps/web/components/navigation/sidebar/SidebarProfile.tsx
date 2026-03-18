export function SidebarProfile({ collapsed }: { collapsed: boolean }) {
  return (
    <div className="w-full mb-4">
      <div
        className={`
          glass
          rounded-xl
          p-3
          flex items-center gap-3
          hover:bg-white/5
          transition
          ${collapsed ? "justify-center" : ""}
        `}
      >
        <div className="size-8 rounded-full profile-mini overflow-hidden">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAsEtNHSjjjSnI3q9KWp_wOcujsjlfHSvDyQ&s"
            alt=""
          />
        </div>

        {!collapsed && (
          <div className="flex flex-col text-sm">
            <span className="font-medium">Prathuu</span>
            <span className="text-muted-foreground text-xs">
              prathuu@email.com
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
