"use client"

import { useEffect, useState } from "react"
import { XIcon } from "lucide-react"
import {
  Pot,
  PotTheme,
  potThemeColors,
  potThemeOptions,
} from "@/lib/types/pot"
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

interface PotDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  pot?: Pot | null
  onSave: (pot: Omit<Pot, "id"> & { id?: string }) => void
}

export function PotDialog({
  open,
  onOpenChange,
  pot,
  onSave,
}: PotDialogProps) {
  const [name, setName] = useState("")
  const [target, setTarget] = useState("")
  const [theme, setTheme] = useState<PotTheme>("green")

  const isEditing = !!pot
  const maxNameLength = 30
  const remainingChars = maxNameLength - name.length

  useEffect(() => {
    if (pot) {
      setName(pot.name)
      setTarget(pot.target.toString())
      setTheme(pot.theme)
    } else {
      setName("")
      setTarget("")
      setTheme("green")
    }
  }, [pot, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !target) return

    onSave({
      id: pot?.id,
      name,
      target: parseFloat(target),
      total: pot?.total || 0,
      theme,
    })

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[560px] p-0" showCloseButton={false}>
        <div className="p-5 md:p-8">
          <DialogHeader className="mb-5">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold md:text-[32px]">
                {isEditing ? "Edit Pot" : "Add New Pot"}
              </DialogTitle>
              <button
                onClick={() => onOpenChange(false)}
                className="flex h-8 w-8 items-center justify-center rounded-sm hover:bg-gray-100"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-grey-500">
              {isEditing
                ? "If your saving targets change, feel free to update your pots."
                : "Create a pot to set savings targets. These can help keep you on track as you save for special purchases."}
            </p>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="name" className="text-xs font-bold text-grey-500">
                Pot Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="e.g. Rainy Days"
                value={name}
                onChange={(e) => setName(e.target.value.slice(0, maxNameLength))}
                className="h-11 rounded-lg border-beige-500 text-sm"
                maxLength={maxNameLength}
              />
              <p className="text-xs text-grey-500 text-right">
                {remainingChars} characters left
              </p>
            </div>

            <div className="space-y-1">
              <Label htmlFor="target" className="text-xs font-bold text-grey-500">
                Target
              </Label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-sm text-grey-500">
                  $
                </span>
                <Input
                  id="target"
                  type="number"
                  step="0.01"
                  placeholder="e.g. 2000"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="h-11 rounded-lg border-beige-500 pl-8 text-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="theme" className="text-xs font-bold text-grey-500">
                Theme
              </Label>
              <Select value={theme} onValueChange={(value) => setTheme(value as PotTheme)}>
                <SelectTrigger
                  id="theme"
                  className="h-11 w-full rounded-lg border-beige-500 text-sm"
                >
                  <SelectValue>
                    <div className="flex items-center gap-3">
                      <div
                        className="h-4 w-4 rounded-full"
                        style={{ backgroundColor: potThemeColors[theme] }}
                      />
                      <span>{potThemeOptions.find((opt) => opt.value === theme)?.label}</span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {potThemeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-3">
                        <div
                          className="h-4 w-4 rounded-full"
                          style={{ backgroundColor: potThemeColors[option.value] }}
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
              className="h-[53px] w-full rounded-lg bg-grey-900 text-sm font-bold text-white hover:bg-grey-900/90"
            >
              {isEditing ? "Save Changes" : "Add Pot"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
