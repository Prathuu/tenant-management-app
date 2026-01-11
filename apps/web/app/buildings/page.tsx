'use client';

import { useBuildings } from '@/hooks/useBuildings';

export default function BuildingsPage() {
  const { data, isLoading, error } = useBuildings();

  if (isLoading) return <div>Loading…</div>;
  if (error) return <div>Something went wrong</div>;

  return (
    <div className="p-6 space-y-3">
      <h1 className="text-xl font-bold">Buildings</h1>

      {data.map((b: any) => (
        <div key={b.id} className="border p-4 rounded">
          <div className="font-medium">{b.name}</div>
          <div className="text-sm text-gray-600">{b.address}</div>

          <div className="text-sm mt-2">
            Floors: {b.floorsCount} | Rooms: {b.totalRooms} | Occupied:{' '}
            {b.occupiedRooms} | People: {b.peopleCount}
          </div>
        </div>
      ))}
    </div>
  );
}
