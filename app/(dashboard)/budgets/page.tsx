"use client"

import { useState } from "react"
import { Budget, BudgetWithSpending } from "@/lib/types/budget"
import { mockBudgets, mockTransactions } from "@/lib/dummy-data"
import { Button } from "@/components/ui/button"
import { SpendingSummaryChart } from "@/components/budgets/spending-summary-chart"
import { SpendingSummaryList } from "@/components/budgets/spending-summary-list"
import { BudgetCard } from "@/components/budgets/budget-card"
import { BudgetDialog } from "@/components/budgets/budget-dialog"
import { DeleteBudgetDialog } from "@/components/budgets/delete-budget-dialog"

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
          <h1 className="text-[32px] font-bold text-grey-900">Budgets</h1>
          <Button
            onClick={handleAddBudget}
            className="h-[53px] rounded-lg bg-grey-900 px-5 text-sm font-bold text-white hover:bg-grey-900/90"
          >
            + Add New Budget
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-[350px_1fr] lg:items-start xl:grid-cols-[400px_1fr]">
          {/* Spending Summary Card */}
          <div className="rounded-xl bg-white p-5 md:p-8 lg:order-1">
            <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-between lg:flex-col">
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
