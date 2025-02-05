"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Button from "./Button"
import ChatBubble from "./ChatBubble"
import BlogPost from "./BlogPost"
import Project from "./Project"
import ContactForm from "./ContactForm"

const sections = ["Chat", "Projects", "Blog", "Contact"]

const blogPosts = [
  {
    title: "The Future of Web Development",
    date: "November 15, 2023",
    location: "San Francisco, CA",
    subtitle: "Exploring emerging trends and technologies",
    body: "As we look towards the future of web development, several exciting trends are emerging. From the rise of AI-powered development tools to the increasing importance of web accessibility, the landscape is rapidly evolving. This post delves into these trends and what they mean for developers and users alike.",
    views: 1234,
  },
  {
    title: "Mastering React Hooks",
    date: "November 10, 2023",
    location: "New York, NY",
    subtitle: "A comprehensive guide to using React Hooks effectively",
    body: "React Hooks have revolutionized the way we write React components. This post provides a deep dive into the most commonly used hooks, including useState, useEffect, and useContext. We'll explore best practices, common pitfalls, and advanced techniques to help you leverage the full power of hooks in your React applications.",
    views: 2345,
  },
]

const projects = [
  {
    title: "AI-Powered Task Manager",
    context: "Completed in 5 months",
    imageSrc: "/placeholder.svg?height=300&width=400",
    description:
      "An innovative task management application that uses artificial intelligence to prioritize and categorize tasks. The AI suggests optimal times for task completion based on the user's productivity patterns and calendar availability.",
  },
  {
    title: "Eco-Friendly Smart Home System",
    context: "College Project",
    imageSrc: "/placeholder.svg?height=300&width=400",
    description:
      "A comprehensive smart home system designed with sustainability in mind. It integrates various IoT devices to optimize energy usage, reduce waste, and promote eco-friendly living habits. The project won first place in the university's annual innovation competition.",
  },
]

export default function Navigation() {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const handleClick = (section: string) => {
    setActiveSection(activeSection === section ? null : section)
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center">Welcome to My Portfolio</h1>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {sections.map((section) => (
            <Button
              key={section}
              label={section}
              onClick={() => handleClick(section)}
              isActive={activeSection === section}
            />
          ))}
        </div>

        <AnimatePresence>
          {activeSection === "Chat" && <ChatBubble />}
          {activeSection === "Blog" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              {blogPosts.map((post, index) => (
                <BlogPost key={index} {...post} />
              ))}
            </motion.div>
          )}
          {activeSection === "Projects" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              {projects.map((project, index) => (
                <Project key={index} {...project} />
              ))}
            </motion.div>
          )}
          {activeSection === "Contact" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-4 p-4 bg-[#1a1a1a] rounded-lg"
            >
              <h2 className="text-xl font-bold mb-4">Get in Touch</h2>
              <ContactForm />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

