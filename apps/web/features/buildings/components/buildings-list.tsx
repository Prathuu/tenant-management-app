"use client";

import { useBuildings } from "../buildings.hooks";

export default function BuildingsList() {
  const { data, isLoading, error } = useBuildings();

  if (isLoading) return <div>Loading buildings...</div>;

  if (error) return <div>Failed to load buildings</div>;

  return (
    <div>
      {data?.map((building) => (
        <div key={building.id}>{building.name}</div>
      ))}
    </div>
  );
}
