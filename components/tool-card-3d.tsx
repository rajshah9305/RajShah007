"use client"

import type React from "react"

import { useState, useRef, type ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ToolCard3DProps {
  children: ReactNode
  color?: string
  className?: string
}

export default function ToolCard3D({ children, color = "from-primary to-violet-500", className }: ToolCard3DProps) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [scale, setScale] = useState(1)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()

    // Calculate mouse position relative to card center
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX
    const mouseY = e.clientY

    // Calculate rotation based on mouse position
    // Limit rotation to a small range for subtle effect
    const rotateXValue = ((mouseY - centerY) / (rect.height / 2)) * 5
    const rotateYValue = ((centerX - mouseX) / (rect.width / 2)) * 5

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseEnter = () => {
    setScale(1.02)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setScale(1)
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn("relative rounded-2xl overflow-hidden transition-all duration-300", className)}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Gradient border */}
      <div className={cn("absolute inset-0 bg-gradient-to-r", color)} />

      {/* Inner content with glass effect */}
      <div className="absolute inset-[1px] bg-card rounded-2xl backdrop-blur-sm flex flex-col">{children}</div>

      {/* Shine effect */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-300"
        style={{
          background: `linear-gradient(
            ${45 + rotateY * 10}deg, 
            rgba(255, 255, 255, 0) 0%, 
            rgba(255, 255, 255, 1) 50%, 
            rgba(255, 255, 255, 0) 100%
          )`,
        }}
      />
    </motion.div>
  )
}
