"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

interface PricingCardProps {
  title: string
  price: string
  description: string
  features: string[]
  buttonText: string
  buttonVariant: "default" | "outline" | "secondary"
  highlighted?: boolean
}

export default function PricingCard({
  title,
  price,
  description,
  features,
  buttonText,
  buttonVariant,
  highlighted = false,
}: PricingCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: highlighted ? 0.2 : 0 }}
      viewport={{ once: true }}
    >
      <Card
        className={`flex flex-col transition-all duration-500 ${
          highlighted
            ? `border-primary shadow-lg relative ${isHovered ? "transform-gpu -translate-y-3" : ""}`
            : isHovered
              ? "shadow-md transform-gpu -translate-y-2"
              : ""
        } ${highlighted ? "card-premium" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {highlighted && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className="bg-gradient-to-r from-primary to-secondary text-white text-xs font-medium px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Most Popular
            </span>
          </div>
        )}
        <CardHeader className={`pb-8 ${highlighted ? "pt-8" : ""}`}>
          <h3 className="text-xl font-bold">{title}</h3>
          <div className="mt-4 flex items-baseline">
            <span className={`text-3xl font-extrabold ${highlighted ? "text-gradient-primary" : ""}`}>{price}</span>
            {price !== "Free" && <span className="ml-1 text-muted-foreground">/month</span>}
          </div>
          <p className="text-sm text-muted-foreground mt-2">{description}</p>
        </CardHeader>
        <CardContent className="flex-1">
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <div
                  className={`rounded-full p-0.5 ${
                    highlighted ? "bg-primary/20 text-primary" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  <Check className="h-4 w-4" />
                </div>
                <span className="text-sm ml-2">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="pt-6">
          <Button
            variant={buttonVariant}
            className={`w-full transition-all ${
              buttonVariant === "default"
                ? "bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                : ""
            } ${isHovered ? "transform-gpu scale-[1.02]" : ""}`}
          >
            {buttonText}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
