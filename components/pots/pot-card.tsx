import { Card } from "@/components/ui/card"
import { Pot, getPotThemeColor } from "@/lib/types/pot"
import { PotActionsMenu } from "./pot-actions-menu"

interface PotCardProps {
  pot: Pot
  onEdit: (pot: Pot) => void
  onDelete: (pot: Pot) => void
  onAddMoney: (pot: Pot) => void
  onWithdraw: (pot: Pot) => void
}

export function PotCard({ pot, onEdit, onDelete, onAddMoney, onWithdraw }: PotCardProps) {
  const percentage = (pot.total / pot.target) * 100
  const percentageText = percentage.toFixed(2) + "%"

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: getPotThemeColor(pot.theme) }}
          />
          <h3 className="text-xl font-bold text-grey-900">{pot.name}</h3>
        </div>
        <PotActionsMenu
          pot={pot}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between">
          <p className="text-sm text-grey-500">Total Saved</p>
          <p className="text-[32px] font-bold text-grey-900">
            ${pot.total.toFixed(2)}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-3">
          <div className="w-full bg-beige-100 rounded-full h-2 overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${Math.min(percentage, 100)}%`,
                backgroundColor: getPotThemeColor(pot.theme),
              }}
            />
          </div>
          <div className="flex items-center justify-between text-xs">
            <p className="font-bold text-grey-500">{percentageText}</p>
            <p className="text-grey-500">Target of ${pot.target.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onAddMoney(pot)}
          className="py-4 px-5 bg-beige-100 hover:bg-beige-500 text-grey-900 text-sm font-bold rounded-lg transition-colors"
        >
          + Add Money
        </button>
        <button
          onClick={() => onWithdraw(pot)}
          className="py-4 px-5 bg-beige-100 hover:bg-beige-500 text-grey-900 text-sm font-bold rounded-lg transition-colors"
        >
          Withdraw
        </button>
      </div>
    </Card>
  )
}
