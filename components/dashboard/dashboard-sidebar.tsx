"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { logOut } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import {
  LayoutDashboard,
  FileText,
  Calendar,
  File,
  Bell,
  Bot,
  Settings,
  LogOut,
  Briefcase,
  Menu,
} from "lucide-react"
import { useState } from "react"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Applications",
    href: "/dashboard/applications",
    icon: FileText,
  },
  {
    title: "Interviews",
    href: "/dashboard/interviews",
    icon: Calendar,
  },
  {
    title: "Resumes",
    href: "/dashboard/resumes",
    icon: File,
  },
  {
    title: "Reminders",
    href: "/dashboard/reminders",
    icon: Bell,
  },
  {
    title: "AI Assistant",
    href: "/dashboard/ai-assistant",
    icon: Bot,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

function SidebarContent({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await logOut()
    onLinkClick?.()
    router.push("/login")
  }

  return (
    <div className="flex h-full flex-col">
      {/* Logo/Brand */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold" onClick={onLinkClick}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Briefcase className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg">GetHired</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onLinkClick}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
          )
        })}
      </nav>

      {/* Logout Button */}
      <div className="border-t p-3">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:bg-destructive hover:text-destructive-foreground"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}

export function DashboardSidebar() {
  return (
    <>
      {/* Desktop Sidebar - hidden on mobile */}
      <div className="hidden lg:flex h-full w-64 flex-col border-r bg-card">
        <SidebarContent />
      </div>
    </>
  )
}

export function MobileSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <SidebarContent onLinkClick={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}
