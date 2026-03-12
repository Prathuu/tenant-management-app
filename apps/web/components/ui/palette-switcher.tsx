"use client";

import { setPalette } from "@/lib/theme";
import { Button } from "@/components/ui/button";

export function PaletteSwitcher() {
  const palettes = ["blue", "emerald", "violet", "rose", "amber"];

  return (
    <div className="flex gap-2">
      {palettes.map((p) => (
        <Button
          key={p}
          size="sm"
          variant="outline"
          onClick={() => setPalette(p)}
        >
          {p}
        </Button>
      ))}
    </div>
  );
}
