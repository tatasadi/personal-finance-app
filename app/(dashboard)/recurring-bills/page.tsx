"use client"

import { useMemo } from "react"
import { recurringBillsDetailed } from "@/lib/dummy-data"
import type { BillSummary, BillStatus } from "@/lib/types/recurring-bill"
import { TotalBillsCard } from "@/components/recurring-bills/total-bills-card"
import { BillsSummary } from "@/components/recurring-bills/bills-summary"
import { BillsList } from "@/components/recurring-bills/bills-list"

function getBillStatus(dueDate: number, isPaid: boolean): BillStatus {
  if (isPaid) return "paid"

  const today = new Date()
  const currentDay = today.getDate()
  const daysUntilDue = dueDate - currentDay

  // Due soon if within 5 days
  if (daysUntilDue <= 5 && daysUntilDue >= 0) {
    return "due-soon"
  }

  return "upcoming"
}

export default function RecurringBillsPage() {
  const summary = useMemo<BillSummary>(() => {
    const paid = recurringBillsDetailed.filter(bill => bill.isPaid)
    const unpaid = recurringBillsDetailed.filter(bill => !bill.isPaid)

    const dueSoon = unpaid.filter(bill => {
      const status = getBillStatus(bill.dueDate, bill.isPaid)
      return status === "due-soon"
    })

    const upcoming = unpaid.filter(bill => {
      const status = getBillStatus(bill.dueDate, bill.isPaid)
      return status === "upcoming"
    })

    return {
      paid: {
        count: paid.length,
        total: paid.reduce((sum, bill) => sum + bill.amount, 0),
      },
      upcoming: {
        count: upcoming.length,
        total: upcoming.reduce((sum, bill) => sum + bill.amount, 0),
      },
      dueSoon: {
        count: dueSoon.length,
        total: dueSoon.reduce((sum, bill) => sum + bill.amount, 0),
      },
    }
  }, [])

  const totalBills = recurringBillsDetailed.reduce((sum, bill) => sum + bill.amount, 0)

  return (
		<div className="p-5 md:p-6 lg:p-8">
			<div className="max-w-[1440px] mx-auto space-y-6 lg:space-y-8">
				{/* Page Title */}
				<h1 className="text-[32px] font-bold text-grey-900">Recurring Bills</h1>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[320px_1fr] gap-6">
					{/* Total Bills Card */}
					<div className="">
						<TotalBillsCard total={totalBills} />
					</div>

					{/* Summary */}
					<div>
						<BillsSummary summary={summary} />
					</div>

					{/* Bills List - spans full width on mobile, 2 cols on tablet, full remaining space on desktop */}
					<div className="md:col-span-2 lg:col-span-1 lg:row-start-1 lg:col-start-2 lg:row-span-3">
						<BillsList bills={recurringBillsDetailed} />
					</div>
				</div>
			</div>
		</div>
	)
}
