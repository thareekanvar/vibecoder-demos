"use client"

import type { LucideIcon } from "lucide-react"

interface InfoCard {
  label: string
  variant: "red" | "emerald" | "amber"
  text: string
}

interface ExplanationCardProps {
  icon: LucideIcon
  iconBg: string
  iconColor: string
  title: string
  description: string
  code: string
  cards: InfoCard[]
}

const variantStyles = {
  red: "border-red-200 bg-red-50",
  emerald: "border-emerald-200 bg-emerald-50",
  amber: "border-amber-200 bg-amber-50",
}

const labelStyles = {
  red: "text-red-600",
  emerald: "text-emerald-600",
  amber: "text-amber-600",
}

const textStyles = {
  red: "text-red-700",
  emerald: "text-emerald-700",
  amber: "text-amber-700",
}

export default function ExplanationCard({
  icon: Icon,
  iconBg,
  iconColor,
  title,
  description,
  code,
  cards,
}: ExplanationCardProps) {
  return (
    <div className="bento-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className={`flex items-center justify-center size-6 rounded-lg ${iconBg}`}>
          <Icon className={`size-3.5 ${iconColor}`} />
        </span>
        <h3 className="text-sm font-bold text-zinc-900">{title}</h3>
      </div>
      <div className="space-y-3 text-sm text-zinc-600 leading-relaxed">
        <p>{description}</p>
        <div className="bg-zinc-50 rounded-lg p-4">
          <span className="text-[10px] text-zinc-500 uppercase tracking-[0.15em] font-medium">Code Example</span>
          <pre className="mt-2 font-[family-name:var(--font-jetbrains)] text-[12px] text-zinc-700 leading-relaxed overflow-x-auto">
            <code>{code}</code>
          </pre>
        </div>
        {cards.length > 0 && (
          <div className={`grid gap-3 mt-3 ${cards.length === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
            {cards.map((card) => (
              <div key={card.label} className={`rounded-lg border p-3 ${variantStyles[card.variant]}`}>
                <span className={`text-[10px] uppercase tracking-[0.15em] font-semibold ${labelStyles[card.variant]}`}>
                  {card.label}
                </span>
                <p className={`text-xs mt-1 ${textStyles[card.variant]}`}>{card.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
