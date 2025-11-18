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
    <div className="p-5 md:p-8 lg:p-10">
      <div className="max-w-[1440px] mx-auto space-y-6 md:space-y-8">
        {/* Page Title */}
        <h1 className="text-[32px] font-bold text-grey-900">Recurring Bills</h1>

        {/* Desktop Layout: Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-[350px,1fr] gap-6">
          {/* Left Column: Total + Summary */}
          <div className="space-y-6">
            <TotalBillsCard total={totalBills} />

            {/* Summary - Desktop only in left column, Mobile/Tablet below total */}
            <div className="hidden lg:block">
              <BillsSummary summary={summary} />
            </div>
          </div>

          {/* Right Column: Bills List (Desktop) or Full Width (Mobile/Tablet) */}
          <div>
            <BillsList bills={recurringBillsDetailed} />
          </div>
        </div>

        {/* Summary - Mobile/Tablet only */}
        <div className="lg:hidden">
          <BillsSummary summary={summary} />
        </div>
      </div>
    </div>
  )
}
