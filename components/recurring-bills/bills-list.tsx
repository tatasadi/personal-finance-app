"use client"

import { useState, useMemo } from "react"
import { Search, SlidersHorizontal } from "lucide-react"
import type { RecurringBill, BillStatus } from "@/lib/types/recurring-bill"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface BillsListProps {
  bills: RecurringBill[]
}

type SortOption = "latest" | "oldest" | "a-z" | "z-a" | "highest" | "lowest"

function getBillStatus(bill: RecurringBill): BillStatus {
  const today = new Date()
  const currentDay = today.getDate()

  if (bill.isPaid) {
    return "paid"
  }

  const daysUntilDue = bill.dueDate - currentDay

  // Due soon if within 5 days
  if (daysUntilDue <= 5 && daysUntilDue >= 0) {
    return "due-soon"
  }

  return "upcoming"
}

function formatDueDate(dueDate: number): string {
  const suffix = (day: number) => {
    if (day >= 11 && day <= 13) return "th"
    switch (day % 10) {
      case 1: return "st"
      case 2: return "nd"
      case 3: return "rd"
      default: return "th"
    }
  }

  return `Monthly - ${dueDate}${suffix(dueDate)}`
}

export function BillsList({ bills }: BillsListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("latest")

  const filteredAndSortedBills = useMemo(() => {
    let result = [...bills]

    // Filter by search query
    if (searchQuery) {
      result = result.filter((bill) =>
        bill.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "latest":
          return b.dueDate - a.dueDate
        case "oldest":
          return a.dueDate - b.dueDate
        case "a-z":
          return a.name.localeCompare(b.name)
        case "z-a":
          return b.name.localeCompare(a.name)
        case "highest":
          return Math.abs(b.amount) - Math.abs(a.amount)
        case "lowest":
          return Math.abs(a.amount) - Math.abs(b.amount)
        default:
          return 0
      }
    })

    return result
  }, [bills, searchQuery, sortBy])

  return (
    <div className="bg-white rounded-xl border border-beige-500/15">
      {/* Search and Sort Header */}
      <div className="p-5 lg:p-8 border-b border-beige-500/15">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Search */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-beige-500" />
            <Input
              type="text"
              placeholder="Search bills"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 border-beige-500 h-[45px]"
            />
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-sm text-grey-500 whitespace-nowrap hidden md:block">Sort by</span>
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
              <SelectTrigger className="w-full sm:w-[180px] border-beige-500 h-[45px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="a-z">A to Z</SelectItem>
                <SelectItem value="z-a">Z to A</SelectItem>
                <SelectItem value="highest">Highest</SelectItem>
                <SelectItem value="lowest">Lowest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Table Header - Desktop/Tablet Only */}
      <div className="hidden md:grid md:grid-cols-[1fr,auto,auto] gap-4 px-5 lg:px-8 py-4 border-b border-beige-500/15">
        <span className="text-xs text-grey-500">Bill Title</span>
        <span className="text-xs text-grey-500 text-right w-32 lg:w-40">Due Date</span>
        <span className="text-xs text-grey-500 text-right w-24 lg:w-32">Amount</span>
      </div>

      {/* Bills List */}
      <div className="divide-y divide-beige-500/15">
        {filteredAndSortedBills.length === 0 ? (
          <div className="p-8 text-center text-grey-500">
            No bills found
          </div>
        ) : (
          filteredAndSortedBills.map((bill) => {
            const status = getBillStatus(bill)
            const isDueSoon = status === "due-soon"
            const isPaid = status === "paid"

            return (
              <div
                key={bill.id}
                className="p-5 lg:px-8 lg:py-5 grid grid-cols-[auto,1fr,auto] md:grid-cols-[1fr,auto,auto] gap-4 items-center hover:bg-beige-100/50 transition-colors"
              >
                {/* Avatar & Name */}
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-budget-green to-budget-cyan flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">
                    {bill.name.charAt(0)}
                  </div>
                  <span className="font-bold text-sm text-grey-900 truncate">
                    {bill.name}
                  </span>
                </div>

                {/* Due Date */}
                <div className="flex items-center gap-2 justify-end md:justify-start w-32 lg:w-40">
                  <span className={cn(
                    "text-xs md:text-sm",
                    isDueSoon ? "text-budget-red font-bold" : "text-budget-green"
                  )}>
                    {formatDueDate(bill.dueDate)}
                  </span>
                  {!isPaid && (
                    <div className={cn(
                      "w-2 h-2 rounded-full flex-shrink-0",
                      isDueSoon ? "bg-budget-red" : "bg-budget-green"
                    )} />
                  )}
                </div>

                {/* Amount */}
                <span className="text-sm font-bold text-grey-900 text-right w-24 lg:w-32">
                  ${Math.abs(bill.amount).toFixed(2)}
                </span>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
