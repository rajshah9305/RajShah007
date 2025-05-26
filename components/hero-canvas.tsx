"use client"

import { useRef, useEffect } from "react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  alpha: number
}

export default function HeroCanvas() {
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

    // Create particles
    const particlesCount = 100
    const particles: Particle[] = []

    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: getRandomColor(),
        alpha: Math.random() * 0.5 + 0.1,
      })
    }

    function getRandomColor() {
      const colors = [
        "rgba(124, 58, 237, alpha)", // Purple (primary)
        "rgba(139, 92, 246, alpha)", // Violet
        "rgba(79, 70, 229, alpha)", // Indigo
        "rgba(6, 182, 212, alpha)", // Cyan
      ]
      return colors[Math.floor(Math.random() * colors.length)]
    }

    // Create circular paths for the orbital effect
    const orbits = [
      { radius: canvas.width * 0.2, x: canvas.width / 2, y: canvas.height / 2, angle: 0, speed: 0.0005 },
      { radius: canvas.width * 0.3, x: canvas.width / 2, y: canvas.height / 2, angle: Math.PI / 4, speed: 0.0003 },
    ]

    // Mouse movement effect
    const mouse = {
      x: 0,
      y: 0,
    }

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX
      mouse.y = event.clientY
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color.replace("alpha", particle.alpha.toString())
        ctx.fill()
      })

      // Draw connections between particles
      particles.forEach((particleA, i) => {
        particles.slice(i + 1).forEach((particleB) => {
          const dx = particleA.x - particleB.x
          const dy = particleA.y - particleB.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(particleA.x, particleA.y)
            ctx.lineTo(particleB.x, particleB.y)
            const opacity = 0.1 * (1 - distance / 150)
            ctx.strokeStyle = `rgba(124, 58, 237, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      // Draw orbital rings
      orbits.forEach((orbit) => {
        // Update angle
        orbit.angle += orbit.speed

        // Draw orbit path (faded)
        ctx.beginPath()
        ctx.arc(orbit.x, orbit.y, orbit.radius, 0, Math.PI * 2)
        ctx.strokeStyle = "rgba(124, 58, 237, 0.1)"
        ctx.lineWidth = 1
        ctx.stroke()

        // Draw orbital point
        const pointX = orbit.x + Math.cos(orbit.angle) * orbit.radius
        const pointY = orbit.y + Math.sin(orbit.angle) * orbit.radius

        ctx.beginPath()
        ctx.arc(pointX, pointY, 4, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(124, 58, 237, 0.8)"
        ctx.fill()

        // Draw glow effect
        const gradient = ctx.createRadialGradient(pointX, pointY, 0, pointX, pointY, 20)
        gradient.addColorStop(0, "rgba(124, 58, 237, 0.3)")
        gradient.addColorStop(1, "rgba(124, 58, 237, 0)")
        ctx.beginPath()
        ctx.arc(pointX, pointY, 20, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      })

      // Subtle mouse interaction
      particles.forEach((particle) => {
        const dx = mouse.x - particle.x
        const dy = mouse.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 200

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance
          particle.x -= dx * force * 0.01
          particle.y -= dy * force * 0.01
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0" />
}
