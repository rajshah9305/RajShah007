"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-white/90 backdrop-blur-md border-b shadow-subtle" : "bg-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
              <span className="font-bold">AI</span>
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">Nexus</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("features")}
              className="text-sm font-medium text-slate-700 transition-colors hover:text-indigo-600"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("tools")}
              className="text-sm font-medium text-slate-700 transition-colors hover:text-indigo-600"
            >
              Tools
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-sm font-medium text-slate-700 transition-colors hover:text-indigo-600"
            >
              Pricing
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" className="text-slate-700 hover:text-indigo-600 hover:bg-indigo-50">
              Log in
            </Button>
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Sign up
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-slate-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="container py-4 flex flex-col gap-4">
            <button
              onClick={() => scrollToSection("features")}
              className="text-sm font-medium py-2 text-slate-700 transition-colors hover:text-indigo-600 w-full text-left"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("tools")}
              className="text-sm font-medium py-2 text-slate-700 transition-colors hover:text-indigo-600 w-full text-left"
            >
              Tools
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-sm font-medium py-2 text-slate-700 transition-colors hover:text-indigo-600 w-full text-left"
            >
              Pricing
            </button>
            <hr className="my-2" />
            <div className="flex items-center gap-4">
              <Button variant="outline" className="flex-1 border-slate-200 hover:bg-slate-50 hover:text-indigo-600">
                Log in
              </Button>
              <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">Sign up</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
