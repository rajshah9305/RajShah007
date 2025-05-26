"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Zap, BarChart3, Bot, Code, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import FeatureCard3D from "@/components/feature-card-3d"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function FeaturesSection() {
  const [activeTab, setActiveTab] = useState("processing")
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const features = [
    {
      id: "processing",
      title: "Fast Processing",
      icon: <Zap className="h-10 w-10 text-primary" />,
      description: "Process data and generate content in seconds with optimized AI models.",
      image: "/images/features/processing.svg",
      details: [
        "10x faster than traditional methods",
        "Optimized for real-time applications",
        "Parallel processing capabilities",
      ],
      color: "from-violet-600 to-indigo-600",
    },
    {
      id: "analytics",
      title: "Advanced Analytics",
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
      description: "Gain insights from your data with AI-powered analytics and visualization.",
      image: "/images/features/analytics.svg",
      details: [
        "Predictive analytics and forecasting",
        "Anomaly detection and pattern recognition",
        "Interactive dashboards and reports",
      ],
      color: "from-cyan-600 to-teal-600",
    },
    {
      id: "assistants",
      title: "Custom Assistants",
      icon: <Bot className="h-10 w-10 text-primary" />,
      description: "Create specialized AI assistants tailored to your specific needs.",
      image: "/images/features/assistants.svg",
      details: ["Domain-specific knowledge integration", "Customizable personality and tone", "Multi-language support"],
      color: "from-pink-600 to-rose-600",
    },
    {
      id: "code",
      title: "Code Generation",
      icon: <Code className="h-10 w-10 text-primary" />,
      description: "Generate code snippets and complete functions in multiple languages.",
      image: "/images/features/code.svg",
      details: ["Supports 20+ programming languages", "Code explanation and documentation", "Bug detection and fixing"],
      color: "from-amber-600 to-orange-600",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="features" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 -z-10 bg-grid opacity-[0.02]"></div>
      <div className="absolute top-0 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-secondary/5 blur-[100px]"></div>

      <div className="container">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
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
          <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-transparent h-auto p-0 mb-8">
              {features.map((feature, index) => (
                <motion.div key={feature.id} variants={itemVariants}>
                  <TabsTrigger
                    value={feature.id}
                    className={cn(
                      "flex flex-col items-center gap-3 p-4 border rounded-lg transition-all duration-500 h-full",
                      "data-[state=active]:shadow-lg data-[state=active]:border-primary/50",
                      "data-[state=active]:bg-primary/5 hover:bg-primary/5",
                      "group",
                    )}
                  >
                    <div
                      className={cn(
                        "p-3 rounded-lg bg-primary/10 transition-all duration-500",
                        "group-data-[state=active]:bg-primary/20 group-hover:bg-primary/20",
                        "group-data-[state=active]:scale-110 group-hover:scale-110",
                      )}
                    >
                      {feature.icon}
                    </div>
                    <span className="font-medium">{feature.title}</span>
                  </TabsTrigger>
                </motion.div>
              ))}
            </TabsList>
          </motion.div>

          {features.map((feature) => (
            <TabsContent key={feature.id} value={feature.id} className="mt-0">
              <FeatureCard3D color={feature.color}>
                <div className="grid md:grid-cols-2 gap-8 items-center p-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground mb-6">{feature.description}</p>
                    <ul className="space-y-3 mb-8">
                      {feature.details.map((detail, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                            <Check className="h-3 w-3 text-primary" />
                          </div>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="group">
                      Learn more
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-muted rounded-lg overflow-hidden"
                  >
                    <Image
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.title}
                      width={500}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                  </motion.div>
                </div>
              </FeatureCard3D>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
