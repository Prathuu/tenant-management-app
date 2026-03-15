import { palettes } from "./palettes";

export function setPalette(name: keyof typeof palettes) {
  const palette = palettes[name];
  localStorage.setItem("palette", name);

  Object.entries(palette).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--${key}`, value);
  });
}
