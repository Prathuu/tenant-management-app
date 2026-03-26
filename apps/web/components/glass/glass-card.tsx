"use client";

import { Card } from "@/components/ui/card";
import { useGlassHover } from "./glass-hover";
import { cn } from "@/lib/utils";

export function GlassCard({
  children,
  className,
  enableHover,
  ...props
}: React.ComponentProps<typeof Card> & { enableHover?: boolean }) {
  const { ref, handleMove, reset } = useGlassHover();

  return (
    <Card
      ref={ref}
      onMouseMove={enableHover ? handleMove : undefined}
      onMouseLeave={reset}
      className={cn(
        `
        glass-card
        glass-reflect
        relative
        z-10
        backdrop-blur-xl
        rounded-xl
        p-6
        `,
        className,
      )}
      {...props}
    >
      {children}
    </Card>
  );
}
