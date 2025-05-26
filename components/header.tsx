"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      // Get the header height to offset the scroll position
      const header = document.querySelector("header")
      const headerHeight = header ? header.clientHeight : 0

      const sectionTop = section.getBoundingClientRect().top + window.scrollY - headerHeight
      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      })

      setActiveSection(sectionId)

      // Close mobile menu if open
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }
  }

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)

      // Update active section based on scroll position
      const sections = ["features", "tools", "testimonials", "pricing"]

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId)
        if (section) {
          const rect = section.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { id: "features", label: "Features" },
    { id: "tools", label: "Tools" },
    { id: "pricing", label: "Pricing" },
  ]

  const dropdownItems = [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Tutorials", href: "#" },
  ]

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b shadow-subtle" : "bg-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 relative group">
            <div className="relative flex h-8 w-8 items-center justify-center">
              <Image src="/images/logo/logo.svg" alt="AI Nexus Logo" width={40} height={40} />
            </div>
            <span className="font-bold text-xl hidden sm:inline-block relative">
              <Image
                src="/images/logo/logo-full.svg"
                alt="AI Nexus"
                width={120}
                height={40}
                className="hidden sm:block"
              />
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors relative",
                  activeSection === item.id
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary hover:bg-primary/5",
                )}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
              </button>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="px-3 py-2 text-sm font-medium rounded-md transition-colors text-foreground/80 hover:text-primary hover:bg-primary/5 flex items-center gap-1">
                  Resources
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </button>
              </DropdownMenuTrigger>
              <AnimatePresence>
                <DropdownMenuContent align="end" className="w-48 glassmorphism" asChild>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    {dropdownItems.map((item, index) => (
                      <DropdownMenuItem key={index} className="cursor-pointer">
                        <Link href={item.href} className="w-full">
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </motion.div>
                </DropdownMenuContent>
              </AnimatePresence>
            </DropdownMenu>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" className="text-foreground/80 hover:text-primary hover:bg-primary/5">
              Log in
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-white relative overflow-hidden group">
              <span className="relative z-10">Sign up</span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-violet-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-foreground/80"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden border-t glassmorphism"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    "text-sm font-medium py-2 transition-colors w-full text-left rounded-md px-3",
                    activeSection === item.id
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/80 hover:bg-primary/5 hover:text-primary",
                  )}
                >
                  {item.label}
                </button>
              ))}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-sm font-medium py-2 transition-colors w-full text-left rounded-md px-3 text-foreground/80 hover:bg-primary/5 hover:text-primary flex items-center justify-between">
                    Resources
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </button>
                </DropdownMenuTrigger>
                <AnimatePresence>
                  <DropdownMenuContent align="end" className="w-48" asChild>
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      {dropdownItems.map((item, index) => (
                        <DropdownMenuItem key={index} className="cursor-pointer">
                          <Link href={item.href} className="w-full">
                            {item.label}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </motion.div>
                  </DropdownMenuContent>
                </AnimatePresence>
              </DropdownMenu>

              <hr className="my-2 border-border" />
              <div className="flex items-center gap-4">
                <Button variant="outline" className="flex-1 border-slate-200 hover:bg-slate-50 hover:text-primary">
                  Log in
                </Button>
                <Button className="flex-1 bg-primary hover:bg-primary/90 text-white">Sign up</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
