"use client"

import type { WidgetData } from "@/lib/types"

const colorMap: Record<string, { iconBg: string; iconColor: string; dot: string }> = {
  blue: { iconBg: "bg-blue-50 border border-blue-100", iconColor: "text-blue-600", dot: "bg-blue-500" },
  green: { iconBg: "bg-emerald-50 border border-emerald-100", iconColor: "text-emerald-600", dot: "bg-emerald-500" },
  purple: { iconBg: "bg-purple-50 border border-purple-100", iconColor: "text-purple-600", dot: "bg-purple-500" },
  amber: { iconBg: "bg-amber-50 border border-amber-100", iconColor: "text-amber-600", dot: "bg-amber-500" },
}

const statusLabel: Record<string, string> = {
  idle: "Pending",
  loading: "Loading",
  success: "Loaded",
  error: "Failed",
}

const statusDot: Record<string, string> = {
  idle: "bg-zinc-300",
  loading: "bg-amber-400 animate-pulse",
  success: "bg-emerald-500",
  error: "bg-red-500",
}

function Spinner({ color }: { color: string }) {
  const c = colorMap[color]?.dot || "border-zinc-300"
  return (
    <div className="flex items-center justify-center h-32">
      <div className="relative">
        <div className={`w-10 h-10 border-2 border-zinc-200 ${c.replace("bg-", "border-t-")} rounded-full animate-spin`} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-zinc-200 animate-pulse" />
        </div>
      </div>
    </div>
  )
}

function Skeleton() {
  return (
    <div className="space-y-3">
      <div className="h-4 bg-zinc-100 rounded-lg w-1/3 animate-pulse" />
      <div className="h-3 bg-zinc-100 rounded-lg w-1/2 animate-pulse" />
      <div className="flex gap-2 mt-4">
        <div className="h-16 flex-1 bg-zinc-50 rounded-xl animate-pulse border border-zinc-100" />
        <div className="h-16 flex-1 bg-zinc-50 rounded-xl animate-pulse border border-zinc-100" />
      </div>
    </div>
  )
}

export default function WidgetCard({ widget }: { widget: WidgetData }) {
  const c = colorMap[widget.color] || colorMap.blue
  const Icon = widget.icon

  return (
    <div
      id={widget.name.toLowerCase()}
      className="bento-card p-5 flex flex-col min-h-[280px]"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5 relative z-10">
        <div className="flex items-center gap-3">
          <div className={`flex items-center justify-center size-11 rounded-2xl ${c.iconBg} transition-transform duration-300`}>
            <Icon className={`size-5 ${c.iconColor}`} />
          </div>
          <div>
            <h3 className="font-semibold text-[15px] text-zinc-900 tracking-tight">{widget.name}</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className={`w-1.5 h-1.5 rounded-full ${statusDot[widget.status]}`} />
              <span className="text-[11px] text-zinc-600 font-medium">{statusLabel[widget.status]}</span>
            </div>
          </div>
        </div>
        {widget.status === "success" && (
          <span className="text-[10px] font-[family-name:var(--font-jetbrains)] text-zinc-500 bg-zinc-100 px-2 py-1 rounded-md border border-zinc-200">
            {widget.duration}ms
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 relative z-10">
        {widget.status === "idle" && <Skeleton />}
        {widget.status === "loading" && <Spinner color={widget.color} />}
        {widget.status === "success" && (
          <div className="fade-in-up space-y-4">
            <div>
              <span className="text-4xl font-bold text-zinc-900 tracking-tighter tabular-nums">
                {widget.count.toLocaleString()}
              </span>
              <span className="text-sm text-zinc-500 ml-2">records</span>
            </div>

            <div className="h-px bg-zinc-100" />

            <div className="space-y-1.5 max-h-28 overflow-y-auto scrollbar-thin">
              {widget.data.slice(0, 4).map((item, i) => (
                <div
                  key={i}
                  className="text-[11px] text-zinc-600 font-[family-name:var(--font-jetbrains)] truncate leading-relaxed py-0.5 px-2 rounded bg-zinc-50 border border-zinc-100"
                >
                  {JSON.stringify(item).slice(0, 65)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Loading bar */}
      {widget.status === "loading" && (
        <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
          <div className="h-full bg-gradient-to-r from-transparent via-violet-400 to-transparent animate-loading-bar" />
        </div>
      )}
    </div>
  )
}
