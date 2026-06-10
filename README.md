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

Copy-paste these prompts into Cursor, Bolt, Lovable, or any AI tool to fix common issues fast.

### Dashboard not loading / blank screen

```
Fix my Next.js dashboard that shows a blank screen. Check:
1. Import paths - make sure all imports use @/ alias correctly
2. "use client" directive is missing on any component that uses useState/useEffect
3. The page.tsx is importing the right component
4. No missing npm packages - run npm install
5. Check terminal for build errors with npm run build
```

### Sidebar not showing / broken layout

```
Fix my shadcn sidebar layout. The sidebar is not visible or the main content overlaps it.
1. Make sure layout.tsx wraps everything in <SidebarProvider>
2. <AppSidebar /> should be inside SidebarProvider but BEFORE <SidebarInset>
3. Main page content should be inside <SidebarInset>
4. Import SidebarProvider, SidebarInset from "@/components/ui/sidebar"
```

### Tailwind classes not working / no styles

```
Fix my Tailwind CSS classes not applying. This is a Next.js 16 + Tailwind v4 project.
1. Make sure globals.css starts with @import "tailwindcss" (not @tailwind directives)
2. CSS variables use oklch() format, not hsl()
3. There is no tailwind.config.ts needed in v4 - config is in globals.css
4. Run npm run dev to restart the dev server
```

### TypeScript errors / import errors

```
Fix TypeScript errors in my Next.js project.
1. Import React types: import type { ... } from "react"
2. Use "use client" at top of any file with hooks (useState, useEffect, etc)
3. For Lucide icons: import { IconName } from "lucide-react"
4. For shadcn components: import from "@/components/ui/component-name"
```

### shadcn components not found

```
Fix "Module not found" for shadcn components.
1. Run: npx shadcn@latest add button card tabs separator
2. Components install to src/components/ui/
3. Import like: import { Button } from "@/components/ui/button"
4. Do NOT edit files in node_modules/ - edit the ones in src/components/ui/
```

### Adding a new demo page

```
Add a new demo to my Next.js app. The app uses dynamic routes at /demo/[slug].
1. Add demo to src/lib/demos.ts with slug, title, icon
2. Create src/components/demos/NewDemo.tsx
3. Register in src/app/demo/[slug]/page.tsx demoComponents map
4. The sidebar auto-discovers demos from the registry
```

## License

MIT
