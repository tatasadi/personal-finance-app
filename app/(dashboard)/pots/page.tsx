"use client"

import { useState } from "react"
import { pots as initialPots } from "@/lib/dummy-data"
import { Pot } from "@/lib/types/pot"
import { PotCard } from "@/components/pots/pot-card"
import { PotDialog } from "@/components/pots/pot-dialog"
import { DeletePotDialog } from "@/components/pots/delete-pot-dialog"
import { AddMoneyDialog } from "@/components/pots/add-money-dialog"
import { WithdrawDialog } from "@/components/pots/withdraw-dialog"

export default function PotsPage() {
  const [pots, setPots] = useState<Pot[]>(initialPots)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [addMoneyDialogOpen, setAddMoneyDialogOpen] = useState(false)
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false)
  const [selectedPot, setSelectedPot] = useState<Pot | null>(null)

  const handleAddPot = () => {
    setSelectedPot(null)
    setDialogOpen(true)
  }

  const handleEditPot = (pot: Pot) => {
    setSelectedPot(pot)
    setDialogOpen(true)
  }

  const handleDeletePot = (pot: Pot) => {
    setSelectedPot(pot)
    setDeleteDialogOpen(true)
  }

  const handleAddMoney = (pot: Pot) => {
    setSelectedPot(pot)
    setAddMoneyDialogOpen(true)
  }

  const handleWithdraw = (pot: Pot) => {
    setSelectedPot(pot)
    setWithdrawDialogOpen(true)
  }

  const handleSavePot = (potData: Omit<Pot, "id"> & { id?: string }) => {
    if (potData.id) {
      // Edit existing pot
      setPots(pots.map((p) => (p.id === potData.id ? { ...p, ...potData } : p)))
    } else {
      // Add new pot
      const newPot: Pot = {
        id: (pots.length + 1).toString(),
        name: potData.name,
        target: potData.target,
        total: potData.total,
        theme: potData.theme,
      }
      setPots([...pots, newPot])
    }
  }

  const handleConfirmDelete = () => {
    if (selectedPot) {
      setPots(pots.filter((p) => p.id !== selectedPot.id))
    }
  }

  const handleConfirmAddMoney = (amount: number) => {
    if (selectedPot) {
      setPots(
        pots.map((p) =>
          p.id === selectedPot.id ? { ...p, total: p.total + amount } : p
        )
      )
    }
  }

  const handleConfirmWithdraw = (amount: number) => {
    if (selectedPot) {
      setPots(
        pots.map((p) =>
          p.id === selectedPot.id ? { ...p, total: Math.max(0, p.total - amount) } : p
        )
      )
    }
  }

  return (
    <>
      <div className="p-4 md:p-8 lg:p-10">
        <div className="mx-auto max-w-[1140px] space-y-6 md:space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-[32px] font-bold text-grey-900">Pots</h1>
            <button
              onClick={handleAddPot}
              className="rounded-lg bg-grey-900 px-4 py-3 text-sm font-bold text-white hover:bg-grey-900/90"
            >
              + Add New Pot
            </button>
          </div>

          {/* Pots Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {pots.map((pot) => (
              <PotCard
                key={pot.id}
                pot={pot}
                onEdit={handleEditPot}
                onDelete={handleDeletePot}
                onAddMoney={handleAddMoney}
                onWithdraw={handleWithdraw}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <PotDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        pot={selectedPot}
        onSave={handleSavePot}
      />

      <DeletePotDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        pot={selectedPot}
        onConfirm={handleConfirmDelete}
      />

      <AddMoneyDialog
        open={addMoneyDialogOpen}
        onOpenChange={setAddMoneyDialogOpen}
        pot={selectedPot}
        onConfirm={handleConfirmAddMoney}
      />

      <WithdrawDialog
        open={withdrawDialogOpen}
        onOpenChange={setWithdrawDialogOpen}
        pot={selectedPot}
        onConfirm={handleConfirmWithdraw}
      />
    </>
  )
}
