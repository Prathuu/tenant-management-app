export function GlassCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
      backdrop-blur-xl
      bg-white/15
      border border-white/20
      shadow-[0_6px_24px_rgba(0,0,0,0.25)]
      rounded-xl
      p-6
      "
    >
      {children}
    </div>
  );
}
