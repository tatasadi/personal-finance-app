export interface Budget {
  id: string
  category: string
  maximum: number
  theme: BudgetTheme
}

export interface BudgetWithSpending extends Budget {
  spent: number
}

export interface Transaction {
  id: string
  avatar: string
  name: string
  category: string
  date: string
  amount: number
  recurring: boolean
}

export type BudgetTheme =
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

export const budgetThemeColors: Record<BudgetTheme, string> = {
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

export const budgetThemeOptions: { value: BudgetTheme; label: string }[] = [
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

// Helper function to get CSS variable for a budget theme
export function getBudgetThemeColor(theme: BudgetTheme): string {
  return budgetThemeColors[theme]
}

// Helper function to get Tailwind class for budget theme background
export function getBudgetThemeBgClass(theme: BudgetTheme): string {
  return `bg-budget-${theme}`
}

// Helper function to get Tailwind class for budget theme text
export function getBudgetThemeTextClass(theme: BudgetTheme): string {
  return `text-budget-${theme}`
}

// Helper function to get Tailwind class for budget theme border
export function getBudgetThemeBorderClass(theme: BudgetTheme): string {
  return `border-budget-${theme}`
}
