"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import ToolCard3D from "@/components/tool-card-3d"
import Image from "next/image"

interface ToolCardProps {
  icon: string
  title: string
  description: string
  tag?: string
  delay?: number
  color?: string
}

export function ToolsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const arrowVariants = {
    rest: { x: 0 },
    hover: { x: 5 },
  }

  const tools: ToolCardProps[] = [
    {
      icon: "/images/tools/chat.svg",
      title: "AI Chat Assistant",
      description: "Conversational AI powered by state-of-the-art language models.",
      tag: "Popular",
      delay: 0.1,
      color: "from-primary to-violet-500",
    },
    {
      icon: "/images/tools/code.svg",
      title: "Code Generator",
      description: "Generate code snippets and complete functions in multiple languages.",
      tag: "New",
      delay: 0.2,
      color: "from-cyan-600 to-blue-600",
    },
    {
      icon: "/images/tools/image.svg",
      title: "Image Generator",
      description: "Create stunning images from text descriptions with diffusion models.",
      delay: 0.3,
      color: "from-pink-600 to-rose-600",
    },
    {
      icon: "/images/tools/agent.svg",
      title: "Custom Agents",
      description: "Build specialized AI agents that can perform complex tasks.",
      delay: 0.4,
      color: "from-amber-600 to-orange-600",
    },
    {
      icon: "/images/tools/data.svg",
      title: "Data Analyzer",
      description: "Extract insights and visualize patterns in your data automatically.",
      delay: 0.5,
      color: "from-emerald-600 to-green-600",
    },
    {
      icon: "/images/tools/workflow.svg",
      title: "Workflow Automation",
      description: "Automate repetitive tasks with intelligent AI workflows.",
      tag: "Beta",
      delay: 0.6,
      color: "from-indigo-600 to-blue-600",
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
    <section id="tools" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 -z-10 bg-grid opacity-[0.02]"></div>
      <div className="absolute top-0 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]"></div>

      <div className="container">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-accent/10 text-accent border-accent/20">
              Tools Gallery
            </span>
            <h2 className="mb-4">AI Tools Gallery</h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground">
              Explore our collection of specialized AI tools designed for various tasks.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {tools.map((tool, index) => (
            <motion.div key={index} variants={itemVariants}>
              <ToolCard3D color={tool.color}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="p-3 rounded-lg flex items-center justify-center">
                      <Image src={tool.icon || "/placeholder.svg"} alt={tool.title} width={64} height={64} />
                    </div>
                    {tool.tag && (
                      <Badge
                        variant={tool.tag === "New" ? "default" : tool.tag === "Popular" ? "secondary" : "outline"}
                        className={tool.tag === "New" ? "animate-pulse" : ""}
                      >
                        {tool.tag}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
                  <p className="text-muted-foreground">{tool.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" asChild>
                    <motion.button
                      className="w-full justify-between group flex items-center" // Retain original classes, ensure flex for proper alignment
                      whileHover="hover"
                      initial="rest"
                      animate="rest"
                    >
                      <span>Try it now</span>
                      <motion.span
                        variants={arrowVariants}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        className="inline-block" // Added inline-block for motion.span
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.span>
                    </motion.button>
                  </Button>
                </CardFooter>
              </ToolCard3D>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
