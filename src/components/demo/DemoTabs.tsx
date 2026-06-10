"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FlaskConical, BookOpen, Wand2 } from "lucide-react"

interface DemoTabsProps {
  value: string
  onValueChange: (value: string) => void
  testContent: React.ReactNode
  explanationContent: React.ReactNode
  promptContent: React.ReactNode
}

export default function DemoTabs({
  value,
  onValueChange,
  testContent,
  explanationContent,
  promptContent,
}: DemoTabsProps) {
  return (
    <Tabs defaultValue="test" value={value} onValueChange={onValueChange}>
      <div className="scroll-mt-20">
        <TabsList variant="line" className="mb-4">
          <TabsTrigger value="test" className="gap-1.5">
            <FlaskConical className="size-3.5" />
            Test
          </TabsTrigger>
          <TabsTrigger value="explanation" className="gap-1.5">
            <BookOpen className="size-3.5" />
            Explanation
          </TabsTrigger>
          <TabsTrigger value="prompt" className="gap-1.5">
            <Wand2 className="size-3.5" />
            Prompt
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="test">{testContent}</TabsContent>
      <TabsContent value="explanation">{explanationContent}</TabsContent>
      <TabsContent value="prompt">{promptContent}</TabsContent>
    </Tabs>
  )
}
