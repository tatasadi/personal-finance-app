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
        <h2 className="text-xl font-bold text-[#201f24]">Recurring Bills</h2>
        <Link
          href="/recurring-bills"
          className="text-sm text-[#696868] hover:text-[#201f24] flex items-center gap-3"
        >
          See Details
          <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5.5L1 10" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </Link>
      </div>

      <div className="space-y-3">
        {/* Paid Bills */}
        <div className="flex items-center justify-between bg-[#F8F4F0] rounded-lg px-4 py-5 border-l-4 border-[#277C78]">
          <p className="text-sm text-[#696868]">Paid Bills</p>
          <p className="text-sm font-bold text-[#201f24]">${paidBills.toFixed(2)}</p>
        </div>

        {/* Total Upcoming */}
        <div className="flex items-center justify-between bg-[#F8F4F0] rounded-lg px-4 py-5 border-l-4 border-[#F2CDAC]">
          <p className="text-sm text-[#696868]">Total Upcoming</p>
          <p className="text-sm font-bold text-[#201f24]">${upcomingBills.toFixed(2)}</p>
        </div>

        {/* Due Soon */}
        <div className="flex items-center justify-between bg-[#F8F4F0] rounded-lg px-4 py-5 border-l-4 border-[#82C9D7]">
          <p className="text-sm text-[#696868]">Due Soon</p>
          <p className="text-sm font-bold text-[#201f24]">${dueSoonBills.toFixed(2)}</p>
        </div>
      </div>
    </Card>
  )
}
