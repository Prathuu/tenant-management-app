// app/dashboard/buildings/page.tsx

"use client";

import { BuildingsHeader } from "@/features/buildings/components/buildings-header";
import { BuildingStats } from "@/features/buildings/components/building-stats";

export default function BuildingsPage() {
  return (
    <div className="space-y-6">
      <BuildingsHeader />
      <BuildingStats />
    </div>
  );
}
