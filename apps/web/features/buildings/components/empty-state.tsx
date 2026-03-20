// components/empty-state.tsx

import { GlassCard } from "@/components/glass/glass-card";
import { Button } from "@/components/ui/button";

export const EmptyState = () => {
  return (
    <GlassCard className="flex flex-col items-center justify-center py-10">
      <p className="text-lg font-medium">No buildings yet</p>
      <p className="text-sm text-muted-foreground">
        Start by adding your first property
      </p>
      <Button className="mt-4">Add Building</Button>
    </GlassCard>
  );
};
