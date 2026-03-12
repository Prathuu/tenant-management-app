"use client";

import { useState, useEffect } from "react";
import { Palette } from "lucide-react";
import { setPalette } from "@/lib/palette";
import { cn } from "@/lib/utils";

const palettes = [
  { name: "blue", color: "#3b82f6" },
  { name: "emerald", color: "#10b981" },
  { name: "violet", color: "#8b5cf6" },
  { name: "rose", color: "#f43f5e" },
  { name: "amber", color: "#f59e0b" },
];

export function PaletteSwitcher() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("blue");

  useEffect(() => {
    const saved = localStorage.getItem("palette") || "blue";
    setActive(saved);
  }, []);

  function changePalette(p: string) {
    setPalette(p);
    setActive(p);
    setOpen(false);
  }

  return (
    <div className="relative flex items-center">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-card hover:bg-muted transition"
      >
        <Palette size={18} />
      </button>

      {/* Palette dropdown */}
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
              "relative w-7 h-7 rounded-full transition hover:scale-110",
              active === p.name &&
                "ring-2 ring-white ring-offset-2 ring-offset-background",
            )}
            style={{ backgroundColor: p.color }}
          >
            {active === p.name && (
              <span className="absolute inset-0 rounded-full border-2 border-white/40" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
