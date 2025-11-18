import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Pot } from "@/lib/dummy-data"
import { Wallet } from "lucide-react"

interface PotsCardProps {
  totalSaved: number
  pots: Pot[]
}

export function PotsCard({ totalSaved, pots }: PotsCardProps) {
  return (
    <Card className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-grey-900">Pots</h2>
        <Link
          href="/pots"
          className="text-sm text-grey-500 hover:text-grey-900 flex items-center gap-3"
        >
          See Details
          <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5.5L1 10" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </Link>
      </div>

      <div className="flex items-center gap-5">
        {/* Total Saved Section */}
        <div className="flex items-center gap-5 bg-beige-100 rounded-xl p-5 flex-1">
          <div className="bg-grey-900 rounded-full p-4">
            <Wallet className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-sm text-grey-500 mb-3">Total Saved</p>
            <p className="text-[32px] font-bold text-grey-900 leading-none">
              ${totalSaved}
            </p>
          </div>
        </div>

        {/* Pots Grid */}
        <div className="grid grid-cols-2 gap-4">
          {pots.map((pot) => (
            <div key={pot.id} className="flex items-start gap-4">
              <div
                className="w-1 h-[43px] rounded-full"
                style={{ backgroundColor: pot.color }}
              />
              <div className="flex-1">
                <p className="text-xs text-grey-500 mb-1">{pot.name}</p>
                <p className="text-sm font-bold text-grey-900">${pot.amount}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
