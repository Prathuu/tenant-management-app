"use client";

import { useEffect } from "react";
import { loadPalette } from "@/lib/palette";

export function PaletteLoader() {
  useEffect(() => {
    loadPalette();
  }, []);

  return null;
}
