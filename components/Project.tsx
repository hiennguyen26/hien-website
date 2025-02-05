import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, ImageOff } from "lucide-react"
import Image from "next/image"

interface ProjectProps {
  title: string
  context: string
  imageSrc: string
  description: string
}

export default function Project({ title, context, imageSrc, description }: ProjectProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [imageError, setImageError] = useState(false)

  return (
    <div className="bg-[#1a1a1a] rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-sm text-gray-400 mb-4">{context}</p>
      <div className="relative w-full h-[300px] mb-4 bg-gray-800 rounded-lg overflow-hidden">
        {!imageError ? (
          <Image
            src={imageSrc}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-lg transition-opacity duration-300 hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            quality={100}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <ImageOff className="w-12 h-12 text-gray-600" />
          </div>
        )}
      </div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full py-2 px-4 bg-[#2a2a2a] rounded-lg hover:bg-[#333333] transition-colors duration-200"
      >
        <span>{isExpanded ? "Hide Details" : "Show Details"}</span>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 overflow-hidden"
          >
            <div 
              className="prose prose-invert max-w-none prose-headings:mt-6 prose-headings:mb-4"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

