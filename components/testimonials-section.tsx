"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Testimonial {
  quote: string
  author: string
  role: string
  avatar: string
  rating: number
}

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0) // 1 for next, -1 for prev
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const testimonialVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500, // Start further off-screen
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500, // Exit further off-screen
      opacity: 0,
    }),
  }

  const testimonials: Testimonial[] = [
    {
      quote:
        "This AI platform has completely transformed our workflow. The tools are incredibly intuitive yet powerful, and the results have exceeded our expectations. We've seen a 40% increase in productivity since implementation.",
      author: "Jessica Williams",
      role: "Marketing Director at GrowthLabs",
      avatar: "/images/testimonials/person-1.png",
      rating: 5,
    },
    {
      quote:
        "The code generation capabilities are nothing short of revolutionary. It's like having an expert developer by your side 24/7, helping you solve complex problems with elegant solutions. This has cut our development time in half.",
      author: "Michael Chen",
      role: "Senior Developer at DevStudio",
      avatar: "/images/testimonials/person-2.png",
      rating: 5,
    },
    {
      quote:
        "As a creative professional, the image generation tools have been a game-changer. The quality and variety of outputs are impressive, and the customization options allow me to achieve exactly what I envision. Worth every penny.",
      author: "Sarah Johnson",
      role: "Creative Director at ArtisanMedia",
      avatar: "/images/testimonials/person-3.png",
      rating: 4,
    },
  ]

  const nextTestimonial = () => {
    setDirection(1)
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial()
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="testimonials" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 -z-10 bg-grid opacity-[0.02]"></div>
      <div className="absolute top-0 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-secondary/5 blur-[100px]"></div>

      <div className="container">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-secondary/10 text-secondary border-secondary/20">
              Testimonials
            </span>
            <h2 className="mb-4">What Our Users Say</h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground">
              Hear from people who have transformed their work with our AI platform.
            </p>
          </motion.div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* This outer div will act as the viewport for AnimatePresence */}
          <div className="overflow-hidden rounded-lg bg-card shadow-medium border relative min-h-[450px] md:min-h-[350px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={activeIndex} // Important for AnimatePresence to detect changes
                custom={direction}
                variants={testimonialVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute w-full h-full px-4 py-8" // Positioned absolutely to overlap during transition
              >
                {(() => {
                  const testimonial = testimonials[activeIndex]
                  return (
                    <CardContent className="p-8 relative h-full flex flex-col justify-center">
                      <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="md:w-1/3 flex flex-col items-center">
                          <Avatar className="h-20 w-20 border-4 border-background shadow-medium">
                            <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.author} />
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {testimonial.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-center mt-4">
                            <h4 className="font-bold text-lg">{testimonial.author}</h4>
                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                            <div className="flex items-center justify-center mt-2">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="md:w-2/3">
                          <div className="bg-primary/10 p-1 rounded-full w-10 h-10 flex items-center justify-center mb-6">
                            <Quote className="h-5 w-5 text-primary" />
                          </div>
                          <p className="text-lg italic mb-6 leading-relaxed">{testimonial.quote}</p>
                        </div>
                      </div>
                    </CardContent>
                  )
                })()}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-8 gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`transition-all duration-300 ${
                  index === activeIndex
                    ? "h-2 w-8 bg-primary rounded-full"
                    : "h-2 w-2 bg-muted hover:bg-primary/50 rounded-full"
                }`}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1)
                  setActiveIndex(index)
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 rounded-full bg-background shadow-medium border hidden md:flex"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 rounded-full bg-background shadow-medium border hidden md:flex"
            onClick={nextTestimonial}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
