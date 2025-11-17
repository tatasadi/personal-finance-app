"use client"

import { useEffect, useState } from "react"
import { XIcon } from "lucide-react"
import {
  Budget,
  BudgetTheme,
  budgetThemeColors,
  budgetThemeOptions,
} from "@/lib/types/budget"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface BudgetDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  budget?: Budget | null
  existingCategories?: string[]
  onSave: (budget: Omit<Budget, "id"> & { id?: string }) => void
}

export function BudgetDialog({
  open,
  onOpenChange,
  budget,
  existingCategories = [],
  onSave,
}: BudgetDialogProps) {
  const [category, setCategory] = useState("")
  const [maximum, setMaximum] = useState("")
  const [theme, setTheme] = useState<BudgetTheme>("green")

  const isEditing = !!budget

  useEffect(() => {
    if (budget) {
      setCategory(budget.category)
      setMaximum(budget.maximum.toString())
      setTheme(budget.theme)
    } else {
      setCategory("")
      setMaximum("")
      setTheme("green")
    }
  }, [budget, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!category || !maximum) return

    onSave({
      id: budget?.id,
      category,
      maximum: parseFloat(maximum),
      theme,
    })

    onOpenChange(false)
  }

  const availableCategories = [
    "Entertainment",
    "Bills",
    "Groceries",
    "Dining Out",
    "Transportation",
    "Personal Care",
    "Education",
    "Lifestyle",
    "Shopping",
    "General",
  ].filter((cat) => !existingCategories.includes(cat) || cat === budget?.category)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[560px] p-0" showCloseButton={false}>
        <div className="p-5 md:p-8">
          <DialogHeader className="mb-5">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold md:text-[32px]">
                {isEditing ? "Edit Budget" : "Add New Budget"}
              </DialogTitle>
              <button
                onClick={() => onOpenChange(false)}
                className="flex h-8 w-8 items-center justify-center rounded-sm hover:bg-gray-100"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-[#696868]">
              {isEditing
                ? "As your budgets change, feel free to update your spending limits."
                : "Choose a category to set a spending budget. These categories can help you monitor spending."}
            </p>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="category" className="text-xs font-bold text-[#696868]">
                Budget Category
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger
                  id="category"
                  className="h-11 w-full rounded-lg border-[#98908B] text-sm"
                >
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {availableCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="maximum" className="text-xs font-bold text-[#696868]">
                Maximum Spend
              </Label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-sm text-[#696868]">
                  $
                </span>
                <Input
                  id="maximum"
                  type="number"
                  step="0.01"
                  placeholder="e.g. 2000"
                  value={maximum}
                  onChange={(e) => setMaximum(e.target.value)}
                  className="h-11 rounded-lg border-[#98908B] pl-8 text-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="theme" className="text-xs font-bold text-[#696868]">
                Theme
              </Label>
              <Select value={theme} onValueChange={(value) => setTheme(value as BudgetTheme)}>
                <SelectTrigger
                  id="theme"
                  className="h-11 w-full rounded-lg border-[#98908B] text-sm"
                >
                  <SelectValue>
                    <div className="flex items-center gap-3">
                      <div
                        className="h-4 w-4 rounded-full"
                        style={{ backgroundColor: budgetThemeColors[theme] }}
                      />
                      <span>{budgetThemeOptions.find((opt) => opt.value === theme)?.label}</span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {budgetThemeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-3">
                        <div
                          className="h-4 w-4 rounded-full"
                          style={{ backgroundColor: budgetThemeColors[option.value] }}
                        />
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="h-[53px] w-full rounded-lg bg-[#201f24] text-sm font-bold text-white hover:bg-[#201f24]/90"
            >
              {isEditing ? "Save Changes" : "Add Budget"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
