"use client"

import { Button } from "@/components/ui/button"
import { Zap, ZapOff, RefreshCw, ArrowRightLeft } from "lucide-react"
import type { LoadingMode } from "@/lib/types"

interface HeroTimerCardProps {
  mode: LoadingMode
  timer: number
  totalDuration: number
  isRunning: boolean
  onRun: () => void
  onSwitch: () => void
  onReset: () => void
}

export default function HeroTimerCard({
  mode,
  timer,
  totalDuration,
  isRunning,
  onRun,
  onSwitch,
  onReset,
}: HeroTimerCardProps) {
  return (
    <div className="bento-card p-5 md:p-6 relative overflow-hidden mb-4 stagger-children">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-50 via-indigo-50 to-violet-50 animate-gradient" />

      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        {/* Left: Mode info */}
        <div className="flex-1 text-center sm:text-left min-w-0">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border mb-2 transition-all duration-300 ${
            mode === "sequential"
              ? "bg-red-50 border-red-200 text-red-700"
              : "bg-emerald-50 border-emerald-200 text-emerald-700"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isRunning ? "animate-pulse" : ""} ${
              mode === "sequential" ? "bg-red-500" : "bg-emerald-500"
            }`} />
            {mode === "sequential" ? "Sequential" : "Promise.all"}
          </div>
          <h3 className="text-base md:text-lg font-bold text-zinc-900 tracking-tight">
            {mode === "sequential"
              ? "Each API waits for the previous one"
              : "All APIs run simultaneously"}
          </h3>
          <p className="text-xs md:text-sm text-zinc-600 mt-1">
            {mode === "sequential"
              ? "Total = sum of all request times"
              : "Total = slowest single request"}
          </p>
        </div>

        {/* Center: Big Timer */}
        <div className="flex flex-col items-center shrink-0">
          <div className={`relative text-5xl sm:text-6xl md:text-7xl font-bold tabular-nums tracking-tighter transition-all duration-300 ${
            isRunning
              ? mode === "sequential" ? "text-red-500" : "text-emerald-500"
              : totalDuration > 0
                ? mode === "sequential" ? "text-red-600" : "text-emerald-600"
                : "text-zinc-300"
          }`}>
            {timer}
            <span className="text-xl sm:text-2xl md:text-3xl text-zinc-400 ml-1 font-medium">ms</span>
            {isRunning && (
              <span className="absolute -inset-4 rounded-full border border-current opacity-20 animate-pulse-ring" />
            )}
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex flex-row sm:flex-col gap-2 shrink-0 w-full sm:w-auto">
          <Button
            onClick={onRun}
            disabled={isRunning}
            size="sm"
            className={`font-semibold shadow-lg transition-all flex-1 sm:flex-none ${
              mode === "sequential"
                ? "bg-red-500 hover:bg-red-600 text-white shadow-red-500/20"
                : "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20"
            }`}
          >
            {isRunning ? (
              <>
                <RefreshCw className="size-3.5 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                {mode === "sequential" ? <ZapOff className="size-3.5" /> : <Zap className="size-3.5" />}
                Run Demo
              </>
            )}
          </Button>
          <Button
            onClick={onSwitch}
            disabled={isRunning}
            variant="outline"
            size="sm"
            className="border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 flex-1 sm:flex-none"
          >
            <ArrowRightLeft className="size-3.5" />
            Switch
          </Button>
          <Button
            onClick={onReset}
            disabled={isRunning}
            variant="ghost"
            size="sm"
            className="text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 flex-1 sm:flex-none"
          >
            <RefreshCw className="size-3.5" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}
