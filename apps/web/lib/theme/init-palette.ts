import { setPalette } from "./set-palette";

export function initPalette() {
  const saved = localStorage.getItem("palette") || "violet";
  setPalette(saved as any);
}
