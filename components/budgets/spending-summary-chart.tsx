"use client"

import { BudgetWithSpending, budgetThemeColors } from "@/lib/types/budget"

interface SpendingSummaryChartProps {
  budgets: BudgetWithSpending[]
}

export function SpendingSummaryChart({ budgets }: SpendingSummaryChartProps) {
  const total = budgets.reduce((acc, budget) => acc + budget.spent, 0)

  // Calculate angles for each segment
  let currentAngle = -90 // Start from top
  const segments = budgets.map((budget) => {
    const percentage = (budget.spent / total) * 100
    const angle = (percentage / 100) * 360
    const segment = {
      budget,
      percentage,
      startAngle: currentAngle,
      endAngle: currentAngle + angle,
    }
    currentAngle += angle
    return segment
  })

  // Function to convert polar coordinates to cartesian
  const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
  ) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    }
  }

  // Function to create arc path
  const describeArc = (
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number
  ) => {
    const start = polarToCartesian(x, y, radius, endAngle)
    const end = polarToCartesian(x, y, radius, startAngle)
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"
    return [
      "M",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
    ].join(" ")
  }

  const centerX = 125
  const centerY = 125
  const radius = 90
  const strokeWidth = 45

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg
          width="250"
          height="250"
          viewBox="0 0 250 250"
          className="transform"
        >
          {segments.map((segment, index) => (
            <path
              key={index}
              d={describeArc(
                centerX,
                centerY,
                radius,
                segment.startAngle,
                segment.endAngle
              )}
              fill="none"
              stroke={budgetThemeColors[segment.budget.theme]}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-[32px] font-bold text-grey-900">
            ${total.toFixed(2)}
          </p>
          <p className="text-xs text-grey-500">
            of ${budgets.reduce((acc, b) => acc + b.maximum, 0).toFixed(2)} limit
          </p>
        </div>
      </div>
    </div>
  )
}
