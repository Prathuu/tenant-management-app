"use client";

import { setPalette } from "@/lib/theme/set-palette";
import { palettes } from "@/lib/theme/palettes";
import { useEffect, useState } from "react";

const paletteNames = Object.keys(palettes) as Array<keyof typeof palettes>;

export function PaletteSwitcher() {
  const [active, setActive] = useState<string>("violet");

  useEffect(() => {
    const saved = localStorage.getItem("palette");
    if (saved) setActive(saved);
  }, []);

  function changePalette(name: keyof typeof palettes) {
    setPalette(name);
    setActive(name);
  }

  return (
    <div className="flex items-center gap-2">
      {paletteNames.map((name) => {
        const color = palettes[name].primary;
        const isActive = active === name;

        return (
          <button
            key={name}
            onClick={() => changePalette(name)}
            className={`
            w-6 h-6 rounded-full
            transition
            hover:scale-110
            border

            ${isActive ? "border-white scale-110" : "border-white/30"}
            `}
            style={{
              backgroundColor: `rgb(${color})`,
            }}
          />
        );
      })}
    </div>
  );
}
