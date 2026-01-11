"use client";

import { useParams } from "next/navigation";
import { useBuilding } from "@/hooks/useBuildings";

export default function BuildingDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const { data, isLoading, error } = useBuilding(id);

  if (isLoading) return <div className="p-6">Loading…</div>;
  if (error) return <div className="p-6">Failed to load building</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">{data.name}</h1>

      <div className="space-y-6">
        {data.floors.map((floor: any) => (
          <div key={floor.id}>
            <h2 className="font-semibold">Floor {floor.name}</h2>

            <div className="ml-4 space-y-2">
              {floor.rooms.map((room: any) => {
                const occupied = room.tenantRooms.length > 0;

                return (
                  <div key={room.id} className="flex gap-4">
                    <span>Room {room.roomNumber}</span>
                    <span
                      className={occupied ? "text-red-600" : "text-green-600"}
                    >
                      {occupied ? "Occupied" : "Vacant"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
