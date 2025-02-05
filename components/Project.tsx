import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"

interface ProjectProps {
  title: string
  context: string
  imageSrc: string
  description: string
}

export default function Project({ title, context, imageSrc, description }: ProjectProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="bg-[#1a1a1a] rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-sm text-gray-400 mb-4">{context}</p>
      <div className="relative w-full h-48 mb-4">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-lg"
        />
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
            <p>{description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

