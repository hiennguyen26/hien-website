"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Button from "./Button"
import ChatBubble from "./ChatBubble"
import BlogPost from "./BlogPost"
import Project from "./Project"
import ContactForm from "./ContactForm"
import { getAllBlogPosts, getAllProjects, type BlogPost as BlogPostType, type Project as ProjectType } from "@/lib/markdown"

const sections = ["Chat", "Projects", "Blog", "Contact"]

export default function Navigation() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [blogPosts, setBlogPosts] = useState<BlogPostType[]>([])
  const [projects, setProjects] = useState<ProjectType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const [posts, projectsData] = await Promise.all([
          getAllBlogPosts(),
          getAllProjects(),
        ])
        setBlogPosts(posts)
        setProjects(projectsData)
      } catch (error) {
        console.error('Error loading content:', error)
        setError('Failed to load content. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    if (activeSection === "Blog" || activeSection === "Projects") {
      loadContent()
    }
  }, [activeSection])

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
              {error ? (
                <div className="bg-red-900/50 text-white p-4 rounded-lg mb-6">
                  {error}
                </div>
              ) : isLoading ? (
                <div className="bg-[#1a1a1a] rounded-lg p-6 mb-6">
                  <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-700 rounded w-full"></div>
                  </div>
                </div>
              ) : (
                blogPosts.map((post) => (
                  <BlogPost
                    key={post.slug}
                    title={post.title}
                    date={post.date}
                    location={post.location}
                    subtitle={post.subtitle}
                    body={post.content}
                    views={post.views}
                  />
                ))
              )}
            </motion.div>
          )}
          {activeSection === "Projects" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              {error ? (
                <div className="bg-red-900/50 text-white p-4 rounded-lg mb-6">
                  {error}
                </div>
              ) : isLoading ? (
                <div className="bg-[#1a1a1a] rounded-lg p-6 mb-6">
                  <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                    <div className="h-48 bg-gray-700 rounded w-full"></div>
                  </div>
                </div>
              ) : (
                projects.map((project) => (
                  <Project
                    key={project.slug}
                    title={project.title}
                    context={project.context}
                    imageSrc={project.imageSrc}
                    description={project.content}
                  />
                ))
              )}
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

