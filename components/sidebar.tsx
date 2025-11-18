"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  Home,
  ArrowUpDown,
  PieChart,
  Wallet,
  Receipt,
  ChevronsLeft,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Transactions",
    href: "/transactions",
    icon: ArrowUpDown,
  },
  {
    name: "Budgets",
    href: "/budgets",
    icon: PieChart,
  },
  {
    name: "Pots",
    href: "/pots",
    icon: Wallet,
  },
  {
    name: "Recurring Bills",
    href: "/recurring-bills",
    icon: Receipt,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isMinimized, setIsMinimized] = useState(false)

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex bg-grey-900 rounded-tr-2xl rounded-br-2xl flex-col transition-all duration-300",
          isMinimized ? "w-[88px]" : "w-[300px]"
        )}
      >
        {/* Logo */}
        <div className="px-8 py-10 flex items-center justify-center">
          {!isMinimized && (
            <h1 className="text-white text-xl font-bold">finance</h1>
          )}
          {isMinimized && (
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <span className="text-grey-900 font-bold text-sm">f</span>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 pr-6 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 h-14 px-8 rounded-tr-xl rounded-br-xl font-bold text-base transition-all",
                  isActive
                    ? "bg-beige-100 text-grey-900 border-l-4 border-budget-green"
                    : "text-grey-300 hover:text-white"
                )}
              >
                <Icon className="w-6 h-6 shrink-0" />
                {!isMinimized && <span>{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Minimize Button */}
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="flex items-center gap-4 h-14 px-8 text-grey-300 hover:text-white font-bold text-base transition-colors mb-6"
        >
          <ChevronsLeft
            className={cn(
              "w-6 h-6 shrink-0 transition-transform",
              isMinimized && "rotate-180"
            )}
          />
          {!isMinimized && <span>Minimize Menu</span>}
        </button>
      </aside>

      {/* Mobile Bottom Navigation - Icons Only */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-grey-900 rounded-tl-lg rounded-tr-lg flex items-center justify-around px-2 py-2 z-50 md:hidden">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all min-w-[56px]",
                isActive
                  ? "bg-beige-100 text-budget-green"
                  : "text-grey-300"
              )}
            >
              <Icon className="w-6 h-6" />
            </Link>
          )
        })}
      </nav>

      {/* Tablet Bottom Navigation - Icons + Labels */}
      <nav className="hidden md:flex lg:hidden fixed bottom-0 left-0 right-0 bg-grey-900 rounded-tl-lg rounded-tr-lg items-center justify-around px-4 py-3 z-50">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-6 py-2 rounded-xl transition-all",
                isActive
                  ? "bg-beige-100 text-budget-green"
                  : "text-grey-300"
              )}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-bold">{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
