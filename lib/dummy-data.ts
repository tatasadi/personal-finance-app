export interface Transaction {
  id: string
  name: string
  avatar: string
  amount: number
  date: string
  category?: string
}

export interface Pot {
  id: string
  name: string
  amount: number
  color: string
}

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
  { id: "1", name: "Savings", amount: 159, color: "#277C78" },
  { id: "2", name: "Gift", amount: 40, color: "#626070" },
  { id: "3", name: "Concert Ticket", amount: 110, color: "#82C9D7" },
  { id: "4", name: "New Laptop", amount: 10, color: "#F2CDAC" },
]

export const totalSaved = 850

export const transactions: Transaction[] = [
  {
    id: "1",
    name: "Emma Richardson",
    avatar: "/avatars/emma.jpg",
    amount: 75.50,
    date: "19 Aug 2024",
    category: "General",
  },
  {
    id: "2",
    name: "Savory Bites Bistro",
    avatar: "/avatars/savory.jpg",
    amount: -55.50,
    date: "19 Aug 2024",
    category: "Dining Out",
  },
  {
    id: "3",
    name: "Daniel Carter",
    avatar: "/avatars/daniel.jpg",
    amount: -42.30,
    date: "18 Aug 2024",
    category: "General",
  },
  {
    id: "4",
    name: "Sun Park",
    avatar: "/avatars/sun.jpg",
    amount: 120.00,
    date: "17 Aug 2024",
    category: "General",
  },
  {
    id: "5",
    name: "Urban Services Hub",
    avatar: "/avatars/urban.jpg",
    amount: -65.00,
    date: "17 Aug 2024",
    category: "General",
  },
  {
    id: "6",
    name: "Liam Hughes",
    avatar: "/avatars/liam.jpg",
    amount: 65.75,
    date: "15 Aug 2024",
    category: "Groceries",
  },
  {
    id: "7",
    name: "Lily Ramirez",
    avatar: "/avatars/lily.jpg",
    amount: 50.00,
    date: "14 Aug 2024",
    category: "General",
  },
  {
    id: "8",
    name: "Ethan Clark",
    avatar: "/avatars/ethan.jpg",
    amount: -32.50,
    date: "13 Aug 2024",
    category: "Dining Out",
  },
  {
    id: "9",
    name: "James Thompson",
    avatar: "/avatars/james.jpg",
    amount: -5.00,
    date: "11 Aug 2024",
    category: "Entertainment",
  },
  {
    id: "10",
    name: "Pixel Playground",
    avatar: "/avatars/pixel.jpg",
    amount: -10.00,
    date: "11 Aug 2024",
    category: "Entertainment",
  },
  {
    id: "11",
    name: "Sophia Martinez",
    avatar: "/avatars/sophia.jpg",
    amount: -22.50,
    date: "10 Aug 2024",
    category: "Bills",
  },
  {
    id: "12",
    name: "Metro Transit",
    avatar: "/avatars/metro.jpg",
    amount: -15.00,
    date: "09 Aug 2024",
    category: "Transportation",
  },
  {
    id: "13",
    name: "Beauty Salon",
    avatar: "/avatars/beauty.jpg",
    amount: -45.00,
    date: "08 Aug 2024",
    category: "Personal Care",
  },
  {
    id: "14",
    name: "Fresh Market",
    avatar: "/avatars/market.jpg",
    amount: -87.30,
    date: "07 Aug 2024",
    category: "Groceries",
  },
  {
    id: "15",
    name: "Tech Store",
    avatar: "/avatars/tech.jpg",
    amount: -299.99,
    date: "06 Aug 2024",
    category: "Shopping",
  },
  {
    id: "16",
    name: "Coffee House",
    avatar: "/avatars/coffee.jpg",
    amount: -8.50,
    date: "05 Aug 2024",
    category: "Dining Out",
  },
  {
    id: "17",
    name: "Movie Theater",
    avatar: "/avatars/cinema.jpg",
    amount: -24.00,
    date: "04 Aug 2024",
    category: "Entertainment",
  },
  {
    id: "18",
    name: "Gas Station",
    avatar: "/avatars/gas.jpg",
    amount: -60.00,
    date: "03 Aug 2024",
    category: "Transportation",
  },
  {
    id: "19",
    name: "Electric Company",
    avatar: "/avatars/electric.jpg",
    amount: -95.00,
    date: "02 Aug 2024",
    category: "Bills",
  },
  {
    id: "20",
    name: "Oliver Smith",
    avatar: "/avatars/oliver.jpg",
    amount: 200.00,
    date: "01 Aug 2024",
    category: "General",
  },
]

export const budgets: Budget[] = [
  { id: "1", category: "Entertainment", amount: 50.00, color: "#277C78" },
  { id: "2", category: "Bills", amount: 750.00, color: "#82C9D7" },
  { id: "3", category: "Dining Out", amount: 75.00, color: "#F2CDAC" },
  { id: "4", category: "Personal Care", amount: 100.00, color: "#626070" },
]

export const budgetLimit = 975

export const recurringBills: RecurringBill[] = [
  { type: "paid", amount: 190.00 },
  { type: "upcoming", amount: 194.98 },
  { type: "due-soon", amount: 59.98 },
]
