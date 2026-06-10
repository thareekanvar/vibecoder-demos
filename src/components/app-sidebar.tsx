"use client"

import * as React from "react"
import { NavUser } from "@/components/nav-user"
import { demos } from "@/lib/demos"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Play } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="flex items-center justify-center size-9 shrink-0 rounded-xl bg-gradient-to-br from-violet-500 via-indigo-500 to-purple-600 shadow-lg shadow-violet-500/25">
            <Play className="size-4 text-white ml-0.5" fill="white" />
          </div>
          <div className="flex flex-col min-w-0 group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-bold tracking-tight text-zinc-900 truncate">
              vibewiththareek
            </span>
            <span className="text-[11px] text-zinc-500 truncate">
              YouTube Demos
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Demos</SidebarGroupLabel>
          <SidebarMenu>
            {demos.map((demo) => {
              const Icon = demo.icon
              const isActive = pathname === `/demo/${demo.slug}`
              return (
                <SidebarMenuItem key={demo.slug}>
                  <SidebarMenuButton
                    isActive={isActive}
                    tooltip={demo.title}
                    onClick={() => setOpenMobile(false)}
                    render={<Link href={`/demo/${demo.slug}`} />}
                  >
                    <Icon />
                    <span>{demo.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
