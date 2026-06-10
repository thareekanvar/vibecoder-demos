"use client"

import { Layers } from "lucide-react"

interface TimelineEntry {
  label: string
  segments: { start: number; end: number; color: string }[]
}

interface VisualTimelineProps {
  sequential: TimelineEntry[]
  parallel: TimelineEntry[]
  sequentialTotal: string
  parallelTotal: string
}

function TimelineRow({ entry }: { entry: TimelineEntry }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] text-zinc-500 w-24 font-[family-name:var(--font-jetbrains)]">
        {entry.label}
      </span>
      <div className="flex-1 h-5 bg-zinc-100 rounded-full overflow-hidden relative">
        {entry.segments.map((seg, i) => (
          <div
            key={i}
            className={`absolute h-full rounded-full ${seg.color}`}
            style={{ left: `${seg.start}%`, width: `${seg.end - seg.start}%` }}
          />
        ))}
      </div>
      <span className="text-[10px] text-zinc-400 w-12 text-right font-[family-name:var(--font-jetbrains)]">
        {entry.segments.length > 0
          ? `${(entry.segments[0].start / 100 * 8).toFixed(0)}s-${(entry.segments[0].end / 100 * 8).toFixed(0)}s`
          : ""}
      </span>
    </div>
  )
}

export default function VisualTimeline({
  sequential,
  parallel,
  sequentialTotal,
  parallelTotal,
}: VisualTimelineProps) {
  return (
    <div className="bento-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <Layers className="size-3.5 text-zinc-500" />
        <h3 className="text-sm font-bold text-zinc-900">Visual Timeline</h3>
      </div>
      <div className="space-y-4">
        {/* Sequential */}
        <div>
          <span className="text-[10px] text-red-600 uppercase tracking-[0.15em] font-semibold">Sequential</span>
          <div className="mt-2 space-y-1.5">
            {sequential.map((entry) => (
              <TimelineRow key={entry.label} entry={entry} />
            ))}
            <div className="flex items-center gap-2 pt-2 border-t border-zinc-200">
              <span className="text-[11px] text-zinc-500 w-24 font-semibold">Total</span>
              <div className="flex-1 h-3 bg-zinc-100 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full w-full" />
              </div>
              <span className="text-[11px] text-red-600 font-semibold w-12 text-right font-[family-name:var(--font-jetbrains)]">
                {sequentialTotal}
              </span>
            </div>
          </div>
        </div>

        {/* Parallel */}
        <div>
          <span className="text-[10px] text-emerald-600 uppercase tracking-[0.15em] font-semibold">Promise.all</span>
          <div className="mt-2 space-y-1.5">
            {parallel.map((entry) => (
              <TimelineRow key={entry.label} entry={entry} />
            ))}
            <div className="flex items-center gap-2 pt-2 border-t border-zinc-200">
              <span className="text-[11px] text-zinc-500 w-24 font-semibold">Total</span>
              <div className="flex-1 h-3 bg-zinc-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-1/4" />
              </div>
              <span className="text-[11px] text-emerald-600 font-semibold w-12 text-right font-[family-name:var(--font-jetbrains)]">
                {parallelTotal}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
