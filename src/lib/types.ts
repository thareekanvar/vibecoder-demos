import type { LucideIcon } from "lucide-react"

export interface ApiResponse {
  data: unknown[]
  duration: number
  count: number
}

export interface WidgetData {
  name: string
  icon: LucideIcon
  color: string
  data: unknown[]
  duration: number
  count: number
  status: "idle" | "loading" | "success" | "error"
}

export type LoadingMode = "sequential" | "parallel"
