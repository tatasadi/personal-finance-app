"use client"

import { XIcon } from "lucide-react"
import { Budget } from "@/lib/types/budget"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface DeleteBudgetDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  budget: Budget | null
  onConfirm: () => void
}

export function DeleteBudgetDialog({
  open,
  onOpenChange,
  budget,
  onConfirm,
}: DeleteBudgetDialogProps) {
  const handleConfirm = () => {
    onConfirm()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[560px] p-0" showCloseButton={false}>
        <div className="p-5 md:p-8">
          <DialogHeader className="mb-5">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold md:text-[32px]">
                Delete &apos;{budget?.category}&apos;?
              </DialogTitle>
              <button
                onClick={() => onOpenChange(false)}
                className="flex h-8 w-8 items-center justify-center rounded-sm hover:bg-gray-100"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-grey-500">
              Are you sure you want to delete this budget? This action cannot be
              reversed, and all the data inside it will be removed forever.
            </p>
          </DialogHeader>

          <div className="space-y-4">
            <Button
              onClick={handleConfirm}
              className="h-[53px] w-full rounded-lg bg-budget-red text-sm font-bold text-white hover:bg-budget-red/90"
            >
              Yes, Confirm Deletion
            </Button>
            <button
              onClick={() => onOpenChange(false)}
              className="w-full text-center text-sm text-grey-500 hover:text-grey-900"
            >
              No, Go Back
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
