"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send } from "lucide-react"

export default function ContactForm() {
  const [contact, setContact] = useState("")
  const [message, setMessage] = useState("")
  const [isSent, setIsSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (contact && message) {
      setIsSent(true)
      // Here you would typically send the message to your backend
      setTimeout(() => setIsSent(false), 3000) // Reset after 3 seconds
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        placeholder="Your email or phone number"
        className="w-full p-2 bg-[#2a2a2a] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
      />
      <div className="relative">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Introduce yourself..."
          className="w-full p-2 bg-[#2a2a2a] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 pr-12"
          rows={4}
        />
        <button
          type="submit"
          className="absolute bottom-2 right-2 p-2 bg-[#3a3a3a] rounded-full hover:bg-[#4a4a4a] transition-colors duration-200"
          disabled={!contact || !message}
        >
          <Send size={20} className="text-white" />
        </button>
      </div>
      <AnimatePresence>
        {isSent && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-green-500 font-semibold"
          >
            Your message has been received!
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}

