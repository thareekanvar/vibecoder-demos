"use client"

import type { LoadingMode } from "@/lib/types"

export default function CodeComparison({ mode }: { mode: LoadingMode }) {
  return (
    <div className="bento-card overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-100">
        {/* Sequential */}
        <div className="relative group">
          {mode === "sequential" && (
            <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-transparent to-transparent pointer-events-none" />
          )}
          <div className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  mode === "sequential" ? "bg-red-400 shadow-lg shadow-red-400/50" : "bg-zinc-300"
                }`} />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
              </div>
              <span className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
                mode === "sequential" ? "text-red-600" : "text-zinc-500"
              }`}>
                Sequential
              </span>
              {mode === "sequential" && (
                <span className="ml-auto text-[10px] bg-red-50 text-red-600 px-2.5 py-1 rounded-full font-semibold border border-red-200 animate-pulse">
                  Active
                </span>
              )}
            </div>
            <pre className="text-[13px] font-[family-name:var(--font-jetbrains)] leading-[1.8] overflow-x-auto">
              <code className={mode === "sequential" ? "text-zinc-700" : "text-zinc-400"}>
{`// ~8 seconds total
const users = await getUsers()
const orders = await getOrders()
const analytics = await getAnalytics()
const notifications =
  await getNotifications()`}
              </code>
            </pre>
          </div>
        </div>

        {/* Promise.all */}
        <div className="relative group">
          {mode === "parallel" && (
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-transparent to-transparent pointer-events-none" />
          )}
          <div className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  mode === "parallel" ? "bg-emerald-400 shadow-lg shadow-emerald-400/50" : "bg-zinc-300"
                }`} />
                <span className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  mode === "parallel" ? "bg-emerald-400/50" : "bg-zinc-200"
                }`} />
                <span className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  mode === "parallel" ? "bg-emerald-400/30" : "bg-zinc-200"
                }`} />
              </div>
              <span className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
                mode === "parallel" ? "text-emerald-600" : "text-zinc-500"
              }`}>
                Promise.all
              </span>
              {mode === "parallel" && (
                <span className="ml-auto text-[10px] bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full font-semibold border border-emerald-200 animate-pulse">
                  Active
                </span>
              )}
            </div>
            <pre className="text-[13px] font-[family-name:var(--font-jetbrains)] leading-[1.8] overflow-x-auto">
              <code className={mode === "parallel" ? "text-zinc-700" : "text-zinc-400"}>
{`// ~2 seconds total
const [users, orders, analytics, notifications] =
  await Promise.all([
    getUsers(),
    getOrders(),
    getAnalytics(),
    getNotifications(),
  ])`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
