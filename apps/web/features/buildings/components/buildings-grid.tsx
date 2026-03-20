import { Building } from "../buildings.types";
import { BuildingCard } from "./building-card";

export const BuildingsGrid = ({ data }: { data: Building[] }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {data.map((b) => (
        <BuildingCard key={b.id} building={b} />
      ))}
    </div>
  );
};
