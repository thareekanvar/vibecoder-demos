"use client"

import type { LoadingMode } from "@/lib/types"
import { Clock, Activity, Timer, TrendingUp } from "lucide-react"

interface Props {
  mode: LoadingMode
  totalDuration: number
  widgets: { duration: number; count: number }[]
}

export default function PerformanceMetrics({ mode, totalDuration, widgets }: Props) {
  const totalRequests = 4
  const avgTime =
    totalDuration > 0
      ? Math.round(widgets.reduce((sum, w) => sum + w.duration, 0) / widgets.length)
      : 0
  const sequentialEstimate = 8000
  const gain =
    mode === "parallel" && totalDuration > 0
      ? Math.round(((sequentialEstimate - totalDuration) / sequentialEstimate) * 100)
      : 0

  const metrics = [
    {
      label: "Total Time",
      value: totalDuration > 0 ? `${totalDuration}` : "—",
      unit: totalDuration > 0 ? "ms" : "",
      icon: Clock,
      color: totalDuration > 5000 ? "text-red-600" : totalDuration > 0 ? "text-emerald-600" : "text-zinc-500",
      bg: totalDuration > 5000 ? "bg-red-50 border-red-100" : totalDuration > 0 ? "bg-emerald-50 border-emerald-100" : "bg-zinc-50 border-zinc-100",
    },
    {
      label: "Requests",
      value: totalDuration > 0 ? `${totalRequests}` : "0",
      unit: "/ 4",
      icon: Activity,
      color: "text-zinc-800",
      bg: "bg-zinc-50 border-zinc-100",
    },
    {
      label: "Avg Time",
      value: avgTime > 0 ? `${avgTime}` : "—",
      unit: avgTime > 0 ? "ms" : "",
      icon: Timer,
      color: "text-zinc-800",
      bg: "bg-zinc-50 border-zinc-100",
    },
    {
      label: "Speed Gain",
      value: gain > 0 ? `+${gain}` : "—",
      unit: gain > 0 ? "%" : "",
      icon: TrendingUp,
      color: gain > 0 ? "text-emerald-600" : "text-zinc-500",
      bg: gain > 0 ? "bg-emerald-50 border-emerald-100" : "bg-zinc-50 border-zinc-100",
    },
  ]

  return (
    <>
      {metrics.map((m) => (
        <div key={m.label} className={`bento-card p-4 flex flex-col justify-between group ${m.bg}`}>
          <div className="flex items-center gap-2 mb-2 relative z-10">
            <m.icon className={`size-3.5 ${m.color}`} />
            <span className="text-[10px] text-zinc-500 uppercase tracking-[0.15em] font-medium">{m.label}</span>
          </div>
          <div className="relative z-10">
            <span className={`text-xl font-bold tabular-nums tracking-tighter ${m.color}`}>
              {m.value}
            </span>
            {m.unit && (
              <span className="text-[11px] text-zinc-500 ml-1 font-medium">{m.unit}</span>
            )}
          </div>
        </div>
      ))}
    </>
  )
}
