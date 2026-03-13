"use client";

import { useEffect } from "react";
import { applyPalette, getSavedPalette } from "@/lib/palette";

export function PaletteLoader() {
  useEffect(() => {
    applyPalette(getSavedPalette());
  }, []);

  return null;
}
