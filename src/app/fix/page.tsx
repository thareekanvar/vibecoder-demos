"use client"

import { useState } from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Copy, Check, Wrench } from "lucide-react"

const fixPrompt = `My Promise.all vs Sequential demo dashboard is broken. It's a Next.js 16 + shadcn/ui project with:
- Dynamic route at /demo/[slug]
- Sidebar using shadcn sidebar-07 block
- Tabs: Test and Explanation
- JSONPlaceholder API with 2s delay
- Timer showing sequential (8s) vs parallel (2s)

Fix these common issues:
1. Import errors: all components use @/ alias. Example: import { Button } from "@/components/ui/button"
2. "use client" required on any component using useState, useEffect, or refs
3. Sidebar must be inside <SidebarProvider> in layout.tsx, main content inside <SidebarInset>
4. Tabs use shadcn base-ui pattern: <TabsTrigger value="test"> not asChild prop
5. Lucide icons: import { Zap } from "lucide-react" - no default export
6. Widget icons must be LucideIcon type: import type { LucideIcon } from "lucide-react"
7. Timer uses useRef for setInterval cleanup - check for memory leaks
8. Tailwind v4: CSS vars use oklch(), no tailwind.config.ts needed
9. Run npm run build to check for TypeScript errors before npm run dev
10. If dashboard is blank, check browser console and terminal for the first error`

export default function FixPage() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fixPrompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-zinc-200 bg-white/80 backdrop-blur-2xl px-4 lg:px-6 h-14">
        <SidebarTrigger className="text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100" />
        <Separator orientation="vertical" className="h-4 bg-zinc-200" />
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center size-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/25">
            <Wrench className="size-3.5 text-white" />
          </div>
          <h1 className="text-[13px] font-bold text-zinc-900 tracking-tight">Fix Dashboard</h1>
        </div>
      </header>

      <main className="p-4 lg:p-6 max-w-[900px] mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 tracking-tight">
            Copy-Paste Fix Prompt
          </h2>
          <p className="text-sm text-zinc-600 mt-2">
            Paste this into Cursor, Bolt, Lovable, or any AI tool to fix your Promise.all dashboard.
          </p>
        </div>

        <div className="bento-card relative overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-zinc-200">
            <span className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-medium">AI Prompt</span>
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

        <div className="mt-6 text-center text-[11px] text-zinc-500">
          Works with Cursor, Bolt, Lovable, v0, ChatGPT, Claude
        </div>
      </main>
    </div>
  )
}
