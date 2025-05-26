"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Zap, BarChart3, Bot, Code } from "lucide-react"

export function FeaturesSection() {
  const [activeTab, setActiveTab] = useState("processing")

  const features = [
    {
      id: "processing",
      title: "Fast Processing",
      icon: <Zap className="h-10 w-10 text-primary" />,
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
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
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
      icon: <Bot className="h-10 w-10 text-primary" />,
      description: "Create specialized AI assistants tailored to your specific needs.",
      image: "/placeholder.svg?height=300&width=500",
      details: ["Domain-specific knowledge integration", "Customizable personality and tone", "Multi-language support"],
    },
    {
      id: "code",
      title: "Code Generation",
      icon: <Code className="h-10 w-10 text-primary" />,
      description: "Generate code snippets and complete functions in multiple languages.",
      image: "/placeholder.svg?height=300&width=500",
      details: ["Supports 20+ programming languages", "Code explanation and documentation", "Bug detection and fixing"],
    },
  ]

  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 -z-10 bg-grid opacity-[0.02]"></div>
      <div className="absolute top-0 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-secondary/5 blur-[100px]"></div>

      <div className="container">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary border-primary/20">
              Features
            </span>
            <h2 className="mb-4">Powerful AI Features</h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground">
              Leverage cutting-edge AI models to transform your workflow and boost productivity.
            </p>
          </motion.div>
        </div>

        <Tabs defaultValue="processing" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-transparent h-auto p-0 mb-8">
            {features.map((feature) => (
              <TabsTrigger
                key={feature.id}
                value={feature.id}
                className="flex flex-col items-center gap-3 p-4 border rounded-lg data-[state=active]:shadow-medium data-[state=active]:border-primary/50 transition-all duration-200 h-full data-[state=active]:bg-primary/5"
              >
                <div className="p-3 rounded-lg bg-primary/10">{feature.icon}</div>
                <span className="font-medium">{feature.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {features.map((feature) => (
            <TabsContent key={feature.id} value={feature.id} className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                      <p className="text-muted-foreground mb-6">{feature.description}</p>
                      <ul className="space-y-3">
                        {feature.details.map((detail, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="bg-muted rounded-lg overflow-hidden"
                    >
                      <img
                        src={feature.image || "/placeholder.svg"}
                        alt={feature.title}
                        className="w-full h-auto object-cover"
                      />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
