"use client"

import { useBuildings } from "../useBuildings"

export default function BuildingsList() {
  const { data, isLoading } = useBuildings()

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      {data?.map((building: any) => (
        <div key={building.id}>
          {building.name}
        </div>
      ))}
    </div>
  )
}