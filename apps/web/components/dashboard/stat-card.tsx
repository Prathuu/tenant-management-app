import { GlassCard } from "../glass/glass-card";

export function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <GlassCard>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-white/70">{title}</span>

        <span className="text-3xl font-semibold">{value}</span>
      </div>
    </GlassCard>
  );
}
