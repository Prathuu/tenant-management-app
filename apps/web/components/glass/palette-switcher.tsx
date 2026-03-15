"use client";

import { setPalette } from "@/lib/theme/set-palette";

const paletteList = ["violet", "blue", "emerald"] as const;

export function PaletteSwitcher() {
  return (
    <div className="flex gap-2">
      {paletteList.map((color) => (
        <button
          key={color}
          onClick={() => setPalette(color)}
          className="w-6 h-6 rounded-full border border-white/30"
          style={{
            background: `rgb(var(--${color}-preview, 255 255 255))`,
          }}
        />
      ))}
    </div>
  );
}
