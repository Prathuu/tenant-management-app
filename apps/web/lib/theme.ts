export function setPalette(palette: string) {
  const html = document.documentElement

  html.classList.remove(
    "theme-blue",
    "theme-emerald",
    "theme-violet",
    "theme-rose",
    "theme-amber"
  )

  html.classList.add(`theme-${palette}`)

  localStorage.setItem("palette", palette)
}

export function loadPalette() {
  const palette = localStorage.getItem("palette") || "blue"
  document.documentElement.classList.add(`theme-${palette}`)
}