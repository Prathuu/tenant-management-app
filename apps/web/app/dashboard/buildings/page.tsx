import { StatCard } from "@/components/shared/stat-card";

export default function Page() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <StatCard title="Total Tenants" value="128" />

      <StatCard title="Vacant Rooms" value="12" />

      <StatCard title="Monthly Revenue" value="₹2,30,000" />

      <StatCard title="Total Tenants" value="128" />

      <StatCard title="Vacant Rooms" value="12" />

      <StatCard title="Monthly Revenue" value="₹2,30,000" />
    </div>
  );
}
