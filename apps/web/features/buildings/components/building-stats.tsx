import { GlassCard } from "@/components/glass/glass-card";
import { Building } from "../buildings.types";

export const BuildingsStats = ({ data }: { data: Building[] }) => {
  const totalBuildings = data.length;
  const totalUnits = data.reduce((acc, b) => acc + b.totalUnits, 0);
  const occupied = data.reduce((acc, b) => acc + b.occupiedUnits, 0);
  const vacant = data.reduce((acc, b) => acc + b.vacantUnits, 0);

  const stats = [
    { label: "Buildings", value: totalBuildings },
    { label: "Units", value: totalUnits },
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
