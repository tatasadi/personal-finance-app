"use client"

import { useState, useMemo } from "react"
import { transactions } from "@/lib/dummy-data"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Search, ChevronLeft, ChevronRight, SlidersHorizontal, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"

const ITEMS_PER_PAGE = 10

const categories = [
  "All Transactions",
  "Entertainment",
  "Bills",
  "Groceries",
  "Dining Out",
  "Transportation",
  "Personal Care",
  "General",
  "Shopping",
  "Lifestyle",
]

type SortOption = "latest" | "oldest" | "a-to-z" | "z-to-a" | "highest" | "lowest"

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("latest")
  const [categoryFilter, setCategoryFilter] = useState("All Transactions")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortSheetOpen, setSortSheetOpen] = useState(false)
  const [filterSheetOpen, setFilterSheetOpen] = useState(false)

  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = transactions.filter((transaction) => {
      const matchesSearch = transaction.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
      const matchesCategory =
        categoryFilter === "All Transactions" ||
        transaction.category === categoryFilter
      return matchesSearch && matchesCategory
    })

    // Sort transactions
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "latest":
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "a-to-z":
          return a.name.localeCompare(b.name)
        case "z-to-a":
          return b.name.localeCompare(a.name)
        case "highest":
          return b.amount - a.amount
        case "lowest":
          return a.amount - b.amount
        default:
          return 0
      }
    })

    return filtered
  }, [searchQuery, sortBy, categoryFilter])

  const totalPages = Math.ceil(
    filteredAndSortedTransactions.length / ITEMS_PER_PAGE
  )

  const paginatedTransactions = filteredAndSortedTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push("...")
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push("...")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      }
    }

    return pages
  }

  const getSortLabel = (option: SortOption) => {
    switch (option) {
      case "latest":
        return "Latest"
      case "oldest":
        return "Oldest"
      case "a-to-z":
        return "A to Z"
      case "z-to-a":
        return "Z to A"
      case "highest":
        return "Highest"
      case "lowest":
        return "Lowest"
    }
  }

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-[1140px] space-y-6 md:space-y-8">
        <h1 className="text-[32px] font-bold text-grey-900">Transactions</h1>

        <div className="rounded-xl bg-white p-5 md:p-8">
        {/* Search and Filters */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-3 w-full md:max-w-[320px]">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-grey-500" />
              <Input
                type="text"
                placeholder="Search transaction"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className="pl-10 border-beige-500 focus-visible:ring-[#201F24]"
              />
            </div>

            {/* Mobile Filter Buttons */}
            <div className="flex md:hidden gap-3">
              <Sheet open={sortSheetOpen} onOpenChange={setSortSheetOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-11 w-11 border-beige-500"
                  >
                    <SlidersHorizontal className="h-5 w-5 text-grey-900" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="rounded-t-xl">
                  <SheetHeader>
                    <SheetTitle>Sort by</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-2">
                    {(["latest", "oldest", "a-to-z", "z-to-a", "highest", "lowest"] as SortOption[]).map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSortBy(option)
                          setCurrentPage(1)
                          setSortSheetOpen(false)
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-bold ${
                          sortBy === option
                            ? "bg-beige-100 text-grey-900"
                            : "text-grey-500 hover:bg-beige-100/50"
                        }`}
                      >
                        {getSortLabel(option)}
                      </button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>

              <Sheet open={filterSheetOpen} onOpenChange={setFilterSheetOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-11 w-11 border-beige-500"
                  >
                    <Filter className="h-5 w-5 text-grey-900" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="rounded-t-xl">
                  <SheetHeader>
                    <SheetTitle>Filter by Category</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setCategoryFilter(category)
                          setCurrentPage(1)
                          setFilterSheetOpen(false)
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-bold ${
                          categoryFilter === category
                            ? "bg-beige-100 text-grey-900"
                            : "text-grey-500 hover:bg-beige-100/50"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Desktop Filters */}
          <div className="hidden md:flex gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-grey-500">Sort by</span>
              <Select
                value={sortBy}
                onValueChange={(value) => {
                  setSortBy(value as SortOption)
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="w-[130px] border-beige-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="a-to-z">A to Z</SelectItem>
                  <SelectItem value="z-to-a">Z to A</SelectItem>
                  <SelectItem value="highest">Highest</SelectItem>
                  <SelectItem value="lowest">Lowest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-grey-500">Category</span>
              <Select
                value={categoryFilter}
                onValueChange={(value) => {
                  setCategoryFilter(value)
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="w-[180px] border-beige-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-beige-100 hover:bg-transparent">
                <TableHead className="text-xs text-grey-500 font-normal">
                  Recipient / Sender
                </TableHead>
                <TableHead className="text-xs text-grey-500 font-normal">
                  Category
                </TableHead>
                <TableHead className="text-xs text-grey-500 font-normal">
                  Transaction Date
                </TableHead>
                <TableHead className="text-xs text-grey-500 font-normal text-right">
                  Amount
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTransactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  className="border-b border-beige-100 hover:bg-beige-100/50"
                >
                  <TableCell className="py-5">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#277C78] to-[#82C9D7] flex items-center justify-center text-white font-bold">
                        {transaction.name.charAt(0)}
                      </div>
                      <span className="text-sm font-bold text-grey-900">
                        {transaction.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-grey-500">
                    {transaction.category}
                  </TableCell>
                  <TableCell className="text-xs text-grey-500">
                    {transaction.date}
                  </TableCell>
                  <TableCell
                    className={`text-right text-sm font-bold ${
                      transaction.amount > 0
                        ? "text-budget-green"
                        : "text-grey-900"
                    }`}
                  >
                    {transaction.amount > 0 ? "+" : ""}$
                    {Math.abs(transaction.amount).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card List */}
        <div className="md:hidden space-y-3">
          {paginatedTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between py-4 border-b border-beige-100 last:border-0"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#277C78] to-[#82C9D7] flex items-center justify-center text-white font-bold flex-shrink-0">
                  {transaction.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-grey-900">
                    {transaction.name}
                  </p>
                  <p className="text-xs text-grey-500 mt-1">
                    {transaction.category}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`text-sm font-bold ${
                    transaction.amount > 0
                      ? "text-budget-green"
                      : "text-grey-900"
                  }`}
                >
                  {transaction.amount > 0 ? "+" : ""}$
                  {Math.abs(transaction.amount).toFixed(2)}
                </p>
                <p className="text-xs text-grey-500 mt-1">
                  {transaction.date}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 rounded-lg border border-beige-500 px-3 md:px-4 py-2 text-sm font-bold text-grey-900 hover:bg-beige-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Prev</span>
            </button>

            <div className="flex gap-1">
              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (typeof page === "number") {
                      setCurrentPage(page)
                    }
                  }}
                  disabled={page === "..."}
                  className={`h-10 min-w-[40px] rounded-lg text-sm font-bold ${
                    page === currentPage
                      ? "bg-grey-900 text-white"
                      : "border border-beige-500 text-grey-900 hover:bg-beige-100"
                  } ${page === "..." ? "cursor-default border-0 hover:bg-transparent" : ""}`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 rounded-lg border border-beige-500 px-3 md:px-4 py-2 text-sm font-bold text-grey-900 hover:bg-beige-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
        </div>
      </div>
    </div>
  )
}
