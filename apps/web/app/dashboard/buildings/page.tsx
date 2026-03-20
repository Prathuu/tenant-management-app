// app/dashboard/buildings/page.tsx

"use client";

import { BuildingsHeader } from "@/features/buildings/components/buildings-header";
import { BuildingStats } from "@/features/buildings/components/building-stats";
import { BuildingsGrid } from "@/features/buildings/components/buildings-grid";
import { EmptyState } from "@/features/buildings/components/empty-state";
import { useBuildings } from "@/features/buildings/buildings.hooks";

export default function BuildingsPage() {
  const { data, isLoading } = useBuildings();

  if (isLoading) return <div>Loading...</div>;

  if (!data || data.length === 0) {
    return (
      <div className="space-y-6">
        <BuildingsHeader />
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <BuildingsHeader />
      <BuildingStats data={data} />
      <BuildingsGrid data={data} />
    </div>
  );
}
