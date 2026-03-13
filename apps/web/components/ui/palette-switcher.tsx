"use client";

import { useEffect, useState } from "react";
import { applyPalette, getSavedPalette } from "@/lib/palette";
import { Palette } from "lucide-react";
import { cn } from "@/lib/utils";

const palettes = [
  { name: "indigo", color: "#6366F1" },
  { name: "orchid", color: "#A855F7" },
  { name: "cyan", color: "#06B6D4" },
  { name: "coral", color: "#FB7185" },
  { name: "honey", color: "#FBBF24" },
  { name: "mint", color: "#34D399" },
];

export function PaletteSwitcher() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("indigo");

  useEffect(() => {
    const saved = getSavedPalette();
    setActive(saved);
    applyPalette(saved);
  }, []);

  function changePalette(name: string) {
    setActive(name);
    applyPalette(name);
  }

  return (
    <div className="relative flex items-center">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-card hover:bg-muted transition"
      >
        <Palette size={18} />
      </button>

      <div
        className={cn(
          "absolute right-0 top-12 flex items-center gap-3 p-3 rounded-xl border border-border bg-card/70 backdrop-blur-xl shadow-lg transition-all duration-200",
          open
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none",
        )}
      >
        {palettes.map((p) => (
          <button
            key={p.name}
            onClick={() => changePalette(p.name)}
            className={cn(
              "w-7 h-7 rounded-full transition hover:scale-110",
              active === p.name &&
                "ring-2 ring-white ring-offset-2 ring-offset-background",
            )}
            style={{ backgroundColor: p.color }}
          />
        ))}
      </div>
    </div>
  );
}
