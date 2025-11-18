export interface RecurringBill {
  id: string
  name: string
  avatar: string
  amount: number
  dueDate: number // Day of month (1-31)
  isPaid: boolean
}

export type BillStatus = "paid" | "upcoming" | "due-soon"

export interface BillSummary {
  paid: {
    count: number
    total: number
  }
  upcoming: {
    count: number
    total: number
  }
  dueSoon: {
    count: number
    total: number
  }
}
