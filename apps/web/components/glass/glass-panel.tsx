export function GlassPanel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
      backdrop-blur-2xl
      bg-white/5
      border border-white/10
      shadow-[0_8px_32px_rgba(0,0,0,0.3)]
      rounded-2xl
      relative z-10
      "
    >
      {children}
    </div>
  );
}
