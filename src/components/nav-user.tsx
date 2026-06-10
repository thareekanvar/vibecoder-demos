"use client"

import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Play } from "lucide-react"

export function NavUser() {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={() => window.open("https://www.youtube.com/@thareekanvar", "_blank")}
            className="text-zinc-600 hover:text-red-600 hover:bg-red-50"
          >
            <Play className="size-4 text-red-500" />
            <span>Watch Channel</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}
