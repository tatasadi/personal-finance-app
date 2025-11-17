"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreVerticalIcon } from "lucide-react"
import { BudgetWithSpending, budgetThemeColors, Transaction } from "@/lib/types/budget"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface BudgetCardProps {
  budget: BudgetWithSpending
  transactions: Transaction[]
  onEdit: (budget: BudgetWithSpending) => void
  onDelete: (budget: BudgetWithSpending) => void
}

export function BudgetCard({
  budget,
  transactions,
  onEdit,
  onDelete,
}: BudgetCardProps) {
  const remaining = budget.maximum - budget.spent
  const spentPercentage = (budget.spent / budget.maximum) * 100
  const themeColor = budgetThemeColors[budget.theme]

  // Get latest 3 transactions
  const latestTransactions = transactions.slice(0, 3)

  return (
    <div className="rounded-xl bg-white p-5 md:p-6 lg:p-8">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="h-5 w-1 rounded-full"
              style={{ backgroundColor: themeColor }}
            />
            <h3 className="text-xl font-bold text-[#201f24]">
              {budget.category}
            </h3>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-sm hover:bg-gray-100">
              <MoreVerticalIcon className="h-4 w-4 text-[#696868]" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(budget)}>
                Edit Budget
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(budget)}
                className="text-red-600"
              >
                Delete Budget
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Maximum amount */}
        <p className="text-sm text-[#696868]">
          Maximum of ${budget.maximum.toFixed(2)}
        </p>

        {/* Progress bar */}
        <div className="space-y-4">
          <div className="h-8 w-full overflow-hidden rounded-lg bg-[#F8F4F0]">
            <div
              className="h-full rounded-lg transition-all"
              style={{
                width: `${Math.min(spentPercentage, 100)}%`,
                backgroundColor: themeColor,
              }}
            />
          </div>

          {/* Spent and Remaining */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className="h-11 w-1 rounded-full"
                style={{ backgroundColor: themeColor }}
              />
              <div>
                <p className="text-xs text-[#696868]">Spent</p>
                <p className="text-sm font-bold text-[#201f24]">
                  ${budget.spent.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-11 w-1 rounded-full bg-[#F8F4F0]" />
              <div>
                <p className="text-xs text-[#696868]">Remaining</p>
                <p className="text-sm font-bold text-[#201f24]">
                  ${remaining.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Spending */}
        {latestTransactions.length > 0 && (
          <div className="space-y-5 rounded-xl bg-[#F8F4F0] p-5">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-[#201f24]">
                Latest Spending
              </h4>
              <Link
                href={`/transactions?category=${budget.category}`}
                className="flex items-center gap-3 text-sm text-[#696868] hover:text-[#201f24]"
              >
                See All
                <svg
                  width="6"
                  height="11"
                  viewBox="0 0 6 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-2"
                >
                  <path
                    d="M1 1L5 5.5L1 10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </Link>
            </div>

            <div className="space-y-3">
              {latestTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between border-b border-[#696868]/15 pb-3 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={transaction.avatar} alt={transaction.name} />
                      <AvatarFallback>
                        {transaction.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-bold text-[#201f24]">
                      {transaction.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#201f24]">
                      -${Math.abs(transaction.amount).toFixed(2)}
                    </span>
                    <span className="text-xs text-[#696868]">
                      {new Date(transaction.date).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
