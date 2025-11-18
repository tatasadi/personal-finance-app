import { BudgetWithSpending, budgetThemeColors } from "@/lib/types/budget"

interface SpendingSummaryListProps {
  budgets: BudgetWithSpending[]
}

export function SpendingSummaryList({ budgets }: SpendingSummaryListProps) {
  return (
    <div className="w-full space-y-5">
      <h3 className="text-xl font-bold text-grey-900">Spending Summary</h3>
      <div className="space-y-4">
        {budgets.map((budget) => (
          <div key={budget.id} className="flex items-center justify-between border-b border-grey-500/15 pb-4 last:border-0 last:pb-0">
            <div className="flex items-center gap-4">
              <div
                className="h-11 w-1 rounded-full"
                style={{ backgroundColor: budgetThemeColors[budget.theme] }}
              />
              <span className="text-sm text-grey-500">{budget.category}</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-grey-900">
                ${budget.spent.toFixed(2)}
              </div>
              <div className="text-xs text-grey-500">
                of ${budget.maximum.toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
