import { LucideIcon, Zap } from "lucide-react"

export interface Demo {
  slug: string
  title: string
  description: string
  icon: LucideIcon
  keywords: string[]
}

export const demos: Demo[] = [
  {
    slug: "promise-all",
    title: "Promise.all vs Sequential",
    description: "Watch how parallel API calls load your dashboard 4x faster than sequential fetching",
    icon: Zap,
    keywords: ["async", "promise", "parallel", "sequential", "performance"],
  },
]

export function getDemo(slug: string): Demo | undefined {
  return demos.find((d) => d.slug === slug)
}
