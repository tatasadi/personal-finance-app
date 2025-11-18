"use client"

import { MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Pot } from "@/lib/types/pot"

interface PotActionsMenuProps {
  pot: Pot
  onEdit: (pot: Pot) => void
  onDelete: (pot: Pot) => void
}

export function PotActionsMenu({ pot, onEdit, onDelete }: PotActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-1 hover:bg-beige-100 rounded transition-colors">
          <MoreVertical className="w-4 h-4 text-grey-900" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[115px]">
        <DropdownMenuItem
          onClick={() => onEdit(pot)}
          className="cursor-pointer text-grey-900 text-sm"
        >
          Edit Pot
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onDelete(pot)}
          className="cursor-pointer text-budget-red text-sm"
        >
          Delete Pot
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
