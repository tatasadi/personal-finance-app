import { Receipt } from "lucide-react"

interface TotalBillsCardProps {
  total: number
}

export function TotalBillsCard({ total }: TotalBillsCardProps) {
  return (
    <div className="bg-grey-900 text-white rounded-xl p-6 lg:p-8">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-white/10 rounded-lg">
          <Receipt className="w-6 h-6 lg:w-8 lg:h-8" />
        </div>
        <div>
          <p className="text-sm text-white/70 mb-1">Total Bills</p>
          <p className="text-[32px] lg:text-[40px] font-bold leading-none">
            ${Math.abs(total).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}
