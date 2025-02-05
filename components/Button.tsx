import { motion } from "framer-motion"

interface ButtonProps {
  label: string
  onClick: () => void
  isActive?: boolean
}

export default function Button({ label, onClick, isActive = false }: ButtonProps) {
  return (
    <motion.button
      className={`w-full px-6 py-2 rounded-full text-sm font-medium
                 transition-colors duration-200 shadow-[0_0_10px_rgba(255,255,255,0.1)]
                 ${isActive ? "bg-[#2a2a2a] text-white" : "bg-[#1a1a1a] text-white hover:bg-[#2a2a2a]"}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {label}
    </motion.button>
  )
}

