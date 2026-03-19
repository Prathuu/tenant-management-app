import { Sidebar } from "../navigation/sidebar/sidebar";
import { Topbar } from "../navigation/topbar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-6 p-6">
      <Sidebar />

      <div className="flex-1 flex flex-col gap-6">
        <Topbar title="Dashboard" />

        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
