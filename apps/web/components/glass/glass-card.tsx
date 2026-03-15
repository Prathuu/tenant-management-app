export function GlassCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
      glass-light
      backdrop-blur-xl
      bg-white/15
      border border-white/20
      shadow-[0_6px_24px_rgba(0,0,0,0.25)]
      rounded-xl
      p-6
      transition
      hover:bg-white/20
      "
    >
      {children}
    </div>
  );
}
