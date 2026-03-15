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
      glass-light
      backdrop-blur-xl
      bg-white/15
      border border-white/20
      shadow-[0_6px_24px_rgba(0,0,0,0.25)]
      rounded-xl
      p-6
      transition-transform duration-200
      will-change-transform
      "
    >
      {children}
    </div>
  );
}
