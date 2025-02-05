import { useState, useEffect, useRef } from "react"
import { Heart } from "lucide-react"
import Image from "next/image"

interface BlogPostProps {
  title: string
  date: string
  location: string
  subtitle: string
  body: string
  views: number
}

export default function BlogPost({ title, date, location, subtitle, body, views }: BlogPostProps) {
  const [likes, setLikes] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

  // Replace img tags with Next.js Image components after render
  useEffect(() => {
    if (contentRef.current) {
      const imgElements = contentRef.current.getElementsByTagName('img')
      Array.from(imgElements).forEach((img) => {
        const parent = img.parentElement
        if (parent && !parent.classList.contains('next-image-wrapper')) {
          const wrapper = document.createElement('div')
          wrapper.className = 'next-image-wrapper relative w-full h-[600px] my-8'
          parent.insertBefore(wrapper, img)
          wrapper.appendChild(img)
          img.className = 'object-contain'
          img.style.width = '100%'
          img.style.height = '100%'
          img.style.position = 'absolute'
          img.style.inset = '0'
        }
      })
    }
  }, [body])

  return (
    <div className="bg-[#1a1a1a] rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-sm text-gray-400 mb-2">
        {date} • {location}
      </p>
      <h3 className="text-lg font-semibold mb-4">{subtitle}</h3>
      <div 
        ref={contentRef}
        className="prose prose-invert max-w-none mb-4 prose-img:rounded-lg prose-img:w-full prose-img:my-8"
        dangerouslySetInnerHTML={{ __html: body }}
      />
      <div className="flex items-center justify-between">
        <button
          onClick={() => setLikes(likes + 1)}
          className="flex items-center space-x-2 text-pink-500 hover:text-pink-600"
        >
          <Heart size={20} />
          <span>{likes} likes</span>
        </button>
        <span className="text-gray-400">{views} views</span>
      </div>
    </div>
  )
}

