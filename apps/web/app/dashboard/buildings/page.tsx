import BuildingsList from "@/features/buildings/components/buildings-list";
import BuildingForm from "@/features/buildings/components/building-form";

export default function BuildingsPage() {
  return (
    <div>
      <h1>Buildings</h1>

      <BuildingForm />

      <BuildingsList />
    </div>
  );
}
