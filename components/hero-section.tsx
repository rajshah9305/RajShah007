"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowRight, Sparkles, Star, Zap, Shield, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import HeroCanvas from "@/components/hero-canvas"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function HeroSection() {
  const [isHovered, setIsHovered] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const features = [
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "Advanced AI Models",
      description: "Access state-of-the-art AI models with unparalleled capabilities",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Lightning Fast",
      description: "Process data and generate content in milliseconds",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Enterprise Security",
      description: "Bank-level encryption and data protection",
    },
    {
      icon: <Cpu className="h-5 w-5" />,
      title: "Scalable Infrastructure",
      description: "Handles millions of requests with ease",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [features.length])

  return (
    <section ref={containerRef} className="relative overflow-hidden min-h-[90vh] flex items-center py-20 md:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <HeroCanvas />
      </div>
      <div className="absolute top-0 right-0 -z-10">
        <Image
          src="/images/hero/hero-shape-1.svg"
          alt=""
          width={600}
          height={600}
          className="opacity-50"
          aria-hidden="true"
        />
      </div>
      <div className="absolute bottom-0 left-0 -z-10">
        <Image
          src="/images/hero/hero-shape-2.svg"
          alt=""
          width={600}
          height={600}
          className="opacity-50"
          aria-hidden="true"
        />
      </div>
      <div className="absolute inset-0 -z-10 opacity-10">
        <Image
          src="/images/hero/hero-dots.svg"
          alt=""
          width={400}
          height={400}
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <motion.div style={{ y, opacity }} className="mx-auto max-w-[800px] text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium bg-primary/90 text-white border-none shadow-glow">
              <Sparkles className="mr-1 h-3.5 w-3.5" />
              <span className="relative">
                Now in Public Beta
                <span className="absolute -right-1 -top-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
              </span>
            </Badge>
          </motion.div>

          <motion.h1
            className="mb-6 text-balance font-extrabold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Your Complete{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-gradient">AI Toolkit</span>
              <span className="absolute -inset-1 -z-10 block rounded-lg bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl"></span>
            </span>
          </motion.h1>

          <motion.p
            className="mb-8 text-balance body-large text-slate-600 dark:text-slate-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Access powerful AI models and tools in one platform. Create, analyze, and automate with state-of-the-art
            artificial intelligence.
          </motion.p>

          {/* Animated Feature Ticker */}
          <motion.div
            className="mb-8 h-16 relative overflow-hidden rounded-lg bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-white/20 dark:border-slate-700/20 shadow-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-primary/10 text-primary">{features[activeFeature].icon}</div>
                  <div className="text-left">
                    <p className="font-semibold">{features[activeFeature].title}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{features[activeFeature].description}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button
              size="lg"
              className={cn(
                "relative overflow-hidden group",
                "bg-primary hover:bg-primary/90 text-white",
                "shadow-[0_0_0_3px_rgba(124,58,237,0.2)]",
                "transition-all duration-300",
              )}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <ArrowRight
                  className={`h-4 w-4 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}
                />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-violet-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 backdrop-blur-sm"
            >
              View Demo
            </Button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            className="mt-12 flex flex-wrap justify-center gap-6 items-center text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-medium"
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
              <div className="h-8 w-8 rounded-full border-2 border-white dark:border-slate-800 bg-primary text-white flex items-center justify-center text-xs font-medium">
                +2k
              </div>
            </div>
            <div className="text-sm">
              <span className="font-medium text-slate-700 dark:text-slate-300">2,000+ users</span> trust our platform
            </div>
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">4.9/5</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Hero image */}
        <motion.div
          className="mt-16 relative mx-auto max-w-5xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="card-3d">
            <div className="card-3d-inner">
              <div className="glassmorphism rounded-xl overflow-hidden border border-white/20 dark:border-slate-700/20 shadow-xl">
                <div className="absolute top-0 left-0 right-0 h-8 bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm flex items-center px-4">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-rose-500"></div>
                    <div className="h-3 w-3 rounded-full bg-amber-400"></div>
                    <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                  </div>
                </div>
                <div className="pt-8">
                  <Image
                    src="/images/hero/dashboard.png"
                    alt="AI Nexus Dashboard Interface"
                    width={1200}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Floating elements */}
          <div className="absolute -top-6 -right-6 h-16 w-16 rounded-full bg-primary/10 p-4 shadow-lg border border-primary/20 animate-float">
            <div className="h-full w-full rounded-full bg-primary flex items-center justify-center text-white">
              <Sparkles className="h-6 w-6" />
            </div>
          </div>

          {/* Glow effect */}
          <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-3xl -z-10"></div>
        </motion.div>
      </div>
    </section>
  )
}
