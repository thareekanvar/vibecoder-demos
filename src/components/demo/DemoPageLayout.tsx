"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import type { LucideIcon } from "lucide-react"

interface DemoPageLayoutProps {
  icon: LucideIcon
  title: string
  subtitle: string
  mobileTitle?: string
  headerRight?: React.ReactNode
  children: React.ReactNode
}

export default function DemoPageLayout({
  icon: Icon,
  title,
  subtitle,
  mobileTitle,
  headerRight,
  children,
}: DemoPageLayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-zinc-200 bg-white/80 backdrop-blur-2xl px-4 lg:px-6 h-14">
        <SidebarTrigger className="text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100" />
        <Separator orientation="vertical" className="h-4 bg-zinc-200" />
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center size-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/25">
            <Icon className="size-3.5 text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-[13px] font-bold text-zinc-900 tracking-tight">{title}</h1>
            <p className="text-[11px] text-zinc-600 -mt-0.5">{subtitle}</p>
          </div>
          <h1 className="sm:hidden text-[13px] font-bold text-zinc-900 tracking-tight">
            {mobileTitle || title}
          </h1>
        </div>
        {headerRight && <div className="ml-auto flex items-center gap-3">{headerRight}</div>}
      </header>
      <main className="p-4 lg:p-6 max-w-[1400px] mx-auto">{children}</main>
    </div>
  )
}
