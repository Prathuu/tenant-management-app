// components/building-card.tsx

import { GlassCard } from "@/components/glass/glass-card";
import { Building } from "../buildings.types";

export const BuildingCard = ({ building }: { building: Building }) => {
  const occupancy = (building.occupiedUnits / building.totalUnits) * 100;

  return (
    <GlassCard className="p-4 space-y-3 hover:scale-[1.02] transition">
      <div>
        <h3 className="font-semibold">{building.name}</h3>
        <p className="text-xs text-muted-foreground">{building.address}</p>
      </div>

      <div className="text-sm space-y-1">
        <p>Rooms: {building.totalUnits}</p>
        <p>Occupied: {building.occupiedUnits}</p>
        <p>Vacant: {building.vacantUnits}</p>
      </div>

      {/* occupancy bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary" style={{ width: `${occupancy}%` }} />
      </div>

      <div className="text-sm font-medium">₹{building.monthlyRevenue}</div>
    </GlassCard>
  );
};
