"use client";

import { logout } from "@/features/auth/auth.api";

export default function Topbar() {
  return (
    <header
      style={{
        height: 60,
        borderBottom: "1px solid #eee",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
      }}
    >
      <span>Dashboard</span>
      <button
        onClick={logout}
        className="px-3 py-1 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </header>
  );
}
