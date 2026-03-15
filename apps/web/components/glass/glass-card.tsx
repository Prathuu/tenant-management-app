export function GlassCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
      backdrop-blur-xl
      bg-white/15
      border border-white/20
      rounded-xl
      p-6
    "
    >
      {children}
    </div>
  );
}
