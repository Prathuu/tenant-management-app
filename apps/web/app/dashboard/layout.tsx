"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Sidebar from "@/components/layout/sidebar";
import Topbar from "@/components/layout/topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="flex h-screen gap-4 p-4">
      <Sidebar />

      <div className="flex flex-col flex-1 gap-4">
        <Topbar />

        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>
    </div>
  );
}
