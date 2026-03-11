"use client";

import { useState } from "react";
import { useCreateBuilding } from "../buildings.hooks";

export default function BuildingForm() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const { mutate, isPending } = useCreateBuilding();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate({
      name,
      address,
    });

    setName("");
    setAddress("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <div>
        <input
          placeholder="Building Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <input
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? "Creating..." : "Create Building"}
      </button>
    </form>
  );
}
