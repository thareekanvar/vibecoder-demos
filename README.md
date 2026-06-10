# Vibecoder Demos

Interactive coding demos for the [vibewiththareek](https://www.youtube.com/@thareekanvar) YouTube channel. Each demo explains a JavaScript/React concept with a live test and a detailed explanation.

## Demos

| Demo | What it covers |
|------|---------------|
| [Promise.all vs Sequential](/demo/promise-all) | Parallel vs sequential API fetching — why `Promise.all` is 4x faster |

## Tech Stack

- **Next.js 16** (Turbopack)
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui** (sidebar-07 block)
- **Lucide Icons**
- **JSONPlaceholder API** (with 2s artificial delay)

## Getting Started

```bash
git clone https://github.com/YOUR_USERNAME/vibecoder-demos.git
cd vibecoder-demos
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Adding a New Demo

1. Add demo metadata to `src/lib/demos.ts`:

```ts
{
  slug: "my-new-demo",
  title: "My New Demo",
  description: "What this demo teaches",
  icon: Zap,
  keywords: ["topic1", "topic2"],
}
```

2. Create the demo component in `src/components/demos/MyNewDemo.tsx`:

```tsx
"use client"

import DemoPageLayout from "@/components/demo/DemoPageLayout"
import HeroTimerCard from "@/components/demo/HeroTimerCard"
import DemoTabs from "@/components/demo/DemoTabs"
import ExplanationCard from "@/components/demo/ExplanationCard"

export default function MyNewDemo() {
  // demo logic here

  return (
    <DemoPageLayout icon={Zap} title="My Demo" subtitle="Description">
      <DemoTabs
        value={activeTab}
        onValueChange={setActiveTab}
        testContent={<>{/* live test */}</>}
        explanationContent={<>{/* explanation */}</>}
      />
    </DemoPageLayout>
  )
}
```

3. Register the component in `src/app/demo/[slug]/page.tsx`:

```ts
import MyNewDemo from "@/components/demos/MyNewDemo"

const demoComponents = {
  "promise-all": PromiseAllDemo,
  "my-new-demo": MyNewDemo,
}
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Redirects to first demo
│   └── demo/[slug]/page.tsx        # Dynamic demo route
├── components/
│   ├── demo/                       # Reusable demo components
│   │   ├── DemoPageLayout.tsx      # Header + sidebar + main wrapper
│   │   ├── HeroTimerCard.tsx       # Timer + controls
│   │   ├── ConsoleOutput.tsx       # Live loading logs
│   │   ├── DemoTabs.tsx            # Test / Explanation tabs
│   │   ├── ExplanationCard.tsx     # Code + info cards
│   │   └── VisualTimeline.tsx      # Bar chart timeline
│   ├── demos/                      # Individual demos
│   │   └── PromiseAllDemo.tsx
│   ├── ui/                         # shadcn components
│   ├── app-sidebar.tsx             # Sidebar with demo list
│   └── nav-user.tsx                # YouTube channel link
└── lib/
    ├── demos.ts                    # Demo registry
    ├── api.ts                      # API fetchers
    └── types.ts                    # TypeScript types
```

## Quick Fix for Vibe Coders

Copy-paste this prompt into Cursor, Bolt, Lovable, or any AI tool to fix the Promise.all demo dashboard fast.

### Fix Promise.all Dashboard

```
My Promise.all vs Sequential demo dashboard is broken. It's a Next.js 16 + shadcn/ui project with:
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
10. If dashboard is blank, check browser console and terminal for the first error
```

## License

MIT
