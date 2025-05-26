"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Sparkles } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface PricingCardProps {
  title: string
  price: {
    monthly: string
    annual: string
  }
  description: string
  features: string[]
  buttonText: string
  buttonVariant: "default" | "outline" | "secondary"
  highlighted?: boolean
  delay?: number
  billingCycle: "monthly" | "annual"
}

function PricingCard({
  title,
  price,
  description,
  features,
  buttonText,
  buttonVariant,
  highlighted = false,
  delay = 0,
  billingCycle,
}: PricingCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Display the current price based on billing cycle
  const displayPrice = billingCycle === "monthly" ? price.monthly : price.annual
  const isFree = displayPrice === "$0"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <Card
        className={`flex flex-col transition-all duration-300 ${
          highlighted
            ? `border-primary shadow-medium relative ${isHovered ? "transform -translate-y-2" : ""}`
            : isHovered
              ? "shadow-medium transform -translate-y-1"
              : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {highlighted && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className="bg-primary text-primary-foreground text-xs font-medium px-4 py-1.5 rounded-full shadow-medium flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Most Popular
            </span>
          </div>
        )}
        <CardHeader className={`pb-8 ${highlighted ? "pt-8" : ""}`}>
          <h3 className="text-xl font-bold">{title}</h3>
          <div className="mt-4 flex items-baseline">
            <span className={`text-3xl font-extrabold ${highlighted ? "text-primary" : ""}`}>{displayPrice}</span>
            {!isFree && (
              <span className="ml-1 text-muted-foreground">{billingCycle === "monthly" ? "/month" : "/year"}</span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-2">{description}</p>
        </CardHeader>
        <CardContent className="flex-1">
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <div
                  className={`rounded-full p-0.5 ${
                    highlighted ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
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
            className={`w-full transition-all ${isHovered ? "transform scale-[1.02]" : ""}`}
          >
            {buttonText}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")

  // Define pricing data
  const pricingPlans = [
    {
      title: "Free",
      price: {
        monthly: "$0",
        annual: "$0",
      },
      description: "Perfect for trying out our platform.",
      features: [
        "Access to basic AI models",
        "5 AI generations per day",
        "Standard response time",
        "Community support",
      ],
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
      delay: 0.1,
    },
    {
      title: "Pro",
      price: {
        monthly: "$29",
        annual: "$249",
      },
      description: "For professionals and small teams.",
      features: [
        "Access to all AI models",
        "Unlimited AI generations",
        "Priority response time",
        "Email support",
        "API access",
        "Custom AI training",
      ],
      buttonText: "Subscribe",
      buttonVariant: "default" as const,
      highlighted: true,
      delay: 0.2,
    },
    {
      title: "Enterprise",
      price: {
        monthly: "$99",
        annual: "$990",
      },
      description: "For organizations with advanced needs.",
      features: [
        "Everything in Pro",
        "Dedicated instance",
        "99.9% uptime SLA",
        "24/7 phone support",
        "Custom integrations",
        "Advanced analytics",
        "User role management",
      ],
      buttonText: "Contact Sales",
      buttonVariant: "secondary" as const,
      delay: 0.3,
    },
  ]

  // Calculate annual savings percentage for the Pro plan
  const monthlyPrice = Number.parseFloat(pricingPlans[1].price.monthly.replace("$", "")) * 12
  const annualPrice = Number.parseFloat(pricingPlans[1].price.annual.replace("$", ""))
  const savingsPercentage = Math.round(((monthlyPrice - annualPrice) / monthlyPrice) * 100)

  return (
    <section id="pricing" className="py-24 relative">
      <div className="absolute inset-0 -z-10 bg-grid opacity-[0.02]"></div>
      <div className="absolute top-0 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-secondary/5 blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[100px]"></div>

      <div className="container">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-secondary/10 text-secondary border-secondary/20">
              Pricing
            </span>
            <h2 className="mb-4">Simple, Transparent Pricing</h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground">
              Choose the plan that's right for you and start exploring the power of AI.
            </p>
          </motion.div>
        </div>

        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4">
            <Label htmlFor="billing-toggle" className={billingCycle === "monthly" ? "font-medium" : ""}>
              Monthly
            </Label>
            <Switch
              id="billing-toggle"
              checked={billingCycle === "annual"}
              onCheckedChange={(checked) => setBillingCycle(checked ? "annual" : "monthly")}
            />
            <div className="flex flex-col items-start">
              <Label htmlFor="billing-toggle" className={billingCycle === "annual" ? "font-medium" : ""}>
                Annual
              </Label>
              {billingCycle === "annual" && <span className="text-xs text-primary">Save {savingsPercentage}%</span>}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={index}
              title={plan.title}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              buttonText={plan.buttonText}
              buttonVariant={plan.buttonVariant}
              highlighted={plan.highlighted}
              delay={plan.delay}
              billingCycle={billingCycle}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
