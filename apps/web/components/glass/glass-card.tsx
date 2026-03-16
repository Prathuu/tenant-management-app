"use client";

import { Card } from "@/components/ui/card";
import { useGlassHover } from "./glass-hover";
import { cn } from "@/lib/utils";

export function GlassCard({
  children,
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  const { ref, handleMove, reset } = useGlassHover();

  return (
    <Card
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={cn(
        `
        glass-card
        glass-reflect
        relative
        z-10

        backdrop-blur-xl
        bg-(--glass-bg)

        border
        border-(--glass-border)
        hover:border-[rgb(var(--primary)/0.4)]

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
