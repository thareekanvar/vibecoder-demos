import { notFound } from "next/navigation"
import { demos, getDemo } from "@/lib/demos"
import PromiseAllDemo from "@/components/demos/PromiseAllDemo"

const demoComponents: Record<string, React.ComponentType> = {
  "promise-all": PromiseAllDemo,
}

export function generateStaticParams() {
  return demos.map((demo) => ({ slug: demo.slug }))
}

export default async function DemoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const demo = getDemo(slug)

  if (!demo) {
    notFound()
  }

  const DemoComponent = demoComponents[slug]

  if (!DemoComponent) {
    notFound()
  }

  return <DemoComponent />
}
