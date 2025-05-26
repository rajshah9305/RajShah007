"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Sparkles, X } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import PricingCard3D from "@/components/pricing-card-3d"

interface PricingPlan {
  title: string
  price: {
    monthly: string
    annual: string
  }
  description: string
  features: {
    text: string
    included: boolean
  }[]
  buttonText: string
  buttonVariant: "default" | "outline" | "secondary"
  highlighted?: boolean
  delay?: number
  color?: string
}

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // Define pricing data
  const pricingPlans: PricingPlan[] = [
    {
      title: "Free",
      price: {
        monthly: "$0",
        annual: "$0",
      },
      description: "Perfect for trying out our platform.",
      features: [
        { text: "Access to basic AI models", included: true },
        { text: "5 AI generations per day", included: true },
        { text: "Standard response time", included: true },
        { text: "Community support", included: true },
        { text: "API access", included: false },
        { text: "Custom AI training", included: false },
        { text: "Priority support", included: false },
      ],
      buttonText: "Get Started",
      buttonVariant: "outline",
      delay: 0.1,
      color: "from-slate-400 to-slate-500",
    },
    {
      title: "Pro",
      price: {
        monthly: "$29",
        annual: "$249",
      },
      description: "For professionals and small teams.",
      features: [
        { text: "Access to all AI models", included: true },
        { text: "Unlimited AI generations", included: true },
        { text: "Priority response time", included: true },
        { text: "Email support", included: true },
        { text: "API access", included: true },
        { text: "Custom AI training", included: true },
        { text: "Priority support", included: false },
      ],
      buttonText: "Subscribe",
      buttonVariant: "default",
      highlighted: true,
      delay: 0.2,
      color: "from-primary to-violet-500",
    },
    {
      title: "Enterprise",
      price: {
        monthly: "$99",
        annual: "$990",
      },
      description: "For organizations with advanced needs.",
      features: [
        { text: "Everything in Pro", included: true },
        { text: "Dedicated instance", included: true },
        { text: "99.9% uptime SLA", included: true },
        { text: "24/7 phone support", included: true },
        { text: "Custom integrations", included: true },
        { text: "Advanced analytics", included: true },
        { text: "User role management", included: true },
      ],
      buttonText: "Contact Sales",
      buttonVariant: "secondary",
      delay: 0.3,
      color: "from-secondary to-teal-500",
    },
  ]

  // Calculate annual savings percentage for the Pro plan
  const monthlyPrice = Number.parseFloat(pricingPlans[1].price.monthly.replace("$", "")) * 12
  const annualPrice = Number.parseFloat(pricingPlans[1].price.annual.replace("$", ""))
  const savingsPercentage = Math.round(((monthlyPrice - annualPrice) / monthlyPrice) * 100)

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
    <section id="pricing" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 -z-10 bg-grid opacity-[0.02]"></div>
      <div className="absolute top-0 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-secondary/5 blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[100px]"></div>

      <div className="container">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
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
          <motion.div
            className="flex items-center gap-4 p-2 rounded-full bg-muted/50 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Label
              htmlFor="billing-toggle"
              className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                billingCycle === "monthly"
                  ? "bg-white dark:bg-slate-800 shadow-sm font-medium"
                  : "text-muted-foreground"
              }`}
            >
              Monthly
            </Label>
            <Switch
              id="billing-toggle"
              checked={billingCycle === "annual"}
              onCheckedChange={(checked) => setBillingCycle(checked ? "annual" : "monthly")}
              className="data-[state=checked]:bg-primary"
            />
            <div className="flex flex-col items-start">
              <Label
                htmlFor="billing-toggle"
                className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                  billingCycle === "annual"
                    ? "bg-white dark:bg-slate-800 shadow-sm font-medium"
                    : "text-muted-foreground"
                }`}
              >
                Annual
              </Label>
              {billingCycle === "annual" && (
                <span className="text-xs text-primary ml-4">Save {savingsPercentage}%</span>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {pricingPlans.map((plan, index) => (
            <motion.div key={index} variants={itemVariants}>
              <PricingCard3D highlighted={plan.highlighted} color={plan.color}>
                <CardHeader className={`pb-8 ${plan.highlighted ? "pt-8" : ""}`}>
                  {plan.highlighted && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <span className="bg-primary text-primary-foreground text-xs font-medium px-4 py-1.5 rounded-full shadow-medium flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5" />
                        Most Popular
                      </span>
                    </div>
                  )}
                  <h3 className="text-xl font-bold">{plan.title}</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className={`text-3xl font-extrabold ${plan.highlighted ? "text-primary" : ""}`}>
                      {billingCycle === "monthly" ? plan.price.monthly : plan.price.annual}
                    </span>
                    {plan.price.monthly !== "$0" && (
                      <span className="ml-1 text-muted-foreground">
                        {billingCycle === "monthly" ? "/month" : "/year"}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <div
                          className={`rounded-full p-0.5 ${
                            feature.included
                              ? plan.highlighted
                                ? "bg-primary/20 text-primary"
                                : "bg-muted text-muted-foreground"
                              : "bg-muted/50 text-muted-foreground/50"
                          }`}
                        >
                          {feature.included ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                        </div>
                        <span className={`text-sm ml-2 ${!feature.included ? "text-muted-foreground/50" : ""}`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-6">
                  <Button variant={plan.buttonVariant} className="w-full transition-all hover:scale-[1.02]">
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </PricingCard3D>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
