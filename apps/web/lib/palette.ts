const palettes = ["indigo", "orchid", "cyan", "coral", "honey", "mint"];

export function applyPalette(palette: string) {
  const html = document.documentElement;

  palettes.forEach((p) => {
    html.classList.remove(`theme-${p}`);
  });

  html.classList.add(`theme-${palette}`);

  localStorage.setItem("palette", palette);
}

export function getSavedPalette() {
  return localStorage.getItem("palette") || "indigo";
}
