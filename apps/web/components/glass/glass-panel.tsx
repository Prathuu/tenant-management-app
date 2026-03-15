export function GlassPanel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
      backdrop-blur-2xl
      bg-white/10
      border border-white/20
      shadow-[0_8px_32px_rgba(0,0,0,0.25)]
      rounded-2xl
    "
    >
      {children}
    </div>
  );
}
