"use client"

import { useState, useEffect } from "react"
import { CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials = [
    {
      quote:
        "AI Nexus has completely transformed how our team works. The AI tools are intuitive and powerful, saving us countless hours every week.",
      author: "Jessica Williams",
      role: "Marketing Director at GrowthLabs",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6846.JPG-H0J7OdnvNZ8zPQrmOC3HN4R6fBzoFJ.jpeg",
    },
    {
      quote:
        "The code generation tool is a game-changer. It's like having an expert developer by your side 24/7, helping you solve complex problems.",
      author: "Michael Chen",
      role: "Senior Developer at DevStudio",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "We've seen a 40% increase in productivity since implementing AI Nexus across our marketing team. The ROI has been incredible.",
      author: "Sarah Johnson",
      role: "Product Manager at TechCorp",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  ]

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial()
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Decorative elements */}
      <div className="absolute -top-12 -left-12 w-24 h-24 border-2 border-teal-200/30 rounded-full"></div>
      <div className="absolute -bottom-12 -right-12 w-24 h-24 border-2 border-cyan-200/30 rounded-full"></div>
      <div className="absolute top-1/2 -left-6 transform -translate-y-1/2 w-12 h-12 bg-teal-100/30 rounded-full blur-md"></div>
      <div className="absolute top-1/2 -right-6 transform -translate-y-1/2 w-12 h-12 bg-cyan-100/30 rounded-full blur-md"></div>

      <div className="overflow-hidden rounded-xl bg-white/80 backdrop-blur-sm shadow-xl border border-teal-100/50">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-full flex-shrink-0 px-4 py-8">
              <CardContent className="p-8 relative">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-teal-100/20 to-cyan-100/20 rounded-full blur-xl"></div>

                <div className="bg-gradient-to-r from-teal-600/10 to-cyan-600/10 p-1 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                  <Quote className="h-8 w-8 text-teal-600" />
                </div>

                <p className="text-xl italic mb-8 text-center relative">"{testimonial.quote}"</p>

                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-16 w-16 border-4 border-teal-100 shadow-md">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.author} />
                    <AvatarFallback className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
                      {testimonial.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h4 className="font-semibold text-lg">{testimonial.author}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-8 gap-3">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`transition-all duration-300 ${
              index === activeIndex
                ? "h-3 w-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full shadow-md"
                : "h-3 w-3 bg-slate-200 hover:bg-teal-200 rounded-full"
            }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 -left-6 transform -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg border-teal-100 hidden md:flex hover:bg-teal-50 hover:border-teal-200 transition-all z-10"
        onClick={prevTestimonial}
      >
        <ChevronLeft className="h-5 w-5 text-teal-600" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 -right-6 transform -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg border-teal-100 hidden md:flex hover:bg-teal-50 hover:border-teal-200 transition-all z-10"
        onClick={nextTestimonial}
      >
        <ChevronRight className="h-5 w-5 text-teal-600" />
      </Button>
    </div>
  )
}
