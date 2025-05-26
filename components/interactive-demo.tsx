"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, ImageIcon, Code, Loader2 } from "lucide-react"

export default function InteractiveDemo() {
  const [activeTab, setActiveTab] = useState("chat")
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    setIsLoading(true)
    setResult("")

    // Simulate AI processing
    setTimeout(() => {
      let demoResponse = ""

      if (activeTab === "chat") {
        demoResponse =
          "I'm an AI assistant designed to help you with various tasks. How can I assist you today? I can answer questions, provide information, or help you brainstorm ideas."
      } else if (activeTab === "image") {
        demoResponse =
          "Image generation preview would appear here. In the full version, you would see your generated image based on the prompt."
      } else if (activeTab === "code") {
        demoResponse = `// Here's a simple function based on your request
function calculateTotal(items) {
  return items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
}

// Example usage
const cart = [
  { name: "Product 1", price: 29.99, quantity: 2 },
  { name: "Product 2", price: 9.99, quantity: 1 }
];

const total = calculateTotal(cart);
console.log(\`Total: $\${total.toFixed(2)}\`);`
      }

      setResult(demoResponse)
      setIsLoading(false)
    }, 1500)
  }

  return (
    <Card className="shadow-lg border-teal-100">
      <CardContent className="p-6">
        <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Chat</span>
            </TabsTrigger>
            <TabsTrigger value="image" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              <span>Image</span>
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              <span>Code</span>
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="min-h-[200px] bg-slate-50 rounded-lg p-4 relative">
                {result ? (
                  <div className="whitespace-pre-wrap">
                    {activeTab === "image" ? (
                      <div className="flex justify-center">
                        <div className="bg-slate-200 w-full max-w-sm h-[200px] rounded flex items-center justify-center text-slate-500">
                          [Generated Image Preview]
                        </div>
                      </div>
                    ) : (
                      result
                    )}
                  </div>
                ) : (
                  <div className="text-muted-foreground text-center absolute inset-0 flex items-center justify-center">
                    {isLoading ? (
                      <div className="flex flex-col items-center gap-2">
                        <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
                        <p>Processing your request...</p>
                      </div>
                    ) : (
                      `Enter a prompt to see ${activeTab === "chat" ? "a response" : activeTab === "image" ? "an image" : "code"}`
                    )}
                  </div>
                )}
              </div>

              {activeTab === "chat" || activeTab === "code" ? (
                <Textarea
                  placeholder={`Enter your ${activeTab === "chat" ? "message" : "code request"}...`}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="min-h-[100px]"
                />
              ) : (
                <Input
                  placeholder="Describe the image you want to generate..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
                disabled={isLoading || !inputValue.trim()}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Generate ${activeTab === "chat" ? "Response" : activeTab === "image" ? "Image" : "Code"}`
                )}
              </Button>
            </div>
          </form>
        </Tabs>
      </CardContent>
    </Card>
  )
}
