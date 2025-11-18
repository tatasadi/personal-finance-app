import { Sidebar } from "@/components/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-beige-100">
      <Sidebar />
      <main className="flex-1 pb-20 lg:pb-0">
        {children}
      </main>
    </div>
  )
}
