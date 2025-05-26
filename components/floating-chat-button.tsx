"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageSquare, X, Send, Bot } from "lucide-react"

export default function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([{ role: "system", content: "Hi there! 👋 How can I help you today?" }])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    setMessages([...messages, { role: "user", content: input }])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          content:
            "Thanks for your message! This is a demo of our premium chat interface. In the full version, you'd get a real AI response here.",
        },
      ])
    }, 1500)
  }

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          className={`fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg transition-all duration-300 ${
            isOpen ? "bg-red-500 hover:bg-red-600" : "bg-gradient-to-r from-primary to-violet-500"
          }`}
          size="icon"
          onClick={toggleChat}
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}

          {/* Pulse effect when closed */}
          {!isOpen && (
            <span className="absolute -right-1 -top-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
          )}
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 w-80 md:w-96 z-50"
          >
            <Card className="shadow-xl border-primary/10 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary to-violet-500 text-white py-3 px-4 flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Bot className="h-5 w-5" />
                    <span className="absolute -right-1 -top-1 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                  </div>
                  <h3 className="font-medium">AI Assistant</h3>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-white" onClick={toggleChat}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-4 h-80 overflow-y-auto scrollbar-premium">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          message.role === "user"
                            ? "bg-primary text-white"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                        }`}
                      >
                        {message.content}
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      className="flex justify-start"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="max-w-[80%] rounded-lg px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                        <div className="flex items-center gap-1">
                          <div
                            className="h-2 w-2 rounded-full bg-primary animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="h-2 w-2 rounded-full bg-primary animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="h-2 w-2 rounded-full bg-primary animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              <CardFooter className="p-2 border-t">
                <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 input-premium"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!input.trim()}
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
