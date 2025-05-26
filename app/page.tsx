import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { ToolsSection } from "@/components/tools-section"
import { PricingSection } from "@/components/pricing-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import FloatingChatButton from "@/components/floating-chat-button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <ToolsSection />
        <TestimonialsSection />
        <PricingSection />
      </main>
      <Footer />
      <ScrollToTop />
      <FloatingChatButton />
    </div>
  )
}
