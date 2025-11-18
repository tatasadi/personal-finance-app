// Import types from the types file
import type { BudgetWithSpending, Transaction } from "./types/budget"
import type { Pot } from "./types/pot"

// Re-export Pot for backward compatibility
export type { Pot } from "./types/pot"

export interface Budget {
  id: string
  category: string
  amount: number
  color: string
}

export interface RecurringBill {
  type: "paid" | "upcoming" | "due-soon"
  amount: number
}

export const summary = {
  currentBalance: 4836.00,
  income: 3814.25,
  expenses: 1700.50,
}

export const pots: Pot[] = [
  { id: "1", name: "Savings", total: 159, target: 2000, theme: "green" },
  { id: "2", name: "Concert Ticket", total: 110, target: 150, theme: "navy" },
  { id: "3", name: "Gift", total: 40, target: 60, theme: "cyan" },
  { id: "4", name: "New Laptop", total: 10, target: 1000, theme: "yellow" },
  { id: "5", name: "Holiday", total: 531, target: 1440, theme: "purple" },
]

export const totalSaved = 850

export const transactions: Transaction[] = [
  {
    id: "1",
    name: "Emma Richardson",
    avatar: "/avatars/emma.jpg",
    amount: 75.50,
    date: "2024-08-19",
    category: "General",
    recurring: false,
  },
  {
    id: "2",
    name: "Savory Bites Bistro",
    avatar: "/avatars/savory.jpg",
    amount: -55.50,
    date: "2024-08-19",
    category: "Dining Out",
    recurring: false,
  },
  {
    id: "3",
    name: "Daniel Carter",
    avatar: "/avatars/daniel.jpg",
    amount: -42.30,
    date: "2024-08-18",
    category: "General",
    recurring: false,
  },
  {
    id: "4",
    name: "Sun Park",
    avatar: "/avatars/sun.jpg",
    amount: 120.00,
    date: "2024-08-17",
    category: "General",
    recurring: false,
  },
  {
    id: "5",
    name: "Urban Services Hub",
    avatar: "/avatars/urban.jpg",
    amount: -65.00,
    date: "2024-08-17",
    category: "General",
    recurring: false,
  },
  {
    id: "6",
    name: "Liam Hughes",
    avatar: "/avatars/liam.jpg",
    amount: 65.75,
    date: "2024-08-15",
    category: "Groceries",
    recurring: false,
  },
  {
    id: "7",
    name: "Lily Ramirez",
    avatar: "/avatars/lily.jpg",
    amount: 50.00,
    date: "2024-08-14",
    category: "General",
    recurring: false,
  },
  {
    id: "8",
    name: "Ethan Clark",
    avatar: "/avatars/ethan.jpg",
    amount: -32.50,
    date: "2024-08-13",
    category: "Dining Out",
    recurring: false,
  },
  {
    id: "9",
    name: "James Thompson",
    avatar: "/avatars/james.jpg",
    amount: -5.00,
    date: "2024-08-11",
    category: "Entertainment",
    recurring: false,
  },
  {
    id: "10",
    name: "Pixel Playground",
    avatar: "/avatars/pixel.jpg",
    amount: -10.00,
    date: "2024-08-11",
    category: "Entertainment",
    recurring: false,
  },
  {
    id: "11",
    name: "Sophia Martinez",
    avatar: "/avatars/sophia.jpg",
    amount: -22.50,
    date: "2024-08-10",
    category: "Bills",
    recurring: false,
  },
  {
    id: "12",
    name: "Metro Transit",
    avatar: "/avatars/metro.jpg",
    amount: -15.00,
    date: "2024-08-09",
    category: "Transportation",
    recurring: false,
  },
  {
    id: "13",
    name: "Beauty Salon",
    avatar: "/avatars/beauty.jpg",
    amount: -45.00,
    date: "2024-08-08",
    category: "Personal Care",
    recurring: false,
  },
  {
    id: "14",
    name: "Fresh Market",
    avatar: "/avatars/market.jpg",
    amount: -87.30,
    date: "2024-08-07",
    category: "Groceries",
    recurring: false,
  },
  {
    id: "15",
    name: "Tech Store",
    avatar: "/avatars/tech.jpg",
    amount: -299.99,
    date: "2024-08-06",
    category: "Shopping",
    recurring: false,
  },
  {
    id: "16",
    name: "Coffee House",
    avatar: "/avatars/coffee.jpg",
    amount: -8.50,
    date: "2024-08-05",
    category: "Dining Out",
    recurring: false,
  },
  {
    id: "17",
    name: "Movie Theater",
    avatar: "/avatars/cinema.jpg",
    amount: -24.00,
    date: "2024-08-04",
    category: "Entertainment",
    recurring: false,
  },
  {
    id: "18",
    name: "Gas Station",
    avatar: "/avatars/gas.jpg",
    amount: -60.00,
    date: "2024-08-03",
    category: "Transportation",
    recurring: false,
  },
  {
    id: "19",
    name: "Electric Company",
    avatar: "/avatars/electric.jpg",
    amount: -95.00,
    date: "2024-08-02",
    category: "Bills",
    recurring: true,
  },
  {
    id: "20",
    name: "Oliver Smith",
    avatar: "/avatars/oliver.jpg",
    amount: 200.00,
    date: "2024-08-01",
    category: "General",
    recurring: false,
  },
]

export const budgets: Budget[] = [
  { id: "1", category: "Entertainment", amount: 50.00, color: "#277C78" }, // budget-green
  { id: "2", category: "Bills", amount: 750.00, color: "#82C9D7" }, // budget-cyan
  { id: "3", category: "Dining Out", amount: 75.00, color: "#F2CDAC" }, // budget-yellow
  { id: "4", category: "Personal Care", amount: 100.00, color: "#626070" }, // budget-navy
]

export const budgetLimit = 975

export const recurringBills: RecurringBill[] = [
  { type: "paid", amount: 190.00 },
  { type: "upcoming", amount: 194.98 },
  { type: "due-soon", amount: 59.98 },
]

export const mockBudgets: BudgetWithSpending[] = [
  {
    id: "1",
    category: "Entertainment",
    maximum: 50.0,
    theme: "green",
    spent: 15.0,
  },
  {
    id: "2",
    category: "Bills",
    maximum: 750.0,
    theme: "cyan",
    spent: 150.0,
  },
  {
    id: "3",
    category: "Dining Out",
    maximum: 75.0,
    theme: "yellow",
    spent: 133.0,
  },
  {
    id: "4",
    category: "Personal Care",
    maximum: 100.0,
    theme: "navy",
    spent: 40.0,
  },
]

// Group transactions by budget ID based on category
// Budget IDs: 1=Entertainment, 2=Bills, 3=Dining Out, 4=Personal Care
export const mockTransactions: Record<string, Transaction[]> = {
  "1": transactions.filter(t => t.category === "Entertainment"),
  "2": transactions.filter(t => t.category === "Bills"),
  "3": transactions.filter(t => t.category === "Dining Out"),
  "4": transactions.filter(t => t.category === "Personal Care"),
}
