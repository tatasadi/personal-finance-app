import type { BillSummary } from "@/lib/types/recurring-bill"

interface BillsSummaryProps {
  summary: BillSummary
}

export function BillsSummary({ summary }: BillsSummaryProps) {
  return (
    <div className="bg-white rounded-xl p-6 lg:p-8 border border-beige-500/15">
      <h2 className="text-xl font-bold text-grey-900 mb-5">Summary</h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-beige-500/15">
          <span className="text-sm text-grey-500">Paid Bills</span>
          <span className="text-sm font-bold text-grey-900">
            {summary.paid.count} (${Math.abs(summary.paid.total).toFixed(2)})
          </span>
        </div>

        <div className="flex items-center justify-between pb-4 border-b border-beige-500/15">
          <span className="text-sm text-grey-500">Total Upcoming</span>
          <span className="text-sm font-bold text-grey-900">
            {summary.upcoming.count} (${Math.abs(summary.upcoming.total).toFixed(2)})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-budget-red">Due Soon</span>
          <span className="text-sm font-bold text-budget-red">
            {summary.dueSoon.count} (${Math.abs(summary.dueSoon.total).toFixed(2)})
          </span>
        </div>
      </div>
    </div>
  )
}
