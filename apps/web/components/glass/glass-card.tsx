"use client";

import { useGlassHover } from "./glass-hover";

export function GlassCard({ children }: { children: React.ReactNode }) {
  const { ref, handleMove, reset } = useGlassHover();

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="
relative
z-10
backdrop-blur-xl
bg-[var(--glass-bg)]
border
border-[var(--glass-border)]
rounded-xl
p-6
"
    >
      {children}
    </div>
  );
}
