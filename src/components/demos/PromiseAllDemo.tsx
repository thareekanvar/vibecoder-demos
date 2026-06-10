"use client"

import { useState, useRef, useCallback, useMemo } from "react"
import type { WidgetData, LoadingMode } from "@/lib/types"
import { fetchSequential, fetchParallel } from "@/lib/api"
import WidgetCard from "@/components/WidgetCard"
import PerformanceMetrics from "@/components/PerformanceMetrics"
import CodeComparison from "@/components/CodeComparison"
import DemoPageLayout from "@/components/demo/DemoPageLayout"
import HeroTimerCard from "@/components/demo/HeroTimerCard"
import ConsoleOutput from "@/components/demo/ConsoleOutput"
import DemoTabs from "@/components/demo/DemoTabs"
import ExplanationCard from "@/components/demo/ExplanationCard"
import VisualTimeline from "@/components/demo/VisualTimeline"
import { Button } from "@/components/ui/button"
import { Zap, ZapOff, Code2, Users, Package, BarChart3, Bell, Copy, Check } from "lucide-react"

const initialWidgets: WidgetData[] = [
  { name: "Users", icon: Users, color: "blue", data: [], duration: 0, count: 0, status: "idle" },
  { name: "Orders", icon: Package, color: "green", data: [], duration: 0, count: 0, status: "idle" },
  { name: "Analytics", icon: BarChart3, color: "purple", data: [], duration: 0, count: 0, status: "idle" },
  { name: "Notifications", icon: Bell, color: "amber", data: [], duration: 0, count: 0, status: "idle" },
]

