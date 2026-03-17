import { GlassCard } from "../glass/glass-card";

export function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <GlassCard className="border-none">
      <div className="flex flex-col gap-3">
        <span className="text-sm text-(--text-secondary)">{title}</span>

        <span className="text-3xl font-semibold text-(--text-primary)">
          {value}
        </span>

        <span className="text-xs text-green-400">+12% this month</span>
      </div>
    </GlassCard>
  );
}
