import { GlassCard } from "@/components/glass/glass-card";
import { Building } from "../buildings.types";

export const BuildingCard = ({ building }: { building: Building }) => {
  const occupancy =
    building.totalUnits > 0
      ? (building.occupiedUnits / building.totalUnits) * 100
      : 0;

  return (
    <GlassCard className="p-4 space-y-4 hover:scale-[1.02] transition cursor-pointer">
      {/* Top */}
      <div>
        <h3 className="font-semibold text-base">{building.name}</h3>
        <p className="text-xs text-muted-foreground">{building.address}</p>
      </div>

      {/* Mid stats */}
      <div className="text-sm grid grid-cols-2 gap-y-1">
        <span className="text-muted-foreground">Units</span>
        <span className="text-right">{building.totalUnits}</span>

        <span className="text-muted-foreground">Occupied</span>
        <span className="text-right text-green-500">
          {building.occupiedUnits}
        </span>

        <span className="text-muted-foreground">Vacant</span>
        <span className="text-right text-red-500">{building.vacantUnits}</span>
      </div>

      {/* Occupancy bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Occupancy</span>
          <span>{Math.round(occupancy)}%</span>
        </div>

        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${occupancy}%` }}
          />
        </div>
      </div>

      {/* Bottom */}
      <div className="text-sm font-medium">
        ₹{building.monthlyRevenue.toLocaleString()}
      </div>
    </GlassCard>
  );
};