export default function PromiseAllDemo() {
  const [mode, setMode] = useState<LoadingMode>("sequential")
  const [widgets, setWidgets] = useState<WidgetData[]>(initialWidgets)
  const [totalDuration, setTotalDuration] = useState(0)
  const [timer, setTimer] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [activeTab, setActiveTab] = useState("test")
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const isCancelledRef = useRef(false)

  const updateWidget = useCallback((index: number, update: Partial<WidgetData>) => {
    setWidgets((prev) => prev.map((w, i) => (i === index ? { ...w, ...update } : w)))
  }, [])

  const resetDashboard = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    isCancelledRef.current = true
    setWidgets(initialWidgets)
    setTotalDuration(0)
    setTimer(0)
    setIsRunning(false)
  }, [])

  const loadDashboard = useCallback(
    async (loadMode: LoadingMode) => {
      resetDashboard()
      isCancelledRef.current = false
      setIsRunning(true)

      let elapsed = 0
      setTimer(0)
      timerRef.current = setInterval(() => {
        elapsed += 100
        setTimer(elapsed)
      }, 100)

      try {
        if (loadMode === "parallel") {
          setWidgets((prev) => prev.map((w) => ({ ...w, status: "loading" as const })))
        } else {
          setWidgets(initialWidgets)
        }

        const result = loadMode === "sequential"
          ? await fetchSequential()
          : await fetchParallel()

        if (isCancelledRef.current) return

        const resultKeys = ["users", "orders", "analytics", "notifications"] as const
        resultKeys.forEach((key, i) => {
          updateWidget(i, {
            data: result[key].data,
            duration: result[key].duration,
            count: result[key].count,
            status: "success",
          })
        })
        setTotalDuration(result.totalDuration)
      } catch {
        if (!isCancelledRef.current) {
          setWidgets((prev) => prev.map((w) => ({ ...w, status: "error" as const })))
        }
      }

      if (timerRef.current) clearInterval(timerRef.current)
      setIsRunning(false)
    },
    [resetDashboard, updateWidget]
  )

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === "sequential" ? "parallel" : "sequential"))
    resetDashboard()
  }, [resetDashboard])

  const sequentialCode = `// Sequential - one after another
const users     = await fetch("/api/users");      // 2s
const orders    = await fetch("/api/orders");     // 2s
const analytics = await fetch("/api/analytics");  // 2s
const notifs    = await fetch("/api/notifications"); // 2s

// Total: 8 seconds (2+2+2+2)`

  const parallelCode = `// Parallel - all at the same time
const results = await Promise.all([
  fetch("/api/users"),        // 2s
  fetch("/api/orders"),       // 2s
  fetch("/api/analytics"),    // 2s
  fetch("/api/notifications") // 2s
]);

const [users, orders, analytics, notifs] = results;

// Total: ~2 seconds (max of all)`

  const fixPrompt = `My dashboard page loads slowly. I have multiple API calls on the same page and they seem to run one after another instead of at the same time.

Check my code for this issue:
- Look for multiple "await fetch()" calls in a row
- Each request waits for the previous one to finish
- Total load time = sum of all request times

If found, fix it by running all independent API calls in parallel using Promise.all:

Before (slow):
const data1 = await fetch("/api/endpoint1");
const data2 = await fetch("/api/endpoint2");
const data3 = await fetch("/api/endpoint3");

After (fast):
const [res1, res2, res3] = await Promise.all([
  fetch("/api/endpoint1"),
  fetch("/api/endpoint2"),
  fetch("/api/endpoint3"),
]);
const data1 = await res1.json();
const data2 = await res2.json();
const data3 = await res3.json();

Only use Promise.all when the API calls are independent - meaning no call needs data from another call before it can start.`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fixPrompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const timelineData = useMemo(() => {
    const names = ["Users", "Orders", "Analytics", "Notifications"]
    const sequential = names.map((name, i) => ({
      label: name,
      segments: [{ start: i * 25, end: (i + 1) * 25, color: "bg-red-400" }],
    }))
    const parallel = names.map((name) => ({
      label: name,
      segments: [{ start: 0, end: 25, color: "bg-emerald-400" }],
    }))
    return { sequential, parallel }
  }, [])

  return (
    <DemoPageLayout
      icon={Zap}
      title="Promise.all Performance Demo"
      subtitle="Sequential vs Parallel API Loading"
      mobileTitle="Performance Demo"
      headerRight={
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] font-[family-name:var(--font-jetbrains)] font-semibold tabular-nums transition-all duration-300 ${
          mode === "sequential"
            ? "bg-red-50 text-red-700 border border-red-200"
            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${isRunning ? "animate-pulse" : ""} ${
            mode === "sequential" ? "bg-red-500" : "bg-emerald-500"
          }`} />
          {timer}ms
        </div>
      }
    >
      {/* Hero Title */}
      <div className="mb-8 stagger-children">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
          <span className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-medium">Performance Benchmark</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-center tracking-tighter">
          <span className="bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-500 bg-clip-text text-transparent">
            Promise.all
          </span>
          <span className="text-zinc-300 mx-2">&middot;</span>
          <span className="text-zinc-600">Performance</span>
        </h2>
        <p className="text-center text-sm text-zinc-600 mt-2 max-w-lg mx-auto leading-relaxed">
          Watch how <span className="text-zinc-900 font-medium">parallel API calls</span> load your dashboard{" "}
          <span className="text-emerald-600 font-semibold">4x faster</span> than sequential fetching
        </p>
      </div>

      {/* Hero Timer */}
      <HeroTimerCard
        mode={mode}
        timer={timer}
        totalDuration={totalDuration}
        isRunning={isRunning}
        onRun={() => loadDashboard(mode)}
        onSwitch={toggleMode}
        onReset={resetDashboard}
      />

      {/* Tabs */}
      <DemoTabs
        value={activeTab}
        onValueChange={setActiveTab}
        testContent={
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 stagger-children">
            <PerformanceMetrics mode={mode} totalDuration={totalDuration} widgets={widgets} />
            {widgets.map((widget) => (
              <WidgetCard key={widget.name} widget={widget} />
            ))}
            <ConsoleOutput widgets={widgets} totalDuration={totalDuration} />
          </div>
        }
        explanationContent={
          <div className="space-y-6 stagger-children">
            <ExplanationCard
              icon={ZapOff}
              iconBg="bg-red-100"
              iconColor="text-red-600"
              title="What is Sequential Fetching?"
              description="Sequential fetching means you call each API one at a time, waiting for each to finish before starting the next. It's like waiting in a single line at a store."
              code={sequentialCode}
              cards={[
                { label: "Disadvantage", variant: "red", text: "Total time = sum of all requests. Slow for dashboards with many API calls." },
                { label: "When to Use", variant: "emerald", text: "When API B depends on data from API A. You need the first result before calling the next." },
              ]}
            />

            <ExplanationCard
              icon={Zap}
              iconBg="bg-emerald-100"
              iconColor="text-emerald-600"
              title="What is Promise.all?"
              description="Promise.all takes an array of promises and fires them all at once. It resolves when every promise finishes, or rejects if any one fails. It's like having multiple cashiers open."
              code={parallelCode}
              cards={[
                { label: "Advantage", variant: "emerald", text: "Total time = slowest request. 4x faster for independent API calls." },
                { label: "Gotcha", variant: "amber", text: "If one promise fails, the whole Promise.all rejects. Use Promise.allSettled() if you want partial results." },
              ]}
            />

            <div className="bento-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="size-3.5 text-zinc-500" />
                <h3 className="text-sm font-bold text-zinc-900">Side by Side Comparison</h3>
              </div>
              <CodeComparison mode={mode} />
            </div>

            <VisualTimeline
              sequential={timelineData.sequential}
              parallel={timelineData.parallel}
              sequentialTotal="8s"
              parallelTotal="2s"
            />

            <div className="bento-card p-6 border-l-4 border-violet-500">
              <h3 className="text-sm font-bold text-zinc-900 mb-2">Key Takeaway</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                When API calls are <span className="font-semibold text-zinc-900">independent</span> (no data depends on another),
                always use <span className="font-semibold text-violet-600">Promise.all</span> to run them in parallel.
                This can reduce your page load time from{" "}
                <span className="font-[family-name:var(--font-jetbrains)] text-red-600">O(n)</span> to{" "}
                <span className="font-[family-name:var(--font-jetbrains)] text-emerald-600">O(1)</span>.
              </p>
            </div>
          </div>
        }
        promptContent={
          <div className="space-y-4 stagger-children">
            <div className="bento-card overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-zinc-200">
                <span className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-medium">Copy this prompt to fix your dashboard</span>
                <Button
                  onClick={handleCopy}
                  size="sm"
                  variant={copied ? "default" : "outline"}
                  className={copied ? "bg-emerald-500 hover:bg-emerald-600 text-white" : "border-zinc-200"}
                >
                  {copied ? (
                    <>
                      <Check className="size-3.5" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <pre className="p-5 font-[family-name:var(--font-jetbrains)] text-[12px] leading-relaxed text-zinc-700 overflow-x-auto whitespace-pre-wrap">
                {fixPrompt}
              </pre>
            </div>
            <p className="text-[11px] text-zinc-500 text-center">
              Paste into Cursor, Bolt, Lovable, v0, ChatGPT, or Claude
            </p>
          </div>
        }
      />

      <footer className="text-center text-[11px] text-zinc-500 py-8 mt-4">
        JSONPlaceholder API &middot; 2s artificial delay &middot; Next.js + shadcn/ui + Inter
      </footer>
    </DemoPageLayout>
  )
}
