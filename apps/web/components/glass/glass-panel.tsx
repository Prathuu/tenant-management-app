export function GlassPanel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
relative
z-10
backdrop-blur-2xl
bg-[var(--glass-bg)]
border
border-[var(--glass-border)]
rounded-2xl
"
    >
      {children}
    </div>
  );
}
