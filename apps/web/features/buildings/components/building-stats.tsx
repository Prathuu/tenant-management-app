import { BuildingsListType } from "../buildings.types";
import BuildingsList from "./buildings-list";

export const BuildingStats = ({ data }: { data: BuildingsListType[] }) => {
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
      <BuildingsList />
    </div>
  );
};
