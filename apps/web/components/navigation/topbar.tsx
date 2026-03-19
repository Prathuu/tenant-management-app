"use client";

import { Menu, ArrowLeft, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";

type TopbarProps = {
  title: string;
  showBack?: boolean;
  onMenuClick?: () => void;
  rightContent?: React.ReactNode;
};

export function Topbar({
  title,
  showBack,
  onMenuClick,
  rightContent,
}: TopbarProps) {
  const router = useRouter();

  return (
    <div
      className="
        sticky top-0 z-50
        flex items-center justify-between
        h-14 px-4
        border-b border-white/10
      bg-white/10 backdrop-blur-xl
        text-white
        shadow-md
      "
    >
      {/* LEFT */}
      <div className="w-10">
        {showBack ? (
          <button onClick={() => router.back()}>
            <ArrowLeft />
          </button>
        ) : (
          <button onClick={onMenuClick}>
            <Menu />
          </button>
        )}
      </div>

      {/* TITLE */}
      <h1 className="text-sm font-semibold truncate">{title}</h1>

      {/* RIGHT */}
      <div className="w-10 flex justify-end">
        {rightContent ?? <MoreVertical />}
      </div>
    </div>
  );
}
