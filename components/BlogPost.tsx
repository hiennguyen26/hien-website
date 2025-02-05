import { useState } from "react"
import { Heart } from "lucide-react"

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

  return (
    <div className="bg-[#1a1a1a] rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-sm text-gray-400 mb-2">
        {date} • {location}
      </p>
      <h3 className="text-lg font-semibold mb-4">{subtitle}</h3>
      <p className="mb-4">{body}</p>
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

