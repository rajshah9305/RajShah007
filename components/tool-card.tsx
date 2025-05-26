"use client"

import { useState, type ReactNode } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

interface ToolCardProps {
  icon: ReactNode
  title: string
  description: string
  tag?: string
}

export default function ToolCard({ icon, title, description, tag }: ToolCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card
        className={`overflow-hidden transition-all duration-500 card-premium ${
          isHovered ? "transform-gpu -translate-y-2" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div
              className={`p-3 rounded-xl text-primary transition-all duration-500 ${
                isHovered ? "bg-primary/10 scale-110" : "bg-primary/5"
              }`}
            >
              {icon}
            </div>
            {tag && (
              <Badge
                variant={tag === "New" ? "default" : tag === "Popular" ? "secondary" : "outline"}
                className={`${tag === "New" ? "animate-pulse" : ""}`}
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
            <ArrowRight className={`h-4 w-4 transition-transform duration-500 ${isHovered ? "translate-x-2" : ""}`} />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
