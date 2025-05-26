"use client"

import { useEffect, useRef } from "react"

export default function BackgroundGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create gradient
    const createGradient = () => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "rgba(204, 251, 241, 0.2)") // teal-100 with opacity
      gradient.addColorStop(0.5, "rgba(153, 246, 228, 0.1)") // teal-200 with opacity
      gradient.addColorStop(1, "rgba(207, 250, 254, 0.2)") // cyan-100 with opacity
      return gradient
    }

    // Animation
    let animationFrameId: number
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Fill with gradient
      ctx.fillStyle = createGradient()
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw subtle patterns
      const time = Date.now() * 0.0005

      // Draw circles
      for (let i = 0; i < 5; i++) {
        const x = Math.sin(time + i * 0.5) * canvas.width * 0.25 + canvas.width * 0.5
        const y = Math.cos(time + i * 0.8) * canvas.height * 0.25 + canvas.height * 0.5
        const radius = 50 + Math.sin(time * 0.8 + i) * 30

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
        gradient.addColorStop(0, "rgba(20, 184, 166, 0.01)") // teal-500 with low opacity
        gradient.addColorStop(1, "rgba(6, 182, 212, 0)") // cyan-500 with zero opacity

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
      }

      animationFrameId = window.requestAnimationFrame(render)
    }

    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />
}
