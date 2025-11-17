"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Budget } from "@/lib/dummy-data"

interface BudgetsCardProps {
  budgets: Budget[]
  limit: number
}

export function BudgetsCard({ budgets, limit }: BudgetsCardProps) {
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.amount, 0)

  // Calculate percentages for donut chart
  const percentages = budgets.map(budget => ({
    ...budget,
    percentage: (budget.amount / limit) * 100
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
    <Card className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-[#201f24]">Budgets</h2>
        <Link
          href="/budgets"
          className="text-sm text-[#696868] hover:text-[#201f24] flex items-center gap-3"
        >
          See Details
          <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5.5L1 10" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </Link>
      </div>

      <div className="flex items-center gap-6">
        {/* Donut Chart */}
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
            {segments.map((segment, index) => (
              <circle
                key={segment.id}
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth="30"
                strokeDasharray={segment.strokeDasharray}
                strokeDashoffset={segment.strokeDashoffset}
                style={{ transition: 'all 0.3s ease' }}
              />
            ))}
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-[32px] font-bold text-[#201f24] leading-none">
              ${totalSpent}
            </p>
            <p className="text-xs text-[#696868] mt-2">of ${limit} limit</p>
          </div>
        </div>

        {/* Budget List */}
        <div className="flex-1 space-y-4">
          {budgets.map((budget) => (
            <div key={budget.id} className="flex items-start gap-4">
              <div
                className="w-1 h-[43px] rounded-full"
                style={{ backgroundColor: budget.color }}
              />
              <div className="flex-1">
                <p className="text-xs text-[#696868] mb-1">{budget.category}</p>
                <p className="text-sm font-bold text-[#201f24]">${budget.amount.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
