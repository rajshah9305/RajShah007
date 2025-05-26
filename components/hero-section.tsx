"use client"

import { useState } from "react"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

export function HeroSection() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-[#f8fafc]"></div>
      <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-indigo-100/40 to-sky-100/40 blur-[80px]"></div>
      <div className="absolute bottom-0 left-0 -z-10 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-emerald-100/40 to-indigo-100/40 blur-[80px]"></div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 h-20 w-20 rounded-full border-2 border-indigo-200/30 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 h-16 w-16 rounded-full border-2 border-emerald-200/30 animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 h-4 w-4 rounded-full bg-indigo-400/30"></div>
      <div className="absolute bottom-1/3 left-1/4 h-4 w-4 rounded-full bg-emerald-400/30"></div>

      <div className="container relative z-10">
        <div className="mx-auto max-w-[800px] text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium bg-indigo-500 text-white border-none">
              <Sparkles className="mr-1 h-3.5 w-3.5" />
              Now in Public Beta
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
              <span className="relative z-10 bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
                AI Toolkit
              </span>
              <span className="absolute -inset-1 -z-10 block rounded-lg bg-gradient-to-r from-indigo-600/10 via-blue-600/10 to-emerald-600/10 blur-xl"></span>
            </span>
          </motion.h1>

          <motion.p
            className="mb-8 text-balance body-large text-slate-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Access powerful AI models and tools in one platform. Create, analyze, and automate with state-of-the-art
            artificial intelligence.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white border-none group relative overflow-hidden"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <ArrowRight
                  className={`h-4 w-4 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}
                />
              </span>
            </Button>
            <Button size="lg" variant="outline" className="border-slate-300 hover:bg-slate-100">
              View Demo
            </Button>
          </motion.div>
        </div>

        {/* Hero image */}
        <motion.div
          className="mt-16 relative mx-auto max-w-5xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="aspect-[16/9] overflow-hidden rounded-xl border border-slate-200 shadow-xl bg-white">
            <div className="absolute top-0 left-0 right-0 h-8 bg-slate-100 flex items-center px-4">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-rose-500"></div>
                <div className="h-3 w-3 rounded-full bg-amber-400"></div>
                <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
              </div>
            </div>
            <div className="pt-8">
              <img
                src="/placeholder.svg?height=600&width=1200"
                alt="AI Nexus Dashboard"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Floating elements */}
          <div className="absolute -top-6 -right-6 h-16 w-16 rounded-full bg-indigo-100 p-4 shadow-lg border border-indigo-200 animate-float">
            <div className="h-full w-full rounded-full bg-indigo-500 flex items-center justify-center text-white">
              <Sparkles className="h-6 w-6" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
