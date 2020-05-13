const colorPresets = {
  "花期": "#ffcdd2",
  "赏叶": "#ed9f09"
}


export function getColorPreset(text) {
  return colorPresets[text]
}
