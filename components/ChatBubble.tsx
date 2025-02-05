"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { SendHorizontal } from "lucide-react"
import type React from "react" // Added import for React

export default function ChatBubble() {
  const [messages, setMessages] = useState<string[]>([])
  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setMessages([...messages, input])
      setInput("")
    }
  }

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="w-full bg-[#1a1a1a] rounded-2xl p-4 mt-4 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
    >
      <div className="h-[200px] overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className="flex justify-end">
            <div className="max-w-[80%] rounded-2xl px-4 py-2 bg-[#2a2a2a] text-white">{message}</div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-[#2a2a2a] text-white rounded-full px-4 py-2 
                     focus:outline-none focus:ring-2 focus:ring-white/20"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="bg-[#2a2a2a] text-white p-2 rounded-full 
                     hover:bg-[#333333] disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors duration-200"
        >
          <SendHorizontal className="w-5 h-5" />
        </button>
      </form>
    </motion.div>
  )
}

