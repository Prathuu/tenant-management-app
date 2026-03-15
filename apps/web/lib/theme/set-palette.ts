import { palettes } from "./palettes";

export function setPalette(name: keyof typeof palettes) {
  const palette = palettes[name];

  Object.entries(palette).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--${key}`, value);
  });

  document.documentElement.style.setProperty(
    "--primary-color",
    `rgb(${palette.primary})`,
  );

  localStorage.setItem("palette", name);
}
