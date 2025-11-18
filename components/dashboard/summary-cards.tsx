import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface SummaryCardProps {
  title: string
  amount: number
  variant?: "default" | "dark"
}

export function SummaryCard({ title, amount, variant = "default" }: SummaryCardProps) {
  return (
    <Card
      className={cn(
        "p-6 flex flex-col gap-3",
        variant === "dark" ? "bg-grey-900 text-white" : "bg-white text-grey-900"
      )}
    >
      <p className={cn(
        "text-sm",
        variant === "dark" ? "text-white/70" : "text-grey-500"
      )}>{title}</p>
      <p className="text-[32px] font-bold leading-[1.2]">
        ${amount.toFixed(2)}
      </p>
    </Card>
  )
}

interface SummaryCardsProps {
  currentBalance: number
  income: number
  expenses: number
}

export function SummaryCards({ currentBalance, income, expenses }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <SummaryCard title="Current Balance" amount={currentBalance} variant="dark" />
      <SummaryCard title="Income" amount={income} />
      <SummaryCard title="Expenses" amount={expenses} />
    </div>
  )
}
