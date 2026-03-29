// components/buildings-stats.tsx

import { GlassCard } from "@/components/glass/glass-card";
import { Building, BuildingsList } from "../buildings.types";

export const BuildingStats = ({ data }: { data: BuildingsList[] }) => {
  const totalBuildings = data.length;
  const totalRooms = data.reduce((acc, b) => acc + b.totalRooms, 0);
  const occupied = data.reduce((acc, b) => acc + b.occupiedRooms, 0);
  const vacant = data.reduce((acc, b) => acc + b.vacantRooms, 0);

  const stats = [
    { label: "Buildings", value: totalBuildings },
    { label: "Rooms", value: totalRooms },
    { label: "Occupied", value: occupied },
    { label: "Vacant", value: vacant },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((stat) => (
        <GlassCard key={stat.label} className="p-4">
          <p className="text-sm text-muted-foreground">{stat.label}</p>
          <p className="text-2xl font-semibold">{stat.value}</p>
        </GlassCard>
      ))}
    </div>
  );
};
