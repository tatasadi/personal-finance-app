import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Transaction } from "@/lib/dummy-data"

interface TransactionsCardProps {
  transactions: Transaction[]
}

export function TransactionsCard({ transactions }: TransactionsCardProps) {
  return (
    <Card className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-grey-900">Transactions</h2>
        <Link
          href="/transactions"
          className="text-sm text-grey-500 hover:text-grey-900 flex items-center gap-3"
        >
          View All
          <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5.5L1 10" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </Link>
      </div>

      <div className="space-y-0">
        {transactions.map((transaction, index) => (
          <div key={transaction.id}>
            <div className="flex items-center justify-between py-5">
              <div className="flex items-center gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={transaction.avatar} alt={transaction.name} />
                  <AvatarFallback className="bg-beige-100 text-grey-900 font-bold">
                    {transaction.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm font-bold text-grey-900">{transaction.name}</p>
              </div>
              <div className="text-right">
                <p
                  className={`text-sm font-bold ${
                    transaction.amount > 0 ? "text-budget-green" : "text-grey-900"
                  }`}
                >
                  {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                </p>
                <p className="text-xs text-grey-500 mt-2">{transaction.date}</p>
              </div>
            </div>
            {index < transactions.length - 1 && <Separator />}
          </div>
        ))}
      </div>
    </Card>
  )
}
