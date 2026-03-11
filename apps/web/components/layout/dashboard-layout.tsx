import Sidebar from "./sidebar";
import Topbar from "./topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Topbar />
        <main style={{ padding: 20 }}>{children}</main>
      </div>
    </div>
  );
}
