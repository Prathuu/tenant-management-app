export function GlassButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="
      backdrop-blur
      bg-white/20
      hover:bg-white/30
      border border-white/20
      rounded-lg
      px-4 py-2
      transition
      cursor-pointer
      "
    >
      {children}
    </button>
  );
}
