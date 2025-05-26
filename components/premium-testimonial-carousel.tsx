"use client"

import { useState, useEffect, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface Testimonial {
  quote: string
  author: string
  role: string
  avatar: string
  rating: number
}

export default function PremiumTestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  const testimonials: Testimonial[] = [
    {
      quote:
        "This AI platform has completely transformed our workflow. The tools are incredibly intuitive yet powerful, and the results have exceeded our expectations. We've seen a 40% increase in productivity since implementation.",
      author: "Jessica Williams",
      role: "Marketing Director at GrowthLabs",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6846.JPG-H0J7OdnvNZ8zPQrmOC3HN4R6fBzoFJ.jpeg",
      rating: 5,
    },
    {
      quote:
        "The code generation capabilities are nothing short of revolutionary. It's like having an expert developer by your side 24/7, helping you solve complex problems with elegant solutions. This has cut our development time in half.",
      author: "Michael Chen",
      role: "Senior Developer at DevStudio",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
    },
    {
      quote:
        "As a creative professional, the image generation tools have been a game-changer. The quality and variety of outputs are impressive, and the customization options allow me to achieve exactly what I envision. Worth every penny.",
      author: "Sarah Johnson",
      role: "Creative Director at ArtisanMedia",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4,
    },
    {
      quote:
        "The analytics capabilities have given us insights we never thought possible. We're now able to make data-driven decisions with confidence, and the predictive features have helped us stay ahead of market trends.",
      author: "David Rodriguez",
      role: "Data Scientist at AnalyticsPro",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
    },
  ]

  const nextTestimonial = () => {
    setDirection(1)
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    resetAutoPlay()
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
    resetAutoPlay()
  }

  const resetAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }

    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setDirection(1)
        setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
      }, 8000)
    }
  }

  useEffect(() => {
    resetAutoPlay()

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying, testimonials.length])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    }),
  }

  return (
    <div className="relative max-w-5xl mx-auto">
      {/* Decorative elements */}
      <div className="absolute -top-16 -left-16 w-32 h-32 border-2 border-purple-200/30 rounded-full"></div>
      <div className="absolute -bottom-16 -right-16 w-32 h-32 border-2 border-indigo-200/30 rounded-full"></div>
      <div className="absolute top-1/2 -left-8 transform -translate-y-1/2 w-16 h-16 bg-purple-100/30 rounded-full blur-md"></div>
      <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 w-16 h-16 bg-indigo-100/30 rounded-full blur-md"></div>

      <div className="overflow-hidden rounded-2xl bg-white/80 backdrop-blur-lg shadow-2xl border border-white/50 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/5 to-indigo-500/5 pointer-events-none"></div>

        <div className="relative p-8">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/3 flex flex-col items-center">
                  <div className="relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full blur opacity-70"></div>
                    <Avatar className="h-24 w-24 border-4 border-white shadow-xl relative">
                      <AvatarImage
                        src={testimonials[activeIndex].avatar || "/placeholder.svg"}
                        alt={testimonials[activeIndex].author}
                      />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white">
                        {testimonials[activeIndex].author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="text-center mt-4">
                    <h4 className="font-bold text-xl">{testimonials[activeIndex].author}</h4>
                    <p className="text-sm text-muted-foreground">{testimonials[activeIndex].role}</p>
                    <div className="flex items-center justify-center mt-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonials[activeIndex].rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:w-2/3">
                  <div className="bg-gradient-to-r from-purple-600/10 to-indigo-600/10 p-1 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                    <Quote className="h-6 w-6 text-purple-600" />
                  </div>
                  <p className="text-xl italic mb-6 leading-relaxed">{testimonials[activeIndex].quote}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex justify-center mt-8 gap-3">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`transition-all duration-300 ${
              index === activeIndex
                ? "h-3 w-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full shadow-md"
                : "h-3 w-3 bg-slate-200 hover:bg-purple-200 rounded-full"
            }`}
            onClick={() => {
              setDirection(index > activeIndex ? 1 : -1)
              setActiveIndex(index)
              resetAutoPlay()
            }}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 -left-6 transform -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg border-purple-100 hidden md:flex hover:bg-purple-50 hover:border-purple-200 transition-all z-10"
        onClick={prevTestimonial}
      >
        <ChevronLeft className="h-5 w-5 text-purple-600" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 -right-6 transform -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg border-purple-100 hidden md:flex hover:bg-purple-50 hover:border-purple-200 transition-all z-10"
        onClick={nextTestimonial}
      >
        <ChevronRight className="h-5 w-5 text-purple-600" />
      </Button>
    </div>
  )
}
