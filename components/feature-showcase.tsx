"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Zap, BarChart3, Bot, Code } from "lucide-react"

export default function FeatureShowcase() {
  const [activeTab, setActiveTab] = useState("processing")

  const features = [
    {
      id: "processing",
      title: "Fast Processing",
      icon: <Zap className="h-12 w-12 text-teal-600 mb-4" />,
      description: "Process data and generate content in seconds with optimized AI models.",
      image: "/placeholder.svg?height=300&width=500",
      details: [
        "10x faster than traditional methods",
        "Optimized for real-time applications",
        "Parallel processing capabilities",
      ],
    },
    {
      id: "analytics",
      title: "Advanced Analytics",
      icon: <BarChart3 className="h-12 w-12 text-teal-600 mb-4" />,
      description: "Gain insights from your data with AI-powered analytics and visualization.",
      image: "/placeholder.svg?height=300&width=500",
      details: [
        "Predictive analytics and forecasting",
        "Anomaly detection and pattern recognition",
        "Interactive dashboards and reports",
      ],
    },
    {
      id: "assistants",
      title: "Custom Assistants",
      icon: <Bot className="h-12 w-12 text-teal-600 mb-4" />,
      description: "Create specialized AI assistants tailored to your specific needs.",
      image: "/placeholder.svg?height=300&width=500",
      details: ["Domain-specific knowledge integration", "Customizable personality and tone", "Multi-language support"],
    },
    {
      id: "code",
      title: "Code Generation",
      icon: <Code className="h-12 w-12 text-teal-600 mb-4" />,
      description: "Generate code snippets and complete functions in multiple languages.",
      image: "/placeholder.svg?height=300&width=500",
      details: ["Supports 20+ programming languages", "Code explanation and documentation", "Bug detection and fixing"],
    },
  ]

  return (
    <Tabs defaultValue="processing" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-transparent h-auto p-0 mb-8">
        {features.map((feature) => (
          <TabsTrigger
            key={feature.id}
            value={feature.id}
            className={`
              data-[state=active]:shadow-lg data-[state=active]:border-teal-600
              flex flex-col items-center gap-2 p-4 border rounded-lg
              transition-all duration-200 h-full
              data-[state=active]:bg-white data-[state=active]:text-teal-600
            `}
          >
            {feature.icon}
            <span>{feature.title}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      {features.map((feature) => (
        <TabsContent key={feature.id} value={feature.id} className="mt-0">
          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground mb-6">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.details.map((detail, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-teal-600"></div>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-slate-100 rounded-lg overflow-hidden">
                  <img
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  )
}
