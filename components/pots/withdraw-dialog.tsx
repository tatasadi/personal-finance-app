"use client"

import { useState, useEffect } from "react"
import { XIcon } from "lucide-react"
import { Pot, getPotThemeColor } from "@/lib/types/pot"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface WithdrawDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  pot: Pot | null
  onConfirm: (amount: number) => void
}

export function WithdrawDialog({
  open,
  onOpenChange,
  pot,
  onConfirm,
}: WithdrawDialogProps) {
  const [amount, setAmount] = useState("")

  useEffect(() => {
    if (open) {
      setAmount("")
    }
  }, [open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount || parseFloat(amount) <= 0) return

    const withdrawAmount = parseFloat(amount)
    if (pot && withdrawAmount > pot.total) return

    onConfirm(withdrawAmount)
    onOpenChange(false)
  }

  if (!pot) return null

  const newAmount = Math.max(0, pot.total - (parseFloat(amount) || 0))
  const newPercentage = (newAmount / pot.target) * 100
  const withdrawAmount = parseFloat(amount) || 0
  const isOverWithdraw = withdrawAmount > pot.total

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[560px] p-0" showCloseButton={false}>
        <div className="p-5 md:p-8">
          <DialogHeader className="mb-5">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold md:text-[32px]">
                Withdraw from '{pot.name}'
              </DialogTitle>
              <button
                onClick={() => onOpenChange(false)}
                className="flex h-8 w-8 items-center justify-center rounded-sm hover:bg-gray-100"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-grey-500">
              Withdraw from your pot to put money back in your main balance. This will reduce
              the amount you have in this pot.
            </p>
          </DialogHeader>

          {/* New Amount Display */}
          <div className="mb-5 space-y-4 rounded-lg bg-beige-100 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-grey-500">New Amount</p>
              <p className="text-[32px] font-bold text-grey-900">
                ${newAmount.toFixed(2)}
              </p>
            </div>
            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="h-2 w-full overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${Math.min(newPercentage, 100)}%`,
                    backgroundColor: getPotThemeColor(pot.theme),
                  }}
                />
              </div>
              <div className="flex items-center justify-between text-xs">
                <p className="font-bold text-budget-red">
                  {newPercentage.toFixed(2)}%
                </p>
                <p className="text-grey-500">Target of ${pot.target.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="amount" className="text-xs font-bold text-grey-500">
                Amount to Withdraw
              </Label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-sm text-grey-500">
                  $
                </span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  max={pot.total}
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="h-11 rounded-lg border-beige-500 pl-8 text-sm"
                />
              </div>
              {isOverWithdraw && (
                <p className="text-xs text-budget-red">
                  Cannot withdraw more than available balance (${pot.total.toFixed(2)})
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={!amount || parseFloat(amount) <= 0 || isOverWithdraw}
              className="h-[53px] w-full rounded-lg bg-grey-900 text-sm font-bold text-white hover:bg-grey-900/90 disabled:opacity-50"
            >
              Confirm Withdrawal
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
