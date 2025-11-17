"use client"

import { useState } from "react"
import { Budget, BudgetWithSpending, Transaction } from "@/lib/types/budget"
import { Button } from "@/components/ui/button"
import { SpendingSummaryChart } from "@/components/budgets/spending-summary-chart"
import { SpendingSummaryList } from "@/components/budgets/spending-summary-list"
import { BudgetCard } from "@/components/budgets/budget-card"
import { BudgetDialog } from "@/components/budgets/budget-dialog"
import { DeleteBudgetDialog } from "@/components/budgets/delete-budget-dialog"

// Mock data - replace with actual data fetching
const mockBudgets: BudgetWithSpending[] = [
  {
    id: "1",
    category: "Entertainment",
    maximum: 50.0,
    theme: "green",
    spent: 15.0,
  },
  {
    id: "2",
    category: "Bills",
    maximum: 750.0,
    theme: "cyan",
    spent: 150.0,
  },
  {
    id: "3",
    category: "Dining Out",
    maximum: 75.0,
    theme: "yellow",
    spent: 133.0,
  },
  {
    id: "4",
    category: "Personal Care",
    maximum: 100.0,
    theme: "navy",
    spent: 40.0,
  },
]

const mockTransactions: Record<string, Transaction[]> = {
  "1": [
    {
      id: "t1",
      avatar: "/avatars/james-thompson.jpg",
      name: "James Thompson",
      category: "Entertainment",
      date: "2024-08-19",
      amount: -4.0,
      recurring: false,
    },
    {
      id: "t2",
      avatar: "/avatars/paul-pogbad.jpg",
      name: "Paul Pogbad",
      category: "Entertainment",
      date: "2024-08-19",
      amount: -5.0,
      recurring: false,
    },
    {
      id: "t3",
      avatar: "/avatars/rina-sato.jpg",
      name: "Rina Sato",
      category: "Entertainment",
      date: "2024-08-13",
      amount: -6.0,
      recurring: false,
    },
  ],
  "2": [
    {
      id: "t4",
      avatar: "/avatars/quick-electric.jpg",
      name: "Quick Electric Solutions",
      category: "Bills",
      date: "2024-08-02",
      amount: -100.0,
      recurring: true,
    },
    {
      id: "t5",
      avatar: "/avatars/rina-sato.jpg",
      name: "Rina Sato",
      category: "Bills",
      date: "2024-08-01",
      amount: -25.0,
      recurring: false,
    },
    {
      id: "t6",
      avatar: "/avatars/aqua-flow.jpg",
      name: "Aqua Flow Utilities",
      category: "Bills",
      date: "2024-07-31",
      amount: -25.0,
      recurring: true,
    },
  ],
  "3": [
    {
      id: "t7",
      avatar: "/avatars/savory-bites.jpg",
      name: "Savory Bites Bistro",
      category: "Dining Out",
      date: "2024-08-19",
      amount: -55.5,
      recurring: false,
    },
    {
      id: "t8",
      avatar: "/avatars/ethan-clark.jpg",
      name: "Ethan Clark",
      category: "Dining Out",
      date: "2024-08-20",
      amount: -32.5,
      recurring: false,
    },
    {
      id: "t9",
      avatar: "/avatars/ella-phillips.jpg",
      name: "Ella Phillips",
      category: "Dining Out",
      date: "2024-08-19",
      amount: -45.0,
      recurring: false,
    },
  ],
  "4": [
    {
      id: "t10",
      avatar: "/avatars/william-harris.jpg",
      name: "William Harris",
      category: "Personal Care",
      date: "2024-08-05",
      amount: -10.0,
      recurring: false,
    },
    {
      id: "t11",
      avatar: "/avatars/serenity-wellness.jpg",
      name: "Serenity Spa & Wellness",
      category: "Personal Care",
      date: "2024-08-09",
      amount: -15.0,
      recurring: false,
    },
    {
      id: "t12",
      avatar: "/avatars/bruno-zen.jpg",
      name: "Bruno Zen Spa",
      category: "Personal Care",
      date: "2024-08-11",
      amount: -15.0,
      recurring: false,
    },
  ],
}

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<BudgetWithSpending[]>(mockBudgets)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editingBudget, setEditingBudget] = useState<BudgetWithSpending | null>(null)
  const [deletingBudget, setDeletingBudget] = useState<BudgetWithSpending | null>(null)

  const handleAddBudget = () => {
    setEditingBudget(null)
    setDialogOpen(true)
  }

  const handleEditBudget = (budget: BudgetWithSpending) => {
    setEditingBudget(budget)
    setDialogOpen(true)
  }

  const handleDeleteBudget = (budget: BudgetWithSpending) => {
    setDeletingBudget(budget)
    setDeleteDialogOpen(true)
  }

  const handleSaveBudget = (budgetData: Omit<Budget, "id"> & { id?: string }) => {
    if (budgetData.id) {
      // Edit existing budget
      setBudgets((prev) =>
        prev.map((b) =>
          b.id === budgetData.id
            ? { ...b, ...budgetData, id: budgetData.id }
            : b
        )
      )
    } else {
      // Add new budget
      const newBudget: BudgetWithSpending = {
        ...budgetData,
        id: Date.now().toString(),
        spent: 0,
      }
      setBudgets((prev) => [...prev, newBudget])
    }
  }

  const handleConfirmDelete = () => {
    if (deletingBudget) {
      setBudgets((prev) => prev.filter((b) => b.id !== deletingBudget.id))
      setDeletingBudget(null)
    }
  }

  const existingCategories = budgets.map((b) => b.category)

  return (
    <div className="p-4 md:p-8 lg:px-10 lg:py-8">
      <div className="mx-auto max-w-[1440px] space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-[32px] font-bold text-[#201f24]">Budgets</h1>
          <Button
            onClick={handleAddBudget}
            className="h-[53px] rounded-lg bg-[#201f24] px-5 text-sm font-bold text-white hover:bg-[#201f24]/90"
          >
            + Add New Budget
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-[350px_1fr] lg:items-start xl:grid-cols-[400px_1fr]">
          {/* Spending Summary Card */}
          <div className="rounded-xl bg-white p-5 md:p-8 lg:order-1">
            <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between lg:flex-col">
              <div className="shrink-0">
                <SpendingSummaryChart budgets={budgets} />
              </div>
              <div className="w-full md:flex-1 lg:w-full">
                <SpendingSummaryList budgets={budgets} />
              </div>
            </div>
          </div>

          {/* Budget Cards */}
          <div className="space-y-6 lg:order-2">
            {budgets.map((budget) => (
              <BudgetCard
                key={budget.id}
                budget={budget}
                transactions={mockTransactions[budget.id] || []}
                onEdit={handleEditBudget}
                onDelete={handleDeleteBudget}
              />
            ))}
          </div>
        </div>

        {/* Dialogs */}
        <BudgetDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          budget={editingBudget}
          existingCategories={existingCategories}
          onSave={handleSaveBudget}
        />

        <DeleteBudgetDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          budget={deletingBudget}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </div>
  )
}
