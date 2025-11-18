# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This project uses **pnpm** as the package manager.

```bash
# Start development server (http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint

# Add new shadcn/ui components
pnpm dlx shadcn@latest add <component-name>
```

## Architecture Overview

This is a **Next.js 16** (App Router) personal finance application built with TypeScript, React 19, and Tailwind CSS 4.

### Route Structure

The app uses Next.js route groups for layout organization:

- **`app/(auth)/`** - Authentication pages (login, signup)
  - Shares `layout.tsx` with left illustration panel (desktop) and centered form area
  - Routes: `/login`, `/signup`

- **`app/(dashboard)/`** - Main application pages
  - Shares `layout.tsx` with sidebar navigation
  - Routes: `/dashboard`, `/transactions`, `/budgets`, `/pots`, `/recurring-bills`

### Layout Hierarchy

```
app/layout.tsx (root)
├── app/(auth)/layout.tsx → auth pages
└── app/(dashboard)/layout.tsx → dashboard pages
    └── components/sidebar.tsx (navigation)
```

The sidebar component handles responsive behavior:
- Desktop: Full sidebar (collapsible to minimized state)
- Tablet: Bottom navigation bar with icons + labels
- Mobile: Bottom navigation bar with icons only

### Component Organization

- **`components/ui/`** - Reusable UI primitives (shadcn/ui components)
  - Built on Radix UI primitives
  - Uses class-variance-authority for variants
  - Form components integrate react-hook-form + zod
  - Full component list: https://ui.shadcn.com/docs/components

- **`components/dashboard/`** - Dashboard-specific cards
- **`components/budgets/`** - Budget management components

### Data Layer

Currently using **dummy data** from `lib/dummy-data.ts`:
- `summary` - Current balance, income, expenses
- `pots[]` - Savings pots
- `transactions[]` - Transaction history
- `budgets[]` - Budget categories
- `recurringBills[]` - Recurring bill data
- `mockBudgets[]` - Budgets with spending data (type: `BudgetWithSpending`)
- `mockTransactions{}` - Transactions grouped by budget ID

**Important**: The app currently uses client-side state management. When implementing real data persistence:
- Pages using data are marked with `"use client"`
- State is managed locally with `useState`
- Data updates are handled through component callbacks (e.g., `onSave`, `onDelete`)

### Type System

Main types in `lib/types/budget.ts`:
- `Budget` - Base budget type (id, category, maximum, theme)
- `BudgetWithSpending` - Budget with spending tracking
- `Transaction` - Transaction data
- `BudgetTheme` - 14 available color themes for budgets

Helper functions for budget themes:
- `getBudgetThemeColor(theme)` - Returns hex color
- `getBudgetThemeBgClass(theme)` - Returns Tailwind bg class
- `getBudgetThemeTextClass(theme)` - Returns Tailwind text class
- `getBudgetThemeBorderClass(theme)` - Returns Tailwind border class

### Styling System

Uses **Tailwind CSS 4** with custom theme:

**App-specific colors** (defined in `globals.css`):
- `beige-{100,500}` - Light backgrounds and muted text
- `grey-{100,300,500,900}` - Grayscale palette
- `budget-{theme}` - Budget category colors (green, yellow, cyan, navy, red, purple, etc.)

**CSS Variables**: All colors are defined as CSS variables in `globals.css` `:root`. Hex values in data files (e.g., `#277C78`) correspond to CSS variables (e.g., `--budget-green`).

**Utilities**:
- `lib/utils.ts` exports `cn()` - Combines `clsx` + `tailwind-merge` for conditional classes

### Path Aliases

TypeScript is configured with `@/*` alias pointing to root directory:
```typescript
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
```

## Key Implementation Patterns

### Forms
Use react-hook-form with zod validation through the Form components from `components/ui/form.tsx`. See `components/budgets/budget-dialog.tsx` for reference implementation.

### Responsive Design
The app uses Tailwind breakpoints with mobile-first approach:
- Mobile: Base styles
- Tablet: `md:` breakpoint
- Desktop: `lg:` breakpoint

### Client Components
Components requiring interactivity are marked with `"use client"` directive (Next.js requirement for App Router).
