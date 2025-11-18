"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { BudgetWithSpending, budgetThemeColors } from "@/lib/types/budget"
import { SpendingSummaryChart } from "@/components/budgets/spending-summary-chart"

interface BudgetsCardProps {
  budgets: BudgetWithSpending[]
}

export function BudgetsCard({ budgets }: BudgetsCardProps) {
  return (
    <Card className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-grey-900">Budgets</h2>
        <Link
          href="/budgets"
          className="text-sm text-grey-500 hover:text-grey-900 flex items-center gap-3"
        >
          See Details
          <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5.5L1 10" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </Link>
      </div>

      <div className="flex items-center gap-6">
        {/* Donut Chart */}
        <div className="shrink-0">
          <SpendingSummaryChart budgets={budgets} />
        </div>

        {/* Budget List */}
        <div className="flex-1 space-y-4">
          {budgets.map((budget) => (
            <div key={budget.id} className="flex items-start gap-4">
              <div
                className="w-1 h-[43px] rounded-full"
                style={{ backgroundColor: budgetThemeColors[budget.theme] }}
              />
              <div className="flex-1">
                <p className="text-xs text-grey-500 mb-1">{budget.category}</p>
                <p className="text-sm font-bold text-grey-900">${budget.spent.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
