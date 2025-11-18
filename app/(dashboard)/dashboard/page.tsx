import { SummaryCards } from "@/components/dashboard/summary-cards"
import { PotsCard } from "@/components/dashboard/pots-card"
import { TransactionsCard } from "@/components/dashboard/transactions-card"
import { BudgetsCard } from "@/components/dashboard/budgets-card"
import { RecurringBillsCard } from "@/components/dashboard/recurring-bills-card"
import {
  summary,
  pots,
  totalSaved,
  transactions,
  budgets,
  budgetLimit,
  recurringBills,
} from "@/lib/dummy-data"

export default function DashboardPage() {
  return (
    <div className="p-4 md:p-8">
      <div className="max-w-[1140px] space-y-8">
        {/* Page Title */}
        <h1 className="text-[32px] font-bold text-grey-900">Overview</h1>

        {/* Summary Cards */}
        <SummaryCards
          currentBalance={summary.currentBalance}
          income={summary.income}
          expenses={summary.expenses}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_428px] gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Pots */}
            <PotsCard totalSaved={totalSaved} pots={pots} />

            {/* Transactions */}
            <TransactionsCard transactions={transactions.slice(0, 5)} />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Budgets */}
            <BudgetsCard budgets={budgets} limit={budgetLimit} />

            {/* Recurring Bills */}
            <RecurringBillsCard bills={recurringBills} />
          </div>
        </div>
      </div>
    </div>
  )
}
