"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, MessageSquare, Code, ImageIcon, Bot, BarChart3, Zap } from "lucide-react"

interface ToolCardProps {
  icon: React.ReactNode
  title: string
  description: string
  tag?: string
  delay?: number
}

function ToolCard({ icon, title, description, tag, delay = 0 }: ToolCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      viewport={{ once: true }}
    >
      <Card
        className="overflow-hidden transition-all duration-300 card-hover"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div
              className={`p-3 rounded-lg text-primary transition-all duration-300 ${
                isHovered ? "bg-primary/15 scale-105" : "bg-primary/10"
              }`}
            >
              {icon}
            </div>
            {tag && (
              <Badge
                variant={tag === "New" ? "default" : tag === "Popular" ? "secondary" : "outline"}
                className={tag === "New" ? "animate-pulse" : ""}
              >
                {tag}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="pb-4">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" className="w-full justify-between group">
            <span>Try it now</span>
            <ArrowRight className={`h-4 w-4 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`} />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export function ToolsSection() {
  return (
    <section id="tools" className="py-24 relative">
      <div className="absolute inset-0 -z-10 bg-grid opacity-[0.02]"></div>
      <div className="absolute top-0 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]"></div>

      <div className="container">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ToolCard
            icon={<MessageSquare className="h-6 w-6" />}
            title="AI Chat Assistant"
            description="Conversational AI powered by state-of-the-art language models."
            tag="Popular"
            delay={0.1}
          />
          <ToolCard
            icon={<Code className="h-6 w-6" />}
            title="Code Generator"
            description="Generate code snippets and complete functions in multiple languages."
            tag="New"
            delay={0.2}
          />
          <ToolCard
            icon={<ImageIcon className="h-6 w-6" />}
            title="Image Generator"
            description="Create stunning images from text descriptions with diffusion models."
            delay={0.3}
          />
          <ToolCard
            icon={<Bot className="h-6 w-6" />}
            title="Custom Agents"
            description="Build specialized AI agents that can perform complex tasks."
            delay={0.4}
          />
          <ToolCard
            icon={<BarChart3 className="h-6 w-6" />}
            title="Data Analyzer"
            description="Extract insights and visualize patterns in your data automatically."
            delay={0.5}
          />
          <ToolCard
            icon={<Zap className="h-6 w-6" />}
            title="Workflow Automation"
            description="Automate repetitive tasks with intelligent AI workflows."
            tag="Beta"
            delay={0.6}
          />
        </div>
      </div>
    </section>
  )
}
