import Link from "next/link"
import { Card } from "@/components/ui/card"
import { RecurringBill } from "@/lib/dummy-data"

interface RecurringBillsCardProps {
  bills: RecurringBill[]
}

export function RecurringBillsCard({ bills }: RecurringBillsCardProps) {
  const paidBills = bills.find(b => b.type === "paid")?.amount || 0
  const upcomingBills = bills.find(b => b.type === "upcoming")?.amount || 0
  const dueSoonBills = bills.find(b => b.type === "due-soon")?.amount || 0

  return (
    <Card className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-grey-900">Recurring Bills</h2>
        <Link
          href="/recurring-bills"
          className="text-sm text-grey-500 hover:text-grey-900 flex items-center gap-3"
        >
          See Details
          <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5.5L1 10" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </Link>
      </div>

      <div className="space-y-3">
        {/* Paid Bills */}
        <div className="flex items-center justify-between bg-beige-100 rounded-lg px-4 py-5 border-l-4 border-budget-green">
          <p className="text-sm text-grey-500">Paid Bills</p>
          <p className="text-sm font-bold text-grey-900">${paidBills.toFixed(2)}</p>
        </div>

        {/* Total Upcoming */}
        <div className="flex items-center justify-between bg-beige-100 rounded-lg px-4 py-5 border-l-4 border-budget-yellow">
          <p className="text-sm text-grey-500">Total Upcoming</p>
          <p className="text-sm font-bold text-grey-900">${upcomingBills.toFixed(2)}</p>
        </div>

        {/* Due Soon */}
        <div className="flex items-center justify-between bg-beige-100 rounded-lg px-4 py-5 border-l-4 border-budget-cyan">
          <p className="text-sm text-grey-500">Due Soon</p>
          <p className="text-sm font-bold text-grey-900">${dueSoonBills.toFixed(2)}</p>
        </div>
      </div>
    </Card>
  )
}
