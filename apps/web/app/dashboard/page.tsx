import { GlassCard } from "@/components/glass/glass-card";

export default function Page() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <GlassCard>Total Tenants</GlassCard>

      <GlassCard>Vacant Rooms</GlassCard>

      <GlassCard>Monthly Revenue</GlassCard>
    </div>
  );
}
