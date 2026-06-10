"use client"

import { Layers } from "lucide-react"
import type { WidgetData } from "@/lib/types"

interface ConsoleOutputProps {
  widgets: WidgetData[]
  totalDuration: number
}

export default function ConsoleOutput({ widgets, totalDuration }: ConsoleOutputProps) {
  return (
    <div className="bento-card col-span-2 md:col-span-4 p-5">
      <div className="flex items-center gap-2 mb-4">
        <Layers className="size-3.5 text-zinc-500" />
        <span className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-medium">Console Output</span>
      </div>
      <div className="font-[family-name:var(--font-jetbrains)] text-[12px] leading-relaxed space-y-1">
        {widgets.map((w) => (
          <div key={w.name} className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${
              w.status === "success" ? "bg-emerald-500" : w.status === "loading" ? "bg-amber-400 animate-pulse" : "bg-zinc-300"
            }`} />
            <span className="text-zinc-400">&#9654;</span>
            <span className="text-zinc-600">{w.name} loaded in</span>
            <span className={`font-semibold ${
              w.status === "success" ? "text-zinc-800" : "text-zinc-400"
            }`}>
              {w.duration > 0 ? `${w.duration}ms` : "pending"}
            </span>
          </div>
        ))}
        {totalDuration > 0 && (
          <div className="flex items-center gap-2 pt-2 mt-2 border-t border-zinc-100">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            <span className="text-violet-600 font-semibold">&#10003;</span>
            <span className="text-zinc-800 font-semibold">Dashboard loaded in {totalDuration}ms</span>
          </div>
        )}
      </div>
    </div>
  )
}
