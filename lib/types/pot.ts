export type PotTheme =
  | "green"
  | "yellow"
  | "cyan"
  | "navy"
  | "red"
  | "purple"
  | "turquoise"
  | "brown"
  | "magenta"
  | "blue"
  | "navy-grey"
  | "army-green"
  | "gold"
  | "orange"

export interface Pot {
  id: string
  name: string
  target: number
  total: number
  theme: PotTheme
}

export const potThemeColors: Record<PotTheme, string> = {
  green: "#277C78",
  yellow: "#F2CDAC",
  cyan: "#82C9D7",
  navy: "#626070",
  red: "#C94736",
  purple: "#826CB0",
  turquoise: "#597C7C",
  brown: "#93674F",
  magenta: "#934F6F",
  blue: "#3F82B2",
  "navy-grey": "#97A0AC",
  "army-green": "#7F9161",
  gold: "#CAB361",
  orange: "#BE6C49",
}

export const potThemeOptions: { value: PotTheme; label: string }[] = [
  { value: "green", label: "Green" },
  { value: "yellow", label: "Yellow" },
  { value: "cyan", label: "Cyan" },
  { value: "navy", label: "Navy" },
  { value: "red", label: "Red" },
  { value: "purple", label: "Purple" },
  { value: "turquoise", label: "Turquoise" },
  { value: "brown", label: "Brown" },
  { value: "magenta", label: "Magenta" },
  { value: "blue", label: "Blue" },
  { value: "navy-grey", label: "Navy Grey" },
  { value: "army-green", label: "Army Green" },
  { value: "gold", label: "Gold" },
  { value: "orange", label: "Orange" },
]

// Helper function to get hex color for a pot theme
export function getPotThemeColor(theme: PotTheme): string {
  return potThemeColors[theme]
}

// Helper function to get Tailwind class for pot theme background
export function getPotThemeBgClass(theme: PotTheme): string {
  return `bg-budget-${theme}`
}

// Helper function to get Tailwind class for pot theme text
export function getPotThemeTextClass(theme: PotTheme): string {
  return `text-budget-${theme}`
}

// Helper function to get Tailwind class for pot theme border
export function getPotThemeBorderClass(theme: PotTheme): string {
  return `border-budget-${theme}`
}
