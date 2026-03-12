export const palettes = ["blue", "emerald", "violet", "rose", "amber"];

export function setPalette(palette: string) {
  const html = document.documentElement;

  palettes.forEach((p) => html.classList.remove(`theme-${p}`));

  html.classList.add(`theme-${palette}`);

  localStorage.setItem("palette", palette);
}

export function loadPalette() {
  const saved = localStorage.getItem("palette") || "blue";

  document.documentElement.classList.add(`theme-${saved}`);
}
