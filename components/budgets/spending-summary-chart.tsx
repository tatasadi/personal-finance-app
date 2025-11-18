"use client"

import { BudgetWithSpending, budgetThemeColors } from "@/lib/types/budget"

interface SpendingSummaryChartProps {
  budgets: BudgetWithSpending[]
}

export function SpendingSummaryChart({ budgets }: SpendingSummaryChartProps) {
  const totalSpent = budgets.reduce((acc, budget) => acc + budget.spent, 0)
  const totalLimit = budgets.reduce((acc, budget) => acc + budget.maximum, 0)

  // Calculate percentages for donut chart
  const percentages = budgets.map(budget => ({
    ...budget,
    percentage: (budget.spent / totalSpent) * 100
  }))

  // Calculate SVG donut chart segments
  const radius = 80
  const circumference = 2 * Math.PI * radius
  let currentAngle = 0

  const segments = percentages.map((budget) => {
    const segmentAngle = (budget.percentage / 100) * 360
    const startAngle = currentAngle
    currentAngle += segmentAngle

    return {
      ...budget,
      startAngle,
      endAngle: currentAngle,
      strokeDasharray: `${(budget.percentage / 100) * circumference} ${circumference}`,
      strokeDashoffset: -((startAngle / 360) * circumference)
    }
  })

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[240px] h-[240px]">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#F8F4F0"
            strokeWidth="30"
          />

          {/* Colored segments */}
          {segments.map((segment) => (
            <circle
              key={segment.id}
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke={budgetThemeColors[segment.theme]}
              strokeWidth="30"
              strokeDasharray={segment.strokeDasharray}
              strokeDashoffset={segment.strokeDashoffset}
              style={{ transition: 'all 0.3s ease' }}
            />
          ))}
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-[32px] font-bold text-grey-900 leading-none">
            ${totalSpent.toFixed(2)}
          </p>
          <p className="text-xs text-grey-500 mt-2">of ${totalLimit.toFixed(2)} limit</p>
        </div>
      </div>
    </div>
  )
}
